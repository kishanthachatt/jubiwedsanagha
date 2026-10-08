"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#event", label: "Event" },
  { href: "#venue", label: "Venue" },
  { href: "#album", label: "Album" },
  { href: "#wishes", label: "Wishes" },
];

export function FloatingNav({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed right-5 top-5 z-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne bg-cream/90 text-dusty-rose shadow-md backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum"
        aria-expanded={open}
        aria-label="Invitation menu"
      >
        <Heart size={18} fill="currentColor" />
      </button>
      <nav
        className={cn(
          "absolute right-0 mt-3 min-w-36 overflow-hidden rounded-2xl border border-champagne bg-cream/95 p-2 shadow-xl transition",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-2.5 text-sm tracking-wide text-espresso hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
