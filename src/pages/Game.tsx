import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FurnitureItem {
  id: string;
  label: string;
  emoji: string;
  placed: boolean;
}

interface DropZone {
  id: string;
  label: string;
  acceptsId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  filled: boolean;
}

const initialFurniture: FurnitureItem[] = [
  { id: "upper", label: "Yläkaapit", emoji: "🗄️", placed: false },
  { id: "lower", label: "Alakaapit", emoji: "🗃️", placed: false },
  { id: "sink", label: "Allas", emoji: "🚰", placed: false },
  { id: "stove", label: "Liesi", emoji: "🍳", placed: false },
  { id: "fridge", label: "Jääkaappi", emoji: "❄️", placed: false },
  { id: "dishwasher", label: "Astianpesukone", emoji: "💧", placed: false },
];

const dropZones: DropZone[] = [
  { id: "z-upper", label: "Yläkaapit", acceptsId: "upper", x: 5, y: 5, width: 90, height: 15, filled: false },
  { id: "z-lower", label: "Alakaapit", acceptsId: "lower", x: 5, y: 55, width: 50, height: 20, filled: false },
  { id: "z-sink", label: "Allas", acceptsId: "sink", x: 35, y: 30, width: 18, height: 20, filled: false },
  { id: "z-stove", label: "Liesi", acceptsId: "stove", x: 60, y: 55, width: 18, height: 20, filled: false },
  { id: "z-fridge", label: "Jääkaappi", acceptsId: "fridge", x: 82, y: 30, width: 15, height: 45, filled: false },
  { id: "z-dishwasher", label: "Pesukon.", acceptsId: "dishwasher", x: 5, y: 30, width: 18, height: 20, filled: false },
];

const Game = () => {
  const [furniture, setFurniture] = useState<FurnitureItem[]>(initialFurniture);
  const [zones, setZones] = useState<DropZone[]>(dropZones);
  const [score, setScore] = useState(0);
  const [dragging, setDragging] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const allPlaced = furniture.every((f) => f.placed);

  useEffect(() => {
    if (started && !completed) {
      const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [started, completed]);

  useEffect(() => {
    if (allPlaced && started) setCompleted(true);
  }, [allPlaced, started]);

  const handleDragStart = (id: string) => {
    setDragging(id);
    if (!started) setStarted(true);
  };

  const handleDrop = useCallback(
    (zoneId: string) => {
      if (!dragging) return;
      const zone = zones.find((z) => z.id === zoneId);
      if (!zone || zone.filled) return;

      if (zone.acceptsId === dragging) {
        setFurniture((prev) => prev.map((f) => (f.id === dragging ? { ...f, placed: true } : f)));
        setZones((prev) => prev.map((z) => (z.id === zoneId ? { ...z, filled: true } : z)));
        setScore((s) => s + 100);
      }
      setDragging(null);
    },
    [dragging, zones]
  );

  const reset = () => {
    setFurniture(initialFurniture);
    setZones(dropZones);
    setScore(0);
    setSeconds(0);
    setStarted(false);
    setCompleted(false);
    setDragging(null);
  };

  // Touch support
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging || !boardRef.current) return;
      const touch = e.changedTouches[0];
      const rect = boardRef.current.getBoundingClientRect();
      const px = ((touch.clientX - rect.left) / rect.width) * 100;
      const py = ((touch.clientY - rect.top) / rect.height) * 100;

      const hitZone = zones.find(
        (z) =>
          !z.filled &&
          px >= z.x &&
          px <= z.x + z.width &&
          py >= z.y &&
          py <= z.y + z.height
      );

      if (hitZone) handleDrop(hitZone.id);
      else setDragging(null);
    },
    [dragging, zones, handleDrop]
  );

  return (
    <>
      <section className="section-dark py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Peli</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Kalusteasennuspeli</h1>
            <p className="text-section-dark-foreground/80 text-lg">
              Raahaa ja pudota kalusteet oikeille paikoille keittiössä! Kuinka nopeasti saat asennuksen valmiiksi?
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container max-w-4xl">
          {/* Scoreboard */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">{score} p</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-mono">{seconds}s</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Aloita alusta
            </Button>
          </div>

          {/* Game board */}
          <div
            ref={boardRef}
            className="relative w-full bg-muted border-2 border-border rounded-lg overflow-hidden"
            style={{ paddingBottom: "60%" }}
          >
            {/* Kitchen background lines */}
            <div className="absolute inset-0">
              {/* Countertop line */}
              <div className="absolute left-0 right-0 border-t-2 border-dashed border-border/50" style={{ top: "50%" }} />
              <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-border/50" style={{ left: "80%" }} />
            </div>

            {/* Drop zones */}
            {zones.map((zone) => (
              <div
                key={zone.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(zone.id)}
                className={`absolute border-2 border-dashed rounded flex items-center justify-center text-xs font-medium transition-colors ${
                  zone.filled
                    ? "border-primary bg-primary/10 text-primary"
                    : dragging && zone.acceptsId === dragging
                    ? "border-primary/60 bg-primary/5"
                    : "border-border/60 text-muted-foreground/60"
                }`}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.width}%`,
                  height: `${zone.height}%`,
                }}
              >
                {zone.filled ? "✅" : zone.label}
              </div>
            ))}
          </div>

          {/* Furniture pieces */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Raahaa kalusteet keittiöön:</p>
            <div className="flex flex-wrap gap-3" onTouchEnd={handleTouchEnd}>
              {furniture
                .filter((f) => !f.placed)
                .map((f) => (
                  <div
                    key={f.id}
                    draggable
                    onDragStart={() => handleDragStart(f.id)}
                    onTouchStart={() => handleDragStart(f.id)}
                    className="flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg cursor-grab active:cursor-grabbing select-none border border-border hover:border-primary/40 transition-colors"
                  >
                    <span className="text-xl">{f.emoji}</span>
                    <span className="text-sm font-medium">{f.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Completion */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-8 bg-primary/10 border border-primary/30 rounded-lg text-center"
            >
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-2">Hienoa! Keittiö on asennettu!</h3>
              <p className="text-muted-foreground mb-1">Pisteet: {score} | Aika: {seconds}s</p>
              <p className="text-sm text-muted-foreground mb-4">
                Oikeat ammattilaiset tekevät tämän vielä nopeammin – ota yhteyttä Lambardos Oy:hyn!
              </p>
              <Button onClick={reset}>Pelaa uudelleen</Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Game;
