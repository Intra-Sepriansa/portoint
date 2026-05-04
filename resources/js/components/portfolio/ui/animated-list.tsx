import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AnimatedListItem = {
    title: string;
    description: string;
    meta?: string;
};

type AnimatedListProps = {
    items: AnimatedListItem[];
    className?: string;
};

export function AnimatedList({ items, className }: AnimatedListProps) {
    return (
        <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                    },
                },
            }}
            className={cn('space-y-3', className)}
        >
            {items.map((item, index) => (
                <motion.li
                    key={item.title}
                    variants={{
                        hidden: { opacity: 0, x: -18, filter: 'blur(8px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-indigo-400/30"
                >
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-violet-500 opacity-70" />
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>
                                {item.meta && (
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium tracking-wide text-slate-500 uppercase dark:bg-white/10 dark:text-slate-400">
                                        {item.meta}
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </motion.li>
            ))}
        </motion.ul>
    );
}
