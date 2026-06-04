import matter from 'gray-matter';
import fs from 'fs';

const content24 = fs.readFileSync('content/chapters/chapter6/confession_24.md', 'utf8');
const p24 = matter(content24);
console.log("Confession 24 ID:", p24.data.id);
console.log("Confession 24 Trigger:", p24.data.trigger);
