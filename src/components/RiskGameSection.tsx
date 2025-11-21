import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertTriangle, Award } from "lucide-react";

const RiskGameSection = () => {
  const [balloonSize, setBalloonSize] = useState(30);
  const [isInflating, setIsInflating] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const [potentialReturn, setPotentialReturn] = useState(5);
  const [riskLevel, setRiskLevel] = useState<"Conservateur" | "Équilibré" | "Audacieux" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [inflationTime, setInflationTime] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
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
          
          // Calcul du temps d'inflation
          inflationTimeRef.current = (Date.now() - startTimeRef.current) / 1000;
          
          // Chance de pop progressive: augmente significativement avec la taille
          const sizeRatio = (newSize - 30) / 170; // 0 à 1
          const popChance = Math.pow(sizeRatio, 2) * 0.08; // Courbe exponentielle
          
          if (Math.random() < popChance) {
            setHasPopped(true);
            setIsInflating(false);
            setInflationTime(inflationTimeRef.current);
            calculateRiskProfile(newSize, inflationTimeRef.current);
            return prev;
          }
          
          // Limite maximale
          if (newSize >= 200) {
            setHasPopped(true);
            setIsInflating(false);
            setInflationTime(inflationTimeRef.current);
            calculateRiskProfile(200, inflationTimeRef.current);
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

  const calculateRiskProfile = (finalSize: number, timeInflated: number) => {
    // Calcul basé sur la taille finale ET le temps d'inflation
    const sizeScore = finalSize;
    const timeScore = timeInflated * 10; // Plus on maintient longtemps, plus on est audacieux
    const totalScore = sizeScore + timeScore;
    
    console.log("Profile calculation:", { finalSize, timeInflated, totalScore });
    
    if (totalScore < 100) {
      setRiskLevel("Conservateur");
    } else if (totalScore < 180) {
      setRiskLevel("Équilibré");
    } else {
      setRiskLevel("Audacieux");
    }
    
    setGameCompleted(true);
  };

  const handleStartInflating = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    setIsInflating(true);
  };

  const handleStopInflating = () => {
    setIsInflating(false);
    if (balloonSize > 30 && !hasPopped) {
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      setInflationTime(currentTime);
      calculateRiskProfile(balloonSize, currentTime);
      setHasPopped(true);
    }
  };


  const getBalloonColor = () => {
    if (balloonSize < 80) return "from-emerald-400 to-emerald-600";
    if (balloonSize < 140) return "from-amber-400 to-orange-500";
    return "from-red-500 to-rose-700";
  };

  const getRiskDescription = (level: string) => {
    const descriptions = {
      "Conservateur": "Vous privilégiez la sécurité et la préservation du capital. Les placements stables et peu volatils vous conviennent.",
      "Équilibré": "Vous recherchez un équilibre entre croissance et sécurité. Vous acceptez une volatilité modérée pour de meilleurs rendements.",
      "Audacieux": "Vous visez une croissance maximale et acceptez des fluctuations importantes. Les opportunités à haut potentiel vous intéressent."
    };
    return descriptions[level as keyof typeof descriptions];
  };

  const getRiskStats = (level: string) => {
    const stats = {
      "Conservateur": { size: balloonSize, time: inflationTime.toFixed(1), score: "Prudent" },
      "Équilibré": { size: balloonSize, time: inflationTime.toFixed(1), score: "Mesuré" },
      "Audacieux": { size: balloonSize, time: inflationTime.toFixed(1), score: "Dynamique" }
    };
    return stats[level as keyof typeof stats];
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Starry Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-bnp-gold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-bnp-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-bnp-gold/20 text-bnp-gold border-bnp-gold/30">
              <Target className="w-3 h-3 mr-2" />
              Évaluation Interactive
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
              Le Ballon des Opportunités
            </h2>
            <p className="text-lg text-background/80 mb-3">
              Découvrez votre profil d'investisseur de manière ludique. 
              Jusqu'où oserez-vous aller ?
            </p>
            {!gameCompleted && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30">
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium text-background/90">
                  Attention : Ce test ne peut être réalisé qu'une seule fois
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Game Area */}
            <Card className="p-8 bg-background/5 backdrop-blur-sm border-bnp-gold/20">
              <div className="flex flex-col items-center justify-center space-y-6">
                {/* Balloon */}
                <div className="relative h-80 flex items-center justify-center">
                  {!hasPopped ? (
                    <div
                      className={`rounded-full bg-gradient-to-br ${getBalloonColor()} shadow-2xl transition-all duration-100 animate-float`}
                      style={{
                        width: `${balloonSize}px`,
                        height: `${balloonSize * 1.2}px`,
                      }}
                    />
                  ) : (
                    <div className="text-center animate-scale-in">
                      {riskLevel && (
                        <div className="space-y-4">
                          <Award className="w-20 h-20 text-bnp-gold mx-auto animate-pulse-glow" />
                          <Badge className="text-lg px-4 py-2 bg-bnp-gold text-primary">
                            {riskLevel}
                          </Badge>
                          <div className="text-background/70 text-sm space-y-1">
                            <p>Taille: {getRiskStats(riskLevel).size.toFixed(0)}px</p>
                            <p>Temps: {getRiskStats(riskLevel).time}s</p>
                            <p className="font-semibold text-bnp-gold">{getRiskStats(riskLevel).score}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                {!hasPopped && (
                  <div className="w-full space-y-4">
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onMouseDown={handleStartInflating}
                      onMouseUp={handleStopInflating}
                      onMouseLeave={handleStopInflating}
                      onTouchStart={handleStartInflating}
                      onTouchEnd={handleStopInflating}
                      disabled={gameCompleted}
                    >
                      {!gameStarted ? "Commencer le test" : isInflating ? "Gonfler..." : "Maintenir appuyé"}
                    </Button>
                    {gameStarted && (
                      <p className="text-center text-sm text-background/60">
                        Relâchez quand vous pensez avoir atteint votre limite
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Info Panel */}
            <div className="space-y-6">
              {!riskLevel ? (
                <>
                  <div className="flex items-start gap-4 p-4 bg-background/5 backdrop-blur-sm rounded-lg border border-bnp-gold/20">
                    <TrendingUp className="w-6 h-6 text-bnp-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-background mb-2">Objectif</h3>
                      <p className="text-background/70 text-sm">
                        Gonflez le ballon en maintenant le bouton. Plus vous gonflez longtemps et gros, plus le rendement augmente, mais le risque aussi !
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-background/5 backdrop-blur-sm rounded-lg border border-bnp-gold/20">
                    <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-background mb-2">Stratégie</h3>
                      <p className="text-background/70 text-sm">
                        Le ballon peut éclater à tout moment ! Trouvez le bon équilibre entre prendre des risques et sécuriser vos gains.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-bnp-gold/10 backdrop-blur-sm rounded-lg border border-bnp-gold/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-background/80 text-sm">Rendement potentiel</span>
                      <span className="text-2xl font-bold text-bnp-gold">{potentialReturn}%</span>
                    </div>
                    <div className="h-2 bg-background/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-bnp-gold to-bnp-gold-light transition-all duration-100"
                        style={{ width: `${Math.min((potentialReturn / 30) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-background/5 backdrop-blur-sm rounded-lg border border-bnp-gold/20 animate-fade-in space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-background mb-2">
                      Profil : {riskLevel}
                    </h3>
                    <p className="text-background/80 leading-relaxed">
                      {getRiskDescription(riskLevel)}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-bnp-gold/10 rounded-lg">
                    <h4 className="text-sm font-semibold text-background mb-2">Votre performance</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-background/60">Rendement visé</span>
                        <p className="text-bnp-gold font-bold">{potentialReturn}%</p>
                      </div>
                      <div>
                        <span className="text-background/60">Durée d'inflation</span>
                        <p className="text-bnp-gold font-bold">{inflationTime.toFixed(1)}s</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-bnp-gold/20 rounded-lg border-2 border-bnp-gold/40">
                    <div className="flex items-start gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-bnp-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-background mb-1">
                          Affinez votre profil investisseur
                        </h4>
                        <p className="text-sm text-background/80">
                          Répondez à notre questionnaire personnalisé pour obtenir des recommandations d'investissement parfaitement adaptées à votre situation et vos objectifs.
                        </p>
                      </div>
                    </div>
                    <Button variant="hero" className="w-full shadow-elegant" size="lg">
                      Compléter mon profil maintenant
                    </Button>
                  </div>

                  <p className="text-xs text-center text-background/50">
                    🔒 Vos données sont strictement confidentielles
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskGameSection;
