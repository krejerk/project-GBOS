
import sys

file_path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/components/Archives.tsx'

with open(file_path, 'r') as f:
    lines = f.readlines()

# Part 1: Top healthy part (up to line 733)
top_part = lines[:733]

# Part 2: My clean Result View
result_view = """                                        <div className="w-full h-full flex flex-col relative bg-black overflow-hidden">
                                            <motion.div
                                                key="result"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex-1 flex flex-col md:flex-row bg-[#121212] relative overflow-hidden"
                                            >
                                                {(() => {
                                                    const activeKeywords = [
                                                        ...(ARCHIVE_CASE_HIGHLIGHT_MAP[activeCase.id] || []),
                                                        ...(activeCase.revealed || []).flatMap(id => 
                                                            Object.keys(GLOBAL_KEYWORD_MAP).filter(key => GLOBAL_KEYWORD_MAP[key].id === id)
                                                        )
                                                    ];
                                                    const patternStr = [
                                                        ...activeKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\\\]/g, '\\\\\\\\$&')),
                                                        '\\\\[.*?\\\\]\\\\(clue:.*?\\\\)',
                                                        '「.*?」'
                                                    ].filter(Boolean).sort((a, b) => b.length - a.length).join('|');
                                                    const docRegex = new RegExp(`(${patternStr})`, 'g');

                                                    return (
                                                        <>
                                                            <div className="md:hidden absolute top-4 right-4 z-[110] mt-[env(safe-area-inset-top)]">
                                                                <button onClick={resetView} className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md text-[#d89853] border border-[#d89853]/40 rounded-full shadow-2xl font-mono text-[10px] font-bold">
                                                                    <X size={16} />
                                                                    <span>CLOSE</span>
                                                                </button>
                                                            </div>

                                                            <div className={`relative transition-all duration-700 ease-in-out cursor-pointer h-full overflow-hidden ${focusedPane === 'newspaper' ? 'flex-[1] md:flex-[3]' : focusedPane === null ? 'flex-1' : 'hidden md:flex md:flex-1 md:bg-[#1a1a1a]'} border-r border-[#c85a3f]/10 group/news`} onClick={() => setFocusedPane(focusedPane === 'newspaper' ? null : 'newspaper')}>
                                                                <div className="h-full relative overflow-hidden bg-[#fdfbf7]">
                                                                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] z-10"></div>
                                                                    <div className="h-full overflow-y-auto relative z-0 scrollbar-thin scrollbar-thumb-neutral-300">
                                                                        <div className="p-8 md:p-14 max-w-2xl mx-auto">
                                                                            <div className="border-b-4 border-black mb-10 pb-6 text-center">
                                                                                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-2 italic text-neutral-900">{activeCase.newspaper.source}</h2>
                                                                                <div className="flex justify-between items-center border-t-2 border-black pt-3 text-xs font-bold uppercase">
                                                                                    <span>{activeCase.newspaper.date}</span>
                                                                                    <span className="bg-black text-white px-3 py-0.5 text-[9px]">LATE CITY FINAL</span>
                                                                                    <span>PRICE 15 CENTS</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="font-serif leading-relaxed text-neutral-800 space-y-6 text-lg">
                                                                                <h3 className="text-2xl md:text-3xl font-black uppercase mb-6 leading-tight">{activeCase.newspaper.title}</h3>
                                                                                {activeCase.newspaper.content.split('\\\\n\\\\n').map((para, i) => (
                                                                                    <p key={i} className="relative">
                                                                                        {para.split(docRegex).map((part, j) => {
                                                                                            if (!part) return null;
                                                                                            let displayText = part;
                                                                                            let lookupKey = part;
                                                                                            let forceClueId = null;
                                                                                            const mdMatch = part.match(/^\\\\[(.*?)\\\\]\\\\(clue:(.*?)\\\\)$/);
                                                                                            if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; lookupKey = mdMatch[1]; }
                                                                                            else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); lookupKey = displayText; }
                                                                                            if (activeKeywords.includes(lookupKey) || forceClueId) {
                                                                                                const keywordData = GLOBAL_KEYWORD_MAP[lookupKey];
                                                                                                const isRevealed = forceClueId || (keywordData && activeCase.revealed?.includes(keywordData.id));
                                                                                                return <span key={j} className={`cursor-help px-1 rounded ${isRevealed ? 'bg-[#c85a3f]/15 text-[#c85a3f] font-bold border-b-2 border-[#c85a3f]/40' : 'border-b border-black/10'}`} onClick={(e) => { e.stopPropagation(); if (isRevealed) handleClueClick(forceClueId || keywordData?.id); }}>{displayText}</span>;
                                                                                            }
                                                                                            return <span key={j}>{displayText}</span>;
                                                                                        })}
                                                                                    </p>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={`relative transition-all duration-700 ease-in-out cursor-pointer h-full overflow-hidden ${focusedPane === 'annotation' ? 'flex-[1] md:flex-[2.5]' : focusedPane === null ? 'flex-1' : 'hidden md:flex md:flex-1 md:bg-black/40'} bg-[#1a1515] group/notes`} onClick={() => setFocusedPane(focusedPane === 'annotation' ? null : 'annotation')}>
                                                                <div className="h-full overflow-y-auto p-8 md:p-12 relative">
                                                                    <div className="max-w-xl mx-auto space-y-8 relative z-10">
                                                                        <div className="border border-[#c85a3f]/30 p-8 rounded bg-[#c85a3f]/5 backdrop-blur-sm">
                                                                            <div className="flex justify-between items-start mb-8 border-b border-[#c85a3f]/20 pb-4">
                                                                                <div>
                                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Bureau Investigation File</div>
                                                                                    <div className="text-xl font-mono font-bold text-[#d89853]">{activeCase.annotation.fileId}</div>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Classification</div>
                                                                                    <div className="text-red-500 font-bold border border-red-500/50 px-2 py-0.5 text-xs bg-red-500/10 tracking-widest">{activeCase.annotation.level}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="grid grid-cols-2 gap-6 text-[14px] text-[#d89853]/80 font-mono mb-8">
                                                                                <div><span className="block text-[#c85a3f]/40 text-[10px] uppercase">Marked Date</span>{activeCase.annotation.date}</div>
                                                                                <div><span className="block text-[#c85a3f]/40 text-[10px] uppercase">Author</span>{activeCase.annotation.author}</div>
                                                                                <div className="col-span-2 pt-6 border-t border-[#c85a3f]/10">
                                                                                    {activeCase.annotation.content.split('\\\\n').filter(line => line.trim()).map((line, i) => (
                                                                                        <p key={i} className="mb-4">{line}</p>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-8 flex justify-end">
                                                                                <div className="text-right">
                                                                                    <div className="font-handwriting text-2xl text-[#c85a3f]/80 transform rotate-[-3deg]">{activeCase.annotation.author}</div>
                                                                                    <div className="text-[10px] text-[#c85a3f]/40 font-mono uppercase tracking-widest mt-1">Authorized Official Signature</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-4 right-4 bg-[#c85a3f]/20 text-[#c85a3f] text-[10px] px-2 py-1 uppercase tracking-widest pointer-events-none border border-[#c85a3f]/30">INTERNAL MEMO // DO NOT DISTRIBUTE</div>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </motion.div>
                                        </div>
                                    )
                                }
"""

# Part 3: Bottom healthy part (from line 1527 onwards)
# Wait! line 1527 is index 1526
bottom_part = lines[1526:]

with open(file_path, 'w') as f:
    f.writelines(top_part)
    f.write(result_view)
    f.writelines(bottom_part)

print("Final restoration completed.")
