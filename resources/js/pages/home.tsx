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
import { ServicesSection } from '@/components/portfolio/sections/services-section';
import { TechStackSection } from '@/components/portfolio/sections/tech-stack-section';
import { TimelineSection } from '@/components/portfolio/sections/timeline-section';
import { WhatIBuildSection } from '@/components/portfolio/sections/what-i-build-section';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';

export default function Home() {
    const [commandOpen, setCommandOpen] = useState(false);

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
            <Head title="Intra Sepriansa — Full-Stack Web Developer">
                <meta
                    name="description"
                    content="Portfolio of Intra Sepriansa, a full-stack web developer building modern web applications, dashboards, CMS platforms, EdTech systems, AI workflows, and digital institution websites."
                />
                <meta
                    property="og:title"
                    content="Intra Sepriansa — Full-Stack Web Developer"
                />
                <meta
                    property="og:description"
                    content="Building modern web applications with clean UI, scalable systems, and interactive digital experiences."
                />
                <meta property="og:type" content="website" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-white dark:bg-[#060612]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ScrollProgress />
                <Navbar onCommandPalette={openCommand} />
                <CommandPalette open={commandOpen} onClose={closeCommand} />

                <main>
                    <HeroSection />
                    <AboutSection />
                    <WhatIBuildSection />
                    <TechStackSection />
                    <FeaturedProjectsSection />
                    <DevelopmentApproachSection />
                    <TimelineSection />
                    <ServicesSection />
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
}
