import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealElement = 'div' | 'h2' | 'h3' | 'p' | 'span';

type ScrollRevealProps = {
    children: ReactNode;
    as?: ScrollRevealElement;
    scrollContainerRef?: RefObject<HTMLElement | null>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
};

export function ScrollReveal({
    children,
    as: Component = 'h2',
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps) {
    const containerRef = useRef<HTMLElement | null>(null);
    const textContent = typeof children === 'string' ? children : undefined;

    const splitText = useMemo(() => {
        if (!textContent) {
            return children;
        }

        return textContent.split(/(\s+)/).map((word, index) => {
            if (/^\s+$/.test(word)) {
                return word;
            }

            return (
                <span className="word inline-block" key={`${word}-${index}`}>
                    {word}
                </span>
            );
        });
    }, [children, textContent]);

    useEffect(() => {
        const element = containerRef.current;

        if (!element) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const scrollContainer = scrollContainerRef?.current ?? window;
        const context = gsap.context(() => {
            gsap.fromTo(
                element,
                { rotate: baseRotation, transformOrigin: '0% 50%' },
                {
                    ease: 'none',
                    rotate: 0,
                    scrollTrigger: {
                        trigger: element,
                        scroller: scrollContainer,
                        start: 'top bottom',
                        end: rotationEnd,
                        scrub: true,
                    },
                },
            );

            const wordElements = element.querySelectorAll<HTMLElement>('.word');

            gsap.fromTo(
                wordElements,
                { opacity: baseOpacity, willChange: 'opacity, filter' },
                {
                    ease: 'none',
                    opacity: 1,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: element,
                        scroller: scrollContainer,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true,
                    },
                },
            );

            if (enableBlur) {
                gsap.fromTo(
                    wordElements,
                    { filter: `blur(${blurStrength}px)` },
                    {
                        ease: 'none',
                        filter: 'blur(0px)',
                        stagger: 0.05,
                        scrollTrigger: {
                            trigger: element,
                            scroller: scrollContainer,
                            start: 'top bottom-=20%',
                            end: wordAnimationEnd,
                            scrub: true,
                        },
                    },
                );
            }
        }, element);

        return () => context.revert();
    }, [
        baseOpacity,
        baseRotation,
        blurStrength,
        enableBlur,
        rotationEnd,
        scrollContainerRef,
        wordAnimationEnd,
    ]);

    const setContainerRef = (node: HTMLElement | null) => {
        containerRef.current = node;
    };

    return (
        <Component
            ref={setContainerRef}
            className={cn('my-5', containerClassName)}
        >
            <span
                className={cn(
                    'block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold',
                    textClassName,
                )}
            >
                {splitText}
            </span>
        </Component>
    );
}
