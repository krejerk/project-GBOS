
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Lock, Hash } from 'lucide-react';
import { Clue } from '../types';

interface ClueLibraryProps {
    collectedClueIds: string[];
    isOpen: boolean;
    onClose: () => void;
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
        source: 'Briefing'
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

export const ClueLibrary: React.FC<ClueLibraryProps> = ({ collectedClueIds, isOpen, onClose }) => {
    const collectedClues = collectedClueIds.map(id => CLUE_DEFINITIONS[id]).filter(Boolean);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed top-0 right-0 h-full w-full md:w-96 bg-[#0a0505]/95 backdrop-blur-md border-l border-[#c85a3f]/30 z-50 shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-[#c85a3f]/20 flex justify-between items-center bg-black/40">
                        <div className="flex items-center gap-2 text-[#d89853]">
                            <Database size={18} />
                            <span className="font-mono text-lg tracking-widest uppercase">线索库 CLUES</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[#c85a3f]/60 hover:text-[#c85a3f] transition-colors font-mono text-sm"
                        >
                            [CLOSE]
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#c85a3f]/20 scrollbar-track-transparent">
                        {collectedClues.length === 0 ? (
                            <div className="text-center text-[#c85a3f]/40 font-mono py-10 space-y-2">
                                <Lock size={32} className="mx-auto opacity-50 mb-4" />
                                <p>NO DATA FRAGMENTS FOUND</p>
                                <p className="text-xs">Collect clues from memory briefings</p>
                            </div>
                        ) : (
                            collectedClues.map((clue, index) => (
                                <motion.div
                                    key={clue.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-[#d89853]/5 border border-[#d89853]/20 rounded p-4 group hover:bg-[#d89853]/10 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-[#d89853] font-bold tracking-wider">{clue.word}</h3>
                                        <span className="text-[10px] text-[#c85a3f]/60 bg-[#c85a3f]/10 px-1 rounded font-mono">
                                            {clue.source.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-neutral-400 text-sm leading-relaxed mb-3">
                                        {clue.description}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-[#d89853]/40 font-mono">
                                        <Hash size={10} />
                                        <span>ID: {clue.id.toUpperCase()}_{Math.floor(Math.random() * 9000) + 1000}</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Footer Status */}
                    <div className="p-4 border-t border-[#c85a3f]/20 bg-black/60 text-[10px] text-[#c85a3f]/50 font-mono flex justify-between">
                        <span>TOTAL: {collectedClues.length}</span>
                        <span>STATUS: SYNCHRONIZED</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
