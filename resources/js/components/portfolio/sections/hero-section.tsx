import { motion } from 'framer-motion';
import { ArrowDown, Download, Eye } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { MagneticButton } from '@/components/portfolio/ui/magnetic-button';
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
            particles = Array.from({ length: 50 }, () => ({
                x: Math.random() * (canvas?.width ?? 1920),
                y: Math.random() * (canvas?.height ?? 1080),
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
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
                    : `rgba(79, 70, 229, ${p.opacity * 0.6})`;
                ctx.fill();
            });

            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach((b) => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = isDark
                            ? `rgba(99, 102, 241, ${0.05 * (1 - dist / 150)})`
                            : `rgba(79, 70, 229, ${0.08 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
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

const floatingCards = [
    {
        label: 'React + TypeScript',
        color: 'from-indigo-500/20 to-violet-500/20',
        pos: 'top-[15%] right-[8%]',
    },
    {
        label: 'Laravel API',
        color: 'from-emerald-500/20 to-teal-500/20',
        pos: 'top-[35%] right-[3%]',
    },
    {
        label: 'Dashboard UI',
        color: 'from-violet-500/20 to-pink-500/20',
        pos: 'bottom-[30%] right-[10%]',
    },
    {
        label: 'AI Workflow',
        color: 'from-blue-500/20 to-cyan-500/20',
        pos: 'bottom-[15%] right-[5%]',
    },
];

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center overflow-hidden bg-white dark:bg-[#060612]"
        >
            <AnimatedBackground />

            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-[120px] dark:bg-indigo-600/[0.07]" />
                <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-200/30 blur-[100px] dark:bg-violet-600/[0.05]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div>
                        <motion.span
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mb-4 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-indigo-600 uppercase dark:text-indigo-300"
                        >
                            Full-Stack Web Developer
                        </motion.span>

                        <motion.h1
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white"
                        >
                            Building modern web applications with{' '}
                            <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                                clean UI
                            </span>
                            , scalable systems, and interactive digital
                            experiences.
                        </motion.h1>

                        <motion.p
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg dark:text-slate-400"
                        >
                            I design and build full-stack web platforms for
                            education, dashboards, AI-assisted workflows, CMS,
                            decision support systems, and digital institutions.
                        </motion.p>

                        <motion.div
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <MagneticButton
                                variant="primary"
                                href="#projects"
                                onClick={() => {
                                    document
                                        .getElementById('projects')
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                }}
                            >
                                <Eye className="h-4 w-4" />
                                View Projects
                            </MagneticButton>
                            <MagneticButton variant="outline" href="#contact">
                                Let&apos;s Talk
                            </MagneticButton>
                            <MagneticButton variant="secondary">
                                <Download className="h-4 w-4" />
                                Download CV
                            </MagneticButton>
                        </motion.div>
                    </div>

                    <div className="relative hidden lg:block">
                        {floatingCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.8 + i * 0.15,
                                    duration: 0.5,
                                }}
                                className={`absolute ${card.pos}`}
                            >
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 3 + i * 0.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className={`rounded-xl border border-slate-200 bg-gradient-to-br ${card.color} px-5 py-3 text-sm font-medium text-slate-700 shadow-xl dark:border-white/10 dark:text-white/80 dark:backdrop-blur-sm`}
                                >
                                    {card.label}
                                </motion.div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="mx-auto w-[380px] rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:backdrop-blur-sm"
                        >
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                                <div className="h-3 w-3 rounded-full bg-green-500/60" />
                                <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
                                    portfolio.tsx
                                </span>
                            </div>
                            <div className="space-y-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                                <p>
                                    <span className="text-violet-500 dark:text-violet-400">
                                        const
                                    </span>{' '}
                                    <span className="text-blue-500 dark:text-blue-300">
                                        developer
                                    </span>{' '}
                                    = {'{'}
                                </p>
                                <p className="pl-4">
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        name
                                    </span>
                                    :{' '}
                                    <span className="text-amber-600 dark:text-amber-300">
                                        &quot;Intra Sepriansa&quot;
                                    </span>
                                    ,
                                </p>
                                <p className="pl-4">
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        role
                                    </span>
                                    :{' '}
                                    <span className="text-amber-600 dark:text-amber-300">
                                        &quot;Full-Stack Dev&quot;
                                    </span>
                                    ,
                                </p>
                                <p className="pl-4">
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        stack
                                    </span>
                                    : [
                                    <span className="text-amber-600 dark:text-amber-300">
                                        &quot;React&quot;
                                    </span>
                                    ,{' '}
                                    <span className="text-amber-600 dark:text-amber-300">
                                        &quot;Laravel&quot;
                                    </span>
                                    ],
                                </p>
                                <p className="pl-4">
                                    <span className="text-emerald-600 dark:text-emerald-400">
                                        focus
                                    </span>
                                    :{' '}
                                    <span className="text-amber-600 dark:text-amber-300">
                                        &quot;Modern Web Apps&quot;
                                    </span>
                                    ,
                                </p>
                                <p>{'};'}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
            </div>
        </section>
    );
}
