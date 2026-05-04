<?php

use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;

test('home page renders the portfolio landing page', function () {
    $response = get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('home'));
});

test('contact page renders the contact screen', function () {
    $response = get(route('contact'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('contact'));
});

test('cv page renders the simple cv screen', function () {
    $response = get(route('cv'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('cv'));
});

test('projects page renders the portfolio project gallery', function () {
    $response = get(route('projects.index'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/index'));
});

test('portfolio hero reveal assets are available', function () {
    expect(is_file(public_path('about.png')))->toBeTrue();
    expect(is_file(public_path('person.png')))->toBeTrue();
    expect(is_file(public_path('person-light.png')))->toBeTrue();
    expect(is_file(public_path('reveal.png')))->toBeTrue();
    expect(is_file(public_path('reveal-dark.png')))->toBeTrue();
});

test('portfolio browser tab uses the cropped logo favicon', function () {
    $shell = file_get_contents(resource_path('views/app.blade.php'));

    expect(is_file(public_path('image.png')))->toBeTrue();
    expect(is_file(public_path('intra-favicon.png')))->toBeTrue();
    expect(is_file(public_path('intra-apple-touch-icon.png')))->toBeTrue();
    expect(getimagesize(public_path('image.png')))->toMatchArray([399, 564]);
    expect(getimagesize(public_path('intra-favicon.png')))->toMatchArray([512, 512]);
    expect(getimagesize(public_path('intra-apple-touch-icon.png')))->toMatchArray([180, 180]);

    expect($shell)
        ->toContain('<link rel="icon" href="/intra-favicon.png?v=20260503" type="image/png">')
        ->toContain('<link rel="apple-touch-icon" href="/intra-apple-touch-icon.png?v=20260503">')
        ->not->toContain('/intra-favicon.ico')
        ->not->toContain('/favicon.ico"')
        ->not->toContain('/favicon.png"')
        ->not->toContain('/favicon.svg');
});

test('portfolio uses the current instagram profile link', function () {
    $socials = file_get_contents(resource_path('js/data/socials.ts'));
    $hero = file_get_contents(resource_path('js/components/portfolio/sections/hero-section.tsx'));

    expect($socials)
        ->toContain('https://www.instagram.com/intravert__')
        ->toContain('@intravert__')
        ->not->toContain('https://instagram.com/intrasepriansa')
        ->not->toContain('@intrasepriansa');

    expect($hero)
        ->toContain('https://www.instagram.com/intravert__')
        ->not->toContain('https://instagram.com/intrasepriansa');
});

test('portfolio cv downloads are available publicly', function () {
    $downloads = [
        'downloads/Intra_Sepriansa_CV_ID.pdf',
        'downloads/Intra_Sepriansa_CV_EN.pdf',
        'downloads/Intra_Sepriansa_CV_ATS_ID.pdf',
        'downloads/Intra_Sepriansa_CV_ATS_EN.pdf',
        'downloads/Intra_Sepriansa_CV_ATS_ID.docx',
        'downloads/Intra_Sepriansa_CV_ATS_EN.docx',
    ];

    foreach ($downloads as $download) {
        expect(is_file(public_path($download)))->toBeTrue();
        expect(filesize(public_path($download)))->toBeGreaterThan(30_000);
    }
});

test('portfolio cv shortcuts open the cv page', function () {
    $hero = file_get_contents(resource_path('js/components/portfolio/sections/hero-section.tsx'));
    $commands = file_get_contents(resource_path('js/data/portfolio-language.ts'));
    $navbar = file_get_contents(resource_path('js/components/portfolio/navbar.tsx'));

    expect($hero)
        ->toContain("import { cv } from '@/routes'")
        ->toContain('href={cv.url()}');

    expect($commands)
        ->toContain("action: '/cv'")
        ->toContain("type: 'page'");

    expect($navbar)
        ->toContain("import { home } from '@/routes'")
        ->toContain('router.visit(`${home.url()}${href}`)');
});

test('portfolio cv page uses the animated folder component', function () {
    $folder = file_get_contents(resource_path('js/components/portfolio/ui/folder.tsx'));
    $cvPage = file_get_contents(resource_path('js/pages/cv.tsx'));

    expect($folder)
        ->toContain('export default function Folder')
        ->toContain('aria-pressed={open}')
        ->toContain('group-hover:[transform:skew(15deg)_scaleY(0.6)]')
        ->toContain('translate(-120%, -70%) rotate(-15deg)');

    expect($cvPage)
        ->toContain("import Folder from '@/components/portfolio/ui/folder'")
        ->toContain('color="#4F46E5"')
        ->toContain('items={folderItems}')
        ->toContain('size={1.22}');
});

test('portfolio tech stack fallback logo assets are available', function () {
    expect(is_file(public_path('logos/recharts.svg')))->toBeTrue();
    expect(is_file(public_path('logos/hlsjs.svg')))->toBeTrue();
    expect(is_file(public_path('logos/dompdf.svg')))->toBeTrue();
});

test('portfolio process light and dark assets are available', function () {
    foreach (range(1, 6) as $step) {
        expect(is_file(public_path("process/{$step}.png")))->toBeTrue();
        expect(is_file(public_path("process/{$step}b.png")))->toBeTrue();
    }
});

test('portfolio project monitor assets are available', function () {
    expect(is_file(public_path('project/project1.png')))->toBeTrue();
    expect(is_file(public_path('project/project2.png')))->toBeTrue();
    expect(is_file(public_path('project/project2-transparent.png')))->toBeTrue();
    expect(is_file(public_path('project/ciper.png')))->toBeTrue();
    expect(is_file(public_path('project/smanten.png')))->toBeTrue();
    expect(is_file(public_path('project/linguapath.png')))->toBeTrue();
    expect(is_file(public_path('project/majormind.png')))->toBeTrue();
    expect(is_file(public_path('project/Solvara Studio.png')))->toBeTrue();
    expect(getimagesize(public_path('project/project1.png')))->toMatchArray([1536, 1024]);
    expect(getimagesize(public_path('project/project2.png')))->toMatchArray([1536, 1024]);
    expect(getimagesize(public_path('project/project2-transparent.png')))->toMatchArray([1536, 1024]);
    expect(getimagesize(public_path('project/ciper.png')))->toMatchArray([2940, 1668]);
    expect(getimagesize(public_path('project/smanten.png')))->toMatchArray([2940, 1666]);
    expect(getimagesize(public_path('project/linguapath.png')))->toMatchArray([2940, 1664]);
    expect(getimagesize(public_path('project/majormind.png')))->toMatchArray([2940, 1668]);
    expect(getimagesize(public_path('project/Solvara Studio.png')))->toMatchArray([2932, 1664]);
});

test('portfolio project monitor fits project screenshots inside the monitor', function () {
    $component = file_get_contents(resource_path('js/components/portfolio/project-monitor-card.tsx'));

    expect($component)
        ->toContain('/project/project1.png')
        ->toContain('/project/project2-transparent.png')
        ->toContain('/project/ciper.png')
        ->toContain('/project/smanten.png')
        ->toContain('/project/linguapath.png')
        ->toContain('/project/majormind.png')
        ->toContain('/project/Solvara Studio.png')
        ->toContain('dark:hidden')
        ->toContain('dark:block')
        ->toContain('top-[28.2%]')
        ->toContain('dark:top-[30.5%]')
        ->toContain('left-[11.9%]')
        ->toContain('h-[33.5%]')
        ->toContain('dark:h-[33.4%]')
        ->toContain('w-[44.3%]')
        ->toContain('overflow-hidden')
        ->toContain('object-cover')
        ->not->toContain('hitam-smanten-transparent.png')
        ->not->toContain('project.previewImage')
        ->not->toContain('clipPath');
});

test('cidurian riverside case study uses the ciper project preview', function () {
    $response = $this->get(route('projects.show', 'cidurian-riverside'));

    expect(is_file(public_path('project/ciper.png')))->toBeTrue();

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('project.name', 'Cidurian Riverside')
            ->where('project.previewImage', '/project/ciper.png'));
});

test('solvara studio case study uses the project preview and service copy', function () {
    $response = $this->get(route('projects.show', 'solvara-studio'));

    expect(is_file(public_path('project/Solvara Studio.png')))->toBeTrue();

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('project.name', 'Solvara Studio')
            ->where('project.previewImage', '/project/Solvara Studio.png')
            ->where('project.category', 'Digital Solution Studio')
            ->where('project.features.2', 'CTA konsultasi gratis')
            ->where('project.techStack.3', 'TypeScript'));
});

test('majormind case study uses the project preview and DSS copy', function () {
    $response = $this->get(route('projects.show', 'majormind'));

    expect(is_file(public_path('project/majormind.png')))->toBeTrue();

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('project.name', 'MajorMind')
            ->where('project.previewImage', '/project/majormind.png')
            ->where('project.category', 'Sistem Pendukung Keputusan Enterprise')
            ->where('project.features.1', 'Perhitungan AHP-TOPSIS')
            ->where('project.techStack.8', 'Chart.js'));
});

test('kawa ai and majormind remain available on all projects data but are not featured', function () {
    $projectData = file_get_contents(resource_path('js/data/projects.ts'));
    $featuredSection = file_get_contents(resource_path('js/components/portfolio/sections/featured-projects-section.tsx'));

    expect($projectData)
        ->toContain("slug: 'cidurian-riverside'")
        ->toContain("slug: 'kawa-ai'")
        ->toContain("slug: 'solvara-studio'")
        ->toContain("slug: 'majormind'")
        ->toContain('export const featuredProjects')
        ->toContain("project.slug !== 'kawa-ai'")
        ->toContain("project.slug !== 'majormind'");

    expect($featuredSection)
        ->toContain('localizeProjects(featuredProjects, language)')
        ->toContain('localizedProjects.map')
        ->not->toContain('projects.map');
});

test('kawa ai case study remains available', function () {
    $response = $this->get(route('projects.show', 'kawa-ai'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('project.name', 'KAWA AI'));
});

test('published project demo previews are available on case studies', function (
    string $slug,
    string $demoUrl,
    string $previewImage,
) {
    $response = $this->get(route('projects.show', $slug));

    expect(is_file(public_path(ltrim($previewImage, '/'))))->toBeTrue();

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects/show')
            ->where('project.links.demo', $demoUrl)
            ->where('project.previewImage', $previewImage));
})->with([
    'smanten portal' => [
        'smanten-portal',
        'https://smanten.sepriansatech.com',
        '/project-previews/smanten-portal.png',
    ],
    'linguapath' => [
        'linguapath',
        'https://lp.sepriansatech.com/login',
        '/project/linguapath.png',
    ],
]);

test('portfolio project copy supports Indonesian defaults and English translations', function () {
    $projectData = file_get_contents(resource_path('js/data/projects.ts'));
    $controller = file_get_contents(app_path('Http/Controllers/PortfolioController.php'));

    expect($projectData)
        ->toContain('Sistem Pemantauan AI')
        ->toContain('Dasbor multi-role')
        ->toContain('Alur kerja identifikasi berbantuan AI')
        ->toContain('Situs Web Sekolah / CMS')
        ->toContain('Digital Solution Studio')
        ->toContain('CTA konsultasi gratis')
        ->toContain('Sistem Pendukung Keputusan Enterprise')
        ->toContain('Explainable AI')
        ->toContain('translations')
        ->toContain('AI Monitoring System')
        ->toContain('Free consultation CTA')
        ->toContain('Enterprise Decision Support System')
        ->toContain('localizeProject');

    expect($controller)
        ->toContain('Sistem Pemantauan AI')
        ->toContain('Dasbor multi-role')
        ->toContain('Situs Web Sekolah / CMS')
        ->toContain('Digital Solution Studio')
        ->toContain('CTA konsultasi gratis')
        ->toContain('Sistem Pendukung Keputusan Enterprise')
        ->toContain('Explainable AI')
        ->not->toContain('AI Monitoring System');
});

test('project case study page uses advanced detail layout and tech hover previews', function () {
    $component = file_get_contents(resource_path('js/pages/projects/show.tsx'));

    expect($component)
        ->toContain('HoverPreview')
        ->toContain('TechStackPreview')
        ->toContain('og:image')
        ->toContain('twitter:image')
        ->toContain("const previewImage = displayProject.previewImage ?? '/project/project1.png'")
        ->toContain('projectsIndex.url()')
        ->toContain('home.url()')
        ->toContain('cdn.simpleicons.org/react')
        ->toContain('/logos/recharts.svg')
        ->toContain('/logos/hlsjs.svg')
        ->toContain('/logos/dompdf.svg')
        ->toContain('Studi Kasus')
        ->toContain('Catatan Eksekusi')
        ->toContain('line-clamp-3')
        ->not->toContain('GlowCard')
        ->not->toContain('TechBadge');
});

test('contact section supports bilingual copy and paper plane send animation', function () {
    $component = file_get_contents(resource_path('js/components/portfolio/sections/contact-section.tsx'));

    expect($component)
        ->toContain('export type ContactLanguage = PortfolioLanguage')
        ->toContain('function ContactSection({ language =')
        ->toContain('data-paper-plane')
        ->toContain('data-flight-trail')
        ->toContain('data-flight-spark')
        ->toContain('playPaperPlaneAnimation')
        ->toContain('router.post(contactMessagesStore.url()')
        ->toContain('Mari bangun')
        ->toContain('produk digital modern')
        ->toContain('Email terkirim')
        ->toContain('Email launched')
        ->not->toContain('data-contact-language-toggle')
        ->not->toContain("useState<ContactLanguage>('id')")
        ->not->toContain('w-[4.25rem]')
        ->not->toContain('translate-x-[4.25rem]')
        ->not->toContain('shadow-[0_14px_34px_rgba(79,70,229,0.34)]')
        ->not->toContain('copy.languageLabel')
        ->not->toContain('mailto:${email}');
});

test('portfolio language toggle is rendered beside the theme toggle', function () {
    $navbar = file_get_contents(resource_path('js/components/portfolio/navbar.tsx'));
    $themeToggle = file_get_contents(resource_path('js/components/portfolio/ui/theme-toggle.tsx'));
    $home = file_get_contents(resource_path('js/pages/home.tsx'));
    $contact = file_get_contents(resource_path('js/pages/contact.tsx'));

    expect($navbar)
        ->toContain('navbarUtilityButtonClassName')
        ->toContain('data-portfolio-language-toggle')
        ->toContain('nextLanguage.toUpperCase()')
        ->toContain('<Languages className="h-4 w-4" />')
        ->toContain('<Command className="h-4 w-4" />')
        ->toContain('<ThemeToggle />')
        ->toContain('data-portfolio-language-changing')
        ->toContain('aria-busy={isChanging}')
        ->toContain('disabled={isChanging}')
        ->toContain('h-10 w-14')
        ->toContain('sm:w-16')
        ->toContain('rounded-full border border-slate-200 bg-slate-100')
        ->toContain('gap-2 sm:gap-3')
        ->toContain('inline-flex h-10 w-10')
        ->toContain("'hidden text-xs md:inline-flex'")
        ->toContain('hidden h-10 items-center rounded-full bg-indigo-600');

    expect($themeToggle)
        ->toContain('inline-flex h-10 w-14')
        ->toContain('sm:w-16')
        ->toContain('rounded-full border border-slate-200 bg-slate-100');

    expect($home)
        ->toContain('usePortfolioLanguage()')
        ->toContain('data-portfolio-language-shell')
        ->toContain('languageChanging={isLanguageChanging}')
        ->toContain('onLanguageChange={setLanguage}')
        ->toContain('<ContactSection language={language} />');

    expect($contact)
        ->toContain('usePortfolioLanguage()')
        ->toContain('data-portfolio-language-shell')
        ->toContain('languageChanging={isLanguageChanging}')
        ->toContain('onLanguageChange={setLanguage}')
        ->toContain('<ContactSection language={language} />');
});

test('portfolio language changes animate all portfolio text smoothly', function () {
    $css = file_get_contents(resource_path('css/app.css'));
    $hook = file_get_contents(resource_path('js/hooks/use-portfolio-language.ts'));
    $overlay = file_get_contents(resource_path('js/components/portfolio/ui/portfolio-letter-swap-overlay.tsx'));
    $hero = file_get_contents(resource_path('js/components/portfolio/sections/hero-section.tsx'));
    $home = file_get_contents(resource_path('js/pages/home.tsx'));
    $contact = file_get_contents(resource_path('js/pages/contact.tsx'));
    $projectIndex = file_get_contents(resource_path('js/pages/projects/index.tsx'));
    $projectShow = file_get_contents(resource_path('js/pages/projects/show.tsx'));

    expect($hook)
        ->toContain("const transitionAttribute = 'data-portfolio-language-transition'")
        ->toContain('transitionOutDelay')
        ->toContain('transitionTotalDuration')
        ->toContain('portfolio-language-transition-out')
        ->toContain('portfolio-language-transition-end')
        ->toContain('window.dispatchEvent(new Event(transitionOutEvent))')
        ->toContain('setIsLanguageChanging(true)')
        ->toContain("transitionAttribute,\n                    'out'")
        ->toContain("transitionAttribute,\n                            'in'")
        ->toContain('return [language, setPortfolioLanguage, isLanguageChanging] as const');

    expect($css)
        ->toContain('html[data-portfolio-language-transition]')
        ->toContain('[data-portfolio-letter-swap-target]')
        ->toContain('.portfolio-letter-swap-char')
        ->toContain('@keyframes portfolio-letter-swap-out')
        ->toContain('@keyframes portfolio-letter-swap-in')
        ->toContain('rotateX(var(--swap-rotate-x))')
        ->toContain('rotateY(var(--swap-rotate-y))')
        ->toContain('filter: blur(5px)')
        ->toContain('perspective(900px)')
        ->toContain('@media (prefers-reduced-motion: reduce)');

    expect($overlay)
        ->toContain('new Intl.Segmenter')
        ->toContain('splitTextSegments')
        ->toContain('getLeafTextElements')
        ->toContain('captureText')
        ->toContain('portfolio-letter-swap-word')
        ->toContain('portfolio-letter-swap-char')
        ->toContain('data-portfolio-letter-swap-overlay');

    expect($hero)
        ->toContain('h-[86svh]')
        ->toContain('max-h-[800px]')
        ->toContain('origin-bottom translate-y-[3.5%]')
        ->toContain('imageFrameClassName')
        ->toContain('min-h-svh')
        ->toContain('items-start px-6 pt-28 pb-10')
        ->toContain('lg:items-center lg:px-20 lg:py-0')
        ->toContain('my-6 sm:my-8')
        ->toContain('max-w-[30rem]')
        ->toContain('xl:max-w-[34rem]')
        ->toContain('whitespace-nowrap text-slate-900 dark:text-white')
        ->toContain('tracking-normal')
        ->not->toContain('h-[86vh]')
        ->not->toContain('min-h-screen overflow-hidden bg-white')
        ->not->toContain('max-w-xs text-right');

    expect($home)
        ->toContain('data-portfolio-language-shell')
        ->toContain('<PortfolioLetterSwapOverlay')
        ->toContain('isChanging={isLanguageChanging}');
    expect($contact)
        ->toContain('data-portfolio-language-shell')
        ->toContain('<PortfolioLetterSwapOverlay')
        ->toContain('isChanging={isLanguageChanging}');
    expect($projectIndex)
        ->toContain('data-portfolio-language-shell')
        ->toContain('<PortfolioLetterSwapOverlay')
        ->toContain('isChanging={isLanguageChanging}');
    expect($projectShow)
        ->toContain('data-portfolio-language-shell')
        ->toContain('<PortfolioLetterSwapOverlay')
        ->toContain('isChanging={isLanguageChanging}');
});

test('portfolio language toggle drives translated portfolio copy', function () {
    $home = file_get_contents(resource_path('js/pages/home.tsx'));
    $projectIndex = file_get_contents(resource_path('js/pages/projects/index.tsx'));
    $projectShow = file_get_contents(resource_path('js/pages/projects/show.tsx'));
    $portfolioCopy = file_get_contents(resource_path('js/data/portfolio-language.ts'));
    $whatIBuild = file_get_contents(resource_path('js/components/portfolio/sections/what-i-build-section.tsx'));

    expect($home)
        ->toContain('<HeroSection language={language} />')
        ->toContain('<AboutSection language={language} />')
        ->toContain('<WhatIBuildSection language={language} />')
        ->toContain('<TechStackSection language={language} />')
        ->toContain('<FeaturedProjectsSection language={language} />')
        ->toContain('<DevelopmentApproachSection language={language} />')
        ->toContain('<TimelineSection language={language} />');

    expect($projectIndex)
        ->toContain('localizeProjects(projects, language)')
        ->toContain('<ProjectMonitorCard')
        ->toContain('language={language}');

    expect($projectShow)
        ->toContain('projectShowCopy')
        ->toContain('const displayProject = localizeProject(sourceProject, language)')
        ->toContain('displayProject.shortDescription')
        ->toContain('displayProject.features.map')
        ->toContain('<TechStackPreview')
        ->toContain('language={language}')
        ->toContain('tech={tech}');

    expect($portfolioCopy)
        ->toContain('Beranda')
        ->toContain('Home')
        ->toContain('Salin Email')
        ->toContain('Copy Email');

    expect($whatIBuild)
        ->toContain('Solusi yang Saya Buat')
        ->toContain('Solutions I Build')
        ->not->toContain('-right-32 bottom-0 h-80 w-96 rounded-full border')
        ->not->toContain('-right-20 bottom-8 h-80 w-96 rounded-full border');
});
