export type SkillCategory = {
    name: string;
    items: string[];
};

export const skillCategories: SkillCategory[] = [
    {
        name: 'Frontend',
        items: [
            'React',
            'TypeScript',
            'TailwindCSS',
            'Inertia.js',
            'Vite',
            'Framer Motion',
            'GSAP',
            'Three.js',
            'Recharts',
        ],
    },
    {
        name: 'Backend',
        items: [
            'Laravel',
            'Node.js',
            'Express',
            'REST API',
            'JWT',
            'Fortify',
            'Swagger',
        ],
    },
    {
        name: 'Database',
        items: ['MySQL', 'SQLite', 'Firebase'],
    },
    {
        name: 'Mobile',
        items: ['React Native', 'Expo'],
    },
    {
        name: 'Visualization',
        items: ['HLS.js', 'Leaflet', 'DomPDF', 'Recharts'],
    },
    {
        name: 'Tools',
        items: ['Git', 'GitHub', 'Postman', 'Figma', 'VS Code'],
    },
];
