import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { CopyButton } from '@/components/portfolio/ui/copy-button';
import { SectionHeader } from '@/components/portfolio/ui/section-header';
import { email, socials } from '@/data/socials';

const iconMap: Record<string, typeof Mail> = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        contactEmail: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const mailtoLink = `mailto:${email}?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.contactEmail}`;
        window.open(mailtoLink, '_blank');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <section id="contact" className="bg-slate-50 py-24 md:py-32 dark:bg-[#080818]">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeader
                    label="Contact"
                    title="Let's build a modern digital product together."
                    description="Have a website, dashboard, CMS, or platform idea? I can help turn it into a clean, scalable, and interactive web application."
                />

                <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
                            Get in Touch
                        </h3>

                        <div className="mb-6">
                            <CopyButton text={email} label={email} />
                        </div>

                        <div className="space-y-4">
                            {socials.map((social) => {
                                const Icon = iconMap[social.icon] ?? Mail;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 transition-all hover:border-slate-300 hover:text-slate-900 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-slate-400 dark:hover:border-white/20 dark:hover:text-white"
                                    >
                                        <Icon className="h-5 w-5" />
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {social.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {social.label}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
                                >
                                    Name
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-indigo-500/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
                                >
                                    Email
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formData.contactEmail}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            contactEmail: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-indigo-500/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            message: e.target.value,
                                        })
                                    }
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-indigo-500/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-600"
                                    placeholder="Tell me about your project..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                            >
                                <Send className="h-4 w-4" />
                                {submitted
                                    ? 'Opening mail client...'
                                    : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
