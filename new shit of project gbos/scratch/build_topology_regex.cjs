const fs = require('fs');
const path = require('path');

const constantsDir = path.join(__dirname, '..', 'constants');

// keywordGraph: { [id]: { dispatchedBy: Set<string>, consumedBy: Set<string> } }
const keywordGraph = {};
function getGraph(id) {
    if (!keywordGraph[id]) {
        keywordGraph[id] = { dispatchedBy: new Set(), consumedBy: new Set() };
    }
    return keywordGraph[id];
}

function extractClues(text) {
    const clues = [];
    const regex = /\[.*?\]\(clue:(.*?)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        clues.push(match[1]);
    }
    return clues;
}

// 1. Parse registry.ts
const registryFile = path.join(constantsDir, 'registry.ts');
const registryContent = fs.readFileSync(registryFile, 'utf8');

// KEYWORD_REGISTRY: { 'id': { ..., source: "...", ... } }
const keywordSourceRegex = /'([^']+)'\s*:\s*\{[^}]*id\s*:\s*'[^']+'[^}]*source\s*:\s*"([^"]+)"/g;
let match;
while ((match = keywordSourceRegex.exec(registryContent)) !== null) {
    const id = match[1];
    const source = match[2];
    if (source === 'Briefing' || source === 'Investigation') {
        getGraph(id).dispatchedBy.add(source);
    }
}

// UNLOCKS_REGISTRY: { "confession_2": { "keywords": ["ohio", "ritual_case"], "targetId": "confession_2", "type": "node" } }
const unlocksLines = registryContent.split('\n');
let currentTargetId = null;
let currentType = null;
let inUnlocks = false;
let currentKeywords = [];
for (const line of unlocksLines) {
    if (line.includes('export const UNLOCKS_REGISTRY')) {
        inUnlocks = true;
    }
    if (inUnlocks) {
        let m = line.match(/"targetId":\s*"([^"]+)"/);
        if (m) currentTargetId = m[1];
        m = line.match(/"type":\s*"([^"]+)"/);
        if (m) currentType = m[1];
        
        m = line.match(/"([^"]+)"/g);
        if (m && !line.includes('targetId') && !line.includes('type') && !line.includes('keywords') && line.trim().endsWith(',')) {
            // this might be a keyword in the array
            // It's easier to just parse the JSON block.
        }
    }
}

// Actually, extracting UNLOCKS_REGISTRY by regex is easy:
const unlockBlockRegex = /"([^"]+)"\s*:\s*\{\s*"keywords"\s*:\s*\[([\s\S]*?)\]\s*,\s*"targetId"\s*:\s*"([^"]+)"\s*,\s*"type"\s*:\s*"([^"]+)"\s*\}/g;
let unlockMatch;
while ((unlockMatch = unlockBlockRegex.exec(registryContent)) !== null) {
    const kwBlock = unlockMatch[2];
    const targetId = unlockMatch[3];
    const targetType = unlockMatch[4];
    const kws = [...kwBlock.matchAll(/"([^"]+)"/g)].map(m => m[1]);
    for (const kw of kws) {
        getGraph(kw).consumedBy.add(`Unlocks: ${targetId} (${targetType})`);
    }
}


// 2. Parse Memory Nodes from chapters/
const chaptersDir = path.join(constantsDir, 'chapters');
for (const file of fs.readdirSync(chaptersDir)) {
    if (file.endsWith('.ts')) {
        const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
        // Parse revealedKeywords: ["a", "b"]
        const nodeBlockRegex = /id:\s*"([^"]+)"[\s\S]*?revealedKeywords:\s*\[(.*?)\]/g;
        let nodeMatch;
        while ((nodeMatch = nodeBlockRegex.exec(content)) !== null) {
            const nodeId = nodeMatch[1];
            const kwsStr = nodeMatch[2];
            const kws = [...kwsStr.matchAll(/"([^"]+)"/g)].map(m => m[1]);
            for (const kw of kws) {
                getGraph(kw).dispatchedBy.add(`Node: ${nodeId}`);
            }
        }
        
        // Also parse [text](clue:keyword) inside the event texts of the node blocks
        // Since it's hard to associate with a specific node without full AST, we can just use a regex over the file 
        // to find all clues and attribute them generally to the file, or try to find the closest node id.
        // For simplicity, let's find node blocks and extract clues inside them.
        const allNodeBlocks = content.split(/id:\s*"([^"]+)"/);
        for (let i = 1; i < allNodeBlocks.length; i += 2) {
            const nodeId = allNodeBlocks[i];
            const blockContent = allNodeBlocks[i+1];
            const clues = extractClues(blockContent);
            for (const kw of clues) {
                getGraph(kw).dispatchedBy.add(`Node Event: ${nodeId}`);
            }
        }

        // Also parse KEYWORD_REGISTRY items in chapter files (e.g., chapter1.ts has CHAPTER1_KEYWORDS)
        const kwSourceRegex = /'([^']+)'\s*:\s*\{[^}]*id\s*:\s*'[^']+'[^}]*source\s*:\s*"([^"]+)"/g;
        let kwMatch;
        while ((kwMatch = kwSourceRegex.exec(content)) !== null) {
            const id = kwMatch[1];
            const source = kwMatch[2];
            if (source === 'Briefing' || source === 'Investigation') {
                getGraph(id).dispatchedBy.add(source);
            }
        }
    }
}

// 3. Parse Archive records
const archiveFile = path.join(constantsDir, 'archive_data.ts');
const archiveContent = fs.readFileSync(archiveFile, 'utf8');

