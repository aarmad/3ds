const GameCard = ({ title, sales, rank }) => {
  // Icônes pour différents jeux
  const getIcon = () => {
    if (title.includes('Mario')) return '👨‍🎤';
    if (title.includes('Pokémon')) return '⚡';
    if (title.includes('Animal Crossing')) return '🌳';
    return '🎮';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getIcon()}</div>
            <div>
              <div className="flex items-center">
                <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full mr-2">
                  #{rank}
                </span>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-nintendo-red">
              {sales.split(' ')[0]}
            </span>
            <span className="ml-2 text-gray-600 text-lg">millions</span>
          </div>
          <p className="text-gray-500 mt-2">d'exemplaires vendus</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>⭐ Classé #{rank}</span>
            <span>🏆 Succès critique</span>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Popularité</span>
            <span>{Math.round(parseFloat(sales) / 19 * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-nintendo-blue to-nintendo-red h-2.5 rounded-full" 
              style={{ width: `${Math.min(100, (parseFloat(sales) / 19 * 100))}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;