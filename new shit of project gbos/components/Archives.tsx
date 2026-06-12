
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Search, X, ShieldAlert, FolderOpen, Menu } from 'lucide-react';
import { 
    CLUE_DISPLAY_MAP, 
    KEYWORD_CONSUMPTION_MAP, 
    CATEGORY_IDS, 
    ARCHIVE_CASE_HIGHLIGHT_MAP, 
    GLOBAL_KEYWORD_MAP, 
    UNLOCKS_REGISTRY, 
    ARCHIVE_DATABASE, 
    KEYWORD_REGISTRY,
    ATTACHMENT_REGISTRY,
    DetailedArchiveRecord,
    getNodeChapter
} from '../constants';
import { ThorneBackend } from './ThorneBackend';

interface ArchivesProps {
    isOpen: boolean;
    onClose: () => void;
    unlockedArchiveIds: string[];
    onUnlockArchive: (id: string) => void;
    onCollectClue: (id: string, word: string) => void;
    collectedClues: string[];
    collectedYears: string[];
    unlockedPeople: string[];
    collectedDossierIds: string[];
    onConsumeKeywords: (yearIds: string[], personIds: string[]) => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
    currentStoryNode?: number;
    unlockedNodeIds?: string[];
    onUnlockNode?: (id: string) => void;
    onGameEnd?: () => void;
    isBranchBActive?: boolean;
    onTerminateExperiment?: (type: 'ending2' | 'ending3') => void;
}

const SIGNATURE_CONFIG: Record<string, { name: string, className: string, rotation: string }> = {
    REGGIE: { name: "Dr. Reggie", className: "font-signature-reggie text-xl", rotation: "-2deg" },
    THORNE: { name: "M. Thorne", className: "font-signature-thorne text-2xl", rotation: "1deg" },
    ALTERMAN: { name: "I. Alterman", className: "font-signature-alterman text-3xl", rotation: "-3deg" },
    BAKER: { name: "H. Baker", className: "font-signature-baker text-3xl", rotation: "2deg" },
    CRANE: { name: "T. Crane", className: "font-signature-crane text-2xl", rotation: "-1deg" },
    HAWKE: { name: "D. Hawke", className: "font-signature-hawke text-3xl", rotation: "3deg" },
};

