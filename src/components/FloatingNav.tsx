import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Building2,
  Wrench,
  DollarSign,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";

const INSTAGRAM_URL = "https://www.instagram.com/rkl_lambardosofficial/";
const FACEBOOK_URL = "https://www.facebook.com/";

const SCROLL_THRESHOLD = 400;

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      title: "Etusivu",
      icon: <Home className="h-full w-full" />,
      href: "/",
    },
    {
      title: "Yritys",
      icon: <Building2 className="h-full w-full" />,
      href: "/yritys",
    },
    {
      title: "Palvelut",
      icon: <Wrench className="h-full w-full" />,
      href: "/palvelut",
    },
    {
      title: "Hinnoittelu",
      icon: <DollarSign className="h-full w-full" />,
      href: "/hinnoittelu",
    },
    {
      title: "Yhteystiedot",
      icon: <Mail className="h-full w-full" />,
      href: "/yhteystiedot",
    },
    {
      title: "Instagram",
      icon: <Instagram className="h-full w-full" />,
      href: INSTAGRAM_URL,
      external: true,
    },
    {
      title: "Facebook",
      icon: <Facebook className="h-full w-full" />,
      href: FACEBOOK_URL,
      external: true,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 left-0 right-0 z-40 flex items-end justify-center pb-6 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <FloatingDock items={items} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
