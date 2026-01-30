import { Home, Scroll, Trophy, TrendingUp, BarChart3, Gamepad2, Store, Calendar, AlertTriangle, Lock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-nintendo-red">Nintendo 3DS Archive</h3>
            <p className="text-gray-400">
              Site fan dédié à la préservation de l'histoire et de l'héritage
              de la Nintendo 3DS. Non affilié à Nintendo.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition flex items-center space-x-2"><Home size={16} /> <span>Accueil</span></a></li>
              <li><a href="/history" className="text-gray-400 hover:text-white transition flex items-center space-x-2"><Scroll size={16} /> <span>Histoire</span></a></li>
              <li><a href="/success" className="text-gray-400 hover:text-white transition flex items-center space-x-2"><Trophy size={16} /> <span>Succès</span></a></li>
              <li><a href="/market" className="text-gray-400 hover:text-white transition flex items-center space-x-2"><TrendingUp size={16} /> <span>Marché</span></a></li>
            </ul>
          </div>

          {/* Sources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Sources</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2"><BarChart3 size={16} /> <span>Nintendo Financial Reports</span></li>
              <li className="flex items-center space-x-2"><Gamepad2 size={16} /> <span>VGChartz & Wikipedia</span></li>
              <li className="flex items-center space-x-2"><TrendingUp size={16} /> <span>eBay Market Data</span></li>
              <li className="flex items-center space-x-2"><Store size={16} /> <span>PriceCharting.com</span></li>
            </ul>
          </div>

          {/* Contact/Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2"><Calendar size={16} /> <p>Données mises à jour : Mars 2025</p></div>
              <div className="flex items-center space-x-2"><AlertTriangle size={16} /> <p>Ce site est un projet éducatif</p></div>
              <div className="flex items-center space-x-2"><Lock size={16} /> <p>Toutes les marques appartiennent à leurs propriétaires respectifs</p></div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Nintendo 3DS Archive - Projet de démonstration full-stack
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              title="Code source"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <button
              className="text-gray-400 hover:text-white transition text-sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Retour en haut
            </button>
          </div>
        </div>

        {/* Avertissement */}
        <div className="mt-8 text-center text-xs text-gray-600">
          <p>
            Ce site est un projet de démonstration de développement web full-stack.
            Les données présentées sont basées sur des sources publiques et peuvent contenir des approximations.
            Nintendo est une marque déposée de Nintendo Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;