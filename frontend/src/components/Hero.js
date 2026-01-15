const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-nintendo-blue via-purple-500 to-nintendo-red text-white py-16 md:py-24 px-4 md:px-8 rounded-3xl overflow-hidden">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10 transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-10 transform -translate-x-48 translate-y-48"></div>
      
      {/* Contenu */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Texte */}
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-sm font-semibold">🎮 Console Rétro de l'Année 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Nintendo <span className="text-yellow-300">3DS</span>
              <br />
              <span className="text-4xl md:text-5xl">L'héritage d'une légende</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              De 2011 à aujourd'hui, revivez l'épopée de la console portable qui a révolutionné 
              le gaming avec sa 3D sans lunettes et ses jeux cultes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/history" 
                className="bg-white text-nintendo-red font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition duration-300 text-center text-lg shadow-lg hover:shadow-xl"
              >
                🕰️ Explorer l'Histoire
              </a>
              <a 
                href="/market" 
                className="bg-transparent border-2 border-white font-bold py-4 px-8 rounded-full hover:bg-white/20 transition duration-300 text-center text-lg"
              >
                📈 Voir le Marché
              </a>
            </div>
          </div>
          
          {/* Illustration/Statistiques */}
          <div className="lg:w-2/5">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">📊 En bref</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Sortie mondiale</span>
                  <span className="font-bold text-xl">2011</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Unités vendues</span>
                  <span className="font-bold text-xl">75,94M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Jeux les + vendus</span>
                  <span className="font-bold text-xl">Mario Kart 7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Valeur actuelle</span>
                  <span className="font-bold text-xl text-green-300">+76%</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-sm opacity-80">
                  « La 3DS a réinventé le jeu portable avec ses innovations et sa bibliothèque exceptionnelle. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;