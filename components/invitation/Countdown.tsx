"use client";

import { useEffect, useMemo, useState } from "react";
import { getEventDateTime, type InvitationConfig } from "@/lib/invitation-config";
import { SectionReveal } from "@/components/invitation/SectionReveal";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(target: Date): Parts | null {
  const delta = target.getTime() - Date.now();
  if (delta <= 0) return null;
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta % 86_400_000) / 3_600_000),
    minutes: Math.floor((delta % 3_600_000) / 60_000),
    seconds: Math.floor((delta % 60_000) / 1000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[4.5rem] flex-col items-center">
      <span className="font-serif text-4xl text-deep-plum sm:text-5xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-burgundy">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ config }: { config: InvitationConfig }) {
  const target = useMemo(() => getEventDateTime(config).start, [config]);
  const [parts, setParts] = useState<Parts | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => {
      setParts(diffParts(target));
      setReady(true);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <SectionReveal className="text-center">
      <p className="mb-8 text-xs uppercase tracking-[0.32em] text-burgundy">
        Until we meet
      </p>
      {!ready ? (
        <div className="mx-auto flex max-w-lg items-start justify-center gap-5 sm:gap-8" aria-hidden>
          <Unit value={0} label="Days" />
          <Unit value={0} label="Hours" />
          <Unit value={0} label="Minutes" />
          <Unit value={0} label="Seconds" />
        </div>
      ) : parts ? (
        <div className="mx-auto flex max-w-lg items-start justify-center gap-5 sm:gap-8">
          <Unit value={parts.days} label="Days" />
          <Unit value={parts.hours} label="Hours" />
          <Unit value={parts.minutes} label="Minutes" />
          <Unit value={parts.seconds} label="Seconds" />
        </div>
      ) : (
        <p className="font-serif text-2xl italic text-deep-plum">
          The day has arrived. ❤️
        </p>
      )}
    </SectionReveal>
  );
}
