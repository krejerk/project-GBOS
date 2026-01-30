
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

export interface GameState {
  phase: 'briefing' | 'briefing-detail' | 'dialogue' | 'immersion';
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
  activePersona?: 'detective' | 'shadow'; // Controls background visualization
  history: Array<{
    type: 'search' | 'info' | 'shatter';
    content: string;
    timestamp: number;
    isReveal?: boolean;
    revealKeywords?: string[];
  }>;
  consecutiveSearch?: {
    keyword: string;
    count: number;
  };
}
