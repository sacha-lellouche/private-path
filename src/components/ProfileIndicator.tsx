import { Shield, TrendingUp, Target, Leaf, Heart, Lock, Globe, MapPin, Bitcoin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileIndicatorProps {
  profile: {
    riskProfile: string;
    experience: string;
    preferredSectors?: string[];
  };
}

const ProfileIndicator = ({ profile }: ProfileIndicatorProps) => {
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
      ecology: "Écologie",
      health: "Santé",
      defense: "Défense",
      local: "Économie Locale",
      developing: "Pays en Développement",
      blockchain: "Blockchain"
    };
    return labels[sector] || sector;
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getRiskIcon(profile.riskProfile)}
          Votre Profil d'Investisseur
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
        {profile.preferredSectors && profile.preferredSectors.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Secteurs d'intérêt</span>
            <div className="flex flex-wrap gap-2">
              {profile.preferredSectors.map((sector) => (
                <Badge key={sector} variant="default" className="gap-1">
                  {getSectorIcon(sector)}
                  {getSectorLabel(sector)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileIndicator;
