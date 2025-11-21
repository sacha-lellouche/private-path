import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import type { RiskProfile } from "@/pages/OnboardingJourney";

interface WheelGameProps {
  onComplete: (diversificationScore: number, riskTolerance: number) => void;
}

const WheelGame = ({ onComplete }: WheelGameProps) => {
  const [tokens, setTokens] = useState(10);
  const [allocation, setAllocation] = useState({
    immobilier: 0,
    actions: 0,
    privateEquity: 0,
    crypto: 0,
    etf: 0,
    obligations: 0,
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{
    scenario: string;
    impact: string;
    performance: number;
  } | null>(null);

  const assets = [
    { 
      id: "immobilier", 
      label: "Immobilier", 
      icon: "🏠", 
      return: "+8%", 
      risk: "Faible",
      color: "hsl(150, 60%, 50%)",
    },
    { 
      id: "actions", 
      label: "Actions", 
      icon: "📈", 
      return: "+12%", 
      risk: "Moyen",
      color: "hsl(200, 70%, 50%)",
    },
    { 
      id: "privateEquity", 
      label: "Private Equity", 
      icon: "💎", 
      return: "+15%", 
      risk: "Élevé",
      color: "hsl(280, 60%, 50%)",
    },
    { 
      id: "crypto", 
      label: "Crypto", 
      icon: "🌍", 
      return: "+20%", 
      risk: "Très élevé",
      color: "hsl(30, 90%, 50%)",
    },
    { 
      id: "etf", 
      label: "ETF", 
      icon: "📊", 
      return: "+10%", 
      risk: "Moyen",
      color: "hsl(180, 60%, 50%)",
    },
    { 
      id: "obligations", 
      label: "Obligations", 
      icon: "🛡️", 
      return: "+4%", 
      risk: "Très faible",
      color: "hsl(120, 40%, 50%)",
    },
  ];

  const scenarios = [
    { 
      name: "Boom Technologique", 
      impact: { actions: 1.5, crypto: 2, privateEquity: 1.8, etf: 1.3, immobilier: 1.1, obligations: 1 },
      icon: "🚀",
    },
    { 
      name: "Crise Immobilière", 
      impact: { immobilier: 0.7, actions: 0.9, privateEquity: 0.85, crypto: 1.2, etf: 0.95, obligations: 1.05 },
      icon: "📉",
    },
    { 
      name: "Inflation Élevée", 
      impact: { obligations: 0.8, immobilier: 1.3, actions: 1.1, crypto: 1.4, privateEquity: 1.2, etf: 1.1 },
      icon: "📊",
    },
    { 
      name: "Stabilité du Marché", 
      impact: { immobilier: 1.08, actions: 1.12, privateEquity: 1.15, crypto: 1.2, etf: 1.1, obligations: 1.04 },
      icon: "✨",
    },
  ];

  const addToken = (assetId: string) => {
    if (tokens > 0) {
      setAllocation(prev => ({ ...prev, [assetId]: prev[assetId as keyof typeof prev] + 1 }));
      setTokens(prev => prev - 1);
    }
  };

  const removeToken = (assetId: string) => {
    if (allocation[assetId as keyof typeof allocation] > 0) {
      setAllocation(prev => ({ ...prev, [assetId]: prev[assetId as keyof typeof prev] - 1 }));
      setTokens(prev => prev + 1);
    }
  };

  const spinWheel = () => {
    setIsSpinning(true);
    
    setTimeout(() => {
      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      let totalPerformance = 0;
      
      Object.entries(allocation).forEach(([asset, count]) => {
        const multiplier = randomScenario.impact[asset as keyof typeof randomScenario.impact];
        totalPerformance += count * multiplier * 10;
      });

      const finalPerformance = Math.round(totalPerformance - 100);
      
      setResult({
        scenario: randomScenario.name,
        impact: randomScenario.icon,
        performance: finalPerformance,
      });

      // Calcul du score de diversification (0-100)
      const allocatedAssets = Object.values(allocation).filter(v => v > 0).length;
      const diversificationScore = (allocatedAssets / 6) * 100;
      
      // Calcul de la tolérance au risque basée sur l'allocation
      const riskWeights = {
        crypto: 4,
        privateEquity: 3,
        actions: 2,
        etf: 2,
        immobilier: 1,
        obligations: 0,
      };
      
      let riskScore = 0;
      Object.entries(allocation).forEach(([asset, count]) => {
        riskScore += count * riskWeights[asset as keyof typeof riskWeights];
      });
      const riskTolerance = Math.min((riskScore / 40) * 100, 100);

      setIsSpinning(false);
      
      setTimeout(() => {
        onComplete(diversificationScore, riskTolerance);
      }, 3000);
    }, 2000);
  };

  const canSpin = tokens === 0;

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-8 md:p-12 bg-background/80 backdrop-blur-sm border-bnp-green/20">
        {/* Header */}
        {!result && (
          <div className="text-center space-y-6 mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bnp-gold/10 border border-bnp-gold/30">
              <Sparkles className="w-4 h-4 text-bnp-gold" />
              <span className="text-sm font-medium text-foreground">Étape 2 : La Roue des Investissements</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
              Répartissez vos jetons
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vous avez <strong className="text-bnp-gold">{tokens} jetons</strong> à placer sur différents types d'actifs. 
              Choisissez votre stratégie, puis faites tourner la roue pour découvrir le résultat !
            </p>
          </div>
        )}

        {/* Assets Grid */}
        {!result && !isSpinning && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {assets.map((asset) => (
              <Card
                key={asset.id}
                className="p-6 bg-background border-border hover:border-bnp-gold/50 transition-all"
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl mb-2">{asset.icon}</div>
                  <h3 className="font-semibold text-foreground">{asset.label}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="text-bnp-gold font-medium">{asset.return}/an</div>
                    <Badge variant="outline" className="text-xs">
                      Risque {asset.risk}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeToken(asset.id)}
                      disabled={allocation[asset.id as keyof typeof allocation] === 0}
                      className="w-8 h-8 p-0"
                    >
                      -
                    </Button>
                    <div className="w-12 text-center">
                      <div className="text-2xl font-bold text-bnp-gold">
                        {allocation[asset.id as keyof typeof allocation]}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToken(asset.id)}
                      disabled={tokens === 0}
                      className="w-8 h-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Spinning Animation */}
        {isSpinning && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-8xl mb-6 animate-spin">🎯</div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
              La roue tourne...
            </h3>
            <p className="text-muted-foreground">
              Découvrez le scénario économique !
            </p>
          </div>
        )}

        {/* Result */}
        {result && !isSpinning && (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-8xl mb-4">{result.impact}</div>
            
            <div>
              <Badge className="mb-3 text-base px-4 py-1 bg-bnp-gold text-bnp-green border-0">
                Scénario
              </Badge>
              <h3 className="text-3xl font-serif font-semibold text-foreground mb-3">
                {result.scenario}
              </h3>
            </div>

            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-hero">
              {result.performance >= 0 ? (
                <TrendingUp className="w-8 h-8 text-bnp-gold" />
              ) : (
                <TrendingDown className="w-8 h-8 text-destructive" />
              )}
              <div className="text-left">
                <div className="text-sm text-background/70">Performance</div>
                <div className={`text-3xl font-bold ${result.performance >= 0 ? 'text-bnp-gold' : 'text-destructive'}`}>
                  {result.performance >= 0 ? '+' : ''}{result.performance}%
                </div>
              </div>
            </div>

            <div className="pt-6 max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                {result.performance >= 0 ? (
                  <>✨ Excellente stratégie ! Votre diversification vous a permis de tirer profit de ce scénario.</>
                ) : (
                  <>📉 Votre allocation était concentrée sur des actifs impactés négativement. La diversification aide à limiter les risques !</>
                )}
              </p>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Passons maintenant au questionnaire pour affiner votre profil...
            </p>
          </div>
        )}

        {/* CTA */}
        {!result && !isSpinning && (
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              variant="hero"
              onClick={spinWheel}
              disabled={!canSpin}
              className="min-w-[240px]"
            >
              {canSpin ? "Faire tourner la roue ! 🎯" : `Placez vos ${tokens} jetons restants`}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WheelGame;
