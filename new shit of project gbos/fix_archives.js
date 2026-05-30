const fs = require('fs');
const path = '/Users/xindaliu/Downloads/project-g.b.o.s.---memory-diver/new shit of project gbos/constants/archive_data.ts';
let content = fs.readFileSync(path, 'utf8');

// Fix authors
content = content.replace(/"author":\s*"马库斯·索恩"/g, '"author": "马库斯·索恩 (Marcus Thorne)"');
content = content.replace(/"author":\s*"霍华德·贝克"/g, '"author": "霍华德·贝克 (Howard Baker)"');

// Fix templates
content = content.replace(/"author":\s*"马库斯·索恩 \(Marcus Thorne\).*?",\s*"template":\s*"REGGIE"/g, '"author": "马库斯·索恩 (Marcus Thorne)",\n            "template": "THORNE"');
content = content.replace(/"author":\s*"马库斯·索恩 \(Marcus Thorne\)，FBI 实验室总证物官",\s*"template":\s*"REGGIE"/g, '"author": "马库斯·索恩 (Marcus Thorne)，FBI 实验室总证物官",\n            "template": "THORNE"');
content = content.replace(/"author":\s*"霍华德·贝克 \(Howard Baker\)",\s*"template":\s*"REGGIE"/g, '"author": "霍华德·贝克 (Howard Baker)",\n            "template": "BAKER"');
content = content.replace(/"author":\s*"代理协调员 艾萨克·阿特尔曼 \(Isaac Alterman\)",\s*"template":\s*"REGGIE"/g, '"author": "代理协调员 艾萨克·阿特尔曼 (Isaac Alterman)",\n            "template": "ALTERMAN"');
content = content.replace(/"author":\s*"托马斯·克兰 \(Thomas Crane\)",\s*"template":\s*"REGGIE"/g, '"author": "托马斯·克兰 (Thomas Crane)",\n            "template": "CRANE"');
content = content.replace(/"author":\s*"大卫·霍克 \(David Hawke\)",\s*"template":\s*"REGGIE"/g, '"author": "大卫·霍克 (David Hawke)",\n            "template": "HAWKE"');

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
