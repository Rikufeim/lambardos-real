import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const INSTAGRAM_USERNAME = "rkl_lambardosofficial";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

/**
 * Elfsight Instagram widget ID.
 * Luo ilmainen widget (Slider-malli vaakascrollille):
 * https://elfsight.com/instagram-feed-instashow/templates/instagram-slider/
 * Yhdistä @rkl_lambardosofficial ja kopioi widget ID.
 * Aseta VITE_INSTAGRAM_WIDGET_ID .env-tiedostoon.
 */
const ELFSIGHT_WIDGET_ID = import.meta.env.VITE_INSTAGRAM_WIDGET_ID || "";

const InstagramFeed = () => {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {ELFSIGHT_WIDGET_ID ? (
            <>
              <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 px-4">
                <div className={`elfsight-app-${ELFSIGHT_WIDGET_ID}`} />
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Katso lisää
                  </a>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="overflow-hidden rounded-lg" style={{ height: "480px" }}>
                <iframe
                  src={`https://www.instagram.com/${INSTAGRAM_USERNAME}/embed`}
                  title="Lambardos Instagram"
                  className="border-0"
                  style={{
                    width: "calc(100% + 20px)",
                    height: "100%",
                    marginRight: "-20px",
                  }}
                  loading="lazy"
                />
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Katso lisää
                  </a>
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