export const Archives: React.FC<ArchivesProps> = ({
    isOpen,
    onClose,
    unlockedArchiveIds,
    onUnlockArchive,
    onCollectClue,
    collectedClues,
    collectedYears,
    unlockedPeople,
    collectedDossierIds,
    onConsumeKeywords,
    onUnlockNode,
    currentStoryNode = 0,
    unlockedNodeIds = [],
    onCollectAttachment,
    onTerminateExperiment
}) => {
    const consumedKeywords = React.useMemo(() => {
        const consumed = new Set<string>();
        unlockedNodeIds.filter(Boolean).forEach(nodeId => {
            const keywords = KEYWORD_CONSUMPTION_MAP[nodeId];
            if (keywords) keywords.forEach(k => {
                if (['year_1967', 'year_1971', 'year_1973', 'year_1976', 'year_1977', 'year_1985', '1967', '1971', '1973', '1976', '1977', '1985'].includes(k)) return;
                consumed.add(k);
                const mapped = GLOBAL_KEYWORD_MAP[k];
                if (mapped) consumed.add(mapped.id);
            });
        });
        const yearCollectedCount = (collectedYears || []).reduce((acc, y) => {
            acc[y] = (acc[y] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        const yearConsumedCount: Record<string, number> = {};
        unlockedArchiveIds.filter(Boolean).forEach(archiveId => {
            const keywords = KEYWORD_CONSUMPTION_MAP[archiveId];
            if (keywords) {
                keywords.forEach(k => {
                    if (k.startsWith('year_') || !isNaN(Number(k))) {
                        yearConsumedCount[k] = (yearConsumedCount[k] || 0) + 1;
                    } else {
                        consumed.add(k);
                        const mapped = GLOBAL_KEYWORD_MAP[k];
                        if (mapped) consumed.add(mapped.id);
                    }
                });
            }
        });
        Object.keys(yearConsumedCount).forEach(y => {
            // 豁免所有跨章节重复使用的年份，不把它们判定为已消耗
            if (['year_1967', 'year_1971', 'year_1973', 'year_1976', 'year_1977', 'year_1985', '1967', '1971', '1973', '1976', '1977', '1985'].includes(y)) return;
            if (yearConsumedCount[y] >= (yearCollectedCount[y] || 0)) {
                consumed.add(y);
            }
        });

        // 全局双向对齐：让别名和 ID 的已消费状态完全一致
        const expandedConsumed = new Set<string>(consumed);
        consumed.forEach(k => {
            // 如果是中文名，将对应的 ID 加入
            const mapped = GLOBAL_KEYWORD_MAP[k];
            if (mapped) expandedConsumed.add(mapped.id);
            
            // 如果是标准 ID，将所有映射到它的中文名/别名加入
            Object.entries(GLOBAL_KEYWORD_MAP).forEach(([chName, item]) => {
                if (item.id === k) expandedConsumed.add(chName);
            });
        });

        return expandedConsumed;
    }, [unlockedNodeIds, unlockedArchiveIds, collectedYears]);

    useEffect(() => {
        if (isOpen) {
            setActiveCase(null);
        }
    }, [isOpen]);

    const [yearInput, setYearInput] = useState('');
    const [personInput, setPersonInput] = useState('');
    const [activeCase, setActiveCase] = useState<DetailedArchiveRecord | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isThorneBackendOpen, setIsThorneBackendOpen] = useState(false);
    const [focusedPane, setFocusedPane] = useState<'newspaper' | 'annotation' | null>(null);
    const [attachmentImage, setAttachmentImage] = useState<string | null>(null);
    const [isSelectingFolder, setIsSelectingFolder] = useState(false);
    const [showMobileDirectory, setShowMobileDirectory] = useState(false);
    const [collectionFeedback, setCollectionFeedback] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
    const [clickedClueId, setClickedClueId] = useState<string | null>(null);

    const handleClose = () => {
        // No longer buffering terminate status
        onClose();
    };

    const handleAttemptCollect = (targetClueId: string) => {
        // Try to match current attachmentImage with ATTACHMENT_REGISTRY
        const activeAttachment = Object.values(ATTACHMENT_REGISTRY).find(attr => {
            if (attr.type !== 'image' || !attachmentImage) return false;
            const contentPath = attr.content.startsWith('/') ? attr.content.slice(1) : attr.content;
            return attachmentImage.includes(contentPath);
        });

        if (activeAttachment) {
            if (activeAttachment.dossierId === targetClueId) {
                onCollectAttachment?.(activeAttachment.id);
                setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
                setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
                return;
            }
        } else {
            // Legacy fallbacks for manually mapped images
            if (attachmentImage?.includes('capone_alice_meeting') && (targetClueId === 'meeting' || targetClueId === 'project' || targetClueId === 'capone')) {
                onCollectAttachment?.('capone_alice_meeting');
                setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
                setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
                return;
            }
            if (attachmentImage?.includes('wilmer_ribbon') && targetClueId === 'project') {
                onCollectAttachment?.('wilmer_ribbon');
                setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
                setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
                return;
            }
            if (attachmentImage?.includes('creekspring_award_ceremony_1981_photo') && targetClueId === 'project') {
                onCollectAttachment?.('creekspring_award_ceremony');
                setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
                setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
                return;
            }
            if (attachmentImage?.includes('record_of_accounts') && targetClueId === 'project') {
                onCollectAttachment?.('record_of_accounts');
                setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
                setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
                return;
            }
        }

        // Default error if no match
        setCollectionFeedback({ type: 'error', msg: '归档失败：不符合当前案卷 // INVALID DOSSIER' });
        setTimeout(() => setCollectionFeedback({ type: null, msg: '' }), 2000);
    };

    const handleClueClick = (id: string) => {
        // Find if this is an attachment in the registry
        const attachment = ATTACHMENT_REGISTRY[id];
        if (attachment && attachment.type === 'image') {
            setAttachmentImage(`${import.meta.env.BASE_URL}${attachment.content.startsWith('/') ? attachment.content.slice(1) : attachment.content}`);
        } else if (id === 'view_capone_alice_meeting') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/capone_alice_meeting.jpg`);
        } else if (id === 'creekspring_award_ceremony') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/creekspring_award_ceremony_1981_photo.jpg`);
        } else if (id === 'QTC-VA-0994' || id === 'MTXXXXXXXX-93') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/john_doe_autopsy_report.png`);
        } else if (id === 'wilmer_ribbon') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/wilmer_ribbon.jpg`);
        } else if (id === 'butter_julep_evidence' || id === 'martha_diaz') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/butter_julep_evidence.jpg`);
        } else if (id === 'record_of_accounts' || id === 'arthur_dawson') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/record_of_accounts.jpg`);
        } else if (id === 'jane_doe') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/jane_doe_1977.jpg`);
        } else if (id === 'graywater_beacon') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/iron_horse_beacon.jpg`);
        } else if (id === 'fbi_symbol') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/fbi-symbol.png`);
        } else if (id === 'church_visual_residue') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/church_visual_residue.png`);
        } else if (id === 'laguna_beach_visual_residue') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/laguna_beach_visual_residue.png`);
        } else if (id === 'iron_horse_louisville') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/iron_horse_louisville.jpg`);
        } else if (id === 'iron_horse_beacon') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/iron_horse_beacon.jpg`);
        } else if (id === 'richie_id_card') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/richard_evans_id.jpg`);
        }
        
        // Trigger flash effect
        setClickedClueId(id);
        setTimeout(() => setClickedClueId(null), 1000);

        if (onCollectClue) {
            onCollectClue(id, CLUE_DISPLAY_MAP[id] || id);
        }
    };


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setErrorMsg('');
        setTimeout(() => {
            const rawYearInput = yearInput.trim();
            const rawPersonInput = personInput.trim();
            
            if (rawPersonInput.includes('马库斯') && (rawYearInput.includes('0x4C7B') || rawYearInput.includes('MT-X7'))) {
                setIsThorneBackendOpen(true);
                setIsSearching(false);
                return;
            }

            const combinedQuery = `${rawYearInput} ${rawPersonInput}`.toLowerCase();
            const uniqueKeywordIds: string[] = [];
            const usedYearIds: string[] = [];
            const usedPersonIds: string[] = [];

            // Explicitly parse 4-digit years from the input
            const yearMatchStr = combinedQuery.match(/\b(19\d{2})\b/);
            if (yearMatchStr) {
                const yearId = `year_${yearMatchStr[1]}`;
                uniqueKeywordIds.push(yearId);
                usedYearIds.push(yearId);
            }

            Object.entries(GLOBAL_KEYWORD_MAP).forEach(([alias, entry]: [string, any]) => {
                if (combinedQuery.includes(alias.toLowerCase())) {
                    uniqueKeywordIds.push(entry.id);
                    if (entry.type === 'year') {
                        if (!usedYearIds.includes(entry.id)) usedYearIds.push(entry.id);
                    } else {
                        if (!usedPersonIds.includes(entry.id)) usedPersonIds.push(entry.id);
                    }
                }
            });

            const foundArchive = ARCHIVE_DATABASE.find(record => {
                const yearMatch = uniqueKeywordIds.includes(`year_${record.triggers.year}`) || uniqueKeywordIds.includes(record.triggers.year);
                const personMatch = record.triggers.person.some(p => uniqueKeywordIds.includes(GLOBAL_KEYWORD_MAP[p]?.id || p.toLowerCase()));
                return yearMatch && personMatch;
            });

            const foundNodeEntry = Object.values(UNLOCKS_REGISTRY).find((entry: any) => entry.type === 'node' && entry.keywords?.every((kw: string) => uniqueKeywordIds.includes(kw)));

            if (foundArchive || foundNodeEntry) {
                if (foundArchive) {
                    if (!unlockedArchiveIds.includes(foundArchive.id)) onUnlockArchive(foundArchive.id);
                    setActiveCase(foundArchive);
                    setFocusedPane('newspaper');
                }
                if (foundNodeEntry && onUnlockNode) {
                    onUnlockNode(foundNodeEntry.targetId);
                    if (!foundArchive) handleClose();
                }
                setYearInput('');
                setPersonInput('');
                if (usedYearIds.length > 0 || usedPersonIds.length > 0) onConsumeKeywords(usedYearIds, usedPersonIds);
            } else {
                setErrorMsg('检索失败：未找到匹配的关联档案 (NO RECORDS FOUND)');
            }
            setIsSearching(false);
        }, 100);
    };

    const resetView = () => { setActiveCase(null); setYearInput(''); setPersonInput(''); setErrorMsg(''); setFocusedPane(null); };


    return (
        <React.Fragment>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl">
                        <div className="w-full max-w-7xl h-[85vh] flex relative border border-[#c85a3f]/30 bg-[#0a0505] rounded-lg overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] group">
                            {/* Technical Background Grid */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                                style={{ 
                                    backgroundImage: `linear-gradient(#c85a3f 1px, transparent 1px), linear-gradient(90deg, #c85a3f 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px' 
                                }} 
                            />
                            
                            {/* Decorative Corner Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c85a3f]/40 rounded-tl-lg pointer-events-none z-50"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c85a3f]/40 rounded-tr-lg pointer-events-none z-50"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c85a3f]/40 rounded-bl-lg pointer-events-none z-50"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c85a3f]/40 rounded-br-lg pointer-events-none z-50"></div>

                            {/* Subtle Ambient Glow */}
                            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#c85a3f]/5 blur-[120px] rounded-full pointer-events-none"></div>
                            <div className={`w-64 border-r border-[#c85a3f]/20 bg-[#120c0c] flex flex-col ${showMobileDirectory ? 'fixed inset-y-0 left-0 z-[150] w-[80%] max-w-[320px] md:relative md:w-64 md:flex' : 'hidden md:flex'}`}>
                                <div className="p-6 border-b border-[#c85a3f]/20">
                                    <div className="flex items-center gap-2 text-[#d89853] mb-1"><Archive size={18} /><span className="font-mono text-sm tracking-widest font-bold">档案目录</span></div>
                                    <div className="text-[10px] text-[#c85a3f]/40 font-mono uppercase">Case Directory</div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {[...unlockedArchiveIds].reverse().map(id => {
                                        const record = ARCHIVE_DATABASE.find(r => r.id === id);
                                        if (!record) return null;
                                        return (
                                            <button key={id} onClick={() => { setActiveCase(record); setFocusedPane('newspaper'); setShowMobileDirectory(false); }} className={`w-full text-left p-3 rounded border transition-all text-xs font-mono ${activeCase?.id === id ? 'bg-[#c85a3f]/20 border-[#c85a3f] text-[#d89853]' : 'bg-black/40 border-[#c85a3f]/10 text-[#c85a3f]/60'}`}>
                                                <div className="font-bold">{record.triggers.year} CASE</div>
                                                <div className="truncate opacity-80">{record.title}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                                <button onClick={resetView} className="p-5 border-t border-[#c85a3f]/20 bg-[#c85a3f]/10 text-[#d89853] font-mono text-xs tracking-widest font-bold hover:bg-[#c85a3f]/20 transition-all flex items-center justify-center gap-2">
                                    <Search size={14} /> NEW SEARCH
                                </button>
                            </div>
                            <div className="flex-1 flex flex-col relative">
                                <div className="h-16 border-b border-[#c85a3f]/20 flex justify-between items-center px-6 bg-[#0f0a0a]/90 backdrop-blur-xl absolute top-0 left-0 w-full z-40">
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setShowMobileDirectory(true)} className="md:hidden p-2 text-[#d89853]"><Menu size={20} /></button>
                                        <h2 className="font-mono text-sm md:text-lg font-bold text-[#d89853] tracking-widest flex items-center gap-2">
                                            <Archive size={18} className="text-[#c85a3f]" /> ARCHIVES
                                        </h2>
                                    </div>
                                    <button onClick={handleClose} className="p-2 text-[#c85a3f] hover:rotate-90 transition-all"><X size={24} /></button>
                                </div>
                                <div className="flex-1 overflow-hidden pt-16">
                                    <AnimatePresence mode="wait">
                                        {!activeCase ? (
                                            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-start p-8 pt-8 pb-8 overflow-y-auto custom-scrollbar">
                                                <div className="max-w-md w-full space-y-6">
                                                    <div className="text-center space-y-4">
                                                        <div className="relative inline-block">
                                                            <ShieldAlert size={56} className="text-[#c85a3f] relative z-10 filter drop-shadow-[0_0_15px_rgba(200,90,63,0.4)]" />
                                                            <div className="absolute inset-0 bg-[#c85a3f]/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                                                        </div>
                                                        <h3 className="text-[#d89853] font-mono text-2xl font-black tracking-[0.3em] uppercase" style={{ textShadow: '0 0 20px rgba(216,152,83,0.3)' }}>
                                                            验证协议 // SECURITY
                                                        </h3>
                                                        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#c85a3f]/40 to-transparent"></div>
                                                    </div>
                                                    
                                                    <form onSubmit={handleSearch} className="space-y-5">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="text-[9px] text-[#c85a3f]/60 font-mono uppercase tracking-widest mb-1 block">Time Index</label>
                                                                <div className="relative group/field">
                                                                    <input 
                                                                        type="text" 
                                                                        value={yearInput} 
                                                                        onChange={e => setYearInput(e.target.value)} 
                                                                        className="w-full bg-black/60 border border-[#c85a3f]/30 text-[#d89853] py-2.5 px-4 font-serif font-medium focus:border-[#d89853] outline-none text-center text-2xl tracking-[0.1em] transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] focus:shadow-[0_0_20px_rgba(200,90,63,0.1),inset_0_2px_10px_rgba(0,0,0,0.8)] rounded" 
                                                                    />
                                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d89853] group-focus-within/field:w-full transition-all duration-500"></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className="text-[9px] text-[#c85a3f]/60 font-mono uppercase tracking-widest mb-1 block">Subject Code</label>
                                                                <div className="relative group/field">
                                                                    <input 
                                                                        type="text" 
                                                                        value={personInput} 
                                                                        onChange={e => setPersonInput(e.target.value)} 
                                                                        className="w-full bg-black/60 border border-[#c85a3f]/30 text-[#d89853] py-2.5 px-4 font-serif font-medium focus:border-[#d89853] outline-none text-center text-lg tracking-widest transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] focus:shadow-[0_0_20px_rgba(200,90,63,0.1),inset_0_2px_10px_rgba(0,0,0,0.8)] rounded" 
                                                                    />
                                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d89853] group-focus-within/field:w-full transition-all duration-500"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {errorMsg && <div className="text-red-500/80 text-[10px] text-center font-mono">{errorMsg}</div>}
                                                        
                                                        <div className="relative group">
                                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#c85a3f]/0 via-[#c85a3f]/20 to-[#c85a3f]/0 rounded blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                                            <button 
                                                                type="submit" 
                                                                disabled={isSearching} 
                                                                className="w-full relative bg-gradient-to-r from-[#c85a3f] to-[#a04632] hover:from-[#d86b4f] hover:to-[#b8533b] text-white py-5 rounded font-mono font-black tracking-[0.3em] transition-all disabled:opacity-50 overflow-hidden group shadow-[0_4px_15px_rgba(0,0,0,0.4)] active:scale-[0.98] flex items-center justify-center gap-4"
                                                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                                                            >
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                                                {isSearching ? <span className="animate-pulse relative z-10">VERIFYING...</span> : (
                                                                    <div className="relative z-10 flex items-center justify-center gap-4">
                                                                        <span>调取档案 / RETRIEVE</span>
                                                                        <Search size={20} className="text-white/70" />
                                                                    </div>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </form>
                                                    
                                                    {/* Original Style Keyword Hints */}
                                                    <div className="space-y-4 pt-6 border-t border-[#c85a3f]/10 mt-8">
                                                        <div className="text-[10px] text-[#c85a3f]/40 font-mono uppercase tracking-widest text-center">关键词参考 // KEYWORD HINTS</div>
                                                        <div className="flex flex-wrap justify-center gap-2">
                                                            {Array.from(new Set([...(collectedYears || []), ...(unlockedPeople || [])])).filter(id => {
                                                                // 唯一逻辑：被收集了 + 还没被使用 = 显示
                                                                if (consumedKeywords.has(id)) return false;

                                                                // 彻底拦截所有可能作为身份核心词的中文、英文、拼音名
                                                                const identityBlocklist = ['father', 'mother', 'silas', 'conchar', 'robert', 'capone', 'vanessa', '父亲', '母亲', '赛勒斯', '康查尔', '罗伯特', '罗伯特·卡彭', '瓦妮莎'];
                                                                if (identityBlocklist.includes(id)) return false;

                                                                const isYear = id.startsWith('year_') || !isNaN(Number(id));
                                                                if (isYear) return true;

                                                                const meta = KEYWORD_REGISTRY[id];
                                                                if (!meta) {
                                                                    const mapped = GLOBAL_KEYWORD_MAP[id];
                                                                    if (mapped) {
                                                                        const standardMeta = KEYWORD_REGISTRY[mapped.id];
                                                                        if (standardMeta && standardMeta.isIdentity) return false;
                                                                    } else {
                                                                        // 没有注册的关键词（或者是未知垃圾），不予在检索提示框中显示
                                                                        return false;
                                                                    }
                                                                } else if (meta.isIdentity) {
                                                                    return false;
                                                                }
                                                                return true;
                                                            }).map(id => {
                                                                let label = CLUE_DISPLAY_MAP[id] || id;
                                                                if (id.startsWith('year_')) label = id.replace('year_', '');
                                                                const isYear = id.startsWith('year_') || !isNaN(Number(id));

                                                                return (
                                                                    <button
                                                                        key={id}
                                                                        onClick={() => isYear ? setYearInput(label) : setPersonInput(label)}
                                                                        className="px-2 py-1 bg-[#c85a3f]/10 border border-[#c85a3f]/20 text-[#d89853]/60 text-[10px] font-mono hover:bg-[#c85a3f]/20 hover:text-[#d89853] transition-all"
                                                                    >
                                                                        {label}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col relative bg-black overflow-hidden">
                                                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col md:flex-row bg-[#121212] relative overflow-hidden">
                                                    {(() => {
                                                        const activeKeywords = [
                                                            ...(ARCHIVE_CASE_HIGHLIGHT_MAP[activeCase.id] || []),
                                                            ...(activeCase.revealed || []).flatMap(id => Object.keys(GLOBAL_KEYWORD_MAP).filter(key => GLOBAL_KEYWORD_MAP[key].id === id))
                                                        ];
                                                        const patternStr = [...activeKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].filter(Boolean).sort((a, b) => b.length - a.length).join('|');
                                                        const docRegex = new RegExp(`(${patternStr})`, 'g');

                                                        return (
                                                            <React.Fragment>
                                                                {/* Newspaper View */}
                                                                <div className={`relative transition-all duration-700 ease-in-out cursor-pointer h-full overflow-hidden ${focusedPane === 'newspaper' ? 'flex-[1] md:flex-[3]' : focusedPane === null ? 'flex-1' : 'hidden md:flex md:flex-1 md:opacity-60 md:hover:opacity-100'} border-r border-[#c85a3f]/10 group/news`} onClick={() => setFocusedPane(focusedPane === 'newspaper' ? null : 'newspaper')}>
                                                                    <style>{`
                                                                        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Special+Elite&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap');
                                                                        .analog-grain {
                                                                            filter: url(#grainy);
                                                                        }
                                                                    `}</style>
                                                                    <svg className="hidden">
                                                                        <filter id="grainy">
                                                                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                                                                            <feColorMatrix type="saturate" values="0" />
                                                                            <feComponentTransfer>
                                                                                <feFuncR type="linear" slope="0.03" />
                                                                                <feFuncG type="linear" slope="0.03" />
                                                                                <feFuncB type="linear" slope="0.03" />
                                                                            </feComponentTransfer>
                                                                            <feBlend in="SourceGraphic" mode="multiply" />
                                                                        </filter>
                                                                    </svg>
                                                                    
                                                                    {/* Vertical Label for folded state */}
                                                                    {focusedPane === 'annotation' && (
                                                                        <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-50">
                                                                            <div className="flex flex-col items-center gap-4 transition-all duration-500 group-hover/news:scale-110">
                                                                                <span className="text-[#c85a3f]/40 font-black tracking-[0.5em] uppercase text-xs group-hover/news:text-[#c85a3f]/80" style={{ writingMode: 'vertical-rl' }}>
                                                                                    新闻剪报
                                                                                </span>
                                                                                <span className="text-[#c85a3f]/30 font-mono text-[10px] tracking-widest uppercase group-hover/news:text-[#c85a3f]/60 animate-pulse" style={{ writingMode: 'vertical-rl' }}>
                                                                                    [ 点击展开 ]
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                        <div className="h-full relative overflow-hidden" 
                                                                            style={{ 
                                                                                backgroundColor: '#dcd2c3',
                                                                                backgroundImage: `
                                                                                    radial-gradient(circle at 50% 35%, #f5eadd 0%, #dcd2c3 50%, #9e8a75 100%),
                                                                                    url('https://www.transparenttextures.com/patterns/old-map.png')
                                                                                `,
                                                                                backgroundBlendMode: 'multiply',
                                                                                filter: 'sepia(0.2) saturate(1.1) contrast(1.05) brightness(0.95)'
                                                                            }}
                                                                        >
                                                                        {/* Heavy Texture Layers */}
                                                                        <div className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/pulp.png')]"></div>
                                                                        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]"></div>
                                                                        <div className="absolute inset-0 analog-grain pointer-events-none opacity-40"></div>

                                                                        {/* Intense Vignette Overlay */}
                                                                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] z-20"></div>

                                                                        {focusedPane === 'newspaper' && (
                                                                            <button 
                                                                                onClick={(e) => { e.stopPropagation(); setFocusedPane(null); }}
                                                                                className="md:hidden absolute top-4 right-4 z-50 p-3 bg-black/80 text-white rounded-full border border-white/20 shadow-xl"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                                            </button>
                                                                        )}

                                                                        <div className="h-full overflow-y-auto relative z-0 scrollbar-thin scrollbar-thumb-neutral-300 custom-scrollbar">
                                                                            <div className="p-8 md:p-16 max-w-2xl mx-auto relative" style={{ filter: 'contrast(1.2) brightness(0.92)' }}>
                                                                                <div className="border-b-[6px] border-black/95 mb-12 pb-8 text-center relative">
                                                                                    <div className="absolute -top-5 left-0 right-0 h-[4px] bg-black/80"></div>
                                                                                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 relative italic"
                                                                                        style={{
                                                                                            fontFamily: "'Playfair Display', serif",
                                                                                            filter: 'blur(0.4px) contrast(1.4) opacity(0.9)',
                                                                                            color: 'rgba(0, 0, 0, 0.95)',
                                                                                            letterSpacing: '-0.02em',
                                                                                            mixBlendMode: 'multiply',
                                                                                            transform: 'scaleY(1.05)'
                                                                                        }}
                                                                                    >
                                                                                        {activeCase.newspaper.source}
                                                                                    </h2>
                                                                                    <div className="flex justify-between items-center border-t-[3px] border-black/95 pt-5 text-sm md:text-base font-black uppercase tracking-widest font-serif italic">
                                                                                        <span className="text-black drop-shadow-sm">{activeCase.newspaper.date}</span>
                                                                                        <div className="flex flex-col items-center">
                                                                                            <span className="text-[10px] text-black font-black uppercase tracking-[0.4em]">档案编号 // ARCHIVE RECORD</span>
                                                                                        </div>
                                                                                        <span className="text-black drop-shadow-sm hidden md:inline">绝密件 // CLASSIFIED</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="space-y-10">
                                                                                    <h1 className="text-3xl md:text-5xl font-black leading-[1.1] mb-12 font-serif italic"
                                                                                        style={{
                                                                                            fontFamily: "'Playfair Display', serif",
                                                                                            color: 'rgba(5, 5, 5, 0.95)',
                                                                                            filter: 'blur(0.35px) contrast(1.6)',
                                                                                            letterSpacing: '-0.01em',
                                                                                            mixBlendMode: 'multiply'
                                                                                        }}
                                                                                    >
                                                                                        {activeCase.newspaper.title || activeCase.newspaper.headline}
                                                                                    </h1>
                                                                                    
                                                                                    <div className="columns-1 md:columns-2 gap-12 text-[15px] md:text-[17px] leading-[1.85] text-justify space-y-10 font-serif"
                                                                                        style={{
                                                                                            fontFamily: "'Old Standard TT', serif",
                                                                                            color: 'rgba(15, 15, 15, 0.98)',
                                                                                            filter: 'blur(0.3px) contrast(1.3)',
                                                                                            opacity: 0.98
                                                                                        }}
                                                                                    >
                                                                                        {(() => {
                                                                                            const highlightedKeywords = new Set<string>();
                                                                                            const content = activeCase.newspaper.content;
                                                                                            const rawParagraphs = Array.isArray(content) ? content : (typeof content === 'string' ? content.split('\n\n') : []);
                                                                                            const cleanParagraphs = rawParagraphs.filter(p => {
                                                                                                const s = p.trim().toLowerCase();
                                                                                                return !s.startsWith('source:') && !s.startsWith('date:') && !s.startsWith('headline:') && !s.startsWith('title:');
                                                                                            });

                                                                                            return cleanParagraphs.map((para, i) => (
                                                                                                <p key={i} className={`mb-10 break-words relative ${i === 0 ? 'first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-5 first-letter:mt-3 first-letter:text-black first-letter:leading-none' : ''}`}>
                                                                                                    {para.split(docRegex).map((part, j) => {
                                                                                                        if (!part) return null;
                                                                                                        let displayText = part;
                                                                                                        let forceClueId = null;
                                                                                                        const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
                                                                                                        if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
                                                                                                        else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
                                                                                                        
                                                                                                        const keywordData = GLOBAL_KEYWORD_MAP[displayText];
                                                                                                        const isRevealed = forceClueId || (keywordData && activeCase.revealed?.includes(keywordData.id));
                                                                                                        
                                                                                                        if (isRevealed) {
                                                                                                            const clueId = forceClueId || keywordData.id;
                                                                                                            if (!highlightedKeywords.has(clueId)) {
                                                                                                                highlightedKeywords.add(clueId);
                                                                                                                return (
                                                                                                                    <motion.span key={j} 
                                                                                                                        className="cursor-pointer font-black inline-block text-[#c85a3f] border-b-[4px] border-[#c85a3f] animate-pulse px-1 mx-0.5 relative" 
                                                                                                                        animate={clickedClueId === clueId ? {
                                                                                                                            scale: [1, 1.4, 0.95, 1.1, 1],
                                                                                                                            color: ['#c85a3f', '#ffffff', '#fbbf24', '#c85a3f'],
                                                                                                                            backgroundColor: ['rgba(200, 90, 63, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(251, 191, 36, 0.4)', 'rgba(200, 90, 63, 0)'],
                                                                                                                            textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 20px rgba(255,255,255,1)', '0 0 10px rgba(251,191,36,0.8)', '0 0 0px rgba(0,0,0,0)'],
                                                                                                                        } : {}}
                                                                                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                                                                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(200, 90, 63, 0.25)' }}
                                                                                                                        whileTap={{ scale: 0.8, opacity: 0.5 }}
                                                                                                                        onClick={e => { e.stopPropagation(); handleClueClick(clueId); }}
                                                                                                                    >
                                                                                                                        {displayText}
                                                                                                                        {clickedClueId === clueId && (
                                                                                                                            <motion.span 
                                                                                                                                initial={{ opacity: 1, scale: 0.5 }}
                                                                                                                                animate={{ opacity: 0, scale: 2.5 }}
                                                                                                                                className="absolute inset-0 bg-white rounded-sm z-10"
                                                                                                                            />
                                                                                                                        )}
                                                                                                                    </motion.span>
                                                                                                                );
                                                                                                            }
                                                                                                        }
                                                                                                        return <span key={j}>{part.startsWith('「') && part.endsWith('」') ? `「${displayText}」` : displayText}</span>;
                                                                                                    })}
                                                                                                </p>
                                                                                            ));
                                                                                        })()}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="absolute top-8 right-8 bg-black/90 text-[#d4a261] text-xs px-4 py-1.5 uppercase tracking-[0.4em] font-black pointer-events-none backdrop-blur-[8px] border-2 border-[#d4a261]/30 w-fit whitespace-nowrap z-30 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform rotate-1">
                                                                            EVIDENCE TYPE: PRESS CLIPPING
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={`relative transition-all duration-700 ease-in-out cursor-pointer h-full overflow-hidden ${focusedPane === 'annotation' ? 'flex-[1] md:flex-[2.5]' : focusedPane === null ? 'flex-1' : 'hidden md:flex md:flex-1 md:opacity-60 md:hover:opacity-100'} bg-[#0a0505] group/notes`} onClick={() => setFocusedPane(focusedPane === 'annotation' ? null : 'annotation')}>
                                                                    {focusedPane === 'newspaper' && (
                                                                        <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-50">
                                                                            <div className="flex flex-col items-center gap-4 transition-all duration-500 group-hover/notes:scale-110">
                                                                                <span className="text-[#c85a3f]/40 font-black tracking-[0.5em] uppercase text-xs group-hover/notes:text-[#c85a3f]/80" style={{ writingMode: 'vertical-rl' }}>
                                                                                    Internal Notes
                                                                                </span>
                                                                                <span className="text-[#c85a3f]/30 font-mono text-[10px] tracking-widest uppercase group-hover/notes:text-[#c85a3f]/60 animate-pulse" style={{ writingMode: 'vertical-rl' }}>
                                                                                    [ 点击展开 ]
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    <div className="h-full overflow-y-auto p-8 md:p-12 relative custom-scrollbar">
                                                                        <div className="absolute inset-0 analog-grain pointer-events-none opacity-30 z-10"></div>
                                                                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.4)] z-20"></div>

                                                                        {focusedPane === 'annotation' && (
                                                                            <button 
                                                                                onClick={(e) => { e.stopPropagation(); setFocusedPane(null); }}
                                                                                className="md:hidden absolute top-4 right-4 z-50 p-3 bg-[#c85a3f]/80 text-[#0f0a0a] rounded-full border border-[#c85a3f]/20 shadow-xl"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                                            </button>
                                                                        )}

                                                                        {activeCase.annotation.stamp === 'REJECTED' && (
                                                                            <div className="absolute top-[20%] right-[10%] z-30 pointer-events-none">
                                                                                <motion.div 
                                                                                    initial={{ scale: 1.5, opacity: 0 }}
                                                                                    animate={{ scale: 1, opacity: 0.8 }}
                                                                                    className="border-[6px] border-red-700/70 px-8 py-3 rounded text-red-700/70 font-black text-4xl tracking-[0.3em] transform rotate-[-25deg] uppercase mix-blend-multiply flex flex-col items-center"
                                                                                    style={{ filter: 'blur(0.4px) contrast(1.5)' }}
                                                                                >
                                                                                    <span>Rejected</span>
                                                                                    <div className="w-full h-1.5 bg-red-700/40 mt-2" />
                                                                                    <span className="text-red-700/70 font-mono text-xs tracking-[0.4em] mt-1 uppercase text-center font-black">
                                                                                        Access Denied
                                                                                    </span>
                                                                                </motion.div>
                                                                            </div>
                                                                        )}

                                                                        <div className="max-w-xl mx-auto space-y-8 relative z-10">
                                                                            <div className="border-2 border-[#c85a3f]/20 p-10 rounded-sm bg-[#c85a3f]/5 backdrop-blur-md relative overflow-hidden shadow-2xl">
                                                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c85a3f]/40" />
                                                                                
                                                                                {/* Clipping 20 Special Red Stamp */}
                                                                                {activeCase.id === 'clipping_20' && (
                                                                                    <motion.div 
                                                                                        initial={{ scale: 2, opacity: 0, rotate: 20 }}
                                                                                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                                                                                        transition={{ delay: 1, type: "spring" }}
                                                                                        className="absolute top-24 right-12 border-4 border-red-700/60 p-2 mix-blend-multiply pointer-events-none select-none z-50 transform"
                                                                                    >
                                                                                        <div className="border-2 border-red-700/40 px-4 py-2 text-red-800/90 font-black text-center leading-none tracking-tighter">
                                                                                            <div className="text-xl uppercase mb-1">REJECTED</div>
                                                                                            <div className="text-[10px] uppercase opacity-80 mb-1 tracking-widest border-t border-red-700/20 pt-1">未通过</div>
                                                                                            <div className="text-[8px] uppercase tracking-normal">Transfer to KLUB Classified Archives</div>
                                                                                            <div className="text-[10px] uppercase font-serif mt-1">转移至 KLUB 机密档案</div>
                                                                                        </div>
                                                                                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pulp.png')]"></div>
                                                                                    </motion.div>
                                                                                )}
                                                                                
                                                                                <div className="flex justify-between items-start mb-10 border-b-2 border-[#c85a3f]/10 pb-6">
                                                                                    <div>
                                                                                        <div className="text-[10px] text-[#c85a3f]/50 uppercase tracking-[0.3em] mb-1 font-black">Bureau Investigation File</div>
                                                                                        <div className="text-2xl font-mono font-black text-[#d89853] tracking-tighter" style={{ filter: 'blur(0.3px)' }}>{activeCase.annotation.fileId}</div>
                                                                                    </div>
                                                                                    <div className="text-right">
                                                                                        <div className="text-[10px] text-[#c85a3f]/50 uppercase tracking-[0.3em] mb-1 font-black">Classification</div>
                                                                                        <div className="text-red-600 font-black border-2 border-red-600/40 px-3 py-1 text-sm bg-red-600/5 tracking-[0.2em] uppercase transform -rotate-1">{activeCase.annotation.level}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="font-mono text-[#d89853]/90 space-y-8">
                                                                                    <div className="grid grid-cols-2 gap-6 text-xs uppercase tracking-widest font-black">
                                                                                        <div><span className="block text-[#c85a3f]/30 text-[9px] mb-1">Marked Date</span>{activeCase.annotation.date}</div>
                                                                                        <div>
                                                                                            <span className="block text-[#c85a3f]/30 text-[9px] mb-1">
                                                                                                {activeCase.annotation.template === 'ALTERMAN' ? 'Authorized By' : activeCase.annotation.template === 'THORNE' ? 'Validated By' : 'Verified By'}
                                                                                            </span>
                                                                                            {activeCase.annotation.author}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="pt-8 border-t border-[#c85a3f]/10 space-y-6">
                                                                                        {(() => {
                                                                                            const highlightedKeywords = new Set<string>();
                                                                                            const content = activeCase.annotation.content;
                                                                                            const rawLines = Array.isArray(content) ? content : (typeof content === 'string' ? content.split('\n') : []);
                                                                                            const cleanLines = rawLines.filter(line => {
                                                                                                const s = line.trim().toLowerCase();
                                                                                                return !s.startsWith('file:') && !s.startsWith('date:') && !s.startsWith('level:') && !s.startsWith('author:');
                                                                                            });

                                                                                            return cleanLines.filter(line => line.trim()).map((line, i) => {
                                                                                                // 1. Check for Red Stamp Marker
                                                                                                if (line.includes('[红色印章：未通过 / 转移至KLUB机密档案]')) {
                                                                                                    return (
                                                                                                        <div key={`stamp-${i}`} className="relative h-28 my-10 flex justify-center">
                                                                                                            <motion.div
                                                                                                                initial={{ scale: 2.5, opacity: 0, rotate: -25 }}
                                                                                                                animate={{ scale: 1, opacity: 1, rotate: -8 }}
                                                                                                                className="px-6 py-2 border-[5px] border-red-700/70 text-red-700/70 font-black text-xl tracking-tighter mix-blend-multiply flex flex-col items-center justify-center bg-red-50/5 shadow-[inset_0_0_15px_rgba(185,28,28,0.1)] rounded-sm"
                                                                                                                style={{ 
                                                                                                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                                                                                                    filter: 'blur(0.25px) contrast(1.3)'
                                                                                                                }}
                                                                                                            >
                                                                                                                <span className="text-[10px] leading-tight opacity-90 font-mono tracking-widest">REJECTED / ACTION DENIED</span>
                                                                                                                <span className="leading-none border-y-2 border-red-700/50 py-1 my-1 px-4">未通过 / 转移至KLUB机密档案</span>
                                                                                                                <span className="text-[9px] font-mono opacity-80 uppercase tracking-[0.3em]">Bureau Level Override // KLUB-PROJECT</span>
                                                                                                            </motion.div>
                                                                                                        </div>
                                                                                                    );
                                                                                                }

                                                                                                // 2. Check for Signature Marker
                                                                                                if (line.includes('[手写签名：Dr. Reggie]')) {
                                                                                                    return (
                                                                                                        <div key={`sig-${i}`} className="flex justify-end pr-10 my-8">
                                                                                                            <div className="relative text-red-900/60 transform rotate-1 mix-blend-multiply opacity-90 transition-opacity">
                                                                                                                <svg width="150" height="70" viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.35px)' }}>
                                                                                                                    <path d="M30 50 C 30 50, 25 15, 45 10 C 60 5, 70 20, 55 35 C 40 50, 30 35, 50 30 C 70 25, 90 50, 100 45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                                    <path d="M 25 55 L 105 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                                                                                                                </svg>
                                                                                                                <div className="text-[10px] text-[#c85a3f]/60 font-mono text-center mt-1 tracking-[0.4em] uppercase font-black">Authorized: Dr. Reggie</div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    );
                                                                                                }

                                                                                                return (
                                                                                                    <p key={i} 
                                                                                                        className={`leading-relaxed relative text-sm md:text-base ${line.includes('后人手写批注') ? 'font-handwriting text-[#c85a3f] text-2xl rotate-[-2deg] py-8 px-6 bg-[#c85a3f]/5 border-l-4 border-[#c85a3f] shadow-2xl my-12' : 'font-mono'}`}
                                                                                                        style={{ 
                                                                                                            fontFamily: line.includes('后人手写批注') ? undefined : "'Special Elite', 'Courier New', monospace",
                                                                                                            filter: line.includes('后人手写批注') ? 'blur(0.4px)' : 'blur(0.25px) contrast(1.1)',
                                                                                                            opacity: 0.95
                                                                                                        }}
                                                                                                    >
                                                                                                        {line.includes('后人手写批注') && <span className="absolute -top-5 left-4 text-[10px] uppercase tracking-[0.2em] font-black opacity-60">Addendum Observed</span>}
                                                                                                        {line.split(docRegex).map((part, j) => {
                                                                                                            if (!part) return null;
                                                                                                            let displayText = part;
                                                                                                            let forceClueId = null;
                                                                                                            const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
                                                                                                            if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
                                                                                                            else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
                                                                                                            
                                                                                                            const keywordData = GLOBAL_KEYWORD_MAP[displayText];
                                                                                                            const isRevealed = forceClueId || (keywordData && activeCase.revealed?.includes(keywordData.id));
                                                                                                            
                                                                                                            if (isRevealed) {
                                                                                                                const clueId = forceClueId || keywordData.id;
                                                                                                                if (!highlightedKeywords.has(clueId)) {
                                                                                                                    highlightedKeywords.add(clueId);
                                                                                                                    return (
                                                                                                                        <motion.span key={j} 
                                                                                                                            className="cursor-pointer font-black border-b-[3px] text-[#c85a3f] border-[#c85a3f] animate-pulse px-1 mx-0.5 relative" 
                                                                                                                            animate={clickedClueId === clueId ? {
                                                                                                                                scale: [1, 1.4, 0.95, 1.1, 1],
                                                                                                                                color: ['#c85a3f', '#ffffff', '#fbbf24', '#c85a3f'],
                                                                                                                                backgroundColor: ['rgba(200, 90, 63, 0)', 'rgba(255, 255, 255, 0.8)', 'rgba(251, 191, 36, 0.4)', 'rgba(200, 90, 63, 0)'],
                                                                                                                                textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 20px rgba(255,255,255,1)', '0 0 10px rgba(251,191,36,0.8)', '0 0 0px rgba(0,0,0,0)'],
                                                                                                                            } : {}}
                                                                                                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                                                                                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(200, 90, 63, 0.3)' }}
                                                                                                                            whileTap={{ scale: 0.8, opacity: 0.5 }}
                                                                                                                            onClick={e => { e.stopPropagation(); handleClueClick(clueId); }}
                                                                                                                        >
                                                                                                                            {displayText}
                                                                                                                            {clickedClueId === clueId && (
                                                                                                                                <motion.span 
                                                                                                                                    initial={{ opacity: 1, scale: 0.5 }}
                                                                                                                                    animate={{ opacity: 0, scale: 2.5 }}
                                                                                                                                    className="absolute inset-0 bg-white rounded-sm z-10"
                                                                                                                                />
                                                                                                                            )}
                                                                                                                        </motion.span>
                                                                                                                    );
                                                                                                                }
                                                                                                            }
                                                                                                            return <span key={j}>{displayText}</span>;
                                                                                                        })}
                                                                                                    </p>
                                                                                                );
                                                                                            });
                                                                                        })()}
                                                                                    </div>
                                                                                </div>

                                                                                {/* Handwritten SVG Signatures */}
                                                                                <div className="mt-12 flex justify-end pr-10">
                                                                                    {activeCase.annotation.template === 'ALTERMAN' ? (
                                                                                        <div className="relative text-blue-900/60 transform -rotate-6 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="160" height="80" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M20 25 L 20 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                                                                <path d="M30 50 L 40 25 L 50 50 M35 40 L 45 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                <path d="M 15 55 L 125 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-[#475569]/60 font-mono text-center mt-1 tracking-[0.4em] uppercase font-black">Authorized</div>
                                                                                        </div>
                                                                                    ) : activeCase.annotation.template === 'THORNE' ? (
                                                                                        <div className="relative text-emerald-900/60 transform rotate-2 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="170" height="80" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M25 50 L 25 25 L 40 40 L 55 25 L 55 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                <path d="M65 25 L 95 25 M 80 25 L 80 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-emerald-800/50 font-mono text-center mt-1 tracking-[0.3em] uppercase font-black border-t border-emerald-800/20 pt-1">Forensic Chief</div>
                                                                                        </div>
                                                                                    ) : activeCase.annotation.template === 'BAKER' ? (
                                                                                        <div className="relative text-orange-900/60 transform rotate-1 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="160" height="80" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M30 25 L 30 50 M 30 37 L 50 37 M 50 25 L 50 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                                                                <path d="M70 50 L 70 25 C 70 25, 95 25, 95 37 C 95 50, 70 50, 70 50 M 70 37 L 90 37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-orange-800/50 font-mono text-center mt-1 tracking-[0.3em] uppercase font-black">Behavioral Analyst</div>
                                                                                        </div>
                                                                                    ) : activeCase.annotation.template === 'HAWKE' ? (
                                                                                        <div className="relative text-purple-900/60 transform -rotate-2 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="160" height="80" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M25 20 L 25 55 M 50 20 L 50 55 M 25 38 L 50 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                                                                                <path d="M 70 55 L 85 20 L 100 55 M 75 45 L 95 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-purple-800/50 font-mono text-center mt-1 tracking-[0.3em] uppercase font-black border-t border-purple-800/20 pt-1">Cold Case Unit</div>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="relative text-red-900/70 transform -rotate-12 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="140" height="90" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M30 60 C 30 60, 25 20, 45 15 C 60 10, 70 25, 55 40 C 40 55, 30 40, 50 35 C 70 30, 90 60, 100 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M 25 65 L 105 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-[#c85a3f]/50 font-mono text-center mt-1 tracking-[0.3em] uppercase font-black">Authorized: Dr. Reggie</div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="absolute bottom-6 right-6 bg-[#c85a3f]/10 text-[#c85a3f]/50 text-[10px] px-3 py-1 uppercase tracking-[0.5em] font-black pointer-events-none border border-[#c85a3f]/30 font-mono backdrop-blur-sm z-30 shadow-2xl">INTERNAL MEMO // TOP SECRET</div>
                                                                </div>
                                                        </React.Fragment>
                                                        );
                                                    })()}
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
                    {/* Attachment Image Modal */}
                    <AnimatePresence>
                        {attachmentImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    setAttachmentImage(null);
                                    setIsSelectingFolder(false);
                                    setCollectionFeedback({ type: null, msg: '' });
                                }}
                                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-default"
                            >
                                <div className="relative w-full max-w-4xl flex flex-col items-center" onClick={e => e.stopPropagation()}>
                                    
                                    <button 
                                        onClick={() => {
                                            setAttachmentImage(null);
                                            setIsSelectingFolder(false);
                                            setCollectionFeedback({ type: null, msg: '' });
                                        }}
                                        className="absolute -top-12 right-0 p-2 text-[#c85a3f] hover:rotate-90 hover:text-white transition-all z-[210] bg-black/50 rounded-full"
                                    >
                                        <X size={28} />
                                    </button>

                                    <div className="relative mb-8 mt-12">
                                        <motion.img
                                            initial={{ scale: 0.9, rotate: -2 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.9, rotate: 2 }}
                                            src={attachmentImage}
                                            alt="FBI Attachment"
                                            className={`
                                                max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all
                                                ${attachmentImage.includes('wilmer_ribbon')
                                                    ? 'p-0 bg-transparent transform rotate-2 scale-110' // Clean style
                                                    : 'border-8 border-white p-4 bg-white transform rotate-1' // Legacy Polaroid style
                                                }
                                            `}
                                        />

                                        {attachmentImage.includes('jane_doe_1977') && (
                                            <div className="mt-4 max-w-xl text-center text-xs font-mono text-[#d89853]/90 bg-black/80 border border-[#d89853]/30 p-3 rounded leading-relaxed shadow-2xl mx-auto">
                                                <span className="text-[#c85a3f] font-bold block mb-1">【图片附注】</span>
                                                面部影像处理工作仍在进行，当前清晰度不足以生成正面画像。鉴于该名无名氏背部呈现极其明显的陈旧性疤痕，已提请专案组将此作为拘捕特征进行跨州发布。
                                            </div>
                                        )}

                                        {collectionFeedback.msg && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded border backdrop-blur-md shadow-2xl font-mono font-bold tracking-widest text-sm z-50
                                                    ${collectionFeedback.type === 'success' ? 'bg-green-900/90 border-green-500 text-green-100' : 'bg-red-900/90 border-red-500 text-red-100'}
                                                `}
                                            >
                                                {collectionFeedback.msg}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Interaction Area */}
                                    <div className="w-full max-w-lg">
                                        {!isSelectingFolder ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setIsSelectingFolder(true)}
                                                    className="bg-[#c85a3f] text-white px-8 py-3 rounded-full font-mono font-bold tracking-[0.2em] flex items-center gap-3 hover:bg-[#d89853] transition-all shadow-[0_0_20px_rgba(200,90,63,0.4)] hover:scale-105 active:scale-95"
                                                >
                                                    <FolderOpen size={18} />
                                                    COLLECT EVIDENCE
                                                </button>
                                                <span className="text-[10px] text-[#d89853]/60 font-mono tracking-widest uppercase">
                                                    Identify applicable case file
                                                </span>
                                            </div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-[#0f0a0a] border border-[#d89853]/30 rounded-lg p-6 shadow-2xl relative"
                                            >
                                                <div className="text-center mb-4">
                                                    <h4 className="text-[#d89853] font-mono tracking-widest text-sm font-bold">SELECT TARGET CASE FILE</h4>
                                                    <p className="text-[#d89853]/40 text-[10px] uppercase">Where does this evidence belong?</p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[30vh] overflow-y-auto custom-scrollbar p-1">
                                                    {collectedDossierIds.map(clueId => (
                                                        <button
                                                            key={clueId}
                                                            onClick={() => handleAttemptCollect(clueId)}
                                                            className="text-[10px] font-mono border border-[#d89853]/20 bg-[#d89853]/5 text-[#d89853]/80 p-2 rounded hover:bg-[#d89853]/20 hover:text-[#d89853] hover:border-[#d89853]/50 transition-all truncate text-left flex items-center gap-2"
                                                        >
                                                            <Archive size={12} className="shrink-0" />
                                                            <span className="truncate">{CLUE_DISPLAY_MAP[clueId] || clueId}</span>
                                                        </button>
                                                    ))}
                                                    {collectedDossierIds.length === 0 && (
                                                        <div className="col-span-3 text-center text-[#d89853]/30 text-xs py-4">
                                                            NO OPEN FILES AVAILABLE
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setIsSelectingFolder(false);
                                                        setCollectionFeedback({ type: null, msg: '' });
                                                    }}
                                                    className="absolute top-2 right-2 text-[#d89853]/40 hover:text-[#d89853]"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
            {isThorneBackendOpen && <ThorneBackend onClose={() => {
                setIsThorneBackendOpen(false);
                // No longer buffering terminate status
            }} onTerminateExperiment={(type) => {
                onTerminateExperiment?.(type);
            }} />}
        </React.Fragment>
    );
};
