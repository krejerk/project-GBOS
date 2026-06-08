import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Folder, File, X, Image as ImageIcon, Paperclip, FileText, Search, Tag, Eye, Lock, Hash, MessageCircle, Mic, ChevronRight, ChevronLeft, Activity, Brain } from 'lucide-react';
import { Clue, ClueAttachment } from '../types';
import {
    CLUE_DISPLAY_MAP, CATEGORY_IDS, KEYWORD_REGISTRY,
    JENNIFER_FIRST_VISIT_DIALOGUE as JENNIFER_DIALOGUE,
    JENNIFER_RETURN_DIALOGUE,
    JENNIFER_NODE_1_DIALOGUE,
    JENNIFER_NODE_2_DIALOGUE,
    JENNIFER_NODE_3_DIALOGUE,
    JENNIFER_NODE_4_DIALOGUE,
    JENNIFER_NODE_5_DIALOGUE,
    JENNIFER_NODE_6_DIALOGUE,
    JENNIFER_NODE_7_DIALOGUE,
    JENNIFER_NODE_8_DIALOGUE,
    JENNIFER_NODE_9_DIALOGUE
} from '../constants';
import { ATTACHMENT_REGISTRY } from '../constants/attachments';
import { CLUE_DEFINITIONS, GLOBAL_KEYWORD_MAP } from '../constants';
import { VehiclePhotosViewer } from './VehiclePhotosViewer';
import { TutorialOverlay } from './TutorialOverlay';
import { SyndicateBoard } from './SyndicateBoard';

interface ClueLibraryProps {
    collectedClueIds: string[];
    isOpen: boolean;
    onClose: () => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
    onCollectClue?: (id: string, word: string) => void; // For auto-collecting clues
    collectedDossierIds?: string[]; // For tracking dossier items like addresses
    collectedKeywords?: string[]; // For tracking collected keywords/clues
    collectedPeople?: string[]; // For tracking collected/unlocked people
    collectedYears?: string[]; // For tracking collected years
    unlockedNodeIds?: string[]; // For tracking unlocked confessions
    unlockedArchiveIds?: string[]; // For tracking unlocked archives
    currentStoryNode?: number; // Current story node (0 = not reached, 1 = node 1, etc.)
    onStoryNodeComplete?: (nodeId: number) => void; // Callback when node dialogue is completed
    onClearUnusedKeywords?: () => void; // Callback to clear unused keywords (for Jennifer node 3)
    onSetFilingEvidence?: (evidence: { id: string, title: string, content: string, type: 'image' | 'text' } | null) => void;
    initialSelectedClueId?: string | null;
    hasSwitchedPersona?: boolean;
    isChapterSolved?: (chapter: number) => boolean;
    tutorialStep?: number;
    setTutorialStep?: (step: number) => void;
    playerHypotheses?: Record<string, string>;
    onUpdateHypothesis?: (nodeId: string, name: string) => void;
}

// CLUE_DEFINITIONS is now derived from KEYWORD_REGISTRY inside the ClueLibrary component


// Utility function to reset visit status (call this when starting a new game)
export const resetClueLibraryVisit = () => {
    localStorage.removeItem('clueLibrary_visited');
};

