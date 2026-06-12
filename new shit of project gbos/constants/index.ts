// --- CORE RE-EXPORTS ---
export * from './types';
export * from './base';
export * from './dialogue';
export * from './archive';
export * from './registry';
export * from './archive_data';

// --- COMPATIBILITY MAPPINGS ---

// App.tsx expects MEMORY_NODES
import { ALL_MEMORY_NODES } from './registry';
export const MEMORY_NODES = ALL_MEMORY_NODES;

// App.tsx expects specific dialogue nodes
export { 
  JENNIFER_INTRO_DIALOGUE,
  JENNIFER_FIRST_VISIT_DIALOGUE,
  JENNIFER_RETURN_DIALOGUE,
  JENNIFER_NODE_1_DIALOGUE, 
  JENNIFER_NODE_2_DIALOGUE, 
  JENNIFER_NODE_3_DIALOGUE, 
  JENNIFER_NODE_4_DIALOGUE, 
  JENNIFER_NODE_5_DIALOGUE,
  JENNIFER_NODE_6_DIALOGUE,
  JENNIFER_NODE_7_DIALOGUE,
  JENNIFER_NODE_8_DIALOGUE,
  JENNIFER_NODE_9_DIALOGUE,
  JENNIFER_BRANCH_ATTEMPT_1,
  JENNIFER_BRANCH_ATTEMPT_2,
  JENNIFER_BRANCH_ATTEMPT_3,
  JENNIFER_BRANCH_ATTEMPT_4,
  JENNIFER_POST_36A1_DIALOGUE,
  JENNIFER_FINAL_A_DIALOGUE,
  CAPONE_BRANCH_B_POST_DIALOGUE
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
export * from './chapters/chapter8';
export * from './chapters/identity';
export * from './utils';

export * from './attachments';
