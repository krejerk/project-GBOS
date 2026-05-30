import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER0_KEYWORDS: Record<string, KeywordMetadata> = {
  'jennifer': { id: 'jennifer', chapter: 0, type: 'person', displayName: "詹妮弗", isPersistent: true },
  'personnel_tree': { id: 'personnel_tree', chapter: 0, type: 'case', displayName: "人物关系 (Personnel)", isPersistent: true, description: "基于目前掌握的线索，整理出的相关人物关系网络演进图。", source: "Investigation" }
};

export const CHAPTER0_NODES: MemoryNode[] = [

];
