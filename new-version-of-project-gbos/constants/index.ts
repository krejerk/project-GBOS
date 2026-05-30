// --- CORE RE-EXPORTS ---
export * from './types';
export * from './base';
export * from './dialogue';
export * from './archive';
export * from './registry';

// --- COMPATIBILITY MAPPINGS ---

// App.tsx expects MEMORY_NODES
import { ALL_MEMORY_NODES } from './registry';
export const MEMORY_NODES = ALL_MEMORY_NODES;

// App.tsx expects specific dialogue nodes
export { 
  JENNIFER_NODE_1_DIALOGUE, 
  JENNIFER_NODE_2_DIALOGUE, 
  JENNIFER_NODE_3_DIALOGUE, 
  JENNIFER_NODE_4_DIALOGUE, 
  JENNIFER_NODE_5_DIALOGUE 
} from './dialogue';

// App.tsx and components expect these maps
export { 
  GLOBAL_KEYWORD_MAP, 
  CLUE_DISPLAY_MAP, 
  KEYWORD_CONSUMPTION_MAP,
  UNLOCKS_REGISTRY,
  KEYWORD_REGISTRY
} from './registry';

// Export everything from chapters for deep access (if needed)
export * from './chapters/chapter1';
export * from './chapters/chapter2';
export * from './chapters/chapter3';
export * from './chapters/chapter4';
export * from './chapters/chapter5';
export * from './chapters/chapter6';
export * from './chapters/chapter7';
export * from './chapters/identity';

