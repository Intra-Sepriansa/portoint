import { motion } from 'framer-motion';
import {
    Search,
    PenTool,
    Monitor,
    Server,
    TestTube,
    Rocket,
} from 'lucide-react';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { SectionHeader } from '@/components/portfolio/ui/section-header';

const steps = [
    {
        icon: Search,
        title: 'Discover the Problem',
        description:
            'Understand requirements, user needs, and project scope through research and analysis.',
    },
    {
        icon: PenTool,
        title: 'Design the Workflow',
        description:
            'Map out system architecture, user flows, and data models before writing code.',
    },
    {
        icon: Monitor,
        title: 'Build the Interface',
        description:
            'Create responsive, interactive UIs with modern frameworks and clean design patterns.',
    },
    {
        icon: Server,
        title: 'Develop the Backend',
        description:
            'Build robust APIs, database schemas, and server-side logic with proper architecture.',
    },
    {
        icon: TestTube,
        title: 'Test and Improve',
        description:
            'Run automated tests, optimize performance, and iterate based on feedback.',
    },
    {
        icon: Rocket,
        title: 'Deploy and Maintain',
        description:
            'Launch to production with CI/CD pipelines and provide ongoing support.',
    },
];

export function DevelopmentApproachSection() {
    return (
        <section className="bg-[#060612] py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Process"
                    title="My Development Approach"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <GlowCard glowColor="violet" className="h-full">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-bold text-indigo-400">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <step.icon className="h-5 w-5 text-slate-500" />
                                </div>
                                <h3 className="mb-1 text-sm font-semibold text-white">
                                    {step.title}
                                </h3>
                                <p className="text-xs leading-relaxed text-slate-500">
                                    {step.description}
                                </p>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
