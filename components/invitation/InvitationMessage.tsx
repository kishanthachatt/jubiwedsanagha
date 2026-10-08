"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { couple, type InvitationConfig } from "@/lib/invitation-config";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function InvitationMessage({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();
  
  return (
    <SectionReveal className="text-center">
      <div className="mx-auto max-w-2xl px-4">
        {/* Decorative Top */}
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-champagne" />
          <span className="text-champagne text-xl">✦</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Eyebrow Text */}
        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-burgundy/90 font-serif mb-8"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {config.invitationEyebrow}
        </motion.p>

        {/* Family Photo */}
        <motion.div
          className="relative mx-auto mb-4 aspect-video w-full max-w-xl overflow-hidden rounded-2xl shadow-[0_20px_50px_-30px_rgba(58,36,28,0.4)] border border-champagne/50"
          initial={reduce ? false : { opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <Image
            src="/images/family.jpeg"
            alt="Family blessing the couple"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          className="mx-auto my-3 h-px w-20 bg-gradient-to-r from-transparent via-champagne to-transparent"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
        />

        {/* Main Invitation Text */}
        <motion.p
          className="font-serif text-2xl leading-relaxed text-espresso sm:text-3xl"
          initial={reduce ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {config.invitationBody}
        </motion.p>
      </div>
    </SectionReveal>
  );
}
