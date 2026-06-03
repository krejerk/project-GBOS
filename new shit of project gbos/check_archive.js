const fs = require('fs');
const archiveText = fs.readFileSync('constants/archive_data.ts', 'utf8');

const personMatches = archiveText.match(/\"person\":\s*\[\s*\"([^\"]+)\"/g);
let names = [];
if (personMatches) {
    personMatches.forEach(m => {
        names.push(m.match(/\"([^\"]+)\"/)[1]);
    });
}
console.log(names.filter(n => n === '莫兰迪' || n === '戈尔和列维探员' || n === '阿列克谢'));
