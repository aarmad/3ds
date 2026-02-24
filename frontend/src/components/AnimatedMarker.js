import { motion } from 'framer-motion';

const AnimatedMarker = () => {
    return (
        <div className="absolute -left-[14px] top-0 flex items-center justify-center">
            <motion.svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
            >
                <motion.circle
                    cx="14"
                    cy="14"
                    r="10"
                    fill="#e60012"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="14"
                    cy="14"
                    r="12"
                    stroke="#e60012"
                    strokeWidth="2"
                    fill="none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
            </motion.svg>
        </div>
    );
};

export default AnimatedMarker;
