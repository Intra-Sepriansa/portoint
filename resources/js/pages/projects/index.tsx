import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { ProjectMonitorCard } from '@/components/portfolio/project-monitor-card';
import { PortfolioLetterSwapOverlay } from '@/components/portfolio/ui/portfolio-letter-swap-overlay';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import { localizeProjects, projects } from '@/data/projects';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';

const pageCopy = {
    en: {
        description:
            'Explore Intra Sepriansa projects: modern web applications, dashboards, EdTech platforms, and AI-powered systems.',
        eyebrow: 'Portfolio',
        intro: 'A collection of web applications, platforms, and systems I designed and built.',
        title: 'Projects - Intra Sepriansa',
        heading: 'All Projects',
    },
    id: {
        description:
            'Jelajahi proyek Intra Sepriansa: aplikasi web modern, dasbor, platform EdTech, dan sistem berbasis AI.',
        eyebrow: 'Portofolio',
        intro: 'Kumpulan aplikasi web, platform, dan sistem yang saya rancang serta bangun.',
        title: 'Proyek - Intra Sepriansa',
        heading: 'Semua Proyek',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        eyebrow: string;
        heading: string;
        intro: string;
        title: string;
    }
>;

export default function ProjectsIndex() {
    const [commandOpen, setCommandOpen] = useState(false);
    const [language, setLanguage, isLanguageChanging] = usePortfolioLanguage();
    const copy = pageCopy[language];
    const localizedProjects = localizeProjects(projects, language);

    const openCommand = useCallback(() => setCommandOpen(true), []);
    const closeCommand = useCallback(() => setCommandOpen(false), []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandOpen((prev) => !prev);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Head title={copy.title}>
                <meta name="description" content={copy.description} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div
                data-portfolio-language-shell
                className="min-h-screen bg-white dark:bg-[#060612]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ScrollProgress />
                <PortfolioLetterSwapOverlay
                    isChanging={isLanguageChanging}
                    language={language}
                />
                <Navbar
                    language={language}
                    languageChanging={isLanguageChanging}
                    onCommandPalette={openCommand}
                    onLanguageChange={setLanguage}
                />
                <CommandPalette
                    language={language}
                    open={commandOpen}
                    onClose={closeCommand}
                />

                <main className="pt-32 pb-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16 text-center"
                        >
                            <span className="mb-3 inline-block text-xs font-medium tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                                {copy.eyebrow}
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-white">
                                {copy.heading}
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500 dark:text-slate-400">
                                {copy.intro}
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {localizedProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                    </div>
                </main>

                <Footer language={language} />
            </div>
        </>
    );
}
