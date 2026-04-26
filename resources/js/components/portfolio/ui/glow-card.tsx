import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type GlowCardProps = {
    children: ReactNode;
    className?: string;
    glowColor?: string;
};

export function GlowCard({
    children,
    className,
    glowColor = 'indigo',
}: GlowCardProps) {
    const glowMap: Record<string, string> = {
        indigo: 'hover:shadow-indigo-500/10 hover:border-indigo-500/30',
        emerald: 'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
        violet: 'hover:shadow-violet-500/10 hover:border-violet-500/30',
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300',
                'hover:shadow-2xl',
                glowMap[glowColor] ?? glowMap.indigo,
                className,
            )}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
