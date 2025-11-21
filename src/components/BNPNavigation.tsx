import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import turtleIcon from "@/assets/turtle-icon.jpg";

const BNPNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Tableau de bord", href: "/dashboard" },
    { label: "Investissements", href: "/investments" },
    { label: "Mon profil", href: "/profile" },
  ];

  const isActive = (href: string) => location.pathname === href;

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
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={`text-sm font-light transition-colors cursor-pointer flex items-center gap-2 ${
                  isActive(link.href)
                    ? "text-bnp-gold"
                    : "text-white hover:text-bnp-gold"
                }`}
              >
                {link.label}
                {link.href === "/profile" && (
                  <img 
                    src={turtleIcon} 
                    alt="Profil investisseur" 
                    className="w-6 h-6"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-bnp-gold hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              Accueil
            </Button>
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => navigate('/parcours')}
            >
              Commencer
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
                <button
                  key={link.label}
                  onClick={() => {
                    navigate(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-sm font-light transition-colors py-2 cursor-pointer text-left flex items-center gap-2 ${
                    isActive(link.href)
                      ? "text-bnp-gold"
                      : "text-white hover:text-bnp-gold"
                  }`}
                >
                  {link.label}
                  {link.href === "/profile" && (
                    <img 
                      src={turtleIcon} 
                      alt="Profil investisseur" 
                      className="w-6 h-6"
                    />
                  )}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-white hover:text-bnp-gold hover:bg-white/10"
                  onClick={() => {
                    navigate('/');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Accueil
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    navigate('/parcours');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Commencer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BNPNavigation;
