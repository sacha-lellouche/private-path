import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import type { RiskProfile } from "@/pages/OnboardingJourney";

interface TransitionScreenProps {
  riskProfile: RiskProfile;
  onContinue: () => void;
}

const TransitionScreen = ({ riskProfile, onContinue }: TransitionScreenProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 md:p-12 bg-background/80 backdrop-blur-sm border-bnp-green/20 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bnp-gold/10">
            <Sparkles className="w-10 h-10 text-bnp-gold" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Nous commençons à vous connaître !
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Grâce à vos performances aux mini-jeux, nous avons pu établir des premières 
              hypothèses sur votre profil d'investisseur.
            </p>
          </div>

          {/* Insights */}
          <div className="bg-gradient-hero rounded-xl p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="w-6 h-6 text-bnp-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-background mb-1">Profil de risque identifié</h3>
                  <p className="text-background/80 text-sm">
                    Vous semblez être un investisseur <strong>{riskProfile}</strong> d'après votre comportement dans les jeux.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="w-6 h-6 text-bnp-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-background mb-1">Stratégie d'allocation observée</h3>
                  <p className="text-background/80 text-sm">
                    Votre répartition dans la roue des investissements nous en dit long sur 
                    vos préférences et votre tolérance au risque.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <CheckCircle2 className="w-6 h-6 text-bnp-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-background mb-1">Suggestions pré-remplies</h3>
                  <p className="text-background/80 text-sm">
                    Dans le questionnaire suivant, certaines réponses seront pré-sélectionnées 
                    en fonction de vos résultats. Vous pouvez les modifier à tout moment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-bnp-gold/10 rounded-lg p-6 border border-bnp-gold/20 max-w-2xl mx-auto">
            <p className="text-sm text-foreground">
              💡 <strong>Important :</strong> Ces suggestions sont là pour vous guider, 
              mais vous restez libre de les ajuster selon votre situation réelle et vos objectifs personnels.
            </p>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            variant="hero"
            onClick={onContinue}
            className="gap-2 min-w-[280px]"
          >
            Continuer vers le questionnaire
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TransitionScreen;
