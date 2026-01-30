import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import axios from 'axios';
import { Scroll, Trophy, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    history: 0,
    success: 0,
    market: 0
  });

  useEffect(() => {
    // Charger des données pour les statistiques
    const loadStats = async () => {
      try {
        const historyRes = await axios.get('/api/history');
        const successRes = await axios.get('/api/success');
        const marketRes = await axios.get('/api/market');

        setStats({
          history: historyRes.data.length || 7,
          success: successRes.data.topGames?.length || 7,
          market: marketRes.data.currentPrices?.length || 3
        });
      } catch (error) {
        console.log('Chargement des statistiques...');
      }
    };

    loadStats();
  }, []);

  const features = [
    {
      title: "Histoire Complète",
      icon: <Scroll className="text-blue-500" size={40} />,
      description: "Retracez le parcours de la 3DS de 2011 à aujourd'hui avec une timeline interactive.",
      link: "/history",
      count: `${stats.history} dates clés`,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Succès Monumentaux",
      icon: <Trophy className="text-green-500" size={40} />,
      description: "Découvrez les jeux les plus vendus et les chiffres records de la console.",
      link: "/success",
      count: `${stats.success} jeux analysés`,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Marché Actuel",
      icon: <TrendingUp className="text-purple-500" size={40} />,
      description: "Analyse des prix, tendances et valeur de collection en 2024.",
      link: "/market",
      count: `${stats.market} modèles suivis`,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const timelineHighlights = [
    { year: 2011, event: "Sortie mondiale", highlight: "Première console portable 3D sans lunettes" },
    { year: 2014, event: "New 3DS", highlight: "Processeur amélioré + boutons supplémentaires" },
    { year: 2020, event: "Fin de production", highlight: "Arrêt après 9 ans de succès" },
    { year: 2023, event: "eShop fermé", highlight: "Fin d'une ère numérique" }
  ];

  return (
    <div className="space-y-16">
      {/* Section Hero */}
      <Hero />

      {/* Introduction */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Bienvenue dans les archives de la Nintendo 3DS
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Explorez l'histoire complète de l'une des consoles portables les plus iconiques de Nintendo.
          De ses innovations révolutionnaires à son héritage sur le marché rétro, plongez dans l'univers
          de la 3DS à travers des données, analyses et visuels interactifs.
        </p>
      </section>

      {/* Section Features */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Explorez Notre Contenu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {feature.count}
                  </span>
                  <Link
                    to={feature.link}
                    className="btn-primary text-sm py-2 px-6"
                  >
                    Explorer →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Rapide */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
        <div className="flex items-center justify-center space-x-3 mb-12">
          <Zap className="text-yellow-500" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">
            Timeline Express
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-nintendo-red mb-2">
                {item.year}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {item.event}
              </h4>
              <p className="text-gray-600">
                {item.highlight}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/history"
            className="inline-flex items-center text-lg font-semibold text-nintendo-blue hover:text-nintendo-red transition"
          >
            Voir la timeline complète
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Statistiques Rapides */}
      <section>
        <div className="bg-gradient-to-r from-nintendo-red to-nintendo-blue rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center justify-center space-x-3 mb-10">
            <BarChart3 size={32} />
            <h2 className="text-3xl font-bold text-center">
              En Chiffres
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">75,94M</div>
              <p className="text-lg opacity-90">Unités vendues</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">9 ans</div>
              <p className="text-lg opacity-90">Durée de vie</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">+76%</div>
              <p className="text-lg opacity-90">Hausse des prix</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">400+</div>
              <p className="text-lg opacity-90">Jeux physiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à explorer l'univers 3DS ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Commencez par la section qui vous intéresse le plus, ou parcourez tout dans l'ordre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/history"
              className="bg-nintendo-red text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 text-lg"
            >
              Commencer par l'histoire
            </Link>
            <Link
              to="/market"
              className="bg-white text-nintendo-red border-2 border-nintendo-red font-bold py-3 px-8 rounded-full hover:bg-red-50 transition duration-300 text-lg"
            >
              Voir le marché actuel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;