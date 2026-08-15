import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { RAZORPAY_WEBHOOK_SECRET } from "@/lib/payments/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Razorpay server-to-server webhook — authoritative payment status backstop.
// Configure in the Razorpay dashboard with the same RAZORPAY_WEBHOOK_SECRET.
export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  if (!RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Webhook not configured" }, { status: 503 });
  }

  const expected = createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(raw);
  const type = event?.event as string;

  if ((type === "payment.captured" || type === "order.paid") && isSupabaseConfigured) {
    const payment = event.payload?.payment?.entity;
    const orderId = payment?.order_id;
    if (orderId) {
      const supabase = createSupabaseAdminClient();
      await supabase
        .from("bookings")
        .update({ status: "paid", payment_id: payment.id })
        .eq("payment_order_id", orderId)
        .neq("status", "paid");
    }
  }

  return NextResponse.json({ ok: true });
}
