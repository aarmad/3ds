import { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Success = () => {
  const [successData, setSuccessData] = useState({ 
    totalSales: '', 
    topGames: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/success');
        setSuccessData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  // Préparer les données pour le graphique
  const chartData = successData.topGames?.map(game => ({
    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
    ventes: parseFloat(game.sales.replace(' millions', '').replace(',', '.'))
  })) || [];

  return (
    <div className="space-y-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-nintendo-red mb-4">
          Le Succès de la 3DS
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une console qui a marqué son époque avec une bibliothèque de jeux exceptionnelle
        </p>
      </div>

      {/* Ventes totales */}
      <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Ventes mondiales totales
          </h2>
          <div className="flex flex-col items-center">
            <div className="text-7xl font-bold text-nintendo-blue mb-2">
              {successData.totalSales}
            </div>
            <p className="text-2xl text-gray-600">d'unités vendues</p>
            <p className="text-gray-500 mt-4">
              Chiffre officiel Nintendo (arrêté au 30 septembre 2022)
            </p>
          </div>
        </div>
      </div>

      {/* Graphique des ventes */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Top des jeux les plus vendus
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                label={{ 
                  value: 'Millions d\'unités', 
                  angle: -90, 
                  position: 'insideLeft' 
                }} 
              />
              <Tooltip 
                formatter={(value) => [`${value} millions`, 'Ventes']}
                labelFormatter={(label) => `Jeu: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="ventes" 
                name="Ventes (millions)" 
                fill="#e60012" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cartes des jeux */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Découvrez les hits de la 3DS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successData.topGames?.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              sales={game.sales}
              rank={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Section contexte */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Contexte du succès
        </h3>
        <div className="space-y-4 text-gray-700">
          <p>
            La Nintendo 3DS a dominé le marché des consoles portables pendant près d'une décennie.
            Son succès s'explique par plusieurs facteurs :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Bibliothèque exclusive</strong> : Pokémon, Mario, Zelda, Animal Crossing...
            </li>
            <li>
              <strong>Rétrocompatibilité</strong> : Jouabilité avec les jeux DS et DSiWare
            </li>
            <li>
              <strong>Innovations</strong> : 3D sans lunettes, StreetPass, SpotPass
            </li>
            <li>
              <strong>Politique de prix</strong> : Baisse de prix significative 6 mois après le lancement
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Success;