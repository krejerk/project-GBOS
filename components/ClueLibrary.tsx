import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Folder, File, X, Image as ImageIcon, Paperclip, FileText, Search, Tag, Eye, Lock, Hash, MessageCircle, Mic, ChevronRight, Activity, Brain } from 'lucide-react';
import { Clue, ClueAttachment } from '../types';
import { VehiclePhotosViewer } from './VehiclePhotosViewer';

interface ClueLibraryProps {
    collectedClueIds: string[];
    isOpen: boolean;
    onClose: () => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
    onCollectClue?: (id: string, word: string) => void; // For auto-collecting clues
    collectedDossierIds?: string[]; // For tracking dossier items like addresses
    // Story node system
    unlockedNodeIds?: string[]; // For tracking unlocked confessions
    unlockedArchiveIds?: string[]; // For tracking unlocked archives
    currentStoryNode?: number; // Current story node (0 = not reached, 1 = node 1, etc.)
    onStoryNodeComplete?: (nodeId: number) => void; // Callback when node dialogue is completed
}

const CLUE_DEFINITIONS: Record<string, Clue> = {
    'family': {
        id: 'family',
        word: '诡异家族',
        description: '一个庞大的、横跨全美的家族式犯罪团伙。成员之间通过血缘连接，行踪飘忽不定。',
        source: 'Briefing'
    },
    'julip': {
        id: 'julip',
        word: '黄油朱莉普',
        description: '卡彭的安全识别代码 (Butter Julep)。',
        source: 'Briefing',
        attachments: [
            {
                type: 'image',
                title: 'FBI Symbol Sketch',
                content: '/assets/fbi-symbol.png'
            }
        ]
    },
    'maine': {
        id: 'maine',
        word: '缅因州',
        description: '该家族曾在此地实施过一次银行劫案。',
        source: 'Briefing'
    },
    'small_bank': {
        id: 'small_bank',
        word: '小银行',
        description: '被家族劫掠的目标地点之一。',
        source: 'Briefing'
    },
    'chicago': {
        id: 'chicago',
        word: '芝加哥',
        description: '亚裔女性失踪案发生的周边城市。',
        source: 'Briefing'
    },
    'robert': {
        id: 'robert',
        word: '罗伯特·卡彭',
        description: '潜伏阶段使用的身份代号，KLUB计划的重点关注对象。',
        source: 'Briefing'
    },
    'asian_woman': {
        id: 'asian_woman',
        word: '亚裔女性',
        description: '在香槟镇失踪的受害者，可能与该家族有关。',
        source: 'Briefing'
    },
    'missing': {
        id: 'missing',
        word: '失踪',
        description: '受害者的最终下落不明。',
        source: 'Briefing'
    },
    'father': {
        id: 'father',
        word: '父亲',
        description: '家族的主谋与核心控制者。习惯用随机物品命名犯罪计划。',
        source: 'Briefing'
    },
    'project': {
        id: 'project',
        word: '青豆牡蛎汤计划',
        description: '卡彭潜伏期间，该家族正在执行的犯罪计划代号。',
        source: 'Briefing'
    },
    'relationship': {
        id: 'relationship',
        word: '扭曲关系',
        description: '尼比与康查尔之间存在某种超越普通同伙的、带有仪式感的肉体与精神链接。',
        source: 'Confession'
    },
    'conchar': {
        id: 'conchar',
        word: '康查尔',
        description: '"父亲"的长子。极其危险的观察者，最终成为卡彭进入家族的引路人。',
        source: 'Confession'
    },
    'nibi': {
        id: 'nibi',
        word: '尼比',
        description: '阿尔衮琴人，1971年缅因州银行劫案的执行者。与康查尔之间存在扭曲的仪式性关系。',
        source: 'Confession'
    },
    'dr_reggie': {
        id: 'dr_reggie',
        word: '雷吉博士',
        description: '招募卡彭执行潜伏任务的关键人物。提出了"统一场论"，认为多个冷案之间存在隐藏的共性。',
        source: 'Confession'
    },
    'year_1971': {
        id: 'year_1971',
        word: '1971年',
        description: '缅因州银行劫案发生的年份，也是卡彭潜伏任务开始的时间节点。',
        source: 'Confession'
    },
    'dirty_frank': {
        id: 'dirty_frank',
        word: '脏弗兰克酒吧',
        description: '费城西边的一家脏乱酒吧，康查尔与卡彭的暂住地，莫宁经营的赃车处理据点。',
        source: 'Confession'
    },
    'morning': {
        id: 'morning',
        word: '莫宁',
        description: '脏弗兰克酒吧的老板，经营着报废车场，帮助处理赃车。他的车场中藏有伦德格兰逃亡时使用的蓝色福特费尔兰残骸。',
        source: 'Confession'
    },
    'lundgren': {
        id: 'lundgren',
        word: '伦德格兰',
        description: '1968年俄亥俄州柯特兰邪教屠杀案的主犯。自封"末日先知"，实际是病理性捕猎者。',
        source: 'Confession'
    },
    'ohio': {
        id: 'ohio',
        word: '俄亥俄州',
        description: '1968年柯特兰邪教屠杀案的发生地。雷吉博士"统一场论"列表中的关键案件之一。',
        source: 'Confession'
    },
    'ritual_case': {
        id: 'ritual_case',
        word: '祭祀案',
        description: '伦德格兰以宗教祭祀为名义实施的屠杀。艾弗里一家五口在谷仓下被杀害。',
        source: 'Confession'
    },
    'year_1968': {
        id: 'year_1968',
        word: '1968年',
        description: '俄亥俄州柯特兰邪教屠杀案发生的年份。雷吉博士的案卷病理学分析揭示了伦德格兰的真实动机。',
        source: 'Confession'
    },
    'roger_beebe': {
        id: 'roger_beebe',
        word: '罗格·毕比',
        description: '香槟镇失踪案的真凶。1985年因另一起案件被捕后，主动承认了1980年绑架并杀害金美善的罪行。',
        source: 'Confession'
    },
    'year_1985': {
        id: 'year_1985',
        word: '1985年',
        description: '罗格·毕比被捕并供认香槟镇失踪案的年份。FBI内部对KLUB机构的重组也在这一年启动。',
        source: 'Confession'
    },
    '1402_old_dominion_rd': {
        id: '1402_old_dominion_rd',
        word: '1402 Old Dominion Rd.',
        description: '罗伯特·卡彭接受特殊训练的地点。也是雷吉博士对他进行“特殊观察”的场所。',
        source: 'Briefing'
    },
    'family_massacre': {
        id: 'family_massacre',
        word: '灭门案',
        description: '内华达州戈尔康达郡发生的灭门惨案。RC曾在现场留下生物特征，被标记为高风险接触。',
        source: 'Briefing'
    },
    'training_day': {
        id: 'training_day',
        word: '训练日',
        description: 'RC受训结束的日子。在那一天，雷吉博士在一个马场旁的咖啡馆里，向他揭示了被选中的真相。',
        source: 'Dialogue'
    },
    'nevada': {
        id: 'nevada',
        word: '内华达州',
        description: 'RC多次活动的地点。在他的梦境中，那是“青豆牡蛎汤”的起源地。',
        source: 'Confession'
    },
    'crime_route_map': {
        id: 'crime_route_map',
        word: '罗伯特·卡彭：犯罪路线',
        description: '我根据你得到的供述，整理出了卡彭的犯罪活动路线图。目前标记到了波特兰、波士顿、纽波特、纽约、费城等关键地点。——詹妮弗',
        source: 'Node 1 Analysis',
        attachments: [{
            type: 'image',
            title: '东海岸犯罪路线图 (1980s)',
            content: '/assets/crime-route-map.png'
        }]
    }
};

