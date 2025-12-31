import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MemoryNode } from '../types';
import { X } from 'lucide-react';

interface MindMapProps {
  nodes?: MemoryNode[];
  unlockedPeople?: string[];
}

interface HoneycombCell {
  id: string;
  cellNumber: number;
  x: number;
  y: number;
  characterId?: string;
  height: number;
}

// Character Impressions from Robert Capone's perspective
const CHARACTER_IMPRESSIONS: Record<string, { name: string; role: string; impression: string }> = {
  father: {
    name: '父亲',
    role: '核心',
    impression: '一切的源头。我甚至不确定是否该称呼他为"父亲"。他的存在本身就是一种扭曲，一个巨大的引力场，吞噬着周围的一切。我能感受到他留下的痕迹，但我看不清他的真实面目。'
  },
  capone: {
    name: '罗伯特·卡彭',
    role: '我',
    impression: '我是谁？这个问题的答案每天都在变化。我是潜入者，是观察者，还是被观察的对象？记忆碎片在脑海中旋转，有时我甚至分不清哪些是真实的，哪些是植入的。'
  },
  conchar: {
    name: '康查尔',
    role: '长子',
    impression: '冷静，精确，完美。他从不犯错，或者说即便犯错也能瞬间修正。与他交谈就像对着一面精密的镜子，你看到的永远是他希望你看到的样子。父亲的得力助手，也许也是他最忠诚的囚徒。'
  },
  nibi: {
    name: '尼比',
    role: '执行者',
    impression: '沉默如深渊。尼比从不多言，但每一次行动都如同手术刀般精准。我见过他的眼神——那是纯粹的空洞，仿佛灵魂早已在某个仪式中被抽离。他与康查尔之间有种难以言喻的纽带，也许那不是信任，而是某种更深层的共生。'
  },
  unknown_1: {
    name: '???',
    role: '未解锁',
    impression: '记忆中的影子。我能感觉到某个人物的轮廓，但每当试图聚焦，画面就变得模糊。也许随着调查的深入，这个谜团会逐渐浮现。'
  },
  unknown_2: {
    name: '???',
    role: '未解锁',
    impression: '碎片之间的空白。某个重要的存在被刻意抹去，或是我的认知本身存在缺陷？'
  },
  unknown_3: {
    name: '???',
    role: '未解锁',
    impression: '遗忘的角落。在深层记忆中，有一个模糊的身影，但我无法触及。'
  },
  unknown_4: {
    name: '???',
    role: '未解锁',
    impression: '待解密的档案。线索还不够，无法重构这个人的真实身份。'
  },
  unknown_5: {
    name: '???',
    role: '未解锁',
    impression: '记忆迷雾中的幽灵。也许永远不会浮现，也许就在下一秒。'
  },
};

// Character cell mapping - spread across screen
const CHARACTER_CELL_MAP: Record<number, string> = {
  14: 'father',      // Center
  20: 'capone',      // Lower center
  8: 'conchar',      // Upper right
  16: 'nibi',        // Right
  5: 'unknown_1',    // Upper left
  24: 'unknown_2',   // Bottom right
  10: 'unknown_3',   // Left center
  28: 'unknown_4',   // Bottom
  3: 'unknown_5',    // Top
};

// Generate expanded grid (35 cells for better coverage)
const generateHoneycombGrid = (): HoneycombCell[] => {
  const cells: HoneycombCell[] = [];
  let cellNumber = 1;

  const pattern = [
    { row: 0, cols: [0, 1, 2, 3, 4, 5] },
    { row: 1, cols: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5] },
    { row: 2, cols: [0, 1, 2, 3, 4, 5] },
    { row: 3, cols: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5] },
    { row: 4, cols: [0, 1, 2, 3, 4, 5] },
    { row: 5, cols: [0.5, 1.5, 2.5, 3.5, 4.5] },
  ];

  pattern.forEach(({ row, cols }) => {
    cols.forEach(col => {
      const characterId = CHARACTER_CELL_MAP[cellNumber];

      let height = 140;
      if (characterId === 'father') height = 240;
      else if (characterId === 'capone') height = 200;
      else if (characterId === 'conchar') height = 220;
      else if (characterId === 'nibi') height = 210;
      else if (characterId) height = 180;
      else height = 120 + Math.random() * 60;

      cells.push({
        id: `cell_${cellNumber.toString().padStart(2, '0')}`,
        cellNumber,
        x: col,
        y: row,
        characterId,
        height,
      });

      cellNumber++;
    });
  });

  return cells;
};

const CELLS = generateHoneycombGrid();

