
import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Terminal as TerminalIcon, FileText, X, ChevronDown, Database, Archive, Network, Construction, Brain, Activity, RotateCcw, ShieldAlert } from 'lucide-react';
import { SyndicateBoard } from './SyndicateBoard';
import { ConfessionLog } from './ConfessionLog';
import { NodeDetail } from './NodeDetail';
import { ClueLibrary } from './ClueLibrary';
import { Archives } from './Archives';
import { MemoryNode, BoardNote } from '../types';
import { RELATIONSHIP_TREE, CLUE_DISPLAY_MAP, KEYWORD_CONSUMPTION_MAP, CATEGORY_IDS } from '../constants';

interface SimplifiedMainViewProps {
    gameState: any; // Using any for now to avoid deep type issues, or import GameState
    nodes: MemoryNode[];
    onNodeClick: (id: string) => void;
    activeNodeId: string | null;
    onSearch: (query: string) => void;
    history: Array<{ type: string; content: string; timestamp: number }>;
    collectedClues: string[];
    collectedYears: string[];
    unlockedPeople: string[];
    onCollectClue: (id: string, word: string) => void;
    onUnlockArchive: (id: string) => void;
    onCollectAttachment: (id: string) => void;
    onShatter: (id: string) => void;
    onPersonaReboot?: () => void;
    onRetrace: () => { success: boolean; reason?: string; keywords?: string[] };
    onStoryNodeComplete: (nodeId: number) => void;
    onClearUnusedKeywords: () => void;
    onConsumeKeywords: (yearIds: string[], personIds: string[]) => void;
    isProcessing: boolean;
    isPersonaGlitching?: boolean;
    showCountdown?: boolean;
    countdownValue?: number;
    playerHypotheses: Record<string, string>;
    onUpdateHypothesis: (nodeId: string, name: string) => void;
    isChapterSolved: (chapter: number) => boolean;
}

type PanelType = 'mindmap' | 'terminal' | 'relationships';

