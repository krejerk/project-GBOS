const fs = require('fs');
const path = require('path');

const keywordsFile = "content/metadata/keywords.md";
const definedKeywords = new Set();
const keywordsContent = fs.readFileSync(keywordsFile, 'utf8').split('\n');
for (const line of keywordsContent) {
    if (line.startsWith('|') && !line.includes('关键词(ID)') && !line.includes('---')) {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length > 2) {
            definedKeywords.add(parts[1]);
        }
    }
}

const usedKeywords = new Set();
function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.md') && file !== 'keywords.md') {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            let inFrontmatter = false;
            for (const line of lines) {
                if (line.startsWith('---')) {
                    inFrontmatter = !inFrontmatter;
                    continue;
                }
                if (inFrontmatter) {
                    if (line.trim().startsWith('- ')) {
                        // Extract keyword, e.g. "- libby_town"
                        const kw = line.trim().substring(2).trim();
                        // Ignore empty or weird strings
                        if (kw && kw.length > 0 && !kw.includes(':') && !kw.includes('[')) {
                            // remove quotes
                            usedKeywords.add(kw.replace(/['"]/g, ''));
                        }
                    } else if (line.includes('[') && line.includes(']')) {
                        // e.g. trigger_persons: ["capone", "罗伯特·卡彭"]
                        const match = line.match(/\[(.*?)\]/);
                        if (match) {
                            const items = match[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
                            for (const item of items) {
                                if (item && !item.includes('(')) {
                                    usedKeywords.add(item);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

walkDir("content");

const missing = [...usedKeywords].filter(k => !definedKeywords.has(k)).sort();
console.log("Missing keywords:");
console.log(missing.join('\n'));
