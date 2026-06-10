const docRegex = new RegExp('(\\[.*?\\]\\(clue:.*?\\)|「.*?」)', 'g');
const cleanParagraphs = ["测试一段话 [点击查看图片](clue:jane_doe)"];

const highlightedKeywords = new Set();
cleanParagraphs.forEach((para, i) => {
    para.split(docRegex).forEach((part, j) => {
        if (!part) return;
        let displayText = part;
        let forceClueId = null;
        const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
        if (mdMatch) { displayText = mdMatch[1]; forceClueId = mdMatch[2]; }
        else if (part.startsWith('「') && part.endsWith('」')) { displayText = part.slice(1, -1); }
        
        const keywordData = undefined; // mock GLOBAL_KEYWORD_MAP[displayText]
        const isRevealed = forceClueId || (keywordData && ['some_other_id'].includes(keywordData.id));
        
        if (isRevealed) {
            const clueId = forceClueId || (keywordData ? keywordData.id : null);
            if (!highlightedKeywords.has(clueId)) {
                highlightedKeywords.add(clueId);
                console.log(`HIGHLIGHTED: <span onClick="${clueId}">${displayText}</span>`);
                return;
            }
        }
        console.log(`NORMAL: <span>${displayText}</span>`);
    });
});
