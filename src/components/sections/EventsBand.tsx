import { ArrowUpRight } from "lucide-react";
import { eventsIntro, eventTypes } from "@/data/events";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function EventsBand() {
  return (
    <section className="bg-pine text-cloud">
      <div className="container grid gap-10 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <Reveal>
          <span className="eyebrow text-saffron">{eventsIntro.eyebrow}</span>
          <h2 className="mt-3 text-h2 font-display">{eventsIntro.title}</h2>
          <p className="mt-4 max-w-md text-lead text-cloud/80">{eventsIntro.body}</p>
          <Button href={eventsIntro.ctaHref} size="lg" className="mt-8">
            {eventsIntro.ctaLabel} <ArrowUpRight size={18} aria-hidden />
          </Button>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {eventTypes.map((e) => (
            <Reveal key={e.slug}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-saffron text-ink">
                  <e.icon size={20} aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-display font-semibold">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cloud/70">{e.blurb}</p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
