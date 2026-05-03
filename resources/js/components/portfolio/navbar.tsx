import { AnimatePresence, motion } from 'framer-motion';
import { Command, Languages, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/portfolio/ui/theme-toggle';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { portfolioCopy } from '@/data/portfolio-language';
import { cn } from '@/lib/utils';

type LanguageToggleProps = {
    isChanging: boolean;
    language: PortfolioLanguage;
    onLanguageChange: (language: PortfolioLanguage) => void;
};

type NavbarProps = {
    languageChanging: boolean;
    language: PortfolioLanguage;
    onCommandPalette: () => void;
    onLanguageChange: (language: PortfolioLanguage) => void;
};

function PortfolioLanguageToggle({
    isChanging,
    language,
    onLanguageChange,
}: LanguageToggleProps) {
    const nextLanguage = language === 'id' ? 'en' : 'id';

    return (
        <button
            type="button"
            data-portfolio-language-toggle
            data-portfolio-language-changing={isChanging ? 'true' : undefined}
            disabled={isChanging}
            aria-busy={isChanging}
            onClick={() => onLanguageChange(nextLanguage)}
            aria-label={
                language === 'id'
                    ? 'Switch to English'
                    : 'Ganti ke Bahasa Indonesia'
            }
            title={
                language === 'id'
                    ? 'Switch to English'
                    : 'Ganti ke Bahasa Indonesia'
            }
            className="relative z-[70] inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-bold text-slate-600 transition-[color,background-color,border-color,transform,opacity] hover:bg-slate-200 hover:text-slate-900 active:scale-95 disabled:cursor-wait disabled:opacity-80 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
            <Languages className="h-4 w-4" />
            <span>{nextLanguage.toUpperCase()}</span>
        </button>
    );
}

export function Navbar({
    languageChanging,
    language,
    onCommandPalette,
    onLanguageChange,
}: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const copy = portfolioCopy[language];

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 50);

            const sections = copy.nav
                .map((item) => item.href.replace('#', ''))
                .map((id) => document.getElementById(id))
                .filter(Boolean);

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];

                if (section && section.getBoundingClientRect().top <= 100) {
                    setActiveSection(section.id);
                    break;
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [copy.nav]);

    const scrollTo = useCallback((href: string) => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }

        setMobileOpen(false);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0a0a1a]/80'
                        : 'bg-transparent',
                )}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo('#home');
                        }}
                        className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        <span>
                            Intra
                            <span className="text-indigo-500 dark:text-indigo-400">
                                .
                            </span>
                        </span>
                    </a>

                    <div className="hidden items-center gap-1 md:flex">
                        {copy.nav.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollTo(item.href)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-base font-semibold transition-colors',
                                    activeSection === item.href.replace('#', '')
                                        ? 'bg-slate-100 text-slate-900 dark:bg-black dark:text-white'
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                )}
                            >
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onCommandPalette}
                            className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 md:flex dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white"
                        >
                            <Command className="h-3 w-3" />
                            <span>⌘K</span>
                        </button>

                        <PortfolioLanguageToggle
                            isChanging={languageChanging}
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />

                        <ThemeToggle />

                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo('#contact');
                            }}
                            className="hidden rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 md:block"
                        >
                            <span>{copy.contactCta}</span>
                        </a>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="rounded-lg p-2 text-slate-500 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:text-white"
                        >
                            {mobileOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[65px] z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/[0.06] dark:bg-[#0a0a1a]/95"
                    >
                        <div className="flex flex-col gap-1 p-4">
                            {copy.nav.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => scrollTo(item.href)}
                                    className={cn(
                                        'rounded-lg px-4 py-3 text-left text-sm transition-colors',
                                        activeSection ===
                                            item.href.replace('#', '')
                                            ? 'bg-slate-100 text-slate-900 dark:bg-black dark:text-white'
                                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                    )}
                                >
                                    <span>{item.label}</span>
                                </button>
                            ))}
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo('#contact');
                                }}
                                className="mt-2 rounded-full bg-indigo-600 px-5 py-3 text-center text-sm font-medium text-white"
                            >
                                {copy.contactCta}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
