import { GLOBAL_KEYWORD_MAP, UNLOCKS_REGISTRY } from './constants/registry.ts';

const keys = Object.keys(GLOBAL_KEYWORD_MAP);
console.log("has laguna_beach map?", keys.some(k => GLOBAL_KEYWORD_MAP[k].id === 'laguna_beach'));
console.log("has naked_root map?", keys.some(k => GLOBAL_KEYWORD_MAP[k].id === 'naked_root'));

