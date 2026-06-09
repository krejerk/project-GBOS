const fs = require('fs');
const path = './constants/registry.ts';
let content = fs.readFileSync(path, 'utf8');

// Find the GLOBAL_KEYWORD_MAP block
const mapRegex = /export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = \{([\s\S]*?)\n\};/;
const match = content.match(mapRegex);

if (match) {
    let block = match[1];
    
    // Parse it somewhat manually
    let newEntries = [];
    const lines = block.split('\n');
    for (let line of lines) {
        if (!line.trim()) continue;
        const keyMatch = line.match(/"([^"]+)":\s*\{\s*"id":\s*"([^"]+)",\s*"type":\s*"([^"]+)"\s*\}/);
        if (keyMatch) {
            const [, key, id, type] = keyMatch;
            
            // Generate aliases
            const aliases = new Set();
            aliases.add(key); // original
            
            if (key.includes('·')) {
                aliases.add(key.replace(/·/g, ' ')); // with space
                aliases.add(key.replace(/·/g, ''));  // without space
                const parts = key.split('·');
                for (let part of parts) {
                    if (part.length >= 2) {
                        aliases.add(part); // first name, last name alone
                    }
                }
            }
            
            // Also add english ID if not present
            if (id.includes('_')) {
                aliases.add(id);
                aliases.add(id.replace(/_/g, ' '));
                const parts = id.split('_');
                for (let part of parts) {
                    if (part.length >= 4) { // only add if it's substantial like 'william'
                        aliases.add(part);
                    }
                }
            }
            
            // Format back
            for (let alias of aliases) {
                newEntries.push(`  "${alias}": { "id": "${id}", "type": "${type}" },`);
            }
        } else {
             newEntries.push(line);
        }
    }
    
    // Deduplicate and re-assemble
    // Just keeping the last one for duplicates is fine, but better to avoid duplicates
    let uniqueEntries = [];
    let seenKeys = new Set();
    for (let entry of newEntries) {
        const keyMatch = entry.match(/"([^"]+)":/);
        if (keyMatch) {
            if (seenKeys.has(keyMatch[1])) continue;
            seenKeys.add(keyMatch[1]);
            uniqueEntries.push(entry);
        } else {
            uniqueEntries.push(entry);
        }
    }
    
    const newBlock = uniqueEntries.join('\n');
    content = content.replace(mapRegex, `export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = {\n${newBlock}\n};`);
    fs.writeFileSync(path, content, 'utf8');
    console.log("Aliases added.");
} else {
    console.log("Could not find GLOBAL_KEYWORD_MAP.");
}
