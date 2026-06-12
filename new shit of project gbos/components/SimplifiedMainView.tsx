
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Terminal as TerminalIcon, FileText, X, ChevronDown, Database, Archive, Network, Construction, Brain, Activity, RotateCcw, ShieldAlert } from 'lucide-react';
import { SyndicateBoard } from './SyndicateBoard';
import { ConfessionLog } from './ConfessionLog';
import { NodeDetail } from './NodeDetail';
import { ClueLibrary } from './ClueLibrary';
import { Archives } from './Archives';
import { TutorialOverlay } from './TutorialOverlay';
import { MemoryNode, BoardNote } from '../types';
import { 
    GLOBAL_KEYWORD_MAP, 
    CLUE_DISPLAY_MAP, 
    KEYWORD_CONSUMPTION_MAP, 
    CATEGORY_IDS, 
    KEYWORD_REGISTRY, 
    CAPONE_BRANCH_B_POST_DIALOGUE,
    getNodeChapter
} from '../constants';

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
    onUnlockNode: (id: string) => void;
    tutorialStep: number;
    setTutorialStep: (step: number) => void;
    onGameEnd?: () => void;
    isBranchBActive?: boolean;
    onTerminateExperiment?: (type: 'ending2' | 'ending3') => void;
    onCloseClueLibrary?: () => void;
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
    isChapterSolved,
    onUnlockNode,
    tutorialStep,
    setTutorialStep,
    onGameEnd,
    isBranchBActive,
    onTerminateExperiment,
    onCloseClueLibrary
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
    const [hasNewArchive, setHasNewArchive] = useState(false);
    const [hasNewDossier, setHasNewDossier] = useState(false);
    const [filingEvidence, setFilingEvidence] = useState<{ id: string, title: string, content: string, type: 'image' | 'text' } | null>(null);

    // Watch for global requests to open ClueLibrary (e.g. from Checkpoints or Chapter changes)
    useEffect(() => {
        if (gameState.isClueLibraryOpen) {
            setShowClueLibrary(true);
        }
    }, [gameState.isClueLibraryOpen]);

    const closeRetraceModal = () => {
        setShowRetraceModal(false);
        // Trigger status bar flash to indicate change
        setStatusFlash(true);
        setTimeout(() => setStatusFlash(false), 2000); // 2s flash
    };

    // Tutorial Progression Logic

    React.useEffect(() => {
        // Step 4 -> 5: Both keywords selected
        if (tutorialStep === 4) {
            if (searchQuery.includes('缅因州') && searchQuery.includes('小银行')) {
                setTutorialStep(5);
            }
        }
    }, [searchQuery, tutorialStep, setTutorialStep]);

    const prevActiveNodeId = React.useRef<string | null>(null);
    React.useEffect(() => {
        // Step 6 -> 7: Confession 1 closed
        if (tutorialStep === 6 && prevActiveNodeId.current === 'confession_1' && !activeNodeId) {
            setTutorialStep(7);
        }
        
        // Post Confession 36A1 Jennifer Dialogue
        if (prevActiveNodeId.current === 'confession_36A1' && !activeNodeId) {
            onSearch('jennifer_post_36a1_trigger');
        }

        // Post Confession 36B2 Jennifer Final A Dialogue
        if (prevActiveNodeId.current === 'confession_36B2' && !activeNodeId) {
            onSearch('jennifer_final_a_trigger');
        }

        prevActiveNodeId.current = activeNodeId;
    }, [activeNodeId, tutorialStep, setTutorialStep, onSearch]);

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

    // Notification Logic for New Items
    const prevArchiveCount = React.useRef(unlockedPeople.length + collectedYears.length);
    const prevDossierCount = React.useRef(collectedDossierIds.length);

    React.useEffect(() => {
        const currentArchiveCount = unlockedPeople.length + collectedYears.length;
        // setHasNewArchive(true); // User requested to completely remove this red dot
        prevArchiveCount.current = currentArchiveCount;
    }, [unlockedPeople.length, collectedYears.length]);

    React.useEffect(() => {
        const currentDossierCount = collectedDossierIds.length;
        // setHasNewDossier(true); // Now controlled by Jennifer's pending dialogue status
        prevDossierCount.current = currentDossierCount;
    }, [collectedDossierIds.length]);

    // Auto-open ClueLibrary for Node 9 (Jennifer Branch Trigger)
    React.useEffect(() => {
        const isNode9Unlocked = gameState.unlockedNodeIds?.includes('node_9');
        if (isNode9Unlocked && !showClueLibrary && currentStoryNode === 8) {
            setShowClueLibrary(true);
        }
    }, [gameState.unlockedNodeIds, currentStoryNode, showClueLibrary]);



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


    // Calculate fully consumed keywords based on unlocked nodes from props
    const consumedKeywords = React.useMemo(() => {
        const fullyConsumed = new Set<string>();
        const unlockedNodeIds = gameState.unlockedNodeIds || [];
        const unlockedArchiveIds = gameState.unlockedArchiveIds || [];

        const requiredCounts: Record<string, number> = {};
        const unlockedCounts: Record<string, number> = {};

        // Calculate frequencies for each keyword requirement
        Object.keys(KEYWORD_CONSUMPTION_MAP).forEach(id => {
            const keywords = KEYWORD_CONSUMPTION_MAP[id];
            if (!keywords) return;

            const isUnlocked = id.includes('confession_')
                ? unlockedNodeIds.includes(id)
                : unlockedArchiveIds.includes(id);

            keywords.forEach(k => {
                requiredCounts[k] = (requiredCounts[k] || 0) + 1;
                if (isUnlocked) {
                    unlockedCounts[k] = (unlockedCounts[k] || 0) + 1;
                }
            });
        });

        // A keyword is only fully consumed if all its targets are unlocked
        Object.keys(requiredCounts).forEach(k => {
            if ((unlockedCounts[k] || 0) >= requiredCounts[k]) {
                fullyConsumed.add(k);
            }
        });

        return fullyConsumed;
    }, [gameState.unlockedNodeIds, gameState.unlockedArchiveIds]);


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
            const currentQuery = searchQuery;
            setSearchQuery(''); // Clear IMMEDIATELY before processing
            
            if (tutorialStep === 5 && currentQuery.includes('缅因州') && currentQuery.includes('小银行')) {
                setTutorialStep(6);
            }
            onSearch(currentQuery);
        }
    };

    return (
        <div className={`h-screen w-screen bg-[#050303] text-[#d89853] overflow-hidden flex flex-col relative font-mono pb-[env(safe-area-inset-bottom)] ${isBranchBActive ? 'shattered-ui' : ''}`}>
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* BRIGHTER: Ambient Light Glow in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#d89853]/10 blur-[100px] rounded-full" />

                {/* BACKGROUND IMAGE - RESPONSIVE LAYOUT */}
                <div className="absolute inset-0 flex flex-col md:block pointer-events-none">
                    {/* DESKTOP VIEW (Seamless Single Image) */}
                    <div className="hidden md:block absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 transition-all duration-100 opacity-40 mix-blend-screen filter blur-lg scale-110">
                            <img
                                src={`${import.meta.env.BASE_URL}images/capone-split-personality.jpg`}
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                style={{ objectPosition: 'center 20%' }}
                            />
                        </div>
                    </div>

                    {/* MOBILE VIEW (Split with Blending) */}
                    <div className="flex-1 flex flex-col md:hidden">
                        {/* TOP HALF */}
                        <div className="relative w-full h-1/2 overflow-hidden mask-split-top">
                            <div className="absolute inset-0 transition-all duration-100 opacity-40 mix-blend-screen filter blur-lg scale-110">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/capone-split-personality.jpg`}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                    style={{ objectPosition: 'center 0%' }}
                                />
                            </div>
                        </div>

                        {/* BOTTOM HALF */}
                        <div className="relative w-full h-1/2 overflow-hidden mask-split-bottom">
                            <div className="absolute inset-0 transition-all duration-100 opacity-40 mix-blend-screen filter blur-lg scale-110">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/capone-split-personality.jpg`}
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

                <div className="scanlines opacity-5" /> 
                <div className="crt-overlay" />
            </div>

            {/* Header / Nav */}
            <header className={`relative h-auto pt-[max(2.5rem,env(safe-area-inset-top))] pb-3 md:pt-0 md:h-16 border-b border-[#d89853]/20 flex items-center justify-between px-3 md:px-8 bg-black/20 backdrop-blur-md z-20 ${isPersonaGlitching ? 'animate-cinematic-glitch' : ''}`}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#c85a3f] rounded-full animate-pulse shadow-[0_0_8px_#c85a3f]" />
                    <h1 className="text-sm md:text-xl tracking-[0.15em] md:tracking-[0.2em] font-bold text-[#d89853] opacity-90 text-shadow-sm">G.B.O.S. LINK</h1>
                </div>

                {/* Top Feature Nav */}
                <div className="flex gap-2 md:gap-6">
                    <button
                        id="tutorial-archives-btn"
                        onClick={() => {
                            if (tutorialStep === 7) setTutorialStep(8);
                            setShowArchives(true);
                        }}
                        className={`group flex items-center gap-1.5 transition-colors text-xs tracking-[0.1em] font-bold p-2 md:p-0 relative ${tutorialStep > 0 && tutorialStep !== 7 ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'text-[#d89853]/80 hover:text-[#d89853]'}`}
                    >
                        <Archive size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">档案室</span>
                    </button>
                    <button
                        id="tutorial-dossier-btn"
                        onClick={() => {
                            if (tutorialStep === 1) setTutorialStep(2);
                            setShowClueLibrary(true);
                            setHasNewDossier(false);
                        }}
                        className={`group flex items-center gap-1.5 transition-colors text-xs tracking-[0.1em] font-bold p-2 md:p-0 relative ${tutorialStep > 0 && tutorialStep !== 1 ? 'opacity-20 cursor-not-allowed pointer-events-none' : 'text-[#d89853]/80 hover:text-[#d89853]'}`}
                    >
                        <Database size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">案卷建档</span>
                        <div className="relative">
                            <span className="bg-[#d89853]/10 px-1.5 py-0.5 rounded text-[9px] group-hover:bg-[#d89853]/30 transition-colors">
                                {collectedDossierIds.length}
                            </span>
                            {hasNewDossier && (
                                <span className="absolute -top-1 -right-1 w-2 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                            )}
                        </div>
                    </button>


                </div>
            </header>

            {/* Main Content Area - Centered Search */}
            <main className={`flex-1 relative z-10 flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto custom-scrollbar ${isPersonaGlitching ? 'animate-cinematic-glitch' : ''}`}>

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
                                src={`${import.meta.env.BASE_URL}images/capone-split-personality.jpg`}
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
                        {/* Reboot Countdown Overlay (Glitch Effect) */}
                        <AnimatePresence>
                            {showCountdown && gameState.branchAttemptCount < 4 && (
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
                                    let displayContent = displayItem.content
                                        .replace(/^> \[.*?\]:\s*"?/, '')
                                        .replace(/"$/, '');

                                    if (isBranchBActive) {
                                        displayContent = CAPONE_BRANCH_B_POST_DIALOGUE;
                                    }

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

                                    if (activeNode?.revealedKeywords) {
                                        pickableKeywords = activeNode.revealedKeywords.map(id => CLUE_DISPLAY_MAP[id] || id);
                                    }

                                    // Supplement with special logic for specific reveal types or overridden nodes
                                    if (isConf20) {
                                        pickableKeywords = ['波特兰', '软肋'];
                                    } else if (isConf21) {
                                        pickableKeywords = ['红杉林', '战俘营', '亚玛力人协议'];
                                    } else if (isReveal) {
                                        const ids = (displayItem as any).revealKeywords || [];
                                        pickableKeywords = ids.map((id: string) => CLUE_DISPLAY_MAP[id] || id);
                                    }

                                    const keywordMap = GLOBAL_KEYWORD_MAP;

                                    // Suppression Logic: Hide keywords that have already been "consumed" by unlocked confessions
                                    // UPDATED: For "Reveal" dialogues or specific Confession content (which explicitly set pickableKeywords),
                                    // we ALWAYS show them, even if consumed, so the user can see the link/status.
                                    const activePickableKeywords = pickableKeywords.filter(k => {
                                        const config = keywordMap[k];
                                        if (!config) return false;
                                        const meta = KEYWORD_REGISTRY[config.id];
                                        return !meta?.isArchiveOnly;
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
                                                        keywordConfig.type === 'year' ? (collectedYears || []).includes(keywordConfig.id) :
                                                            keywordConfig.type === 'person' ? (unlockedPeople || []).includes(keywordConfig.id) :
                                                                (collectedClues || []).includes(keywordConfig.id) || (gameState.collectedDossierIds || []).includes(keywordConfig.id);

                                                    return (
                                                        <span
                                                            key={j}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Tutorial Lockdown for Step 4
                                                                if (tutorialStep === 4 && !['maine', 'small_bank'].includes(keywordConfig.id)) {
                                                                    return;
                                                                }
                                                                // Year Exception: Years are always interactive and can be re-collected/verified
                                                                if (keywordConfig.type === 'year' || !isCollected) {
                                                                    onCollectClue(keywordConfig.id, part); 
                                                                }
                                                            }}
                                                            className={`
                                                                    cursor-pointer font-bold transition-all duration-300
                                                                    ${isCollected
                                                                    ? 'text-white bg-[#d89853] px-1 shadow-[0_0_10px_rgba(216,152,83,0.5)]'
                                                                    : 'text-[#d89853] border-b border-[#d89853] hover:bg-[#d89853]/20 animate-pulse'
                                                                }
                                                                `}
                                                            title={keywordConfig.type === 'year' ? "记忆锚点（点击刷新）" : (isCollected ? "已收录" : "点击记下关键词")}
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
                        <div className="w-full flex flex-row items-center justify-center px-6 mb-0">
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

                        <form onSubmit={handleSearchSubmit} className={`relative flex items-center bg-black/60 backdrop-blur-xl border border-[#d89853]/30 rounded-full overflow-hidden transition-all duration-500 focus-within:border-[#d89853]/60 focus-within:shadow-[0_0_30px_rgba(216,152,83,0.2)] ${tutorialStep > 0 && tutorialStep !== 4 && tutorialStep !== 5 ? 'opacity-20 pointer-events-none' : ''}`}>
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
                                <div id="tutorial-search-submit" className="relative p-2 rounded-full bg-[#d89853]/5 group-hover/btn:bg-[#d89853]/20 transition-all duration-300">
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
                                                    const isCollected = (collectedClues || []).includes(keyword) ||
                                                        (unlockedPeople || []).includes(keyword) ||
                                                        (collectedYears || []).includes(keyword) ||
                                                        (collectedDossierIds || []).includes(keyword);

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
                                    id="tutorial-keyword-chips"
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
                                                const meta = KEYWORD_REGISTRY[id];
                                                if (!meta) return false;

                                                // 1. BASIC FILTERS
                                                if (consumedKeywords.has(id)) return false;
                                                if (meta.isIdentity) return false;

                                                // 2. CHAPTER RELEVANCE
                                                // Show if it's current chapter, immediate previous persistent chapter, or ALREADY collected
                                                const isCurrent = meta.chapter === currentStoryNode;
                                                const isPrevPersistent = meta.chapter === currentStoryNode - 1 && meta.isPersistent;
                                                const isAlreadyCollected = collectedClues.includes(id);

                                                if (!isCurrent && !isPrevPersistent && !isAlreadyCollected) return false;

                                                // 3. TYPE FILTERS
                                                const isLocation = meta.type === 'location';
                                                const isCase = meta.type === 'case';
                                                const isClue = meta.type === 'clue';
                                                if (!isLocation && !isCase && !isClue) return false;
                                                
                                                if (meta.isArchiveOnly) return false;
                                                if (!CLUE_DISPLAY_MAP[id]) return false;

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
                                unlockedNodeIds={gameState.unlockedNodeIds || []}
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
                                    onSetFilingEvidence={setFilingEvidence}
                                    collectedDossierIds={collectedDossierIds}
                                    collectedAttachments={collectedAttachments}
                                    clueDisplayMap={CLUE_DISPLAY_MAP}
                                    hasSwitchedPersona={hasSwitchedPersona}
                                    unlockedPeople={unlockedPeople}
                                    collectedClues={collectedClues}
                                    collectedYears={collectedYears}
                                    consumedKeywords={consumedKeywords}
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

                            {gameState.hasSeenEndingA && onGameEnd && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={onGameEnd}
                                    className="flex items-center gap-2 px-4 py-1 bg-red-950/40 border border-red-500/30 text-red-400 rounded-sm hover:bg-red-900/60 transition-all group font-black"
                                >
                                    <TerminalIcon size={12} className="group-hover:rotate-12 transition-transform" />
                                    <span>TERMINATE SESSION</span>
                                </motion.button>
                            )}

                            <div className="h-4 w-px bg-[#d89853]/10 hidden md:block" />
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
                onClose={() => {
                    setShowClueLibrary(false);
                    if (onCloseClueLibrary) onCloseClueLibrary();
                }}
                collectedClueIds={collectedClues}
                collectedKeywords={collectedClues}
                collectedPeople={unlockedPeople}
                collectedYears={collectedYears}
                collectedDossierIds={collectedDossierIds}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
                onCollectClue={onCollectClue}
                unlockedNodeIds={gameState.unlockedNodeIds || []}
                unlockedArchiveIds={unlockedArchiveIds}
                currentStoryNode={currentStoryNode}
                onStoryNodeComplete={onStoryNodeComplete}
                onClearUnusedKeywords={onClearUnusedKeywords}
                hasSwitchedPersona={hasSwitchedPersona}
                isChapterSolved={isChapterSolved}
                onSetFilingEvidence={setFilingEvidence}
                tutorialStep={tutorialStep}
                setTutorialStep={setTutorialStep}
                playerHypotheses={playerHypotheses}
                onUpdateHypothesis={onUpdateHypothesis}
                onJenniferStatusChange={(hasPending) => setHasNewDossier(hasPending)}
            />
            <Archives
                isOpen={showArchives}
                onClose={() => setShowArchives(false)}
                unlockedArchiveIds={unlockedArchiveIds}
                onUnlockArchive={onUnlockArchive}
                onTerminateExperiment={onTerminateExperiment}
                onUnlockNode={onUnlockNode}
                collectedClues={collectedClues}
                onCollectClue={onCollectClue}
                collectedYears={collectedYears}
                unlockedPeople={unlockedPeople}
                collectedDossierIds={collectedDossierIds}
                onConsumeKeywords={onConsumeKeywords}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
                currentStoryNode={currentStoryNode}
                unlockedNodeIds={gameState.unlockedNodeIds || []}
                tutorialStep={tutorialStep}
                setTutorialStep={setTutorialStep}
            />
            {/* Reboot / Override Countdown Overlay */}
            <AnimatePresence>
                {showCountdown && (
                    gameState.branchAttemptCount >= 4 ? (
                        /* Non-blocking top banner for Branch Countdown */
                        <motion.div
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100, transition: { duration: 0.3 } }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 z-[500] pointer-events-none flex flex-col items-center w-[90%] max-w-2xl"
                        >
                            <div className="w-full relative overflow-hidden rounded-md border border-red-500/50 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                                {/* Animated scanline background */}
                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(239,68,68,0.1) 50%)', backgroundSize: '100% 4px' }}></div>
                                
                                <div className="px-8 py-5 flex flex-col gap-4 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                animate={{ opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <ShieldAlert size={28} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                            </motion.div>
                                            <div className="flex flex-col">
                                                <span className="text-red-500 font-mono text-sm md:text-lg tracking-[0.3em] font-black uppercase text-shadow-glow">
                                                    CRITICAL_AUTHORITY_OVERRIDE
                                                </span>
                                                <span className="text-[9px] text-red-400/70 font-mono uppercase tracking-[0.2em]">
                                                    AWAITING MANUAL OVERRIDE INPUT // DO NOT ABORT
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-6xl md:text-7xl font-mono text-white tabular-nums font-black leading-none flex items-center" style={{ textShadow: '0 0 20px rgba(239,68,68,0.8), 0 0 40px rgba(239,68,68,0.4)' }}>
                                            {countdownValue < 10 ? `0${countdownValue}` : countdownValue}
                                            <span className="text-2xl text-red-500/80 ml-1">s</span>
                                        </div>
                                    </div>

                                    {/* Cool segmented progress bar */}
                                    <div className="w-full h-2 bg-neutral-900/80 flex gap-1 rounded-sm overflow-hidden p-0.5 border border-red-900/50">
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`h-full flex-1 rounded-sm ${i < countdownValue ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-red-950/30'}`}
                                                animate={{ 
                                                    opacity: i < countdownValue ? [1, 0.7, 1] : 0.3 
                                                }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    repeat: i < countdownValue ? Infinity : 0,
                                                    delay: i * 0.1
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* Full-screen blocking overlay for Persona Reboot */
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
                                    {countdownValue < 10 ? `0${countdownValue}` : countdownValue}
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-80 h-1.5 bg-neutral-900 overflow-hidden relative">
                                        <motion.div
                                            className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]"
                                            initial={{ width: "100%" }}
                                            animate={{ width: "0%" }}
                                            transition={{ duration: countdownValue, ease: "linear" }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-neutral-500 font-mono uppercase mt-2 tracking-[0.2em]">
                                        neural protocol rebooting... DO NOT DISCONNECT
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
            </AnimatePresence>

            {/* Evidence Filing Modal */}
            <AnimatePresence>
                {filingEvidence && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0c0505] border border-[#d89853]/50 w-full max-w-lg overflow-hidden flex flex-col shadow-[0_0_50px_rgba(216,152,83,0.3)]"
                        >
                            <div className="p-4 border-b border-[#d89853]/30 flex justify-between items-center bg-[#d89853]/5">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert size={16} className="text-[#d89853] animate-pulse" />
                                    <h3 className="text-xs font-bold tracking-[0.3em] text-[#d89853]">检测到关键证物 / NEW_EVIDENCE_DETECTED</h3>
                                </div>
                                <button onClick={() => setFilingEvidence(null)} className="text-[#d89853]/60 hover:text-[#d89853]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 flex flex-col items-center gap-6">
                                <div className="w-full aspect-[4/3] bg-black border border-[#d89853]/20 flex items-center justify-center overflow-hidden relative group">
                                    {filingEvidence.type === 'image' ? (
                                        <img
                                            src={filingEvidence.content}
                                            className="w-full h-full object-contain filter brightness-90 sepia-[0.3] contrast-110"
                                            alt={filingEvidence.title}
                                        />
                                    ) : (
                                        <div className="p-8 text-sm leading-relaxed text-[#d89853]/80 italic">
                                            {filingEvidence.content}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
                                </div>

                                <div className="text-center space-y-2">
                                    <h4 className="text-sm font-bold tracking-widest text-[#d89853]">{filingEvidence.title}</h4>
                                    <p className="text-[10px] text-[#d89853]/60 tracking-widest uppercase">
                                        Status: Unfiled // Location: Temporary Buffer
                                    </p>
                                    {/* 特殊图注：首次打开即可见并支持交互 */}
                                    {(filingEvidence.id === 'libby_ticket' || filingEvidence.id === 'libby_convergence_map') && (
                                        <div className="text-xs text-[#d89853] mt-2 pt-2 border-t border-[#d89853]/20">
                                            地点标注：
                                            <span
                                                className={`
                                                    ml-1 cursor-pointer underline underline-offset-4 decoration-dashed decoration-[#d89853]/50 hover:decoration-[#d89853]
                                                    ${(collectedClues || []).includes('libby_town') ? 'text-[#d89853] font-bold no-underline cursor-default' : 'animate-pulse text-white font-bold'}
                                                `}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!(collectedClues || []).includes('libby_town') && onCollectClue) {
                                                        onCollectClue('libby_town', '利比镇');
                                                    }
                                                }}
                                            >
                                                利比镇
                                            </span>
                                        </div>
                                    )}
                                    {filingEvidence.id === 'death_report' && (
                                        <div className="mt-2 p-2 bg-black/20 border-l-2 border-red-900/50 text-[10px] text-[#d89853] italic border-t border-[#d89853]/20 text-left">
                                            文件注记：这是一份
                                            <span
                                                className={`
                                                    ml-1 cursor-pointer underline underline-offset-4 decoration-dashed decoration-red-900/50 hover:decoration-[#d89853]
                                                    ${(collectedClues || []).includes('unnamed_female_body') ? 'text-[#d89853] font-bold no-underline cursor-default' : 'animate-pulse text-white font-bold'}
                                                `}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (!(collectedClues || []).includes('unnamed_female_body') && onCollectClue) {
                                                        onCollectClue('unnamed_female_body', '无名女尸');
                                                    }
                                                }}
                                            >
                                                无名女尸
                                            </span>
                                            的检测报告。
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        onCollectAttachment(filingEvidence.id);
                                        setFilingEvidence(null);
                                        // Visual feedback
                                        setStatusFlash(true);
                                        setTimeout(() => setStatusFlash(false), 2000);
                                    }}
                                    className="w-full py-4 bg-[#d89853] text-black font-bold tracking-[0.4em] hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(216,152,83,0.4)]"
                                >
                                    确认归档 / FILE_TO_DOSSIER
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tutorial Overlay */}
            <TutorialOverlay
                isVisible={tutorialStep === 1 && !showClueLibrary && !showMindMap && !showArchives && !showClueLibrary}
                targetId="tutorial-dossier-btn"
                text="系统已初始化。首先，点击“案卷建档”以查看我们收集到的情报资料。"
                position="bottom"
            />
            <TutorialOverlay
                isVisible={tutorialStep === 4 && !showClueLibrary && !showMindMap && !showArchives && !showClueLibrary}
                targetId="tutorial-keyword-chips"
                text="很好。我们需要检索一些具体的记忆。请在下方点击选择“缅因州”和“小银行”。"
                position="top"
            />
            <TutorialOverlay
                isVisible={tutorialStep === 5 && !showClueLibrary && !showMindMap && !showArchives && !showClueLibrary}
                targetId="tutorial-search-submit"
                text="检索条件已就绪，点击搜索图标以深入这段记忆。"
                position="right"
            />
            <TutorialOverlay
                isVisible={tutorialStep === 7 && !showClueLibrary && !showMindMap && !showArchives && !showClueLibrary}
                targetId="tutorial-archives-btn"
                text="你已经成功调取了一段供述。现在，让我们去“档案室”看看相关的背景资料。"
                position="bottom"
            />
        </div >
    );
};
