import { KEYWORD_REGISTRY } from './constants/registry.js';
import { PROTECTED_YEARS } from './constants/base.js';

const protectedIds = ['st_louis', 'vampire', 'personnel_tree', ...PROTECTED_YEARS];

const collectedClues = ['soul_kitchen', 'klub75_report', 'mint_plan', 'blue_rv'];

const filterFn = (id) => {
    if (protectedIds.includes(id)) return true;
    const meta = Object.values(KEYWORD_REGISTRY).find(k => k.id === id);
    if (meta && meta.chapter > 3) return true;
    return false;
};

const remaining = collectedClues.filter(filterFn);
console.log("Remaining clues:", remaining);
