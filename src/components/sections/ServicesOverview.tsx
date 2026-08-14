import Link from "next/link";
import { services } from "@/data/services";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";

export function ServicesOverview() {
  return (
    <Section id="services" className="bg-white">
      <SectionHeading
        eyebrow="Everything, handled"
        title="Our services"
        intro="One trusted team for the whole trip — from the flight out to the houseboat you sleep on."
        align="center"
      />
      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Reveal key={s.slug}>
            <Link
              href="/services"
              className="group flex h-full flex-col rounded-2xl border border-line bg-cloud p-6 transition-all duration-500 ease-smooth hover:-translate-y-1 hover:border-saffron/50 hover:bg-white hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-cloud transition-colors duration-500 group-hover:bg-saffron group-hover:text-ink">
                <s.icon size={20} aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-display font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{s.benefit}</p>
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
