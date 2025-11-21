import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, AlertTriangle, Award, Sparkles } from "lucide-react";
import type { RiskProfile } from "@/pages/OnboardingJourney";

interface BalloonGameProps {
  onComplete: (profile: RiskProfile, score: number) => void;
}

const BalloonGame = ({ onComplete }: BalloonGameProps) => {
  const [balloonSize, setBalloonSize] = useState(30);
  const [isInflating, setIsInflating] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [potentialReturn, setPotentialReturn] = useState(5);
  const [riskLevel, setRiskLevel] = useState<RiskProfile | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [inflationTime, setInflationTime] = useState(0);
  const inflationTimeRef = useRef(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isInflating && !hasPopped) {
      if (startTimeRef.current === 0) {
        startTimeRef.current = Date.now();
      }

      interval = setInterval(() => {
        setBalloonSize((prev) => {
          const newSize = prev + 3;
          const returnRate = Math.round(5 + (newSize - 30) * 0.4);
          setPotentialReturn(returnRate);
          
          inflationTimeRef.current = (Date.now() - startTimeRef.current) / 1000;
          
          const sizeRatio = (newSize - 30) / 170;
          const popChance = Math.pow(sizeRatio, 2) * 0.08;
          
          if (Math.random() < popChance) {
            setExploded(true);
            setHasPopped(true);
            setIsInflating(false);
            setInflationTime(inflationTimeRef.current);
            calculateRiskProfile(newSize, inflationTimeRef.current, true);
            return prev;
          }
          
          if (newSize >= 200) {
            setExploded(true);
            setHasPopped(true);
            setIsInflating(false);
            setInflationTime(inflationTimeRef.current);
            calculateRiskProfile(200, inflationTimeRef.current, true);
            return 200;
          }
          
          return newSize;
        });
      }, 60);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInflating, hasPopped]);

  const calculateRiskProfile = (finalSize: number, timeInflated: number, didExplode: boolean) => {
    let profile: RiskProfile;
    let score = 0;
    
    if (didExplode) {
      profile = "Audacieux";
      score = finalSize;
    } else {
      const sizeScore = finalSize;
      const timeScore = timeInflated * 15;
      const totalScore = sizeScore + timeScore;
      score = totalScore;
      
      if (totalScore < 120) {
        profile = "Conservateur";
      } else if (totalScore < 200) {
        profile = "Équilibré";
      } else {
        profile = "Audacieux";
      }
    }
    
    setRiskLevel(profile);
    setTimeout(() => {
      onComplete(profile, score);
    }, 2000);
  };

  const startInflating = () => {
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }
    if (!hasPopped && gameStarted) {
      setIsInflating(true);
    }
  };

  const stopInflating = () => {
    if (!gameStarted) return;
    
    if (!hasPopped && isInflating) {
      setIsInflating(false);
      setHasPopped(true);
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      setInflationTime(currentTime);
      calculateRiskProfile(balloonSize, currentTime, false);
    }
  };

  const getBalloonColor = () => {
    if (hasPopped) return exploded ? "#ef4444" : "#10b981";
    if (balloonSize < 70) return "#10b981";
    if (balloonSize < 140) return "#f59e0b";
    return "#ef4444";
  };

  const getRiskBadgeVariant = () => {
    if (balloonSize < 70) return "default";
    if (balloonSize < 140) return "secondary";
    return "destructive";
  };

  const profileDescriptions = {
    "Conservateur": "Vous privilégiez la sécurité et la stabilité de votre capital.",
    "Équilibré": "Vous recherchez un équilibre entre rendement et sécurité.",
    "Audacieux": "Vous êtes prêt à prendre des risques pour maximiser vos gains.",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 md:p-12 bg-background/80 backdrop-blur-sm border-bnp-green/20">
        {/* Header */}
        {!gameStarted && (
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bnp-gold/10 border border-bnp-gold/30">
              <Sparkles className="w-4 h-4 text-bnp-gold" />
              <span className="text-sm font-medium text-foreground">Étape 1 : Évaluation ludique</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
              Le Ballon des Opportunités
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gonflez le ballon pour maximiser votre rendement. Mais attention : plus vous gonflez, 
              plus le risque d'explosion augmente !
            </p>
            <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/5">
              ⚠️ Ce test ne peut être réalisé qu'une seule fois
            </Badge>
          </div>
        )}

        {gameStarted && !hasPopped && (
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-serif font-semibold text-foreground mb-2">
              Jusqu'où irez-vous ?
            </h2>
            <p className="text-muted-foreground">
              Relâchez le bouton quand vous pensez avoir atteint le bon équilibre
            </p>
          </div>
        )}

        {/* Game Area */}
        <div className="flex flex-col items-center gap-8">
          {/* Balloon Container - Fixed Height */}
          <div className="relative flex items-center justify-center" style={{ minHeight: "240px", width: "240px" }}>
            <div
              className="rounded-full transition-all duration-100 flex items-center justify-center shadow-2xl absolute"
              style={{
                width: `${balloonSize}px`,
                height: `${balloonSize}px`,
                backgroundColor: getBalloonColor(),
                transform: hasPopped ? (exploded ? "scale(0)" : "scale(1.05)") : "scale(1)",
                transition: hasPopped ? "transform 0.3s ease-out" : "all 0.1s ease-out",
              }}
            >
              {hasPopped && exploded && (
                <div className="absolute inset-0 flex items-center justify-center text-4xl animate-scale-in">
                  💥
                </div>
              )}
              {!hasPopped && (
                <div className="text-white font-bold text-xl">
                  +{potentialReturn}%
                </div>
              )}
            </div>
            
            {/* Balloon String */}
            {!hasPopped && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-400"
                style={{ height: "40px", top: `${120 + balloonSize/2}px` }}
              />
            )}
          </div>

          {/* Stats */}
          {!hasPopped && gameStarted && (
            <div className="flex gap-6 animate-fade-in">
              <div className="text-center">
                <div className="text-3xl font-bold text-bnp-gold">{potentialReturn}%</div>
                <div className="text-sm text-muted-foreground">Rendement potentiel</div>
              </div>
              <div className="text-center">
                <Badge variant={getRiskBadgeVariant()} className="text-base px-4 py-1">
                  {balloonSize < 70 ? "Faible" : balloonSize < 140 ? "Modéré" : "Élevé"}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Niveau de risque</div>
              </div>
            </div>
          )}

          {/* Controls */}
          {!hasPopped && (
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              {!gameStarted ? (
                <Button
                  size="lg"
                  variant="hero"
                  className="w-full text-lg py-6"
                  onClick={startInflating}
                >
                  Commencer le jeu
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    variant="hero"
                    className="w-full text-lg py-6 select-none touch-none"
                    onMouseDown={startInflating}
                    onMouseUp={stopInflating}
                    onMouseLeave={stopInflating}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      startInflating();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      stopInflating();
                    }}
                    onTouchCancel={stopInflating}
                  >
                    Maintenez pour gonfler
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Relâchez quand vous le souhaitez pour sécuriser votre gain
                  </p>
                </>
              )}
            </div>
          )}

          {/* Results */}
          {hasPopped && riskLevel && (
            <div className="text-center space-y-6 animate-fade-in max-w-2xl">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bnp-gold/10 border border-bnp-gold/30">
                <Award className="w-5 h-5 text-bnp-gold" />
                <span className="font-semibold text-foreground">Résultat</span>
              </div>
              
              <div>
                <h3 className="text-3xl font-serif font-semibold text-foreground mb-3">
                  Profil : {riskLevel}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {profileDescriptions[riskLevel]}
                </p>
              </div>

              {exploded ? (
                <div className="p-6 bg-destructive/10 rounded-xl border border-destructive/20">
                  <p className="text-foreground">
                    💥 Votre ballon a explosé ! Vous avez atteint <strong>+{potentialReturn}%</strong> avant l'explosion. 
                    Cela montre que vous êtes prêt à prendre des risques significatifs pour maximiser vos gains.
                  </p>
                </div>
              ) : (
                <div className="p-6 bg-bnp-gold/10 rounded-xl border border-bnp-gold/20">
                  <p className="text-foreground">
                    ✨ Vous avez sécurisé <strong>+{potentialReturn}%</strong> ! Votre décision d'arrêter reflète 
                    une approche {riskLevel.toLowerCase()} de l'investissement.
                  </p>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Passons maintenant à quelques questions pour affiner votre profil...
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BalloonGame;
