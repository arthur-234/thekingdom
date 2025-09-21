"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface CometCardProps {
  rotateDepth?: number; // intensidade da inclinação em graus
  translateDepth?: number; // deslocamento do card (px)
  className?: string;
  children: React.ReactNode;
}

export const CometCard: React.FC<CometCardProps> = ({
  rotateDepth = 12,
  translateDepth = 18,
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const lastPointer = useRef({ x: 0, y: 0 });

  // Motion values + springs para suavizar
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 170, damping: 19, mass: 0.42 });
  const my = useSpring(y, { stiffness: 170, damping: 19, mass: 0.42 });

  // Rotação/Translação do card (camada base)
  const rotateX = useTransform(my, [-0.5, 0.5], [rotateDepth, -rotateDepth]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-rotateDepth, rotateDepth]);
  const cardX = useTransform(mx, [-0.5, 0.5], [-translateDepth, translateDepth]);
  const cardY = useTransform(my, [-0.5, 0.5], [translateDepth, -translateDepth]);

  // Parallax interno (conteúdo) - movimento adicional para dar profundidade
  const contentX = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const contentY = useTransform(my, [-0.5, 0.5], [8, -8]);

  // Profundidade do conteúdo em translateZ baseada na distância do centro
  const contentZ = useTransform([mx, my], (values: number[]) => {
    const [vx, vy] = values;
    const dist = Math.min(1, Math.hypot(vx, vy) / 0.6); // 0..1
    const t = 1 - dist; // centro -> 1, borda -> 0
    return 32 * t; // até ~32px de profundidade
  });

  // Glare leve animado por transform (performático)
  const glareX = useTransform(mx, [-0.5, 0.5], ["-18%", "18%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["18%", "-18%"]);

  // Backlight dinâmico atrás do card (contramovimento) para reforçar 3D
  const backlightX = useTransform(mx, [-0.5, 0.5], [10, -10]);
  const backlightY = useTransform(my, [-0.5, 0.5], [-10, 10]);

  const onMouseEnter = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    boundsRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    lastPointer.current.x = e.clientX;
    lastPointer.current.y = e.clientY;

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        const { left, top, width, height } = boundsRef.current;
        const mouseX = lastPointer.current.x - left;
        const mouseY = lastPointer.current.y - top;
        // normaliza para -0.5..0.5
        const nx = mouseX / width - 0.5;
        const ny = mouseY / height - 0.5;
        x.set(nx);
        y.set(ny);
        rafRef.current = null;
      });
    }
  };

  const onMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <div className={cn("[perspective:1100px]", className)}>
      <motion.div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          x: cardX,
          y: cardY,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.035, transition: { duration: 0.16, ease: "easeOut" } }}
        className={cn(
          "relative rounded-2xl transform-gpu shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
          "transition-transform duration-150 ease-out"
        )}
      >
        {/* Backlight sutil por trás (reforça profundidade) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
          style={{
            x: backlightX,
            y: backlightY,
            background:
              "radial-gradient(closest-side, rgba(16,185,129,0.35), rgba(16,185,129,0.08) 55%, rgba(0,0,0,0) 75%)",
            filter: "blur(18px)",
            opacity: 0.35,
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Conteúdo em camada com parallax + depth */}
        <motion.div
          className="relative z-[2] rounded-2xl"
          style={{
            x: contentX,
            y: contentY,
            z: contentZ, // translateZ
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>

        {/* Glare sobreposto */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute h-[180%] w-[180%] -left-1/3 -top-1/3 rounded-full"
            style={{
              x: glareX,
              y: glareY,
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.35), rgba(255,255,255,0.15) 45%, rgba(255,255,255,0) 70%)",
              filter: "blur(12px)",
              opacity: 0.25,
              willChange: "transform",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};