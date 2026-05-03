import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const lines = [
    { left: 12, height: 180, delay: 0.1, duration: 8.5 },
    { left: 24, height: 240, delay: 1.4, duration: 9.2 },
    { left: 37, height: 160, delay: 0.8, duration: 7.8 },
    { left: 52, height: 280, delay: 2.1, duration: 10 },
    { left: 66, height: 210, delay: 1.1, duration: 8.8 },
    { left: 79, height: 260, delay: 2.6, duration: 9.6 },
    { left: 90, height: 170, delay: 0.5, duration: 8.2 },
];

const particles = [
    { left: 18, bottom: 18, delay: 0.4, duration: 7.5 },
    { left: 31, bottom: 8, delay: 1.8, duration: 8.4 },
    { left: 45, bottom: 22, delay: 1.1, duration: 7.9 },
    { left: 58, bottom: 14, delay: 2.2, duration: 8.7 },
    { left: 74, bottom: 26, delay: 0.9, duration: 8.1 },
    { left: 86, bottom: 10, delay: 1.5, duration: 7.6 },
];

type RisingLinesProps = {
    className?: string;
};

export function RisingLines({ className }: RisingLinesProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-x-0 bottom-0 h-2/3 overflow-hidden',
                className,
            )}
        >
            <div className="absolute inset-x-[26%] bottom-0 h-28 bg-gradient-to-t from-indigo-500/10 via-violet-500/5 to-transparent blur-2xl dark:from-indigo-400/15 dark:via-violet-400/10" />

            {lines.map((line) => (
                <motion.span
                    key={line.left}
                    className="absolute bottom-0 w-px bg-gradient-to-t from-transparent via-indigo-400/25 to-transparent dark:via-indigo-300/25"
                    style={{
                        left: `${line.left}%`,
                        height: line.height,
                    }}
                    animate={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  y: ['28%', '-120%'],
                                  opacity: [0, 0.65, 0],
                              }
                    }
                    transition={{
                        duration: line.duration,
                        delay: line.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            {particles.map((particle) => (
                <motion.span
                    key={`${particle.left}-${particle.bottom}`}
                    className="absolute h-1 w-1 rounded-full bg-indigo-400/35 shadow-[0_0_18px_rgba(99,102,241,0.45)] dark:bg-white/35"
                    style={{
                        left: `${particle.left}%`,
                        bottom: `${particle.bottom}%`,
                    }}
                    animate={
                        shouldReduceMotion
                            ? undefined
                            : {
                                  y: [0, -130, -260],
                                  opacity: [0, 0.75, 0],
                                  scale: [0.8, 1.1, 0.7],
                              }
                    }
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}
