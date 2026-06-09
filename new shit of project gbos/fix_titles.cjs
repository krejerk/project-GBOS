const fs = require('fs');
const path = './constants/archive_data.ts';
let content = fs.readFileSync(path, 'utf8');

const titles = {
  "clipping_21": "1967年蒙大拿州利比镇失踪案",
  "clipping_22": "1977年亚利桑那州图森枪击案",
  "clipping_24": "1981年特拉华州里霍博斯海滩溺水案",
  "clipping_25": "1985年密歇根州安娜堡市公路谋杀案",
  "clipping_26": "1999年凤凰城爆炸案与失踪的少女"
};

for (const [id, title] of Object.entries(titles)) {
  const regex = new RegExp(`"id": "${id}",\\s*"title": "...placeholder...Title fixed by next line"`, 'g');
  content = content.replace(regex, `"id": "${id}",\n        "title": "${title}"`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed titles");
