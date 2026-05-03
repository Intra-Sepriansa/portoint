import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Instagram, Linkedin } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { RisingLines } from '@/components/portfolio/ui/rising-lines';
import { ShaderReveal } from '@/components/portfolio/ui/shader-reveal';
import { StaggeredText } from '@/components/portfolio/ui/staggered-text';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { useAppearance } from '@/hooks/use-appearance';

function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedAppearance } = useAppearance();

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        let animationId: number;
        let particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
        }[] = [];

        const isDark = resolvedAppearance === 'dark';

        function resize() {
            if (!canvas) {
                return;
            }

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initParticles() {
            particles = Array.from({ length: 30 }, () => ({
                x: Math.random() * (canvas?.width ?? 1920),
                y: Math.random() * (canvas?.height ?? 1080),
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.2 + 0.05,
            }));
        }

        function animate() {
            if (!ctx || !canvas) {
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) {
                    p.vx *= -1;
                }

                if (p.y < 0 || p.y > canvas.height) {
                    p.vy *= -1;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(99, 102, 241, ${p.opacity})`
                    : `rgba(79, 70, 229, ${p.opacity * 0.5})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        resize();
        initParticles();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [resolvedAppearance]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0"
        />
    );
}

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: 'easeOut' as const,
        },
    }),
};

const socialLinks = [
    {
        icon: Linkedin,
        href: 'https://linkedin.com/in/intra-sepriansa',
        label: 'LinkedIn',
    },
    {
        icon: Github,
        href: 'https://github.com/Intra-Sepriansa',
        label: 'GitHub',
    },
    {
        icon: Instagram,
        href: 'https://instagram.com/intrasepriansa',
        label: 'Instagram',
    },
];

type PortraitVisualProps = {
    alt: string;
    compact?: boolean;
};

function PortraitVisual({ alt, compact = false }: PortraitVisualProps) {
    const { resolvedAppearance } = useAppearance();
    const imageClassName = compact
        ? 'h-[340px] max-h-[52vh] sm:h-[410px]'
        : 'h-[86vh] max-h-[760px] min-h-[560px] xl:h-[88vh] xl:max-h-[840px]';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
            className={`${imageClassName} aspect-[2/3] w-auto max-w-none select-none`}
        >
            <ShaderReveal
                frontImage={
                    resolvedAppearance === 'dark'
                        ? '/person-light.png'
                        : '/person.png'
                }
                backImage={
                    resolvedAppearance === 'dark'
                        ? '/reveal.png'
                        : '/reveal-dark.png'
                }
                alt={alt}
                className="h-full w-full"
                mouseForce={50}
                cursorSize={140}
                resolution={0.5}
                revealStrength={0.75}
                revealSoftness={1}
                backImageTranslateY={-0.018}
                autoDemo={false}
            />
        </motion.div>
    );
}

