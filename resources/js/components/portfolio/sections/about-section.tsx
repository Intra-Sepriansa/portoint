import { motion } from 'framer-motion';
import { Code2, Layers, Workflow } from 'lucide-react';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { SectionHeader } from '@/components/portfolio/ui/section-header';

const highlights = [
    {
        icon: Code2,
        title: 'Clean Interface',
        description:
            'Building intuitive, responsive UIs with modern frameworks and pixel-perfect design.',
        color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
        icon: Layers,
        title: 'Scalable Backend',
        description:
            'Architecting robust APIs and server-side systems that grow with your product.',
        color: 'text-emerald-600 dark:text-emerald-400',
    },
    {
        icon: Workflow,
        title: 'Real Product Workflow',
        description:
            'Delivering end-to-end solutions from concept to deployment with structured processes.',
        color: 'text-violet-600 dark:text-violet-400',
    },
];

export function AboutSection() {
    return (
        <section id="about" className="bg-white py-24 md:py-32 dark:bg-[#060612]">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader label="About Me" title="Who I Am" />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400"
                >
                    I am a full-stack web developer focused on building modern,
                    responsive, and scalable web applications. I work across
                    frontend, backend, dashboard systems, CMS platforms, APIs,
                    and interactive UI experiences. My projects focus on solving
                    real operational problems through clean design, structured
                    workflows, and reliable technology.
                </motion.p>

                <div className="grid gap-6 md:grid-cols-3">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlowCard>
                                <item.icon
                                    className={`mb-4 h-8 w-8 ${item.color}`}
                                />
                                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
