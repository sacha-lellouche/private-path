import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-banking.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Financial district aerial view" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy/95" />
      </div>

      {/* Animated Background Elements with Stars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bnp-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        {/* Starry Effect */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-bnp-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-bnp-gold/30 text-background">
            <TrendingUp className="w-4 h-4 text-bnp-gold" />
            <span className="text-sm font-medium">Banque Privée Nouvelle Génération</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-background leading-tight">
            Votre patrimoine, 
            <span className="block mt-2 bg-gradient-gold bg-clip-text text-transparent">
              une expérience sur mesure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-background/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez des opportunités d'investissement adaptées à votre profil, 
            avec transparence et innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-delayed">
            <Button 
              variant="hero" 
              size="lg"
              className="group"
              onClick={() => {
                document.getElementById('risk-game')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Commencez votre parcours
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Découvrir nos solutions
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-bnp-gold/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-bnp-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
