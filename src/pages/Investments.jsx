import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Leaf, Heart, GraduationCap, Shield, Palette, ChevronLeft, ChevronRight, Home, TrendingUp, User } from 'lucide-react';

// Icônes pour les métriques avec couleurs de fond
const metricIcons = {
  development: { icon: Globe, label: 'Pays émergents', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ecology: { icon: Leaf, label: 'Écologie', color: 'text-green-600', bgColor: 'bg-green-50' },
  health: { icon: Heart, label: 'Santé', color: 'text-red-500', bgColor: 'bg-red-50' },
  education: { icon: GraduationCap, label: 'Éducation', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  defense: { icon: Shield, label: 'Défense', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  culture: { icon: Palette, label: 'Art & Culture', color: 'text-purple-600', bgColor: 'bg-purple-50' },
};

// Données des produits d'investissement
const investmentProducts = {
  forYou: [
    {
      id: 1,
      name: 'Fonds Afrique Durable',
      description: 'Investissement dans les infrastructures et PME africaines avec impact social fort',
      risk: 'Modéré',
      minInvestment: 50000,
      expectedReturn: '6-8%',
      duration: '5 ans',
      image: '/images/investment-africa.jpg',
      metrics: {
        development: 95,
        ecology: 70,
      }
    },
    {
      id: 2,
      name: 'Green Energy Europe',
      description: 'Portefeuille diversifié dans les énergies renouvelables européennes',
      risk: 'Faible',
      minInvestment: 25000,
      expectedReturn: '4-6%',
      duration: '7 ans',
      image: '/images/investment-energy.jpg',
      metrics: {
        ecology: 98,
        development: 45,
      }
    },
    {
      id: 3,
      name: 'Microfinance Solidaire',
      description: 'Financement participatif de micro-entreprises dans les pays émergents',
      risk: 'Modéré',
      minInvestment: 10000,
      expectedReturn: '5-7%',
      duration: '3 ans',
      image: '/images/investment-micro.jpg',
      metrics: {
        development: 92,
        ecology: 55,
      }
    },
    {
      id: 4,
      name: 'Tech Verte Asie',
      description: 'Innovation technologique pour la transition écologique en Asie du Sud-Est',
      risk: 'Dynamique',
      minInvestment: 75000,
      expectedReturn: '8-12%',
      duration: '5 ans',
      image: '/images/investment-tech.jpg',
      metrics: {
        ecology: 88,
        development: 78,
      }
    },
    {
      id: 5,
      name: 'Agriculture Responsable',
      description: 'Financement de fermes durables et circuits courts en Afrique',
      risk: 'Modéré',
      minInvestment: 30000,
      expectedReturn: '5-8%',
      duration: '4 ans',
      image: '/images/investment-agri.jpg',
      metrics: {
        development: 85,
        ecology: 90,
      }
    },
  ],
  discover: [
    {
      id: 6,
      name: 'Santé Innovation',
      description: 'Biotechnologies et recherche médicale de pointe',
      risk: 'Dynamique',
      minInvestment: 100000,
      expectedReturn: '9-14%',
      duration: '6 ans',
      image: '/images/investment-health.jpg',
      metrics: {
        health: 95,
        education: 40,
      }
    },
    {
      id: 7,
      name: 'EdTech Global',
      description: 'Plateformes éducatives numériques pour les pays en développement',
      risk: 'Modéré',
      minInvestment: 40000,
      expectedReturn: '7-10%',
      duration: '5 ans',
      image: '/images/investment-edtech.jpg',
      metrics: {
        education: 92,
        development: 65,
      }
    },
    {
      id: 8,
      name: 'Défense & Cybersécurité',
      description: 'Technologies de sécurité et protection des infrastructures critiques',
      risk: 'Faible',
      minInvestment: 150000,
      expectedReturn: '5-7%',
      duration: '8 ans',
      image: '/images/investment-defense.jpg',
      metrics: {
        defense: 88,
        education: 30,
      }
    },
    {
      id: 9,
      name: 'Patrimoine Culturel',
      description: 'Restauration et valorisation du patrimoine artistique mondial',
      risk: 'Faible',
      minInvestment: 50000,
      expectedReturn: '4-6%',
      duration: '10 ans',
      image: '/images/investment-culture.jpg',
      metrics: {
        culture: 95,
        education: 60,
      }
    },
    {
      id: 10,
      name: 'Smart Cities Émergentes',
      description: 'Infrastructure intelligente pour villes durables en Amérique Latine',
      risk: 'Modéré',
      minInvestment: 80000,
      expectedReturn: '7-9%',
      duration: '6 ans',
      image: '/images/investment-smart.jpg',
      metrics: {
        development: 80,
        ecology: 75,
        education: 45,
      }
    },
  ]
};

function InvestmentCard({ product, userMetrics }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getRiskColor = (risk) => {
    const colors = {
      'Faible': 'bg-green-100 text-green-800',
      'Modéré': 'bg-blue-100 text-blue-800',
      'Dynamique': 'bg-orange-100 text-orange-800',
      'Agressif': 'bg-red-100 text-red-800',
    };
    return colors[risk] || 'bg-gray-100 text-gray-800';
  };

  const isRecommended = Object.keys(product.metrics).some(metric => userMetrics?.includes(metric));

  return (
    <div 
      className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* En-tête avec titre */}
      <div className="relative bg-gradient-to-r from-bnp-dark to-bnp-navy text-white p-4">
        <h3 className="text-lg font-bold mb-1">{product.name}</h3>
        {isRecommended && (
          <span className="inline-block bg-bnp-gold text-white text-xs px-2 py-0.5 rounded-full font-semibold">
            Recommandé
          </span>
        )}
      </div>

      {/* Bande des métriques - Très visible avec icônes blanches */}
      <div className="bg-white border-b-2 border-gray-100 px-4 py-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {Object.entries(product.metrics).map(([metric, value]) => {
            const MetricIcon = metricIcons[metric]?.icon || Globe;
            const iconColor = metricIcons[metric]?.color || 'text-gray-600';
            const bgColor = metricIcons[metric]?.bgColor || 'bg-gray-50';
            const metricLabel = metricIcons[metric]?.label || metric;
            
            return (
              <div key={metric} className="flex flex-col items-center">
                <div className={`${bgColor} rounded-xl p-3 shadow-sm mb-1.5`}>
                  <MetricIcon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <span className="text-xs font-bold text-bnp-dark">{value}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Détails des métriques avec barres */}
        <div className="mb-3 space-y-2">
          <h4 className="text-xs font-semibold text-gray-700 uppercase mb-2">Détail impact</h4>
          {Object.entries(product.metrics).map(([metric, value]) => {
            const metricLabel = metricIcons[metric]?.label || metric;
            
            return (
              <div key={metric} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">{metricLabel}</span>
                  <span className="font-semibold text-bnp-dark">{value}%</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-bnp-green to-green-600 transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Informations financières */}
        <div className="border-t pt-2 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Investissement min.</span>
            <span className="font-semibold text-bnp-dark">
              {product.minInvestment.toLocaleString('fr-FR')} €
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Rendement attendu</span>
            <span className="font-semibold text-bnp-green">{product.expectedReturn}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Durée</span>
            <span className="font-semibold text-bnp-dark">{product.duration}</span>
          </div>
          <div className="flex justify-between text-xs items-center">
            <span className="text-gray-600">Risque</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRiskColor(product.risk)}`}>
              {product.risk}
            </span>
          </div>
        </div>

        {/* Bouton d'action */}
        <button 
          className={`w-full mt-2 py-1.5 text-sm rounded-lg font-semibold transition-all ${
            isHovered 
              ? 'bg-bnp-green text-white' 
              : 'bg-gray-100 text-bnp-dark hover:bg-gray-200'
          }`}
        >
          En savoir plus
        </button>
      </div>
    </div>
  );
}

function InvestmentCarousel({ title, products, userMetrics }) {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-bnp-dark">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-bnp-dark" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-bnp-dark" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map(product => (
          <InvestmentCard 
            key={product.id} 
            product={product} 
            userMetrics={userMetrics}
          />
        ))}
      </div>
    </div>
  );
}

function Investments() {
  const navigate = useNavigate();
  // Récupération des métriques de l'utilisateur (normalement depuis le contexte/store)
  const userMetrics = ['development', 'ecology'];

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
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="hidden md:inline">Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/investments')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg"
              >
                <Globe className="w-5 h-5" />
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

      <div className="p-8">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-12 px-8 mb-8 rounded-xl shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-3">Nouveaux Investissements</h2>
            <p className="text-green-100 text-lg">
              Découvrez des opportunités d'investissement alignées avec vos valeurs et objectifs
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Pour Vous */}
          <InvestmentCarousel 
            title="Pour vous"
            products={investmentProducts.forYou}
            userMetrics={userMetrics}
          />

          {/* Section À Découvrir */}
          <InvestmentCarousel 
            title="À découvrir"
            products={investmentProducts.discover}
            userMetrics={userMetrics}
          />
        </div>

        {/* Légende des métriques */}
        <div className="max-w-7xl mx-auto mt-12 bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Métriques d'impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(metricIcons).map(([key, { icon: Icon, label, color }]) => (
              <div key={key} className="flex items-center space-x-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-sm text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Investments;
