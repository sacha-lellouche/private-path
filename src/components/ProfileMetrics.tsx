import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Award } from "lucide-react";
import { sectorImpacts } from "@/data/sectorImpacts";

interface ProfileMetricsProps {
  profile: {
    preferredSectors?: string[];
  };
}

const ProfileMetrics = ({ profile }: ProfileMetricsProps) => {
  // Generate metrics based on user's preferred sectors
  const getMetricsForSectors = () => {
    if (!profile.preferredSectors || profile.preferredSectors.length === 0) {
      return [];
    }

    const metrics = [];
    
    // Map sector names to keys in sectorImpacts
    const sectorKeyMap: Record<string, string> = {
      ecology: 'ecologie',
      health: 'sante',
      defense: 'defense',
      local: 'localite',
      developing: 'pays-dev',
      blockchain: 'blockchain'
    };
    
    for (const sector of profile.preferredSectors) {
      const sectorKey = sectorKeyMap[sector];
      const sectorData = sectorImpacts[sectorKey];
      
      if (sectorData && sectorData.length > 0) {
        const product = sectorData[0]; // Take first product as example
        if (product.impacts.length > 0) {
          metrics.push({
            title: product.impacts[0],
            value: getRandomValue(sector),
            icon: getIconForSector(sector),
            color: getColorForSector(sector)
          });
        }
      }
      
      if (metrics.length >= 4) break; // Limit to 4 metrics
    }
    
    return metrics;
  };

  const getRandomValue = (sector: string) => {
    const values: Record<string, string> = {
      ecology: "42 tonnes CO₂",
      health: "1 200 personnes",
      defense: "500M comptes",
      local: "12 emplois",
      developing: "85 microcrédits",
      blockchain: "1.2 BTC"
    };
    return values[sector] || "N/A";
  };

  const getIconForSector = (sector: string) => {
    switch (sector) {
      case "ecology":
        return TrendingUp;
      case "health":
        return Award;
      case "defense":
        return Target;
      default:
        return DollarSign;
    }
  };

  const getColorForSector = (sector: string) => {
    const colors: Record<string, string> = {
      ecology: "text-green-600",
      health: "text-blue-600",
      defense: "text-red-600",
      local: "text-orange-600",
      developing: "text-purple-600",
      blockchain: "text-yellow-600"
    };
    return colors[sector] || "text-primary";
  };

  const metrics = getMetricsForSectors();

  // Default metrics if no sectors selected
  const defaultMetrics = [
    {
      title: "Rendement annuel",
      value: "+8.5%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Capital investi",
      value: "180 000 €",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Objectif atteint",
      value: "67%",
      icon: Target,
      color: "text-orange-600"
    },
    {
      title: "Performance",
      value: "+15 300 €",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileMetrics;
