import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { ContactSection } from '@/components/portfolio/sections/contact-section';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';

export default function Contact() {
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
            <Head title="Contact — Intra Sepriansa">
                <meta
                    name="description"
                    content="Get in touch with Intra Sepriansa for web development projects, dashboards, CMS platforms, and more."
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-[#060612]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ScrollProgress />
                <Navbar onCommandPalette={openCommand} />
                <CommandPalette open={commandOpen} onClose={closeCommand} />

                <main className="pt-20">
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </>
    );
}
