
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { MemoryNode, MemoryLayer, GameState } from './types';
import {
  INITIAL_DOSSIER, CORE_NODES, RELATIONSHIP_TREE, KEYWORD_CONSUMPTION_MAP, CATEGORY_IDS,
  GLOBAL_KEYWORD_MAP, BRIEFING_SECTIONS,
  JENNIFER_NODE_1_DIALOGUE, JENNIFER_NODE_2_DIALOGUE, JENNIFER_NODE_3_DIALOGUE, JENNIFER_NODE_4_DIALOGUE, JENNIFER_NODE_5_DIALOGUE
} from './constants';
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
    isHacked: false,
    consecutiveSearch: undefined
  });

  const [nodes, setNodes] = useState(CORE_NODES);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- SUBCONSCIOUS RETRACE LOGIC ---
  const handleRetrace = useCallback(() => {
    // 1. Check Stability - Be extremely defensive
    const stability = typeof gameState.systemStability === 'number' ? gameState.systemStability : 84;

    if (stability <= 0) {
      return { success: false, reason: 'STABILITY_CRITICAL' };
    }

    // 2. Calculate Missed Keywords
    let allAvailableKeywords: string[] = [];

    // A. Briefing Sections
    BRIEFING_SECTIONS.forEach(section => {
      // Find all [word](clue:id) matches
      const matches = section.content.matchAll(/\[(.*?)\]\(clue:(.*?)\)/g);
      for (const match of matches) {
        allAvailableKeywords.push(match[2].trim());
      }
    });

    // B. Unlocked Nodes (CORE_NODES)
    const unlockedIdSet = new Set(gameState.unlockedNodeIds);
    CORE_NODES.forEach(node => {
      if (unlockedIdSet.has(node.id) && node.revealedKeywords) {
        allAvailableKeywords = [...allAvailableKeywords, ...node.revealedKeywords];
      }
    });

    // C. Jennifer Story Dialogues
    const jenniferDialogues: string[][] = [];
    if (gameState.currentStoryNode >= 1) jenniferDialogues.push(JENNIFER_NODE_1_DIALOGUE);
    if (gameState.currentStoryNode >= 2) jenniferDialogues.push(JENNIFER_NODE_2_DIALOGUE);
    if (gameState.currentStoryNode >= 3) jenniferDialogues.push(JENNIFER_NODE_3_DIALOGUE);
    if (gameState.currentStoryNode >= 4) jenniferDialogues.push(JENNIFER_NODE_4_DIALOGUE);
    if (gameState.currentStoryNode >= 5) jenniferDialogues.push(JENNIFER_NODE_5_DIALOGUE);

    jenniferDialogues.forEach(dialog => {
      dialog.forEach(line => {
        const matches = line.matchAll(/\[(.*?)\]\(clue:(.*?)\)/g);
        for (const match of matches) {
          allAvailableKeywords.push(match[2].trim());
        }
      });
    });

    // D. Scan History for Preset Responses / Easter Eggs
    gameState.history.forEach(item => {
      if (typeof item.content === 'string') {
        Object.entries(GLOBAL_KEYWORD_MAP).forEach(([word, info]) => {
          if (item.content.includes(word)) {
            allAvailableKeywords.push(info.id);
          }
        });
      }
    });

    // Filter out already collected ones
    const collectedSet = new Set([
      ...gameState.collectedClues,
      ...gameState.collectedDossierIds,
      ...gameState.collectedYears,
      ...gameState.unlockedPeople
    ]);
    const missedKeywords = [...new Set(allAvailableKeywords.filter(k => !collectedSet.has(k)))];

    // 3. Apply Penalty
    setGameState(prev => {
      const currentStability = typeof prev.systemStability === 'number' ? prev.systemStability : 84;
      return {
        ...prev,
        systemStability: Math.max(0, currentStability - 20)
      };
    });

    return { success: true, keywords: missedKeywords };
  }, [gameState.systemStability, gameState.unlockedNodeIds, gameState.currentStoryNode, gameState.history, gameState.collectedClues, gameState.collectedDossierIds, gameState.collectedYears, gameState.unlockedPeople]);

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



  /* New Animation State for Node 6 Awakening */
  const [isPersonaGlitching, setIsPersonaGlitching] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    setIsProcessing(true);
    setGameState(prev => ({
      ...prev,
      history: [...prev.history, { type: 'search', content: query, timestamp: Date.now() }]
    }));

    // === SPECIAL: Node 6 Awakening / Reboot Command ===
    if (query.includes('FORCE_LOAD_MONSTER') || query.includes('0x524F42455254_PURGE')) {
      // Trigger INTENSE visual glitch (Persona Swap)
      setIsPersonaGlitching(true);

      // Flicker effect sequence
      setTimeout(() => setIsPersonaGlitching(false), 100);
      setTimeout(() => setIsPersonaGlitching(true), 150);
      setTimeout(() => setIsPersonaGlitching(false), 300);
      setTimeout(() => setIsPersonaGlitching(true), 400); // Longest hold
      setTimeout(() => setIsPersonaGlitching(false), 1200); // End glitch

      // Response Logic
      setTimeout(() => {
        setGameState(prev => {
          // Remove the reboot command chip so it 'disappears'
          const newCollectedClues = prev.collectedClues.filter(c => c !== 'reboot_command');

          return {
            ...prev,
            history: [
              ...prev.history,
              {
                type: 'dialogue',
                id: 'node_6_awakening',
                content: '> [ROBERT_CAPONE]: "你对我做了什么？感觉就像脑子里被插进了一根烧红的铁条。 趁我现在还清醒，你不想知道我为什么始终像条狗一样听话吗？ 检索关键词：80号洲际公路、守夜人，看看在我变成怪物之前，他们是怎么造出这个该死的笼子的。"',
                timestamp: Date.now()
              }
            ],
            // DO NOT auto-unlock. Let user pick them from dialogue.
            collectedClues: newCollectedClues,
            collectedDossierIds: prev.collectedDossierIds,
          };
        });
        setIsProcessing(false);
      }, 1300); // Sync with glitch end
      return;
    }

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
      '1977': true, 'year_1977': true, '1977年': true,

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
      'richie_dreyfuss': true, 'richie dreyfuss': true, '里奇·德莱弗斯': true, '里奇': true,
      'rockford': true, '罗克福德': true, '罗克福德市': true,
      'priest': true, '牧师': true,
      'arthur_dawson': true, 'arthur dawson': true, '亚瑟·道森': true, '亚瑟': true,
      'interstate_80': true, '80号洲际公路': true, '80号公路': true,
      'watchman': true, '守夜人': true,
      'portland': true, '波特兰': true,
      'achilles_heel': true, '软肋': true,
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
        hasDismemberment: lowerQuery.includes('dismemberment_case') || lowerQuery.includes('碎尸案') || lowerQuery.includes('dismemberment'),
        hasYear1977: lowerQuery.includes('1977') || lowerQuery.includes('year_1977'),
        hasRichie: lowerQuery.includes('richie_dreyfuss') || lowerQuery.includes('richie dreyfuss') || lowerQuery.includes('里奇·德莱弗斯') || lowerQuery.includes('里奇'),
        hasDenverSuburb: lowerQuery.includes('denver_suburb') || lowerQuery.includes('丹佛市郊'),
        hasPoliceKilling: lowerQuery.includes('police_killing') || lowerQuery.includes('警员遇害案'),
        hasElPaso: lowerQuery.includes('el_paso') || lowerQuery.includes('埃尔帕索'),
        hasInterstate80: lowerQuery.includes('80号洲际公路') || lowerQuery.includes('interstate_80') || lowerQuery.includes('80号公路'),
        hasWatchman: lowerQuery.includes('守夜人') || lowerQuery.includes('watchman'),
        hasPortland: lowerQuery.includes('波特兰') || lowerQuery.includes('portland'),
        hasAchillesHeel: lowerQuery.includes('软肋') || lowerQuery.includes('achilles_heel'),
      };
    };


    const validation = validateQuery(query);

    // Confession 17: Dirty Frank + Recruitment
    if (validation.hasDirtyFrank && validation.hasRecruitment) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_17');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_17');
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

    // Confession 18: Denver Suburb + Police Killing
    if (validation.hasDenverSuburb && validation.hasPoliceKilling) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_18');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_18');
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

    // Confession 19: El Paso + Priest
    if (validation.hasElPaso && validation.hasPriest) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_19');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_19');
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

    // Confession 20: Interstate 80 + Watchman
    if (validation.hasInterstate80 && validation.hasWatchman) {
      setTimeout(() => {
        let node = nodes.find(n => n.id === 'confession_20');

        if (!node) {
          const coreNode = CORE_NODES.find(n => n.id === 'confession_20');
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
                {
                  type: 'dialogue',
                  id: 'confession_20_content',
                  content: `> [供述 No.20 内容]:\n\n“你一直问我，作为一个受过训练的卧底，作为一个手里有枪的人，为什么我不直接杀了‘父亲’？为什么这几年来，我像条狗一样跟着他在美国兜圈子？\n\n起先不动手的原因很简单，我还没有看到收网的时机。雷吉博士曾经说过，在得到‘收网信号’之前，我什么也不能做。所以起先我一直在等。我在等一个永远不会来的电话。我在等你们告诉我，‘可以了，罗伯特，结束了’。如你所知，没有回应，就在这漫长的等待过程中，情况发生了变化。当然，你也可以说，在看了如此多恶行之后，即便没有指令，我也可以依照本能行事，甚至直接一了百了，但我不能，因为某时某刻，我几乎已经成了家族的一员。\n\n是啊，你已经知道了房车内的家族关系是什么样。被作为肉体容器和把他人当做肉体容器，以及父亲的权威，这两样东西彻底挫伤了我，但并不仅仅是因为肉欲和恐惧感，维持这个系统运转的，还有另外两样东西。\n\n第一样，是驾驶座后面的那个药箱。钥匙挂在父亲的脖子上。那里面装的不是毒品那么简单的东西，那是一种精心调配的化学鸡尾酒。父亲甚至不需要用枪指着我。只要我错过了一次服药时间，或者仅仅是产生了强烈的对抗念头导致的焦虑，我的身体就会崩溃。我会呕吐、痉挛、看到地狱的幻觉。在那之后的每一个清晨，当父亲微笑着把药片递给我时，我不仅不会杀他，我还会感激他。\n\n第二样，是通过远亲所编织的一张看不见的网。不过关于这一点，至今我都仍然无法百分之百确认。可以确认的是，每当夜幕降临，无论我们在哪停车，都有一个守夜机制，当时间来到午夜十二点，车门便会忽然从外面反锁起来。由于车里一片漆黑，起先我以为是康查尔或塞勒斯在守夜，但时间久了，我却渐渐意识到，当车门被锁紧时，似乎所有人都在车上，这意味着另有他人在负责安保，但我从不知道也没见过是谁。后来我小心翼翼问过瓦妮莎，她只告诉我，那是一只‘银喜鹊’。不得不说，这名字起得真贴切，这种鸟最喜欢收集闪闪发光的东西，也喜欢站在高处俯视地上的爬虫。\n\n无论如何，直到车沿着州界一路向北驶出州界，在即将抵达波特兰的时候，我看着一路上倒退的风景，看着西海岸的风吹过瓦妮莎的一头金发，突然想到了破解之法。是的，自始至终瓦妮莎就是父亲乃至整个系统的软肋，而我直到这一刻才注意到。”`,
                  timestamp: Date.now()
                }
              ]
            };
          });
        }
        setIsProcessing(false);
      }, 50);
      return;
    }

    // Archive 15: 1977 + Richie
    if (validation.hasYear1977 && validation.hasRichie) {
      setTimeout(() => {
        setGameState(prev => {
          if (prev.unlockedArchiveIds.includes('archive_15')) {
            return prev;
          }
          return {
            ...prev,
            unlockedArchiveIds: [...prev.unlockedArchiveIds, 'archive_15'],
            history: [
              ...prev.history,
              { type: 'info', content: '[归档系统]: 外部调查记录已导入——E-1981-CR-09', timestamp: Date.now() }
            ]
          };
        });
        setIsProcessing(false);
      }, 50);
      return;
    }

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
      return;
    }

    // Clipping 12 Unlock: 1965 + John Morrissey
    if (validation.hasYear1965 && validation.hasJohnMorrissey) {
      handleUnlockArchive('kc_1965');
      return;
    }

    // Clipping 13 Unlock: 1976 + Peter Henderson
    if (validation.hasYear1976 && validation.hasPeterHenderson) {
      handleUnlockArchive('ia_1976');
      return;
    }

    // Track consecutive invalid inputs for special easter egg
    const invalidInputKey = 'consecutive_invalid_inputs';
    const getInvalidCount = () => parseInt(sessionStorage.getItem(invalidInputKey) || '0');
    const incrementInvalidCount = () => sessionStorage.setItem(invalidInputKey, String(getInvalidCount() + 1));
    const resetInvalidCount = () => sessionStorage.removeItem(invalidInputKey);

    // Track Vanessa and Jennifer consecutive searches
    const isVanessaQuery = lowerQuery === '瓦妮莎' || lowerQuery === 'vanessa';
    const isJenniferQuery = lowerQuery === '詹妮弗' || lowerQuery === 'jennifer' || lowerQuery === '珍妮弗';
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
    } else if (isJenniferQuery) {
      const prevCount = gameState.consecutiveSearch?.keyword === 'jennifer' ? gameState.consecutiveSearch.count : 0;
      const newCount = prevCount + 1;
      newConsecutive = { keyword: 'jennifer', count: newCount };

      if (newCount === 1) {
        finalQuery = 'jennifer_consecutive_1';
      } else if (newCount === 2) {
        finalQuery = 'jennifer_consecutive_2';
      } else if (newCount >= 3) {
        finalQuery = 'jennifer_consecutive_3';
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
      revealKeywords?: string[]; // Specific keywords to reveal (if isReveal is true)
    }> = [
        // ===== USER-PROVIDED EASTER EGGS (Highest Priority) =====
        {
          keywords: ['vanessa_consecutive_3'],
          response: '> [R. CAPONE]: "……够了。既然你这么执着挖掘我的伤口，那就看清楚了。瓦妮莎确实与别人不同……1976年，堪萨斯城，她哭着求我不要执行那个针对流动献血车的计划。但我没有听。我当时太想看那个城市燃烧了。"',
          priority: 200,
          isReveal: true,
          revealKeywords: ['1976', '1976年', '堪萨斯城', '流动献血车']
        },
        {
          keywords: ['我是谁', 'who am i', 'who i am', '我到底是谁', '是谁'],
          response: `> [R. CAPONE]: "你是一个潜伏在自己脑子里的幽灵。别急，等显像管的灯火熄灭，你会想起那一包'铁马'烟的。"`,
          priority: 100
        },
        {
          keywords: ['jennifer_consecutive_1'],
          response: '> [R. CAPONE]: "别逗了，你收到的档案里根本就没有詹妮弗这个名字，你想问的是那只银喜鹊，我们在营地的时候，她是那个负责在大家睡觉时，从外面反锁车门的人。"',
          priority: 210
        },
        {
          keywords: ['jennifer_consecutive_2'],
          response: '> [R. CAPONE]: "她喜欢收集亮晶晶的垃圾，是个哑巴，或者只是不想跟我们要这种人说话。别浪费时间了，下一个问题。"',
          priority: 211
        },
        {
          keywords: ['jennifer_consecutive_3'],
          response: '> [R. CAPONE]: "难道说真的是她……那天在埃尔帕索，当我绝望地把烟盒揉烂的时候，她就在教堂的角落里看着，对吗？"',
          priority: 212,
          isReveal: true,
          revealKeywords: ['教堂', '埃尔帕索']
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

        // ===== ORIGINAL EASTER EGGS (Medium Priority) =====
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
              revealKeywords: matchedItem.revealKeywords,
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

      const newAttachments = [...(prev.collectedAttachments || []), id];
      const updates: Partial<GameState> = {
        collectedAttachments: newAttachments
      };

      // SPECIAL REWARD: Richie's ID card unlocks the julip folder
      if (id === 'richie_id_card') {
        if (!prev.collectedDossierIds.includes('julip')) {
          updates.collectedDossierIds = [...prev.collectedDossierIds, 'julip'];
        }
        updates.history = [
          ...prev.history,
          { type: 'info', content: `[SYSTEM]: 附件已存入 - 线索库中发现关键关联案卷「黄油朱莉普」。`, timestamp: Date.now() }
        ];
      }

      return {
        ...prev,
        ...updates
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
              systemStability={gameState.systemStability}
              isPersonaGlitching={isPersonaGlitching}
            />
          </ErrorBoundary>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
