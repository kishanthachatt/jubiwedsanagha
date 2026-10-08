"use client";

import { Music2, Pause, Volume2, VolumeX } from "lucide-react";
import type { useWeddingMusic } from "@/lib/use-wedding-music";

type MusicControls = ReturnType<typeof useWeddingMusic>;

export function MusicPlayer({
  visible,
  music,
}: {
  visible: boolean;
  music: MusicControls;
}) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-1 rounded-full border border-champagne bg-cream/90 p-1.5 shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={music.togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum"
        aria-label={music.isPlaying ? "Pause music" : "Play music"}
      >
        {music.isPlaying ? <Pause size={16} /> : <Music2 size={16} />}
      </button>
      <button
        type="button"
        onClick={music.toggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum"
        aria-label={music.isMuted ? "Unmute music" : "Mute music"}
      >
        {music.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}
