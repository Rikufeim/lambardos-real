import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Pricing = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Kiitos!", description: "Tarjouspyyntösi on lähetetty. Otamme yhteyttä pian." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <section className="section-dark py-20 md:py-28">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Hinnoittelu</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6">Selkeä ja reilu hinnoittelu</h1>
            <p className="text-section-dark-foreground/80 text-lg">
              Hinnoittelumme perustuu urakkaan tai tuntiveloitukseen työn tyypistä riippuen. Pyydä tarjous, niin räätälöimme sinulle sopivan ratkaisun.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-black mb-6">Hinnoitteluperiaatteet</h2>

              <div className="space-y-6">
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Urakkahinnoittelu</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Suuremmissa projekteissa ja sarjatuotannossa käytämme urakkahinnoittelua. Hinta sovitaan etukäteen projektin laajuuden perusteella.
                  </p>
                  <ul className="space-y-1">
                    {["Kiinteä hinta projektille", "Ei yllätyksiä", "Sopii uudiskohteisiin"].map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary" />{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 border border-border rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Tuntiveloitus</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Pienemmissä töissä ja yksittäisissä asennuksissa veloitamme tuntiperusteisesti. Tämä sopii hyvin esimerkiksi yksityisasiakkaille.
                  </p>
                  <ul className="space-y-1">
                    {["Joustava hinnoittelu", "Sopii pieniin töihin", "Maksat vain tehdystä työstä"].map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary" />{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-black mb-6">Pyydä tarjous</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Nimi *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input type="email" placeholder="Sähköposti *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input type="tel" placeholder="Puhelin" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Textarea placeholder="Kerro projektistasi *" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Lähetä tarjouspyyntö
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
