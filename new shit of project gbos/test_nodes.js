import fs from 'fs';

const content = fs.readFileSync('constants/chapters/chapter6.ts', 'utf-8');
const matches = [...content.matchAll(/id:\s*['"]confession_2[456]['"]/g)];
console.log(matches.map(m => m[0]));
