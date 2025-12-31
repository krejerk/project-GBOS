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
