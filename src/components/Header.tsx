import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/lambardos-logo.png";

const navItems = [
  { label: "Etusivu", path: "/" },
  { label: "Yritys", path: "/yritys" },
  { label: "Palvelut", path: "/palvelut" },
  { label: "Hinnoittelu", path: "/hinnoittelu" },
  { label: "Peli", path: "/peli" },
  { label: "Blogi", path: "/blogi" },
  { label: "Yhteystiedot", path: "/yhteystiedot" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-border/20">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Lambardos Oy" className="h-10 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-secondary-foreground/80 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+358401234567" className="flex items-center gap-2 text-sm text-secondary-foreground/80">
            <Phone className="h-4 w-4 text-primary" />
            040 123 4567
          </a>
          <Button asChild>
            <Link to="/yhteystiedot">Pyydä tarjous</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary-foreground"
          aria-label="Valikko"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="lg:hidden bg-secondary border-t border-border/20 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-secondary-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button asChild className="w-full">
              <Link to="/yhteystiedot" onClick={() => setIsOpen(false)}>Pyydä tarjous</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
