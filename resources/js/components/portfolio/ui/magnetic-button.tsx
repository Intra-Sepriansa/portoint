import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
    onClick?: () => void;
};

export function MagneticButton({
    children,
    className,
    variant = 'primary',
    href,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    function handleMouseMove(e: React.MouseEvent) {
        if (!ref.current) {
            return;
        }

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const variants: Record<string, string> = {
        primary:
            'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20',
        secondary:
            'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:backdrop-blur-sm',
        outline:
            'border border-slate-300 text-slate-700 hover:border-indigo-500/50 hover:bg-slate-50 dark:border-white/20 dark:text-white dark:hover:bg-white/[0.03]',
    };

    const Component = href ? 'a' : 'button';

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-block"
        >
            <Component
                href={href}
                onClick={onClick}
                className={cn(
                    'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors',
                    variants[variant],
                    className,
                )}
            >
                {children}
            </Component>
        </motion.div>
    );
}
