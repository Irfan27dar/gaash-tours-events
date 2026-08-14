import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { team, story } from "@/data/team";
import { valueProps } from "@/data/whyGaash";
import { stats, certifications, site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Gaash Tours & Events — local Kashmiri experts since 2014, crafting tailor-made journeys across Kashmir, Ladakh, Rajasthan and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Local Kashmiri experts since 2014"
        intro="A decade of showing travellers the real Kashmir, the right way — and everything that comes after."
        image="ladakh"
        crumbs={[{ label: "About" }]}
      />

      {/* Story timeline */}
      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {story.map((s) => (
              <Reveal key={s.title} className="rounded-2xl bg-white p-7 shadow-soft">
                <span className="text-sm font-bold uppercase tracking-widest text-saffron-deep">{s.year}</span>
                <h2 className="mt-2 text-xl font-display font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink py-14 text-cloud">
        <div className="container">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-4xl font-display font-bold text-saffron">
                  {"raw" in s && s.raw ? (
                    <>
                      {s.prefix}
                      {s.value}
                    </>
                  ) : (
                    <CountUp value={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={"suffix" in s ? s.suffix : ""} />
                  )}
                </dt>
                <dd className="mt-1 text-xs text-cloud/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-saffron-deep">What we stand for</span>
            <h2 className="mt-2 text-h2 font-display">The Gaash difference</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((v) => (
              <Reveal key={v.title} className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron/15 text-saffron-deep">
                  <v.icon size={24} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-display font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-saffron-deep">The people</span>
            <h2 className="mt-2 text-h2 font-display">Meet the team</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <Reveal key={m.name} className="rounded-2xl border border-line bg-cloud p-7 text-center">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink text-2xl font-display font-bold text-saffron">
                  {m.initials}
                </span>
                <h3 className="mt-4 text-lg font-display font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-saffron-deep">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{m.bio}</p>
              </Reveal>
            ))}
          </RevealGroup>

          {/* Certifications */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink/40">Recognised by</span>
            {certifications.map((c) => (
              <span key={c.code} title={c.note} className="rounded-full border border-line px-4 py-2 text-sm font-bold text-ink/75">
                {c.label}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-saffron py-16">
        <div className="container flex flex-col items-center gap-5 text-center">
          <h2 className="max-w-2xl text-h2 font-display text-ink">Let&apos;s plan something unforgettable</h2>
          <p className="max-w-md text-ink/70">
            Open daily {site.hours} · offices in Srinagar &amp; Kolkata.
          </p>
          <Button href="/contact" size="lg" variant="ink">
            Start planning <ArrowRight size={18} aria-hidden />
          </Button>
        </div>
      </section>
    </>
  );
}
