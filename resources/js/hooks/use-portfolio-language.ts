import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from 'react';
import type { PortfolioLanguage } from '@/data/portfolio-language';
import { defaultPortfolioLanguage } from '@/data/portfolio-language';

const storageKey = 'portfolio-language';
const transitionAttribute = 'data-portfolio-language-transition';
const transitionOutEvent = 'portfolio-language-transition-out';
const transitionEndEvent = 'portfolio-language-transition-end';
const transitionOutDelay = 180;
const transitionTotalDuration = 940;

function readStoredLanguage(): PortfolioLanguage {
    if (typeof window === 'undefined') {
        return defaultPortfolioLanguage;
    }

    const stored = window.localStorage.getItem(storageKey);

    return stored === 'en' || stored === 'id'
        ? stored
        : defaultPortfolioLanguage;
}

export function usePortfolioLanguage() {
    const [language, setLanguage] =
        useState<PortfolioLanguage>(readStoredLanguage);
    const [isLanguageChanging, setIsLanguageChanging] = useState(false);
    const languageRef = useRef(language);
    const timeoutRef = useRef<number[]>([]);

    const clearTransitionTimers = useCallback(() => {
        timeoutRef.current.forEach((timeoutId) => {
            window.clearTimeout(timeoutId);
        });

        timeoutRef.current = [];
    }, []);

    useEffect(() => {
        languageRef.current = language;
        window.localStorage.setItem(storageKey, language);
    }, [language]);

    useEffect(() => {
        return () => {
            clearTransitionTimers();
            document.documentElement.removeAttribute(transitionAttribute);
        };
    }, [clearTransitionTimers]);

    const setPortfolioLanguage: Dispatch<SetStateAction<PortfolioLanguage>> =
        useCallback(
            (nextLanguage) => {
                const targetLanguage =
                    typeof nextLanguage === 'function'
                        ? nextLanguage(languageRef.current)
                        : nextLanguage;

                if (targetLanguage === languageRef.current) {
                    return;
                }

                if (typeof window === 'undefined') {
                    setLanguage(targetLanguage);

                    return;
                }

                clearTransitionTimers();
                setIsLanguageChanging(true);
                window.dispatchEvent(new Event(transitionOutEvent));
                document.documentElement.setAttribute(
                    transitionAttribute,
                    'out',
                );

                timeoutRef.current = [
                    window.setTimeout(() => {
                        setLanguage(targetLanguage);
                        document.documentElement.setAttribute(
                            transitionAttribute,
                            'in',
                        );
                    }, transitionOutDelay),
                    window.setTimeout(() => {
                        document.documentElement.removeAttribute(
                            transitionAttribute,
                        );
                        window.dispatchEvent(new Event(transitionEndEvent));
                        setIsLanguageChanging(false);
                    }, transitionTotalDuration),
                ];
            },
            [clearTransitionTimers],
        );

    return [language, setPortfolioLanguage, isLanguageChanging] as const;
}
