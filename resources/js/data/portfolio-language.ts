export type PortfolioLanguage = 'en' | 'id';

export type PortfolioNavItem = {
    label: string;
    href: string;
};

export type PortfolioCommandItem = {
    action: string;
    label: string;
    type: 'action' | 'navigation' | 'page' | 'project';
};

export const defaultPortfolioLanguage: PortfolioLanguage = 'id';

export const portfolioCopy = {
    en: {
        command: {
            noResults: 'No results.',
            placeholder: 'Type a command or search...',
        },
        contactCta: 'Let’s Talk',
        footer: {
            copyright: 'All rights reserved.',
            description:
                'Building modern web applications, dashboards, CMS platforms, and interactive digital products with clean UI and scalable technical architecture.',
            eyebrow: 'Portfolio',
            primaryAction: 'Start Project',
            secondaryAction: 'View Work',
            title: 'Full-Stack Web Developer',
        },
        nav: [
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' },
        ],
        commands: [
            { label: 'Go Home', action: '#home', type: 'navigation' },
            { label: 'Go About', action: '#about', type: 'navigation' },
            { label: 'Go Skills', action: '#skills', type: 'navigation' },
            { label: 'Go Projects', action: '#projects', type: 'navigation' },
            { label: 'Go Contact', action: '#contact', type: 'navigation' },
            {
                label: 'Open KAWA AI',
                action: '/projects/kawa-ai',
                type: 'project',
            },
            {
                label: 'Open Cidurian Riverside',
                action: '/projects/cidurian-riverside',
                type: 'project',
            },
            {
                label: 'Open SMANTEN Portal',
                action: '/projects/smanten-portal',
                type: 'project',
            },
            {
                label: 'Open LinguaPath',
                action: '/projects/linguapath',
                type: 'project',
            },
            {
                label: 'Open Solvara Studio',
                action: '/projects/solvara-studio',
                type: 'project',
            },
            {
                label: 'Open MajorMind',
                action: '/projects/majormind',
                type: 'project',
            },
            { label: 'Open CV', action: '/cv', type: 'page' },
            { label: 'Copy Email', action: 'copy-email', type: 'action' },
        ],
    },
    id: {
        command: {
            noResults: 'Tidak ada hasil.',
            placeholder: 'Ketik perintah atau cari...',
        },
        contactCta: 'Mari Bicara',
        footer: {
            copyright: 'Seluruh hak cipta dilindungi.',
            description:
                'Membangun aplikasi web modern, dasbor, platform CMS, dan produk digital interaktif dengan UI bersih serta arsitektur teknis yang dapat diskalakan.',
            eyebrow: 'Portofolio',
            primaryAction: 'Mulai Proyek',
            secondaryAction: 'Lihat Karya',
            title: 'Pengembang Web Full-Stack',
        },
        nav: [
            { label: 'Beranda', href: '#home' },
            { label: 'Tentang', href: '#about' },
            { label: 'Keahlian', href: '#skills' },
            { label: 'Proyek', href: '#projects' },
            { label: 'Kontak', href: '#contact' },
        ],
        commands: [
            { label: 'Ke Beranda', action: '#home', type: 'navigation' },
            { label: 'Ke Tentang', action: '#about', type: 'navigation' },
            { label: 'Ke Keahlian', action: '#skills', type: 'navigation' },
            { label: 'Ke Proyek', action: '#projects', type: 'navigation' },
            { label: 'Ke Kontak', action: '#contact', type: 'navigation' },
            {
                label: 'Buka KAWA AI',
                action: '/projects/kawa-ai',
                type: 'project',
            },
            {
                label: 'Buka Cidurian Riverside',
                action: '/projects/cidurian-riverside',
                type: 'project',
            },
            {
                label: 'Buka SMANTEN Portal',
                action: '/projects/smanten-portal',
                type: 'project',
            },
            {
                label: 'Buka LinguaPath',
                action: '/projects/linguapath',
                type: 'project',
            },
            {
                label: 'Buka Solvara Studio',
                action: '/projects/solvara-studio',
                type: 'project',
            },
            {
                label: 'Buka MajorMind',
                action: '/projects/majormind',
                type: 'project',
            },
            { label: 'Buka CV', action: '/cv', type: 'page' },
            { label: 'Salin Email', action: 'copy-email', type: 'action' },
        ],
    },
} satisfies Record<
    PortfolioLanguage,
    {
        command: {
            noResults: string;
            placeholder: string;
        };
        commands: PortfolioCommandItem[];
        contactCta: string;
        footer: {
            copyright: string;
            description: string;
            eyebrow: string;
            primaryAction: string;
            secondaryAction: string;
            title: string;
        };
        nav: PortfolioNavItem[];
    }
>;
