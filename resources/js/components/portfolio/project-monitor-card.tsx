import { Link } from '@inertiajs/react';
import type { Project } from '@/data/projects';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { show as projectShow } from '@/routes/projects';

const projectScreenImages: Record<string, string> = {
    'cidurian-riverside': '/project/ciper.png',
    'smanten-portal': '/project/smanten.png',
    linguapath: '/project/linguapath.png',
    majormind: '/project/majormind.png',
    'solvara-studio': '/project/Solvara Studio.png',
};

type ProjectMonitorCardProps = {
    language: PortfolioLanguage;
    project: Project;
};

const projectCardCopy = {
    en: {
        ariaLabel: 'View case study',
    },
    id: {
        ariaLabel: 'Lihat studi kasus',
    },
} satisfies Record<PortfolioLanguage, { ariaLabel: string }>;

export function ProjectMonitorCard({
    language,
    project,
}: ProjectMonitorCardProps) {
    const screenImage = projectScreenImages[project.slug];
    const copy = projectCardCopy[language];

    return (
        <Link
            href={projectShow(project.slug)}
            aria-label={`${copy.ariaLabel} ${project.name}`}
            className="group block h-full"
            prefetch
        >
            <article className="flex h-full flex-col overflow-hidden border border-slate-950 bg-white transition-transform duration-300 group-hover:-translate-y-1 dark:border-white/15 dark:bg-[#080818]">
                <div className="border-b border-slate-950 px-5 py-6 text-center dark:border-white/15">
                    <h3 className="text-2xl leading-none font-black tracking-normal text-slate-950 uppercase sm:text-3xl lg:text-4xl dark:text-white">
                        {project.name}
                    </h3>
                </div>

                <div className="relative min-h-[360px] flex-1 overflow-hidden bg-white sm:min-h-[470px] lg:min-h-[540px] dark:bg-[#080818]">
                    <div className="absolute bottom-[-5%] left-1/2 aspect-[3/2] w-[126%] max-w-[1040px] -translate-x-1/2 sm:w-[122%] lg:w-[120%] xl:w-[116%]">
                        <img
                            src="/project/project1.png"
                            alt=""
                            aria-hidden="true"
                            className="relative z-0 block h-full w-full object-contain select-none dark:hidden"
                            loading="lazy"
                            draggable={false}
                        />
                        <img
                            src="/project/project2-transparent.png"
                            alt=""
                            aria-hidden="true"
                            className="relative z-0 hidden h-full w-full object-contain select-none dark:block"
                            loading="lazy"
                            draggable={false}
                        />

                        {screenImage && (
                            <div className="absolute top-[28.2%] left-[11.9%] z-10 h-[33.5%] w-[44.3%] overflow-hidden bg-slate-950 dark:top-[30.5%] dark:h-[33.4%]">
                                <img
                                    src={screenImage}
                                    alt=""
                                    aria-hidden="true"
                                    className="block h-full w-full object-cover object-top select-none"
                                    loading="lazy"
                                    draggable={false}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
