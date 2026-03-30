import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    history: 0,
    success: 0,
    market: 0
  });

  useEffect(() => {
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

  const highlights = [
    {
      title: "Histoire Complète",
      description: "Retracez le parcours de la 3DS de 2011 à aujourd'hui avec une timeline interactive et détaillée.",
      link: "/history",
      stat: `${stats.history} dates clés`,
      accent: 'accent-blue',
      bg: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      title: "Succès Monumentaux",
      description: "Découvrez les jeux les plus vendus, les records de ventes et les chiffres impressionnants.",
      link: "/success",
      stat: `${stats.success} jeux analysés`,
      accent: 'accent-magenta',
      bg: 'from-magenta-500/10 to-pink-500/10'
    },
    {
      title: "Marché Actuel",
      description: "Analyse en temps réel des prix, tendances de collection et valeur des consoles en 2024.",
      link: "/market",
      stat: `${stats.market} modèles`,
      accent: 'accent-orange',
      bg: 'from-orange-500/10 to-red-500/10'
    }
  ];

  return (
    <div className="bg-dark-bg text-white">
      {/* Hero Section */}
      <Hero />

      {/* ═══════════════ SECTION INTRO ASYMÉTRIQUE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="grid-insider-2col items-center">
          {/* Texte */}
          <div>
            <h2 className="title-insider mb-6">
              Bienvenue dans les<br />
              <span className="title-insider-accent">archives du 3DS</span>
            </h2>
            <div className="text-block-insider space-y-4">
              <p>
                Explorez l'histoire complète de l'une des consoles portables les plus iconiques de Nintendo. De son lancement révolutionnaire en 2011 à sa fin de production en 2020, découvrez comment la Nintendo 3DS a changé le gaming portable.
              </p>
              <p>
                Analyse des succès commerciaux, tendances du marché, et l'héritage durable d'une console qui a vendu plus de 75 millions d'unités.
              </p>
            </div>
            <Link to="/history" className="btn-insider btn-insider-blue mt-8">
              Explorer l'histoire
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Élément graphique abstrait */}
          <div className="relative h-64 md:h-96 flex items-center justify-center">
            <div className="circle-pattern absolute inset-0 m-auto"></div>
            <div className="absolute text-6xl opacity-20 animate-spin">3DS</div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ TROIS HIGHLIGHTS - GRILLE ASYMÉTRIQUE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="title-insider">
            Découvrez nos trois<br />
            <span className="title-insider-accent">domaines d'exploration</span>
          </h2>
        </div>

        <div className="grid-insider-3col">
          {highlights.map((item, idx) => (
            <Link key={idx} to={item.link}>
              <div className={`card-insider card-insider-dark group cursor-pointer h-full`}>
                {/* Background accent */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-block w-2 h-12 bg-${item.accent} rounded-full mb-6`}></div>

                  <h3 className="title-insider text-2xl mb-3 group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>

                  <p className="text-block-insider flex-grow mb-6">
                    {item.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                      {item.stat}
                    </span>
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ TIMELINE VISUELLE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <h2 className="title-insider mb-12">
          Jalons importants
        </h2>

        <div className="grid-insider-2col">
          {/* Dates côté gauche */}
          <div className="space-y-8">
            {[
              { year: 2011, title: 'Révolution 3D', desc: 'Première console 3D sans lunettes' },
              { year: 2014, title: 'New 3DS', desc: 'Processeur amélioré & C-stick' },
              { year: 2020, title: 'Fin de production', desc: 'Après 9 ans de succès' }
            ].map((item, idx) => (
              <div key={idx} className="card-insider card-insider-dark">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-accent-magenta">{item.year}</span>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visuel côté droit */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-magenta/20 rounded-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-black bg-gradient-to-r from-accent-blue to-accent-magenta bg-clip-text text-transparent">
                    13
                  </div>
                  <p className="text-sm mt-2 text-slate-400">ans de passion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto bg-gradient-to-r from-accent-blue/5 to-accent-magenta/5 rounded-3xl border border-slate-700">
        <div className="text-center py-12">
          <h2 className="title-insider mb-6">
            Prêt à explorer l'univers 3DS?
          </h2>
          <p className="text-block-insider max-w-2xl mx-auto mb-8">
            Plongez dans une expérience interactive complète avec données, visuels 3D et analyses détaillées.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/history" className="btn-insider btn-insider-blue">
              Histoire <ArrowRight size={20} />
            </Link>
            <Link to="/success" className="btn-insider btn-insider-primary">
              Succès <ArrowRight size={20} />
            </Link>
            <Link to="/market" className="btn-insider btn-insider-blue">
              Marché <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
          De ses innovations révolutionnaires à son héritage sur le marché rétro, plongez dans l'univers
          de la 3DS à travers des données, analyses et visuels interactifs.
        </p>
      </section>

      {/* Section Features */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Explorez Notre Contenu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-card border border-blue-500/30 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-300 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-400">
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
      <section className="bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-8 md:p-12 mx-4">
        <div className="flex items-center justify-center space-x-3 mb-12">
          <Zap className="text-yellow-400" size={32} />
          <h2 className="text-3xl font-bold text-white">
            Timeline Express
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineHighlights.map((item, index) => (
            <div
              key={index}
              className="bg-dark-card border border-blue-500/20 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-accent-blue mb-2">
                {item.year}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {item.event}
              </h4>
              <p className="text-blue-300 text-sm">
                {item.highlight}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/history"
            className="inline-flex items-center text-lg font-semibold text-accent-blue hover:text-blue-300 transition"
          >
            Voir la timeline complète
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Statistiques Rapides */}
      <section className="px-4">
        <div className="bg-gradient-to-r from-accent-blue to-blue-600 rounded-3xl p-8 md:p-12 text-white max-w-6xl mx-auto">
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
      <section className="text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à explorer l'univers 3DS ?
          </h2>
          <p className="text-xl text-blue-300 mb-8">
            Commencez par la section qui vous intéresse le plus, ou parcourez tout dans l'ordre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/history"
              className="bg-accent-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition duration-300 text-lg shadow-lg shadow-blue-500/50"
            >
              Commencer par l'histoire
            </Link>
            <Link
              to="/market"
              className="bg-transparent text-accent-blue border-2 border-accent-blue font-bold py-3 px-8 rounded-full hover:bg-accent-blue/10 transition duration-300 text-lg"
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