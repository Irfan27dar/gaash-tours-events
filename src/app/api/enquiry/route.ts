import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry";
import { SUPABASE_SERVICE_ROLE_KEY, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Public enquiry endpoint. Validates, persists to Supabase when configured,
// otherwise logs so nothing is lost.
// TODO: send a confirmation email via Resend + notify the team on WhatsApp/CRM.
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

  const d = parsed.data;

  if (isSupabaseConfigured && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error } = await supabase.from("enquiries").insert({
        name: d.name,
        email: d.email,
        phone: d.phone,
        destination: d.destination,
        travellers: d.travellers ?? null,
        travel_date: d.date || null,
        package_slug: d.packageSlug ?? null,
        package_title: (body as { packageTitle?: string }).packageTitle ?? null,
        message: d.message ?? null,
      });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error("[enquiry] DB insert failed, falling back to log:", e);
    }
  }

  console.info("[enquiry]", { at: new Date().toISOString(), ...d });
  return NextResponse.json({ ok: true });
}
