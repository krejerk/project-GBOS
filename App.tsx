
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { CORE_NODES } from './constants';
import { GameState, MemoryLayer } from './types';
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

    // ===== STRICT KEYWORD VALIDATION SYSTEM =====

    // Define all valid keywords (both Chinese and English variants)
    const VALID_KEYWORDS: Record<string, boolean> = {
      'maine': true, '缅因': true, '缅因州': true,
      'small_bank': true, '小银行': true, 'small bank': true,
      'ohio': true, '俄亥俄': true, '俄亥俄州': true,
      'ritual': true, '祭祀': true, '祭祀案': true, 'ritual_case': true,
      'chicago': true, '芝加哥': true,
      'missing': true, '失踪': true,
      'nevada': true, '内华达': true, '内华达州': true,
      'family_massacre': true, '灭门': true, '灭门案': true, 'massacre': true, 'extinction': true,
      '1402': true, 'old dominion': true, 'old_dominion': true,
      'training': true, '训练日': true, 'training_day': true,
      'mojave': true, '莫哈韦': true, 'mojave_rest_stop': true,
      'cigarette': true, '空烟盒': true, 'empty_cigarette_pack': true,
      '1971': true, 'year_1971': true,
      'little_derek_wayne': true, '小德里克': true, 'derek wayne': true, 'wayne': true,
      'rubick': true, '鲁比克': true,
      'asian_woman': true, '亚裔女性': true,
      'julip': true, '黄油朱莉普': true,
      'headdress': true, '阿尔衮琴族头饰': true,
      'father': true, '父亲': true,
      'project': true, '青豆牡蛎汤计划': true,
      'relationship': true, '扭曲关系': true,
      'conchar': true, '康查尔': true,
      'nibi': true, '尼比': true,
      'dr_reggie': true, '雷吉博士': true,
      'dirty_frank': true, '脏弗兰克酒吧': true,
      'morning': true, '莫宁': true,
      'lundgren': true, '伦德格兰': true,
      'roger_beebe': true, '罗格·毕比': true, 'roger beebe': true,
      '1968': true, 'year_1968': true,
      '1967': true, 'year_1967': true,
      '1985': true, 'year_1985': true,
      'phoenix': true, '凤凰城行动': true,
      'architect': true, '建筑师': true,
      'syndicate': true, '辛迪加': true,
      'dismemberment_case': true, '碎尸案': true,
      'roanoke': true, '罗阿诺克市': true,
      'graywater_beacon': true, '灰水信标': true
    };

    const validateQuery = (queryStr: string) => {
      const lowerQuery = queryStr.toLowerCase().trim();
      const tokens = lowerQuery.split(/[\s,，.。、]+/).filter(t => t.length > 0);
      const allValid = tokens.every(token => VALID_KEYWORDS[token]);

      return {
        valid: allValid,
        hasMaine: lowerQuery.includes('maine') || lowerQuery.includes('缅因'),
        hasSmallBank: lowerQuery.includes('small_bank') || lowerQuery.includes('小银行') || lowerQuery.includes('small bank'),
        hasOhio: lowerQuery.includes('ohio') || lowerQuery.includes('俄亥俄'),
        hasRitual: lowerQuery.includes('ritual') || lowerQuery.includes('祭祀'),
        hasChicago: lowerQuery.includes('chicago') || lowerQuery.includes('芝加哥'),
        hasMissing: lowerQuery.includes('missing') || lowerQuery.includes('失踪'),
        hasNevada: lowerQuery.includes('nevada') || lowerQuery.includes('内华达'),
        hasFamilyMassacre: lowerQuery.includes('massacre') || lowerQuery.includes('extinction') || lowerQuery.includes('灭门'),
        hasAddress: lowerQuery.includes('1402') || lowerQuery.includes('old dominion') || lowerQuery.includes('old_dominion'),
        hasTraining: lowerQuery.includes('training') || lowerQuery.includes('训练日'),
        hasMojave: lowerQuery.includes('mojave') || lowerQuery.includes('莫哈韦'),
        hasCigarette: lowerQuery.includes('empty_cigarette_pack') || lowerQuery.includes('空烟盒') || lowerQuery.includes('cigarette'),
        hasYear1971: lowerQuery.includes('1971') || lowerQuery.includes('year_1971'),
        hasLittleDerek: lowerQuery.includes('little_derek_wayne') || lowerQuery.includes('小德里克') || lowerQuery.includes('derek wayne') || lowerQuery.includes('wayne')
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
          setGameState(prev => {
            if (prev.unlockedNodeIds.includes(node!.id)) {
              return prev;
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

    // ===== ADVANCED PRESET Q&A SYSTEM WITH FUZZY MATCHING =====

    const lowerQuery = query.toLowerCase().trim();

    // Track consecutive invalid inputs for special easter egg
    const invalidInputKey = 'consecutive_invalid_inputs';
    const getInvalidCount = () => parseInt(sessionStorage.getItem(invalidInputKey) || '0');
    const incrementInvalidCount = () => sessionStorage.setItem(invalidInputKey, String(getInvalidCount() + 1));
    const resetInvalidCount = () => sessionStorage.removeItem(invalidInputKey);

    // Define preset responses with priority levels and fuzzy keywords
    const PRESET_RESPONSES: Array<{
      keywords: string[];
      response: string;
      priority?: number; // Higher = checked first
      fuzzyMatch?: boolean; // If true, matches partial/related questions
    }> = [
        // ===== USER-PROVIDED EASTER EGGS (Highest Priority) =====
        {
          keywords: ['真相', 'truth', '真实', 'reality', '是什么真相'],
          response: '> [R. CAPONE]: "真相就在那些灰水里，你得把手伸进去捞，而不是在这里敲打键盘。它闻起来不怎么好。"',
          priority: 100,
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

        // ===== ORIGINAL EASTER EGGS (Medium Priority) =====
        {
          keywords: ['家族', 'family', 'syndicate', '辛迪加'],
          response: '> [UNKNOWN SIGNAL]: "家族无处不在。那种像霉菌一样的联系...有些人死了，但他们的声音还在墙壁里回荡。你听到了吗？"',
          priority: 80
        },
        {
          keywords: ['父亲', 'father', 'dad'],
          response: '> [R. CAPONE]: "父亲...那个男人教会了我什么是真正的恶。他说，过度伤害会导致掩护色失效。只有被高度约束的攻击性，才会孕育出真正的仪式。"',
          priority: 80
        },
        {
          keywords: ['建筑师', 'architect'],
          response: '> [UNKNOWN SIGNAL]: "建筑师...他是设计师，是操纵者。他的作品不是建筑，是活体实验。而我，我帮他完成了最后一步。"',
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
          keywords: ['痛', 'pain', 'hurt', '头', 'headache'],
          response: '> [R. CAPONE]: "我的头...像要裂开一样。每次我试图记起什么，就像有人在我脑子里用刀刻字。"',
          priority: 50
        }
      ];

    // Sort by priority (highest first)
    const sortedResponses = PRESET_RESPONSES.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    // Try to match query against preset responses
    let matchedResponse: string | null = null;

    for (const preset of sortedResponses) {
      const hasMatch = preset.keywords.some(keyword => {
        if (preset.fuzzyMatch) {
          // Fuzzy matching: check if query contains keyword or keyword contains query
          const keywordTokens = keyword.split(/\s+/);
          const queryTokens = lowerQuery.split(/\s+/);

          // Check if any significant token overlaps
          return keywordTokens.some(kt =>
            queryTokens.some(qt => qt.length > 1 && (qt.includes(kt) || kt.includes(qt)))
          ) || lowerQuery.includes(keyword) || keyword.includes(lowerQuery);
        } else {
          // Strict matching
          return lowerQuery.includes(keyword);
        }
      });

      if (hasMatch) {
        matchedResponse = preset.response;
        resetInvalidCount(); // Reset counter on valid match
        break;
      }
    }

    if (matchedResponse) {
      // Found a preset response
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          history: [
            ...prev.history,
            { type: 'info', content: matchedResponse!, timestamp: Date.now() }
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
          history: [
            ...prev.history,
            { type: 'info', content: responseMessage, timestamp: Date.now() }
          ]
        }));
        setIsProcessing(false);
      }, 300);
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
