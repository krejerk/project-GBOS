import { ALL_MEMORY_NODES, KEYWORD_REGISTRY, UNLOCKS_REGISTRY, ARCHIVE_DATABASE } from '../constants';
import * as dialogue from '../constants/dialogue';
import * as fs from 'fs';

// Helper to extract clue: keywords from text
function extractClues(text: string): string[] {
    const clues: string[] = [];
    const regex = /\[.*?\]\(clue:(.*?)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        clues.push(match[1]);
    }
    return clues;
}

const keywordGraph: Record<string, { dispatchedBy: string[], consumedBy: string[] }> = {};

for (const keywordId of Object.keys(KEYWORD_REGISTRY)) {
    keywordGraph[keywordId] = { dispatchedBy: [], consumedBy: [] };
}

// 1. Initial Briefing / Default Keywords
for (const [id, meta] of Object.entries(KEYWORD_REGISTRY)) {
    if (!keywordGraph[id]) keywordGraph[id] = { dispatchedBy: [], consumedBy: [] };
    if (meta.source === 'Briefing' || meta.source === 'Investigation') {
        keywordGraph[id].dispatchedBy.push(meta.source);
    }
}

// 2. Memory Nodes (Confessions)
for (const node of ALL_MEMORY_NODES) {
    if (node.revealedKeywords) {
        for (const kw of node.revealedKeywords) {
            if (!keywordGraph[kw]) keywordGraph[kw] = { dispatchedBy: [], consumedBy: [] };
            keywordGraph[kw].dispatchedBy.push(`Node: ${node.title} (${node.id})`);
        }
    }
}

// 3. Archives (Clippings)
for (const archive of ARCHIVE_DATABASE) {
    if (archive.revealed) {
        for (const kw of archive.revealed) {
            if (!keywordGraph[kw]) keywordGraph[kw] = { dispatchedBy: [], consumedBy: [] };
            keywordGraph[kw].dispatchedBy.push(`Archive: ${archive.title} (${archive.id})`);
        }
    }
    
    // Also track consumed
    if (archive.triggers) {
        if (archive.triggers.year) {
            const y = archive.triggers.year;
            // The actual keyword ID might be 'year_' + y or just y if it's mapped.
            // In KEYWORD_REGISTRY it's year_1967. Let's find it.
            const yId = `year_${y}`;
            if (!keywordGraph[yId]) keywordGraph[yId] = { dispatchedBy: [], consumedBy: [] };
            keywordGraph[yId].consumedBy.push(`Archive: ${archive.title} (${archive.id})`);
        }
        if (archive.triggers.person) {
            for (const p of archive.triggers.person) {
                // The triggers.person array contains aliases, but usually the first is the ID.
                // We map them back. Let's just use the first item which is usually the ID.
                const pId = archive.triggers.person[0];
                if (!keywordGraph[pId]) keywordGraph[pId] = { dispatchedBy: [], consumedBy: [] };
                keywordGraph[pId].consumedBy.push(`Archive: ${archive.title} (${archive.id})`);
            }
        }
    }
}

// 4. Jennifer Dialogues
for (const [dialogueName, dialogueContent] of Object.entries(dialogue)) {
    if (Array.isArray(dialogueContent)) {
        for (const line of dialogueContent) {
            const clues = extractClues(line);
            for (const kw of clues) {
                if (!keywordGraph[kw]) keywordGraph[kw] = { dispatchedBy: [], consumedBy: [] };
                keywordGraph[kw].dispatchedBy.push(`Jennifer: ${dialogueName}`);
            }
        }
    } else if (typeof dialogueContent === 'string') {
        const clues = extractClues(dialogueContent);
        for (const kw of clues) {
            if (!keywordGraph[kw]) keywordGraph[kw] = { dispatchedBy: [], consumedBy: [] };
            keywordGraph[kw].dispatchedBy.push(`Jennifer: ${dialogueName}`);
        }
    }
}

// 5. Unlocks Registry (Consuming)
for (const [targetId, unlockInfo] of Object.entries(UNLOCKS_REGISTRY)) {
    for (const kw of unlockInfo.keywords) {
        if (!keywordGraph[kw]) keywordGraph[kw] = { dispatchedBy: [], consumedBy: [] };
        keywordGraph[kw].consumedBy.push(`Unlocks: ${targetId} (${unlockInfo.type})`);
    }
}

// 6. Print Markdown
let md = `# Keyword Topology\n\n`;
md += `| Keyword ID | Dispatched By | Consumed By |\n`;
md += `|---|---|---|\n`;

for (const [id, data] of Object.entries(keywordGraph)) {
    const disp = Array.from(new Set(data.dispatchedBy)).join('<br>');
    const cons = Array.from(new Set(data.consumedBy)).join('<br>');
    if (disp || cons) {
        md += `| \`${id}\` | ${disp || '-'} | ${cons || '-'} |\n`;
    }
}

fs.writeFileSync('keyword_topology.md', md);
console.log('Topology written to keyword_topology.md');
