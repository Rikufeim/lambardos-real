import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import kitchenImg from "@/assets/hero-kitchen.jpg";
import bathroomImg from "@/assets/bathroom-install.jpg";
import wardrobeImg from "@/assets/wardrobe-install.jpg";

const services = [
  {
    title: "Keittiökalusteasennukset",
    desc: "Asennamme keittiökalusteet uudis- ja saneerauskohteisiin ammattitaidolla. Teemme yhteistyötä suurimpien kalustevalmistajien kanssa ja varmistamme, että jokainen asennus on täydellinen.",
    features: ["Uudiskohteet", "Saneerauskohteet", "Keittiösaneeraukset", "Kodinkoneasennukset"],
    img: kitchenImg,
  },
  {
    title: "Kylpyhuone- ja WC-kalusteet",
    desc: "WC-kalusteiden, pesuallaskaappien ja kylpyhuoneen säilytysratkaisujen ammattitaitoinen asennus.",
    features: ["Allaskaapit", "Peilikaapistot", "Säilytysratkaisut", "Kalustevaihdot"],
    img: bathroomImg,
  },
  {
    title: "Kaapistot ja säilytysratkaisut",
    desc: "Vaatekaappien, liukuovien ja mittatilauskaapiston asennus koteihin ja toimistoihin.",
    features: ["Vaatekaapit", "Liukuovet", "Mittatilauskalusteet", "Eteiskalusteet"],
    img: wardrobeImg,
  },
];

const Services = () => (
  <>
    <section className="relative section-dark py-24 md:py-36 pt-36 md:pt-44">
      <Header />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Palvelut</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Kiintokaluste&shy;asennuspalvelut</h1>
          <p className="text-section-dark-foreground/80 text-lg">
            Tarjoamme kattavat kalusteasennuspalvelut kaikenlaisiin kohteisiin. Tilaajavastuu.fi-jäsenyys ja ajantasaiset työturvallisuuskortit takaavat turvallisen ja luotettavan palvelun.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-24 md:py-36 bg-background">
      <div className="container space-y-28">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
          >
            <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
              <h2 className="text-2xl md:text-3xl font-black mb-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-2">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`overflow-hidden rounded-lg ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
              <img src={s.img} alt={s.title} className="w-full h-72 object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Trust */}
    <section className="section-dark py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <ShieldCheck className="h-12 w-12 text-primary shrink-0" />
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">Tilaajavastuu.fi -jäsen</h3>
            <p className="text-section-dark-foreground/70 text-sm">
              Olemme Tilaajavastuu.fi-palvelun Luotettava Kumppani -jäsen. Kaikilla asentajillamme on voimassa olevat työturvallisuuskortit.
            </p>
          </div>
          <Button asChild>
            <Link to="/yhteystiedot">Pyydä tarjous <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
