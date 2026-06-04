const fs = require('fs');

const registryContent = fs.readFileSync('constants/registry.ts', 'utf8');

const match = registryContent.match(/export const UNLOCKS_REGISTRY: Record<string, any> = (\{[\s\S]*?\n\});/);
let unlocksRegistry;
try {
  unlocksRegistry = new Function(`return ${match[1]}`)();
} catch (e) {
  console.error(e);
}

const map = {};
Object.entries(unlocksRegistry).forEach(([id, entry]) => {
  if (entry.keywords) {
    map[id] = entry.keywords;
  }
});

console.log("Confession 24 depends on:", map['confession_24']);
console.log("Confession 23 depends on:", map['confession_23']);

const clueDisplayMapContent = fs.readFileSync('App.tsx', 'utf8');
const clueDisplayMatch = clueDisplayMapContent.match(/const CLUE_DISPLAY_MAP: Record<string, string> = (\{[\s\S]*?\n\});/);
// just checking consumption map logic
