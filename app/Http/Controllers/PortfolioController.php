<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * @var array<int, array{
     *     id: int,
     *     slug: string,
     *     name: string,
     *     category: string,
     *     shortDescription: string,
     *     overview: string,
     *     role: string,
     *     features: list<string>,
     *     techStack: list<string>,
     *     problem: string,
     *     solution: string,
     *     uiHighlights: list<string>,
     *     challenges: list<string>,
     *     result: string,
     *     previewImage?: string,
     *     links: array{demo?: string, github?: string}
     * }>
     */
    private array $projects = [
        [
            'id' => 5,
            'slug' => 'cidurian-riverside',
            'name' => 'Cidurian Riverside',
            'category' => 'Website Cafe & Reservasi',
            'shortDescription' => 'Website cafe dan resto pinggir sungai dengan halaman visual, menu, galeri, reservasi, pelacakan pesanan, keranjang, dan CTA WhatsApp.',
            'overview' => 'Cidurian Riverside adalah website cafe dan resto yang menonjolkan suasana tempat, informasi menu, galeri, reservasi, pelacakan pesanan, dan jalur kontak cepat melalui WhatsApp.',
            'role' => 'Saya membangun pengalaman website yang fokus pada konversi pengunjung menjadi reservasi atau pesanan, dengan navigasi jelas, tampilan menu, alur keranjang, dan CTA yang mudah dijangkau.',
            'features' => ['Halaman pembuka visual', 'Daftar menu', 'Galeri tempat', 'Reservasi online', 'Pelacakan pesanan', 'CTA WhatsApp'],
            'techStack' => ['Laravel', 'React', 'Inertia.js', 'TailwindCSS', 'Vite', 'WhatsApp Integration'],
            'problem' => 'Cafe membutuhkan kanal digital yang bisa menunjukkan suasana tempat sekaligus mempermudah pelanggan melihat menu, melakukan reservasi, dan menghubungi admin.',
            'solution' => 'Membuat website yang menggabungkan visual tempat, navigasi menu, reservasi, pelacakan, dan tombol WhatsApp agar pelanggan bisa mengambil tindakan tanpa alur yang rumit.',
            'uiHighlights' => ['Hero visual dengan identitas cafe', 'Navigasi kategori yang mudah dipindai', 'Tombol reservasi dan WhatsApp yang menonjol', 'Tampilan keranjang dan pelacakan pesanan'],
            'challenges' => ['Menjaga tampilan visual tetap kuat tanpa menghambat akses ke menu dan reservasi', 'Menyusun CTA agar tidak saling berebut perhatian', 'Membuat struktur halaman tetap nyaman untuk desktop dan mobile', 'Menghubungkan alur pemesanan dengan kontak WhatsApp secara praktis'],
            'result' => 'Menghasilkan website cafe yang lebih siap digunakan untuk promosi, reservasi, dan komunikasi pelanggan secara langsung.',
            'previewImage' => '/project/ciper.png',
            'links' => [],
        ],
        [
            'id' => 1,
            'slug' => 'kawa-ai',
            'name' => 'KAWA AI',
            'category' => 'Sistem Pemantauan AI',
            'shortDescription' => 'Platform berbasis web, seluler, dan API untuk memantau, meninjau, serta mengelola pelanggaran mahasiswa dengan alur kerja berbantuan AI.',
            'overview' => 'KAWA AI adalah platform pemantauan pelanggaran mahasiswa berbasis web, seluler, dan API backend. Sistem ini membantu administrator kampus, kepala program studi, dosen, dan mahasiswa memantau, mencatat, meninjau, serta menindaklanjuti pelanggaran mahasiswa dalam alur kerja yang terstruktur.',
            'role' => 'Saya membangun dasbor multi-role, sistem manajemen data mahasiswa, pemantauan CCTV berbasis HLS, alur kerja peninjauan pelanggaran, alur tanggapan mahasiswa, dan integrasi alur kerja berbantuan AI untuk mengidentifikasi pelanggar.',
            'features' => ['Dasbor multi-role', 'Manajemen pelanggaran mahasiswa', 'Pemantauan CCTV berbasis HLS', 'Alur kerja identifikasi berbantuan AI', 'Autentikasi JWT', 'Dokumentasi API Swagger'],
            'techStack' => ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Node.js', 'Express', 'MySQL', 'JWT', 'Swagger', 'HLS.js', 'React Native', 'Expo'],
            'problem' => 'Institusi kampus belum memiliki sistem terstruktur untuk memantau, mencatat, dan menindaklanjuti pelanggaran mahasiswa. Proses manual membuat data tidak konsisten dan respons menjadi lambat.',
            'solution' => 'Membangun solusi multi-platform dengan dasbor web, aplikasi seluler, dan API backend yang mengotomatiskan pelacakan pelanggaran, mengintegrasikan pemantauan CCTV, dan memakai alur kerja identifikasi berbantuan AI.',
            'uiHighlights' => ['Antarmuka pemantauan CCTV real-time', 'Dasbor multi-role dengan tampilan sesuai peran', 'Linimasa pelanggaran dengan pelacakan status', 'Alur tanggapan mahasiswa yang responsif di perangkat seluler'],
            'challenges' => ['Mengimplementasikan streaming video HLS real-time di browser', 'Membangun sistem autentikasi multi-role yang aman dengan JWT', 'Mengintegrasikan alur kerja identifikasi AI dengan proses tinjauan manual', 'Menyinkronkan data antara platform web dan seluler'],
            'result' => 'Berhasil merilis sistem manajemen pelanggaran yang komprehensif, mengurangi waktu respons, dan meningkatkan akuntabilitas antar pemangku kepentingan kampus.',
            'links' => [],
        ],
        [
            'id' => 2,
            'slug' => 'smanten-portal',
            'name' => 'SMANTEN Portal',
            'category' => 'Situs Web Sekolah / CMS',
            'shortDescription' => 'Platform situs web sekolah modern dengan halaman pembuka interaktif, admin CMS, alumni hub, animasi, dan pengalaman visual 3D.',
            'overview' => 'SMANTEN Portal adalah platform web sekolah modern untuk SMAN 1 Tenjo yang menggabungkan halaman pembuka interaktif, portal informasi, admin CMS, alumni hub, dan pengalaman visual dengan animasi serta elemen 3D.',
            'role' => 'Saya merancang dan mengembangkan antarmuka web premium dengan animasi, tata letak bento grid, navigasi palet perintah, galeri interaktif, peta alumni, dan dasbor admin.',
            'features' => ['Halaman pembuka interaktif', 'Dasbor admin CMS', 'Alumni hub', 'Galeri interaktif', 'Peta alumni', 'Animasi scroll lanjutan'],
            'techStack' => ['Laravel', 'React', 'TypeScript', 'Inertia.js', 'TailwindCSS', 'Vite', 'Three.js', 'Framer Motion', 'GSAP', 'Leaflet', 'MySQL'],
            'problem' => 'Situs web sekolah tradisional cenderung statis, tertinggal, dan kurang mampu menarik perhatian siswa, alumni, serta masyarakat luas.',
            'solution' => 'Membuat platform sekolah yang visualnya kaya dan interaktif, dilengkapi CMS, fitur jaringan alumni, serta desain premium.',
            'uiHighlights' => ['Tata letak bento grid untuk bagian konten', 'Navigasi palet perintah', 'Peta alumni interaktif dengan Leaflet', 'Elemen visual 3D di bagian hero'],
            'challenges' => ['Menyeimbangkan animasi yang kaya dengan performa halaman', 'Membangun CMS yang intuitif untuk administrator sekolah non-teknis', 'Mengimplementasikan peta interaktif dengan data alumni', 'Membuat elemen 3D responsif yang berjalan baik di berbagai perangkat'],
            'result' => 'Menghasilkan platform sekolah modern yang memperkuat presensi digital institusi dan meningkatkan keterlibatan siswa, orang tua, serta alumni.',
            'previewImage' => '/project-previews/smanten-portal.png',
            'links' => [
                'demo' => 'https://smanten.sepriansatech.com',
            ],
        ],
        [
            'id' => 3,
            'slug' => 'linguapath',
            'name' => 'LinguaPath',
            'category' => 'Platform EdTech',
            'shortDescription' => 'Platform EdTech untuk pembelajaran bergaya TOEFL ITP dengan jalur 60 hari, modul latihan, simulasi ujian, dan analitik pembelajaran.',
            'overview' => 'LinguaPath adalah aplikasi EdTech untuk pembelajaran bahasa Inggris dan latihan bergaya TOEFL ITP. Platform ini membantu pengguna belajar melalui modul terstruktur, tinjauan kosakata, simulasi, latihan speaking, latihan writing, dan pelacakan progres.',
            'role' => 'Saya membangun pengalaman belajar terstruktur dari sisi frontend dan backend, termasuk alur belajar pengguna, dasbor, dan manajemen konten admin.',
            'features' => ['Jalur belajar 60 hari', 'Modul latihan TOEFL', 'Simulasi ujian', 'Jurnal kesalahan', 'Dasbor progres', 'Manajemen konten admin'],
            'techStack' => ['Laravel', 'React', 'Inertia.js', 'TailwindCSS', 'Vite', 'Fortify', 'SQLite', 'MySQL', 'Pest', 'Recharts'],
            'problem' => 'Siswa yang mempersiapkan TOEFL ITP kekurangan platform latihan yang terstruktur, terjangkau, dan interaktif.',
            'solution' => 'Membangun platform EdTech komprehensif dengan jalur belajar 60 hari, simulasi ujian realistis, pelacakan kesalahan, dan analitik progres visual.',
            'uiHighlights' => ['Jalur belajar visual dengan progres harian', 'Antarmuka simulasi ujian interaktif', 'Dasbor analitik dengan Recharts', 'Jurnal kesalahan dengan tinjauan berkategori'],
            'challenges' => ['Merancang jalur belajar 60 hari yang terstruktur dengan progres yang tepat', 'Membangun simulasi ujian TOEFL yang realistis dengan pengatur waktu', 'Mengimplementasikan analitik pembelajaran yang komprehensif', 'Membuat antarmuka admin yang intuitif untuk manajemen konten'],
            'result' => 'Membuat platform EdTech yang fungsional penuh untuk persiapan TOEFL terstruktur, hasil belajar terukur, dan pelacakan progres yang detail.',
            'previewImage' => '/project/linguapath.png',
            'links' => [
                'demo' => 'https://lp.sepriansatech.com/login',
            ],
        ],
        [
            'id' => 6,
            'slug' => 'solvara-studio',
            'name' => 'Solvara Studio',
            'category' => 'Digital Solution Studio',
            'shortDescription' => 'Website studio digital untuk layanan web, mobile, network, server, CCTV, dan ISP-ready support bagi kebutuhan bisnis.',
            'overview' => 'Solvara Studio adalah website studio solusi digital yang memperkenalkan layanan web, mobile, jaringan, server, CCTV, dan dukungan ISP-ready dalam satu pengalaman landing page yang tegas, modern, dan mudah diarahkan ke konsultasi.',
            'role' => 'Saya membangun tampilan landing page yang menonjolkan positioning layanan, navigasi bahasa, CTA konsultasi, struktur layanan, serta visual brand yang kuat untuk membuat calon klien cepat memahami nilai Solvara Studio.',
            'features' => ['Landing page studio digital', 'Navigasi layanan', 'CTA konsultasi gratis', 'Dukungan bilingual', 'Highlight layanan jaringan dan server', 'Arah kontak WhatsApp'],
            'techStack' => ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'TailwindCSS', 'Vite', 'Fortify', 'Responsive UI'],
            'problem' => 'Bisnis sering membutuhkan partner teknis yang bisa menangani kebutuhan web, mobile, jaringan, server, CCTV, dan ISP support, tetapi informasi layanan sering tersebar dan sulit dipahami calon klien.',
            'solution' => 'Menyusun website studio dengan pesan utama yang langsung terbaca, kategori layanan yang jelas, visual modern, dan CTA konsultasi yang mudah ditemukan agar calon klien bisa segera memulai diskusi.',
            'uiHighlights' => ['Hero besar dengan pesan layanan multi-disiplin', 'Navbar gelap dengan bahasa dan CTA utama', 'Aksen hijau neon sebagai identitas brand', 'Screenshot hero yang kuat untuk first impression'],
            'challenges' => ['Menjaga pesan layanan tetap luas tanpa terasa terlalu ramai', 'Membuat CTA konsultasi tampil menonjol di antara navigasi', 'Menyeimbangkan tone teknis dengan komunikasi bisnis yang mudah dipahami', 'Menampilkan layanan infrastruktur dan produk digital dalam satu narasi visual'],
            'result' => 'Menghasilkan website studio yang siap menjadi pintu masuk konsultasi untuk kebutuhan web, mobile, jaringan, server, CCTV, dan dukungan ISP-ready.',
            'previewImage' => '/project/Solvara Studio.png',
            'links' => [],
        ],
        [
            'id' => 4,
            'slug' => 'majormind',
            'name' => 'MajorMind',
            'category' => 'Sistem Pendukung Keputusan Enterprise',
            'shortDescription' => 'Platform DSS untuk rekomendasi jurusan berbasis psikometri, AHP-TOPSIS, validasi konsistensi, dan Explainable AI.',
            'overview' => 'MajorMind adalah Sistem Pendukung Keputusan untuk membantu mahasiswa dan calon mahasiswa memilih jurusan secara rasional berdasarkan bukti. Sistem ini menggabungkan asesmen psikometri, pemodelan preferensi, komputasi AHP-TOPSIS, dan penjelasan natural agar rekomendasi tidak berhenti pada skor, tetapi juga dapat dipahami alasan logisnya.',
            'role' => 'Saya membangun pengalaman end-to-end dari halaman pembuka, asesmen kognitif adaptif, mesin rekomendasi AHP-TOPSIS, validasi Consistency Ratio, dashboard insight, visualisasi hasil, hingga penjelasan rekomendasi yang mudah dibaca pengguna.',
            'features' => ['Asesmen RIASEC dan Grit', 'Perhitungan AHP-TOPSIS', 'Validasi Consistency Ratio', 'Explainable AI untuk alasan rekomendasi', 'Dashboard radar dan heatmap', 'Visualisasi neural network'],
            'techStack' => ['Laravel', 'React', 'TypeScript', 'Inertia.js', 'TailwindCSS', 'Vite', 'Framer Motion', 'GSAP', 'Chart.js', 'SQLite', 'DomPDF'],
            'problem' => 'Pemilihan jurusan sering dipengaruhi bias kognitif, gengsi, tekanan sosial, atau paksaan lingkungan. Keputusan seperti ini berisiko menyebabkan salah jurusan, pemborosan biaya pendidikan, burnout, dan ketidakpuasan akademik.',
            'solution' => 'Mengubah proses pemilihan jurusan menjadi analisis berbasis data dengan asesmen psikometri, pembobotan AHP, pemeringkatan TOPSIS, serta XAI yang menjelaskan kenapa sebuah jurusan lebih sesuai dibanding opsi lain.',
            'uiHighlights' => ['Antarmuka asesmen adaptif dengan transisi halus', 'Dashboard hasil dengan radar chart dan sensitivity heatmap', 'Panel rekomendasi dengan penjelasan natural', 'Visualisasi interaktif bergaya cyber-premium'],
            'challenges' => ['Mengimplementasikan AHP dan TOPSIS secara akurat dalam alur aplikasi web', 'Mendeteksi konsistensi jawaban pengguna melalui Consistency Ratio', 'Menerjemahkan hasil matematis menjadi insight yang mudah dipahami', 'Menjaga pengalaman visual interaktif tetap responsif dan nyaman digunakan'],
            'result' => 'Menghasilkan platform DSS yang membantu pengguna memilih jurusan dengan rekomendasi transparan, terukur, dan dapat dijelaskan secara rasional.',
            'previewImage' => '/project/majormind.png',
            'links' => [],
        ],
    ];

    public function home(): Response
    {
        return Inertia::render('home');
    }

    public function projects(): Response
    {
        return Inertia::render('projects/index');
    }

    public function projectShow(string $slug): Response
    {
        $project = collect($this->projects)->firstWhere('slug', $slug);

        if (! $project) {
            abort(404);
        }

        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }
}
