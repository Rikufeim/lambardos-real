import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { HeroStatsCard } from "@/components/HeroStatsCard";
import { GameEmbed } from "@/components/GameEmbed";
import InstagramFeed from "@/components/InstagramFeed";
import heroImg from "@/assets/hero-kitchen.jpg";
import kitchenImg from "@/assets/hero-kitchen.jpg";
import bathroomImg from "@/assets/bathroom-install.jpg";
import wardrobeImg from "@/assets/wardrobe-install.jpg";
import aaaLogo from "@/assets/aaa-logo.png";
import svLogo from "@/assets/suomen-vahvimmat.jpg";
import tilaajavastuu from "@/assets/luotettava-kumppani.png";

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
  "Keittiöt",
  "Kylpyhuoneet",
  "Kaapistot",
  "Asennus",
  "Uudis",
];

const partners = [
  { name: "AAA", img: aaaLogo },
  { name: "Suomen Vahvimmat", img: svLogo },
  { name: "Tilaajavastuu", img: tilaajavastuu },
];

const Index = () => {
  return (
    <>
      {/* 1. Hero - Intro text (WG: "Wonder Games is your dedicated partner...") */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
        <Header />
        <div className="absolute inset-0">
          <img src={heroImg} alt="Keittiökalusteasennus" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>
        <div className="container relative z-10 py-24 pt-28 md:py-32 md:pt-40">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 lg:gap-20">
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
            <HeroStatsCard />
          </div>
        </div>
      </section>

      {/* 2. Enter the game */}
      <section className="section-dark pt-12 pb-8 md:pt-14 md:pb-10 overflow-hidden">
        <div className="container mb-6 md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white text-center mb-4"
          >
            Syöksy peliin
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Asennamme yli <span className="font-black text-primary">600 keittiötä ja kotia vuosittain</span>. Testaa onnistuuko sama sinulta.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <GameEmbed maxWidth={9999} className="w-full" />
          <p className="text-center text-white/90 text-sm mt-6 px-6 font-medium max-w-xl mx-auto">
            Oikeat ammattilaiset asentavat 600+ keittiötä vuodessa –{" "}
            <a href="mailto:info@lambardos.fi" className="text-primary hover:underline font-semibold">
              info@lambardos.fi
            </a>
          </p>
        </motion.div>
      </section>

      {/* 3. Horizontal services strip */}
      <section className="section-dark py-6 md:py-8 border-y border-white/10">
        <div className="container px-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16">
            {horizontalServices.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-lg md:text-2xl lg:text-3xl font-bold text-white hover:text-primary transition-colors"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Quote block */}
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

      {/* 5. Our work */}
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

      {/* 6. Partners */}
      <section className="section-dark py-14 md:py-20 border-t border-white/10">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Luottamus kertoo tarinamme
            </h2>
            <p className="text-white/70 max-w-md leading-relaxed">
              Yhteistyökumppaniemme luottamus on meille erittäin tärkeää.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-10 md:gap-14 items-center"
          >
            {partners.map((p) => (
              <img key={p.name} src={p.img} alt={p.name} className="h-14 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
            ))}
          </motion.div>
        </div>
      </section>

      <InstagramFeed />

      {/* 7. CTA */}
      <section className="section-dark py-16 md:py-24 border-t border-white/10">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2">
              Liitytään
            </h2>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-6">
              yhteistyöhön
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Niin kauan kuin on tilaa tehdä asioista parempia, olemme mukana.
            </p>
            <Button size="lg" asChild>
              <Link to="/yhteystiedot">Ota yhteyttä <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <p className="text-sm text-white/50 mt-6">
              Sähköposti tai puhelin? Ei ongelmaa.
            </p>
            <p className="text-primary font-semibold mt-2">
              <a href="mailto:info@lambardos.fi" className="hover:underline">info@lambardos.fi</a>
              <span className="text-white/50 mx-2">·</span>
              040 123 4567
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
