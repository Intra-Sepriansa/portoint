import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    BriefcaseBusiness,
    Code2,
    Download,
    FileText,
    GraduationCap,
    MapPin,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CommandPalette } from '@/components/portfolio/command-palette';
import { Footer } from '@/components/portfolio/footer';
import { Navbar } from '@/components/portfolio/navbar';
import Folder from '@/components/portfolio/ui/folder';
import { PortfolioLetterSwapOverlay } from '@/components/portfolio/ui/portfolio-letter-swap-overlay';
import { ScrollProgress } from '@/components/portfolio/ui/scroll-progress';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { usePortfolioLanguage } from '@/hooks/use-portfolio-language';

const cvPageCopy = {
    en: {
        description:
            'Simple CV page for Intra Sepriansa, full-stack web developer and Universitas Pamulang student.',
        title: 'CV - Intra Sepriansa',
        eyebrow: 'Curriculum Vitae',
        name: 'Intra Sepriansa',
        role: 'Full-Stack Web Developer',
        summary:
            'Universitas Pamulang student focused on web apps, clean UI, and practical business systems.',
        location: 'Tangerang, Indonesia',
        education: 'Universitas Pamulang',
        available: 'Available for web projects',
        highlights: [
            {
                icon: Code2,
                label: 'Web Development',
                value: 'Laravel, React, Inertia',
            },
            {
                icon: FileText,
                label: 'Reports',
                value: 'Structured data and documentation',
            },
            {
                icon: BriefcaseBusiness,
                label: 'Operations',
                value: 'Store crew and daily reporting',
            },
        ],
        experienceTitle: 'Experience',
        experiences: [
            {
                company: 'Universitas Pamulang',
                role: 'Web Development',
                detail: 'Built and maintained web features for academic needs.',
            },
            {
                company: 'PT Sumber Alfaria Trijaya Tbk',
                role: 'Crew',
                detail: 'Handled store operations and prepared daily reports.',
            },
        ],
        skillsTitle: 'Skills',
        downloadTitle: 'Download',
        downloads: [
            {
                href: '/downloads/Intra_Sepriansa_CV_EN.pdf',
                label: 'CV English PDF',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_ID.pdf',
                label: 'CV Indonesia PDF',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_ATS_EN.docx',
                label: 'ATS English DOCX',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_ATS_ID.docx',
                label: 'ATS Indonesia DOCX',
            },
        ],
    },
    id: {
        description:
            'Halaman CV sederhana Intra Sepriansa, pengembang web full-stack dan mahasiswa Universitas Pamulang.',
        title: 'CV - Intra Sepriansa',
        eyebrow: 'Curriculum Vitae',
        name: 'Intra Sepriansa',
        role: 'Full-Stack Web Developer',
        summary:
            'Mahasiswa Universitas Pamulang yang fokus pada aplikasi web, UI bersih, dan sistem bisnis praktis.',
        location: 'Tangerang, Indonesia',
        education: 'Universitas Pamulang',
        available: 'Terbuka untuk proyek web',
        highlights: [
            {
                icon: Code2,
                label: 'Web Development',
                value: 'Laravel, React, Inertia',
            },
            {
                icon: FileText,
                label: 'Laporan',
                value: 'Data rapi dan dokumentasi',
            },
            {
                icon: BriefcaseBusiness,
                label: 'Operasional',
                value: 'Crew toko dan laporan harian',
            },
        ],
        experienceTitle: 'Pengalaman',
        experiences: [
            {
                company: 'Universitas Pamulang',
                role: 'Web Development',
                detail: 'Membuat dan merawat fitur web untuk kebutuhan akademik.',
            },
            {
                company: 'PT Sumber Alfaria Trijaya Tbk',
                role: 'Crew',
                detail: 'Menangani operasional toko dan membuat laporan harian.',
            },
        ],
        skillsTitle: 'Keahlian',
        downloadTitle: 'Download',
        downloads: [
            {
                href: '/downloads/Intra_Sepriansa_CV_ID.pdf',
                label: 'CV Indonesia PDF',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_EN.pdf',
                label: 'CV English PDF',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_ATS_ID.docx',
                label: 'ATS Indonesia DOCX',
            },
            {
                href: '/downloads/Intra_Sepriansa_CV_ATS_EN.docx',
                label: 'ATS English DOCX',
            },
        ],
    },
} satisfies Record<
    PortfolioLanguage,
    {
        available: string;
        description: string;
        downloadTitle: string;
        downloads: Array<{
            href: string;
            label: string;
        }>;
        education: string;
        eyebrow: string;
        experienceTitle: string;
        experiences: Array<{
            company: string;
            detail: string;
            role: string;
        }>;
        highlights: Array<{
            icon: typeof Code2;
            label: string;
            value: string;
        }>;
        location: string;
        name: string;
        role: string;
        skillsTitle: string;
        summary: string;
        title: string;
    }
