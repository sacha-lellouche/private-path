import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, TrendingUp, Save, Edit2, DollarSign, Target, PieChart } from 'lucide-react';

function Profile() {
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
      development: true,
      medicalResearch: true,
      environment: false,
      education: false
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

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleMetricToggle = (metric) => {
    setTempProfile({
      ...tempProfile,
      impactMetrics: {
        ...tempProfile.impactMetrics,
        [metric]: !tempProfile.impactMetrics[metric]
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
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
                Modifier le profil
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
          {/* Informations personnelles */}
          <section>
            <h2 className="text-2xl font-bold text-bnp-dark mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-bnp-green" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.firstName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.lastName}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date de naissance</label>
                <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>{profile.birthDate}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Profil financier */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-bnp-dark mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-bnp-green" />
              Profil financier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profil de risque</label>
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
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="capitalize">{profile.riskProfile}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Objectif d'investissement</label>
                {isEditing ? (
                  <select
                    value={tempProfile.investmentGoal}
                    onChange={(e) => handleChange('investmentGoal', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                  >
                    <option value="préservation">Préservation du capital</option>
                    <option value="revenu">Génération de revenus</option>
                    <option value="croissance">Croissance</option>
                    <option value="croissance-aggressive">Croissance agressive</option>
                  </select>
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="capitalize">{profile.investmentGoal}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Horizon d'investissement</label>
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
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{profile.timeHorizon}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Besoins de liquidité</label>
                {isEditing ? (
                  <select
                    value={tempProfile.liquidityNeeds}
                    onChange={(e) => handleChange('liquidityNeeds', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bnp-green focus:border-transparent"
                  >
                    <option value="très-faible">Très faible</option>
                    <option value="faible">Faible</option>
                    <option value="moyen">Moyen</option>
                    <option value="élevé">Élevé</option>
                  </select>
                ) : (
                  <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <PieChart className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="capitalize">{profile.liquidityNeeds}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Métriques d'impact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-bnp-dark mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-bnp-green" />
              Métriques d'impact à suivre
            </h2>
            <p className="text-gray-600 mb-6">Sélectionnez les métriques d'impact qui vous intéressent pour votre tableau de bord</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'development', label: 'Développement des pays du Sud', icon: '🌍' },
                { key: 'medicalResearch', label: 'Recherche médicale', icon: '🧬' },
                { key: 'environment', label: 'Protection de l\'environnement', icon: '🌱' },
                { key: 'education', label: 'Éducation et formation', icon: '📚' }
              ].map((metric) => (
                <div
                  key={metric.key}
                  onClick={() => isEditing && handleMetricToggle(metric.key)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    isEditing ? 'cursor-pointer hover:shadow-md' : ''
                  } ${
                    (isEditing ? tempProfile : profile).impactMetrics[metric.key]
                      ? 'border-bnp-green bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{metric.icon}</span>
                    <span className="font-medium text-bnp-dark">{metric.label}</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    (isEditing ? tempProfile : profile).impactMetrics[metric.key]
                      ? 'border-bnp-green bg-bnp-green'
                      : 'border-gray-300'
                  }`}>
                    {(isEditing ? tempProfile : profile).impactMetrics[metric.key] && (
                      <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
