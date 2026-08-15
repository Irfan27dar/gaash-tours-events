import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, Calendar, Users, Phone, MessageCircle } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { site } from "@/data/site";
import { inr } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/admin/ui";

export const metadata: Metadata = {
  title: "Booking confirmed",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BookingConfirmation({ params }: { params: { id: string } }) {
  if (!isSupabaseConfigured) notFound();

  const supabase = createSupabaseAdminClient();
  const { data: b } = await supabase.from("bookings").select("*").eq("id", params.id).single();
  if (!b) notFound();

  const paidNow = b.deposit > 0 ? b.deposit : b.amount;
  const balance = b.deposit > 0 ? b.amount - b.deposit : 0;

  return (
    <div className="min-h-screen bg-cloud pt-24">
      <div className="container max-w-2xl py-12">
        <div className="rounded-3xl bg-white p-8 shadow-lift sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-green-100">
              <CheckCircle2 size={36} className="text-green-600" />
            </span>
            <h1 className="mt-5 text-h2 font-display">
              {b.status === "paid" ? "Booking confirmed!" : "Booking received"}
            </h1>
            <p className="mt-2 text-ink/60">
              Thank you, {b.customer_name.split(" ")[0]} — your trip is reserved. A confirmation is on its way to{" "}
              <span className="font-medium">{b.email}</span>.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-sm font-semibold">{b.reference}</span>
              <StatusPill status={b.status} />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-cloud p-6">
            <h2 className="font-display text-lg font-semibold">{b.package_title}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm text-ink/70 sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <Calendar size={15} className="text-saffron-deep" /> {b.travel_date ?? "Date to be confirmed"}
              </li>
              <li className="flex items-center gap-2">
                <Users size={15} className="text-saffron-deep" /> {b.travellers} traveller{b.travellers > 1 ? "s" : ""}
              </li>
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/60">Trip total</dt>
                <dd>{inr(b.amount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/60">Paid now</dt>
                <dd className="font-semibold text-green-700">{inr(paidNow)}</dd>
              </div>
              {balance > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink/60">Balance due</dt>
                  <dd>{inr(balance)}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl bg-saffron/15 p-4 text-sm text-ink/75">
            <Clock size={16} className="shrink-0 text-saffron-deep" />
            A Gaash travel expert will call you within a few hours to finalise your itinerary.
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={site.whatsapp.href} className="bg-[#25D366] text-white hover:shadow-glow">
              <MessageCircle size={18} /> WhatsApp us
            </Button>
            <Button href={`tel:+91${site.phones[0]}`} variant="outline">
              <Phone size={18} /> {site.phones[0]}
            </Button>
            <Button href="/" variant="ghost">
              Back home
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink/60">
          Need changes? <Link href="/contact" className="font-semibold text-saffron-deep hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  );
}
