"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function Petal({ className, size = "base" }: { className?: string; size?: "sm" | "base" | "lg" }) {
  const sizeClasses = {
    sm: "h-6 w-5",
    base: "h-10 w-8",
    lg: "h-14 w-11",
  };
  return (
    <svg
      viewBox="0 0 48 64"
      className={cn("text-dusty-rose/40", sizeClasses[size], className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 2C16 14 6 26 8 40c2 12 10 20 16 22 6-2 14-10 16-22 2-14-8-26-16-38Z" />
    </svg>
  );
}

export function FloralCorner({
  className,
  mirrored,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={cn("pointer-events-none text-champagne", className, mirrored && "-scale-x-100")}
      fill="none"
      aria-hidden
    >
      <path
        d="M20 200C40 140 70 110 130 90"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M48 168c18-8 32-4 42 10M86 124c20-14 44-10 58 8"
        stroke="#C07A67"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="132" cy="88" r="7" fill="#C07A67" opacity="0.45" />
      <circle cx="108" cy="118" r="4" fill="#5A3158" opacity="0.35" />
      <circle cx="58" cy="172" r="5" fill="#D39A88" opacity="0.55" />
    </svg>
  );
}

export function FloatingPetals() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const petals = [
    { left: "5%", delay: 0, duration: 14, size: "base" as const, xSwing: 30 },
    { left: "15%", delay: 2.5, duration: 16, size: "sm" as const, xSwing: 45 },
    { left: "25%", delay: 1, duration: 13, size: "lg" as const, xSwing: 25 },
    { left: "35%", delay: 4, duration: 18, size: "base" as const, xSwing: 40 },
    { left: "45%", delay: 0.5, duration: 15, size: "sm" as const, xSwing: 35 },
    { left: "55%", delay: 3, duration: 17, size: "base" as const, xSwing: 28 },
    { left: "65%", delay: 1.5, duration: 14, size: "lg" as const, xSwing: 38 },
    { left: "75%", delay: 2, duration: 16, size: "sm" as const, xSwing: 42 },
    { left: "85%", delay: 3.5, duration: 18, size: "base" as const, xSwing: 32 },
    { left: "92%", delay: 0.8, duration: 15, size: "lg" as const, xSwing: 48 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute top-[-10%]"
          style={{ left: petal.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.xSwing, -petal.xSwing, petal.xSwing / 2, 0],
            rotate: [0, 40, -20, 50, -10, 30],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Petal size={petal.size} />
        </motion.div>
      ))}
    </div>
  );
}

export function SparkleParticles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-champagne/60"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 48"
      className={cn("h-8 w-6 text-green-700/30", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M16 2C10 12 4 22 6 34c1 8 6 12 10 14 4-2 9-6 10-14 2-12-4-22-10-32Z" />
      <path
        d="M16 2v46"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
}

export function FallingLeaves() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const leaves = [
    { left: "12%", delay: 1, duration: 18, xSwing: 20 },
    { left: "38%", delay: 3, duration: 20, xSwing: 35 },
    { left: "62%", delay: 2, duration: 16, xSwing: 25 },
    { left: "88%", delay: 4, duration: 19, xSwing: 30 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute top-[-10%]"
          style={{ left: leaf.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, leaf.xSwing, -leaf.xSwing, leaf.xSwing / 2, 0],
            rotate: [0, 60, -30, 45, -15, 30],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Leaf />
        </motion.div>
      ))}
    </div>
  );
}
