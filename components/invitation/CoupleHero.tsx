"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { couple, type InvitationConfig } from "@/lib/invitation-config";
import { FloralCorner } from "@/components/invitation/FloralDecor";

export function CoupleHero({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-[88dvh] w-full max-w-6xl flex-col items-center justify-center gap-8 px-5 py-16 sm:px-8 lg:py-24"
    >
      <FloralCorner className="absolute left-0 top-8 hidden h-40 w-40 opacity-70 lg:block" />
      <div className="relative z-10 text-center">
        {/* Opening - We are getting married */}
        <motion.p
          className="mb-4 tracking-[0.35em] text-xs uppercase text-burgundy/80"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          We are getting married
        </motion.p>

        {/* Cute quote */}
        <motion.p
          className="mb-8 font-serif text-lg sm:text-2xl italic text-dusty-rose"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Two souls, one heart, forever intertwined
        </motion.p>

        {/* Names */}
        <motion.h1
          className="font-serif text-4xl font-bold leading-tight text-deep-plum sm:text-5xl lg:text-6xl mb-6"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {couple.displayEn}
        </motion.h1>

        {/* Hero tagline */}
        <motion.p
          className="mx-auto max-w-md font-serif text-lg italic text-burgundy/90"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          {config.heroLine}
        </motion.p>
      </div>

      {/* Couple Photo */}
      <motion.div
        className="relative mx-auto aspect-[3/4] w-full max-w-md"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 1 }}
      >
        <div className="absolute -inset-3 rounded-[2rem] border border-champagne/70" />
        <Image
          src={config.coupleIllustration}
          alt={`Illustrated portrait of ${couple.displayEn}`}
          fill
          className="rounded-[1.6rem] object-cover object-top shadow-[0_30px_80px_-40px_rgba(58,36,28,0.7)]"
          sizes="(max-width: 1024px) 90vw, 420px"
          priority
        />
      </motion.div>
    </section>
  );
}
