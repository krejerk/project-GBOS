import fs from 'fs';

const indexContent = fs.readFileSync('constants/index.ts', 'utf8');

const albuquerqueMatch = indexContent.match(/'albuquerque':\s*\{[^}]*\}/);
console.log("albuquerque in index.ts:", albuquerqueMatch ? albuquerqueMatch[0] : "NOT FOUND");

const chemistMatch = indexContent.match(/'chemist_lover':\s*\{[^}]*\}/);
console.log("chemist_lover in index.ts:", chemistMatch ? chemistMatch[0] : "NOT FOUND");

