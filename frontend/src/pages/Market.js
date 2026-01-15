import { useEffect, useState } from 'react';
import axios from 'axios';
import MarketChart from '../components/MarketChart';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
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
        const response = await axios.get('http://localhost:5000/api/market');
        setMarketData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  // Données pour le graphique des prix
  const priceEvolutionData = [
    { année: '2020', '3DS XL': 130, 'New 3DS XL': 180, '2DS': 80 },
    { année: '2021', '3DS XL': 150, 'New 3DS XL': 220, '2DS': 100 },
    { année: '2022', '3DS XL': 180, 'New 3DS XL': 260, '2DS': 120 },
    { année: '2023', '3DS XL': 220, 'New 3DS XL': 320, '2DS': 140 },
    { année: '2024', '3DS XL': 250, 'New 3DS XL': 360, '2DS': 160 },
    { année: '2025', '3DS XL': 280, 'New 3DS XL': 380, '2DS': 180 },
  ];

  return (
    <div className="space-y-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-nintendo-red mb-4">
          Marché Rétro Actuel
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          La 3DS devient un objet de collection : analyse des tendances et de la valeur
        </p>
      </div>

      {/* Tendance principale */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            📈 Tendance du marché
          </h2>
          <p className="text-2xl text-gray-700 italic">
            "{marketData.trend}"
          </p>
          <div className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-nintendo-red text-white rounded-full font-semibold">
            +76% depuis 2020
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Graphique d'évolution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Évolution des prix (2020-2025)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceEvolutionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="année" />
                <YAxis 
                  label={{ value: 'Prix ($)', angle: -90, position: 'insideLeft' }}
                  domain={[0, 400]}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Prix']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="3DS XL" 
                  stroke="#e60012" 
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="New 3DS XL" 
                  stroke="#1b7bb8" 
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
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Demande du marché
          </h3>
          <div className="h-80">
            <MarketChart />
          </div>
        </div>
      </div>

      {/* Tableau des prix */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          📊 Prix actuels du marché d'occasion
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Modèle
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Prix moyen (USD)
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  État de la demande
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rareté
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketData.currentPrices?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.model}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-nintendo-blue text-lg">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      index === 0 
                        ? 'bg-green-100 text-green-800'
                        : index === 1
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {index === 0 ? 'Élevée' : index === 1 ? 'Très élevée' : 'Modérée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < (index + 1) ? 'text-yellow-400' : 'text-gray-300'
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
        <p className="text-gray-500 text-sm mt-4">
          *Prix basés sur les transactions eBay et les marchés spécialisés (2024)
        </p>
      </div>

      {/* Facteurs explicatifs */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          🎯 Facteurs expliquant cette valorisation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {marketData.reasons?.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-nintendo-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-gray-800">{reason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Section supplémentaire */}
        <div className="mt-8 bg-gradient-to-r from-nintendo-blue to-nintendo-red rounded-xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">💡 Conseil aux collectionneurs</h3>
          <p className="text-lg">
            La valeur des 3DS ne cesse d'augmenter. Les modèles en bon état avec leur boîte d'origine 
            voient leur prix doubler. Les éditions limitées (Pokémon, Zelda) sont particulièrement prisées.
            Investir aujourd'hui pourrait s'avérer judicieux pour les années à venir.
          </p>
        </div>
      </div>

      {/* Homebrew */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          🛠️ Scène Homebrew et Modding
        </h2>
        <div className="space-y-4 text-gray-700">
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