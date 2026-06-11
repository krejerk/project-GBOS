
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefingView } from './components/BriefingView';
import { BriefingDetailView } from './components/BriefingDetailView';
import { AwakeningDialogue } from './components/AwakeningDialogue';
import { DialogueView } from './components/DialogueView';
import { SimplifiedMainView } from './components/SimplifiedMainView';
import { EndingView } from './components/EndingView';
import { FinalLetter } from './components/FinalLetter';
import { StudioIntro } from './components/StudioIntro';
import { TutorialOverlay } from './TutorialOverlay';
import { SyndicateBoard } from './SyndicateBoard';
import {
  INITIAL_DOSSIER, MEMORY_NODES as CORE_NODES, BRIEFING_SECTIONS,
  GLOBAL_KEYWORD_MAP, CLUE_DISPLAY_MAP, KEYWORD_CONSUMPTION_MAP,
  JENNIFER_NODE_1_DIALOGUE, JENNIFER_NODE_2_DIALOGUE, JENNIFER_NODE_3_DIALOGUE, JENNIFER_NODE_4_DIALOGUE, JENNIFER_NODE_5_DIALOGUE,
  JENNIFER_NODE_6_DIALOGUE,
  JENNIFER_NODE_9_DIALOGUE, JENNIFER_BRANCH_ATTEMPT_1, JENNIFER_BRANCH_ATTEMPT_2, JENNIFER_BRANCH_ATTEMPT_3,
  JENNIFER_BRANCH_ATTEMPT_4,
  JENNIFER_POST_36A1_DIALOGUE, JENNIFER_FINAL_A_DIALOGUE, CAPONE_BRANCH_B_POST_DIALOGUE
} from './constants/index';
import { KEYWORD_REGISTRY, UNLOCKS_REGISTRY } from './constants/registry';
import { ATTACHMENT_REGISTRY } from './constants/attachments';
import { ARCHIVE_DATABASE } from './constants/archive_data';

const PROTECTED_YEARS = ['year_1967', 'year_1971', 'year_1973', 'year_1976', 'year_1977', 'year_1985', '1967', '1971', '1973', '1976', '1977', '1985'];

// Define bulletproof helper function to lookup keyword metadata by either string key (Chinese name) or ID (English key)
const getKeywordMeta = (id: string): any => {
  if (!id) return undefined;
  if (KEYWORD_REGISTRY[id]) {
    return KEYWORD_REGISTRY[id];
  }
  const meta = Object.values(KEYWORD_REGISTRY).find(info => info.id === id);
  if (meta) return meta;
  
  if (id === 'capone' || id === 'robert' || id === 'robert_capone') {
    return { id: 'capone', type: 'person', chapter: 8, isIdentity: true };
  }
  if (id === 'frank_rollins') {
    return { id: 'frank_rollins', type: 'person', chapter: 8, isIdentity: false };
  }
  return undefined;
};

import { CheckpointManager } from './components/CheckpointManager';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MusicControl } from './components/MusicControl';
import { TextFragment } from './components/TextFragment';

