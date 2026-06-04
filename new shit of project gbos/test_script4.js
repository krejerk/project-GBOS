import fs from 'fs';

const reg = fs.readFileSync('constants/registry.ts', 'utf8');

const lines = reg.split('\n');
let insideKeyReg = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export const KEYWORD_REGISTRY')) insideKeyReg = true;
    if (insideKeyReg && (lines[i].includes('albuquerque') || lines[i].includes('chemist_lover') || lines[i].includes('laguna_beach'))) {
        console.log("Found:", lines[i]);
    }
    if (insideKeyReg && lines[i].includes('export const GLOBAL_KEYWORD_MAP')) break;
}
