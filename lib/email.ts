import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

/**
 * Lead notification pipeline. A submission is delivered via every channel
 * that's configured, so you never lose a lead:
 *   1. Resend email  → RESEND_API_KEY  (recommended)
 *   2. Webhook POST  → CONTACT_FORM_ENDPOINT (Sheets/Zapier/CRM)
 *   3. Server log    → fallback when nothing is configured (dev)
 */

type LeadType = "contact" | "audit" | "newsletter";
type LeadPayload = Record<string, unknown> & { type: LeadType };

const FROM =
  process.env.LEAD_FROM_EMAIL || "NoobxMarketing <onboarding@resend.dev>";
const TO = process.env.LEAD_TO_EMAIL || siteConfig.email;

export async function notify(payload: LeadPayload) {
  await Promise.allSettled([
    sendEmail(payload),
    forwardToEndpoint(payload),
  ]);

  if (!process.env.RESEND_API_KEY && !process.env.CONTACT_FORM_ENDPOINT) {
    console.info("[lead] received (no destination configured):", payload);
  }
}

async function sendEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  const { subject, html, replyTo } = buildEmail(payload);

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
  } catch (err) {
    console.error("[lead] Resend send failed:", err);
  }
}

async function forwardToEndpoint(payload: LeadPayload) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) return;
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[lead] endpoint forward failed:", err);
  }
}

/* ───────────────────────── email templates ───────────────────────── */

function buildEmail(payload: LeadPayload): {
  subject: string;
  html: string;
  replyTo?: string;
} {
  const email = typeof payload.email === "string" ? payload.email : undefined;

  if (payload.type === "newsletter") {
    return {
      subject: "✉️ New newsletter subscriber — NoobxMarketing",
      replyTo: email,
      html: shell("New newsletter subscriber", [["Email", String(payload.email ?? "")]]),
    };
  }

  if (payload.type === "audit") {
    const focus = Array.isArray(payload.focus)
      ? (payload.focus as string[]).join(", ")
      : String(payload.focus ?? "");
    return {
      subject: `🛰️ Growth Audit request — ${String(payload.website ?? "")}`,
      replyTo: email,
      html: shell("New Free Growth Audit request", [
        ["Name", String(payload.name ?? "")],
        ["Email", String(payload.email ?? "")],
        ["Website", String(payload.website ?? "")],
        ["Primary goal", String(payload.goal ?? "")],
        ["Focus areas", focus],
        ["Budget", String(payload.budget ?? "")],
      ]),
    };
  }

  // contact
  return {
    subject: `🚀 Consultation request — ${String(payload.name ?? "")}`,
    replyTo: email,
    html: shell("New consultation request", [
      ["Name", String(payload.name ?? "")],
      ["Email", String(payload.email ?? "")],
      ["Company", String(payload.company || "—")],
      ["Service", String(payload.service ?? "")],
      ["Budget", String(payload.budget ?? "")],
      ["Message", String(payload.message ?? "")],
    ]),
  };
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function shell(title: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #1a2238;color:#7e8aa8;font-size:13px;width:140px;vertical-align:top;">${esc(k)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #1a2238;color:#ffffff;font-size:14px;">${esc(v).replace(/\n/g, "<br/>")}</td>
        </tr>`,
    )
    .join("");

  return `
  <div style="background:#050816;padding:32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#0b1026;border:1px solid #1a2238;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:24px 24px 8px;">
          <div style="display:inline-block;background:linear-gradient(135deg,#00fff0,#3b82f6);color:#fff;width:36px;height:36px;line-height:36px;text-align:center;border-radius:10px;font-weight:700;">N</div>
          <span style="color:#fff;font-size:18px;font-weight:600;margin-left:10px;">NoobxMarketing</span>
        </td>
      </tr>
      <tr><td style="padding:0 24px 8px;color:#b6c0d9;font-size:15px;font-weight:600;">${esc(title)}</td></tr>
      <tr>
        <td style="padding:8px 8px 16px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">${body}</table>
        </td>
      </tr>
      <tr><td style="padding:0 24px 24px;color:#7e8aa8;font-size:12px;">Sent automatically from noobxmarketing.com</td></tr>
    </table>
  </div>`;
}
