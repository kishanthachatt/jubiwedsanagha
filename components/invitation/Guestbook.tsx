"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getSupabase, isSupabaseConfigured, type Wish } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/invitation/SectionReveal";
import type { InvitationConfig } from "@/lib/invitation-config";

const RATE_LIMIT_MS = 45_000;

export function Guestbook({ config }: { config: InvitationConfig }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const configured = isSupabaseConfigured();

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    supabase
      .from("wishes")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }) => {
        if (data) setWishes(data as Wish[]);
      });

    const channel = supabase
      .channel("wishes-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          setWishes((current) => [payload.new as Wish, ...current]);
        },
      )
      .subscribe();

    return () => {
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

      <div className="mx-auto mt-12 max-w-lg space-y-4">
        <AnimatePresence initial={false}>
          {wishes.map((wish) => (
            <motion.article
              key={wish.id}
              layout
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-champagne/70 bg-cream/50 px-5 py-4 text-left"
            >
              <p className="font-serif text-lg text-deep-plum">{wish.name}</p>
              <p className="mt-1 text-espresso/90">{wish.message}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}
