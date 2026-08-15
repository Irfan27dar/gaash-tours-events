import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Compass, CalendarDays, Clock, ArrowRight } from "lucide-react";
import { destinations as staticDestinations } from "@/data/destinations";
import { getDestination, getPackages } from "@/lib/content";
import { img } from "@/lib/images";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PackageCard } from "@/components/ui/PackageCard";

export const revalidate = 60;

export function generateStaticParams() {
  return staticDestinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const d = await getDestination(params.slug);
  if (!d) return {};
  return {
    title: `${d.name} Tours`,
    description: d.blurb,
    openGraph: { title: `${d.name} · ${site.name}`, description: d.blurb },
  };
}

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const d = await getDestination(params.slug);
  if (!d) notFound();

  const allPackages = await getPackages();
  const trips = allPackages.filter((p) => p.region === d.name || p.route.includes(d.name)).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={d.tagline}
        title={d.name}
        intro={d.blurb}
        image={d.image}
        crumbs={[{ label: "Destinations", href: "/destinations" }, { label: d.name }]}
      />

      <section className="bg-cloud py-14 lg:py-20">
        <div className="container">
          {/* Quick facts */}
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            <Fact icon={CalendarDays} label="Best time to visit" value={d.bestTime} />
            <Fact icon={Clock} label="Ideal duration" value={d.idealDays} />
            <Fact icon={Compass} label="Region" value={d.region} />
          </RevealGroup>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {/* Highlights */}
            <Reveal>
              <h2 className="text-h2 font-display">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
                    <Sparkles size={18} className="mt-0.5 shrink-0 text-saffron-deep" aria-hidden />
                    <span className="font-medium text-ink/80">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Experiences */}
            <Reveal delay={0.1}>
              <h2 className="text-h2 font-display">Things to do</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {d.experiences.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink/75"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl">
                <Image
                  src={img(d.gallery[0] ?? d.image)}
                  alt={d.name}
                  placeholder="blur"
                  className="h-64 w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related trips */}
      {trips.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow text-saffron-deep">Ready-made journeys</span>
                <h2 className="mt-2 text-h2 font-display">{d.name} tour packages</h2>
              </div>
              <Button href={`/packages?region=${encodeURIComponent(d.name)}`} variant="outline">
                See all {d.name} trips
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink py-16 text-cloud">
        <div className="container flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-h2 font-display">Design your own {d.name} trip</h2>
          <p className="max-w-md text-cloud/70">
            Prefer something tailor-made? Tell us your dates and dreams — we&apos;ll build it around you.
          </p>
          <Button href="/contact" size="lg">
            Plan my {d.name} trip <ArrowRight size={18} aria-hidden />
          </Button>
        </div>
      </section>
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Compass;
  label: string;
  value: string;
}) {
  return (
    <Reveal className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-saffron/15 text-saffron-deep">
        <Icon size={20} aria-hidden />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/45">{label}</p>
        <p className="mt-0.5 font-medium text-ink">{value}</p>
      </div>
    </Reveal>
  );
}
