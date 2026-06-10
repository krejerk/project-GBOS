const fs = require('fs');
const archiveData = fs.readFileSync('constants/archive_data.ts', 'utf8');

const activeKeywords = ["1968", "俄亥俄州", "祭祀案", "碎尸案", "1402 Old Dominion Rd.", "灭门案", "空烟盒", "1990", "黄油朱莉普", "朱维尔·钱伯斯", "灵魂厨房", "1975", "伯克斯维尔", "鲍里斯·斯米尔诺夫", "灰水信标", "1973", "阿列克谢", "盲区营地", "人造烟雾弹", "蓝色游牧房车", "拉古那海滩", "图森枪击案", "费利佩·马尔多纳多", "红杉林", "伏击案", "汉弗莱县", "袭警案", "曼丹市", "亚瑟·道森", "什一税", "利比镇", "1967"];

const patternStr = [...activeKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '\\[.*?\\]\\(clue:.*?\\)', '「.*?」'].filter(Boolean).sort((a, b) => b.length - a.length).join('|');
const docRegex = new RegExp(`(${patternStr})`, 'g');

const para = "模糊影像，我处建议因立即发布跨州通缉令，并将级别设为最高。\n\n[点击查看图片](clue:jane_doe)";

const rawParagraphs = para.split('\n\n');
rawParagraphs.forEach(p => {
    p.split(docRegex).forEach(part => {
        const mdMatch = part.match(/^\[(.*?)\]\(clue:(.*?)\)$/);
        console.log("part:", part, "mdMatch:", mdMatch ? "YES" : "NO");
    });
});
