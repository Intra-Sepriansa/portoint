import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { socials } from '@/data/socials';

const iconMap: Record<string, typeof Mail> = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

export function Footer() {
    function scrollTo(href: string) {
        const id = href.replace('#', '');
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <footer className="border-t border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#060612]">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Intra<span className="text-indigo-500 dark:text-indigo-400">.</span>
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Full-Stack Web Developer
                        </p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollTo(item.href)}
                                className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        {socials.map((social) => {
                            const Icon = iconMap[social.icon] ?? Mail;

                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/[0.06] dark:hover:border-white/20 dark:hover:text-white"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-8 text-center dark:border-white/[0.06]">
                    <p className="text-xs text-slate-400 dark:text-slate-600">
                        &copy; {new Date().getFullYear()} Intra Sepriansa. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
