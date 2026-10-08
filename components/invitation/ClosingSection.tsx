"use client";

import { couple, site, type InvitationConfig } from "@/lib/invitation-config";
import { FloralCorner } from "@/components/invitation/FloralDecor";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function ClosingSection({ config }: { config: InvitationConfig }) {
  return (
    <SectionReveal className="overflow-hidden text-center">
      <FloralCorner className="absolute left-0 top-8 h-36 w-36 opacity-60" />
      <FloralCorner className="absolute bottom-8 right-0 h-36 w-36 opacity-60" mirrored />
      <p className="font-serif italic text-burgundy">With love,</p>
      <p className="mt-2 font-serif text-2xl text-espresso">{couple.displayEn}</p>
      <p className="mx-auto mt-6 max-w-sm text-espresso/80">{config.closingMessage}</p>
      <p className="mt-10 text-2xl text-dusty-rose" aria-hidden>
        ♥
      </p>
      <p className="mt-2 tracking-[0.4em] text-burgundy">{site.year}</p>
    </SectionReveal>
  );
}
