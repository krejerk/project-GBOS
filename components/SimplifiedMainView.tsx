
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Terminal as TerminalIcon, FileText, X, ChevronDown, Database, Archive, Network, Construction } from 'lucide-react';
import { MindMap } from './MindMap';
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
    collectedDossierIds = []
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showMindMap, setShowMindMap] = useState(false);
    const [showClueLibrary, setShowClueLibrary] = useState(false);
    const [showArchives, setShowArchives] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false); // Now acts as "Construction" modal trigger
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Helper map for clue display names (replicated from DialogueView for consistency)
    const CLUE_DISPLAY_MAP: Record<string, string> = {
        'rubick': '鲁比克',
        'robert': '罗伯特·卡彭',
        'julip': '黄油朱莉普',
        'julep': '黄油朱莉普', // Alias for typo/legacy
        'chicago': '芝加哥',
        'asian_woman': '亚裔女性',
        'maine': '缅因州',
        'small_bank': '小银行',
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
        'year_1967': '1967年'
    };

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
                    <div className="relative mb-4 group">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#d89853]/40 shadow-[0_0_40px_rgba(216,152,83,0.3)] opacity-90 group-hover:opacity-100 transition-opacity filter sepia-[0.2] contrast-110">
                            <img
                                src="/assets/capone-split-personality.jpg"
                                className="w-[200%] h-full max-w-none object-cover object-left"
                            />
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#d89853]/60 text-sm tracking-[0.2em] font-light text-shadow-sm">
                            “你想聊些什么？”
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

                        {/* View Log Button - Top Right of Search Box */}
                        <div
                            className="absolute -top-8 right-0 flex items-center gap-2 text-[10px] tracking-widest text-[#d89853]/60 hover:text-[#d89853] cursor-pointer transition-colors uppercase font-bold"
                            onClick={() => setShowTerminal(true)}
                        >
                            <TerminalIcon size={12} />
                            <span>查看日志 // LOGS</span>
                        </div>
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
                                            id.toLowerCase() !== 'capone' &&
                                            id.toLowerCase() !== 'robert' // Robert is person
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

                {/* Feature Modals */}

                {/* MindMap Modal */}
                <AnimatePresence>
                    {showMindMap && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-40 bg-black/95 bg-opacity-95 backdrop-blur-sm"
                        >
                            {/* Header Controls - Title Only */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-[100]">
                                <span className="text-[#d89853] tracking-[0.2em] font-bold flex items-center gap-3 bg-black/50 px-4 py-2 rounded-full border border-[#d89853]/20 backdrop-blur-md pointer-events-auto shadow-[0_0_15px_rgba(216,152,83,0.2)]">
                                    <Network size={20} />
                                    神经网络图谱
                                </span>
                            </div>

                            {/* Exit Button - Bottom Center */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
                                <button
                                    onClick={() => setShowMindMap(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#c85a3f]/30 hover:bg-[#c85a3f]/50 text-[#d89853]/80 hover:text-[#d89853] border border-[#c85a3f]/40 shadow-[0_0_8px_rgba(200,90,63,0.2)] rounded transition-all group backdrop-blur-sm"
                                >
                                    <span className="text-xs font-mono tracking-[0.15em] uppercase opacity-80 group-hover:opacity-100">EXIT</span>
                                    <X size={14} />
                                </button>
                            </div>

                            <div className="w-full h-full">
                                <MindMap
                                    nodes={nodes}
                                    activeNodeId={activeNodeId}
                                    onNodeClick={(id) => {
                                        onNodeClick(id);
                                        setShowMindMap(false); // Close map on click to show details
                                    }}
                                    onShatter={onShatter}
                                    unlockedPeople={unlockedPeople}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Terminal / Log View */}
                <AnimatePresence>
                    {showTerminal && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
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
                <AnimatePresence>
                    {activeNode && (
                        <motion.div
                            key={activeNode.id} // Ensure animation triggers on node change
                            initial={activeNode.id.includes('confession')
                                ? { opacity: 0, scale: 1.2, filter: 'brightness(2)' } // Bright flash start
                                : { opacity: 0, y: 50, scale: 0.95 }}
                            animate={activeNode.id.includes('confession')
                                ? { opacity: 1, scale: 1, filter: 'brightness(1)', transition: { type: "spring", bounce: 0.4, duration: 0.6 } }
                                : { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
                            onClick={() => onNodeClick('')} // Click outside to close
                        >
                            <div
                                className="w-full max-w-4xl max-h-full bg-[#0c0505] border border-[#d89853]/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => onNodeClick('')}
                                    className="absolute top-4 right-4 z-50 p-2 text-[#c85a3f]/60 hover:text-[#c85a3f] hover:bg-[#c85a3f]/10 rounded-full transition-all"
                                >
                                    <X size={24} />
                                </button>
                                <div className="overflow-y-auto custom-scrollbar">
                                    <NodeDetail node={activeNode} onShatter={onShatter} onCollectClue={onCollectClue} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>

            {/* Quick Status / Hints - Fixed Bottom (hide when MindMap is open) */}
            {!showMindMap && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 left-0 w-full flex justify-center z-20 pointer-events-none"
                >
                    <div className="flex items-center gap-8 md:gap-16 text-[10px] text-[#d89853]/50 tracking-widest uppercase font-semibold pointer-events-auto bg-black/20 backdrop-blur-sm px-8 py-2 rounded-full border border-[#d89853]/10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#c85a3f] rounded-full animate-pulse shadow-[0_0_5px_#c85a3f]" />
                            系统稳定
                        </div>
                        <div>记忆完整度: 84%</div>
                        <div>连接: 安全</div>
                    </div>
                </motion.div>
            )}

            {/* Feature Sidebar Panels */}
            <ClueLibrary
                isOpen={showClueLibrary}
                onClose={() => setShowClueLibrary(false)}
                collectedClueIds={collectedDossierIds}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
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
                onConsumeKeywords={onConsumeKeywords}
                collectedAttachments={collectedAttachments}
                onCollectAttachment={onCollectAttachment}
            />
        </div>
    );
};
