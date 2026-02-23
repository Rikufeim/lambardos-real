import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Home, ShieldCheck, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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

const stats = [
  { value: "600+", label: "asennusta / vuosi" },
  { value: "2011", label: "perustettu" },
  { value: "100+", label: "vuoden perinne" },
  { value: "AAA", label: "luottoluokitus" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Keittiökalusteasennus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} custom={0} className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Rakennusliike Lambardos Oy
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-[1.1] mb-6">
              Kiintokaluste&shy;asennusten <span className="text-primary">ammattilainen</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Asennamme yli 600 keittiötä ja kotia vuosittain. Perinteemme ulottuu 1900-luvun alkupuolelle puuseppä Juho Nurmen käsityöhön.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/yhteystiedot">
                  Pyydä tarjous <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/palvelut">Palvelumme</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-dark py-12 border-y border-primary/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-primary">{s.value}</div>
                <div className="text-sm text-section-dark-foreground/60 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Palvelut</p>
            <h2 className="text-3xl md:text-4xl font-black">Asennuspalvelumme</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group overflow-hidden rounded-lg bg-card border border-border hover:border-primary/40 transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-primary mb-3">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/palvelut">Kaikki palvelut <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Game teaser */}
      <section className="section-dark py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Gamepad2 className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-black mb-2">Kokeile kalusteasennuspeliä!</h2>
              <p className="text-section-dark-foreground/70">Raahaa ja pudota kalusteet oikeille paikoille keittiöön. Kuinka nopeasti saat asennuksen valmiiksi?</p>
            </div>
            <Button size="lg" asChild>
              <Link to="/peli">Pelaa nyt <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-background">
        <div className="container text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-6">Luotettava kumppani</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src={aaaLogo} alt="AAA Luottoluokitus" className="h-16" />
            <img src={svLogo} alt="Suomen Vahvimmat" className="h-16 rounded" />
            <img src={tilaajavastuu} alt="Tilaajavastuu Luotettava Kumppani" className="h-14" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-20">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">Tarvitsetko kalusteasentajaa?</h2>
            <p className="text-section-dark-foreground/70 mb-8 max-w-lg mx-auto">
              Ota yhteyttä ja pyydä tarjous – vastaamme nopeasti!
            </p>
            <Button size="lg" asChild>
              <Link to="/yhteystiedot">Ota yhteyttä <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
