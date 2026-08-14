import { PageHeader } from "./PageHeader";
import { Button } from "./Button";
import type { ImageKey } from "@/lib/images";

/** Temporary placeholder for pages arriving in the next build phase. */
export function ComingSoon({
  title,
  eyebrow,
  crumb,
  image,
  note,
}: {
  title: string;
  eyebrow: string;
  crumb: string;
  image: ImageKey;
  note: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={note} image={image} crumbs={[{ label: crumb }]} />
      <section className="bg-cloud py-20">
        <div className="container max-w-xl text-center">
          <p className="text-lead text-ink/70">
            This page is being crafted in the next phase of the build. In the meantime, tell us what
            you&apos;re looking for and we&apos;ll help directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Plan my trip</Button>
            <Button href="/" variant="outline">
              Back home
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
