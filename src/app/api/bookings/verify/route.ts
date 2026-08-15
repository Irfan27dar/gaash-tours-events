import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getPaymentProvider } from "@/lib/payments";
import { sendBookingConfirmation } from "@/lib/email";

const verifySchema = z.object({
  bookingId: z.string().uuid(),
  orderId: z.string().min(1),
  paymentId: z.string().min(1),
  signature: z.string().default(""), // empty in mock mode
});

// Verify the payment signature and mark the booking paid.
export async function POST(req: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const parsed = verifySchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 422 });
  }
  const { bookingId, orderId, paymentId, signature } = parsed.data;

  const provider = getPaymentProvider();
  const valid = provider.verifySignature({ orderId, paymentId, signature });
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Signature verification failed" }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: booking, error } = await supabase
    .from("bookings")
    .update({ status: "paid", payment_id: paymentId })
    .eq("id", bookingId)
    .eq("payment_order_id", orderId) // ensure the order matches this booking
    .select("*")
    .single();

  if (error || !booking) {
    return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
  }

  // Fire-and-forget confirmation email (no-op if Resend isn't configured).
  sendBookingConfirmation(booking).catch((e) => console.error("[email]", e));

  return NextResponse.json({ ok: true, reference: booking.reference, bookingId: booking.id });
}
