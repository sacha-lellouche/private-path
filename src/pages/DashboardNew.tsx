import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import BNPNavigation from "@/components/BNPNavigation";
import PortfolioStats from "@/components/PortfolioStats";
import PortfolioChartSection from "@/components/PortfolioChartSection";
import WorldMapWidget from "@/components/WorldMapWidget";
import EcologyWidget from "@/components/EcologyWidget";

const DashboardNew = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <BNPNavigation />

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Section Graphique de Portefeuille */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-bnp-dark">Mon Portefeuille</h2>
            <button
              onClick={() => navigate("/investments")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bnp-green to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="w-5 h-5" />
              Investir
            </button>
          </div>

          {/* 4 cartes statistiques */}
          <PortfolioStats />

          {/* Graphique */}
          <PortfolioChartSection />
        </div>

        {/* Section Impact des investissements */}
        <div>
          <h2 className="text-2xl font-bold text-bnp-dark mb-6">Impact de vos investissements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorldMapWidget />
            <EcologyWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNew;
