import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import PortfolioChart from '../components/PortfolioChart';
import DevelopmentWidget from '../components/DevelopmentWidget';
import EcologyWidget from '../components/EcologyWidget';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section du graphique de portefeuille */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mon Portefeuille</h2>
            <button
              onClick={() => navigate('/investments')}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Investir
            </button>
          </div>
          <PortfolioChart />
        </div>

        {/* Section des widgets d'impact */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact de vos investissements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DevelopmentWidget />
            <EcologyWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
