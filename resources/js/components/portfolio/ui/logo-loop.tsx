import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
    CSSProperties,
    DependencyList,
    Key,
    ReactNode,
    RefObject,
} from 'react';
import { cn } from '@/lib/utils';

export type LogoItem =
    | {
          node: ReactNode;
          href?: string;
          title?: string;
          ariaLabel?: string;
      }
    | {
          src: string;
          alt?: string;
          href?: string;
          title?: string;
          srcSet?: string;
          sizes?: string;
          width?: number;
          height?: number;
      };

export type LogoLoopProps = {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    renderItem?: (item: LogoItem, key: Key) => ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
};

const animationConfig = {
    copyHeadroom: 2,
    minCopies: 2,
    smoothTau: 0.25,
} as const;

function toCssLength(value?: number | string): string | undefined {
    return typeof value === 'number' ? `${value}px` : (value ?? undefined);
}

function isNodeLogo(
    item: LogoItem,
): item is Extract<LogoItem, { node: ReactNode }> {
    return 'node' in item;
}

function useResizeObserver(
    callback: () => void,
    elements: RefObject<Element | null>[],
    measurementKey: DependencyList,
) {
    useEffect(() => {
        let frame = requestAnimationFrame(callback);

        if (!window.ResizeObserver) {
            const handleResize = () => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(callback);
            };

            window.addEventListener('resize', handleResize);

            return () => {
                cancelAnimationFrame(frame);
                window.removeEventListener('resize', handleResize);
            };
        }

        const observers = elements.map((ref) => {
            if (!ref.current) {
                return null;
            }

            const observer = new ResizeObserver(() => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(callback);
            });
            observer.observe(ref.current);

            return observer;
        });

        return () => {
            cancelAnimationFrame(frame);
            observers.forEach((observer) => observer?.disconnect());
        };
    }, [callback, elements, measurementKey]);
}

function useImageLoader(
    seqRef: RefObject<HTMLUListElement | null>,
    onLoad: () => void,
    imageKey: DependencyList,
) {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            const frame = requestAnimationFrame(onLoad);

            return () => cancelAnimationFrame(frame);
        }

        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;

            if (remainingImages === 0) {
                onLoad();
            }
        };

        images.forEach((image) => {
            if (image.complete) {
                handleImageLoad();

                return;
            }

            image.addEventListener('load', handleImageLoad, { once: true });
            image.addEventListener('error', handleImageLoad, { once: true });
        });

        return () => {
            images.forEach((image) => {
                image.removeEventListener('load', handleImageLoad);
                image.removeEventListener('error', handleImageLoad);
            });
        };
    }, [seqRef, onLoad, imageKey]);
}

function useAnimationLoop(
    trackRef: RefObject<HTMLDivElement | null>,
    targetVelocity: number,
    seqWidth: number,
    seqHeight: number,
    isHovered: boolean,
    hoverSpeed: number | undefined,
    isVertical: boolean,
) {
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const seqSize = isVertical ? seqHeight : seqWidth;

        if (seqSize > 0) {
            offsetRef.current =
                ((offsetRef.current % seqSize) + seqSize) % seqSize;
            track.style.transform = isVertical
                ? `translate3d(0, ${-offsetRef.current}px, 0)`
                : `translate3d(${-offsetRef.current}px, 0, 0)`;
        }

        if (prefersReduced) {
            track.style.transform = 'translate3d(0, 0, 0)';

            return () => {
                lastTimestampRef.current = null;
            };
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime =
                Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;
            const target =
                isHovered && hoverSpeed !== undefined
                    ? hoverSpeed
                    : targetVelocity;
            const easingFactor =
                1 - Math.exp(-deltaTime / animationConfig.smoothTau);
            velocityRef.current +=
                (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset =
                    offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;
                track.style.transform = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }

            lastTimestampRef.current = null;
        };
    }, [
        targetVelocity,
        seqWidth,
        seqHeight,
        isHovered,
        hoverSpeed,
        isVertical,
        trackRef,
    ]);
}

