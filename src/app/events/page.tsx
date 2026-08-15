import type { Metadata } from "next";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { eventsIntro } from "@/data/events";
import { getEventTypes } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events & Celebrations",
  description:
    "Destination weddings, corporate offsites and private celebrations staged in Kashmir and beyond by the Gaash Events division.",
};

export default async function EventsPage() {
  const eventTypes = await getEventTypes();
  return (
    <>
      <PageHeader
        eyebrow={eventsIntro.eyebrow}
        title="Celebrations, staged in paradise"
        intro={eventsIntro.body}
        image="pahalgam"
        crumbs={[{ label: "Events" }]}
      />

      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {eventTypes.map((e) => (
              <Reveal key={e.slug}>
                <article className="flex h-full gap-5 rounded-2xl bg-white p-7 shadow-soft">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-pine text-cloud">
                    <Icon name={e.icon} size={26} aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-xl font-display font-semibold">{e.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{e.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-pine p-10 text-center text-cloud">
            <span className="eyebrow text-saffron">Gaash Events</span>
            <h2 className="max-w-xl text-h2 font-display">Let&apos;s plan your occasion</h2>
            <p className="max-w-md text-cloud/75">
              Explore our dedicated events division, or send us the details and we&apos;ll take it from there.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={eventsIntro.ctaHref} size="lg">
                {eventsIntro.ctaLabel} <ArrowUpRight size={18} aria-hidden />
              </Button>
              <Button href="/contact" size="lg" variant="light">
                Enquire now <ArrowRight size={18} aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
