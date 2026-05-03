import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
} from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';

type SwapPhase = 'in' | 'out';

type CapturedText = {
    id: string;
    phase: SwapPhase;
    rect: {
        height: number;
        left: number;
        top: number;
        width: number;
    };
    seed: number;
    style: {
        color: string;
        direction: string;
        font: string;
        fontFeatureSettings: string;
        fontKerning: string;
        letterSpacing: string;
        lineHeight: string;
        textAlign: string;
        textDecoration: string;
        textTransform: string;
        whiteSpace: string;
        wordSpacing: string;
    };
    text: string;
};

type TextSegment =
    | {
          chars: string[];
          type: 'space';
      }
    | {
          chars: string[];
          type: 'word';
      };

type PortfolioLetterSwapOverlayProps = {
    isChanging: boolean;
    language: PortfolioLanguage;
};

const captureOutEvent = 'portfolio-language-transition-out';
const transitionEndEvent = 'portfolio-language-transition-end';
const targetAttribute = 'data-portfolio-letter-swap-target';
const textSelector = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'a',
    'button',
    'span',
    'label',
    'input',
    'textarea',
    'kbd',
    'li',
    'dt',
    'dd',
    'figcaption',
    'summary',
].join(',');

function splitGraphemes(text: string): string[] {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        const segmenter = new Intl.Segmenter('id', {
            granularity: 'grapheme',
        });

        return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }

    return Array.from(text);
}

function splitTextSegments(text: string): TextSegment[] {
    return Array.from(text.matchAll(/\S+|\s+/g)).map(([segment]) => ({
        chars: splitGraphemes(segment),
        type: /^\s+$/.test(segment) ? 'space' : 'word',
    }));
}

function getText(element: HTMLElement): string {
    if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
    ) {
        return (element.placeholder || element.value)
            .replace(/\s+/g, ' ')
            .trim();
    }

    return (element.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function clearMarkedTargets() {
    document
        .querySelectorAll(`[${targetAttribute}]`)
        .forEach((element) => element.removeAttribute(targetAttribute));
}

function isVisibleTextElement(element: HTMLElement): boolean {
    if (
        element.closest('[data-portfolio-letter-swap-overlay]') ||
        element.closest('[data-portfolio-letter-swap-ignore]')
    ) {
        return false;
    }

    if (element instanceof HTMLInputElement && element.type === 'hidden') {
        return false;
    }

    const text = getText(element);

    if (!text) {
        return false;
    }

    const style = window.getComputedStyle(element);

    if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0'
    ) {
        return false;
    }

    const rect = element.getBoundingClientRect();
    const viewportPadding = 96;

    return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom >= -viewportPadding &&
        rect.top <= window.innerHeight + viewportPadding &&
        rect.right >= -viewportPadding &&
        rect.left <= window.innerWidth + viewportPadding
    );
}

function getLeafTextElements(shell: HTMLElement): HTMLElement[] {
    const candidates = Array.from(
        shell.querySelectorAll<HTMLElement>(textSelector),
    ).filter(isVisibleTextElement);
    const candidateSet = new Set(candidates);

    return candidates.filter((element) => {
        return !Array.from(
            element.querySelectorAll<HTMLElement>(textSelector),
        ).some((child) => candidateSet.has(child));
    });
}

function captureText(phase: SwapPhase): CapturedText[] {
    const shell = document.querySelector<HTMLElement>(
        '[data-portfolio-language-shell]',
    );

    if (!shell) {
        return [];
    }

    clearMarkedTargets();

    return getLeafTextElements(shell).map((element, index) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);

        element.setAttribute(targetAttribute, 'true');

        return {
            id: `${phase}-${index}-${Math.round(rect.top)}-${Math.round(
                rect.left,
            )}`,
            phase,
            rect: {
                height: rect.height,
                left: rect.left,
                top: rect.top,
                width: rect.width,
            },
            seed: index * 17 + getText(element).length,
            style: {
                color: style.color,
                direction: style.direction,
                font: style.font,
                fontFeatureSettings: style.fontFeatureSettings,
                fontKerning: style.fontKerning,
                letterSpacing: style.letterSpacing,
                lineHeight: style.lineHeight,
                textAlign: style.textAlign,
                textDecoration: style.textDecoration,
                textTransform: style.textTransform,
                whiteSpace: style.whiteSpace,
                wordSpacing: style.wordSpacing,
            },
            text: getText(element),
        };
    });
}

function getCharacterDelay(
    item: CapturedText,
    characterIndex: number,
    totalCharacters: number,
): number {
    const smoothRandomOffset = ((item.seed + characterIndex * 11) % 7) * 4;
    const orderedIndex =
        item.phase === 'out'
            ? characterIndex
            : Math.max(totalCharacters - characterIndex - 1, 0);

    return orderedIndex * 9 + smoothRandomOffset;
}

