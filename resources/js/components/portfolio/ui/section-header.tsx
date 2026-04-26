import { motion } from 'framer-motion';

type SectionHeaderProps = {
    label?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
};

export function SectionHeader({
    label,
    title,
    description,
    align = 'center',
}: SectionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
        >
            {label && (
                <span className="mb-3 inline-block text-xs font-medium tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                    {label}
                </span>
            )}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl dark:text-white">
                {title}
            </h2>
            {description && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 md:text-lg dark:text-slate-400">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
