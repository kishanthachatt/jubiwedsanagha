"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { couple, type InvitationConfig } from "@/lib/invitation-config";
import { Button } from "@/components/ui/button";

export function OpeningInvitation({
  config,
  open,
  onOpen,
}: {
  config: InvitationConfig;
  open: boolean;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {!open ? (
        <motion.div
          key="cover"
          role="dialog"
          aria-label="Wedding invitation cover"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          <Image
            src="/images/b&w-couple.jpeg"
            alt="Wedding background"
            fill
            className="absolute inset-0 object-cover"
            priority
            sizes="100vw"
          />
          
          {/* Multi-layer overlay for elegance and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0804]/85 via-[#0a0804]/55 to-[#0a0804]/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#3c2416]/30 to-[#1a0f0a]/40" />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />

          <motion.div
            className="relative z-10 mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center px-6 py-8 text-center"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative top accent */}
            <motion.p
              aria-hidden
              className="mb-6 flex items-center justify-center gap-3 text-champagne"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-champagne" />
              <span className="text-xl">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-champagne" />
            </motion.p>

            {/* Names */}
            <motion.div
              className="relative font-malayalam text-[2.5rem] font-bold leading-[1.2] text-champagne sm:text-6xl"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div>
                <p>{couple.groomMl}</p>
                <p className="my-2 flex items-center justify-center gap-4 font-serif text-2xl italic text-dusty-rose sm:text-3xl">
                  <span aria-hidden className="h-px w-8 bg-dusty-rose" />&<span aria-hidden className="h-px w-8 bg-dusty-rose" />
                </p>
                <p>{couple.brideMl}</p>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="relative mt-8 mb-12 font-serif text-lg italic text-champagne/90 sm:text-xl"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {config.openingLine}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                type="button"
                onClick={onOpen}
                className="relative overflow-hidden border border-champagne/70 bg-champagne/5 px-8 py-4 text-champagne backdrop-blur-sm hover:border-dusty-rose hover:bg-champagne/15"
              >
                <motion.span
                  className="relative z-10 tracking-[0.15em]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Invitation
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            {/* Decorative bottom accent */}
            <motion.p
              aria-hidden
              className="absolute bottom-16 flex items-center justify-center gap-3 text-champagne/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="h-px w-8 bg-champagne/30" />
              <span className="text-sm">✦</span>
              <span className="h-px w-8 bg-champagne/30" />
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
