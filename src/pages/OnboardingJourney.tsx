import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BalloonGame from "@/components/BalloonGame";
import Questionnaire from "@/components/Questionnaire";
import ResultsSection from "@/components/ResultsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type RiskProfile = "Conservateur" | "Équilibré" | "Audacieux";

export interface UserProfile {
  riskProfile: RiskProfile;
  horizon: string[];
  reactionToCrisis: string;
  knownAssets: string[];
  gameScore: number;
}

const OnboardingJourney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"game" | "questionnaire" | "results">("game");
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGameComplete = (profile: RiskProfile, score: number) => {
    setRiskProfile(profile);
    setUserProfile(prev => ({
      ...prev,
      riskProfile: profile,
      gameScore: score,
      horizon: prev?.horizon || [],
      reactionToCrisis: prev?.reactionToCrisis || "",
      knownAssets: prev?.knownAssets || [],
    }));
    setTimeout(() => setStep("questionnaire"), 1000);
  };

  const handleQuestionnaireComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep("results");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation Back */}
      <div className="fixed top-6 left-6 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-6 right-6 z-50">
        <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "game" ? "bg-bnp-gold text-bnp-green" : "bg-bnp-green text-background"
          }`}>
            1
          </div>
          <div className="w-12 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step !== "game" ? "w-full" : "w-0"
            }`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "questionnaire" ? "bg-bnp-gold text-bnp-green" : step === "results" ? "bg-bnp-green text-background" : "bg-muted text-muted-foreground"
          }`}>
            2
          </div>
          <div className="w-12 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "results" ? "w-full" : "w-0"
            }`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "results" ? "bg-bnp-gold text-bnp-green" : "bg-muted text-muted-foreground"
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        {step === "game" && (
          <BalloonGame onComplete={handleGameComplete} />
        )}
        
        {step === "questionnaire" && riskProfile && (
          <Questionnaire
            initialRiskProfile={riskProfile}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        
        {step === "results" && userProfile && (
          <ResultsSection profile={userProfile} />
        )}
      </div>
    </div>
  );
};

export default OnboardingJourney;
