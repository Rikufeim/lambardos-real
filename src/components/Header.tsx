import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/lambardos-logo.png";

const INSTAGRAM_URL = "https://www.instagram.com/rkl_lambardosofficial/";
const FACEBOOK_URL = "https://www.facebook.com/";

const navItems = [
  { label: "Etusivu", path: "/" },
  { label: "Yritys", path: "/yritys" },
  { label: "Palvelut", path: "/palvelut" },
  { label: "Hinnoittelu", path: "/hinnoittelu" },
  { label: "Yhteystiedot", path: "/yhteystiedot" },
];

type HeaderProps = {
  variant?: "default" | "hero";
};

const Header = ({ variant = "default" }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="z-50 absolute top-0 left-0 right-0 bg-transparent">
      <div className="container flex items-center justify-between h-20 md:h-28">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lambardos Oy" className="h-16 md:h-24 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 justify-end items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-primary-foreground/90 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-primary-foreground/90 hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-primary-foreground/90 hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-primary-foreground"
          aria-label="Valikko"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="lg:hidden pb-4 bg-black/40 backdrop-blur-sm border-t border-white/10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-primary-foreground/90"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-2 flex items-center gap-2">
            <Button asChild className="flex-1">
              <Link to="/yhteystiedot" onClick={() => setIsOpen(false)}>Pyydä tarjous</Link>
            </Button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-primary-foreground/90 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-primary-foreground/90 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
