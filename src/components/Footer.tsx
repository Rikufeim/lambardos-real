import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/lambardos-logo.png";
import aaaLogo from "@/assets/aaa-logo.png";
import svLogo from "@/assets/suomen-vahvimmat.jpg";
import tilaajavastuu from "@/assets/luotettava-kumppani.png";

const INSTAGRAM_URL = "https://www.instagram.com/rkl_lambardosofficial/";
const FACEBOOK_URL = "https://www.facebook.com/";

const Footer = () => (
  <footer className="section-dark border-t border-white/10">
    <div className="container py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        <div>
          <img src={logo} alt="Lambardos Oy" className="h-10 mb-4 opacity-90" />
          <p className="text-xs text-section-dark-foreground/50">Rakennusliike Lambardos Oy</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Sivut</h4>
          <ul className="space-y-2">
            {[
              { label: "Etusivu", path: "/" },
              { label: "Yritys", path: "/yritys" },
              { label: "Palvelut", path: "/palvelut" },
              { label: "Hinnoittelu", path: "/hinnoittelu" },
              { label: "Yhteystiedot", path: "/yhteystiedot" },
            ].map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-section-dark-foreground/70 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Yhteystiedot</h4>
          <p className="text-sm text-section-dark-foreground/70">
            <a href="mailto:info@lambardos.fi" className="hover:text-primary transition-colors">info@lambardos.fi</a>
          </p>
          <p className="text-sm text-section-dark-foreground/70 mt-1">040 123 4567</p>
          <div className="flex gap-4 mt-4">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 flex flex-wrap gap-8 md:gap-12 justify-center items-center">
        <img src={aaaLogo} alt="AAA" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
        <img src={svLogo} alt="Suomen Vahvimmat" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
        <img src={tilaajavastuu} alt="Tilaajavastuu Luotettava Kumppani" className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100" />
      </div>

      <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-section-dark-foreground/50">
        © {new Date().getFullYear()} Rakennusliike Lambardos Oy. Kaikki oikeudet pidätetään.
      </div>
    </div>
  </footer>
);

export default Footer;
