import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

export function ThemeToggle() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const nextAppearance = resolvedAppearance === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={() => updateAppearance(nextAppearance)}
            className="relative z-[70] cursor-pointer rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-600 transition-[color,background-color,border-color,transform] hover:bg-slate-200 hover:text-slate-900 active:scale-90 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={
                resolvedAppearance === 'dark'
                    ? 'Ganti ke mode terang'
                    : 'Ganti ke mode gelap'
            }
        >
            {resolvedAppearance === 'dark' ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    );
}
