
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText, AlertCircle, Plus, Radio, Mic, Activity, Brain } from 'lucide-react';

interface BriefingDetailViewProps {
    onContinue: () => void;
    onCollectClue: (clueId: string, word: string) => void;
    collectedClues: string[];
}

interface BriefingSection {
    id: number;
    title: string;
    content: string;
    isHighlight?: boolean;
}

import { BRIEFING_SECTIONS, JENNIFER_INTRO_DIALOGUE as JENNIFER_DIALOGUE } from '../constants';

export const BriefingDetailView: React.FC<BriefingDetailViewProps> = ({ onContinue, onCollectClue, collectedClues, collectedDossierIds }) => {
    const [currentSection, setCurrentSection] = useState(0);

    // Jennifer Dialogue State
    const [showJennifer, setShowJennifer] = useState(false);
    const [jenniferStep, setJenniferStep] = useState(0);
    const [jenniferTyping, setJenniferTyping] = useState(false);
    const [jenniferText, setJenniferText] = useState('');

    // Jennifer Typewriter
    React.useEffect(() => {
        if (!showJennifer) return;

        setJenniferTyping(true);
        setJenniferText('');
        const fullText = JENNIFER_DIALOGUE[jenniferStep];
        let index = 0;

        const timer = setInterval(() => {
            if (index < fullText.length) {
                setJenniferText(fullText.slice(0, index + 1));
                index++;
            } else {
                setJenniferTyping(false);
                clearInterval(timer);
            }
        }, 30);

        return () => clearInterval(timer);
    }, [showJennifer, jenniferStep]);

    const handleJenniferNext = () => {
        if (jenniferTyping) {
            setJenniferText(JENNIFER_DIALOGUE[jenniferStep]);
            setJenniferTyping(false);
        } else if (jenniferStep < JENNIFER_DIALOGUE.length - 1) {
            setJenniferStep(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentSection < BRIEFING_SECTIONS.length - 1) {
            setCurrentSection(currentSection + 1);
        }
    };

    const section = BRIEFING_SECTIONS[currentSection];
    const isLastSection = currentSection === BRIEFING_SECTIONS.length - 1;

    // Helper to parse content and render clickable clues
    const renderContent = (content: string) => {
        const parts = content.split(/(\[.*?\]\(clue:.*?\))/g);

        return parts.map((part, index) => {
            const match = part.match(/\[(.*?)\]\(clue:(.*?)\)/);
            if (match) {
                const [_, text, clueId] = match;
                const isCollected = collectedClues.includes(clueId) || collectedDossierIds.includes(clueId);

                return (
                    <span
                        key={index}
                        onClick={() => !isCollected && onCollectClue(clueId, text)}
                        className={`
              relative inline-block px-1 rounded cursor-pointer transition-all duration-300
              ${isCollected
                                ? 'text-[#d89853] bg-[#d89853]/10 border-b border-[#d89853]/30 cursor-default'
                                : 'text-[#c85a3f] hover:bg-[#c85a3f]/20 hover:scale-105 border-b border-dashed border-[#c85a3f]/50 animate-pulse'
                            }
            `}
                    >
                        {text}
                        {isCollected && (
                            <span className="absolute -top-3 -right-2 text-[8px] text-[#d89853] bg-black/80 px-1 rounded border border-[#d89853]/30">
                                已收录
                            </span>
                        )}
                        {!isCollected && (
                            <span className="absolute -top-3 -right-2 opacity-0 hover:opacity-100 transition-opacity text-[8px] text-[#c85a3f] bg-black/80 px-1 rounded border border-[#c85a3f]/30">
                                点击收集
                            </span>
                        )}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="min-h-screen cortex-bg flex items-center justify-center p-8 overflow-hidden relative">
            {/* Depth Layers */}
            <div className="depth-layer-1" />
            <div className="depth-layer-2" />

            {/* Scanlines */}
            <div className="scanlines" />

            <div className="max-w-4xl w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 text-[#8e3d2f]/70 mb-4 font-mono text-xs tracking-[0.3em] uppercase">
                        <FileText size={16} className="animate-pulse" />
                        档案详情 // DETAILED BRIEFING
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-[#d89853]/95 font-mono neural-glow">
                        PROJECT G.B.O.S.
                    </h1>
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <div
                            className={`${section.isHighlight
                                ? 'bg-gradient-to-br from-[#8e3d2f]/35 to-[#b5594a]/30 border-l-4 border-[#d4574e]/55'
                                : 'bg-black/50 border-l-4 border-[#c85a3f]/50'
                                } backdrop-blur-sm p-8 space-y-4 rounded-r-lg neural-glow`}
                        >
                            <div
                                className={`${section.isHighlight ? 'text-[#d4574e]/85' : 'text-[#b5594a]/60'
                                    } text-sm tracking-widest uppercase font-mono flex items-center gap-2`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${section.isHighlight ? 'bg-[#d4574e]/70' : 'bg-[#c85a3f]/70'
                                    } animate-pulse`} />
                                {section.title}
                            </div>
                            <div
                                className={`${section.isHighlight ? 'text-[#d89853]/95' : 'text-neutral-200'
                                    } text-lg leading-relaxed whitespace-pre-line`}
                            >
                                {renderContent(section.content)}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-6 mt-12"
                >
                    {!isLastSection ? (
                        <button
                            onClick={handleNext}
                            className="group flex items-center gap-3 px-8 py-4 bg-[#c85a3f]/12 hover:bg-[#c85a3f]/20 border border-[#c85a3f]/40 text-[#d89853]/95 rounded-lg transition-all font-mono text-sm tracking-wider backdrop-blur-sm neural-glow"
                        >
                            下一页 NEXT
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowJennifer(true)}
                            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#8e3d2f]/30 via-[#c85a3f]/28 to-[#8e3d2f]/30 hover:from-[#8e3d2f]/40 hover:via-[#c85a3f]/38 hover:to-[#8e3d2f]/40 border-2 border-[#c85a3f]/55 text-[#d89853]/98 rounded-lg transition-all font-mono text-base tracking-widest backdrop-blur-md neural-glow"
                        >
                            进入罗伯特卡彭的潜意识 ENTER SUBCONSCIOUS
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                    )}

                    {isLastSection && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-[10px] text-[#d4574e]/80 font-mono tracking-[0.3em] uppercase flex items-center gap-2"
                        >
                            <AlertCircle size={12} />
                            准备建立神经连接
                        </motion.div>
                    )}

                    {/* Progress indicator */}
                    <div className="flex gap-2 mt-4">
                        {BRIEFING_SECTIONS.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1 transition-all rounded-full ${index === currentSection
                                    ? 'w-8 bg-[#c85a3f]/85 shadow-[0_0_8px_rgba(212,87,78,0.6)]'
                                    : index < currentSection
                                        ? 'w-4 bg-[#8e3d2f]/55'
                                        : 'w-2 bg-neutral-800/60'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Neural particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#c85a3f]/60 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                        }}
                    />
                ))}
            </div>
            {/* Jennifer Dialogue Overlay */}
            <AnimatePresence>
                {showJennifer && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <div className="w-full max-w-2xl bg-[#0f172a]/90 border border-[#334155] p-1 rounded-lg shadow-[0_0_50px_rgba(15,23,42,0.6)] backdrop-blur-xl relative overflow-hidden">
                            {/* Operator Header */}
                            <div className="bg-[#1e293b]/50 px-6 py-3 flex justify-between items-center border-b border-[#334155]">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-[#475569]/30 rounded-full border border-[#475569]/50">
                                        <Mic size={14} className="text-[#94a3b8]" />
                                    </div>
                                    <span className="text-[#e2e8f0] font-mono tracking-widest text-xs font-bold uppercase">
                                        BAU OPERATOR: JENNIFER
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[#64748b] text-[10px] bg-[#1e293b] px-2 py-0.5 rounded font-mono tracking-wider">
                                        LIVE FEED
                                    </span>
                                </div>
                            </div>

                            {/* Waveform Visualizer */}
                            <div className="h-16 w-full bg-[#020617] relative flex items-center justify-center gap-1 overflow-hidden opacity-80">
                                {[...Array(40)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-[#38bdf8]/40 rounded-full"
                                        animate={{
                                            height: jenniferTyping ? [4, 12 + Math.random() * 20, 4] : 4,
                                            opacity: jenniferTyping ? 1 : 0.3
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            repeat: Infinity,
                                            delay: i * 0.02,
                                            ease: "circInOut"
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Dialogue Content */}
                            <div className="p-8 min-h-[160px] flex items-center justify-center text-center relative">
                                <p className="text-[#e2e8f0] text-lg font-light tracking-wide leading-relaxed font-sans">
                                    {jenniferText}
                                    {jenniferTyping && <span className="animate-pulse ml-1 inline-block w-2 h-5 bg-[#38bdf8] align-middle" />}
                                </p>
                                <div className="absolute top-2 right-2 text-[#334155]/20">
                                    <Activity size={120} />
                                </div>
                            </div>

                            {/* Footer / Navigation */}
                            <div className="bg-[#1e293b]/30 p-4 flex justify-center border-t border-[#334155]">
                                {jenniferStep < JENNIFER_DIALOGUE.length - 1 ? (
                                    <button
                                        onClick={handleJenniferNext}
                                        className="group flex items-center gap-3 px-8 py-3 bg-[#334155]/50 hover:bg-[#475569]/50 border border-[#475569] text-[#e2e8f0] rounded-lg transition-all font-mono text-sm tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.1)] outline-none"
                                    >
                                        {jenniferTyping ? '...' : '确认 // ACKNOWLEDGE'}
                                        <ChevronRight size={16} className="text-[#94a3b8] group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onContinue}
                                        disabled={jenniferTyping}
                                        className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] hover:from-[#1e293b] hover:via-[#334155] hover:to-[#1e293b] border border-[#38bdf8]/50 text-[#38bdf8] rounded-lg transition-all font-mono text-base tracking-widest disabled:opacity-50 backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                                    >
                                        <Brain size={20} className="animate-pulse" />
                                        进入罗伯特·卡彭的潜意识
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
