"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <Section className="bg-cloud-deep">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Loved by travellers"
          title="Stories from the road"
          intro="Real words from travellers who trusted us with their journey."
        />
        <div className="flex gap-2">
          <button
            aria-label="Previous testimonial"
            onClick={() => embla?.scrollPrev()}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition-colors hover:bg-ink hover:text-cloud"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => embla?.scrollNext()}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white transition-colors hover:bg-ink hover:text-cloud"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex min-w-0 shrink-0 grow-0 basis-full flex-col rounded-2xl bg-white p-8 shadow-soft sm:basis-1/2 lg:basis-1/3"
            >
              <Quote size={32} className="text-saffron" aria-hidden />
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-saffron text-saffron" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-ink/80">“{t.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-display font-semibold">{t.name}</p>
                <p className="text-sm text-ink/55">
                  {t.location} · {t.trip}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === selected ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/40"
            )}
          />
        ))}
      </div>
    </Section>
  );
}
