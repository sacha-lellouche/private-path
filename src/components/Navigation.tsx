import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
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
    { label: "Dashboard", href: "/dashboard" },
    { label: "Investissements", href: "/investments" },
    { label: "Patrimoine", href: "#products" },
    { label: "Services", href: "#products" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bnp-green-dark shadow-elegant">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl tracking-tight leading-none">BNP PARIBAS</span>
              <span className="text-white/90 text-xs font-light tracking-wide leading-tight">La banque d'un monde qui change</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('/')) {
                    e.preventDefault();
                    navigate(link.href);
                  }
                }}
                className="text-sm font-light text-white hover:text-bnp-gold transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-bnp-gold hover:bg-white/10"
              onClick={() => navigate('/parcours')}
            >
              Commencer
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Mon espace
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
                  onClick={(e) => {
                    if (link.href.startsWith('/')) {
                      e.preventDefault();
                      navigate(link.href);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm font-light text-white hover:text-bnp-gold transition-colors py-2 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-white hover:text-bnp-gold hover:bg-white/10"
                  onClick={() => {
                    navigate('/parcours');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Commencer
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Mon espace
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
