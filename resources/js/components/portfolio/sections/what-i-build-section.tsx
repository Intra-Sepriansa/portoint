import { motion } from 'framer-motion';
import {
    BookOpen,
    Brain,
    FileText,
    Globe,
    GraduationCap,
    LayoutDashboard,
    Rocket,
    Server,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { cn } from '@/lib/utils';

const whatIBuildCopy = {
    en: {
        description:
            'From institutional websites to AI-powered platforms, I build focused web systems with mature interfaces, reliable logic, and interaction details that make products feel alive.',
        eyebrow: 'What I Build',
        items: [
            {
                accent: 'blue',
                description:
                    'Modern and interactive digital presence for educational institutions.',
                icon: GraduationCap,
                metric: '01',
                title: 'School and Institution Websites',
            },
            {
                accent: 'violet',
                description:
                    'Data-driven dashboards with analytics and role-based access.',
                icon: LayoutDashboard,
                metric: '02',
                title: 'Admin Dashboards',
            },
            {
                accent: 'emerald',
                description:
                    'Content management systems with intuitive editing interfaces.',
                icon: FileText,
                metric: '03',
                title: 'CMS Platforms',
            },
            {
                accent: 'fuchsia',
                description:
                    'Structured learning platforms with assessments and analytics.',
                icon: BookOpen,
                metric: '04',
                title: 'EdTech Applications',
            },
            {
                accent: 'amber',
                description:
                    'Intelligent automation with AI-assisted decision workflows.',
                icon: Brain,
                metric: '05',
                title: 'AI Workflow Systems',
            },
            {
                accent: 'sky',
                description:
                    'Algorithmic recommendation platforms with data visualization.',
                icon: Globe,
                metric: '06',
                title: 'Decision Support Systems',
            },
            {
                accent: 'rose',
                description:
                    'Scalable APIs with authentication, documentation, and testing.',
                icon: Server,
                metric: '07',
                title: 'Backend REST APIs',
            },
            {
                accent: 'lime',
                description:
                    'High-converting landing pages with animation and premium design.',
                icon: Rocket,
                metric: '08',
                title: 'Interactive Landing Pages',
            },
        ],
        title: 'Solutions I Build',
    },
    id: {
        description:
            'Dari situs web institusi hingga platform berbasis AI, saya membangun sistem web yang fokus dengan antarmuka matang, logika yang dapat diandalkan, dan detail interaksi yang membuat produk terasa hidup.',
        eyebrow: 'Yang Saya Bangun',
        items: [
            {
                accent: 'blue',
                description:
                    'Presensi digital modern dan interaktif untuk institusi pendidikan.',
                icon: GraduationCap,
                metric: '01',
                title: 'Situs Web Sekolah dan Institusi',
            },
            {
                accent: 'violet',
                description:
                    'Dasbor berbasis data dengan analitik dan akses sesuai peran.',
                icon: LayoutDashboard,
                metric: '02',
                title: 'Dasbor Admin',
            },
            {
                accent: 'emerald',
                description:
                    'Sistem manajemen konten dengan antarmuka pengeditan yang intuitif.',
                icon: FileText,
                metric: '03',
                title: 'Platform CMS',
            },
            {
                accent: 'fuchsia',
                description:
                    'Platform pembelajaran terstruktur dengan asesmen dan analitik.',
                icon: BookOpen,
                metric: '04',
                title: 'Aplikasi EdTech',
            },
            {
                accent: 'amber',
                description:
                    'Otomatisasi cerdas dengan alur keputusan berbantuan AI.',
                icon: Brain,
                metric: '05',
                title: 'Sistem Alur Kerja AI',
            },
            {
                accent: 'sky',
                description:
                    'Platform rekomendasi algoritmik dengan visualisasi data.',
                icon: Globe,
                metric: '06',
                title: 'Sistem Pendukung Keputusan',
            },
            {
                accent: 'rose',
                description:
                    'API yang dapat diskalakan dengan autentikasi, dokumentasi, dan pengujian.',
                icon: Server,
                metric: '07',
                title: 'Backend REST API',
            },
            {
                accent: 'lime',
                description:
                    'Halaman berkonversi tinggi dengan animasi dan desain premium.',
                icon: Rocket,
                metric: '08',
                title: 'Halaman Pembuka Interaktif',
            },
        ],
        title: 'Solusi yang Saya Buat',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        eyebrow: string;
        items: FeatureItem[];
        title: string;
    }
>;

const accentStyles: Record<
    string,
    {
        icon: string;
        iconWrap: string;
        metric: string;
        rule: string;
    }
> = {
    amber: {
        icon: 'text-amber-500',
        iconWrap:
            'bg-amber-50 ring-amber-200/80 dark:bg-amber-400/10 dark:ring-amber-300/20',
        metric: 'text-amber-500',
        rule: 'bg-amber-500',
    },
    blue: {
        icon: 'text-blue-500',
        iconWrap:
            'bg-blue-50 ring-blue-200/80 dark:bg-blue-400/10 dark:ring-blue-300/20',
        metric: 'text-blue-500',
        rule: 'bg-blue-500',
    },
    emerald: {
        icon: 'text-emerald-500',
        iconWrap:
            'bg-emerald-50 ring-emerald-200/80 dark:bg-emerald-400/10 dark:ring-emerald-300/20',
        metric: 'text-emerald-500',
        rule: 'bg-emerald-500',
    },
    fuchsia: {
        icon: 'text-fuchsia-500',
        iconWrap:
            'bg-fuchsia-50 ring-fuchsia-200/80 dark:bg-fuchsia-400/10 dark:ring-fuchsia-300/20',
        metric: 'text-fuchsia-500',
        rule: 'bg-fuchsia-500',
    },
    lime: {
        icon: 'text-lime-500',
        iconWrap:
            'bg-lime-50 ring-lime-200/80 dark:bg-lime-400/10 dark:ring-lime-300/20',
        metric: 'text-lime-500',
        rule: 'bg-lime-500',
    },
    rose: {
        icon: 'text-rose-500',
        iconWrap:
            'bg-rose-50 ring-rose-200/80 dark:bg-rose-400/10 dark:ring-rose-300/20',
        metric: 'text-rose-500',
        rule: 'bg-rose-500',
    },
    sky: {
        icon: 'text-sky-500',
        iconWrap:
            'bg-sky-50 ring-sky-200/80 dark:bg-sky-400/10 dark:ring-sky-300/20',
        metric: 'text-sky-500',
        rule: 'bg-sky-500',
    },
    violet: {
        icon: 'text-violet-500',
        iconWrap:
            'bg-violet-50 ring-violet-200/80 dark:bg-violet-400/10 dark:ring-violet-300/20',
        metric: 'text-violet-500',
        rule: 'bg-violet-500',
    },
};

type FeatureItem = {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
    accent: string;
    metric: string;
};

type FeatureCardProps = {
    item: FeatureItem;
    index: number;
};

function ProductIllustration() {
    return (
        <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 36, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto hidden h-[270px] w-full max-w-[660px] md:block lg:h-[315px]"
        >
            <div className="absolute inset-x-8 bottom-2 h-16 rounded-full bg-violet-200/45 blur-2xl dark:bg-violet-500/20" />
            <img
                src="/about.png"
                alt=""
                loading="lazy"
                draggable={false}
                className="relative h-full w-full [mask-image:radial-gradient(ellipse_86%_76%_at_55%_56%,#000_64%,transparent_100%)] object-contain object-center drop-shadow-[0_22px_45px_rgba(79,70,229,0.18)] dark:hidden"
            />
            <img
                src="/about-white.png"
                alt=""
                loading="lazy"
                draggable={false}
                className="relative hidden h-full w-full [mask-image:radial-gradient(ellipse_86%_76%_at_55%_56%,#000_64%,transparent_100%)] object-contain object-center drop-shadow-[0_22px_45px_rgba(167,139,250,0.22)] dark:block"
            />
        </motion.div>
    );
}

function FeatureCard({ item, index }: FeatureCardProps) {
    const styles = accentStyles[item.accent] ?? accentStyles.blue;
    const Icon = item.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
                delay: index * 0.045,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
                'group relative min-h-[128px] px-0 py-1 transition-transform duration-300 hover:-translate-y-1 sm:px-6 lg:px-8',
                index % 2 !== 0 &&
                    'sm:border-l sm:border-slate-200 dark:sm:border-white/10',
                index % 2 === 0 && 'sm:pl-0',
                index % 4 !== 0 &&
                    'lg:border-l lg:border-slate-200 dark:lg:border-white/10',
                index % 4 === 0 && 'lg:border-l-0 lg:pl-0',
            )}
        >
            <div className="mb-3 flex items-center gap-5">
                <div
                    className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105',
                        styles.iconWrap,
                    )}
                >
                    <Icon className={cn('h-6 w-6', styles.icon)} />
                </div>
                <span
                    className={cn(
                        'font-mono text-xs font-semibold tracking-[0.22em]',
                        styles.metric,
                    )}
                >
                    {item.metric}
                </span>
            </div>

            <h3 className="text-base leading-snug font-bold text-slate-950 dark:text-white">
                {item.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
            </p>
            <span
                className={cn(
                    'mt-3 block h-0.5 w-7 rounded-full transition-all duration-300 group-hover:w-12',
                    styles.rule,
                )}
            />
        </motion.article>
    );
}

