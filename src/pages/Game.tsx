import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Trophy, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createInitialState, startGame, flap, tick, getLeaderboard } from "@/game/engine";
import { renderGame, renderStartScreen, renderGameOver } from "@/game/renderer";
import { gameAudio } from "@/game/audio";
import type { GameState, LeaderboardEntry } from "@/game/types";
import { getDailySeed } from "@/game/seededRandom";

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const rafRef = useRef<number>(0);
  const [status, setStatus] = useState<GameState['status']>('menu');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [muted, setMuted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCanvasSize = useCallback(() => {
    if (!containerRef.current) return { w: 600, h: 400 };
    const rect = containerRef.current.getBoundingClientRect();
    const w = Math.min(rect.width, 800);
    const h = Math.min(w * 0.65, 520);
    return { w, h };
  }, []);

  const syncReactState = useCallback((s: GameState) => {
    setStatus(s.status);
    setScore(s.score);
    setBestScore(s.bestScore);
    setMaxCombo(s.maxCombo);
  }, []);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = getCanvasSize();
    canvas.width = w;
    canvas.height = h;

    let s = stateRef.current;

    if (s.status === 'playing') {
      s = tick(s, w, h);
      stateRef.current = s;
      renderGame(ctx, s, w, h);
      if (s.status === 'gameover') {
        renderGameOver(ctx, w, h, s.score, s.bestScore, s.maxCombo);
        syncReactState(s);
      }
    } else if (s.status === 'menu') {
      renderStartScreen(ctx, w, h, s.bestScore);
    } else if (s.status === 'gameover') {
      renderGame(ctx, s, w, h);
      renderGameOver(ctx, w, h, s.score, s.bestScore, s.maxCombo);
    }

    rafRef.current = requestAnimationFrame(gameLoop);
  }, [getCanvasSize, syncReactState]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  const handleInput = useCallback(() => {
    const s = stateRef.current;
    if (s.status === 'menu') {
      stateRef.current = startGame(s);
      syncReactState(stateRef.current);
    } else if (s.status === 'playing') {
      stateRef.current = flap(s);
    } else if (s.status === 'gameover') {
      stateRef.current = startGame(s);
      syncReactState(stateRef.current);
    }
  }, [syncReactState]);

  const handleDaily = useCallback(() => {
    stateRef.current = startGame(stateRef.current, true);
    syncReactState(stateRef.current);
  }, [syncReactState]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleInput();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleInput]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    gameAudio.setMuted(next);
  };

  const openLeaderboard = () => {
    setLeaderboard(getLeaderboard());
    setShowLeaderboard(true);
  };

  return (
    <>
      <section className="bg-section-dark py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4 text-sm">
              <ArrowLeft className="h-4 w-4" /> Takaisin etusivulle
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-section-dark-foreground mb-2">
              Kalusteasennus <span className="text-primary">Challenge</span>
            </h1>
            <p className="text-muted-foreground">
              Ohjaa työkalupakki kaappiaukkojen läpi! SPACE / klikkaa / napauta = nosto.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container max-w-4xl" ref={containerRef}>
          {/* Controls bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Paras: {bestScore}</span>
              </div>
              {status === 'playing' && (
                <span className="text-sm font-mono text-muted-foreground">Pisteet: {score}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={openLeaderboard}>
                <Trophy className="mr-1 h-3 w-3" /> Top 10
              </Button>
              <Button variant="outline" size="sm" onClick={handleDaily}>
                <Calendar className="mr-1 h-3 w-3" /> Päivän haaste
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg border-2 border-border cursor-pointer"
            style={{ maxHeight: 520, touchAction: 'none' }}
            onClick={handleInput}
            onTouchStart={(e) => {
              e.preventDefault();
              handleInput();
            }}
          />

          {/* Status messages */}
          {status === 'menu' && (
            <p className="text-center text-muted-foreground text-sm mt-4">
              Klikkaa pelikenttää tai paina SPACE aloittaaksesi
            </p>
          )}
          {status === 'gameover' && (
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Pisteet: <strong className="text-primary">{score}</strong>
                {maxCombo > 1 && <> | Max kombo: <strong>{maxCombo}</strong></>}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button onClick={handleInput}>Pelaa uudelleen</Button>
                <Button variant="outline" onClick={handleDaily}>
                  <Calendar className="mr-1 h-4 w-4" /> Päivän haaste
                </Button>
              </div>
            </div>
          )}

          {/* Leaderboard modal */}
          {showLeaderboard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowLeaderboard(false)}>
              <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" /> Top 10
                </h3>
                {leaderboard.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Ei tuloksia vielä. Pelaa ensin!</p>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                        <span className="font-mono text-muted-foreground w-6">{i + 1}.</span>
                        <span className="font-bold flex-1">{entry.score} p</span>
                        {entry.combo > 1 && <span className="text-primary text-xs">x{entry.combo}</span>}
                        <span className="text-muted-foreground text-xs ml-2">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" className="w-full mt-4" onClick={() => setShowLeaderboard(false)}>
                  Sulje
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-sm mb-1">🎮 Ohjaus</h4>
              <p className="text-xs text-muted-foreground">SPACE, klikkaa tai napauta nostaaksesi työkalupakkia. Painovoima vetää alas.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-sm mb-1">🎯 Kombo</h4>
              <p className="text-xs text-muted-foreground">Läpäise aukot keskeltä saadaksesi tarkkuus-bonuksen. Kombo nostaa pistekerrointa x5 asti!</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-bold text-sm mb-1">⚡ Bonukset</h4>
              <p className="text-xs text-muted-foreground">Kerää aukoista bonusesineitä: stabilointi vähentää painovoimaa, muut antavat lisäpisteitä.</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Oikeat ammattilaiset asentavat 600+ keittiötä vuodessa –{" "}
              <Link to="/yhteystiedot" className="text-primary hover:underline">ota yhteyttä Lambardos Oy:hyn!</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Game;