const heroCopy = {
    en: {
        ariaScroll: 'Scroll to About section',
        builder: '& Builder',
        developer: 'Developer',
        greeting: 'Hi, I am',
        mobileDescription:
            'Building modern web applications with clean UI, scalable systems, and interactive digital experiences.',
        portraitAlt:
            'Portrait of Intra Sepriansa with a shader reveal armor transformation effect',
        resume: 'Resume',
    },
    id: {
        ariaScroll: 'Scroll ke bagian Tentang',
        builder: '& Pembuat',
        developer: 'Pengembang',
        greeting: 'Halo, saya',
        mobileDescription:
            'Membangun aplikasi web modern dengan UI bersih, sistem dapat diskalakan, dan pengalaman digital interaktif.',
        portraitAlt:
            'Potret Intra Sepriansa dengan efek shader reveal transformasi armor',
        resume: 'CV',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        ariaScroll: string;
        builder: string;
        developer: string;
        greeting: string;
        mobileDescription: string;
        portraitAlt: string;
        resume: string;
    }
>;

type HeroSectionProps = {
    language: PortfolioLanguage;
};

export function HeroSection({ language }: HeroSectionProps) {
    const copy = heroCopy[language];

    const scrollToAbout = useCallback(() => {
        document.getElementById('about')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-screen overflow-hidden bg-white dark:bg-[#060612]"
        >
            <AnimatedBackground />
            <RisingLines className="z-0 opacity-45 dark:opacity-55" />

            {/* Social icons - left side */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute top-1/2 left-6 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:flex xl:left-10"
            >
                {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-slate-400 transition-colors duration-300 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400"
                    >
                        <social.icon className="h-5 w-5" />
                    </a>
                ))}
            </motion.div>

            {/* Main content */}
            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 lg:px-20">
                {/* Desktop: split layout */}
                <div className="hidden w-full items-center justify-between lg:flex">
                    <div className="absolute bottom-0 left-1/2 z-0 -translate-x-1/2">
                        <PortraitVisual alt={copy.portraitAlt} />
                    </div>

                    {/* Left text */}
                    <div className="relative z-10 max-w-xs">
                        <motion.p
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mb-2 text-sm font-medium tracking-wider text-indigo-500 italic dark:text-indigo-400"
                        >
                            {copy.greeting}
                        </motion.p>
                        <motion.h1
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="text-5xl leading-[1.05] font-bold tracking-normal text-slate-900 xl:text-6xl dark:text-white"
                        >
                            <StaggeredText
                                text="Intra"
                                className="block"
                                initialDelay={0.15}
                            />
                            <StaggeredText
                                text="Sepriansa"
                                className="block"
                                initialDelay={0.28}
                            />
                        </motion.h1>
                    </div>

                    {/* Right text */}
                    <div className="relative z-10 w-full max-w-[30rem] text-right xl:max-w-[34rem]">
                        <motion.p
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mb-2 text-sm font-medium tracking-wider text-slate-500 dark:text-slate-400"
                        >
                            Full-Stack
                        </motion.p>
                        <motion.h2
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="text-5xl leading-[1.02] font-bold tracking-normal xl:text-6xl"
                        >
                            <StaggeredText
                                text={copy.developer}
                                className="whitespace-nowrap text-slate-900 dark:text-white"
                                initialDelay={0.2}
                                delayStep={0.025}
                            />
                            <br />
                            <span className="block whitespace-nowrap text-slate-900 dark:text-white">
                                {copy.builder}
                            </span>
                        </motion.h2>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="flex w-full flex-col items-center text-center lg:hidden">
                    <motion.p
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mb-2 text-sm font-medium tracking-wider text-indigo-500 italic dark:text-indigo-400"
                    >
                        {copy.greeting}
                    </motion.p>
                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-4xl leading-[1.1] font-bold tracking-normal text-slate-900 sm:text-5xl dark:text-white"
                    >
                        <StaggeredText
                            text="Intra Sepriansa"
                            initialDelay={0.12}
                        />
                    </motion.h1>

                    <div className="my-8 sm:my-10">
                        <PortraitVisual alt={copy.portraitAlt} compact />
                    </div>

                    <motion.h2
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mx-auto max-w-[22rem] text-3xl leading-[1.1] font-bold tracking-normal sm:text-4xl"
                    >
                        <span>
                            <StaggeredText
                                text={copy.developer}
                                className="whitespace-nowrap text-slate-900 dark:text-white"
                                initialDelay={0.2}
                                delayStep={0.025}
                            />
                        </span>{' '}
                        <span className="whitespace-nowrap text-slate-900 dark:text-white">
                            {copy.builder}
                        </span>
                    </motion.h2>

                    <motion.p
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400"
                    >
                        {copy.mobileDescription}
                    </motion.p>

                    {/* Mobile social icons */}
                    <motion.div
                        custom={4}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mt-6 flex gap-5"
                    >
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="text-slate-400 transition-colors hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400"
                            >
                                <social.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Resume button - bottom right */}
            <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                href="#"
                className="absolute right-8 bottom-8 z-20 hidden items-center gap-2 text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase transition-colors hover:text-indigo-500 lg:flex dark:text-slate-500 dark:hover:text-indigo-400"
            >
                {copy.resume}
                <Download className="h-3.5 w-3.5" />
            </motion.a>

            {/* Scroll indicator */}
            <motion.button
                type="button"
                aria-label={copy.ariaScroll}
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full p-3 transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <ArrowDown className="h-5 w-5 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]" />
                </motion.div>
            </motion.button>
        </section>
    );
}
