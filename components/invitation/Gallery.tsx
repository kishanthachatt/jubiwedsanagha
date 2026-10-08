"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { InvitationConfig } from "@/lib/invitation-config";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function Gallery({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState<number | null>(null);
  const [touchX, setTouchX] = useState<number | null>(null);
  const items = config.gallery;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + items.length - 1) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  return (
    <SectionReveal id="album" className="text-center">
      <p className="mb-10 text-xs uppercase tracking-[0.32em] text-burgundy">
        Our Moments
      </p>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 justify-center">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-2xl bg-champagne/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum ${
              i % 3 === 0 ? "md:row-span-2 min-h-56 md:min-h-80" : "min-h-40 md:min-h-52"
            }`}
            aria-label={`Open ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/90 p-4"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full p-3 text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              aria-label="Close gallery"
            >
              <X />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 rounded-full p-3 text-cream"
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-cream"
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>
            <motion.div
              className="relative h-[78vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => setTouchX(e.changedTouches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX === null) return;
                const dx = e.changedTouches[0].clientX - touchX;
                if (dx > 50) prev();
                if (dx < -50) next();
                setTouchX(null);
              }}
              initial={reduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Image
                src={items[index].src}
                alt={items[index].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionReveal>
  );
}
