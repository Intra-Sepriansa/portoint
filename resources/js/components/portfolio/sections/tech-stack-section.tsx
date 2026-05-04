import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import {
    SiExpo,
    SiExpress,
    SiFigma,
    SiFirebase,
    SiFramer,
    SiGit,
    SiGithub,
    SiGreensock,
    SiInertia,
    SiJsonwebtokens,
    SiLaravel,
    SiLeaflet,
    SiMysql,
    SiNodedotjs,
    SiOpenapiinitiative,
    SiPostman,
    SiReact,
    SiSqlite,
    SiSwagger,
    SiTailwindcss,
    SiThreedotjs,
    SiTypescript,
    SiVite,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { LogoLoop } from '@/components/portfolio/ui/logo-loop';
import type { LogoItem } from '@/components/portfolio/ui/logo-loop';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { skillCategories } from '@/data/skills';

type TechLogo = LogoItem & {
    title: string;
    color: string;
    category: string;
};

const techMeta: Record<
    string,
    {
        color: string;
        href: string;
        node?: ReactNode;
        src?: string;
        alt?: string;
    }
> = {
    DomPDF: {
        alt: 'DomPDF',
        color: '#ef4444',
        href: 'https://github.com/dompdf/dompdf',
        src: '/logos/dompdf.svg',
    },
    Expo: {
        color: '#000020',
        href: 'https://expo.dev',
        node: <SiExpo />,
    },
    Express: {
        color: '#111827',
        href: 'https://expressjs.com',
        node: <SiExpress />,
    },
    Figma: {
        color: '#a259ff',
        href: 'https://figma.com',
        node: <SiFigma />,
    },
    Firebase: {
        color: '#ffca28',
        href: 'https://firebase.google.com',
        node: <SiFirebase />,
    },
    Fortify: {
        color: '#ff2d20',
        href: 'https://laravel.com/docs/fortify',
        node: <SiLaravel />,
    },
    'Framer Motion': {
        color: '#0055ff',
        href: 'https://www.framer.com/motion/',
        node: <SiFramer />,
    },
    GSAP: {
        color: '#88ce02',
        href: 'https://gsap.com',
        node: <SiGreensock />,
    },
    Git: {
        color: '#f05032',
        href: 'https://git-scm.com',
        node: <SiGit />,
    },
    GitHub: {
        color: '#181717',
        href: 'https://github.com',
        node: <SiGithub />,
    },
    'HLS.js': {
        alt: 'HLS.js',
        color: '#f97316',
        href: 'https://github.com/video-dev/hls.js',
        src: '/logos/hlsjs.svg',
    },
    'Inertia.js': {
        color: '#9553e9',
        href: 'https://inertiajs.com',
        node: <SiInertia />,
    },
    JWT: {
        color: '#d63aff',
        href: 'https://jwt.io',
        node: <SiJsonwebtokens />,
    },
    Laravel: {
        color: '#ff2d20',
        href: 'https://laravel.com',
        node: <SiLaravel />,
    },
    Leaflet: {
        color: '#199900',
        href: 'https://leafletjs.com',
        node: <SiLeaflet />,
    },
    MySQL: {
        color: '#4479a1',
        href: 'https://www.mysql.com',
        node: <SiMysql />,
    },
    'Node.js': {
        color: '#5fa04e',
        href: 'https://nodejs.org',
        node: <SiNodedotjs />,
    },
    Postman: {
        color: '#ff6c37',
        href: 'https://www.postman.com',
        node: <SiPostman />,
    },
    React: {
        color: '#61dafb',
        href: 'https://react.dev',
        node: <SiReact />,
    },
    'React Native': {
        color: '#61dafb',
        href: 'https://reactnative.dev',
        node: <SiReact />,
    },
    Recharts: {
        alt: 'Recharts',
        color: '#2563eb',
        href: 'https://recharts.github.io',
        src: '/logos/recharts.svg',
    },
    'REST API': {
        color: '#6ba539',
        href: 'https://www.openapis.org',
        node: <SiOpenapiinitiative />,
    },
    SQLite: {
        color: '#003b57',
        href: 'https://sqlite.org',
        node: <SiSqlite />,
    },
    Swagger: {
        color: '#85ea2d',
        href: 'https://swagger.io',
        node: <SiSwagger />,
    },
    TailwindCSS: {
        color: '#06b6d4',
        href: 'https://tailwindcss.com',
        node: <SiTailwindcss />,
    },
    'Three.js': {
        color: '#111827',
        href: 'https://threejs.org',
        node: <SiThreedotjs />,
    },
    TypeScript: {
        color: '#3178c6',
        href: 'https://www.typescriptlang.org',
        node: <SiTypescript />,
    },
    Vite: {
        color: '#646cff',
        href: 'https://vite.dev',
        node: <SiVite />,
    },
    'VS Code': {
        color: '#007acc',
        href: 'https://code.visualstudio.com',
        node: <VscVscode />,
    },
};

function uniqueTechByCategory(
    categoryNames: string[],
    renderedNames = new Set<string>(),
): TechLogo[] {
    return skillCategories
        .filter((category) => categoryNames.includes(category.name))
        .flatMap((category) =>
            category.items.map((name) => ({
                category: category.name,
                name,
            })),
        )
        .filter(({ name }) => {
            if (renderedNames.has(name)) {
                return false;
            }

            renderedNames.add(name);

            return true;
        })
        .map(({ category, name }) => {
            const meta = techMeta[name];

            if (!meta) {
                throw new Error(`Missing logo metadata for ${name}`);
            }

            const base = {
                category,
                color: meta.color,
                href: meta.href,
                title: name,
            };

            if (meta.node) {
                return {
                    ...base,
                    ariaLabel: name,
                    node: meta.node,
                };
            }

            return {
                ...base,
                alt: meta.alt ?? name,
                src: meta.src ?? '',
            };
        });
}

const renderedTechNames = new Set<string>();
const primaryLogos = uniqueTechByCategory(
    ['Frontend', 'Backend'],
    renderedTechNames,
);
const secondaryLogos = uniqueTechByCategory(
    ['Database', 'Mobile', 'Visualization', 'Tools'],
    renderedTechNames,
);

function SkillIllustration() {
    return (
        <motion.div
            aria-hidden="true"
            className="relative mx-auto h-[220px] w-full max-w-[650px] md:h-[285px] lg:h-[315px]"
            initial={{ opacity: 0, x: 36, filter: 'blur(12px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        >
            <div className="absolute inset-x-10 bottom-3 h-16 rounded-full bg-violet-200/45 blur-2xl dark:bg-violet-500/20" />
            <img
                alt=""
                className="relative h-full w-full [mask-image:radial-gradient(ellipse_86%_78%_at_52%_54%,#000_64%,transparent_100%)] object-contain object-center drop-shadow-[0_22px_45px_rgba(79,70,229,0.2)] dark:drop-shadow-[0_22px_45px_rgba(167,139,250,0.22)]"
                draggable={false}
                loading="lazy"
                src="/skill.png"
            />
        </motion.div>
    );
}

const techStackCopy = {
    en: {
        ariaDatabase:
            'Database, mobile, visualization, and tooling technologies',
        ariaSite: 'Website for',
        ariaStack: 'Frontend and backend technologies',
        description:
            'I use a focused stack to build portfolio sites, dashboards, CMS platforms, APIs, learning products, and interactive systems with strong structure from interface to database.',
        eyebrow: 'Technology Stack',
        title: 'Skills That Support My Work',
    },
    id: {
        ariaDatabase:
            'Teknologi database, seluler, visualisasi, dan alat bantu',
        ariaSite: 'Situs web',
        ariaStack: 'Teknologi frontend dan backend',
        description:
            'Saya menggunakan stack yang fokus untuk membangun situs portofolio, dasbor, platform CMS, API, produk pembelajaran, dan sistem interaktif dengan struktur yang kuat dari antarmuka hingga database.',
        eyebrow: 'Stack Teknologi',
        title: 'Keahlian yang Mendukung Pekerjaan Saya',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        ariaDatabase: string;
        ariaSite: string;
        ariaStack: string;
        description: string;
        eyebrow: string;
        title: string;
    }
>;

function TechLogoIcon(item: LogoItem, ariaSite: string) {
    const logo = item as TechLogo;
    const isImage = 'src' in logo;

    return (
        <a
            aria-label={`${ariaSite} ${logo.title}`}
            className="group/item inline-flex h-16 w-16 items-center justify-center rounded-full transition duration-300 hover:-translate-y-1 hover:scale-110 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 focus-visible:outline-none dark:focus-visible:ring-cyan-300 dark:focus-visible:ring-offset-black"
            href={logo.href}
            rel="noreferrer noopener"
            target="_blank"
            title={logo.title}
        >
            <span className="relative flex h-14 w-14 items-center justify-center text-[42px] transition duration-300 group-hover/item:drop-shadow-[0_10px_24px_currentColor]">
                {isImage ? (
                    <img
                        alt=""
                        className="h-11 w-11 object-contain"
                        draggable={false}
                        src={logo.src}
                    />
                ) : (
                    <span style={{ color: logo.color }}>{logo.node}</span>
                )}
            </span>
        </a>
    );
}

type TechStackSectionProps = {
    language: PortfolioLanguage;
};

export function TechStackSection({ language }: TechStackSectionProps) {
    const copy = techStackCopy[language];

    return (
        <section
            id="skills"
            className="relative flex min-h-screen overflow-hidden bg-white py-10 lg:min-h-[calc(100vh-88px)] lg:py-8 dark:bg-black"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-black" />

            <div className="relative z-10 flex w-full flex-col justify-center">
                <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
                    <div className="max-w-[650px]">
                        <motion.span
                            className="mb-4 inline-flex items-center gap-4 text-sm font-semibold tracking-[0.18em] text-violet-600 uppercase dark:text-violet-300"
                            initial={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.45 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <span className="h-1 w-10 rounded-full bg-violet-600 dark:bg-violet-300" />
                            {copy.eyebrow}
                        </motion.span>

                        <motion.h2
                            className="max-w-3xl bg-gradient-to-r from-slate-950 via-violet-700 to-cyan-500 bg-clip-text text-5xl leading-[0.98] font-black tracking-tight text-transparent md:text-6xl dark:from-white dark:via-violet-200 dark:to-cyan-300"
                            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                            transition={{
                                delay: 0.05,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            viewport={{ once: true, margin: '-80px' }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                        >
                            {copy.title}
                        </motion.h2>

                        <motion.p
                            className="mt-6 max-w-xl border-l-2 border-violet-500/80 py-0.5 pl-6 text-base leading-7 text-slate-600 dark:border-violet-300/70 dark:text-slate-400"
                            initial={{ opacity: 0, y: 16 }}
                            transition={{ delay: 0.18, duration: 0.55 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            {copy.description}
                        </motion.p>
                    </div>

                    <SkillIllustration />
                </div>

                <motion.div
                    className="mt-8 space-y-6 lg:mt-7"
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.24, duration: 0.6 }}
                    viewport={{ once: true, margin: '-80px' }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <LogoLoop
                        ariaLabel={copy.ariaStack}
                        direction="left"
                        fadeOut
                        gap={56}
                        hoverSpeed={18}
                        logoHeight={56}
                        logos={primaryLogos}
                        renderItem={(item) => TechLogoIcon(item, copy.ariaSite)}
                        scaleOnHover
                        speed={86}
                    />

                    <LogoLoop
                        ariaLabel={copy.ariaDatabase}
                        direction="right"
                        fadeOut
                        gap={56}
                        hoverSpeed={16}
                        logoHeight={56}
                        logos={secondaryLogos}
                        renderItem={(item) => TechLogoIcon(item, copy.ariaSite)}
                        scaleOnHover
                        speed={78}
                    />
                </motion.div>
            </div>
        </section>
    );
}
