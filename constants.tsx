
import { MemoryNode, MemoryLayer } from './types';

// Exported dossier data for the investigation view
export const INITIAL_DOSSIER = {
  agent: {
    name: "罗伯特·卡彭",
    id: "FBI-7742-RC",
  },
  reports: [
    {
      date: "2013-03-15",
      content: "凤凰城行动开始。探员罗伯特·卡彭奉命深度渗透一个庞大的家族式犯罪辛迪加。预计潜伏时间：不定。"
    },
    {
      date: "2018-09-27",
      content: "卡彭最后一次单向汇报。提及代号'建筑师'和神秘物质'G.B.O.S.'。此后完全失联，进入无线电静默状态。"
    },
    {
      date: "2025-02-19",
      content: "亚利桑那州荒漠深处酒吧发现昏迷男子，DNA比对确认为失踪十余年的探员罗伯特·卡彭。现处于植物人状态，大脑维持在临界意识。全美暴力犯罪率近半年异常飙升，BAU研判与卡彭潜伏组织重启活动高度相关。记忆潜航计划已获批。"
    }
  ]
};

export const CORE_NODES: MemoryNode[] = [
  {
    id: "capone",
    keyword: "capone",
    title: "罗伯特·卡彭",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.45 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "罗伯特曾是FBI最受期待的探员，但在十年前的凤凰城扫黑行动后失踪。",
        attitude: "我想回家。不，我没有家。我属于这里，属于这片阴影。",
        visual: "https://picsum.photos/seed/robert/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "他的失踪并非被迫，而是主动选择了静默。他发现辛迪加的根须已经伸到了局里。",
        attitude: "信任是一种奢侈品。我必须变成他们，才能看清到底谁在卖掉我们。",
        visual: "https://picsum.photos/seed/badge/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "罗伯特成为了'建筑师'的副手，甚至是合伙人。他在深渊中建立了自己的微型帝国。",
        attitude: "深渊没有回头路。我不是在潜伏，我是在进化。"
      }
    },
    connectedTo: ["luciano", "gbos"]
  },
  {
    id: "luciano",
    keyword: "luciano",
    title: "卢西亚诺",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.3 },
    revealedKeywords: ['gbos', 'chicago'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "卢西亚诺酒吧的老板，家族的财务管家。一个喜欢穿丝绸衬衫的肥胖男人。",
        attitude: "只要有酒和牡蛎，这个世界就是完美的。对吧，卡彭？",
        visual: "https://picsum.photos/seed/luciano/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "卢西亚诺负责分发那些'特制汤'。他死在卡彭怀里，临死前手里紧握着一根needle针管。",
        attitude: "他太软弱了。他以为自己在喂食大家，其实 he 只是在为建筑师挑选祭品。"
      }
    },
    connectedTo: ["gbos"]
  },
  {
    id: "gbos",
    keyword: "gbos",
    title: "G.B.O.S.",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7 },
    revealedKeywords: ['julip', 'project'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "代号意为'青豆牡蛎汤'。一种难以下咽的帮派内部流行食谱。",
        attitude: "别喝那碗汤。如果你还想活着看到明天的太阳。",
        visual: "https://picsum.photos/seed/soup_v/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "实际上是'全球生物有机压制'的缩写。一种能够让人陷入可控意识瘫痪的毒素。",
        attitude: "这是建筑师的杰作。一种不费一兵一卒就能接管城市的武器。我帮他完成了最后一步。"
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_1",
    keyword: "confession",
    title: "供述 No.1",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 },
    revealedKeywords: ['maine', 'nibi', 'conchar', 'year_1971', 'small_bank', 'relationship', 'confession'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "日子过去实在太久了。这些年我喝了这么多劣质波本，脑子早被搞坏了。所以即便我能记得起来的，大概也是我这几十年来为了不发疯，一遍遍讲给自己听的'故事'。\n\n到底是不是真的发生过的事情，我真不敢给你打包票。我只能说，那次潜伏任务（Deep Cover）的启动完全背离了局里的标准作业程序。\n\n如果我没记错的话，你说的缅因州的案子发生在1971年，是雷吉博士标记案件中的最新一起。总之通过一些退伍军人俱乐部的关系，行动组很快就锁定了逮捕一个名叫尼比的阿尔衮琴人，尼比对罪行供认不讳，很快就被审判收监。没过几天，他们也把我也放到监狱里，和他关在一起。",
        attitude: "",
        visual: "/assets/incident-report.jpg"
      },
      [MemoryLayer.DEEP]: {
        event: "招募我的人叫雷吉博士，我猜你在量化官的档案库里没见到过这个名字。不过'统一场论'就是他搞出来的，那时他手里有好几个看似孤立的冷案，他认为它们之间存在共性，而调查部门推想中的动机其实都是犯事者的障眼法。\n\n总之，缅因州银行案就是博士名单上最后一起案子。通过退伍军人协会的一些关系，行动组很快就揪住了那个叫尼比的阿尔衮琴人。尼比很干脆，很快就认罪了，接着被扔进惩教署的大牢。博士认为时机到了，所以紧接着没过几天，我也被'送'了进去，成了尼比的室友。\n\n在训练阶段，博士曾反复强调：在那个密闭环境里，我必须对'罪恶'本身表现出一种生理性的热诚，所以我隔三差五就找茬揍人，用拳头在里头立威。可跟我同屋的尼比却稳得像块石头，一点反应都没有。直到有一天，一个叫康查尔的年轻犯人开始主动找我搭讪，他告诉我，他十分欣赏我，我也了解到，他因为微不足道一件小事被警察盘问，最终却因袭警入狱。康查尔是一个极其危险的观察者，他不止一次对我说，他能从我身上闻到某种属于'公职人员'的腐朽气味。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我想你已经有了答案，这个康查尔就是那位'父亲'的长子。\n\n不管怎么说，我最后还是赢了他的信任。进监狱前，博士给我造了个意大利裔孤儿的身世，康查尔告诉我，当铁门打开时，会有一个'家庭'在外面接纳我。而此前我们一直监控的目标尼比，看起来似乎成了计划中的冗余。我一度怀疑是博士的直觉出了偏差，什么统一场论根本子虚乌有。但就在我即将获得假释的前夕，我忽然发现，康查尔与尼比之间一直维持着某种扭曲的、带有仪式性质的肉体关系。这段关系直到出狱之前某天，尼比忽然'意外'身亡才宣告终结，可我始终记得他们最后一次对视，两人嘴角都带着一种极度默契的微笑。反正到今天我也无法确定，尼比的死是否与康查尔有关。\n\n无论如何，缅因州银行劫案，1971年，嫌疑人尼比。这就是我能从那堆名为记忆的废墟里挖掘出的全部东西了。",
        attitude: "",
        visual: "https://picsum.photos/seed/smile/800/450"
      }
    },
    connectedTo: ["capone", "luciano"]
  },
  {
    id: "confession_2",
    keyword: "confession",
    title: "供述 No.2",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.5 },
    revealedKeywords: ['ohio', 'lundgren', 'morning', 'year_1968', 'ritual_case'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "从有了'统一场论'之后，雷吉博士就有一个不断更新中的冷案列表。\n\n我不知道他凭借什么理论框架和证据，就认为这些案子彼此之间存在勾连，但他要求我，务必记住其中每一件的所有细节，以便接近缅因州银行劫案的真凶之后，能从侧面搜寻串联起这些案子的人证物证。\n\n如你所知，到狱中后尼比始终对我毫无兴趣，而他的死也让我一度以为任务即将以失败，不过随着康查尔跟我一同出狱，我很快就发现，原来雷吉博士的冷案列表中，还真有两个案子或许有些联系。",
        attitude: "",
        visual: "/assets/case-files.jpg"
      },
      [MemoryLayer.DEEP]: {
        event: "那时我们被关在汉弗莱监狱，以我当时的经验来说，那的狱警应该是整个缅因州最糟糕的，其中有个叫莫布利的警监……总之离开监狱后，康查尔靠着他从莫布利那套来的话，诱骗了他的婆娘。开着他那台雷鸟，我们跨越州界，沿海岸线一路抵达费城。\n\n一路上，康查尔还在吹嘘他的斑斑劣迹，但那时在我看来，这人小混混没有区别，我实在不知自己为什么还要跟着他，或许是公路旅行本身的魅力？或许是他同尼比的奇怪关系让'统一场论'还有一线机会？总之，我跟着康查尔来到了费城西边的脏弗兰克酒吧暂住，那地方非常脏乱，地板简直能黏住鞋底。总之在康查尔发誓永远也不会返回缅因州后，酒吧老板莫宁才同意帮忙处理赃车。",
        attitude: "",
        visual: "/assets/road-trip.jpg"
      },
      [MemoryLayer.CORE]: {
        event: "你想要问的那个人，名叫伦德格兰。1968年冬天，犯案后的伦德格兰同几个愚蠢的追随者一起，藏进肯达尔湖附近的欢乐时光旅馆内。大约一周后，教主将教徒分为三波，要他们在一天内分别对周边郡县警署发动袭击，而他则趁着警力忙于彼此支援的时机，驾驶那辆蓝色福特费尔兰跨过州线，抵达了匹兹堡。\n\n是的，我曾在莫宁的报废车场见到了这辆汽车的残骸，在我同康查尔到那的时候，它还保持着能被辨认的形状。至于伦德格兰出逃柯特兰后的遭遇我从何而知的，那又是另一回事了。",
        attitude: "",
        visual: "/assets/car-graveyard.jpg"
      }
    },
    connectedTo: ["confession_1", "capone"]
  },
  {
    id: "confession_4",
    keyword: "confession",
    title: "供述 No.4",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
    revealedKeywords: ['nevada', 'dr_reggie', 'training_day', '1402_old_dominion_rd'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我想你真正想问的是，为什么是我？雷吉博士为什么选择了我？\n\n首先我必须重申，即便在 1967 年 KLUB 获得了部分一线干预权后，它所属的行为分析科（BAU）也从没有过向前线派遣潜伏人员的正式权限。\n\n明白吗？我就是那个不合规的例外。特殊到整个训练过程都是由雷吉博士亲自监督的。",
        attitude: "",
        visual: "/assets/training-facility.jpg"
      },
      [MemoryLayer.DEEP]: {
        event: "在得到这份工作之前，我只是个平平无奇的州警，档案在局里挂着号。因为执勤时“过度暴力”，我被停职并扔到了专门处理公职人员的精神康复部门。当时负责我的医生是雷吉博士的学生。他并没想推荐我，他只是把一批“脑子有问题”的警察档案交给了博士，而博士在那堆纸里挑中了我。\n\n直到训练结束的那个下午，在马场旁边的咖啡馆里，博士才告诉我原因。他说得很直白：其他人的行为偏差是创伤造成的，而我，是一个真正的疯子。\n\n听着，我清楚地记得他说这话时带着某种赞许，仿佛在宣布某种荣光。但在我听来，那更像是某种刺痛。那是这辈子第一次有人点破我的核心问题：我之所以当警察，就是为了避免让自己成为一个纯粹的混蛋。穿上制服，至少能让我在作恶的天性之外，还能对社会产生点正面作用。",
        attitude: "",
        visual: "/assets/medical-file.jpg"
      },
      [MemoryLayer.CORE]: {
        event: "所以我不知道该恨他还是谢他。他给了我这份新工作，让我能在当个彻头彻尾的混蛋之余，还能给社会带来更大的“帮助”。瞧，这话说出来他妈的有够讽刺。\n\n其实我知道你想问的是什么。\n\n父亲。\n\n对吗？关于这个，我无话可说。\n\n算了，可以给你说句实话。在受训期间，我有次甚至觉得，那个男人（父亲）在各方面都是雷吉博士的反面——准确地说，是好的那一面。\n\n太多年了，你想要的事情没有答案。这些年我反复做一个梦，梦到根本就没有什么“青豆牡蛎汤计划”，它真的只是内华达州本地的一道菜。除了豆子和牡蛎，你还需要在锅里放进胡萝卜、洋葱、蘑菇、月桂叶，最后倒进干雪利酒。\n\n那时候我从不喝雪利酒，我不知道自己为什么会做这样一个梦。",
        attitude: "",
        visual: "/assets/dream-soup.jpg"
      }
    },
    connectedTo: ["confession_1", "capone", "dr_reggie"]
  },
  {
    id: "confession_3",
    keyword: "confession",
    title: "供述 No.3",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7 },
    revealedKeywords: ['roger_beebe', 'year_1985'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "孩子，我先给你正确答案吧。\n\n失踪案的真凶名叫罗格·毕比，就是警方最早怀疑的那个嫌疑人。实话告诉你，要不是 KLUB 存心指错了路，警方五年前就该把他带走了。可谁能想到呢？直到1985年他因为别的案子被捕，竟然主动承认香槟镇那档子事也是他干的。",
        attitude: "",
        visual: "/assets/confession-3.jpg"
      },
      [MemoryLayer.DEEP]: {
        event: "这件事让父亲失望了好一阵子。\n\n是的，父亲总是乐于在这些外人身上寻找那种熟悉的气味。在他看来，恶行是一种亲密的表达。所以，当 KLUB 表现出要把这案子归为辛迪加行动的迹象时，他反而认为这是一种荣耀。既然敌人想犯错，为什么要拦着他们？",
        attitude: "",
        visual: "/assets/father-disappointed.jpg"
      },
      [MemoryLayer.CORE]: {
        event: "他们后来也不是没见过毕比，当然是在他入狱之后。不过，既然这人这辈子都出不来了，再纠结这些又有什么意义？",
        attitude: "",
        visual: "/assets/prison-visit.jpg"
      }
    },
    connectedTo: ["confession_2", "capone"]
  }
];
