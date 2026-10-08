"use client";

import { useState } from "react";
import { copyText } from "@/lib/share";
import type { InvitationConfig } from "@/lib/invitation-config";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function Hashtags({ config }: { config: InvitationConfig }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function onCopy(tag: string) {
    await copyText(tag);
    setCopied(tag);
    window.setTimeout(() => setCopied((current) => (current === tag ? null : current)), 1600);
  }

  return (
    <SectionReveal className="text-center">
      <p className="mb-8 text-xs uppercase tracking-[0.32em] text-burgundy">
        Celebrate with us
      </p>
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
        {config.hashtags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onCopy(tag)}
            className="rounded-full border border-champagne bg-cream/60 px-4 py-2 font-serif text-espresso transition hover:border-dusty-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum"
          >
            {copied === tag ? "Copied ✓" : tag}
          </button>
        ))}
      </div>
    </SectionReveal>
  );
}
