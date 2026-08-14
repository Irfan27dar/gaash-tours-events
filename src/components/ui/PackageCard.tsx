import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import { img } from "@/lib/images";
import { inr, cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { Stars } from "./Stars";
import type { TourPackage } from "@/data/packages";

export function PackageCard({ pkg, className }: { pkg: TourPackage; className?: string }) {
  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-line transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img(pkg.image)}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {pkg.badge && <Badge tone={pkg.badge === "Bestseller" ? "saffron" : "glass"}>{pkg.badge}</Badge>}
          {pkg.discountLabel && <Badge tone="ink">{pkg.discountLabel}</Badge>}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-white">
          <Clock size={13} aria-hidden /> {pkg.durationLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-ink/55">
          <MapPin size={13} className="text-saffron-deep" aria-hidden />
          {pkg.region}
        </div>
        <h3 className="mt-1.5 text-h3 font-display leading-snug">{pkg.title}</h3>
        <p className="mt-1 text-sm text-ink/60">{pkg.route}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.tags
            .filter((t) => t !== pkg.badge)
            .slice(0, 2)
            .map((t) => (
              <Badge key={t} tone="outline">
                {t}
              </Badge>
            ))}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <Stars rating={pkg.rating} reviews={pkg.reviews} />
            <p className="mt-1.5 text-xs text-ink/50">
              <span className="text-ink/40 line-through">{inr(pkg.oldPrice)}</span> from
            </p>
            <p className="text-lg font-bold text-ink">
              {inr(pkg.price)} <span className="text-xs font-normal text-ink/50">/ person</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-saffron-deep transition-transform duration-300 group-hover:translate-x-0.5">
            View trip <ArrowUpRight size={16} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
