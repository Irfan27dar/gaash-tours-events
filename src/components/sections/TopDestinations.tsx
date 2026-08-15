import type { Destination } from "@/data/destinations";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function TopDestinations({ destinations }: { destinations: Destination[] }) {
  const [first, ...rest] = destinations;
  if (!first) return null;
  return (
    <Section id="destinations" className="bg-cloud">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Where to next"
          title="Top destinations"
          intro="From the meadows of Kashmir to the deserts of Rajasthan — handpicked places our travellers love most."
        />
        <Reveal>
          <Button href="/destinations" variant="outline">
            All destinations
          </Button>
        </Reveal>
      </div>

      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature the first destination across two columns on large screens */}
        <Reveal className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <DestinationCard destination={first} size="lg" className="h-full" />
        </Reveal>
        {rest.map((d) => (
          <Reveal key={d.slug} className="h-full">
            <DestinationCard destination={d} className="h-full" />
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
