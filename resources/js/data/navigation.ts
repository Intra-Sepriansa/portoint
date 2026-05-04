export type NavItem = {
    label: string;
    href: string;
};

export const navItems: NavItem[] = [
    { label: 'Beranda', href: '#home' },
    { label: 'Tentang', href: '#about' },
    { label: 'Keahlian', href: '#skills' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Kontak', href: '#contact' },
];

export const commandItems = [
    { label: 'Ke Beranda', action: '#home', type: 'navigation' as const },
    { label: 'Ke Tentang', action: '#about', type: 'navigation' as const },
    { label: 'Ke Keahlian', action: '#skills', type: 'navigation' as const },
    {
        label: 'Ke Proyek',
        action: '#projects',
        type: 'navigation' as const,
    },
    {
        label: 'Ke Kontak',
        action: '#contact',
        type: 'navigation' as const,
    },
    {
        label: 'Buka KAWA AI',
        action: '/projects/kawa-ai',
        type: 'project' as const,
    },
    {
        label: 'Buka SMANTEN Portal',
        action: '/projects/smanten-portal',
        type: 'project' as const,
    },
    {
        label: 'Buka LinguaPath',
        action: '/projects/linguapath',
        type: 'project' as const,
    },
    {
        label: 'Buka Solvara Studio',
        action: '/projects/solvara-studio',
        type: 'project' as const,
    },
    {
        label: 'Buka MajorMind',
        action: '/projects/majormind',
        type: 'project' as const,
    },
    { label: 'Salin Email', action: 'copy-email', type: 'action' as const },
];
