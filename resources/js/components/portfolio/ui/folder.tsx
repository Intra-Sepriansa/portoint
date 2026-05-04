import { useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FolderProps {
    color?: string;
    size?: number;
    items?: ReactNode[];
    className?: string;
}

function darkenColor(hex: string, percent: number): string {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;

    if (color.length === 3) {
        color = color
            .split('')
            .map((character) => character + character)
            .join('');
    }

    const num = Number.parseInt(color, 16);
    let red = (num >> 16) & 0xff;
    let green = (num >> 8) & 0xff;
    let blue = num & 0xff;

    red = Math.max(0, Math.min(255, Math.floor(red * (1 - percent))));
    green = Math.max(0, Math.min(255, Math.floor(green * (1 - percent))));
    blue = Math.max(0, Math.min(255, Math.floor(blue * (1 - percent))));

    return `#${((1 << 24) + (red << 16) + (green << 8) + blue)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
}

export default function Folder({
    color = '#5227FF',
    size = 1,
    items = [],
    className,
}: FolderProps) {
    const maxItems = 3;
    const papers = items.slice(0, maxItems);

    while (papers.length < maxItems) {
        papers.push(null);
    }

    const [open, setOpen] = useState(false);
    const [paperOffsets, setPaperOffsets] = useState<
        { x: number; y: number }[]
    >(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = darkenColor('#ffffff', 0.1);
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = '#ffffff';

    function handleClick() {
        setOpen((prev) => !prev);

        if (open) {
            setPaperOffsets(
                Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
            );
        }
    }

    function handlePaperMouseMove(
        event: MouseEvent<HTMLDivElement>,
        index: number,
    ) {
        if (!open) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (event.clientX - centerX) * 0.15;
        const offsetY = (event.clientY - centerY) * 0.15;

        setPaperOffsets((prev) => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: offsetX, y: offsetY };

            return newOffsets;
        });
    }

    function handlePaperMouseLeave(index: number) {
        setPaperOffsets((prev) => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: 0, y: 0 };

            return newOffsets;
        });
    }

    const folderStyle = {
        '--folder-color': color,
        '--folder-back-color': folderBackColor,
        '--paper-1': paper1,
        '--paper-2': paper2,
        '--paper-3': paper3,
    } as CSSProperties;

    const scaleStyle = { transform: `scale(${size})` };

    function getOpenTransform(index: number) {
        if (index === 0) {
            return 'translate(-120%, -70%) rotate(-15deg)';
        }

        if (index === 1) {
            return 'translate(10%, -70%) rotate(15deg)';
        }

        if (index === 2) {
            return 'translate(-50%, -100%) rotate(5deg)';
        }

        return '';
    }

    return (
        <div style={scaleStyle} className={className}>
            <button
                type="button"
                aria-pressed={open}
                aria-label={open ? 'Close CV folder' : 'Open CV folder'}
                className={cn(
                    'group relative cursor-pointer border-0 bg-transparent p-0 transition-all duration-200 ease-in outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#060612]',
                    !open && 'hover:-translate-y-2',
                )}
                style={{
                    ...folderStyle,
                    transform: open ? 'translateY(-8px)' : undefined,
                }}
                onClick={handleClick}
            >
                <div
                    className="relative h-[80px] w-[100px] rounded-tl-none rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
                    style={{ backgroundColor: folderBackColor }}
                >
                    <span
                        className="absolute bottom-[98%] left-0 z-0 h-[10px] w-[30px] rounded-tl-[5px] rounded-tr-[5px] rounded-br-none rounded-bl-none"
                        style={{ backgroundColor: folderBackColor }}
                    />
                    {papers.map((item, index) => {
                        let sizeClasses = '';

                        if (index === 0) {
                            sizeClasses = 'h-[80%] w-[70%]';
                        }

                        if (index === 1) {
                            sizeClasses = open
                                ? 'h-[80%] w-[80%]'
                                : 'h-[70%] w-[80%]';
                        }

                        if (index === 2) {
                            sizeClasses = open
                                ? 'h-[80%] w-[90%]'
                                : 'h-[60%] w-[90%]';
                        }

                        const transformStyle = open
                            ? `${getOpenTransform(index)} translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`
                            : undefined;

                        return (
                            <div
                                key={index}
                                onMouseMove={(event) =>
                                    handlePaperMouseMove(event, index)
                                }
                                onMouseLeave={() =>
                                    handlePaperMouseLeave(index)
                                }
                                className={cn(
                                    'absolute bottom-[10%] left-1/2 z-20 overflow-hidden transition-all duration-300 ease-in-out',
                                    !open
                                        ? '-translate-x-1/2 translate-y-[10%] transform group-hover:translate-y-0'
                                        : 'hover:scale-110',
                                    sizeClasses,
                                )}
                                style={{
                                    ...(!open
                                        ? {}
                                        : { transform: transformStyle }),
                                    backgroundColor:
                                        index === 0
                                            ? paper1
                                            : index === 1
                                              ? paper2
                                              : paper3,
                                    borderRadius: '10px',
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                    <div
                        className={cn(
                            'absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out',
                            !open &&
                                'group-hover:[transform:skew(15deg)_scaleY(0.6)]',
                        )}
                        style={{
                            backgroundColor: color,
                            borderRadius: '5px 10px 10px 10px',
                            ...(open && {
                                transform: 'skew(15deg) scaleY(0.6)',
                            }),
                        }}
                    />
                    <div
                        className={cn(
                            'absolute z-30 h-full w-full origin-bottom transition-all duration-300 ease-in-out',
                            !open &&
                                'group-hover:[transform:skew(-15deg)_scaleY(0.6)]',
                        )}
                        style={{
                            backgroundColor: color,
                            borderRadius: '5px 10px 10px 10px',
                            ...(open && {
                                transform: 'skew(-15deg) scaleY(0.6)',
                            }),
                        }}
                    />
                </div>
            </button>
        </div>
    );
}
