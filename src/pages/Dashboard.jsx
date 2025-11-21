import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Home, TrendingUpIcon, User } from 'lucide-react';
import PortfolioChart from '../components/PortfolioChart';
import DevelopmentWidget from '../components/DevelopmentWidget';
import EcologyWidget from '../components/EcologyWidget';
import ProfileIndicator from '../components/ProfileIndicator';
import InvestmentMap from '../components/InvestmentMap';
import ProfileMetrics from '../components/ProfileMetrics';
import PlusValueIndicator from '../components/PlusValueIndicator';
import PortfolioPositions from '../components/PortfolioPositions';

function Dashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Check if user has a profile
    const storedProfile = localStorage.getItem('userProfile');
    if (!storedProfile) {
      // No profile, redirect to onboarding
      navigate('/parcours');
    } else {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, [navigate]);

  if (!userProfile) {
    return null; // Loading or redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-emerald-700">BNP Private Banking</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <Home className="w-5 h-5" />
                <span className="hidden md:inline">Accueil</span>
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg"
              >
                <TrendingUpIcon className="w-5 h-5" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/investments')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="hidden md:inline">Investissements</span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Profil</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Profile Indicator and Plus-Value */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileIndicator profile={userProfile} />
          </div>
          <PlusValueIndicator />
        </div>

        {/* Metrics adaptées au profil */}
        <ProfileMetrics profile={userProfile} />

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

        {/* Portfolio Positions - Vignettes cliquables */}
        <PortfolioPositions preferredSectors={userProfile.preferredSectors} />

        {/* Investment Map */}
        <InvestmentMap />

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
