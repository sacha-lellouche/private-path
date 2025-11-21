import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, TrendingUp, Coins, Lock, BarChart3, Globe, Home, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import productImmobilier from "@/assets/product-immobilier.jpg";
import productPrivateEquity from "@/assets/product-private-equity.jpg";
import productFonds from "@/assets/product-fonds.jpg";
import productCrypto from "@/assets/product-crypto.jpg";
import productActions from "@/assets/product-actions.jpg";
import productETF from "@/assets/product-etf.jpg";
import productSCI from "@/assets/product-sci.jpg";

interface Product {
  id: number;
  icon: any;
  title: string;
  description: string;
  return: string;
  risk: number;
  horizon: string;
  image: string;
  detailedDescription: string;
  advantages: string[];
  examples: {
    title: string;
    description: string;
    performance: string;
  }[];
  minInvestment: string;
}

const products: Product[] = [
  {
    id: 1,
    icon: Building2,
    title: "Immobilier de Prestige",
    description: "Investissements immobiliers premium dans les meilleures localisations",
    return: "6-8%",
    risk: 2,
    horizon: "5-10 ans",
    image: productImmobilier,
    detailedDescription: "Accédez à un portefeuille d'immobilier haut de gamme soigneusement sélectionné dans les quartiers les plus prisés. Nos experts identifient les opportunités à fort potentiel de valorisation.",
    advantages: [
      "Revenus locatifs réguliers et prévisibles",
      "Protection contre l'inflation",
      "Diversification géographique",
      "Gestion déléguée complète"
    ],
    examples: [
      {
        title: "Paris 8ème - Avenue Montaigne",
        description: "Immeuble haussmannien rénové, commerce premium",
        performance: "+42% sur 5 ans"
      },
      {
        title: "Côte d'Azur - Villa de luxe",
        description: "Propriété d'exception avec vue mer",
        performance: "+38% sur 4 ans"
      }
    ],
    minInvestment: "500 000€"
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Private Equity",
    description: "Accès exclusif aux opportunités de croissance des entreprises non cotées",
    return: "10-15%",
    risk: 4,
    horizon: "7-10 ans",
    image: productPrivateEquity,
    detailedDescription: "Investissez dans des entreprises à fort potentiel de croissance avant leur introduction en bourse. Nos équipes accompagnent les dirigeants dans leur développement stratégique.",
    advantages: [
      "Rendements supérieurs au marché public",
      "Accompagnement actif des entreprises",
      "Diversification sectorielle",
      "Accès à des deals exclusifs"
    ],
    examples: [
      {
        title: "MedTech Innovation SAS",
        description: "Leader européen des dispositifs médicaux",
        performance: "+156% sur 6 ans"
      },
      {
        title: "GreenEnergy Solutions",
        description: "Énergies renouvelables, rachat par un major",
        performance: "+280% sur 8 ans"
      }
    ],
    minInvestment: "250 000€"
  },
  {
    id: 3,
    icon: Coins,
    title: "Fonds Diversifiés",
    description: "Portefeuilles équilibrés d'actions et d'obligations soigneusement sélectionnées",
    return: "5-7%",
    risk: 3,
    horizon: "3-5 ans",
    image: productFonds,
    detailedDescription: "Bénéficiez d'une allocation optimisée entre actions internationales et obligations de qualité. Notre gestion active vise à capter les opportunités tout en maîtrisant le risque.",
    advantages: [
      "Gestion professionnelle active",
      "Diversification internationale",
      "Liquidité élevée",
      "Reporting trimestriel détaillé"
    ],
    examples: [
      {
        title: "BNP Global Opportunities",
        description: "Allocation dynamique multi-actifs",
        performance: "+32% sur 3 ans"
      },
      {
        title: "Euro Balanced Fund",
        description: "Équilibre actions/obligations européennes",
        performance: "+24% sur 3 ans"
      }
    ],
    minInvestment: "50 000€"
  },
  {
    id: 4,
    icon: Lock,
    title: "Crypto-Actifs Régulés",
    description: "Exposition aux actifs numériques dans un cadre sécurisé et conforme",
    return: "Variable",
    risk: 5,
    horizon: "3-7 ans",
    image: productCrypto,
    detailedDescription: "Investissez dans l'économie digitale via une approche institutionnelle. Notre sélection privilégie les protocoles établis et les projets à forte utilité.",
    advantages: [
      "Custody sécurisé niveau institutionnel",
      "Conformité réglementaire totale",
      "Sélection rigoureuse des actifs",
      "Reporting fiscal simplifié"
    ],
    examples: [
      {
        title: "Bitcoin & Ethereum",
        description: "Allocation 70/30 sur les leaders du marché",
        performance: "+180% sur 3 ans"
      },
      {
        title: "DeFi Blue Chips",
        description: "Protocoles de finance décentralisée établis",
        performance: "+95% sur 2 ans"
      }
    ],
    minInvestment: "25 000€"
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Actions Internationales",
    description: "Portefeuille de valeurs de croissance sélectionnées mondialement",
    return: "8-12%",
    risk: 4,
    horizon: "5-10 ans",
    image: productActions,
    detailedDescription: "Investissez dans les leaders mondiaux de demain. Notre sélection combine grandes capitalisations établies et champions de la croissance dans les secteurs porteurs.",
    advantages: [
      "Exposition aux leaders mondiaux",
      "Croissance à long terme",
      "Dividendes réinvestis",
      "Couverture de change optionnelle"
    ],
    examples: [
      {
        title: "Tech Leaders Portfolio",
        description: "GAFAM + leaders asiatiques de la tech",
        performance: "+85% sur 5 ans"
      },
      {
        title: "Healthcare Innovation",
        description: "Biotechs et pharma à fort potentiel",
        performance: "+62% sur 4 ans"
      }
    ],
    minInvestment: "100 000€"
  },
  {
    id: 6,
    icon: Globe,
    title: "ETF Thématiques",
    description: "Fonds indiciels sur les mégatendances de demain",
    return: "7-10%",
    risk: 3,
    horizon: "3-7 ans",
    image: productETF,
    detailedDescription: "Captez les grandes tendances structurelles à travers des ETF sélectionnés : transition énergétique, intelligence artificielle, robotique, santé du futur.",
    advantages: [
      "Frais de gestion réduits",
      "Diversification thématique",
      "Liquidité quotidienne",
      "Transparence totale"
    ],
    examples: [
      {
        title: "Clean Energy ETF",
        description: "Leaders mondiaux des énergies renouvelables",
        performance: "+76% sur 4 ans"
      },
      {
        title: "AI & Robotics",
        description: "Entreprises de l'intelligence artificielle",
        performance: "+112% sur 5 ans"
      }
    ],
    minInvestment: "10 000€"
  },
  {
    id: 7,
    icon: Home,
    title: "SCI Patrimoniales",
    description: "Sociétés civiles immobilières pour optimiser votre patrimoine",
    return: "4-6%",
    risk: 2,
    horizon: "8-15 ans",
    image: productSCI,
    detailedDescription: "Constituez votre patrimoine immobilier dans un cadre fiscal optimisé. Nos SCI investissent dans des actifs générant des revenus réguliers avec un potentiel de plus-value à long terme.",
    advantages: [
      "Optimisation fiscale et successorale",
      "Revenus fonciers récurrents",
      "Transmission facilitée",
      "Gestion professionnelle"
    ],
    examples: [
      {
        title: "SCI Patrimoine Paris",
        description: "Immeubles résidentiels quartiers centraux",
        performance: "+34% sur 10 ans"
      },
      {
        title: "SCI Commerce Premium",
        description: "Murs commerciaux emplacements n°1",
        performance: "+41% sur 8 ans"
      }
    ],
    minInvestment: "150 000€"
  },
];

