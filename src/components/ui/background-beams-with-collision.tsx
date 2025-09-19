"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {children}
      <CollisionMechanism
        beamOptions={{
          initialX: -400,
          translateX: 400,
          duration: 7,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: -200,
          translateX: 200,
          duration: 3,
          repeatDelay: 3,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 200,
          translateX: -200,
          duration: 7,
          repeatDelay: 5,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 400,
          translateX: -400,
          duration: 5,
          repeatDelay: 2,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 0,
          translateX: 200,
          duration: 4,
          repeatDelay: 4,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />
      <CollisionMechanism
        beamOptions={{
          initialX: 600,
          translateX: -600,
          duration: 6,
          repeatDelay: 1,
        }}
        containerRef={containerRef}
        parentRef={parentRef}
      />

      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const {
    initialX = 0,
    translateX = 0,
    initialY = 0,
    translateY = 0,
    rotate = 0,
    className,
    duration = 2,
    delay = 0,
    repeatDelay = 0,
  } = beamOptions;

  useEffect(() => {
    const animateBeam = () => {
      if (beamRef.current) {
        beamRef.current.style.setProperty(
          "transform",
          `translate(${initialX}px, ${initialY}px) rotate(${rotate}deg)`
        );
        beamRef.current.style.setProperty("opacity", "1");

        const keyframes = [
          {
            transform: `translate(${initialX}px, ${initialY}px) rotate(${rotate}deg)`,
          },
          {
            transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
          },
        ];

        if (beamRef.current) {
          beamRef.current.animate(keyframes, {
            duration: duration * 1000,
            ease: "linear",
            delay: delay * 1000,
          });
        }
      }
    };

    const intervalId = setInterval(animateBeam, (duration + repeatDelay) * 1000);

    return () => clearInterval(intervalId);
  }, [initialX, translateX, initialY, translateY, rotate, duration, delay, repeatDelay]);

  return (
    <div
      ref={beamRef}
      className={cn(
        "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent opacity-0",
        className
      )}
    />
  );
});

CollisionMechanism.displayName = "CollisionMechanism";