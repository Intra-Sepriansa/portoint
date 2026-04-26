import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { timelineItems } from '@/data/timeline';

export function TimelineSection() {
    return (
        <section className="bg-slate-50 py-24 md:py-32 dark:bg-[#080818]">
            <div className="mx-auto max-w-3xl px-6">
                <SectionHeader label="Journey" title="My Path So Far" />

                <div className="relative">
                    <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-indigo-500/50 via-slate-200 to-transparent md:left-1/2 md:-translate-x-px dark:via-white/10" />

                    {timelineItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`relative mb-12 pl-12 md:w-1/2 md:pl-0 ${
                                i % 2 === 0
                                    ? 'md:pr-12 md:text-right'
                                    : 'md:ml-auto md:pl-12'
                            }`}
                        >
                            <div
                                className={`absolute top-1 left-[15px] h-2.5 w-2.5 rounded-full border-2 border-indigo-500 bg-white md:left-auto dark:bg-[#080818] ${
                                    i % 2 === 0
                                        ? 'md:right-[-5px]'
                                        : 'md:left-[-5px]'
                                }`}
                            />

                            <span className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
                                {item.period}
                            </span>
                            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
