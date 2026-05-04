import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { ContactSection } from '@/components/portfolio/sections/contact-section';
import { PortfolioLetterSwapOverlay } from '@/components/portfolio/ui/portfolio-letter-swap-overlay';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';

const contactPageCopy = {
    en: {
        description:
            'Contact Intra Sepriansa for web development projects, dashboards, CMS platforms, and related needs.',
        title: 'Contact - Intra Sepriansa',
    },
    id: {
        description:
            'Hubungi Intra Sepriansa untuk proyek pengembangan web, dasbor, platform CMS, dan kebutuhan lainnya.',
        title: 'Kontak - Intra Sepriansa',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        title: string;
    }
>;

export default function Contact() {
    const [commandOpen, setCommandOpen] = useState(false);
    const [language, setLanguage, isLanguageChanging] = usePortfolioLanguage();
    const copy = contactPageCopy[language];

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

                <main className="pt-20">
                    <ContactSection language={language} />
                </main>

                <Footer language={language} />
            </div>
        </>
    );
}
