"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import {
  formatEventDate,
  formatTimeRange,
  type InvitationConfig,
} from "@/lib/invitation-config";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function EventDetails({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();
  
  return (
    <SectionReveal id="event" className="text-center">
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
          <CalendarHeart className="text-dusty-rose" size={20} aria-hidden />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Title */}
        <motion.p
          className="text-xs uppercase tracking-[0.35em] text-burgundy/90 font-serif mb-8"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {config.title}
        </motion.p>

        {/* Main Card */}
        <motion.div
          className="rounded-[2.5rem] border border-champagne/70 bg-gradient-to-br from-cream/60 via-cream/40 to-champagne/20 px-8 py-12 sm:px-12 sm:py-14 backdrop-blur-sm shadow-[0_20px_50px_-30px_rgba(58,36,28,0.3)]"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Date Section */}
          <motion.div
            className="mb-10 pb-10 border-b border-champagne/40"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-burgundy/70 font-serif mb-3">Date</p>
            <h2 className="font-serif text-5xl sm:text-6xl text-deep-plum font-bold">Sunday</h2>
            <p className="mt-3 font-serif text-lg sm:text-xl text-espresso font-medium">01 November 2026</p>
          </motion.div>

          {/* Time Section */}
          <motion.div
            className="mb-10 pb-10 border-b border-champagne/40"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-burgundy" />
              <p className="text-xs uppercase tracking-[0.25em] text-burgundy/70 font-serif">Time</p>
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-deep-plum font-semibold">{formatTimeRange(config)}</p>
          </motion.div>

          {/* Venue Section */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-burgundy" />
              <p className="text-xs uppercase tracking-[0.25em] text-burgundy/70 font-serif">Venue</p>
            </div>
            <p className="font-serif text-2xl sm:text-3xl text-deep-plum font-semibold">{config.venue}</p>
            <p className="mt-2 text-burgundy/80 text-base">{config.location}</p>
          </motion.div>
        </motion.div>
      </div>
      <p className="sr-only">{formatEventDate()}</p>
    </SectionReveal>
  );
}
