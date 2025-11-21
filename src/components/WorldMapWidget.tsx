import { useState } from 'react';
import { Globe, Users, Building2, TrendingUp, MapPin, X } from 'lucide-react';

interface Country {
  name: string;
  code: string;
  people: number;
  businesses: number;
  investmentAmount: number;
  projects: string[];
  impactLevel: number;
  color: string;
}

const investedCountries: Record<string, Country> = {
  senegal: {
    name: 'Sénégal',
    code: 'SN',
    people: 45000,
    businesses: 320,
    investmentAmount: 12500000,
    projects: ['Microfinance rurale', 'Fermes solaires', 'Formation professionnelle'],
    impactLevel: 4,
    color: '#DC2626'
  },
  mali: {
    name: 'Mali',
    code: 'ML',
    people: 32000,
    businesses: 180,
    investmentAmount: 8300000,
    projects: ['Agriculture durable', 'Accès à l\'eau potable'],
    impactLevel: 3,
    color: '#EF4444'
  },
  'burkina-faso': {
    name: 'Burkina Faso',
    code: 'BF',
    people: 28000,
    businesses: 150,
    investmentAmount: 7200000,
    projects: ['Éducation numérique', 'Énergies renouvelables'],
    impactLevel: 3,
    color: '#EF4444'
  },
  cameroon: {
    name: 'Cameroun',
    code: 'CM',
    people: 52000,
    businesses: 380,
    investmentAmount: 15800000,
    projects: ['Infrastructure numérique', 'Santé communautaire', 'Agroforesterie'],
    impactLevel: 4,
    color: '#DC2626'
  },
  kenya: {
    name: 'Kenya',
    code: 'KE',
    people: 48000,
    businesses: 295,
    investmentAmount: 14200000,
    projects: ['Fintech pour PME', 'Agriculture smart', 'Énergie solaire'],
    impactLevel: 4,
    color: '#DC2626'
  },
  rwanda: {
    name: 'Rwanda',
    code: 'RW',
    people: 35000,
    businesses: 210,
    investmentAmount: 10500000,
    projects: ['Tech startups', 'Tourisme durable'],
    impactLevel: 3,
    color: '#EF4444'
  },
  nigeria: {
    name: 'Nigeria',
    code: 'NG',
    people: 62000,
    businesses: 410,
    investmentAmount: 18900000,
    projects: ['Fintech', 'E-commerce', 'Infrastructure logistique', 'EdTech'],
    impactLevel: 5,
    color: '#B91C1C'
  },
  madagascar: {
    name: 'Madagascar',
    code: 'MG',
    people: 18000,
    businesses: 95,
    investmentAmount: 5400000,
    projects: ['Écotourisme', 'Vanille bio'],
    impactLevel: 2,
    color: '#F87171'
  },
  india: {
    name: 'Inde',
    code: 'IN',
    people: 78000,
    businesses: 520,
    investmentAmount: 22400000,
    projects: ['Tech innovation', 'Énergies vertes', 'Microfinance'],
    impactLevel: 5,
    color: '#B91C1C'
  },
  bangladesh: {
    name: 'Bangladesh',
    code: 'BD',
    people: 41000,
    businesses: 285,
    investmentAmount: 11800000,
    projects: ['Textile responsable', 'Microcrédit femmes'],
    impactLevel: 4,
    color: '#DC2626'
  },
  vietnam: {
    name: 'Vietnam',
    code: 'VN',
    people: 36000,
    businesses: 240,
    investmentAmount: 10200000,
    projects: ['Manufacturing durable', 'Tech export'],
    impactLevel: 3,
    color: '#EF4444'
  },
  brazil: {
    name: 'Brésil',
    code: 'BR',
    people: 54000,
    businesses: 340,
    investmentAmount: 16200000,
    projects: ['Agrotech', 'Fintech', 'Reforestation'],
    impactLevel: 4,
    color: '#DC2626'
  },
  peru: {
    name: 'Pérou',
    code: 'PE',
    people: 29000,
    businesses: 175,
    investmentAmount: 8700000,
    projects: ['Commerce équitable café', 'Tourisme communautaire'],
    impactLevel: 3,
    color: '#EF4444'
  }
};

