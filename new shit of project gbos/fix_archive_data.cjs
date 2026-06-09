const fs = require('fs');
const path = './constants/archive_data.ts';
let content = fs.readFileSync(path, 'utf8');

const missingClippings = {
  "clipping_21": { year: "1967", person: ["william_dawson"] },
  "clipping_22": { year: "1977", person: ["frank_rollins"] },
  "clipping_24": { year: "1981", person: ["clement_svirson"] },
  "clipping_25": { year: "1985", person: ["alexander_mengel"] },
  "clipping_26": { year: "1999", person: ["cynthia_miller"] }
};

for (const [id, triggers] of Object.entries(missingClippings)) {
  const regex = new RegExp(`"id": "${id}",[\\s\\S]*?"triggers": \\{[\\s\\S]*?\\}`, 'g');
  content = content.replace(regex, `"id": "${id}",\n        "title": "${id === 'clipping_26' ? '凤凰城爆炸案与失踪的少女' : '...placeholder...'}Title fixed by next line",\n        "triggers": {\n            "year": "${triggers.year}",\n            "person": [${triggers.person.map(p => `"${p}"`).join(', ')}]\n        }`);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed archive_data.ts empty triggers");
