
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { CORE_NODES } from './constants';
import { GameState, MemoryLayer } from './types';
import { processCognitiveSearch } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'briefing',
    unlockedNodeIds: ['capone'],
    activeNodeId: null,
    passwordEntered: false,
    collectedClues: [],
    collectedYears: [],
    unlockedPeople: [],
    unlockedArchiveIds: [],
    history: [
      { type: 'info', content: '[SYSTEM]: NEURAL LINK ESTABLISHED...', timestamp: Date.now() }
    ]
  });

  const [nodes, setNodes] = useState(CORE_NODES);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setIsProcessing(true);
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { type: 'search', content: query, timestamp: Date.now() }]
    }));

    // LOCAL OVERRIDE: Check for specific keyword combinations to ensure 100% hit rate
    const lowerQuery = query.toLowerCase();

    // Confession 1 Trigger: Requires BOTH "Maine" AND "Small Bank" to unlock.
    const hasMaine = lowerQuery.includes('maine') || lowerQuery.includes('缅因') || lowerQuery.includes('缅因州');
    const hasSmallBank = lowerQuery.includes('small_bank') || lowerQuery.includes('小银行') || lowerQuery.includes('small bank');

    if (hasMaine && hasSmallBank) {
      setTimeout(() => { // Simulate slight delay for "processing" feel
        const node = nodes.find(n => n.id === 'confession_1');
        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            // Remove used clues from inventory
            collectedClues: prev.collectedClues.filter(id => !['maine', 'small_bank', 'headdress'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },
              { type: 'info', content: `[SYSTEM]: 已消耗关联线索模块`, timestamp: Date.now() }
            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 2 Trigger: "俄亥俄州" OR "祭祀案" unlocks it.
    const hasOhio = lowerQuery.includes('ohio') || lowerQuery.includes('俄亥俄') || lowerQuery.includes('俄亥俄州');
    const hasRitual = lowerQuery.includes('ritual') || lowerQuery.includes('祭祀') || lowerQuery.includes('祭祀案');

    if (hasOhio || hasRitual) {
      setTimeout(() => {
        const node = nodes.find(n => n.id === 'confession_2');
        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            collectedClues: prev.collectedClues.filter(id => !['ohio', 'ritual_case'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },
              { type: 'info', content: `[SYSTEM]: 已消耗关联线索模块`, timestamp: Date.now() }
            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    try {
      const response = await processCognitiveSearch(query);
      if (response.isKeyNode && response.nodeId) {
        const node = nodes.find(n => n.id === response.nodeId);
        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            history: [
              ...prev.history,
              { type: 'info', content: `[检测到共鸣]: ${node.title} 片段已浮现。`, timestamp: Date.now() }
            ]
          }));
        }
      } else {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: response.analysis, timestamp: Date.now() }
          ]
        }));
      }
    } catch (error) {
      console.error(error);
      setGameState(prev => ({
        ...prev,
        history: [...prev.history, { type: 'info', content: '连接异常，正在重启神经层。', timestamp: Date.now() }]
      }));
    } finally {
      // But wait, if I return in the if block, this finally won't run. Correct.
      // So I updated the local block to set setIsProcessing(false).
      if (!((hasMaine && hasSmallBank) || hasOhio || hasRitual)) {
        setIsProcessing(false);
      }
    }
  }, [nodes]);

  const handleShatter = (id: string) => {
    // Logic to "Break" the bubble and go deeper
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        let nextLayer = n.currentLayer;
        if (n.currentLayer === MemoryLayer.SURFACE) nextLayer = MemoryLayer.DEEP;
        else if (n.currentLayer === MemoryLayer.DEEP && n.layers[MemoryLayer.CORE]) nextLayer = MemoryLayer.CORE;

        return { ...n, currentLayer: nextLayer };
      }
      return n;
    }));

    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { type: 'shatter', content: `[屏障击碎]: 正在进入更深层的潜意识。`, timestamp: Date.now() }]
    }));
  };

  const handleCollectClue = (clueId: string, word: string) => {
    // Define Categories
    const DOSSIER_WHITELIST = ['julip', 'project', 'julip_symbol', 'project_symbol'];
    const PEOPLE_IDS = ['nibi', 'conchar', 'father', 'lundgren', 'morning', 'robert', 'robert_capone'];
    const YEAR_IDS = ['year_1971', 'year_1968', 'year_1967'];

    const isDossier = DOSSIER_WHITELIST.includes(clueId);
    const isPerson = PEOPLE_IDS.includes(clueId);
    const isYear = YEAR_IDS.includes(clueId);

    // Build updates object
    const updates: Partial<GameState> = {};
    const newHistory: Array<{ type: 'search' | 'info' | 'shatter'; content: string; timestamp: number }> = [];

    // --- LOGIC: RELATIONSHIPS ---
    if (isPerson) {
      // Map incoming ID to MindMap's expected ID
      let unlockedId = clueId;
      if (clueId === 'robert' || clueId === 'robert_capone') unlockedId = 'capone';

      if (!gameState.unlockedPeople.includes(unlockedId)) {
        updates.unlockedPeople = [...gameState.unlockedPeople, unlockedId];
        newHistory.push({
          type: 'info',
          content: `[PERSON IDENTIFIED]: ${word} 已收录到人物关系`,
          timestamp: Date.now()
        });
      }
      // Also mark as "known" in collectedClues so it highlights
      if (!gameState.collectedClues.includes(clueId)) {
        updates.collectedClues = [...(updates.collectedClues || gameState.collectedClues), clueId];
      }
    }
    // --- LOGIC: CASE DOSSIER ---
    else if (isDossier) {
      if (!gameState.collectedClues.includes(clueId)) {
        updates.collectedClues = [...(updates.collectedClues || gameState.collectedClues), clueId];
        newHistory.push({
          type: 'info',
          content: `[EVIDENCE FILED]: ${word} 已收录到案卷建档`,
          timestamp: Date.now()
        });
      }
    }
    // --- LOGIC: YEARS (Silent) ---
    else if (isYear) {
      if (!gameState.collectedYears.includes(clueId)) {
        updates.collectedYears = [...gameState.collectedYears, clueId];
      }
    }
    // --- LOGIC: GENERIC KEYWORDS ---
    else {
      if (!gameState.collectedClues.includes(clueId)) {
        updates.collectedClues = [...gameState.collectedClues, clueId];
        // Restore feedback for generic keywords
        newHistory.push({
          type: 'info',
          content: `[KEYWORD RECORDED]: ${word} 已收录到关键词提示`,
          timestamp: Date.now()
        });
      }
    }

    // Apply updates if any
    if (Object.keys(updates).length > 0 || newHistory.length > 0) {
      setGameState(prev => ({
        ...prev,
        ...updates,
        history: [...prev.history, ...newHistory]
      }));
    }
  };

  const handleUnlockArchive = (archiveId: string) => {
    if (!gameState.unlockedArchiveIds.includes(archiveId)) {
      setGameState(prev => ({
        ...prev,
        unlockedArchiveIds: [...prev.unlockedArchiveIds, archiveId],
        history: [
          ...prev.history,
          { type: 'info', content: `[ARCHIVE RETRIEVED]: ${archiveId.toUpperCase()}`, timestamp: Date.now() }
        ]
      }));
    }
  };

  const handleConsumeKeywords = (yearIds: string[], personIds: string[]) => {
    setGameState(prev => ({
      ...prev,
      collectedYears: prev.collectedYears.filter(id => !yearIds.includes(id)),
      collectedClues: prev.collectedClues.filter(id => !personIds.includes(id)),
      history: [
        ...prev.history,
        { type: 'info', content: `[SYSTEM]: 已消耗档案检索线索`, timestamp: Date.now() }
      ]
    }));
  };

  const activeNode = nodes.find(n => n.id === gameState.activeNodeId);
  const visibleNodes = nodes.filter(n => gameState.unlockedNodeIds.includes(n.id));

  const [collectedAttachments, setCollectedAttachments] = useState<string[]>([]);

  const handleCollectAttachment = (attachmentId: string) => {
    if (!collectedAttachments.includes(attachmentId)) {
      setCollectedAttachments(prev => [...prev, attachmentId]);
      setGameState(prev => ({
        ...prev,
        history: [...prev.history, { type: 'info', content: `[EVIDENCE ATTACHED]: NEW ITEM IN CLUE FOLDER`, timestamp: Date.now() }]
      }));
    }
  };

  // Render based on current phase
  return (
    <AnimatePresence mode="wait">
      {gameState.phase === 'briefing' && (
        <motion.div key="briefing" className="w-full h-full" exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.5 }}>
          <BriefingView onComplete={() => setGameState(p => ({ ...p, phase: 'briefing-detail' }))} />

          {/* DEBUG: Quick Start Button */}
          <button
            onClick={() => setGameState(p => ({
              ...p,
              phase: 'immersion',
              passwordEntered: true,
              collectedClues: ['julip', 'project'], // WHITELISTED ONLY
              collectedYears: ['year_1967'] // Add a year for testing search if needed
            }))}
            className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-900/50 hover:bg-red-800 text-red-200 text-xs border border-red-500/50 rounded uppercase tracking-widest backdrop-blur-md transition-colors"
          >
            Debug: Quick Start
          </button>
        </motion.div>
      )}

      {gameState.phase === 'briefing-detail' && (
        <motion.div key="briefing-detail" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }} transition={{ duration: 0.8 }}>
          <BriefingDetailView
            onContinue={() => setGameState(p => ({ ...p, phase: 'dialogue' }))}
            onCollectClue={handleCollectClue}
            collectedClues={gameState.collectedClues}
          />
        </motion.div>
      )}

      {gameState.phase === 'dialogue' && (
        <motion.div key="dialogue" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <DialogueView
            onComplete={() => setGameState(p => ({ ...p, phase: 'immersion', passwordEntered: true }))}
            collectedClues={gameState.collectedClues}
            unlockedPeople={gameState.unlockedPeople}
          />
        </motion.div>
      )}

      {gameState.phase === 'immersion' && (
        <motion.div key="immersion" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <SimplifiedMainView
            nodes={visibleNodes}
            onNodeClick={(id) => setGameState(p => ({ ...p, activeNodeId: id }))}
            activeNodeId={gameState.activeNodeId}
            onSearch={handleSearch}
            history={gameState.history}
            isProcessing={isProcessing}
            activeNode={activeNode}
            onShatter={handleShatter}
            collectedClues={gameState.collectedClues}
            collectedYears={gameState.collectedYears}
            unlockedPeople={gameState.unlockedPeople}
            onCollectClue={handleCollectClue}
            unlockedArchiveIds={gameState.unlockedArchiveIds}
            onUnlockArchive={handleUnlockArchive}
            onConsumeKeywords={handleConsumeKeywords}
            collectedAttachments={collectedAttachments}
            onCollectAttachment={handleCollectAttachment}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
