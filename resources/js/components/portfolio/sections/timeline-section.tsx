import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Code2, GraduationCap, Layers3, Rocket } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { timelineItemsByLanguage } from '@/data/timeline';

gsap.registerPlugin(ScrollTrigger);

type JourneyVisual = {
    dark?: string;
    icon: ComponentType<{ className?: string }>;
    image: string;
    objectPosition?: string;
    tone: string;
};

const visuals: JourneyVisual[] = [
    {
        dark: '/process/1.png',
        icon: Code2,
        image: '/process/1b.png',
        objectPosition: 'center',
        tone: 'from-violet-500 to-cyan-400',
    },
    {
        dark: '/process/4.png',
        icon: Layers3,
        image: '/process/4b.png',
        objectPosition: 'center',
        tone: 'from-blue-500 to-violet-500',
    },
    {
        icon: GraduationCap,
        image: '/project-previews/smanten-portal.png',
        objectPosition: 'top',
        tone: 'from-emerald-500 to-cyan-400',
    },
    {
        icon: Brain,
        image: '/project/linguapath.png',
        objectPosition: 'center',
        tone: 'from-fuchsia-500 to-violet-500',
    },
    {
        dark: '/process/6.png',
        icon: Rocket,
        image: '/process/6b.png',
        objectPosition: 'center',
        tone: 'from-amber-400 to-violet-500',
    },
];

const timelineCopy = {
    en: {
        description:
            'A visual timeline of how my work evolved from learning web fundamentals into full-stack products, dashboards, school platforms, EdTech, and decision support systems.',
        eyebrow: 'Journey',
        titleHighlight: 'So Far',
        titleLead: 'My Path',
    },
    id: {
        description:
            'Linimasa visual tentang bagaimana karya saya berkembang dari mempelajari dasar web menjadi produk full-stack, dasbor, platform sekolah, EdTech, dan sistem pendukung keputusan.',
        eyebrow: 'Perjalanan',
        titleHighlight: 'Sejauh Ini',
        titleLead: 'Jejak Saya',
    },
} satisfies Record<
    PortfolioLanguage,
    {
        description: string;
        eyebrow: string;
        titleHighlight: string;
        titleLead: string;
    }
>;

type TimelineSectionProps = {
    language: PortfolioLanguage;
};