function getCharacterStyle(
    item: CapturedText,
    characterIndex: number,
    totalCharacters: number,
): CSSProperties {
    const tilt = (item.seed + characterIndex) % 2 === 0 ? 1 : -1;
    const roll = ((item.seed + characterIndex * 5) % 9) - 4;
    const verticalDirection = item.phase === 'out' ? -1 : 1;

    return {
        '--swap-delay': `${getCharacterDelay(
            item,
            characterIndex,
            totalCharacters,
        )}ms`,
        '--swap-rotate-x': `${verticalDirection * (70 + (characterIndex % 3) * 8)}deg`,
        '--swap-rotate-y': `${tilt * (28 + (characterIndex % 4) * 6)}deg`,
        '--swap-rotate-z': `${tilt * roll}deg`,
        '--swap-y': `${verticalDirection * (0.7 + (characterIndex % 4) * 0.08)}em`,
    } as CSSProperties;
}

function CapturedTextLayer({ item }: { item: CapturedText }) {
    const segments = splitTextSegments(item.text);
    const totalCharacters = segments.reduce(
        (total, segment) => total + segment.chars.length,
        0,
    );
    let characterIndex = 0;

    return (
        <span
            aria-hidden="true"
            className="portfolio-letter-swap-item"
            data-portfolio-letter-swap-phase={item.phase}
            style={
                {
                    color: item.style.color,
                    direction: item.style.direction,
                    font: item.style.font,
                    fontFeatureSettings: item.style.fontFeatureSettings,
                    fontKerning: item.style.fontKerning,
                    height: item.rect.height,
                    left: item.rect.left,
                    letterSpacing: item.style.letterSpacing,
                    lineHeight: item.style.lineHeight,
                    textAlign: item.style.textAlign,
                    textDecoration: item.style.textDecoration,
                    textTransform: item.style.textTransform,
                    top: item.rect.top,
                    whiteSpace:
                        item.style.whiteSpace === 'nowrap'
                            ? 'nowrap'
                            : 'normal',
                    width: item.rect.width,
                    wordSpacing: item.style.wordSpacing,
                } as CSSProperties
            }
        >
            {segments.map((segment, segmentIndex) => {
                if (segment.type === 'space') {
                    return (
                        <span
                            key={`${item.id}-space-${segmentIndex}`}
                            className="portfolio-letter-swap-space"
                        >
                            {segment.chars.map((char) =>
                                char === ' ' ? '\u00a0' : char,
                            )}
                        </span>
                    );
                }

                return (
                    <span
                        key={`${item.id}-word-${segmentIndex}`}
                        className="portfolio-letter-swap-word"
                    >
                        {segment.chars.map((char) => {
                            const currentIndex = characterIndex;

                            characterIndex += 1;

                            return (
                                <span
                                    key={`${item.id}-${currentIndex}`}
                                    className="portfolio-letter-swap-char"
                                    style={getCharacterStyle(
                                        item,
                                        currentIndex,
                                        totalCharacters,
                                    )}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                );
            })}
        </span>
    );
}

export function PortfolioLetterSwapOverlay({
    isChanging,
    language,
}: PortfolioLetterSwapOverlayProps) {
    const [items, setItems] = useState<CapturedText[]>([]);
    const previousLanguageRef = useRef(language);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        function handleOut() {
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }

            setItems(captureText('out'));
        }

        function handleEnd() {
            clearMarkedTargets();
            setItems([]);
        }

        window.addEventListener(captureOutEvent, handleOut);
        window.addEventListener(transitionEndEvent, handleEnd);

        return () => {
            window.removeEventListener(captureOutEvent, handleOut);
            window.removeEventListener(transitionEndEvent, handleEnd);
            handleEnd();
        };
    }, []);

    useLayoutEffect(() => {
        if (!isChanging || previousLanguageRef.current === language) {
            previousLanguageRef.current = language;

            return;
        }

        previousLanguageRef.current = language;
        frameRef.current = window.requestAnimationFrame(() => {
            const incomingItems = captureText('in');

            setItems((currentItems) => [
                ...currentItems.filter((item) => item.phase === 'out'),
                ...incomingItems,
            ]);
        });

        return () => {
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isChanging, language]);

    if (items.length === 0) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            data-portfolio-letter-swap-overlay
            className="pointer-events-none fixed inset-0 z-[95]"
        >
            {items.map((item) => (
                <CapturedTextLayer key={item.id} item={item} />
            ))}
        </div>
    );
}
