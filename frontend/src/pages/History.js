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
    <div className="relative overflow-hidden bg-dark-bg text-white">
      <FloatingIcons />

      {/* ═══════════════ HEADER SECTION ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent-magenta font-black uppercase tracking-widest text-xs mb-4 block">
            Archives Officielles · Timeline Interactive
          </span>
          <h1 className="title-insider text-5xl md:text-7xl mb-6">
            L'histoire complète<br />
            <span className="title-insider-accent">en 3D</span>
          </h1>
          <p className="text-block-insider max-w-3xl text-lg">
            Découvrez l'épopée de la console qui a marqué une décennie de jeu portable, depuis ses débuts ambitieux jusqu'à son héritage éternel.
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ 3D SCENE ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <Suspense fallback={<div className="h-96 bg-slate-800 animate-pulse rounded-3xl" />}>
          <HistoryScene />
        </Suspense>
      </section>

      {/* Divider */}
      <div className="divider-insider max-w-7xl mx-auto"></div>

      {/* ═══════════════ TIMELINE + SIDEBAR ═══════════════ */}
      <section className="section-insider max-w-7xl mx-auto">
        <div className="grid-insider-2col gap-8">
          {/* Timeline gauche */}
          <div>
            <h2 className="title-insider text-4xl mb-12">
              Chronologie de l'<span className="title-insider-accent">Innovation</span>
            </h2>
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-slate-800 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : (
              <Timeline events={history} />
            )}
          </div>

          {/* Sidebar droit - Éléments informatifs modulables */}
          <div className="space-y-6">
            {/* Saviez-vous */}
            <div className="card-insider card-insider-accent bg-gradient-to-br from-accent-magenta/10 to-accent-blue/10 border-accent-magenta/30">
              <span className="text-xs font-bold text-accent-magenta uppercase tracking-widest block mb-3">
                Le Saviez-vous ?
              </span>
              <h3 className="text-xl font-black mb-4 text-white">
                Première console 3D sans lunettes
              </h3>
              <p className="text-slate-300 leading-relaxed">
                La Nintendo 3DS a été la première console portable à offrir de la réalité augmentée (RA) intégrée dès sa sortie avec les cartes AR incluses.
              </p>
            </div>

            {/* StreetPass */}
            <div className="card-insider card-insider-dark border-accent-cyan/30">
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-widest block mb-3">
                Fonctionnalités Sociales
              </span>
              <h3 className="text-xl font-black mb-4 text-white">
                StreetPass & SpotPass
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Ces fonctionnalités uniques transformaient chaque déplacement en une opportunité de rencontre virtuelle et de partage de données.
              </p>
            </div>

            {/* Games */}
            <div className="card-insider card-insider-dark border-accent-orange/30">
              <span className="text-xs font-bold text-accent-orange uppercase tracking-widest block mb-3">
                Bibliothèque Massive
              </span>
              <h3 className="text-xl font-black mb-4 text-white">
                3 500+ jeux
              </h3>
              <p className="text-slate-300 leading-relaxed">
                De The Legend of Zelda: A Link Between Worlds à Animal Crossing: New Leaf, une bibliothèque incomparable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;