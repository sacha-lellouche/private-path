import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Coins, Lock, ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    icon: Building2,
    title: "Immobilier de Prestige",
    description: "Investissements immobiliers premium dans les meilleures localisations",
    return: "6-8%",
    risk: 2,
    horizon: "5-10 ans",
    color: "from-navy to-navy-light",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Private Equity",
    description: "Accès exclusif aux opportunités de croissance des entreprises non cotées",
    return: "10-15%",
    risk: 4,
    horizon: "7-10 ans",
    color: "from-gold to-gold-light",
  },
  {
    id: 3,
    icon: Coins,
    title: "Fonds Diversifiés",
    description: "Portefeuilles équilibrés d'actions et d'obligations soigneusement sélectionnées",
    return: "5-7%",
    risk: 3,
    horizon: "3-5 ans",
    color: "from-navy-light to-navy",
  },
  {
    id: 4,
    icon: Lock,
    title: "Crypto-Actifs Régulés",
    description: "Exposition aux actifs numériques dans un cadre sécurisé et conforme",
    return: "Variable",
    risk: 5,
    horizon: "3-7 ans",
    color: "from-gold-light to-accent",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
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
            Sélectionnez parmi nos produits d'investissement premium, 
            conçus pour répondre à vos objectifs patrimoniaux
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${product.color}`}>
                    <product.icon className="w-6 h-6 text-background" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {product.horizon}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4 group-hover:text-bnp-gold transition-colors">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rendement annuel</p>
                      <p className="text-2xl font-bold text-bnp-gold">{product.return}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Niveau de risque</p>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-full rounded-full ${
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
                    En savoir plus
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in-delayed">
          <p className="text-muted-foreground mb-4">
            Besoin d'aide pour choisir ? Notre conseiller est à votre écoute
          </p>
          <Button variant="premium">
            Parler à un expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
