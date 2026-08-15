import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeaturedPackage } from "@/components/sections/FeaturedPackage";
import { TopDestinations } from "@/components/sections/TopDestinations";
import { PopularPackages } from "@/components/sections/PopularPackages";
import { Activities } from "@/components/sections/Activities";
import { WhyGaash } from "@/components/sections/WhyGaash";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { EventsBand } from "@/components/sections/EventsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { CTABand } from "@/components/sections/CTABand";
import { Newsletter } from "@/components/sections/Newsletter";
import {
  getPackages,
  getBestsellerPackage,
  getFeaturedDestinations,
  getActivities,
  getServices,
  getEventTypes,
  getTestimonials,
} from "@/lib/content";

// Rebuild at most once a minute so admin edits go live without a redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const [packages, bestseller, destinations, activities, services, eventTypes, testimonials] =
    await Promise.all([
      getPackages(),
      getBestsellerPackage(),
      getFeaturedDestinations(),
      getActivities(),
      getServices(),
      getEventTypes(),
      getTestimonials(),
    ]);
  return (
    <>
      {/* 1 Header (in layout) → 2 Hero → 3 Trust → 4 Featured → 5 Destinations
          → 6 Packages → 7 Activities → 8 Why → 9 Services → 10 Events
          → 11 Testimonials → 12 Gallery → 13 CTA → 14 Newsletter → 15 Footer */}
      <Hero />
      <TrustStrip />
      <FeaturedPackage pkg={bestseller} />
      <TopDestinations destinations={destinations} />
      <PopularPackages packages={packages} />
      <Activities activities={activities} />
      <WhyGaash />
      <ServicesOverview services={services} />
      <EventsBand eventTypes={eventTypes} />
      <Testimonials testimonials={testimonials} />
      <Gallery />
      <CTABand />
      <Newsletter />
    </>
  );
}
