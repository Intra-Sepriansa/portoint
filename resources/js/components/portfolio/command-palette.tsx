import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Copy, FileText, Hash, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
    PortfolioCommandItem,
    PortfolioLanguage,
} from '@/data/portfolio-language';
import { portfolioCopy } from '@/data/portfolio-language';
import { email } from '@/data/socials';
import { cn } from '@/lib/utils';

type CommandPaletteProps = {
    language: PortfolioLanguage;
    open: boolean;
    onClose: () => void;
};

export function CommandPalette({
    language,
    open,
    onClose,
}: CommandPaletteProps) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const copy = portfolioCopy[language];
    const commandItems = copy.commands;

    const filtered = commandItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
    );

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const id = requestAnimationFrame(() => {
            setQuery('');
            setSelectedIndex(0);
        });

        return () => cancelAnimationFrame(id);
    }, [open]);

    const executeItem = useCallback(
        (item: PortfolioCommandItem) => {
            onClose();

            if (item.type === 'navigation') {
                const id = item.action.replace('#', '');
                const el = document.getElementById(id);

                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (item.type === 'project') {
                router.visit(item.action);
            } else if (item.action === 'copy-email') {
                navigator.clipboard.writeText(email);
            }
        },
        [onClose],
    );

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!open) {
                return;
            }

            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((i) => (i + 1) % filtered.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(
                    (i) => (i - 1 + filtered.length) % filtered.length,
                );
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const item = filtered[selectedIndex];

                if (item) {
                    executeItem(item);
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose, filtered, selectedIndex, executeItem]);

    function getIcon(item: PortfolioCommandItem) {
        if (item.type === 'navigation') {
            return Hash;
        }

        if (item.type === 'project') {
            return FileText;
        }

        if (item.action === 'copy-email') {
            return Copy;
        }

        return ArrowRight;
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm dark:bg-black/60"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-x-4 top-[20%] z-[71] mx-auto max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#12122a]"
                    >
                        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/[0.06]">
                            <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                placeholder={copy.command.placeholder}
                                className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                            />
                            <kbd className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-400 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-500">
                                ESC
                            </kbd>
                        </div>

                        <div className="max-h-[300px] overflow-y-auto p-2">
                            {filtered.length === 0 && (
                                <p className="px-3 py-6 text-center text-sm text-slate-500">
                                    {copy.command.noResults}
                                </p>
                            )}
                            {filtered.map((item, i) => {
                                const Icon = getIcon(item);

                                return (
                                    <button
                                        key={item.label}
                                        onClick={() => executeItem(item)}
                                        className={cn(
                                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                                            i === selectedIndex
                                                ? 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white',
                                        )}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
