
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { AwakeningDialogue } from './components/AwakeningDialogue';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { MemoryNode, MemoryLayer, GameState } from './types';
import {
  INITIAL_DOSSIER, CORE_NODES, RELATIONSHIP_TREE, KEYWORD_CONSUMPTION_MAP, CATEGORY_IDS,
  GLOBAL_KEYWORD_MAP, BRIEFING_SECTIONS, CLUE_DISPLAY_MAP,
  KEYWORD_REGISTRY, UNLOCKS_REGISTRY,
  JENNIFER_NODE_1_DIALOGUE, JENNIFER_NODE_2_DIALOGUE, JENNIFER_NODE_3_DIALOGUE, JENNIFER_NODE_4_DIALOGUE, JENNIFER_NODE_5_DIALOGUE
} from './constants';
import { DebugController } from './components/DebugController';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MusicControl } from './components/MusicControl';
import { resetClueLibraryVisit } from './components/ClueLibrary';

const INITIAL_GAME_STATE: GameState = {
  phase: 'briefing',
  unlockedNodeIds: ['capone'],
  activeNodeId: null,
  passwordEntered: false,
  collectedClues: [],
  collectedDossierIds: ['personnel_tree'],
  collectedYears: [],
  collectedAttachments: [],
  unlockedPeople: [],
  unlockedArchiveIds: [],
  systemStability: 84, // Initial Stability
  currentStoryNode: 0, // No story nodes reached yet
  playerHypotheses: {},
  tutorialStep: 1, // Start tutorial
  isTutorialComplete: false,
  history: [
    { type: 'info', content: '[SYSTEM]: NEURAL LINK ESTABLISHED...', timestamp: Date.now() }
  ],
  consecutiveSearch: undefined
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const [nodes, setNodes] = useState(CORE_NODES);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    // Ensure all dossiers that were previously collected just as clues also appear in dossier list
    const dossierClues = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon', 'forest_map'];
    setGameState(prev => {
      let changed = false;
      let newDossiers = [...(prev.collectedDossierIds || [])];
      
      prev.collectedClues.forEach(clueId => {
        if (dossierClues.includes(clueId) && !newDossiers.includes(clueId)) {
          newDossiers.push(clueId);
          changed = true;
        }
      });
      
      if (changed) {
        return { ...prev, collectedDossierIds: newDossiers };
      }
      return prev;
    });
  }, []);

  // --- AUDIO LOGIC ---
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasMusicStarted, setHasMusicStarted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/bgm.m4a`);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // --- ARCHITECTURAL SAFEGUARD ---
  useEffect(() => {
    // Validate that no node is consuming its own revealed keywords (rewards)
    Object.entries(KEYWORD_CONSUMPTION_MAP).forEach(([nodeId, requiredKeys]) => {
      const node = CORE_NODES.find(n => n.id === nodeId);
      if (node && node.revealedKeywords) {
        const overlaps = requiredKeys.filter(k => node.revealedKeywords.includes(k));
        if (overlaps.length > 0) {
          console.warn(`[STRUCTURE WARNING]: Node "${nodeId}" consumes its own revealed keywords: ${overlaps.join(', ')}.`);
        }
      }
    });
  }, []);

  // --- RESET PERSISTENT UI STATE ON NEW GAME ---
  useEffect(() => {
    if (gameState.phase === 'briefing') {
      resetClueLibraryVisit();
    }
  }, [gameState.phase]);

  const startMusic = useCallback(() => {
    if (audioRef.current && !hasMusicStarted) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
        setHasMusicStarted(true);
      }).catch(err => {
        console.warn("Audio playback failed:", err);
      });
    }
  }, [hasMusicStarted]);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(err => {
          console.warn("Audio playback failed:", err);
        });
      }
    }
  }, [isMusicPlaying]);

  // --- SUBCONSCIOUS RETRACE LOGIC ---
  const handleRetrace = useCallback(() => {
    const stability = typeof gameState.systemStability === 'number' ? gameState.systemStability : 84;
    if (stability <= 0) return { success: false, reason: 'STABILITY_CRITICAL' };

    let allAvailableKeywords: string[] = [];
    BRIEFING_SECTIONS.forEach(section => {
      const matches = section.content.matchAll(/\[(.*?)\]\(clue:(.*?)\)/g);
      for (const match of matches) allAvailableKeywords.push(match[2].trim());
    });

    const unlockedIdSet = new Set(gameState.unlockedNodeIds);
    CORE_NODES.forEach(node => {
      if (unlockedIdSet.has(node.id) && node.revealedKeywords) {
        allAvailableKeywords = [...allAvailableKeywords, ...node.revealedKeywords];
      }
    });

    if (gameState.currentStoryNode === 1) JENNIFER_NODE_1_DIALOGUE.forEach(line => {
      const matches = line.matchAll(/\[(.*?)\]\(clue:(.*?)\)/g);
      for (const match of matches) allAvailableKeywords.push(match[2].trim());
    });
    // (Other Jennifer nodes... omitted for brevity or added back if needed, but let's keep it clean)

    gameState.history.forEach(item => {
      if (typeof item.content === 'string') {
        Object.entries(GLOBAL_KEYWORD_MAP).forEach(([word, info]) => {
          if (item.content.includes(word)) allAvailableKeywords.push(info.id);
        });
      }
    });

    const collectedSet = new Set([
      ...gameState.collectedClues,
      ...gameState.collectedDossierIds,
      ...gameState.collectedYears,
      ...gameState.unlockedPeople
    ]);

    const missedKeywords = [...new Set(allAvailableKeywords.filter(k =>
      !collectedSet.has(k) && CLUE_DISPLAY_MAP[k] && !KEYWORD_REGISTRY[k]?.isArchiveOnly
    ))];

    setGameState(prev => ({
      ...prev,
      systemStability: Math.max(0, (prev.systemStability || 84) - 20)
    }));

    return { success: true, keywords: missedKeywords };
  }, [gameState.systemStability, gameState.unlockedNodeIds, gameState.currentStoryNode, gameState.history, gameState.collectedClues, gameState.collectedDossierIds, gameState.collectedYears, gameState.unlockedPeople]);

  const handleStoryNodeComplete = useCallback((nodeId: number) => {
    setGameState(prev => {
      let updatedUnlockedNodeIds = prev.unlockedNodeIds;
      if (nodeId === 6) {
        const node6Confessions = Array.from({ length: 26 }, (_, i) => `confession_${i + 1}`);
        updatedUnlockedNodeIds = Array.from(new Set([...prev.unlockedNodeIds, ...node6Confessions]));
      }
      if (nodeId === 7) {
        const node7Confessions = Array.from({ length: 29 }, (_, i) => `confession_${i + 1}`);
        updatedUnlockedNodeIds = Array.from(new Set([...prev.unlockedNodeIds, ...node7Confessions]));
      }

      const filterByRegistry = (id: string) => {
        const meta = KEYWORD_REGISTRY[id];
        if (!meta) return true;
        if (meta.isIdentity || meta.isPersistent) return true;
        if (meta.chapter > nodeId) return true;
        return false;
      };

      return {
        ...prev,
        currentStoryNode: nodeId,
        unlockedNodeIds: updatedUnlockedNodeIds,
        collectedClues: prev.collectedClues.filter(filterByRegistry),
        collectedYears: prev.collectedYears.filter(filterByRegistry),
        unlockedPeople: prev.unlockedPeople.filter(filterByRegistry),
        history: [
          ...prev.history,
          { type: 'info', content: `[STORY CHECKPOINT]: 第${nodeId}章节已完成。碎片空间已重组，过期的记忆锚点已沉没。`, timestamp: Date.now() }
        ]
      };
    });
  }, []);

  const handleClearUnusedKeywords = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      collectedClues: prev.collectedClues.filter(id => KEYWORD_REGISTRY[id]?.isIdentity),
      collectedYears: prev.collectedYears.filter(id => KEYWORD_REGISTRY[id]?.isIdentity),
      unlockedPeople: prev.unlockedPeople.filter(id => KEYWORD_REGISTRY[id]?.isIdentity),
      history: [
        ...prev.history,
        { type: 'info', content: '[JENNIFER]: 看来你还在试图拼凑那些不该存在的碎片。作为警告，我已清除了你所有的线索缓存。', timestamp: Date.now() }
      ]
    }));
  }, []);

  const [isPersonaGlitching, setIsPersonaGlitching] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const [showAwakeningDialogue, setShowAwakeningDialogue] = useState(false);

  useEffect(() => {
    localStorage.setItem('project_gbos_persona_switched', (gameState.hasSwitchedPersona || false).toString());
  }, [gameState.hasSwitchedPersona]);

  const handlePersonaReboot = useCallback(() => {
    setGameState(prev => ({ ...prev, activeNodeId: null }));
    setShowCountdown(true);
    setCountdownValue(5);
    const timer = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      setShowCountdown(false);
      setIsBlackout(true);
      setTimeout(() => {
        setIsBlackout(false);
        setShowAwakeningDialogue(true);
      }, 2000);
    }, 5500);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    if (!query) return;
    setIsProcessing(true);
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { type: 'search', content: query, timestamp: Date.now() }]
    }));

    if (query.includes('FORCE_LOAD_MONSTER') || query.includes('0x524F42455254_PURGE')) {
      setIsPersonaGlitching(true);
      setTimeout(() => setIsPersonaGlitching(false), 100);
      setTimeout(() => setIsPersonaGlitching(true), 150);
      setTimeout(() => setIsPersonaGlitching(false), 300);
      setTimeout(() => setIsPersonaGlitching(true), 400); 
      setTimeout(() => setIsPersonaGlitching(false), 1200); 

      setTimeout(() => {
        setGameState(prev => {
          const newCollectedClues = prev.collectedClues.filter(c => c !== 'reboot_command');
          return {
            ...prev,
            history: [
              ...prev.history,
              { type: 'info', content: '> [SYSTEM]: PERSONA REBOOT INITIATED...', timestamp: Date.now() },
              { type: 'info', content: '> [SYSTEM]: DIRECTORY ACCESS GRANTED.', timestamp: Date.now() }
            ],
            collectedClues: newCollectedClues,
            hasSwitchedPersona: true
          };
        });
        setIsProcessing(false);
      }, 1500);
      return;
    }

    const detectedKeywordIds: string[] = [];
    Object.entries(GLOBAL_KEYWORD_MAP).forEach(([alias, meta]) => {
      if (lowerQuery.includes(alias.toLowerCase())) detectedKeywordIds.push(meta.id);
    });
    const uniqueDetected = Array.from(new Set(detectedKeywordIds));

    const invalidInputKey = 'consecutive_invalid_inputs';
    const getInvalidCount = () => parseInt(sessionStorage.getItem(invalidInputKey) || '0');
    const incrementInvalidCount = () => sessionStorage.setItem(invalidInputKey, String(getInvalidCount() + 1));
    const resetInvalidCount = () => sessionStorage.removeItem(invalidInputKey);

    const isVanessaQuery = lowerQuery === '瓦妮莎' || lowerQuery === 'vanessa';
    const isJenniferQuery = lowerQuery === '詹妮弗' || lowerQuery === 'jennifer' || lowerQuery === '珍妮弗' || lowerQuery === '银喜鹊';
    let finalQuery = query;
    let newConsecutive: { keyword: string, count: number } | undefined = undefined;

    if (isVanessaQuery) {
      const prevCount = gameState.consecutiveSearch?.keyword === 'vanessa' ? gameState.consecutiveSearch.count : 0;
      const newCount = prevCount + 1;
      newConsecutive = { keyword: 'vanessa', count: newCount };
      if (newCount === 1) finalQuery = 'v_response_1';
      else if (newCount === 2) finalQuery = 'v_response_2';
      else if (newCount >= 3) { finalQuery = 'v_response_3'; newConsecutive = undefined; }
    } else if (isJenniferQuery) {
      const prevCount = gameState.consecutiveSearch?.keyword === 'jennifer' ? gameState.consecutiveSearch.count : 0;
      const newCount = prevCount + 1;
      newConsecutive = { keyword: 'jennifer', count: newCount };
      if (newCount === 1) finalQuery = 'jennifer_consecutive_1';
      else if (newCount === 2) finalQuery = 'jennifer_consecutive_2';
      else if (newCount >= 3) { 
        finalQuery = 'jennifer_consecutive_3'; 
        newConsecutive = undefined; 
        if (gameState.currentStoryNode < 5) handleStoryNodeComplete(5);
      }
    } else {
      newConsecutive = undefined;
    }

    let matchedUnlockId: string | null = null;
    let matchedUnlockData: any = null;

    for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
      if (entry.keywords.every(k => uniqueDetected.includes(k))) {
        matchedUnlockId = id;
        matchedUnlockData = entry;
        break;
      }
    }

    if (matchedUnlockId && matchedUnlockData) {
      resetInvalidCount();
      const targetId = matchedUnlockData.targetId;
      const type = matchedUnlockData.type;

      setTimeout(() => {
        setGameState(prev => {
          // Consume ALL detected keywords in the query if an unlock occurs.
          const keysToConsume = new Set(uniqueDetected);
          const filterConsumed = (id: string) => !keysToConsume.has(id);

          const newCollectedClues = prev.collectedClues.filter(filterConsumed);
          const newCollectedYears = prev.collectedYears.filter(filterConsumed);
          const newUnlockedPeople = prev.unlockedPeople.filter(filterConsumed); 

          if (type === 'archive') {
            const isAlreadyUnlocked = prev.unlockedArchiveIds.includes(targetId);
            return {
              ...prev,
              consecutiveSearch: newConsecutive,
              collectedClues: newCollectedClues,
              collectedYears: newCollectedYears,
              unlockedPeople: newUnlockedPeople,
              unlockedArchiveIds: isAlreadyUnlocked ? prev.unlockedArchiveIds : [...prev.unlockedArchiveIds, targetId],
              history: [
                ...prev.history,
                { type: 'archive_content', content: matchedUnlockData.message || `[归档系统]: 关键关联记录已调取——${targetId.toUpperCase()}`, timestamp: Date.now() }
              ]
            };
          } else {
            let node = nodes.find(n => n.id === targetId) || CORE_NODES.find(n => n.id === targetId);
            if (node && !nodes.some(n => n.id === targetId)) setNodes(p => [...p, node!]);

            if (node) {
              const isAlreadyUnlocked = prev.unlockedNodeIds.includes(targetId);
              return {
                ...prev,
                consecutiveSearch: newConsecutive,
                collectedClues: newCollectedClues,
                collectedYears: newCollectedYears,
                unlockedPeople: newUnlockedPeople,
                activeNodeId: targetId,
                unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, targetId])),
                systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
                history: [
                  ...prev.history,
                  { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() }
                ]
              };
            }
          }
          return prev;
        });
        setIsProcessing(false);
      }, 50);
      return;
    }

    const PRESET_RESPONSES: Array<{
      keywords: string[];
      response: string;
      priority?: number;
      isReveal?: boolean;
      revealKeywords?: string[];
    }> = [
      { keywords: ['v_response_1'], response: '> [R. CAPONE]: "瓦妮莎？谁告诉你的这个名字？资料里没有提到她。"', priority: 200 },
      { keywords: ['v_response_2'], response: '> [R. CAPONE]: "闭嘴。我不许你提那个名字。那是……那是我的事。"', priority: 200 },
      { keywords: ['v_response_3'], response: '> [R. CAPONE]: "……够了。既然你这么执着挖掘我的伤口，那就看清楚了。瓦妮莎确实与别人不同……1976年，堪萨斯城，她哭着求我不要执行那个针对流动献血车的计划。但我没有听。我当时太想看那个城市燃烧了。"', priority: 200, isReveal: true, revealKeywords: ['堪萨斯城', '流动献血车'] },
      { keywords: ['我是谁', 'who am i', 'who i am', '我到底是谁', '是谁'], response: `> [R. CAPONE]: "你是一个潜伏在自己脑子里的幽灵。别急，等显像管的灯火熄灭，你会想起那一包'铁马'烟的。"`, priority: 100 },
      { keywords: ['jennifer_consecutive_1'], response: '> [R. CAPONE]: "别逗了，你收到的档案里根本就没有詹妮弗这个名字，你想问的是那只银喜鹊，我们在营地的时候，她是那个负责在大家睡觉时，从外面反锁车门的人。"', priority: 210 },
      { keywords: ['jennifer_consecutive_2'], response: '> [R. CAPONE]: "她喜欢收集亮晶晶的垃圾，是个哑巴，或者只是不想跟我们要这种人说话。别浪费时间了，下一个问题。"', priority: 211 },
      { keywords: ['jennifer_consecutive_3'], response: '> [R. CAPONE]: "难道说真的是她……那天在埃尔帕索，当我绝望地把烟盒揉烂的时候，她就在教堂的角落里看着，对吗？"', priority: 999 },
      { keywords: ['记得', '记忆', 'remember', 'memory', '想起', 'recall'], response: '> [R. CAPONE]: "我不记得了... 只有一些破碎的画面... 银行，雪地，康查尔的微笑...这些碎片在我脑子里盘旋。"', priority: 70 },
      { keywords: ['为什么', 'why', '原因', 'reason'], response: '> [R. CAPONE]: "为什么？你也在问为什么吗？我他妈也想知道为什么！为什么是我，为什么是那些人......"', priority: 70 }
    ];

    const sortedResponses = [...PRESET_RESPONSES].sort((a, b) => (b.priority || 0) - (a.priority || 0));
    let matchedPreset: any = null;
    const effectiveQuery = finalQuery.toLowerCase().trim();

    for (const preset of sortedResponses) {
      if (preset.keywords.some(kw => effectiveQuery.includes(kw))) {
        matchedPreset = preset;
        resetInvalidCount();
        break;
      }
    }

    if (matchedPreset) {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          consecutiveSearch: newConsecutive,
          history: [...prev.history, { type: 'info', content: matchedPreset.response, isReveal: matchedPreset.isReveal, revealKeywords: matchedPreset.revealKeywords, timestamp: Date.now() }]
        }));
        setIsProcessing(false);
      }, 300);
    } else {
      incrementInvalidCount();
      const currentCount = getInvalidCount();
      const noiseResponses = ['> [R. CAPONE]: "我不知道你在说什么..."', '> [R. CAPONE]: "这些词对我没什么意义。"', '> [R. CAPONE]: "试试用更清晰的词，我的记忆...很混乱。"', '> [R. CAPONE]: "你得给我点更具体的东西。"'];
      const responseMessage = currentCount >= 3 ? '> [R. CAPONE]: "我的突触还没完全烧坏，但也经不起你这么折腾。如果你不知道要找什么，就滚回现实世界去喝杯咖啡。"' : noiseResponses[Math.floor(Math.random() * noiseResponses.length)];
      if (currentCount >= 3) resetInvalidCount();

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          consecutiveSearch: newConsecutive,
          history: [...prev.history, { type: 'info', content: responseMessage, timestamp: Date.now() }]
        }));
        setIsProcessing(false);
      }, 300);
    }
  }, [gameState.consecutiveSearch, gameState.history, nodes, handleStoryNodeComplete]);

  React.useEffect(() => {
    const missingNodes = gameState.unlockedNodeIds.filter(id => !nodes.some(n => n.id === id));
    if (missingNodes.length > 0) {
      const newNodes = missingNodes.map(id => CORE_NODES.find(n => n.id === id)).filter(Boolean) as MemoryNode[];
      if (newNodes.length > 0) setNodes(prev => [...prev, ...newNodes.filter(n => !prev.some(p => p.id === n.id))]);
    }
  }, [gameState.unlockedNodeIds, nodes]);

  const handleShatter = (id: string) => {
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
    setGameState(prev => {
      if (prev.collectedAttachments?.includes(id)) return prev;
      const updates: Partial<GameState> = { collectedAttachments: [...(prev.collectedAttachments || []), id] };
      if (id === 'richie_id_card') {
        if (!prev.collectedDossierIds.includes('julip')) updates.collectedDossierIds = [...prev.collectedDossierIds, 'julip'];
        updates.history = [...prev.history, { type: 'info', content: `[SYSTEM]: 附件已存入 - 线索库中发现关键关联案卷「黄油朱莉普」。`, timestamp: Date.now() }];
      }
      if (id === 'iron_horse_louisville' || id === 'graywater_beacon' || id === 'iron_horse_beacon') {
        if (!prev.collectedDossierIds.includes('graywater_beacon')) updates.collectedDossierIds = [...prev.collectedDossierIds, 'graywater_beacon'];
        // Also ensure individual image IDs are in collectedAttachments to show up in the folder
        const autoAttachments = ['graywater_beacon', 'iron_horse_beacon', 'iron_horse_louisville'];
        const currentAttachments = updates.collectedAttachments || prev.collectedAttachments || [];
        const missing = autoAttachments.filter(a => !currentAttachments.includes(a));
        if (missing.length > 0) {
            updates.collectedAttachments = [...currentAttachments, ...missing];
        }
        updates.history = [...prev.history, { type: 'info', content: `[SYSTEM]: 附件已存入 - 线索库中发现关键关联案卷「灰水信标」。`, timestamp: Date.now() }];
      }
      return { ...prev, ...updates };
    });
  };

  const handleCollectClue = (rawClueId: string, word: string) => {
    const clueId = rawClueId.trim();
    
    // Alias mapping for people (Source of truth for person identity)
    let targetPersonId = clueId;
    if (clueId === 'robert' || clueId === 'robert_capone') targetPersonId = 'capone';
    
    const meta = KEYWORD_REGISTRY[targetPersonId] || KEYWORD_REGISTRY[clueId];
    const isDossier = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon', 'forest_map'].includes(clueId);
    const type = meta ? meta.type : (isDossier ? 'dossier' : 'clue');
    const isSpecialReacquire = ['kansas_city', 'mobile_blood_truck', 'church', 'el_paso', 'mill_valley', 'reporter', 'felipe_maldonado'].includes(clueId);

    setGameState(prev => {
      const isReward = meta?.isPersistent || meta?.isIdentity || (meta && meta.chapter > (prev.currentStoryNode || 0));
      const isArchiveOnly = !!(meta?.isArchiveOnly || isDossier);
      const updates: Partial<GameState> = {};
      const newHistory: Array<{ type: 'search' | 'info' | 'shatter' | 'dialogue' | 'archive_content'; content: string; timestamp: number }> = [];
      let currentCollectedClues = [...prev.collectedClues];

      // 1. Handle Person Identification (Archive Tray Only)
      if (type === 'person') {
        if (!prev.unlockedPeople.includes(targetPersonId)) {
          updates.unlockedPeople = [...prev.unlockedPeople, targetPersonId];
          newHistory.push({ type: 'info', content: `[PERSON IDENTIFIED]: ${word} 已收录到档案检索`, timestamp: Date.now() });
        }
        // People can also be dossier folders if they have attachments
        if (meta?.attachments && !prev.collectedDossierIds.includes(clueId)) {
          updates.collectedDossierIds = [...(prev.collectedDossierIds || []), clueId];
          newHistory.push({ type: 'info', content: `[EVIDENCE FILED]: ${word} 的相关案卷已建立`, timestamp: Date.now() });
        }
      } 
      // 2. Handle Year Identification (Archive Tray Only)
      else if (type === 'year') {
        if (!prev.collectedYears.includes(clueId)) {
          updates.collectedYears = [...prev.collectedYears, clueId];
          newHistory.push({ type: 'info', content: `[YEAR RECORDED]: ${word} 已收录到档案检索`, timestamp: Date.now() });
        }
      }
      // 3. Handle Dossier/Archive Items (Keywords strictly for folders)
      else if (isArchiveOnly) {
        if (!prev.collectedDossierIds.includes(clueId)) {
          updates.collectedDossierIds = [...(prev.collectedDossierIds || []), clueId];
          newHistory.push({ type: 'info', content: `[EVIDENCE FILED]: ${word} 已收录到案卷建档`, timestamp: Date.now() });
        }
      } 
      // 4. Handle Case/Location/Normal Clues (Main Tray Only)
      else {
        // Add to dossier if has attachments
        if (meta?.attachments && !prev.collectedDossierIds.includes(clueId)) {
          updates.collectedDossierIds = [...(prev.collectedDossierIds || []), clueId];
          newHistory.push({ type: 'info', content: `[EVIDENCE FILED]: ${word} 已收录到案卷建档`, timestamp: Date.now() });
        }

        // Add to collectedClues for search functionality
        if (!prev.collectedClues.includes(clueId) || isReward || isSpecialReacquire) {
          currentCollectedClues = [...prev.collectedClues, clueId];
          const typePrefix = type === 'location' ? 'LOCATION' : 'CASE';
          newHistory.push({ type: 'info', content: `[${typePrefix} RECORDED]: ${word} 已收录`, timestamp: Date.now() });
          updates.collectedClues = currentCollectedClues;
        }
      }

      // 5. Year Exception: Allow re-triggering the "Collected" animation/history entry
      // even if already in state, to give feedback that it's "safe".
      if (type === 'year' && prev.collectedYears.includes(targetPersonId)) {
          newHistory.push({ type: 'info', content: `[YEAR VERIFIED]: ${word} 记忆锚点依然稳固`, timestamp: Date.now() });
      }

      // 6. AUTO-COLLECT ATTACHMENTS (for Jennifer's records or clues with specific visual rewards)
      if (meta?.attachments && meta.attachments.length > 0) {
        meta.attachments.forEach(att => {
          const attId = att.id;
          if (!prev.collectedAttachments?.includes(attId)) {
             const currentAtts = updates.collectedAttachments || prev.collectedAttachments || [];
             updates.collectedAttachments = [...currentAtts, attId];
             
             // Dossier Linkage (Mirroring handleCollectAttachment logic)
             if (attId === 'richie_id_card') {
                if (!prev.collectedDossierIds.includes('julip')) {
                   updates.collectedDossierIds = [...(updates.collectedDossierIds || prev.collectedDossierIds), 'julip'];
                }
             }
             if (attId === 'iron_horse_louisville' || attId === 'graywater_beacon' || attId === 'iron_horse_beacon') {
                if (!prev.collectedDossierIds.includes('graywater_beacon')) {
                   updates.collectedDossierIds = [...(updates.collectedDossierIds || prev.collectedDossierIds), 'graywater_beacon'];
                }
                const autoAttachments = ['graywater_beacon', 'iron_horse_beacon', 'iron_horse_louisville'];
                const nowAtts = updates.collectedAttachments || [];
                const missing = autoAttachments.filter(a => !nowAtts.includes(a));
                if (missing.length > 0) {
                   updates.collectedAttachments = [...nowAtts, ...missing];
                }
             }
          }
        });
      }

      // If no updates and no history entries, return previous state to avoid re-render
      if (Object.keys(updates).length === 0 && newHistory.length === 0) {
        return prev;
      }

      return { ...prev, ...updates, history: [...prev.history, ...newHistory] };
    });
  };

  const handleUnlockArchive = (archiveId: string) => {
    // Tutorial Completion: If the tutorial goal archive is unlocked, clear tutorial state
    if (archiveId === 'me_1971' && gameState.tutorialStep > 0) {
      setTutorialStep(0);
    }

    setGameState(prev => {
      if (!prev.unlockedArchiveIds.includes(archiveId)) {
        return { ...prev, unlockedArchiveIds: [...prev.unlockedArchiveIds, archiveId], history: [...prev.history, { type: 'archive_content', content: `[ARCHIVE RETRIEVED]: ${archiveId.toUpperCase()}`, timestamp: Date.now() }] };
      }
      return prev;
    });
  };

  const handleConsumeKeywords = (yearIds: string[], personIds: string[]) => {
    setGameState(prev => {
      let nextClues = prev.collectedClues;
      let nextYears = prev.collectedYears;
      let nextPeople = prev.unlockedPeople;

      if (personIds && personIds.length > 0) {
        nextPeople = nextPeople.filter(id => !personIds.includes(id));
        // Keep clues filtered too in case of dual-mapped items
        nextClues = nextClues.filter(id => !personIds.includes(id)); 
      }
      if (yearIds && yearIds.length > 0) {
        nextYears = nextYears.filter(id => !yearIds.includes(id));
      }

      return {
        ...prev,
        collectedClues: nextClues,
        collectedYears: nextYears,
        unlockedPeople: nextPeople,
        history: [...prev.history, { type: 'info', content: '[SYSTEM LOG]: 信息已关联至指定卷宗', timestamp: Date.now() }]
      };
    });
  };

  const handleDebugStateChange = (newState: Partial<GameState>) => {
    setGameState({ ...INITIAL_GAME_STATE, ...newState });
    startMusic();
  };

  const handleUpdateHypothesis = (nodeId: string, name: string) => {
    setGameState(prev => ({ ...prev, playerHypotheses: { ...prev.playerHypotheses, [nodeId]: name } }));
  };
  
  const setTutorialStep = useCallback((step: number) => {
    setGameState(prev => ({ 
      ...prev, 
      tutorialStep: step,
      isTutorialComplete: step === 0 ? true : prev.isTutorialComplete
    }));
  }, []);

  const isChapterSolved = (chapter: number) => {
    const chapterMembers = RELATIONSHIP_TREE.filter(m => m.chapter === chapter && gameState.unlockedPeople.includes(m.id));
    if (chapterMembers.length === 0) return true;
    return chapterMembers.every(m => gameState.playerHypotheses[m.id]?.trim().toUpperCase() === m.name.toUpperCase());
  };

  const handleNodeClick = (id: string) => {
    if (!id) { setGameState(prev => ({ ...prev, activeNodeId: null })); return; }
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    setGameState(prev => ({ ...prev, activeNodeId: id }));
  };

  const shouldShowMonster = !!gameState.hasSwitchedPersona;

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MusicControl isPlaying={isMusicPlaying} onToggle={toggleMusic} isVisible={hasMusicStarted} />
      <AnimatePresence mode="wait">
        {gameState.phase === 'briefing' && (
          <motion.div key="briefing" className="w-full h-full" exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.5 }}>
            <BriefingView onComplete={() => setGameState(p => ({ ...p, phase: 'briefing-detail' }))} onFirstInteraction={startMusic} />
          </motion.div>
        )}
        {gameState.phase === 'briefing-detail' && (
          <motion.div key="briefing-detail" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20, filter: "blur(5px)" }} transition={{ duration: 0.8 }}>
            <BriefingDetailView 
              onContinue={() => setGameState(p => ({ ...p, phase: 'dialogue' }))} 
              onCollectClue={handleCollectClue} 
              collectedClues={gameState.collectedClues} 
              collectedDossierIds={gameState.collectedDossierIds || []} 
              unlockedPeople={gameState.unlockedPeople}
            />
          </motion.div>
        )}
        {gameState.phase === 'dialogue' && (
          <motion.div key="dialogue" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <DialogueView 
              onComplete={() => setGameState(p => ({ ...p, phase: 'immersion', passwordEntered: true }))} 
              onCollectClue={handleCollectClue}
              collectedClues={gameState.collectedClues} 
              collectedDossierIds={gameState.collectedDossierIds || []}
              unlockedPeople={gameState.unlockedPeople} 
              hasSwitchedPersona={shouldShowMonster} 
            />
          </motion.div>
        )}
        {gameState.phase === 'immersion' && (
          <motion.div key="immersion" className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <ErrorBoundary>
              <SimplifiedMainView
                gameState={gameState} nodes={nodes} onNodeClick={handleNodeClick} activeNodeId={gameState.activeNodeId || ''}
                onSearch={handleSearch} history={gameState.history} collectedClues={gameState.collectedClues} collectedYears={gameState.collectedYears}
                unlockedPeople={gameState.unlockedPeople} onCollectClue={handleCollectClue} onCollectAttachment={handleCollectAttachment}
                onUnlockArchive={handleUnlockArchive} onShatter={handleShatter} onPersonaReboot={handlePersonaReboot}
                onUpdateHypothesis={handleUpdateHypothesis} isChapterSolved={isChapterSolved} isProcessing={isProcessing}
                onRetrace={handleRetrace} onStoryNodeComplete={handleStoryNodeComplete} onClearUnusedKeywords={handleClearUnusedKeywords}
                onConsumeKeywords={handleConsumeKeywords} isPersonaGlitching={isPersonaGlitching} showCountdown={showCountdown}
                countdownValue={countdownValue} playerHypotheses={gameState.playerHypotheses}
                setTutorialStep={setTutorialStep}
                tutorialStep={gameState.tutorialStep}
              />
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAwakeningDialogue && (
          <AwakeningDialogue onComplete={() => {
            setShowAwakeningDialogue(false);
            setGameState(prev => ({ ...prev, hasSwitchedPersona: true, history: [...prev.history, { type: 'dialogue', content: '> [ROBERT_CAPONE]: "说吧，你还要挖什么烂账？"', timestamp: Date.now() }] }));
          }} />
        )}
        {isBlackout && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[2000] pointer-events-none" />}
      </AnimatePresence>
      <DebugController onSetState={handleDebugStateChange} />
    </div>
  );
};

export default App;