const ProductsSection = () => {
  const [emblaRef] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  }, [Autoplay({ delay: 2000, stopOnInteraction: true })]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="products" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge className="mb-4 bg-bnp-gold/10 text-bnp-gold border-bnp-gold/20">
            Nos Solutions d'Investissement
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Des opportunités sur mesure
          </h2>
          <p className="text-lg text-muted-foreground">
            Explorez notre sélection de produits d'investissement premium
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pb-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card 
                  className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer h-full flex flex-col"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm"
                    >
                      {product.horizon}
                    </Badge>
                  </div>

                  <CardHeader className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-primary`}>
                        <product.icon className="w-6 h-6 text-background" />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-bnp-gold transition-colors line-clamp-2">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Rendement annuel</p>
                          <p className="text-xl font-bold text-bnp-gold">{product.return}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Niveau de risque</p>
                          <div className="flex gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-full rounded-full ${
                                  i < product.risk 
                                    ? 'bg-bnp-gold' 
                                    : 'bg-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between group/btn hover:bg-primary/5"
                      >
                        Découvrir
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in-delayed">
          <p className="text-muted-foreground mb-4">
            Faites glisser pour découvrir tous nos produits →
          </p>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <Badge className="mb-3 bg-bnp-gold/20 text-bnp-gold border-bnp-gold/30">
                      {selectedProduct.horizon}
                    </Badge>
                    <DialogTitle className="text-3xl text-white mb-2">
                      {selectedProduct.title}
                    </DialogTitle>
                    <DialogDescription className="text-white/80 text-base">
                      {selectedProduct.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-bnp-gold/5 border-bnp-gold/20">
                    <p className="text-sm text-muted-foreground mb-1">Rendement</p>
                    <p className="text-2xl font-bold text-bnp-gold">{selectedProduct.return}</p>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Risque</p>
                    <div className="flex gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-full rounded-full ${
                            i < selectedProduct.risk ? 'bg-bnp-gold' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </Card>
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Ticket min.</p>
                    <p className="text-lg font-bold text-primary">{selectedProduct.minInvestment}</p>
                  </Card>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">À propos</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.detailedDescription}
                  </p>
                </div>

                {/* Advantages */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Avantages clés</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProduct.advantages.map((advantage, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-bnp-gold flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Exemples de positions</h3>
                  <div className="space-y-3">
                    {selectedProduct.examples.map((example, index) => (
                      <Card key={index} className="p-4 bg-muted/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{example.title}</h4>
                          <Badge variant="secondary" className="bg-bnp-gold/20 text-bnp-gold">
                            {example.performance}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{example.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <Card className="p-6 bg-gradient-primary border-bnp-gold/30">
                  <div className="flex items-start gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-bnp-gold flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-background mb-2">
                        Ce produit vous intéresse ?
                      </h3>
                      <p className="text-background/80 text-sm mb-4">
                        Découvrez votre profil d'investisseur en quelques minutes pour recevoir 
                        des recommandations personnalisées et accéder à nos meilleures opportunités.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      onClick={() => {
                        setSelectedProduct(null);
                        document.getElementById('risk-game')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Évaluer mon profil avec le jeu
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <p className="text-center text-xs text-background/60">
                      Puis complétez le questionnaire détaillé pour des recommandations précises
                    </p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductsSection;
