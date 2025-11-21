import React, { useState } from 'react';
import { Globe, Users, TrendingUp, Building2, X, MapPin } from 'lucide-react';

// Données simulées pour les pays avec coordonnées précises
const countryImpact = [
  { name: 'Dakar, Sénégal', level: 4, people: 45000, businesses: 320, x: 17, y: 15 },
  { name: 'Bamako, Mali', level: 3, people: 32000, businesses: 180, x: 15, y: 14 },
  { name: 'Ouagadougou, Burkina Faso', level: 3, people: 28000, businesses: 150, x: 18, y: 14 },
  { name: 'Antananarivo, Madagascar', level: 2, people: 18000, businesses: 95, x: 72, y: 42 },
  { name: 'Yaoundé, Cameroun', level: 4, people: 52000, businesses: 380, x: 28, y: 23 },
  { name: 'Kigali, Rwanda', level: 3, people: 35000, businesses: 210, x: 42, y: 30 },
  { name: 'Nairobi, Kenya', level: 4, people: 48000, businesses: 295, x: 48, y: 28 },
  { name: 'Lagos, Nigeria', level: 5, people: 62000, businesses: 410, x: 22, y: 20 },
];

function DevelopmentWidget() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredCity, setHoveredCity] = useState(null);

  const totalPeople = countryImpact.reduce((sum, country) => sum + country.people, 0);
  const totalBusinesses = countryImpact.reduce((sum, country) => sum + country.businesses, 0);

  // Calcul du niveau d'investissement global (sur 5)
  const investmentLevel = Math.round(countryImpact.reduce((sum, c) => sum + c.level, 0) / countryImpact.length);

  const getColorForLevel = (level) => {
    const colors = {
      1: '#FCA5A5',
      2: '#F87171',
      3: '#EF4444',
      4: '#DC2626',
      5: '#B91C1C'
    };
    return colors[level] || '#E5E7EB';
  };

  return (
    <div 
      className={`widget-card ${expanded ? 'expanded' : ''} relative`}
      onClick={() => !expanded && setExpanded(true)}
    >
      {expanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(false);
          }}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-bnp-dark flex items-center">
          <Globe className="w-6 h-6 mr-2 text-bnp-green" />
          Développement pays émergents
        </h3>
      </div>

      {/* Vue visuelle - Carte d'Afrique réelle avec image */}
      <div className="mb-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 overflow-hidden">
        <div className="relative" style={{ paddingBottom: '100%' }}>
          {/* Image de la carte d'Afrique en arrière-plan */}
          <div className="absolute inset-0">
            <img 
              src="/images/africa-map.png" 
              alt="Carte de l'Afrique"
              className="w-full h-full object-contain opacity-90"
              style={{ filter: 'brightness(1.05) contrast(0.95)' }}
            />
            
            {/* Overlay SVG pour les points d'investissement */}
            <svg 
              viewBox="0 0 100 100" 
              className="absolute inset-0 w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              {/* Points d'investissement */}
              {countryImpact.map((city, index) => {
                const isHovered = hoveredCity === index;
                const radius = isHovered ? 3.5 : 2.5;
                
                return (
                  <g key={city.name}>
                    {/* Cercle de radiation au hover */}
                    {isHovered && (
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={radius + 2}
                        fill={getColorForLevel(city.level)}
                        opacity="0.2"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Point principal */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={radius}
                      fill={getColorForLevel(city.level)}
                      stroke="white"
                      strokeWidth="0.5"
                      opacity="0.9"
                      filter="url(#shadow)"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        setHoveredCity(index);
                      }}
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        setHoveredCity(null);
                      }}
                      className="cursor-pointer transition-all duration-200"
                      style={{ transformOrigin: `${city.x}% ${city.y}%` }}
                    />
                    
                    {/* Icône de localisation au hover */}
                    {isHovered && (
                      <g>
                        <circle
                          cx={city.x}
                          cy={city.y - 5}
                          r="2"
                          fill="white"
                          opacity="0.9"
                        />
                        <path
                          d={`M ${city.x} ${city.y - 5} L ${city.x} ${city.y - 2}`}
                          stroke={getColorForLevel(city.level)}
                          strokeWidth="0.3"
                        />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            
            {/* Tooltip au hover */}
            {hoveredCity !== null && (
              <div 
                className="absolute bg-white rounded-lg shadow-xl p-3 border-2 pointer-events-none z-20 animate-fade-in"
                style={{
                  left: `${countryImpact[hoveredCity].x}%`,
                  top: `${countryImpact[hoveredCity].y}%`,
                  transform: 'translate(-50%, -120%)',
                  minWidth: '180px'
                }}
              >
                <div className="flex items-start mb-2">
                  <MapPin className="w-4 h-4 text-bnp-green mr-2 flex-shrink-0 mt-0.5" />
                  <h4 className="font-bold text-sm text-bnp-dark">{countryImpact[hoveredCity].name}</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Personnes aidées:</span>
                    <span className="font-semibold text-bnp-green">
                      {countryImpact[hoveredCity].people.toLocaleString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Micro-entreprises:</span>
                    <span className="font-semibold text-bnp-gold">
                      {countryImpact[hoveredCity].businesses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t">
                    <span className="text-gray-600">Niveau d'impact:</span>
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < countryImpact[hoveredCity].level ? 'bg-red-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Indicateur de niveau d'impact */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Niveau d'impact global</span>
            <span className="text-sm font-bold text-bnp-green">{investmentLevel}/5</span>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                  i < investmentLevel ? 'bg-bnp-green' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Données quantitatives */}
      {expanded && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-bnp-green to-green-700 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm opacity-90">Personnes aidées</span>
              </div>
              <div className="text-3xl font-bold">{totalPeople.toLocaleString('fr-FR')}</div>
            </div>

            <div className="bg-gradient-to-br from-bnp-gold to-yellow-600 rounded-lg p-4 text-white">
              <div className="flex items-center mb-2">
                <Building2 className="w-5 h-5 mr-2" />
                <span className="text-sm opacity-90">Micro-entreprises</span>
              </div>
              <div className="text-3xl font-bold">{totalBusinesses}</div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-bnp-dark mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-bnp-green" />
              Détails par ville
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {countryImpact.map((city) => (
                <div key={city.name} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: getColorForLevel(city.level) }}
                    />
                    <span className="font-medium text-sm">{city.name}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {city.people.toLocaleString('fr-FR')} pers. • {city.businesses} entr.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {totalPeople.toLocaleString('fr-FR')} personnes aidées • {totalBusinesses} micro-entreprises
          </p>
        </div>
      )}
    </div>
  );
}

export default DevelopmentWidget;
