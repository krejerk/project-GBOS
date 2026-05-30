
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
    onTerminateExperiment?: () => void;
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
            if (keywords) keywords.forEach(k => consumed.add(k));
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
                    if (CATEGORY_IDS.YEARS.includes(k)) {
                        yearConsumedCount[k] = (yearConsumedCount[k] || 0) + 1;
                    } else {
                        consumed.add(k);
                    }
                });
            }
        });
        Object.keys(yearConsumedCount).forEach(y => {
            if (yearConsumedCount[y] >= (yearCollectedCount[y] || 0)) {
                consumed.add(y);
            }
        });
        return consumed;
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

    const handleAttemptCollect = (targetClueId: string) => {
        if (attachmentImage?.includes('butter_julep_evidence') && targetClueId === 'julip') {
            onCollectAttachment?.('butter_julep_evidence');
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
            return;
        }
        if (attachmentImage?.includes('capone_alice_meeting') && (targetClueId === 'meeting' || targetClueId === 'project' || targetClueId === 'capone')) {
            onCollectAttachment?.('view_capone_alice_meeting');
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
            onCollectAttachment?.('creekspring_award_ceremony_1981_photo');
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
            return;
        }
        if (attachmentImage?.includes('fbi-symbol') && (targetClueId === 'project' || targetClueId === 'julip')) {
            onCollectAttachment?.('fbi_symbol_analysis');
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => { setAttachmentImage(null); setIsSelectingFolder(false); setCollectionFeedback({ type: null, msg: '' }); }, 1500);
            return;
        }
        setCollectionFeedback({ type: 'error', msg: '归档失败：特征不匹配 // MISMATCH' });
        setTimeout(() => setCollectionFeedback({ type: null, msg: '' }), 2000);
    };

    const handleClueClick = (id: string) => {
        if (id === 'view_capone_alice_meeting') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/capone_alice_meeting.jpg`);
        } else if (id === 'creekspring_award_ceremony_1981_photo') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/creekspring_award_ceremony_1981_photo.jpg`);
        } else if (id === 'fbi_symbol_analysis') {
            setAttachmentImage(`${import.meta.env.BASE_URL}images/fbi-symbol.png`);
        }
        if (onCollectClue) onCollectClue(id, CLUE_DISPLAY_MAP[id] || id);
    };


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setErrorMsg('');
        setTimeout(() => {
            const rawYearInput = yearInput.trim();
            const rawPersonInput = personInput.trim();
            
            if (rawPersonInput === '马库斯·索恩' && rawYearInput === '0x4C7B A9') {
                setIsThorneBackendOpen(true);
                setIsSearching(false);
                return;
            }

            const combinedQuery = `${rawYearInput} ${rawPersonInput}`.toLowerCase();
            const uniqueKeywordIds: string[] = [];
            const usedYearIds: string[] = [];
            const usedPersonIds: string[] = [];

            Object.entries(GLOBAL_KEYWORD_MAP).forEach(([alias, entry]: [string, any]) => {
                if (combinedQuery.includes(alias.toLowerCase())) {
                    uniqueKeywordIds.push(entry.id);
                    if (entry.type === 'year') usedYearIds.push(entry.id);
                    else usedPersonIds.push(entry.id);
                }
            });

            const foundArchive = ARCHIVE_DATABASE.find(record => {
                const yearMatch = uniqueKeywordIds.includes(`year_${record.triggers.year}`) || uniqueKeywordIds.includes(record.triggers.year);
                const personMatch = record.triggers.person.some(p => uniqueKeywordIds.includes(GLOBAL_KEYWORD_MAP[p]?.id || p.toLowerCase()));
                return yearMatch && personMatch;
            });

            const foundNodeEntry = Object.values(UNLOCKS_REGISTRY).find((entry: any) => entry.keywords?.every((kw: string) => uniqueKeywordIds.includes(kw)));

            if (foundArchive || foundNodeEntry) {
                if (foundArchive) {
                    if (!unlockedArchiveIds.includes(foundArchive.id)) onUnlockArchive(foundArchive.id);
                    setActiveCase(foundArchive);
                    setFocusedPane('newspaper');
                }
                if (foundNodeEntry && onUnlockNode) {
                    onUnlockNode(foundNodeEntry.targetId);
                    if (!foundArchive) onClose();
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                        <div className="w-full max-w-7xl h-[85vh] flex relative border border-[#c85a3f]/20 bg-[#0a0505] rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                            <div className={`w-64 border-r border-[#c85a3f]/20 bg-[#120c0c] flex flex-col ${showMobileDirectory ? 'fixed inset-y-0 left-0 z-[150] w-[80%] max-w-[320px] md:relative md:w-64 md:flex' : 'hidden md:flex'}`}>
                                <div className="p-6 border-b border-[#c85a3f]/20">
                                    <div className="flex items-center gap-2 text-[#d89853] mb-1"><Archive size={18} /><span className="font-mono text-sm tracking-widest font-bold">档案目录</span></div>
                                    <div className="text-[10px] text-[#c85a3f]/40 font-mono uppercase">Case Directory</div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {unlockedArchiveIds.map(id => {
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
                                    <button onClick={onClose} className="p-2 text-[#c85a3f] hover:rotate-90 transition-all"><X size={24} /></button>
                                </div>
                                <div className="flex-1 overflow-hidden pt-16">
                                    <AnimatePresence mode="wait">
                                        {!activeCase ? (
                                            <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center p-8">
                                                <div className="max-w-md w-full space-y-8">
                                                    <div className="text-center space-y-2">
                                                        <ShieldAlert size={48} className="text-[#c85a3f]/40 mx-auto" />
                                                        <h3 className="text-[#d89853] font-mono text-xl font-bold tracking-[0.2em]">验证协议 // SECURITY</h3>
                                                    </div>
                                                    
                                                    <form onSubmit={handleSearch} className="space-y-6">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="text-[9px] text-[#c85a3f]/60 font-mono uppercase tracking-widest mb-1 block">Time Index</label>
                                                                <input 
                                                                    type="text" 
                                                                    value={yearInput} 
                                                                    onChange={e => setYearInput(e.target.value)} 
                                                                    placeholder="YYYY" 
                                                                    className="w-full bg-black/40 border border-[#c85a3f]/20 text-[#d89853] py-3 px-4 font-mono focus:border-[#d89853] outline-none text-center text-2xl tracking-[0.5em]" 
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[9px] text-[#c85a3f]/60 font-mono uppercase tracking-widest mb-1 block">Subject Code</label>
                                                                <input 
                                                                    type="text" 
                                                                    value={personInput} 
                                                                    onChange={e => setPersonInput(e.target.value)} 
                                                                    placeholder="NAME / CODE" 
                                                                    className="w-full bg-black/40 border border-[#c85a3f]/20 text-[#d89853] py-3 px-4 font-mono focus:border-[#d89853] outline-none text-center text-lg tracking-widest" 
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        {errorMsg && <div className="text-red-500/80 text-[10px] text-center font-mono">{errorMsg}</div>}
                                                        
                                                        <div className="relative group">
                                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#c85a3f]/0 via-[#c85a3f]/20 to-[#c85a3f]/0 rounded blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                                            <button 
                                                                type="submit" 
                                                                disabled={isSearching} 
                                                                className="w-full relative bg-gradient-to-r from-[#c85a3f]/80 to-[#a04632]/80 hover:from-[#c85a3f] hover:to-[#a04632] text-white py-4 rounded font-mono font-bold tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                                                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                                                            >
                                                                {isSearching ? <span className="animate-pulse">VERIFYING...</span> : (
                                                                    <>
                                                                        <span>调取档案 / RETRIEVE</span>
                                                                        <Search size={18} className="text-white/70" />
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </form>

                                                    {/* Original Style Keyword Hints */}
                                                    <div className="space-y-4 pt-4 border-t border-[#c85a3f]/10">
                                                        <div className="text-[10px] text-[#c85a3f]/40 font-mono uppercase tracking-widest text-center">关键词参考 // KEYWORD HINTS</div>
                                                        <div className="flex flex-wrap justify-center gap-2">
                                                            {[...(collectedYears || []), ...(unlockedPeople || [])].map(id => {
                                                                const label = CLUE_DISPLAY_MAP[id] || id;
                                                                const isYear = id.startsWith('year_') || (id.length === 4 && !isNaN(Number(id)));
                                                                const isConsumed = consumedKeywords.has(id);
                                                                
                                                                if (isConsumed) return null;

                                                                return (
                                                                    <button
                                                                        key={id}
                                                                        onClick={() => isYear ? setYearInput(label) : setPersonInput(label)}
                                                                        className="px-2 py-1 bg-[#c85a3f]/10 border border-[#c85a3f]/20 text-[#d89853]/60 text-[10px] font-mono hover:bg-[#c85a3f]/20 hover:text-[#d89853] transition-all"
                                                                    >
                                                                        {label}
                                                                    </button>
                                                                );