const WorldMapWidget = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const totalPeople = Object.values(investedCountries).reduce((sum, c) => sum + c.people, 0);
  const totalBusinesses = Object.values(investedCountries).reduce((sum, c) => sum + c.businesses, 0);
  const totalInvestment = Object.values(investedCountries).reduce((sum, c) => sum + c.investmentAmount, 0);

  const getColorForLevel = (level: number) => {
    const colors = {
      1: '#FCA5A5',
      2: '#F87171',
      3: '#EF4444',
      4: '#DC2626',
      5: '#B91C1C'
    };
    return colors[level as keyof typeof colors] || '#E5E7EB';
  };

  const countryData = hoveredCountry ? investedCountries[hoveredCountry] : null;
  const selectedData = selectedCountry ? investedCountries[selectedCountry] : null;

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        expanded ? 'col-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-bnp-dark flex items-center">
          <Globe className="w-6 h-6 mr-2 text-bnp-green" />
          Développement pays émergents
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

      {/* Statistiques globales */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-bnp-green to-green-700 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 mr-2" />
            <span className="text-sm opacity-90">Personnes aidées</span>
          </div>
          <div className="text-2xl font-bold">{totalPeople.toLocaleString('fr-FR')}</div>
        </div>

        <div className="bg-gradient-to-br from-bnp-gold to-yellow-600 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <Building2 className="w-5 h-5 mr-2" />
            <span className="text-sm opacity-90">Entreprises</span>
          </div>
          <div className="text-2xl font-bold">{totalBusinesses.toLocaleString('fr-FR')}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="text-sm opacity-90">Investissement</span>
          </div>
          <div className="text-xl font-bold">{(totalInvestment / 1000000).toFixed(1)}M €</div>
        </div>
      </div>

      {/* Carte du monde */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-4">
        <div className="relative">
          <img 
            src="/images/world-map.png" 
            alt="Carte du monde"
            className="w-full h-auto opacity-20"
          />
          
          {/* Points interactifs sur la carte */}
          <svg 
            viewBox="0 0 1000 500" 
            className="absolute inset-0 w-full h-full"
            style={{ top: 0, left: 0 }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Afrique */}
            <circle cx="480" cy="280" r="8" fill={getColorForLevel(investedCountries.senegal.impactLevel)} 
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('senegal')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('senegal')}
            />
            <circle cx="460" cy="270" r="7" fill={getColorForLevel(investedCountries.mali.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('mali')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('mali')}
            />
            <circle cx="475" cy="275" r="7" fill={getColorForLevel(investedCountries['burkina-faso'].impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('burkina-faso')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('burkina-faso')}
            />
            <circle cx="495" cy="285" r="8" fill={getColorForLevel(investedCountries.nigeria.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('nigeria')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('nigeria')}
            />
            <circle cx="505" cy="295" r="8" fill={getColorForLevel(investedCountries.cameroon.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('cameroon')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('cameroon')}
            />
            <circle cx="535" cy="305" r="8" fill={getColorForLevel(investedCountries.kenya.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('kenya')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('kenya')}
            />
            <circle cx="525" cy="310" r="7" fill={getColorForLevel(investedCountries.rwanda.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('rwanda')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('rwanda')}
            />
            <circle cx="560" cy="340" r="6" fill={getColorForLevel(investedCountries.madagascar.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('madagascar')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('madagascar')}
            />

            {/* Asie */}
            <circle cx="680" cy="260" r="9" fill={getColorForLevel(investedCountries.india.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('india')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('india')}
            />
            <circle cx="720" cy="270" r="8" fill={getColorForLevel(investedCountries.bangladesh.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('bangladesh')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('bangladesh')}
            />
            <circle cx="760" cy="280" r="7" fill={getColorForLevel(investedCountries.vietnam.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('vietnam')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('vietnam')}
            />

            {/* Amérique du Sud */}
            <circle cx="280" cy="330" r="8" fill={getColorForLevel(investedCountries.brazil.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('brazil')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('brazil')}
            />
            <circle cx="260" cy="320" r="7" fill={getColorForLevel(investedCountries.peru.impactLevel)}
              className="cursor-pointer transition-all hover:r-12" filter="url(#glow)"
              onMouseEnter={() => setHoveredCountry('peru')}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => setSelectedCountry('peru')}
            />
          </svg>

          {/* Tooltip au survol */}
          {countryData && hoveredCountry && (
            <div 
              className="absolute bg-white rounded-lg shadow-xl p-4 border-2 border-bnp-green z-50 animate-fade-in"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '280px'
              }}
            >
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-bnp-green mr-2" />
                <h4 className="font-bold text-lg text-bnp-dark">{countryData.name}</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Personnes aidées:</span>
                  <span className="font-semibold text-bnp-green">{countryData.people.toLocaleString('fr-FR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entreprises:</span>
                  <span className="font-semibold text-bnp-gold">{countryData.businesses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investissement:</span>
                  <span className="font-semibold text-blue-600">{(countryData.investmentAmount / 1000000).toFixed(1)}M €</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-gray-600 text-xs">Niveau d'impact:</span>
                  <div className="flex space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < countryData.impactLevel ? 'bg-red-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 pt-2 italic">Cliquez pour voir les détails</p>
              </div>
            </div>
          )}
        </div>

        {/* Légende */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-800"></div>
            <span>Impact élevé</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Impact modéré</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300"></div>
            <span>Impact faible</span>
          </div>
        </div>
      </div>

      {/* Détails du pays sélectionné */}
      {selectedData && (
        <div className="bg-gradient-to-br from-bnp-green/5 to-bnp-gold/5 rounded-lg p-5 mb-4 animate-fade-in border-2 border-bnp-green">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-bnp-dark flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-bnp-green" />
              {selectedData.name}
            </h4>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-bnp-green">{selectedData.people.toLocaleString('fr-FR')}</div>
              <div className="text-xs text-gray-600 mt-1">Personnes aidées</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-bnp-gold">{selectedData.businesses}</div>
              <div className="text-xs text-gray-600 mt-1">Entreprises</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{(selectedData.investmentAmount / 1000000).toFixed(1)}M €</div>
              <div className="text-xs text-gray-600 mt-1">Investissement</div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-bnp-dark mb-2">Projets financés:</h5>
            <div className="space-y-2">
              {selectedData.projects.map((project, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-bnp-green mt-1.5 flex-shrink-0"></div>
                  <span className="text-gray-700">{project}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Liste des pays (version étendue) */}
      {expanded && (
        <div className="border-t pt-4 animate-fade-in">
          <h4 className="text-sm font-semibold text-bnp-dark mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-bnp-green" />
            Tous les pays
          </h4>
          <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {Object.entries(investedCountries).map(([key, country]) => (
              <div 
                key={key}
                onClick={() => setSelectedCountry(key)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: getColorForLevel(country.impactLevel) }}
                  />
                  <span className="font-medium text-sm">{country.name}</span>
                </div>
                <div className="text-xs text-gray-600">
                  {country.people.toLocaleString('fr-FR')} pers.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMapWidget;
