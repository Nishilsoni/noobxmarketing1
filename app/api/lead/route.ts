import { NextResponse } from "next/server";
import { contactSchema, auditSchema } from "@/lib/validations";
import { notify } from "@/lib/email";

/** Receives contact, audit + newsletter submissions, validates them, and
 *  fans them out to every configured destination (email / webhook / log)
 *  via notify(). See lib/email.ts. */
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
    await notify({ type: "newsletter", email });
    return NextResponse.json({ ok: true });
  }

  // Free Growth Audit lead.
  if (data?.type === "audit") {
    const parsed = auditSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }
    if (parsed.data.hp) return NextResponse.json({ ok: true }); // honeypot
    await notify({ type: "audit", ...parsed.data, hp: undefined });
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

  await notify({ type: "contact", ...parsed.data, website: undefined });
  return NextResponse.json({ ok: true });
}
