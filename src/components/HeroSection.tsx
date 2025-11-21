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
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-background leading-tight uppercase tracking-wider">
            Banque privée
          </h1>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-bnp-gold hover:bg-bnp-gold/90 text-bnp-green px-8 py-6 text-base font-medium"
            onClick={() => navigate("/parcours")}
          >
            Commencer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
