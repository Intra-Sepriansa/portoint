import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TechBadgeProps = {
    name: string;
    className?: string;
    size?: 'sm' | 'md';
};

export function TechBadge({ name, className, size = 'sm' }: TechBadgeProps) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={cn(
                'inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-indigo-500/30 hover:text-indigo-300',
                size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
                className,
            )}
        >
            {name}
        </motion.span>
    );
}