export function TimelineSection({ language }: TimelineSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const railTrackRef = useRef<HTMLDivElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const copy = timelineCopy[language];
    const timelineItems = timelineItemsByLanguage[language];

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const context = gsap.context(() => {
            const heading = headingRef.current;
            const timeline = timelineRef.current;
            const railTrack = railTrackRef.current;
            const rail = railRef.current;
            const steps = gsap.utils.toArray<HTMLElement>(
                '[data-journey-step]',
            );
            const assets = gsap.utils.toArray<HTMLElement>(
                '[data-journey-asset]',
            );
            const numbers = gsap.utils.toArray<HTMLElement>(
                '[data-journey-number]',
            );
            const copyBlocks = gsap.utils.toArray<HTMLElement>(
                '[data-journey-copy]',
            );

            if (heading) {
                gsap.fromTo(
                    heading,
                    {
                        autoAlpha: 0,
                        filter: 'blur(16px)',
                        y: 64,
                    },
                    {
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        scrollTrigger: {
                            end: 'bottom 52%',
                            scrub: true,
                            start: 'top 90%',
                            trigger: heading,
                        },
                        y: 0,
                    },
                );
            }

            if (timeline && railTrack && rail && numbers.length > 1) {
                let railTop = 0;
                let railHeight = 0;

                const measureRail = () => {
                    const timelineRect = timeline.getBoundingClientRect();
                    const nodeCenters = numbers.map((number) => {
                        const rect = number.getBoundingClientRect();

                        return rect.top - timelineRect.top + rect.height / 2;
                    });
                    const firstCenter = nodeCenters[0];
                    const lastCenter = nodeCenters[nodeCenters.length - 1];

                    if (
                        typeof firstCenter === 'undefined' ||
                        typeof lastCenter === 'undefined'
                    ) {
                        return;
                    }

                    railTop = firstCenter;
                    railHeight = Math.max(lastCenter - firstCenter, 0);

                    gsap.set(railTrack, {
                        bottom: 'auto',
                        height: railHeight,
                        top: railTop,
                    });
                    gsap.set(rail, {
                        bottom: 'auto',
                        height: railHeight,
                        top: railTop,
                        transformOrigin: 'top center',
                    });
                };

                measureRail();

                const railTween = gsap.fromTo(
                    rail,
                    {
                        scaleY: 0,
                    },
                    {
                        ease: 'none',
                        scaleY: 1,
                        scrollTrigger: {
                            end: () => {
                                measureRail();

                                return `top+=${Math.round(railTop + railHeight)} center`;
                            },
                            invalidateOnRefresh: true,
                            onRefresh: measureRail,
                            scrub: true,
                            start: () => {
                                measureRail();

                                return `top+=${Math.round(railTop)} center`;
                            },
                            trigger: timeline,
                        },
                    },
                );

                requestAnimationFrame(() => {
                    measureRail();
                    railTween.scrollTrigger?.refresh();
                });
            }

            steps.forEach((step, index) => {
                const asset = assets[index];
                const number = numbers[index];
                const copy = copyBlocks[index];
                const direction = index % 2 === 0 ? -1 : 1;

                gsap.fromTo(
                    step,
                    {
                        autoAlpha: 0,
                    },
                    {
                        autoAlpha: 1,
                        scrollTrigger: {
                            end: 'center 42%',
                            scrub: true,
                            start: 'top 88%',
                            trigger: step,
                        },
                    },
                );

                if (copy) {
                    gsap.fromTo(
                        copy,
                        {
                            x: direction * 56,
                            y: 24,
                        },
                        {
                            ease: 'none',
                            scrollTrigger: {
                                end: 'bottom 36%',
                                scrub: true,
                                start: 'top 88%',
                                trigger: step,
                            },
                            x: 0,
                            y: 0,
                        },
                    );
                }

                if (asset) {
                    gsap.fromTo(
                        asset,
                        {
                            rotate: direction * 5,
                            scale: 0.78,
                            x: direction * -90,
                            y: 42,
                        },
                        {
                            ease: 'none',
                            rotate: direction * -2,
                            scale: 1,
                            scrollTrigger: {
                                end: 'bottom 30%',
                                scrub: true,
                                start: 'top 92%',
                                trigger: step,
                            },
                            x: 0,
                            y: -12,
                        },
                    );
                }

                if (number) {
                    const numberGlow = number.querySelector<HTMLElement>(
                        '[data-journey-number-glow]',
                    );
                    const numberPulse = number.querySelector<HTMLElement>(
                        '[data-journey-number-pulse]',
                    );
                    const numberCore = number.querySelector<HTMLElement>(
                        '[data-journey-number-core]',
                    );
                    const numberRing = number.querySelector<HTMLElement>(
                        '[data-journey-number-ring]',
                    );
                    const activeParts = [
                        numberGlow,
                        numberPulse,
                        numberCore,
                        numberRing,
                    ].filter(Boolean);

                    gsap.set(number, {
                        autoAlpha: 0.72,
                        scale: 0.92,
                    });
                    gsap.set(activeParts, {
                        autoAlpha: 0,
                        scale: 0.82,
                    });

                    const pulseTarget = numberPulse ?? numberGlow;
                    const pulseTween = pulseTarget
                        ? gsap.to(pulseTarget, {
                              autoAlpha: 0.78,
                              duration: 1.15,
                              ease: 'sine.inOut',
                              paused: true,
                              repeat: -1,
                              scale: 1.42,
                              yoyo: true,
                          })
                        : null;

                    function activateNumber() {
                        pulseTween?.play();

                        gsap.to(number, {
                            autoAlpha: 1,
                            duration: 0.36,
                            ease: 'power3.out',
                            scale: 1,
                        });
                        gsap.to(numberGlow, {
                            autoAlpha: 0.86,
                            duration: 0.42,
                            ease: 'power3.out',
                            scale: 1.16,
                        });
                        gsap.to(numberCore, {
                            autoAlpha: 1,
                            duration: 0.34,
                            ease: 'power3.out',
                            scale: 1,
                        });
                        gsap.to(numberRing, {
                            autoAlpha: 1,
                            duration: 0.34,
                            ease: 'power3.out',
                            scale: 1,
                        });
                    }

                    function deactivateNumber() {
                        pulseTween?.pause(0);

                        gsap.to(number, {
                            autoAlpha: 0.72,
                            duration: 0.24,
                            ease: 'power2.out',
                            scale: 0.92,
                        });
                        gsap.to(activeParts, {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: 'power2.out',
                            scale: 0.82,
                        });
                    }

                    ScrollTrigger.create({
                        end: 'center top',
                        onEnter: activateNumber,
                        onLeaveBack: deactivateNumber,
                        start: 'center center',
                        trigger: number,
                    });
                }
            });
        }, section);

        return () => context.revert();
    }, []);

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="relative overflow-hidden bg-white py-24 text-slate-950 md:py-32 dark:bg-black dark:text-white"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute top-28 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/8" />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
                <div ref={headingRef} className="mx-auto max-w-4xl text-center">
                    <div className="mb-5 inline-flex items-center gap-4 text-sm font-bold tracking-[0.24em] text-violet-600 uppercase dark:text-violet-300">
                        <span className="h-1 w-8 rounded-full bg-violet-600 dark:bg-violet-300" />
                        {copy.eyebrow}
                        <span className="h-1 w-8 rounded-full bg-violet-600 dark:bg-violet-300" />
                    </div>
                    <h2 className="text-4xl leading-[1.02] font-black tracking-tight md:text-6xl">
                        {copy.titleLead}{' '}
                        <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-indigo-300 dark:to-cyan-300">
                            {copy.titleHighlight}
                        </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-400">
                        {copy.description}
                    </p>
                </div>

                <div ref={timelineRef} className="relative mt-16">
                    <div
                        ref={railTrackRef}
                        className="absolute top-8 bottom-8 left-1/2 hidden w-px -translate-x-1/2 bg-slate-200 md:block dark:bg-white/10"
                    />
                    <div
                        ref={railRef}
                        className="absolute top-8 left-1/2 hidden h-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-500 via-indigo-500 to-cyan-400 md:block"
                    />

                    <div className="space-y-20 md:space-y-10">
                        {timelineItems.map((item, index) => {
                            const visual = visuals[index] ?? visuals[0];
                            const Icon = visual.icon;
                            const isReversed = index % 2 !== 0;

                            return (
                                <article
                                    key={item.title}
                                    data-journey-step
                                    className="relative grid items-center gap-8 md:min-h-[25rem] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-28 md:py-8 lg:gap-36"
                                >
                                    <div
                                        data-journey-copy
                                        className={
                                            isReversed
                                                ? 'md:col-start-2'
                                                : 'md:col-start-1 md:text-right'
                                        }
                                    >
                                        <div className="mb-5 flex md:hidden">
                                            <span
                                                className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${visual.tone} text-sm font-black text-white shadow-[0_0_34px_rgba(124,58,237,0.45)]`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${visual.tone} text-white shadow-[0_20px_48px_rgba(99,102,241,0.28)]`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <p className="text-xs font-black tracking-[0.22em] text-violet-600 uppercase dark:text-violet-300">
                                            {item.period}
                                        </p>
                                        <h3 className="mt-3 text-2xl leading-tight font-black tracking-tight text-slate-950 md:text-3xl dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 md:text-base dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
                                        <span
                                            data-journey-number
                                            className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                                        >
                                            <span
                                                data-journey-number-glow
                                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${visual.tone} opacity-0 blur-xl`}
                                            />
                                            <span
                                                data-journey-number-pulse
                                                className={`absolute inset-0 rounded-full bg-gradient-to-br ${visual.tone} opacity-0 blur-xl`}
                                            />
                                            <span
                                                data-journey-number-ring
                                                className="absolute -inset-3 rounded-full border border-violet-400/25 opacity-0 dark:border-violet-300/20"
                                            />
                                            <span className="absolute inset-1 rounded-full bg-white shadow-[0_0_0_1px_rgba(124,58,237,0.16),0_10px_34px_rgba(124,58,237,0.16)] dark:bg-black dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_10px_40px_rgba(124,58,237,0.2)]" />
                                            <span
                                                data-journey-number-core
                                                className={`absolute inset-2 rounded-full bg-gradient-to-br ${visual.tone} opacity-0`}
                                            />
                                            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-black text-violet-600 shadow-inner dark:bg-black dark:text-white">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </span>
                                    </div>

                                    <div
                                        data-journey-asset
                                        className={
                                            isReversed
                                                ? 'md:col-start-1 md:row-start-1'
                                                : 'md:col-start-2'
                                        }
                                    >
                                        <div className="relative mx-auto h-72 max-w-xl md:h-80">
                                            <div className="absolute inset-x-14 bottom-8 h-16 rounded-full bg-violet-300/35 blur-3xl dark:bg-violet-400/15" />
                                            {visual.dark && (
                                                <img
                                                    alt=""
                                                    className="absolute inset-0 hidden h-full w-full object-contain object-center drop-shadow-[0_26px_58px_rgba(15,23,42,0.24)] dark:block"
                                                    draggable={false}
                                                    loading="lazy"
                                                    src={visual.dark}
                                                />
                                            )}
                                            <img
                                                alt=""
                                                className={`absolute inset-0 h-full w-full object-contain drop-shadow-[0_26px_58px_rgba(79,70,229,0.2)] ${visual.dark ? 'dark:hidden' : ''}`}
                                                draggable={false}
                                                loading="lazy"
                                                src={visual.image}
                                                style={{
                                                    objectPosition:
                                                        visual.objectPosition,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
