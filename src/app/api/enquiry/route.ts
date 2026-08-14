import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";

// Public enquiry endpoint. Validates + logs the lead.
// TODO (Phase 2/3): persist to Supabase `enquiries` table and send a
// confirmation email via Resend + notify the team on WhatsApp/CRM.
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // For now, log server-side so nothing is lost before integrations land.
  console.info("[enquiry]", {
    at: new Date().toISOString(),
    ...parsed.data,
  });

  return NextResponse.json({ ok: true });
}
