import * as React from 'react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TextFragmentProps {
    text: string;
    layerIndex: number;
    pIndex: number;
    isStabilized: boolean; // Keep for initial animation trigger
    keywordMap: Record<string, string>;
    highlightKeywords: Set<string>;
    collectionEffects: Record<string, boolean>; // Passed down to trigger updates only when needed
    onKeywordClick: (e: React.MouseEvent, word: string) => void;
    useReporterStyle?: boolean;
}

export const TextFragment: React.FC<TextFragmentProps> = React.memo(({
    text,
    layerIndex,
    pIndex,
    isStabilized,
    keywordMap,
    highlightKeywords,
    collectionEffects,
    onKeywordClick,
    useReporterStyle = false
}) => {
    const fragmentId = `${layerIndex}-${pIndex}`;
    const seed = (layerIndex + 1) * (pIndex + 5);

    // Memoize static visual properties based on seed to avoid recalculation
    const visualProps = useMemo(() => {
        const zIndex = 10 + layerIndex;
        // Removed jagged clip_paths, keeping a clean block for CRT immersion
        const clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        const decorOpacity = 0.2 + ((seed % 3) * 0.1);

        return { zIndex, clipPath, decorOpacity };
    }, [seed, layerIndex]);

    // Memoize the split content to avoid expensive regex on every render
    const contentParts = useMemo(() => {
        const keywords = Object.keys(keywordMap);
        if (keywords.length === 0) return [{ text, isKeyword: false }];

        // Create regex only once per fragment when keywords change
        const regex = new RegExp(`(${keywords.join('|')})`, 'g');
        return text.split(regex).map(part => ({
            text: part,
            isKeyword: keywords.includes(part)
        }));
    }, [text, keywordMap]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                opacity: { delay: 0.05, duration: 0.6, ease: "easeOut" },
                y: { delay: 0.05, duration: 0.6, ease: "easeOut" },
            }}
            whileHover={{
                zIndex: 100,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="relative mb-8 p-4 md:p-6 bg-[var(--confess-surface)] border-l md:border-l-2 border-[var(--confess-border)] shadow-[0_10px_30px_rgba(0,0,0,0.8)] group/fragment overflow-hidden"
            style={{
                zIndex: visualProps.zIndex,
                clipPath: visualProps.clipPath,
                willChange: 'transform, opacity' // Optimization hint
            }}
        >
            {/* CRT Phosphor Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--confess-highlight)]/5 to-transparent opacity-20 pointer-events-none mix-blend-screen" />

            {/* Subtle Terminal Scan Line */}
            <div className="absolute top-0 left-0 bg-[var(--confess-highlight)]" style={{ width: '100%', height: '1px', opacity: visualProps.decorOpacity * 0.4 }} />
            <div className="absolute bottom-0 right-0 bg-[var(--confess-highlight)]" style={{ width: '100%', height: '1px', opacity: visualProps.decorOpacity * 0.2 }} />

            {/* Label */}
            <div className={`mb-4 font-mono select-none flex items-center gap-2 border-b pb-2 ${useReporterStyle ? 'border-reporter-border' : 'border-[var(--confess-border)]'}`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse opacity-50 ${useReporterStyle ? 'bg-reporter-highlight' : 'bg-[var(--confess-highlight)]'}`} />
                <div className={`text-[10px] tracking-widest opacity-60 uppercase ${useReporterStyle ? 'text-reporter-highlight' : 'text-[var(--confess-highlight)]'}`}>
                    {useReporterStyle ? `LOG_ENTRY_${fragmentId}` : `SECTOR_${fragmentId}`} // {useReporterStyle ? 'RECOVERED' : 'DECRYPTED'}
                </div>
            </div>

            {/* Content Rendering */}
            <p className={`leading-loose text-lg text-justify tracking-wide opacity-90 ${useReporterStyle ? 'font-decayed' : 'font-serif text-[var(--confess-text)]'}`}>
                {(() => {
                    const seenInFragment = new Set<string>();
                    return contentParts.map((part, j) => {
                        const isPickable = part.isKeyword && highlightKeywords.has(part.text) && !seenInFragment.has(part.text);

                        if (isPickable) {
                            seenInFragment.add(part.text);
                            const isEffectActive = collectionEffects[part.text];

                            return (
                                <span
                                    key={j}
                                    onClick={(e) => onKeywordClick(e, part.text)}
                                    className={`
                                        cursor-pointer font-bold inline-block mx-1 relative transition-all duration-300
                                        ${isEffectActive
                                            ? 'text-black bg-[var(--confess-highlight)] px-1 animate-pulse shadow-[0_0_15px_var(--confess-highlight)] scale-110'
                                            : 'text-[var(--confess-highlight)] border-b border-dashed border-[var(--confess-border)] hover:text-white hover:bg-[var(--confess-highlight)]/20 px-0.5'
                                        }
                                    `}
                                >
                                    {part.text}
                                    {!isEffectActive && (
                                        <span className="absolute -top-1 -right-1 opacity-50"><Sparkles size={8} /></span>
                                    )}
                                </span>
                            );
                        }
                        return <span key={j}>{part.text}</span>;
                    });
                })()}
            </p>

            {/* Truncated Footer */}
            {layerIndex > 0 && (
                <div className="mt-4 pt-4 border-t border-[var(--confess-border)] italic text-sm text-[var(--confess-text)]/40 font-mono flex justify-between">
                    <span>[TRUNCATED...]</span>
                </div>
            )}
        </motion.div>
    );
});

TextFragment.displayName = 'TextFragment';
