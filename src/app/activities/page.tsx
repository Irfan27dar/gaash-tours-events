import type { Metadata } from "next";
import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { getActivities } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Activities & Experiences",
  description:
    "Skiing, gondola rides, rafting, snowboarding, mountain biking, ATV and golfing — the experiences that make a Gaash trip unforgettable.",
};

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return (
    <>
      <PageHeader
        eyebrow="Things to do"
        title="Activities & experiences"
        intro="Adventure woven into every itinerary — pick the thrills that make your trip yours."
        image="experiences"
        crumbs={[{ label: "Activities" }]}
      />

      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {activities.map((a) => (
              <Reveal key={a.slug}>
                <article
                  id={a.slug}
                  className="group flex h-full scroll-mt-24 gap-5 rounded-2xl bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-saffron text-ink transition-transform duration-500 group-hover:scale-110">
                    <Icon name={a.icon} size={26} aria-hidden />
                  </span>
                  <div>
                    <h2 className="text-xl font-display font-semibold">{a.title}</h2>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink/60">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} className="text-saffron-deep" aria-hidden /> {a.where}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} className="text-saffron-deep" aria-hidden /> {a.season}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{a.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal className="mt-14 flex flex-col items-center gap-5 rounded-3xl bg-ink p-10 text-center text-cloud">
            <h2 className="max-w-xl text-h2 font-display">Add these to your itinerary</h2>
            <p className="max-w-md text-cloud/70">
              Every activity can be built into a tailor-made trip. Tell us what excites you.
            </p>
            <Button href="/contact" size="lg">
              Plan my adventure <ArrowRight size={18} aria-hidden />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
