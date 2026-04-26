export type NavItem = {
    label: string;
    href: string;
};

export const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];

export const commandItems = [
    { label: 'Go to Home', action: '#home', type: 'navigation' as const },
    { label: 'Go to About', action: '#about', type: 'navigation' as const },
    { label: 'Go to Skills', action: '#skills', type: 'navigation' as const },
    {
        label: 'Go to Projects',
        action: '#projects',
        type: 'navigation' as const,
    },
    {
        label: 'Go to Services',
        action: '#services',
        type: 'navigation' as const,
    },
    {
        label: 'Go to Contact',
        action: '#contact',
        type: 'navigation' as const,
    },
    {
        label: 'Open KAWA AI',
        action: '/projects/kawa-ai',
        type: 'project' as const,
    },
    {
        label: 'Open SMANTEN Portal',
        action: '/projects/smanten-portal',
        type: 'project' as const,
    },
    {
        label: 'Open LinguaPath',
        action: '/projects/linguapath',
        type: 'project' as const,
    },
    {
        label: 'Open MajorMind',
        action: '/projects/majormind',
        type: 'project' as const,
    },
    { label: 'Copy Email', action: 'copy-email', type: 'action' as const },
];