export const SimplifiedMainView: React.FC<SimplifiedMainViewProps> = ({
    gameState,
    nodes,
    onNodeClick,
    activeNodeId,
    onSearch,
    history,
    onShatter,
    collectedClues = [],
    collectedYears = [],
    unlockedPeople = [],
    onCollectClue,
    onUnlockArchive,
    onCollectAttachment,
    onPersonaReboot,
    onRetrace,
    onStoryNodeComplete,
    onClearUnusedKeywords,
    onConsumeKeywords,
    isProcessing,
    isPersonaGlitching = false,
    showCountdown = false,
    countdownValue = 5,
    playerHypotheses,
    onUpdateHypothesis,
    isChapterSolved
}) => {
    // Derived from gameState for brevity
    const {
        systemStability,
        currentStoryNode,
        hasSwitchedPersona,
        unlockedArchiveIds = [],
        collectedDossierIds = [],
        collectedAttachments = []
    } = gameState;

    const activeNode = nodes.find(n => n.id === activeNodeId);

    const [searchQuery, setSearchQuery] = useState('');
    const [showMindMap, setShowMindMap] = useState(false);
    const [showClueLibrary, setShowClueLibrary] = useState(false);
    const [showArchives, setShowArchives] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Retrace State
    const [retraceResult, setRetraceResult] = useState<string[] | null>(null);
    const [showRetraceModal, setShowRetraceModal] = useState(false);
    const [retraceError, setRetraceError] = useState<string | null>(null);
    const [statusFlash, setStatusFlash] = useState(false);

    const closeRetraceModal = () => {
        setShowRetraceModal(false);
        // Trigger status bar flash to indicate change
        setStatusFlash(true);
        setTimeout(() => setStatusFlash(false), 2000); // 2s flash
    };

    const handleRetraceClick = () => {
        const result = onRetrace();
        if (result.success && result.keywords) {
            setRetraceResult(result.keywords);
            setRetraceError(null);
            setShowRetraceModal(true);
        } else {
            setRetraceError("STABILITY CRITICAL - CANNOT RETRACE");
            // Auto hide error after 3s
            setTimeout(() => setRetraceError(null), 3000);
        }
    };


    // Mapping: Node ID -> [Keywords to HIDE when node is unlocked]
    // Consolidating KEYWORD_CONSUMPTION_MAP into constants.tsx
    // Removing local definition to avoid logic drift.

    // Derived Set of keywords that ARE part of a consumption rule (i.e. case-specific targets)
    const CASE_TARGET_KEYWORDS = React.useMemo(() => {
        const set = new Set<string>();
        Object.values(KEYWORD_CONSUMPTION_MAP).forEach(list => {
            list.forEach(k => set.add(k));
        });
        return set;
    }, []);

    // Helper to determine the story chapter of a node or archive
    const getNodeChapter = (id: string): number => {
        if (id.includes('confession_')) {
            const num = parseInt(id.split('_')[1]);
            if (num <= 3) return 1;
            if (num <= 7) return 2;
            if (num <= 11) return 3;
            if (num <= 15) return 4;
            if (num <= 19) return 5;
            if (num <= 26) return 6;
            return 7;
        }
        // Archive chapters mapping
        if (id.startsWith('me_') || id.startsWith('oh_') || id.startsWith('dc_') || id.startsWith('il_')) return 1;
        if (id.startsWith('va_') || id.startsWith('nv_')) return 2;
        if (id.startsWith('cin_') || id.startsWith('nas_') || id.startsWith('ky_')) return 3;
        if (id.startsWith('kan_') || id.startsWith('kc_') || id.startsWith('ia_')) return 4;
        if (id.startsWith('archive_') || id.startsWith('tx_')) return 5;
        if (id.startsWith('sf_')) return 7; // SF 1976 is Chapter 7 (post-Node 6)
        return 0; // Base nodes like 'capone'
    };

    // Calculate currently consumed keywords based on unlocked nodes from props
    const consumedKeywords = React.useMemo(() => {
        const consumed = new Set<string>();
        const unlockedNodeIds = gameState.unlockedNodeIds || [];
        const currentChapter = (gameState.currentStoryNode || 0);

        // Map clue IDs to frequencies
        const freqMap: Record<string, number> = {};
        collectedClues.forEach(id => {
            freqMap[id] = (freqMap[id] || 0) + 1;
        });

        // Unified consumption logic for both nodes and archives
        Object.keys(KEYWORD_CONSUMPTION_MAP).forEach(id => {
            const keywords = KEYWORD_CONSUMPTION_MAP[id];
            if (!keywords) return;

            const nodeChapter = getNodeChapter(id);
            const isUnlocked = id.includes('confession_')
                ? unlockedNodeIds.includes(id)
                : unlockedArchiveIds.includes(id);

            // App.tsx handles global transition erasure for consumed keywords.
            // As long as a keyword exists in the state arrays, it means it survived the chapter transition.
            // We only need to "virtually consume" (hide) it if it belongs to a currently active unlocked node or archive.
            if (isUnlocked) {
                keywords.forEach(k => {
                    // Re-collection exception: frequency > 1 ignores consumption
                    if ((freqMap[k] || 0) <= 1) {
                        consumed.add(k);
                    }
                });
            }
        });

        return consumed;
    }, [nodes, unlockedArchiveIds, gameState.unlockedNodeIds, gameState.currentStoryNode, collectedClues]);


    // Transient System Message Handling
    const [tempSystemMessage, setTempSystemMessage] = useState<string | null>(null);

    React.useEffect(() => {
        const lastItem = history[history.length - 1];
        if (lastItem?.content.includes('[SYSTEM]: 已消耗')) {
            setTempSystemMessage(lastItem.content);
            const timer = setTimeout(() => setTempSystemMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [history]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
            setSearchQuery('');
        }
    };

    return (
        <div className={`h-screen w-screen bg-[#050303] text-[#d89853] overflow-hidden flex flex-col relative font-mono pb-[env(safe-area-inset-bottom)] ${isPersonaGlitching ? 'animate-cinematic-glitch' : ''}`}>
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* BRIGHTER: Ambient Light Glow in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#d89853]/10 blur-[100px] rounded-full" />

                {/* BACKGROUND IMAGE - RESPONSIVE LAYOUT */}
                <div className="absolute inset-0 flex flex-col md:block pointer-events-none">
                    {/* DESKTOP VIEW (Seamless Single Image) */}
                    <div className="hidden md:block absolute inset-0 overflow-hidden">
                        <div className={`absolute inset-0 transition-all duration-100 ${isPersonaGlitching
                            ? 'opacity-80 mix-blend-hard-light filter contrast-125 animate-cinematic-glitch'
                            : 'opacity-40 mix-blend-screen filter blur-lg scale-110'
                            }`}>
                            <img
                                src="assets/capone-split-personality.jpg"
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                style={{ objectPosition: 'center 20%' }}
                            />
                        </div>
                    </div>

                    {/* MOBILE VIEW (Split with Blending) */}
                    <div className="flex-1 flex flex-col md:hidden">
                        {/* TOP HALF */}
                        <div className="relative w-full h-1/2 overflow-hidden mask-split-top">
                            <div className={`absolute inset-0 transition-all duration-100 ${isPersonaGlitching
                                ? 'opacity-80 mix-blend-hard-light filter contrast-125 animate-cinematic-glitch'
                                : 'opacity-40 mix-blend-screen filter blur-lg scale-110'
                                }`}>
                                <img
                                    src="assets/capone-split-personality.jpg"
                                    className="absolute top-0 left-0 w-full h-[200%] max-w-none object-cover"
                                    style={{ objectPosition: 'center 0%' }}
                                />
                            </div>
                        </div>

                        {/* BOTTOM HALF */}
                        <div className="relative w-full h-1/2 overflow-hidden mask-split-bottom">
                            <div className={`absolute inset-0 transition-all duration-100 ${isPersonaGlitching
                                ? 'opacity-80 mix-blend-hard-light filter contrast-125 animate-cinematic-glitch'
                                : 'opacity-40 mix-blend-screen filter blur-lg scale-110'
                                }`}>
                                <img
                                    src="assets/capone-split-personality.jpg"
                                    className="absolute top-[-100%] left-0 w-full h-[200%] max-w-none object-cover"
                                    style={{ objectPosition: 'center 0%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* BRIGHTER: Reduced overlay darkness */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                <div className="absolute inset-0 bg-vignette z-0 opacity-60" />
                <div className="absolute inset-0 animate-noise opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

                <div className="scanlines opacity-5" /> {/* Reduced scanline interference */}
            </div>

            {/* Header / Nav */}
            <header className="h-auto pt-[max(2.5rem,env(safe-area-inset-top))] pb-3 md:pt-0 md:h-16 border-b border-[#d89853]/20 flex items-center justify-between px-3 md:px-8 bg-black/20 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#c85a3f] rounded-full animate-pulse shadow-[0_0_8px_#c85a3f]" />
                    <h1 className="text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] font-bold text-[#d89853] opacity-90 text-shadow-sm">G.B.O.S. LINK</h1>
                </div>

                {/* Top Feature Nav */}
                <div className="flex gap-2 md:gap-6">
                    <button
                        onClick={() => setShowMindMap(true)}
                        className="group flex items-center gap-1.5 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold p-2 md:p-0"
                    >
                        <Network size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">人物关系</span>
                    </button>
                    <button
                        onClick={() => setShowArchives(true)}
                        className="group flex items-center gap-1.5 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold p-2 md:p-0"
                    >
                        <Archive size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">档案室</span>
                    </button>
                    <button
                        onClick={() => setShowClueLibrary(true)}
                        className="group flex items-center gap-1.5 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold p-2 md:p-0"
                    >
                        <Database size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">案卷建档</span>
                        <span className="bg-[#d89853]/10 px-1.5 py-0.5 rounded text-[9px] group-hover:bg-[#d89853]/30 transition-colors">
                            {collectedDossierIds.length}
                        </span>
                    </button>


                </div>
            </header>

            {/* Main Content Area - Centered Search */}
            <main className="flex-1 relative z-10 flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto custom-scrollbar">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-2xl flex flex-col items-center gap-4 md:gap-6 py-4 md:py-0"
                >
                    {/* Ambient Avatar / Prompt */}
                    <div className="relative mb-2 md:mb-4 group flex flex-col items-center">
                        <div className="w-20 h-32 md:w-28 md:h-48 rounded-full overflow-hidden border-2 border-[#d89853]/40 shadow-[0_0_40px_rgba(216,152,83,0.3)] opacity-90 transition-opacity filter sepia-[0.2] contrast-110 mb-4 md:mb-6 relative">
                            <img
                                src="assets/capone-split-personality.jpg"
                                className={`h-full max-w-none transition-all duration-500 ${(isPersonaGlitching || hasSwitchedPersona) ? 'contrast-125 saturate-150 scale-110' : ''}`}
                                alt={hasSwitchedPersona ? "ROBERTO_PERSONA_B" : "ROBERTO_PERSONA_A"}
                                style={{
                                    width: '200%',
                                    transform: hasSwitchedPersona ? 'translateX(-50%)' : 'translateX(0)',
                                    objectPosition: 'center 20%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        {/* Reboot Countdown Overlay */}
                        <AnimatePresence>
                            {showCountdown && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center border border-red-500/40 overflow-hidden"
                                >
                                    <style>{`
                                        @keyframes shake-vibrate {
                                            0% { transform: translate(0, 0) rotate(0deg); }
                                            10% { transform: translate(-2px, -2px) rotate(-1deg); }
                                            20% { transform: translate(2px, 2px) rotate(1deg); }
                                            30% { transform: translate(-3px, 2px) rotate(0deg); }
                                            40% { transform: translate(3px, -2px) rotate(1deg); }
                                            50% { transform: translate(-2px, -2px) rotate(-1deg); }
                                            60% { transform: translate(2px, 2px) rotate(0deg); }
                                            70% { transform: translate(-3px, 2px) rotate(-1deg); }
                                            80% { transform: translate(3px, -2px) rotate(1deg); }
                                            90% { transform: translate(-2px, -2px) rotate(0deg); }
                                            100% { transform: translate(0, 0) rotate(0deg); }
                                        }
                                        .vibrate-intense {
                                            animation: shake-vibrate 0.1s infinite;
                                        }
                                        .vibrate-critical {
                                            animation: shake-vibrate 0.05s infinite;
                                            filter: invert(1) contrast(2) brightness(1.2);
                                        }
                                    `}</style>

                                    {/* Tech Background Streams */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none font-mono text-[10px] text-red-500/40 leading-none select-none overflow-hidden">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ x: [-1000, 1000] }}
                                                transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, linear: true }}
                                                className="whitespace-nowrap mb-2"
                                            >
                                                {Array.from({ length: 10 }).map(() => `0x${Math.random().toString(16).slice(2, 10).toUpperCase()} `).join('')}
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className={`relative p-12 border-2 border-red-600/50 bg-black/95 flex flex-col items-center gap-10 shadow-[0_0_100px_rgba(220,38,38,0.3)] min-w-[400px] ${countdownValue === 1 ? 'vibrate-critical' : (countdownValue <= 3 ? 'vibrate-intense' : '')}`}>
                                        {/* Dynamic Scanline Glitch */}
                                        <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

                                        <div className="flex items-center gap-4 text-red-600 font-mono text-sm tracking-[0.5em] animate-pulse font-bold">
                                            <ShieldAlert size={20} className="animate-bounce" />
                                            <span>CRITICAL_PERSONA_OVERRIDE</span>
                                        </div>

                                        <div className="relative">
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    opacity: [1, 0.8, 1]
                                                }}
                                                transition={{ repeat: Infinity, duration: 0.5 / Math.max(1, countdownValue) }}
                                                className="text-9xl font-mono text-white tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                                            >
                                                0{countdownValue}
                                            </motion.div>
                                            {/* Reflection / Ghosting */}
                                            <div className="absolute inset-0 text-9xl font-mono text-red-500/20 tabular-nums translate-x-1 translate-y-1 blur-sm">0{countdownValue}</div>
                                        </div>

                                        <div className="flex flex-col items-center gap-4 w-full">
                                            <div className="w-80 h-1.5 bg-neutral-900 border border-neutral-800 overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-red-800 via-red-500 to-red-800"
                                                    initial={{ width: "100%" }}
                                                    animate={{ width: "0%" }}
                                                    transition={{ duration: 5, ease: "linear" }}
                                                />
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[10px] text-red-500/80 font-mono uppercase font-bold tracking-[0.2em]">
                                                    {countdownValue === 0 ? "REBOOT_INITIATED" : "neural protocol rebooting..."}
                                                </span>
                                                <span className="text-[8px] text-neutral-600 font-mono uppercase tracking-widest">
                                                    auth_level: root // security: bypassed
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Border Glitch Fragments */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600/20 blur-sm" />
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/20 blur-sm" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dynamic Response Area */}
                    <div className="min-h-[20px] flex items-center justify-center px-4 w-full max-w-2xl mx-auto text-center">
                        <AnimatePresence mode="wait">
                            {(() => {
                                // 0. Check for Processing State
                                if (isProcessing) {
                                    return (
                                        <motion.div
                                            key="processing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full text-center text-[#d89853] text-sm tracking-[0.2em] font-light animate-pulse"
                                        >
                                            ......
                                        </motion.div>
                                    );
                                }

                                // 1. Check for transient system message
                                if (tempSystemMessage) {
                                    return (
                                        <motion.div
                                            key="temp-sys"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="w-full text-center text-xs font-mono tracking-widest text-[#d89853]/50 animate-pulse"
                                        >
                                            {tempSystemMessage}
                                        </motion.div>
                                    );
                                }

                                // Find the latest character dialogue in history
                                // Dialogue items MUST start with "> [" and are not system logs
                                // We strictly exclude 'archive_content' and system notifications
                                const reversedHistory = [...history].reverse();
                                const lastDialogue = reversedHistory.find(item =>
                                    (item.type === 'dialogue' || item.type === 'info') &&
                                    item.content.startsWith('> [')
                                );

                                const showResponse = !!lastDialogue;
                                const displayItem = lastDialogue;

                                if (showResponse && displayItem) {
                                    // Clean up content for display: remove "> [NAME]: " prefix if present
                                    const displayContent = displayItem.content
                                        .replace(/^> \[.*?\]:\s*"?/, '')
                                        .replace(/"$/, '');

                                    // Highlight pickable keywords
                                    // Highlight pickable keywords
                                    const content = displayItem.content || '';

                                    // NUCLEAR CHECK: Detect Confession 20/21 by multiple signals
                                    const isConf20 = (displayItem as any).id === 'confession_20_content';
                                    const isConf21 = (displayItem as any).id === 'confession_21_content';
                                    const isConfession12 = (displayItem as any).id === 'confession_12';
                                    const isReveal = (displayItem as any).isReveal;
                                    const isNode6Awakening = (displayItem as any).id === 'node_6_awakening';

                                    let pickableKeywords: string[] = [];

                                    if (isConf20) {
                                        pickableKeywords = ['波特兰', '软肋'];
                                    } else if (isConf21) {
                                        pickableKeywords = ['红杉林', '战俘营', '亚玛力人协议'];
                                    } else if (isConfession12) {
                                        pickableKeywords = ['杰西·潘尼', '杰西潘尼'];
                                    } else if (isNode6Awakening) {
                                        pickableKeywords = ['1976'];
                                    } else if (isReveal) {
                                        pickableKeywords = (displayItem as any).revealKeywords || [];
                                    }

                                    const keywordMap: Record<string, { id: string, type: 'clue' | 'year' | 'person' | 'location' }> = {
                                        // People
                                        '罗伯特·卡彭': { id: 'capone', type: 'person' },
                                        '父亲': { id: 'father', type: 'person' },
                                        '尼比': { id: 'nibi', type: 'person' },
                                        '康查尔': { id: 'conchar', type: 'person' },
                                        '伦德格兰': { id: 'lundgren', type: 'person' },
                                        '莫宁': { id: 'morning', type: 'person' },
                                        '雷吉博士': { id: 'dr_reggie', type: 'person' },
                                        '罗格·毕比': { id: 'roger_beebe', type: 'person' },
                                        '小德里克·维恩': { id: 'little_derek_wayne', type: 'person' },
                                        '玛莎·迪亚兹': { id: 'martha_diaz', type: 'person' },
                                        '朱莉': { id: 'julie', type: 'person' },
                                        '塞勒斯': { id: 'silas', type: 'person' },
                                        '赛勒斯': { id: 'silas', type: 'person' },
                                        '瓦妮莎': { id: 'vanessa', type: 'person' },
                                        '母亲': { id: 'the_mother', type: 'person' },
                                        '朱维尔·钱伯斯': { id: 'juvell_chambers', type: 'person' },
                                        '鲍里斯·斯米尔诺夫': { id: 'boris_smirnov', type: 'person' },
                                        '辛西娅·米勒': { id: 'cynthia_miller', type: 'person' },
                                        '杰西·潘尼': { id: 'jc_penney', type: 'person' },
                                        '杰西潘尼': { id: 'jc_penney', type: 'person' },
                                        '约翰·莫里西': { id: 'john_morrissey', type: 'person' },
                                        '约翰莫里西': { id: 'john_morrissey', type: 'person' },
                                        '皮特·亨德森': { id: 'peter_henderson', type: 'person' },
                                        '牧师': { id: 'priest', type: 'person' },
                                        '阿列克谢·罗科维奇': { id: 'alexei', type: 'person' },
                                        '阿列克谢': { id: 'alexei', type: 'person' },

                                        // Years
                                        '1971': { id: 'year_1971', type: 'year' },
                                        '1968': { id: 'year_1968', type: 'year' },
                                        '1967': { id: 'year_1967', type: 'year' },
                                        '1985': { id: 'year_1985', type: 'year' },
                                        '1972': { id: 'year_1972', type: 'year' },
                                        '1973': { id: 'year_1973', type: 'year' },
                                        '1982': { id: 'year_1982', type: 'year' },
                                        '1974': { id: 'year_1974', type: 'year' },
                                        '1965': { id: 'year_1965', type: 'year' },
                                        '1976': { id: 'year_1976', type: 'year' },
                                        '1976年': { id: 'year_1976', type: 'year' },

                                        // Locations
                                        '缅因州': { id: 'maine', type: 'location' },
                                        '俄亥俄州': { id: 'ohio', type: 'location' },
                                        '芝加哥': { id: 'chicago', type: 'location' },
                                        '内华达州': { id: 'nevada', type: 'location' },
                                        '弗吉尼亚州': { id: 'virginia', type: 'location' },
                                        '罗阿诺克': { id: 'roanoke', type: 'location' },
                                        '波特兰': { id: 'portland', type: 'location' },
                                        '堪萨斯城': { id: 'kansas_city', type: 'location' },
                                        '东12街': { id: 'east_12th_st', type: 'location' },
                                        '达文波特': { id: 'davenport', type: 'location' },
                                        '脏弗兰克酒吧': { id: 'dirty_frank', type: 'location' },
                                        '特克萨卡纳': { id: 'texarkana', type: 'location' },
                                        '埃尔帕索': { id: 'el_paso', type: 'location' },
                                        '红杉林': { id: 'redwood_forest', type: 'location' },
                                        '战俘营': { id: 'pow_camp', type: 'location' },
                                        '圣芭芭拉': { id: 'santa_barbara', type: 'location' },
                                        '拉古那海滩': { id: 'laguna_beach', type: 'location' },

                                        // Cases / Details
                                        '小银行': { id: 'small_bank', type: 'clue' },
                                        '仪式案': { id: 'ritual_case', type: 'clue' },
                                        '失踪': { id: 'missing', type: 'clue' },
                                        '训练日': { id: 'training_day', type: 'clue' },
                                        '灭门案': { id: 'family_massacre', type: 'clue' },
                                        '空烟盒': { id: 'empty_cigarette_pack', type: 'clue' },
                                        '灰水信标': { id: 'graywater_beacon', type: 'clue' },
                                        '碎尸案': { id: 'dismemberment_case', type: 'clue' },
                                        '扭曲关系': { id: 'twisted_relationship', type: 'clue' },
                                        '肉体关系': { id: 'twisted_relationship', type: 'clue' },
                                        '薄荷计划': { id: 'mint_plan', type: 'clue' },
                                        '新计划': { id: 'new_plan', type: 'clue' },
                                        '招募': { id: 'recruitment', type: 'clue' },
                                        '行刑室': { id: 'execution_room', type: 'clue' },
                                        '流动献血车': { id: 'mobile_blood_truck', type: 'clue' },
                                        '80号洲际公路': { id: 'interstate_80', type: 'location' },
                                        '守夜人': { id: 'watchman', type: 'clue' },
                                        '软肋': { id: 'achilles_heel', type: 'clue' },
                                        '亚玛力人协议': { id: 'amalekite_protocol', type: 'clue' },
                                        '银喜鹊': { id: 'silver_magpie', type: 'clue' },
                                        '教堂': { id: 'church', type: 'location' },
                                        '收网': { id: 'closing_the_net', type: 'clue' },
                                        '裸根': { id: 'naked_root', type: 'clue' }
                                    };

                                    // Suppression Logic: Hide keywords that have already been "consumed" by unlocked confessions
                                    // UPDATED: For "Reveal" dialogues or specific Confession content (which explicitly set pickableKeywords),
                                    // we ALWAYS show them, even if consumed, so the user can see the link/status.
                                    const activePickableKeywords = pickableKeywords.filter(k => {
                                        const config = keywordMap[k];
                                        return !!config;
                                    });

                                    const regex = activePickableKeywords.length > 0
                                        ? new RegExp(`(${activePickableKeywords.join('|')})`, 'g')
                                        : null;
                                    const parts = regex ? displayContent.split(regex) : [displayContent];

                                    return (
                                        <motion.div
                                            key={displayItem.timestamp}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="w-full text-center text-sm tracking-[0.15em] font-light leading-relaxed text-[#d89853]"
                                            style={{ textShadow: '0 0 10px rgba(216,152,83,0.3)' }}
                                        >
                                            "
                                            {parts.map((part, j) => {
                                                const keywordConfig = keywordMap[part];
                                                if (keywordConfig) {
                                                    // Check collection status based on type
                                                    const isCollected =
                                                        keywordConfig.type === 'year' ? collectedYears.includes(keywordConfig.id) :
                                                            keywordConfig.type === 'person' ? unlockedPeople.includes(keywordConfig.id) :
                                                                collectedClues.includes(keywordConfig.id);

                                                    return (
                                                        <span
                                                            key={j}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onCollectClue(keywordConfig.id, part); // Pass display text, not type
                                                            }}
                                                            className={`
                                                                    cursor-pointer font-bold transition-all duration-300
                                                                    ${isCollected
                                                                    ? 'text-white bg-[#d89853] px-1 shadow-[0_0_10px_rgba(216,152,83,0.5)]'
                                                                    : 'text-[#d89853] border-b border-[#d89853] hover:bg-[#d89853]/20 animate-pulse'
                                                                }
                                                                `}
                                                            title={isCollected ? "已收录" : "点击记下关键词"}
                                                        >
                                                            {part}
                                                        </span>
                                                    );
                                                }
                                                return part;
                                            })}
                                            "
                                        </motion.div>
                                    );
                                }

                                return (
                                    <motion.div
                                        key="default"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full text-center text-[#d89853]/60 text-sm tracking-[0.2em] font-light text-shadow-sm"
                                    >
                                        {hasSwitchedPersona ? "“说吧，你还要挖什么烂账？”" : "“你想聊些什么？”"}
                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>
                    </div>

                    <div className="w-full flex flex-col items-center gap-1">
                        {/* Memory Action Row - Tightened */}
                        <div className="w-full flex flex-row items-center justify-between px-6 mb-0">
                            <button
                                onClick={handleRetraceClick}
                                disabled={isProcessing}
                                className="flex-1 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#d89853]/60 hover:text-[#d89853] transition-all uppercase font-bold py-1 group/retrace relative disabled:opacity-30"
                            >
                                <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
                                <span className="opacity-80">RETRACE</span>
                            </button>
                            <div className="w-[1px] h-3 bg-[#d89853]/10 md:hidden" />
                            <button
                                onClick={() => setShowTerminal(true)}
                                className="flex-1 flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] text-[#d89853]/60 hover:text-[#d89853] transition-all uppercase font-bold py-1 group/logs relative"
                            >
                                <TerminalIcon size={14} className="group-hover:scale-110 transition-transform" />
                                <span className="opacity-80">LOGS</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full relative group">
                        {/* Decorative Frame Elements */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d89853]/0 via-[#d89853]/20 to-[#d89853]/0 rounded-full blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>

                        <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-black/60 backdrop-blur-xl border border-[#d89853]/30 rounded-full overflow-hidden transition-all duration-500 focus-within:border-[#d89853]/60 focus-within:shadow-[0_0_30px_rgba(216,152,83,0.2)]">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="输入关键词..."
                                autoFocus
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className="flex-1 bg-transparent py-4 md:py-5 pl-8 pr-4 text-[#d89853] placeholder-[#d89853]/20 text-base md:text-lg font-light tracking-widest focus:outline-none"
                                style={{ textShadow: '0 0 10px rgba(216,152,83,0.1)' }}
                            />
                            {/* Consolidated Search Icon Button */}
                            <button
                                type="submit"
                                className="pr-8 pl-4 h-full flex items-center justify-center transition-all group/btn"
                                title="执行检索"
                            >
                                <div className="p-2 rounded-full bg-[#d89853]/5 group-hover/btn:bg-[#d89853]/20 transition-all duration-300">
                                    <Search className="text-[#d89853]/40 group-hover/btn:text-[#d89853] group-hover/btn:scale-110 transition-all" size={24} />
                                </div>
                            </button>
                        </form>
                    </div>
                    {/* Retrace Error Toast */}
                    <AnimatePresence>
                        {retraceError && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#020617]/90 border border-[#1e293b] text-[#94a3b8] text-xs px-6 py-3 rounded shadow-[0_0_20px_rgba(15,23,42,0.5)] backdrop-blur-md tracking-widest flex items-center gap-3 whitespace-nowrap font-mono"
                            >
                                <Activity size={14} className="text-[#64748b]" />
                                {retraceError}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Retrace Results Modal - IMMERSIVE OVERHAUL */}
                    <AnimatePresence>
                        {showRetraceModal && retraceResult && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={closeRetraceModal}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full max-w-lg bg-[#020205] border border-[#1e293b] p-8 relative overflow-hidden group shadow-[0_0_100px_rgba(15,23,42,0.4)]"
                                    onClick={e => e.stopPropagation()}
                                >
                                    {/* Deep Atmosphere Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/20 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#334155] to-transparent opacity-50" />
                                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#334155] to-transparent opacity-50" />

                                    <button
                                        className="absolute top-4 right-4 text-[#475569] hover:text-[#94a3b8] transition-colors duration-500"
                                        onClick={closeRetraceModal}
                                    >
                                        <X size={20} />
                                    </button>

                                    <div className="flex items-center gap-5 mb-10 text-[#64748b]">
                                        <div className="relative">
                                            <Brain size={28} className="opacity-60" />
                                            <motion.div
                                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute inset-0"
                                            >
                                                <Brain size={28} className="blur-sm text-[#94a3b8]" />
                                            </motion.div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-lg font-light tracking-[0.3em] text-[#94a3b8]">
                                                潜意识深层回溯
                                            </h2>
                                            <span className="text-[10px] tracking-[0.2em] text-[#475569] font-mono">
                                                正在接入深层记忆扇区...
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-[#475569] mb-8 font-mono border-l border-[#334155] pl-4 py-2 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#475569] rounded-full animate-pulse" />
                                            提示：精神锚点正在松动，意识边界模糊 (-20%)
                                        </div>
                                        <div className="flex items-center gap-2 opacity-70">
                                            <span className="w-1 h-1 bg-[#334155] rounded-full" />
                                            正在打捞沉没在黑暗中的记忆碎片...
                                        </div>
                                    </div>

                                    {retraceResult.length > 0 ? (
                                        <div className="space-y-6 relative z-10">
                                            <p className="text-[#94a3b8] text-sm font-light leading-relaxed tracking-wide opacity-90 italic">
                                                “你提到的这些往事似乎在发挥作用，不知为何，这些词汇在我脑海中变得挥之不去……”
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {retraceResult.map(keyword => {
                                                    const isCollected = collectedClues.includes(keyword) ||
                                                        unlockedPeople.includes(keyword) ||
                                                        collectedDossierIds.includes(keyword);

                                                    return (
                                                        <button
                                                            key={keyword}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (!isCollected) {
                                                                    onCollectClue(keyword, CLUE_DISPLAY_MAP[keyword] || keyword);
                                                                }
                                                            }}
                                                            disabled={isCollected}
                                                            className={`px-4 py-1.5 border text-sm font-medium tracking-widest transition-all duration-300 relative overflow-hidden group/item uppercase flex items-center gap-2
                                                                    ${isCollected
                                                                    ? 'bg-[#d89853]/10 border-[#d89853]/30 text-[#d89853] cursor-default'
                                                                    : 'bg-[#1e293b]/40 border-[#334155] text-[#94a3b8] hover:bg-[#1e293b] hover:border-[#64748b] hover:text-[#e2e8f0] cursor-pointer'
                                                                }
                                                                `}
                                                        >
                                                            <span className={`absolute inset-0 bg-[#334155] translate-x-full transition-transform duration-300 pointer-events-none ${!isCollected ? 'group-hover/item:translate-x-0' : ''}`} />
                                                            <span className="relative z-10">{CLUE_DISPLAY_MAP[keyword] || keyword}</span>
                                                            {isCollected && (
                                                                <span className="relative z-10 text-[10px] bg-[#d89853]/20 text-[#d89853] px-1.5 py-0.5 rounded font-mono">
                                                                    已收录
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-[#64748b] text-base italic font-serif leading-relaxed px-6 py-12 text-center border border-[#1e293b] bg-[#0f172a]/30 relative">
                                            <span className="absolute text-4xl text-[#334155] top-2 left-2 font-serif">“</span>
                                            不管你是谁，你并不知道我遭遇了什么，所以请离开吧，父亲和南希，他们都不在这里。
                                            <span className="absolute text-4xl text-[#334155] bottom-2 right-2 font-serif">”</span>
                                        </div>
                                    )}

                                    <div className="mt-8 pt-4 border-t border-[#1e293b] flex justify-between items-end text-[9px] text-[#475569] font-mono">
                                        <span>SECTOR: 7G-A9</span>
                                        <span className="animate-pulse">TERMINAL: ACTIVE</span>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Quick Input Clues - Show when focused or when there are clues */}
                    <AnimatePresence>
                        {(isSearchFocused || collectedClues.length > 0 || unlockedPeople.length > 0) &&
                            (collectedClues.length > 0 || unlockedPeople.length > 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="w-full max-w-2xl px-2 md:px-4 flex flex-wrap gap-1 md:gap-1.5 justify-center mt-1 z-20 relative"
                                >
                                    {/* Combine clues for chips. PEOPLE ARE REMOVED (Syndicate Board handles these). YEARS ARE REMOVED (Archives handle these). */}
                                    {(() => {
                                        // Calculate frequency map to detect re-collected items
                                        const frequencyMap = (collectedClues || []).reduce((acc, val) => {
                                            acc[val] = (acc[val] || 0) + 1;
                                            return acc;
                                        }, {} as Record<string, number>);

                                        return [...new Set([...(collectedClues || [])].filter(Boolean))]
                                            .filter(id => {
                                                // Node 6 Exception: Always show Alexei and Morandi globally
                                                if (id.toLowerCase() === 'alexei' || id.toLowerCase() === 'morandi') return true;

                                                const isLocation = CATEGORY_IDS.LOCATIONS.includes(id);
                                                const isCase = CATEGORY_IDS.CASES.includes(id);

                                                if (!isLocation && !isCase) return false;

                                                if (!CLUE_DISPLAY_MAP[id]) return false;

                                                // Relaxed check: Show everything collected for easy navigation
                                                // BUT Hide consumed keywords to keep the space clean
                                                // UNLESS they've been re-collected (frequency > 1)
                                                if (consumedKeywords.has(id) && (frequencyMap[id] || 0) <= 1) return false;

                                                return true;
                                            });
                                    })()
                                        .map(id => (
                                            <button
                                                key={id}
                                                type="button"
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent blur
                                                    const clueText = CLUE_DISPLAY_MAP[id] || id;
                                                    setSearchQuery(prev => {
                                                        if (!prev) {
                                                            return clueText;
                                                        }
                                                        // Avoid duplicates if simple check passes (optional, but good UX)
                                                        if (prev.includes(clueText)) {
                                                            return prev;
                                                        }
                                                        // Append with a space, ensuring no double spaces if prev already ends with one
                                                        const separator = prev.endsWith(' ') ? '' : ' ';
                                                        return `${prev}${separator}${clueText}`;
                                                    });
                                                }}
                                                className="px-2.5 md:px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-[11px] md:text-xs rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                                            >
                                                {CLUE_DISPLAY_MAP[id] || id}
                                            </button>
                                        ))
                                    }
                                </motion.div>
                            )}
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* Feature Modals (Moved out of <main> to escape z-index constraints) */}
            {/* Syndicate Board Modal */}
            {
                showMindMap && (
                    <div className="fixed inset-0 z-[200]">
                        <SyndicateBoard
                            unlockedPeople={unlockedPeople}
                            onClose={() => setShowMindMap(false)}
                            phase={gameState.currentStoryNode >= 3 ? 2 : 1}
                            hasSwitchedPersona={gameState.hasSwitchedPersona}
                            playerHypotheses={playerHypotheses}
                            onUpdateHypothesis={onUpdateHypothesis}
                        />
                    </div>
                )
            }

            {/* Terminal / Log View */}
            <AnimatePresence>
                {showTerminal && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setShowTerminal(false)}
                    >
                        <div
                            className="w-full max-w-3xl h-[85vh] md:h-[80vh] bg-[#0c0c0c] border border-[#d89853]/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Top Close Bar for Mobile */}
                            <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#d89853]/10 bg-black/40 pt-[max(0.75rem,env(safe-area-inset-top))]">
                                <span className="text-[10px] font-mono tracking-widest text-[#d89853]/40">TERMINAL_LOGS</span>
                                <button
                                    onClick={() => setShowTerminal(false)}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-[#d89853]/10 border border-[#d89853]/30 text-[#d89853] rounded-full active:scale-95 transition-all outline-none"
                                >
                                    <X size={14} />
                                    <span className="text-[10px] font-bold font-mono">CLOSE</span>
                                </button>
                            </div>

                            {/* Desktop Close Button */}
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="hidden md:block absolute top-3 right-3 z-10 text-[#d89853]/60 hover:text-[#d89853] p-1 hover:bg-[#d89853]/10 rounded transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <ConfessionLog
                                unlockedNodeIds={nodes.filter(Boolean).map(n => n.id)}
                                onClose={() => setShowTerminal(false)}
                                onViewNode={(id) => {
                                    setShowTerminal(false);
                                    onNodeClick(id);
                                }}
                            />
                        </div >
                    </motion.div >
                )}
            </AnimatePresence >

            {/* Node Detail Modal (triggered by search or map click) */}
            < AnimatePresence mode="wait" >
                {activeNode && (
                    <motion.div
                        key={activeNode.id}
                        initial={activeNode.id.includes('confession')
                            ? { opacity: 0, scale: 0.1, filter: 'brightness(5) blur(30px)' }
                            : { opacity: 0, y: 50, scale: 0.95 }}
                        animate={activeNode.id.includes('confession')
                            ? { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)', transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.7 } }
                            : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)', transition: { duration: 0.3 } }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                        onClick={() => onNodeClick('')}
                    >
                        {/* Glitch Overlay for Confession Intro */}
                        {activeNode.id.includes('confession') && (
                            <motion.div
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 z-[210] bg-white pointer-events-none mix-blend-overlay"
                            />
                        )}

                        <motion.div
                            drag={!activeNode.id.includes('confession')}
                            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                            dragMomentum={false}
                            className={activeNode.id.includes('confession')
                                ? "w-screen h-screen bg-[#0c0505] overflow-hidden relative flex flex-col"
                                : "w-full max-w-6xl h-[85vh] bg-[#0c0505] border border-[#d89853]/40 rounded-sm shadow-[0_0_150px_rgba(216,152,83,0.15),0_0_50px_rgba(0,0,0,1)] overflow-hidden relative flex flex-col cursor-grab active:cursor-grabbing"
                            }
                            style={!activeNode.id.includes('confession') ? { boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 40px rgba(216,152,83,0.1)' } : {}}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Close Button (Desktop & Mobile Unified) */}
                            <div className="absolute top-6 right-6 z-[220] pointer-events-auto flex items-center gap-4 mt-[env(safe-area-inset-top)]">
                                <button
                                    onClick={() => onNodeClick('')}
                                    className="flex items-center gap-2 pl-4 pr-5 py-2.5 bg-black/80 text-[#d89853] border border-[#d89853]/40 rounded-full transition-all backdrop-blur-xl shadow-2xl hover:bg-[#d89853]/10 hover:border-[#d89853]/60 group/close active:scale-95"
                                >
                                    <X size={18} className="group-hover/close:rotate-90 transition-transform duration-300" />
                                    <span className="text-[11px] font-bold tracking-[0.2em] font-mono">CLOSE</span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden pointer-events-auto">
                                <NodeDetail
                                    node={nodes.find(n => n.id === activeNodeId)!}
                                    onShatter={onShatter}
                                    onCollectClue={onCollectClue}
                                    onPersonaReboot={onPersonaReboot}
                                    onCollectAttachment={onCollectAttachment}
                                    collectedDossierIds={collectedDossierIds}
                                    collectedAttachments={collectedAttachments}
                                    clueDisplayMap={CLUE_DISPLAY_MAP}
                                    hasSwitchedPersona={hasSwitchedPersona}
                                />
                            </div>
                        </motion.div >
                    </motion.div >
                )}
            </AnimatePresence >

            {/* Quick Status / Hints - Fixed Bottom (hide when MindMap is open) */}
            {
                !showMindMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="absolute bottom-8 left-0 w-full flex justify-center z-20 pointer-events-none"
                    >
                        <div className={`flex items-center gap-8 md:gap-16 text-[10px] tracking-widest uppercase font-semibold pointer-events-auto backdrop-blur-sm px-8 py-2 rounded-full border transition-all duration-500
                        ${statusFlash
                                ? 'bg-[#1e293b]/80 border-[#94a3b8]/50 text-[#e2e8f0] shadow-[0_0_30px_rgba(148,163,184,0.3)] scale-105'
                                : 'bg-black/20 text-[#d89853]/50 border-[#d89853]/10'
                            }
                    `}>
                            <div className="flex items-center gap-2">
                                {/* Dynamic Status Indicator */}
                                {(() => {
                                    const isStable = systemStability > 40;
                                    const isCritical = systemStability <= 0;
                                    const color = isCritical ? 'bg-red-600' : isStable ? 'bg-green-400' : 'bg-[#c85a3f]';
                                    const shadow = isCritical ? 'shadow-[0_0_8px_#dc2626]' : isStable ? 'shadow-[0_0_8px_#4ade80]' : 'shadow-[0_0_5px_#c85a3f]';

                                    return (
                                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500 ${color} ${shadow}`} />
                                    );
                                })()}
                                {systemStability > 0 ? "STABLE" : "CRITICAL"}
                            </div>
                            <div className={statusFlash ? 'text-[#94a3b8] animate-pulse' : ''}>
                                SC-STABILITY: {Math.round(systemStability)}%
                            </div>
                            <div>LINK: SECURE</div>
                        </div>
                    </motion.div>
                )
            }

            {/* Feature Sidebar Panels */}
            <ClueLibrary
                isOpen={showClueLibrary}
                onClose={() => setShowClueLibrary(false)}
                collectedClueIds={collectedClues} // Fix: Pass collectedClues as collectedClueIds
                collectedKeywords={collectedClues}
                collectedPeople={unlockedPeople}
                collectedYears={collectedYears}
                collectedDossierIds={collectedDossierIds}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
                onCollectClue={onCollectClue}
                unlockedNodeIds={nodes.filter(Boolean).map(n => n.id)}
                unlockedArchiveIds={unlockedArchiveIds}
                currentStoryNode={currentStoryNode}
                onStoryNodeComplete={onStoryNodeComplete}
                onClearUnusedKeywords={onClearUnusedKeywords}
                hasSwitchedPersona={hasSwitchedPersona}
                isChapterSolved={isChapterSolved}
            />
            <Archives
                isOpen={showArchives}
                onClose={() => setShowArchives(false)}
                unlockedArchiveIds={unlockedArchiveIds}
                onUnlockArchive={onUnlockArchive}
                collectedClues={collectedClues}
                onCollectClue={onCollectClue}
                collectedYears={collectedYears}
                unlockedPeople={unlockedPeople}
                collectedDossierIds={collectedDossierIds}
                onConsumeKeywords={onConsumeKeywords}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
                currentStoryNode={currentStoryNode}
                unlockedNodeIds={nodes.filter(Boolean).map(n => n.id)}
            />
            {/* Reboot Countdown Overlay (Root Level) */}
            <AnimatePresence>
                {showCountdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[500] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center border border-red-500/20"
                    >
                        <div className="p-12 border border-red-500/40 bg-black/90 flex flex-col items-center gap-8 shadow-[0_0_100px_rgba(239,68,68,0.3)]">
                            <div className="flex items-center gap-4 text-red-500 font-mono text-sm tracking-[0.5em] animate-pulse">
                                <ShieldAlert size={20} />
                                <span>CRITICAL_PERSONA_OVERRIDE_IN_PROGRESS</span>
                            </div>

                            <div className="text-8xl md:text-9xl font-mono text-white tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                                0{countdownValue}
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-80 h-1.5 bg-neutral-900 overflow-hidden relative">
                                    <motion.div
                                        className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]"
                                        initial={{ width: "100%" }}
                                        animate={{ width: "0%" }}
                                        transition={{ duration: 5, ease: "linear" }}
                                    />
                                </div>
                                <span className="text-[10px] text-neutral-500 font-mono uppercase mt-2 tracking-[0.2em]">
                                    neural protocol rebooting... DO NOT DISCONNECT
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};
