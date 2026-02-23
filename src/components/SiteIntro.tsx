import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const INTRO_KEY = "lambardos_intro_seen";

export function SiteIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    if (!seen) {
      setIsVisible(true);
    }
  }, []);

  const handleStart = () => {
    setIsRevealing(true);
    sessionStorage.setItem(INTRO_KEY, "1");
  };

  useEffect(() => {
    if (!isRevealing) return;
    const t = setTimeout(() => setIsVisible(false), 900);
    return () => clearTimeout(t);
  }, [isRevealing]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Split panels - slide away on reveal */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#0a0a0a] z-20"
            initial={{ x: 0 }}
            animate={isRevealing ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#0a0a0a] z-20"
            initial={{ x: 0 }}
            animate={isRevealing ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Player 1 / Login badge (WG style) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-6 left-6 md:left-12 z-30 text-xs uppercase tracking-[0.3em] text-white/50"
          >
            Player 1
          </motion.p>

          {/* Center content - fades out before panels slide */}
          <motion.div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={
              isRevealing
                ? { opacity: 0, transition: { duration: 0.2 } }
                : { opacity: 1 }
            }
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white text-center select-none"
            >
              L A M B A R D O S
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-4 text-sm md:text-base uppercase tracking-[0.2em] text-white/60"
            >
              Kiintokalusteasennusten ammattilainen
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-12"
            >
              <Button
                size="lg"
                onClick={handleStart}
                className="px-12 py-6 text-lg font-bold uppercase tracking-widest rounded-none bg-primary hover:bg-primary/90"
              >
                Aloita
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40 flex flex-col items-center gap-2"
            >
              Vieritä alas
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </motion.p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
