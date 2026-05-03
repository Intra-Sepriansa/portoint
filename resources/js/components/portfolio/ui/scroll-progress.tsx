import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500"
            style={{ scaleX }}
        />
    );
}
