import { DollarSign, Wallet, PiggyBank, TrendingUp, TrendingDown } from "lucide-react";

const PortfolioStats = () => {
  // Données simulées
  const stats = [
    {
      label: "Valeur totale",
      value: "545 234",
      change: "+2.5%",
      positive: true,
      icon: DollarSign,
      gradient: "from-bnp-green to-green-600"
    },
    {
      label: "Cash investi",
      value: "480 000",
      subLabel: "Capital placé",
      icon: Wallet,
      gradient: "from-blue-600 to-blue-700"
    },
    {
      label: "Cash disponible",
      value: "65 234",
      subLabel: "À investir",
      icon: PiggyBank,
      gradient: "from-purple-600 to-purple-700"
    },
    {
      label: "Plus-value",
      value: "+65 234",
      change: "+15.7%",
      positive: true,
      icon: TrendingUp,
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white/90 text-sm font-medium">{stat.label}</p>
                {stat.subLabel && (
                  <p className="text-white/70 text-xs mt-0.5">{stat.subLabel}</p>
                )}
              </div>
              <Icon className="w-6 h-6 text-white/80" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">{stat.value} €</div>
              {stat.change && (
                <div className="flex items-center gap-1 text-sm">
                  {stat.positive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-semibold">{stat.change}</span>
                  <span className="text-white/70 text-xs">ce mois</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioStats;
