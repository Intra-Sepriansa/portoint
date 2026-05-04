import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Languages, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/portfolio/ui/theme-toggle';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { portfolioCopy } from '@/data/portfolio-language';
import { cn } from '@/lib/utils';
import { home } from '@/routes';

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

const navbarUtilityButtonClassName =
    'h-10 w-14 shrink-0 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2 text-sm font-bold text-slate-600 transition-[color,background-color,border-color,transform,opacity] hover:bg-slate-200 hover:text-slate-900 active:scale-95 disabled:cursor-wait disabled:opacity-80 sm:w-16 sm:gap-2 sm:px-3 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white';

function getInitialActiveSection() {
    if (typeof window === 'undefined') {
        return 'home';
    }

    const currentPath = window.location.pathname.replace(/^\/+/, '');

    if (currentPath.startsWith('projects')) {
        return 'projects';
    }

    return currentPath === '' ? 'home' : currentPath;
}

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
            className={cn(
                'relative z-[70] inline-flex',
                navbarUtilityButtonClassName,
            )}
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
    const [activeSection, setActiveSection] = useState(getInitialActiveSection);
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

    const navigateTo = useCallback((href: string) => {
        if (!href.startsWith('#')) {
            router.visit(href);
            setMobileOpen(false);

            return;
        }

        const id = href.replace('#', '');
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setMobileOpen(false);

            return;
        }

        router.visit(`${home.url()}${href}`);
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
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6">
                    <a
                        href={`${home.url()}#home`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigateTo('#home');
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
                                onClick={() => navigateTo(item.href)}
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

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            type="button"
                            onClick={onCommandPalette}
                            className={cn(
                                'hidden text-xs md:inline-flex',
                                navbarUtilityButtonClassName,
                            )}
                        >
                            <Command className="h-4 w-4" />
                            <span>⌘K</span>
                        </button>

                        <PortfolioLanguageToggle
                            isChanging={languageChanging}
                            language={language}
                            onLanguageChange={onLanguageChange}
                        />

                        <ThemeToggle />

                        <a
                            href={`${home.url()}#contact`}
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo('#contact');
                            }}
                            className="hidden h-10 items-center rounded-full bg-indigo-600 px-5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 md:inline-flex"
                        >
                            <span>{copy.contactCta}</span>
                        </a>

                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 md:hidden dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                            aria-label={
                                mobileOpen
                                    ? 'Close navigation menu'
                                    : 'Open navigation menu'
                            }
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
                                    onClick={() => navigateTo(item.href)}
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
                                href={`${home.url()}#contact`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigateTo('#contact');
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
