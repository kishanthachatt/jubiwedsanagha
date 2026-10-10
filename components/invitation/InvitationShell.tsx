"use client";

import { useEffect, useState } from "react";
import type { InvitationConfig } from "@/lib/invitation-config";
import { useWeddingMusic } from "@/lib/use-wedding-music";
import { CalendarButtons } from "@/components/invitation/CalendarButtons";
import { ClosingSection } from "@/components/invitation/ClosingSection";
import { Countdown } from "@/components/invitation/Countdown";
import { CoupleHero } from "@/components/invitation/CoupleHero";
import { EventDetails } from "@/components/invitation/EventDetails";
import { EventDetailsWithVenue } from "@/components/invitation/EventDetailsWithVenue";
import { Gallery } from "@/components/invitation/Gallery";
import { Guestbook } from "@/components/invitation/Guestbook";
import { Hashtags } from "@/components/invitation/Hashtags";
import { InvitationMessage } from "@/components/invitation/InvitationMessage";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { OpeningInvitation } from "@/components/invitation/OpeningInvitation";
import { ShareInvitation } from "@/components/invitation/ShareInvitation";
import { VenueSection } from "@/components/invitation/VenueSection";

export function InvitationShell({ config, receptionConfig }: { config: InvitationConfig; receptionConfig?: InvitationConfig }) {
  const [opened, setOpened] = useState(false);
  const music = useWeddingMusic(config.musicPath);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="relative min-h-dvh bg-ivory text-espresso">
      <OpeningInvitation
        config={config}
        open={opened}
        onOpen={() => {
          setOpened(true);
          void music.play();
        }}
      />
      <MusicPlayer visible={opened} music={music} />
      <main
        className={opened ? "pb-16" : "invisible h-0 overflow-hidden pb-16"}
        aria-hidden={!opened}
      >
        <CoupleHero config={config} />
        <Countdown config={config} />
        <InvitationMessage config={config} />
        {receptionConfig && (
          <>
            <EventDetailsWithVenue config={config} />
            <EventDetailsWithVenue config={receptionConfig} />
          </>
        )}
        {!receptionConfig && (
          <>
            <EventDetails config={config} />
            <VenueSection config={config} />
          </>
        )}
        <CalendarButtons config={config} />
        <Hashtags config={config} />
        <Guestbook config={config} />
        <ShareInvitation config={config} />
        <ClosingSection config={config} />
      </main>
    </div>
  );
}
