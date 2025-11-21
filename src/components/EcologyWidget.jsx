import React, { useState } from 'react';
import { Leaf, Wind, Droplets, X } from 'lucide-react';

function EcologyWidget() {
  const [expanded, setExpanded] = useState(false);

  // Données simulées sur l'impact écologique
  const ecologyData = {
    co2Saved: 1847, // tonnes de CO2 économisées
    investmentLevel: 3, // 1-5 (60% de remplissage)
    treesEquivalent: 92350,
    renewableEnergy: 2400, // MWh
    waterSaved: 145000, // m³
  };

  // Pourcentage de remplissage de la feuille
  const fillPercentage = (ecologyData.investmentLevel / 5) * 100;

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        expanded ? 'col-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-bnp-dark flex items-center">
          <Leaf className="w-6 h-6 mr-2 text-bnp-green" />
          Impact écologique
        </h3>
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="text-sm text-bnp-green hover:text-bnp-green-light font-semibold"
          >
            Voir détails →
          </button>
        ) : (
          <button
            onClick={() => setExpanded(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Vue visuelle - Feuille qui se remplit */}
      <div className="mb-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
        <div className="relative flex items-center justify-center" style={{ minHeight: '280px' }}>
          <svg viewBox="0 0 200 280" className="w-full" style={{ maxHeight: '320px' }}>
            <defs>
              {/* Gradient pour le remplissage */}
              <linearGradient id="leafFill" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00915A" stopOpacity="1" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
              </linearGradient>
              
              {/* Masque pour l'effet de remplissage */}
              <mask id="leafMask">
                <rect x="0" y="0" width="200" height="280" fill="white" />
                <rect 
                  x="0" 
                  y="0" 
                  width="200" 
                  height={280 - (280 * fillPercentage / 100)} 
                  fill="black" 
                />
              </mask>
              
              {/* Filtre pour l'ombre */}
              <filter id="leafShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
              </filter>
            </defs>
            
            {/* Tige de la feuille */}
            <line
              x1="100"
              y1="240"
              x2="100"
              y2="280"
              stroke="#00915A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Contour de la feuille vide (fond) */}
            <path
              d="M 100 20
                 Q 140 40, 150 80
                 Q 155 120, 145 160
                 Q 135 200, 100 240
                 Q 65 200, 55 160
                 Q 45 120, 50 80
                 Q 60 40, 100 20 Z"
              fill="#E5E7EB"
              stroke="#9CA3AF"
              strokeWidth="2"
              filter="url(#leafShadow)"
            />
            
            {/* Feuille remplie avec le masque */}
            <path
              d="M 100 20
                 Q 140 40, 150 80
                 Q 155 120, 145 160
                 Q 135 200, 100 240
                 Q 65 200, 55 160
                 Q 45 120, 50 80
                 Q 60 40, 100 20 Z"
              fill="url(#leafFill)"
              mask="url(#leafMask)"
              stroke="#00915A"
              strokeWidth="2"
            />
            
            {/* Nervure centrale */}
            <line
              x1="100"
              y1="30"
              x2="100"
              y2="240"
              stroke={fillPercentage > 10 ? "#047857" : "#D1D5DB"}
              strokeWidth="2"
              opacity="0.6"
            />
            
            {/* Nervures latérales */}
            {[
              { x1: 100, y1: 60, x2: 70, y2: 80, show: fillPercentage > 20 },
              { x1: 100, y1: 60, x2: 130, y2: 80, show: fillPercentage > 20 },
              { x1: 100, y1: 100, x2: 65, y2: 120, show: fillPercentage > 40 },
              { x1: 100, y1: 100, x2: 135, y2: 120, show: fillPercentage > 40 },
              { x1: 100, y1: 140, x2: 70, y2: 160, show: fillPercentage > 60 },
              { x1: 100, y1: 140, x2: 130, y2: 160, show: fillPercentage > 60 },
              { x1: 100, y1: 180, x2: 75, y2: 195, show: fillPercentage > 80 },
              { x1: 100, y1: 180, x2: 125, y2: 195, show: fillPercentage > 80 },
            ].map((vein, i) => (
              <line
                key={i}
                x1={vein.x1}
                y1={vein.y1}
                x2={vein.x2}
                y2={vein.y2}
                stroke={vein.show ? "#047857" : "#D1D5DB"}
                strokeWidth="1.5"
                opacity="0.5"
              />
            ))}
            
            {/* Texte CO2 économisé au centre de la feuille */}
            <text
              x="100"
              y="120"
              textAnchor="middle"
              className="font-bold"
              fill={fillPercentage > 50 ? "white" : "#00915A"}
              fontSize="32"
            >
              {ecologyData.co2Saved}
            </text>
            <text
              x="100"
              y="145"
              textAnchor="middle"
              className="font-semibold"
              fill={fillPercentage > 50 ? "white" : "#047857"}
              fontSize="16"
            >
              tonnes
            </text>
            <text
              x="100"
              y="165"
              textAnchor="middle"
              className="font-medium"
              fill={fillPercentage > 50 ? "#E0E7FF" : "#059669"}
              fontSize="14"
            >
              de CO₂
            </text>
            
            {/* Particules vertes flottantes si investissement élevé */}
            {ecologyData.investmentLevel >= 4 && [
              { cx: 60, cy: 50, r: 2, delay: '0s' },
              { cx: 140, cy: 70, r: 2.5, delay: '0.5s' },
              { cx: 75, cy: 130, r: 1.5, delay: '1s' },
              { cx: 125, cy: 150, r: 2, delay: '1.5s' },
            ].map((particle, i) => (
              <circle
                key={`particle-${i}`}
                cx={particle.cx}
                cy={particle.cy}
                r={particle.r}
                fill="#10B981"
                opacity="0.6"
                className="animate-bounce"
                style={{ animationDelay: particle.delay, animationDuration: '2s' }}
              />
            ))}
          </svg>
        </div>
        
        {/* Barre de progression */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Niveau d'engagement écologique</span>
            <span className="text-sm font-bold text-bnp-green">{Math.round(fillPercentage)}%</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                  i < ecologyData.investmentLevel ? 'bg-bnp-green' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Données quantitatives */}
      {expanded && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Leaf className="w-5 h-5 mr-2" />
                <span className="text-sm opacity-90">Arbres</span>
              </div>
              <div className="text-2xl font-bold">{(ecologyData.treesEquivalent / 1000).toFixed(1)}k</div>
              <div className="text-xs opacity-80">équivalent</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Wind className="w-5 h-5 mr-2" />
                <span className="text-sm opacity-90">Énergie</span>
              </div>
              <div className="text-2xl font-bold">{ecologyData.renewableEnergy}</div>
              <div className="text-xs opacity-80">MWh renouvelable</div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Droplets className="w-5 h-5 mr-2" />
                <span className="text-sm opacity-90">Eau</span>
              </div>
              <div className="text-2xl font-bold">{(ecologyData.waterSaved / 1000).toFixed(0)}k</div>
              <div className="text-xs opacity-80">m³ économisés</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-bnp-green mb-2">
                {ecologyData.co2Saved.toLocaleString('fr-FR')}
              </div>
              <div className="text-sm text-bnp-dark font-semibold mb-1">
                tonnes de CO₂ économisées
              </div>
              <div className="text-xs text-gray-600">
                Grâce à vos investissements dans les énergies vertes
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-bnp-dark mb-3">Actions environnementales financées</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Parcs éoliens et solaires - Production d'énergie propre</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Reforestation - Plantation de {(ecologyData.treesEquivalent / 1000).toFixed(0)}k arbres</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Technologies de conservation d'eau</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Économie circulaire - Recyclage et valorisation</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="text-center text-sm text-gray-600">
          {ecologyData.co2Saved} tonnes de CO₂ • {(ecologyData.treesEquivalent / 1000).toFixed(1)}k arbres équivalent
        </div>
      )}
    </div>
  );
}

export default EcologyWidget;
