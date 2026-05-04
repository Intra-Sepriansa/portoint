import type { PortfolioLanguage } from '@/data/portfolio-language';

type ProjectCopy = {
    category: string;
    challenges: string[];
    features: string[];
    overview: string;
    problem: string;
    result: string;
    role: string;
    shortDescription: string;
    solution: string;
    uiHighlights: string[];
};

export type Project = {
    id: number;
    slug: string;
    name: string;
    translations?: Partial<Record<PortfolioLanguage, ProjectCopy>>;
    techStack: string[];
    previewImage?: string;
    links: {
        demo?: string;
        github?: string;
    };
} & ProjectCopy;

export const projects: Project[] = [
    {
        id: 5,
        slug: 'cidurian-riverside',
        name: 'Cidurian Riverside',
        category: 'Website Cafe & Reservasi',
        shortDescription:
            'Website cafe dan resto pinggir sungai dengan halaman visual, menu, galeri, reservasi, pelacakan pesanan, keranjang, dan CTA WhatsApp.',
        overview:
            'Cidurian Riverside adalah website cafe dan resto yang menonjolkan suasana tempat, informasi menu, galeri, reservasi, pelacakan pesanan, dan jalur kontak cepat melalui WhatsApp.',
        role: 'Saya membangun pengalaman website yang fokus pada konversi pengunjung menjadi reservasi atau pesanan, dengan navigasi jelas, tampilan menu, alur keranjang, dan CTA yang mudah dijangkau.',
        features: [
            'Halaman pembuka visual',
            'Daftar menu',
            'Galeri tempat',
            'Reservasi online',
            'Pelacakan pesanan',
            'CTA WhatsApp',
        ],
        techStack: [
            'Laravel',
            'React',
            'Inertia.js',
            'TailwindCSS',
            'Vite',
            'WhatsApp Integration',
        ],
        problem:
            'Cafe membutuhkan kanal digital yang bisa menunjukkan suasana tempat sekaligus mempermudah pelanggan melihat menu, melakukan reservasi, dan menghubungi admin.',
        solution:
            'Membuat website yang menggabungkan visual tempat, navigasi menu, reservasi, pelacakan, dan tombol WhatsApp agar pelanggan bisa mengambil tindakan tanpa alur yang rumit.',
        uiHighlights: [
            'Hero visual dengan identitas cafe',
            'Navigasi kategori yang mudah dipindai',
            'Tombol reservasi dan WhatsApp yang menonjol',
            'Tampilan keranjang dan pelacakan pesanan',
        ],
        challenges: [
            'Menjaga tampilan visual tetap kuat tanpa menghambat akses ke menu dan reservasi',
            'Menyusun CTA agar tidak saling berebut perhatian',
            'Membuat struktur halaman tetap nyaman untuk desktop dan mobile',
            'Menghubungkan alur pemesanan dengan kontak WhatsApp secara praktis',
        ],
        result: 'Menghasilkan website cafe yang lebih siap digunakan untuk promosi, reservasi, dan komunikasi pelanggan secara langsung.',
        previewImage: '/project/ciper.png',
        translations: {
            en: {
                category: 'Cafe & Reservation Website',
                shortDescription:
                    'A riverside cafe and restaurant website with visual landing, menu, gallery, reservations, order tracking, cart, and WhatsApp CTA.',
                overview:
                    'Cidurian Riverside is a cafe and restaurant website that highlights the venue atmosphere, menu information, gallery, reservations, order tracking, and fast contact through WhatsApp.',
                role: 'I built a website experience focused on converting visitors into reservations or orders, with clear navigation, menu views, cart flow, and easy-to-reach calls to action.',
                features: [
                    'Visual landing page',
                    'Menu listing',
                    'Venue gallery',
                    'Online reservation',
                    'Order tracking',
                    'WhatsApp CTA',
                ],
                problem:
                    'The cafe needed a digital channel that could show the venue atmosphere while making it easier for customers to view the menu, reserve a table, and contact the admin.',
                solution:
                    'Built a website that combines venue visuals, menu navigation, reservations, tracking, and WhatsApp actions so customers can move forward without a complicated flow.',
                uiHighlights: [
                    'Visual hero with cafe identity',
                    'Easy-to-scan category navigation',
                    'Prominent reservation and WhatsApp buttons',
                    'Cart and order tracking interface',
                ],
                challenges: [
                    'Keeping the visuals strong without blocking access to menu and reservation actions',
                    'Arranging CTAs so they do not compete with each other',
                    'Keeping the page structure comfortable on desktop and mobile',
                    'Connecting the ordering flow with WhatsApp contact in a practical way',
                ],
                result: 'Delivered a cafe website ready for promotion, reservations, and direct customer communication.',
            },
        },
        links: {},
    },
    {
        id: 1,
        slug: 'kawa-ai',
        name: 'KAWA AI',
        category: 'Sistem Pemantauan AI',
        shortDescription:
            'Platform berbasis web, seluler, dan API untuk memantau, meninjau, serta mengelola pelanggaran mahasiswa dengan alur kerja berbantuan AI.',
        overview:
            'KAWA AI adalah platform pemantauan pelanggaran mahasiswa berbasis web, seluler, dan API backend. Sistem ini membantu administrator kampus, kepala program studi, dosen, dan mahasiswa memantau, mencatat, meninjau, serta menindaklanjuti pelanggaran mahasiswa dalam alur kerja yang terstruktur.',
        role: 'Saya membangun dasbor multi-role, sistem manajemen data mahasiswa, pemantauan CCTV berbasis HLS, alur kerja peninjauan pelanggaran, alur tanggapan mahasiswa, dan integrasi alur kerja berbantuan AI untuk mengidentifikasi pelanggar.',
        features: [
            'Dasbor multi-role',
            'Manajemen pelanggaran mahasiswa',
            'Pemantauan CCTV berbasis HLS',
            'Alur kerja identifikasi berbantuan AI',
            'Autentikasi JWT',
            'Dokumentasi API Swagger',
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
            'Institusi kampus belum memiliki sistem terstruktur untuk memantau, mencatat, dan menindaklanjuti pelanggaran mahasiswa. Proses manual membuat data tidak konsisten dan respons menjadi lambat.',
        solution:
            'Membangun solusi multi-platform dengan dasbor web, aplikasi seluler, dan API backend yang mengotomatiskan pelacakan pelanggaran, mengintegrasikan pemantauan CCTV, dan memakai alur kerja identifikasi berbantuan AI.',
        uiHighlights: [
            'Antarmuka pemantauan CCTV real-time',
            'Dasbor multi-role dengan tampilan sesuai peran',
            'Linimasa pelanggaran dengan pelacakan status',
            'Alur tanggapan mahasiswa yang responsif di perangkat seluler',
        ],
        challenges: [
            'Mengimplementasikan streaming video HLS real-time di browser',
            'Membangun sistem autentikasi multi-role yang aman dengan JWT',
            'Mengintegrasikan alur kerja identifikasi AI dengan proses tinjauan manual',
            'Menyinkronkan data antara platform web dan seluler',
        ],
        result: 'Berhasil merilis sistem manajemen pelanggaran yang komprehensif, mengurangi waktu respons, dan meningkatkan akuntabilitas antar pemangku kepentingan kampus.',
        translations: {
            en: {
                category: 'AI Monitoring System',
                shortDescription:
                    'A web, mobile, and API-based platform for monitoring, reviewing, and managing student violations with AI-assisted workflows.',
                overview:
                    'KAWA AI is a web, mobile, and backend API platform for student violation monitoring. It helps campus administrators, heads of study programs, lecturers, and students track, record, review, and follow up on violations through a structured workflow.',
                role: 'I built the multi-role dashboard, student data management system, HLS-based CCTV monitoring, violation review workflow, student response flow, and AI-assisted identification workflow.',
                features: [
                    'Multi-role dashboard',
                    'Student violation management',
                    'HLS-based CCTV monitoring',
                    'AI-assisted identification workflow',
                    'JWT authentication',
                    'Swagger API documentation',
                ],
                problem:
                    'The campus did not have a structured system for monitoring, recording, and following up on student violations. Manual processes made data inconsistent and slowed down response time.',
                solution:
                    'Built a multi-platform solution with a web dashboard, mobile app, and backend API that automates violation tracking, integrates CCTV monitoring, and supports AI-assisted identification workflows.',
                uiHighlights: [
                    'Real-time CCTV monitoring interface',
                    'Role-aware multi-role dashboard',
                    'Violation timeline with status tracking',
                    'Mobile-responsive student response flow',
                ],
                challenges: [
                    'Implementing real-time HLS video streaming in the browser',
                    'Building secure multi-role authentication with JWT',
                    'Integrating AI identification with a manual review process',
                    'Synchronizing data across web and mobile platforms',
                ],
                result: 'Released a comprehensive violation management system that reduced response time and improved accountability across campus stakeholders.',
            },
        },
        links: {},
    },
    {
        id: 2,
        slug: 'smanten-portal',
        name: 'SMANTEN Portal',
        category: 'Situs Web Sekolah / CMS',
        shortDescription:
            'Platform situs web sekolah modern dengan halaman pembuka interaktif, admin CMS, alumni hub, animasi, dan pengalaman visual 3D.',
        overview:
            'SMANTEN Portal adalah platform web sekolah modern untuk SMAN 1 Tenjo yang menggabungkan halaman pembuka interaktif, portal informasi, admin CMS, alumni hub, dan pengalaman visual dengan animasi serta elemen 3D.',
        role: 'Saya merancang dan mengembangkan antarmuka web premium dengan animasi, tata letak bento grid, navigasi palet perintah, galeri interaktif, peta alumni, dan dasbor admin.',
        features: [
            'Halaman pembuka interaktif',
            'Dasbor admin CMS',
            'Alumni hub',
            'Galeri interaktif',
            'Peta alumni',
            'Animasi scroll lanjutan',
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
            'Situs web sekolah tradisional cenderung statis, tertinggal, dan kurang mampu menarik perhatian siswa, alumni, serta masyarakat luas. Sekolah membutuhkan presensi digital modern yang mencerminkan identitasnya.',
        solution:
            'Membuat platform sekolah yang visualnya kaya dan interaktif, dilengkapi CMS, fitur jaringan alumni, serta desain premium yang menaikkan standar situs web institusi.',
        uiHighlights: [
            'Tata letak bento grid untuk bagian konten',
            'Navigasi palet perintah',
            'Peta alumni interaktif dengan Leaflet',
            'Elemen visual 3D di bagian hero',
        ],
        challenges: [
            'Menyeimbangkan animasi yang kaya dengan performa halaman',
            'Membangun CMS yang intuitif untuk administrator sekolah non-teknis',
            'Mengimplementasikan peta interaktif dengan data alumni',
            'Membuat elemen 3D responsif yang berjalan baik di berbagai perangkat',
        ],
        result: 'Menghasilkan platform sekolah modern yang memperkuat presensi digital institusi dan meningkatkan keterlibatan siswa, orang tua, serta alumni.',
        previewImage: '/project-previews/smanten-portal.png',
        translations: {
            en: {
                category: 'School Website / CMS',
                shortDescription:
                    'A modern school website platform with an interactive landing page, admin CMS, alumni hub, animation, and 3D visual experience.',
                overview:
                    'SMANTEN Portal is a modern school web platform for SMAN 1 Tenjo that combines an interactive landing page, information portal, admin CMS, alumni hub, and animation-driven 3D visual experience.',
                role: 'I designed and developed a premium web interface with animation, bento layouts, command palette navigation, interactive gallery, alumni map, and admin dashboard.',
                features: [
                    'Interactive landing page',
                    'Admin CMS dashboard',
                    'Alumni hub',
                    'Interactive gallery',
                    'Alumni map',
                    'Advanced scroll animation',
                ],
                problem:
                    'Traditional school websites are often static, outdated, and less engaging for students, alumni, and the wider community. The school needed a modern digital presence that reflected its identity.',
                solution:
                    'Created a visually rich and interactive school platform with CMS capabilities, alumni network features, and premium design that raises the standard for institutional websites.',
                uiHighlights: [
                    'Bento grid layout for content sections',
                    'Command palette navigation',
                    'Interactive alumni map with Leaflet',
                    '3D visual elements in the hero section',
                ],
                challenges: [
                    'Balancing rich animation with page performance',
                    'Building an intuitive CMS for non-technical school administrators',
                    'Implementing an interactive map with alumni data',
                    'Making responsive 3D elements work across devices',
                ],
                result: 'Delivered a modern school platform that strengthened the institution’s digital presence and improved engagement with students, parents, and alumni.',
            },
        },
        links: {
            demo: 'https://smanten.sepriansatech.com',
        },
    },
    {
        id: 3,
        slug: 'linguapath',
        name: 'LinguaPath',
        category: 'Platform EdTech',
        shortDescription:
            'Platform EdTech untuk pembelajaran bergaya TOEFL ITP dengan jalur 60 hari, modul latihan, simulasi ujian, dan analitik pembelajaran.',
        overview:
            'LinguaPath adalah aplikasi EdTech untuk pembelajaran bahasa Inggris dan latihan bergaya TOEFL ITP. Platform ini membantu pengguna belajar melalui modul terstruktur, tinjauan kosakata, simulasi, latihan speaking, latihan writing, dan pelacakan progres.',
        role: 'Saya membangun pengalaman belajar terstruktur dari sisi frontend dan backend, termasuk alur belajar pengguna, dasbor, dan manajemen konten admin.',
        features: [
            'Jalur belajar 60 hari',
            'Modul latihan TOEFL',
            'Simulasi ujian',
            'Jurnal kesalahan',
            'Dasbor progres',
            'Manajemen konten admin',
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
            'Siswa yang mempersiapkan TOEFL ITP kekurangan platform latihan yang terstruktur, terjangkau, dan interaktif. Banyak alat yang ada terlalu mahal atau belum memiliki analitik pembelajaran yang memadai.',
        solution:
            'Membangun platform EdTech komprehensif dengan jalur belajar 60 hari, simulasi ujian realistis, pelacakan kesalahan, dan analitik progres visual agar siswa dapat belajar lebih efektif.',
        uiHighlights: [
            'Jalur belajar visual dengan progres harian',
            'Antarmuka simulasi ujian interaktif',
            'Dasbor analitik dengan Recharts',
            'Jurnal kesalahan dengan tinjauan berkategori',
        ],
        challenges: [
            'Merancang jalur belajar 60 hari yang terstruktur dengan progres yang tepat',
            'Membangun simulasi ujian TOEFL yang realistis dengan pengatur waktu',
            'Mengimplementasikan analitik pembelajaran yang komprehensif',
            'Membuat antarmuka admin yang intuitif untuk manajemen konten',
        ],
        result: 'Membuat platform EdTech yang fungsional penuh untuk persiapan TOEFL terstruktur, hasil belajar terukur, dan pelacakan progres yang detail.',
        previewImage: '/project/linguapath.png',
        translations: {
            en: {
                category: 'EdTech Platform',
                shortDescription:
                    'An EdTech platform for TOEFL ITP-style learning with a 60-day path, practice modules, exam simulation, and learning analytics.',
                overview:
                    'LinguaPath is an EdTech application for English learning and TOEFL ITP-style practice. It helps users learn through structured modules, vocabulary review, simulations, speaking practice, writing practice, and progress tracking.',
                role: 'I built the structured learning experience across frontend and backend, including the user learning flow, dashboard, and admin content management.',
                features: [
                    '60-day learning path',
                    'TOEFL practice modules',
                    'Exam simulation',
                    'Mistake journal',
                    'Progress dashboard',
                    'Admin content management',
                ],
                problem:
                    'Students preparing for TOEFL ITP lacked a structured, affordable, and interactive practice platform. Many existing tools were expensive or did not provide enough learning analytics.',
                solution:
                    'Built a comprehensive EdTech platform with a 60-day learning path, realistic exam simulation, mistake tracking, and visual progress analytics to help students learn more effectively.',
                uiHighlights: [
                    'Visual learning path with daily progress',
                    'Interactive exam simulation interface',
                    'Analytics dashboard with Recharts',
                    'Categorized mistake journal review',
                ],
                challenges: [
                    'Designing a structured 60-day learning path with accurate progression',
                    'Building a realistic timed TOEFL exam simulation',
                    'Implementing comprehensive learning analytics',
                    'Creating an intuitive admin interface for content management',
                ],
                result: 'Created a fully functional EdTech platform for structured TOEFL preparation, measurable learning outcomes, and detailed progress tracking.',
            },
        },
        links: {
            demo: 'https://lp.sepriansatech.com/login',
        },
    },
    {
        id: 6,
        slug: 'solvara-studio',
        name: 'Solvara Studio',
        category: 'Digital Solution Studio',
        shortDescription:
            'Website studio digital untuk layanan web, mobile, network, server, CCTV, dan ISP-ready support bagi kebutuhan bisnis.',
        overview:
            'Solvara Studio adalah website studio solusi digital yang memperkenalkan layanan web, mobile, jaringan, server, CCTV, dan dukungan ISP-ready dalam satu pengalaman landing page yang tegas, modern, dan mudah diarahkan ke konsultasi.',
        role: 'Saya membangun tampilan landing page yang menonjolkan positioning layanan, navigasi bahasa, CTA konsultasi, struktur layanan, serta visual brand yang kuat untuk membuat calon klien cepat memahami nilai Solvara Studio.',
        features: [
            'Landing page studio digital',
            'Navigasi layanan',
            'CTA konsultasi gratis',
            'Dukungan bilingual',
            'Highlight layanan jaringan dan server',
            'Arah kontak WhatsApp',
        ],
        techStack: [
            'Laravel',
            'React',
            'Inertia.js',
            'TypeScript',
            'TailwindCSS',
            'Vite',
            'Fortify',
            'Responsive UI',
        ],
        problem:
            'Bisnis sering membutuhkan partner teknis yang bisa menangani kebutuhan web, mobile, jaringan, server, CCTV, dan ISP support, tetapi informasi layanan sering tersebar dan sulit dipahami calon klien.',
        solution:
            'Menyusun website studio dengan pesan utama yang langsung terbaca, kategori layanan yang jelas, visual modern, dan CTA konsultasi yang mudah ditemukan agar calon klien bisa segera memulai diskusi.',
        uiHighlights: [
            'Hero besar dengan pesan layanan multi-disiplin',
            'Navbar gelap dengan bahasa dan CTA utama',
            'Aksen hijau neon sebagai identitas brand',
            'Screenshot hero yang kuat untuk first impression',
        ],
        challenges: [
            'Menjaga pesan layanan tetap luas tanpa terasa terlalu ramai',
            'Membuat CTA konsultasi tampil menonjol di antara navigasi',
            'Menyeimbangkan tone teknis dengan komunikasi bisnis yang mudah dipahami',
            'Menampilkan layanan infrastruktur dan produk digital dalam satu narasi visual',
        ],
        result: 'Menghasilkan website studio yang siap menjadi pintu masuk konsultasi untuk kebutuhan web, mobile, jaringan, server, CCTV, dan dukungan ISP-ready.',
        previewImage: '/project/Solvara Studio.png',
        translations: {
            en: {
                category: 'Digital Solution Studio',
                shortDescription:
                    'A digital studio website for web, mobile, network, server, CCTV, and ISP-ready business support.',
                overview:
                    'Solvara Studio is a digital solution studio website that introduces web, mobile, network, server, CCTV, and ISP-ready support in a clear, modern landing page experience that points visitors toward consultation.',
                role: "I built the landing page experience around service positioning, language navigation, consultation CTAs, service structure, and strong brand visuals so potential clients can quickly understand Solvara Studio's value.",
                features: [
                    'Digital studio landing page',
                    'Service navigation',
                    'Free consultation CTA',
                    'Bilingual support',
                    'Network and server service highlights',
                    'WhatsApp contact path',
                ],
                problem:
                    'Businesses often need a technical partner for web, mobile, network, server, CCTV, and ISP support, but service information is often scattered and hard for potential clients to understand.',
                solution:
                    'Structured a studio website with a clear headline, readable service categories, modern visuals, and easy-to-find consultation CTAs so potential clients can start a conversation quickly.',
                uiHighlights: [
                    'Large hero with multidisciplinary service messaging',
                    'Dark navbar with language controls and primary CTA',
                    'Neon green accents for brand identity',
                    'Strong hero screenshot for first impression',
                ],
                challenges: [
                    'Keeping the service message broad without making it feel crowded',
                    'Making the consultation CTA stand out among navigation elements',
                    'Balancing technical service depth with business-friendly communication',
                    'Presenting infrastructure services and digital products in one visual narrative',
                ],
                result: 'Delivered a studio website ready to become the entry point for web, mobile, network, server, CCTV, and ISP-ready consultation needs.',
            },
        },
        links: {},
    },
    {
        id: 4,
        slug: 'majormind',
        name: 'MajorMind',
        category: 'Sistem Pendukung Keputusan Enterprise',
        shortDescription:
            'Platform DSS untuk rekomendasi jurusan berbasis psikometri, AHP-TOPSIS, validasi konsistensi, dan Explainable AI.',
        overview:
            'MajorMind adalah Sistem Pendukung Keputusan untuk membantu mahasiswa dan calon mahasiswa memilih jurusan secara rasional berdasarkan bukti. Sistem ini menggabungkan asesmen psikometri, pemodelan preferensi, komputasi AHP-TOPSIS, dan penjelasan natural agar rekomendasi tidak berhenti pada skor, tetapi juga dapat dipahami alasan logisnya.',
        role: 'Saya membangun pengalaman end-to-end dari halaman pembuka, asesmen kognitif adaptif, mesin rekomendasi AHP-TOPSIS, validasi Consistency Ratio, dashboard insight, visualisasi hasil, hingga penjelasan rekomendasi yang mudah dibaca pengguna.',
        features: [
            'Asesmen RIASEC dan Grit',
            'Perhitungan AHP-TOPSIS',
            'Validasi Consistency Ratio',
            'Explainable AI untuk alasan rekomendasi',
            'Dashboard radar dan heatmap',
            'Visualisasi neural network',
        ],
        techStack: [
            'Laravel',
            'React',
            'TypeScript',
            'Inertia.js',
            'TailwindCSS',
            'Vite',
            'Framer Motion',
            'GSAP',
            'Chart.js',
            'SQLite',
            'DomPDF',
        ],
        problem:
            'Pemilihan jurusan sering dipengaruhi bias kognitif, gengsi, tekanan sosial, atau paksaan lingkungan. Keputusan seperti ini berisiko menyebabkan salah jurusan, pemborosan biaya pendidikan, burnout, dan ketidakpuasan akademik.',
        solution:
            'Mengubah proses pemilihan jurusan menjadi analisis berbasis data dengan asesmen psikometri, pembobotan AHP, pemeringkatan TOPSIS, serta XAI yang menjelaskan kenapa sebuah jurusan lebih sesuai dibanding opsi lain.',
        uiHighlights: [
            'Antarmuka asesmen adaptif dengan transisi halus',
            'Dashboard hasil dengan radar chart dan sensitivity heatmap',
            'Panel rekomendasi dengan penjelasan natural',
            'Visualisasi interaktif bergaya cyber-premium',
        ],
        challenges: [
            'Mengimplementasikan AHP dan TOPSIS secara akurat dalam alur aplikasi web',
            'Mendeteksi konsistensi jawaban pengguna melalui Consistency Ratio',
            'Menerjemahkan hasil matematis menjadi insight yang mudah dipahami',
            'Menjaga pengalaman visual interaktif tetap responsif dan nyaman digunakan',
        ],
        result: 'Menghasilkan platform DSS yang membantu pengguna memilih jurusan dengan rekomendasi transparan, terukur, dan dapat dijelaskan secara rasional.',
        previewImage: '/project/majormind.png',
        translations: {
            en: {
                category: 'Enterprise Decision Support System',
                shortDescription:
                    'A DSS platform for major recommendations using psychometrics, AHP-TOPSIS, consistency validation, and Explainable AI.',
                overview:
                    'MajorMind is a Decision Support System that helps students and prospective students choose majors rationally based on evidence. It combines psychometric assessment, preference modeling, AHP-TOPSIS computation, and natural explanations so recommendations are not only scores but also logically understandable.',
                role: 'I built the end-to-end experience from landing page, adaptive cognitive assessment, AHP-TOPSIS recommendation engine, Consistency Ratio validation, insight dashboard, result visualization, and readable recommendation explanations.',
                features: [
                    'RIASEC and Grit assessments',
                    'AHP-TOPSIS computation',
                    'Consistency Ratio validation',
                    'Explainable AI for recommendation reasoning',
                    'Radar and heatmap dashboard',
                    'Neural network visualization',
                ],
                problem:
                    'Major selection is often influenced by cognitive bias, prestige, social pressure, or family expectations. These decisions can lead to mismatched majors, wasted education costs, burnout, and academic dissatisfaction.',
                solution:
                    'Turned major selection into data-driven analysis through psychometric assessment, AHP weighting, TOPSIS ranking, and XAI explanations that show why one major fits better than another.',
                uiHighlights: [
                    'Adaptive assessment interface with smooth transitions',
                    'Result dashboard with radar chart and sensitivity heatmap',
                    'Recommendation panel with natural explanations',
                    'Cyber-premium interactive visualization',
                ],
                challenges: [
                    'Implementing AHP and TOPSIS accurately in a web application flow',
                    'Detecting answer consistency through Consistency Ratio',
                    'Translating mathematical results into understandable insights',
                    'Keeping interactive visuals responsive and comfortable to use',
                ],
                result: 'Delivered a DSS platform that helps users choose majors with transparent, measurable, and rationally explainable recommendations.',
            },
        },
        links: {},
    },
];

export const featuredProjects = projects.filter(
    (project) => project.slug !== 'kawa-ai' && project.slug !== 'majormind',
);

export function localizeProject(
    project: Project,
    language: PortfolioLanguage,
): Project {
    const translation = project.translations?.[language];

    if (!translation) {
        return project;
    }

    return {
        ...project,
        ...translation,
    };
}

export function localizeProjects(
    projectList: Project[],
    language: PortfolioLanguage,
): Project[] {
    return projectList.map((project) => localizeProject(project, language));
}
