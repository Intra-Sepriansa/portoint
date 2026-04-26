import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
    text: string;
    label?: string;
    className?: string;
};

export function CopyButton({ text, label, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                'inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 transition-all hover:border-indigo-500/30 hover:text-white',
                className,
            )}
        >
            {copied ? (
                <Check className="h-4 w-4 text-emerald-400" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
            {label ?? text}
        </button>
    );
}
