import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingDown, Sparkles } from "lucide-react";
import type { RiskProfile, UserProfile } from "@/pages/OnboardingJourney";

interface QuestionnaireProps {
  initialRiskProfile: RiskProfile;
  onComplete: (profile: UserProfile) => void;
}

const Questionnaire = ({ initialRiskProfile, onComplete }: QuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [horizon, setHorizon] = useState<string[]>([]);
  const [reaction, setReaction] = useState<string>("");
  const [assets, setAssets] = useState<string[]>([]);

  const questions = [
    {
      id: "horizon",
      title: "Quel est votre horizon d'investissement ?",
      subtitle: "Sélectionnez tous les objectifs qui correspondent à votre situation",
      type: "multi-select",
      options: [
        { value: "court", label: "Court terme", icon: "🚀", desc: "Faire fructifier rapidement (1-3 ans)" },
        { value: "moyen-maison", label: "Projet immobilier", icon: "🏡", desc: "Acheter une maison dans 5 ans" },
        { value: "moyen-enfants", label: "Éducation", icon: "🎓", desc: "Financer les études dans 10 ans" },
        { value: "long", label: "Retraite", icon: "🌴", desc: "Préparer ma retraite (20+ ans)" },
      ],
    },
    {
      id: "reaction",
      title: "Le marché chute de 20% soudainement",
      subtitle: "Quelle serait votre réaction ?",
      type: "single-select",
      options: [
        { value: "panic", label: "Je vends tout", icon: "😨", desc: "Je préfère sécuriser et limiter les pertes" },
        { value: "wait", label: "J'attends de voir", icon: "🤔", desc: "Je laisse passer l'orage sans agir" },
        { value: "buy", label: "J'achète plus", icon: "💰", desc: "C'est une opportunité d'investir !" },
        { value: "calm", label: "Je reste zen", icon: "🧘", desc: "Je garde mon plan à long terme" },
      ],
    },
    {
      id: "assets",
      title: "Quels actifs connaissez-vous ?",
      subtitle: "Sélectionnez ceux que vous connaissez ou possédez déjà",
      type: "multi-select",
      options: [
        { value: "immobilier", label: "Immobilier", icon: "🏠", desc: "SCPI, immobilier locatif" },
        { value: "actions", label: "Actions", icon: "📈", desc: "Bourse, actions internationales" },
        { value: "private-equity", label: "Private Equity", icon: "💎", desc: "Fonds non cotés, start-ups" },
        { value: "crypto", label: "Crypto", icon: "🌍", desc: "Bitcoin, crypto-actifs régulés" },
        { value: "etf", label: "ETF", icon: "📊", desc: "Fonds indiciels diversifiés" },
        { value: "fonds", label: "Fonds", icon: "💼", desc: "Fonds diversifiés classiques" },
      ],
    },
  ];

  const currentQ = questions[currentQuestion];

  const handleMultiSelect = (value: string) => {
    if (currentQ.id === "horizon") {
      setHorizon(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (currentQ.id === "assets") {
      setAssets(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const handleSingleSelect = (value: string) => {
    setReaction(value);
  };

  const canProceed = () => {
    if (currentQ.id === "horizon") return horizon.length > 0;
    if (currentQ.id === "reaction") return reaction !== "";
    if (currentQ.id === "assets") return assets.length > 0;
    return false;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Compléter le questionnaire
      onComplete({
        riskProfile: initialRiskProfile,
        horizon,
        reactionToCrisis: reaction,
        knownAssets: assets,
        gameScore: 0,
      });
    }
  };

  const getSuggestion = () => {
    if (currentQ.id === "reaction" && initialRiskProfile === "Audacieux") {
      return "💡 Votre profil audacieux suggère : 'J'achète plus' !";
    }
    if (currentQ.id === "horizon" && initialRiskProfile === "Conservateur") {
      return "💡 Nous suggérons des objectifs à long terme pour limiter les risques.";
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 md:p-12 bg-background/80 backdrop-blur-sm border-bnp-green/20">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} sur {questions.length}
            </span>
            <Badge variant="outline" className="border-bnp-gold/30 bg-bnp-gold/10">
              Profil : {initialRiskProfile}
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-gold transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Header */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bnp-gold/10 border border-bnp-gold/30">
            <Sparkles className="w-4 h-4 text-bnp-gold" />
            <span className="text-sm font-medium text-foreground">Étape 2 : Affinons votre profil</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
            {currentQ.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {currentQ.subtitle}
          </p>
          {getSuggestion() && (
            <div className="inline-block px-4 py-2 bg-bnp-gold/10 rounded-lg border border-bnp-gold/20">
              <p className="text-sm text-foreground">{getSuggestion()}</p>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQ.options.map((option) => {
            const isSelected =
              currentQ.type === "multi-select"
                ? (currentQ.id === "horizon" ? horizon : assets).includes(option.value)
                : reaction === option.value;

            return (
              <button
                key={option.value}
                onClick={() =>
                  currentQ.type === "multi-select"
                    ? handleMultiSelect(option.value)
                    : handleSingleSelect(option.value)
                }
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                  isSelected
                    ? "border-bnp-gold bg-bnp-gold/10 shadow-glow"
                    : "border-border bg-background hover:border-bnp-gold/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {option.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-bnp-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button
            size="lg"
            variant="hero"
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2 min-w-[200px]"
          >
            {currentQuestion < questions.length - 1 ? "Question suivante" : "Voir mes résultats"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Questionnaire;
