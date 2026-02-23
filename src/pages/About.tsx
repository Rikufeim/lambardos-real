import { motion } from "framer-motion";
import { Award, Users, Target, Wrench } from "lucide-react";
import Header from "@/components/Header";

const values = [
  { icon: <Award className="h-8 w-8" />, title: "Laatu", desc: "Jokainen asennus tehdään ammattitaidolla ja huolella – emme tyydy keskinkertaiseen." },
  { icon: <Target className="h-8 w-8" />, title: "Periksi antamaton asenne", desc: "Haasteet ratkaistaan, aikataulut pidetään ja lupaukset lunastetaan." },
  { icon: <Users className="h-8 w-8" />, title: "Yhteistyö", desc: "Palvelemme valmistajia, urakoitsijoita ja yksityisasiakkaita – kaikki ovat meille tärkeitä." },
  { icon: <Wrench className="h-8 w-8" />, title: "Ammattitaito", desc: "Työntekijöillämme on ajantasaiset työturvallisuuskortit ja vankka kokemus." },
];

const About = () => (
  <>
    {/* Hero */}
    <section className="relative section-dark py-24 md:py-36 pt-36 md:pt-44">
      <Header />
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Yritys</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Käsityöperinnettä jo <span className="text-primary">yli 100 vuotta</span></h1>
          <p className="text-section-dark-foreground/80 text-lg leading-relaxed">
            Rakennusliike Lambardos Oy perustettiin nykyisessä muodossaan vuonna 2011, mutta yrityksen juuret ulottuvat 1900-luvun alkupuolelle puuseppä Juho Nurmen käsityöperinteeseen. Työn laatu ja periksi antamaton asenne ovat yhä yrityksen tärkeimpiä arvoja.
          </p>
        </motion.div>
      </div>
    </section>

    {/* History */}
    <section className="py-24 md:py-36 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Historiamme</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Lambardos Oy:n tarina alkaa 1900-luvun alkupuolelta, jolloin puuseppä Juho Nurmi rakensi kalusteita käsityönä. Hänen ammattitaitonsa ja intohimonsa laatuun siirtyivät sukupolvelta toiselle.
              </p>
              <p>
                Vuonna 2011 yritys perustettiin nykyisessä muodossaan, ja se on sittemmin kasvanut yhdeksi Etelä-Suomen johtavista kiintokalusteasennusyrityksistä. Tänään asennamme yli 600 keittiötä ja kotia vuosittain.
              </p>
              <p>
                Palvelemme suuria kiintokalustevalmistajia, urakoitsijoita, pienempiä rakennusliikkeitä ja yksityisasiakkaita. Toimipisteemme sijaitsee Nurmijärvellä.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-black mb-6">Projektinhallinta</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Käytämme Lähde Solutionsin projektinhallintajärjestelmää, joka mahdollistaa projektien tehokkaan seurannan, aikataulutuksen ja viestinnän.
              </p>
              <p>
                Järjestelmän ansiosta asiakkaamme pysyvät ajan tasalla projektien etenemisestä, ja me voimme varmistaa, että jokainen asennus valmistuu ajallaan ja budjetissa.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-dark py-24 md:py-36">
      <div className="container">
        <h2 className="text-3xl font-black text-center mb-16">Arvomme</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {v.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-section-dark-foreground/70 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
