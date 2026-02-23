import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";

const stats = [
  { value: "600+", label: "Asennettua kotia / keittiötä vuodessa" },
  { value: "10+ vuotta", label: "Toimintaa nykyisessä muodossa" },
  { value: "5–10", label: "Ammattiasentajaa projektien mukaan" },
  { value: "100 %", label: "Ajantasainen projektinhallinta ja tuntikirjaus" },
];

export function HeroStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="hidden lg:block"
    >
      <TiltCard maxTilt={6}>
        <div className="p-8 h-full flex flex-col justify-center">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-black text-primary leading-none">
                  {s.value}
                </span>
                <span className="text-sm text-white/90 leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
