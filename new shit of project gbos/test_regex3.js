const activeKeywords = ["图片", "点击查看"];
const patternStr = [...activeKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].filter(Boolean).sort((a, b) => b.length - a.length).join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');

const para = "这是一段测试文字[点击查看图片](clue:jane_doe)结尾。";
const parts = para.split(docRegex);
console.log(parts);
