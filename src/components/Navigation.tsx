import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Patrimoine", href: "#products" },
    { label: "Investissement", href: "#products" },
    { label: "Services", href: "#products" },
    { label: "À propos", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bnp-green-dark shadow-elegant">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-sm flex items-center justify-center">
              <span className="text-bnp-green font-serif font-bold text-xl">B</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-semibold text-lg text-white leading-tight">
                BNP PARIBAS
              </div>
              <div className="text-xs text-bnp-gold tracking-wider">
                BANQUE PRIVÉE
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-light text-white hover:text-bnp-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-white hover:text-bnp-gold hover:bg-white/10">
              Connexion
            </Button>
            <Button variant="hero" size="sm">
              Nous contacter
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-light text-white hover:text-bnp-gold transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                <Button variant="ghost" size="sm" className="w-full text-white hover:text-bnp-gold hover:bg-white/10">
                  Connexion
                </Button>
                <Button variant="hero" size="sm" className="w-full">
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