>;

const skills = [
    'Laravel',
    'React',
    'Inertia.js',
    'TailwindCSS',
    'TypeScript',
    'MySQL',
    'REST API',
    'Documentation',
];

export default function Cv() {
    const [commandOpen, setCommandOpen] = useState(false);
    const [language, setLanguage, isLanguageChanging] = usePortfolioLanguage();
    const copy = cvPageCopy[language];

    const openCommand = useCallback(() => setCommandOpen(true), []);
    const closeCommand = useCallback(() => setCommandOpen(false), []);
    const folderItems = copy.downloads.slice(0, 3).map((download) => (
        <div
            key={download.href}
            className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center"
        >
            <FileText className="h-4 w-4 text-indigo-500" />
            <span className="text-[10px] leading-tight font-bold text-slate-700">
                {download.label.replace(' PDF', '').replace(' DOCX', '')}
            </span>
        </div>
    ));

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
            <Head title={copy.title}>
                <meta name="description" content={copy.description} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800"
                    rel="stylesheet"
                />
            </Head>

            <div
                data-portfolio-language-shell
                className="min-h-screen bg-white dark:bg-[#060612]"
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

                <main className="pt-28 pb-20 sm:pt-32">
                    <section id="cv" className="mx-auto max-w-6xl px-6">
                        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                            <motion.aside
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/[0.03]"
                            >
                                <div className="overflow-hidden rounded-lg bg-slate-200 dark:bg-white/10">
                                    <img
                                        src="/intra.jpeg"
                                        alt={copy.name}
                                        className="aspect-[4/5] w-full object-cover object-top"
                                    />
                                </div>

                                <div className="mt-5">
                                    <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                                        {copy.eyebrow}
                                    </p>
                                    <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 dark:text-white">
                                        {copy.name}
                                    </h1>
                                    <p className="mt-1 text-base font-semibold text-slate-600 dark:text-slate-300">
                                        {copy.role}
                                    </p>
                                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {copy.summary}
                                    </p>
                                </div>

                                <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-4 w-4 text-indigo-500" />
                                        <span>{copy.education}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-4 w-4 text-indigo-500" />
                                        <span>{copy.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BriefcaseBusiness className="h-4 w-4 text-indigo-500" />
                                        <span>{copy.available}</span>
                                    </div>
                                </div>
                            </motion.aside>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col gap-6"
                            >
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {copy.highlights.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.label}
                                                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.03]"
                                            >
                                                <Icon className="h-5 w-5 text-indigo-500" />
                                                <p className="mt-3 text-sm font-bold text-slate-950 dark:text-white">
                                                    {item.label}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                                    {item.value}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                                        {copy.experienceTitle}
                                    </h2>
                                    <div className="mt-4 divide-y divide-slate-200 dark:divide-white/10">
                                        {copy.experiences.map((experience) => (
                                            <div
                                                key={experience.company}
                                                className="py-4 first:pt-0 last:pb-0"
                                            >
                                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                    <p className="text-sm font-bold text-slate-950 dark:text-white">
                                                        {experience.role}
                                                    </p>
                                                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                                        {experience.company}
                                                    </p>
                                                </div>
                                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                    {experience.detail}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                                        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                                            {copy.skillsTitle}
                                        </h2>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
                                        <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                                            {copy.downloadTitle}
                                        </h2>
                                        <div className="flex h-36 items-center justify-center overflow-visible">
                                            <Folder
                                                color="#4F46E5"
                                                items={folderItems}
                                                size={1.22}
                                            />
                                        </div>
                                        <div className="mt-4 grid gap-2">
                                            {copy.downloads.map((download) => (
                                                <a
                                                    key={download.href}
                                                    href={download.href}
                                                    download
                                                    className="inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    <span>
                                                        {download.label}
                                                    </span>
                                                    <Download className="h-4 w-4 shrink-0" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>

                <Footer language={language} />
            </div>
        </>
    );
}
