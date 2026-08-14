import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { PackagesExplorer } from "@/components/sections/PackagesExplorer";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Browse Gaash tour packages across Kashmir, Ladakh, Rajasthan, Himachal and Amritsar — with day-by-day itineraries and transparent pricing.",
};

export default function PackagesPage({
  searchParams,
}: {
  searchParams: { region?: string };
}) {
  return (
    <>
      <PageHeader
        eyebrow="Real trips, real value"
        title="Tour packages"
        intro="Curated itineraries across the Himalayas and beyond — filter to find your journey."
        image="gulmarg"
        crumbs={[{ label: "Packages" }]}
      />
      <section className="bg-cloud pb-20 pt-6">
        <div className="container">
          <PackagesExplorer initialRegion={searchParams.region ?? "All"} />
        </div>
      </section>
    </>
  );
}
