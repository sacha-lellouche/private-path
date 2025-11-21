import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown, Leaf, Heart, Lock, MapPin, Globe, Bitcoin } from "lucide-react";
import { sectorImpacts } from "@/data/sectorImpacts";

interface PortfolioPositionsProps {
  preferredSectors?: string[];
}

const PortfolioPositions = ({ preferredSectors = [] }: PortfolioPositionsProps) => {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  // Map sectors to products
  const sectorKeyMap: Record<string, string> = {
    ecology: 'ecologie',
    health: 'sante',
    defense: 'defense',
    local: 'localite',
    developing: 'pays-dev',
    blockchain: 'blockchain'
  };

  const getSectorIcon = (sector: string) => {
    const icons: Record<string, any> = {
      ecology: Leaf,
      health: Heart,
      defense: Lock,
      local: MapPin,
      developing: Globe,
      blockchain: Bitcoin
    };
    return icons[sector] || TrendingUp;
  };

  const getSectorColor = (sector: string) => {
    const colors: Record<string, string> = {
      ecology: "text-green-600 bg-green-50 border-green-200",
      health: "text-blue-600 bg-blue-50 border-blue-200",
      defense: "text-red-600 bg-red-50 border-red-200",
      local: "text-orange-600 bg-orange-50 border-orange-200",
      developing: "text-purple-600 bg-purple-50 border-purple-200",
      blockchain: "text-yellow-600 bg-yellow-50 border-yellow-200"
    };
    return colors[sector] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getSectorLabel = (sector: string) => {
    const labels: Record<string, string> = {
      ecology: "🌱 Écologie",
      health: "❤️ Santé",
      defense: "🛡️ Défense",
      local: "📍 Économie Locale",
      developing: "🌍 Pays en Développement",
      blockchain: "₿ Blockchain"
    };
    return labels[sector] || sector;
  };

  // Generate positions based on preferred sectors
  const positions = preferredSectors.map((sector) => {
    const sectorKey = sectorKeyMap[sector];
    const sectorData = sectorImpacts[sectorKey];
    
    if (!sectorData || sectorData.length === 0) return null;
    
    const product = sectorData[0];
    const amount = Math.floor(Math.random() * 40000) + 10000;
    const performance = (Math.random() * 20 - 5).toFixed(2);
    const isPositive = parseFloat(performance) >= 0;
    
    return {
      sector,
      name: product.name,
      type: product.type,
      amount,
      performance,
      isPositive,
      impacts: product.impacts,
      companies: product.companies
    };
  }).filter(Boolean);

  if (positions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mes Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Sélectionnez des secteurs d'intérêt pour voir vos positions d'investissement
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Mes Positions par Secteur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {positions.map((position: any, index: number) => {
            const Icon = getSectorIcon(position.sector);
            const colorClass = getSectorColor(position.sector);
            
            return (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${colorClass}`}
                onClick={() => setSelectedPosition(position)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <Badge variant="secondary" className="text-xs">
                        {position.type}
                      </Badge>
                    </div>
                    <div className={`flex items-center gap-1 ${position.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {position.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-semibold">
                        {position.isPositive ? '+' : ''}{position.performance}%
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-sm mt-2 line-clamp-2">{position.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Montant investi</span>
                      <span className="text-sm font-bold text-foreground">
                        {position.amount.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Plus-value</span>
                      <span className={`text-sm font-semibold ${position.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {position.isPositive ? '+' : ''}{((position.amount * parseFloat(position.performance)) / 100).toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <Badge className="text-xs">{getSectorLabel(position.sector)}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dialog for position details */}
      <Dialog open={!!selectedPosition} onOpenChange={() => setSelectedPosition(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedPosition && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = getSectorIcon(selectedPosition.sector);
                    return <Icon className="w-6 h-6" />;
                  })()}
                  {selectedPosition.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Performance Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className={getSectorColor(selectedPosition.sector)}>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Montant investi</div>
                      <div className="text-2xl font-bold">
                        {selectedPosition.amount.toLocaleString('fr-FR')} €
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={selectedPosition.isPositive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                    <CardContent className="pt-6">
                      <div className="text-sm text-muted-foreground mb-1">Performance</div>
                      <div className={`text-2xl font-bold ${selectedPosition.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedPosition.isPositive ? '+' : ''}{selectedPosition.performance}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Impact Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[hsl(var(--bnp-green))]" />
                    Impact de votre investissement
                  </h3>
                  <div className="space-y-2">
                    {selectedPosition.impacts.map((impact: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-[hsl(var(--bnp-green))]/5 rounded-lg border border-[hsl(var(--bnp-green))]/10">
                        <span className="text-[hsl(var(--bnp-gold))] font-bold mt-0.5">•</span>
                        <p className="text-sm">{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Companies if available */}
                {selectedPosition.companies && selectedPosition.companies.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Entreprises en portefeuille</h3>
                    <div className="space-y-2">
                      {selectedPosition.companies.map((company: any, idx: number) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg border">
                          <div className="font-semibold">{company.name}</div>
                          <div className="text-sm text-muted-foreground">{company.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sector Badge */}
                <div className="pt-4 border-t">
                  <Badge className="bg-gradient-to-r from-[hsl(var(--bnp-green))] to-[hsl(var(--bnp-green-light))] text-white">
                    {getSectorLabel(selectedPosition.sector)}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioPositions;
