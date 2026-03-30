import { Gamepad2, History, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative section-insider max-w-7xl mx-auto">
      <div className="grid-insider-2col items-center">
        {/* Texte à gauche */}
        <div>
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-accent-magenta/30 bg-accent-magenta/5">
            <Gamepad2 size={16} className="text-accent-magenta" />
            <span className="text-sm font-bold text-accent-magenta">Nintendo 3DS</span>
          </div>

          <h1 className="title-insider text-5xl md:text-6xl mb-6 leading-tight">
            L'héritage<br />
            <span className="title-insider-accent">d'une légende</span>
          </h1>

          <p className="text-block-insider mb-8 text-lg">
            De 2011 à aujourd'hui, revivez l'épopée de la console portable qui a révolutionné le gaming avec sa 3D sans lunettes et ses jeux cultes.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <Link to="/history" className="btn-insider btn-insider-blue">
              <History size={20} />
              Explorer l'Histoire
            </Link>
            <Link to="/market" className="btn-insider btn-insider-primary">
              <TrendingUp size={20} />
              Voir le Marché
            </Link>
          </div>

          <div className="text-sm text-slate-400 font-mono">
            Basé sur des données de 2024 · 14 ans d'innovation
          </div>
        </div>

        {/* Stats à droite - layout asymétrique */}
        <div className="relative">
          <div className="space-y-4">
            {[
              { label: 'Sortie', value: '2011', accent: 'accent-blue' },
              { label: 'Unités vendues', value: '75,94M', accent: 'accent-magenta' },
              { label: 'Jeu #1', value: 'Mario Kart 7', accent: 'accent-orange' },
              { label: 'Valeur actuelle', value: '+76% ↑', accent: 'accent-cyan' }
            ].map((stat, idx) => (
              <div key={idx} className="card-insider card-insider-dark">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-semibold">{stat.label}</span>
                  <span className={`text-3xl font-black text-${stat.accent}`}>
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Élément graphique abstrait */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-accent-magenta/10 to-accent-blue/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;