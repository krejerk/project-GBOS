
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
}

export interface Clue {
  id: string;
  word: string;
  description: string;
  source: string;
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
  collectedClues: string[]; // Store IDs of collected clues (excluding years)
  collectedYears: string[]; // Store IDs of collected year keywords (for archive search only)
  unlockedPeople: string[]; // Store IDs of discovered people (e.g. 'nibi', 'conchar')
  unlockedArchiveIds: string[]; // Store IDs of unlocked archive cases
  activePersona?: 'detective' | 'shadow'; // Controls background visualization
  history: Array<{
    type: 'search' | 'info' | 'shatter';
    content: string;
    timestamp: number;
  }>;
}
