import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER1_KEYWORDS: Record<string, KeywordMetadata> = {
  'asian_woman': { id: 'asian_woman', chapter: 1, type: 'person', displayName: "亚裔女性", isPersistent: true, description: "在香槟镇失踪的受害者。", source: "Briefing" },
  'chicago': { id: 'chicago', chapter: 1, type: 'location', displayName: "芝加哥", isPersistent: true, description: "亚裔女性失踪案发生的周边城市。", source: "Briefing" },
  'dr_reggie': { id: 'dr_reggie', chapter: 1, type: 'person', displayName: "雷吉博士", isPersistent: true, description: "招募卡彭执行潜伏任务的关键人物。提出了\"统一场论\"，认为多个冷案之间存在隐藏的共性。", source: "Confession" },
  'family': { id: 'family', chapter: 1, type: 'case', displayName: "诡异家族", isPersistent: true, description: "一个庞大的、横跨全美的家族式犯罪团伙。成员之间通过血缘连接，行踪飘忽不定。", source: "Briefing" },
  'julip': { id: 'julip', chapter: 1, type: 'case', displayName: "黄油朱莉普", isPersistent: true, description: "卡彭的安全识别代码 (Butter Julep)。", source: "Briefing", attachments: ["fbi_symbol_analysis"] },
  'lundgren': { id: 'lundgren', chapter: 1, type: 'person', displayName: "伦德格兰", isPersistent: true, description: "柯特兰邪教屠杀案的主谋，自称能与神灵沟通。其行为带有强烈的表演性与仪式感。", source: "Confession" },
  'maine': { id: 'maine', chapter: 1, type: 'location', displayName: "缅因州", isPersistent: true, description: "该家族曾在此地实施过一次银行劫案。", source: "Briefing" },
  'missing': { id: 'missing', chapter: 1, type: 'case', displayName: "失踪", isPersistent: true, description: "受害者的最终下落不明。", source: "Briefing" },
  'crime_route_map': { id: 'crime_route_map', chapter: 1, type: 'case', displayName: "罗伯特·卡彭：犯罪路线", isPersistent: true, description: "卡彭在全美的流窜路线。随着新的线索解开，会逐渐拼凑出完整的路线图。", source: "Investigation" },
  'nibi': { id: 'nibi', chapter: 1, type: 'person', displayName: "尼比", isPersistent: true, description: "阿尔衮琴人，1971年缅因州银行劫案的执行者。与康查尔之间存在扭曲的仪式性关系。", source: "Confession" },
  'ohio': { id: 'ohio', chapter: 1, type: 'location', displayName: "俄亥俄州", isPersistent: true, description: "1968年柯特兰邪教屠杀案的发生地。雷吉博士\"统一场论\"列表中的关键案件之一。", source: "Confession" },
  'ritual_case': { id: 'ritual_case', chapter: 1, type: 'case', displayName: "祭祀案", isPersistent: true, description: "伦德格兰以宗教祭祀为名义实施的屠杀。艾弗里一家五口在谷仓下被杀害。", source: "Confession" },
  'roger_beebe': { id: 'roger_beebe', chapter: 1, type: 'person', displayName: "罗格·毕比", isPersistent: true, description: "香槟镇失踪案的真凶。1985年因另一起案件被捕后，主动承认了1980年绑架并杀害金美善的罪行。", source: "Confession" },
  'small_bank': { id: 'small_bank', chapter: 1, type: 'case', displayName: "小银行", isPersistent: true, description: "被家族劫掠的目标地点之一。", source: "Briefing" },
  'year_1967': { id: 'year_1967', chapter: 1, type: 'year', displayName: "1967", isPersistent: true },
  'year_1968': { id: 'year_1968', chapter: 1, type: 'year', displayName: "1968", isPersistent: true, description: "俄亥俄州柯特兰邪教屠杀案发生的年份。雷吉博士的案卷病理学分析揭示了伦德格兰的真实动机。", source: "Confession" },
  'year_1971': { id: 'year_1971', chapter: 1, type: 'year', displayName: "1971", isPersistent: true, description: "缅因州银行劫案发生的年份，也是卡彭潜伏任务开始的时间节点。", source: "Confession" },
  'year_1985': { id: 'year_1985', chapter: 1, type: 'year', displayName: "1985", isPersistent: true, description: "罗格·毕比被捕并供认香槟镇失踪案的年份。FBI内部对KLUB机构的重组也在这一年启动。", source: "Confession" },
  'dirty_frank': { id: 'dirty_frank', chapter: 5, type: 'location', displayName: "脏弗兰克酒吧", isPersistent: true, description: "康查尔与卡彭的暂住地，莫宁经营的据点。", source: "Confession" },
  'morning': { id: 'morning', chapter: 5, type: 'person', displayName: "莫宁", isPersistent: true, description: "脏弗兰克酒吧的老板，经营着报废车场。", source: "Confession" },
  'twisted_relationship': { id: 'twisted_relationship', chapter: 2, type: 'case', displayName: "扭曲关系", isPersistent: true, description: "尼比与康查尔之间存在的一种扭曲、充满暴力且带有仪式感的肉体与精神链接。", source: "Confession" }
};

