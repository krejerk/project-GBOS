import { MemoryNode } from '../types';
import { KeywordMetadata } from './types';
import { CHAPTER1_KEYWORDS, CHAPTER1_NODES } from './chapters/chapter1';
import { CHAPTER2_KEYWORDS, CHAPTER2_NODES } from './chapters/chapter2';
import { CHAPTER3_KEYWORDS, CHAPTER3_NODES } from './chapters/chapter3';
import { CHAPTER4_KEYWORDS, CHAPTER4_NODES } from './chapters/chapter4';
import { CHAPTER5_KEYWORDS, CHAPTER5_NODES } from './chapters/chapter5';
import { CHAPTER6_KEYWORDS, CHAPTER6_NODES } from './chapters/chapter6';
import { CHAPTER7_KEYWORDS, CHAPTER7_NODES } from './chapters/chapter7';
import { IDENTITY_NODES, IDENTITY_KEYWORDS } from './chapters/identity';

export const KEYWORD_REGISTRY: Record<string, KeywordMetadata> = {
  ...IDENTITY_KEYWORDS,
  ...CHAPTER1_KEYWORDS,
  ...CHAPTER2_KEYWORDS,
  ...CHAPTER3_KEYWORDS,
  ...CHAPTER4_KEYWORDS,
  ...CHAPTER5_KEYWORDS,
  ...CHAPTER6_KEYWORDS,
  ...CHAPTER7_KEYWORDS,
};


export const ALL_MEMORY_NODES: MemoryNode[] = [
  ...IDENTITY_NODES,
  ...CHAPTER1_NODES,
  ...CHAPTER2_NODES,
  ...CHAPTER3_NODES,
  ...CHAPTER4_NODES,
  ...CHAPTER5_NODES,
  ...CHAPTER6_NODES,
  ...CHAPTER7_NODES,
];

// Mapping for quick lookup
export const NODE_MAP = new Map(ALL_MEMORY_NODES.map(node => [node.id, node]));

// Map of alias/display-name to keyword ID
export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = {
  // Manual aliases for robust matching
  '罗伯特卡彭': { id: 'capone', type: 'person' },
  '罗伯特·卡彭': { id: 'capone', type: 'person' },
  '赛勒斯': { id: 'silas', type: 'person' },
  '塞勒斯': { id: 'silas', type: 'person' },
  '约翰莫里西': { id: 'john_morrissey', type: 'person' },
  '约翰·莫里西': { id: 'john_morrissey', type: 'person' },
  '亚瑟道森': { id: 'arthur_dawson', type: 'person' },
  '亚瑟·道森': { id: 'arthur_dawson', type: 'person' },
  '威廉道森': { id: 'william_dawson', type: 'person' },
  '威廉·道森': { id: 'william_dawson', type: 'person' },
  '阿列克谢': { id: 'alexei', type: 'person' },
  '阿列克谢·罗科维奇': { id: 'alexei', type: 'person' },
  '杰西潘尼': { id: 'jc_penney', type: 'person' },
  '杰西·潘尼': { id: 'jc_penney', type: 'person' },
  '第4号警务站': { id: 'precinct_4', type: 'location' },
  '第4警务站': { id: 'precinct_4', type: 'location' },
  '图森枪击案': { id: 'tucson_shooting', type: 'clue' },
  '图森枪战案': { id: 'tucson_shooting', type: 'clue' },
  '图森市': { id: 'tucson_shooting', type: 'location' },
  '彼特·亨德森': { id: 'peter_henderson', type: 'person' },
  '弗兰克': { id: 'frank_rollins', type: 'person' },
  '罗林斯': { id: 'frank_rollins', type: 'person' },
  '缅恩州': { id: 'maine', type: 'location' },
  '缅因州': { id: 'maine', type: 'location' },

  '俄亥俄': { id: 'ohio', type: 'location' },
  '内华达': { id: 'nevada', type: 'location' },
  '莫哈韦': { id: 'mojave_rest_stop', type: 'location' },
  '1402': { id: '1402_old_dominion_rd', type: 'location' },
  'old_dominion': { id: '1402_old_dominion_rd', type: 'location' },
  '灭门': { id: 'family_massacre', type: 'clue' },
  '香烟': { id: 'empty_cigarette_pack', type: 'clue' },
  '烟盒': { id: 'empty_cigarette_pack', type: 'clue' },
  '房车': { id: 'blue_rv', type: 'clue' },
  '远亲': { id: 'distant_relatives', type: 'clue' },
  'KLUB-75': { id: 'klub75_report', type: 'clue' },
  '尼比': { id: 'nibi', type: 'person' },
  'kansas city': { id: 'kansas_city', type: 'location' },
  '肉体关系': { id: 'twisted_relationship', type: 'clue' },
  '小 A.W. 威尔莫': { id: 'aw_wilmo', type: 'person' },
  '小A.W. 威尔莫': { id: 'aw_wilmo', type: 'person' },
  '小 A.W.威尔莫': { id: 'aw_wilmo', type: 'person' },
  '小A.W.威尔莫': { id: 'aw_wilmo', type: 'person' },
};

// Map of ID to display name (for UI)
export const CLUE_DISPLAY_MAP: Record<string, string> = {};