export const LogoLoop = memo<LogoLoopProps>(
    ({
        logos,
        speed = 120,
        direction = 'left',
        width = '100%',
        logoHeight = 28,
        gap = 32,
        pauseOnHover,
        hoverSpeed,
        fadeOut = false,
        fadeOutColor,
        scaleOnHover = false,
        renderItem,
        ariaLabel = 'Logo partner',
        className,
        style,
    }) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const trackRef = useRef<HTMLDivElement>(null);
        const seqRef = useRef<HTMLUListElement>(null);
        const [seqWidth, setSeqWidth] = useState(0);
        const [seqHeight, setSeqHeight] = useState(0);
        const [copyCount, setCopyCount] = useState<number>(
            animationConfig.minCopies,
        );
        const [isHovered, setIsHovered] = useState(false);
        const isVertical = direction === 'up' || direction === 'down';

        const effectiveHoverSpeed = useMemo(() => {
            if (hoverSpeed !== undefined) {
                return hoverSpeed;
            }

            if (pauseOnHover === true) {
                return 0;
            }

            if (pauseOnHover === false) {
                return undefined;
            }

            return 0;
        }, [hoverSpeed, pauseOnHover]);

        const targetVelocity = useMemo(() => {
            const magnitude = Math.abs(speed);
            const directionMultiplier = isVertical
                ? direction === 'up'
                    ? 1
                    : -1
                : direction === 'left'
                  ? 1
                  : -1;
            const speedMultiplier = speed < 0 ? -1 : 1;

            return magnitude * directionMultiplier * speedMultiplier;
        }, [speed, direction, isVertical]);

        const updateDimensions = useCallback(() => {
            const containerWidth = containerRef.current?.clientWidth ?? 0;
            const sequenceRect = seqRef.current?.getBoundingClientRect();
            const sequenceWidth = sequenceRect?.width ?? 0;
            const sequenceHeight = sequenceRect?.height ?? 0;

            if (isVertical) {
                const parentHeight =
                    containerRef.current?.parentElement?.clientHeight ?? 0;

                if (containerRef.current && parentHeight > 0) {
                    containerRef.current.style.height = `${Math.ceil(parentHeight)}px`;
                }

                if (sequenceHeight > 0) {
                    setSeqHeight(Math.ceil(sequenceHeight));
                    const viewport =
                        containerRef.current?.clientHeight ??
                        parentHeight ??
                        sequenceHeight;
                    const copiesNeeded =
                        Math.ceil(viewport / sequenceHeight) +
                        animationConfig.copyHeadroom;
                    setCopyCount(
                        Math.max(animationConfig.minCopies, copiesNeeded),
                    );
                }

                return;
            }

            if (sequenceWidth > 0) {
                setSeqWidth(Math.ceil(sequenceWidth));
                const copiesNeeded =
                    Math.ceil(containerWidth / sequenceWidth) +
                    animationConfig.copyHeadroom;
                setCopyCount(Math.max(animationConfig.minCopies, copiesNeeded));
            }
        }, [isVertical]);

        const observedElements = useMemo(() => [containerRef, seqRef], []);
        const measurementKey = useMemo(
            () => [logos, gap, logoHeight, isVertical],
            [logos, gap, logoHeight, isVertical],
        );

        useResizeObserver(updateDimensions, observedElements, measurementKey);
        useImageLoader(seqRef, updateDimensions, measurementKey);
        useAnimationLoop(
            trackRef,
            targetVelocity,
            seqWidth,
            seqHeight,
            isHovered,
            effectiveHoverSpeed,
            isVertical,
        );

        const cssVariables = useMemo(
            () =>
                ({
                    '--logoloop-gap': `${gap}px`,
                    '--logoloop-logoHeight': `${logoHeight}px`,
                    ...(fadeOutColor && {
                        '--logoloop-fadeColor': fadeOutColor,
                    }),
                }) as CSSProperties,
            [gap, logoHeight, fadeOutColor],
        );

        const handleMouseEnter = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) {
                setIsHovered(true);
            }
        }, [effectiveHoverSpeed]);

        const handleMouseLeave = useCallback(() => {
            if (effectiveHoverSpeed !== undefined) {
                setIsHovered(false);
            }
        }, [effectiveHoverSpeed]);

        const renderLogoItem = useCallback(
            (item: LogoItem, key: Key) => {
                const listClassName = cn(
                    'flex-none text-[length:var(--logoloop-logoHeight)] leading-none',
                    isVertical
                        ? 'mb-[var(--logoloop-gap)]'
                        : 'mr-[var(--logoloop-gap)]',
                    scaleOnHover && 'group/item overflow-visible',
                );

                if (renderItem) {
                    return (
                        <li className={listClassName} key={key} role="listitem">
                            {renderItem(item, key)}
                        </li>
                    );
                }

                const itemAriaLabel = isNodeLogo(item)
                    ? (item.ariaLabel ?? item.title)
                    : (item.alt ?? item.title);
                const content = isNodeLogo(item) ? (
                    <span
                        aria-hidden={!!item.href && !item.ariaLabel}
                        className={cn(
                            'inline-flex items-center motion-reduce:transition-none',
                            scaleOnHover &&
                                'transition-transform duration-300 ease-out group-hover/item:scale-[1.18]',
                        )}
                    >
                        {item.node}
                    </span>
                ) : (
                    <img
                        alt={item.alt ?? ''}
                        className={cn(
                            'block h-[var(--logoloop-logoHeight)] w-auto object-contain [-webkit-user-drag:none] [image-rendering:-webkit-optimize-contrast] motion-reduce:transition-none',
                            scaleOnHover &&
                                'transition-transform duration-300 ease-out group-hover/item:scale-[1.18]',
                        )}
                        decoding="async"
                        draggable={false}
                        height={item.height}
                        loading="lazy"
                        sizes={item.sizes}
                        src={item.src}
                        srcSet={item.srcSet}
                        title={item.title}
                        width={item.width}
                    />
                );
                const inner = item.href ? (
                    <a
                        aria-label={itemAriaLabel || 'link logo'}
                        className="inline-flex items-center rounded no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                        href={item.href}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        {content}
                    </a>
                ) : (
                    content
                );

                return (
                    <li className={listClassName} key={key} role="listitem">
                        {inner}
                    </li>
                );
            },
            [isVertical, scaleOnHover, renderItem],
        );

        const logoLists = useMemo(
            () =>
                Array.from({ length: copyCount }, (_, copyIndex) => (
                    <ul
                        aria-hidden={copyIndex > 0}
                        className={cn(
                            'flex items-center',
                            isVertical && 'flex-col',
                        )}
                        key={`copy-${copyIndex}`}
                        ref={copyIndex === 0 ? seqRef : undefined}
                        role="list"
                    >
                        {logos.map((item, itemIndex) =>
                            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
                        )}
                    </ul>
                )),
            [copyCount, logos, renderLogoItem, isVertical],
        );

        const containerStyle = useMemo(
            (): CSSProperties => ({
                width: isVertical
                    ? toCssLength(width) === '100%'
                        ? undefined
                        : toCssLength(width)
                    : (toCssLength(width) ?? '100%'),
                ...cssVariables,
                ...style,
            }),
            [width, cssVariables, style, isVertical],
        );

        return (
            <div
                aria-label={ariaLabel}
                className={cn(
                    'group relative [--logoloop-fadeColorAuto:#ffffff] [--logoloop-gap:32px] [--logoloop-logoHeight:28px] dark:[--logoloop-fadeColorAuto:#060612]',
                    isVertical
                        ? 'inline-block h-full overflow-hidden'
                        : 'overflow-x-hidden',
                    scaleOnHover &&
                        'py-[calc(var(--logoloop-logoHeight)*0.14)]',
                    className,
                )}
                ref={containerRef}
                role="region"
                style={containerStyle}
            >
                {fadeOut && (
                    <>
                        {isVertical ? (
                            <>
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(24px,12%,120px)] bg-[linear-gradient(to_bottom,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                                />
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(24px,12%,120px)] bg-[linear-gradient(to_top,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                                />
                            </>
                        ) : (
                            <>
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(28px,9%,132px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                                />
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(28px,9%,132px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]"
                                />
                            </>
                        )}
                    </>
                )}

                <div
                    className={cn(
                        'relative z-0 flex will-change-transform select-none motion-reduce:transform-none',
                        isVertical ? 'h-max w-full flex-col' : 'w-max flex-row',
                    )}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={trackRef}
                >
                    {logoLists}
                </div>
            </div>
        );
    },
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
