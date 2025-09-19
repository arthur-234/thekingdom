"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

export function BackgroundBoxes({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const boxes = useMemo(() => Array.from({ length: 160 }, (_, i) => i), []);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full min-h-svh bg-neutral-950 overflow-hidden",
        className
      )}
    >
      {/* Boxes grid */}
      <div className="pointer-events-none absolute inset-0 grid [grid-template-columns:repeat(20,minmax(0,1fr))] [grid-template-rows:repeat(8,minmax(0,1fr))]">
        {boxes.map((i) => {
          const isGreen = i % 3 === 0;
          const isRed = !isGreen && i % 3 === 1;
          const color = isGreen
            ? "shadow-[0_0_24px_-6px_rgba(34,197,94,0.45)] border-emerald-700/40 bg-emerald-900/10"
            : isRed
            ? "shadow-[0_0_24px_-6px_rgba(239,68,68,0.45)] border-rose-700/40 bg-rose-900/10"
            : "border-neutral-800/60 bg-neutral-900/10";
          const delay = (i % 12) * 0.1;
          return (
            <div
              key={i}
              className={cn(
                "border will-change-transform",
                color,
                "animate-[pulse_3s_ease-in-out_infinite]"
              )}
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}
      </div>

      {/* subtle glow overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.06),transparent_60%)]" />

      {/* content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}