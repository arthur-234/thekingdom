"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

export function HeroSection() {
  const [memberCount, setMemberCount] = React.useState<number | null>(null);
  const [presenceCount, setPresenceCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/discord/invite", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setMemberCount(data?.approximate_member_count ?? null);
          setPresenceCount(data?.approximate_presence_count ?? null);
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full min-h-svh bg-neutral-950 overflow-hidden">
      {/* ONLY SPARKS background */}
      <div className="pointer-events-none absolute inset-0">
        <SparklesCore
          id="tsparticles-home"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={140}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.25}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-24 md:py-32 mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-400"
        >
          The Kingdom — Comunidade de Games e Conversa
        </motion.h1>
        
        {/* Descrições removidas e movidas para a aba Sobre */}

        {/* Highlights */}
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {[
            "Salas de voz 24/7",
            "Eventos e campeonatos",
            "Squads e matchmaking",
            "Canais por jogo e off-topic",
            "Moderação presente e leve",
          ].map((item) => (
            <li
              key={item}
              className="text-xs md:text-sm text-neutral-200 rounded-full border border-white/10 bg-white/5 px-3 py-1"
            >
              {item}
            </li>
          ))}
        </motion.ul>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-2xl md:text-3xl font-semibold text-white">{memberCount ?? 279}</div>
            <div className="text-xs md:text-sm text-neutral-400">membros</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-2xl md:text-3xl font-semibold text-white">9</div>
            <div className="text-xs md:text-sm text-neutral-400">bots</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-2xl md:text-3xl font-semibold text-white">8</div>
            <div className="text-xs md:text-sm text-neutral-400">eventos</div>
          </div>
        </motion.div>

        {/* CTA: Entrar no Servidor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex items-center justify-center"
        >
          <a
            href="https://discord.gg/Af23qZRt4u"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white px-6 h-11 text-sm font-medium transition-colors shadow-lg shadow-emerald-600/20"
          >
            Entrar no Discord
          </a>
        </motion.div>
      </div>
    </div>
  );
}