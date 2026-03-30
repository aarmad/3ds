import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Scroll, Trophy, TrendingUp, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Accueil', icon: <Home size={20} /> },
    { path: '/history', label: 'Histoire', icon: <Scroll size={20} /> },
    { path: '/success', label: 'Succès', icon: <Trophy size={20} /> },
    { path: '/market', label: 'Marché', icon: <TrendingUp size={20} /> },
  ];

  return (
    <nav className="bg-dark-bg border-b border-slate-700 shadow-xl shadow-blue-500/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center shadow-md shadow-blue-500/30"
            >
              <span className="text-white font-bold text-xl">3DS</span>
            </motion.div>
            <div>
              <div className="text-2xl font-bold text-white group-hover:text-accent-blue transition-colors">Nintendo 3DS</div>
              <div className="text-xs text-blue-300/70">Archives & Marché Rétro</div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${isActive(item.path)
                  ? 'bg-accent-blue text-white shadow-lg shadow-blue-500/50'
                  : 'text-blue-300 hover:bg-blue-900/30 hover:text-accent-blue'
                  }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            {/* Bouton admin (pour démo) */}
            <Link
              to="/admin"
              className="ml-4 px-4 py-2 bg-blue-900/40 text-blue-300 rounded-full hover:bg-blue-800/40 hover:text-accent-blue transition duration-300 font-medium flex items-center space-x-2 border border-blue-500/30"
            >
              <Settings size={18} />
              <span>Admin</span>
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden text-blue-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu mobile ouvert */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-300 ${isActive(item.path)
                    ? 'bg-accent-blue text-white'
                    : 'text-blue-300 hover:bg-blue-900/30 hover:text-accent-blue'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <a
                href="http://localhost:5000/admin/admin.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-4 py-3 bg-blue-900/40 text-blue-300 rounded-lg hover:bg-blue-800/40 transition duration-300 border border-blue-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={20} />
                <span className="font-medium">Interface Admin</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;