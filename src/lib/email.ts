import { inr } from "./utils";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM = process.env.ENQUIRY_FROM_EMAIL ?? "Gaash Tours <bookings@gaashtoursandevent.com>";
const TEAM_TO = process.env.ENQUIRY_TO_EMAIL ?? "info@gaashtoursandevent.com";

type BookingRow = {
  reference: string;
  package_title: string | null;
  customer_name: string;
  email: string;
  phone: string;
  travel_date: string | null;
  travellers: number | null;
  amount: number;
  deposit: number;
};

async function send(to: string | string[], subject: string, html: string) {
  if (!RESEND_API_KEY) return; // no-op until email is configured
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) console.error("[email] Resend error", res.status, await res.text());
  } catch (e) {
    console.error("[email] send failed", e);
  }
}

/** Confirmation to the customer + a heads-up to the team. */
export async function sendBookingConfirmation(b: BookingRow) {
  const paid = b.deposit > 0 ? b.deposit : b.amount;
  const balance = b.deposit > 0 ? b.amount - b.deposit : 0;

  const customerHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#141414">
      <h2 style="font-family:Georgia,serif">Your Gaash booking is confirmed 🎉</h2>
      <p>Hi ${b.customer_name}, thank you for booking with Gaash Tours &amp; Events.</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <tr><td style="padding:6px 0;color:#666">Reference</td><td style="text-align:right;font-weight:600">${b.reference}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Package</td><td style="text-align:right;font-weight:600">${b.package_title ?? "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Travellers</td><td style="text-align:right">${b.travellers ?? 1}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Travel date</td><td style="text-align:right">${b.travel_date ?? "To be confirmed"}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Paid now</td><td style="text-align:right;font-weight:700">${inr(paid)}</td></tr>
        ${balance > 0 ? `<tr><td style="padding:6px 0;color:#666">Balance due</td><td style="text-align:right">${inr(balance)}</td></tr>` : ""}
      </table>
      <p>A travel expert will call you shortly to finalise the details. Questions? Just reply to this email.</p>
      <p style="color:#888;font-size:13px">Gaash Tours &amp; Events · Srinagar &amp; Kolkata</p>
    </div>`;

  const teamHtml = `
    <div style="font-family:Arial,sans-serif">
      <h3>New booking — ${b.reference}</h3>
      <p><b>${b.customer_name}</b> · ${b.phone} · ${b.email}</p>
      <p>${b.package_title ?? "—"} · ${b.travellers ?? 1} travellers · ${b.travel_date ?? "date TBC"}</p>
      <p>Paid: ${inr(paid)}${balance > 0 ? ` · Balance: ${inr(balance)}` : ""}</p>
    </div>`;

  await Promise.all([
    send(b.email, `Booking confirmed — ${b.reference}`, customerHtml),
    send(TEAM_TO, `New booking: ${b.package_title ?? b.reference}`, teamHtml),
  ]);
}
