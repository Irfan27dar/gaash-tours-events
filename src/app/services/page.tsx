import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getServices } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Flights, hotels, houseboats, vehicle rental, travel insurance, event planning and fully custom packages — one trusted team for the whole trip.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        eyebrow="Everything, handled"
        title="Our services"
        intro="One trusted team for the whole trip — from the flight out to the houseboat you sleep on."
        image="sonmarg"
        crumbs={[{ label: "Services" }]}
      />

      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="group flex h-full scroll-mt-24 flex-col rounded-2xl bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-cloud transition-colors duration-500 group-hover:bg-saffron group-hover:text-ink">
                    <Icon name={s.icon} size={24} aria-hidden />
                  </span>
                  <h2 className="mt-5 text-lg font-display font-semibold">{s.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{s.benefit}</p>
                  <Button href="/contact" variant="ghost" size="sm" className="mt-4 self-start px-0 hover:bg-transparent hover:text-saffron-deep">
                    Enquire <ArrowRight size={15} aria-hidden />
                  </Button>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
