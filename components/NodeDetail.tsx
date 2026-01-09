
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
  clueDisplayMap?: Record<string, string>;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({
  node,
  onShatter,
  onCollectClue,
  onCollectAttachment,
  collectedDossierIds = [],
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

  // Select keyword map based on node ID
  const KEYWORD_MAP = node.id === 'confession_6'
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
  const [isImageCollected, setIsImageCollected] = React.useState(false);

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
          // Simplified Document View for Confession - "Raving Memoir" Style
          <div className="space-y-6 px-4 md:px-8 py-4 relative min-h-[60vh] flex flex-col justify-center">
            {/* Texture Overlays */}
            <div className="absolute inset-0 bg-cover opacity-10 mix-blend-color-burn pointer-events-none" style={{ backgroundImage: "url('/assets/noise.png')" }} />
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-900/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="font-serif leading-loose text-lg md:text-xl text-[#d89853]/90 relative z-10">
              {/* Timestamp / Header Scribble */}
              <div className="mb-8 rotate-1 opacity-70 flex justify-between items-end border-b-2 border-[#d89853]/10 pb-2">
                <span className="font-mono text-xs tracking-[0.3em]">REC_DATE: 1971_UNKNOWN</span>
                <span className="font-handwriting text-2xl text-[#c85a3f] font-bold">"我记得..."</span>
              </div>

              {[
                node.layers[MemoryLayer.SURFACE].event,
                node.layers[MemoryLayer.DEEP].event,
                node.layers[MemoryLayer.CORE]?.event
              ].filter(Boolean).join('\n\n').split('\n').map((line, i) => (
                <p
                  key={i}
                  className={`
                    mb-8 last:mb-0 text-justify relative
                    ${i % 2 === 0 ? 'pl-4 border-l-2 border-[#d89853]/20' : 'pr-4 text-right border-r-2 border-[#c85a3f]/20'}
                    ${i === 1 ? 'text-xl font-bold opacity-100 tracking-wide' : 'opacity-80'}
                  `}
                >
                  {line.split(new RegExp(`(${Object.keys(KEYWORD_MAP).join('|')})`, 'g')).map((part, j) => {
                    if (Object.keys(KEYWORD_MAP).includes(part)) {
                      if (!seenKeywords.has(part)) {
                        seenKeywords.add(part);
                        const isCollected = collectionEffects[part];
                        return (
                          <span
                            key={j}
                            onClick={(e) => handleKeywordClick(e, part)}
                            className={`
                                cursor-pointer font-bold inline-block transform hover:scale-110 transition-all duration-200
                                ${isCollected
                                ? 'text-white bg-[#c85a3f] px-1 animate-pulse shadow-lg rotate-2'
                                : 'text-[#c85a3f] border-b-2 border-[#c85a3f] hover:bg-[#c85a3f] hover:text-black skew-x-[-10deg]'
                              }
                            `}
                            title="点击收集线索"
                          >
                            {part}
                          </span>
                        );
                      }
                    }
                    return <span key={j} className="hover:text-white/80 transition-colors duration-500">{part}</span>;
                  })}
                </p>
              ))}

              {/* Visual Signal Extraction for Confession 6 */}
              {node.id === 'confession_6' && (
                <div className="mt-8 p-4 border border-[#c85a3f]/30 bg-[#c85a3f]/10 rounded relative overflow-hidden group/visual transition-all duration-500">
                  <div className="absolute top-0 right-0 p-2 opacity-50">
                    <AlertCircle size={16} className="text-[#c85a3f] animate-pulse" />
                  </div>

                  {!isVisualRevealed ? (
                    <div
                      className="cursor-pointer hover:bg-[#c85a3f]/10 p-2 rounded transition-colors"
                      onClick={() => setIsVisualRevealed(true)}
                    >
                      <p className="text-xs text-[#c85a3f] font-mono tracking-widest mb-2 animate-pulse">
                        [SYSTEM]: 侦测到残留视觉信号 / VISUAL TRACE DETECTED
                      </p>
                      <p className="text-sm text-[#d89853] underline decoration-dotted underline-offset-4 hover:text-white transition-colors">
                        {`>> 请求提取视觉信息 (EXTRACT VISUAL DATA) <<`}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="flex items-center justify-between border-b border-[#c85a3f]/30 pb-2">
                        <span className="text-[10px] text-[#c85a3f] font-mono tracking-widest">VISUAL_DATA_RECOVERED.JPG</span>
                        <span className="text-[10px] text-[#d89853]/50 font-mono">SIZE: 4.2MB</span>
                      </div>

                      <div
                        className="relative group/image cursor-pointer overflow-hidden border border-[#d89853]/20 hover:border-[#d89853] transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isImageCollected) {
                            setIsSelectingFolder(true);
                          }
                        }}
                      >
                        <img
                          src="/assets/iron_horse_beacon.jpg"
                          alt="Iron Horse Cigarettes"
                          className={`w-full h-auto object-cover grayscale brightness-75 contrast-125 group-hover/image:grayscale-0 group-hover/image:brightness-100 transition-all duration-700 ${isImageCollected ? 'grayscale-0 brightness-100 ring-2 ring-[#d89853]' : ''}`}
                        />

                        {/* Overlay Label */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm p-2 text-center transform translate-y-full group-hover/image:translate-y-0 transition-transform duration-300">
                          <span className={`text-xs font-mono tracking-widest ${isImageCollected ? 'text-[#d89853]' : 'text-white'}`}>
                            {isImageCollected ? '>> IMAGE ARCHIVED ON SERVER <<' : 'CLICK TO ARCHIVE TO DOSSIER'}
                          </span>
                        </div>

                        {/* Success Stamp */}
                        {isImageCollected && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-[#d89853] text-[#d89853] p-2 font-black text-xl tracking-[0.2em] rotate-[-12deg] opacity-80 mix-blend-screen whitespace-nowrap bg-black/50 backdrop-blur-sm">
                            FILED / 已归档
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Folder Selection Modal */}
                  <AnimatePresence>
                    {isSelectingFolder && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative w-full max-w-lg bg-[#0f0a0a] border border-[#d89853]/30 rounded-lg p-6 shadow-2xl">
                          <div className="text-center mb-6">
                            <h4 className="text-[#d89853] font-mono tracking-widest text-sm font-bold">SELECT TARGET CASE FILE</h4>
                            <p className="text-[#d89853]/40 text-[10px] uppercase">Where does this evidence belong?</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto custom-scrollbar p-1 mb-4">
                            {collectedDossierIds.map(clueId => (
                              <button
                                key={clueId}
                                onClick={() => handleAttemptCollect(clueId)}
                                className="text-[10px] font-mono border border-[#d89853]/20 bg-[#d89853]/5 text-[#d89853]/80 p-3 rounded hover:bg-[#d89853]/20 hover:text-[#d89853] hover:border-[#d89853]/50 transition-all truncate text-left flex items-center gap-2"
                              >
                                <Folder size={14} className="shrink-0" />
                                <span className="truncate">{clueDisplayMap[clueId] || clueId}</span>
                              </button>
                            ))}
                            {collectedDossierIds.length === 0 && (
                              <div className="col-span-2 text-center text-[#d89853]/30 text-xs py-4">
                                NO OPEN FILES AVAILABLE
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => setIsSelectingFolder(false)}
                            className="absolute top-2 right-2 text-[#d89853]/40 hover:text-[#d89853]"
                          >
                            <X size={16} />
                          </button>

                          {collectionFeedback.msg && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded border backdrop-blur-md shadow-lg font-mono font-bold tracking-widest text-xs z-50 whitespace-nowrap
                                            ${collectionFeedback.type === 'success' ? 'bg-green-900/90 border-green-500 text-green-100' : 'bg-red-900/90 border-red-500 text-red-100'}
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
              )}


              <div className="mt-12 pt-8 border-t border-double border-[#d89853]/30 flex flex-col items-end gap-2">
                <div className="text-right rotate-[-2deg]">
                  <div className="h-12 w-48 bg-[url('/assets/signature.png')] bg-contain bg-no-repeat bg-right opacity-80 mb-2 mix-blend-screen" />
                  <p className="text-sm text-[#c85a3f] font-bold tracking-widest font-mono">CONFESSION_VERIFIED</p>
                </div>
                <div className="text-[10px] text-[#d89853]/30 uppercase tracking-[0.5em]">Memory Integrity: Unstable</div>
              </div>
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
      </div>
    </motion.div >
  );
};
