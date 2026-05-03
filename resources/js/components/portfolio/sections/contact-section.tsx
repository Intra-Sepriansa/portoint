import { router } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    CheckCircle2,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Send,
    Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { socials } from '@/data/socials';
import type { Social } from '@/data/socials';
import { store as contactMessagesStore } from '@/routes/contact-messages';

gsap.registerPlugin(ScrollTrigger);

export type ContactLanguage = PortfolioLanguage;

type ContactFormData = {
    name: string;
    contactEmail: string;
    message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const contactCopy = {
    en: {
        eyebrow: 'Contact',
        headlineLead: "Let's build a modern",
        headlineHighlight: 'digital product',
        headlineEnd: 'together.',
        description:
            'Have a website, dashboard, CMS, or platform idea? I can help shape it into a clean, scalable, interactive product with thoughtful UX and production-ready engineering.',
        start: 'Start a Project',
        title: 'Tell me the goal.',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send Message',
        sending: 'Sending...',
        sent: 'Email sent',
        successTitle: 'Email launched',
        successMessage: 'Your message is on its way. I will reply soon.',
        genericError:
            'The message could not be sent yet. Please check the form and try again.',
    },
    id: {
        eyebrow: 'Kontak',
        headlineLead: 'Mari bangun',
        headlineHighlight: 'produk digital modern',
        headlineEnd: 'bersama.',
        description:
            'Punya ide situs web, dasbor, CMS, atau platform? Saya bisa bantu membentuknya menjadi produk yang bersih, dapat diskalakan, interaktif, dan siap dipakai produksi.',
        start: 'Mulai Proyek',
        title: 'Ceritakan tujuannya.',
        name: 'Nama',
        namePlaceholder: 'Nama kamu',
        email: 'Email',
        emailPlaceholder: 'email@kamu.com',
        message: 'Pesan',
        messagePlaceholder: 'Ceritakan kebutuhan proyek kamu...',
        submit: 'Kirim Pesan',
        sending: 'Mengirim...',
        sent: 'Email terkirim',
        successTitle: 'Email meluncur',
        successMessage:
            'Pesan kamu sudah terkirim. Saya akan membalas secepatnya.',
        genericError: 'Pesan belum bisa dikirim. Periksa form lalu coba lagi.',
    },
} satisfies Record<ContactLanguage, Record<string, string>>;

const iconMap: Record<string, LucideIcon> = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

type SocialIconLinkProps = {
    social: Social;
    Icon: LucideIcon;
};

function SocialIconLink({ social, Icon }: SocialIconLinkProps) {
    const gradientId = useId().replace(/:/g, '');
    const [isActive, setIsActive] = useState(false);
    const isExternalLink = social.href.startsWith('http');

    return (
        <a
            href={social.href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            aria-label={social.name}
            title={social.name}
            data-contact-social
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            className="group relative isolate inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-300/70 bg-white/45 text-slate-600 shadow-[0_16px_42px_rgba(79,70,229,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/70 hover:bg-white/70 hover:shadow-[0_22px_54px_rgba(79,70,229,0.18)] focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:border-white/[0.14] dark:bg-white/[0.06] dark:text-slate-400 dark:hover:border-violet-300/40 dark:hover:bg-white/[0.09] dark:focus-visible:ring-offset-[#070312]"
        >
            <svg className="absolute h-0 w-0" aria-hidden="true">
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="48%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/15 via-indigo-500/10 to-cyan-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <Icon
                className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
                stroke={isActive ? `url(#${gradientId})` : 'currentColor'}
            />
        </a>
    );
}

type ContactSectionProps = {
    language?: ContactLanguage;
};

export function ContactSection({ language = 'id' }: ContactSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const flightLayerRef = useRef<HTMLDivElement>(null);
    const planeRef = useRef<HTMLDivElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        contactEmail: '',
        message: '',
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const copy = contactCopy[language];

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                '[data-contact-heading]',
                {
                    autoAlpha: 0,
                    filter: 'blur(4px)',
                    y: 28,
                },
                {
                    autoAlpha: 1,
                    filter: 'blur(0px)',
                    scrollTrigger: {
                        end: 'top 48%',
                        scrub: true,
                        start: 'top 78%',
                        trigger: '[data-contact-heading]',
                    },
                    stagger: 0.08,
                    y: 0,
                },
            );

            gsap.fromTo(
                '[data-contact-form]',
                {
                    autoAlpha: 0,
                    x: 44,
                    y: 26,
                },
                {
                    autoAlpha: 1,
                    scrollTrigger: {
                        end: 'bottom 46%',
                        scrub: true,
                        start: 'top 86%',
                        trigger: '[data-contact-form]',
                    },
                    x: 0,
                    y: 0,
                },
            );

            gsap.fromTo(
                '[data-contact-field], [data-contact-social]',
                {
                    autoAlpha: 0,
                    y: 24,
                },
                {
                    autoAlpha: 1,
                    duration: 0.65,
                    ease: 'power3.out',
                    scrollTrigger: {
                        start: 'top 78%',
                        toggleActions: 'play none none reverse',
                        trigger: section,
                    },
                    stagger: 0.06,
                    y: 0,
                },
            );
        }, section);

        return () => context.revert();
    }, []);

    function playPaperPlaneAnimation() {
        const layer = flightLayerRef.current;
        const plane = planeRef.current;

        if (
            !layer ||
            !plane ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const trails = layer.querySelectorAll('[data-flight-trail]');
        const sparks = layer.querySelectorAll('[data-flight-spark]');
        const width = layer.offsetWidth;
        const height = layer.offsetHeight;

        gsap.killTweensOf([plane, submitButtonRef.current, trails, sparks]);
        gsap.set(layer, { autoAlpha: 1 });
        gsap.set(plane, {
            autoAlpha: 1,
            rotate: -18,
            scale: 0.72,
            x: 0,
            y: 0,
        });
        gsap.set(trails, {
            autoAlpha: 0,
            scaleX: 0,
            transformOrigin: 'left center',
        });
        gsap.set(sparks, {
            autoAlpha: 0,
            rotate: 0,
            scale: 0.35,
            y: 0,
        });

        gsap.timeline({
            defaults: { ease: 'power3.out' },
            onComplete: () => gsap.set(layer, { autoAlpha: 0 }),
        })
            .to(submitButtonRef.current, { duration: 0.08, scale: 0.98 }, 0)
            .to(submitButtonRef.current, { duration: 0.28, scale: 1 }, 0.1)
            .to(
                plane,
                {
                    duration: 1.45,
                    ease: 'power3.inOut',
                    keyframes: [
                        { rotate: -18, scale: 0.72, x: 0, y: 0 },
                        {
                            rotate: 5,
                            scale: 0.86,
                            x: width * 0.24,
                            y: -height * 0.18,
                        },
                        {
                            rotate: 22,
                            scale: 0.94,
                            x: width * 0.55,
                            y: -height * 0.48,
                        },
                        {
                            rotate: 38,
                            scale: 0.36,
                            x: width * 0.9,
                            y: -height * 0.88,
                        },
                    ],
                },
                0,
            )
            .to(
                trails,
                {
                    autoAlpha: 0.78,
                    duration: 0.42,
                    ease: 'power2.out',
                    scaleX: 1,
                    stagger: 0.08,
                },
                0.08,
            )
            .to(
                trails,
                {
                    autoAlpha: 0,
                    duration: 0.5,
                    stagger: 0.05,
                },
                0.68,
            )
            .to(
                sparks,
                {
                    autoAlpha: 1,
                    duration: 0.45,
                    ease: 'back.out(2)',
                    rotate: 80,
                    scale: 1,
                    stagger: 0.06,
                    y: -18,
                },
                0.36,
            )
            .to(
                sparks,
                {
                    autoAlpha: 0,
                    duration: 0.36,
                    scale: 0.45,
                    stagger: 0.04,
                },
                0.82,
            )
            .to(plane, { autoAlpha: 0, duration: 0.18 }, 1.3);
    }

    function updateField(field: keyof ContactFormData, value: string) {
        setFormData((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: undefined }));
        setSendError(null);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setSubmitted(false);
        setSendError(null);

        router.post(contactMessagesStore.url(), formData, {
            onError: (validationErrors) => {
                setErrors(validationErrors as ContactFormErrors);
                setSendError(copy.genericError);
            },
            onFinish: () => setProcessing(false),
            onStart: () => setProcessing(true),
            onSuccess: () => {
                setErrors({});
                setFormData({
                    contactEmail: '',
                    message: '',
                    name: '',
                });
                setSubmitted(true);
                playPaperPlaneAnimation();
                setTimeout(() => setSubmitted(false), 4200);
            },
            preserveScroll: true,
        });
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#f8fbff_0%,#eef2ff_36%,#ffffff_68%,#ecfeff_100%)] py-24 text-slate-950 md:py-32 dark:bg-[linear-gradient(135deg,#030303_0%,#070312_38%,#010101_72%,#021315_100%)] dark:text-white"
        >
            <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(124,58,237,0.13),transparent_36%,rgba(6,182,212,0.15))] dark:bg-[linear-gradient(90deg,rgba(124,58,237,0.16),transparent_38%,rgba(6,182,212,0.12))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-white to-transparent dark:from-black" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-white to-transparent dark:from-black" />

            <div className="relative z-10 mx-auto max-w-[1360px] px-6 lg:px-10">
                <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(390px,0.76fr)] lg:gap-20">
                    <div className="relative">
                        <div
                            className="relative z-10 lg:max-w-[660px]"
                            data-contact-heading
                        >
                            <div className="mb-5 inline-flex items-center gap-3 text-xs font-black tracking-[0.26em] text-violet-600 uppercase dark:text-violet-300">
                                <MessageCircle className="h-4 w-4" />
                                {copy.eyebrow}
                            </div>
                            <h2 className="max-w-4xl text-4xl leading-[1.02] font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl dark:text-white">
                                {copy.headlineLead}{' '}
                                <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-indigo-300 dark:to-cyan-300">
                                    {copy.headlineHighlight}
                                </span>{' '}
                                {copy.headlineEnd}
                            </h2>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg dark:text-slate-400">
                                {copy.description}
                            </p>
                        </div>
                        <div className="relative z-10 mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                            {socials.map((social) => {
                                const Icon = iconMap[social.icon] ?? Mail;

                                return (
                                    <SocialIconLink
                                        key={social.name}
                                        social={social}
                                        Icon={Icon}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <form
                        data-contact-form
                        onSubmit={handleSubmit}
                        className="relative overflow-hidden rounded-[2rem] border border-slate-300/70 bg-white/65 p-6 shadow-[0_28px_80px_rgba(79,70,229,0.14)] backdrop-blur-2xl dark:border-white/[0.15] dark:bg-black/35"
                    >
                        <div
                            ref={flightLayerRef}
                            aria-hidden="true"
                            data-paper-plane
                            className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0"
                        >
                            <span
                                data-flight-trail
                                className="absolute bottom-24 left-12 h-0.5 w-44 -rotate-[18deg] rounded-full bg-gradient-to-r from-violet-500/0 via-violet-500/70 to-cyan-300/0"
                            />
                            <span
                                data-flight-trail
                                className="absolute bottom-20 left-10 h-px w-36 -rotate-[25deg] rounded-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-white/0"
                            />
                            <span
                                data-flight-trail
                                className="absolute bottom-28 left-16 h-px w-28 -rotate-[10deg] rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-white/0"
                            />
                            <Sparkles
                                data-flight-spark
                                className="absolute top-20 right-24 h-5 w-5 text-cyan-300"
                            />
                            <Sparkles
                                data-flight-spark
                                className="absolute top-36 right-36 h-4 w-4 text-violet-300"
                            />
                            <Sparkles
                                data-flight-spark
                                className="absolute top-44 right-16 h-3.5 w-3.5 text-white"
                            />
                            <div
                                ref={planeRef}
                                className="absolute bottom-20 left-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 text-white shadow-[0_20px_54px_rgba(79,70,229,0.42)]"
                            >
                                <Send className="h-7 w-7 -rotate-12" />
                            </div>
                        </div>

                        <div className="mb-8 flex items-end justify-between gap-6">
                            <div>
                                <p className="text-xs font-black tracking-[0.22em] text-violet-600 uppercase dark:text-violet-300">
                                    {copy.start}
                                </p>
                                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                                    {copy.title}
                                </h3>
                            </div>
                            <span className="hidden rounded-full bg-gradient-to-br from-violet-600 to-cyan-400 p-3 text-white shadow-[0_20px_48px_rgba(79,70,229,0.28)] sm:inline-flex">
                                {submitted ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <Send className="h-5 w-5" />
                                )}
                            </span>
                        </div>

                        {submitted && (
                            <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-700 dark:text-emerald-200">
                                <p className="font-black">
                                    {copy.successTitle}
                                </p>
                                <p className="mt-1 text-emerald-700/80 dark:text-emerald-200/80">
                                    {copy.successMessage}
                                </p>
                            </div>
                        )}

                        {sendError && (
                            <div className="mb-6 rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm font-semibold text-rose-700 dark:text-rose-200">
                                {sendError}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div data-contact-field>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400"
                                >
                                    {copy.name}
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        updateField('name', e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-slate-300/70 bg-white/[0.65] px-5 py-4 text-sm font-medium text-slate-950 shadow-[0_18px_55px_rgba(79,70,229,0.07)] backdrop-blur-xl transition-colors outline-none placeholder:text-slate-400 focus:border-violet-500/70 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder={copy.namePlaceholder}
                                />
                                {errors.name && (
                                    <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div data-contact-field>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400"
                                >
                                    {copy.email}
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formData.contactEmail}
                                    onChange={(e) =>
                                        updateField(
                                            'contactEmail',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-2xl border border-slate-300/70 bg-white/[0.65] px-5 py-4 text-sm font-medium text-slate-950 shadow-[0_18px_55px_rgba(79,70,229,0.07)] backdrop-blur-xl transition-colors outline-none placeholder:text-slate-400 focus:border-violet-500/70 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder={copy.emailPlaceholder}
                                />
                                {errors.contactEmail && (
                                    <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
                                        {errors.contactEmail}
                                    </p>
                                )}
                            </div>
                            <div data-contact-field>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-xs font-black tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400"
                                >
                                    {copy.message}
                                </label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) =>
                                        updateField('message', e.target.value)
                                    }
                                    className="w-full resize-none rounded-2xl border border-slate-300/70 bg-white/[0.65] px-5 py-4 text-sm font-medium text-slate-950 shadow-[0_18px_55px_rgba(79,70,229,0.07)] backdrop-blur-xl transition-colors outline-none placeholder:text-slate-400 focus:border-violet-500/70 dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder={copy.messagePlaceholder}
                                />
                                {errors.message && (
                                    <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-300">
                                        {errors.message}
                                    </p>
                                )}
                            </div>
                            <button
                                ref={submitButtonRef}
                                data-contact-field
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 px-6 py-4 text-sm font-black text-white shadow-[0_24px_58px_rgba(79,70,229,0.35)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {submitted ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                                {submitted
                                    ? copy.sent
                                    : processing
                                      ? copy.sending
                                      : copy.submit}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
