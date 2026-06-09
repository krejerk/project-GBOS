const fs = require('fs');
const path = './constants/registry.ts';
let content = fs.readFileSync(path, 'utf8');

// Match the UNLOCKS_REGISTRY object
const match = content.match(/export const UNLOCKS_REGISTRY:.*= \{([\s\S]*?)\};\n\nexport const KEYWORD_CONSUMPTION_MAP/);
if (!match) {
  console.log("Could not find UNLOCKS_REGISTRY");
  process.exit(1);
}

// Read the existing object
// It's just JSON-like, but we can parse it carefully or just use regex replacement
let registryBody = match[1];

// We will replace clipping entries one by one or just re-generate them.
// Let's generate the correct ones from the markdown files directly!
const fsPromises = require('fs').promises;
const pathModule = require('path');

async function main() {
  const archivesDir = './content/archives';
  const chapters = await fsPromises.readdir(archivesDir);
  
  let newClippingEntries = [];
  
  for (const chapter of chapters) {
    if (!chapter.startsWith('chapter')) continue;
    const files = await fsPromises.readdir(pathModule.join(archivesDir, chapter));
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const mdContent = await fsPromises.readFile(pathModule.join(archivesDir, chapter, file), 'utf8');
      
      const idMatch = mdContent.match(/id:\s*(clipping_\w+)/);
      if (!idMatch) continue;
      const id = idMatch[1];
      
      const triggerMatch = mdContent.match(/trigger:\n([\s\S]*?)revealed:/) || mdContent.match(/trigger:\n([\s\S]*?)annotation_author:/) || mdContent.match(/trigger:\n([\s\S]*?)newspaper_source:/) || mdContent.match(/trigger:\n([\s\S]*?)---/);
      if (!triggerMatch) continue;
      
      const triggers = triggerMatch[1].split('\n')
        .filter(l => l.trim().startsWith('-'))
        .map(l => l.replace('-', '').trim());
      
      newClippingEntries.push(`  "${id}": {
    "keywords": [
      ${triggers.map(t => `"${t}"`).join(',\n      ')}
    ],
    "targetId": "${id}",
    "type": "archive"
  }`);
    }
  }

  // Remove old clipping entries from registryBody
  let newBody = registryBody.replace(/  "clipping_\d+": \{[\s\S]*?"type": "archive"\n  \},?\n?/g, '');
  
  // Append new clipping entries
  newBody = newBody.trim();
  if (newBody.endsWith(',')) {
    newBody += '\n';
  } else {
    newBody += ',\n';
  }
  newBody += newClippingEntries.join(',\n');
  
  content = content.replace(match[1], '\n' + newBody + '\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log("Fixed clippings in UNLOCKS_REGISTRY");
}

main();
