
export enum MemoryLayer {
  SURFACE = 'SURFACE',
  DEEP = 'DEEP',
  CORE = 'CORE'
}

export interface NodeContent {
  event: string;
  attitude: string;
  visual?: string;
}

export interface MemoryNode {
  id: string;
  keyword: string;
  title: string;
  currentLayer: MemoryLayer;
  layers: {
    [MemoryLayer.SURFACE]: NodeContent;
    [MemoryLayer.DEEP]: NodeContent;
    [MemoryLayer.CORE]?: NodeContent;
  };
  connectedTo: string[];
  position?: { x: number; y: number };
  revealedKeywords?: string[];
}

export interface ClueAttachment {
  id?: string;
  type: 'image' | 'text' | 'document';
  title: string;
  content: string; // URL for image, text content for others
  description?: string; // Optional detailed description for the attachment
}

export interface Clue {
  id: string;
  word: string;
  description: string;
  source: string;
  attachments?: ClueAttachment[];
}

export interface ArchiveRecord {
  id: string;
  title: string;
  date: string;
  location: string;
  content: string;
  keywords: string[];
}

export interface BoardNote {
  id: string;
  x: number;
  y: number;
  content: string;
  color?: string; // e.g., 'yellow', 'blue', 'pink'
  rotation?: number;
}

export interface SyndicateMember {
  id: string;
  name: string;
  role: string;
  parentId?: string;
  position: { x: number, y: number };
  status: 'ACTIVE' | 'DECEASED' | 'ARRESTED' | 'MISSING';
  phase: 1 | 2;
  chapter: number; // 1, 2, 3...
  description: string;
  materialType?: 'polaroid' | 'clipping' | 'document' | 'sketch';
}

export interface GameState {
  phase: 'title' | 'briefing' | 'briefing-detail' | 'dialogue' | 'immersion';
  unlockedNodeIds: string[];
  activeNodeId: string | null;
  passwordEntered?: boolean;
  collectedClues: string[]; // Store IDs of collected clues (Prompts/Keywords)
  collectedDossierIds: string[]; // Store IDs of Case Dossier files (Mutually Exclusive)
  collectedYears: string[]; // Store IDs of collected year keywords (for archive search only)
  collectedAttachments: string[]; // Store IDs of collected attachments (e.g. 'julip_symbol')
  unlockedPeople: string[]; // Store IDs of discovered people (e.g. 'nibi', 'conchar')
  unlockedArchiveIds: string[]; // Store IDs of unlocked archive cases
  systemStability: number; // 0-100% (Starts at 84%)
  currentStoryNode: number; // Current story node reached (0 = none, 1 = chapter 1 complete, etc.)
  hasSwitchedPersona?: boolean; // Whether the persona switch event has occurred
  activePersona?: 'detective' | 'shadow'; // Controls background visualization
  playerHypotheses: Record<string, string>; // Map of node ID to player-entered name
  history: Array<{
    type: 'search' | 'info' | 'shatter' | 'archive_content' | 'dialogue';
    content: string;
    timestamp: number;
    isReveal?: boolean;
    revealKeywords?: string[];
    id?: string;
  }>;
  consecutiveSearch?: {
    keyword: string;
    count: number;
  };
}
