export type Project = {
    id: number;
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    overview: string;
    role: string;
    features: string[];
    techStack: string[];
    problem: string;
    solution: string;
    uiHighlights: string[];
    challenges: string[];
    result: string;
    links: {
        demo?: string;
        github?: string;
    };
};

export const projects: Project[] = [
    {
        id: 1,
        slug: 'kawa-ai',
        name: 'KAWA AI',
        category: 'AI Monitoring System',
        shortDescription:
            'A web, mobile, and API-based platform for monitoring, reviewing, and managing student violations with AI-assisted workflows.',
        overview:
            'KAWA AI is a web, mobile, and backend API-based student violation monitoring platform. The system helps campus admins, heads of study programs, lecturers, and students monitor, record, review, and follow up on student violations in a structured workflow.',
        role: 'I built the multi-role dashboard, student data management system, HLS-based CCTV monitoring, violation review workflow, student response flow, and AI-assisted workflow integration for identifying violators.',
        features: [
            'Multi-role dashboard',
            'Student violation management',
            'HLS CCTV monitoring',
            'AI-assisted identification workflow',
            'JWT authentication',
            'Swagger API documentation',
        ],
        techStack: [
            'React',
            'TypeScript',
            'TailwindCSS',
            'Vite',
            'Node.js',
            'Express',
            'MySQL',
            'JWT',
            'Swagger',
            'HLS.js',
            'React Native',
            'Expo',
        ],
        problem:
            'Campus institutions lacked a structured system to monitor, record, and follow up on student violations. Manual processes led to inconsistencies and delayed responses.',
        solution:
            'Built a multi-platform solution with web dashboard, mobile app, and API backend that automates violation tracking, integrates CCTV monitoring, and uses AI-assisted identification workflows.',
        uiHighlights: [
            'Real-time CCTV monitoring interface',
            'Multi-role dashboard with role-based views',
            'Violation timeline with status tracking',
            'Mobile-responsive student response flow',
        ],
        challenges: [
            'Implementing real-time HLS video streaming in the browser',
            'Building a secure multi-role authentication system with JWT',
            'Integrating AI identification workflow with manual review process',
            'Syncing data between web and mobile platforms',
        ],
        result: 'Successfully deployed a comprehensive violation management system that reduced response time and improved accountability across campus stakeholders.',
        links: {},
    },
    {
        id: 2,
        slug: 'smanten-portal',
        name: 'SMANTEN Portal',
        category: 'School Website / CMS',
        shortDescription:
            'A modern school website platform with interactive landing page, CMS admin, alumni hub, animation, and 3D visual experience.',
        overview:
            'SMANTEN Portal is a modern school web platform for SMAN 1 Tenjo that combines an interactive landing page, information portal, CMS admin, alumni hub, and visual experience powered by animation and 3D elements.',
        role: 'I designed and developed a premium web interface using animation, bento grid layouts, command palette navigation, interactive gallery, alumni map, and admin dashboard.',
        features: [
            'Interactive landing page',
            'CMS admin dashboard',
            'Alumni hub',
            'Interactive gallery',
            'Alumni map',
            'Advanced scroll animation',
        ],
        techStack: [
            'Laravel',
            'React',
            'TypeScript',
            'Inertia.js',
            'TailwindCSS',
            'Vite',
            'Three.js',
            'Framer Motion',
            'GSAP',
            'Leaflet',
            'MySQL',
        ],
        problem:
            'Traditional school websites are static, outdated, and fail to engage students, alumni, and the wider community. Schools need a modern digital presence that reflects their identity.',
        solution:
            'Created a visually rich, interactive school platform with CMS capabilities, alumni network features, and a premium design that sets a new standard for institutional websites.',
        uiHighlights: [
            'Bento grid layout for content sections',
            'Command palette navigation',
            'Interactive alumni map with Leaflet',
            '3D visual elements in hero section',
        ],
        challenges: [
            'Balancing rich animations with page performance',
            'Building an intuitive CMS for non-technical school admins',
            'Implementing interactive map with alumni data',
            'Creating responsive 3D elements that work across devices',
        ],
        result: 'Delivered a modern school platform that elevated the digital presence of the institution and improved engagement with students, parents, and alumni.',
        links: {},
    },
    {
        id: 3,
        slug: 'linguapath',
        name: 'LinguaPath',
        category: 'EdTech Platform',
        shortDescription:
            'An EdTech platform for TOEFL ITP-style learning with a 60-day path, practice modules, exam simulation, and learning analytics.',
        overview:
            'LinguaPath is an EdTech application for English learning and TOEFL ITP-style practice. The platform helps users learn through structured modules, vocabulary review, simulation, speaking practice, writing practice, and progress tracking.',
        role: 'I built a structured learning experience from both frontend and backend perspectives, including user learning flow, dashboard, and admin content management.',
        features: [
            '60-day learning path',
            'TOEFL practice modules',
            'Exam simulation',
            'Mistake journal',
            'Progress dashboard',
            'Admin content management',
        ],
        techStack: [
            'Laravel',
            'React',
            'Inertia.js',
            'TailwindCSS',
            'Vite',
            'Fortify',
            'SQLite',
            'MySQL',
            'Pest',
            'Recharts',
        ],
        problem:
            'Students preparing for TOEFL ITP lack structured, affordable, and interactive practice platforms. Most existing tools are either too expensive or lack proper learning analytics.',
        solution:
            'Built a comprehensive EdTech platform with structured 60-day learning paths, real exam simulation, mistake tracking, and visual progress analytics to help students prepare effectively.',
        uiHighlights: [
            'Visual learning path with daily progress',
            'Interactive exam simulation interface',
            'Analytics dashboard with Recharts',
            'Mistake journal with categorized review',
        ],
        challenges: [
            'Designing a 60-day structured learning path with proper progression',
            'Building realistic TOEFL exam simulation with timing',
            'Implementing comprehensive learning analytics',
            'Creating an intuitive admin interface for content management',
        ],
        result: 'Created a fully functional EdTech platform that provides structured TOEFL preparation with measurable learning outcomes and detailed progress tracking.',
        links: {},
    },
    {
        id: 4,
        slug: 'majormind',
        name: 'MajorMind',
        category: 'Decision Support System',
        shortDescription:
            'A major recommendation platform using assessment, psychometrics, AHP-TOPSIS, and explainable recommendations.',
        overview:
            'MajorMind is a decision support system-based major recommendation platform that helps students choose college majors based on assessment, psychometrics, and algorithmic calculation.',
        role: 'I built the interactive landing page, assessment system, result dashboard, data visualization, PDF report generation, and insight panel that explains the reasoning behind each recommendation.',
        features: [
            'Interactive assessment',
            'AHP-TOPSIS workflow',
            'Result dashboard',
            'Data visualization',
            'Explainable recommendation',
            'PDF report generation',
        ],
        techStack: [
            'Laravel',
            'React',
            'TypeScript',
            'Inertia.js',
            'TailwindCSS',
            'Vite',
            'Three.js',
            'Framer Motion',
            'Recharts',
            'Firebase',
            'DomPDF',
        ],
        problem:
            'Students struggle to choose the right college major, often relying on subjective opinions rather than structured assessment. This leads to mismatched career paths and academic dissatisfaction.',
        solution:
            'Developed a data-driven recommendation platform using AHP-TOPSIS methodology with interactive assessments, clear visualizations, and explainable results to help students make informed decisions.',
        uiHighlights: [
            'Interactive assessment wizard',
            'Result dashboard with radar charts',
            'Explainable recommendation panel',
            'PDF report with detailed analysis',
        ],
        challenges: [
            'Implementing AHP-TOPSIS algorithm accurately in a web application',
            'Making complex algorithmic results understandable to students',
            'Generating professional PDF reports with DomPDF',
            'Building an interactive and engaging assessment experience',
        ],
        result: 'Delivered a decision support platform that helps students make data-driven major choices with transparent, explainable recommendations and professional report generation.',
        links: {},
    },
];
