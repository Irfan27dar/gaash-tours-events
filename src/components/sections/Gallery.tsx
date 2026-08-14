"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { img, type ImageKey } from "@/lib/images";
import { Section, SectionHeading } from "@/components/ui/Section";

const shots: { key: ImageKey; label: string; span: string }[] = [
  { key: "dal-lake", label: "Dal Lake, Srinagar", span: "sm:col-span-2 sm:row-span-2" },
  { key: "gulmarg", label: "Gulmarg meadows", span: "" },
  { key: "ladakh", label: "Pangong Tso, Ladakh", span: "" },
  { key: "rajasthan", label: "Udaipur, Rajasthan", span: "sm:col-span-2" },
  { key: "pahalgam", label: "Pahalgam valley", span: "" },
  { key: "amritsar", label: "Golden Temple, Amritsar", span: "" },
  { key: "himachal", label: "Manali, Himachal", span: "" },
  { key: "sonmarg", label: "Sonmarg", span: "" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + shots.length) % shots.length)), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % shots.length)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  return (
    <Section className="bg-cloud">
      <SectionHeading
        eyebrow="Straight from the valley"
        title="Moments on tour"
        intro="A glimpse of the places we'll take you — tap any photo to explore."
        align="center"
      />

      <div className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[13rem]">
        {shots.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-xl ${s.span}`}
            aria-label={`View ${s.label}`}
          >
            <Image
              src={img(s.key)}
              alt={s.label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              placeholder="blur"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 text-sm font-medium text-cloud opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button className="absolute right-5 top-5 text-cloud/80 hover:text-cloud" onClick={close} aria-label="Close">
              <X size={28} />
            </button>
            <button
              className="absolute left-4 text-cloud/80 hover:text-cloud sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.figure
              key={open}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[82vh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={img(shots[open].key)}
                alt={shots[open].label}
                placeholder="blur"
                className="h-auto w-full object-contain"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5 text-cloud">
                {shots[open].label}
              </figcaption>
            </motion.figure>
            <button
              className="absolute right-4 text-cloud/80 hover:text-cloud sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