export const ClueLibrary: React.FC<ClueLibraryProps> = ({
    collectedClueIds = [],
    isOpen,
    onClose,
    collectedAttachments = [],
    onCollectAttachment,
    onCollectClue,
    unlockedNodeIds = [],
    unlockedArchiveIds = [],
    currentStoryNode = 0,
    collectedDossierIds = [], // Default to empty array
    collectedKeywords = [], // For dialogue parsing
    collectedPeople = [],
    collectedYears = [],
    onStoryNodeComplete,
    onClearUnusedKeywords,
    onSetFilingEvidence,
    initialSelectedClueId = null,
    hasSwitchedPersona = false,
    isChapterSolved = () => true,
    tutorialStep = 0,
    setTutorialStep,
    playerHypotheses = {},
    onUpdateHypothesis
}) => {
    const CLUE_DEFINITIONS: Record<string, Clue> = React.useMemo(() => {
        const definitions: Record<string, Clue> = {};
        Object.entries(KEYWORD_REGISTRY).forEach(([id, meta]) => {
            definitions[id] = {
                id: meta.id || id,
                word: meta.displayName || id,
                description: meta.description || '',
                source: meta.source || (meta.type === 'year' ? 'Chronology' : 'Investigation'),
                attachments: (meta.attachments || []).filter((a): a is any => typeof a !== 'string')
            };
        });
        return definitions;
    }, []);

    const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
    const [filter, setFilter] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'folder'>('list');

    // Helper to parse content and render clickable clues (Ported from BriefingDetailView)

    // Handle special actions from dialogue links
    const handleDialogueAction = (actionId: string) => {
        if (!onSetFilingEvidence) return;
        if (actionId === 'view_iron_horse_record') {
            onSetFilingEvidence({
                id: 'iron_horse_louisville',
                title: '图注：烟盒记录：路易斯维尔',
                content: `${import.meta.env.BASE_URL}images/iron_horse_louisville.jpg`,
                type: 'image'
            });
            if (onCollectAttachment) {
                onCollectAttachment('iron_horse_louisville');
            }
        }
        if (actionId === 'extract_visual_confession_6') {
            onSetFilingEvidence({
                id: 'iron_horse_beacon',
                title: '视觉残留：灰水信标 (莫哈韦)',
                content: `${import.meta.env.BASE_URL}images/iron_horse_beacon.jpg`,
                type: 'image'
            });
            if (onCollectClue) onCollectClue('graywater_beacon', '灰水信标');
            if (onCollectAttachment) onCollectAttachment('iron_horse_beacon');
        }
        if (actionId === 'extract_church_residue') {
            onSetFilingEvidence({
                id: 'church_visual_residue',
                title: '视觉残留：圣泉镇教堂',
                content: `${import.meta.env.BASE_URL}images/church_visual_residue.png`,
                type: 'image'
            });
            if (onCollectAttachment) onCollectAttachment('church_visual_residue');
        }
        if (actionId === 'extract_laguna_beach_residue') {
            onSetFilingEvidence({
                id: 'laguna_beach_visual_residue',
                title: '视觉残留：拉古那海滩',
                content: `${import.meta.env.BASE_URL}images/laguna_beach_visual_residue.png`,
                type: 'image'
            });
            if (onCollectAttachment) onCollectAttachment('laguna_beach_visual_residue');
        }
        if (actionId === 'extract_visual_node_7') {
            onSetFilingEvidence({
                id: 'libby_ticket',
                title: '证物：灰狗巴士票根',
                content: `${import.meta.env.BASE_URL}images/libby_ticket.jpg`,
                type: 'image'
            });
            if (onCollectClue) onCollectClue('libby_town', '利比镇');
        }
        if (actionId === 'extract_visual_node_32') {
            onSetFilingEvidence({
                id: 'silver_magpie_report',
                title: '视觉残留：银喜鹊',
                content: `${import.meta.env.BASE_URL}images/silver_magpie.png`,
                type: 'image'
            });
            if (onCollectClue) onCollectClue('silver_magpie', '银喜鹊');
        }
        if (actionId === 'extract_rv_memory') {
            onSetFilingEvidence({
                id: 'libby_forest_map_residue',
                title: '视觉残留：利比镇房车与森林地图',
                content: `${import.meta.env.BASE_URL}images/confession_31_residue.png`,
                type: 'image'
            });
            if (onCollectAttachment) onCollectAttachment('libby_forest_map_residue');
        }
        if (actionId === 'extract_visual_node_32') {
            onSetFilingEvidence({
                id: 'vanessa_memory_final',
                title: '视觉残留：记忆中的房车与瓦妮莎',
                content: `${import.meta.env.BASE_URL}images/vanessa_memory_final.png`,
                type: 'image'
            });
        }
        if (actionId === 'death_report') {
            onSetFilingEvidence({
                id: 'death_report',
                title: '证物：无名氏 #88-B 死亡报告',
                content: `${import.meta.env.BASE_URL}images/john_doe_autopsy_report.png`,
                type: 'image'
            });
            if (onCollectAttachment) {
                onCollectAttachment('death_report');
            }
        }
    };

    const renderContent = (content: string, isFromJennifer: boolean = false) => {
        const parts = content.split(/(\[.*?\]\(clue:.*?\))/g);

        return parts.map((part, index) => {
            const match = part && part.match(/\[(.*?)\]\(clue:(.*?)\)/);
            if (match) {
                const text = match[1];
                const clueId = match[2].trim();

                // Special handling for action links
                if (clueId === 'view_iron_horse_record' || clueId === 'extract_church_residue' || clueId === 'extract_laguna_beach_residue' || clueId === 'extract_visual_node_7' || clueId === 'extract_rv_memory' || clueId === 'extract_visual_node_32' || clueId === 'death_report') {
                    return (
                        <span
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDialogueAction(clueId);
                            }}
                            className="text-[#d89853] hover:text-[#fbbf24] hover:underline cursor-pointer transition-colors mx-1"
                        >
                            {text}
                        </span>
                    );
                }

                const FORCE_UNCOLLECTED = ['priest', 'recruitment', 'blue_rv', 'graywater_beacon'];
                const forcedUncollected = FORCE_UNCOLLECTED.includes(clueId);

                // YEAR keywords are allowed to be collected multiple times
                const meta = KEYWORD_REGISTRY[clueId];
                const isYearClue = clueId.startsWith('year_') || (meta?.type === 'year');
                const isCollected = (forcedUncollected) ? false : (
                    (collectedKeywords || []).includes(clueId) ||
                    (collectedDossierIds || []).includes(clueId) ||
                    (collectedPeople || []).includes(clueId) ||
                    (collectedYears || []).includes(clueId)
                );

                // SPECIAL CASE: Years should ALWAYS be interactive to allow re-collection/feedback
                const canClick = !isCollected || isYearClue;

                return (
                    <motion.span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (canClick && onCollectClue) {
                                onCollectClue(clueId, text);
                            }
                        }}
                        className={`
                            relative inline-block px-1 rounded transition-all duration-300 mx-0.5
                            ${(isCollected && !isYearClue)
                                ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-b border-[#38bdf8]/30 cursor-default'
                                : 'text-[#d89853] hover:text-[#fbbf24] hover:shadow-[0_0_12px_rgba(216,152,83,0.4)] cursor-pointer border-b border-dashed border-[#d89853]/50 animate-pulse'
                            }
                        `}
                    >
                        {text}
                        {!isCollected && (
                            <span className="absolute -top-3 -right-2 opacity-0 hover:opacity-100 transition-opacity text-[8px] text-[#38bdf8] bg-black/80 px-1 rounded border border-[#38bdf8]/30 whitespace-nowrap z-50">
                                点击收集
                            </span>
                        )}
                    </motion.span>
                );
            }
            return part;
        });
    };
    const [viewingAttachment, setViewingAttachment] = useState<ClueAttachment | null>(null);

    // Jennifer Dialogue State
    const [showJennifer, setShowJennifer] = useState(false);
    const [jenniferStep, setJenniferStep] = useState(0);
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

    // New State for History/Replay
    const [showHistory, setShowHistory] = useState(false);
    const [simulatedDialogue, setSimulatedDialogue] = useState<string[] | null>(null);

    // Filing State removed - now handled by parent via props

    // Track newly added items for glow effect
    const [newlyAddedItems, setNewlyAddedItems] = useState<Set<string>>(new Set());

    // Unified effect to set initial selected clue when opening
    useEffect(() => {
        if (isOpen && initialSelectedClueId) {
            const definition = CLUE_DEFINITIONS[initialSelectedClueId];
            if (definition) {
                setSelectedClue(definition);
                setViewMode('folder');
            }
        }
    }, [isOpen, initialSelectedClueId]);

    // Vehicle photos viewer state
    const [showVehiclePhotos, setShowVehiclePhotos] = useState(false);

    // Track Node 4 dialogue completion for map update timing
    const [hasViewedNode1Dialogue, setHasViewedNode1Dialogue] = useState(false);
    const [hasViewedNode2Dialogue, setHasViewedNode2Dialogue] = useState(false);
    const [hasViewedNode3Dialogue, setHasViewedNode3Dialogue] = useState(false);
    const [hasViewedNode4Dialogue, setHasViewedNode4Dialogue] = useState(false);
    const [hasViewedNode5Dialogue, setHasViewedNode5Dialogue] = useState(false);
    const [hasViewedNode6Dialogue, setHasViewedNode6Dialogue] = useState(false);
    const [hasViewedNode7Dialogue, setHasViewedNode7Dialogue] = useState(false);
    const [hasViewedNode8Dialogue, setHasViewedNode8Dialogue] = useState(false);

    const checkNode9Completion = () => {
        return unlockedNodeIds.includes('node_9') && currentStoryNode === 8;
    };

    const checkNode8Completion = () => {
        const requiredConfessions = ['confession_30', 'confession_31', 'confession_32', 'confession_33'];
        const requiredArchives = ['clipping_21', 'clipping_22', 'clipping_23'];
        
        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 7 || (currentStoryNode === 8 && !hasViewedNode8Dialogue));
    };

    const checkNode7Completion = () => {
        const requiredConfessions = ['confession_20', 'confession_21', 'confession_22', 'confession_23', 'confession_24', 'confession_25', 'confession_26', 'confession_27', 'confession_28', 'confession_29'];
        const requiredArchives = ['clipping_17', 'clipping_18', 'clipping_19', 'clipping_20'];
        
        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && currentStoryNode === 6 && hasViewedNode6Dialogue;
    };

    const checkNode7Intro = () => {
        return currentStoryNode === 7 && !hasViewedNode7Dialogue;
    };

    const checkNode6Completion = () => {
        return hasSwitchedPersona && (currentStoryNode === 5 || (currentStoryNode === 6 && !hasViewedNode6Dialogue));
    };

    const checkNode5Completion = () => {
        const requiredConfessions = ['confession_16', 'confession_17', 'confession_18', 'confession_19'];
        const requiredArchives = ['clipping_14', 'clipping_15', 'clipping_16']; // Archives 14-16

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 4 || (currentStoryNode === 5 && !hasViewedNode5Dialogue));
    };

    const checkNode4Completion = () => {
        const requiredConfessions = ['confession_12', 'confession_13', 'confession_14', 'confession_15'];
        const requiredArchives = ['clipping_11', 'clipping_12', 'clipping_13'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 3 || (currentStoryNode === 4 && !hasViewedNode4Dialogue));
    };

    const checkNode3Completion = () => {
        const requiredConfessions = ['confession_8', 'confession_9', 'confession_10', 'confession_11'];
        const requiredArchives = ['clipping_08', 'clipping_09', 'clipping_10'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 2 || (currentStoryNode === 3 && !hasViewedNode3Dialogue));
    };

    const checkNode2Completion = () => {
        const requiredConfessions = ['confession_4', 'confession_5', 'confession_6', 'confession_7'];
        const requiredArchives = ['clipping_05', 'clipping_06', 'clipping_07']; // Clipping 5, 6, 7

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 1 || (currentStoryNode === 2 && !hasViewedNode2Dialogue));
    };

    const checkNode1Completion = () => {
        const requiredConfessions = ['confession_1', 'confession_2', 'confession_3'];
        const requiredArchives = ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && (currentStoryNode === 0 || (currentStoryNode === 1 && !hasViewedNode1Dialogue));
    };

    // Derived Node State (Calculated on-the-fly to avoid unmount state loss)
    const detectedNodeId = (() => {
        if (checkNode9Completion()) return 9;
        if (checkNode8Completion()) return 8;
        if (checkNode7Completion()) return 7;
        if (checkNode7Intro()) return 7;
        if (checkNode6Completion()) return 6;
        if (checkNode5Completion()) return 5;
        if (checkNode4Completion()) return 4;
        if (checkNode3Completion()) return 3;
        if (checkNode2Completion()) return 2;
        if (checkNode1Completion()) return 1;
        return null;
    })();

    useEffect(() => {
        if (isOpen) {
            const visited = localStorage.getItem('clueLibrary_visited');
            setHasVisitedBefore(!!visited);

            if (detectedNodeId !== null) {
                console.log('[Jennifer Check] Node Condition Met:', detectedNodeId);
                // AUTO-TRIGGER dialogue when a new closure is detected
                setShowJennifer(true);
            }
        }
    }, [isOpen, detectedNodeId]);

        // Mark as visited when dialogue completes
    const handleJenniferComplete = () => {
        if (!hasVisitedBefore) {
            localStorage.setItem('clueLibrary_visited', 'true');
            setHasVisitedBefore(true);
        }

        if (tutorialStep === 2 && setTutorialStep) {
            setTutorialStep(3);
        }

        // If completing a node dialogue, notify parent and auto-collect items
        if (detectedNodeId !== null && onStoryNodeComplete) {
            onStoryNodeComplete(detectedNodeId);

            // Mark dialogue as viewed to prevent re-triggering
            if (detectedNodeId === 1) {
                if (onCollectClue) onCollectClue('crime_route_map', '罗伯特·卡彭：犯罪路线');
                setHasViewedNode1Dialogue(true);
                setNewlyAddedItems(new Set(['crime_route_map']));
                setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            } else if (detectedNodeId === 2) {
                if (onCollectClue) onCollectClue('blue_rv', '淡蓝色房车');
                setNewlyAddedItems(new Set(['crime_route_map', 'graywater_beacon']));
                setTimeout(() => setNewlyAddedItems(new Set()), 10000);
                setHasViewedNode2Dialogue(true);
            } else if (detectedNodeId === 3) {
                setHasViewedNode3Dialogue(true);
            } else if (detectedNodeId === 4) {
                setHasViewedNode4Dialogue(true);
            } else if (detectedNodeId === 5) {
                setHasViewedNode5Dialogue(true);
            } else if (detectedNodeId === 6) {
                setHasViewedNode6Dialogue(true);
                // Trigger sweep after intro dialogue to clean up old chapter debris
                if (onClearUnusedKeywords) onClearUnusedKeywords();
            } else if (detectedNodeId === 7) {
                setHasViewedNode7Dialogue(true);
            }
        }

        // SWEEP TRIGGER: Always sweep if ending Node 3 dialogue, regardless of what detectedNodeId says now
        if (simulatedDialogue === JENNIFER_NODE_3_DIALOGUE || (detectedNodeId === 3 && onStoryNodeComplete)) {
            setHasViewedNode3Dialogue(true);
            setNewlyAddedItems(new Set(['crime_route_map']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            if (onClearUnusedKeywords) onClearUnusedKeywords();
        } else if (simulatedDialogue === JENNIFER_NODE_4_DIALOGUE || detectedNodeId === 4) {
            // Node 4 completion: Update story node and collect julip dossier
            if (onStoryNodeComplete) {
                onStoryNodeComplete(4);
            }
            // Auto-collect julip dossier for Node 4
            if (onCollectClue) {
                onCollectClue('julip', '黄油朱莉普');
            }
            // Auto-collect julip attachments for Node 4
            if (onCollectAttachment) {
                onCollectAttachment('julip_symbol');
                onCollectAttachment('butter_julep_evidence');
            }
            // Visual feedback for Node 4
            setNewlyAddedItems(new Set(['crime_route_map', 'julip']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            // Mark Node 4 dialogue as viewed to trigger map update
            setHasViewedNode4Dialogue(true);
        } else if (simulatedDialogue === JENNIFER_NODE_5_DIALOGUE || detectedNodeId === 5) {
            // Node 5 completion: Update story node and collect reboot_command keyword
            if (onStoryNodeComplete) {
                onStoryNodeComplete(5);
            }
            // Auto-collect reboot_command keyword for Node 5
            if (onCollectClue) {
                onCollectClue('reboot_command', '>> 0x524F42455254_PURGE // ERR::NO_SIGNAL_FROM_GOD // MAGPIE_OVERRIDE >> [FORCE_LOAD_MONSTER]');
            }
            // Visual feedback for Node 5
            setNewlyAddedItems(new Set(['crime_route_map']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            // Mark Node 5 dialogue as viewed to trigger map update
            setHasViewedNode5Dialogue(true);
        } else if (simulatedDialogue === JENNIFER_NODE_6_DIALOGUE || detectedNodeId === 6) {
            // Node 6 completion: Update story node to 6
            if (onStoryNodeComplete) {
                onStoryNodeComplete(6);
            }
            // Auto-collect final route locations for Node 6 map update removed to prevent unwanted popups
            // Visual feedback for Node 6
            setNewlyAddedItems(new Set([
                'crime_route_map',
                'portland',
                'santa_barbara',
                'laguna_beach',
                'albuquerque',
                'santa_fe'
            ]));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            // Mark Node 6 dialogue as viewed to trigger map update
            setHasViewedNode6Dialogue(true);
        } else if (simulatedDialogue === JENNIFER_NODE_7_DIALOGUE || detectedNodeId === 7) {
            // Node 7 completion: Update story node to 7
            if (onStoryNodeComplete) {
                onStoryNodeComplete(7);
            }
            // Auto-collect items for Node 7 removed to prevent unwanted popups
            if (onCollectAttachment) {
                onCollectAttachment('libby_convergence_map');
            }
            // Visual feedback
            setNewlyAddedItems(new Set(['crime_route_map', 'libby_town']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            // Mark Node 7 dialogue as viewed to trigger map update
            setHasViewedNode7Dialogue(true);
        } else if (simulatedDialogue === JENNIFER_NODE_8_DIALOGUE || detectedNodeId === 8) {
            // Node 8 completion: Update story node to 8
            if (onStoryNodeComplete) {
                onStoryNodeComplete(8);
            }
            
            // Collect the autopsy attachment silently if they missed the click
            if (onCollectAttachment) {
                onCollectAttachment('john_doe_autopsy');
            }
            
            setHasViewedNode8Dialogue(true);
        } else if (simulatedDialogue === JENNIFER_NODE_9_DIALOGUE || detectedNodeId === 9) {
            // Node 9 completion: Collect 1999 and Cynthia Miller
            if (onStoryNodeComplete) {
                onStoryNodeComplete(9);
            }
            if (onCollectClue) {
                onCollectClue('year_1999', '1999');
                onCollectClue('cynthia_miller', '辛西娅·米勒');
            }
        }

        setShowJennifer(false);

        setJenniferStep(0);
        setSimulatedDialogue(null);

        if (tutorialStep === 2 && setTutorialStep) {
            setTutorialStep(3);
        }

        // SYNC: If the map is currently being viewed, refresh its content to the new version
        if (viewingAttachment?.content && (detectedNodeId === 2 || detectedNodeId === 3 || detectedNodeId === 4 || detectedNodeId === 5 || detectedNodeId === 6 || detectedNodeId === 7)) {
            const updatedDefinition = getDynamicClueDefinition('crime_route_map');
            // Node 7 should show the second attachment (Greyhound Map) by default
            const isNode7 = detectedNodeId === 7 || simulatedDialogue === JENNIFER_NODE_7_DIALOGUE;
            const attachmentIndex = isNode7 ? 1 : 0;
            
            if (updatedDefinition.attachments?.[attachmentIndex]) {
                setViewingAttachment(updatedDefinition.attachments[attachmentIndex]);
            } else if (updatedDefinition.attachments?.[0]) {
                setViewingAttachment(updatedDefinition.attachments[0]);
            }
        }
    };

    const handleJenniferClose = () => {
        setShowJennifer(false);
        setJenniferStep(0);
        setSimulatedDialogue(null); // Clear simulation on exit
    };

    const getJenniferDialogue = (simulated: string[] | null, detectedId: number | null, visited: boolean) => {
        if (simulated) return simulated;
        if (detectedId === 9) return JENNIFER_NODE_9_DIALOGUE;
        if (detectedId === 8) return JENNIFER_NODE_8_DIALOGUE;
        if (detectedId === 7) return JENNIFER_NODE_7_DIALOGUE;
        if (detectedId === 6) return JENNIFER_NODE_6_DIALOGUE;
        if (detectedId === 5) return JENNIFER_NODE_5_DIALOGUE;
        if (detectedId === 4) return JENNIFER_NODE_4_DIALOGUE;
        if (detectedId === 3) return JENNIFER_NODE_3_DIALOGUE;
        if (detectedId === 2) return JENNIFER_NODE_2_DIALOGUE;
        if (detectedId === 1) return JENNIFER_NODE_1_DIALOGUE;
        if (visited) return JENNIFER_RETURN_DIALOGUE;
        return JENNIFER_DIALOGUE;
    };

    const handleJenniferNext = () => {
        const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
        if (jenniferStep < dialog.length - 1) {
            setJenniferStep(prev => prev + 1);
        }
    };

    const handleJenniferPrev = () => {
        if (jenniferStep > 0) {
            setJenniferStep(prev => prev - 1);
        }
    };

    // Filter available clues
    // Data is now strict lane separated, so we trust the incoming IDs

    // Dynamic Clue Getter: Returns modified version of clue based on current state
    const getDynamicClueDefinition = (id: string): Clue => {
        const original = CLUE_DEFINITIONS[id];
        if (!original) return original;

        // Fetch attachments from the central registry that belong to this dossier/clue
        const registryAttachments = Object.values(ATTACHMENT_REGISTRY)
            .filter(attr => attr.parentId === id && (collectedAttachments || []).includes(attr.id))
            .map(attr => ({
                id: attr.id,
                type: attr.type,
                title: attr.title,
                content: `${import.meta.env.BASE_URL}${attr.content.startsWith('/') ? attr.content.slice(1) : attr.content}`,
                description: attr.description
            }));

        // Special handling for Crime Route Map description updates
        if (id === 'crime_route_map') {
            const isNode7Ready = currentStoryNode >= 7;
            const isNode6Ready = currentStoryNode >= 6;
            const isNode5Ready = currentStoryNode >= 5;
            const isNode4Ready = currentStoryNode >= 4;
            const isNode3Ready = currentStoryNode >= 3;
            const isNode2Ready = currentStoryNode >= 2;

            let description = original.description;
            if (isNode7Ready) {
                description = '根据汇聚的灰狗巴士票根，卡彭在过去十二年里从全美各地不断汇聚到蒙大拿州的利比镇。这是一次漫长而隐秘的回归。';
            } else if (isNode6Ready) {
                description = '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔 -> 圣路易斯 -> 堪萨斯城 -> 芝加哥 -> 罗克福德 -> 格林贝 -> 盐湖城 -> 丹佛 -> 埃尔帕索 -> 圣菲 -> 阿尔伯克基市 -> 圣芭芭拉 -> 拉古那海滩 -> 波特兰';
            } else if (isNode5Ready) {
                description = '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔 -> 圣路易斯 -> 堪萨斯城 -> 芝加哥 -> 罗克福德 -> 格林贝 -> 盐湖城（标记点：丹佛、埃尔帕索）';
            } else if (isNode4Ready) {
                description = '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔 -> 圣路易斯 -> 堪萨斯城 -> 芝加哥';
            } else if (isNode3Ready) {
                description = '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔（房车密集活动区域）';
            } else if (isNode2Ready) {
                description = '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔';
            }

            return {
                ...original,
                description,
                attachments: registryAttachments
            };
        }

        return {
            ...original,
            attachments: registryAttachments
        };
    }

    // Dossier items are separate from search keywords. 
    // Only dossier items are rendered as folders in the sidebar.
    const uniqueDossierIds = Array.from(new Set([...(collectedDossierIds || [])]));
    const collectedClues = uniqueDossierIds
        .map(id => getDynamicClueDefinition(id))
        .filter(clue => clue && !['julip_symbol', 'project_symbol', 'personnel_tree', 'forest_map'].includes(clue.id));

    // Group clues by folder (ensure only 4 main folders)
    const groupedClues = collectedClues.reduce((acc, clue) => {
        let folderName = '案卷建档';
        
        if (clue.id === 'julip') {
            folderName = '黄油朱莉普';
        } else if (clue.id === 'project') {
            folderName = '青豆牡蛎汤计划';
        } else if (clue.id === 'graywater_beacon') {
            folderName = '灰水信标';
        } else if (clue.id === 'crime_route_map') {
            folderName = '犯罪路线图';
        } else {
            // Default or fallback
            folderName = '案卷建档';
        }
        
        if (!acc[folderName]) acc[folderName] = [];
        acc[folderName].push(clue);
        return acc;
    }, {} as Record<string, Clue[]>);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                >
                    {/* Main Container - Centered Modal */}
                    <div className="w-full max-w-6xl h-[85vh] bg-[#1c1c1e] border-2 border-[#8b4049]/50 rounded-lg flex shadow-[0_0_80px_rgba(139,64,73,0.25),0_0_40px_rgba(56,189,248,0.1)] relative overflow-hidden">

                        {/* Left Sidebar: Case Directory */}
                        <div className="w-64 bg-[#141416] border-r-2 border-[#8b4049]/30 flex flex-col hidden md:flex">
                            <div className="p-6 border-b border-[#8b4049]/30">
                                <h2 className="text-[#c9c9cd] font-mono font-bold tracking-[0.2em] flex items-center gap-2">
                                    <Database size={16} />
                                    案卷建档
                                </h2>
                                <p className="text-[#8b4049]/80 text-[10px] uppercase tracking-widest mt-1">Case Dossier & Evidence</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {Object.entries(groupedClues).map(([source, clues]) => (
                                    <div key={source}>
                                        <div className="text-[10px] text-[#8e8e93] uppercase tracking-[0.2em] font-bold mb-3 px-2">
                                            {source}
                                        </div>
                                        <div className="space-y-1">
                                            {(clues as Clue[]).map(clue => {
                                                const hasAttachment = clue.attachments && clue.attachments.length > 0;
                                                const isActive = selectedClue?.id === clue.id;
                                                const isNew = newlyAddedItems.has(clue.id);

                                                return (
                                                    <motion.button
                                                        key={clue.id}
                                                        onClick={() => setSelectedClue(clue)}
                                                        className={`
                                                            w-full text-left px-3 py-2 rounded text-xs font-mono transition-all flex items-center justify-between group
                                                            ${isNew
                                                                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                                                                : isActive
                                                                    ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                                                    : 'text-[#aeaeb2] hover:bg-[#8b4049]/15 hover:text-[#c9c9cd] hover:border-[#8b4049]/30 border border-transparent'
                                                            }
                                                        `}
                                                        animate={isNew ? {
                                                            boxShadow: [
                                                                '0 0 20px rgba(56, 189, 248, 0.6)',
                                                                '0 0 30px rgba(56, 189, 248, 0.9)',
                                                                '0 0 20px rgba(56, 189, 248, 0.6)'
                                                            ]
                                                        } : {}}
                                                        transition={isNew ? { duration: 1.5, repeat: Infinity } : {}}
                                                    >
                                                        <span className="truncate">{clue.word}</span>
                                                        {hasAttachment && (
                                                            <Paperclip size={10} className={`${isActive || isNew ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'}`} />
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-[#8b4049]/30 text-center text-[10px] text-[#8e8e93] uppercase tracking-widest">
                                TOTAL ITEMS: {collectedClues.length}
                            </div>
                        </div>

                        {/* Right Content: Folder View */}
                        <div className="flex-1 bg-[#1c1c1e] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative overflow-hidden flex flex-col">

                            {/* Close Button */}
                            <button
                                id="tutorial-cluelibrary-close"
                                onClick={() => {
                                    if (tutorialStep === 3 && setTutorialStep) {
                                        setTutorialStep(4);
                                    }
                                    onClose();
                                }}
                                className={`absolute top-4 right-4 z-20 p-2 transition-colors rounded-full ${tutorialStep === 3 ? 'bg-[#d89853] text-black shadow-[0_0_20px_rgba(216,152,83,0.5)]' : 'text-[#8e8e93] hover:text-[#c9c9cd] hover:bg-[#8b4049]/20'}`}
                            >
                                <X size={20} />
                            </button>

                            {/* Folder Content */}
                            {(() => {
                                const activeClue = selectedClue ? getDynamicClueDefinition(selectedClue.id) : null;
                                if (!activeClue) return (
                                    <div className="flex-1 flex flex-col items-center justify-center text-[#636366]">
                                        <Folder size={64} className="mb-4 opacity-50" />
                                        <p className="font-mono uppercase tracking-[0.2em] text-sm">Select a file to view details</p>
                                    </div>
                                );

                                if (activeClue.id === 'personnel_tree') {
                                    return (
                                        <div className="flex-1 relative overflow-hidden bg-black/20 m-4 rounded-lg border border-[#8b4049]/20 shadow-inner min-h-[700px]">
                                            <SyndicateBoard 
                                                isEmbedded={true}
                                                unlockedPeople={collectedPeople}
                                                onClose={() => setSelectedClue(null)}
                                                phase={currentStoryNode >= 3 ? 2 : 1}
                                                hasSwitchedPersona={hasSwitchedPersona}
                                                playerHypotheses={playerHypotheses}
                                                onUpdateHypothesis={onUpdateHypothesis}
                                            />
                                        </div>
                                    );
                                }

                                return (
                                    <div className="flex-1 p-8 md:p-16 flex flex-col overflow-y-auto w-full max-w-4xl mx-auto custom-scrollbar">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            key={activeClue.id}
                                            className="w-full bg-[#E3DAC9] text-[#1a1515] rounded-sm p-1 shadow-2xl transform md:-rotate-1 relative mb-12"
                                        >
                                            <div className="absolute -top-6 left-0 bg-[#E3DAC9] px-6 py-1 rounded-t-lg font-mono font-bold text-xs tracking-widest shadow-sm">
                                                EVIDENCE #{activeClue.id.toUpperCase()}
                                            </div>

                                            <div className="bg-[#f0ece2] p-8 md:p-12 min-h-[50vh] relative shadow-inner bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">
                                                <div className="absolute top-8 right-8 text-red-900/20 border-4 border-red-900/20 p-2 font-black uppercase text-2xl tracking-[0.2em] transform rotate-12 pointer-events-none select-none">
                                                    CONFIDENTIAL
                                                </div>

                                                <div className="border-b-2 border-[#1a1515]/10 pb-6 mb-8">
                                                    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1515] font-serif tracking-tight mb-2">
                                                        {activeClue.word}
                                                    </h1>
                                                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#1a1515]/50">
                                                        <span className="flex items-center gap-1"><Tag size={12} /> Source: {activeClue.source}</span>
                                                        <span>|</span>
                                                        <span>Ref: {Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                                                    </div>
                                                </div>

                                                <div className="font-mono text-sm md:text-base leading-relaxed text-[#1a1515]/80 mb-12 max-w-2xl">
                                                    {renderContent(activeClue.description)}
                                                </div>

                                                <div className="bg-[#1a1515]/5 rounded-lg p-6 border border-[#1a1515]/10">
                                                    <div className="text-xs font-bold uppercase tracking-widest text-[#1a1515]/40 mb-4 flex items-center gap-2">
                                                        <Paperclip size={12} />
                                                        Attached Evidence
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {activeClue.attachments?.map((attachment, idx) => {
                                                            const attachmentId = (attachment as any).id;
                                                            const isUnlocked = !attachmentId || collectedAttachments.includes(attachmentId);

                                                            if (!isUnlocked) return null;

                                                            return (
                                                                <motion.button
                                                                    key={idx}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => setViewingAttachment(attachment)}
                                                                    className="group relative aspect-square bg-white shadow-sm p-2 flex flex-col items-center justify-center gap-2 border border-gray-200 hover:shadow-lg transition-all transform rotate-2 hover:rotate-0"
                                                                >
                                                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                                                                        {attachment.type === 'image' ? (
                                                                            <img src={attachment.content} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                        ) : (
                                                                            <FileText size={24} className="text-gray-400" />
                                                                        )}
                                                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                                            <Eye size={20} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-col items-center">
                                                                        <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500 group-hover:text-black line-clamp-1 text-center px-1">
                                                                            {attachment.title || `Exhibit ${String.fromCharCode(65 + idx)}`}
                                                                        </span>
                                                                    </div>
                                                                </motion.button>
                                                            );
                                                        })}
                                                        {(!activeClue.attachments || activeClue.attachments.length === 0 || (activeClue.id === 'julip' && !collectedAttachments.includes('julip_symbol'))) && (
                                                            <div className="col-span-4 text-center py-8 text-xs text-gray-400 italic">
                                                                No physical evidence attached to this file.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })()}

                        </div>

                    </div>

                    {/* Full Screen Attachment Viewer */}
                    <AnimatePresence>
                        {viewingAttachment && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                                onClick={() => setViewingAttachment(null)}
                            >
                                {/* Special fullscreen UI for crime route map */}
                                {selectedClue?.id === 'crime_route_map' ? (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative w-full h-full flex flex-col overflow-hidden"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-6 px-8 flex-shrink-0">
                                            <div>
                                                <h2 className="text-2xl font-bold text-[#d89853] tracking-[0.2em] mb-2">
                                                    犯罪路线分析
                                                </h2>
                                                <p className="text-sm text-[#94a3b8] font-mono">
                                                    CRIME ROUTE ANALYSIS - CLASSIFIED
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="p-3 text-[#94a3b8] hover:text-white transition-colors bg-[#1e293b]/50 rounded-lg hover:bg-[#1e293b]"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        {/* Scrollable Map Container */}
                                        <div className="flex-1 overflow-y-auto px-8 pb-8">
                                            <motion.div
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                className="relative max-w-6xl mx-auto"
                                            >
                                                {/* Map Image */}
                                                <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] p-8 rounded-lg shadow-[0_0_100px_rgba(212,165,116,0.2)] border border-[#d89853]/20">
                                                    <img
                                                        src={viewingAttachment.content}
                                                        alt={viewingAttachment.title}
                                                        className="w-full h-auto rounded shadow-2xl"
                                                    />

                                                    {/* Decorative corners */}
                                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d89853]/40"></div>


                                                    {/* Pinned Vehicle Photos - Top Right */}
                                                    {/* Maine Photo - Behind */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                                                        transition={{ delay: 0.3 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-4 right-4 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="images/car-maine-original.jpg"
                                                                alt="Maine Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                Maine: 412-88B<br />C.K. & R.C.
                                                            </div>
                                                        </div>
                                                    </motion.button>

                                                    {/* New Mexico Photo - Front, slightly overlapping */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                                                        transition={{ delay: 0.5 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-12 right-16 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="images/car-newmexico-original.jpg"
                                                                alt="New Mexico Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                NEW MEXICO: [SMUDGE] F★<br />OCT 26 '78
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                </div>

                                                {/* Description */}
                                                <div className="mt-6 bg-[#0f172a]/80 border border-[#334155] rounded-lg p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-[#d89853]/10 rounded">
                                                            <Database size={20} className="text-[#d89853]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#e2e8f0] text-sm leading-relaxed font-light">
                                                                {selectedClue.description}
                                                            </p>
                                                            <div className="mt-4 flex gap-4 text-xs text-[#64748b]">
                                                                <span>案件编号: FBI-84-0132</span>
                                                                <span>•</span>
                                                                <span>日期: 1984.10.12</span>
                                                                <span>•</span>
                                                                <span>状态: 进行中</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Regular attachment viewer */
                                    viewingAttachment.type === 'image' && (
                                        <motion.div
                                            initial={viewingAttachment.id === 'felipe_maldonado_poster' ? { scale: 1.05, filter: 'blur(8px) brightness(1.5)', opacity: 0 } : { scale: 0.9, rotate: -2 }}
                                            animate={viewingAttachment.id === 'felipe_maldonado_poster' ? { scale: 1, filter: 'blur(0px) brightness(1)', opacity: 1 } : { scale: 1, rotate: 0 }}
                                            exit={viewingAttachment.id === 'felipe_maldonado_poster' ? { scale: 1.05, filter: 'blur(8px) brightness(1.5)', opacity: 0 } : { scale: 0.9, rotate: 2 }}
                                            transition={viewingAttachment.id === 'felipe_maldonado_poster' ? { duration: 2, ease: "easeOut" } : {}}
                                            className={`
                                                relative shadow-[0_0_100px_rgba(0,0,0,0.5)] max-h-[90vh] max-w-[90vw] cursor-auto overflow-visible flex flex-col items-center
                                                ${viewingAttachment.id === 'felipe_maldonado_poster' ? 'neural-residue-container p-0 border-none' : 'bg-white p-4 border-8 border-white'}
                                            `}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <div className="relative group/img-container flex flex-col items-center">
                                                <img
                                                    src={viewingAttachment.content}
                                                    alt={viewingAttachment.title}
                                                    className={`
                                                        max-h-[75vh] object-contain transition-all duration-1000
                                                        ${viewingAttachment.id === 'felipe_maldonado_poster' ? 'grayscale brightness-75 contrast-125' : ''}
                                                        ${viewingAttachment.id === 'libby_ticket' ? 'sepia-[0.3] brightness-90 contrast-95 saturate-[0.8] blur-[0.3px]' : ''}
                                                    `}
                                                />
                                                
                                                {/* Caption Bar */}
                                                <div className="w-full mt-4 bg-black/80 backdrop-blur-md p-4 rounded border border-[#d89853]/30">
                                                    <div className="text-[#d89853] font-mono text-sm font-bold tracking-widest mb-1">
                                                        {viewingAttachment.title}
                                                    </div>
                                                    {viewingAttachment.description && (
                                                        <div className="text-white/60 font-mono text-[10px] leading-relaxed italic mb-2">
                                                            {viewingAttachment.description}
                                                        </div>
                                                    )}
                                                    
                                                    {/* Special contextual annotations */}
                                                    {viewingAttachment.content?.endsWith('images/iron_horse_beacon.jpg') && (
                                                        <div className="text-xs text-[#94a3b8] mt-2 pt-2 border-t border-white/10">
                                                            文件注记：{renderContent('[小A.W.威尔莫](clue:aw_wilmo)')}
                                                        </div>
                                                    )}
                                                    {viewingAttachment.content?.endsWith('images/iron_horse_louisville.jpg') && (
                                                        <div className="text-xs text-[#94a3b8] mt-2 pt-2 border-t border-white/10">
                                                            地理坐标分析：首次会面于
                                                            <span
                                                                className={`
                                                                    ml-1 cursor-pointer text-white underline underline-offset-4 decoration-dashed decoration-[#94a3b8]/50 hover:decoration-white
                                                                    ${collectedKeywords.includes('louisville') ? 'text-[#38bdf8] no-underline cursor-default' : ''}
                                                                `}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (!collectedKeywords.includes('louisville') && onCollectClue) {
                                                                        onCollectClue('louisville', '路易斯维尔');
                                                                    }
                                                                }}
                                                            >
                                                                {collectedKeywords.includes('louisville') ? '路易斯维尔' : '点击提取坐标'}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {/* Special annotation for libby */}
                                                    {(viewingAttachment.id === 'libby_ticket' || viewingAttachment.id === 'libby_convergence_map' || viewingAttachment.content?.endsWith('images/libby_convergence_map.png')) && (
                                                        <div className="text-xs text-[#94a3b8] mt-2 pt-2 border-t border-white/10">
                                                            地点标注：
                                                            <span
                                                                className={`
                                                                    ml-1 cursor-pointer text-white underline underline-offset-4 decoration-dashed decoration-[#94a3b8]/50 hover:decoration-white
                                                                    ${(collectedKeywords || []).includes('libby_town') ? 'text-[#38bdf8] no-underline cursor-default' : 'animate-pulse text-[#fbbf24]'}
                                                                `}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (!(collectedKeywords || []).includes('libby_town') && onCollectClue) {
                                                                        onCollectClue('libby_town', '利比镇');
                                                                    }
                                                                }}
                                                            >
                                                                利比镇
                                                            </span>
                                                        </div>
                                                    )}
                                                    {/* Autopsy Report Special Caption */}
                                                    {(viewingAttachment.id === 'death_report' || viewingAttachment.id === 'QTC-VA-0994') && (
                                                        <div className="mt-4 p-3 bg-black/20 border-l-2 border-red-900/50 text-[10px] text-[#94a3b8] italic border-t border-white/10">
                                                            文件注记：这是一份{renderContent('[无名女尸](clue:unnamed_female_body)', false)}的检测报告。
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {viewingAttachment.id === 'felipe_maldonado_poster' && (
                                                <>
                                                    <div className="crt-overlay absolute inset-0 pointer-events-none opacity-30"></div>
                                                    <div className="bg-vignette absolute inset-0 pointer-events-none"></div>
                                                    <div className="neural-residue-noise"></div>
                                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--confess-highlight)]/5 to-transparent h-[20%] w-full animate-signal-interference"></div>
                                                </>
                                            )}

                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="absolute -top-12 -right-12 p-2 text-white/50 hover:text-white transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Jennifer Button */}
                    <motion.button
                        id="tutorial-jennifer-btn"
                        onClick={() => setShowJennifer(true)}
                        className={`fixed bottom-8 right-8 z-[105] p-4 rounded-full border-2 transition-all duration-300 ${tutorialStep > 0 && tutorialStep !== 2 ? 'opacity-20 cursor-not-allowed pointer-events-none' : ''} ${detectedNodeId !== null
                            ? 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] border-[#fca5a5] text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] scale-110'
                            : hasVisitedBefore
                                ? 'bg-[#0f172a]/90 border-[#475569] text-[#94a3b8] hover:bg-[#1e293b] hover:border-[#38bdf8] hover:text-[#38bdf8]'
                                : 'bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.4)]'
                            }`}
                        animate={
                            (detectedNodeId !== null || !hasVisitedBefore || tutorialStep === 2)
                                ? {
                                    scale: [1.1, 1.25, 1.1],
                                    boxShadow: detectedNodeId !== null
                                        ? ['0 0 40px rgba(220, 38, 38, 0.6)', '0 0 70px rgba(220, 38, 38, 1)', '0 0 40px rgba(220, 38, 38, 0.6)']
                                        : ['0 0 30px rgba(56, 189, 248, 0.4)', '0 0 50px rgba(56, 189, 248, 0.8)', '0 0 30px rgba(56, 189, 248, 0.4)']
                                }
                                : {}
                        }
                        transition={
                            detectedNodeId !== null || !hasVisitedBefore
                                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                                : {}
                        }
                        whileHover={{ scale: detectedNodeId !== null ? 1.3 : 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle size={24} />
                        {(detectedNodeId !== null || !hasVisitedBefore) && (
                            <motion.div
                                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${detectedNodeId !== null ? 'bg-red-500' : 'bg-[#38bdf8]'
                                    }`}
                                animate={{
                                    scale: [1, 2, 1],
                                    boxShadow: [
                                        "0 0 0 0 rgba(220,38,38, 0.4)",
                                        "0 0 0 10px rgba(220,38,38, 0)",
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            />
                        )}
                    </motion.button>

                    {/* Jennifer Dialogue Overlay */}
                    <AnimatePresence>
                        {showJennifer && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                            >
                                <div className="w-full max-w-2xl bg-[#0f172a]/90 border border-[#334155] p-1 rounded-lg shadow-[0_0_50px_rgba(15,23,42,0.6)] backdrop-blur-xl relative overflow-hidden">
                                    {/* Operator Header */}
                                    <div className="bg-[#1e293b]/50 px-6 py-3 flex justify-between items-center border-b border-[#334155]">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-[#475569]/30 rounded-full border border-[#475569]/50">
                                                <Mic size={14} className="text-[#94a3b8]" />
                                            </div>
                                            <span className="text-[#e2e8f0] font-mono tracking-widest text-xs font-bold uppercase">
                                                BAU OPERATOR: JENNIFER
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
                                                onClick={handleJenniferClose}
                                                className="p-1.5 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#334155]/50 rounded-full transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Waveform Visualizer */}
                                    <div className="h-16 w-full bg-[#020617] relative flex items-center justify-center gap-1 overflow-hidden opacity-80">
                                        {[...Array(40)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-[#38bdf8]/40 rounded-full"
                                                animate={{
                                                    height: [4, 12 + Math.random() * 20, 4],
                                                    opacity: [0.3, 1, 0.3]
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.02,
                                                    ease: "circInOut"
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Dialogue Content with Avatar */}
                                    <div className="p-8 min-h-[200px] flex items-center gap-6 relative">
                                        {/* Jennifer Silhouette Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-[#1e293b] border-2 border-[#38bdf8]/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                                {/* Simple silhouette - head and shoulders */}
                                                <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end">
                                                    {/* Head */}
                                                    <div className="w-10 h-10 rounded-full bg-[#38bdf8]/60 mb-1" />
                                                    {/* Shoulders */}
                                                    <div className="w-20 h-8 rounded-t-full bg-[#38bdf8]/60" />
                                                </div>
                                                {/* Glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#38bdf8]/10" />
                                            </div>
                                        </div>

                                        {/* Dialogue Text */}
                                        <div className="flex-1">
                                            {showHistory ? (
                                                <div className="h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                                    <div className="text-xs font-mono text-[#94a3b8] mb-4 uppercase tracking-widest border-b border-[#334155] pb-2">
                                                        Dialogue History Log
                                                    </div>
                                                    {/* Intro */}
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Initial Contact</div>
                                                        <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_DIALOGUE); setShowHistory(false); }}>
                                                            Replay Sequence: "Connecting to Neural Link..."
                                                        </p>
                                                    </div>
                                                    {/* Node 1 */}
                                                    {(unlockedNodeIds.includes('confession_1') && unlockedNodeIds.includes('confession_2') && unlockedNodeIds.includes('confession_3')) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 1: The Ritual</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_1_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "You found the pattern..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 2 */}
                                                    {(unlockedNodeIds.includes('confession_7')) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 2: Graywater Beacon</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_2_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Thorne's signature found..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 3 */}
                                                    {(currentStoryNode >= 3) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 3: The Violation</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_3_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "You've crossed the line..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 4 */}
                                                    {(currentStoryNode >= 4) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 4: Coordinate Unlock</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_4_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Low efficiency detected..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 5 */}
                                                    {(currentStoryNode >= 5) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 5: Reboot Command</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_5_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Three times..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 6 */}
                                                    {(currentStoryNode >= 6 || hasSwitchedPersona) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 6: The Awakening</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_6_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Self-projection image changed..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 7 */}
                                                    {currentStoryNode >= 7 && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 7: Libby Town</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_7_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "We need to go in circles..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 8 */}
                                                    {currentStoryNode >= 8 && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 8: The Photo</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_8_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "I caught critical feedback..."
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-[#e2e8f0] text-lg font-light tracking-wide leading-relaxed font-sans whitespace-pre-line">
                                                    {(() => {
                                                        const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
                                                        return renderContent(dialog[jenniferStep], true);
                                                    })()}
                                                </p>
                                            )}
                                        </div>

                                        <div className="absolute top-2 right-2 text-[#334155]/20 pointer-events-none">
                                            <Activity size={120} />
                                        </div>
                                    </div>

                                    <div className="bg-[#1e293b]/30 p-4 flex justify-between items-center border-t border-[#334155]">
                                        {/* History Toggle */}
                                        <button
                                            onClick={() => setShowHistory(!showHistory)}
                                            className="text-[#94a3b8] hover:text-[#38bdf8] text-xs font-mono tracking-widest px-4 py-2 hover:bg-[#334155]/50 rounded transition-colors"
                                        >
                                            {showHistory ? "BACK TO LIVE FEED" : "REVIEW LOGS"}
                                        </button>

                                        {(() => {
                                            if (showHistory) return null;
                                            const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
                                            return (
                                                <div className="flex items-center gap-4">
                                                    {jenniferStep > 0 && (
                                                        <button
                                                            onClick={handleJenniferPrev}
                                                            className="group flex items-center gap-3 px-6 py-3 bg-[#334155]/30 hover:bg-[#475569]/50 border border-[#475569]/50 hover:border-[#475569] text-[#94a3b8] hover:text-[#e2e8f0] rounded-lg transition-all font-mono text-sm tracking-widest backdrop-blur-md"
                                                        >
                                                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                                            回退 // BACK
                                                        </button>
                                                    )}

                                                    {jenniferStep < dialog.length - 1 ? (
                                                        <button
                                                            onClick={handleJenniferNext}
                                                            className="group flex items-center gap-3 px-8 py-3 bg-[#334155]/50 hover:bg-[#475569]/50 border border-[#475569] text-[#e2e8f0] rounded-lg transition-all font-mono text-sm tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.1)] outline-none"
                                                        >
                                                            继续 // NEXT
                                                            <ChevronRight size={16} className="text-[#94a3b8] group-hover:translate-x-1 transition-transform" />
                                                        </button>
                                                    ) : (
                                                        <motion.button
                                                            initial={{ scale: 0.9, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={handleJenniferComplete}
                                                            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] hover:from-[#1e293b] hover:via-[#334155] hover:to-[#1e293b] border border-[#38bdf8]/50 text-[#38bdf8] rounded-lg transition-all font-mono text-base tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                                                        >
                                                            <Brain size={20} className="animate-pulse" />
                                                            继续工作 // DISCONNECT
                                                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                        </motion.button>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vehicle Photos Fullscreen Viewer */}
                    <VehiclePhotosViewer
                        isOpen={showVehiclePhotos}
                        onClose={() => setShowVehiclePhotos(false)}
                    />

                    {/* Filing Evidence Modal removed - moved to SimplifiedMainView */}

                    {/* Tutorial Overlays */}
                    <TutorialOverlay
                        isVisible={tutorialStep === 2 && !showJennifer}
                        targetId="tutorial-jennifer-btn"
                        text="这里是你与詹妮弗对话的地方，当你完成部分线索搜集后暂无头绪，可以到这里看看，她会为你提供新的指引。"
                        position="left"
                    />
                    <TutorialOverlay
                        isVisible={tutorialStep === 3}
                        targetId="tutorial-cluelibrary-close"
                        text="对话已结束。现在我们需要返回主检索界面，点击关闭此窗口。"
                        position="bottom"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
