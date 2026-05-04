import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Layers, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Grainient } from '@/components/portfolio/ui/grainient';
import { ScrollReveal } from '@/components/portfolio/ui/scroll-reveal';
import type { PortfolioLanguage } from '@/data/portfolio-language';

gsap.registerPlugin(ScrollTrigger);

const aboutCopy = {
    en: {
        eyebrow: 'About Me',
        highlights: [
            {
                description:
                    'Responsive React interfaces with clear hierarchy, smooth interactions, and layouts that are easy to scan.',
                icon: Code2,
                title: 'Clean Interfaces',
            },
            {
                description:
                    'Laravel APIs, authentication, data models, and CMS workflows built to stay maintainable.',
                icon: Layers,
                title: 'Scalable Backend',
            },
            {
                description:
                    'End-to-end delivery from research and design to implementation, testing, launch, and iteration.',
                icon: Workflow,
                title: 'Product Workflow',
            },
        ],
        intro: 'I build polished web products for real workflows.',
        paragraph:
            'I am a full-stack web developer focused on modern interfaces, reliable backend systems, dashboards, CMS platforms, APIs, and interactive product experiences. My work starts from practical needs: clear screens, structured data, secure workflows, and maintainable code.',
        workflowSteps: ['Research', 'Design', 'Build', 'Launch'],
    },
    id: {
        eyebrow: 'Tentang Saya',
        highlights: [
            {
                description:
                    'Antarmuka React responsif dengan hierarki jelas, interaksi halus, dan tata letak yang mudah dipindai.',
                icon: Code2,
                title: 'Antarmuka Bersih',
            },
            {
                description:
                    'API Laravel, autentikasi, model data, dan alur kerja CMS yang dibangun agar mudah dirawat.',
                icon: Layers,
                title: 'Backend yang Dapat Diskalakan',
            },
            {
                description:
                    'Pengiriman menyeluruh dari riset dan desain hingga implementasi, pengujian, peluncuran, dan iterasi.',
                icon: Workflow,
                title: 'Alur Kerja Produk',
            },
        ],
        intro: 'Saya membangun produk web yang rapi untuk alur kerja nyata.',
        paragraph:
            'Saya adalah full-stack web developer yang fokus pada antarmuka modern, sistem backend yang reliabel, dasbor, platform CMS, API, dan pengalaman produk interaktif. Pekerjaan saya dibentuk dari kebutuhan praktis: layar yang jelas, data terstruktur, alur kerja aman, dan kode yang mudah dirawat.',
        workflowSteps: ['Riset', 'Desain', 'Bangun', 'Rilis'],
    },
} satisfies Record<
    PortfolioLanguage,
    {
        eyebrow: string;
        highlights: Array<{
            description: string;
            icon: typeof Code2;
            title: string;
        }>;
        intro: string;
        paragraph: string;
        workflowSteps: string[];
    }
>;

type AboutSectionProps = {
    language: PortfolioLanguage;
};

export function AboutSection({ language }: AboutSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const copy = aboutCopy[language];

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                section,
                {
                    clipPath: 'inset(14% 0% 0% 0%)',
                },
                {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'top 18%',
                        scrub: true,
                    },
                },
            );

            gsap.fromTo(
                content,
                {
                    opacity: 0.52,
                    scale: 0.96,
                    y: 88,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom-=8%',
                        end: 'top center',
                        scrub: true,
                    },
                },
            );
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050508] py-20 text-white will-change-[clip-path] md:py-24"
        >
            <div className="absolute inset-0">
                <Grainient
                    color1="#FF9FFC"
                    color2="#5227FF"
                    color3="#B497CF"
                    timeSpeed={0.25}
                    colorBalance={0}
                    warpStrength={1}
                    warpFrequency={5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.05}
                    rotationAmount={500}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_18%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(180deg,rgba(5,5,8,0.24),rgba(5,5,8,0.66))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div
                ref={contentRef}
                className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-28"
            >
                <div className="grid min-h-[calc(100svh-10rem)] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <ScrollReveal
                            as="span"
                            baseOpacity={0}
                            baseRotation={0}
                            blurStrength={3}
                            rotationEnd="bottom 78%"
                            wordAnimationEnd="bottom 74%"
                            containerClassName="my-0 mb-5 inline-flex"
                            textClassName="text-xs leading-none font-medium tracking-[0.28em] text-cyan-100 uppercase"
                        >
                            {copy.eyebrow}
                        </ScrollReveal>
                        <ScrollReveal
                            as="h2"
                            baseOpacity={0.08}
                            enableBlur
                            baseRotation={3}
                            blurStrength={5}
                            rotationEnd="bottom 72%"
                            wordAnimationEnd="bottom 68%"
                            containerClassName="my-0 max-w-2xl"
                            textClassName="text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                        >
                            {copy.intro}
                        </ScrollReveal>
                        <ScrollReveal
                            as="p"
                            baseOpacity={0.12}
                            enableBlur
                            baseRotation={1.2}
                            blurStrength={3}
                            rotationEnd="bottom 75%"
                            wordAnimationEnd="bottom 70%"
                            containerClassName="my-0 mt-6 max-w-2xl"
                            textClassName="text-sm leading-7 font-normal text-slate-200/85 md:text-base"
                        >
                            {copy.paragraph}
                        </ScrollReveal>

                        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium tracking-wide text-slate-200/85 uppercase">
                            {copy.workflowSteps.map((step) => (
                                <ScrollReveal
                                    as="span"
                                    key={step}
                                    baseOpacity={0}
                                    baseRotation={0}
                                    blurStrength={2}
                                    rotationEnd="bottom 84%"
                                    wordAnimationEnd="bottom 80%"
                                    containerClassName="my-0 border-b border-white/35 pb-1"
                                    textClassName="text-xs leading-none font-medium tracking-wide text-slate-200/85 uppercase"
                                >
                                    {step}
                                </ScrollReveal>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid gap-0 border-y border-white/15 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 xl:border-y-0">
                        {copy.highlights.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-80px' }}
                                transition={{ delay: index * 0.08 }}
                                className="relative overflow-hidden border-b border-white/15 py-7 last:border-b-0 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:border-r-0 lg:border-b lg:px-0 lg:last:border-b-0 xl:border-r xl:border-b-0 xl:px-7 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.82 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{
                                        delay: index * 0.08 + 0.08,
                                        duration: 0.45,
                                    }}
                                    className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-full p-px"
                                >
                                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_140deg,rgba(249,168,212,0.72),rgba(167,139,250,0.78),rgba(165,243,252,0.72),rgba(249,168,212,0.72))] opacity-80" />
                                    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white/10 backdrop-blur-xl">
                                        <item.icon
                                            className="h-6 w-6 text-cyan-100"
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                </motion.div>
                                <ScrollReveal
                                    as="h3"
                                    baseOpacity={0.1}
                                    enableBlur
                                    baseRotation={1.5}
                                    blurStrength={3}
                                    rotationEnd="bottom 82%"
                                    wordAnimationEnd="bottom 78%"
                                    containerClassName="my-0"
                                    textClassName="text-base leading-snug font-semibold text-white"
                                >
                                    {item.title}
                                </ScrollReveal>
                                <ScrollReveal
                                    as="p"
                                    baseOpacity={0.12}
                                    enableBlur
                                    baseRotation={0.8}
                                    blurStrength={3}
                                    rotationEnd="bottom 84%"
                                    wordAnimationEnd="bottom 80%"
                                    containerClassName="my-0 mt-3"
                                    textClassName="text-sm leading-6 font-normal text-slate-200/75"
                                >
                                    {item.description}
                                </ScrollReveal>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
