import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Grainient } from '@/components/portfolio/ui/grainient';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { portfolioCopy } from '@/data/portfolio-language';
import { socials } from '@/data/socials';

const iconMap: Record<string, typeof Mail> = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

type FooterProps = {
    language: PortfolioLanguage;
};

export function Footer({ language }: FooterProps) {
    const copy = portfolioCopy[language];

    function scrollTo(href: string) {
        const id = href.replace('#', '');
        const el = document.getElementById(id);

        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });

            return;
        }

        window.location.href = `/${href}`;
    }

    return (
        <footer className="relative flex min-h-svh flex-col overflow-hidden bg-[#050508] text-white lg:h-svh dark:bg-[#f8f8ff] dark:text-[#070712]">
            <svg
                aria-hidden="true"
                focusable="false"
                className="absolute h-0 w-0"
            >
                <defs>
                    <clipPath
                        id="footer-gradient-clip"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="M0 0 H1 V0.58 H0.91 C0.86 0.58 0.835 0.63 0.807 0.75 C0.785 0.84 0.755 0.89 0.705 0.92 C0.64 0.955 0.56 0.965 0.5 0.965 C0.44 0.965 0.36 0.955 0.295 0.92 C0.245 0.89 0.215 0.84 0.193 0.75 C0.165 0.63 0.14 0.58 0.09 0.58 H0 V0 Z" />
                    </clipPath>
                </defs>
            </svg>
            <div
                className="relative h-[27svh] min-h-40 shrink-0 overflow-hidden sm:h-[28svh] lg:h-[30svh]"
                style={{ clipPath: 'url(#footer-gradient-clip)' }}
            >
                <div className="absolute inset-0">
                    <Grainient
                        color1="#FF9FFC"
                        color2="#5227FF"
                        color3="#B497CF"
                        timeSpeed={0.25}
                        colorBalance={0}
                        warpStrength={1}
                        warpFrequency={5}
                        warpSpeed={2}
                        warpAmplitude={50}
                        blendAngle={0}
                        blendSoftness={0.05}
                        rotationAmount={500}
                        noiseScale={2}
                        grainAmount={0}
                        grainScale={2}
                        grainAnimated={false}
                        contrast={1.5}
                        gamma={1}
                        saturation={1}
                        centerX={0}
                        centerY={0}
                        zoom={0.9}
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.2),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(5,5,8,0.22))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col px-6 py-5 text-center md:px-12 lg:px-20 xl:px-28">
                <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-6">
                    <p className="text-xs font-medium tracking-[0.28em] text-cyan-100 uppercase dark:text-indigo-600">
                        {copy.footer.eyebrow}
                    </p>
                    <h2 className="mt-4 text-5xl leading-none font-black tracking-normal text-white sm:text-6xl lg:text-8xl dark:text-[#070712]">
                        Intra Sepriansa
                    </h2>
                    <p className="mt-3 text-lg font-semibold text-white/90 sm:text-2xl dark:text-slate-800">
                        {copy.footer.title}
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base dark:text-slate-600">
                        {copy.footer.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold tracking-[0.08em] text-white uppercase sm:gap-6 dark:text-slate-950">
                        <button
                            type="button"
                            onClick={() => scrollTo('#contact')}
                            className="transition-colors hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 dark:hover:text-indigo-600 dark:focus-visible:outline-indigo-500"
                        >
                            {copy.footer.primaryAction}
                        </button>
                        <span className="text-white/35 dark:text-slate-950/30">
                            -
                        </span>
                        <button
                            type="button"
                            onClick={() => scrollTo('#projects')}
                            className="transition-colors hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 dark:hover:text-indigo-600 dark:focus-visible:outline-indigo-500"
                        >
                            {copy.footer.secondaryAction}
                        </button>
                    </div>

                    <div className="mt-8 flex justify-center gap-5">
                        {socials.map((social) => {
                            const Icon = iconMap[social.icon] ?? Mail;
                            const isExternalLink =
                                social.href.startsWith('http');

                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target={
                                        isExternalLink ? '_blank' : undefined
                                    }
                                    rel={
                                        isExternalLink
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    aria-label={social.name}
                                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/16 hover:text-cyan-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 sm:h-12 sm:w-12 dark:bg-slate-950/7 dark:text-slate-800 dark:hover:bg-slate-950/12 dark:hover:text-indigo-600 dark:focus-visible:outline-indigo-500"
                                >
                                    <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-white/15 pt-5 pb-2 dark:border-slate-950/10">
                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-200/70 md:flex-row dark:text-slate-600">
                        <p>
                            &copy; {new Date().getFullYear()} Intra Sepriansa.{' '}
                            {copy.footer.copyright}
                        </p>
                        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3">
                            {copy.nav.map((item) => (
                                <button
                                    key={item.href}
                                    type="button"
                                    onClick={() => scrollTo(item.href)}
                                    className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-100 dark:hover:text-slate-950 dark:focus-visible:outline-indigo-500"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
