import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { TechBadge } from '@/components/portfolio/ui/tech-badge';
import { skillCategories } from '@/data/skills';
import { cn } from '@/lib/utils';

export function TechStackSection() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filtered = activeCategory
        ? skillCategories.filter((c) => c.name === activeCategory)
        : skillCategories;

    return (
        <section id="skills" className="bg-[#060612] py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Tech Stack"
                    title="Technologies I Work With"
                />

                <div className="mb-10 flex flex-wrap justify-center gap-2">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={cn(
                            'rounded-full px-4 py-2 text-xs font-medium transition-colors',
                            !activeCategory
                                ? 'bg-indigo-600 text-white'
                                : 'border border-white/10 text-slate-400 hover:text-white',
                        )}
                    >
                        All
                    </button>
                    {skillCategories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() =>
                                setActiveCategory(
                                    activeCategory === cat.name
                                        ? null
                                        : cat.name,
                                )
                            }
                            className={cn(
                                'rounded-full px-4 py-2 text-xs font-medium transition-colors',
                                activeCategory === cat.name
                                    ? 'bg-indigo-600 text-white'
                                    : 'border border-white/10 text-slate-400 hover:text-white',
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((category, i) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            layout
                            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                        >
                            <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-300 uppercase">
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                    <TechBadge key={item} name={item} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
