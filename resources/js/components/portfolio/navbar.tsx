import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/portfolio/ui/theme-toggle';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

type NavbarProps = {
    onCommandPalette: () => void;
};

export function Navbar({ onCommandPalette }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 50);

            const sections = navItems
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
    }, []);

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
                        Intra<span className="text-indigo-500 dark:text-indigo-400">.</span>
                    </a>

                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollTo(item.href)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm transition-colors',
                                    activeSection === item.href.replace('#', '')
                                        ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white'
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                )}
                            >
                                {item.label}
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

                        <ThemeToggle />

                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo('#contact');
                            }}
                            className="hidden rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 md:block"
                        >
                            Let&apos;s Talk
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
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => scrollTo(item.href)}
                                    className={cn(
                                        'rounded-lg px-4 py-3 text-left text-sm transition-colors',
                                        activeSection ===
                                            item.href.replace('#', '')
                                            ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white'
                                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                    )}
                                >
                                    {item.label}
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
                                Let&apos;s Talk
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
