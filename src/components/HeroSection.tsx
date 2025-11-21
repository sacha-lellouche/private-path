import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-banking-new.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-bnp-green leading-tight tracking-tight">
            Services de Banque Privée
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto font-light">
            Quelle que soit la complexité de votre situation financière, vous pouvez compter sur une équipe disposant des connaissances et de l'expérience dont vous avez besoin. Une banque privée efficace et personnalisée à la fois.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              size="lg"
              className="bg-bnp-gold hover:bg-bnp-gold/90 text-bnp-green px-10 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/parcours")}
            >
              Commencer votre parcours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
