"use client";

import { useState } from "react";
import { copyText, shareInvitation, whatsappShareUrl } from "@/lib/share";
import type { InvitationConfig } from "@/lib/invitation-config";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";

export function ShareInvitation({ config }: { config: InvitationConfig }) {
  const [copied, setCopied] = useState(false);

  function getCurrentRoute() {
    if (typeof window === "undefined") return config.route;

    const pathname = window.location.pathname.replace(/\/$/, "") || "/";
    return pathname === "/wedding" || pathname === "/reception"
      ? pathname
      : config.route;
  }

  async function onShare() {
    const result = await shareInvitation(getCurrentRoute());
    if (result === "copied") {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  async function onCopy() {
    const route = getCurrentRoute();
    await copyText(typeof window === "undefined" ? route : `${window.location.origin}${route}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <SectionReveal className="text-center">
      <h2 className="font-serif text-3xl text-espresso">Share the Invitation</h2>
      <p className="mx-auto mt-3 max-w-md font-serif italic text-burgundy">
        Send this page to someone who should be with us.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button type="button" onClick={onShare}>
          Share
        </Button>
        <Button type="button" variant="outline" onClick={onCopy}>
          {copied ? "Link copied ✓" : "Copy Invitation Link"}
        </Button>
        <a href={whatsappShareUrl(getCurrentRoute())} target="_blank" rel="noopener noreferrer">
          <Button type="button" variant="outline">
            WhatsApp
          </Button>
        </a>
      </div>
    </SectionReveal>
  );
}
