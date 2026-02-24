import { motion } from 'framer-motion';
import AnimatedMarker from './AnimatedMarker';

const Timeline = ({ events }) => {
  return (
    <div className="relative border-l-2 border-dashed border-gray-300 pl-10 ml-4 py-8">
      {events.map((event, idx) => (
        <motion.div
          key={idx}
          className="mb-16 relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <AnimatedMarker />
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="inline-block px-3 py-1 bg-nintendo-red text-white text-sm font-bold rounded-full mb-3">
              {event.year}
            </span>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.event}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{event.details}</p>

            {event.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-xl mt-4">
                <img
                  src={event.image}
                  alt={event.event}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;