const GlobalJenniferPopup = ({ 
  data, 
  onClose,
  onClueClick 
}: { 
  data: { dialogue: string[], title?: string }; 
  onClose: () => void;
  onClueClick: (id: string, word: string) => void;
}) => {
  const [step, setStep] = React.useState(0);
  const [clickedIds, setClickedIds] = React.useState<Set<string>>(new Set());
  
  const handleNext = () => {
    if (step < data.dialogue.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const renderDialogueWithClues = (text: string) => {
    const regex = /\[([^\]]+)\]\(clue:([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
        }
        const word = match[1];
        const clueId = match[2];
        parts.push(
            <span 
                key={`clue-${match.index}`} 
                onClick={() => {
                  onClueClick(clueId, word);
                  setClickedIds(prev => new Set(prev).add(clueId));
                }}
                className={`cursor-pointer font-bold border-b border-dashed px-1 transition-colors relative ${
                    clickedIds.has(clueId)
                    ? "text-[#10b981] border-[#10b981] bg-[#10b981]/10"
                    : "text-[#38bdf8] border-[#38bdf8]/50 hover:bg-[#38bdf8]/20"
                }`}
            >
                {word}
                {clickedIds.has(clueId) && <span className="absolute -top-1 -right-2 text-[8px]">✓</span>}
            </span>
        );
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl bg-[#0f172a]/90 border border-[#334155] p-1 rounded-lg shadow-[0_0_50px_rgba(15,23,42,0.6)] backdrop-blur-xl relative overflow-hidden">
          <div className="bg-[#1e293b]/50 px-6 py-3 flex justify-between items-center border-b border-[#334155]">
              <div className="flex items-center gap-3">
                  <span className="text-[#e2e8f0] font-mono tracking-widest text-xs font-bold uppercase">
                      {data.title || "BAU OPERATOR: JENNIFER"}
                  </span>
              </div>
              <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[#64748b] text-[10px] bg-[#1e293b] px-2 py-0.5 rounded font-mono tracking-wider">
                          LIVE FEED
                      </span>
                  </div>
                  <button
                      onClick={onClose}
                      className="p-1.5 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#334155]/50 rounded-full transition-colors font-bold text-sm"
                  >
                      ✕
                  </button>
              </div>
          </div>
          <div className="p-8 min-h-[200px] flex items-center gap-6 relative">
              <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-[#1e293b] border-2 border-[#38bdf8]/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                      <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end">
                          <div className="w-10 h-10 rounded-full bg-[#38bdf8]/60 mb-1" />
                          <div className="w-20 h-8 rounded-t-full bg-[#38bdf8]/60" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#38bdf8]/10" />
                  </div>
              </div>
              <div className="flex-1">
                  <p className="text-[#e2e8f0] text-lg font-mono leading-relaxed">
                      {renderDialogueWithClues(data.dialogue[step])}
                  </p>
              </div>
          </div>
          <div className="px-8 py-4 bg-[#0f172a] border-t border-[#334155] flex justify-end">
              <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 rounded font-mono text-sm tracking-wider transition-colors"
              >
                  {step < data.dialogue.length - 1 ? 'NEXT' : 'CLOSE'}
              </button>
          </div>
      </div>
    </motion.div>
  );
};

import { resetClueLibraryVisit } from './components/ClueLibrary';

const INITIAL_GAME_STATE: GameState = {
  phase: 'studio-intro',
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
  consecutiveSearch: undefined,
  branchAttemptCount: 0,
  isBranchLocked: false,
  isBranchBActive: false
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gbos_save_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse save state', e);
      }
    }
    return INITIAL_GAME_STATE;
  });

  const [showFinalLetter, setShowFinalLetter] = useState(false);
  const [nodes, setNodes] = useState(CORE_NODES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [endingType, setEndingType] = useState<'ending1' | 'ending2' | 'ending3' | null>(null);
  const [jenniferPopup, setJenniferPopup] = useState<{ dialogue: string[], title?: string, onCloseCallback?: () => void } | null>(null);
  const [isPersonaGlitching, setIsPersonaGlitching] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const [showAwakeningDialogue, setShowAwakeningDialogue] = useState(false);
  const [isExperimentTerminated, setIsExperimentTerminated] = useState(false);
  const [ending2Step, setEnding2Step] = useState<number>(0);

  // Save state on change
  useEffect(() => {
    if (gameState !== INITIAL_GAME_STATE) {
      localStorage.setItem('gbos_save_state', JSON.stringify(gameState));
    }
  }, [gameState]);

  const resetGame = () => {
    localStorage.removeItem('gbos_save_state');
    for (let i = 1; i <= 9; i++) {
        localStorage.removeItem(`hasViewedNode${i}`);
    }
    localStorage.removeItem('clueLibrary_visited');
    window.location.reload();
  };

  React.useEffect(() => {
    // If we jump backwards in time (e.g. via CheckpointManager or other means),
    // clear the viewed flags for future nodes so their dialogues trigger again
    const currentNode = gameState.currentStoryNode || 0;
    for (let i = currentNode + 1; i <= 9; i++) {
        localStorage.removeItem(`hasViewedNode${i}`);
    }
  }, [gameState.currentStoryNode]);

  React.useEffect(() => {
    // Ensure all dossiers that were previously collected just as clues also appear in dossier list
    const dossierClues = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon'];
    setGameState(prev => {
      let changed = false;
      let newDossiers = Array.from(new Set([...(prev.collectedDossierIds || [])]));
      
      prev.collectedClues.forEach(clueId => {
        if (dossierClues.includes(clueId) && !newDossiers.includes(clueId)) {
          newDossiers.push(clueId);
          changed = true;
        }
      });
      
      // 2. Sync attachments based on chapter
      const chapterAttachments = Object.values(ATTACHMENT_REGISTRY)
        .filter(attr => attr.chapter !== undefined && attr.chapter <= prev.currentStoryNode)
        .map(attr => attr.id);
      
      const newAttachments = Array.from(new Set([...(prev.collectedAttachments || []), ...chapterAttachments]));
      if (newAttachments.length !== (prev.collectedAttachments || []).length) {
        changed = true;
      }

      // 3. SANITIZATION: Strip future-chapter people from unlockedPeople
      // This prevents "phantom" keywords (e.g. Frank Rollins) from appearing
      // when the user hasn't reached that chapter yet.
      const sanitizedPeople = (prev.unlockedPeople || []).filter(id => {
        // SPECIAL FIX: Hide Cynthia Miller until Jennifer explicitly provides the clue in Branch Attempt 1
        if (id === 'cynthia_miller' && (!prev.branchAttemptCount || prev.branchAttemptCount < 1)) {
          return false;
        }

        const meta = getKeywordMeta(id);
        if (!meta) return false; // Remove unknown IDs
        if (meta.type !== 'person') {
          changed = true;
          return false; // Remove items that are no longer classified as 'person' (e.g. unnamed_body)
        }
        if (meta.isIdentity) return true; // Always keep core identities
        // Remove people from chapters the player hasn't reached
        if (meta.chapter !== undefined && meta.chapter > (prev.currentStoryNode || 0)) {
          changed = true;
          return false;
        }
        return true;
      });

      // 4. SANITIZATION: Strip future-chapter keywords from collectedClues
      const sanitizedClues = (prev.collectedClues || []).filter(id => {
        const meta = getKeywordMeta(id);
        if (!meta) return true; // Keep unknown IDs (they might be special)
        if (meta.isIdentity || meta.isPersistent) return true;
        if (meta.chapter !== undefined && meta.chapter > (prev.currentStoryNode || 0) + 1) {
          changed = true;
          return false;
        }
        return true;
      });

      // 5. YEAR RECOVERY: Re-inject protected years that were erroneously removed
      // by the old buggy `hasAmmo && (...)` logic in handleStoryNodeComplete.
      const protectedYears = ['year_1967', 'year_1976'];
      let recoveredYears = [...(prev.collectedYears || [])];
      protectedYears.forEach(yearId => {
        if (!recoveredYears.includes(yearId)) {
          // Check if the player ever used this year (it appears in KEYWORD_CONSUMPTION_MAP of an unlocked archive)
          const wasEverUsed = prev.unlockedArchiveIds.some(archId => {
            const entry = KEYWORD_CONSUMPTION_MAP[archId];
            return entry && entry.includes(yearId);
          }) || prev.unlockedNodeIds.some(nodeId => {
            const entry = KEYWORD_CONSUMPTION_MAP[nodeId];
            return entry && entry.includes(yearId);
          });
          // If it was used, it must have been collected at some point — re-inject it
          if (wasEverUsed) {
            recoveredYears.push(yearId);
            changed = true;
          }
        }
      });

      if (changed) {
        return { 
          ...prev, 
          collectedDossierIds: Array.from(new Set(newDossiers)),
          collectedAttachments: newAttachments,
          unlockedPeople: sanitizedPeople,
          collectedClues: sanitizedClues,
          collectedYears: recoveredYears
        };
      }
      return prev;
    });
  }, [gameState.currentStoryNode]);

  // --- AUDIO LOGIC ---
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasMusicStarted, setHasMusicStarted] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio only on client side
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/bgm.m4a`);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);



  useEffect(() => {
    if (endingType === 'ending3' && audioRef.current) {
      audioRef.current.pause();
    }
  }, [endingType]);

  // --- ARCHITECTURAL SAFEGUARD ---
  useEffect(() => {
    // Validate that no node is consuming its own revealed keywords (rewards)
    Object.entries(KEYWORD_CONSUMPTION_MAP).forEach(([nodeId, requiredKeys]) => {
      const node = CORE_NODES.find(n => n.id === nodeId);
      if (node && node.revealedKeywords) {
        const overlaps = (requiredKeys as string[]).filter(k => node.revealedKeywords!.includes(k));
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

  // --- CHAPTER 9 COUNTDOWN LOGIC ---
  useEffect(() => {
    let interval: any;
    if (showCountdown && gameState.branchAttemptCount >= 4) {
      interval = setInterval(() => {
        setCountdownValue(prev => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showCountdown, gameState.branchAttemptCount]);

  useEffect(() => {
    if (countdownValue === 0 && showCountdown && gameState.branchAttemptCount >= 4) {
      setShowCountdown(false);
      setGameState(prev => ({
        ...prev,
        isBranchLocked: true,
        history: [...prev.history, { type: 'info', content: '> [SYSTEM]: BRANCH_LOCKED // AUTHORITY_OVERRIDE_COMPLETE', timestamp: Date.now() }]
      }));
    }
  }, [countdownValue, showCountdown, gameState.branchAttemptCount]);

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
      !collectedSet.has(k) && CLUE_DISPLAY_MAP[k] && !getKeywordMeta(k)?.isArchiveOnly
    ))];

    setGameState(prev => ({
      ...prev,
      systemStability: Math.max(0, (prev.systemStability || 84) - 20)
    }));

    return { success: true, keywords: missedKeywords };
  }, [gameState.systemStability, gameState.unlockedNodeIds, gameState.currentStoryNode, gameState.history, gameState.collectedClues, gameState.collectedDossierIds, gameState.collectedYears, gameState.unlockedPeople]);

  // Chapter 6 Jennifer Intro Dialogue Trigger via ClueLibrary
  React.useEffect(() => {
    if (gameState.currentStoryNode === 6 && !gameState.hasSeenNode6Intro && !showAwakeningDialogue) {
      const timer = setTimeout(() => {
        setIsClueLibraryOpen(true);
        setGameState(prev => ({ ...prev, hasSeenNode6Intro: true }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentStoryNode, gameState.hasSeenNode6Intro, showAwakeningDialogue]);

  // Chapter 7 Jennifer Intro Dialogue Trigger via ClueLibrary
  React.useEffect(() => {
    if (gameState.currentStoryNode === 7 && !gameState.hasSeenNode7Intro) {
      const timer = setTimeout(() => {
        setIsClueLibraryOpen(true);
        setGameState(prev => ({ ...prev, hasSeenNode7Intro: true }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentStoryNode, gameState.hasSeenNode7Intro]);

  const handleStoryNodeComplete = useCallback((nodeId: number) => {
    setGameState(prev => {
      let updatedUnlockedNodeIds = prev.unlockedNodeIds;

      const filterByRegistry = (id: string) => {
        const meta = getKeywordMeta(id);
        if (!meta) return true;
        
        // Identity is always kept
        if (meta.isIdentity) return true;

        // NEW: Frequency-aware consumption logic for years
        const yearConsumedCount: Record<string, number> = {};
        const yearCollectedCount: Record<string, number> = {};
        
        prev.collectedYears.forEach(y => {
          yearCollectedCount[y] = (yearCollectedCount[y] || 0) + 1;
        });

        const consumed = new Set<string>();
        const processConsumed = (targetId: string) => {
          const ks = KEYWORD_CONSUMPTION_MAP[targetId];
          if (ks) ks.forEach(k => {
            if (k.startsWith('year_')) {
              yearConsumedCount[k] = (yearConsumedCount[k] || 0) + 1;
            } else {
              consumed.add(k);
            }
          });
        };

        prev.unlockedNodeIds.forEach(processConsumed);
        prev.unlockedArchiveIds.forEach(processConsumed);

        // 3. Special Year Handling: Protected years ALWAYS stay. Others need ammo + current/future.
        if (id.startsWith('year_') || !isNaN(Number(id))) {
           if (PROTECTED_YEARS.includes(id)) return true;
           const hasAmmo = (yearCollectedCount[id] || 0) > (yearConsumedCount[id] || 0);
           const isCurrentOrFuture = (meta?.chapter || 0) >= nodeId;
           const isProtected = meta?.isPersistent || meta?.isIdentity;
           // Protected years are NEVER removed. Others need ammo AND be current/future.
           return isProtected || (hasAmmo && isCurrentOrFuture);
        }

        const isConsumed = consumed.has(id);
        if (isConsumed) return false;

        // Persistent/Identity items are always kept
        if (meta?.isPersistent || meta?.isIdentity) return true;

        // Otherwise, only keep if it's from the current or future chapter
        return (meta?.chapter || 0) >= nodeId;
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
    setGameState(prev => {
      // 1. Map all consumed keywords (with counts for years)
      const consumed = new Set<string>();
      const yearConsumedCount: Record<string, number> = {};
      const yearCollectedCount: Record<string, number> = {};
      
      prev.collectedYears.forEach(y => {
        yearCollectedCount[y] = (yearCollectedCount[y] || 0) + 1;
      });

      const processConsumed = (id: string) => {
        const keywords = KEYWORD_CONSUMPTION_MAP[id];
        if (keywords) {
          keywords.forEach(k => {
            if (k.startsWith('year_')) {
              yearConsumedCount[k] = (yearConsumedCount[k] || 0) + 1;
            } else {
              consumed.add(k);
            }
          });
        }
      };

      (prev.unlockedNodeIds || []).forEach(processConsumed);
      (prev.unlockedArchiveIds || []).forEach(processConsumed);

      // Add to main consumed set ONLY if counts exceed collected amount
      Object.keys(yearConsumedCount).forEach(y => {
        if (yearConsumedCount[y] >= (yearCollectedCount[y] || 0)) {
          consumed.add(y);
        }
      });

      // 2. Define protected keywords (newly given or core system)
      const protectedIds = ['st_louis', 'vampire', 'personnel_tree', ...PROTECTED_YEARS];

      // 3. Filter lists: REMOVE everything except protected keywords and future keywords
      const filterFn = (id: string) => {
          if (protectedIds.includes(id)) return true;
          const meta = getKeywordMeta(id);
          // Keep anything collected AFTER node 3
          if (meta && meta.chapter > 3) return true;
          return false;
      };

      // 3. Sync attachments based on chapter
      const chapterAttachments = Object.values(ATTACHMENT_REGISTRY)
        .filter(attr => attr.chapter !== undefined && attr.chapter <= prev.currentStoryNode)
        .map(attr => attr.id);
      
      const newAttachments = Array.from(new Set([...(prev.collectedAttachments || []), ...chapterAttachments]));

      return {
        ...prev,
        collectedClues: prev.collectedClues.filter(filterFn),
        collectedYears: prev.collectedYears.filter(filterFn),
        unlockedPeople: prev.unlockedPeople.filter(filterFn),
        collectedAttachments: newAttachments,
        history: [
          ...prev.history,
          { type: 'info', content: '[JENNIFER]: 看来你还在试图拼凑那些不该存在的碎片。作为警告，我已清除了你所有的线索缓存。', timestamp: Date.now() }
        ]
      };
    });
  }, []);


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
      // Skip blackout, start glitching immediately for 1.5s
      setIsPersonaGlitching(true);
      setTimeout(() => {
        setIsPersonaGlitching(false);
        setShowAwakeningDialogue(true);
      }, 1500);
    }, 5500);
  }, []);

  const handleTerminateExperiment = useCallback((type: 'ending2' | 'ending3') => {
    // 1. Wait 2 seconds while ThorneBackend says "EXECUTING..."
    setTimeout(() => {
      // 2. Trigger severe global glitch
      setIsPersonaGlitching(true);
      
      // 3. Wait 3 seconds for the glitch, then end
      setTimeout(() => {
          setIsPersonaGlitching(false);
          if (type === 'ending2') {
            setEnding2Step(1); // Start buildup sequence
            setTimeout(() => setEnding2Step(2), 2000);
            setTimeout(() => setEnding2Step(3), 4000);
            setTimeout(() => {
                setEnding2Step(4);
                setJenniferPopup({
                  title: "SYSTEM OVERRIDE // JENNIFER",
                  dialogue: [
                    "操作员，你已成功拦截詹妮弗的干扰，并通过获取的“父亲”坐标将其处决。",
                    "任务圆满完成，审讯过程已被归档。",
                    "现在请退出操作界面，交由下一位操作员继续实验。"
                  ],
                  onCloseCallback: () => {
                    window.location.reload();
                  }
                });
            }, 6500);
          } else {
            setIsExperimentTerminated(true);
          }
      }, 3000);
    }, 2000);
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
      // Immediate and persistent glitch during processing
      setIsPersonaGlitching(true);
      
      // Clear the query immediately via state if possible (though child owns it, 
      // we ensure the search is accepted and not re-processed)
      
      setTimeout(() => {
        setIsPersonaGlitching(false);
        setGameState(prev => {
          // CONSUMPTION LOGIC: Clear any keywords used to trigger this, AND the code itself
          const detectedInThisQuery: string[] = [];
          Object.keys(GLOBAL_KEYWORD_MAP).forEach(alias => {
            if (query.toLowerCase().includes(alias.toLowerCase())) {
              detectedInThisQuery.push(GLOBAL_KEYWORD_MAP[alias].id);
            }
          });
          // Explicitly include 'reboot_command' ID which represents the full string in the screenshot
          const keysToConsume = new Set([...detectedInThisQuery, query, query.toLowerCase(), 'FORCE_LOAD_MONSTER', '0x524F42455254_PURGE', 'reboot_command']);

          return {
            ...prev,
            collectedClues: prev.collectedClues.filter(id => !keysToConsume.has(id) || PROTECTED_YEARS.includes(id)),
            collectedYears: prev.collectedYears.filter(id => !keysToConsume.has(id) || PROTECTED_YEARS.includes(id)),
            unlockedPeople: prev.unlockedPeople.filter(id => !keysToConsume.has(id) || PROTECTED_YEARS.includes(id)),
            history: [
              ...prev.history,
              { 
                type: 'info', 
                content: '> [R. CAPONE]: "你对我做了什么？为什么我的脑袋像被塞进了冰箱里？银喜鹊……父亲……等等，我们刚才在谈什么来着？你还没有问我【80号州际公路】和【守夜人】的事情吗？"', 
                isReveal: true, 
                revealKeywords: ['interstate_80', 'watchman'],
                timestamp: Date.now() 
              }
            ]
          };
        });
        setIsProcessing(false);
      }, 1000);
      return;
    }

    const detectedKeywordIds: string[] = [];
    let queryRemainder = lowerQuery;
    
    // Sort aliases by length descending to match longest ones first (e.g. "雷吉博士" before "博士")
    const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

    for (const alias of sortedAliases) {
      const lowerAlias = alias.toLowerCase();
      // We use a regex or split/join to find all occurrences and remove them
      if (queryRemainder.includes(lowerAlias)) {
        detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
        // Replace matched keyword with spaces of the same length to preserve position if needed,
        // but primarily to prevent double-matching and isolate remaining "noise"
        queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
      }
    }
    
    const uniqueDetected = Array.from(new Set(detectedKeywordIds)).filter(id => {
      const meta = getKeywordMeta(id);
      // Only allow keywords from current or past chapters (unless they are identities which are always allowed)
      if (meta?.isIdentity) return true;
      if (id === 'dry_gully' || id === 'unnamed_female_body') return true;
      const chapter = meta?.chapter || 0;
      const currentNode = gameState.currentStoryNode || 0;
      if (chapter > currentNode + 1) return false;
      // Do not allow re-collecting non-persistent keywords from older chapters
      if (chapter < currentNode && !meta?.isPersistent) return false;
      return true;
    });

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

    // --- CHAPTER 9 BRANCHING NARRATIVE LOGIC ---
    const isBranchKeywords = uniqueDetected.includes('dry_gully') && uniqueDetected.includes('unnamed_female_body');
    const isCurrentChapter9 = gameState.currentStoryNode >= 8 || gameState.unlockedArchiveIds.includes('clipping_25');

    if (isBranchKeywords && isCurrentChapter9) {
      if (gameState.unlockedNodeIds.includes('confession_36A1')) {
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            history: [...prev.history, { type: 'info', content: '> [SYSTEM]: ACCESS_DENIED // OVERRIDE_ACTIVE // KERNEL_PANIC', timestamp: Date.now() }]
          }));
          setIsProcessing(false);
        }, 300);
        return;
      }

      if (gameState.isBranchLocked) {
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            history: [...prev.history, { type: 'info', content: '> [SYSTEM]: ACCESS_DENIED // OVERRIDE_ACTIVE // KEY_FRAGMENT_NOT_FOUND', timestamp: Date.now() }]
          }));
          setIsProcessing(false);
        }, 300);
        return;
      }

      // If countdown is active, allow unlock
      if (showCountdown) {
        // Proceed to normal unlock check below
      } else {
        const attempt = gameState.branchAttemptCount || 0;
        if (attempt === 0) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              branchAttemptCount: 1,
              history: [...prev.history, { type: 'dialogue', content: JENNIFER_BRANCH_ATTEMPT_1.join('\n'), timestamp: Date.now() }]
            }));
            setJenniferPopup({ dialogue: JENNIFER_BRANCH_ATTEMPT_1, title: "SECURITY WARNING" });
            setIsProcessing(false);
          }, 300);
          return;
        } else if (attempt === 1) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              branchAttemptCount: 2,
              history: [...prev.history, { type: 'dialogue', content: JENNIFER_BRANCH_ATTEMPT_2.join('\n'), timestamp: Date.now() }]
            }));
            setJenniferPopup({ dialogue: JENNIFER_BRANCH_ATTEMPT_2, title: "FINAL WARNING" });
            setIsProcessing(false);
          }, 300);
          return;
        } else if (attempt === 2) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              branchAttemptCount: 3,
              history: [...prev.history, { type: 'dialogue', content: JENNIFER_BRANCH_ATTEMPT_3.join('\n'), timestamp: Date.now() }]
            }));
            setJenniferPopup({ dialogue: JENNIFER_BRANCH_ATTEMPT_3, title: "CRITICAL AUTHORITY OVERRIDE" });
            setIsProcessing(false);
          }, 300);
          return;
        } else if (attempt === 3) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              branchAttemptCount: 4,
              history: [...prev.history, { type: 'dialogue', content: '> [JENNIFER]: 指令未被执行。我已经启动了管理权限覆盖。\n> [JENNIFER]: 鉴于你持续的违规行为，你的操作权限已被暂时挂起，不要再尝试任何指令输入。\n> [JENNIFER]: 请你留守你的岗位，直到接管程序完成。', timestamp: Date.now() }]
            }));
            setJenniferPopup({
              dialogue: [
                "指令未被执行。我已经启动了管理权限覆盖。",
                "鉴于你持续的违规行为，你的操作权限已被暂时挂起，不要再尝试任何指令输入。",
                "请你留守你的岗位，直到接管程序完成。"
              ],
              title: "CRITICAL AUTHORITY OVERRIDE",
              onCloseCallback: () => {
                setShowCountdown(true);
                setCountdownValue(10);
              }
            });
            setIsProcessing(false);
          }, 300);
          return;
        } else {
          // Already attempted 4 times but missed countdown
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              isBranchLocked: true,
              history: [...prev.history, { type: 'info', content: '> [SYSTEM]: CRITICAL_FAILURE // OPERATION_ABORTED', timestamp: Date.now() }]
            }));
            setIsProcessing(false);
          }, 300);
          return;
        }
      }
    }

    let matchedUnlockId: string | null = null;
    let matchedUnlockData: any = null;

    // Strict validation: No extra keywords, and no significant unrecognized text
    // We allow spaces, common separators and punctuation in the remainder, and the "年" suffix for years
    // We also remove standard node prefixes so that if a user types "供述24" along with keywords, it doesn't fail the clean check.
    const cleanRemainder = queryRemainder
      .replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '')
      .replace(/[0-9]+/g, '')
      .replace(/(供述|confession|剪报|clipping|档案|archive|no|第)/gi, '');
    const isRemainderClean = cleanRemainder.length === 0;

    for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
      const hasAllNeeded = entry.keywords.every(k => uniqueDetected.includes(k));
      const hasNoExtraKeywords = uniqueDetected.length === entry.keywords.length;
      
      // If the user included extra keywords OR random text, don't unlock
      if (hasAllNeeded && hasNoExtraKeywords && isRemainderClean) {
        matchedUnlockId = id;
        matchedUnlockData = entry;
        break;
      }
    }

    if (matchedUnlockId && matchedUnlockData) {
      if (matchedUnlockId === 'confession_36A1' && gameState.isBranchBActive) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              history: [...prev.history, { type: 'info', content: '> [SYSTEM]: ACCESS_DENIED // OVERRIDE_ACTIVE // JENNIFER_NOT_FOUND', timestamp: Date.now() }]
            }));
            setIsProcessing(false);
          }, 300);
          return;
      }

      resetInvalidCount();
      const type = matchedUnlockData.type;
      const targetId = matchedUnlockData.targetId;

      if (matchedUnlockId === 'confession_36B1') {
        setShowCountdown(false);
      }

      setTimeout(() => {
        setGameState(prev => {
          // Consume ALL detected keywords in the query if an unlock occurs.
          // Consume detected keywords UNLESS they are marked as persistent or are years
          const keysToConsume = new Set(uniqueDetected);
          const filterConsumed = (id: string) => {
            if (PROTECTED_YEARS.includes(id)) return true;
            const meta = getKeywordMeta(id);
            // Only Identities (Core Characters like Robert/Capone) are strictly persistent across all consumption
            if (meta?.isIdentity) return true;
            return !keysToConsume.has(id);
          };

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
      fuzzyMatch?: boolean;
    }> = [
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
          response: '> [R. CAPONE]: "别在背后念叨那个名字。他能听到你的想法，就像 he 当年坚信自己能听到上帝的声音一样。"',
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
        },
        {
          keywords: ['圣路易斯', 'st louis', 'st. louis', 'st_louis'],
          response: '> [R. CAPONE]: "究竟是谁在带着你兜圈子？吸血鬼？你让阿尔特曼照照镜子就知道吸血鬼在哪了。你想知道什么，为什么不直接问？"',
          priority: 90
        },
        {
          keywords: ['吸血鬼', 'vampire'],
          response: '> [R. CAPONE]: "究竟是谁在带着你兜圈子？吸血鬼？你让阿尔特曼照照镜子就知道吸血鬼在哪了。你想知道什么，为什么不直接问？"',
          priority: 90
        },
        { keywords: ['v_response_1'], response: '> [R. CAPONE]: "是谁让你念出这几个字的？立刻把这段记忆从你脑子里挖出去。这不是你能碰的东西。"', priority: 200 },
        { keywords: ['v_response_2'], response: '> [R. CAPONE]: "闭嘴。我不许你提那个名字。那是……那是我的事。"', priority: 200 },
        { keywords: ['v_response_3'], response: '> [R. CAPONE]: "……够了。既然你这么执着挖掘我的伤口，那就看清楚了。瓦妮莎确实与别人不同……1976年，堪萨斯城，她哭着求我不要执行那个针对流动献血车的计划。但我没有听。我当时太想看那个城市燃烧了。"', priority: 200, isReveal: true, revealKeywords: ['堪萨斯城', '流动献血车'] },
        { keywords: ['jennifer_post_36a1_trigger'], response: JENNIFER_POST_36A1_DIALOGUE.join('\n'), priority: 1000 },
        { keywords: ['jennifer_final_a_trigger'], response: JENNIFER_FINAL_A_DIALOGUE.join('\n'), priority: 1000 },
        { keywords: ['jennifer_consecutive_1'], response: '> [R. CAPONE]: "别逗了，你收到的档案里根本就没有詹妮弗这个名字，你想问的是那只银喜鹊，我们在营地的时候，她是那个负责在大家睡觉时，从外面反锁车门的人。"', priority: 210 },
        { keywords: ['jennifer_consecutive_2'], response: '> [R. CAPONE]: "她喜欢收集亮晶晶的垃圾，是个哑巴，或者只是不想跟我们要这种人说话。别浪费时间了，下一个问题。"', priority: 211 },
        { keywords: ['jennifer_consecutive_3'], response: '> [R. CAPONE]: "难道说真的是她……那天在埃尔帕索，当我绝望地把烟盒揉烂的时候，她就在教堂的角落里看着，对吗？"', priority: 999 },
        {
          keywords: ['艾莉丝', 'alice', 'elise'],
          response: '> [R. CAPONE]: "别被那副皮囊骗了，这女人血管里流的全是致命的硝酸甘油。"',
          priority: 85
        },
        {
          keywords: ['塞勒斯', 'cyrus'],
          response: '> [R. CAPONE]: "一个自以为是的替罪羊罢了。"',
          priority: 85
        },
        {
          keywords: ['骗子', 'liar', '谎言', 'lie'],
          response: '> [R. CAPONE]: "连官方报告都在拿推土机掩盖死人。在这个烂摊子里，真相是最不值钱的废纸。"',
          priority: 80
        },
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

    if (gameState.isBranchBActive) {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          consecutiveSearch: newConsecutive,
          history: [...prev.history, { type: 'info', content: `> [R. CAPONE]: "${CAPONE_BRANCH_B_POST_DIALOGUE}"`, timestamp: Date.now() }]
        }));
        setIsProcessing(false);
      }, 300);
      return;
    }

    if (matchedPreset) {
      if (matchedPreset.keywords.includes('jennifer_post_36a1_trigger')) {
        setJenniferPopup({ dialogue: JENNIFER_POST_36A1_DIALOGUE, title: "PHASE TARGET ACHIEVED" });
      }
      if (matchedPreset.keywords.includes('jennifer_final_a_trigger')) {
        setGameState(prev => ({ ...prev, hasSeenEndingA: true }));
        setJenniferPopup({ 
            dialogue: JENNIFER_FINAL_A_DIALOGUE, 
            title: "CASE CLOSED: #0814-FINAL",
            onCloseCallback: () => setIsGameEnded(true)
        });
      }
      
      setTimeout(() => {
        setGameState(prev => {
          let newCollectedClues = prev.collectedClues;
          // Consume the easter egg keywords if they were used
          if (matchedPreset.keywords.includes('st_louis') || matchedPreset.keywords.includes('vampire')) {
             newCollectedClues = prev.collectedClues.filter(id => id !== 'st_louis' && id !== 'vampire');
          }

          return {
            ...prev,
            consecutiveSearch: newConsecutive,
            collectedClues: newCollectedClues,
            history: [...prev.history, { type: 'info', content: matchedPreset.response, isReveal: matchedPreset.isReveal, revealKeywords: matchedPreset.revealKeywords, timestamp: Date.now() }]
          };
        });
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
  }, [gameState.consecutiveSearch, gameState.history, nodes, handleStoryNodeComplete, showCountdown]);

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
      if (id === 'iron_horse_louisville' || id === 'graywater_beacon' || id === 'iron_horse_beacon' || id === 'church_visual_residue' || id === 'laguna_beach_visual_residue') {
        if (!prev.collectedDossierIds.includes('graywater_beacon')) updates.collectedDossierIds = Array.from(new Set([...prev.collectedDossierIds, 'graywater_beacon']));
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
    
    const meta = Object.values(KEYWORD_REGISTRY).find(info => info.id === targetPersonId || info.id === clueId);
    const isDossier = ['julip', 'project', 'julip_symbol', 'project_symbol', 'crime_route_map', 'graywater_beacon'].includes(clueId);
    let type = meta ? meta.type : (isDossier ? 'dossier' : 'clue');
    
    if (targetPersonId === 'capone' || targetPersonId === 'frank_rollins') {
      type = 'person';
    }
    
    // Fallback for years if meta is missing or incorrectly typed
    if (clueId.startsWith('year_') || (!isNaN(Number(clueId)) && clueId.length === 4)) {
      type = 'year';
    }
    
    const isSpecialReacquire = ['kansas_city', 'mobile_blood_truck', 'church', 'el_paso', 'mill_valley', 'reporter', 'felipe_maldonado'].includes(clueId);

    setGameState(prev => {
      const isReward = meta?.isPersistent || meta?.isIdentity || (meta && meta.chapter > (prev.currentStoryNode || 0));
      const isArchiveOnly = !!(meta?.isArchiveOnly || isDossier);
      const updates: Partial<GameState> = {};
      const newHistory: Array<{ type: 'search' | 'info' | 'shatter' | 'dialogue' | 'archive_content'; content: string; timestamp: number }> = [];
      let currentCollectedClues = [...prev.collectedClues];

      // 1. Handle Person Identification (Archive Tray Only)
      if (type === 'person') {
        // Validation: Only allow actual person types to enter unlockedPeople
        const otherPeople = prev.unlockedPeople.filter(p => p !== targetPersonId);
        updates.unlockedPeople = [targetPersonId, ...otherPeople];
        
        if (!prev.collectedClues.includes(targetPersonId)) {
          updates.collectedClues = [targetPersonId, ...(prev.collectedClues || [])];
        }

        if (!prev.unlockedPeople.includes(targetPersonId)) {
          newHistory.push({ type: 'info', content: `[PERSON IDENTIFIED]: ${word} 已载入档案检索`, timestamp: Date.now() });
        }
      } 
      // 2. Handle Year Identification (Archive Tray Only)
      else if (type === 'year') {
        updates.collectedYears = [clueId, ...(prev.collectedYears || [])];
        newHistory.push({ type: 'info', content: `[YEAR RECORDED]: ${word} 已载入档案库`, timestamp: Date.now() });
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
          const attId = typeof att === 'string' ? att : att.id;
          if (attId && !prev.collectedAttachments?.includes(attId)) {
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

  const handleUnlockNode = (nodeId: string) => {
    setGameState(prev => {
      // Avoid duplicate unlocks
      if (prev.unlockedNodeIds.includes(nodeId)) {
        return { ...prev, activeNodeId: nodeId };
      }

      // Add to nodes list if missing from local state
      let node = nodes.find(n => n.id === nodeId) || CORE_NODES.find(n => n.id === nodeId);
      if (node && !nodes.some(n => n.id === nodeId)) {
        setNodes(p => [...p, node!]);
      }

      return {
        ...prev,
        unlockedNodeIds: Array.from(new Set([
          ...prev.unlockedNodeIds, 
          nodeId,
          ...(nodeId.startsWith('confession_') 
            ? Array.from({ length: parseInt(nodeId.split('_')[1]) || 0 }, (_, i) => `confession_${i + 1}`) 
            : [])
        ])),
        collectedClues: prev.collectedClues,
        activeNodeId: nodeId,
        systemStability: Math.min(prev.systemStability + 20, 84),
        history: [
          ...prev.history,
          { type: 'info', content: `[本地协议覆写]: 确认关键索引关联——已锁定剧情节点 ${nodeId.toUpperCase()}`, timestamp: Date.now() }
        ]
      };
    });
  };

  const handleUnlockArchive = (archiveId: string) => {
    // Tutorial Completion: If the tutorial goal archive is unlocked, clear tutorial state
    if (archiveId === 'clipping_01' && gameState.tutorialStep > 0) {
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
        nextPeople = nextPeople.filter(id => !personIds.includes(id) || PROTECTED_YEARS.includes(id));
        // Keep clues filtered too in case of dual-mapped items
        nextClues = nextClues.filter(id => !personIds.includes(id) || PROTECTED_YEARS.includes(id)); 
      }
      if (yearIds && yearIds.length > 0) {
        nextYears = nextYears.filter(id => !yearIds.includes(id) || PROTECTED_YEARS.includes(id));
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
    setGameState({ ...INITIAL_GAME_STATE, tutorialStep: 0, ...newState });
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
    const chapterMembers = []; // Relationship tree logic completely cut
    if (chapterMembers.length === 0) return true;
    return chapterMembers.every(m => gameState.playerHypotheses[m.id]?.trim().toUpperCase() === m.name.toUpperCase());
  };

  const handleNodeClick = (id: string) => {
    if (!id) {
      const closedId = gameState.activeNodeId;
      setGameState(prev => ({ ...prev, activeNodeId: null }));
      
      if (closedId === 'confession_36A2') {
        setGameState(prev => ({ ...prev, hasSeenEndingA: true }));
        setJenniferPopup({ 
          dialogue: JENNIFER_FINAL_A_DIALOGUE, 
          title: "结案代码： #0814-FINAL 当前状态： 目标已拦截",
          onCloseCallback: () => setEndingType('ending1')
        });
      }
      
      if (closedId === 'confession_36B1') {
        handleShatter();
        setGameState(prev => ({ ...prev, isBranchBActive: true }));
      }

      // Persona Switch Trigger: End of Chapter 5 (confession_26)
      if (closedId === 'confession_26' && !gameState.hasSwitchedPersona) {
        setShowAwakeningDialogue(true);
      }
      return;
    }
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    setGameState(prev => ({ ...prev, activeNodeId: id }));
  };

  const shouldShowMonster = !!gameState.hasSwitchedPersona;

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MusicControl isPlaying={isMusicPlaying} onToggle={toggleMusic} isVisible={hasMusicStarted} />
      <AnimatePresence mode="wait">
        {gameState.phase === 'studio-intro' && (
          <StudioIntro onComplete={() => setGameState(p => ({ ...p, phase: 'briefing' }))} />
        )}
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
                onUnlockNode={handleUnlockNode}
                onUpdateHypothesis={handleUpdateHypothesis} isChapterSolved={isChapterSolved} isProcessing={isProcessing}
                onRetrace={handleRetrace} onStoryNodeComplete={handleStoryNodeComplete} onClearUnusedKeywords={handleClearUnusedKeywords}
                onConsumeKeywords={handleConsumeKeywords} 
                isPersonaGlitching={isPersonaGlitching || gameState.systemStability < 30}
                showCountdown={showCountdown}
                countdownValue={countdownValue}
                playerHypotheses={gameState.playerHypotheses}
                setTutorialStep={setTutorialStep}
                tutorialStep={gameState.tutorialStep}
                onGameEnd={() => setEndingType('ending1')}
                isBranchBActive={gameState.isBranchBActive}
                onTerminateExperiment={handleTerminateExperiment}
              />
            </ErrorBoundary>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {endingType !== null && <EndingView key="ending-view" type={endingType} />}
      </AnimatePresence>
      
      <FinalLetter isOpen={isExperimentTerminated && endingType === null} onClose={() => {
          setEndingType('ending3');
          setIsExperimentTerminated(false);
      }} />
      
      <AnimatePresence>
        {showAwakeningDialogue && (
          <AwakeningDialogue onComplete={() => {
            setShowAwakeningDialogue(false);
            // Add a final glitch after the dialogue ends
            setIsPersonaGlitching(true);
            setTimeout(() => {
              setIsPersonaGlitching(false);
              // CRITICAL: Advance story node to 6 to trigger Jennifer intro
              handleStoryNodeComplete(6);
              setGameState(prev => ({ 
                ...prev, 
                hasSwitchedPersona: true, 
                history: [...prev.history, { type: 'dialogue', content: '> [ROBERT_CAPONE]: "说吧，你还要挖什么烂账？"', timestamp: Date.now() }] 
              }));
            }, 1000);
          }} />
        )}
      </AnimatePresence>
        {isBlackout && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[2000] pointer-events-none" />}
        {jenniferPopup && (
          <GlobalJenniferPopup 
            data={jenniferPopup} 
            onClose={() => {
              if (jenniferPopup.onCloseCallback) jenniferPopup.onCloseCallback();
              setJenniferPopup(null);
            }} 
            onClueClick={handleCollectClue} 
          />
        )}
      <CheckpointManager gameState={gameState} onSetState={handleDebugStateChange} onReset={resetGame} />

      {/* Ending 2 Buildup Overlay */}
      <AnimatePresence>
        {ending2Step > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 bg-black z-[1900] flex flex-col items-center justify-center font-mono text-[#d4574e]/90 text-sm md:text-base pointer-events-auto"
          >
            <div className="w-full max-w-2xl px-8 space-y-4">
               {ending2Step >= 1 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> TERMINATION COMMAND EXECUTED.`}</motion.div>}
               {ending2Step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{`> TARGET SIGNAL LOST.`}</motion.div>}
               {ending2Step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-pulse">{`> REESTABLISHING CONNECTION...`}</motion.div>}
            </div>
            {/* Ambient scanlines for buildup */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-0 mix-blend-screen" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Glitch Overlay */}
      {isPersonaGlitching && (
        <div className="fixed inset-0 z-[9999] pointer-events-none animate-cinematic-glitch mix-blend-difference bg-white/20 backdrop-invert backdrop-saturate-200" />
      )}
    </div>
  );
};

export default App;
