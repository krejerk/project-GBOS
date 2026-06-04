const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, 'content');
const registryFile = path.join(__dirname, 'constants/registry.ts');

// 1. Read UNLOCKS_REGISTRY from registry.ts
const registryContent = fs.readFileSync(registryFile, 'utf8');
const match = registryContent.match(/export const UNLOCKS_REGISTRY: Record<string, any> = (\{[\s\S]*?\n\});/);
if (!match) {
  console.error("Could not find UNLOCKS_REGISTRY");
  process.exit(1);
}

let unlocksRegistry;
try {
  // Use Function to evaluate the object literal
  unlocksRegistry = new Function(`return ${match[1]}`)();
} catch (e) {
  console.error("Error parsing UNLOCKS_REGISTRY", e);
  process.exit(1);
}

// 2. Read all markdown files
function findMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findMdFiles(filePath, fileList);
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const mdFiles = findMdFiles(contentDir);
const mdTriggers = {};
const mdRevealed = {};

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  try {
    const parsed = matter(content);
    if (parsed.data.id) {
      mdTriggers[parsed.data.id] = parsed.data.trigger || [];
      mdRevealed[parsed.data.id] = parsed.data.revealed || [];
    }
  } catch (e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
}

// 3. Compare triggers
let errors = 0;
console.log("=== COMPARING MD TRIGGERS WITH REGISTRY ===");
for (const [id, registryData] of Object.entries(unlocksRegistry)) {
  const regKeywords = registryData.keywords || [];
  const mdKeywordList = mdTriggers[id] || [];
  
  // Sort for comparison
  const regSorted = [...regKeywords].sort().join(',');
  const mdSorted = [...mdKeywordList].sort().join(',');
  
  if (regSorted !== mdSorted) {
    console.log(`Mismatch found for ${id}:`);
    console.log(`  Registry expects: [${regKeywords.join(', ')}]`);
    console.log(`  Markdown defines: [${mdKeywordList.join(', ')}]`);
    errors++;
  }
}

if (errors === 0) {
  console.log("All triggers match perfectly!");
}
