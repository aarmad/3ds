import { useEffect, useState, Suspense } from 'react';
import Timeline from '../components/Timeline';
import HistoryScene from '../components/HistoryScene';
import axios from 'axios';
import { motion } from 'framer-motion';

import FloatingIcons from '../components/FloatingIcons';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/history')
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative overflow-hidden">
      <FloatingIcons />
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-nintendo-red font-black uppercase tracking-widest text-sm mb-4 block">Archive Officielle</span>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tighter">
            Une <span className="text-nintendo-red">Histoire</span> en 3D
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'épopée de la console qui a marqué une décennie de jeu portable,
            depuis ses débuts ambitieux jusqu'à son héritage éternel.
          </p>
        </motion.div>

        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-2xl mb-12" />}>
          <HistoryScene />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-black text-gray-800 mb-12 flex items-center">
              <span className="w-12 h-1 bg-nintendo-red mr-4"></span>
              Chronologie de l'Innovation
            </h2>
            {loading ? (
              <div className="space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-40 bg-gray-50 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : (
              <Timeline events={history} />
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-nintendo-red p-8 rounded-3xl text-white shadow-xl shadow-red-200 overflow-hidden relative">
                <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                  <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10 30h80v40H10z" />
                    <circle cx="30" cy="80" r="5" />
                    <circle cx="70" cy="80" r="5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-4">Le Saviez-vous ?</h3>
                <p className="text-red-50 leading-relaxed font-medium">
                  La Nintendo 3DS a été la première console portable à offrir de la réalité augmentée (RA) intégrée dès sa sortie avec les cartes AR incluses.
                </p>
              </div>

              <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl shadow-gray-200">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                  StreetPass & SpotPass
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ces fonctionnalités sociales uniques transformaient chaque trajet en une opportunité de rencontre virtuelle et de partage de données de jeu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;