import { valueProps } from "@/data/whyGaash";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";

export function WhyGaash() {
  return (
    <Section className="bg-cloud">
      <SectionHeading
        eyebrow="Why travel with us"
        title="Local experts, effortless journeys"
        intro="A decade of showing travellers the real Kashmir — and everything that comes after."
        align="center"
      />
      <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {valueProps.map((v) => (
          <Reveal key={v.title}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron/15 text-saffron-deep">
                <v.icon size={24} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-display font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
