import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Zap, ArrowRight } from "lucide-react";

interface OnboardingChoiceProps {
  onSelectAdvising: () => void;
  onSelectEducation: () => void;
  onSkipToDashboard: () => void;
}

const OnboardingChoice = ({ 
  onSelectAdvising, 
  onSelectEducation, 
  onSkipToDashboard 
}: OnboardingChoiceProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center space-y-6 mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
          Comment souhaitez-vous commencer ?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choisissez l'option qui correspond le mieux à vos besoins actuels
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Option 1: Conseiller */}
        <Card className="p-8 bg-background border-border hover:border-bnp-gold/50 transition-all duration-300 hover:shadow-elegant group animate-fade-in">
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bnp-gold/10 group-hover:bg-bnp-gold/20 transition-colors">
              <Users className="w-8 h-8 text-bnp-gold" />
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                Accompagnement personnalisé
              </h3>
              <p className="text-muted-foreground mb-4">
                Échangez avec un conseiller expert pour définir votre stratégie d'investissement
              </p>
              
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Analyse approfondie de votre situation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Recommandations sur mesure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Suivi régulier de vos objectifs</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              variant="hero"
              className="w-full gap-2"
              onClick={onSelectAdvising}
            >
              Choisir cette option
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Option 2: Éducation financière */}
        <Card className="p-8 bg-background border-border hover:border-bnp-gold/50 transition-all duration-300 hover:shadow-elegant group animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bnp-gold/10 group-hover:bg-bnp-gold/20 transition-colors">
              <GraduationCap className="w-8 h-8 text-bnp-gold" />
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                Éducation financière
              </h3>
              <p className="text-muted-foreground mb-4">
                Renforcez vos connaissances avec nos modules de formation interactifs
              </p>
              
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Modules adaptés à votre niveau</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Contenus vidéos et articles experts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Certifications de compétences</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              variant="hero"
              className="w-full gap-2"
              onClick={onSelectEducation}
            >
              Commencer la formation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Option 3: Accès direct */}
        <Card className="p-8 bg-background border-border hover:border-bnp-gold/50 transition-all duration-300 hover:shadow-elegant group animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bnp-gold/10 group-hover:bg-bnp-gold/20 transition-colors">
              <Zap className="w-8 h-8 text-bnp-gold" />
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                Accès immédiat
              </h3>
              <p className="text-muted-foreground mb-4">
                Explorez votre dashboard et commencez à investir dès maintenant
              </p>
              
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Accès complet au dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Opportunités d'investissement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-bnp-gold mt-0.5">✓</span>
                  <span>Outils de suivi en temps réel</span>
                </li>
              </ul>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 border-bnp-gold/30 hover:bg-bnp-gold/10"
              onClick={onSkipToDashboard}
            >
              Accéder au dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Vous pourrez modifier ce choix à tout moment depuis votre dashboard
      </p>
    </div>
  );
};

export default OnboardingChoice;
