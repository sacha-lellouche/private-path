import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, Shield, Target, ArrowRight, Sparkles } from "lucide-react";
import type { UserProfile } from "@/pages/OnboardingJourney";
import { useNavigate } from "react-router-dom";

interface ResultsSectionProps {
  profile: UserProfile;
  onContinue: () => void;
}

const ResultsSection = ({ profile, onContinue }: ResultsSectionProps) => {

  const getProfileIcon = () => {
    switch (profile.riskProfile) {
      case "Conservateur":
        return <Shield className="w-12 h-12 text-bnp-gold" />;
      case "Équilibré":
        return <Target className="w-12 h-12 text-bnp-gold" />;
      case "Audacieux":
        return <TrendingUp className="w-12 h-12 text-bnp-gold" />;
    }
  };

  const getProfileDescription = () => {
    switch (profile.riskProfile) {
      case "Conservateur":
        return "Vous privilégiez la sécurité et recherchez des investissements stables à long terme.";
      case "Équilibré":
        return "Vous recherchez un équilibre optimal entre rendement attractif et maîtrise des risques.";
      case "Audacieux":
        return "Vous êtes prêt à prendre des risques calculés pour maximiser votre potentiel de gains.";
    }
  };

  const recommendedProducts = [
    {
      name: "Immobilier de Prestige",
      desc: "Patrimoine tangible et valorisation régulière",
      return: "6-8%",
      risk: profile.riskProfile === "Conservateur" ? "2/10" : "3/10",
      match: profile.knownAssets.includes("immobilier") ? 95 : 75,
    },
    {
      name: "Fonds Diversifiés",
      desc: "Portefeuille équilibré et géré activement",
      return: "5-7%",
      risk: "3/10",
      match: 85,
    },
    {
      name: profile.riskProfile === "Audacieux" ? "Private Equity" : "ETF Thématiques",
      desc: profile.riskProfile === "Audacieux" 
        ? "Accès aux entreprises non cotées à fort potentiel"
        : "Exposition diversifiée aux tendances du marché",
      return: profile.riskProfile === "Audacieux" ? "12-18%" : "7-10%",
      risk: profile.riskProfile === "Audacieux" ? "7/10" : "5/10",
      match: profile.riskProfile === "Audacieux" ? 90 : 80,
    },
  ];

  const radarData = [
    { label: "Tolérance au risque", value: profile.riskProfile === "Audacieux" ? 90 : profile.riskProfile === "Équilibré" ? 60 : 30 },
    { label: "Horizon long terme", value: profile.horizon.includes("long") ? 90 : 50 },
    { label: "Diversification", value: Math.round(profile.knownAssets.length * 16.6) },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-bnp-gold/10 border border-bnp-gold/30">
          <Sparkles className="w-5 h-5 text-bnp-gold" />
          <span className="text-sm font-medium text-foreground">Étape 3 : Votre profil personnalisé</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
          Félicitations ! Votre profil est prêt
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Découvrez votre profil d'investisseur et les opportunités sélectionnées pour vous
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8 md:p-12 bg-gradient-hero text-background animate-scale-in">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-background/10 backdrop-blur-sm">
            {getProfileIcon()}
          </div>
          
          <div>
            <Badge className="mb-3 text-base px-4 py-1 bg-bnp-gold text-bnp-green border-0">
              Votre profil
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
              Investisseur {profile.riskProfile}
            </h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto">
              {getProfileDescription()}
            </p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-6 border-t border-background/20">
            {radarData.map((item) => (
              <div key={item.label}>
                <div className="text-3xl font-bold text-bnp-gold mb-1">
                  {item.value}%
                </div>
                <div className="text-sm text-background/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommended Products */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-2">
            Produits recommandés pour vous
          </h3>
          <p className="text-muted-foreground">
            Sélectionnés en fonction de votre profil et de vos objectifs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendedProducts.map((product, index) => (
            <Card
              key={product.name}
              className="p-6 bg-background border-border hover:border-bnp-gold/50 transition-all duration-300 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-foreground mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{product.desc}</p>
                  </div>
                  <Badge variant="outline" className="border-bnp-gold/30 bg-bnp-gold/10 text-bnp-gold">
                    {product.match}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rendement</div>
                    <div className="font-semibold text-bnp-gold">{product.return}/an</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Risque</div>
                    <div className="font-semibold text-foreground">{product.risk}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 bg-bnp-gold/10 border-bnp-gold/30 animate-fade-in">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bnp-gold/20">
            <Award className="w-8 h-8 text-bnp-gold" />
          </div>
          
          <div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
              Prêt à passer à l'action ?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complétez votre profil avec un conseiller pour accéder à des recommandations 
              encore plus personnalisées et débloquer l'accès à votre tableau de bord investisseur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="hero"
              className="gap-2"
              onClick={onContinue}
            >
              Accéder à mon dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            🔒 Vos données sont strictement confidentielles et sécurisées
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;
