import fs from 'fs';

const registryContent = fs.readFileSync('constants/registry.ts', 'utf8');

// extract GLOBAL_KEYWORD_MAP
const mapMatch = registryContent.match(/export const GLOBAL_KEYWORD_MAP: Record<string, \{ id: string, type: string \}> = (\{[\s\S]*?\});/);
if (mapMatch) {
    const mapStr = mapMatch[1];
    // Evaluate it in a safe way
    const map = eval('(' + mapStr + ')');
    console.log("albuquerque mapped from:", Object.keys(map).filter(k => map[k].id === 'albuquerque'));
    console.log("chemist_lover mapped from:", Object.keys(map).filter(k => map[k].id === 'chemist_lover'));
    console.log("laguna_beach mapped from:", Object.keys(map).filter(k => map[k].id === 'laguna_beach'));
    console.log("naked_root mapped from:", Object.keys(map).filter(k => map[k].id === 'naked_root'));
} else {
    console.log("Could not find GLOBAL_KEYWORD_MAP");
}
