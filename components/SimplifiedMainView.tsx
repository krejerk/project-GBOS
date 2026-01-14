
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Terminal as TerminalIcon, FileText, X, ChevronDown, Database, Archive, Network, Construction, Brain, Activity, RotateCcw } from 'lucide-react';
import { SyndicateBoard } from './SyndicateBoard';
import { ConfessionLog } from './ConfessionLog';
import { NodeDetail } from './NodeDetail';
import { ClueLibrary } from './ClueLibrary';
import { Archives } from './Archives';
import { MemoryNode } from '../types';

interface SimplifiedMainViewProps {
    nodes: MemoryNode[];
    onNodeClick: (id: string) => void;
    activeNodeId: string | null;
    onSearch: (query: string) => void;
    history: Array<{ type: string; content: string; timestamp: number }>;
    isProcessing: boolean;
    activeNode?: MemoryNode;
    onShatter: (id: string) => void;
    collectedClues: string[];
    collectedYears: string[];
    unlockedPeople: string[];
    onCollectClue: (id: string, word: string) => void;
    unlockedArchiveIds: string[];
    onUnlockArchive: (id: string) => void;
    onConsumeKeywords: (yearIds: string[], personIds: string[]) => void;
    collectedAttachments: string[];
    onCollectAttachment: (id: string) => void;
    collectedDossierIds: string[]; // Strict lane for Dossier
    systemStability: number;
    currentStoryNode: number;
    onStoryNodeComplete: (nodeId: number) => void;
    onRetrace: () => { success: boolean; reason?: string; keywords?: string[] };
    onDebugUnlockAll?: () => void; // DEBUG: Temporary testing function
}

type PanelType = 'mindmap' | 'terminal' | 'relationships';

