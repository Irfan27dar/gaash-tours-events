import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Activity } from "@/data/activities";
import { img } from "@/lib/images";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Activities({ activities }: { activities: Activity[] }) {
  return (
    <Section id="activities" className="relative overflow-hidden bg-ink text-cloud">
      <Image
        src={img("experiences")}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="object-cover opacity-15"
      />
      <div className="relative">
        <SectionHeading
          eyebrow="Things to do"
          title="Activities & experiences"
          intro="Adventure woven into every itinerary — pick the thrills that make your trip yours."
          className="[&_h2]:text-cloud [&_p]:text-cloud/70"
        />

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a) => (
            <Reveal key={a.slug}>
              <Link
                href={`/activities#${a.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-saffron/40 hover:bg-white/[0.08]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron text-ink transition-transform duration-500 group-hover:scale-110">
                  <Icon name={a.icon} size={22} aria-hidden />
                </span>
                <h3 className="mt-4 flex items-center justify-between text-lg font-display font-semibold">
                  {a.title}
                  <ArrowUpRight size={16} className="text-saffron opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-saffron/80">
                  {a.where} · {a.season}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cloud/70">{a.blurb}</p>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
