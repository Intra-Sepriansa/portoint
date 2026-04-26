import { motion } from 'framer-motion';
import {
    BookOpen,
    Brain,
    FileText,
    Globe,
    LayoutDashboard,
    Palette,
    Rocket,
    Server,
    GraduationCap,
} from 'lucide-react';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { services } from '@/data/services';

const iconMap: Record<string, typeof Globe> = {
    school: GraduationCap,
    building: Globe,
    'layout-dashboard': LayoutDashboard,
    'file-text': FileText,
    rocket: Rocket,
    server: Server,
    'book-open': BookOpen,
    brain: Brain,
    palette: Palette,
};

export function ServicesSection() {
    return (
        <section id="services" className="bg-white py-24 md:py-32 dark:bg-[#060612]">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Services"
                    title="What I Can Do for You"
                    description="I offer end-to-end web development services for institutions, businesses, and startups."
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, i) => {
                        const Icon = iconMap[service.icon] ?? Globe;

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <GlowCard
                                    glowColor="emerald"
                                    className="h-full"
                                >
                                    <Icon className="mb-3 h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                    <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-slate-500">
                                        {service.description}
                                    </p>
                                </GlowCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
