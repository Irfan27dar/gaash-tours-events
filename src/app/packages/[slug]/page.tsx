import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, MapPin, Sparkles } from "lucide-react";
import { packages, getPackage } from "@/data/packages";
import { img } from "@/lib/images";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { BookingCard } from "@/components/sections/BookingCard";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { PackageCard } from "@/components/ui/PackageCard";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pkg = getPackage(params.slug);
  if (!pkg) return {};
  return {
    title: pkg.title,
    description: pkg.overview,
    openGraph: { title: `${pkg.title} · ${site.name}`, description: pkg.overview },
  };
}

export default function PackagePage({ params }: { params: { slug: string } }) {
  const pkg = getPackage(params.slug);
  if (!pkg) notFound();

  const related = packages
    .filter((p) => p.slug !== pkg.slug && (p.region === pkg.region || p.type === pkg.type))
    .slice(0, 3);

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.overview,
    touristType: pkg.type,
    itinerary: pkg.itinerary.map((d) => ({
      "@type": "ListItem",
      position: d.day,
      name: d.title,
      description: d.detail,
    })),
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pkg.rating,
      reviewCount: pkg.reviews,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }} />
      <PageHeader
        eyebrow={`${pkg.region} · ${pkg.durationLabel}`}
        title={pkg.title}
        intro={pkg.route}
        image={pkg.image}
        crumbs={[{ label: "Packages", href: "/packages" }, { label: pkg.title }]}
      />

      <section className="bg-cloud py-14 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div className="space-y-12">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {pkg.badge && <Badge tone="saffron">{pkg.badge}</Badge>}
                {pkg.tags
                  .filter((t) => t !== pkg.badge)
                  .map((t) => (
                    <Badge key={t} tone="outline">
                      {t}
                    </Badge>
                  ))}
              </div>
              <h2 className="mt-5 text-h2 font-display">Overview</h2>
              <p className="mt-3 text-lead text-ink/70">{pkg.overview}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 rounded-xl bg-white p-4 shadow-soft">
                    <Sparkles size={18} className="mt-0.5 shrink-0 text-saffron-deep" aria-hidden />
                    <span className="text-sm font-medium text-ink/80">{h}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Itinerary */}
            <Reveal>
              <h2 className="text-h2 font-display">Day-by-day itinerary</h2>
              <ol className="mt-6 space-y-0">
                {pkg.itinerary.map((d, i) => (
                  <li key={d.day} className="relative flex gap-5 pb-8 last:pb-0">
                    {/* line */}
                    {i < pkg.itinerary.length - 1 && (
                      <span className="absolute left-[19px] top-10 h-full w-px bg-line" aria-hidden />
                    )}
                    <span className="z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-cloud">
                      {d.day}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-lg font-semibold">{d.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">{d.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Inclusions / Exclusions */}
            <Reveal>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold">What&apos;s included</h3>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm text-ink/75">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold">Not included</h3>
                  <ul className="mt-4 space-y-2.5">
                    {pkg.exclusions.map((exc) => (
                      <li key={exc} className="flex items-start gap-2.5 text-sm text-ink/60">
                        <X size={16} className="mt-0.5 shrink-0 text-red-400" aria-hidden />
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <BookingCard pkg={pkg} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="scroll-mt-24 bg-ink py-16 text-cloud lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow text-saffron">Ready to go?</span>
            <h2 className="mt-3 text-h2 font-display">Reserve {pkg.title}</h2>
            <p className="mt-3 max-w-md text-cloud/75">
              Send an enquiry and a local expert will confirm availability, finalise your price and
              tailor the itinerary to you — no obligation.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <EnquiryForm tone="dark" defaultDestination={pkg.region} packageSlug={pkg.slug} packageTitle={pkg.title} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cloud py-16 lg:py-20">
          <div className="container">
            <div className="flex items-end justify-between">
              <h2 className="text-h2 font-display">You might also like</h2>
              <Link href="/packages" className="text-sm font-semibold text-saffron-deep hover:underline">
                All packages →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
