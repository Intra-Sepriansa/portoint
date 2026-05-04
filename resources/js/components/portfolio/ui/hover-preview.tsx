import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from 'framer-motion';
import { useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HoverPreviewProps = {
    children: ReactNode;
    preview: ReactNode;
    className?: string;
    previewClassName?: string;
};

export function HoverPreview({
    children,
    preview,
    className,
    previewClassName,
}: HoverPreviewProps) {
    const [active, setActive] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const smoothX = useSpring(x, { stiffness: 450, damping: 34 });
    const smoothY = useSpring(y, { stiffness: 450, damping: 34 });

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(event.clientX - rect.left + 18);
        y.set(event.clientY - rect.top - 24);
    }

    return (
        <div
            className={cn('relative h-full', className)}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onMouseMove={handleMouseMove}
        >
            {children}

            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 6 }}
                        transition={{ duration: 0.18 }}
                        style={{ x: smoothX, y: smoothY }}
                        className={cn(
                            'pointer-events-none absolute top-0 left-0 z-30 hidden w-72 overflow-hidden rounded-lg border border-slate-200 bg-white/95 shadow-2xl shadow-slate-900/15 backdrop-blur-xl md:block dark:border-white/10 dark:bg-[#090918]/95 dark:shadow-black/40',
                            previewClassName,
                        )}
                    >
                        {preview}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
