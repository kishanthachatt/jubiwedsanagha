"use client";

import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import type { InvitationConfig } from "@/lib/invitation-config";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function CalendarButtons({ config }: { config: InvitationConfig }) {
  return (
    <SectionReveal className="text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.32em] text-burgundy">
        Add to Calendar
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={googleCalendarUrl(config)} target="_blank" rel="noopener noreferrer">
          <Button type="button" variant="outline">
            Google Calendar
          </Button>
        </a>
        <Button type="button" variant="outline" onClick={() => downloadIcs(config)}>
          Apple Calendar
        </Button>
      </div>
    </SectionReveal>
  );
}
