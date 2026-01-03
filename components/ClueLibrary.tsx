import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Folder, File, X, Image as ImageIcon, Paperclip, FileText, Search, Tag, Eye, Lock, Hash } from 'lucide-react';
import { Clue, ClueAttachment } from '../types';

interface ClueLibraryProps {
    collectedClueIds: string[];
    isOpen: boolean;
    onClose: () => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
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
    }
};

export const ClueLibrary: React.FC<ClueLibraryProps> = ({
    collectedClueIds,
    isOpen,
    onClose,
    collectedAttachments = []
}) => {
    const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
    const [viewingAttachment, setViewingAttachment] = useState<ClueAttachment | null>(null);

    // Filter available clues
    // DOSSIER WHITELIST: Only these specific IDs are allowed to be displayed in the Case Dossier
    const DOSSIER_WHITELIST = ['julip', 'project', 'julip_symbol', 'project_symbol'];

    const collectedClues = collectedClueIds
        .map(id => CLUE_DEFINITIONS[id])
        .filter(clue => clue && DOSSIER_WHITELIST.includes(clue.id));

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
                    <div className="w-full max-w-6xl h-[85vh] bg-[#0c0c0c] border border-[#d89853]/20 rounded-lg flex shadow-[0_0_100px_rgba(216,152,83,0.1)] relative overflow-hidden">

                        {/* Left Sidebar: Case Directory */}
                        <div className="w-64 bg-[#0a0505] border-r border-[#d89853]/10 flex flex-col hidden md:flex">
                            <div className="p-6 border-b border-[#d89853]/10">
                                <h2 className="text-[#d89853] font-mono font-bold tracking-[0.2em] flex items-center gap-2">
                                    <Database size={16} />
                                    案卷建档
                                </h2>
                                <p className="text-[#d89853]/40 text-[10px] uppercase tracking-widest mt-1">Case Dossier & Evidence</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {Object.entries(groupedClues).map(([source, clues]) => (
                                    <div key={source}>
                                        <div className="text-[10px] text-[#d89853]/30 uppercase tracking-[0.2em] font-bold mb-3 px-2">
                                            {source}
                                        </div>
                                        <div className="space-y-1">
                                            {(clues as Clue[]).map(clue => {
                                                const hasAttachment = clue.attachments && clue.attachments.length > 0;
                                                const isActive = selectedClue?.id === clue.id;

                                                return (
                                                    <button
                                                        key={clue.id}
                                                        onClick={() => setSelectedClue(clue)}
                                                        className={`
                                                            w-full text-left px-3 py-2 rounded text-xs font-mono transition-all flex items-center justify-between group
                                                            ${isActive
                                                                ? 'bg-[#d89853]/20 text-[#d89853] border border-[#d89853]/40 shadow-inner'
                                                                : 'text-[#d89853]/60 hover:bg-[#d89853]/5 hover:text-[#d89853]'
                                                            }
                                                        `}
                                                    >
                                                        <span className="truncate">{clue.word}</span>
                                                        {hasAttachment && (
                                                            <Paperclip size={10} className={`${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'}`} />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-[#d89853]/10 text-center text-[10px] text-[#d89853]/30 uppercase tracking-widest">
                                TOTAL ITEMS: {collectedClues.length}
                            </div>
                        </div>

                        {/* Right Content: Folder View */}
                        <div className="flex-1 bg-[#100c0c] bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] relative overflow-hidden flex flex-col">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 text-[#d89853]/40 hover:text-[#d89853] hover:bg-[#d89853]/10 rounded-full transition-colors"
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
                                <div className="flex-1 flex flex-col items-center justify-center text-[#d89853]/20">
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
                                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                                onClick={() => setViewingAttachment(null)}
                            >
                                {viewingAttachment.type === 'image' && (
                                    <motion.div
                                        initial={{ scale: 0.9, rotate: -2 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0.9, rotate: 2 }}
                                        className="relative bg-white p-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-8 border-white max-h-[90vh] max-w-[90vw]"
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
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
