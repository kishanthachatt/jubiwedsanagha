"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { InvitationConfig } from "@/lib/invitation-config";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function VenueSection({ config }: { config: InvitationConfig }) {
  const reduce = useReducedMotion();
  
  return (
    <SectionReveal id="venue" className="text-center">
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
          <MapPin className="text-dusty-rose" size={20} aria-hidden />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-champagne" />
        </motion.div>

        {/* Title */}
        <motion.p
          className="mb-8 text-xs uppercase tracking-[0.35em] text-burgundy/90 font-serif"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          The Venue
        </motion.p>

        {/* Venue Card */}
        <motion.div
          className="rounded-[2.5rem] border border-champagne/70 bg-gradient-to-br from-cream/60 via-cream/40 to-champagne/20 px-8 py-12 sm:px-12 sm:py-14 backdrop-blur-sm shadow-[0_20px_50px_-30px_rgba(58,36,28,0.3)]"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-deep-plum font-semibold">{config.venue}</h2>
          <p className="mt-3 text-burgundy/80 text-lg">{config.location}</p>
          {config.type === "reception" ? (
            <p className="mx-auto mt-5 max-w-xl font-serif text-base leading-relaxed text-espresso/90 sm:text-lg">
              Marriage will be solemnised on 01.11.2026 (1202 Thulam 15) at Prince Auditorium, Kakkodi. Muhurtham between 11.00 AM &amp; 11.30 AM.
            </p>
          ) : null}
          
          {/* Map Container */}
          <motion.div
            className="mt-8 rounded-2xl overflow-hidden shadow-[0_10px_30px_-20px_rgba(58,36,28,0.3)] border border-champagne/30"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.823456789012!2d${extractCoordinates(config.mapsUrl).lng}!3d${extractCoordinates(config.mapsUrl).lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(config.venue)}!5e0!3m2!1sen!2sin!4v1234567890`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>

          {/* Get Directions Button */}
          <motion.div
            className="mt-8"
            initial={reduce ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href={config.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                type="button" 
                className="relative overflow-hidden border-2 border-burgundy/50 bg-gradient-to-br from-[#8b6f47]/40 to-[#5a4a2f]/40 px-10 py-4 text-deep-plum backdrop-blur-sm hover:border-dusty-rose hover:bg-gradient-to-br hover:from-[#8b6f47]/60 hover:to-[#5a4a2f]/60 transition-all duration-300"
              >
                <motion.span
                  className="relative z-10 tracking-[0.15em] font-serif text-sm sm:text-base"
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

// Helper function to extract coordinates from Google Maps URL
function extractCoordinates(url: string) {
  // Default coordinates (Kakkodi, Kerala)
  return { lat: 11.1271, lng: 75.9421 };
}