export const CHAPTER1_NODES: MemoryNode[] = [
  {
    id: "confession_2",
    keyword: "confession",
    title: "供述 No.2",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.5 },
    revealedKeywords: ["lundgren", "dirty_frank", "morning"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "从有了“统一场论”之后，雷吉博士就建立起一个不断更新的冷案列表。\n\n我不知道他凭借什么证据就认为这些案子之间存在勾连，但他要求我，务必记住其中每一件的所有细节，以便在接近缅因州银行劫案的真凶之后，搜寻串联起这些案子的人证物证。\n\n如你所知，到狱中后尼比始终对我毫无兴趣，而他的死也让我一度以为任务即将以失败，不过随着康查尔跟我一同出狱，我很快就发现，原来雷吉博士的冷案列表中，还真有两个案子或许有些联系。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "当时我和康查尔被关在缅因州的汉弗莱监狱，以我的经验来说，这所监狱的狱警可能是整个缅因州最糟糕的，其中有个叫莫布利的警监……无论如何，离开监狱后，狡猾的康查尔靠他从莫布利那套来的话，在一个宾果俱乐部里诱骗了他的婆娘。\n\n一夜过后，康查尔便得到了警监的车钥匙，监狱门口，他当着一众狱警的面载上了我，然后开着那台雷鸟跨越州界，沿海岸线一路抵达费城。\n\n路上，康查尔持续不断地吹嘘他的斑斑劣迹，那时在我看来，这人和小混混没有区别。我实在不知自己为什么还要跟着他往南前行。然而，或许是公路旅行本身的魅力吧，又或许是他同尼比的奇怪关系让“统一场论”还有一线机会，最后，我们来到了费城西边的[脏弗兰克酒吧](clue:dirty_frank)暂住下来。这地方异常脏乱，地板简直能黏住鞋底。在康查尔发誓永远也不会返回缅因州后，酒吧老板[莫宁](clue:morning)才同意帮忙处理赃车。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "不好意思，你想问什么来着？哦对，俄亥俄州的祭祀案。简单说来，你想要问的那个人，名叫[伦德格兰](clue:lundgren)。1968年冬天，犯案后的伦德格兰同几个愚蠢的追随者一起，藏进肯达尔湖附近的欢乐时光旅馆内，大约一周后，教主将教徒分为三波，要他们在一天内分别对周边郡县警署发动袭击，而他则趁着警力忙于彼此支援的时机，驾驶那辆蓝色福特费尔兰跨过州线，抵达了匹兹堡。\n\n是的，我曾在那莫宁的报废车场见到过这两福特菲尔兰的残骸，在我和康查尔到那的时候，它还保持着能被辨认的形状。至于伦德格兰出逃柯特兰后的遭遇我从何而知的，那又是另一回事了。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_3",
    keyword: "confession",
    title: "供述 No.3",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7 },
    revealedKeywords: ["roger_beebe", "year_1985"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "孩子，我先给你正确答案吧。\n\n失踪案的真凶名叫[罗格·毕比](clue:roger_beebe)，就是警方最早怀疑的那个嫌疑人。实话告诉你，要不是 KLUB 存心指错了路，警方五年前就该把他带走了。直到[1985年](clue:year_1985)他因为别的案子被捕，竟然主动承认香槟镇那档子事也是他干了。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "谁能想到呢？\n\n总之，这件事让父亲失望了好一阵子。\n\n是的，父亲乐于在这些外人身上寻找那种熟悉的气味。在他看来，恶行是一种亲密的表达。所以，当 KLUB 表现出要把这案子归为家族行动时，他到认为这是一种荣耀了。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "既然敌人想犯错，为什么要拦着他们？", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_1",
    keyword: "confession",
    title: "供述 No.1",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 },
    revealedKeywords: ["nibi", "dr_reggie", "year_1971", "twisted_relationship"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "日子过去实在太久了。\n\n这些年我喝了这么多劣质波本，脑子早被搞坏了。所以我要提醒你，不管我说了什么，它都有可能只是我为了不发疯，而一遍遍讲给自己听的‘故事’。\n\n你说的缅因州的案子应该发生在[1971年](clue:year_1971)，是[雷吉博士](clue:dr_reggie)当时标记案件中的最新一起。当KLUB获得了实质上的行动经费之后，雷吉的几个学生，通过一些退伍军人俱乐部的关系，锁定了名叫[尼比](clue:nibi)的阿尔衮琴人，局里的行动组很快对其实施抓捕。被捕后的尼比对罪行供认不讳，很快就被审判收监起来。抓人当然不是雷吉博士的目的，所以没过几天，他们也把我也放到监狱里，和尼比关在一起。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "雷吉博士，我猜你在量化官的档案库里没见到过这个名字，不过“统一场论”就是他搞出来的，那时他手里有好几个看似孤立的冷案，他认为它们之间存在共性，而所谓动机其实都是犯事者的障眼法。\n\n在训练阶段，博士就曾反复强调过，要想引起目标人物的兴趣，我必须对‘罪恶’本身展现出一种生理性的热诚。所以进到监狱之后，我隔三差五就找茬揍人，可尼比却稳得像块石头，对我所做的一切都毫无反应。直到有一天，一个叫康查尔的年轻犯人主动找我搭讪，他告诉我，他十分欣赏我，我也了解到，此人只是因为一件小事被警察盘问，最终却因袭警入狱。\n\n我想你已经有了答案，这个康查尔，就是那位‘家庭’的长子。\n\n不管怎么说，我最后还是赢了康查尔的信任。进监狱前，博士给我造了个意大利裔孤儿的身世，康查尔告诉我，当铁门打开时，会有一个‘家庭’在外面接纳我。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "为什么是康查尔找到我，而非尼比？我一度怀疑是博士的直觉出了偏差，什么“统一场论”根本子虚乌有。但就在即将获得假释的前夕，我忽然发现，康查尔与尼比之间一直维持着一种[扭曲的肉体关系](clue:twisted_relationship)。到出狱之前某天，这段关系才因尼比的‘意外’身亡而宣告终结。当然了，到今天我也无法确定，尼比的死是否与康查尔有关。\n\n无论如何，缅因州银行劫案，1971年，嫌疑人尼比。这就是我能从那堆名为记忆的废墟里挖掘出的全部东西了。", attitude: "", visual: "" }
    }
  }
];
