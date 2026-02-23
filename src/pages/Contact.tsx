import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import SignupFormDemo from "@/components/ui/signup-form-demo";

const Contact = () => (
    <>
      <section className="relative section-dark py-24 md:py-36 pt-36 md:pt-44">
        <Header />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Yhteystiedot</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Ota yhteyttä</h1>
            <p className="text-section-dark-foreground/80 text-lg">
              Vastaamme yhteydenottoihin nopeasti. Voit myös soittaa meille suoraan.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-36 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-black mb-6">Rakennusliike Lambardos Oy</h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Osoite</p>
                    <p className="text-muted-foreground text-sm">Mäensyrjä 10, 01900 Nurmijärvi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Puhelin</p>
                    <a href="tel:+358401234567" className="text-muted-foreground text-sm hover:text-primary transition-colors">040 123 4567</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Sähköposti</p>
                    <a href="mailto:info@lambardos.fi" className="text-muted-foreground text-sm hover:text-primary transition-colors">info@lambardos.fi</a>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Kirjaudu extranetiin
              </a>

              {/* Map */}
              <div className="mt-8 rounded-lg overflow-hidden border border-border h-64">
                <iframe
                  title="Lambardos Oy sijainti"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1956.5!2d24.81!3d60.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDI4JzEyLjAiTiAyNMKwNDgnMzYuMCJF!5e0!3m2!1sfi!2sfi!4v1600000000000!5m2!1sfi!2sfi"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full">
              <SignupFormDemo />
            </motion.div>
          </div>
        </div>
      </section>
    </>
);

export default Contact;
