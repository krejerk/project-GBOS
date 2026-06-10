const patternStr = ['\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');

const para = "这是一段测试文字[点击查看图片](clue:jane_doe)结尾。";
const parts = para.split(docRegex);
console.log(parts);

parts.forEach(part => {
    if (!part) return;
    let displayText = part;
    let forceClueId = null;
    const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
    if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
    else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
    
    console.log("part:", part);
    console.log("mdMatch:", mdMatch);
    console.log("displayText:", displayText);
    console.log("forceClueId:", forceClueId);
});
