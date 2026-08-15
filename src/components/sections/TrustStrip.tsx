import { stats, certifications } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container grid gap-8 py-8 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-12">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center lg:text-left">
              <dt className="text-3xl font-display font-bold text-ink lg:text-4xl">
                {"raw" in s && s.raw ? (
                  <>
                    {s.prefix}
                    {s.value}
                  </>
                ) : (
                  <CountUp
                    value={s.value}
                    decimals={"decimals" in s ? s.decimals : 0}
                    suffix={"suffix" in s ? s.suffix : ""}
                  />
                )}
              </dt>
              <dd className="mt-1 text-xs font-medium text-ink/60">{s.label}</dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/60">
            Recognised by
          </span>
          {certifications.map((c) => (
            <span
              key={c.code}
              title={c.note}
              className="rounded-full border border-line bg-cloud px-3.5 py-2 text-xs font-bold text-ink/75"
            >
              {c.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
