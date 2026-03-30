import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Search, DollarSign } from 'lucide-react';

const MarketChart = () => {
  // Données simulées pour la demande du marché
  const demandData = [
    { mois: 'Jan', recherche: 65, ventes: 120 },
    { mois: 'Fév', recherche: 78, ventes: 145 },
    { mois: 'Mar', recherche: 90, ventes: 180 },
    { mois: 'Avr', recherche: 85, ventes: 160 },
    { mois: 'Mai', recherche: 95, ventes: 190 },
    { mois: 'Jun', recherche: 110, ventes: 210 },
    { mois: 'Jul', recherche: 105, ventes: 200 },
    { mois: 'Aoû', recherche: 115, ventes: 220 },
    { mois: 'Sep', recherche: 125, ventes: 240 },
    { mois: 'Oct', recherche: 130, ventes: 250 },
    { mois: 'Nov', recherche: 140, ventes: 270 },
    { mois: 'Déc', recherche: 150, ventes: 300 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card border border-blue-500/50 p-4 shadow-lg rounded-lg">
          <p className="font-bold text-white mb-2">{label} 2024</p>
          <p className="text-accent-blue flex items-center space-x-1">
            <Search size={14} />
            <span>Recherches: <span className="font-bold">{payload[0].value}%</span></span>
          </p>
          <p className="text-cyan-400 flex items-center space-x-1">
            <DollarSign size={14} />
            <span>Ventes: <span className="font-bold">{payload[1].value}</span></span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={demandData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#334155"
        />
        <XAxis
          dataKey="mois"
          axisLine={{ stroke: '#94a3b8' }}
          tickLine={false}
          stroke="#94a3b8"
        />
        <YAxis
          yAxisId="left"
          label={{
            value: 'Recherches (%)',
            angle: -90,
            position: 'insideLeft',
            offset: -10,
            fill: '#cbd5e1'
          }}
          domain={[0, 200]}
          stroke="#94a3b8"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: 'Ventes',
            angle: 90,
            position: 'insideRight',
            offset: -10,
            fill: '#cbd5e1'
          }}
          stroke="#94a3b8"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ color: '#e2e8f0' }}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="recherche"
          name="Intérêt des recherches"
          stackId="1"
          stroke="#3b82f6"
          fill="url(#colorRecherche)"
          fillOpacity={0.6}
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="ventes"
          name="Ventes estimées"
          stackId="2"
          stroke="#06b6d4"
          fill="url(#colorVentes)"
          fillOpacity={0.6}
        />
        <defs>
          <linearGradient id="colorRecherche" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;