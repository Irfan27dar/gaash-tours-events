import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking";
import { getPackage } from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getPaymentProvider, depositAmount } from "@/lib/payments";

// Create a booking (status pending) + a payment order. The amount is computed
// SERVER-SIDE from the DB price — never trusted from the client.
export async function POST(req: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, error: "Bookings require the database to be configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const d = parsed.data;

  const pkg = await getPackage(d.packageSlug);
  if (!pkg) {
    return NextResponse.json({ ok: false, error: "Package not found" }, { status: 404 });
  }

  const total = pkg.price * d.travellers;
  const payNow = d.paymentOption === "deposit" ? depositAmount(total) : total;

  const supabase = createSupabaseAdminClient();
  const provider = getPaymentProvider();

  // Insert the booking first so we have a reference for the order receipt.
  const { data: booking, error: insertErr } = await supabase
    .from("bookings")
    .insert({
      package_slug: pkg.slug,
      package_title: pkg.title,
      customer_name: d.name,
      email: d.email,
      phone: d.phone,
      travel_date: d.travelDate || null,
      travellers: d.travellers,
      amount: total,
      deposit: d.paymentOption === "deposit" ? payNow : 0,
      currency: "INR",
      status: "pending",
      payment_provider: provider.name,
      notes: d.notes ?? null,
    })
    .select("id, reference")
    .single();

  if (insertErr || !booking) {
    return NextResponse.json({ ok: false, error: "Could not create booking" }, { status: 500 });
  }

  try {
    const order = await provider.createOrder({
      amount: payNow,
      currency: "INR",
      receipt: booking.reference,
      notes: { bookingId: booking.id, package: pkg.slug },
    });

    await supabase.from("bookings").update({ payment_order_id: order.orderId }).eq("id", booking.id);

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      reference: booking.reference,
      amount: payNow,
      total,
      currency: "INR",
      order,
      customer: { name: d.name, email: d.email, phone: d.phone },
    });
  } catch (e) {
    console.error("[bookings] order creation failed:", e);
    // Roll back the pending booking so we don't leave orphans.
    await supabase.from("bookings").delete().eq("id", booking.id);
    return NextResponse.json({ ok: false, error: "Payment order failed" }, { status: 502 });
  }
}
