import { MemoryLayer, MemoryNode } from '../types';

export interface Attachment {
  id?: string;
  type: 'image' | 'text' | 'document' | 'evidence';
  title: string;
  content: string;
  description?: string;
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
  attachments?: Attachment[];
}




export interface UnlocksRegistryEntry {
  target: string;
  type: 'node' | 'archive';
}

export type UnlocksRegistry = Record<string, UnlocksRegistryEntry>;
export type KeywordRegistry = Record<string, KeywordMetadata>;
