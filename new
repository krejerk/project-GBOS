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
                                                                        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                                                                            <span className="text-[#c85a3f]/40 font-black tracking-[0.5em] uppercase text-xs transition-all duration-500 group-hover/news:text-[#c85a3f]/80 group-hover/news:scale-110" style={{ writingMode: 'vertical-rl' }}>
                                                                                Newspaper Clipping
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    <div className="h-full relative overflow-hidden" 
                                                                        style={{ 
                                                                            backgroundColor: '#b88d5c',
                                                                            backgroundImage: `
                                                                                radial-gradient(circle at 50% 35%, #f2d2a9 0%, #b88d5c 50%, #4a341d 100%),
                                                                                url('https://www.transparenttextures.com/patterns/old-map.png')
                                                                            `,
                                                                            backgroundBlendMode: 'multiply',
                                                                            filter: 'sepia(0.4) saturate(1.3) contrast(1.1) brightness(0.9)'
                                                                        }}
                                                                    >
                                                                        {/* Heavy Texture Layers */}
                                                                        <div className="absolute inset-0 opacity-50 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/pulp.png')]"></div>
                                                                        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]"></div>
                                                                        <div className="absolute inset-0 analog-grain pointer-events-none opacity-40"></div>

                                                                        {/* Intense Vignette Overlay */}
                                                                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-20"></div>

                                                                        <div className="h-full overflow-y-auto relative z-0 scrollbar-thin scrollbar-thumb-neutral-300 custom-scrollbar">
                                                                            <div className="p-8 md:p-16 max-w-2xl mx-auto relative" style={{ filter: 'contrast(1.2) brightness(0.92)' }}>
                                                                                <div className="border-b-[6px] border-black/95 mb-12 pb-8 text-center relative">
                                                                                    <div className="absolute -top-5 left-0 right-0 h-[4px] bg-black/80"></div>
                                                                                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 relative italic"
                                                                                        style={{
                                                                                            fontFamily: "'Playfair Display', serif",
                                                                                            filter: 'blur(0.55px) contrast(1.6) opacity(0.92)',
                                                                                            color: 'rgba(0, 0, 0, 0.98)',
                                                                                            letterSpacing: '-0.05em',
                                                                                            mixBlendMode: 'multiply',
                                                                                            transform: 'scaleY(1.15)'
                                                                                        }}
                                                                                    >
                                                                                        {activeCase.newspaper.source}
                                                                                    </h2>
                                                                                    <div className="flex justify-between items-center border-t-[4px] border-black/95 pt-5 text-sm md:text-lg font-black uppercase tracking-widest font-serif italic">
                                                                                        <span className="text-black drop-shadow-sm">{activeCase.newspaper.date}</span>
                                                                                        <div className="flex flex-col items-center">
                                                                                            <span className="bg-black text-[#e6bc8a] px-6 py-1.5 text-xs mb-1 font-black tracking-[0.2em]">LATE CITY FINAL</span>
                                                                                            <span className="text-[10px] text-black font-black uppercase tracking-[0.4em]">Vol. LXXVIII... No. 124</span>
                                                                                        </div>
                                                                                        <span className="text-black drop-shadow-sm hidden md:inline">PRICE 15 CENTS</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="space-y-10">
                                                                                    <h1 className="text-4xl md:text-6xl font-black leading-[0.95] mb-12 font-serif italic"
                                                                                        style={{
                                                                                            fontFamily: "'Playfair Display', serif",
                                                                                            color: 'rgba(5, 5, 5, 0.98)',
                                                                                            filter: 'blur(0.45px) contrast(1.8) grayscale(0.1)',
                                                                                            letterSpacing: '-0.03em',
                                                                                            mixBlendMode: 'multiply',
                                                                                            textShadow: '1.5px 1.5px 2px rgba(0,0,0,0.2)'
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
                                                                                                            return (
                                                                                                                <span key={j} 
                                                                                                                    className="cursor-pointer font-black inline-block transform hover:scale-110 transition-all duration-200 text-[#c85a3f] border-b-[4px] border-[#c85a3f] hover:bg-[#c85a3f]/25 animate-pulse px-1 mx-0.5" 
                                                                                                                    onClick={e => { e.stopPropagation(); handleClueClick(forceClueId || keywordData.id); }}
                                                                                                                >
                                                                                                                    {displayText}
                                                                                                                </span>
                                                                                                            );
                                                                                                        }
                                                                                                        return <span key={j}>{displayText}</span>;
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
                                                                {/* FBI Annotation Pane */}
                                                                <div className={`relative transition-all duration-700 ease-in-out cursor-pointer h-full overflow-hidden ${focusedPane === 'annotation' ? 'flex-[1] md:flex-[2.5]' : focusedPane === null ? 'flex-1' : 'hidden md:flex md:flex-1 md:opacity-60 md:hover:opacity-100'} bg-[#0a0505] group/notes`} onClick={() => setFocusedPane(focusedPane === 'annotation' ? null : 'annotation')}>
                                                                    {/* Vertical Label for folded state */}
                                                                    {focusedPane === 'newspaper' && (
                                                                        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
                                                                            <span className="text-[#c85a3f]/40 font-black tracking-[0.5em] uppercase text-xs transition-all duration-500 group-hover/notes:text-[#c85a3f]/80 group-hover/notes:scale-110" style={{ writingMode: 'vertical-rl' }}>
                                                                                Internal Notes
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    <div className="h-full overflow-y-auto p-8 md:p-12 relative custom-scrollbar">
                                                                        {/* Grain & Vignette for Notes */}
                                                                        <div className="absolute inset-0 analog-grain pointer-events-none opacity-30 z-10"></div>
                                                                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-20"></div>

                                                                        {/* Status Stamp (e.g., REJECTED) - Enhanced Texture */}
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
                                                                                            const content = activeCase.annotation.content;
                                                                                            const rawLines = Array.isArray(content) ? content : (typeof content === 'string' ? content.split('\n') : []);
                                                                                            const cleanLines = rawLines.filter(line => {
                                                                                                const s = line.trim().toLowerCase();
                                                                                                return !s.startsWith('file:') && !s.startsWith('date:') && !s.startsWith('level:') && !s.startsWith('author:');
                                                                                            });

                                                                                            return cleanLines.filter(line => line.trim()).map((line, i) => (
                                                                                            <p key={i} 
                                                                                                className={`leading-relaxed relative text-sm md:text-base ${line.includes('后人手写批注') ? 'font-handwriting text-[#c85a3f] text-2xl rotate-[-2deg] py-8 px-6 bg-[#c85a3f]/5 border-l-4 border-[#c85a3f] shadow-2xl my-12' : 'font-typewriter'}`}
                                                                                                style={{ 
                                                                                                    fontFamily: line.includes('后人手写批注') ? undefined : "'Special Elite', cursive",
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
                                                                                                            return (
                                                                                                                <span key={j} 
                                                                                                                    className="cursor-pointer font-black border-b-[3px] text-[#c85a3f] border-[#c85a3f] hover:bg-[#c85a3f]/30 animate-pulse px-1 mx-0.5" 
                                                                                                                    onClick={e => { e.stopPropagation(); handleClueClick(forceClueId || keywordData.id); }}
                                                                                                                >
                                                                                                                    {displayText}
                                                                                                                </span>
                                                                                                            );
                                                                                                        }
                                                                                                        return <span key={j}>{displayText}</span>;
                                                                                                    })}
                                                                                                </p>
                                                                                            ));
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
                                                                                    ) : (
                                                                                        <div className="relative text-red-900/70 transform -rotate-12 mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity">
                                                                                            <svg width="140" height="90" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'blur(0.3px)' }}>
                                                                                                <path d="M30 60 C 30 60, 25 20, 45 15 C 60 10, 70 25, 55 40 C 40 55, 30 40, 50 35 C 70 30, 90 60, 100 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                <path d="M 25 65 L 105 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                                                                                            </svg>
                                                                                            <div className="text-[9px] text-[#c85a3f]/50 font-mono text-center mt-1 tracking-[0.3em] uppercase font-black">Verified</div>
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
