const fs = require('fs');
const path = require('path');

function findClues(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(findClues(fullPath));
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const matches = content.matchAll(/\[.*?\]\(clue:(.*?)\)/g);
            for (const match of matches) {
                results.push({ file: fullPath, clue: match[1] });
            }
        }
    }
    return results;
}

const clues = findClues('./constants');
const uniqueClues = [...new Set(clues.map(c => c.clue))];
console.log("Found", uniqueClues.length, "unique clue IDs in markdown tags.");
console.log(uniqueClues.join(", "));
