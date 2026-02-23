import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Hammer, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import { GameEmbed } from "@/components/GameEmbed";
import InstagramFeed from "@/components/InstagramFeed";
import heroImg from "@/assets/hero-kitchen.jpg";
import kitchenImg from "@/assets/hero-kitchen.jpg";
import bathroomImg from "@/assets/bathroom-install.jpg";
import wardrobeImg from "@/assets/wardrobe-install.jpg";
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const services = [
  {
    icon: <Hammer className="h-8 w-8" />,
    title: "Keittiöasennukset",
    desc: "Ammattitaitoinen keittiökalusteiden asennus uudis- ja saneerauskohteisiin.",
    img: kitchenImg,
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Kylpyhuonekalusteet",
    desc: "WC- ja kylpyhuonekalusteiden asennukset laadukkaasti ja aikataulussa.",
    img: bathroomImg,
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Kaapistot & säilytys",
    desc: "Vaatekaapistot, liukuovet ja mittatilausratkaisut asuntoihin.",
    img: wardrobeImg,
  },
];

const horizontalServices = [
  {
    label: "Keittiöt",
    href: "/palvelut#keittiot",
    preview: {
      img: kitchenImg,
      title: "Keittiökalusteasennukset",
      desc: "Asennamme keittiökalusteet uudis- ja saneerauskohteisiin ammattitaidolla. Teemme yhteistyötä suurimpien kalustevalmistajien kanssa ja varmistamme, että jokainen asennus on täydellinen.",
      features: ["Uudiskohteet", "Saneerauskohteet", "Keittiösaneeraukset", "Kodinkoneasennukset"],
    },
  },
  {
    label: "Kylpyhuoneet",
    href: "/palvelut#kylpyhuoneet",
    preview: {
      img: bathroomImg,
      title: "Kylpyhuone- ja WC-kalusteet",
      desc: "WC-kalusteiden, pesuallaskaappien ja kylpyhuoneen säilytysratkaisujen ammattitaitoinen asennus.",
      features: ["Allaskaapit", "Peilikaapistot", "Säilytysratkaisut", "Kalustevaihdot"],
    },
  },
  {
    label: "Kaapistot",
    href: "/palvelut#kaapistot",
    preview: {
      img: wardrobeImg,
      title: "Kaapistot ja säilytysratkaisut",
      desc: "Vaatekaappien, liukuovien ja mittatilauskaapiston asennus koteihin ja toimistoihin.",
      features: ["Vaatekaapit", "Liukuovet", "Mittatilauskalusteet", "Eteiskalusteet"],
    },
  },
  {
    label: "Asennus",
    href: "/palvelut",
    preview: {
      img: kitchenImg,
      title: "Kalusteasennuspalvelut",
      desc: "Tarjoamme kattavat kalusteasennuspalvelut kaikenlaisiin kohteisiin. Tilaajavastuu.fi-jäsenyys ja ajantasaiset työturvallisuuskortit takaavat turvallisen ja luotettavan palvelun.",
      features: ["Keittiöt", "Kylpyhuoneet", "Kaapistot", "Tilaajavastuu.fi"],
    },
  },
  {
    label: "Uudis",
    href: "/palvelut#keittiot",
    preview: {
      img: kitchenImg,
      title: "Uudis- ja saneerauskohteet",
      desc: "Asennamme keittiökalusteet ja muut kalusteet uudis- ja saneerauskohteisiin ammattitaidolla. Teemme yhteistyötä suurimpien kalustevalmistajien kanssa.",
      features: ["Uudiskohteet", "Saneerauskohteet", "Keittiösaneeraukset", "Kodinkoneasennukset"],
    },
  },
];

