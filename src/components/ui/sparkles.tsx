"use client";
import React, { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 0.3,
  particleColor = "#FFFFFF",
  particleDensity = 100,
}: SparklesProps) => {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async () => {
    await controls.start({ opacity: 1, transition: { duration: 0.8 } });
  };

  const options: ISourceOptions = {
    background: { color: { value: background } },
    fullScreen: { enable: false, zIndex: 0 },
    fpsLimit: 90,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: false, mode: "repulse" },
        onClick: { enable: false, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        push: { quantity: 2 },
        repulse: { distance: 200, duration: 0.4 },
      },
    },
    particles: {
      number: {
        value: particleDensity,
        density: { enable: true },
      },
      color: { value: particleColor },
      opacity: { value: 0.7 },
      shape: { type: "circle" },
      size: { value: { min: minSize, max: maxSize } },
      move: {
        enable: true,
        speed,
        direction: "none",
        outModes: { default: "out" },
        random: false,
        straight: false,
      },
    },
  };

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </motion.div>
  );
};