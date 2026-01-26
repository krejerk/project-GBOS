
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { MemoryNode, MemoryLayer, GameState } from './types';
import { INITIAL_DOSSIER, CORE_NODES, RELATIONSHIP_TREE, KEYWORD_CONSUMPTION_MAP, CATEGORY_IDS } from './constants';
import { DebugController } from './components/DebugController';
import { ErrorBoundary } from './components/ErrorBoundary';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'briefing',
    unlockedNodeIds: ['capone'],
    activeNodeId: null,
    passwordEntered: false,
    collectedClues: [],
    collectedDossierIds: [],
    collectedYears: [],
    collectedAttachments: [],
    unlockedPeople: [],
    unlockedArchiveIds: [],
    systemStability: 84, // Initial Stability
    currentStoryNode: 0, // No story nodes reached yet
    history: [
      { type: 'info', content: '[SYSTEM]: NEURAL LINK ESTABLISHED...', timestamp: Date.now() }
    ],
    consecutiveSearch: undefined
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

  // Handle clearing unused keywords (Jennifer回收未使用的关键词) after Node 3
  const handleClearUnusedKeywords = useCallback(() => {
    // PERSISTENCE REFINED: We clear "searchable" items to clean the UI as Jennifer "sweeps" data.
    // Core people are kept for Mind Map stability; others are swept for re-collection.
    const CORE_KEEPS = ['capone', 'father', 'dr_reggie', 'robert', 'robert_capone'];

    setGameState(prev => ({
      ...prev,
      collectedClues: [],
      collectedYears: [],
      unlockedPeople: prev.unlockedPeople.filter(id => CORE_KEEPS.includes(id.toLowerCase())),
      history: [
        ...prev.history,
        { type: 'info', content: '[JENNIFER]: 已回收并封存所有未使用的关键词', timestamp: Date.now() }
      ]
    }));
  }, []);



  const handleSearch = useCallback(async (query: string) => {
    setIsProcessing(true);
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { type: 'search', content: query, timestamp: Date.now() }]
    }));

    // ===== STRICT KEYWORD VALIDATION SYSTEM =====

    // Define all valid keywords (both Chinese and English variants)
    // Note: Smart phrase matching handles multi-word phrases automatically
    const VALID_KEYWORDS: Record<string, boolean> = {
      // Locations - complete phrases
      'maine': true, '缅因': true, '缅因州': true,
      'ohio': true, '俄亥俄': true, '俄亥俄州': true,
      'chicago': true, '芝加哥': true,
      'nevada': true, '内华达': true, '内华达州': true,
      'mojave': true, '莫哈韦': true, 'mojave rest stop': true, 'mojave_rest_stop': true, '休息站': true, '莫哈韦休息站': true,
      'roanoke': true, '罗阿诺克市': true,
      'twisted_relationship': true, '扭曲关系': true, '肉体关系': true,
      'louisville': true, '路易斯维尔': true,
      'cincinnati': true, '辛辛那提': true,
      'st_louis': true, 'st louis': true, 'st. louis': true, '圣路易斯': true,
      'vampire': true, '吸血鬼': true,

      // Addresses - complete phrases
      '1402': true, 'old dominion': true, 'old_dominion': true, '1402 old dominion rd': true,
      'rd': true, // Keep for abbreviation flexibility

      // Cases - complete phrases
      'small bank': true, 'small_bank': true, '小银行': true,
      'ritual': true, '祭祀': true, '祭祀案': true, 'ritual_case': true, 'ritual case': true,
      'missing': true, '失踪': true,
      'family_massacre': true, '灭门': true, '灭门案': true, 'massacre': true, 'extinction': true,
      'dismemberment_case': true, '碎尸案': true,
      'training': true, '训练日': true, 'training_day': true, 'training day': true,

      // Items
      'cigarette': true, '空烟盒': true, 'empty_cigarette_pack': true, 'empty cigarette pack': true,
      'headdress': true, '阿尔衮琴族头饰': true,
      'graywater_beacon': true, '灰水信标': true,
      'blue_rv': true, 'blue rv': true, '淡蓝色房车': true, '房车': true,

      // Years
      '1971': true, 'year_1971': true,
      '1968': true, 'year_1968': true,
      '1967': true, 'year_1967': true,
      '1985': true, 'year_1985': true,
      '1972': true, 'year_1972': true,
      '1990': true, 'year_1990': true,
      '1973': true, 'year_1973': true,
      '1986': true, 'year_1986': true,
      '1965': true, 'year_1965': true, '1965年': true,

      // People
      'little_derek_wayne': true, '小德里克': true, 'derek wayne': true, 'wayne': true,
      'rubick': true, '鲁比克': true,
      'asian_woman': true, '亚裔女性': true,
      'julip': true, '黄油朱莉普': true,
      'julie': true, '朱莉': true,
      'the_mother': true, 'mother': true, '母亲': true,
      'vanessa': true, '瓦妮莎': true,
      'silas': true, '塞勒斯': true, '赛勒斯': true,
      'father': true, '父亲': true,
      'project': true, '青豆牡蛎汤计划': true,
      'conchar': true, '康查尔': true,
      'nibi': true, '尼比': true,
      'dr_reggie': true, '雷吉博士': true,
      'dirty_frank': true, '脏弗兰克酒吧': true,
      'morning': true, '莫宁': true,
      'lundgren': true, '伦德格兰': true,
      'roger_beebe': true, '罗格·毕比': true, 'roger beebe': true,
      'phoenix': true, '凤凰城行动': true,
      'architect': true, '建筑师': true,
      'syndicate': true, '辛迪加': true,
      'aw_wilmo': true, '小A.W.威尔莫': true,
      'mint_plan': true, 'mint plan': true, '薄荷计划': true,
      'year_1982': true, '1982': true, '1982年': true,
      'el_paso': true, '埃尔帕索': true,
      'juvell_chambers': true, '朱维尔·钱伯斯': true, 'juvell chambers': true,
      'burkesville': true, '伯克斯维尔': true,
      'year_1975': true, '1975': true, '1975年': true,
      'distant_relatives': true, '远亲': true,
      'boris_smirnov': true, '鲍里斯·斯米尔诺夫': true, 'boris smirnov': true,
      'klub75_report': true, 'KLUB-75号分析报告': true, 'KLUB-75': true, 'klub-75': true,
      'quantico': true, '匡提科': true,
      'kansas_city': true, '堪萨斯城': true, 'kansas city': true,
      'mobile_blood_truck': true, '流动献血车': true, 'mobile blood donation vehicle': true,
      'year_1976': true, '1976': true, '1976年': true,
      'jc_penney': true, 'jc penney': true, '杰西·潘尼': true, '杰西潘尼': true,
      'east_12th_st': true, '东12街': true, 'east 12th st': true,
      'execution_room': true, '行刑室': true, 'execution room': true,
      'john_morrissey': true, '约翰·莫里西': true, 'john morrissey': true,
      'chaos_aesthetics': true, '混乱美学': true, 'chaos aesthetics': true,
      'maggots': true, '蛆虫': true, 'vermin': true,
      'davenport': true, '达文波特': true, '达文波特市': true,
      'new_plan': true, '新计划': true, 'new plan': true,
      'peter_henderson': true, '皮特·亨德森': true, '彼特·亨德森': true, 'peter henderson': true,
      'recruitment': true, '招募': true,
      'year_1974': true, '1974': true, '1974年': true,
      'texarkana': true, '特克萨卡纳': true,
      'priest': true, '牧师': true,
      'arthur_dawson': true, 'arthur dawson': true, '亚瑟·道森': true, '亚瑟': true,
    };

    const validateQuery = (queryStr: string) => {
      const lowerQuery = queryStr.toLowerCase().trim();

      // ===== SMART PHRASE MATCHING =====
      // Normalize input: convert underscores to spaces for easier matching
      const normalizedQuery = lowerQuery.replace(/_/g, ' ');

      // Extract all known phrases (sort by length descending for greedy matching)
      const knownPhrases = Object.keys(VALID_KEYWORDS).sort((a, b) => b.length - a.length);

      // Add word boundaries (spaces and punctuation) for matching
      let remainingQuery = ' ' + normalizedQuery + ' ';

      // Greedily match known phrases (longest first)
      for (const phrase of knownPhrases) {
        // Normalize phrase as well (convert underscores to spaces)
        const normalizedPhrase = phrase.replace(/_/g, ' ');
        // Escape regex special characters
        const escaped = normalizedPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Match with word boundaries (space, punctuation, CJK characters, or string boundary)
        // CJK range: \u4e00-\u9fff (Chinese), \u3040-\u30ff (Japanese Hiragana/Katakana)
        const pattern = new RegExp(`([\\s.。,，!！?？\\u4e00-\\u9fff\\u3040-\\u30ff]|^)${escaped}([\\s.。,，!！?？\\u4e00-\\u9fff\\u3040-\\u30ff]|$)`, 'gi');
        remainingQuery = remainingQuery.replace(pattern, '$1 $2'); // Replace matched phrases with space
      }

      // Check if remaining content is only whitespace and punctuation
      const remaining = remainingQuery.replace(/[\s,，.。、！!？?]+/g, '').trim();
      const valid = remaining.length === 0; // All content was matched or is separator

      // ===== FEATURE DETECTION (unchanged) =====
      return {
        valid,
        hasMaine: lowerQuery.includes('maine') || lowerQuery.includes('缅因'),
        hasSmallBank: lowerQuery.includes('small_bank') || lowerQuery.includes('小银行') || lowerQuery.includes('small bank'),
        hasOhio: lowerQuery.includes('ohio') || lowerQuery.includes('俄亥俄'),
        hasRitual: lowerQuery.includes('ritual') || lowerQuery.includes('祭祀'),
        hasChicago: lowerQuery.includes('chicago') || lowerQuery.includes('芝加哥'),
        hasMissing: lowerQuery.includes('missing') || lowerQuery.includes('失踪'),
        hasNevada: lowerQuery.includes('nevada') || lowerQuery.includes('内华达'),
        hasFamilyMassacre: lowerQuery.includes('massacre') || lowerQuery.includes('extinction') || lowerQuery.includes('灭门'),
        hasAddress: lowerQuery.includes('1402') || lowerQuery.includes('old dominion') || lowerQuery.includes('old_dominion'),
        hasTraining: lowerQuery.includes('training') || lowerQuery.includes('训练日') || lowerQuery.includes('training_day'),
        hasMojave: lowerQuery.includes('mojave') || lowerQuery.includes('莫哈韦'),
        hasCigarette: lowerQuery.includes('empty_cigarette_pack') || lowerQuery.includes('空烟盒') || lowerQuery.includes('cigarette'),
        hasYear1971: lowerQuery.includes('1971') || lowerQuery.includes('year_1971'),
        hasLittleDerek: lowerQuery.includes('little_derek_wayne') || lowerQuery.includes('小德里克') || lowerQuery.includes('derek wayne') || lowerQuery.includes('wayne'),
        hasRoanoke: lowerQuery.includes('roanoke') || lowerQuery.includes('罗阿诺克'),
        hasTwistedRelationship: lowerQuery.includes('twisted_relationship') || lowerQuery.includes('扭曲关系') || lowerQuery.includes('肉体关系'),
        hasLouisville: lowerQuery.includes('louisville') || lowerQuery.includes('路易斯维尔'),
        hasBlueRV: lowerQuery.includes('blue_rv') || lowerQuery.includes('blue rv') || lowerQuery.includes('淡蓝色房车') || lowerQuery.includes('房车'),
        hasCincinnati: lowerQuery.includes('cincinnati') || lowerQuery.includes('辛辛那提'),
        hasMintPlan: lowerQuery.includes('mint_plan') || lowerQuery.includes('mint plan') || lowerQuery.includes('薄荷计划'),
        hasBurkesville: lowerQuery.includes('burkesville') || lowerQuery.includes('伯克斯维尔'),
        hasDistantRelatives: lowerQuery.includes('distant_relatives') || lowerQuery.includes('distant relatives') || lowerQuery.includes('远亲'),
        hasKlub75Report: lowerQuery.includes('klub75_report') || lowerQuery.includes('klub-75') || lowerQuery.includes('KLUB-75号分析报告'),
        hasQuantico: lowerQuery.includes('quantico') || lowerQuery.includes('匡提科'),
        hasKansasCity: lowerQuery.includes('堪萨斯城') || lowerQuery.includes('kansas city') || lowerQuery.includes('kansas_city'),
        hasMobileBloodTruck: lowerQuery.includes('流动献血车') || lowerQuery.includes('mobile_blood_truck') || lowerQuery.includes('mobile blood donation vehicle'),
        hasYear1976: lowerQuery.includes('1976') || lowerQuery.includes('1976年') || lowerQuery.includes('year_1976'),
        hasJCPenney: lowerQuery.includes('jc_penney') || lowerQuery.includes('jc penney') || lowerQuery.includes('杰西·潘尼') || lowerQuery.includes('杰西潘尼'),
        hasEast12thSt: lowerQuery.includes('东12街') || lowerQuery.includes('east 12th st') || lowerQuery.includes('east_12th_st'),
        hasExecutionRoom: lowerQuery.includes('行刑室') || lowerQuery.includes('execution room') || lowerQuery.includes('execution_room'),
        hasYear1965: lowerQuery.includes('1965') || lowerQuery.includes('year_1965'),
        hasJohnMorrissey: lowerQuery.includes('john_morrissey') || lowerQuery.includes('john morrissey') || lowerQuery.includes('约翰·莫里西') || lowerQuery.includes('约翰莫里西'),
        hasStLouis: lowerQuery.includes('st_louis') || lowerQuery.includes('圣路易斯') || lowerQuery.includes('st louis'),
        hasMaggots: lowerQuery.includes('maggots') || lowerQuery.includes('蛆虫') || lowerQuery.includes('vermin'),
        hasDavenport: lowerQuery.includes('davenport') || lowerQuery.includes('达文波特') || lowerQuery.includes('达文波特市'),
        hasNewPlan: lowerQuery.includes('new_plan') || lowerQuery.includes('new plan') || lowerQuery.includes('新计划'),
        hasPeterHenderson: lowerQuery.includes('peter_henderson') || lowerQuery.includes('peter henderson') || lowerQuery.includes('皮特·亨德森') || lowerQuery.includes('彼特·亨德森'),
        hasRecruitment: lowerQuery.includes('recruitment') || lowerQuery.includes('招募'),
        hasYear1974: lowerQuery.includes('1974') || lowerQuery.includes('year_1974'),
        hasTexarkana: lowerQuery.includes('texarkana') || lowerQuery.includes('特克萨卡纳'),
        hasPriest: lowerQuery.includes('priest') || lowerQuery.includes('牧师'),
        hasDirtyFrank: lowerQuery.includes('dirty_frank') || lowerQuery.includes('脏弗兰克酒吧') || lowerQuery.includes('dirty frank'),
        hasDismemberment: lowerQuery.includes('dismemberment_case') || lowerQuery.includes('碎尸案') || lowerQuery.includes('dismemberment')
      };
    };


    const validation = validateQuery(query);

    // Confession 1: Maine + Small Bank (STRICT)
    if (validation.hasMaine && validation.hasSmallBank) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        const node = nodes.find(id => id.id === 'confession_1');
        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 2: Ohio OR Ritual (STRICT)
    if (validation.hasOhio || validation.hasRitual) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        const node = nodes.find(id => id.id === 'confession_2');
        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 3: Chicago AND Missing (STRICT)
    if (validation.hasChicago && validation.hasMissing) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        const node = nodes.find(id => id.id === 'confession_3');
        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 13: East 12th St AND Execution Room (STRICT)
    if (validation.hasEast12thSt && validation.hasExecutionRoom) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_13');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_13');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }


    // Confession 14: St. Louis AND Maggots (STRICT)
    if (validation.hasStLouis && validation.hasMaggots) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_14');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_14');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 15: Davenport AND New Plan (STRICT)
    if (validation.hasDavenport && validation.hasNewPlan) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_15');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_15');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 16: Texarkana AND Dismemberment Case (STRICT)
    if (validation.hasTexarkana && validation.hasDismemberment) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_16');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_16');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 4: Address AND Training Day (STRICT)
    if (validation.hasAddress && validation.hasTraining) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        const node = nodes.find(n => n.id === 'confession_4');
        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 5: Nevada AND Family Massacre (STRICT)
    if (validation.hasNevada && validation.hasFamilyMassacre) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

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
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Archive 5: 1971 AND Little Derek Wayne (STRICT)
    if (validation.hasYear1971 && validation.hasLittleDerek) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        setGameState(prev => {
          if (prev.unlockedArchiveIds.includes('nv_1971')) {
            return prev;
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

    // Confession 6: Mojave AND Cigarette (STRICT)
    if (validation.hasMojave && validation.hasCigarette) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

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
          const isAlreadyUnlocked = gameState.unlockedNodeIds.includes(node.id);

          setGameState(prev => ({
            ...prev,
            activeNodeId: node!.id,
            unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
            systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
            history: isAlreadyUnlocked ? prev.history : [
              ...prev.history,
              { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
            ]
          }));
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 7: Roanoke AND Twisted Relationship (STRICT)
    if (validation.hasRoanoke && validation.hasTwistedRelationship) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_7');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_7');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 8: Louisville AND Blue RV (STRICT)
    if (validation.hasLouisville && validation.hasBlueRV) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_8');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_8');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 9: Cincinnati + Mint Plan
    if (validation.hasCincinnati && validation.hasMintPlan) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: \"你在说什么？想从我这套话,你得有点东西交换才行。\"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_9');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_9');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 10: Burkesville AND Distant Relatives (STRICT)
    if (validation.hasBurkesville && validation.hasDistantRelatives) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_10');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_10');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 11: KLUB-75 Report AND Quantico (STRICT)
    if (validation.hasKlub75Report && validation.hasQuantico) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_11');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_11');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Confession 12: Kansas City + Mobile Blood Truck (STRICT)
    if (validation.hasKansasCity && validation.hasMobileBloodTruck) {
      if (!validation.valid) {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: '> [R. CAPONE]: "你在说什么？想从我这套话,你得有点东西交换才行。"', timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_12');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_12');
          if (coreNode) {
            node = coreNode;
            setNodes(prev => [...prev, coreNode]);
          }
        }

        if (node) {
          setGameState(prev => {
            const isAlreadyUnlocked = prev.unlockedNodeIds.includes(node!.id);
            return {
              ...prev,
              activeNodeId: node!.id,
              unlockedNodeIds: isAlreadyUnlocked ? prev.unlockedNodeIds : Array.from(new Set([...prev.unlockedNodeIds, node!.id])),
              systemStability: isAlreadyUnlocked ? prev.systemStability : Math.min(prev.systemStability + 20, 84),
              history: isAlreadyUnlocked ? prev.history : [
                ...prev.history,
                { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——${node!.title}`, timestamp: Date.now() },
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Clipping 11 Unlock: 1976 + Kansas City
    if (validation.hasYear1976 && validation.hasKansasCity) {
      handleUnlockArchive('kan_1976');
    }

    // Clipping 12 Unlock: 1965 + John Morrissey
    if (validation.hasYear1965 && validation.hasJohnMorrissey) {
      handleUnlockArchive('kc_1965');
    }

    // Clipping 13 Unlock: 1976 + Peter Henderson
    if (validation.hasYear1976 && validation.hasPeterHenderson) {
      handleUnlockArchive('ia_1976');
    }

    // Track consecutive invalid inputs for special easter egg
    const invalidInputKey = 'consecutive_invalid_inputs';
    const getInvalidCount = () => parseInt(sessionStorage.getItem(invalidInputKey) || '0');
    const incrementInvalidCount = () => sessionStorage.setItem(invalidInputKey, String(getInvalidCount() + 1));
    const resetInvalidCount = () => sessionStorage.removeItem(invalidInputKey);

    // Track Vanessa consecutive searches
    const isVanessaQuery = lowerQuery === '瓦妮莎' || lowerQuery === 'vanessa';
    let finalQuery = query;
    let newConsecutive: { keyword: string, count: number } | undefined = undefined;

    if (isVanessaQuery) {
      const prevCount = gameState.consecutiveSearch?.keyword === 'vanessa' ? gameState.consecutiveSearch.count : 0;
      const newCount = prevCount + 1;
      newConsecutive = { keyword: 'vanessa', count: newCount };

      if (newCount === 3) {
        finalQuery = 'vanessa_consecutive_3';
        newConsecutive = undefined; // Reset after trigger
      }
    } else {
      newConsecutive = undefined;
    }

    // Define preset responses with priority levels and fuzzy keywords
    const PRESET_RESPONSES: Array<{
      keywords: string[];
      response: string;
      priority?: number; // Higher = checked first
      fuzzyMatch?: boolean; // If true, matches partial/related questions
      isReveal?: boolean;
    }> = [
        // ===== USER-PROVIDED EASTER EGGS (Highest Priority) =====
        {
          keywords: ['vanessa_consecutive_3'],
          response: '> [R. CAPONE]: "……够了。既然你这么执着挖掘我的伤口，那就看清楚了。瓦妮莎确实与别人不同……1976年，堪萨斯城，她哭着求我不要执行那个针对流动献血车的计划。但我没有听。我当时太想看那个城市燃烧了。"',
          priority: 200,
          isReveal: true
        },
        {
          keywords: ['真相', 'truth', '真实', 'reality', '是什么真相'],
          response: '> [R. CAPONE]: "真相就在那些灰水里，你得把手伸进去捞，而不是在这里敲打键盘。它闻起来不怎么好。"',
          priority: 100,
          fuzzyMatch: true
        },
        {
          keywords: ['圣路易斯', 'st louis', 'st. louis', '吸血鬼', 'vampire'],
          response: '> [R. CAPONE]: "你想知道圣路易斯发生了什么？去问阿尔特曼啊，让他在办公室里照照镜子就知道吸血鬼在哪了。别来问我。我已经死了，不存在了。"',
          priority: 110,
          fuzzyMatch: true
        },
        {
          keywords: ['意义', 'meaning', '目的', 'purpose', '为了什么'],
          response: '> [R. CAPONE]: "在这儿，意义是按卷宗页数计算的。如果你想找灵魂，去出门左转的教堂，别在我的档案库里晃荡。"',
          priority: 100,
          fuzzyMatch: true
        },
        {
          keywords: ['我是谁', 'who am i', 'who i am', '我到底是谁', '是谁'],
          response: `> [R. CAPONE]: "你是一个潜伏在自己脑子里的幽灵。别急，等显像管的灯火熄灭，你会想起那一包'铁马'烟的。"`,
          priority: 100
        },
        {
          keywords: ['青豆牡蛎汤', 'gbos', 'g.b.o.s', '牡蛎汤', 'green bean oyster soup'],
          response: '> [R. CAPONE]: "那是犯罪的味道，还是某种邪恶仪式的序曲？我建议你先查查1968年的那份谷仓档案。"',
          priority: 90
        },
        {
          keywords: ['雷吉博士', '雷吉', 'dr reggie', 'reggie', 'dr. reggie', '博士'],
          response: '> [R. CAPONE]: "别在背后念叨那个名字。他能听到你的想法，就像他当年坚信自己能听到上帝的声音一样。"',
          priority: 90
        },
        {
          keywords: ['黄油朱莉普', 'golden julip', 'julip', '朱莉普', '黄油'],
          response: '> [R. CAPONE]: "这是我在那个维度醒来前，喝的最后一杯酒。现在我舌头上剩下的只有铁锈味和灰水箱里的霉块。别用这杯酒来诱惑一个已经没法吞咽的人。"',
          priority: 90
        },
        {
          keywords: ['詹妮弗', 'jennifer', '珍妮弗'],
          response: '> [R. CAPONE]: "别逗了，你收到的档案里根本就没有詹妮弗这个名字，你想问的是那只银喜鹊，我们在营地的时候，她是那个负责在大家睡觉时，从外面反锁车门的人。"',
          priority: 95
        },
        {
          keywords: ['铁马', 'iron horse', 'iron-horse', '烟盒', '香烟盒'],
          response: '> [R. CAPONE]: "亮橙色的盒子，印着那台永远跑不到头的火车头。雷吉博士以为那是他的传声筒，但他不知道，每次我把它丢进灰水管道时，我都在想：如果这封信没被捡走，我是不是就能永远留在房车里了？"',
          priority: 90
        },
        {
          keywords: ['自助洗衣店', '洗衣店', 'laundromat', '玛莎', 'martha'],
          response: '> [R. CAPONE]: "惨白的灯光，像是在审判。干衣机转动的声音让我想起雷吉博士的穿孔卡片机。在那里，玛莎·迪亚兹不再是玛莎，她变成了一张白色的床单，等着我们去染色。康查尔说，那是我们共同完成的第一幅画。"',
          priority: 90
        },
        {
          keywords: ['修道院', 'abbey', '初次会面', '修道院任务'],
          response: '> [R. CAPONE]: "詹妮弗说是修道院？（发出一声嘶哑的冷笑）……随她怎么说吧。我只记得那是一个没有上帝的地方，到处都是旧书的味道和发霉的阴影。那是\'初次会面\'。我以为我是去执行任务，结果我是参加我自己的葬礼。"',
          priority: 90
        },
        {
          keywords: ['银喜鹊', 'silver magpie', '喜鹊', '铁链', '她的灯'],
          response: '> [R. CAPONE]: "我在睡觉时总能听到她在门外走动，铁链在地上拖行的声音。她从不杀人，她只负责确保没人能逃走。如果你见到了她，潜航者，离她的灯远一点。"',
          priority: 90
        },
        {
          keywords: ['亚利桑那', 'arizona', 'high life', '酒吧', '父亲的酒吧', '劣质啤酒'],
          response: '> [R. CAPONE]: "这店里全是劣质啤酒和泔水的味道。父亲就站在那儿，他没有发火，只是微笑着帮我点着了烟。他说：信写得不错，罗伯特。下次记得把我的名字写得工整点。"',
          priority: 90
        },

        // ===== FAMILY MEMBERS (High Priority) =====
        {
          keywords: ['母亲', 'the mother', 'mother', '她的眼睛'],
          response: '> [R. CAPONE]: "你想象不出她能用她那双眼睛做什么。从我上车之后，她的目光就开始拆解我。我的蜕变并非始于\"父亲\"的暴力，而是始于爱。"',
          priority: 90
        },
        {
          keywords: ['塞勒斯', '赛勒斯', 'silas', '次子'],
          response: '> [R. CAPONE]: "与康查尔不同，塞勒斯身上有种毫无遮掩的恶意，我从未分清他们究竟谁更危险，是一个在暗处观察你的影子，还是一个在你背后磨刀的疯子。"',
          priority: 90
        },
        {
          keywords: ['瓦妮莎', 'vanessa', '养女'],
          response: '> [R. CAPONE]: "她最恶心的那个。一方面她是\"父亲\"的玩物，更多时候，当\"母亲\"、康查尔和赛勒斯开始令人作呕的三人行时，她又会被推出来，充当他们欲望交织时的调剂工具……关于她，我没什么可说的。"',
          priority: 90
        },

        // ===== ORIGINAL EASTER EGGS (Medium Priority) =====
        {
          keywords: ['康查尔', 'conchar'],
          response: '> [R. CAPONE]: "父亲负责播种，而康查尔负责修剪。他是家族的园丁。他看我们的眼神总是像看一群还没训好的牲口。他相信血缘是这世界上最脆弱的东西，只有共同流过的血，才是永恒的。"',
          priority: 85
        },
        {
          keywords: ['家族', 'family', 'syndicate', '辛迪加'],
          response: '> [R. CAPONE]: "在路易斯维尔，康查尔告诉我，\'你现在没有名字了，你只有家。\'"',
          priority: 80
        },
        {
          keywords: ['父亲', 'father', 'dad'],
          response: '> [R. CAPONE]: "父亲...那个男人教会了我什么是真正的恶。他说，过度伤害会导致掩护色失效。只有被高度约束的攻击性，才会孕育出真正的仪式。"',
          priority: 80
        },
        {
          keywords: ['建筑师', 'architect'],
          response: '> [UNKNOWN SIGNAL]: "建筑师...他是设计师，是操纵者。他的作品不是建筑，是活体实验. 而我，我帮他完成了最后一步。"',
          priority: 80
        },
        {
          keywords: ['出去', '离开', 'escape', 'leave', 'get out'],
          response: '> [R. CAPONE]: "我想离开这个鬼地方...但深渊没有回头路。我不是在潜伏，我是在进化。"',
          priority: 70
        },
        {
          keywords: ['记得', '记忆', 'remember', 'memory', '想起', 'recall'],
          response: '> [R. CAPONE]: "我不记得了... 只有一些破碎的画面... 银行，雪地，康查尔的微笑...这些碎片在我脑子里盘旋。"',
          priority: 70
        },
        {
          keywords: ['为什么', 'why', '原因', 'reason'],
          response: '> [R. CAPONE]: "为什么？你也在问为什么吗？我他妈也想知道为什么！为什么是我，为什么是那些人......"',
          priority: 70,
          fuzzyMatch: true
        },

        // ===== GENERIC CONVERSATIONAL FALLBACKS (Low Priority) =====
        {
          keywords: ['你好', 'hello', 'hi', '嗨', 'hey'],
          response: '> [R. CAPONE]: "谁在那里？你的声音直接出现在我脑子里...这是治疗的一部分吗？"',
          priority: 50
        },
        {
          keywords: ['帮助', 'help', '救', 'save'],
          response: `> [R. CAPONE]: "帮助？如果这也是'治疗'的一部分，那你们的手段真够恶心的。"`,
          priority: 50
        },
        {
          keywords: ['堪萨斯城', 'kansas city', 'kansas_city'],
          response: '> [R. CAPONE]: "堪萨斯城... 那里本该只有麦浪和宁静。但我带去了火焰，带去了不该属于那个地方的尖叫。那是瓦妮莎最后一次试图阻止我。"',
          priority: 80
        },
        {
          keywords: ['流动献血车', 'mobile_blood_truck', 'mobile blood donation vehicle'],
          response: '> [R. CAPONE]: "一辆白色的车，在城市边缘安静地停着。谁会想到那会是恶梦的开始？雷吉博士说那是‘净化的祭坛’。我只记得血的味道。"',
          priority: 80
        },
        {
          keywords: ['1976', '1976年', 'year_1976'],
          response: '> [R. CAPONE]: "1976年。那一年堪萨斯城的夏天特别长，蝉鸣声盖过了一切。那天之后，我再也没见过瓦妮莎笑过。"',
          priority: 80
        },
        {
          keywords: ['痛', 'pain', 'hurt', '头', 'headache'],
          response: '> [R. CAPONE]: "我的头...像要裂开一样。每次我试图记起什么，就像有人在我脑子里用刀刻字。"',
          priority: 50
        }
      ];

    // Sort by priority (highest first)
    const sortedResponses = [...PRESET_RESPONSES].sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // Try to match query against preset responses
    let matchedItem: any = null;
    const effectiveQuery = finalQuery.toLowerCase().trim();

    for (const preset of sortedResponses) {
      const hasMatch = preset.keywords.some(keyword => {
        if (preset.fuzzyMatch) {
          // Fuzzy matching: check if query contains keyword or keyword contains query
          const keywordTokens = keyword.split(/\s+/);
          const queryTokens = effectiveQuery.split(/\s+/);

          // Check if any significant token overlaps
          return keywordTokens.some(kt =>
            queryTokens.some(qt => qt.length > 1 && (qt.includes(kt) || kt.includes(qt)))
          ) || effectiveQuery.includes(keyword) || keyword.includes(effectiveQuery);
        } else {
          // Strict matching
          return effectiveQuery.includes(keyword);
        }
      });

      if (hasMatch) {
        matchedItem = preset;
        resetInvalidCount(); // Reset counter on valid match
        break;
      }
    }

    if (matchedItem) {
      // Found a preset response
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          consecutiveSearch: newConsecutive,
          history: [
            ...prev.history,
            {
              type: 'info',
              content: matchedItem.response,
              isReveal: matchedItem.isReveal,
              timestamp: Date.now()
            }
          ]
        }));
        setIsProcessing(false);
      }, 300);
    } else {
      // No match - increment invalid count and check for special easter egg
      incrementInvalidCount();
      const currentCount = getInvalidCount();

      let responseMessage: string;

      if (currentCount >= 3) {
        // Special easter egg for 3+ consecutive invalid inputs
        responseMessage = '> [R. CAPONE]: "我的突触还没完全烧坏，但也经不起你这么折腾。如果你不知道要找什么，就滚回现实世界去喝杯咖啡。"';
        resetInvalidCount(); // Reset after showing special message
      } else {
        // Regular noise responses
        const noiseResponses = [
          '> [R. CAPONE]: "我不知道你在说什么..."',
          '> [R. CAPONE]: "这些词对我没什么意义。"',
          '> [R. CAPONE]: "试试用更清晰的词，我的记忆...很混乱。"',
          '> [R. CAPONE]: "你得给我点更具体的东西。"'
        ];
        responseMessage = noiseResponses[Math.floor(Math.random() * noiseResponses.length)];
      }

      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          consecutiveSearch: newConsecutive,
          history: [
            ...prev.history,
            { type: 'info', content: responseMessage, timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
      }, 300);
    }
  }, [gameState.consecutiveSearch, gameState.history, nodes]);

  // --- SYNC NODES WITH UNLOCKED IDS (Safety for Debug Jumps) ---
  React.useEffect(() => {
    const missingNodes = gameState.unlockedNodeIds.filter(id => !nodes.some(n => n.id === id));
    if (missingNodes.length > 0) {
      const newNodes = missingNodes.map(id => CORE_NODES.find(n => n.id === id)).filter(Boolean) as MemoryNode[];
      if (newNodes.length > 0) {
        setNodes(prev => {
          // Double check to prevent duplicates in race conditions
          const existingIds = new Set(prev.map(n => n.id));
          const uniqueNewNodes = newNodes.filter(n => !existingIds.has(n.id));
          return uniqueNewNodes.length > 0 ? [...prev, ...uniqueNewNodes] : prev;
        });
      }
    }
  }, [gameState.unlockedNodeIds, nodes]);

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
    // Add to collected attachments and show history
    setGameState(prev => {
      if (prev.collectedAttachments?.includes(id)) return prev;

      return {
        ...prev,
        collectedAttachments: [...(prev.collectedAttachments || []), id]
      };
    });
  };

  const handleCollectClue = (clueId: string, word: string) => {
    const isDossier = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon'].includes(clueId);
    const isPerson = CATEGORY_IDS.PEOPLE.includes(clueId);
    const isYear = CATEGORY_IDS.YEARS.includes(clueId);
    const isLocation = CATEGORY_IDS.LOCATIONS.includes(clueId);
    const isCase = CATEGORY_IDS.CASES.includes(clueId);

    // Use functional update to ensure we always have the latest state
    setGameState(prev => {
      const currentConsumed = new Set<string>();
      prev.unlockedNodeIds.forEach(id => {
        const list = KEYWORD_CONSUMPTION_MAP[id];
        if (list) list.forEach(k => currentConsumed.add(k));
      });

      const updates: Partial<GameState> = {};
      const newHistory: Array<{ type: 'search' | 'info' | 'shatter'; content: string; timestamp: number }> = [];

      // REWARDS: These skip consumption checks
      const REWARD_IDS = ['recruitment', 'priest', 'morning', 'year_1974', 'texarkana', 'el_paso', 'dirty_frank', 'dismemberment_case'];
      const isReward = REWARD_IDS.includes(clueId);

      if (!isReward && currentConsumed.has(clueId)) return prev;

      // UNIFIED COLLECTION LOGIC
      if (isPerson) {
        let unlockedId = clueId;
        if (clueId === 'robert' || clueId === 'robert_capone') unlockedId = 'capone';
        if (!prev.unlockedPeople.includes(unlockedId)) {
          updates.unlockedPeople = [...prev.unlockedPeople, unlockedId];
          newHistory.push({ type: 'info', content: `[PERSON IDENTIFIED]: ${word} 已收录到人物关系`, timestamp: Date.now() });
        }
      }
      else if (isDossier) {
        if (!prev.collectedDossierIds.includes(clueId)) {
          updates.collectedDossierIds = [...(prev.collectedDossierIds || []), clueId];
          newHistory.push({ type: 'info', content: `[EVIDENCE FILED]: ${word} 已收录到案卷建档`, timestamp: Date.now() });
        }
        if (clueId === 'julip' && !prev.collectedClues.includes(clueId)) {
          updates.collectedClues = [...prev.collectedClues, clueId];
          newHistory.push({ type: 'info', content: `[KEYWORD RECORDED]: ${word} 已收录至检索提示`, timestamp: Date.now() });
        }
      }
      else if (isYear) {
        // Years can be re-collected for different archive triggers
        // Always add to array (even if duplicate) to support multiple uses
        updates.collectedYears = [...prev.collectedYears, clueId];
      }
      else if (isLocation || isCase) {
        if (!prev.collectedClues.includes(clueId)) {
          updates.collectedClues = [...prev.collectedClues, clueId];
          const label = isLocation ? 'LOCATION' : 'CASE';
          newHistory.push({ type: 'info', content: `[${label} IDENTIFIED]: ${word} 已收录`, timestamp: Date.now() });
        }
      }
      else {
        if (!prev.collectedClues.includes(clueId)) {
          updates.collectedClues = [...prev.collectedClues, clueId];
          newHistory.push({ type: 'info', content: `[KEYWORD RECORDED]: ${word} 已记下`, timestamp: Date.now() });
        }
      }

      if (Object.keys(updates).length > 0 || newHistory.length > 0) {
        return { ...prev, ...updates, history: [...prev.history, ...newHistory] };
      }
      return prev;
    });
  };

  const handleUnlockArchive = (archiveId: string) => {
    setGameState(prev => {
      if (!prev.unlockedArchiveIds.includes(archiveId)) {
        return {
          ...prev,
          unlockedArchiveIds: [...prev.unlockedArchiveIds, archiveId],
          history: [
            ...prev.history,
            { type: 'info', content: `[ARCHIVE RETRIEVED]: ${archiveId.toUpperCase()}`, timestamp: Date.now() }
          ]
        };
      }
      return prev;
    });
  };

  const handleConsumeKeywords = (yearIds: string[], personIds: string[]) => {
    // PERSISTENCE OVERHAUL: We no longer physically remove keywords from state.
    // Visual consumption is handled by KEYWORD_CONSUMPTION_MAP in components.
    setGameState(prev => ({
      ...prev,
      history: [
        ...prev.history,
        { type: 'info', content: '[SYSTEM LOG]: 信息已关联至指定卷宗', timestamp: Date.now() }
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
          <ErrorBoundary>
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
              collectedAttachments={gameState.collectedAttachments || []}
              onStoryNodeComplete={handleStoryNodeComplete}
              onRetrace={handleRetrace}
              onClearUnusedKeywords={handleClearUnusedKeywords}
              currentStoryNode={gameState.currentStoryNode}
            />
          </ErrorBoundary>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
