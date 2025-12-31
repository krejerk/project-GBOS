import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Search, X, ShieldAlert, Stamp, ChevronRight, File, FolderOpen } from 'lucide-react';

interface ArchivesProps {
    isOpen: boolean;
    onClose: () => void;
    unlockedArchiveIds: string[];
    onUnlockArchive: (id: string) => void;
    onCollectClue: (id: string, word: string) => void;
    collectedClues: string[];
    collectedYears: string[];
    onConsumeKeywords: (yearIds: string[], personIds: string[]) => void;
}

interface DetailedArchiveRecord {
    id: string;
    title: string;
    triggers: {
        year: string;
        person: string[];
    };
    newspaper: {
        source: string;
        date: string;
        headline: string;
        content: string[];
    };
    annotation: {
        fileId: string;
        date: string;
        level: string;
        author: string;
        content: string;
    };
}

const ARCHIVE_DATABASE: DetailedArchiveRecord[] = [
    {
        id: 'me_1971',
        title: '1971年索科区银行劫案',
        triggers: {
            year: '1971',
            person: ['nibi', '尼比', 'Nibi']
        },
        newspaper: {
            source: '《海岸信使报》',
            date: '1971年11月14日',
            headline: '主街银行遭洗劫，劫匪佩戴原住民头饰实施暴行',
            content: [
                '本报讯 —— 本周一晨，两名武装劫匪袭击了索科区主街的州立储蓄银行。作案过程极为迅速，歹徒表现出的残暴程度令全镇陷入恐慌。',
                '据现场目击者描述，劫匪在警方抵达前几分钟便已携带数额不明的现金，驾驶深色福特轿车逃离。令人不寒而栗的是，即便在如此短的响应时间里，且职员已完全配合交出财物的情况下，劫匪仍对多名人质实施了残暴且毫无必要的殴打与凌虐。一名治安官发言人表示：“这不像是为了钱，更像是在宣泄某种纯粹的恶意。”',
                '据多名证人证实，两名劫匪作案时均佩戴着显眼的异族头饰，目前尚不清楚这是否是劫匪故意留下的某种符号。州警署现已封锁现场，案件仍在紧张侦办中。'
            ]
        },
        annotation: {
            fileId: 'ME-1971-08-SEC',
            date: '1972年2月14日',
            level: '机密 (CONFIDENTIAL)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `
【案卷分析批注】
关于“1971年11月14日索科区银行劫案”的补充评估：

**暴力冗余（Violence Redundancy）：**
现场报告显示，受害者受到的创伤远超“控制人质”的需求。这种残暴行为并非由于恐慌，而是具备极强的目的性。完全符合我们对“家庭”初期仪式化行为的预测：暴力本身即是他们的交流语言。

**符号污染（Symbolic Contamination）：**
关于“阿尔衮琴头饰”的目击记录引起了我的高度关注。这并非简单的伪装。根据此前对该邪教原型的研究，这很可能是一种“剥夺式标记”。他们通过佩戴传统饰品以对犯罪动机进行宣言式展示，但表演性令人可疑。建议将此细节与“1968年「俄亥俄州」「祭祀案」”中的面具特征进行交叉比对。
            `
        }
    },
    {
        id: 'oh_1968',
        title: '1968年柯特兰邪教屠杀案',
        triggers: {
            year: '1968',
            person: ['lundgren', '伦德格兰', 'Lundgren']
        },
        newspaper: {
            source: '《柯特兰公报》(The Kirtland Gazette)',
            date: '1968年11月14日',
            headline: '谷仓下的梦魇：艾弗里一家惨遭灭门，邪教"先知"在逃',
            content: [
                '本报讯 —— 俄亥俄州柯特兰镇近日曝出骇人听闻的屠杀案。警方在一处租用的农舍谷仓内，挖掘出了失踪已久的艾弗里一家五口的尸体。',
                '调查显示，自封为"末日先知"的伦德格兰及其信徒具有重大作案嫌疑。该组织以"圣经学习"为名诱骗追随者，却在今年4月实施了这场残酷的杀戮。据一名叛逃信徒交待，伦德格兰为了掩盖枪声，在行刑时命令信徒启动电锯制造噪音。',
                '目前，伦德格兰及其13名残余党羽已潜逃。此人极度危险，拥有大量军事武器并自称拥有"读心术"。联邦调查局（FBI）已介入搜捕，提醒市民发现可疑军装团体请立即报警。'
            ]
        },
        annotation: {
            fileId: 'OH-1968-11-SEC',
            date: '1968年12月20日',
            level: '机密 (CONFIDENTIAL / INTERNAL USE ONLY)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `【案卷病理学分析批注】

关于杰弗里·伦德格兰（Jeffrey Lundgren）动机真实性的深度评估：

**动机的后置包装（Post-hoc Narrative Construction）：**
地方警署和大众媒体被伦德格兰的"末日论"牵着鼻子走，这正是他想要的。通过对他在RLDS时期的早期行为档案分析，其所谓的"先知身份"是在其精神系统彻底崩溃后才紧急搭建的防御机制。他并不是因为相信上帝才杀人，而是因为他无法抑制杀戮冲动，才不得不从经文中翻找借口，将其包装成一种"圣经式献祭"。

需要注意的是，伦德格兰是一个极度危险的病理性捕猎者。他表现出的"邪教领袖"特质其实是他精心维护的外壳。如果在审讯中试图从宗教角度与其对话，将正中其下怀。`
        }
    }
];

export const Archives: React.FC<ArchivesProps> = ({
    isOpen,
    onClose,
    unlockedArchiveIds,
    onUnlockArchive,
    onCollectClue,
    collectedClues,
    collectedYears,
    onConsumeKeywords
}) => {
    const [yearInput, setYearInput] = useState('');
    const [personInput, setPersonInput] = useState('');
    const [activeCase, setActiveCase] = useState<DetailedArchiveRecord | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [collectedKeywords, setCollectedKeywords] = useState<Set<string>>(new Set());

    // Focus State for Split View
    const [focusedPane, setFocusedPane] = useState<'newspaper' | 'annotation' | null>(null);

    // Keyword mapping for archives - for annotation highlighting
    const ARCHIVE_KEYWORD_MAP: Record<string, string> = {
        '俄亥俄州': 'ohio',
        '祭祀案': 'ritual_case'
    };

    // Clue display mapping for quick selection chips
    const CLUE_DISPLAY_MAP: Record<string, string> = {
        'year_1971': '1971',
        'year_1968': '1968',
        'nibi': '尼比',
        'lundgren': '伦德格兰',
        'conchar': '康查尔'
    };

    const handleKeywordClick = (keyword: string) => {
        const clueId = ARCHIVE_KEYWORD_MAP[keyword];
        if (clueId && !collectedKeywords.has(keyword)) {
            setCollectedKeywords(prev => new Set([...prev, keyword]));
            onCollectClue(clueId, keyword);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setErrorMsg('');

        setTimeout(() => {
            const found = ARCHIVE_DATABASE.find(record =>
                record.triggers.year === yearInput.trim() &&
                record.triggers.person.some(p => p.toLowerCase() === personInput.trim().toLowerCase())
            );

            if (found) {
                // If found, unlock it globally and set active
                if (!unlockedArchiveIds.includes(found.id)) {
                    onUnlockArchive(found.id);
                }
                setActiveCase(found);
                setErrorMsg('');

                // Consume used keywords
                const usedYearIds: string[] = [];
                const usedPersonIds: string[] = [];

                // Match year
                const yearTrimmed = yearInput.trim();
                if (yearTrimmed === '1971') usedYearIds.push('year_1971');
                if (yearTrimmed === '1968') usedYearIds.push('year_1968');

                // Match person
                const personLower = personInput.trim().toLowerCase();
                if (['nibi', '尼比'].includes(personLower)) usedPersonIds.push('nibi');
                if (['lundgren', '伦德格兰'].includes(personLower)) usedPersonIds.push('lundgren');
                if (['conchar', '康查尔'].includes(personLower)) usedPersonIds.push('conchar');
                if (['morning', '莫宁'].includes(personLower)) usedPersonIds.push('morning');

                // Call callback to remove keywords
                if (usedYearIds.length > 0 || usedPersonIds.length > 0) {
                    onConsumeKeywords(usedYearIds, usedPersonIds);
                }
            } else {
                setErrorMsg('检索失败：未找到匹配的关联档案 (NO RECORDS FOUND)');
            }
            setIsSearching(false);
        }, 800);
    };

    const handleOpenCase = (caseId: string) => {
        const found = ARCHIVE_DATABASE.find(c => c.id === caseId);
        if (found) setActiveCase(found);
    }

    const resetView = () => {
        setActiveCase(null);
        setYearInput('');
        setPersonInput('');
        setErrorMsg('');
        setFocusedPane(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                >
                    <div className="w-full max-w-7xl h-[85vh] flex relative border border-[#c85a3f]/20 bg-[#0a0505] rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                        {/* Sidebar: Archive Directory */}
                        <div className="w-64 border-r border-[#c85a3f]/20 bg-[#0f0a0a] flex flex-col hidden md:flex">
                            {/* NEW SEARCH Button - Now at top */}
                            <button
                                onClick={resetView}
                                className="p-4 border-b border-[#c85a3f]/20 text-[#c85a3f]/60 hover:text-[#d89853] hover:bg-[#c85a3f]/10 transition-colors flex items-center justify-center gap-2 text-xs font-mono tracking-wider"
                            >
                                <Search size={14} />
                                NEW SEARCH
                            </button>

                            {/* Archive List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {unlockedArchiveIds.length === 0 && (
                                    <div className="text-center mt-10 text-[#c85a3f]/30 text-xs font-mono px-4">
                                        NO ARCHIVES UNLOCKED
                                        <div className="mt-2 text-[10px] opacity-50">Please perform search to retrieve cases.</div>
                                    </div>
                                )}

                                {unlockedArchiveIds.map(id => {
                                    const record = ARCHIVE_DATABASE.find(r => r.id === id);
                                    if (!record) return null;
                                    const isActive = activeCase?.id === id;

                                    return (
                                        <button
                                            key={id}
                                            onClick={() => handleOpenCase(id)}
                                            className={`w-full text-left p-3 rounded border transition-all text-xs font-mono group relative overflow-hidden ${isActive
                                                ? 'bg-[#c85a3f]/20 border-[#c85a3f] text-[#d89853]'
                                                : 'bg-black/40 border-[#c85a3f]/10 text-[#c85a3f]/60 hover:border-[#c85a3f]/40 hover:text-[#d89853]/80'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold">{record.triggers.year} CASE</span>
                                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#d89853] animate-pulse" />}
                                            </div>
                                            <div className="truncate opacity-80">{record.title}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Title - Now at bottom */}
                            <div className="p-6 border-t border-[#c85a3f]/20">
                                <div className="flex items-center gap-2 text-[#d89853] mb-1">
                                    <Archive size={18} />
                                    <span className="font-mono text-sm tracking-widest font-bold">档案目录</span>
                                </div>
                                <div className="text-[10px] text-[#c85a3f]/40 font-mono">CASE DIRECTORY</div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col relative w-full">
                            {/* Header */}
                            <div className="h-16 border-b border-[#c85a3f]/20 flex justify-between items-center px-6 bg-[#0f0a0a]/50 absolute top-0 left-0 w-full z-20 pointer-events-none">
                                <div className="flex flex-col">
                                    <span className="font-mono text-lg tracking-[0.2em] font-bold text-[#d89853] text-shadow-sm">局内档案室 // ARCHIVES</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-[#c85a3f]/10 rounded-full text-[#c85a3f] transition-colors pointer-events-auto"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden relative pt-16">
                                <AnimatePresence mode='wait'>
                                    {!activeCase ? (
                                        /* SEARCH VIEW */
                                        <motion.div
                                            key="search"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="w-full h-full flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
                                        >
                                            <div className="max-w-md w-full space-y-8 relative">
                                                <div className="absolute -inset-10 bg-[#c85a3f]/5 blur-3xl rounded-full pointer-events-none" />

                                                <div className="text-center space-y-2 relative">
                                                    <ShieldAlert size={48} className="mx-auto text-[#c85a3f]/60 mb-4 animate-pulse" />
                                                    <h3 className="text-[#d89853] font-mono tracking-widest text-xl font-bold">双重索引验证系统</h3>
                                                    <p className="text-[#c85a3f]/60 text-xs font-mono tracking-[0.2em]">DUAL-INDEX VERIFICATION PROTOCOL</p>
                                                </div>

                                                <form onSubmit={handleSearch} className="space-y-6 relative z-10">
                                                    <div className="space-y-4">
                                                        <div className="group">
                                                            <label className="text-[10px] text-[#d89853]/40 font-mono tracking-widest uppercase mb-1 block group-focus-within:text-[#d89853]">时间索引 (Year)</label>
                                                            <input
                                                                type="text"
                                                                value={yearInput}
                                                                onChange={(e) => setYearInput(e.target.value)}
                                                                placeholder="YYYY"
                                                                className="w-full bg-black/60 border-b border-[#c85a3f]/30 text-[#d89853] py-2 px-4 font-mono focus:border-[#d89853] focus:outline-none text-center tracking-[0.5em] text-2xl transition-all placeholder-[#d89853]/10 hover:border-[#c85a3f]/60"
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <label className="text-[10px] text-[#d89853]/40 font-mono tracking-widest uppercase mb-1 block group-focus-within:text-[#d89853]">关联人物 (Person)</label>
                                                            <input
                                                                type="text"
                                                                value={personInput}
                                                                onChange={(e) => setPersonInput(e.target.value)}
                                                                placeholder="NAME CODE"
                                                                className="w-full bg-black/60 border-b border-[#c85a3f]/30 text-[#d89853] py-2 px-4 font-mono focus:border-[#d89853] focus:outline-none text-center tracking-[0.2em] text-xl transition-all placeholder-[#d89853]/10 hover:border-[#c85a3f]/60"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Quick Select Keywords */}
                                                    {(collectedYears.length > 0 || collectedClues.filter(id => CLUE_DISPLAY_MAP[id]).length > 0) && (
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            <div className="text-[10px] text-[#c85a3f]/40 uppercase tracking-widest w-full text-center mb-2">快速选择 / Quick Select</div>
                                                            {/* Years from collectedYears */}
                                                            {collectedYears.filter(id => CLUE_DISPLAY_MAP[id]).map(id => (
                                                                <button
                                                                    key={id}
                                                                    type="button"
                                                                    onClick={() => setYearInput(CLUE_DISPLAY_MAP[id])}
                                                                    className="px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-xs rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                                                                >
                                                                    {CLUE_DISPLAY_MAP[id]}
                                                                </button>
                                                            ))}
                                                            {/* People from collectedClues */}
                                                            {collectedClues.filter(id => CLUE_DISPLAY_MAP[id]).map(id => (
                                                                <button
                                                                    key={id}
                                                                    type="button"
                                                                    onClick={() => setPersonInput(CLUE_DISPLAY_MAP[id])}
                                                                    className="px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-xs rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                                                                >
                                                                    {CLUE_DISPLAY_MAP[id]}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {errorMsg && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-500/80 text-xs text-center font-mono py-2 bg-red-900/10 border border-red-900/30 rounded"
                                                        >
                                                            {errorMsg}
                                                        </motion.div>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={isSearching}
                                                        className="w-full bg-gradient-to-r from-[#c85a3f]/80 to-[#a04632]/80 hover:from-[#c85a3f] hover:to-[#a04632] text-white py-4 rounded font-mono tracking-[0.2em] uppercase font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(200,90,63,0.3)] hover:shadow-[0_0_30px_rgba(200,90,63,0.5)] active:scale-[0.98]"
                                                    >
                                                        {isSearching ? <span className="animate-pulse">VERIFYING...</span> : '调取档案 / RETRIEVE'}
                                                        {!isSearching && <Search size={16} />}
                                                    </button>
                                                </form>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* RESULT VIEW (Interactive Split Pane) */
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full flex flex-col md:flex-row bg-black relative"
                                        >
                                            {/* Top Overlay Controls (Mobile) */}
                                            <div className="md:hidden absolute top-4 right-4 z-50">
                                                <button onClick={resetView} className="p-2 bg-black/50 text-white rounded-full"><X size={20} /></button>
                                            </div>

                                            {/* Newspaper Pane */}
                                            <div
                                                className={`
                                                    relative transition-all duration-500 ease-in-out overflow-hidden cursor-pointer
                                                    ${focusedPane === 'newspaper' ? 'flex-[2.5]' : focusedPane === 'annotation' ? 'flex-[0.8] opacity-60 hover:opacity-100 hover:flex-[1]' : 'flex-1'}
                                                    border-r border-[#c85a3f]/20
                                                `}
                                                onMouseEnter={() => setFocusedPane('newspaper')}
                                                onClick={() => setFocusedPane('newspaper')}
                                            >
                                                <div className="h-full overflow-y-auto bg-[#eaddcf] text-neutral-900 p-8 md:p-12 relative group scrollbar-thin scrollbar-thumb-neutral-400">
                                                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

                                                    <div className="max-w-2xl mx-auto relative z-10 font-serif origin-top transition-transform duration-500">
                                                        <div className="border-b-4 border-black mb-8 pb-4 text-center">
                                                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">{activeCase.newspaper.source}</h2>
                                                            <div className="flex justify-between items-center border-t border-black pt-2 text-xs md:text-sm font-bold uppercase tracking-wide">
                                                                <span>{activeCase.newspaper.date}</span>
                                                                <span className="bg-black text-[#eaddcf] px-2 py-0.5">EXTRA EDITION</span>
                                                                <span>10 CENTS</span>
                                                            </div>
                                                        </div>

                                                        <h1 className="text-3xl md:text-4xl font-extrabold leading-[1.1] mb-6 font-serif">{activeCase.newspaper.headline}</h1>

                                                        <div className="columns-1 md:columns-2 gap-8 text-sm md:text-base leading-relaxed text-justify space-y-4 font-serif text-neutral-800">
                                                            {activeCase.newspaper.content.map((para, i) => (
                                                                <p key={i} className={`first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 ${i === 0 ? 'first-letter:text-black' : 'first-letter:hidden'}`}>
                                                                    {para}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Label */}
                                                <div className="absolute bottom-4 left-4 bg-black/80 text-[#eaddcf] text-[10px] px-2 py-1 uppercase tracking-widest pointer-events-none">
                                                    EVIDENCE TYPE: PRESS CLIPPING
                                                </div>
                                            </div>

                                            {/* FBI Annotation Pane */}
                                            <div
                                                className={`
                                                    relative transition-all duration-500 ease-in-out overflow-hidden cursor-pointer bg-[#1a1515]
                                                    ${focusedPane === 'annotation' ? 'flex-[2]' : focusedPane === 'newspaper' ? 'flex-[0.5] opacity-60 hover:opacity-100 hover:flex-[0.8]' : 'flex-1'}
                                                `}
                                                onMouseEnter={() => setFocusedPane('annotation')}
                                                onClick={() => setFocusedPane('annotation')}
                                            >
                                                <div className="h-full overflow-y-auto p-8 md:p-12 relative scrollbar-thin scrollbar-thumb-[#c85a3f]/30">
                                                    <div className="absolute top-10 right-10 p-4 opacity-10 pointer-events-none transform rotate-12">
                                                        <Stamp size={180} className="text-red-600" />
                                                    </div>

                                                    <div className="max-w-xl mx-auto space-y-8 relative z-10">
                                                        <div className="border border-[#c85a3f]/30 p-6 rounded bg-[#c85a3f]/5 backdrop-blur-sm relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#c85a3f]" />
                                                            <div className="flex justify-between items-start mb-6 border-b border-[#c85a3f]/20 pb-4">
                                                                <div>
                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Bureau Investigation File</div>
                                                                    <div className="text-xl md:text-2xl font-mono font-bold text-[#d89853]">{activeCase.annotation.fileId}</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Classification</div>
                                                                    <div className="text-red-500 font-bold border border-red-500/50 px-2 py-0.5 text-xs bg-red-500/10 tracking-widest">{activeCase.annotation.level}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-6 text-xs text-[#d89853]/80 font-mono">
                                                                <div>
                                                                    <span className="block text-[#c85a3f]/40 text-[10px] uppercase">Marked Date</span>
                                                                    {activeCase.annotation.date}
                                                                </div>
                                                                <div>
                                                                    <span className="block text-[#c85a3f]/40 text-[10px] uppercase">Authorized By</span>
                                                                    {activeCase.annotation.author}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="font-mono text-sm md:text-base leading-7 space-y-6 text-neutral-300 font-light border-l border-[#c85a3f]/10 pl-6">
                                                            {activeCase.annotation.content.split('\n').map((line, i) => (
                                                                <p key={i} className="mb-4">
                                                                    {line.split(/(俄亥俄州|祭祀案)/g).map((part, j) => {
                                                                        if (['俄亥俄州', '祭祀案'].includes(part)) {
                                                                            const isCollected = collectedKeywords.has(part);
                                                                            return (
                                                                                <span
                                                                                    key={j}
                                                                                    onClick={() => handleKeywordClick(part)}
                                                                                    className={`
                                                                                        cursor-pointer font-bold inline-block transform hover:scale-105 transition-all duration-200
                                                                                        ${isCollected
                                                                                            ? 'text-white bg-[#c85a3f] px-1 animate-pulse shadow-lg'
                                                                                            : 'text-[#c85a3f] border-b-2 border-[#c85a3f] hover:bg-[#c85a3f]/20'
                                                                                        }
                                                                                    `}
                                                                                    title="点击收集线索"
                                                                                >
                                                                                    {part}
                                                                                </span>
                                                                            );
                                                                        }
                                                                        return <span key={j}>{part}</span>;
                                                                    })}
                                                                </p>
                                                            ))}
                                                        </div>

                                                        {/* Handwritten Signature */}
                                                        <div className="mt-8 flex justify-end pr-12">
                                                            <div className="relative text-red-900/80 transform -rotate-12 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity">
                                                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M30 60 C 30 60, 25 20, 45 15 C 60 10, 70 25, 55 40 C 40 55, 30 40, 50 35 C 70 30, 90 60, 100 55"
                                                                        stroke="currentColor"
                                                                        strokeWidth="3"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="path-draw"
                                                                    />
                                                                    <path
                                                                        d="M 25 65 L 105 50"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        opacity="0.6"
                                                                    />
                                                                    <text x="70" y="70" fontFamily="serif" fontSize="12" fill="currentColor" opacity="0.8" className="tracking-widest rotate-6">Reggie</text>
                                                                </svg>
                                                                <div className="text-[10px] text-[#c85a3f]/60 font-mono text-center mt-1 tracking-widest uppercase">Verified</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Label */}
                                                <div className="absolute bottom-4 right-4 bg-[#c85a3f]/20 text-[#c85a3f] text-[10px] px-2 py-1 uppercase tracking-widest pointer-events-none border border-[#c85a3f]/30">
                                                    INTERNAL MEMO // DO NOT DISTRIBUTE
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