const JENNIFER_DIALOGUE = [
    `你终于找到这里了。`,
    `这里是"案卷建档"模块。
从结构上看，它只是一个调查工具，对卡彭来说不具备情绪或记忆权重。`,
    `为了避免引起他潜意识层面的警觉，我们之后的所有交流，都会在这个模块内进行。`,
    `他知道你正在进行调查工作。
在他的认知模型里，这里只会被理解为"你在整理材料"，不会触发防御反应。`,
    `任务推进过程中，记得不时回来看看。
当你取得阶段性进展时，我可能会为你解锁新的信息、提示，或者调整当前目标。`,
    `如果我没有主动出现，也不代表这里是安全的。
    只是说明，你还没触及他真正敏感的部分。`
];

const JENNIFER_RETURN_DIALOGUE = [
    `你又回来了。`,
    `目前还没有新的线索可以共享。
你触及的层级，仍然停留在表层整理阶段。`,
    `继续推进调查。
当案卷之间出现无法被合理归档的矛盾时，这里才会再次产生意义。`,
    `不用刻意停留。
如果有新的触发点，我会在这个模块内标记出来。`,
    `现在，回去工作吧。`
];

// Node 1 Dialogue - Triggered when player completes chapter 1
const JENNIFER_NODE_1_DIALOGUE = [
    `我需要你立刻修正判断。`,
    `罗伯特·卡彭不再可信。\n他已经脱离"自己人"的范畴。`,
    `他不断提及过往案件，并不是在协助你。\n那是在拖延，在绕开核心。`,
    `从现在开始，忽略这些案子。`,
    `你的唯一重点，是"父亲"的下落。`,
    `盯紧他的路线，拆解他的话。\n找出漏洞，找出变节的迹象。`,
    `最重要的是——\n确认他把父亲藏在了哪里。`,
    `我已经根据你目前的调查进展，以及新增的外部信息，\n整理并更新了案卷建档中的部分内容。`,
    `你现在可以进入该模块，查看这些更新。`,
    `不要分心。你可以试试问问他关于[训练日](clue:training_day)的事情。`
];

