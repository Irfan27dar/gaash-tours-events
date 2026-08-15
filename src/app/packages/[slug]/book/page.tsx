import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackage } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookingFlow } from "@/components/sections/BookingFlow";

export const metadata: Metadata = {
  title: "Book your trip",
  robots: { index: false, follow: true },
};

export const revalidate = 60;

export default async function BookPage({ params }: { params: { slug: string } }) {
  const pkg = await getPackage(params.slug);
  if (!pkg) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Secure booking"
        title={`Book: ${pkg.title}`}
        intro="A few details and you're set — a travel expert confirms everything after payment."
        image={pkg.image}
        crumbs={[
          { label: "Packages", href: "/packages" },
          { label: pkg.title, href: `/packages/${pkg.slug}` },
          { label: "Book" },
        ]}
      />
      <section className="bg-cloud py-14 lg:py-20">
        <div className="container">
          <BookingFlow
            pkg={{
              slug: pkg.slug,
              title: pkg.title,
              image: pkg.image,
              route: pkg.route,
              durationLabel: pkg.durationLabel,
              price: pkg.price,
            }}
          />
        </div>
      </section>
    </>
  );
}
