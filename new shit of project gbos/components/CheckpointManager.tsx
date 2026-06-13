
import * as React from 'react';
import { useState } from 'react';
import { GameState } from '../types';
import { Anchor, ChevronDown, Lock, Unlock } from 'lucide-react';
import { KEYWORD_REGISTRY, ALL_MEMORY_NODES } from '../constants/registry';
import { ATTACHMENT_REGISTRY } from '../constants/attachments';

interface CheckpointManagerProps {
    gameState: GameState;
    onSetState: (newState: Partial<GameState>) => void;
    onReset?: () => void;
}

interface Checkpoint {
    id: number;
    title: string;
    description: string;
    storyNode: number;
    state: Partial<GameState>;
}

export const CheckpointManager: React.FC<CheckpointManagerProps> = ({ gameState, onSetState, onReset }) => {
    const [isOpen, setIsOpen] = useState(false);

    const CHECKPOINTS: Checkpoint[] = [
        {
            id: 0,
            title: "CHAPTER 0",
            description: "NEURAL INITIALIZATION",
            storyNode: 0,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: [],
                collectedClues: ['maine', 'small_bank', 'chicago', 'missing'],
                collectedDossierIds: ['personnel_tree', 'julip', 'project'],
                collectedYears: [],
                unlockedNodeIds: [],
                unlockedArchiveIds: [],
                currentStoryNode: 0,
                systemStability: 84,
                activeNodeId: null,
                tutorialStep: 1,
                isTutorialComplete: false
            }
        },
        {
            id: 1,
            title: "CHAPTER 1",
            description: "MEMORY LINK ESTABLISHED",
            storyNode: 1,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: ['nibi', 'dr_reggie', 'lundgren', 'roger_beebe'],
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990', 'year_1972'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04'],
                currentStoryNode: 1,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 2,
            title: "CHAPTER 2",
            description: "PATTERN RECOGNITION",
            storyNode: 2,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: ['nibi', 'dr_reggie', 'lundgren', 'roger_beebe'],
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1972', 'year_1973', 'year_1975'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07'],
                currentStoryNode: 2,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 3,
            title: "CHAPTER 3",
            description: "DEEP TRACE ACTIVE",
            storyNode: 3,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: ['nibi', 'dr_reggie'],
                collectedYears: ['year_1971', 'year_1972', 'year_1973', 'year_1976', 'year_1965'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10'],
                currentStoryNode: 3,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 4,
            title: "CHAPTER 4",
            description: "CORE LAYER ACCESS",
            storyNode: 4,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: ['nibi', 'dr_reggie', 'morning'],
                collectedYears: ['year_1971', 'year_1967', 'year_1974', 'year_1977'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13'],
                currentStoryNode: 4,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 5,
            title: "CHAPTER 5",
            description: "IDENTITY DISSOLUTION",
            storyNode: 5,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                unlockedPeople: ['nibi', 'dr_reggie', 'morning'],
                collectedYears: ['year_1971', 'year_1967', 'year_1974', 'year_1977'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15', 'confession_16', 'confession_17', 'confession_18', 'confession_19'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13', 'clipping_14', 'clipping_15', 'clipping_16'],
                currentStoryNode: 5,
                systemStability: 84
            }
        },
                {
            id: 6,
            title: "CHAPTER 6",
            description: "FRAGMENTED PERSPECTIVE",
            storyNode: 6,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985'],
                unlockedPeople: ['nibi', 'lundgren', 'dr_reggie', 'roger_beebe', 'morning', 'alexei', 'morandi'],
                collectedClues: ['amalekite_protocol'],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15', 'confession_16', 'confession_17', 'confession_18', 'confession_19', 'confession_20', 'confession_21', 'confession_22', 'confession_23', 'confession_24', 'confession_25', 'confession_26'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13', 'clipping_14', 'clipping_15', 'clipping_16', 'clipping_17', 'clipping_18', 'clipping_19'],
                currentStoryNode: 6,
                hasSwitchedPersona: true,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 7,
            title: "CHAPTER 7",
            description: "FINAL SYNCHRONIZATION",
            storyNode: 7,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                isTutorialComplete: true,
                tutorialStep: 0,
                unlockedPeople: ['nibi', 'lundgren', 'dr_reggie', 'roger_beebe', 'morning', 'alexei', 'morandi', 'father', 'capone', 'conchar', 'juvell_chambers', 'julie'],
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1976', 'year_1975', 'year_1983', 'year_1974', 'year_1977', 'year_1986'],
                collectedClues: ['humiliation_ritual'], 
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon', 'forest_map'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15', 'confession_16', 'confession_17', 'confession_18', 'confession_19', 'confession_20', 'confession_21', 'confession_22', 'confession_23', 'confession_24', 'confession_25', 'confession_26', 'confession_27', 'confession_28', 'confession_29'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13', 'clipping_14', 'clipping_15', 'clipping_16', 'clipping_17', 'clipping_18', 'clipping_19', 'clipping_20', 'clipping_21', 'clipping_22'],
                currentStoryNode: 7,
                hasSwitchedPersona: true,
                hasSeenNode6Intro: true,
                hasSeenNode7Intro: false,
                systemStability: 84,
                activeNodeId: null
            }
        },
        {
            id: 8,
            title: "CHAPTER 8",
            description: "THE FINAL TRUTH",
            storyNode: 8,
            state: {
                phase: 'immersion',
                isClueLibraryOpen: true,
                passwordEntered: true,
                isTutorialComplete: true,
                tutorialStep: 0,
                unlockedPeople: ['nibi', 'lundgren', 'dr_reggie', 'roger_beebe', 'morning', 'alexei', 'morandi', 'father', 'capone', 'conchar', 'frank_rollins', 'juvell_chambers', 'julie', 'cynthia_miller'],
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1976', 'year_1975', 'year_1983', 'year_1974', 'year_1977', 'year_1986', 'year_1999', 'year_1981'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon', 'forest_map'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15', 'confession_16', 'confession_17', 'confession_18', 'confession_19', 'confession_20', 'confession_21', 'confession_22', 'confession_23', 'confession_24', 'confession_25', 'confession_26', 'confession_27', 'confession_28', 'confession_29', 'confession_30', 'confession_31', 'confession_32', 'confession_33'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13', 'clipping_14', 'clipping_15', 'clipping_16', 'clipping_17', 'clipping_18', 'clipping_19', 'clipping_20', 'clipping_21', 'clipping_22', 'clipping_23'],
                currentStoryNode: 8,
                hasSwitchedPersona: true,
                systemStability: 84,
                activeNodeId: null
            }
        }
    ];

    const currentProgress = gameState.currentStoryNode;

    return (
        <div className="fixed bottom-20 left-4 z-[9999] flex flex-col items-start pointer-events-none" >
            <div className={`
        pointer-events-auto bg-[#0a0a0a]/95 border border-cyan-500/30 rounded-lg backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15)]
        transition-all duration-500 ease-out overflow-hidden flex flex-col
        ${isOpen ? 'w-80 max-h-[500px] opacity-100' : 'w-12 h-12 opacity-80 hover:opacity-100 hover:scale-105'}
      `}>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-3 flex items-center justify-center transition-all ${isOpen ? 'border-b border-cyan-500/20 bg-cyan-500/5' : 'h-full hover:bg-cyan-500/10'}`}
                >
                    {isOpen ? (
                        <div className="flex items-center gap-3 w-full px-2">
                            <Anchor size={16} className="text-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-[0.2em] flex-1 text-left">Neural Sync Points</span>
                            <ChevronDown size={14} className="text-cyan-400" />
                        </div>
                    ) : (
                        <Anchor size={20} className="text-cyan-400" />
                    )}
                </button>

                {/* Content Panel */}
                {isOpen && (
                    <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar relative">
                        <div className="flex gap-2 pb-2 border-b border-cyan-500/10">
                            <button onClick={() => { if(window.confirm('警告：此操作将清空所有记忆碎片，重新开启从头开始的审讯。是否确认？')) { onReset?.(); } }} className="flex-1 bg-red-950/40 hover:bg-red-900/60 text-red-400/90 hover:text-red-300 text-xs py-2 px-1 rounded border border-red-900/50 transition-colors font-bold tracking-wider">
                                重新开启审讯
                            </button>
                            <button onClick={() => setIsOpen(false)} className="flex-1 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-400/90 hover:text-cyan-300 text-xs py-2 px-1 rounded border border-cyan-900/50 transition-colors font-bold tracking-wider">
                                继续当前审讯
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] text-cyan-500/50 font-mono uppercase tracking-widest block">
                                    Established Anchors
                                </label>
                                <span className="text-[9px] text-cyan-400 font-mono">
                                    NODE_{currentProgress.toString().padStart(2, '0')}
                                </span>
                            </div>

                            {CHECKPOINTS.map((cp, idx) => {
                                const isGameCleared = localStorage.getItem('gbos_game_cleared') === 'true';
                                const isUnlocked = isGameCleared || cp.storyNode <= currentProgress;
                                const isFuture = !isGameCleared && cp.storyNode > currentProgress;
                                const isFarFuture = !isGameCleared && cp.storyNode > currentProgress + 3;
                                
                                // Hide everything beyond +3 to maintain suspense about total length
                                if (isFarFuture) return null;

                                // Calculate fade for future chapters within the window
                                // currentProgress + 1: 0.8 opacity
                                // currentProgress + 2: 0.5 opacity
                                // currentProgress + 3: 0.2 opacity + blur
                                let opacity = 1;
                                let blur = 0;
                                if (isFuture) {
                                    const distance = cp.storyNode - currentProgress;
                                    if (distance === 1) opacity = 0.8;
                                    else if (distance === 2) opacity = 0.5;
                                    else if (distance === 3) {
                                        opacity = 0.2;
                                        blur = 2;
                                    }
                                }

                                return (
                                    <button
                                        key={cp.id}
                                        disabled={!isUnlocked}
                                        onClick={() => {
                                            const stateToApply = { ...cp.state };
                                            const allUnlocked = [...(stateToApply.unlockedNodeIds || []), ...(stateToApply.unlockedArchiveIds || [])];
                                            stateToApply.collectedAttachments = Object.values(ATTACHMENT_REGISTRY)
                                                .filter(a => a.unlockSource && allUnlocked.includes(a.unlockSource))
                                                .map(a => a.id);
                                            onSetState(stateToApply);
                                            setIsOpen(false);
                                        }}
                                        style={{ 
                                            opacity,
                                            filter: blur ? `blur(${blur}px)` : 'none'
                                        }}
                                        className={`
                                            w-full flex items-center gap-4 px-4 py-3 border rounded transition-all relative group
                                            ${isUnlocked 
                                                ? 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 text-cyan-100' 
                                                : 'bg-black/40 border-white/5 text-white/20 cursor-not-allowed'}
                                        `}
                                    >
                                        <div className={`
                                            w-8 h-8 rounded flex items-center justify-center text-xs font-mono shrink-0
                                            ${isUnlocked ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 group-hover:scale-110 transition-transform' : 'bg-white/5 border border-white/10 text-white/10'}
                                        `}>
                                            {isUnlocked ? <Unlock size={14} /> : <Lock size={14} />}
                                        </div>
                                        
                                        <div className="flex flex-col items-start min-w-0">
                                            <span className={`font-bold text-xs tracking-wide truncate w-full ${isUnlocked ? 'text-cyan-200' : 'text-white/20'}`}>
                                                {cp.title}
                                            </span>
                                            <span className="text-[9px] text-left opacity-60 leading-relaxed line-clamp-1">
                                                {isUnlocked ? cp.description : "加密状态：当前神经频率不匹配"}
                                            </span>
                                        </div>

                                        {isUnlocked && (
                                            <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronDown size={12} className="-rotate-90 text-cyan-400" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {/* Fade-out overlay at the bottom to suggest more content */}
                        {currentProgress + 3 < 9 && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-80" />
                        )}

                        <div className="pt-3 border-t border-cyan-500/10">
                            <p className="text-[8px] text-cyan-500/30 font-mono text-center tracking-tighter uppercase italic">
                                Re-syncing will reset temporary neural fragments to the last stable anchor.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(6, 182, 212, 0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.4); }
            `}} />
        </div >
    );
};
