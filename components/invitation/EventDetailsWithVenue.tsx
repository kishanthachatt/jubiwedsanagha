"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import { formatTimeRange, type InvitationConfig } from "@/lib/invitation-config";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function EventDetailsWithVenue({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();
  const eventDate = new Date(`${config.date}T12:00:00+05:30`);
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(eventDate);
  const mapQuery = encodeURIComponent(`${config.venue}, ${config.location}`);

  return (
    <SectionReveal
      id={`${config.type}-event`}
      className="text-center"
    >
      <div className="mx-auto max-w-2xl px-4">
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

        <motion.p
          className="mb-8 font-serif text-xs uppercase tracking-[0.35em] text-burgundy/90"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {config.title}
        </motion.p>

        <motion.div
          className="rounded-[2.5rem] border border-champagne/70 bg-gradient-to-br from-cream/60 via-cream/40 to-champagne/20 px-8 py-12 shadow-[0_20px_50px_-30px_rgba(58,36,28,0.3)] backdrop-blur-sm sm:px-12 sm:py-14"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="mb-10 border-b border-champagne/40 pb-10">
            <p className="mb-3 font-serif text-xs uppercase tracking-[0.25em] text-burgundy/70">Date</p>
            <h2 className="font-serif text-4xl font-bold text-deep-plum sm:text-5xl">{formattedDate}</h2>
          </div>

          <div className="mb-10 border-b border-champagne/40 pb-10">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-burgundy" aria-hidden />
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-burgundy/70">Time</p>
            </div>
            <p className="font-serif text-2xl font-semibold text-deep-plum sm:text-3xl">
              {formatTimeRange(config)}
            </p>
          </div>

          <div className="mb-10 border-b border-champagne/40 pb-10">
            <div className="mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-burgundy" aria-hidden />
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-burgundy/70">Venue</p>
            </div>
            <p className="font-serif text-2xl font-semibold text-deep-plum sm:text-3xl">{config.venue}</p>
            <p className="mt-2 text-base text-burgundy/80">{config.location}</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-champagne/30 shadow-[0_10px_30px_-20px_rgba(58,36,28,0.3)]">
            <iframe
              title={`Map to ${config.venue}`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          <motion.div
            className="mt-8"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a href={config.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button
                type="button"
                className="relative overflow-hidden border-2 border-burgundy/50 bg-gradient-to-br from-[#8b6f47]/40 to-[#5a4a2f]/40 px-10 py-4 text-deep-plum backdrop-blur-sm transition-all duration-300 hover:border-dusty-rose hover:bg-gradient-to-br hover:from-[#8b6f47]/60 hover:to-[#5a4a2f]/60"
              >
                <motion.span
                  className="relative z-10 font-serif text-sm tracking-[0.15em] sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </motion.span>
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
