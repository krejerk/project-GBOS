
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryNode, MemoryLayer } from '../types';
import { Quote, Sparkles, AlertCircle, Maximize2, Folder, FolderOpen, X } from 'lucide-react';

interface NodeDetailProps {
  node: MemoryNode;
  onShatter: (id: string) => void;
  onCollectClue: (id: string, word: string) => void;
  onCollectAttachment?: (id: string) => void;
  collectedDossierIds?: string[];
  collectedAttachments?: string[];
  clueDisplayMap?: Record<string, string>;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({
  node,
  onShatter,
  onCollectClue,
  onCollectAttachment,
  collectedDossierIds = [],
  collectedAttachments = [],
  clueDisplayMap = {}
}) => {
  const current = node.layers[node.currentLayer] || node.layers[MemoryLayer.SURFACE];
  const currentContent = node.layers[node.currentLayer];
  const canShatter = node.currentLayer !== MemoryLayer.CORE;
  const currentLayerNum = node.currentLayer === MemoryLayer.SURFACE ? 1 : node.currentLayer === MemoryLayer.DEEP ? 2 : 3;

  // Folder Selection State
  const [isSelectingFolder, setIsSelectingFolder] = React.useState(false);
  const [collectionFeedback, setCollectionFeedback] = React.useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  const handleAttemptCollect = (targetClueId: string) => {
    if (targetClueId === 'graywater_beacon') {
      if (onCollectAttachment) onCollectAttachment('graywater_beacon'); // Collect the image/dossier linkage
      setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
      setTimeout(() => {
        setIsSelectingFolder(false);
        setCollectionFeedback({ type: null, msg: '' });
        // Also update local state to hide visual if desired, or just show it's collected.
        // We rely on parent state update re-rendering this component used in `isImageCollected` check below.
      }, 1500);
    } else {
      setCollectionFeedback({ type: 'error', msg: '归档失败：特征不匹配 // MISMATCH' });
      setTimeout(() => setCollectionFeedback({ type: null, msg: '' }), 2000);
    }
  };

  // Track seen keywords for first-instance highlighting
  const seenKeywords = new Set<string>();

  // Keyword Mappings - Different for each confession
  const CONFESSION_1_KEYWORDS: Record<string, string> = {
    '康查尔': 'conchar',
    '尼比': 'nibi',
    '肉体关系': 'relationship',
    '雷吉博士': 'dr_reggie',
    '1971': 'year_1971'
  };

  const CONFESSION_2_KEYWORDS: Record<string, string> = {
    '脏弗兰克酒吧': 'dirty_frank',
    '莫宁': 'morning',
    '伦德格兰': 'lundgren',
    '1968': 'year_1968',
    '1967': 'year_1967'
  };

  const CONFESSION_3_KEYWORDS: Record<string, string> = {
    '罗格·毕比': 'roger_beebe',
    '1985': 'year_1985'
  };

  const CONFESSION_4_KEYWORDS: Record<string, string> = {
    '内华达州': 'nevada',
    // '雷吉博士' is explicitly excluded from being pickable here as per user request
    // '训练日' is also not a target here, it's a trigger
  };

  const CONFESSION_5_KEYWORDS: Record<string, string> = {
    '小德里克·维恩': 'little_derek_wayne'
  };

  const CONFESSION_6_KEYWORDS: Record<string, string> = {
    '罗阿诺克市': 'roanoke',
    '灰水信标': 'graywater_beacon'
  };

  const CONFESSION_7_KEYWORDS: Record<string, string> = {
    '玛莎·迪亚兹': 'martha_diaz',
    '1972': 'year_1972'
  };

  // Select keyword map based on node ID
  const KEYWORD_MAP = node.id === 'confession_7'
    ? CONFESSION_7_KEYWORDS
    : node.id === 'confession_6'
      ? CONFESSION_6_KEYWORDS
      : node.id === 'confession_5'
        ? CONFESSION_5_KEYWORDS
        : node.id === 'confession_4'
          ? CONFESSION_4_KEYWORDS
          : node.id === 'confession_3'
            ? CONFESSION_3_KEYWORDS
            : node.id === 'confession_2'
              ? CONFESSION_2_KEYWORDS
              : CONFESSION_1_KEYWORDS;

  // Track animation states for collected keywords
  const [collectionEffects, setCollectionEffects] = React.useState<Record<string, boolean>>({});
  const [isVisualRevealed, setIsVisualRevealed] = React.useState(false);
  const isImageCollected = collectedAttachments.includes('graywater_beacon');
  const [isStabilized, setIsStabilized] = React.useState(false);

  React.useEffect(() => {
    if (node.id.includes('confession')) {
      const timer = setTimeout(() => setIsStabilized(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [node.id]);

  const handleKeywordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    onCollectClue(KEYWORD_MAP[word], word);
    setCollectionEffects(prev => ({ ...prev, [word]: true }));
    // Reset effect after animation
    setTimeout(() => {
      setCollectionEffects(prev => ({ ...prev, [word]: false }));
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      // Track animation states for collected keywords
      className={`h-full flex flex-col backdrop-blur-md overflow-hidden ${node.id.includes('confession')
        ? 'bg-[#1a1410] border border-[#d89853]/30 shadow-2xl skew-x-0 relative' // Specific style for confession
        : 'bg-neutral-900/90 border-l border-[#d89853]/30' // Standard style
        }`}
    >
      {/* Background texture for confession */}
      {node.id.includes('confession') && (
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-overlay" />
      )}

      {/* Header Area */}
      <div className={`p-8 border-b ${node.id.includes('confession') ? 'border-[#d89853]/20 bg-[#d89853]/5' : 'border-[#d89853]/20'}`}>
        <div className="flex items-center justify-between mb-2">
          {node.id.includes('confession') ? (
            <div className="flex items-center gap-4">
              <div className="border border-[#c85a3f] text-[#c85a3f] px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] uppercase rotate-[-2deg]">
                TOP SECRET
              </div>
              <span className="text-[10px] font-mono text-[#d89853]/60 uppercase tracking-widest">口供档案 #RC-7742</span>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-[#d89853]/60 uppercase tracking-widest">神经片段解析</span>
          )}

          {!node.id.includes('confession') && (
            <div className="flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.SURFACE ? 'bg-[#d89853]' : 'bg-[#d89853]/20'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.DEEP ? 'bg-[#c85a3f]' : 'bg-[#c85a3f]/20'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.CORE ? 'bg-red-600' : 'bg-red-600/20'}`} />
            </div>
          )}
        </div>
        <h2 className={`text-2xl font-bold tracking-tight mb-1 uppercase ${node.id.includes('confession') ? 'text-[#d89853] font-mono' : 'text-[#d89853] italic'}`}>
          {node.title}
        </h2>
        {!node.id.includes('confession') && <div className="text-xs text-[#d89853]/50 font-mono">STATUS: {node.currentLayer} VIEW</div>}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative z-10">
        {/* Content Rendering Switch */}
        {node.id.includes('confession') ? (
          // Redesigned: Fragmented Memory Layout
          <div className="relative h-full flex flex-col bg-black overflow-hidden group/confession">
            {/* Pronounced CRT Flicker & Scanlines Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Global High-Frequency Flicker */}
              <motion.div
                animate={isStabilized
                  ? { opacity: [0.03, 0.05, 0.02, 0.04] } // Calmer state
                  : { opacity: [0.08, 0.12, 0.05, 0.1, 0.07] } // Aggressive initial state
                }
                transition={{ repeat: Infinity, duration: isStabilized ? 0.3 : 0.12, ease: "linear" }}
                className="absolute inset-0 bg-white mix-blend-overlay z-[5]"
              />
              {/* Scrolling Scanline Effect */}
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#d89853]/5 to-transparent z-[4]"
              />
              {/* Static Grain Mask */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.15] mix-blend-overlay z-[3]" />

              {/* Atmospheric Glows */}
              <motion.div
                animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#d89853]/15 blur-[120px] rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.2, 1] }}
                transition={{ duration: 14, repeat: Infinity, delay: 2 }}
                className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#c85a3f]/10 blur-[150px] rounded-full"
              />
            </div>

            {/* Scrollable Fragment Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-4 md:px-12 py-16">
              <div className="relative max-w-2xl mx-auto pb-32">
                {[
                  node.layers[MemoryLayer.SURFACE].event,
                  node.layers[MemoryLayer.DEEP].event,
                  node.layers[MemoryLayer.CORE]?.event
                ].filter(Boolean).map((eventText, layerIndex) => {
                  const paragraphs = eventText.split('\n').filter(p => p.trim());

                  return paragraphs.map((text, pIndex) => {
                    const fragmentId = `${layerIndex}-${pIndex}`;
                    const seed = (layerIndex + 1) * (pIndex + 5);
                    const rotate = (seed % 6) - 3;
                    const offsetX = (seed % 30) - 15; // Slightly reduced offset to prevent clipping
                    const zIndex = 10 + layerIndex;

                    return (
                      <motion.div
                        key={fragmentId}
                        initial={{ opacity: 0, scale: 0.9, y: 50, rotate: rotate + 5, filter: 'blur(15px)' }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          rotate: rotate,
                          filter: isStabilized ? 'blur(0px) brightness(1)' : 'blur(5px) brightness(0.8)'
                        }}
                        transition={{
                          filter: { duration: 2, ease: "easeInOut" },
                          opacity: { delay: 0.1 + (layerIndex * 0.5) + (pIndex * 0.2), duration: 0.8 },
                          y: { delay: 0.1 + (layerIndex * 0.5) + (pIndex * 0.2), duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                          scale: { delay: 0.1 + (layerIndex * 0.5) + (pIndex * 0.2), duration: 1.2 },
                          rotate: { delay: 0.1 + (layerIndex * 0.5) + (pIndex * 0.2), duration: 1.2 }
                        }}
                        whileHover={{
                          scale: 1.04,
                          zIndex: 100,
                          rotate: 0,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        className="relative mb-16 p-8 bg-[#1a1410]/80 border border-[#d89853]/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group/fragment backdrop-blur-sm"
                        style={{
                          marginLeft: `${offsetX}px`,
                          transform: `rotate(${rotate}deg)`,
                          zIndex: zIndex
                        }}
                      >
                        {/* Fragment Decor */}
                        <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#d89853]/30" />
                        <div className="absolute top-0 left-0 w-[1px] h-8 bg-[#d89853]/30" />
                        <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#c85a3f]/20" />
                        <div className="absolute -top-3 -left-2 text-[10px] font-mono text-[#d89853]/20 select-none">
                          FRAGMENT_{fragmentId}
                        </div>

                        {/* Content with Keyword Highlighting */}
                        <p className="font-serif leading-relaxed text-lg text-[#d89853]/90 text-justify">
                          {text.split(new RegExp(`(${Object.keys(KEYWORD_MAP).join('|')})`, 'g')).map((part, j) => {
                            if (Object.keys(KEYWORD_MAP).includes(part)) {
                              if (!seenKeywords.has(part)) {
                                seenKeywords.add(part);
                                const isCollected = collectionEffects[part];
                                return (
                                  <span
                                    key={j}
                                    onClick={(e) => handleKeywordClick(e, part)}
                                    className={`
                                      cursor-pointer font-bold inline-block mx-1 relative
                                      ${isCollected
                                        ? 'text-white bg-[#c85a3f] px-1 animate-pulse shadow-lg scale-110'
                                        : 'text-[#c85a3f] border-b border-dashed border-[#c85a3f] hover:text-white transition-all underline-offset-4'
                                      }
                                  `}
                                  >
                                    {part}
                                    {/* Sparkle effect on collectable */}
                                    {!isCollected && (
                                      <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-1 -right-1"
                                      >
                                        <Sparkles size={8} />
                                      </motion.span>
                                    )}
                                  </span>
                                );
                              }
                            }
                            return <span key={j} className="opacity-90">{part}</span>;
                          })}
                        </p>

                        {/* Scribbled notes for deeper layers */}
                        {layerIndex > 0 && pIndex === paragraphs.length - 1 && (
                          <div className="mt-4 pt-4 border-t border-[#d89853]/5 italic text-sm text-[#c85a3f]/60 font-mono flex justify-between">
                            <span className="opacity-50">[TRUNCATED...]</span>
                            <span className="rotate-2">"难以找回的片段"</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  });
                })}

                {/* Special Case: Confession 6 Visual Signal */}
                {node.id === 'confession_6' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-16 p-8 bg-[#c85a3f]/5 border border-[#c85a3f]/20 rounded-sm relative overflow-hidden group/visual"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-50">
                      <AlertCircle size={16} className="text-[#c85a3f] animate-pulse" />
                    </div>

                    {!isVisualRevealed ? (
                      <div
                        className="cursor-pointer hover:bg-[#c85a3f]/10 p-4 rounded text-center transition-all group-hover/visual:scale-[1.01]"
                        onClick={() => setIsVisualRevealed(true)}
                      >
                        <p className="text-xs text-[#c85a3f] font-mono tracking-[0.3em] mb-3 animate-pulse">
                          [SYSTEM]: 侦测到残留视觉信号 (VISUAL TRACE)
                        </p>
                        <div className="inline-block border border-[#d89853]/40 px-6 py-2 text-sm text-[#d89853] hover:bg-[#d89853] hover:text-black transition-all font-bold">
                          解析视觉记忆块 {" >> "}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 animate-in fade-in zoom-in duration-1000">
                        <div className="flex items-center justify-between border-b border-[#c85a3f]/30 pb-2">
                          <span className="text-[10px] text-[#c85a3f] font-mono tracking-widest uppercase">Visual Artifact Extracted</span>
                          <div className="h-1 flex-1 mx-4 bg-[repeating-linear-gradient(90deg,#c85a3f,#c85a3f_2px,transparent_2px,transparent_4px)] opacity-20" />
                        </div>

                        <div
                          className="relative group/image cursor-pointer overflow-hidden border border-[#d89853]/20 shadow-2xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isImageCollected) setIsSelectingFolder(true);
                          }}
                        >
                          <img
                            src="/assets/iron_horse_beacon.jpg"
                            alt="Iron Horse Cigarettes"
                            className={`w-full h-auto object-cover grayscale brightness-50 group-hover/image:grayscale-0 group-hover/image:brightness-100 transition-all duration-1000 ${isImageCollected ? 'grayscale-0 brightness-110' : ''}`}
                          />

                          {/* Success Stamp */}
                          {isImageCollected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                initial={{ scale: 2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.8 }}
                                className="border-8 border-[#d89853] text-[#d89853] p-4 font-black text-4xl tracking-widest uppercase rotate-[-15deg] bg-black/40 backdrop-blur-sm mix-blend-screen"
                              >
                                ARCHIVED
                              </motion.div>
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 w-full bg-black/90 p-3 text-center transition-transform duration-500 translate-y-full group-hover/image:translate-y-0">
                            <span className="text-[10px] font-mono tracking-[0.4em] text-[#d89853]">
                              {isImageCollected ? '>> DATA PERMANENTLY STORED <<' : 'ADD TO CASE FOLDER (DOSSIER)'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Closing Signature / Seal */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-12 border-t border-dashed border-[#d89853]/20 max-w-lg mx-auto flex flex-col items-center text-center gap-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#d89853] blur-[40px] opacity-10 rounded-full" />
                  <div className="text-[10px] text-[#c85a3f]/60 font-mono tracking-[0.6em] mb-4">END_OF_TRANSCRIPT</div>
                  <div className="h-16 w-64 bg-[url('/assets/signature.png')] bg-contain bg-no-repeat bg-center opacity-70 grayscale contrast-150 mix-blend-lighten" />
                </div>
                <div className="text-[9px] text-[#d89853]/20 font-mono max-w-xs uppercase leading-loose italic">
                  These fragments were recovered via neural sync. Some data may remain inaccessible.
                  Memory integrity is currently at 14% and declining.
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Standard View for other nodes
          <>
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <Sparkles size={12} /> 客观事件
              </div>
              <p className="text-lg leading-relaxed text-neutral-200 font-serif">
                {current.event}
              </p>
            </section>

            <section className="space-y-4 bg-white/5 p-6 border-l border-white/20">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <Quote size={12} /> 卡彭的态度
              </div>
              <p className="italic text-neutral-400 text-sm">
                “{current.attitude}”
              </p>
            </section>

            {current.visual && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                    <Maximize2 size={12} /> 视觉残留
                  </div>
                </div>
                <div className="aspect-video relative rounded-sm overflow-hidden bg-black border border-neutral-800 group">
                  <img
                    src={current.visual}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-700"
                    alt="Neural Fragment"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>
              </section>
            )}
          </>
        )}

        {/* Shatter Mechanism */}
        {!node.id.includes('confession') && node.currentLayer !== MemoryLayer.CORE && (
          <div className="pt-8">
            <button
              onClick={() => onShatter(node.id)}
              className="w-full py-4 border border-dashed border-neutral-700 text-neutral-500 hover:text-white hover:border-white/50 transition-all rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em]"
            >
              <AlertCircle size={14} /> 发现关键线索：击碎当前层
            </button>
          </div>
        )}

        {/* Global Folder Selection Overlay for Confession Visuals */}
        <AnimatePresence>
          {isSelectingFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            >
              <div className="w-full max-w-sm bg-[#1a1410] border border-[#d89853]/40 p-6 shadow-2xl relative">
                <button
                  onClick={() => setIsSelectingFolder(false)}
                  className="absolute top-2 right-2 text-[#d89853]/40 hover:text-[#d89853]"
                >
                  <X size={16} />
                </button>

                <div className="text-center mb-6">
                  <h4 className="text-[#d89853] font-mono tracking-widest text-xs font-bold uppercase mb-1">选择归档目录</h4>
                  <p className="text-[#d89853]/40 text-[9px] uppercase tracking-tighter">SELECT TARGET CASE FILE FOR EVIDENCE</p>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
                  {collectedDossierIds
                    .filter(clueId => !!clueDisplayMap[clueId]) // STRICT: Only show if it has a valid mapping
                    .map(clueId => (
                      <button
                        key={clueId}
                        onClick={() => handleAttemptCollect(clueId)}
                        className="text-[10px] font-mono border border-[#d89853]/20 bg-[#d89853]/5 text-[#d89853]/80 p-3 rounded hover:bg-[#d89853]/20 hover:text-[#d89853] hover:border-[#d89853]/50 transition-all flex items-center gap-3 group/folder"
                      >
                        <Folder size={14} className="group-hover/folder:scale-110 transition-transform" />
                        <span className="truncate">{clueDisplayMap[clueId]}</span>
                      </button>
                    ))}
                  {collectedDossierIds.filter(clueId => !!clueDisplayMap[clueId]).length === 0 && (
                    <div className="text-center py-8 border border-dashed border-[#d89853]/10">
                      <p className="text-[#d89853]/30 text-[10px] uppercase font-mono tracking-widest">
                        暂无可用案卷文件夹<br />
                        <span className="text-[9px] opacity-50">NO OPEN FILES AVAILABLE</span>
                      </p>
                    </div>
                  )}
                </div>

                {collectionFeedback.msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-3 border text-center font-mono font-bold text-[10px] tracking-widest
                      ${collectionFeedback.type === 'success' ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}
                    `}
                  >
                    {collectionFeedback.msg}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div >
  );
};
