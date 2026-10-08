"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useWeddingMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.32;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onReady = () => setAvailable(true);
    const onError = () => setAvailable(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("error", onError);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.currentTime = 47;
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  return { available, isPlaying, isMuted, play, pause, togglePlay, toggleMute };
}