// The objects look like: { "id": "..." } with possible whitespace
const idRegex = /"id":\s*"([^"]+)"/g;
const archiveBlocks = archiveContent.split(/\{\s*"id"\s*:/);

for (let i = 1; i < archiveBlocks.length; i++) { // skip 0
    const block = archiveBlocks[i];
    // Since we split by {"id":, the block starts with the value of id
    let idMatch = /^\s*"([^"]+)"/.exec(block);
    let titleMatch = /"title":\s*"([^"]+)"/.exec(block);
    if (!idMatch || !titleMatch) continue;
    const archId = idMatch[1];
    const title = titleMatch[1];

    // triggers
    let triggersBlockMatch = /"triggers":\s*\{([\s\S]*?)\}/.exec(block);
    if (triggersBlockMatch) {
        let yearMatch = /"year":\s*"([^"]+)"/.exec(triggersBlockMatch[1]);
        if (yearMatch) {
            let yId = "year_" + yearMatch[1];
            getGraph(yId).consumedBy.add(`Archive: ${title} (${archId})`);
        }
        let personBlockMatch = /"person":\s*\[([\s\S]*?)\]/.exec(triggersBlockMatch[1]);
        if (personBlockMatch) {
            let firstPersonMatch = /"([^"]+)"/.exec(personBlockMatch[1]);
            if (firstPersonMatch) {
                getGraph(firstPersonMatch[1]).consumedBy.add(`Archive: ${title} (${archId})`);
            }
        }
    }

    // revealed
    let revealedBlockMatch = /"revealed":\s*\[([\s\S]*?)\]/.exec(block);
    if (revealedBlockMatch) {
        const kws = [...revealedBlockMatch[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
        for (const kw of kws) {
            getGraph(kw).dispatchedBy.add(`Archive: ${title} (${archId})`);
        }
    }
}

// 4. Parse dialogue
const dialogueFile = path.join(constantsDir, 'dialogue.ts');
const dialogueContent = fs.readFileSync(dialogueFile, 'utf8');

const diagClues = extractClues(dialogueContent);
for (const kw of diagClues) {
    getGraph(kw).dispatchedBy.add(`Jennifer Dialogue`);
}

// 5. Parse Markdown files in content/ directory
const contentDir = path.join(__dirname, '..', 'content');
function parseMarkdownDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.statSync(itemPath).isDirectory()) {
            parseMarkdownDir(itemPath);
        } else if (itemPath.endsWith('.md')) {
            const content = fs.readFileSync(itemPath, 'utf8');
            const clues = extractClues(content);
            const fileName = path.basename(itemPath, '.md');
            for (const kw of clues) {
                if (itemPath.includes('archives')) {
                    getGraph(kw).dispatchedBy.add(`Archive MD: ${fileName}`);
                } else if (itemPath.includes('chapters')) {
                    getGraph(kw).dispatchedBy.add(`Node MD: ${fileName}`);
                } else {
                    getGraph(kw).dispatchedBy.add(`MD File: ${fileName}`);
                }
            }
        }
    }
}
parseMarkdownDir(contentDir);

// 6. Parse App.tsx for revealKeywords (Preset Dialogues)
const appFile = path.join(__dirname, '..', 'App.tsx');
if (fs.existsSync(appFile)) {
    const appContent = fs.readFileSync(appFile, 'utf8');
    const revealRegex = /revealKeywords:\s*\[(.*?)\]/g;
    let match;
    while ((match = revealRegex.exec(appContent)) !== null) {
        const kws = match[1].replace(/['"\s]/g, '').split(',');
        for (const alias of kws) {
            if (!alias) continue;
            // Since revealKeywords might be using aliases, we might need to map them back to ids.
            // For now, we'll just add them as IDs. Actually, we know they are:
            // '堪萨斯城' -> kansas_city, '流动献血车' -> mobile_blood_truck, 'interstate_80', 'watchman'
            let mappedId = alias;
            if (alias === '堪萨斯城') mappedId = 'kansas_city';
            if (alias === '流动献血车') mappedId = 'mobile_blood_truck';
            getGraph(mappedId).dispatchedBy.add(`App.tsx: Preset Dialogue`);
        }
    }
}

// 7. Parse components/ for explicit onCollectClue calls (Image captions, UI events)
const componentsDir = path.join(__dirname, '..', 'components');
if (fs.existsSync(componentsDir)) {
    for (const file of fs.readdirSync(componentsDir)) {
        if (file.endsWith('.tsx')) {
            const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
            const onCollectRegex = /onCollectClue\(\s*'([^']+)'/g;
            let match;
            while ((match = onCollectRegex.exec(content)) !== null) {
                const kw = match[1];
                getGraph(kw).dispatchedBy.add(`UI Event: ${file}`);
            }
        }
    }
}

// Write markdown
let md = `# Keyword Topology\n\n`;
md += `| Keyword ID | Dispatched By | Consumed By |\n`;
md += `|---|---|---|\n`;

for (const [id, data] of Object.entries(keywordGraph)) {
    const disp = Array.from(data.dispatchedBy).join('<br>');
    const cons = Array.from(data.consumedBy).join('<br>');
    if (disp || cons) {
        md += `| \`${id}\` | ${disp || '-'} | ${cons || '-'} |\n`;
    }
}

fs.writeFileSync(path.join(__dirname, '..', 'keyword_topology.md'), md);
console.log('Topology written to keyword_topology.md');
