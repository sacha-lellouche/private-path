import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save, Edit2, CheckCircle } from 'lucide-react';
import BNPNavigation from '@/components/BNPNavigation';

const ProfileNew = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    address: '15 Avenue Montaigne, 75008 Paris',
    birthDate: '15/03/1975',
    clientSince: '2018',
    
    // Profil financier
    riskProfile: 'modéré',
    investmentGoal: 'croissance',
    timeHorizon: '10-15 ans',
    liquidityNeeds: 'faible',
    
    // Métriques d'impact
    impactMetrics: {
      ecology: true,
      health: false,
      defense: false,
      local: false,
      developing: true,
      blockchain: false,
      culture: false
    }
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleMetricToggle = (metric: string) => {
    setTempProfile({
      ...tempProfile,
      impactMetrics: {
        ...tempProfile.impactMetrics,
        [metric]: !tempProfile.impactMetrics[metric as keyof typeof tempProfile.impactMetrics]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BNPNavigation />

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête du profil */}
          <div className="bg-gradient-to-r from-bnp-green to-green-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-4 mr-4">
                  <User className="w-12 h-12 text-bnp-green" />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                  <p className="text-green-100 mt-1">Client depuis {profile.clientSince}</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-bnp-green px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Modifier
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-white text-bnp-green px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Métriques d'impact - EN PRIORITÉ */}
            <section>
              <h2 className="text-2xl font-bold text-bnp-dark mb-3">
                Mes Centres d'Intérêt
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Sélectionnez les secteurs qui vous intéressent pour personnaliser votre dashboard
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'ecology', label: 'Écologie', icon: '🌱' },
                  { key: 'health', label: 'Santé', icon: '❤️' },
                  { key: 'defense', label: 'Défense', icon: '🛡️' },
                  { key: 'local', label: 'Économie Locale', icon: '📍' },
                  { key: 'developing', label: 'Pays en Développement', icon: '🌍' },
                  { key: 'blockchain', label: 'Blockchain', icon: '₿' },
                  { key: 'culture', label: 'Art et Culture', icon: '🎨' }
                ].map((metric) => (
                  <div
                    key={metric.key}
                    onClick={() => isEditing && handleMetricToggle(metric.key)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      isEditing ? 'cursor-pointer hover:border-bnp-green' : ''
                    } ${
                      (isEditing ? tempProfile : profile).impactMetrics[metric.key as keyof typeof profile.impactMetrics]
                        ? 'border-bnp-green bg-bnp-green/5'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className="font-semibold text-bnp-dark">{metric.label}</span>
                    </div>
                    
                    {(isEditing ? tempProfile : profile).impactMetrics[metric.key as keyof typeof profile.impactMetrics] && (
                      <div className="w-6 h-6 rounded-full bg-bnp-green flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Profil d'investissement */}
            <section className="border-t pt-8">
              <h2 className="text-2xl font-bold text-bnp-dark mb-6">
                Profil d'Investissement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profil de risque</label>
                  {isEditing ? (
                    <select
                      value={tempProfile.riskProfile}
                      onChange={(e) => handleChange('riskProfile', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                    >
                      <option value="prudent">Prudent</option>
                      <option value="modéré">Modéré</option>
                      <option value="dynamique">Dynamique</option>
                      <option value="agressif">Agressif</option>
                    </select>
                  ) : (
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <span className="capitalize text-bnp-dark">{profile.riskProfile}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horizon d'investissement</label>
                  {isEditing ? (
                    <select
                      value={tempProfile.timeHorizon}
                      onChange={(e) => handleChange('timeHorizon', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                    >
                      <option value="court">Court terme (1-3 ans)</option>
                      <option value="moyen">Moyen terme (3-7 ans)</option>
                      <option value="10-15 ans">Long terme (10-15 ans)</option>
                      <option value="très-long">Très long terme (15+ ans)</option>
                    </select>
                  ) : (
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <span className="text-bnp-dark">{profile.timeHorizon}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Informations personnelles - Repliable */}
            <section className="border-t pt-8">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h2 className="text-xl font-bold text-bnp-dark">
                    Informations Personnelles
                  </h2>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{profile.address}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                    <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{profile.birthDate}</span>
                    </div>
                  </div>
                </div>
              </details>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNew;
