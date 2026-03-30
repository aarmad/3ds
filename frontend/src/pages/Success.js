import { useEffect, useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { Trophy, TrendingUp, Star } from 'lucide-react';
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
        const response = await axios.get('/api/success');
        setSuccessData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = successData.topGames?.map(game => ({
    name: game.title.length > 15 ? game.title.substring(0, 15) + '...' : game.title,
    ventes: parseFloat(game.sales.replace(' millions', '').replace(',', '.'))
  })) || [];

  return (
    <div className="bg-dark-bg text-white">
      {/* ═══════════════ HEADER ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h1 className="title-insider text-5xl md:text-7xl mb-6">
          Les Succès<br />
          <span className="title-insider-accent">de la 3DS</span>
        </h1>
        <p className="text-block-insider max-w-3xl text-lg">
          Une console qui a marqué son époque avec une bibliothèque de jeux exceptionnelle et des chiffres de vente inégalés.
        </p>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ VENTES TOTALES ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="card-insider bg-gradient-to-br from-accent-orange/15 to-accent-magenta/10 border-accent-orange/40 relative overflow-hidden">
          {/* Background element */}
          <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-accent-orange/10 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <Trophy size={40} className="text-accent-orange" />
              <div>
                <h2 className="title-insider text-3xl">Ventes Mondiales</h2>
                <p className="text-xs text-accent-orange font-bold uppercase tracking-widest mt-1">Chiffre officiel Nintendo</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-7xl font-black text-accent-orange leading-none">
                {successData.totalSales}
              </div>
              <p className="text-xl text-slate-300">
                d'unités vendues (arrêté au 30/09/2022)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ GRAPHIQUE VENTES ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Top des <span className="title-insider-accent">Jeux</span>
        </h2>

        <div className="card-insider card-insider-dark">
          <h3 className="text-2xl font-black text-white mb-8">Les plus vendus</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  stroke="#cbd5e1"
                />
                <YAxis
                  label={{
                    value: 'Millions d\'unités',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#cbd5e1'
                  }}
                  stroke="#cbd5e1"
                />
                <Tooltip
                  formatter={(value) => [`${value} millions`, 'Ventes']}
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                  labelStyle={{ color: '#60a5fa' }}
                />
                <Legend />
                <Bar
                  dataKey="ventes"
                  name="Ventes (millions)"
                  fill="#d946ef"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ CARTES JEUX ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Découvrez les <span className="title-insider-accent">Hits</span> de la 3DS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successData.topGames?.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              sales={game.sales}
              rank={index + 1}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ CONTEXTE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider text-4xl mb-12">
          Contexte du <span className="title-insider-accent">Succès</span>
        </h2>

        <div className="grid-insider-2col gap-8 items-start">
          {/* Texte */}
          <div className="text-block-insider space-y-6">
            <p className="text-lg">
              La Nintendo 3DS a dominé le marché des consoles portables pendant près d'une décennie. Son succès s'explique par une combinaison de facteurs gagnants.
            </p>

            <div className="space-y-4">
              {[
                { icon: '🎮', title: 'Bibliothèque exclusive', desc: 'Pokémon, Mario, Zelda, Animal Crossing...' },
                { icon: '↩️', title: 'Rétrocompatibilité', desc: 'Jeux DS et DSiWare jouables natalement' },
                { icon: '✨', title: 'Innovations', desc: '3D sans lunettes, StreetPass, SpotPass' },
                { icon: '💰', title: 'Politique tarifaire', desc: 'Baisse significative 6 mois après lancement' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                  </div>
                  <p className="text-slate-300 ml-12">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="space-y-4">
            <div className="card-insider card-insider-accent bg-gradient-to-br from-accent-cyan/15 to-accent-blue/10 border-accent-cyan/40">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={24} className="text-accent-cyan" />
                <h3 className="font-bold text-white">Croissance Régulière</h3>
              </div>
              <p className="text-sm text-slate-300">
                Des débuts prometteurs en 2011 jusqu'à l'arrêt de production en 2020, une courbe ascendante constante.
              </p>
            </div>

            <div className="card-insider card-insider-dark border-accent-magenta/30">
              <div className="flex items-center gap-3 mb-4">
                <Star size={24} className="text-accent-magenta" />
                <h3 className="font-bold text-white">Système Perfectionné</h3>
              </div>
              <p className="text-sm text-slate-300">
                La New 3DS et New 3DS XL ont apporté des améliorations qui ont relancé les ventes en 2014-2015.
              </p>
            </div>

            <div className="card-insider card-insider-dark border-accent-orange/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🌍</span>
                <h3 className="font-bold text-white">Impact Mondial</h3>
              </div>
              <p className="text-sm text-slate-300">
                Succès aux États-Unis, Japon et Européalso sur tous les continents, un succès véritablement global.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Success;
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cartes des jeux */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <h2 className="text-3xl font-semibold text-white mb-8">
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
      <div className="bg-dark-card border border-blue-500/20 rounded-2xl p-8 max-w-6xl mx-auto w-full">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Contexte du succès
        </h3>
        <div className="space-y-4 text-blue-200">
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