(global as any).window = { innerWidth: 1920, innerHeight: 1080 };
import { KEYWORD_REGISTRY } from './constants/registry';
console.log("laguna_beach chapter:", KEYWORD_REGISTRY['laguna_beach']?.chapter);
console.log("naked_root chapter:", KEYWORD_REGISTRY['naked_root']?.chapter);
