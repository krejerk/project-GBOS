
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryNode, MemoryLayer } from '../types';
import { Quote, Sparkles, AlertCircle, Maximize2 } from 'lucide-react';

interface NodeDetailProps {
  node: MemoryNode;
  onShatter: (id: string) => void;
  onCollectClue: (id: string, word: string) => void;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({ node, onShatter, onCollectClue }) => {
  const current = node.layers[node.currentLayer] || node.layers[MemoryLayer.SURFACE];
  const currentContent = node.layers[node.currentLayer];
  const canShatter = node.currentLayer !== MemoryLayer.CORE;
  const currentLayerNum = node.currentLayer === MemoryLayer.SURFACE ? 1 : node.currentLayer === MemoryLayer.DEEP ? 2 : 3;

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

  // Select keyword map based on node ID
  const KEYWORD_MAP = node.id === 'confession_4'
    ? CONFESSION_4_KEYWORDS
    : node.id === 'confession_3'
      ? CONFESSION_3_KEYWORDS
      : node.id === 'confession_2'
        ? CONFESSION_2_KEYWORDS
        : CONFESSION_1_KEYWORDS;

  // Track animation states for collected keywords
  const [collectionEffects, setCollectionEffects] = React.useState<Record<string, boolean>>({});

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

          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.SURFACE ? 'bg-[#d89853]' : 'bg-[#d89853]/20'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.DEEP ? 'bg-[#c85a3f]' : 'bg-[#c85a3f]/20'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${node.currentLayer === MemoryLayer.CORE ? 'bg-red-600' : 'bg-red-600/20'}`} />
          </div>
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
    </motion.div>
  );
};
