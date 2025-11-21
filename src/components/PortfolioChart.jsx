import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank } from 'lucide-react';

// Données simulées pour le graphique
const generatePortfolioData = () => {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  let cashInvesti = 500000;
  let performance = 500000;
  let cashLibre = 100000;
  
  return months.map((month, index) => {
    cashInvesti += Math.random() * 50000 - 10000;
    performance = cashInvesti * (1 + (Math.random() * 0.15 - 0.05));
    cashLibre = 100000 + Math.random() * 50000;
    
    return {
      mois: month,
      'Cash Investi': Math.round(cashInvesti),
      'Performance': Math.round(performance),
      'Cash Libre': Math.round(cashLibre)
    };
  });
};

function PortfolioChart() {
  const [timeRange, setTimeRange] = useState('12M');
  const data = generatePortfolioData();
  
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const performanceChange = ((latestData.Performance - previousData.Performance) / previousData.Performance * 100).toFixed(2);
  const isPositive = performanceChange >= 0;

  const totalValue = latestData.Performance;
  const investedCash = latestData['Cash Investi'];
  const freeCash = latestData['Cash Libre'];
  const totalProfit = totalValue - investedCash;

  return (
    <div>
      {/* Statistiques en haut */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-bnp-green to-green-700 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Valeur totale</span>
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{totalValue.toLocaleString('fr-FR')} €</div>
          <div className={`flex items-center text-sm mt-1 ${isPositive ? 'text-green-100' : 'text-red-200'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {performanceChange}% ce mois
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Cash investi</span>
            <Wallet className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{investedCash.toLocaleString('fr-FR')} €</div>
          <div className="text-sm opacity-80 mt-1">Capital placé</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Cash disponible</span>
            <PiggyBank className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold">{freeCash.toLocaleString('fr-FR')} €</div>
          <div className="text-sm opacity-80 mt-1">À investir</div>
        </div>

        <div className={`bg-gradient-to-br ${totalProfit >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-lg p-4 text-white`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Plus-value</span>
            {totalProfit >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          <div className="text-2xl font-bold">{totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString('fr-FR')} €</div>
          <div className="text-sm opacity-80 mt-1">{((totalProfit / investedCash) * 100).toFixed(2)}% ROI</div>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Évolution du portefeuille</h3>
          <div className="flex space-x-2">
            {['1M', '3M', '6M', '12M', 'MAX'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-bnp-green text-white'
                    : 'bg-white text-bnp-dark hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="mois" 
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#666"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k €`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => `${value.toLocaleString('fr-FR')} €`}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="Performance" 
              stroke="#00A650" 
              strokeWidth={3}
              dot={{ fill: '#00A650', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="Cash Investi" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="Cash Libre" 
              stroke="#A855F7" 
              strokeWidth={2}
              dot={{ fill: '#A855F7', r: 3 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PortfolioChart;
