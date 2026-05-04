import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { AboutSection } from '@/components/portfolio/sections/about-section';
import { ContactSection } from '@/components/portfolio/sections/contact-section';
import { DevelopmentApproachSection } from '@/components/portfolio/sections/development-approach-section';
import { FeaturedProjectsSection } from '@/components/portfolio/sections/featured-projects-section';
import { HeroSection } from '@/components/portfolio/sections/hero-section';
import { TechStackSection } from '@/components/portfolio/sections/tech-stack-section';
import { TimelineSection } from '@/components/portfolio/sections/timeline-section';
import { WhatIBuildSection } from '@/components/portfolio/sections/what-i-build-section';
import { PortfolioLetterSwapOverlay } from '@/components/portfolio/ui/portfolio-letter-swap-overlay';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';

const homePageCopy = {
    en: {
        description:
            'Portfolio of Intra Sepriansa, a full-stack web developer building modern web applications, dashboards, CMS platforms, EdTech systems, AI workflows, and institutional websites.',
        ogDescription:
            'Building modern web applications with clean UI, scalable systems, and interactive digital experiences.',
        title: 'Intra Sepriansa - Full-Stack Web Developer',
    },
    id: {
        description:
            'Portofolio Intra Sepriansa, pengembang web full-stack yang membangun aplikasi web modern, dasbor, platform CMS, sistem EdTech, alur kerja AI, dan situs web institusi digital.',
        ogDescription:
            'Membangun aplikasi web modern dengan UI bersih, sistem yang dapat diskalakan, dan pengalaman digital interaktif.',
        title: 'Intra Sepriansa - Pengembang Web Full-Stack',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        ogDescription: string;
        title: string;
    }
>;

export default function Home() {
    const [commandOpen, setCommandOpen] = useState(false);
    const [language, setLanguage, isLanguageChanging] = usePortfolioLanguage();
    const copy = homePageCopy[language];

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
                <meta property="og:title" content={copy.title} />
                <meta property="og:description" content={copy.ogDescription} />
                <meta property="og:type" content="website" />
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

                <main>
                    <HeroSection language={language} />
                    <AboutSection language={language} />
                    <WhatIBuildSection language={language} />
                    <TechStackSection language={language} />
                    <FeaturedProjectsSection language={language} />
                    <DevelopmentApproachSection language={language} />
                    <TimelineSection language={language} />
                    <ContactSection language={language} />
                </main>

                <Footer language={language} />
            </div>
        </>
    );
}
