import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-banking.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-bnp-green pt-32">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Investment opportunities" 
          className="w-full h-full object-cover blur-md opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-background leading-[1.2] tracking-wide">
            Bienvenue sur la banque privée BNP
          </h1>

          {/* CTA Button */}
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 bg-background/10 border-background/30 text-background hover:bg-background/20"
            onClick={() => navigate("/parcours")}
          >
            Commencer à investir
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
