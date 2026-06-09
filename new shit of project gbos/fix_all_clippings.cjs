const fs = require('fs');
const path = require('path');
const registryPath = './constants/registry.ts';

let content = fs.readFileSync(registryPath, 'utf8');

// Match the UNLOCKS_REGISTRY object
const matchUnlocks = content.match(/export const UNLOCKS_REGISTRY:.*= \{([\s\S]*?)\};\n\nexport const KEYWORD_CONSUMPTION_MAP/);
let unlocksRegistryStr = matchUnlocks[1];

// First, delete ALL clipping entries from the registry string
unlocksRegistryStr = unlocksRegistryStr.replace(/\s*"clipping_\w+":\s*\{[\s\S]*?"type":\s*"archive"\s*\},?/g, '');
// Clean up trailing commas
unlocksRegistryStr = unlocksRegistryStr.replace(/,\s*$/g, '');

const archivesDir = './content/archives';
const chapters = fs.readdirSync(archivesDir);

let newClippingEntries = [];

for (const chapter of chapters) {
  if (!chapter.startsWith('chapter')) continue;
  const files = fs.readdirSync(path.join(archivesDir, chapter));
  for (const file of files) {
    if (!file.endsWith('.md') || !file.startsWith('clipping_')) continue;
    const mdContent = fs.readFileSync(path.join(archivesDir, chapter, file), 'utf8');
    
    const idMatch = mdContent.match(/id:\s*(clipping_\w+)/);
    if (!idMatch) continue;
    const id = idMatch[1];
    
    let triggers = [];
    
    // Check for trigger: list
    const triggerMatch = mdContent.match(/trigger:\n([\s\S]*?)(revealed:|newspaper_source:|annotation_author:|---)/);
    if (triggerMatch) {
      triggers = triggerMatch[1].split('\n')
        .filter(l => l.trim().startsWith('-'))
        .map(l => l.replace('-', '').trim());
    } else {
      // Check for trigger_year and trigger_persons
      const yearMatch = mdContent.match(/trigger_year:\s*"?(\d+)"?/);
      if (yearMatch) triggers.push('year_' + yearMatch[1]);
      
      const personsMatch = mdContent.match(/trigger_persons:\s*\[(.*?)\]/);
      if (personsMatch) {
        // We only want the ID, which is usually the first element or matches /^[a-z_]+$/
        const items = personsMatch[1].split(',').map(s => s.trim().replace(/"/g, ''));
        const idItem = items.find(s => s.match(/^[a-z_]+$/));
        if (idItem) triggers.push(idItem);
      }
      
      const locMatch = mdContent.match(/trigger_location:\s*\[(.*?)\]/);
      if (locMatch) {
        const items = locMatch[1].split(',').map(s => s.trim().replace(/"/g, ''));
        const idItem = items.find(s => s.match(/^[a-z_]+$/));
        if (idItem) triggers.push(idItem);
      }
    }
    
    if (triggers.length > 0) {
      newClippingEntries.push(`  "${id}": {
    "keywords": [
      ${triggers.map(t => `"${t}"`).join(',\n      ')}
    ],
    "targetId": "${id}",
    "type": "archive"
  }`);
    }
  }
}

if (newClippingEntries.length > 0) {
  unlocksRegistryStr += ',\n' + newClippingEntries.join(',\n');
}

content = content.replace(matchUnlocks[1], unlocksRegistryStr);
fs.writeFileSync(registryPath, content, 'utf8');
console.log(`Replaced all clippings. Added ${newClippingEntries.length} clippings.`);
