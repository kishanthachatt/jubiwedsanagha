"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSupabase, isSupabaseConfigured, type Wish } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";
import type { InvitationConfig } from "@/lib/invitation-config";

const RATE_LIMIT_MS = 45_000;
const WISHES_PAGE_SIZE = 1000;
const WISHES_PER_SLIDE = 3;

export function Guestbook({ config }: { config: InvitationConfig }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();
  const slideCount = Math.ceil(wishes.length / WISHES_PER_SLIDE);
  const activeSlide = Math.min(currentSlide, Math.max(slideCount - 1, 0));
  const visibleWishes = wishes.slice(
    activeSlide * WISHES_PER_SLIDE,
    (activeSlide + 1) * WISHES_PER_SLIDE,
  );

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    let active = true;

    async function loadAllWishes() {
      const allWishes: Wish[] = [];
      let from = 0;

      while (true) {
        const { data, error: fetchError } = await supabase
          .from("wishes")
          .select("id, name, message, created_at")
          .order("created_at", { ascending: false })
          .range(from, from + WISHES_PAGE_SIZE - 1);

        if (fetchError || !data) {
          if (active) setLoadError(true);
          return;
        }

        allWishes.push(...(data as Wish[]));
        if (data.length < WISHES_PAGE_SIZE) break;
        from += WISHES_PAGE_SIZE;
      }

      if (active) {
        setWishes((current) => {
          const byId = new Map(allWishes.map((wish) => [wish.id, wish]));
          for (const wish of current) byId.set(wish.id, wish);
          return [...byId.values()].sort(
            (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
          );
        });
      }
    }

    void loadAllWishes();

    const channel = supabase
      .channel("wishes-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((current) =>
            current.some((wish) => wish.id === newWish.id)
              ? current
              : [newWish, ...current],
          );
        },
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 80) {
      setError("Please add your name.");
      return;
    }
    if (trimmedMessage.length < 3 || trimmedMessage.length > 500) {
      setError("Please write a short wish.");
      return;
    }

    if (honeypot) {
      setStatus("success");
      setName("");
      setMessage("");
      return;
    }

    const last = Number(sessionStorage.getItem("wish-last-submit") ?? "0");
    if (Date.now() - last < RATE_LIMIT_MS) {
      setError("Please wait a moment before sending another wish.");
      return;
    }

    if (!configured) {
      setError("Guestbook will go live once the database is connected.");
      return;
    }

    setStatus("saving");
    const supabase = getSupabase();
    const { error: insertError } = await supabase!.from("wishes").insert({
      name: trimmedName,
      message: trimmedMessage,
    });

    if (insertError) {
      setStatus("error");
      setError("We could not send that just now. Please try again.");
      return;
    }

    sessionStorage.setItem("wish-last-submit", String(Date.now()));
    setName("");
    setMessage("");
    setStatus("success");
  }

  return (
    <SectionReveal id="wishes" className="text-center">
      <h2 className="font-serif text-3xl text-espresso">{config.guestbookTitle}</h2>

      <form
        onSubmit={onSubmit}
        className="relative mx-auto mt-10 max-w-md space-y-4 text-left"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-burgundy">
            Your Name *
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
            className="w-full rounded-2xl border border-champagne bg-cream/70 px-4 py-3 text-espresso outline-none ring-plum/30 focus:ring-2"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-burgundy">
            Your Wishes *
          </span>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={4}
            className="w-full resize-none rounded-2xl border border-champagne bg-cream/70 px-4 py-3 text-espresso outline-none ring-plum/30 focus:ring-2"
          />
        </label>
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Website
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>
        {error ? (
          <p className="text-sm text-deep-rose" role="alert">
            {error}
          </p>
        ) : null}
        {status === "success" ? (
          <p className="text-sm text-plum" role="status">
            Thank you for your lovely wishes ❤️
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={status === "saving"}>
          {status === "saving" ? "Sending…" : "Send Wishes"}
        </Button>
      </form>

      <section
        aria-labelledby="all-wishes-heading"
        className="mx-auto mt-14 max-w-2xl border-t border-champagne/60 pt-10"
      >
        <h3 id="all-wishes-heading" className="font-serif text-2xl text-deep-plum">
          All Wishes
        </h3>
        <p className="mt-2 text-sm text-burgundy/80">
          {wishes.length} {wishes.length === 1 ? "wish" : "wishes"} shared by family and friends
        </p>
        {loadError ? (
          <p className="mt-6 text-sm text-deep-rose" role="status">
            Wishes could not be loaded. Please refresh to try again.
          </p>
        ) : null}
        {wishes.length > 0 ? (
          <>
            <div className="mt-6 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlide}
                  className="grid gap-4 md:grid-cols-3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  aria-live="polite"
                >
                  {visibleWishes.map((wish) => (
                    <motion.article
                      key={wish.id}
                      className="h-full rounded-2xl border border-champagne/70 bg-cream/50 px-5 py-4 text-left"
                    >
                      <p className="font-serif text-lg text-deep-plum">{wish.name}</p>
                      <p className="mt-1 text-espresso/90">{wish.message}</p>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {slideCount > 1 ? (
              <div className="mt-6 flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Previous wishes"
                  onClick={() => setCurrentSlide((slide) => (slide - 1 + slideCount) % slideCount)}
                >
                  <ChevronLeft aria-hidden />
                </Button>
                <span className="min-w-20 text-sm text-burgundy/80" aria-live="polite">
                  {activeSlide + 1} / {slideCount}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Next wishes"
                  onClick={() => setCurrentSlide((slide) => (slide + 1) % slideCount)}
                >
                  <ChevronRight aria-hidden />
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <p className="mt-6 text-sm text-burgundy/70">Be the first to share a wish.</p>
        )}
      </section>
    </SectionReveal>
  );
}
