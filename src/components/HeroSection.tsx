import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-banking.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Financial district aerial view" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-bnp-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-bnp-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background/5 backdrop-blur-sm border border-bnp-gold/20">
            <TrendingUp className="w-4 h-4 text-bnp-gold" />
            <span className="text-sm font-light tracking-wide text-background">BANQUE PRIVÉE NOUVELLE GÉNÉRATION</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold text-background leading-[1.1] tracking-tight">
            VOTRE PATRIMOINE,
            <span className="block mt-4 bg-gradient-gold bg-clip-text text-transparent">
              UNE EXPÉRIENCE SUR MESURE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-background/75 max-w-2xl mx-auto leading-relaxed font-light">
            Découvrez des opportunités d'investissement adaptées à votre profil, 
            avec transparence et innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-delayed">
            <Button 
              variant="hero" 
              size="lg"
              className="group min-w-[240px]"
              onClick={() => {
                document.getElementById('risk-game')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Commencer votre parcours
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="premium" 
              size="lg"
              className="min-w-[240px]"
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
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border border-bnp-gold/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-bnp-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
