import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "Keittiöremontti – mitä huomioida ennen asennusta?",
    excerpt: "Onnistuneen keittiöremontin takana on hyvä suunnittelu. Keräsimme tärkeimmät vinkit, jotka kannattaa huomioida ennen kalusteasennusta.",
    date: "15.1.2026",
    category: "Vinkit",
  },
  {
    title: "600 keittiötä vuodessa – näin se onnistuu",
    excerpt: "Kerromme, miten Lambardos Oy hallitsee satoja asennusprojekteja vuosittain ja miksi projektinhallinta on avainasemassa.",
    date: "3.12.2025",
    category: "Yritys",
  },
  {
    title: "Tilaajavastuu.fi – miksi se on tärkeä?",
    excerpt: "Luotettava Kumppani -jäsenyys takaa, että yhteistyökumppanisi hoitaa velvoitteensa. Kerromme, mitä se tarkoittaa käytännössä.",
    date: "20.11.2025",
    category: "Laatu",
  },
];

const Blog = () => (
  <>
    <section className="section-dark py-20 md:py-28">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Blogi</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Ajankohtaista</h1>
          <p className="text-section-dark-foreground/80 text-lg">
            Artikkeleita, referenssejä ja uutisia kiintokalusteasennusten maailmasta.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
            >
              <div className="h-2 bg-primary" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-primary text-sm font-medium inline-flex items-center gap-1 cursor-pointer">
                  Lue lisää <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Blog;
