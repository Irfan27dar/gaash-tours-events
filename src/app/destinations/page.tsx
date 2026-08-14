import type { Metadata } from "next";
import { destinations } from "@/data/destinations";
import { PageHeader } from "@/components/ui/PageHeader";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { RevealGroup, Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore the destinations Gaash covers — Kashmir, Ladakh, Rajasthan, Himachal, Amritsar and the hidden gems in between.",
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where to next"
        title="Destinations"
        intro="From the meadows of Kashmir to the deserts of Rajasthan — handpicked places, shown by local experts."
        image="dal-lake"
        crumbs={[{ label: "Destinations" }]}
      />
      <section className="bg-cloud py-16 lg:py-24">
        <div className="container">
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Reveal key={d.slug} className="h-full">
                <DestinationCard destination={d} className="h-full" />
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
