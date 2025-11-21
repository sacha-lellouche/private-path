import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertTriangle, Award } from "lucide-react";

const RiskGameSection = () => {
  const [balloonSize, setBalloonSize] = useState(20);
  const [isInflating, setIsInflating] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);
  const [potentialReturn, setPotentialReturn] = useState(5);
  const [riskLevel, setRiskLevel] = useState<"Conservateur" | "Équilibré" | "Audacieux" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isInflating && !hasPopped) {
      interval = setInterval(() => {
        setBalloonSize((prev) => {
          const newSize = prev + 2;
          setPotentialReturn(Math.round(5 + (newSize - 20) * 0.5));
          
          // Random pop based on size (higher chance as balloon grows)
          const popChance = Math.min((newSize - 20) / 150, 0.95);
          if (Math.random() < popChance * 0.05) {
            setHasPopped(true);
            setIsInflating(false);
            calculateRiskProfile(newSize);
            return prev;
          }
          
          if (newSize >= 200) {
            setHasPopped(true);
            setIsInflating(false);
            calculateRiskProfile(newSize);
            return 200;
          }
          
          return newSize;
        });
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isInflating, hasPopped]);

  const calculateRiskProfile = (size: number) => {
    if (size < 80) {
      setRiskLevel("Conservateur");
    } else if (size < 140) {
      setRiskLevel("Équilibré");
    } else {
      setRiskLevel("Audacieux");
    }
  };

  const handleStartInflating = () => {
    if (!gameStarted) setGameStarted(true);
    setIsInflating(true);
  };

  const handleStopInflating = () => {
    setIsInflating(false);
    if (balloonSize > 20 && !hasPopped) {
      calculateRiskProfile(balloonSize);
      setHasPopped(true);
    }
  };

  const resetGame = () => {
    setBalloonSize(20);
    setIsInflating(false);
    setHasPopped(false);
    setPotentialReturn(5);
    setRiskLevel(null);
    setGameStarted(true);
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

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              <Target className="w-3 h-3 mr-2" />
              Évaluation Interactive
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-background mb-4">
              Le Ballon des Opportunités
            </h2>
            <p className="text-lg text-background/80">
              Découvrez votre profil d'investisseur de manière ludique. 
              Jusqu'où oserez-vous aller ?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Game Area */}
            <Card className="p-8 bg-background/5 backdrop-blur-sm border-gold/20">
              <div className="flex flex-col items-center justify-center space-y-6">
                {/* Balloon */}
                <div className="relative h-80 flex items-center justify-center">
                  {!hasPopped ? (
                    <div
                      className={`rounded-full bg-gradient-to-br ${getBalloonColor()} shadow-2xl transition-all duration-100 flex items-center justify-center animate-float`}
                      style={{
                        width: `${balloonSize}px`,
                        height: `${balloonSize * 1.2}px`,
                      }}
                    >
                      <div className="text-white font-bold text-xl">
                        {potentialReturn}%
                      </div>
                    </div>
                  ) : (
                    <div className="text-center animate-scale-in">
                      {riskLevel && (
                        <div className="space-y-4">
                          <Award className="w-20 h-20 text-gold mx-auto animate-pulse-glow" />
                          <Badge className="text-lg px-4 py-2 bg-gold text-navy">
                            {riskLevel}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                {!hasPopped ? (
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
                    >
                      {!gameStarted ? "Commencer" : isInflating ? "Gonfler..." : "Maintenir appuyé"}
                    </Button>
                    {gameStarted && (
                      <p className="text-center text-sm text-background/60">
                        Relâchez quand vous voulez sécuriser votre gain
                      </p>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full"
                    onClick={resetGame}
                  >
                    Réessayer
                  </Button>
                )}
              </div>
            </Card>

            {/* Info Panel */}
            <div className="space-y-6">
              {!riskLevel ? (
                <>
                  <div className="flex items-start gap-4 p-4 bg-background/5 backdrop-blur-sm rounded-lg border border-gold/20">
                    <TrendingUp className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-background mb-2">Objectif</h3>
                      <p className="text-background/70 text-sm">
                        Gonflez le ballon pour augmenter le rendement potentiel, mais attention : plus vous gonflez, plus le risque d'éclatement augmente !
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-background/5 backdrop-blur-sm rounded-lg border border-gold/20">
                    <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-background mb-2">Stratégie</h3>
                      <p className="text-background/70 text-sm">
                        Trouvez l'équilibre entre sécurité et rendement. Votre comportement révélera votre profil d'investisseur naturel.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gold/10 backdrop-blur-sm rounded-lg border border-gold/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-background/80 text-sm">Rendement potentiel</span>
                      <span className="text-2xl font-bold text-gold">{potentialReturn}%</span>
                    </div>
                    <div className="h-2 bg-background/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-100"
                        style={{ width: `${Math.min((potentialReturn / 30) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-background/5 backdrop-blur-sm rounded-lg border border-gold/20 animate-fade-in">
                  <h3 className="text-2xl font-bold text-background mb-4">
                    Profil : {riskLevel}
                  </h3>
                  <p className="text-background/80 leading-relaxed mb-6">
                    {getRiskDescription(riskLevel)}
                  </p>
                  <Button variant="hero" className="w-full">
                    Voir mes investissements recommandés
                  </Button>
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
