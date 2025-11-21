import { Shield, TrendingUp, Target, Leaf, Heart, Lock, Globe, MapPin, Bitcoin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectorInterestsDialog from "./SectorInterestsDialog";
import { useState } from "react";

interface ProfileIndicatorProps {
  profile: {
    riskProfile: string;
    experience: string;
    preferredSectors?: string[];
  };
}

const ProfileIndicator = ({ profile }: ProfileIndicatorProps) => {
  const [currentSectors, setCurrentSectors] = useState(profile.preferredSectors || []);

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "conservateur":
        return <Shield className="w-5 h-5" />;
      case "équilibré":
        return <Target className="w-5 h-5" />;
      case "dynamique":
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case "ecology":
        return <Leaf className="w-4 h-4" />;
      case "health":
        return <Heart className="w-4 h-4" />;
      case "defense":
        return <Lock className="w-4 h-4" />;
      case "local":
        return <MapPin className="w-4 h-4" />;
      case "developing":
        return <Globe className="w-4 h-4" />;
      case "blockchain":
        return <Bitcoin className="w-4 h-4" />;
      default:
        return null;
    }
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

  const handleSectorsSave = (newSectors: string[]) => {
    setCurrentSectors(newSectors);
    profile.preferredSectors = newSectors;
  };

  return (
    <Card className="bg-gradient-to-br from-[hsl(var(--bnp-green))]/5 to-[hsl(var(--bnp-gold))]/10 border-[hsl(var(--bnp-green))]/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            {getRiskIcon(profile.riskProfile)}
            Votre Profil d'Investisseur
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Profil de risque</span>
          <Badge variant="secondary" className="capitalize">
            {profile.riskProfile}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Expérience</span>
          <Badge variant="outline" className="capitalize">
            {profile.experience}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mes Centres d'Intérêt</span>
            <SectorInterestsDialog currentSectors={currentSectors} onSave={handleSectorsSave} />
          </div>
          {currentSectors.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {currentSectors.map((sector) => (
                <Badge 
                  key={sector} 
                  className="gap-1 bg-gradient-to-r from-[hsl(var(--bnp-green))] to-[hsl(var(--bnp-green-light))] text-white border-none hover:shadow-lg transition-shadow text-sm px-3 py-1.5"
                >
                  {getSectorLabel(sector)}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">Aucun secteur sélectionné</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileIndicator;
