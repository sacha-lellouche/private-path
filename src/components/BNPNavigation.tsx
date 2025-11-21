import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import bnpLogo from "@/assets/bnp-logo.png";

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
            <img 
              src={bnpLogo} 
              alt="BNP Paribas - La banque d'un monde qui change" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={`text-sm font-light transition-colors cursor-pointer ${
                  isActive(link.href)
                    ? "text-bnp-gold"
                    : "text-white hover:text-bnp-gold"
                }`}
              >
                {link.label}
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
                  className={`text-sm font-light transition-colors py-2 cursor-pointer text-left ${
                    isActive(link.href)
                      ? "text-bnp-gold"
                      : "text-white hover:text-bnp-gold"
                  }`}
                >
                  {link.label}
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
