import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';
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

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden bg-white dark:bg-[#060612]"
        >
            <AnimatedBackground />

            {/* Social icons - left side */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:flex xl:left-10"
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
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-20">
                {/* Desktop: split layout */}
                <div className="hidden items-center justify-between lg:flex">
                    {/* Left text */}
                    <div className="max-w-xs">
                        <motion.p
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mb-2 text-sm font-medium tracking-wider text-indigo-500 italic dark:text-indigo-400"
                        >
                            Hello, I&apos;m
                        </motion.p>
                        <motion.h1
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="text-5xl leading-[1.05] font-bold tracking-tight text-slate-900 xl:text-6xl dark:text-white"
                        >
                            Intra
                            <br />
                            Sepriansa
                        </motion.h1>
                    </div>

                    {/* Center visual - abstract orb with purple glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Outer purple glow */}
                        <div className="absolute h-[350px] w-[350px] rounded-full bg-violet-500/20 blur-[80px] xl:h-[420px] xl:w-[420px] dark:bg-violet-600/25" />
                        <div className="absolute h-[250px] w-[250px] rounded-full bg-indigo-500/15 blur-[60px] xl:h-[300px] xl:w-[300px] dark:bg-indigo-500/20" />

                        {/* Abstract visual element */}
                        <div className="relative flex h-[280px] w-[280px] items-center justify-center xl:h-[340px] xl:w-[340px]">
                            {/* Rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute inset-0 rounded-full border border-indigo-300/20 dark:border-indigo-500/20"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute inset-4 rounded-full border border-violet-300/15 dark:border-violet-500/15"
                            />

                            {/* Inner orb */}
                            <div className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-100/80 via-violet-100/60 to-purple-100/80 shadow-2xl xl:h-[240px] xl:w-[240px] dark:from-indigo-600/20 dark:via-violet-600/30 dark:to-purple-600/20 dark:shadow-violet-500/10">
                                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/90 to-slate-50/80 dark:from-[#0c0c20] dark:to-[#12122a]" />
                                {/* Monogram */}
                                <span className="relative bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent xl:text-5xl dark:from-indigo-400 dark:to-violet-400">
                                    {'<IS/>'}
                                </span>
                            </div>

                            {/* Floating accent dots */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute -top-2 right-8 h-2 w-2 rounded-full bg-indigo-400/60 dark:bg-indigo-400/40"
                            />
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute bottom-4 -left-2 h-3 w-3 rounded-full bg-violet-400/50 dark:bg-violet-400/30"
                            />
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="absolute right-0 bottom-12 h-1.5 w-1.5 rounded-full bg-purple-400/60 dark:bg-purple-400/40"
                            />
                        </div>
                    </motion.div>

                    {/* Right text */}
                    <div className="max-w-xs text-right">
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
                            className="text-5xl leading-[1.05] font-bold tracking-tight xl:text-6xl"
                        >
                            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                                Developer
                            </span>
                            <br />
                            <span className="text-slate-900 dark:text-white">
                                &amp; Builder
                            </span>
                        </motion.h2>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="flex flex-col items-center text-center lg:hidden">
                    <motion.p
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mb-2 text-sm font-medium tracking-wider text-indigo-500 italic dark:text-indigo-400"
                    >
                        Hello, I&apos;m
                    </motion.p>
                    <motion.h1
                        custom={1}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
                    >
                        Intra Sepriansa
                    </motion.h1>

                    {/* Mobile center visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative my-10 flex items-center justify-center"
                    >
                        <div className="absolute h-[250px] w-[250px] rounded-full bg-violet-500/20 blur-[60px] dark:bg-violet-600/25" />
                        <div className="absolute h-[180px] w-[180px] rounded-full bg-indigo-500/15 blur-[40px] dark:bg-indigo-500/20" />
                        <div className="relative flex h-[180px] w-[180px] items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute inset-0 rounded-full border border-indigo-300/20 dark:border-indigo-500/20"
                            />
                            <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-100/80 via-violet-100/60 to-purple-100/80 shadow-xl dark:from-indigo-600/20 dark:via-violet-600/30 dark:to-purple-600/20">
                                <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/90 to-slate-50/80 dark:from-[#0c0c20] dark:to-[#12122a]" />
                                <span className="relative bg-gradient-to-br from-indigo-500 to-violet-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-indigo-400 dark:to-violet-400">
                                    {'<IS/>'}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.h2
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl"
                    >
                        <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                            Developer
                        </span>{' '}
                        <span className="text-slate-900 dark:text-white">
                            &amp; Builder
                        </span>
                    </motion.h2>

                    <motion.p
                        custom={3}
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                        className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400"
                    >
                        Building modern web applications with clean UI,
                        scalable systems, and interactive digital experiences.
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
                Resume
                <Download className="h-3.5 w-3.5" />
            </motion.a>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <ArrowDown className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                </motion.div>
            </motion.div>
        </section>
    );
}
