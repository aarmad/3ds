import { useEffect, useState } from 'react';
import axios from 'axios';
import MarketChart from '../components/MarketChart';
import { TrendingUp, BarChart3, Target, Lightbulb, Wrench, ArrowUpRight } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Market = () => {
  const [marketData, setMarketData] = useState({
    trend: '',
    currentPrices: [],
    reasons: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/market');
        setMarketData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  const priceEvolutionData = [
    { année: '2020', '3DS XL': 130, 'New 3DS XL': 180, '2DS': 80 },
    { année: '2021', '3DS XL': 150, 'New 3DS XL': 220, '2DS': 100 },
    { année: '2022', '3DS XL': 180, 'New 3DS XL': 260, '2DS': 120 },
    { année: '2023', '3DS XL': 220, 'New 3DS XL': 320, '2DS': 140 },
    { année: '2024', '3DS XL': 250, 'New 3DS XL': 360, '2DS': 160 },
    { année: '2025', '3DS XL': 280, 'New 3DS XL': 380, '2DS': 180 },
  ];

  return (
    <div className="bg-dark-bg text-white">
      {/* ═══════════════ HEADER ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h1 className="title-insider text-5xl md:text-7xl mb-6">
          Marché<br />
          <span className="title-insider-accent">Rétro Actuel</span>
        </h1>
        <p className="text-block-insider max-w-3xl text-lg">
          La 3DS devient un objet de collection : analyse des tendances et de la valeur. Les prix ont augmenté de 76% depuis 2020.
        </p>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ TENDANCE PRINCIPALE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="card-insider card-insider-accent bg-gradient-to-br from-accent-magenta/15 to-accent-cyan/10 border-accent-magenta/40 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-accent-magenta/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <TrendingUp size={32} className="text-accent-magenta" />
              <h2 className="title-insider text-3xl">Tendance du Marché</h2>
            </div>
            <p className="text-block-insider text-xl italic mb-8 text-slate-200">
              "{marketData.trend}"
            </p>
            <div className="flex items-center gap-3 inline-flex px-6 py-3 bg-gradient-to-r from-accent-magenta to-accent-cyan rounded-full border border-accent-magenta/50 font-bold text-white">
              <ArrowUpRight size={20} />
              +76% depuis 2020
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ GRAPHIQUES ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Analyse des <span className="title-insider-accent">Données</span>
        </h2>

        <div className="grid-insider-2col gap-8">
          {/* Graphique prix */}
          <div className="card-insider card-insider-dark">
            <h3 className="text-2xl font-black text-white mb-6">
              Évolution des prix (2020-2025)
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceEvolutionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="année" stroke="#cbd5e1" />
                  <YAxis
                    label={{ value: 'Prix ($)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                    domain={[0, 400]}
                    stroke="#cbd5e1"
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Prix']}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                    labelStyle={{ color: '#60a5fa' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="3DS XL" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="New 3DS XL" stroke="#d946ef" strokeWidth={3} />
                  <Line type="monotone" dataKey="2DS" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demande */}
          <div className="card-insider card-insider-dark">
            <h3 className="text-2xl font-black text-white mb-6">
              Demande du Marché
            </h3>
            <div className="h-80">
              <MarketChart />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ TABLEAU PRIX ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Prix <span className="title-insider-accent">Actuels</span>
        </h2>

        <div className="card-insider card-insider-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-accent-magenta uppercase tracking-widest">Modèle</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-accent-magenta uppercase tracking-widest">Prix Moyen</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-accent-magenta uppercase tracking-widest">Demande</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-accent-magenta uppercase tracking-widest">Rareté</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {marketData.currentPrices?.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{item.model}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-black text-accent-magenta">{item.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${
                        index === 0 ? 'bg-accent-blue/30 text-accent-blue border border-accent-blue/50' :
                        index === 1 ? 'bg-accent-magenta/30 text-accent-magenta border border-accent-magenta/50' :
                        'bg-accent-cyan/30 text-accent-cyan border border-accent-cyan/50'
                      }`}>
                        {index === 0 ? 'Élevée' : index === 1 ? 'Très élevée' : 'Modérée'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < (index + 1) ? 'text-accent-orange' : 'text-slate-600'}`}>★</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-400 text-xs mt-4 px-6 pb-4">
            *Prix basés sur eBay et marchés spécialisés (2024)
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ FACTEURS ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Facteurs de <span className="title-insider-accent">Valorisation</span>
        </h2>

        <div className="grid-insider-3col">
          {marketData.reasons?.map((reason, index) => (
            <div key={index} className="card-insider card-insider-dark border-accent-cyan/30">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-accent-magenta/30 to-accent-cyan/30 mb-4 border border-accent-magenta/50">
                <span className="font-black text-accent-magenta">{index + 1}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-medium">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ CONSEILS & HOMEBREW ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="grid-insider-2col gap-8">
          {/* Conseils */}
          <div className="card-insider bg-gradient-to-br from-accent-magenta/15 to-accent-orange/10 border-accent-magenta/40">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb size={28} className="text-accent-orange" />
              <h3 className="title-insider text-2xl">Conseils aux Collectionneurs</h3>
            </div>
            <p className="text-block-insider">
              La valeur des 3DS ne cesse d'augmenter. Les modèles en bon état avec leur boîte d'origine voient leur prix doubler. Les éditions limitées (Pokémon, Zelda) sont particulièrement prisées. Investir aujourd'hui pourrait s'avérer judicieux.
            </p>
          </div>

          {/* Homebrew */}
          <div className="card-insider card-insider-dark border-accent-cyan/30">
            <div className="flex items-center gap-3 mb-6">
              <Wrench size={28} className="text-accent-cyan" />
              <h3 className="title-insider text-2xl">Scène Homebrew</h3>
            </div>
            <ul className="text-block-insider space-y-3">
              <li className="flex gap-3">
                <span className="text-accent-cyan font-black flex-shrink-0">✓</span>
                <span><strong>Custom Firmware</strong> : Installation simple</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan font-black flex-shrink-0">✓</span>
                <span><strong>Émulation</strong> : NES, SNES, Game Boy</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-cyan font-black flex-shrink-0">✓</span>
                <span><strong>Applications</strong> : Lecteurs, jeux indépendants</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Market;
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="année" stroke="#cbd5e1" />
                <YAxis
                  label={{ value: 'Prix ($)', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                  domain={[0, 400]}
                  stroke="#cbd5e1"
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Prix']}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                  labelStyle={{ color: '#60a5fa' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="3DS XL"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="New 3DS XL"
                  stroke="#60a5fa"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="2DS"
                  stroke="#8B4513"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique en aires */}
        <div className="bg-dark-card border border-blue-500/20 rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Demande du marché
          </h3>
          <div className="h-80">
            <MarketChart />
          </div>
        </div>
      </div>

      {/* Tableau des prix */}
      <div className="bg-dark-card border border-blue-500/20 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart3 size={32} className="text-accent-blue" />
          <h2 className="text-3xl font-semibold text-white">
            Prix actuels du marché d'occasion
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Modèle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Prix moyen (USD)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  État de la demande
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Rareté
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {marketData.currentPrices?.map((item, index) => (
                <tr key={index} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-white">{item.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-accent-blue text-lg">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${index === 0
                      ? 'bg-green-500/20 text-green-400'
                      : index === 1
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-accent-blue/20 text-accent-blue'
                      }`}>
                      {index === 0 ? 'Élevée' : index === 1 ? 'Très élevée' : 'Modérée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < (index + 1) ? 'text-yellow-400' : 'text-slate-600'
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-blue-300/70 text-sm mt-4">
          *Prix basés sur les transactions eBay et les marchés spécialisés (2024)
        </p>
      </div>

      {/* Facteurs explicatifs */}
      <div className="bg-dark-card border border-blue-500/20 rounded-2xl p-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3 mb-6">
          <Target size={32} className="text-accent-blue" />
          <h2 className="text-3xl font-semibold text-white">
            Facteurs expliquant cette valorisation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketData.reasons?.map((reason, index) => (
            <div key={index} className="bg-slate-800/50 border border-blue-500/20 p-6 rounded-xl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-blue-200">{reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section supplémentaire */}
        <div className="mt-8 bg-gradient-to-r from-accent-blue to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb size={24} />
            <h3 className="text-2xl font-bold">Conseil aux collectionneurs</h3>
          </div>
          <p className="text-lg">
            La valeur des 3DS ne cesse d'augmenter. Les modèles en bon état avec leur boîte d'origine
            voient leur prix doubler. Les éditions limitées (Pokémon, Zelda) sont particulièrement prisées.
            Investir aujourd'hui pourrait s'avérer judicieux pour les années à venir.
          </p>
        </div>
      </div>

      {/* Homebrew */}
      <div className="bg-dark-card border border-blue-500/20 rounded-2xl p-8 shadow-lg max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3 mb-6">
          <Wrench size={32} className="text-accent-blue" />
          <h2 className="text-3xl font-semibold text-white">
            Scène Homebrew et Modding
          </h2>
        </div>
        <div className="space-y-4 text-blue-200">
          <p>
            La scène homebrew de la 3DS est l'une des plus actives et accessibles du marché rétro.
            Cela contribue fortement à la demande :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Custom Firmware (CFW)</strong> : Installation simple, même pour les débutants</li>
            <li><strong>Émulation</strong> : Possibilité d'émuler des jeux NES, SNES, Game Boy, etc.</li>
            <li><strong>Applications homebrew</strong> : Lecteurs multimédias, utilitaires, jeux indépendants</li>
            <li><strong>Communauté active</strong> : Support continu malgré l'arrêt des services officiels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Market;