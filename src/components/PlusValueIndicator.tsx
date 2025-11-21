import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const PlusValueIndicator = () => {
  // Données simulées
  const initialInvestment = 180000;
  const currentValue = 195300;
  const plusValue = currentValue - initialInvestment;
  const plusValuePercent = ((plusValue / initialInvestment) * 100).toFixed(2);
  const isPositive = plusValue >= 0;

  return (
    <Card className="bg-gradient-to-br from-[hsl(var(--bnp-gold))]/10 to-[hsl(var(--bnp-gold))]/5 border-[hsl(var(--bnp-gold))]/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-muted-foreground flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
          Plus-Value Totale
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className={`text-3xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{plusValue.toLocaleString('fr-FR')} €
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{plusValuePercent}%
          </span>
          <span className="text-sm text-muted-foreground">
            sur {initialInvestment.toLocaleString('fr-FR')} € investis
          </span>
        </div>
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Valeur actuelle</span>
            <span className="font-semibold text-foreground">{currentValue.toLocaleString('fr-FR')} €</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlusValueIndicator;
