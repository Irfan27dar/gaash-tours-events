import Image from "next/image";
import { Check, Clock, ArrowRight } from "lucide-react";
import type { TourPackage } from "@/data/packages";
import { img } from "@/lib/images";
import { inr } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Stars } from "@/components/ui/Stars";
import { Button } from "@/components/ui/Button";

export function FeaturedPackage({ pkg }: { pkg: TourPackage }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <Reveal className="overflow-hidden rounded-3xl bg-ink text-cloud shadow-lift">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[18rem] lg:min-h-full">
              <Image
                src={img(pkg.image)}
                alt={pkg.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge tone="saffron">★ Bestseller</Badge>
                <Badge tone="glass">{pkg.discountLabel}</Badge>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <span className="eyebrow text-saffron">Featured journey</span>
              <h2 className="mt-3 text-h2 font-display">{pkg.title}</h2>
              <p className="mt-2 text-cloud/70">{pkg.route}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Stars rating={pkg.rating} reviews={pkg.reviews} className="text-cloud" />
                <span className="inline-flex items-center gap-1.5 text-sm text-cloud/70">
                  <Clock size={15} aria-hidden /> {pkg.durationLabel}
                </span>
              </div>

              <p className="mt-5 text-cloud/80">{pkg.overview}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {pkg.inclusions.slice(0, 4).map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-cloud/85">
                    <Check size={16} className="mt-0.5 shrink-0 text-saffron" aria-hidden />
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-sm text-cloud/50 line-through">{inr(pkg.oldPrice)}</p>
                  <p className="text-3xl font-display font-bold text-saffron">
                    {inr(pkg.price)}
                    <span className="ml-1 text-sm font-normal text-cloud/60">/ person</span>
                  </p>
                </div>
                <Button href={`/packages/${pkg.slug}`} size="lg">
                  View this trip <ArrowRight size={18} aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
