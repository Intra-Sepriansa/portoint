import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { GlowCard } from '@/components/portfolio/ui/glow-card';
import { MagneticButton } from '@/components/portfolio/ui/magnetic-button';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { TechBadge } from '@/components/portfolio/ui/tech-badge';
import { projects } from '@/data/projects';

export function FeaturedProjectsSection() {
    return (
        <section id="projects" className="bg-slate-50 py-24 md:py-32 dark:bg-[#080818]">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Featured Projects"
                    title="What I've Built"
                    description="A selection of projects that showcase my ability to build modern, production-ready web applications."
                />

                <div className="grid gap-8 lg:grid-cols-2">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlowCard className="h-full p-0">
                                <div className="relative overflow-hidden rounded-t-2xl border-b border-slate-200 bg-gradient-to-br from-indigo-600/10 via-violet-600/5 to-transparent p-8 dark:border-white/[0.06]">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500/60" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                                        <div className="h-3 w-3 rounded-full bg-green-500/60" />
                                    </div>
                                    <div className="mt-6 space-y-2 font-mono text-xs text-slate-400 dark:text-slate-500">
                                        <p>
                                            <span className="text-violet-500 dark:text-violet-400">
                                                project
                                            </span>
                                            .
                                            <span className="text-blue-500 dark:text-blue-300">
                                                name
                                            </span>{' '}
                                            ={' '}
                                            <span className="text-amber-600 dark:text-amber-300">
                                                &quot;{project.name}&quot;
                                            </span>
                                        </p>
                                        <p>
                                            <span className="text-violet-500 dark:text-violet-400">
                                                project
                                            </span>
                                            .
                                            <span className="text-blue-500 dark:text-blue-300">
                                                type
                                            </span>{' '}
                                            ={' '}
                                            <span className="text-amber-600 dark:text-amber-300">
                                                &quot;{project.category}&quot;
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <span className="text-xs font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
                                        {project.category}
                                    </span>
                                    <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                                        {project.name}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                        {project.shortDescription}
                                    </p>

                                    <ul className="mt-4 space-y-1">
                                        {project.features
                                            .slice(0, 4)
                                            .map((f) => (
                                                <li
                                                    key={f}
                                                    className="flex items-center gap-2 text-xs text-slate-500"
                                                >
                                                    <span className="h-1 w-1 rounded-full bg-indigo-500" />
                                                    {f}
                                                </li>
                                            ))}
                                    </ul>

                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {project.techStack
                                            .slice(0, 6)
                                            .map((tech) => (
                                                <TechBadge
                                                    key={tech}
                                                    name={tech}
                                                />
                                            ))}
                                        {project.techStack.length > 6 && (
                                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-white/[0.05]">
                                                +{project.techStack.length - 6}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-6 flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
                                        >
                                            View Case Study
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                        {project.links.demo && (
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-500 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Demo
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-500 transition-colors hover:text-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                                            >
                                                <Github className="h-3 w-3" />
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <MagneticButton variant="outline" href="/projects">
                        View All Projects
                        <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
