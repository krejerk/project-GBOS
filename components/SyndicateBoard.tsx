import * as React from 'react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Lightbulb, Plus, StickyNote, Trash2, Edit3, X } from 'lucide-react';
import { RELATIONSHIP_TREE } from '../constants';
import { BoardNote } from '../types';

// Using the locally generated high-fidelity asset
const REALISTIC_CORK_URL = `${import.meta.env.BASE_URL}textures/cork_board.png`;

interface SyndicateBoardProps {
    unlockedPeople: string[];
    onNodeClick?: (id: string) => void;
    onClose: () => void;
    phase?: number; // 1 or 2
    hasSwitchedPersona?: boolean;
    playerHypotheses?: Record<string, string>;
    onUpdateHypothesis?: (nodeId: string, name: string) => void;
}

// --- PREMIUM LIGHT BULB COMPONENT ---
const PremiumBulb = ({ isOn, className = "" }: { isOn: boolean, className?: string }) => {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible">
                <defs>
                    <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="filament-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="100%" stopColor="#fde047" />
                    </radialGradient>
                </defs>

                {/* 1. Bulb Glass Outline */}
                <path
                    d="M50 10 C30 10 15 25 15 50 C15 75 35 90 35 110 L65 110 C65 90 85 75 85 50 C85 25 70 10 50 10Z"
                    fill={isOn ? 'rgba(253, 224, 71, 0.2)' : 'rgba(20, 20, 20, 0.8)'}
                    stroke={isOn ? '#fde047' : '#333'}
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                />

                {/* 2. Metal Base (Cap) */}
                <rect x="35" y="110" width="30" height="8" rx="1" fill="#444" stroke="#222" />
                <rect x="35" y="120" width="30" height="8" rx="1" fill="#333" stroke="#111" />
                <rect x="35" y="130" width="30" height="6" rx="1" fill="#222" stroke="#000" />
                <path d="M40 136 L60 136 L50 145 Z" fill="#111" />

                {/* 3. The Filament (GLOWING PATH) */}
                <AnimatePresence>
                    {isOn && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [1, 0.9, 1, 0.85, 1] }}
                            transition={{
                                opacity: { duration: 0.15, repeat: Infinity, repeatDelay: Math.random() * 2 },
                            }}
                        >
                            {/* Filament Wire */}
                            <path
                                d="M42 110 L45 80 L50 90 L55 80 L58 110"
                                fill="none"
                                stroke="url(#filament-grad)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                filter="url(#bulb-glow)"
                            />
                            {/* Core Glow */}
                            <circle cx="50" cy="85" r="15" fill="rgba(253, 224, 71, 0.4)" filter="blur(12px)" />
                        </motion.g>
                    )}
                </AnimatePresence>

                {/* 4. Glass Reflection */}
                <path
                    d="M30 30 C25 40 25 50 30 60"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>

            {/* Outer Aura (Global Environmental Glow) */}
            {isOn && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-yellow-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />
            )}
        </div>
    );
};

