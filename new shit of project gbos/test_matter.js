import matter from 'gray-matter';
import fs from 'fs';

const content = fs.readFileSync('content/chapters/chapter6/confession_24.md', 'utf8');
const parsed = matter(content);
console.log("Parsed Trigger:", parsed.data.trigger);
