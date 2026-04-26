import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle,
    ExternalLink,
    Github,
    Lightbulb,
    Target,
    Wrench,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import { TechBadge } from '@/components/portfolio/ui/tech-badge';
import type { Project } from '@/data/projects';

type ProjectShowProps = {
    project: Project;
};

export default function ProjectShow({ project }: ProjectShowProps) {
    const [commandOpen, setCommandOpen] = useState(false);

    const openCommand = useCallback(() => setCommandOpen(true), []);
    const closeCommand = useCallback(() => setCommandOpen(false), []);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandOpen((prev) => !prev);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Head title={`${project.name} — Intra Sepriansa`}>
                <meta name="description" content={project.shortDescription} />
                <meta
                    property="og:title"
                    content={`${project.name} — Intra Sepriansa`}
                />
                <meta
                    property="og:description"
                    content={project.shortDescription}
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-[#060612]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ScrollProgress />
                <Navbar onCommandPalette={openCommand} />
                <CommandPalette open={commandOpen} onClose={closeCommand} />

                <main className="pt-28 pb-24">
                    <div className="mx-auto max-w-4xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Link
                                href="/projects"
                                className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                All Projects
                            </Link>

                            <div className="mb-12">
                                <span className="mb-3 inline-block text-xs font-medium tracking-wide text-indigo-400 uppercase">
                                    {project.category}
                                </span>
                                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                    {project.name}
                                </h1>
                                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
                                    {project.shortDescription}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-slate-400 hover:text-white"
                                        >
                                            <Github className="h-4 w-4" />
                                            Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-12">
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                                    <Target className="h-5 w-5 text-indigo-400" />
                                    Overview
                                </h2>
                                <p className="leading-relaxed text-slate-400">
                                    {project.overview}
                                </p>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                                    <Lightbulb className="h-5 w-5 text-amber-400" />
                                    Problem
                                </h2>
                                <p className="leading-relaxed text-slate-400">
                                    {project.problem}
                                </p>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                                    Solution
                                </h2>
                                <p className="leading-relaxed text-slate-400">
                                    {project.solution}
                                </p>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                                    <Wrench className="h-5 w-5 text-violet-400" />
                                    My Role
                                </h2>
                                <p className="leading-relaxed text-slate-400">
                                    {project.role}
                                </p>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-white">
                                    Key Features
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {project.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                                        >
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                                            <span className="text-sm text-slate-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-white">
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <TechBadge
                                            key={tech}
                                            name={tech}
                                            size="md"
                                        />
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-white">
                                    UI/UX Highlights
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {project.uiHighlights.map((highlight) => (
                                        <GlowCard key={highlight}>
                                            <p className="text-sm text-slate-300">
                                                {highlight}
                                            </p>
                                        </GlowCard>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-6 text-xl font-semibold text-white">
                                    Challenges & Solutions
                                </h2>
                                <div className="space-y-3">
                                    {project.challenges.map((challenge, i) => (
                                        <div
                                            key={challenge}
                                            className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-400">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm leading-relaxed text-slate-400">
                                                {challenge}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="mb-4 text-xl font-semibold text-white">
                                    Result
                                </h2>
                                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
                                    <p className="leading-relaxed text-slate-300">
                                        {project.result}
                                    </p>
                                </div>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-indigo-600/10 to-violet-600/5 p-8 text-center"
                            >
                                <h2 className="mb-2 text-2xl font-bold text-white">
                                    Interested in working together?
                                </h2>
                                <p className="mb-6 text-sm text-slate-400">
                                    Let&apos;s discuss your project and bring
                                    your ideas to life.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                                >
                                    Contact Me
                                </Link>
                            </motion.section>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