export const MindMap: React.FC<MindMapProps> = ({ unlockedPeople = [] }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const isVisible = (cell: HoneycombCell) => {
    if (!cell.characterId) return true;
    if (cell.characterId === 'father' || cell.characterId === 'capone') return true;
    return unlockedPeople.includes(cell.characterId);
  };

  const isCharacterCell = (cell: HoneycombCell) => !!cell.characterId;

  const handleCellClick = (cell: HoneycombCell) => {
    if (cell.characterId && isVisible(cell)) {
      setSelectedCharacter(cell.characterId);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#1a1614] overflow-hidden font-mono">
      {/* Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2422] to-[#1a1614]" />
      </div>

      {/* Full-Screen Hexagonal Grid */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-8">
        <div className="relative w-full h-full flex items-center justify-center">
          {CELLS.map((cell) => {
            const visible = isVisible(cell);
            const isCharacter = isCharacterCell(cell);
            const isFather = cell.characterId === 'father';

            const hexSize = 85;
            const xOffset = (cell.x - 2.5) * hexSize * 0.866;
            const yOffset = (cell.y - 2.5) * hexSize * 0.75;

            const depthOpacity = Math.min(1, cell.height / 240);
            const shadowSize = cell.height / 12;

            return (
              <motion.div
                key={cell.id}
                className="absolute"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: cell.cellNumber * 0.008 }}
              >
                <div className="relative">
                  <div
                    onClick={() => handleCellClick(cell)}
                    className={`
                      relative transition-all duration-700
                      ${visible && isCharacter ? 'cursor-pointer hover:scale-110' : ''}
                      ${visible && isCharacter
                        ? 'bg-gradient-to-br from-[#5a5543]/50 via-[#4a4543]/40 to-[#3a3533]/30'
                        : 'bg-gradient-to-br from-[#2a2422]/30 via-[#1a1614]/20 to-[#0a0808]/15'
                      }
                    `}
                    style={{
                      width: `${hexSize}px`,
                      height: `${hexSize}px`,
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                      filter: `drop-shadow(0 ${shadowSize}px ${shadowSize * 2}px rgba(0,0,0,${0.4 + depthOpacity * 0.4}))`,
                      border: visible && isCharacter
                        ? '3px solid rgba(216, 152, 83, 0.6)'
                        : '1px solid rgba(58, 53, 51, 0.4)',
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: visible && isCharacter
                          ? `radial-gradient(circle at 50% 30%, rgba(216,152,83,0.25), transparent 70%)`
                          : `radial-gradient(circle at 50% 50%, rgba(26,22,20,0.3), transparent)`,
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                      }}
                    />

                    <div
                      className="absolute inset-0 opacity-15 mix-blend-multiply"
                      style={{
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(58,53,51,0.5) 4px, rgba(58,53,51,0.5) 8px)',
                        clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      {visible && isCharacter && cell.characterId ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <div className={`font-bold ${isFather ? 'text-2xl' : 'text-xl'} text-[#d89853] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                            {CHARACTER_IMPRESSIONS[cell.characterId].name.charAt(0)}
                          </div>
                        </div>
                      ) : !isCharacter ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-[#1a1614]/40 rounded-full" />
                        </div>
                      ) : null}
                    </div>

                    <div className="absolute bottom-1 right-1.5 text-[8px] font-mono text-[#d89853]/20 font-bold">
                      {cell.cellNumber.toString().padStart(2, '0')}
                    </div>

                    {visible && isCharacter && (
                      <div
                        className="absolute inset-0 opacity-70 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(216,152,83,0.2) 0%, transparent 70%)',
                          filter: 'blur(12px)',
                          transform: 'scale(1.2)',
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Character Detail Modal */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-8"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-gradient-to-br from-[#2a2422]/80 to-[#1a1614]/80 border-2 border-[#d89853]/40 rounded-lg p-8 backdrop-blur-xl"
            >
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-4 right-4 p-2 text-[#d89853]/60 hover:text-[#d89853] transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <div className="text-center space-y-2 border-b border-[#d89853]/20 pb-4">
                  <h2 className="text-4xl font-bold text-[#d89853]">
                    {CHARACTER_IMPRESSIONS[selectedCharacter].name}
                  </h2>
                  <div className="text-sm text-[#c85a3f]/80 tracking-widest uppercase">
                    {CHARACTER_IMPRESSIONS[selectedCharacter].role}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs text-[#d89853]/60 tracking-[0.3em] uppercase">
                    [ ROBERT CAPONE 的印象记录 ]
                  </div>
                  <p className="text-[#d89853]/90 leading-relaxed text-base font-light">
                    {CHARACTER_IMPRESSIONS[selectedCharacter].impression}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d89853]/10 text-center">
                  <div className="text-[10px] text-[#c85a3f]/40 font-mono tracking-widest">
                    CLASSIFIED // EYES ONLY
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-8 left-8 text-[#d89853]/30 font-mono text-[10px] tracking-[0.25em] z-30">
        <div>FULL COVERAGE ANALYSIS</div>
        <div className="mt-1 text-[#c85a3f]/20">RELATIONSHIP MATRIX v6.0</div>
      </div>
    </div>
  );
};
