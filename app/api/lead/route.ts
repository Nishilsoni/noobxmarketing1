import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

/** Receives contact + newsletter submissions. Forwards to
 *  CONTACT_FORM_ENDPOINT when configured; otherwise accepts and logs
 *  (so the demo works out of the box). */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Newsletter capture is lightweight.
  if (data?.type === "newsletter") {
    const email = String(data.email ?? "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    await forward({ type: "newsletter", email });
    return NextResponse.json({ ok: true });
  }

  // Full contact form is validated server-side too.
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot tripped → silently accept, drop the lead.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  await forward({ type: "contact", ...parsed.data, website: undefined });
  return NextResponse.json({ ok: true });
}

async function forward(payload: Record<string, unknown>) {
  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    // No endpoint configured — log for local dev.
    console.info("[lead] received (no endpoint configured):", payload);
    return;
  }
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[lead] forward failed:", err);
  }
}
