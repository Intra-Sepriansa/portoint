import { motion } from 'framer-motion';
import {
    Monitor,
    PenTool,
    Rocket,
    Search,
    Server,
    ShieldCheck,
    TestTube,
    Users,
    Zap,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';

type ProcessStep = {
    asset: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
};

const approachCopy = {
    en: {
        description:
            'A structured workflow for turning ideas into mature, scalable, maintainable products from early research to production release.',
        eyebrow: 'Process',
        principles: [
            {
                icon: ShieldCheck,
                label: 'Quality Focus',
                text: 'Clean structure and reliable behavior.',
            },
            {
                icon: Zap,
                label: 'Fast Delivery',
                text: 'Efficient workflow without skipping what matters.',
            },
            {
                icon: Users,
                label: 'Clear Collaboration',
                text: 'Transparent updates and practical decisions.',
            },
        ],
        steps: [
            {
                asset: '1',
                description:
                    'Clarify goals, user needs, constraints, and scope before choosing the right technical direction.',
                icon: Search,
                title: 'Understand the Problem',
            },
            {
                asset: '2',
                description:
                    'Shape user flows, information architecture, data models, and screen hierarchy into a build-ready product plan.',
                icon: PenTool,
                title: 'Design the Workflow',
            },
            {
                asset: '3',
                description:
                    'Create responsive React interfaces with mature interactions, clean composition, and reusable UI structure.',
                icon: Monitor,
                title: 'Build the Interface',
            },
            {
                asset: '4',
                description:
                    'Implement Laravel logic, APIs, authentication, database relationships, and admin flows with clear boundaries.',
                icon: Server,
                title: 'Develop the Backend',
            },
            {
                asset: '5',
                description:
                    'Validate critical flows, reduce friction, improve performance, and refine details through focused iteration.',
                icon: TestTube,
                title: 'Test and Improve',
            },
            {
                asset: '6',
                description:
                    'Prepare production releases, monitor reliability, handle feedback, and keep products ready for real users.',
                icon: Rocket,
                title: 'Launch and Maintain',
            },
        ],
        titleEnd: 'Approach',
        titleLead: 'My',
        titleHighlight: 'Development',
    },
    id: {
        description:
            'Alur kerja terstruktur untuk mengubah ide menjadi produk yang matang, dapat diskalakan, dan mudah dirawat dari riset awal hingga rilis produksi.',
        eyebrow: 'Proses',
        principles: [
            {
                icon: ShieldCheck,
                label: 'Fokus Kualitas',
                text: 'Struktur rapi dan perilaku yang dapat diandalkan.',
            },
            {
                icon: Zap,
                label: 'Pengiriman Cepat',
                text: 'Alur kerja efisien tanpa melewati hal penting.',
            },
            {
                icon: Users,
                label: 'Kolaborasi Jelas',
                text: 'Update transparan dan keputusan yang praktis.',
            },
        ],
        steps: [
            {
                asset: '1',
                description:
                    'Memperjelas tujuan, kebutuhan pengguna, batasan, dan cakupan proyek sebelum memilih arah teknis yang tepat.',
                icon: Search,
                title: 'Pahami Masalah',
            },
            {
                asset: '2',
                description:
                    'Membentuk alur pengguna, arsitektur informasi, model data, dan hierarki layar menjadi rencana produk yang siap dibangun.',
                icon: PenTool,
                title: 'Rancang Alur Kerja',
            },
            {
                asset: '3',
                description:
                    'Membuat antarmuka React yang responsif dengan interaksi matang, komposisi rapi, dan struktur UI yang dapat digunakan ulang.',
                icon: Monitor,
                title: 'Bangun Antarmuka',
            },
            {
                asset: '4',
                description:
                    'Mengimplementasikan logika Laravel, API, autentikasi, relasi database, dan alur admin dengan batas yang jelas.',
                icon: Server,
                title: 'Kembangkan Backend',
            },
            {
                asset: '5',
                description:
                    'Memvalidasi alur penting, mengurangi hambatan, meningkatkan performa, dan merapikan detail lewat iterasi terarah.',
                icon: TestTube,
                title: 'Uji dan Tingkatkan',
            },
            {
                asset: '6',
                description:
                    'Menyiapkan rilis produksi, memantau reliabilitas, menangani masukan, dan menjaga produk siap dipakai pengguna nyata.',
                icon: Rocket,
                title: 'Rilis dan Rawat',
            },
        ],
        titleEnd: 'Saya',
        titleLead: 'Pendekatan',
        titleHighlight: 'Pengembangan',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        eyebrow: string;
        principles: Array<{
            icon: ComponentType<{ className?: string }>;
            label: string;
            text: string;
        }>;
        steps: ProcessStep[];
        titleEnd: string;
        titleHighlight: string;
        titleLead: string;
    }
>;

function ProcessAsset({ asset, title }: Pick<ProcessStep, 'asset' | 'title'>) {
    const imageClass =
        'absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_26px_48px_rgba(79,70,229,0.18)] dark:drop-shadow-[0_26px_48px_rgba(129,140,248,0.22)]';

    return (
        <motion.div
            aria-hidden="true"
            className="relative h-48 min-h-0 sm:h-56 lg:h-60"
            initial={{ opacity: 0, scale: 0.92, y: 34 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.45, once: false }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
        >
            <img
                alt=""
                className={`${imageClass} dark:hidden`}
                draggable={false}
                loading="lazy"
                src={`/process/${asset}b.png`}
            />
            <img
                alt=""
                className={`${imageClass} hidden dark:block`}
                draggable={false}
                loading="lazy"
                src={`/process/${asset}.png`}
            />
            <span className="sr-only">{title}</span>
        </motion.div>
    );
}

type DevelopmentApproachSectionProps = {
    language: PortfolioLanguage;
};

export function DevelopmentApproachSection({
    language,
}: DevelopmentApproachSectionProps) {
    const copy = approachCopy[language];

    return (
        <section
            id="process"
            className="relative overflow-hidden bg-white py-24 text-slate-950 md:py-28 dark:bg-black dark:text-white"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-black" />

            <div className="relative z-10 mx-auto max-w-[1500px] px-6 lg:px-10">
                <motion.div
                    className="mx-auto max-w-4xl text-center"
                    initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ amount: 0.5, once: false }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                >
                    <div className="mb-5 flex items-center justify-center gap-4 text-sm font-bold tracking-[0.22em] text-violet-600 uppercase dark:text-violet-300">
                        <span className="h-1 w-8 rounded-full bg-violet-600 dark:bg-violet-300" />
                        {copy.eyebrow}
                        <span className="h-1 w-8 rounded-full bg-violet-600 dark:bg-violet-300" />
                    </div>
                    <h2 className="text-4xl leading-[1.02] font-black tracking-tight md:text-6xl">
                        {copy.titleLead}{' '}
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-300 dark:to-cyan-300">
                            {copy.titleHighlight}
                        </span>{' '}
                        {copy.titleEnd}
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-400">
                        {copy.description}
                    </p>
                </motion.div>

                <div className="relative mt-14 lg:mt-16">
                    <div className="grid gap-x-8 gap-y-14 lg:grid-cols-3">
                        {copy.steps.map((step, index) => (
                            <motion.article
                                key={step.title}
                                className="relative"
                                initial={{
                                    opacity: 0,
                                    y: index < 3 ? 34 : -34,
                                    filter: 'blur(8px)',
                                }}
                                transition={{
                                    delay: index * 0.055,
                                    duration: 0.62,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                viewport={{ amount: 0.35, once: false }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                            >
                                <div className="grid grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] items-end gap-2">
                                    <div className="relative z-10 pb-8">
                                        <div className="mb-5 flex items-center gap-3">
                                            <span className="flex h-9 min-w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-black text-white shadow-[0_12px_30px_rgba(124,58,237,0.35)]">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-violet-600 shadow-sm shadow-slate-950/5 dark:border-white/10 dark:text-violet-300 dark:shadow-none">
                                                <step.icon className="h-5 w-5" />
                                            </span>
                                        </div>
                                        <h3 className="text-lg leading-snug font-extrabold text-slate-950 dark:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="mt-3 max-w-[16rem] text-sm leading-7 text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>

                                    <ProcessAsset
                                        asset={step.asset}
                                        title={step.title}
                                    />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="mt-16 grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3 dark:border-white/10"
                    initial={{ opacity: 0, y: 24 }}
                    transition={{ delay: 0.12, duration: 0.55 }}
                    viewport={{ amount: 0.55, once: false }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    {copy.principles.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-4 md:border-r md:border-slate-200 md:last:border-r-0 dark:md:border-white/10"
                        >
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:bg-violet-300/10 dark:text-violet-300">
                                <item.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="text-sm font-bold text-slate-950 dark:text-white">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