// Initialize maps from KEYWORD_REGISTRY
Object.entries(KEYWORD_REGISTRY).forEach(([id, meta]) => {
  // Use displayName if available, fallback to formatted ID
  const displayName = meta.displayName || id.replace(/_/g, ' ').toUpperCase();
  CLUE_DISPLAY_MAP[id] = displayName;
  
  // Add English ID to global map
  if (!GLOBAL_KEYWORD_MAP[id]) {
    GLOBAL_KEYWORD_MAP[id] = { id, type: meta.type || 'clue' };
  }
  
  // Add Chinese Display Name to global map for user search
  if (meta.displayName && !GLOBAL_KEYWORD_MAP[meta.displayName]) {
    GLOBAL_KEYWORD_MAP[meta.displayName] = { id, type: meta.type || 'clue' };
  }

  // Handle years with '年' suffix
  if (meta.type === 'year' && meta.displayName) {
    GLOBAL_KEYWORD_MAP[meta.displayName + '年'] = { id, type: 'year' };
  }
});


// Add names from nodes to maps
ALL_MEMORY_NODES.forEach(node => {
  CLUE_DISPLAY_MAP[node.id] = node.title;
  if (!GLOBAL_KEYWORD_MAP[node.title]) {
    GLOBAL_KEYWORD_MAP[node.title] = { id: node.id, type: 'clue' };
  }
  if (!GLOBAL_KEYWORD_MAP[node.keyword]) {
    GLOBAL_KEYWORD_MAP[node.keyword] = { id: node.id, type: 'clue' };
  }
});

// Specific consumption rules
export const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {
  'confession_7': ['roanoke_city'],
  'confession_8': ['year_1973', 'louisville'],
  'confession_10': ['recruitment', 'burkesville'],
};

// Unlocks Registry
export const UNLOCKS_REGISTRY: Record<string, { keywords: string[], targetId: string, type: 'node' | 'archive', message?: string }> = {
  // Chapter 1
  'confession_1': { keywords: ['maine', 'small_bank'], targetId: 'confession_1', type: 'node' },
  'confession_2': { keywords: ['ohio', 'ritual_case'], targetId: 'confession_2', type: 'node' },
  'confession_3': { keywords: ['chicago', 'missing'], targetId: 'confession_3', type: 'node' },
  'me_1971': { keywords: ['year_1971', 'nibi'], targetId: 'me_1971', type: 'archive' },
  'oh_1968': { keywords: ['year_1968', 'lundgren'], targetId: 'oh_1968', type: 'archive' },
  'dc_1967': { keywords: ['year_1967', 'dr_reggie'], targetId: 'dc_1967', type: 'archive' },
  'il_1985': { keywords: ['year_1985', 'roger_beebe'], targetId: 'il_1985', type: 'archive' },

  // Chapter 2
  'confession_4': { keywords: ['1402_old_dominion_rd', 'training_day'], targetId: 'confession_4', type: 'node' },
  'confession_5': { keywords: ['nevada', 'family_massacre'], targetId: 'confession_5', type: 'node' },
  'confession_6': { keywords: ['mojave_rest_stop', 'empty_cigarette_pack'], targetId: 'confession_6', type: 'node' },
  'confession_7': { keywords: ['roanoke', 'twisted_relationship'], targetId: 'confession_7', type: 'node' },
  'nv_1971': { keywords: ['year_1971', 'little_derek_wayne'], targetId: 'nv_1971', type: 'archive' },

  // Chapter 3
  'confession_8': { keywords: ['louisville', 'blue_rv'], targetId: 'confession_8', type: 'node' },
  'confession_9': { keywords: ['cincinnati', 'mint_plan'], targetId: 'confession_9', type: 'node' },
  'confession_10': { keywords: ['burkesville', 'distant_relatives'], targetId: 'confession_10', type: 'node' },
  'confession_11': { keywords: ['klub75_report', 'quantico'], targetId: 'confession_11', type: 'node' },
  'confession_12': { keywords: ['kansas_city', 'mobile_blood_truck'], targetId: 'confession_12', type: 'node' },
  'confession_13': { keywords: ['east_12th_st', 'execution_room'], targetId: 'confession_13', type: 'node' },

  // Chapter 4
  'kan_1976': { keywords: ['year_1976', 'kansas_city'], targetId: 'kan_1976', type: 'archive' },
  'kc_1965': { keywords: ['year_1965', 'john_morrissey'], targetId: 'kc_1965', type: 'archive' },
  'ia_1976': { keywords: ['year_1976', 'peter_henderson'], targetId: 'ia_1976', type: 'archive' },

  // Chapter 5
  'confession_25': { keywords: ['albuquerque', 'chemist_lover'], targetId: 'confession_25', type: 'node' },
  'confession_26': { keywords: ['santa_fe', 'bonny_and_clyde'], targetId: 'confession_26', type: 'node' },

  // Chapter 6 & 7
  'archive_18': { keywords: ['year_1976', 'alexei'], targetId: 'archive_18', type: 'archive' },
  'archive_19': { keywords: ['year_1976', 'gore_and_levy'], targetId: 'archive_19', type: 'archive' },
  'archive_wanted_1983': { keywords: ['year_1983', 'capone'], targetId: 'archive_wanted_1983', type: 'archive' },
  'archive_22': { keywords: ['frank_rollins'], targetId: 'archive_22', type: 'archive' },
};
