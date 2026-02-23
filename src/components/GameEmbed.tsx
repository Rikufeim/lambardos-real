import { useCallback, useRef, useEffect } from "react";
import { createInitialState, startGame, flap, tick } from "@/game/engine";
import { renderGame, renderStartScreen, renderGameOver } from "@/game/renderer";
import { setupCanvasForRetina } from "@/game/canvasUtils";
import type { GameState } from "@/game/types";

interface GameEmbedProps {
  className?: string;
  maxWidth?: number;
}

export function GameEmbed({ className = "", maxWidth = 480 }: GameEmbedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCanvasSize = useCallback(() => {
    if (!containerRef.current) return { w: 400, h: 260 };
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.min(rect.width, maxWidth);
    const h = Math.min(w * 0.55, 520);
    return { w: Math.max(w, 300), h };
  }, [maxWidth]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { w, h } = getCanvasSize();
    const { ctx } = setupCanvasForRetina(canvas, w, h);

    let s = stateRef.current;

    if (s.status === "playing") {
      s = tick(s, w, h);
      stateRef.current = s;
      renderGame(ctx, s, w, h);
      if (s.status === "gameover") {
        renderGameOver(ctx, w, h, s.score, s.bestScore, s.maxCombo);
      }
    } else if (s.status === "menu") {
      renderStartScreen(ctx, w, h, s.bestScore);
    } else if (s.status === "gameover") {
      renderGame(ctx, s, w, h);
      renderGameOver(ctx, w, h, s.score, s.bestScore, s.maxCombo);
    }

    rafRef.current = requestAnimationFrame(gameLoop);
  }, [getCanvasSize]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  const handleInput = useCallback(() => {
    const s = stateRef.current;
    if (s.status === "menu") {
      stateRef.current = startGame(s);
    } else if (s.status === "playing") {
      stateRef.current = flap(s);
    } else if (s.status === "gameover") {
      stateRef.current = startGame(s);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleInput();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInput]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={maxWidth >= 9999 ? undefined : { maxWidth: `${maxWidth}px`, margin: "0 auto" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full cursor-pointer block"
        style={{ touchAction: "none" }}
        onClick={handleInput}
        onTouchStart={(e) => {
          e.preventDefault();
          handleInput();
        }}
      />
    </div>
  );
}
