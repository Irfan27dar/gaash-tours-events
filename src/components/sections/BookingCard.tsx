"use client";

import { Clock, Users, ShieldCheck, MessageCircle } from "lucide-react";
import { inr } from "@/lib/utils";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import type { TourPackage } from "@/data/packages";

export function BookingCard({ pkg }: { pkg: TourPackage }) {
  const save = pkg.oldPrice - pkg.price;
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-ink/60 line-through">{inr(pkg.oldPrice)}</p>
          <p className="text-3xl font-display font-bold text-ink">
            {inr(pkg.price)}
          </p>
          <p className="text-xs text-ink/60">per person · twin sharing</p>
        </div>
        <span className="rounded-full bg-saffron px-3 py-1 text-xs font-bold text-ink">
          Save {inr(save)}
        </span>
      </div>

      <p className="mt-2 text-[0.7rem] italic text-ink/60">Indicative price — confirmed on enquiry.</p>

      <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm text-ink/70">
        <li className="flex items-center gap-2.5">
          <Clock size={16} className="text-saffron-deep" aria-hidden /> {pkg.durationLabel}
        </li>
        <li className="flex items-center gap-2.5">
          <Users size={16} className="text-saffron-deep" aria-hidden /> Private &amp; group departures
        </li>
        <li className="flex items-center gap-2.5">
          <ShieldCheck size={16} className="text-saffron-deep" aria-hidden /> Free cancellation window
        </li>
        <li className="flex items-center gap-2.5">
          <Stars rating={pkg.rating} reviews={pkg.reviews} />
        </li>
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={`/packages/${pkg.slug}/book`} size="lg" className="w-full">
          Book this trip
        </Button>
        <Button href="#enquire" size="lg" variant="outline" className="w-full">
          Enquire first
        </Button>
        <Button
          href={`${site.whatsapp.href}?text=${encodeURIComponent(`Hi Gaash, I'm interested in the "${pkg.title}" package.`)}`}
          size="sm"
          variant="ghost"
          className="w-full"
        >
          <MessageCircle size={16} /> Ask on WhatsApp
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-ink/60">
        Or call{" "}
        <a href={`tel:+91${site.phones[0]}`} className="font-semibold text-ink hover:text-saffron-deep">
          +91 {site.phones[0]}
        </a>
      </p>
    </div>
  );
}
