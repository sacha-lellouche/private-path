import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BalloonGame from "@/components/BalloonGame";
import WheelGame from "@/components/WheelGame";
import Questionnaire from "@/components/Questionnaire";
import ResultsSection from "@/components/ResultsSection";
import OnboardingChoice from "@/components/OnboardingChoice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export type RiskProfile = "Conservateur" | "Équilibré" | "Audacieux";

export interface UserProfile {
  riskProfile: RiskProfile;
  horizon: string[];
  reactionToCrisis: string;
  knownAssets: string[];
  preferredSectors: string[];
  gameScore: number;
  diversificationScore: number;
  riskTolerance: number;
}

const OnboardingJourney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"game1" | "game2" | "questionnaire" | "results" | "choice">("game1");
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
      preferredSectors: prev?.preferredSectors || [],
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
    setTimeout(() => setStep("questionnaire"), 1000);
  };

  const handleQuestionnaireComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setStep("results");
  };

  const handleResultsComplete = () => {
    setStep("choice");
  };

  const handleChoiceComplete = () => {
    navigate("/dashboard");
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
          <button 
            onClick={() => setStep("game1")}
            disabled={step === "game1"}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === "game1" ? "bg-bnp-gold text-bnp-green" : "bg-bnp-green text-background hover:bg-bnp-green/80 cursor-pointer"
            } disabled:cursor-default`}
          >
            1
          </button>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step !== "game1" ? "w-full" : "w-0"
            }`} />
          </div>
          <button
            onClick={() => {
              if (step !== "game1") setStep("game2");
            }}
            disabled={step === "game1"}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === "game2" ? "bg-bnp-gold text-bnp-green" : (step === "questionnaire" || step === "results" || step === "choice" ? "bg-bnp-green text-background hover:bg-bnp-green/80 cursor-pointer" : "bg-muted text-muted-foreground")
            } disabled:cursor-not-allowed`}
          >
            2
          </button>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "questionnaire" || step === "results" || step === "choice" ? "w-full" : "w-0"
            }`} />
          </div>
          <button
            onClick={() => {
              if (step !== "game1" && step !== "game2") setStep("questionnaire");
            }}
            disabled={step === "game1" || step === "game2"}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === "questionnaire" ? "bg-bnp-gold text-bnp-green" : (step === "results" || step === "choice" ? "bg-bnp-green text-background hover:bg-bnp-green/80 cursor-pointer" : "bg-muted text-muted-foreground")
            } disabled:cursor-not-allowed`}
          >
            3
          </button>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "results" || step === "choice" ? "w-full" : "w-0"
            }`} />
          </div>
          <button
            onClick={() => {
              if (step !== "game1" && step !== "game2" && step !== "questionnaire") setStep("results");
            }}
            disabled={step === "game1" || step === "game2" || step === "questionnaire"}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === "results" ? "bg-bnp-gold text-bnp-green" : (step === "choice" ? "bg-bnp-green text-background hover:bg-bnp-green/80 cursor-pointer" : "bg-muted text-muted-foreground")
            } disabled:cursor-not-allowed`}
          >
            4
          </button>
          <div className="w-8 h-0.5 bg-border">
            <div className={`h-full bg-bnp-gold transition-all duration-500 ${
              step === "choice" ? "w-full" : "w-0"
            }`} />
          </div>
          <button
            onClick={() => {
              if (step !== "game1" && step !== "game2" && step !== "questionnaire" && step !== "results") setStep("choice");
            }}
            disabled={step === "game1" || step === "game2" || step === "questionnaire" || step === "results"}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
              step === "choice" ? "bg-bnp-gold text-bnp-green" : "bg-muted text-muted-foreground"
            } disabled:cursor-not-allowed`}
          >
            5
          </button>
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
        
        {step === "questionnaire" && riskProfile && (
          <Questionnaire
            initialRiskProfile={riskProfile}
            diversificationScore={diversificationScore}
            riskTolerance={riskTolerance}
            onComplete={handleQuestionnaireComplete}
          />
        )}
        
        {step === "results" && userProfile && (
          <ResultsSection profile={userProfile} onContinue={handleResultsComplete} />
        )}
        
        {step === "choice" && (
          <OnboardingChoice
            onSelectAdvising={handleChoiceComplete}
            onSelectEducation={handleChoiceComplete}
            onSkipToDashboard={handleChoiceComplete}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingJourney;