// Utility function to reset visit status (call this when starting a new game)
export const resetClueLibraryVisit = () => {
    sessionStorage.removeItem('clueLibrary_visited');
};

export const ClueLibrary: React.FC<ClueLibraryProps> = ({
    collectedClueIds,
    isOpen,
    onClose,
    collectedAttachments = [],
    onCollectAttachment,
    onCollectClue,
    unlockedNodeIds = [],
    unlockedArchiveIds = [],
    currentStoryNode = 0,
    collectedDossierIds = [], // Default to empty array
    collectedKeywords = [], // New prop for dialogue parsing only
    onStoryNodeComplete
}) => {
    const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
    const [filter, setFilter] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'folder'>('list');

    // Helper to parse content and render clickable clues (Ported from BriefingDetailView)
    const renderContent = (content: string) => {
        const parts = content.split(/(\[.*?\]\(clue:.*?\))/g);

        return parts.map((part, index) => {
            const match = part.match(/\[(.*?)\]\(clue:(.*?)\)/);
            if (match) {
                const [_, text, clueId] = match;
                // Check if collected in keywords (clues) OR in the display list (dossiers)
                const isCollected = collectedKeywords.includes(clueId) || collectedClueIds.includes(clueId);

                return (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isCollected && onCollectClue) {
                                onCollectClue(clueId, text);
                            }
                        }}
                        className={`
                            relative inline-block px-1 rounded cursor-pointer transition-all duration-300 mx-0.5
                            ${isCollected
                                ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-b border-[#38bdf8]/30 cursor-default'
                                : 'text-[#e2e8f0] hover:bg-[#38bdf8]/20 hover:scale-105 border-b border-dashed border-[#e2e8f0]/50 animate-pulse'
                            }
                        `}
                    >
                        {text}
                        {!isCollected && (
                            <span className="absolute -top-3 -right-2 opacity-0 hover:opacity-100 transition-opacity text-[8px] text-[#38bdf8] bg-black/80 px-1 rounded border border-[#38bdf8]/30 whitespace-nowrap z-50">
                                点击收集
                            </span>
                        )}
                    </span>
                );
            }
            return part;
        });
    };
    const [viewingAttachment, setViewingAttachment] = useState<ClueAttachment | null>(null);

    // Jennifer Dialogue State
    const [showJennifer, setShowJennifer] = useState(false);
    const [jenniferStep, setJenniferStep] = useState(0);
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);
    const [pendingNodeId, setPendingNodeId] = useState<number | null>(null);

    // Track newly added items for glow effect
    const [newlyAddedItems, setNewlyAddedItems] = useState<Set<string>>(new Set());

    // Vehicle photos viewer state
    const [showVehiclePhotos, setShowVehiclePhotos] = useState(false);

    // Check if player has reached Node 1 conditions
    const checkNode1Completion = () => {
        const requiredConfessions = ['confession_1', 'confession_2', 'confession_3'];
        const requiredArchives = ['me_1971', 'oh_1968', 'dc_1967', 'il_1985'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && currentStoryNode === 0;
    };

    // First visit detection - check whenever module opens
    useEffect(() => {
        if (isOpen) {
            const visited = sessionStorage.getItem('clueLibrary_visited');
            setHasVisitedBefore(!!visited);

            // Check for node completion - don't auto-open, just set indicator
            if (checkNode1Completion()) {
                setPendingNodeId(1);
                // Don't auto-open: setShowJennifer(true);
            }
            // Don't auto-open on first visit either
            // User must click the button to see dialogue
        }
    }, [isOpen, unlockedNodeIds, unlockedArchiveIds, currentStoryNode]);

    // Mark as visited when dialogue completes
    const handleJenniferComplete = () => {
        if (!hasVisitedBefore) {
            sessionStorage.setItem('clueLibrary_visited', 'true');
            setHasVisitedBefore(true);
        }

        // If completing a node dialogue, notify parent and auto-collect items
        if (pendingNodeId !== null && onStoryNodeComplete) {
            onStoryNodeComplete(pendingNodeId);

            // Auto-collect Node 1 items
            if (pendingNodeId === 1) {
                // Add crime route map as a clue
                if (onCollectClue) {
                    onCollectClue('crime_route_map', '罗伯特·卡彭：犯罪路线');
                }

                // Mark as newly added for glow effect
                setNewlyAddedItems(new Set(['crime_route_map']));

                // Remove glow after 10 seconds
                setTimeout(() => {
                    setNewlyAddedItems(new Set());
                }, 10000);
            }

            setPendingNodeId(null);
        }

        setShowJennifer(false);
        setJenniferStep(0);
    };

    const handleJenniferClose = () => {
        setShowJennifer(false);
        setJenniferStep(0);
    };

    const handleJenniferNext = () => {
        // Select dialogue based on state
        let currentDialogue;
        if (pendingNodeId === 1) {
            currentDialogue = JENNIFER_NODE_1_DIALOGUE;
        } else if (hasVisitedBefore) {
            currentDialogue = JENNIFER_RETURN_DIALOGUE;
        } else {
            currentDialogue = JENNIFER_DIALOGUE;
        }

        if (jenniferStep < currentDialogue.length - 1) {
            setJenniferStep(prev => prev + 1);
        }
    };

    // Get current dialogue based on visit status
    const currentDialogue = hasVisitedBefore ? JENNIFER_RETURN_DIALOGUE : JENNIFER_DIALOGUE;

    // Filter available clues
    // Data is now strict lane separated, so we trust the incoming IDs
    const collectedClues = collectedClueIds
        .map(id => CLUE_DEFINITIONS[id])
        .filter(Boolean);

    // Group clues by source
    const groupedClues = collectedClues.reduce((acc, clue) => {
        if (!acc[clue.source]) acc[clue.source] = [];
        acc[clue.source].push(clue);
        return acc;
    }, {} as Record<string, Clue[]>);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                >
                    {/* Main Container - Centered Modal */}
                    <div className="w-full max-w-6xl h-[85vh] bg-[#1c1c1e] border-2 border-[#8b4049]/50 rounded-lg flex shadow-[0_0_80px_rgba(139,64,73,0.25),0_0_40px_rgba(56,189,248,0.1)] relative overflow-hidden">

                        {/* Left Sidebar: Case Directory */}
                        <div className="w-64 bg-[#141416] border-r-2 border-[#8b4049]/30 flex flex-col hidden md:flex">
                            <div className="p-6 border-b border-[#8b4049]/30">
                                <h2 className="text-[#c9c9cd] font-mono font-bold tracking-[0.2em] flex items-center gap-2">
                                    <Database size={16} />
                                    案卷建档
                                </h2>
                                <p className="text-[#8b4049]/80 text-[10px] uppercase tracking-widest mt-1">Case Dossier & Evidence</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {Object.entries(groupedClues).map(([source, clues]) => (
                                    <div key={source}>
                                        <div className="text-[10px] text-[#8e8e93] uppercase tracking-[0.2em] font-bold mb-3 px-2">
                                            {source}
                                        </div>
                                        <div className="space-y-1">
                                            {(clues as Clue[]).map(clue => {
                                                const hasAttachment = clue.attachments && clue.attachments.length > 0;
                                                const isActive = selectedClue?.id === clue.id;
                                                const isNew = newlyAddedItems.has(clue.id);

                                                return (
                                                    <motion.button
                                                        key={clue.id}
                                                        onClick={() => setSelectedClue(clue)}
                                                        className={`
                                                            w-full text-left px-3 py-2 rounded text-xs font-mono transition-all flex items-center justify-between group
                                                            ${isNew
                                                                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                                                                : isActive
                                                                    ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                                                    : 'text-[#aeaeb2] hover:bg-[#8b4049]/15 hover:text-[#c9c9cd] hover:border-[#8b4049]/30 border border-transparent'
                                                            }
                                                        `}
                                                        animate={isNew ? {
                                                            boxShadow: [
                                                                '0 0 20px rgba(56, 189, 248, 0.6)',
                                                                '0 0 30px rgba(56, 189, 248, 0.9)',
                                                                '0 0 20px rgba(56, 189, 248, 0.6)'
                                                            ]
                                                        } : {}}
                                                        transition={isNew ? { duration: 1.5, repeat: Infinity } : {}}
                                                    >
                                                        <span className="truncate">{clue.word}</span>
                                                        {hasAttachment && (
                                                            <Paperclip size={10} className={`${isActive || isNew ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'}`} />
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-[#8b4049]/30 text-center text-[10px] text-[#8e8e93] uppercase tracking-widest">
                                TOTAL ITEMS: {collectedClues.length}
                            </div>
                        </div>

                        {/* Right Content: Folder View */}
                        <div className="flex-1 bg-[#1c1c1e] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative overflow-hidden flex flex-col">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 text-[#8e8e93] hover:text-[#c9c9cd] hover:bg-[#8b4049]/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Folder Content */}
                            {selectedClue ? (
                                <div className="flex-1 p-8 md:p-16 flex flex-col overflow-y-auto w-full max-w-4xl mx-auto custom-scrollbar">

                                    {/* Folder Tab/Label */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={selectedClue.id}
                                        className="w-full bg-[#E3DAC9] text-[#1a1515] rounded-sm p-1 shadow-2xl transform md:-rotate-1 relative mb-12"
                                    >
                                        {/* Folder Tab */}
                                        <div className="absolute -top-6 left-0 bg-[#E3DAC9] px-6 py-1 rounded-t-lg font-mono font-bold text-xs tracking-widest shadow-sm">
                                            EVIDENCE #{selectedClue.id.toUpperCase()}
                                        </div>

                                        {/* Paper Content */}
                                        <div className="bg-[#f0ece2] p-8 md:p-12 min-h-[50vh] relative shadow-inner bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">

                                            {/* Stamp */}
                                            <div className="absolute top-8 right-8 text-red-900/20 border-4 border-red-900/20 p-2 font-black uppercase text-2xl tracking-[0.2em] transform rotate-12 pointer-events-none select-none">
                                                CONFIDENTIAL
                                            </div>

                                            {/* Header */}
                                            <div className="border-b-2 border-[#1a1515]/10 pb-6 mb-8">
                                                <h1 className="text-3xl md:text-4xl font-bold text-[#1a1515] font-serif tracking-tight mb-2">
                                                    {selectedClue.word}
                                                </h1>
                                                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#1a1515]/50">
                                                    <span className="flex items-center gap-1"><Tag size={12} /> Source: {selectedClue.source}</span>
                                                    <span>|</span>
                                                    <span>Ref: {Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                                                </div>
                                            </div>

                                            {/* Description - Typewriter style */}
                                            <div className="font-mono text-sm md:text-base leading-relaxed text-[#1a1515]/80 mb-12 max-w-2xl">
                                                {selectedClue.description}
                                            </div>

                                            {/* Attachments Section */}
                                            <div className="bg-[#1a1515]/5 rounded-lg p-6 border border-[#1a1515]/10">
                                                <div className="text-xs font-bold uppercase tracking-widest text-[#1a1515]/40 mb-4 flex items-center gap-2">
                                                    <Paperclip size={12} />
                                                    Attached Evidence
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {selectedClue.attachments?.map((attachment, idx) => {
                                                        // CONDITIONAL RENDER CHECK
                                                        const isUnlocked = collectedAttachments.includes('julip_symbol') || selectedClue.id !== 'julip';

                                                        // Special logic for Julip: needs unlock
                                                        if (selectedClue.id === 'julip' && !isUnlocked) {
                                                            return null; // Or render a placeholder/locked state
                                                        }

                                                        return (
                                                            <motion.button
                                                                key={idx}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => setViewingAttachment(attachment)}
                                                                className="group relative aspect-square bg-white shadow-sm p-2 flex flex-col items-center justify-center gap-2 border border-gray-200 hover:shadow-lg transition-all transform rotate-2 hover:rotate-0"
                                                            >
                                                                <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                                                                    {attachment.type === 'image' ? (
                                                                        <img src={attachment.content} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                    ) : (
                                                                        <FileText size={24} className="text-gray-400" />
                                                                    )}

                                                                    {/* Hover Overlay */}
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                                        <Eye size={20} />
                                                                    </div>
                                                                </div>
                                                                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500 group-hover:text-black">
                                                                    Exhibit {String.fromCharCode(65 + idx)}
                                                                </span>
                                                            </motion.button>
                                                        );
                                                    })}
                                                    {(!selectedClue.attachments || selectedClue.attachments.length === 0 || (selectedClue.id === 'julip' && !collectedAttachments.includes('julip_symbol'))) && (
                                                        <div className="col-span-4 text-center py-8 text-xs text-gray-400 italic">
                                                            No physical evidence attached to this file.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>

                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-[#636366]">
                                    <Folder size={64} className="mb-4 opacity-50" />
                                    <p className="font-mono uppercase tracking-[0.2em] text-sm">Select a file to view details</p>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Full Screen Attachment Viewer */}
                    <AnimatePresence>
                        {viewingAttachment && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                                onClick={() => setViewingAttachment(null)}
                            >
                                {/* Special fullscreen UI for crime route map */}
                                {selectedClue?.id === 'crime_route_map' ? (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative w-full h-full flex flex-col overflow-hidden"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-6 px-8 flex-shrink-0">
                                            <div>
                                                <h2 className="text-2xl font-bold text-[#d89853] tracking-[0.2em] mb-2">
                                                    犯罪路线分析
                                                </h2>
                                                <p className="text-sm text-[#94a3b8] font-mono">
                                                    CRIME ROUTE ANALYSIS - CLASSIFIED
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="p-3 text-[#94a3b8] hover:text-white transition-colors bg-[#1e293b]/50 rounded-lg hover:bg-[#1e293b]"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        {/* Scrollable Map Container */}
                                        <div className="flex-1 overflow-y-auto px-8 pb-8">
                                            <motion.div
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                className="relative max-w-6xl mx-auto"
                                            >
                                                {/* Map Image */}
                                                <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] p-8 rounded-lg shadow-[0_0_100px_rgba(212,165,116,0.2)] border border-[#d89853]/20">
                                                    <img
                                                        src={viewingAttachment.content}
                                                        alt={viewingAttachment.title}
                                                        className="w-full h-auto rounded shadow-2xl"
                                                    />

                                                    {/* Decorative corners */}
                                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d89853]/40"></div>


                                                    {/* Pinned Vehicle Photos - Top Right */}
                                                    {/* Maine Photo - Behind */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                                                        transition={{ delay: 0.3 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-4 right-4 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="/assets/car-maine-original.jpg"
                                                                alt="Maine Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                Maine: 412-88B<br />C.K. & R.C.
                                                            </div>
                                                        </div>
                                                    </motion.button>

                                                    {/* New Mexico Photo - Front, slightly overlapping */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                                                        transition={{ delay: 0.5 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-12 right-16 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="/assets/car-newmexico-original.jpg"
                                                                alt="New Mexico Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                NEW MEXICO: [SMUDGE] F★<br />OCT 26 '78
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                </div>

                                                {/* Description */}
                                                <div className="mt-6 bg-[#0f172a]/80 border border-[#334155] rounded-lg p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-[#d89853]/10 rounded">
                                                            <Database size={20} className="text-[#d89853]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#e2e8f0] text-sm leading-relaxed font-light">
                                                                {selectedClue.description}
                                                            </p>
                                                            <div className="mt-4 flex gap-4 text-xs text-[#64748b]">
                                                                <span>案件编号: FBI-84-0132</span>
                                                                <span>•</span>
                                                                <span>日期: 1984.10.12</span>
                                                                <span>•</span>
                                                                <span>状态: 进行中</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Regular attachment viewer */
                                    viewingAttachment.type === 'image' && (
                                        <motion.div
                                            initial={{ scale: 0.9, rotate: -2 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.9, rotate: 2 }}
                                            className="relative bg-white p-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-8 border-white max-h-[90vh] max-w-[90vw] cursor-auto"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <img
                                                src={viewingAttachment.content}
                                                alt={viewingAttachment.title}
                                                className="max-h-[85vh] object-contain"
                                            />
                                            <div className="absolute bottom-[-40px] left-0 w-full text-center text-white font-mono text-sm tracking-widest mt-4">
                                                {viewingAttachment.title}
                                            </div>
                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="absolute -top-12 -right-12 p-2 text-white/50 hover:text-white transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Jennifer Button */}
                    <motion.button
                        onClick={() => setShowJennifer(true)}
                        className={`fixed bottom-8 right-8 z-[105] p-4 rounded-full border-2 transition-all duration-300 ${pendingNodeId !== null
                            ? 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] border-[#fca5a5] text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] scale-110'
                            : hasVisitedBefore
                                ? 'bg-[#0f172a]/90 border-[#475569] text-[#94a3b8] hover:bg-[#1e293b] hover:border-[#38bdf8] hover:text-[#38bdf8]'
                                : 'bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.4)]'
                            }`}
                        animate={
                            pendingNodeId !== null || !hasVisitedBefore
                                ? {
                                    scale: [1.1, 1.25, 1.1],
                                    boxShadow: pendingNodeId !== null
                                        ? ['0 0 40px rgba(220, 38, 38, 0.6)', '0 0 70px rgba(220, 38, 38, 1)', '0 0 40px rgba(220, 38, 38, 0.6)']
                                        : ['0 0 30px rgba(56, 189, 248, 0.4)', '0 0 50px rgba(56, 189, 248, 0.8)', '0 0 30px rgba(56, 189, 248, 0.4)']
                                }
                                : {}
                        }
                        transition={
                            pendingNodeId !== null || !hasVisitedBefore
                                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                                : {}
                        }
                        whileHover={{ scale: pendingNodeId !== null ? 1.3 : 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle size={24} />
                        {(pendingNodeId !== null || !hasVisitedBefore) && (
                            <motion.div
                                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${pendingNodeId !== null ? 'bg-red-500' : 'bg-[#38bdf8]'
                                    }`}
                                animate={{
                                    scale: [1, 2, 1],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                    </motion.button>

                    {/* Jennifer Dialogue Overlay */}
                    <AnimatePresence>
                        {showJennifer && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
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
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[#64748b] text-[10px] bg-[#1e293b] px-2 py-0.5 rounded font-mono tracking-wider">
                                                    LIVE FEED
                                                </span>
                                            </div>
                                            <button
                                                onClick={handleJenniferClose}
                                                className="p-1.5 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#334155]/50 rounded-full transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Waveform Visualizer */}
                                    <div className="h-16 w-full bg-[#020617] relative flex items-center justify-center gap-1 overflow-hidden opacity-80">
                                        {[...Array(40)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-[#38bdf8]/40 rounded-full"
                                                animate={{
                                                    height: [4, 12 + Math.random() * 20, 4],
                                                    opacity: [0.3, 1, 0.3]
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.02,
                                                    ease: "circInOut"
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Dialogue Content with Avatar */}
                                    <div className="p-8 min-h-[200px] flex items-center gap-6 relative">
                                        {/* Jennifer Silhouette Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-[#1e293b] border-2 border-[#38bdf8]/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                                {/* Simple silhouette - head and shoulders */}
                                                <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end">
                                                    {/* Head */}
                                                    <div className="w-10 h-10 rounded-full bg-[#38bdf8]/60 mb-1" />
                                                    {/* Shoulders */}
                                                    <div className="w-20 h-8 rounded-t-full bg-[#38bdf8]/60" />
                                                </div>
                                                {/* Glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#38bdf8]/10" />
                                            </div>
                                        </div>

                                        {/* Dialogue Text */}
                                        <div className="flex-1">
                                            <p className="text-[#e2e8f0] text-lg font-light tracking-wide leading-relaxed font-sans whitespace-pre-line">
                                                {(() => {
                                                    // Select dialogue based on state
                                                    let currentDialogue;
                                                    if (pendingNodeId === 1) {
                                                        currentDialogue = JENNIFER_NODE_1_DIALOGUE;
                                                    } else if (hasVisitedBefore) {
                                                        currentDialogue = JENNIFER_RETURN_DIALOGUE;
                                                    } else {
                                                        currentDialogue = JENNIFER_DIALOGUE;
                                                    }
                                                    return renderContent(currentDialogue[jenniferStep]);
                                                })()}
                                            </p>
                                        </div>

                                        <div className="absolute top-2 right-2 text-[#334155]/20">
                                            <Activity size={120} />
                                        </div>
                                    </div>

                                    {/* Footer / Navigation */}
                                    <div className="bg-[#1e293b]/30 p-4 flex justify-center border-t border-[#334155]">
                                        {(() => {
                                            // Select dialogue based on state
                                            let currentDialogue;
                                            if (pendingNodeId === 1) {
                                                currentDialogue = JENNIFER_NODE_1_DIALOGUE;
                                            } else if (hasVisitedBefore) {
                                                currentDialogue = JENNIFER_RETURN_DIALOGUE;
                                            } else {
                                                currentDialogue = JENNIFER_DIALOGUE;
                                            }

                                            return jenniferStep < currentDialogue.length - 1 ? (
                                                <button
                                                    onClick={handleJenniferNext}
                                                    className="group flex items-center gap-3 px-8 py-3 bg-[#334155]/50 hover:bg-[#475569]/50 border border-[#475569] text-[#e2e8f0] rounded-lg transition-all font-mono text-sm tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.1)] outline-none"
                                                >
                                                    继续
                                                    <ChevronRight size={16} className="text-[#94a3b8] group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            ) : (
                                                <motion.button
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleJenniferComplete}
                                                    className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] hover:from-[#1e293b] hover:via-[#334155] hover:to-[#1e293b] border border-[#38bdf8]/50 text-[#38bdf8] rounded-lg transition-all font-mono text-base tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                                                >
                                                    <Brain size={20} className="animate-pulse" />
                                                    继续工作 // CONTINUE
                                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </motion.button>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vehicle Photos Fullscreen Viewer */}
                    <VehiclePhotosViewer
                        isOpen={showVehiclePhotos}
                        onClose={() => setShowVehiclePhotos(false)}
                    />

                </motion.div>
            )}
        </AnimatePresence>
    );
};