const Index = () => {
  const [hoveredService, setHoveredService] = useState<number>(0);

  return (
    <>
      {/* 1. Hero - Intro text (WG: "Wonder Games is your dedicated partner...") */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] border-0">
        <Header />
        <div className="absolute inset-0">
          <img src={heroImg} alt="Keittiökalusteasennus" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10 py-24 pt-28 md:py-32 md:pt-40">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="max-w-xl lg:max-w-2xl"
            >
              <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-6">
                Rakennusliike Lambardos Oy
              </motion.p>
              <motion.h1 variants={fadeUp} custom={1} className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.2] mb-8">
                Lambardos on kiintokalusteasennusten luotettava kumppani.
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-base md:text-lg text-white/75 leading-[1.7] mb-10 max-w-lg">
                Perinteemme ulottuu 1900-luvun alkupuolelle puuseppä Juho Nurmen käsityöhön. Tänä päivänä asennamme yli 600 keittiötä ja kotia vuosittain.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/yhteystiedot">
                    Pyydä tarjous <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10">
                  <Link to="/palvelut">Palvelumme</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Game - suoraan heron alla, sama tausta kuin hero */}
      <section className="overflow-hidden border-0 bg-[#0a0a0a] text-white pb-16 md:pb-24">
        <GameEmbed maxWidth={9999} className="w-full" />
        <div id="palvelut-linkit" className="pt-12 md:pt-16 scroll-mt-8" onMouseLeave={() => setHoveredService(0)}>
          <div className="bg-background text-foreground py-8 px-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14">
              {horizontalServices.map((s, i) => (
                <Link
                  key={s.label}
                  to={s.href}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(0)}
                  className={`text-2xl md:text-3xl lg:text-4xl font-black transition-colors py-2 ${
                    hoveredService === i ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px]">
          <AnimatePresence mode="sync">
            {
              <motion.div
                key={hoveredService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-x-0 top-0 w-full bg-background border-t border-border"
              >
              <div className="container py-12 md:py-16">
                {(() => {
                  const s = horizontalServices[hoveredService];
                  return (
                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">{s.preview.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">{s.preview.desc}</p>
                        <ul className="space-y-2">
                          {s.preview.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <Button asChild className="mt-6">
                          <Link to={s.href}>
                            Lue lisää <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <div className="overflow-hidden rounded-lg">
                        <img src={s.preview.img} alt={s.preview.title} className="w-full h-64 md:h-80 object-cover" />
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
            }
          </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Quote block */}
      <section className="section-dark py-10 md:py-14">
        <div className="container max-w-2xl px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-white leading-[1.6] text-center"
          >
            <p className="mb-4">Et tarvitse onnenkantamista.</p>
            <p className="text-white/90 text-lg md:text-xl">Tarvitset ammattilaisen, joka ei vain asenna vaan huolehtii projektista alusta loppuun. Siksi olemme täällä.</p>
          </motion.blockquote>
        </div>
      </section>

      {/* 4. Our work */}
      <section className="section-dark py-14 md:py-20">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
              Työmme
            </h2>
            <p className="text-lg text-white/70 max-w-xl leading-relaxed">
              Tehtävämme on yksinkertainen – toimittaa asennuspalvelut, jotka ylittävät odotukset.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group overflow-hidden rounded-lg border border-white/10 hover:border-primary/40 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 md:p-6 bg-white/5">
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/70 text-sm leading-[1.6]">{s.desc}</p>
                  <Link to="/palvelut" className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline">
                    Lue lisää <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InstagramFeed />

      {/* 6. CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-dark rounded-2xl border border-white/10 overflow-hidden shadow-xl grid md:grid-cols-[1fr,minmax(280px,40%)] min-h-[400px]"
          >
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                Liitytään
              </h2>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6">
                yhteistyöhön
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
                Niin kauan kuin on tilaa tehdä asioista parempia, olemme mukana.
              </p>
              <Button size="lg" asChild>
                <Link to="/yhteystiedot">Pyydä tarjous <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <p className="text-sm text-white/50 mt-6">
                Sähköposti tai puhelin? Ei ongelmaa.
              </p>
              <p className="text-primary font-semibold mt-2">
                <a href="mailto:info@lambardos.fi" className="hover:underline">info@lambardos.fi</a>
                <span className="text-white/50 mx-2">·</span>
                040 123 4567
              </p>
            </div>
            <div className="relative min-h-[280px] md:min-h-0">
              {/* Vaihda src halutun kuvan mukaan */}
              <img
                src={heroImg}
                alt="Lambardos asennuspalvelut"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
