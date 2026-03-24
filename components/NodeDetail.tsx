
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryNode, MemoryLayer } from '../types';
import { Quote, Sparkles, AlertCircle, Maximize2, Folder, FolderOpen, X } from 'lucide-react';
import { TextFragment } from './TextFragment';

interface NodeDetailProps {
  node: MemoryNode;
  onShatter: (id: string) => void;
  onCollectClue: (id: string, word: string) => void;
  onCollectAttachment?: (id: string) => void;
  collectedDossierIds?: string[];
  collectedAttachments?: string[];
  clueDisplayMap: Record<string, string>;
  onPersonaReboot?: () => void;
  hasSwitchedPersona?: boolean;
  unlockedPeople: string[];
  collectedClues: string[];
  collectedYears?: string[];
}

export const NodeDetail: React.FC<NodeDetailProps> = ({
  node,
  onShatter,
  onCollectClue,
  onPersonaReboot,
  onCollectAttachment,
  collectedDossierIds = [],
  collectedAttachments = [],
  clueDisplayMap,
  hasSwitchedPersona = false,
  unlockedPeople,
  collectedClues,
  collectedYears
}) => {
  // Safety: Fallback to SURFACE if current layer is missing (e.g. CORE not yet defined)
  const current = (node.layers[node.currentLayer] || node.layers[MemoryLayer.SURFACE])!;
  const canShatter = node.currentLayer !== MemoryLayer.CORE;

  const VisualShatter = () => {
    const shards = Array.from({ length: 16 });
    return (
      <div className={`relative py-24 my-12 border-y flex flex-col items-center justify-center overflow-hidden ${node.id.includes('confession') ? 'border-[var(--confess-border)] bg-gradient-to-b from-transparent via-[var(--confess-highlight)]/5 to-transparent' : 'border-[#d89853]/10 bg-gradient-to-b from-transparent via-red-950/5 to-transparent'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.2, 0.1, 0], scale: [0.8, 1.1, 1.2, 1.5] }}
          transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
          className={`${node.id.includes('confession') ? 'text-[var(--confess-highlight)]' : 'text-[#d89853]'} font-mono text-[120px] font-black tracking-tighter mix-blend-overlay absolute select-none blur-sm`}
        >
          AGENT
        </motion.div>

        {shards.map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 800,
              y: (Math.random() - 0.5) * 800,
              opacity: 0,
              rotate: Math.random() * 720 - 360,
              scale: Math.random() * 3 + 0.5
            }}
            transition={{ duration: 1.8, delay: 0.3 + (Math.random() * 0.4), ease: "easeOut" }}
            className={`absolute w-16 h-16 backdrop-blur-sm ${node.id.includes('confession') ? 'bg-[var(--confess-highlight)]/10 border border-[var(--confess-highlight)]/30' : 'bg-[#d89853]/20 border border-[#d89853]/40'}`}
            style={{
              clipPath: `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`,
              zIndex: 10
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className={`relative z-20 font-mono text-sm tracking-[0.4em] text-center px-4 ${node.id.includes('confession') ? 'text-[var(--confess-highlight)]' : 'text-[#c85a3f]'}`}
        >
          <div className={`p-4 border ${node.id.includes('confession') ? 'border-[var(--confess-border)] bg-[var(--confess-highlight)]/5' : 'border-[#c85a3f]/30 bg-[#c85a3f]/5'}`}>
            [ 核心身份文件已损毁 // INTERNAL_AGENT_PERSONA_PURGED ]
            <div className={`mt-3 h-[1px] w-full bg-gradient-to-r from-transparent ${node.id.includes('confession') ? 'via-[var(--confess-highlight)]/50' : 'via-[#c85a3f]/50'} to-transparent`} />
            <div className="mt-3 text-[10px] text-white/40 tracking-[0.2em] font-light">
              REMAINING MEMORY FRAGMENTS DECAYING...
            </div>

            {onPersonaReboot && node.id === 'confession_26' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                onClick={(e) => { e.stopPropagation(); onPersonaReboot(); }}
                className="mt-6 px-6 py-3 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 hover:border-red-500 text-red-500 font-mono text-[10px] tracking-widest transition-all animate-pulse"
              >
                检测到机体意识已准备好重启 {" >> "}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Cinematic Glitch Overlay for Shatter */}
        <motion.div
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 bg-red-600/10 mix-blend-screen pointer-events-none"
        />
      </div>
    );
  };

  // Folder Selection State
  const [isSelectingFolder, setIsSelectingFolder] = React.useState(false);
  const [collectionFeedback, setCollectionFeedback] = React.useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  const handleAttemptCollect = (targetClueId: string) => {
    if (
      targetClueId === 'graywater_beacon' || 
      (node.id === 'confession_16' && targetClueId === 'project') ||
      (node.id === 'confession_28' && targetClueId === 'project') ||
      (node.id === 'confession_29' && targetClueId === 'project') ||
      (node.id === 'confession_30' && (targetClueId === 'project' || targetClueId === 'pendant_photo')) ||
      (node.id === 'confession_31' && targetClueId === 'project')
    ) {
      if (onCollectAttachment) {
        if (node.id === 'confession_16') onCollectAttachment('record_of_accounts');
        else if (node.id === 'confession_28') onCollectAttachment('laguna_beach_visual_residue');
        else if (node.id === 'confession_29') onCollectAttachment('felipe_maldonado_poster');
        else if (node.id === 'confession_30') onCollectAttachment('pendant_photo');
        else if (node.id === 'confession_32') onCollectAttachment('libby_forest_map_residue');
        else if (node.id === 'confession_31') {
          onCollectAttachment('confession_31_residue');
        }
        else onCollectAttachment('graywater_beacon');
      }
      setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
      setTimeout(() => {
        setIsSelectingFolder(false);
        setCollectionFeedback({ type: null, msg: '' });
      }, 1500);
    } else {
      setCollectionFeedback({ type: 'error', msg: '归档失败：特征不匹配 // MISMATCH' });
      setTimeout(() => setCollectionFeedback({ type: null, msg: '' }), 2000);
    }
  };

  // Keyword Mappings
  const CONFESSION_1_KEYWORDS: Record<string, string> = {
    '康查尔': 'conchar',
    '尼比': 'nibi',
    '肉体关系': 'twisted_relationship',
    '扭曲关系': 'twisted_relationship',
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
    '扭曲关系': 'twisted_relationship',
    '1972': 'year_1972'
  };

  const CONFESSION_8_KEYWORDS: Record<string, string> = {
    '1973': 'year_1973',
    '朱莉': 'julie',
    '辛辛那提': 'cincinnati',
    '母亲': 'the_mother',
    '瓦妮莎': 'vanessa',
    '塞勒斯': 'silas',
    '赛勒斯': 'silas'
  };

  const CONFESSION_9_KEYWORDS: Record<string, string> = {
    '1982': 'year_1982',
    '埃尔帕索': 'el_paso',
    '朱维尔·钱伯斯': 'juvell_chambers',
    '1973': 'year_1973',
    '远亲': 'distant_relatives'
  };

  const CONFESSION_10_KEYWORDS: Record<string, string> = {
    '1973': 'year_1973',
    '鲍里斯·斯米尔诺夫': 'boris_smirnov'
  };

  const CONFESSION_11_KEYWORDS: Record<string, string> = {};

  const CONFESSION_12_KEYWORDS: Record<string, string> = {
    '杰西·潘尼': 'jc_penney',
    '杰西潘尼': 'jc_penney'
  };

  const CONFESSION_13_KEYWORDS: Record<string, string> = {
    '约翰·莫里西': 'john_morrissey',
    '混乱美学': 'chaos_aesthetics'
  };

  const CONFESSION_14_KEYWORDS: Record<string, string> = {
    '达文波特': 'davenport',
    '新计划': 'new_plan'
  };

  const CONFESSION_15_KEYWORDS: Record<string, string> = {
    '皮特·亨德森': 'peter_henderson',
    '彼特·亨德森': 'peter_henderson'
  };

  const CONFESSION_16_KEYWORDS: Record<string, string> = {
    '亚瑟·道森': 'arthur_dawson',
    '1967年': 'year_1967',
    '1967': 'year_1967'
  };

  const CONFESSION_17_KEYWORDS: Record<string, string> = {
    '里奇·德莱弗斯': 'richie_dreyfuss'
  };

  const CONFESSION_20_KEYWORDS: Record<string, string> = {
    '波特兰': 'portland',
    '软肋': 'achilles_heel'
  };

  const CONFESSION_21_KEYWORDS: Record<string, string> = {
    '红杉林': 'redwood_forest',
    '战俘营': 'pow_camp',
    '亚玛力人协议': 'amalekite_protocol'
  };

  const CONFESSION_22_KEYWORDS: Record<string, string> = {
    '圣芭芭拉': 'santa_barbara',
    '收网': 'closing_the_net',
    '什一税': 'tithe'
  };

  const CONFESSION_23_KEYWORDS: Record<string, string> = {
    '裸根': 'naked_root',
    '阿列克谢·罗科维奇': 'alexei',
    '拉古那海滩': 'laguna_beach'
  };

  const CONFESSION_24_KEYWORDS: Record<string, string> = {
    '莫兰迪': 'morandi',
    '阿尔伯克基市': 'albuquerque',
    '化学家情人': 'chemist_lover'
  };

  const CONFESSION_25_KEYWORDS: Record<string, string> = {
    '圣菲': 'santa_fe',
    '邦妮和克莱德': 'bonny_and_clyde'
  };

  const CONFESSION_26_KEYWORDS: Record<string, string> = {};

  const CONFESSION_27_KEYWORDS: Record<string, string> = {
    '米尔谷': 'mill_valley',
    '记者': 'reporter'
  };

  const CONFESSION_28_KEYWORDS: Record<string, string> = {
    '戈尔和列维探员': 'gore_and_levy'
  };

  const CONFESSION_29_KEYWORDS: Record<string, string> = {
    'FELIPE MALDONADO': 'felipe_maldonado',
    '费利佩·马尔多纳多': 'felipe_maldonado'
  };

  const CONFESSION_31_KEYWORDS: Record<string, string> = {
    '曼丹市': 'mandan'
  };

  const CONFESSION_30_KEYWORDS: Record<string, string> = {
    '威廉·道森': 'william_dawson',
    '威廉道森': 'william_dawson',
    '1967年': 'year_1967'
  };
  
  const CONFESSION_32_KEYWORDS: Record<string, string> = {
    '曼丹市': 'mandan',
    '森林地图': 'forest_map',
    '弗兰克·罗林斯': 'frank_rollins'
  };

  const KEYWORD_MAP = React.useMemo(() => {
    let baseMap = {};
    
    // Select base hardcoded map
    if (node.id === 'confession_1') baseMap = CONFESSION_1_KEYWORDS;
    else if (node.id === 'confession_2') baseMap = CONFESSION_2_KEYWORDS;
    else if (node.id === 'confession_3') baseMap = CONFESSION_3_KEYWORDS;
    else if (node.id === 'confession_4') baseMap = CONFESSION_4_KEYWORDS;
    else if (node.id === 'confession_5') baseMap = CONFESSION_5_KEYWORDS;
    else if (node.id === 'confession_6') baseMap = CONFESSION_6_KEYWORDS;
    else if (node.id === 'confession_7') baseMap = CONFESSION_7_KEYWORDS;
    else if (node.id === 'confession_8') baseMap = CONFESSION_8_KEYWORDS;
    else if (node.id === 'confession_9') baseMap = CONFESSION_9_KEYWORDS;
    else if (node.id === 'confession_10') baseMap = CONFESSION_10_KEYWORDS;
    else if (node.id === 'confession_11') baseMap = CONFESSION_11_KEYWORDS;
    else if (node.id === 'confession_12') baseMap = CONFESSION_12_KEYWORDS;
    else if (node.id === 'confession_13') baseMap = CONFESSION_13_KEYWORDS;
    else if (node.id === 'confession_14') baseMap = CONFESSION_14_KEYWORDS;
    else if (node.id === 'confession_15') baseMap = CONFESSION_15_KEYWORDS;
    else if (node.id === 'confession_16') baseMap = CONFESSION_16_KEYWORDS;
    else if (node.id === 'confession_17') baseMap = CONFESSION_17_KEYWORDS;
    else if (node.id === 'confession_20') baseMap = CONFESSION_20_KEYWORDS;
    else if (node.id === 'confession_21') baseMap = CONFESSION_21_KEYWORDS;
    else if (node.id === 'confession_22') baseMap = CONFESSION_22_KEYWORDS;
    else if (node.id === 'confession_23') baseMap = CONFESSION_23_KEYWORDS;
    else if (node.id === 'confession_24') baseMap = CONFESSION_24_KEYWORDS;
    else if (node.id === 'confession_25') baseMap = CONFESSION_25_KEYWORDS;
    else if (node.id === 'confession_26') baseMap = CONFESSION_26_KEYWORDS;
    else if (node.id === 'confession_27') baseMap = CONFESSION_27_KEYWORDS;
    else if (node.id === 'confession_28') baseMap = CONFESSION_28_KEYWORDS;
    else if (node.id === 'confession_29') baseMap = CONFESSION_29_KEYWORDS;
    else if (node.id === 'confession_30') baseMap = CONFESSION_30_KEYWORDS;
    else if (node.id === 'confession_31') baseMap = CONFESSION_31_KEYWORDS;
    else if (node.id === 'confession_32') baseMap = CONFESSION_32_KEYWORDS;

    // Merge with clueMap from node (data-driven)
    return { ...baseMap, ...node.clueMap };
  }, [node.id, node.clueMap]);

  const fragmentHighlightMap = React.useMemo(() => {
    const map: Record<string, Set<string>> = {};
    const globalSeen = new Set<string>();
    const processingLayers = [
      node.layers[MemoryLayer.SURFACE]?.event,
      node.layers[MemoryLayer.DEEP]?.event,
      node.layers[MemoryLayer.CORE]?.event
    ];

    processingLayers.forEach((eventText, layerIndex) => {
      if (!eventText) return;
      const paragraphs = eventText.split('\n').filter(p => p.trim());
      paragraphs.forEach((text, pIndex) => {
        const fragmentId = `${layerIndex}-${pIndex}`;
        const fragmentSet = new Set<string>();
        const keywords = Object.keys(KEYWORD_MAP).sort((a, b) => b.length - a.length);
        if (keywords.length > 0) {
          const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
          const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'g');
          const parts = text.split(regex);
          parts.forEach(part => {
            if (keywords.includes(part)) {
              if (!globalSeen.has(part)) {
                globalSeen.add(part);
                fragmentSet.add(part);
              }
            }
          });
        }
        map[fragmentId] = fragmentSet;
      });
    });
    return map;
  }, [node.layers, KEYWORD_MAP]);

  const [collectionEffects, setCollectionEffects] = React.useState<Record<string, boolean>>({});
  const [isVisualRevealed, setIsVisualRevealed] = React.useState(false);
  const [isLocketOpen, setIsLocketOpen] = React.useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = React.useState(false);
  const isImageCollected = React.useMemo(() => {
    if (node.id === 'confession_16') return collectedAttachments.includes('record_of_accounts');
    if (node.id === 'confession_28') return collectedAttachments.includes('laguna_beach_visual_residue');
    if (node.id === 'confession_29') return collectedAttachments.includes('felipe_maldonado_poster');
    if (node.id === 'confession_30') return collectedAttachments.includes('pendant_photo');
    if (node.id === 'confession_31') return collectedAttachments.includes('mandan_city_map');
    if (node.id === 'confession_32') return collectedAttachments.includes('libby_forest_map_residue');
    return collectedAttachments.includes('graywater_beacon');
  }, [node.id, collectedAttachments]);

  const renderEventText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\[.*?\]\(clue:.*?\))/g);
    return parts.map((part, index) => {
      const match = part && part.match(/\[(.*?)\]\(clue:(.*?)\)/);
      if (match) {
        const clueText = match[1];
        const clueId = match[2];
        return (
          <span 
            key={index}
            onClick={(e) => {
               e.stopPropagation();
               onCollectClue(clueId, clueText);
            }}
            className={`cursor-pointer transition-all duration-300 mx-0.5 px-0.5 rounded-sm flex-inline ${collectedClues.includes(clueId) ? 'text-[var(--bg-color)] bg-[var(--confess-highlight)] shadow-[0_0_8px_var(--confess-highlight)] font-bold' : 'text-[var(--confess-highlight)] border border-[var(--confess-highlight)]/30 hover:underline hover:bg-[var(--confess-highlight)]/10'}`}
          >
            {clueText}
          </span>
        );
      }
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

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
    setTimeout(() => {
      setCollectionEffects(prev => ({ ...prev, [word]: false }));
    }, 1000);
  };

  // Logic to determine if we use the "Reporter/Decayed" style or the "Police" style
  // Old confessions (1-26) keep the police style. Confession 27+ uses reporter style if switched.
  const isConfession = node.id.includes('confession');
  const confessionIdNum = parseInt(node.id.split('_')[1] || '0');
  const useReporterStyle = isConfession && hasSwitchedPersona && (confessionIdNum >= 27 || node.id === 'confession_27');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`h-full flex flex-col backdrop-blur-md overflow-hidden ${isConfession
        ? (useReporterStyle ? 'reporter-paper font-decayed shadow-2xl relative' : 'bg-[#1a1410] border border-[#d89853]/30 shadow-2xl relative')
        : 'bg-neutral-900/90 border-l border-[#d89853]/30'
        }`}
    >
      {node.id.includes('confession') && (
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] mix-blend-overlay" />
      )}

      <div className={`p-4 border-b ${node.id.includes('confession') ? 'border-[var(--confess-border)] bg-[var(--confess-surface)]' : 'border-[#d89853]/20'}`}>
        <div className="flex items-center justify-between mb-1.5">
          {isConfession ? (
            <div className="flex items-center gap-3">
              <div className={`border px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] uppercase ${useReporterStyle ? 'border-reporter-highlight text-reporter-highlight opacity-80' : 'border-[var(--confess-highlight)] text-[var(--confess-highlight)]'}`}>
                {useReporterStyle ? 'CORRUPTED MEMORY / RE-ARCHIVED' : 'DEEP SUBCONSCIOUS'}
              </div>
              <span className={`text-[9px] font-mono uppercase tracking-widest ${useReporterStyle ? 'text-[#d89853]/40' : 'text-[var(--confess-text)]/60'}`}>
                {useReporterStyle ? '神经区块 #ERR-REPORTER-27' : '神经区块 #RC-7742'}
              </span>
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
        <h2 className={`text-xl font-bold tracking-tight uppercase font-mono ${isConfession ? (useReporterStyle ? 'text-[#d89853] shadow-[0_2px_4px_rgba(0,0,0,0.5)] italic' : 'text-[var(--confess-text)]') : 'text-[#d89853] italic'}`}>
          {node.title}
        </h2>
        {!node.id.includes('confession') && <div className="text-xs text-[#d89853]/50 font-mono">STATUS: {node.currentLayer} VIEW</div>}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative z-10">
        {isConfession ? (
          <div className={`relative h-full flex flex-col overflow-hidden group/confession rounded-sm border ${useReporterStyle ? 'bg-transparent border-transparent shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]' : 'bg-[var(--confess-bg)] border-[var(--confess-border)]'}`}>
            {/* Global CRT overlay applied over the entire confession reader */}
            <div className="crt-overlay" />

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Subtle Global Glow/Stabilization Phase */}
              <motion.div
                animate={{
                  opacity: isStabilized ? [0.01, 0.03, 0.01] : [0.03, 0.06, 0.03]
                }}
                transition={{ repeat: Infinity, duration: isStabilized ? 3 : 1, ease: "easeInOut" }}
                className="absolute inset-0 bg-white mix-blend-overlay z-[5]"
              />
              {/* Scanning Line Effect */}
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="absolute inset-x-0 h-[30%] bg-gradient-to-b from-transparent via-[var(--confess-highlight)]/10 to-transparent z-[4] opacity-30 mix-blend-screen"
              />
            </div>

            {/* Stabilization Progress Overlay */}
            <AnimatePresence>
              {!isStabilized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 right-0 p-4 z-20 pointer-events-none"
                >
                  <div className="flex items-center gap-2 text-[8px] font-mono text-[var(--confess-highlight)] tracking-widest uppercase opacity-80">
                    <motion.div
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-1 h-1 bg-[var(--confess-highlight)] rounded-full shadow-[0_0_5px_var(--confess-highlight)]"
                    />
                    Scanning deep memory...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-4 md:px-12 py-10 md:py-16 will-change-transform">
              <div className="relative max-w-2xl mx-auto pb-32">
                {[
                  node.layers[MemoryLayer.SURFACE].event,
                  node.layers[MemoryLayer.DEEP].event,
                  node.layers[MemoryLayer.CORE]?.event
                ].filter(Boolean).map((eventText, layerIndex) => {
                  const paragraphs = eventText.split('\n').filter(p => p.trim());
                  return paragraphs.map((text, pIndex) => (
                    text === "[SHATTER_TRIGGER]" ? (
                      <VisualShatter key={`${layerIndex}-${pIndex}`} />
                    ) : (
                      <TextFragment
                        key={`${layerIndex}-${pIndex}`}
                        text={text}
                        layerIndex={layerIndex}
                        pIndex={pIndex}
                        isStabilized={isStabilized}
                        keywordMap={KEYWORD_MAP}
                        highlightKeywords={fragmentHighlightMap[`${layerIndex}-${pIndex}`] || new Set()}
                        collectionEffects={collectionEffects}
                        useReporterStyle={useReporterStyle}
                        onKeywordClick={handleKeywordClick}
                      />
                    )
                  ));
                })}

                {node.id === 'confession_6' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                      >
                        <img src={`${import.meta.env.BASE_URL}assets/iron_horse_beacon.jpg`} className={`w-full h-auto grayscale brightness-50 mix-blend-screen ${isImageCollected ? 'grayscale-0 brightness-110' : ''}`} />
                        {isImageCollected && <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-80 rotate-[-15deg]">ARCHIVED</div>}
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_16' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                      >
                        <img src={`${import.meta.env.BASE_URL}assets/record_of_accounts.jpg`} className={`w-full h-auto grayscale brightness-50 mix-blend-screen ${isImageCollected ? 'grayscale-0 brightness-110' : ''}`} />
                        {isImageCollected && <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-80 rotate-[-15deg]">ARCHIVED</div>}
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_28' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div
                        className="relative cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                      >
                        <img src={`${import.meta.env.BASE_URL}assets/laguna_beach_visual_residue.png`} className={`w-full h-auto grayscale brightness-50 mix-blend-screen ${isImageCollected ? 'grayscale-0 brightness-110' : ''}`} />
                        {isImageCollected && <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-80 rotate-[-15deg]">ARCHIVED</div>}
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_29' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div className="relative">
                          <motion.div
                            initial={{ scale: 1.05, filter: 'blur(8px) brightness(1.5)', opacity: 0 }}
                            animate={{ scale: 1, filter: 'blur(0px) brightness(1)', opacity: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="neural-residue-container w-full h-full flex items-center justify-center p-4"
                            onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                          >
                            <img 
                              src={`${import.meta.env.BASE_URL}assets/felipe_maldonado_poster.jpg`} 
                              className={`w-full h-auto grayscale brightness-75 contrast-125 mix-blend-screen transition-all duration-1000 ${isImageCollected ? 'grayscale-0 brightness-110 scale-105' : 'hover:scale-102 hover:brightness-90 opacity-80'}`} 
                              alt="Felipe Maldonado Poster"
                            />
                            
                            {/* CRT/Memory Effects Overlay */}
                            <div className="crt-overlay absolute inset-0 pointer-events-none opacity-30"></div>
                            <div className="bg-vignette absolute inset-0 pointer-events-none"></div>
                            
                            {/* Neural Noise & Interference */}
                            <div className="neural-residue-noise"></div>
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--confess-highlight)]/5 to-transparent h-[20%] w-full animate-signal-interference"></div>
                            
                            {isImageCollected && <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-60 rotate-[-15deg] pointer-events-none z-10">ARCHIVED</div>}
                          </motion.div>
                        <div className="text-[10px] text-[var(--confess-highlight)]/60 font-mono tracking-widest text-center italic mt-4 px-4 py-2 border-t border-[var(--confess-border)]/30">
                          这是一张<span 
                            onClick={(e) => { e.stopPropagation(); onCollectClue('felipe_maldonado', '费利佩·马尔多纳多'); }}
                            className={`cursor-pointer transition-all duration-300 mx-0.5 px-0.5 rounded-sm ${unlockedPeople.includes('felipe_maldonado') ? 'text-white bg-[var(--confess-highlight)] shadow-[0_0_8px_var(--confess-highlight)] font-bold' : 'text-[var(--confess-highlight)] hover:underline hover:bg-[var(--confess-highlight)]/10'}`}
                          >费利佩·马尔多纳多</span>与乐队在俄勒冈尤金大厅的演出海报。
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_30' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 p-4 md:p-12 bg-black/40 border border-[var(--confess-border)]/10 rounded-sm relative overflow-visible group/visual min-h-[500px] flex flex-col items-center justify-center cursor-default"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-6 text-center border-2 border-dashed border-[var(--confess-border)]/30 rounded-lg transition-all" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.4em] mb-4 uppercase opacity-80 animate-pulse">DETECTED: HIGH_FIDELITY_VISUAL_ARTIFACT</p>
                        <div className="bg-[var(--confess-highlight)] text-black px-8 py-3 text-sm font-black tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_20px_var(--confess-highlight)]">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div className="relative w-full flex flex-col items-center">
                        {/* High-Fidelity Realistic Locket System */}
                        <div className="locket-realistic-system mb-12">
                          <motion.div 
                            className="locket-base-image"
                            initial={{ rotateX: 20, opacity: 0 }}
                            animate={{ rotateX: 5, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          >
                            {/* Photo Overlay in the right chamber */}
                            <div className="locket-photo-area" onClick={() => setIsPhotoFlipped(!isPhotoFlipped)}>
                              <motion.div 
                                className="locket-photo-content"
                                style={{ transform: isPhotoFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                              >
                                {/* Front Face */}
                                <div className="locket-photo-face front">
                                  <img 
                                    src={`${import.meta.env.BASE_URL}assets/william_dawson_portrait.png`} 
                                    className="locket-inner-image" 
                                    alt="William and Son Portrait"
                                  />
                                  <div className="locket-glass-sheen"></div>
                                </div>
                                
                                {/* Back Face */}
                                <div className="locket-photo-face back">
                                  <img 
                                    src={`${import.meta.env.BASE_URL}assets/william_dawson_inscription.png`} 
                                    className="locket-inner-image" 
                                    alt="William and Son Inscription"
                                  />
                                  <div className="locket-glass-sheen"></div>
                                </div>
                              </motion.div>
                            </div>

                            <div className="locket-instruction">● CLICK_PHOTO_TO_FLIP</div>
                          </motion.div>

                          {/* Collection Action */}
                          {!isImageCollected && (
                            <motion.button 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              onClick={(e) => { e.stopPropagation(); setIsSelectingFolder(true); }}
                              className="absolute -bottom-8 px-5 py-2 bg-[var(--confess-highlight)] text-black text-[10px] font-bold tracking-[0.2em] uppercase hover:scale-105 transition-all flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-20"
                            >
                              <Folder size={12} /> ARCHIVE_ARTIFACT_DATA
                            </motion.button>
                          )}
                        </div>

                        <div className="w-full text-[12px] text-[var(--confess-highlight)]/80 font-mono tracking-[0.2em] text-center italic leading-relaxed px-10 py-8 border-t border-[var(--confess-border)]/20 bg-black/60 rounded-b-lg">
                          照片背面用钢笔写着<span 
                            onClick={(e) => { e.stopPropagation(); onCollectClue('william_dawson', '威廉·道森'); }}
                            className={`cursor-pointer transition-all duration-300 mx-2 px-2 py-0.5 rounded-sm border ${unlockedPeople.includes('william_dawson') ? 'text-white bg-[var(--confess-highlight)] border-[var(--confess-highlight)] shadow-[0_0_15px_var(--confess-highlight)] font-bold' : 'text-[var(--confess-highlight)] border-[var(--confess-highlight)]/30 hover:bg-[var(--confess-highlight)]/20 shadow-sm'}`}
                          >威廉·道森</span>和儿子
                          
                          {isImageCollected && (
                            <div className="mt-5 flex items-center justify-center gap-3 text-[10px] text-green-500/70 tracking-[0.4em] font-bold">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              DATA_ARCHIVED_SUCCESSFULLY
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_32' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号 [MANDAN_RV // I-94]</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 1.05, filter: 'blur(8px) brightness(1.5)', opacity: 0 }}
                          animate={{ scale: 1, filter: 'blur(0px) brightness(1)', opacity: 1 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="w-full relative cursor-pointer overflow-hidden border border-[var(--confess-border)]/30 rounded-sm"
                          onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                        >
                          <img 
                            src={`${import.meta.env.BASE_URL}assets/confession_32_vanessa_sketch.png`} 
                            className={`w-full h-auto object-cover transition-all duration-1000 ${isImageCollected ? 'grayscale-0 brightness-110' : 'grayscale brightness-75 contrast-125'}`} 
                            alt="Vanessa Leaving Sketch"
                          />
                          <div className="crt-overlay absolute inset-0 pointer-events-none opacity-20"></div>
                          <div className="bg-vignette absolute inset-0 pointer-events-none"></div>
                          
                          {isImageCollected && !hasSwitchedPersona && (
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-50 rotate-[-15deg] pointer-events-none z-10 select-none">ARCHIVED</div>
                          )}
                        </motion.div>

                        <div className="text-[10px] text-[var(--confess-highlight)]/60 font-mono tracking-widest text-center italic mt-4 px-4 py-2 border-t border-[var(--confess-border)]/30 leading-relaxed">
                          <span onClick={(e) => { e.stopPropagation(); onCollectClue('year_1977', '1977'); }} className={`cursor-pointer transition-all duration-300 mx-0.5 px-0.5 rounded-sm flex-inline ${collectedYears?.includes('year_1977') ? 'text-white bg-[var(--confess-highlight)] shadow-[0_0_8px_var(--confess-highlight)] font-bold' : 'text-[var(--confess-highlight)] border border-[var(--confess-highlight)]/30 hover:underline hover:bg-[var(--confess-highlight)]/10'}`}>1977</span>年8月清晨，瓦妮莎离开房车徒步前往图森市，卡彭或许从未亲眼目睹这个画面，但从他的衣服内衬里，我们发现了这张画在烟盒背面的简笔画。
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {node.id === 'confession_31' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-16 p-8 bg-[var(--confess-highlight)]/5 border border-[var(--confess-border)] rounded-sm relative overflow-hidden group/visual"
                  >
                    {!isVisualRevealed ? (
                      <div className="cursor-pointer hover:bg-[var(--confess-highlight)]/10 p-4 text-center" onClick={() => setIsVisualRevealed(true)}>
                        <p className="text-xs text-[var(--confess-highlight)] font-mono tracking-[0.3em] mb-3 uppercase opacity-80">[SYSTEM]: 侦测到残留视觉信号 [HUMPHREY // MAINE]</p>
                        <div className="border border-[var(--confess-border)] px-6 py-2 text-sm text-[var(--confess-highlight)] font-bold">解析视觉记忆块 {" >> "}</div>
                      </div>
                    ) : (
                      <div className="relative">
                        <motion.div
                          initial={{ scale: 1.05, filter: 'blur(8px) brightness(1.5)', opacity: 0 }}
                          animate={{ scale: 1, filter: 'blur(0px) brightness(1)', opacity: 1 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="w-full relative cursor-pointer overflow-hidden border border-[var(--confess-border)]/30 rounded-sm"
                          onClick={(e) => { e.stopPropagation(); if (!isImageCollected) setIsSelectingFolder(true); }}
                        >
                          <img 
                            src={`${import.meta.env.BASE_URL}assets/confession_31_residue_custom.jpg`} 
                            className={`w-full h-auto object-cover transition-all duration-1000 ${isImageCollected ? 'grayscale-0 brightness-110' : 'grayscale brightness-75 contrast-125'}`} 
                            alt="Humphrey Prison Memory"
                          />
                          <div className="crt-overlay absolute inset-0 pointer-events-none opacity-20"></div>
                          <div className="bg-vignette absolute inset-0 pointer-events-none"></div>
                          
                          {isImageCollected && !hasSwitchedPersona && (
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-black text-4xl text-[var(--confess-highlight)] opacity-50 rotate-[-15deg] pointer-events-none z-10 select-none">ARCHIVED</div>
                          )}
                        </motion.div>

                        <div className="text-[10px] text-[var(--confess-highlight)]/60 font-mono tracking-widest text-center italic mt-4 px-4 py-2 border-t border-[var(--confess-border)]/30 leading-relaxed">
                          卡彭记忆中残留着房车的内部景象，可以看到右上角的墙面上贴着一张利比镇的<span 
                            onClick={(e) => { e.stopPropagation(); onCollectClue('forest_map', '森林地图'); }}
                            className={`cursor-pointer transition-all duration-300 mx-0.5 px-0.5 rounded-sm flex-inline ${collectedClues.includes('forest_map') ? 'text-white bg-[var(--confess-highlight)] shadow-[0_0_8px_var(--confess-highlight)] font-bold' : 'text-[var(--confess-highlight)] border border-[var(--confess-highlight)]/30 hover:underline hover:bg-[var(--confess-highlight)]/10'}`}
                          >森林地图</span>。
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-20 pt-12 border-t border-dashed border-[#d89853]/20 flex flex-col items-center gap-6"
                >
                  <div className="text-[10px] text-[#c85a3f]/60 font-mono tracking-[0.6em]">END_OF_TRANSCRIPT</div>
                  <div className={`h-16 w-64 bg-[url('${import.meta.env.BASE_URL}assets/signature.png')] bg-contain bg-no-repeat bg-center opacity-70 ${useReporterStyle ? 'grayscale contrast-125 brightness-50 sepia-[.8] hue-rotate-[15deg] blur-[0.3px]' : 'mix-blend-lighten'}`} />
                </motion.div>

              </div>
            </div>
          </div>
        ) : (
          <>
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <Sparkles size={12} /> 客观事件
              </div>
              <p className="text-lg leading-relaxed text-neutral-200 font-serif">{renderEventText(current.event)}</p>
            </section>
            <section className="space-y-4 bg-white/5 p-6 border-l border-white/20">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                <Quote size={12} /> 卡彭的态度
              </div>
              <p className="italic text-neutral-400 text-sm">“{current.attitude}”</p>
            </section>
            {current.visual && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  <Maximize2 size={12} /> 视觉残留
                </div>
                <div className="aspect-video relative rounded-sm overflow-hidden bg-black border border-neutral-800">
                  <img
                    src={current.visual}
                    className={`h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 max-w-none ${current.visual.includes('capone-split-personality') ? 'w-[200%]' : 'w-full'}`}
                    style={current.visual.includes('capone-split-personality') ? {
                      transform: hasSwitchedPersona ? 'translateX(-50%)' : 'translateX(0)',
                      objectPosition: 'center 20%'
                    } : {}}
                    alt="Visual Residue"
                  />
                </div>
              </section>
            )}
            {!node.id.includes('confession') && node.currentLayer !== MemoryLayer.CORE && (
              <div className="pt-8">
                <button
                  onClick={() => onShatter(node.id)}
                  className="w-full py-4 border border-dashed border-neutral-700 text-neutral-500 hover:text-white transition-all text-xs uppercase tracking-[0.2em]"
                >
                  SHATTER NEURAL LAYER {" >> "}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {isSelectingFolder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm space-y-8">
              <div className={`flex justify-between items-center border-b pb-4 ${node.id.includes('confession') ? 'border-[var(--confess-border)]' : 'border-[#d89853]/20'}`}>
                <h3 className={`font-mono text-sm tracking-widest ${node.id.includes('confession') ? 'text-[var(--confess-highlight)]' : 'text-[#d89853]'}`}>SELECT ARCHIVE FOLDER</h3>
                <button onClick={() => setIsSelectingFolder(false)} className={`${node.id.includes('confession') ? 'text-[var(--confess-highlight)]/40 hover:text-[var(--confess-highlight)]' : 'text-[#d89853]/40 hover:text-[#d89853]'}`}><X size={16} /></button>
              </div>
              <div className="grid gap-3">
                {collectedDossierIds.map(clueId => (
                  <button
                    key={clueId}
                    onClick={() => handleAttemptCollect(clueId)}
                    className={`flex items-center gap-4 border p-4 transition-all text-left group ${node.id.includes('confession') ? 'bg-[var(--confess-highlight)]/5 border-[var(--confess-border)] hover:bg-[var(--confess-highlight)]/10 text-[var(--confess-highlight)]' : 'bg-[#d89853]/5 border-[#d89853]/20 hover:bg-[#d89853]/10 text-[#d89853]'}`}
                  >
                    <Folder className={`${node.id.includes('confession') ? 'text-[var(--confess-highlight)]' : 'text-[#d89853]'} group-hover:scale-110 transition-transform`} />
                    <span className={`font-mono text-xs truncate ${node.id.includes('confession') ? 'text-[var(--confess-highlight)]' : 'text-[#d89853]'}`}>{clueDisplayMap[clueId]}</span>
                  </button>
                ))}
              </div>
              {collectionFeedback.msg && (
                <div className={`p-4 border font-mono text-[10px] tracking-widest ${collectionFeedback.type === 'success' ? 'bg-green-900/10 border-green-500 text-green-400' : 'bg-red-900/10 border-red-500 text-red-400'}`}>
                  {collectionFeedback.msg}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
