import { motion } from 'framer-motion';

const FloatingIcons = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
                <motion.svg
                    key={i}
                    className="absolute"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        rotate: 0,
                        opacity: 0
                    }}
                    animate={{
                        y: "-10%",
                        rotate: 360,
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                >
                    {i % 2 === 0 ? (
                        <path d="M10 10 L30 10 L30 30 L10 30 Z" fill="#e60012" />
                    ) : (
                        <circle cx="20" cy="20" r="10" fill="#1b7bb8" />
                    )}
                </motion.svg>
            ))}
        </div>
    );
};

export default FloatingIcons;
