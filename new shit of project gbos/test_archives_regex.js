const GLOBAL_KEYWORD_MAP = {};
const activeKeywords = ["1968", "俄亥俄州", "祭祀案"]; // typical activeKeywords from clipping_01
const patternStr = [...activeKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].filter(Boolean).sort((a, b) => b.length - a.length).join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');

const para = "【核心案情更新】...[点击查看图片](clue:jane_doe)";
const parts = para.split(docRegex);

parts.forEach(part => {
    if (!part) return;
    let displayText = part;
    let forceClueId = null;
    const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
    if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
    else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
    
    if (forceClueId) {
        console.log("MATCHED PERFECTLY:", displayText, forceClueId);
    }
});
