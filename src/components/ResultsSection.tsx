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

      {/* CTA Section */}
      <Card className="p-10 md:p-12 bg-gradient-to-br from-bnp-gold/20 to-bnp-green/10 border-bnp-gold/50 animate-fade-in">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bnp-gold/30">
            <Award className="w-10 h-10 text-bnp-gold" />
          </div>
          
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
              Prêt à commencer votre parcours d'investissement ?
            </h3>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Suivez vos investissements en temps réel et bénéficiez de l'accompagnement personnalisé de nos conseillers.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center pt-4">
            <Button
              size="lg"
              variant="hero"
              className="gap-2 text-xl px-12 py-7 hover:scale-105 transition-all duration-300"
              onClick={onContinue}
            >
              Accéder à mon dashboard
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;
