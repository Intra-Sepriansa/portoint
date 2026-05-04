import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProjectMonitorCard } from '@/components/portfolio/project-monitor-card';
import { MagneticButton } from '@/components/portfolio/ui/magnetic-button';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { featuredProjects, localizeProjects } from '@/data/projects';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { index as projectsIndex } from '@/routes/projects';

const featuredProjectsCopy = {
    en: {
        description:
            'Selected projects that show how I build modern web applications that are ready to use.',
        label: 'Featured Projects',
        title: 'What I Have Built',
        viewAll: 'View All Projects',
    },
    id: {
        description:
            'Pilihan proyek yang menunjukkan kemampuan saya membangun aplikasi web modern yang siap dipakai.',
        label: 'Proyek Pilihan',
        title: 'Yang Sudah Saya Bangun',
        viewAll: 'Lihat Semua Proyek',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        label: string;
        title: string;
        viewAll: string;
    }
>;

type FeaturedProjectsSectionProps = {
    language: PortfolioLanguage;
};

export function FeaturedProjectsSection({
    language,
}: FeaturedProjectsSectionProps) {
    const copy = featuredProjectsCopy[language];
    const localizedProjects = localizeProjects(featuredProjects, language);

    return (
        <section
            id="projects"
            className="bg-white py-24 md:py-32 dark:bg-[#060612]"
        >
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label={copy.label}
                    title={copy.title}
                    description={copy.description}
                />

                <div className="grid gap-8 lg:grid-cols-2">
                    {localizedProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full"
                        >
                            <ProjectMonitorCard
                                language={language}
                                project={project}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <MagneticButton
                        variant="outline"
                        href={projectsIndex.url()}
                    >
                        {copy.viewAll}
                        <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
