import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/lambardos-logo.png";
import aaaLogo from "@/assets/aaa-logo.png";
import svLogo from "@/assets/suomen-vahvimmat.jpg";
import tilaajavastuu from "@/assets/luotettava-kumppani.png";

const Footer = () => (
  <footer className="section-dark border-t border-border/10">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="Lambardos Oy" className="h-12 mb-4" />
          <p className="text-sm text-section-dark-foreground/70 leading-relaxed">
            Kiintokalusteasennusten ammattilainen Nurmijärveltä. Perinteitä vuodesta 1900-luvun alkupuolelta.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Sivukartta</h4>
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

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Yhteystiedot</h4>
          <ul className="space-y-3 text-sm text-section-dark-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              Mäensyrjä 10, 01900 Nurmijärvi
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              040 123 4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              info@lambardos.fi
            </li>
          </ul>
        </div>

        {/* Trust badges */}
        <div>
          <h4 className="text-sm font-semibold mb-4 text-primary">Luotettava kumppani</h4>
          <div className="flex flex-wrap gap-3 items-center">
            <img src={aaaLogo} alt="AAA Korkein luottoluokitus" className="h-14 bg-background rounded p-1" />
            <img src={svLogo} alt="Suomen Vahvimmat 2018" className="h-14 rounded" />
            <img src={tilaajavastuu} alt="Tilaajavastuu.fi Luotettava Kumppani" className="h-12 bg-background rounded p-1" />
          </div>
        </div>
      </div>

      <div className="border-t border-border/10 mt-12 pt-6 text-center text-xs text-section-dark-foreground/50">
        © {new Date().getFullYear()} Rakennusliike Lambardos Oy. Kaikki oikeudet pidätetään.
      </div>
    </div>
  </footer>
);

export default Footer;
