import { MemoryLayer, MemoryNode } from '../types';

export interface Attachment {
  id: string;
  type: 'image' | 'text' | 'document' | 'evidence';
  title: string;
  content: string;
  description?: string;
  chapter?: number;
  parentId?: string;
}

export interface KeywordMetadata {
  id?: string;
  chapter: number;
  type: 'person' | 'location' | 'case' | 'clue' | 'year' | 'dossier' | 'other';
  displayName?: string; // Some uses might need the original displayName
  isIdentity?: boolean;
  isPersistent?: boolean;
  isArchiveOnly?: boolean;
  description?: string;
  source?: string;
  aliases?: string[]; // Alternative display names for search/highlighting
  attachments?: (Attachment | string)[];
}




export interface UnlocksRegistryEntry {
  target: string;
  type: 'node' | 'archive';
}

export type UnlocksRegistry = Record<string, UnlocksRegistryEntry>;
export type KeywordRegistry = Record<string, KeywordMetadata>;

export interface DetailedArchiveRecord {
    id: string;
    title: string;
    triggers: {
        year: string;
        person: string[];
    };
    newspaper: {
        source: string;
        date: string;
        headline: string;
        content: string[];
    };
    annotation: {
        fileId: string;
        date: string;
        level: string;
        author: string;
        content: string;
        template?: 'REGGIE' | 'ALTERMAN' | 'THORNE' | 'CRANE' | 'BAKER' | 'HAWKE';
        stamp?: 'REJECTED';
    };
    revealed?: string[];
}
