import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StaggeredTextProps = {
    text: string;
    className?: string;
    segmentClassName?: string;
    segmentBy?: 'chars' | 'words';
    delayStep?: number;
    initialDelay?: number;
    triggerOnView?: boolean;
};

export function StaggeredText({
    text,
    className,
    segmentClassName,
    segmentBy = 'chars',
    delayStep = 0.035,
    initialDelay = 0,
    triggerOnView = false,
}: StaggeredTextProps) {
    const shouldReduceMotion = useReducedMotion();
    const segments =
        segmentBy === 'words'
            ? text.split(/(\s+)/).filter(Boolean)
            : text.split('');
    const initialState = shouldReduceMotion
        ? false
        : { opacity: 0, y: 18, filter: 'blur(8px)' };
    const visibleState = shouldReduceMotion
        ? undefined
        : { opacity: 1, y: 0, filter: 'blur(0px)' };

    return (
        <span aria-label={text} className={cn('inline-block', className)}>
            {segments.map((segment, index) => {
                const isSpace = /^\s+$/.test(segment);

                if (isSpace) {
                    return <span key={`${segment}-${index}`}> </span>;
                }

                return (
                    <motion.span
                        key={`${segment}-${index}`}
                        aria-hidden="true"
                        initial={initialState}
                        animate={triggerOnView ? undefined : visibleState}
                        transition={{
                            delay: initialDelay + index * delayStep,
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        viewport={
                            triggerOnView
                                ? { once: true, margin: '-80px' }
                                : undefined
                        }
                        whileInView={triggerOnView ? visibleState : undefined}
                        className={cn('inline-block', segmentClassName)}
                    >
                        {segment}
                    </motion.span>
                );
            })}
        </span>
    );
}