export const SimplifiedMainView: React.FC<SimplifiedMainViewProps> = ({
    nodes,
    onNodeClick,
    activeNodeId,
    onSearch,
    history,
    isProcessing,
    activeNode,
    onShatter,
    collectedClues = [],
    collectedYears = [],
    unlockedPeople = [],
    onCollectClue,
    unlockedArchiveIds = [],
    onUnlockArchive,

    onConsumeKeywords,
    collectedAttachments,
    onCollectAttachment,
    collectedDossierIds = [],
    systemStability,
    currentStoryNode,
    onStoryNodeComplete,
    onRetrace,
    onDebugUnlockAll
}) => {
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

    // Helper map for clue display names
    const CLUE_DISPLAY_MAP: Record<string, string> = {
        'rubick': '鲁比克',
        'chicago': '芝加哥',
        'asian_woman': '亚裔女性',
        'maine': '缅因州',
        'small_bank': '小银行',
        'julip': '黄油朱莉普',
        'headdress': '阿尔衮琴族头饰', // Ensure it has a name if present
        'missing': '失踪',
        'father': '父亲',
        'project': '青豆牡蛎汤计划',
        'confession': '供述',
        'relationship': '扭曲关系',
        'conchar': '康查尔',
        'nibi': '尼比',
        'dr_reggie': '雷吉博士',
        'year_1971': '1971年',
        'dirty_frank': '脏弗兰克酒吧',
        'morning': '莫宁',
        'lundgren': '伦德格兰',
        'ohio': '俄亥俄州',
        'ritual_case': '祭祀案',
        'dismemberment_case': '碎尸案',
        'year_1968': '1968年',
        'year_1967': '1967年',
        'phoenix': '凤凰城行动',
        'architect': '建筑师',
        'syndicate': '辛迪加',
        '1402_old_dominion_rd': '1402 Old Dominion Rd.',
        'family_massacre': '灭门案',
        'nevada': '内华达州',
        'training_day': '训练日',
        'year_1985': '1985年',
        'roger_beebe': '罗格·毕比',
        'little_derek_wayne': '小德里克·维恩',
        'mojave_rest_stop': '莫哈韦休息站',
        'empty_cigarette_pack': '空烟盒',
        'roanoke': '罗阿诺克市',
        'graywater_beacon': '灰水信标',
        'iron_horse_image': '铁马烟盒 (Visual)',
        'aw_wilmo': '小A.W.威尔莫',
        'twisted_relationship': '扭曲关系', // Confession 6 keyword
        'blue_rv': '淡蓝色房车'
    };

    // Mapping: Node ID -> [Keywords to HIDE when node is unlocked]
    const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {
        // Node 1
        'confession_1': ['maine', 'small_bank'],
        'confession_2': ['chicago', 'asian_woman', 'missing'],
        'confession_3': ['father', 'family', 'relationship'],

        // Archives (Usually unlocked by Year + specialized keyword)
        // Note: App.tsx handles consumption for years separately, but we can hide prompts here too
        'oh_1968': ['ohio', 'ritual_case', 'year_1968'],
        'me_1971': ['maine', 'year_1971'], // 'maine' also used for Confession 1, safe to duplicate
        'dc_1967': ['year_1967', 'phoenix'],
        'il_1985': ['year_1985', 'roger_beebe'],

        // Node 2 (Confessions 4-7)
        'confession_4': ['1402_old_dominion_rd', 'training_day'],
        'confession_5': ['nevada', 'mojave_rest_stop', 'empty_cigarette_pack'],
        'confession_6': ['roanoke', 'twisted_relationship'],
        'confession_7': ['year_1990', 'aw_wilmo'], // Clipping 7 / Confession 7

        // Archives Node 2
        'va_1990': ['year_1990']
    };

    // Calculate currently consumed keywords based on unlocked nodes from props
    // We use the `nodes` prop which contains only unlocked nodes (per App.tsx logic)
    const consumedKeywords = React.useMemo(() => {
        const consumed = new Set<string>();
        // Add consumed from unlocked nodes (Confessions)
        nodes.forEach(node => {
            const keywords = KEYWORD_CONSUMPTION_MAP[node.id];
            if (keywords) {
                keywords.forEach(k => consumed.add(k));
            }
        });
        // Add consumed from unlocked archives
        unlockedArchiveIds.forEach(archiveId => {
            const keywords = KEYWORD_CONSUMPTION_MAP[archiveId];
            if (keywords) {
                keywords.forEach(k => consumed.add(k));
            }
        });
        return consumed;
    }, [nodes, unlockedArchiveIds]);


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
        <div className="h-screen w-screen bg-[#050303] text-[#d89853] overflow-hidden flex flex-col relative font-mono">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* BRIGHTER: Ambient Light Glow in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#d89853]/10 blur-[100px] rounded-full" />

                {/* BRIGHTER: Background Image */}
                <div className="absolute inset-0 opacity-40 filter blur-lg scale-110 pointer-events-none mix-blend-screen">
                    <img
                        src="/assets/capone-split-personality.jpg"
                        className="w-full h-full object-cover opacity-60" // Increased opacity
                        style={{ objectPosition: '0% 20%' }}
                    />
                </div>

                {/* BRIGHTER: Reduced overlay darkness */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                <div className="scanlines opacity-5" /> {/* Reduced scanline interference */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            {/* Header / Nav */}
            <header className="h-14 md:h-20 border-b border-[#d89853]/20 flex items-center justify-between px-4 md:px-8 bg-black/20 backdrop-blur-md z-20">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c85a3f] rounded-full animate-pulse shadow-[0_0_8px_#c85a3f]" />
                    <h1 className="text-lg md:text-xl tracking-[0.2em] font-bold text-[#d89853] opacity-90 text-shadow-sm">G.B.O.S. LINK</h1>
                </div>

                {/* Top Feature Nav */}
                <div className="flex gap-4 md:gap-6">
                    <button
                        onClick={() => setShowMindMap(true)}
                        className="group flex items-center gap-2 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold"
                    >
                        <Network size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">人物关系</span>
                    </button>
                    <button
                        onClick={() => setShowArchives(true)}
                        className="group flex items-center gap-2 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold"
                    >
                        <Archive size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">档案室</span>
                    </button>
                    <button
                        onClick={() => setShowClueLibrary(true)}
                        className="group flex items-center gap-2 text-[#d89853]/80 hover:text-[#d89853] transition-colors text-xs tracking-[0.1em] font-bold"
                    >
                        <Database size={14} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden md:inline">案卷建档</span>
                        <span className="bg-[#d89853]/10 px-1.5 py-0.5 rounded text-[9px] group-hover:bg-[#d89853]/30 transition-colors">
                            {collectedDossierIds.length}
                        </span>
                    </button>


                </div>
            </header>

            {/* Main Content Area - Centered Search */}
            <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-2xl flex flex-col items-center gap-8"
                >
                    {/* Ambient Avatar / Prompt */}
                    <div className="relative mb-8 group flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#d89853]/40 shadow-[0_0_40px_rgba(216,152,83,0.3)] opacity-90 group-hover:opacity-100 transition-opacity filter sepia-[0.2] contrast-110 mb-6">
                            <img
                                src="/assets/capone-split-personality.jpg"
                                className="w-[200%] h-full max-w-none object-cover object-left"
                            />
                        </div>

                        {/* Dynamic Response Area */}
                        <div className="min-h-[20px] flex items-center justify-center px-4 w-[120%] -ml-[10%] text-center">
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
                                                className="text-[#d89853] text-sm tracking-[0.2em] font-light animate-pulse"
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
                                                className="text-xs font-mono tracking-widest text-[#d89853]/50 animate-pulse"
                                            >
                                                {tempSystemMessage}
                                            </motion.div>
                                        );
                                    }

                                    const lastItem = history.length > 0 ? history[history.length - 1] : null;

                                    // CRITICAL: Only show CHARACTER DIALOGUE in this area
                                    // Character dialogue format: "> [NAME]: ..."
                                    // Block ALL system messages (anything not starting with "> [")
                                    const isCharacterDialogue = lastItem?.content.startsWith('> [');
                                    const showResponse = lastItem && lastItem.type !== 'search' && isCharacterDialogue;

                                    if (showResponse && lastItem) {
                                        // Clean up content for display: remove "> [NAME]: " prefix if present
                                        const displayContent = lastItem.content.replace(/^> \[.*?\]:\s*"/, '').replace(/"$/, '');

                                        return (
                                            <motion.div
                                                key={lastItem.timestamp}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-sm tracking-[0.15em] font-light leading-relaxed text-[#d89853] italic"
                                                style={{ textShadow: '0 0 10px rgba(216,152,83,0.3)' }}
                                            >
                                                "{displayContent}"
                                            </motion.div>
                                        );
                                    }

                                    return (
                                        <motion.div
                                            key="default"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-[#d89853]/60 text-sm tracking-[0.2em] font-light text-shadow-sm"
                                        >
                                            “你想聊些什么？”
                                        </motion.div>
                                    );
                                })()}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Search Input */}
                    <form onSubmit={handleSearchSubmit} className="w-full relative group transform transition-all duration-300 focus-within:scale-105">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#d89853]/60 group-hover:text-[#d89853] transition-colors" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="输入关键词检索记忆碎片..."
                            autoFocus
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay to allow click on chips
                            className="w-full pl-16 pr-8 py-5 bg-black/40 backdrop-blur-md border border-[#d89853]/30 text-[#d89853] placeholder-[#d89853]/40 rounded-full text-lg font-light tracking-wide focus:outline-none focus:border-[#d89853]/60 focus:bg-black/60 transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:border-[#d89853]/50"
                            style={{ textShadow: '0 0 10px rgba(216,152,83,0.2)' }}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden group/btn hover:bg-[#d89853]/10 transition-all cursor-pointer"
                        >
                            <span className="text-[10px] tracking-widest text-[#d89853] group-hover/btn:text-white transition-colors">检索</span>
                            <TerminalIcon size={12} className="text-[#d89853]" />
                        </button>


                        {/* Subconscious Retrace Button - Top Left of Search Box */}
                        <div
                            className="absolute -top-8 left-0 flex items-center gap-2 text-[10px] tracking-widest text-[#d89853]/60 hover:text-[#d89853] cursor-pointer transition-colors uppercase font-bold group/retrace"
                            onClick={handleRetraceClick}
                        >
                            <Brain size={12} className="group-hover/retrace:animate-pulse" />
                            <span>潜意识回溯 // RETRACE</span>
                        </div>

                        {/* View Log Button - Top Right of Search Box */}
                        <div
                            className="absolute -top-8 right-0 flex items-center gap-2 text-[10px] tracking-widest text-[#d89853]/60 hover:text-[#d89853] cursor-pointer transition-colors uppercase font-bold"
                            onClick={() => setShowTerminal(true)}
                        >
                            <TerminalIcon size={12} />
                            <span>查看日志 // LOGS</span>
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
                            {(isSearchFocused || collectedClues.length > 0 || unlockedPeople.length > 0) && (collectedClues.length > 0 || unlockedPeople.length > 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="w-full max-w-2xl px-4 flex flex-wrap gap-2 justify-center mt-4 absolute top-full left-0 z-20"
                                >
                                    {collectedClues
                                        .filter(id =>
                                            !unlockedPeople.includes(id) &&
                                            !id.startsWith('year_') &&
                                            !/^\d{4}$/.test(id) &&
                                            id.toLowerCase() !== 'capone' &&
                                            id.toLowerCase() !== 'robert' &&
                                            id !== 'dr_reggie' &&
                                            id !== 'graywater_beacon' &&
                                            id !== 'iron_horse_image' &&
                                            !!CLUE_DISPLAY_MAP[id] && // STRICT: Only show if it has a valid Chinese mapping
                                            !consumedKeywords.has(id) // HIDE CONSUMED KEYWORDS
                                        )
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
                                                className="px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-xs rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                                            >
                                                {CLUE_DISPLAY_MAP[id] || id}
                                            </button>
                                        ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>




                </motion.div>
            </main>

            {/* Feature Modals (Moved out of <main> to escape z-index constraints) */}
            {/* Syndicate Board Modal */}
            <AnimatePresence>
                {showMindMap && (
                    <div className="fixed inset-0 z-[200]">
                        <SyndicateBoard
                            unlockedPeople={unlockedPeople}
                            onClose={() => setShowMindMap(false)}
                            phase={1}
                        />
                    </div>
                )}
            </AnimatePresence>

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
                            className="w-full max-w-3xl h-[80vh] bg-[#0c0c0c] border border-[#d89853]/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="absolute top-3 right-3 z-10 text-[#d89853]/60 hover:text-[#d89853] p-1 hover:bg-[#d89853]/10 rounded transition-colors"
                            >
                                <X size={18} />
                            </button>
                            <ConfessionLog
                                unlockedNodeIds={nodes.map(n => n.id)}
                                onClose={() => setShowTerminal(false)}
                                onViewNode={(id) => {
                                    setShowTerminal(false);
                                    onNodeClick(id);
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Node Detail Modal (triggered by search or map click) */}
            <AnimatePresence mode="wait">
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
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 md:p-8"
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
                            drag
                            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
                            dragMomentum={false}
                            className="w-full max-w-6xl h-[85vh] bg-[#0c0505] border border-[#d89853]/40 rounded-sm shadow-[0_0_150px_rgba(216,152,83,0.15),0_0_50px_rgba(0,0,0,1)] overflow-hidden relative flex flex-col cursor-grab active:cursor-grabbing"
                            style={{ boxShadow: '0 0 100px rgba(0,0,0,0.8), 0 0 40px rgba(216,152,83,0.1)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => onNodeClick('')}
                                className="absolute top-6 right-6 z-[220] p-2 bg-black/60 text-[#d89853]/60 hover:text-[#d89853] hover:bg-black/80 border border-[#d89853]/20 rounded-full transition-all backdrop-blur-md shadow-2xl pointer-events-auto"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex-1 overflow-hidden pointer-events-auto">
                                <NodeDetail
                                    node={activeNode}
                                    onShatter={onShatter}
                                    onCollectClue={onCollectClue}
                                    onCollectAttachment={onCollectAttachment}
                                    collectedDossierIds={collectedDossierIds}
                                    collectedAttachments={collectedAttachments}
                                    clueDisplayMap={CLUE_DISPLAY_MAP}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                collectedClueIds={collectedDossierIds} // Revert: Main list shows Dossiers
                collectedKeywords={collectedClues} // New: Keywords for dialogue parser
                collectedDossierIds={collectedDossierIds}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
                onCollectClue={onCollectClue}
                unlockedNodeIds={nodes.filter(n => n.id.includes('confession')).map(n => n.id)}
                unlockedArchiveIds={unlockedArchiveIds}
                currentStoryNode={currentStoryNode}
                onStoryNodeComplete={onStoryNodeComplete}
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
            />
        </div >
    );
};
