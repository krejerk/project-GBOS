const aliases = ["干涸石涧", "无名女尸", "无名尸体"];
const GLOBAL_KEYWORD_MAP = {
  "干涸石涧": { id: "dry_gully" },
  "无名女尸": { id: "unnamed_female_body" },
  "无名尸体": { id: "unnamed_female_body" }
};
const query = "干涸石涧 无名女尸";
let queryRemainder = query.toLowerCase();
let detectedKeywordIds = [];
const sortedAliases = Object.keys(GLOBAL_KEYWORD_MAP).sort((a, b) => b.length - a.length);

for (const alias of sortedAliases) {
  const lowerAlias = alias.toLowerCase();
  if (queryRemainder.includes(lowerAlias)) {
    detectedKeywordIds.push(GLOBAL_KEYWORD_MAP[alias].id);
    queryRemainder = queryRemainder.split(lowerAlias).join(' '.repeat(lowerAlias.length));
  }
}

const cleanRemainder = queryRemainder.replace(/[\s,，.。!！?？;；:：、\-_/\\|年]/g, '');
console.log("detected:", detectedKeywordIds);
console.log("cleanRemainder:", cleanRemainder, cleanRemainder.length);
