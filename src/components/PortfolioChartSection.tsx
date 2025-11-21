import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Génération de données simulées
const generateData = (months: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = date.toLocaleDateString('fr-FR', { month: 'short' });
    
    data.push({
      month: monthLabel,
      performance: 480000 + Math.random() * 80000,
      cashInvested: 420000 + Math.random() * 60000,
      cashFree: 50000 + Math.random() * 30000,
    });
  }
  
  return data;
};

const PortfolioChartSection = () => {
  const [timeRange, setTimeRange] = useState(12);
  const data = generateData(timeRange);

  const periods = [
    { label: "1M", value: 1 },
    { label: "3M", value: 3 },
    { label: "6M", value: 6 },
    { label: "12M", value: 12 },
    { label: "MAX", value: 24 },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      {/* Period buttons */}
      <div className="flex justify-end gap-2 mb-4">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => setTimeRange(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              timeRange === period.value
                ? "bg-bnp-green text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k €`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value.toLocaleString('fr-FR')} €`, '']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="hsl(156, 100%, 29%)"
            strokeWidth={3}
            name="Performance"
            dot={{ r: 4, fill: "hsl(156, 100%, 29%)" }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="cashInvested"
            stroke="#3B82F6"
            strokeWidth={2}
            name="Cash Investi"
            dot={{ r: 3, fill: "#3B82F6" }}
          />
          <Line
            type="monotone"
            dataKey="cashFree"
            stroke="#A855F7"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Cash Libre"
            dot={{ r: 3, fill: "#A855F7" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChartSection;
