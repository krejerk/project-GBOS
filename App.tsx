
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { CORE_NODES } from './constants';
import { GameState, MemoryLayer } from './types';
import { processCognitiveSearch, generateCharacterResponse } from './services/geminiService';
import { DebugController } from './components/DebugController';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'briefing',
    unlockedNodeIds: ['capone'],
    activeNodeId: null,
    passwordEntered: false,
    collectedClues: [],
    collectedDossierIds: [],
    collectedYears: [],
    unlockedPeople: [],
    unlockedArchiveIds: [],
    systemStability: 84, // Initial Stability
    currentStoryNode: 0, // No story nodes reached yet
    history: [
      { type: 'info', content: '[SYSTEM]: NEURAL LINK ESTABLISHED...', timestamp: Date.now() }
    ]
  });

  const [nodes, setNodes] = useState(CORE_NODES);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- SUBCONSCIOUS RETRACE LOGIC ---
  const handleRetrace = useCallback(() => {
    // 1. Check Stability
    if (gameState.systemStability <= 0) {
      return { success: false, reason: 'STABILITY_CRITICAL' };
    }

    // 2. Calculate Missed Keywords
    // Get distinct keywords from all UNLOCKED nodes
    const unlockedIdSet = new Set(gameState.unlockedNodeIds);
    let allAvailableKeywords: string[] = [];

    CORE_NODES.forEach(node => {
      if (unlockedIdSet.has(node.id) && node.revealedKeywords) {
        allAvailableKeywords = [...allAvailableKeywords, ...node.revealedKeywords];
      }
    });

    // Filter out already collected ones
    const collectedSet = new Set([...gameState.collectedClues, ...gameState.collectedDossierIds, ...gameState.collectedYears, ...gameState.unlockedPeople]);
    const missedKeywords = [...new Set(allAvailableKeywords.filter(k => !collectedSet.has(k)))];

    // 3. Apply Penalty
    setGameState(prev => ({
      ...prev,
      systemStability: Math.max(0, prev.systemStability - 20)
    }));

    return { success: true, keywords: missedKeywords };
  }, [gameState.systemStability, gameState.unlockedNodeIds, gameState.collectedClues, gameState.collectedDossierIds, gameState.collectedYears, gameState.unlockedPeople]);

  // Handle story node completion
  const handleStoryNodeComplete = useCallback((nodeId: number) => {
    setGameState(prev => ({
      ...prev,
      currentStoryNode: nodeId,
      history: [
        ...prev.history,
        { type: 'info', content: `[STORY CHECKPOINT]: 第${nodeId}章节已完成`, timestamp: Date.now() }
      ]
    }));
  }, []);



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
            // Restore Stability on Unlock (Success)
            systemStability: !prev.unlockedNodeIds.includes(node.id) ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            // Remove used clues from inventory
            collectedClues: prev.collectedClues.filter(id => !['maine', 'small_bank', 'headdress'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },

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
            // Restore Stability on Unlock
            systemStability: !prev.unlockedNodeIds.includes(node.id) ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            collectedClues: prev.collectedClues.filter(id => !['ohio', 'ritual_case'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },

            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 3 Trigger: \"芝加哥\" AND \"失踪\" unlocks it.
    const hasChicago = lowerQuery.includes('chicago') || lowerQuery.includes('芝加哥');
    const hasMissing = lowerQuery.includes('missing') || lowerQuery.includes('失踪');

    if (hasChicago && hasMissing) {
      setTimeout(() => {
        const node = nodes.find(n => n.id === 'confession_3');
        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            // Restore Stability on Unlock
            systemStability: !prev.unlockedNodeIds.includes(node.id) ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            collectedClues: prev.collectedClues.filter(id => !['chicago', 'missing'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },

            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 4 Trigger: "1402 Old Dominion Rd." AND "Training Day"
    const hasAddress = lowerQuery.includes('1402') || lowerQuery.includes('old dominion') || lowerQuery.includes('old_dominion');
    const hasTraining = lowerQuery.includes('training') || lowerQuery.includes('训练日');

    if (hasAddress && hasTraining) {
      setTimeout(() => {
        const node = nodes.find(n => n.id === 'confession_4');
        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            systemStability: !prev.unlockedNodeIds.includes(node.id) ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            collectedClues: prev.collectedClues.filter(id => !['1402_old_dominion_rd', 'training_day'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },

            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 5 Trigger: "Nevada" AND "Family Massacre"
    const hasNevada = lowerQuery.includes('nevada') || lowerQuery.includes('内华达') || lowerQuery.includes('内华达州');
    const hasFamilyMassacre = lowerQuery.includes('massacre') || lowerQuery.includes('extinction') || lowerQuery.includes('灭门') || lowerQuery.includes('灭门案');

    if (hasNevada && hasFamilyMassacre) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_5');

        // Stale State Protection: If node not found in state (due to HMR/Init), check constant
        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_5');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]); // Sync state
          }
        }

        if (node) {
          setGameState(prev => ({
            ...prev,
            activeNodeId: node.id,
            unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node.id])),
            systemStability: !prev.unlockedNodeIds.includes(node.id) ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            collectedClues: prev.collectedClues.filter(id => !['nevada', 'family_massacre'].includes(id)),
            history: [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node.title}`, timestamp: Date.now() },

            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Archive 5 Trigger: "1971" AND "Little Derek Wayne" => Unlocks NV-1971
    const hasYear1971 = lowerQuery.includes('1971') || lowerQuery.includes('year_1971');
    const hasLittleDerek = lowerQuery.includes('little_derek_wayne') || lowerQuery.includes('小德里克') || lowerQuery.includes('derek wayne') || lowerQuery.includes('wayne');

    if (hasYear1971 && hasLittleDerek) {
      setTimeout(() => {
        setGameState(prev => {
          if (prev.unlockedArchiveIds.includes('nv_1971')) {
            return {
              ...prev,
              history: [...prev.history, { type: 'info', content: '[SYSTEM]: 该档案已解密 (FILE ALREADY DECRYPTED)', timestamp: Date.now() }]
            };
          }
          return {
            ...prev,
            unlockedArchiveIds: [...prev.unlockedArchiveIds, 'nv_1971'],
            history: [
              ...prev.history,
              { type: 'info', content: '[ARCHIVE RETRIEVED]: NV-1971-SEC (The Nevada Chronicle)', timestamp: Date.now() }
            ]
          };
        });
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 6 Trigger: "Mojave Rest Stop" AND "Empty Cigarette Pack" => Unlocks Confession 6
    const hasMojave = lowerQuery.includes('mojave_rest_stop') || lowerQuery.includes('莫哈韦') || lowerQuery.includes('mojave');
    const hasCigarette = lowerQuery.includes('empty_cigarette_pack') || lowerQuery.includes('空烟盒') || lowerQuery.includes('cigarette');

    if (hasMojave && hasCigarette) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_6');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_6');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            if (prev.unlockedNodeIds.includes(node!.id)) {
              return {
                ...prev,
                history: [...prev.history, { type: 'info', content: '[SYSTEM]: 该供述已解密 (RECORD ALREADY DECRYPTED)', timestamp: Date.now() }]
              };
            }
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              // Remove the trigger clues from "collected" list to "consume" them? Or keep them? User didn't specify consumption, usually we keep them.
              // But previous logic for Confession 5 removed triggers. I'll follow that pattern if consistent, but usually we don't remove unless it's a "synthesis".
              // Confession 5 logic: collectedClues.filter(id => !['nevada', 'family_massacre'].includes(id))
              // I will keep them for now unless specified, safer.
              history: [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },

              ]
            }
          });
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
            systemStability: !prev.unlockedNodeIds.includes(node.id) && response.nodeId.startsWith('confession') ? Math.min(prev.systemStability + 20, 84) : prev.systemStability,
            history: [
              ...prev.history,
              { type: 'info', content: `[检测到共鸣]: ${node.title} 片段已浮现。`, timestamp: Date.now() }
            ]
          }));
        } else {
          // Node not in local list (shouldn't happen for core nodes, but safety net)
          setGameState(prev => ({ ...prev, history: [...prev.history, { type: 'info', content: response.analysis, timestamp: Date.now() }] }));
        }
      } else {
        // --- EASTER EGG: FUZZY QUESTIONING ---
        // If not a key node, check if it's a question to trigger the persona response
        // Relaxed Heuristic: Any question mark, chinese interrogative, or length > 2
        const isQuestion = /[?？whatwhohowwhywhere谁什么哪里为何真相真假]/i.test(query) || query.length > 2;

        if (isQuestion) {
          // Heuristic for persona: if query mentions "truth", "who", "gbos" -> Shadow
          const isShadowTrigger = /truth|who|real|gbos|真相|是谁|真实/i.test(query);
          const persona = isShadowTrigger ? 'shadow' : 'detective';

          const reply = await generateCharacterResponse(query, persona);

          setGameState(prev => ({
            ...prev,
            history: [
              ...prev.history,
              {
                type: 'info',
                content: `> [${persona === 'shadow' ? 'UNKNOWN SIGNAL' : 'R. CAPONE'}]: "${reply}"`,
                timestamp: Date.now()
              }
            ]
          }));
        } else {
          // Default "Noise" behavior
          setGameState(prev => ({
            ...prev,
            history: [
              ...prev.history,
              { type: 'info', content: response.analysis, timestamp: Date.now() }
            ]
          }));
        }
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
      if (!((hasMaine && hasSmallBank) || hasOhio || hasRitual || (hasChicago && hasMissing) || (hasNevada && hasFamilyMassacre) || (hasMojave && hasCigarette))) {
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

  const handleCollectAttachment = (id: string) => {
    // Add to collected items and show history
    setGameState(prev => {
      if (prev.collectedClues.includes(id)) return prev;

      return {
        ...prev,
        collectedClues: [...prev.collectedClues, id]
      };
    });
  };

  const handleCollectClue = (clueId: string, word: string) => {
    // Define Categories
    const DOSSIER_WHITELIST = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon'];
    const PEOPLE_IDS = ['nibi', 'conchar', 'father', 'lundgren', 'morning', 'robert', 'robert_capone', 'dr_reggie', 'roger_beebe', 'little_derek_wayne'];
    const YEAR_IDS = ['year_1971', 'year_1968', 'year_1967', 'year_1985'];

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
          content: `[PERSON IDENTIFIED]: ${word} 已收录到人物关系与关键词`,
          timestamp: Date.now()
        });
      }
      // REMOVED: Do not add to collectedClues to keep prompt strict
    }
    // --- LOGIC: CASE DOSSIER (EXCLUSIVE) ---
    else if (isDossier) {
      // Add to DOSSIER IDs
      if (!gameState.collectedDossierIds.includes(clueId)) {
        updates.collectedDossierIds = [...(gameState.collectedDossierIds || []), clueId];

        // Custom message for main dossier folders
        const isMainFolder = ['project', 'julip', 'graywater_beacon'].includes(clueId);
        const feedbackMsg = isMainFolder
          ? `[EVIDENCE FILED]: ${word} >>> 已在案卷建档中建立文件夹`
          : `[EVIDENCE FILED]: ${word} 已收录到案卷建档`;

        newHistory.push({
          type: 'info',
          content: feedbackMsg,
          timestamp: Date.now()
        });
      }

      // EXCEPTION: 'julip' (Golden Julip) is ALSO a keyword prompt
      if (clueId === 'julip') {
        if (!gameState.collectedClues.includes(clueId)) {
          updates.collectedClues = [...(updates.collectedClues || gameState.collectedClues), clueId];
          // Append info log for dual collection
          newHistory.push({
            type: 'info',
            content: `[KEYWORD RECORDED]: ${word} 已同时收录到关键词提示`,
            timestamp: Date.now()
          });
        }
      }
    }
    // --- LOGIC: YEARS (Silent Archive Prompts) ---
    else if (isYear) {
      if (!gameState.collectedYears.includes(clueId)) {
        updates.collectedYears = [...gameState.collectedYears, clueId];
      }
    }
    // --- LOGIC: GENERIC KEYWORDS (Prompts Only) ---
    else {
      if (!gameState.collectedClues.includes(clueId)) {
        updates.collectedClues = [...gameState.collectedClues, clueId];
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



  // Handle Debug State Changes
  const handleDebugStateChange = (newState: Partial<GameState>) => {
    setGameState(prev => ({
      ...prev,
      ...newState
    }));
  };

  // Render based on current phase
  return (
    <AnimatePresence mode="wait">
      {gameState.phase === 'briefing' && (
        <motion.div key="briefing" className="w-full h-full" exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.5 }}>
          <BriefingView onComplete={() => setGameState(p => ({ ...p, phase: 'briefing-detail' }))} />
        </motion.div>
      )}

      {/* Global Debug Controller - Always available except in TitleScreen */}
      {gameState.phase !== 'title' && (
        <DebugController onSetState={handleDebugStateChange} />
      )}

      {gameState.phase === 'briefing-detail' && (
        <motion.div key="briefing-detail" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }} transition={{ duration: 0.8 }}>
          <BriefingDetailView
            onContinue={() => setGameState(p => ({ ...p, phase: 'dialogue' }))}
            onCollectClue={handleCollectClue}
            collectedClues={gameState.collectedClues}
            collectedDossierIds={gameState.collectedDossierIds || []}
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
            onCollectAttachment={handleCollectAttachment}
            collectedDossierIds={gameState.collectedDossierIds || []}
            systemStability={gameState.systemStability}
            currentStoryNode={gameState.currentStoryNode}
            onStoryNodeComplete={handleStoryNodeComplete}
            onRetrace={handleRetrace}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
