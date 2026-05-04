import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowUpRight,
    CheckCircle2,
    ExternalLink,
    Github,
    Layers3,
    Lightbulb,
    ListChecks,
    Target,
    Wrench,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import { HoverPreview } from '@/components/portfolio/ui/hover-preview';
import { PortfolioLetterSwapOverlay } from '@/components/portfolio/ui/portfolio-letter-swap-overlay';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import type { Project } from '@/data/projects';
import { localizeProject, projects } from '@/data/projects';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';
import { home } from '@/routes';
import { index as projectsIndex } from '@/routes/projects';

type ProjectShowProps = {
    project: Project;
};

type TechMeta = {
    logo: string;
    label?: string;
    tone: string;
};

const techLogos: Record<string, TechMeta> = {
    DomPDF: {
        logo: '/logos/dompdf.svg',
        tone: 'from-red-500/18 to-rose-500/8',
    },
    Express: {
        logo: 'https://cdn.simpleicons.org/express/ffffff',
        tone: 'from-zinc-500/18 to-zinc-300/8',
    },
    Expo: {
        logo: 'https://cdn.simpleicons.org/expo/ffffff',
        tone: 'from-zinc-500/18 to-zinc-300/8',
    },
    Firebase: {
        logo: 'https://cdn.simpleicons.org/firebase/FFCA28',
        tone: 'from-amber-500/20 to-orange-500/8',
    },
    Fortify: {
        label: 'Laravel Fortify',
        logo: 'https://cdn.simpleicons.org/laravel/FF2D20',
        tone: 'from-red-500/18 to-orange-500/8',
    },
    'Framer Motion': {
        logo: 'https://cdn.simpleicons.org/framer/ffffff',
        tone: 'from-fuchsia-500/18 to-indigo-500/8',
    },
    GSAP: {
        logo: 'https://cdn.simpleicons.org/greensock/88CE02',
        tone: 'from-lime-500/18 to-emerald-500/8',
    },
    'HLS.js': {
        logo: '/logos/hlsjs.svg',
        tone: 'from-cyan-500/18 to-blue-500/8',
    },
    'Inertia.js': {
        logo: 'https://cdn.simpleicons.org/inertia/9553E9',
        tone: 'from-violet-500/18 to-fuchsia-500/8',
    },
    JWT: {
        label: 'JSON Web Token',
        logo: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff',
        tone: 'from-pink-500/18 to-sky-500/8',
    },
    Laravel: {
        logo: 'https://cdn.simpleicons.org/laravel/FF2D20',
        tone: 'from-red-500/18 to-orange-500/8',
    },
    Leaflet: {
        logo: 'https://cdn.simpleicons.org/leaflet/199900',
        tone: 'from-green-500/18 to-lime-500/8',
    },
    MySQL: {
        logo: 'https://cdn.simpleicons.org/mysql/4479A1',
        tone: 'from-blue-500/18 to-cyan-500/8',
    },
    'Node.js': {
        logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
        tone: 'from-green-500/18 to-emerald-500/8',
    },
    Pest: {
        logo: 'https://cdn.simpleicons.org/pest/ffffff',
        tone: 'from-lime-500/18 to-teal-500/8',
    },
    React: {
        logo: 'https://cdn.simpleicons.org/react/61DAFB',
        tone: 'from-cyan-500/18 to-sky-500/8',
    },
    'React Native': {
        logo: 'https://cdn.simpleicons.org/react/61DAFB',
        tone: 'from-cyan-500/18 to-blue-500/8',
    },
    Recharts: {
        logo: '/logos/recharts.svg',
        tone: 'from-purple-500/18 to-pink-500/8',
    },
    SQLite: {
        logo: 'https://cdn.simpleicons.org/sqlite/003B57',
        tone: 'from-sky-500/18 to-blue-500/8',
    },
    Swagger: {
        logo: 'https://cdn.simpleicons.org/swagger/85EA2D',
        tone: 'from-lime-500/18 to-green-500/8',
    },
    TailwindCSS: {
        logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
        tone: 'from-cyan-500/18 to-teal-500/8',
    },
    'Three.js': {
        logo: 'https://cdn.simpleicons.org/threedotjs/ffffff',
        tone: 'from-zinc-500/18 to-slate-300/8',
    },
    TypeScript: {
        logo: 'https://cdn.simpleicons.org/typescript/3178C6',
        tone: 'from-blue-500/18 to-indigo-500/8',
    },
    Vite: {
        logo: 'https://cdn.simpleicons.org/vite/646CFF',
        tone: 'from-indigo-500/18 to-yellow-500/8',
    },
};

const sectionMotion = {
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.45 },
    viewport: { once: true, margin: '-80px' },
    whileInView: { opacity: 1, y: 0 },
};

