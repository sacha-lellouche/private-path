import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BalloonGame from "@/components/BalloonGame";
import WheelGame from "@/components/WheelGame";
import Questionnaire from "@/components/Questionnaire";
import ResultsSection from "@/components/ResultsSection";
import TransitionScreen from "@/components/TransitionScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type RiskProfile = "Conservateur" | "Équilibré" | "Audacieux";

export interface UserProfile {
  riskProfile: RiskProfile;
  horizon: string[];
  reactionToCrisis: string;
  knownAssets: string[];
  gameScore: number;
  diversificationScore: number;
  riskTolerance: number;
}

const OnboardingJourney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"game1" | "game2" | "transition" | "questionnaire" | "results">("game1");
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [diversificationScore, setDiversificationScore] = useState(0);
  const [riskTolerance, setRiskTolerance] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleBalloonComplete = (profile: RiskProfile, score: number) => {
    setRiskProfile(profile);
    setUserProfile(prev => ({
      ...prev,
      riskProfile: profile,
      gameScore: score,
      diversificationScore: prev?.diversificationScore || 0,
      riskTolerance: prev?.riskTolerance || 0,
      horizon: prev?.horizon || [],
      reactionToCrisis: prev?.reactionToCrisis || "",
      knownAssets: prev?.knownAssets || [],
    }));
    setTimeout(() => setStep("game2"), 1000);
  };

  const handleWheelComplete = (divScore: number, riskTol: number) => {
    setDiversificationScore(divScore);
    setRiskTolerance(riskTol);
    setUserProfile(prev => ({
      ...prev!,
      diversificationScore: divScore,
      riskTolerance: riskTol,
    }));
    setTimeout(() => setStep("transition"), 1000);
  };

  const handleTransitionComplete = () => {
    setStep("questionnaire");
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
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "game1" ? "bg-bnp-gold text-bnp-green" : "bg-bnp-green text-background"
          }`}>
            1
          </div>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step !== "game1" ? "w-full" : "w-0"
            }`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "game2" ? "bg-bnp-gold text-bnp-green" : (step === "transition" || step === "questionnaire" || step === "results" ? "bg-bnp-green text-background" : "bg-muted text-muted-foreground")
          }`}>
            2
          </div>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "transition" || step === "questionnaire" || step === "results" ? "w-full" : "w-0"
            }`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "transition" || step === "questionnaire" ? "bg-bnp-gold text-bnp-green" : (step === "results" ? "bg-bnp-green text-background" : "bg-muted text-muted-foreground")
          }`}>
            3
          </div>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "results" ? "w-full" : "w-0"
            }`} />
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
            step === "results" ? "bg-bnp-gold text-bnp-green" : "bg-muted text-muted-foreground"
          }`}>
            4
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        {step === "game1" && (
          <BalloonGame onComplete={handleBalloonComplete} />
        )}
        
        {step === "game2" && (
          <WheelGame onComplete={handleWheelComplete} />
        )}

        {step === "transition" && riskProfile && (
          <TransitionScreen
            riskProfile={riskProfile}
            onContinue={handleTransitionComplete}
          />
        )}
        
        {step === "questionnaire" && riskProfile && (
          <Questionnaire
            initialRiskProfile={riskProfile}
            diversificationScore={diversificationScore}
            riskTolerance={riskTolerance}
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
