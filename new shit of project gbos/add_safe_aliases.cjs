const fs = require('fs');
const path = './constants/registry.ts';
let content = fs.readFileSync(path, 'utf8');

const aliasesToAdd = [
  // william dawson
  '"william_dawson": { "id": "william_dawson", "type": "person" }',
  '"william dawson": { "id": "william_dawson", "type": "person" }',
  '"威廉 道森": { "id": "william_dawson", "type": "person" }',
  '"威廉道森": { "id": "william_dawson", "type": "person" }',
  '"威廉": { "id": "william_dawson", "type": "person" }',
  '"道森": { "id": "william_dawson", "type": "person" }',
  
  // cynthia miller
  '"cynthia_miller": { "id": "cynthia_miller", "type": "person" }',
  '"cynthia miller": { "id": "cynthia_miller", "type": "person" }',
  '"辛西娅·米勒": { "id": "cynthia_miller", "type": "person" }',
  '"辛西娅 米勒": { "id": "cynthia_miller", "type": "person" }',
  '"辛西娅": { "id": "cynthia_miller", "type": "person" }',
  '"米勒": { "id": "cynthia_miller", "type": "person" }',

  // clement svirson
  '"clement_svirson": { "id": "clement_svirson", "type": "person" }',
  '"clement svirson": { "id": "clement_svirson", "type": "person" }',
  '"克莱门特 斯维尔松": { "id": "clement_svirson", "type": "person" }',
  '"克莱门特 斯维尔森": { "id": "clement_svirson", "type": "person" }',
  '"克莱门特": { "id": "clement_svirson", "type": "person" }',
  '"斯维尔松": { "id": "clement_svirson", "type": "person" }',

  // frank rollins
  '"frank_rollins": { "id": "frank_rollins", "type": "person" }',
  '"frank rollins": { "id": "frank_rollins", "type": "person" }',
  '"弗兰克·罗林斯": { "id": "frank_rollins", "type": "person" }',
  '"弗兰克 罗林斯": { "id": "frank_rollins", "type": "person" }',
  '"弗兰克": { "id": "frank_rollins", "type": "person" }',
  '"罗林斯": { "id": "frank_rollins", "type": "person" }',
  
  // jeffrey lundgren
  '"jeffrey_lundgren": { "id": "jeffrey_lundgren", "type": "person" }',
  '"jeffrey lundgren": { "id": "jeffrey_lundgren", "type": "person" }',
  '"杰弗里·伦德格兰": { "id": "jeffrey_lundgren", "type": "person" }',
  '"杰弗里 伦德格兰": { "id": "jeffrey_lundgren", "type": "person" }',
  '"杰弗里": { "id": "jeffrey_lundgren", "type": "person" }',
  '"伦德格兰": { "id": "jeffrey_lundgren", "type": "person" }',

  // alice
  '"alice_capone": { "id": "alice_capone", "type": "person" }',
  '"alice capone": { "id": "alice_capone", "type": "person" }',
  '"爱丽丝": { "id": "alice_capone", "type": "person" }',
  '"卡彭": { "id": "alice_capone", "type": "person" }',
];

const mapRegex = /(export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = \{[\s\S]*?)(\n\};)/;
const newContent = content.replace(mapRegex, `$1,\n  ${aliasesToAdd.join(',\n  ')}$2`);

fs.writeFileSync(path, newContent, 'utf8');
console.log("Safe aliases added.");