export const SyndicateBoard: React.FC<SyndicateBoardProps> = ({
    unlockedPeople,
    onClose,
    phase = 1,
    hasSwitchedPersona = false,
    playerHypotheses = {},
    onUpdateHypothesis
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLightsOn, setIsLightsOn] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Filter nodes based on Phase and Chapter
    const visibleNodes = useMemo(() => {
        return RELATIONSHIP_TREE.filter(node => node.phase <= phase);
    }, [phase]);

    // Role-based vertical ranking
    const ROLE_Y_MAP: Record<string, number> = {
        'BOSS': 15,
        'UNDERBOSS': 25,
        'LIEUTENANT': 40,
        'SOLDIER': 60,
        'ASSOCIATE': 75,
        'AGENT': 90,
        'HANDLER': 90
    };

    const getXForChapter = (chapter: number) => {
        if (!chapter) return 5;
        return (chapter - 1) * 16 + 8; // 6 chapters spread across 100%
    };

    const chapterHeaders = ["Ch.1 始发站", "Ch.2 见证者", "Ch.3 教派与流通", "Ch.4 陷落者", "Ch.5 阴影中人", "Ch.6 源头"];

    // LIGHT SWITCH LOGIC
    const handleLightInteraction = () => {
        if (!isLightsOn) {
            setIsLightsOn(true);
        } else {
            setIsLightsOn(false);
            setIsExiting(true);
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">

            {/* BLACKOUT / LIGHT INTERACTION LAYER */}
            <AnimatePresence>
                {(!isLightsOn || isExiting) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[9000] bg-black flex items-center justify-center cursor-pointer"
                        onClick={handleLightInteraction}
                    >
                        <div className="flex flex-col items-center gap-6 relative z-10">
                            {/* Hanging Bulb in Void */}
                            <motion.div
                                animate={{
                                    y: [0, 8, 0],
                                    rotate: [0, 2, 0, -2, 0]
                                }}
                                transition={{
                                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, // Sway
                                    rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } // Rotate
                                }}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[100vh] bg-neutral-800 -mt-[100vh]" />
                                <PremiumBulb isOn={false} className="w-24 h-36 opacity-60 group-hover:opacity-100 transition-opacity" />

                                {/* Subtle Glow in dark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-900/5 blur-3xl rounded-full pointer-events-none" />
                            </motion.div>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                className="font-mono text-neutral-600 text-[10px] tracking-[0.8em] mt-8 uppercase"
                            >
                                {isExiting ? "" : "Pull the Cord"}
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Room Environment Container */}
            <div className={`relative min-h-[1600px] w-full flex flex-col items-center pt-32 pb-32 transition-all duration-1000 ${isLightsOn ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-95 grayscale'}`}>

                {/* 1. Concrete Wall Background with Environmental Spill */}
                <div
                    className="absolute inset-0 z-0 bg-[#0F0F0F]"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 50% 120px, rgba(253, 224, 71, 0.15) 0%, transparent 70%),
                            linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.4), rgba(0,0,0,1)),
                            url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')
                        `,
                        backgroundSize: '100% 100%, cover, 400px'
                    }}
                />

                {/* 2. Graffiti */}
                <div className="absolute top-[80px] left-0 w-full z-0 pointer-events-none opacity-40 select-none mix-blend-overlay">
                    <div className="flex justify-around items-center px-10 md:px-32">
                        <motion.div
                            animate={{ opacity: isLightsOn ? [0.3, 0.4, 0.35, 0.4] : 0.1 }}
                            transition={{ duration: 0.1, repeat: Infinity }}
                            className="font-creepster text-7xl md:text-[14rem] text-[#854d0e]/30 rotate-[-1deg] tracking-widest blur-[2px]"
                        >
                            YELLOW KING
                        </motion.div>
                    </div>
                </div>

                {/* 3. The Lightbulb (ON STATE) - Doubles as Exit Switch */}
                <motion.div
                    className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-[80] cursor-pointer group"
                    onClick={handleLightInteraction}
                    whileTap={{ y: 15 }} // Pull down effect
                    title="Turn Off & Leave"
                >
                    {/* Cord with braided look */}
                    <div className="relative mx-auto w-[4px] h-[160px] flex justify-center">
                        <div className="w-[1px] h-full bg-neutral-800" />
                        <div className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent 100%)', backgroundSize: '4px 4px' }} />
                    </div>

                    <PremiumBulb isOn={isLightsOn && !isExiting} className="w-20 h-32 -mt-4" />

                    {/* Pull Cord Handle (Teardrop shape) */}
                    <div className="absolute top-[165px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-[2px] h-4 bg-neutral-800" />
                        <div className="w-4 h-6 bg-gradient-to-b from-neutral-800 to-black border border-neutral-700/30 rounded-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-1 left-1 w-1 h-2 bg-white/10 rounded-full" />
                        </div>
                    </div>

                    {/* Interaction Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400/0 group-hover:bg-yellow-400/5 blur-3xl rounded-full transition-colors duration-500 pointer-events-none" />
                </motion.div>

                {/* 4. The Board - Minimalist Roadmap Grid */}
                <div
                    ref={containerRef}
                    className="relative w-full md:w-[1300px] min-h-[2500px] md:min-h-[1000px] bg-[#050505] z-10 shadow-[0_50px_120px_rgba(0,0,0,1)] border-[4px] border-[#222] rounded-sm overflow-y-auto md:overflow-hidden scrollbar-hide"
                    style={{
                        backgroundImage: `
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '100% 300px, 16.66% 100px', // Adjusted for mobile roadmap
                    }}
                >
                    {/* Chapter Headers - Desktop only or rethink for mobile */}
                    <div className="absolute top-0 left-0 w-full h-12 flex z-30 border-b border-white/5 bg-black/50 backdrop-blur-md hidden md:flex">
                        {chapterHeaders.map((header, i) => (
                            <div key={i} className="flex-1 flex items-center justify-center border-r border-white/5 last:border-none">
                                <span className="font-mono text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">{header}</span>
                            </div>
                        ))}
                    </div>

                    {/* Nodes Grid */}
                    {visibleNodes.map((node, index) => {
                        const isUnlocked = unlockedPeople.includes(node.id);
                        const isActive = activeId === node.id;
                        const x = getXForChapter(node.chapter || 1);

                        // Vertical stacking within the column
                        const columnMembers = visibleNodes.filter(m => m.chapter === (node.chapter || 1));
                        const memberIndex = columnMembers.findIndex(m => m.id === node.id);
                        const totalInColumn = columnMembers.length;
                        const y = 80 / (totalInColumn + 1) * (memberIndex + 1) + 10;

                        return (
                            <motion.div
                                key={node.id}
                                className={`absolute flex flex-col items-center z-20 w-fit md:w-auto`}
                                style={{
                                    left: `var(--node-left, ${x}%)`,
                                    top: `var(--node-top, ${y}%)`,
                                    transform: 'translateX(-50%)',
                                    // Custom properties for CSS media query usage if needed, or just handle in TS
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <style>{`
                                    @media (max-width: 768px) {
                                        #node-${node.id} {
                                            left: 50% !important;
                                            top: ${(node.chapter || 1) * 250 + memberIndex * 150}px !important;
                                            transform: translateX(-50%) !important;
                                        }
                                    }
                                `}</style>
                                <div
                                    id={`node-${node.id}`}
                                    className={`
                                        relative shadow-2xl transform transition-all duration-300 flex flex-col items-center p-3 border
                                        ${isActive ? 'z-50 scale-105' : 'z-20'}
                                        ${isUnlocked ? 'border-green-500/30 bg-black' : 'border-gray-800 bg-[#0a0a0a] opacity-40 grayscale'}
                                    `}
                                    style={{
                                        width: '180px',
                                        minHeight: '120px',
                                        boxShadow: isActive ? '0 0 30px rgba(0, 255, 0, 0.1)' : 'none',
                                    }}
                                    onMouseEnter={() => setActiveId(node.id)}
                                    onMouseLeave={() => setActiveId(null)}
                                >
                                    {/* Matrix Label */}
                                    <div className="absolute top-0 left-0 bg-gray-900 px-1.5 py-0.5 text-[7px] font-mono text-gray-500 uppercase tracking-tighter">
                                        ID_{node.id.toUpperCase()}
                                    </div>

                                    {/* Role Header */}
                                    <div className="w-full border-b border-white/5 pb-1.5 mb-3 text-center">
                                        <span className="text-xs font-bold text-white tracking-[0.1em]">{node.role}</span>
                                    </div>

                                    {/* Input Field for Hypothesis */}
                                    <div className="w-full flex flex-col gap-1 items-center">
                                        <input
                                            type="text"
                                            className="w-full bg-black/80 border border-gray-800 px-2 py-1 text-xs font-mono text-green-400 outline-none focus:border-green-500 transition-colors uppercase text-center"
                                            placeholder="[WHO IS THIS?]"
                                            value={playerHypotheses[node.id] || ''}
                                            onChange={(e) => onUpdateHypothesis?.(node.id, e.target.value)}
                                            readOnly={!isUnlocked}
                                        />
                                    </div>

                                    {/* Verification Stamp */}
                                    {playerHypotheses[node.id]?.trim().toUpperCase() === node.name.toUpperCase() && (
                                        <div className="absolute -bottom-1 -right-1 transform rotate-[-10deg] border border-green-500 px-1.5 py-0.5 bg-black z-50">
                                            <span className="text-[9px] font-bold text-green-500 tracking-wider">VERIFIED</span>
                                        </div>
                                    )}

                                    {/* Description (Tooltips on hover?) */}
                                    {isActive && isUnlocked && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-black border border-white/10 p-2 z-[100] shadow-2xl">
                                            <p className="text-[9px] font-mono text-gray-400 leading-tight italic">
                                                "{node.description}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div >
    );
};
