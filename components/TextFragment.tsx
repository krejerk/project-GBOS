import React, { useMemo } from 'react';
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
}

export const TextFragment: React.FC<TextFragmentProps> = React.memo(({
    text,
    layerIndex,
    pIndex,
    isStabilized,
    keywordMap,
    highlightKeywords,
    collectionEffects,
    onKeywordClick
}) => {
    const fragmentId = `${layerIndex}-${pIndex}`;
    const seed = (layerIndex + 1) * (pIndex + 5);

    // Memoize static visual properties based on seed to avoid recalculation
    const visualProps = useMemo(() => {
        const rotate = (seed % 6) - 3;
        const offsetX = (seed % 30) - 15;
        const zIndex = 10 + layerIndex;

        const clipPathVariations = [
            'polygon(2% 0%, 98% 1%, 99% 3%, 100% 97%, 97% 100%, 3% 99%, 0% 95%, 1% 2%)',
            'polygon(1% 3%, 4% 1%, 96% 0%, 99% 2%, 100% 96%, 98% 99%, 4% 100%, 0% 97%, 2% 5%)',
            'polygon(0% 2%, 97% 0%, 100% 4%, 99% 98%, 96% 100%, 2% 99%, 1% 96%, 0% 4%)',
            'polygon(3% 0%, 99% 2%, 100% 95%, 98% 100%, 1% 98%, 0% 3%, 2% 1%)',
            'polygon(1% 1%, 98% 0%, 100% 3%, 99% 97%, 97% 100%, 3% 99%, 0% 96%, 1% 4%)',
            'polygon(2% 2%, 96% 1%, 99% 0%, 100% 98%, 98% 100%, 4% 98%, 1% 99%, 0% 5%)'
        ];
        const clipPath = clipPathVariations[seed % clipPathVariations.length];

        const topLeftSize = 6 + (seed % 4);
        const bottomRightSize = 5 + ((seed * 3) % 5);
        const decorOpacity = 0.2 + ((seed % 3) * 0.1);

        return { rotate, offsetX, zIndex, clipPath, topLeftSize, bottomRightSize, decorOpacity };
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
            initial={{ opacity: 0, scale: 0.95, y: 30, rotate: visualProps.rotate + 3 }}
            animate={{
                opacity: isStabilized ? 1 : 0.8,
                scale: 1,
                y: 0,
                rotate: visualProps.rotate
            }}
            transition={{
                opacity: { delay: 0.05 + (layerIndex * 0.3) + (pIndex * 0.15), duration: 0.6, ease: "easeOut" },
                y: { delay: 0.05 + (layerIndex * 0.3) + (pIndex * 0.15), duration: 0.8, ease: "easeOut" },
                scale: { delay: 0.05 + (layerIndex * 0.3) + (pIndex * 0.15), duration: 0.8, ease: "easeOut" },
                rotate: { delay: 0.05 + (layerIndex * 0.3) + (pIndex * 0.15), duration: 0.8, ease: "easeOut" }
            }}
            whileHover={{
                scale: 1.02,
                zIndex: 100,
                rotate: 0,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            className="relative mb-16 p-8 bg-[#1a1410]/80 border border-[#d89853]/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group/fragment backdrop-blur-sm overflow-hidden"
            style={{
                marginLeft: `${visualProps.offsetX}px`,
                transform: `rotate(${visualProps.rotate}deg) translateZ(0)`,
                zIndex: visualProps.zIndex,
                clipPath: visualProps.clipPath,
                willChange: 'transform, opacity' // Optimization hint
            }}
        >
            {/* Paper Texture Overlay - Static div instead of image for perf */}
            <div className="absolute inset-0 bg-[#d89853] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            {/* Irregular Fragment Decor */}
            <div className="absolute top-0 left-0 bg-[#d89853]" style={{ width: `${visualProps.topLeftSize * 4}px`, height: '1px', opacity: visualProps.decorOpacity }} />
            <div className="absolute top-0 left-0 bg-[#d89853]" style={{ width: '1px', height: `${visualProps.topLeftSize * 4}px`, opacity: visualProps.decorOpacity }} />
            <div className="absolute bottom-0 right-0 bg-[#c85a3f]" style={{ width: `${visualProps.bottomRightSize * 4}px`, height: '1px', opacity: visualProps.decorOpacity * 0.7 }} />

            {/* Label */}
            <div className="absolute -top-4 -left-3 font-mono select-none group-hover/fragment:animate-pulse">
                <div className="text-[9px] tracking-wider text-[#d89853] opacity-40">
                    [FRAGMENT_{fragmentId}]
                </div>
            </div>

            {/* Content Rendering */}
            <p className="font-serif leading-relaxed text-lg text-[#d89853]/90 text-justify">
                {contentParts.map((part, j) => {
                    const isPickable = part.isKeyword && highlightKeywords.has(part.text);

                    if (isPickable) {
                        const isEffectActive = collectionEffects[part.text];

                        return (
                            <span
                                key={j}
                                onClick={(e) => onKeywordClick(e, part.text)}
                                className={`
                                    cursor-pointer font-bold inline-block mx-1 relative transition-all duration-300
                                    ${isEffectActive
                                        ? 'text-white bg-[#c85a3f] px-1 animate-pulse shadow-lg scale-110'
                                        : 'text-[#c85a3f] border-b border-dashed border-[#c85a3f] hover:text-white hover:bg-[#c85a3f]/10 px-0.5'
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
                    return <span key={j} className="opacity-90">{part.text}</span>;
                })}
            </p>

            {/* Truncated Footer */}
            {layerIndex > 0 && (
                <div className="mt-4 pt-4 border-t border-[#d89853]/5 italic text-sm text-[#c85a3f]/60 font-mono flex justify-between">
                    <span className="opacity-50">[TRUNCATED...]</span>
                </div>
            )}
        </motion.div>
    );
});

TextFragment.displayName = 'TextFragment';
