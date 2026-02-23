"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const inner = card.firstElementChild as HTMLElement;
    if (!inner) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRef.current = { x: y * maxTilt, y: -x * maxTilt };
      scheduleUpdate();
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 };
      scheduleUpdate();
    };

    const scheduleUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    const updateTransform = () => {
      rafRef.current = null;
      const target = targetRef.current;
      const current = currentRef.current;
      const ease = 0.15;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;

      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        rafRef.current = requestAnimationFrame(updateTransform);
      }

      inner.style.transform = `perspective(600px) rotateX(${current.x}deg) rotateY(${current.y}deg)`;
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={cn("relative w-[320px] [aspect-ratio:17/21] [perspective:600px]", className)}
    >
      <div
        className="h-full w-full origin-center overflow-hidden rounded-[48px] border border-white/20 bg-black/30 backdrop-blur-xl [backface-visibility:hidden]"
        style={{ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" }}
      >
        {children}
      </div>
    </div>
  );
}
