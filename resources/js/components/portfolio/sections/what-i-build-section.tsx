import { motion } from 'framer-motion';
import {
    BookOpen,
    Brain,
    FileText,
    GraduationCap,
    LayoutDashboard,
    Rocket,
    Server,
    Globe,
} from 'lucide-react';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { SectionHeader } from '@/components/portfolio/ui/section-header';

const items = [
    {
        icon: GraduationCap,
        title: 'School & Institution Websites',
        description:
            'Modern, interactive digital presence for educational institutions.',
    },
    {
        icon: LayoutDashboard,
        title: 'Admin Dashboards',
        description:
            'Data-driven dashboards with analytics and role-based access.',
    },
    {
        icon: FileText,
        title: 'CMS Platforms',
        description:
            'Content management systems with intuitive editing interfaces.',
    },
    {
        icon: BookOpen,
        title: 'EdTech Applications',
        description:
            'Structured learning platforms with assessments and analytics.',
    },
    {
        icon: Brain,
        title: 'AI Workflow Systems',
        description:
            'Intelligent automation with AI-assisted decision workflows.',
    },
    {
        icon: Globe,
        title: 'Decision Support Systems',
        description:
            'Algorithmic recommendation platforms with data visualization.',
    },
    {
        icon: Server,
        title: 'REST API Backend',
        description: 'Scalable APIs with authentication, docs, and testing.',
    },
    {
        icon: Rocket,
        title: 'Interactive Landing Pages',
        description:
            'High-converting pages with animations and premium design.',
    },
];

export function WhatIBuildSection() {
    return (
        <section className="bg-[#080818] py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="What I Build"
                    title="Solutions I Create"
                    description="From institutional websites to AI-powered platforms, I build web applications that solve real problems."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <GlowCard className="h-full">
                                <item.icon className="mb-3 h-6 w-6 text-indigo-400" />
                                <h3 className="mb-1 text-sm font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="text-xs leading-relaxed text-slate-500">
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