function getTechMeta(tech: string): TechMeta {
    return (
        techLogos[tech] ?? {
            logo: `https://cdn.simpleicons.org/${tech.toLowerCase().replace(/[^a-z0-9]/g, '')}/ffffff`,
            tone: 'from-indigo-500/18 to-cyan-500/8',
        }
    );
}

function TechStackPreview({
    language,
    tech,
}: {
    language: PortfolioLanguage;
    tech: string;
}) {
    const meta = getTechMeta(tech);
    const layerCopy =
        language === 'en'
            ? `Used in the ${tech} layer for this project.`
            : `Digunakan pada lapisan ${tech} dalam proyek ini.`;

    return (
        <HoverPreview
            preview={
                <div
                    className={`bg-gradient-to-br ${meta.tone} p-5 text-center`}
                >
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-md border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/30">
                        <img
                            src={meta.logo}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                        {meta.label ?? tech}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {layerCopy}
                    </p>
                </div>
            }
            previewClassName="w-64"
        >
            <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="inline-flex cursor-default items-center gap-2 border-b border-slate-300 pb-1 text-sm font-semibold text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-indigo-300 dark:hover:text-indigo-200"
            >
                <span className="flex h-6 w-6 items-center justify-center">
                    <img
                        src={meta.logo}
                        alt=""
                        className="max-h-5 max-w-5 object-contain"
                        loading="lazy"
                    />
                </span>
                {tech}
            </motion.span>
        </HoverPreview>
    );
}

function DetailSection({
    children,
    icon: Icon,
    label,
}: {
    children: string;
    icon: typeof Target;
    label: string;
}) {
    return (
        <motion.section
            {...sectionMotion}
            className="border-t border-slate-200 py-10 dark:border-white/10"
        >
            <div className="mb-4 flex items-center gap-3">
                <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                <h2 className="text-sm font-black tracking-[0.22em] text-slate-500 uppercase dark:text-slate-400">
                    {label}
                </h2>
            </div>
            <p className="max-w-4xl text-xl leading-9 text-slate-700 dark:text-slate-300">
                {children}
            </p>
        </motion.section>
    );
}

const projectShowCopy = {
    en: {
        allProjects: 'All Projects',
        caseStudy: 'Case Study',
        caseStudyDescription:
            'A concise summary of the problem the product solved, how it was shaped, and what made the implementation meaningful.',
        caseStudyTitle: 'Scope, decisions, and product execution.',
        discussProject: 'Discuss Project',
        executionHeading: 'Challenges handled throughout the build process.',
        executionNotes: 'Execution Notes',
        features: 'Key Features',
        liveDemo: 'Live Demo',
        mainStack: 'Main Stack',
        myRole: 'My Role',
        otherProjects: 'Other Projects',
        overview: 'Overview',
        previewAlt: 'Interface preview for',
        problem: 'Problem',
        result: 'Result',
        role: 'Role',
        solution: 'Solution',
        sourceCode: 'Source Code',
        techHeading: 'Built with tools that match the product workflow.',
        techIntro:
            'Hover each technology to view its logo and quickly understand the implementation layer.',
        techStack: 'Technology Stack',
        uiHighlights: 'UI/UX Highlights',
    },
    id: {
        allProjects: 'Semua Proyek',
        caseStudy: 'Studi Kasus',
        caseStudyDescription:
            'Ringkasan padat tentang masalah yang diselesaikan produk, bagaimana produk dibentuk, dan apa yang membuat implementasinya bermakna.',
        caseStudyTitle: 'Cakupan, keputusan, dan eksekusi produk.',
        discussProject: 'Diskusikan Proyek',
        executionHeading: 'Tantangan yang ditangani selama proses pembangunan.',
        executionNotes: 'Catatan Eksekusi',
        features: 'Fitur Utama',
        liveDemo: 'Demo Langsung',
        mainStack: 'Stack Utama',
        myRole: 'Peran Saya',
        otherProjects: 'Proyek Lainnya',
        overview: 'Gambaran',
        previewAlt: 'Pratinjau antarmuka',
        problem: 'Masalah',
        result: 'Hasil',
        role: 'Peran',
        solution: 'Solusi',
        sourceCode: 'Kode Sumber',
        techHeading:
            'Dibangun dengan alat yang sesuai dengan alur kerja produk.',
        techIntro:
            'Arahkan kursor ke setiap teknologi untuk melihat logo dan membaca layer implementasinya dengan cepat.',
        techStack: 'Stack Teknologi',
        uiHighlights: 'Sorotan UI/UX',
    },
} satisfies Record<PortfolioLanguage, Record<string, string>>;