type WhatIBuildSectionProps = {
    language: PortfolioLanguage;
};

export function WhatIBuildSection({ language }: WhatIBuildSectionProps) {
    const copy = whatIBuildCopy[language];

    return (
        <section className="relative flex min-h-screen overflow-hidden bg-white py-10 lg:min-h-[calc(100vh-88px)] lg:py-8 dark:bg-[#060612]">
            <div className="pointer-events-none absolute top-2 -left-12 h-72 w-60 bg-[radial-gradient(circle,rgba(99,102,241,0.18)_1.2px,transparent_1.2px)] [background-size:14px_14px] dark:opacity-25" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent dark:from-[#060612]" />

            <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-center px-6 lg:px-8">
                <div className="grid items-center gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="max-w-[640px]">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="mb-4 inline-flex items-center gap-4 text-sm font-semibold tracking-[0.18em] text-violet-600 uppercase dark:text-violet-300"
                        >
                            <span className="h-1 w-10 rounded-full bg-violet-600 dark:bg-violet-300" />
                            {copy.eyebrow}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                delay: 0.05,
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="max-w-3xl bg-gradient-to-r from-slate-950 via-violet-700 to-cyan-500 bg-clip-text text-5xl leading-[0.98] font-black tracking-tight text-transparent md:text-6xl dark:from-white dark:via-violet-200 dark:to-cyan-300"
                        >
                            {copy.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.18, duration: 0.55 }}
                            className="mt-6 max-w-xl border-l-2 border-violet-500/80 py-0.5 pl-6 text-base leading-7 text-slate-600 dark:border-violet-300/70 dark:text-slate-400"
                        >
                            {copy.description}
                        </motion.p>
                    </div>

                    <ProductIllustration />
                </div>

                <div className="mt-8 grid gap-y-8 sm:grid-cols-2 lg:mt-7 lg:grid-cols-4 lg:gap-y-9">
                    {copy.items.map((item, index) => (
                        <FeatureCard
                            key={item.title}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
