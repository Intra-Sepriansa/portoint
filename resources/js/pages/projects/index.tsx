import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import { TechBadge } from '@/components/portfolio/ui/tech-badge';
import { projects } from '@/data/projects';

export default function ProjectsIndex() {
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
            <Head title="Projects — Intra Sepriansa">
                <meta
                    name="description"
                    content="Explore projects by Intra Sepriansa — modern web applications, dashboards, EdTech platforms, and AI-powered systems."
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

                <main className="pt-32 pb-24">
                    <div className="mx-auto max-w-7xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16 text-center"
                        >
                            <span className="mb-3 inline-block text-xs font-medium tracking-widest text-indigo-400 uppercase">
                                Portfolio
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                                All Projects
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
                                A collection of web applications, platforms, and
                                systems I&apos;ve designed and built.
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link href={`/projects/${project.slug}`}>
                                        <GlowCard className="h-full cursor-pointer">
                                            <span className="text-xs font-medium tracking-wide text-indigo-400 uppercase">
                                                {project.category}
                                            </span>
                                            <h2 className="mt-2 text-xl font-bold text-white">
                                                {project.name}
                                            </h2>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                                {project.shortDescription}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {project.techStack
                                                    .slice(0, 5)
                                                    .map((tech) => (
                                                        <TechBadge
                                                            key={tech}
                                                            name={tech}
                                                        />
                                                    ))}
                                                {project.techStack.length >
                                                    5 && (
                                                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-500">
                                                        +
                                                        {project.techStack
                                                            .length - 5}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-6 flex items-center gap-2 text-sm text-indigo-400 transition-colors group-hover:text-indigo-300">
                                                View Case Study
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </GlowCard>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