export default function ProjectShow({ project }: ProjectShowProps) {
    const [commandOpen, setCommandOpen] = useState(false);
    const [language, setLanguage, isLanguageChanging] = usePortfolioLanguage();
    const copy = projectShowCopy[language];
    const sourceProject =
        projects.find((projectItem) => projectItem.slug === project.slug) ??
        project;
    const displayProject = localizeProject(sourceProject, language);
    const previewImage = displayProject.previewImage ?? '/project/project1.png';
    const stackSummary = displayProject.techStack.slice(0, 4).join(', ');

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
            <Head title={`${displayProject.name} — Intra Sepriansa`}>
                <meta
                    name="description"
                    content={displayProject.shortDescription}
                />
                <meta
                    property="og:title"
                    content={`${displayProject.name} — Intra Sepriansa`}
                />
                <meta
                    property="og:description"
                    content={displayProject.shortDescription}
                />
                <meta property="og:image" content={previewImage} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={previewImage} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800,900"
                    rel="stylesheet"
                />
            </Head>

            <div
                data-portfolio-language-shell
                className="min-h-screen bg-white text-slate-950 dark:bg-[#060612] dark:text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <ScrollProgress />
                <PortfolioLetterSwapOverlay
                    isChanging={isLanguageChanging}
                    language={language}
                />
                <Navbar
                    language={language}
                    languageChanging={isLanguageChanging}
                    onCommandPalette={openCommand}
                    onLanguageChange={setLanguage}
                />
                <CommandPalette
                    language={language}
                    open={commandOpen}
                    onClose={closeCommand}
                />

                <main className="pt-28">
                    <section className="px-6 pb-16 lg:px-10">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="mx-auto max-w-[1440px]"
                        >
                            <Link
                                href={projectsIndex.url()}
                                className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                {copy.allProjects}
                            </Link>

                            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
                                <div>
                                    <p className="mb-4 text-xs font-black tracking-[0.28em] text-indigo-600 uppercase dark:text-indigo-300">
                                        {displayProject.category}
                                    </p>
                                    <h1 className="max-w-5xl text-5xl leading-[0.98] font-black tracking-normal text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                                        {displayProject.name}
                                    </h1>
                                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                                        {displayProject.shortDescription}
                                    </p>

                                    <div className="mt-8 flex flex-wrap items-center gap-3">
                                        {displayProject.links.demo && (
                                            <a
                                                href={displayProject.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                                {copy.liveDemo}
                                            </a>
                                        )}
                                        {displayProject.links.github && (
                                            <a
                                                href={
                                                    displayProject.links.github
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950 dark:border-white/20 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                                            >
                                                <Github className="h-4 w-4" />
                                                {copy.sourceCode}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -inset-x-8 bottom-0 h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent blur-3xl dark:from-indigo-300/10" />
                                    <img
                                        src={previewImage}
                                        alt={`${copy.previewAlt} ${displayProject.name}`}
                                        className="relative w-full border border-slate-200 object-cover shadow-2xl shadow-slate-950/10 dark:border-white/10 dark:shadow-black/40"
                                        loading="eager"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    <section className="border-y border-slate-200 px-6 py-6 lg:px-10 dark:border-white/10">
                        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-3">
                            {[
                                [copy.role, displayProject.role],
                                [copy.mainStack, stackSummary],
                                [copy.result, displayProject.result],
                            ].map(([label, value]) => (
                                <div key={label} className="min-w-0">
                                    <p className="text-xs font-black tracking-[0.2em] text-slate-400 uppercase">
                                        {label}
                                    </p>
                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="px-6 py-16 lg:px-10 lg:py-24">
                        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[minmax(260px,0.32fr)_minmax(0,0.68fr)]">
                            <aside className="lg:sticky lg:top-28 lg:self-start">
                                <p className="text-xs font-black tracking-[0.28em] text-indigo-600 uppercase dark:text-indigo-300">
                                    {copy.caseStudy}
                                </p>
                                <h2 className="mt-4 text-3xl leading-tight font-black tracking-normal text-slate-950 dark:text-white">
                                    {copy.caseStudyTitle}
                                </h2>
                                <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                                    {copy.caseStudyDescription}
                                </p>
                            </aside>

                            <div>
                                <DetailSection
                                    icon={Target}
                                    label={copy.overview}
                                >
                                    {displayProject.overview}
                                </DetailSection>
                                <DetailSection
                                    icon={Lightbulb}
                                    label={copy.problem}
                                >
                                    {displayProject.problem}
                                </DetailSection>
                                <DetailSection
                                    icon={CheckCircle2}
                                    label={copy.solution}
                                >
                                    {displayProject.solution}
                                </DetailSection>
                                <DetailSection
                                    icon={Wrench}
                                    label={copy.myRole}
                                >
                                    {displayProject.role}
                                </DetailSection>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-950 px-6 py-16 text-white lg:px-10 lg:py-24 dark:bg-black">
                        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.42fr_0.58fr]">
                            <motion.div {...sectionMotion}>
                                <div className="mb-4 flex items-center gap-3">
                                    <Layers3 className="h-5 w-5 text-cyan-300" />
                                    <h2 className="text-sm font-black tracking-[0.22em] text-slate-400 uppercase">
                                        {copy.techStack}
                                    </h2>
                                </div>
                                <p className="max-w-xl text-3xl leading-tight font-black tracking-normal lg:text-5xl">
                                    {copy.techHeading}
                                </p>
                                <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
                                    {copy.techIntro}
                                </p>
                            </motion.div>

                            <motion.div
                                {...sectionMotion}
                                className="flex flex-wrap content-start gap-x-5 gap-y-5"
                            >
                                {displayProject.techStack.map((tech) => (
                                    <TechStackPreview
                                        key={tech}
                                        language={language}
                                        tech={tech}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    <section className="px-6 py-16 lg:px-10 lg:py-24">
                        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-2">
                            <motion.section {...sectionMotion}>
                                <div className="mb-8 flex items-center gap-3">
                                    <ListChecks className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                    <h2 className="text-sm font-black tracking-[0.22em] text-slate-500 uppercase dark:text-slate-400">
                                        {copy.features}
                                    </h2>
                                </div>
                                <div className="space-y-5">
                                    {displayProject.features.map(
                                        (feature, index) => (
                                            <div
                                                key={feature}
                                                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-slate-200 pt-5 dark:border-white/10"
                                            >
                                                <span className="text-sm font-black text-indigo-600 dark:text-indigo-300">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </span>
                                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                                    {feature}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </motion.section>

                            <motion.section {...sectionMotion}>
                                <div className="mb-8 flex items-center gap-3">
                                    <ArrowUpRight className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                                    <h2 className="text-sm font-black tracking-[0.22em] text-slate-500 uppercase dark:text-slate-400">
                                        {copy.uiHighlights}
                                    </h2>
                                </div>
                                <div className="space-y-5">
                                    {displayProject.uiHighlights.map(
                                        (highlight, index) => (
                                            <div
                                                key={highlight}
                                                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-slate-200 pt-5 dark:border-white/10"
                                            >
                                                <span className="text-sm font-black text-cyan-600 dark:text-cyan-300">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </span>
                                                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                                                    {highlight}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </motion.section>
                        </div>
                    </section>

                    <section className="border-y border-slate-200 px-6 py-16 lg:px-10 lg:py-24 dark:border-white/10">
                        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.35fr_0.65fr]">
                            <motion.div {...sectionMotion}>
                                <p className="text-xs font-black tracking-[0.28em] text-indigo-600 uppercase dark:text-indigo-300">
                                    {copy.executionNotes}
                                </p>
                                <h2 className="mt-4 text-4xl leading-tight font-black tracking-normal text-slate-950 dark:text-white">
                                    {copy.executionHeading}
                                </h2>
                            </motion.div>

                            <motion.div
                                {...sectionMotion}
                                className="divide-y divide-slate-200 dark:divide-white/10"
                            >
                                {displayProject.challenges.map(
                                    (challenge, index) => (
                                        <div
                                            key={challenge}
                                            className="grid gap-4 py-7 md:grid-cols-[5rem_1fr]"
                                        >
                                            <span className="text-sm font-black tracking-[0.2em] text-slate-400">
                                                C
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                            <p className="text-xl leading-8 font-semibold text-slate-800 dark:text-slate-200">
                                                {challenge}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </motion.div>
                        </div>
                    </section>

                    <section className="px-6 py-16 lg:px-10 lg:py-24">
                        <motion.div
                            {...sectionMotion}
                            className="mx-auto max-w-[1440px]"
                        >
                            <p className="text-xs font-black tracking-[0.28em] text-emerald-600 uppercase dark:text-emerald-300">
                                {copy.result}
                            </p>
                            <p className="mt-5 max-w-5xl text-3xl leading-tight font-black tracking-normal text-slate-950 md:text-5xl dark:text-white">
                                {displayProject.result}
                            </p>
                            <div className="mt-10 flex flex-wrap gap-3">
                                <Link
                                    href={`${home.url()}#contact`}
                                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                                >
                                    {copy.discussProject}
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={projectsIndex.url()}
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950 dark:border-white/20 dark:text-slate-300 dark:hover:border-white dark:hover:text-white"
                                >
                                    {copy.otherProjects}
                                </Link>
                            </div>
                        </motion.div>
                    </section>
                </main>

                <Footer language={language} />
            </div>
        </>
    );
}
