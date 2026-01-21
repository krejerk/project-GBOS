import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lock, AlertCircle, Hash } from 'lucide-react';

interface ConfessionLogProps {
    unlockedNodeIds: string[];
    onClose: () => void;
    onViewNode: (id: string) => void;
}

// Definition of all confessions for the directory
const CONFESSION_REGISTRY = [
    {
        id: 'confession_1',
        displayId: 'REC-1971-MN',
        title: '供述 No.1: 缅因州银行劫案',
        eventTime: '1971',
        location: '缅因州 (Maine)',
        keywords: ['缅因州', '阿尔衮琴', '供述', '扭曲关系'],
        people: ['尼比 (Nibi)', '康查尔 (Conchar)'],
        summary: '关于1971年针对缅因州第一国民银行的武装劫案供述。揭示了尼比作为执行者与康查尔作为策划者之间的非典型同谋关系。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_2',
        displayId: 'REC-1968-OH',
        title: '供述 No.2: 俄亥俄州祭祀案',
        eventTime: '1968',
        location: '俄亥俄州 (Ohio)',
        keywords: ['俄亥俄州', '祭祀案', '伦德格兰'],
        people: ['伦德格兰 (Lundgren)', '莫宁 (Morning)'],
        summary: '关于1968年俄亥俄州柯特兰邪教屠杀案的供述。揭示了雷吉博士的"统一场论"与伦德格兰案件之间的联系。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_3',
        displayId: 'REC-1985-IL',
        title: '供述 No.3: 罗格·毕比失踪案',
        eventTime: '1985',
        location: '伊利诺伊州 (Illinois)',
        keywords: ['罗格·毕比', '1985'],
        people: ['罗格·毕比 (Roger Beebe)'],
        summary: '关于香槟镇失踪案真凶的供述。揭示了罗格·毕比在1985年落网后的供词，以及康查尔对此类"不受控恶行"的鄙夷态度。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_4',
        displayId: 'REC-1967-NV',
        title: '供述 No.4: 训练日回忆',
        eventTime: '1967',
        location: '内华达州 (Nevada)',
        keywords: ['训练日', '1402 Old Dominion Rd.', '内华达州', '雷吉博士'],
        people: ['雷吉博士 (Dr. Reggie)'],
        summary: '关于特工选拔与训练结束时的关键对话。揭示了雷吉博士选中卡彭的真实原因——一种被视为"天赋"的精神病态特质。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_5',
        displayId: 'REC-1973-NV',
        title: '供述 No.5: 维恩灭门案',
        eventTime: '1973',
        location: '内华达州 (Nevada)',
        keywords: ['小德里克·维恩', '灭门案'],
        people: ['小德里克·维恩 (Derek Wayne Jr.)', '康查尔 (Conchar)'],
        summary: '关于维恩一家惨遭灭门的真相。揭示了该家族长子因其变态嗜好招致的报复，以及康查尔对此事所持的"受约束暴力"观点。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_6',
        displayId: 'REC-1972-VA',
        title: '供述 No.6: 灰水信标',
        eventTime: '1972',
        location: '弗吉尼亚州 (Virginia)',
        keywords: ['罗阿诺克市', '灰水信标', '铁马'],
        people: ['雷吉博士 (Dr. Reggie)', '康查尔 (Conchar)'],
        summary: '关于“信标”系统的建立与早期运作。揭示了康查尔在逃亡途中如何利用特定品牌烟盒向清理小组单向传递情报的全过程。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_7',
        displayId: 'REC-1972-VA-R',
        title: '供述 No.7: 罗阿诺克谋杀案',
        eventTime: '1972 ∙ 深秋',
        location: '弗吉尼亚州 罗阿诺克市 (Roanoke)',
        keywords: ['罗阿诺克市', '扭曲关系', '莫布利', '玛莎·迪亚兹', '1972'],
        people: ['康查尔 (Conchar)', '尼比 (Nibi)', '玛莎·迪亚兹 (Martha Diaz)'],
        summary: '关于康查尔与尼比之间病态关系的深度剖析，以及卡彭在罗阿诺克市的廉价旅馆中首次接触暴力仪式的经历。揭示了他目睹玛莎·迪亚兹被杀的全过程。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_8',
        displayId: 'REC-1973-KY',
        title: '供述 No.8: 路易斯维尔房车',
        eventTime: '1973 ∙ 正月',
        location: '肯塔基州 路易斯维尔 (Louisville)',
        keywords: ['路易斯维尔', '淡蓝色房车', '1973', '朱莉', '辛辛那提'],
        people: ['父亲 (Father)', '康查尔 (Conchar)', '母亲 (The Mother)', '塞勒斯 (Silas)', '瓦妮莎 (Vanessa)'],
        summary: '关于卡彭首次进入"家族"核心的供述。揭示了1973年辛辛那提少女朱莉冻死案的真相，以及他在路易斯维尔码头首次见到"父亲"和淡蓝色房车内其他成员的经历。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_9',
        displayId: 'REC-1982-TX',
        title: '供述 No.9: 薄荷计划与灵魂厨房',
        eventTime: '1982 ∙ 深秋',
        location: '德克萨斯州 埃尔帕索 (El Paso)',
        keywords: ['辛辛那提', '薄荷计划', '1982', '埃尔帕索', '朱维尔·钱伯斯', '1973'],
        people: ['父亲 (Father)', '康查尔 (Conchar)', '朱维尔·钱伯斯 (Juvell Chambers)'],
        summary: '关于"灵魂厨房计划"的深度揭露。卡彭讲述了1982年在埃尔帕索投放最后一个信标的经历，以及1973年纳什维尔军械库窃案背后"家族"利用种族冲突掩护犯罪的真相。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_10',
        displayId: 'REC-1973-KY-B',
        title: '供述 No.10: 伯克斯维尔计划',
        eventTime: '1973 ∙ 深秋',
        location: '肯塔基州 伯克斯维尔 (Burkesville)',
        keywords: ['伯克斯维尔', '远亲', '1973', '鲍里斯·斯米尔诺夫'],
        people: ['父亲 (Father)', '康查尔 (Conchar)', '塞勒斯 (Silas)', '母亲 (The Mother)', '鲍里斯·斯米尔诺夫 (Boris Smirnov)'],
        summary: '关于卡彭首次独立策划行动的供述。揭示了1973年在伯克斯维尔，"父亲"如何要求他为"远亲"设计计划，以及家族内部"先拆解再重塑"的招募方法和成员间的权力关系。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_11',
        displayId: 'REC-1975-KY-SS',
        title: '供述 No.11: 静态雪花计划',
        eventTime: '1975年前后',
        location: '肯塔基州 伯克斯维尔 (Burkesville)',
        keywords: ['KLUB-75报告', '匡提科', '静态雪花计划'],
        people: ['父亲 (Father)', '母亲 (The Mother)', '塞勒斯 (Silas)', '辛西娅·米勒 (Cynthia Miller)'],
        summary: '关于"静态雪花计划"的供述。揭示了卡彭如何利用FBI战术设计心理操控行动，通过拍摄"前卫艺术"录像绑架辛西娅·米勒，制造恐慌并享受破坏秩序的快感，完成从FBI探员到享受混乱的变态者的心理转变。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_12',
        displayId: 'REC-1976-MO',
        title: '供述 No.12: 流动献血车计划',
        eventTime: '1976',
        location: '堪萨斯城 (Kansas City)',
        keywords: ['堪萨斯城', '流动献血车', '1976', '杰西·潘尼'],
        people: ['罗伯特·卡彭 (Robert Capone)', '赛勒斯 (Silas)', '瓦妮莎 (Vanessa)'],
        summary: '关于1976年堪萨斯城"流动献血车"行动的供述。揭示了卡彭如何设计极其荒谬的超现实主义犯罪来拖延捕捕时间并渗透远亲网络，以及瓦妮莎对其人性转变的质问。',
        status: 'DECRYPTED'
    },
    {
        id: 'confession_13',
        displayId: 'REC-1976-MO-C',
        title: '供述 No.13: 混乱的美学',
        eventTime: '1976',
        location: '堪萨斯城 (Kansas City)',
        keywords: ['约翰·莫里西', '混乱美学', '1976'],
        people: ['父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
        summary: '关于莫里西（杰西·潘尼）被捕后的对话揭密。揭示了"父亲"对"混乱"的独特哲学见解，以及卡彭如何通过制造混乱，在不经意间摧毁了连联邦政府都无法撼动的犯罪堡垒。',
        status: 'DECRYPTED'
    }
];

export const ConfessionLog: React.FC<ConfessionLogProps> = ({ unlockedNodeIds, onClose, onViewNode }) => {
    return (
        <div className="flex flex-col h-full bg-[#0c0c0c] border border-[#d89853]/30 rounded-lg overflow-hidden font-mono">
            {/* Header */}
            <div className="p-4 border-b border-[#c85a3f]/20 bg-black/40 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#d89853]">
                    <FileText size={18} />
                    <span className="font-bold tracking-widest uppercase">供述日志目录 // CONFESSION LOGS</span>
                </div>
                <div className="text-[10px] text-[#c85a3f]/60">
                    LEVEL 5 CLEARANCE REQUIRED
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {CONFESSION_REGISTRY.map((record, index) => {
                    const isDecrypted = unlockedNodeIds.includes(record.id);

                    if (record.status === 'LOCKED' && !isDecrypted) {
                        // Render Locked State
                        return (
                            <div key={record.id} className="opacity-50 border border-[#c85a3f]/10 p-4 rounded bg-black/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Lock size={20} className="text-[#c85a3f]" />
                                    <div>
                                        <div className="text-[#c85a3f] font-bold text-sm tracking-widest">ENCRYPTED RECORD</div>
                                        <div className="text-[10px] text-[#c85a3f]/50">ACCESS DENIED - NODE LOCKED</div>
                                    </div>
                                </div>
                                <div className="text-[#c85a3f]/30 font-mono text-xs">#{index + 1}</div>
                            </div>
                        );
                    }

                    // Render Unlocked State (or placeholder if I decide confession_2 is just a visual filler for now)
                    // For now, only render if isDecrypted OR if I want to show empty slots. 
                    // Let's hide 'confession_2' if not unlocked, user only cares about collected.
                    // User said: "将每一次的供述按照目录形式收录进去" -> "Collect each confession into directory".
                    // So probably just list the collected ones? Or list all slots?
                    // "Directory" usually implies order. I'll show placeholder if not collected? 
                    // Let's stick to: If unlocked, show details. If not, maybe don't show or show "Locked".
                    // I will filter only unlocked ones + maybe one "Next Pending"?
                    // Let's just render checks.

                    if (!isDecrypted && record.id !== 'confession_2') return null; // Logic: Hide entirely if not unlocked (except placeholder if we want).
                    // Actually, let's show ALL defined in registry, but locked ones look locked.

                    if (!isDecrypted) {
                        return (
                            <div key={record.id} className="opacity-40 border-l-2 border-[#c85a3f]/20 pl-4 py-2">
                                <div className="flex items-center gap-2 text-[#c85a3f]/60 font-bold mb-1">
                                    <Lock size={12} />
                                    <span>[RECORD #{String(index + 1).padStart(3, '0')} - DATA MISSING]</span>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <motion.div
                            key={record.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onViewNode(record.id)}
                            className="bg-[#d89853]/5 border-l-2 border-[#d89853] p-5 rounded-r shadow-[0_0_15px_rgba(216,152,83,0.1)] group hover:bg-[#d89853]/10 transition-colors cursor-pointer relative overflow-hidden"
                        >
                            {/* Hover Highlight Effect */}
                            <div className="absolute inset-0 bg-[#d89853]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            {/* Header Line */}
                            <div className="flex justify-between items-start mb-3 border-b border-[#d89853]/10 pb-2 relative z-10">
                                <div>
                                    <h3 className="text-[#d89853] font-bold text-lg tracking-wide group-hover:text-white transition-colors">{record.title}</h3>
                                    <div className="flex gap-3 text-[10px] text-[#c85a3f]/80 mt-1 font-mono">
                                        <span>ID: {record.displayId}</span>
                                        <span>|</span>
                                        <span>DATE: {record.eventTime}</span>
                                        <span>|</span>
                                        <span>LOC: {record.location}</span>
                                    </div>
                                </div>
                                <Hash size={24} className="text-[#d89853]/10 group-hover:text-[#d89853]/30 transition-colors" />
                            </div>

                            {/* Keywords Chips */}
                            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                                {record.keywords.map(k => (
                                    <span key={k} className="px-2 py-0.5 bg-[#d89853]/10 text-[#d89853] text-[10px] rounded border border-[#d89853]/20">
                                        {k}
                                    </span>
                                ))}
                            </div>

                            {/* People */}
                            <div className="mb-3 text-xs text-[#d89853]/80 relative z-10">
                                <span className="text-[#c85a3f] font-bold uppercase mr-2">涉及人物:</span>
                                {record.people.join(', ')}
                            </div>

                            {/* Summary */}
                            <div className="text-sm text-neutral-400 leading-relaxed font-light border-l-2 border-[#c85a3f]/30 pl-3 mb-3 custom-summary-clamp relative z-10">
                                {record.summary}
                            </div>

                            {/* View Full Action */}
                            <div className="flex justify-end relative z-10">
                                <button className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#d89853] opacity-60 group-hover:opacity-100 transition-opacity border border-[#d89853]/30 px-3 py-1 rounded hover:bg-[#d89853] hover:text-black">
                                    <FileText size={10} />
                                    VIEW FULL TRANSCRIPT
                                </button>
                            </div>
                        </motion.div>
                    );
                })}

                {unlockedNodeIds.length === 0 && (
                    <div className="text-center text-[#c85a3f]/40 py-12 flex flex-col items-center gap-3">
                        <AlertCircle size={32} />
                        <p>AWAITING NEURAL SYNCHRONIZATION...</p>
                        <p className="text-xs">No confession records recovered.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#c85a3f]/20 bg-black/40 text-[10px] text-[#c85a3f]/40 text-center uppercase tracking-widest">
                G.B.O.S. Secure Archives // Confidential
            </div>
        </div>
    );
};
