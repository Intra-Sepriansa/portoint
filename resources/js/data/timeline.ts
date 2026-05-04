import type { PortfolioLanguage } from '@/data/portfolio-language';

export type TimelineItem = {
    period: string;
    title: string;
    description: string;
};

export const timelineItems: TimelineItem[] = [
    {
        period: 'Tahap Awal',
        title: 'Belajar dan Membangun Proyek Web',
        description:
            'Mulai mengeksplorasi teknologi web, belajar HTML, CSS, JavaScript, dan PHP untuk membangun fondasi proyek web.',
    },
    {
        period: 'Bertumbuh',
        title: 'Membangun Sistem Terkait Kampus',
        description:
            'Mengembangkan sistem manajemen dan pemantauan kampus dengan dasbor multi-role, API, dan integrasi seluler.',
    },
    {
        period: 'Ekspansi',
        title: 'Mengembangkan Platform Situs Web Sekolah',
        description:
            'Membuat situs web sekolah modern dengan CMS, UI interaktif, animasi, dan pengalaman visual 3D.',
    },
    {
        period: 'Spesialisasi',
        title: 'Membuat Aplikasi EdTech dan SPK',
        description:
            'Membangun platform pembelajaran terstruktur dan sistem rekomendasi berbasis data dengan analitik serta alur kerja algoritmik.',
    },
    {
        period: 'Saat Ini',
        title: 'Pengembangan Produk Full-Stack',
        description:
            'Mengembangkan produk full-stack yang lebih komprehensif dengan framework modern, alur kerja AI, dan arsitektur yang dapat diskalakan.',
    },
];

export const timelineItemsByLanguage = {
    en: [
        {
            period: 'Early Stage',
            title: 'Learning and Building Web Projects',
            description:
                'Started exploring web technologies and learned HTML, CSS, JavaScript, and PHP to build a foundation for web projects.',
        },
        {
            period: 'Growth',
            title: 'Building Campus-Related Systems',
            description:
                'Developed campus management and monitoring systems with multi-role dashboards, APIs, and mobile integration.',
        },
        {
            period: 'Expansion',
            title: 'Developing School Website Platforms',
            description:
                'Created modern school websites with CMS capabilities, interactive UI, animation, and 3D visual experiences.',
        },
        {
            period: 'Specialization',
            title: 'Creating EdTech and DSS Applications',
            description:
                'Built structured learning platforms and data-driven recommendation systems with analytics and algorithmic workflows.',
        },
        {
            period: 'Now',
            title: 'Full-Stack Product Development',
            description:
                'Developing more comprehensive full-stack products with modern frameworks, AI workflows, and scalable architecture.',
        },
    ],
    id: timelineItems,
} satisfies Record<PortfolioLanguage, TimelineItem[]>;
