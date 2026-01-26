
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

export const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {
  // Node 1
  'confession_1': ['maine', 'small_bank', 'nibi', 'conchar'],
  'confession_2': ['ohio', 'ritual_case', 'lundgren'],
  'confession_3': ['chicago', 'missing', 'roger_beebe'],
  'me_1971': ['maine', 'year_1971', 'nibi'],
  'oh_1968': ['ritual_case', 'year_1968', 'lundgren'],
  'dc_1967': ['phoenix', 'year_1967'],
  'il_1985': ['roger_beebe', 'year_1985'],

  // Node 2
  'confession_4': ['1402_old_dominion_rd', 'training_day'],
  'confession_5': ['nevada', 'family_massacre', 'little_derek_wayne'],
  'confession_6': ['mojave_rest_stop', 'empty_cigarette_pack', 'graywater_beacon'],
  'confession_7': ['roanoke', 'twisted_relationship', 'martha_diaz'],
  'va_1990': ['aw_wilmo', 'year_1990'],

  // Node 3
  'confession_8': ['louisville', 'blue_rv', 'julie', 'the_mother', 'vanessa', 'silas', 'year_1973'],
  'confession_9': ['cincinnati', 'mint_plan', 'juvell_chambers', 'distant_relatives'], // Removed 'el_paso'
  'confession_10': ['burkesville', 'boris_smirnov'],
  'confession_11': ['klub75_report', 'quantico', 'cynthia_miller'],
  'confession_12': ['kansas_city', 'mobile_blood_truck'],
  'confession_13': ['east_12th_st', 'execution_room', 'john_morrissey', 'jc_penney'],
  'cin_1973': ['julie', 'year_1973'],
  'nas_1973': ['cincinnati', 'year_1973'],
  'ky_1973': ['burkesville', 'year_1973'],

  // Node 4
  'confession_14': ['st_louis', 'maggots'],
  'confession_15': ['davenport', 'new_plan', 'peter_henderson'],
  'kan_1976': ['jc_penney', 'east_12th_st', 'year_1976'],
  'kc_1965': ['john_morrissey', 'year_1965'],
  'ia_1976': ['peter_henderson', 'year_1976'],
  'confession_16': ['texarkana', 'dismemberment_case', 'arthur_dawson'],

  // Node 4 Retrieval Targets (Meta-group for visual removal AFTER Jennifer dialogue)

};

// Categorization for split UI views
export const CATEGORY_IDS = {
  LOCATIONS: [
    'east_12th_st', 'davenport', 'texarkana', 'el_paso', 'dirty_frank',
    'st_louis', 'cincinnati', 'chicago', 'louisville', 'burkesville',
    'quantico', 'kansas_city', 'roanoke', 'nevada', 'ohio', 'maine',
    'mojave_rest_stop', '1402_old_dominion_rd'
  ],
  CASES: [
    'new_plan', 'recruitment', 'dismemberment_case',
    'ritual_case', 'small_bank', 'missing', 'family_massacre',
    'twisted_relationship', 'mint_plan', 'klub75_report',
    'mobile_blood_truck', 'execution_room', 'chaos_aesthetics', 'maggots'
  ],
  PEOPLE: ['nibi', 'conchar', 'father', 'lundgren', 'morning', 'robert', 'robert_capone', 'dr_reggie', 'roger_beebe', 'little_derek_wayne', 'aw_wilmo', 'martha_diaz', 'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers', 'boris_smirnov', 'jc_penney', 'john_morrissey', 'cynthia_miller', 'peter_henderson', 'priest', 'arthur_dawson'],
  YEARS: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1972', 'year_1990', 'year_1973', 'year_1986', 'year_1982', 'year_1975', 'year_1976', 'year_1974', 'year_1965']
};

export const CLUE_DISPLAY_MAP: Record<string, string> = {
  'year_1971': '1971',
  'year_1968': '1968',
  'year_1967': '1967',
  'year_1985': '1985',
  'year_1990': '1990',
  'year_1972': '1972',
  'year_1973': '1973',
  'year_1974': '1974',
  'year_1975': '1975',
  'year_1976': '1976',
  'year_1986': '1986',
  'year_1965': '1965',
  'nibi': '尼比',
  'lundgren': '伦德格兰',
  'conchar': '康查尔',
  'dismemberment_case': '碎尸案',
  'dr_reggie': '雷吉博士',
  'roger_beebe': '罗格·毕比',
  'arthur_dawson': '亚瑟·道森',
  'little_derek_wayne': '小德里克·维恩',
  'project': '青豆牡蛎汤计划',
  'julip': '黄油朱莉普',
  'family': '诡异家族',
  'maine': '缅因州',
  'small_bank': '小银行',
  'chicago': '芝加哥',
  'robert': '罗伯特',
  'asian_woman': '亚裔女性',
  'missing': '失踪',
  'father': '父亲',
  'twisted_relationship': '扭曲关系',
  'dirty_frank': '脏弗兰克酒吧',
  'morning': '莫宁',
  'ohio': '俄亥俄州',
  'ritual_case': '祭祀案',
  'headdress': '原住民头饰',
  'mojave_rest_stop': '莫哈韦休息站',
  'empty_cigarette_pack': '空烟盒',
  'aw_wilmo': '小A.W.威尔莫',
  'crime_route_map': '罗伯特·卡彭：犯罪路线',
  'blue_rv': '淡蓝色房车',
  'graywater_beacon': '灰水信标',
  'martha_diaz': '玛莎·迪亚兹',
  'julie': '朱莉',
  'the_mother': '母亲',
  'vanessa': '瓦妮莎',
  'silas': '塞勒斯',
  'cincinnati': '辛辛那提',
  'mint_plan': '薄荷计划',
  'burkesville': '伯克斯维尔',
  'klub75_report': 'KLUB-75号分析报告',
  'quantico': '匡提科',
  'kansas_city': '堪萨斯城',
  'mobile_blood_truck': '流动献血车',
  'jc_penney': '杰西·潘尼',
  'east_12th_st': '东12街',
  'execution_room': '行刑室',
  'john_morrissey': '约翰·莫里西',
  'chaos_aesthetics': '混乱美学',
  'st_louis': '圣路易斯',
  'maggots': '蛆虫',
  'davenport': '达文波特市',
  'peter_henderson': '皮特·亨德森',
  'recruitment': '招募',
  'texarkana': '特克萨卡纳',
  'priest': '牧师',
  'el_paso': '埃尔帕索',
  'new_plan': '新计划'
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
    revealedKeywords: ['maine', 'nibi', 'conchar', 'year_1971', 'small_bank', 'twisted_relationship'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "日子过去实在太久了。这些年我喝了这么多劣质波本，脑子早被搞坏了。所以即便我能记得起来的，大概也是我这几十年来为了不发疯，一遍遍讲给自己听的'故事'。\n\n到底是不是真的发生过的事情，我真不敢给你打包票。我只能说，那次潜伏任务（Deep Cover）的启动完全背离了局里的标准作业程序。\n\n如果我没记错的话，你说的缅因州的案子发生在1971年，是雷吉博士标记案件中的最新一起。总之通过一些退伍军人俱乐部的关系，行动组很快就锁定了逮捕一个名叫尼比的阿尔衮琴人，尼比对罪行供认不讳，很快就被审判收监。没过几天，他们也把我也放到监狱里，和他关在一起。",
        attitude: "",
        visual: "assets/incident-report.jpg"
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
        visual: "https://picsum.photos/seed/case_files/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "那时我们被关在汉弗莱监狱，以我当时的经验来说，那的狱警应该是整个缅因州最糟糕的，其中有个叫莫布利的警监……总之离开监狱后，康查尔靠着他从莫布利那套来的话，诱骗了他的婆娘。开着他那台雷鸟，我们跨越州界，沿海岸线一路抵达费城。\n\n一路上，康查尔还在吹嘘他的斑斑劣迹，但那时在我看来，这人小混混没有区别，我实在不知自己为什么还要跟着他，或许是公路旅行本身的魅力？或许是他同尼比的奇怪关系让'统一场论'还有一线机会？总之，我跟着康查尔来到了费城西边的脏弗兰克酒吧暂住，那地方非常脏乱，地板简直能黏住鞋底。总之在康查尔发誓永远也不会返回缅因州后，酒吧老板莫宁才同意帮忙处理赃车。",
        attitude: "",
        visual: "https://picsum.photos/seed/road_trip/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "你想要问的那个人，名叫伦德格兰。1968年冬天，犯案后的伦德格兰同几个愚蠢的追随者一起，藏进肯达尔湖附近的欢乐时光旅馆内。大约一周后，教主将教徒分为三波，要他们在一天内分别对周边郡县警署发动袭击，而他则趁着警力忙于彼此支援的时机，驾驶那辆蓝色福特费尔兰跨过州线，抵达了匹兹堡。\n\n是的，我曾在莫宁的报废车场见到了这辆汽车的残骸，在我同康查尔到那的时候，它还保持着能被辨认的形状。至于伦德格兰出逃柯特兰后的遭遇我从何而知的，那又是另一回事了。",
        attitude: "",
        visual: "https://picsum.photos/seed/car_graveyard/800/450"
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
        visual: "https://picsum.photos/seed/training_fac/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在得到这份工作之前，我只是个平平无奇的州警，档案在局里挂着号。因为执勤时“过度暴力”，我被停职并扔到了专门处理公职人员的精神康复部门。当时负责我的医生是雷吉博士的学生。他并没想推荐我，他只是把一批“脑子有问题”的警察档案交给了博士，而博士在那堆纸里挑中了我。\n\n直到训练结束的那个下午，在马场旁边的咖啡馆里，博士才告诉我原因。他说得很直白：其他人的行为偏差是创伤造成的，而我，是一个真正的疯子。\n\n听着，我清楚地记得他说这话时带着某种赞许，仿佛在宣布某种荣光。但在我听来，那更像是某种刺痛。那是这辈子第一次有人点破我的核心问题：我之所以当警察，就是为了避免让自己成为一个纯粹的混蛋。穿上制服，至少能让我在作恶的天性之外，还能对社会产生点正面作用。",
        attitude: "",
        visual: "https://picsum.photos/seed/med_file/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "所以我不知道该恨他还是谢他。他给了我这份新工作，让我能在当个彻头彻尾的混蛋之余，还能给社会带来更大的“帮助”。瞧，这话说出来他妈的有够讽刺。\n\n其实我知道你想问的是什么。\n\n父亲。\n\n对吗？关于这个，我无话可说。\n\n算了，可以给你说句实话。在受训期间，我有次甚至觉得，那个男人（父亲）在各方面都是雷吉博士的反面——准确地说，是好的那一面。\n\n太多年了，你想要的事情没有答案。这些年我反复做一个梦，梦到根本就没有什么“青豆牡蛎汤计划”，它真的只是内华达州本地的一道菜。除了豆子和牡蛎，你还需要在锅里放进胡萝卜、洋葱、蘑菇、月桂叶，最后倒进干雪利酒。\n\n那时候我从不喝雪利酒，我不知道自己为什么会做这样一个梦。",
        attitude: "",
        visual: "https://picsum.photos/seed/dream_soup/800/450"
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
        visual: "https://picsum.photos/seed/confession3/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "这件事让父亲失望了好一阵子。\n\n是的，父亲总是乐于在这些外人身上寻找那种熟悉的气味。在他看来，恶行是一种亲密的表达。所以，当 KLUB 表现出要把这案子归为辛迪加行动的迹象时，他反而认为这是一种荣耀。既然敌人想犯错，为什么要拦着他们？",
        attitude: "",
        visual: "https://picsum.photos/seed/father_disappointed/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "他们后来也不是没见过毕比，当然是在他入狱之后。不过，既然这人这辈子都出不来了，再纠结这些又有什么意义？",
        attitude: "",
        visual: "https://picsum.photos/seed/prison_visit/800/450"
      }
    },
    connectedTo: ["confession_2", "capone"]
  },
  {
    id: "confession_5",
    keyword: "confession",
    title: "供述 No.5",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 },
    revealedKeywords: ['little_derek_wayne'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "是啊，是啊。\n\n我是在电视上看到关于这个案子的消息的。那时候我们还在费城，在脏弗兰克酒吧的地下室里停留了大约两周。顺便一说，那可能是整个费城最冷最潮的房子了，我恨不得把毛毯粘在自己身上。\n\n康查尔说过要抓紧赶路，此时却长时间停在费城。他不准我问问题，只让莫宁弄来一台坏了半个音箱的电视机塞在床头，又从楼上迁下一台发报机。于是那段日子，我每天的任务就是躺在床上盯着雪花点看电视，就着那碗黏糊糊的、受潮的儿童麦片；而康查尔就坐在发报机前，对着那些滴滴答答的信号鼓捣个不停。",
        attitude: "",
        visual: "https://picsum.photos/seed/tv_static/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "要么是我在牢里错过了消息，要么就是这个案子的新闻封锁做得太绝了。直到大案告破、罪犯受审，才有犯罪学专家在电视节目里把它当成案例拿出来讲——讽刺的是，由于定性原因，它被包装成了一桩关于“保险诈骗”的案子。康查尔一边发报一边侧头看新闻，当专家表示赃款已全部追回并会用于维恩一家的丧葬费时，他突然大笑起来，笑得直咳嗽。\n\n我问他笑什么。他说，或许维恩一家在报纸上看起来是典型的美国中西部中产家庭，但那位小德里克·维恩先生，绝不是什么一般意义上的“一家之主”。当时我还想多掏点话，问他到底知道什么，问我们留在这儿是不是在等这个案子的结果。康查尔闭了嘴，不愿再说一个字，只是盯着屏幕喃喃自语：“每个人都得到了他们想要的，这就够了。”三天后，我们搭乘一辆散发着尿骚味的灰狗巴士离开了费城。直到现在我也不确定，那时候追兵是已经完成了搜捕，还是压根就没找对方向。",
        attitude: "",
        visual: "https://picsum.photos/seed/laughing_man/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "总之，直到两年后，我们抵达大盆地沙漠边缘，而我也已经彻底融入那个“家庭”的时候，康查尔才在某个守夜的凌晨再次提到了这件事。\n\n他说，小德里克·维恩继承了他父亲对派尤特族女性的那种病态着迷。即便这种偏执、小众的嗜好让他没法像那些高产的连环杀手一样维持“工作效率”，但这种独特性本身就足以引发报复——尤其是在风声走漏的情况下。那群人甚至在维恩犯下最后一桩案子仅三个月后就精准地锁定了地址。他们没杀他，而是当着他的面，对他家里人做了他曾经对那些女人做过的所有事。\n\n康查尔最后向我重申了父亲的教条：父亲憎恶过度伤害。他说，过度伤害导致掩护色失效只是其次；最重要的是，只有被高度约束的攻击性，才会孕育出真正的仪式。而那个过程，才是孕育艺术的唯一土壤。",
        attitude: "",
        visual: "https://picsum.photos/seed/desert_night/800/450"
      }
    },
    connectedTo: ["confession_4", "capone"]
  },
  {
    id: "confession_6",
    keyword: "confession",
    title: "供述 No.6",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.8 },
    revealedKeywords: ['roanoke', 'graywater_beacon'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "他们说我提交过几次单项汇报？两次，还是三次？\n\n实际情况是，单从1972年春天到年底，我就投放了超过10个所谓的‘灰水信标’——那是雷吉博士在训练时想出的方案。当时我们并不知道未来会面对什么，是去东部城市跟黑手党打交道，还是在爱荷华州的田野里同那些酿私酒的爱尔兰混蛋抢市场。因此，‘灰水信标’在最初只是备选方案之一。\n\n后来我登上了那辆房车，几乎每时每刻都与‘家人’待在一起。因为房车必须定期停靠加油、倾倒废物或补给，那些短暂的停留成了唯一的窗口期，‘灰水信标’也就此成了我唯一的汇报方式。",
        attitude: "",
        visual: "https://picsum.photos/seed/truck_stop/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "你抽过‘铁马’吗？亮橙色的烟盒，印着漂亮的火车头标。50年代时，它是全美卡车司机、工厂工人、建筑工和长途通勤者的首选。它比你抽过的任何烟草都更重，口感浓烈、直率、不妥协，毕竟它的烟草里混合了高比例的肯塔基白肋烟。\n\n好吧，我猜你大概没听说过这个牌子。哪怕是在70年代，也只有那些走不动道的老头子还会抽它了。游历全美的嬉皮士们更迷恋万宝路，而那些年长的司机从车上下来后，再也赶不了路了。这是我们约定选择‘铁马’作为信标载具的首要原因；其次，它独特的开盒设计为书写简讯留出了足够的空间。",
        attitude: "",
        visual: "https://picsum.photos/seed/cigarette_smoke/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "雷吉博士的构想似乎非常完满：我扔掉信标，他的‘清理小组’伪装成清洁工或流浪汉，在预定路线的加油站进行定点回收。可问题在于，他手里根本没有由专业人士组成的清理小组。据我所知，肯为他干这些苦活的，其实都是KLUB战略研究室里的实习生。你觉得那帮孩子能找到什么？反正他们一定漏掉了我在罗阿诺克市扔掉的第一个信标，否则威廉斯堡公园大道的案子早就该破了。\n\n总之，离开房车后，我就再没碰过那个牌子的烟。当时我极度憎恶它的味道，可现在……却莫名地有些怀念。所以别再提问了，去给我搞一包‘铁马’来。",
        attitude: "",
        visual: "assets/iron_horse_beacon.jpg"
      }
    },
    connectedTo: ["confession_5", "capone"]
  },
  {
    id: "confession_7",
    keyword: "confession",
    title: "供述 No.7",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 },
    revealedKeywords: ['roanoke', 'twisted_relationship'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我知道，你还是忘不了尼比，虽然他已经死了，哈哈。\n\n回想起来，其实这事也没什么不能理解的，群体的无序行为是如何收束在可控范围内的，其实靠的，便是这种靠本能构建的纽带，这完全符合雷吉博士的统一场论。但在那年那月，我对这些高深莫测的狗屁理论一无所知，我更无法想象，这些纽带在现实中竟是以血和精液作为粘合剂的。\n\n在缅因州服刑时，有个叫莫布利的警监，他是我见过最纯粹的杂碎。如果那混蛋当年没穿上那身狱警制服，我敢打赌他会成为那种被印在FBI通缉令头版的连环杀手。莫布利的暴力是单向的、为了折磨而折磨的排泄。但康查尔和尼比不同，尽管他们之间同样充斥着殴打、流血和那些让人反胃的凌虐，但那里面有一种极其扭曲的'张力'。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison_guard/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "你能理解吗？从试图彻底地占有、容纳对方，到用刀锋和指甲去撕裂、掐死对方，这种极端的情绪在他们之间形成了一个高压张力。在那个还没见过什么世面的我看来，那甚至比我听过的任何一种英雄史诗都要深刻。那不是犯罪，那是他们之间的一种'爱'，一种只有在深渊里才能生长的、带着腥味的爱。\n\n但我什么都不能问。因为尼比就是最初的线索，我不能在他嗝屁之后立刻展示出好奇心，那会让我彻底暴露。这是我当时的想法，但等我们来到罗阿诺克市的时候，我犯下了第一个错误，或者也可以说，我是在最正确的时候提出了这个问题。\n\n那是1972年的深秋，罗阿诺克弥漫着一股廉价机油和快要下雨的土腥味。在那个窄得转身都困难的廉价旅馆里，康查尔点了一支烟，却没抽，而是看着它自顾自地燃烧。他突然靠过来，离我极近，用几乎是耳语的声音对我说：'罗伯特，你一直在看尼比，对吧？你在想，是什么让他最后走得那么……平静。'\n\n他伸出一只手，轻轻扣住我的后脑勺，指甲陷进我的发根里，那是一种让人头皮发麻的控制力。'那是因为他死的时候，就知道他终于把自己交还给父亲了。'",
        attitude: "",
        visual: "https://picsum.photos/seed/motel_room/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我不知道那是怎么做到的。但在那瞬间，康查尔看我的眼神，透着一种让人无法拒绝的诱惑。在那之前，我从没想过我会对男人感兴趣，明白吗？他看着我，告诉我说，'罗伯特，我能从你眼里看到那个洞，那个属于疯子的、巨大的空洞。你想不想像尼比一样，把它填满？'如你所料，我没有推开他，相反，我像个溺水的人一样，问他我要怎么做，才能抵达那个世界。\n\n当一切结束之后，康查尔做的第一个动作是放开了我的头发，然后转过身，从那个散发着霉味的抽屉里翻出一把折叠刀。他没有递给我，而是当着我的面，用舌尖轻轻舔了一下冰冷的刀刃，眼神里闪过一种像小孩子看到心爱玩具时的光。\n\n我们穿过被雨水浸透的街道，半小时后，我们来到一家叫做'洁净人生'的自助洗衣店对面，当时店里的日光灯坏了一根，隔着被雨幕打湿的橱窗，那里的白光一闪一闪，像是一颗快要停止跳动的心脏。康查尔告诉我，里面那个有点臃肿的墨西哥女人名叫玛莎·迪亚兹。'看着，罗伯特。'康查尔声音轻得像是一片落叶，'别眨眼。'\n\n他推开车门，消失在雨幕里。我脑子里疯狂尖叫，我想冲出去，拦住他。但我动不了，我像被钉在了座位上，一种生理性的、卑微的渴求让我死死盯着那扇橱窗。康查尔推门进去了。玛莎抬起头，露出了一个那种深夜职员特有的、疲惫的礼貌笑容。她正准备开口说点什么，康查尔已经到了她身后。他伸出左手，动作几乎是温柔地绕过她的脖子，扣住了她的下巴，动作轻盈得像是在跳舞。\n\n玛莎还没来得及露出惊恐的表情，康查尔手中的折叠刀已经横着切过了她的喉咙。康查尔微微侧过头，确保玛莎能够看着他的眼睛。几分钟后，他松开手，玛莎顺着干衣机滑了下去。康查尔没有立刻离开，他站在那一摊缓缓扩散的红色跟前，从兜里掏出一条亮黄色的丝绸发带，动作优雅地把它系在玛莎垂死抽搐的手腕上，打上一个蝴蝶结。我看着玛莎的眼睛，这个原本每天要为了生活费发愁、为了肮脏床单劳作的平凡女人，现在已经变成一个无法被理解的'谜题'。\n\n康查尔回到车上时，身上带着一股好闻的雨水味和淡淡的血腥气。他发动了车子，把那把沾血的刀随手丢进我的怀里。他说，'收好它，这是个礼物。'",
        attitude: "",
        visual: "https://picsum.photos/seed/rain_window/800/450"
      }
    },
    connectedTo: ["confession_6", "capone"]
  },
  {
    id: "confession_8",
    keyword: "confession",
    title: "供述 No.8",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.85 },
    revealedKeywords: ['year_1973', 'julie', 'cincinnati', 'the_mother', 'vanessa', 'silas'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "1973 年的正月，辛辛那提的雪还没化透，空气冷得能把人的肺扎穿。在那儿，康查尔彻底撕掉了他伪装成'小混混'的最后一点皮。他在一个废弃的加油站发现了一个迷路的小女孩，大概只有五六岁。他没有动用暴力，而是微笑着把她带到了一间冷库里，把门锁死，只留下一个能看见里面的小窗。\n\n\"来吧罗伯特，我们做个游戏。\"康查尔对我说，\"你可以什么都不做，看着她在接下来的三小时里一点点被冻成冰块，或者，你可以用这把刀给她一个'解脱'。你自己选。\"\n\n我握刀站在窗前，听着可怜的朱莉在里面绝望地拍打门板。康查尔就坐在旁边的板凳上抽烟，悠闲得像是在等一班火车。我犹豫了很久，数次想用那把刀结果了康查尔，我甚至确定他早就准备好了我会这么做。但我其实明白，这看似是给我的测试，其实根本就是他自己的游戏，不管我接下来会做什么，他都会从这场游戏中获得快乐。\n\n最后，康查尔在女孩断气前一刻把她拖了出来，把她裹在一个旧毛毯里扔到警局门口。做完这一切，他看着我笑了半天。",
        attitude: "",
        visual: "https://picsum.photos/seed/cincinnati_winter/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "接下来，我们一路南下。好几天，他都在那台生锈的电波接收器前忙个不停。原本他确信，\"大部队\"已经跨过州界去了东海岸。可当我抵达路易斯维尔的那个河边码头时，我却忽然见到了那辆房车。在一块巨大的、肮脏的黑色防水布下面，在一片杂乱的废弃集装箱中间，我一眼就看到了它——那辆淡蓝色的房车。它像是一个不该出现在这里的深海生物，静静地停在泥泞的积水里，透着一种极其不祥的、梦境般的安静。\n\n推开车门的人是一个年纪较大的汉子，没有邪教头目的狂热外表，只穿着一件过时的格纹大衣，头发梳理得一丝不苟。老人越过康查尔，直勾勾地走向我。那一刻，我感觉自己像是一只被探照灯锁定的猎物。他伸出一只手，轻轻地、慈祥地抚摸着我的脸颊，然后露出了一抹足以让任何警察心脏停跳的微笑。\n\n\"你就是罗伯特，康查尔在电报里提到过你。为了迎接你，我们把计划延后了。路易斯维尔很冷，对吗？来，家里正温着汤。\"他说。",
        attitude: "",
        visual: "https://picsum.photos/seed/louisville_dock/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我走进那辆淡蓝色的车厢，第一次见到了其他人。母亲，次子塞勒斯和养女瓦妮莎。\n\n在那晚的昏暗灯光下，我看着塞勒斯肆无忌惮地把手伸进\"母亲\"的衣襟，而\"父亲\"则像一个完美的指挥家，微笑着注视着这一切，甚至还顺手理了理瓦妮莎那头略显凌乱的长发。我瞬间明白了，房车里没有任何伦理可谈，只有一种透过交配构建的秩序。无论如何，也是到稍后我才意识到，这种由乱伦堆砌的纽带，比其他关系要牢固一千倍。",
        attitude: "",
        visual: "https://picsum.photos/seed/blue_rv_interior/800/450"
      }
    },
    connectedTo: ["confession_7", "capone"]
  },
  {
    id: "confession_9",
    keyword: "confession",
    title: "供述 No.9",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.9 },
    revealedKeywords: ['year_1982', 'el_paso', 'juvell_chambers', 'year_1973', 'distant_relatives'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "「薄荷计划」？真可笑，匡提科那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样。他那套理论在华盛顿撞墙，是可以预料的，跟他迟早把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由。但你要觉得你能从我这堆腐烂的记忆里捞出什么证据来帮雷吉翻盘，那你比索恩还要天真。",
        attitude: "",
        visual: "https://picsum.photos/seed/mint_plan/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在费城、辛辛那提，还有路易斯维尔，我曾像个守时的闹钟一样向外投放信标。直到1982年的深秋，在德克萨斯州的埃尔帕索，我走下那辆沾满泥土和焦油的蓝色房车，避开赛勒斯那双秃鹫似的眼睛，在加油站那口散发着陈腐机油味和咸湿雨水的排水沟旁从袖口滑出烟盒。站在那个只剩半个霓虹灯招牌的加油站里，我依然在重复这个动作。其实我心里就清楚：这些东西永远不会再被回收了。\n\n一个小时，或者一天后，会有一个拖着满身酸腐臭味的流浪汉经过这里。他会蹲下身，用那双塞满污垢的手捡起烟盒。他会拆开它。在烟盒内侧，我用缩写码密密麻麻地记录着「家族」的移动轨迹，以及那些被称为「远亲」的人群是如何在深夜钻进房车同父亲密谋。\n\n你可以说这些明明是足以让整个美国治安秩序震颤、让联邦调查局重新改写通缉名单的情报，但对这个流浪汉来说，他们甚至不如烟盒里剩的半根烟有意义。他会啐一口痰，随手把这卷珍贵的纸片塞进破烂的靴子里垫脚，或是用来引火。\n\n到了后来，我甚至分不清自己这种执着到底是为了什么。也许，我在期望着自己被「父亲」发现。我甚至幻想着他会捡起这些信标，微笑着对我说：\"罗伯特，你的功课做得真仔细。\" 又或者，我只是在为流浪汉们编织一个可供遐想的故事。让他们在寒冷的夜晚盯着火堆发呆时，能从那堆冒着微弱热气的、写满密码的废纸里，感受到一种不真实的戏剧感。",
        attitude: "",
        visual: "https://picsum.photos/seed/el_paso_1982/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "去他妈的「薄荷计划」吧，我来跟你讲讲什么才叫真正的计划。这个计划叫做「灵魂厨房」，众所周知，当时整个俄亥俄都被黑人运动笼罩着，到1973年，辛辛那提的种族张力更是紧绷到了极限，于是父亲在几个月前就开始布局，让几名「远亲」频繁出没于市中心运钞车中转站附近。他们穿着那个时代激进组织的标志性黑夹克，手里拿着模仿「黑豹党」的政治传单，甚至故意在监控死角留下几个潦草的激进口号。\n\n然后，在一周后，四个人，黑夹克，散弹枪，满口的激进派俚语。他们冲进运钞车中转站，在尖叫声中故意掉落了一枚刻着图纹的宗教指环——那玩意儿是塞勒斯找来的诱饵。当警察正忙着突袭黑人社区，在贫民窟里翻个底朝天时，房车已经离开辛辛那提，回到了路易斯维尔的地界上。以路易斯维尔为轴，「灵魂厨房」又在莱克辛顿和纳什维尔复制了几次。纳什维尔那次，父亲甚至专门制作传单并成功引发大规模种族冲突，然后趁乱狠狠赚了一笔——不，我说的当然不是钱，是警枪。一个黑人警察因此背了锅，可怜的朱维尔·钱伯斯，但你猜怎么着，很快朱维尔就被父亲招募，成为「远亲」的一份子。\n\n与此同时呢，FBI的臭狗屎们又在做什么？致力于把自己人关进精神病院，这就是他们在做的。",
        attitude: "",
        visual: "https://picsum.photos/seed/soul_kitchen_1973/800/450"
      }
    },
    connectedTo: ["confession_8", "capone"]
  },
  {
    id: "confession_10",
    keyword: "confession",
    title: "供述 No.10",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.95 },
    revealedKeywords: ['year_1973', 'boris_smirnov'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "伯克斯维尔……你居然在地图上找到了这个地方？\n\n我记得就是在伯克斯维尔那个满是泥泞的伐木场里，我第一次真正理解了家族的组织关系。",
        attitude: "",
        visual: "https://picsum.photos/seed/burkesville_lumber/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "那辆淡蓝色的房车不仅仅是个交通工具，它也是一个在公路上移动的培养皿。你很难想象「远亲」的渗透情况，他们像真菌一样寄生在全美的物流网络、深夜调度站和像伯克斯维尔这样的镇子里。父亲的招募方法原始且高效，他先用暴力把人的自尊踩得粉碎，再让「母亲」出面——用她那种带着止咳糖浆味和绝望气息的怀抱，把这些碎片重新粘起来。这种\"先拆解再重塑\"的流程，制造出了一种基于生理依赖的共犯结构，比你们那纸脆弱的雇佣合同要稳固得多。\n\n刚钻进那辆车的时候，我以为自己能保持清醒，但很快我就发现那是一口正在发酵的深井。我不愿承认，但「母亲」身上就是有一种极度危险的引力，那种摄人心魄的虚弱感是在诱惑你一起放弃抵抗，是她一寸寸剥掉了我身上的死皮，让我觉得在那堆烂肉里沉沦才是唯一的真实。而另外两个男人，则构成了那座监狱的墙壁。\n\n康查尔很少不动手，但总是用一种看某种低等生物的眼神看着我，仿佛在嘲笑我那点可怜的道德坚持是多么滑稽。他的压迫感来自智力层面，他让你觉得自己是个蠢货，让你觉得坚持原则是一种智力缺陷。赛勒斯则是那把悬在头顶的铡刀。我也许能避开康查尔的嘲讽，但避不开赛勒斯。他就像一头随时会失控的野兽，只要我表现出一丁点\"不合群\"，他就会毫不犹豫地把我变成一具需要处理的尸体。",
        attitude: "",
        visual: "https://picsum.photos/seed/blue_rv_family/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "无论如何，最开始的大半年里，我几乎什么都不用做，仅在事情发生的时候替他们做些掩护性工作，这种日子一直持续到 1973年底。那是一个深夜，房车停在莱克辛顿一处调度站修整，而我则像个还在坚持打卡的幽灵一样，把又一枚灰水信标踢进了排水沟，那时候我还没有完全放弃，但也不那么期待有人真的回收它。我做完这一切，回到了车上，父亲并不知道我刚刚干了什么。他正同一个名叫鲍里斯·斯米尔诺夫的远亲坐在折叠桌旁，心情看起来好极了。\n\n\"罗伯特，别再想那些粗糙的抢劫了，你是时候拥有自己的作品了。\"他的语气就像是在给刚成年的儿子递上一把车钥匙，\"我要你为伯克斯维尔的远亲们设计一个好玩的计划，把那些警察耍得团团转。来吧，让我们看看你能干点什么。\"",
        attitude: "",
        visual: "https://picsum.photos/seed/boris_smirnov_1973/800/450"
      }
    },
    connectedTo: ["confession_9", "capone"]
  },
  {
    id: "confession_11",
    keyword: "confession",
    title: "供述 No.11",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.85, y: window.innerHeight * 0.9 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "让我理一理阿尔特曼的逻辑，好吗？\n\n首先，他宣称鲍里斯是个喝多了的乡巴佬，那些关于\"家族\"和\"远亲\"的供述全是精神错乱的胡话。他信誓旦旦地告诉华盛顿，根本不存在什么严密的地下网络，一切都是雷吉博士臆想出来的伪科学。但马上——哈！看这儿——他却在发抖。他担心我，担心这只早已失联的\"地鼠\"，正在利用他在匡提科学到的战术，指导这群\"不存在的乡巴佬\"去羞辱警方。\n\n一方面，我是个已经殉职的死人，而\"家族\"是一群乌合之众；另一方面，我这个死人却正在指挥这群乌合之众，不仅渗透了警方的防线，还让他不得不切断 KLUB 的所有回收线路来保住自己的乌纱帽。\n\n我得谢谢你给我看这个。真的，这让我心里的最后一点愧疚感也彻底烟消云散了。",
        attitude: "",
        visual: "https://picsum.photos/seed/alterman_memo/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "因为就在阿尔特曼忙着写这份报告的时候，我也在做更有价值的事情。既然他觉得我是在利用 FBI 的战术指导犯罪，那我怎么能让他失望呢？\n\n我设计的第二个项目，叫做「静态雪花计划」。不，没人去抢银行，也没有制造爆炸。我们找上了辛西娅·米勒，她是纳什维尔附近教会唱诗班的领唱，有着一头金发 and 所有人都会喜欢的甜美笑容，典型的\"美国甜心\"。这种人的失踪会让方圆两百英里的警察和媒体像疯狗一样扑上来。\"母亲\"保持着每周日前往教堂的习惯，是她为我们选中了辛西娅。\n\n不，我们完全不需要绑架她。在母亲的介绍下，「远亲」里的几个年轻人去接近她，他们告诉她，此时有一部地下电影正在筹拍，他们认为她就是那个当之无愧的主角。然后他们把她带到伯克斯维尔一个汽车旅馆里——在那我已经架好了摄像机。没有复杂的道具，只有她，一把椅子，和一台甚至收不到信号的老式电视机。\n\n我让她坐在那儿，对着那个只有雪花杂讯的屏幕。我指导她的表情，教她如何呈现出那种\"接收到神谕\"般的恍惚。我告诉她，这不是犯罪，这是一场前卫的行为艺术，我们要通过这些雪花，向世界传递一种只有神选者才能听懂的频率。",
        attitude: "",
        visual: "https://picsum.photos/seed/static_snow_filming/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "在LSD的作用下，当她对着镜头，用那种梦呓般的声音念出我写的台词时，就在那一刻，我高潮了。那不是以前抓捕犯人时的紧张感。那是一种……创造的快感。我看着取景框里的她，意识到我正在剥夺她的社会属性。想想吧，当警察破门而入，发现房间里只有这台电视机在一片死寂中不知疲倦地播放着录像，媒体会发疯，他们会把这称为\"电视邪教\"，家长们会恐慌。而FBI呢，他们会把本来用于追踪绑架案的黄金48小时，浪费在研究我的对白和那个根本不存在的\"信号频率\"上。\n\n事成之后，我们带走了辛西娅，她被运往西部的分部，成为新的\"远亲\"，或者被塞勒斯处理掉，这取决于她是否听话。在她最后出现的旅馆房间里，我们只留下一样东西：那台还在播放雪花杂讯的电视机，循环播放那盘录像带。想象这样一个画面吧，当警察冲进房间，他们看不到搏斗痕迹，看不到血迹。他们只会看到甜美的辛西娅在电视里喝着一碗恶心的汤，宣称自己去了\"信号的另一端\"。\n\n我没有拿走一分钱，但我偷走了所有人的安全感。就在那一刻我真正理解了父亲。这与生存无关，也不是为了钱。这就是纯粹变态但也极致的乐趣——看着现实世界的秩序因为你制造的一个微小\"故障\"而彻底卡死，这是件多么有趣的事情！",
        attitude: "",
        visual: "https://picsum.photos/seed/static_snow_tv/800/450"
      }
    },
    connectedTo: ["confession_10", "capone"]
  },
  {
    id: "confession_12",
    keyword: "confession",
    title: "供述 No.12",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.95 },
    revealedKeywords: ['jc_penney'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "好吧，你赢了。\n\n你比阿尔特曼那帮蠢货看得更远，我懒得再把你当敌人防着了。听着，我没疯，我知道我在做什么，我也知道你想问什么——“为什么不抓捕他们？”是的，那是1976年。从法律层面上讲，我有无数次机会。那时候，除了康查尔偶尔手里不干不净之外，“父亲”也好，那个女人也好，他们的手在某种意义上甚至是“干净”的。他们没有亲自抢过银行，没有亲自扣动过扳机。\n\n我当然可以联络堪萨斯城的风化组，告诉他们有一辆房车里在搞乱伦、毒品和未成年淫乱。警察会冲进来，给他们戴上手铐。然后呢？“父亲”会请个好律师，把这变成一场关于宗教自由和生活方式的辩论，顶多交点罚款，或者在看守所待个把月。而真正的威胁——那些遍布全美物流网的、像真菌一样的远亲会瞬间蛰伏起来。我还没摸清他们的规模，还没拿到那份名单。抓了那个老头子，就像是砍掉九头蛇的一个头，毫无意义。\n\n所以，我必须喂饱他们。我必须让这辆车继续开下去，直到他们犯下连“父亲”都无法洗脱的重罪。",
        attitude: "",
        visual: "https://picsum.photos/seed/kansas_city_1976/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "我给他们设计了一个新的剧本。这一次的目标不是钱，是恐慌。我想出的点子是流动献血车这一次，我想给这座城市一点纯粹的“困惑”。我想出的点子是流动献血车（Bloodmobile）。计划极度荒谬，甚至没有任何经济利益。我让几名身为卡车司机的“远亲”在午休时间劫持了一辆停在广场上的大型采血车。我们没有伤害里面的护士和医生，只是把他们极其礼貌地请了下去，并未给他们买了咖啡。然后，我们开始了表演。\n\n我们从一家杰西·潘尼的百货商店里偷来二十个塑料服装模特。我们将这些永远带着僵硬微笑的塑料假人搬上采血车，把它们按在献血椅上。然后，我们将那些粗大的采血针头狠狠地扎进它们坚硬的塑料手臂里。接下来的部分是我的杰作：我们将采血机的“输入端”反接到了一个巨大的加压罐上，里面装满了稀释的红色油漆。当警察和媒体赶到时，他们看到的不是屠杀，而是一幅超现实的画作：二十个衣着光鲜的塑料假人，正安静地坐在献血椅上，红色的油漆顺着管子被强行泵入它们空心的身体，直到从它们的眼眶、嘴巴和关节缝隙里溢出来，滴滴答答地流满了整个车厢的地板。\n\n听完计划，赛勒斯很兴奋，他坚持要参与。那个疯子厌倦了只当搬运工。他看着满车的假人，眼睛里闪着光。他说这些假人坐得“太端正了”。于是他走过去，亲手把每一个假人的头都扭到了背后，把它们的四肢折断成人无法做到的角度。当油漆开始流动时，赛勒斯坐在那堆扭曲的塑料尸体中间，大笑着模仿那些假人的表情。",
        attitude: "",
        visual: "https://picsum.photos/seed/bloodmobile/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "不过……你是怎么知道瓦妮莎的？\n\n在这之前，我以为她只是个没脑子的玩物。但在堪萨斯城行动的前夜，也就是我在图纸上画 those 输油管路的时候，瓦妮莎找到了我。她没穿那身平时为了取悦“父亲”而穿的蕾丝睡衣，而是披着一件不合身的男式夹克——那是我的夹克。她在那逼仄的过道里堵住我。\n\n她的手很冷，指甲油依然是剥落的，但眼神里没有那种浑浊的药瘾劲儿。“别干这个，罗伯特。”她对我说，声音抖得厉害，“你可以骗他们，甚至可以骗你自己你在执行任务。但我看得到你在笑。当你画那些图纸的时候……你比赛勒斯更像个怪物。”\n\n而我当时在想的是什么呢？我想的是，少他妈多管闲事，这个计划根本不会伤害任何人——更何况，总有一天我会把你们全都抓进监狱的。",
        attitude: "",
        visual: "https://picsum.photos/seed/vanessa_warning/800/450"
      }
    },
    connectedTo: ["confession_11", "capone", "vanessa"]
  },
  {
    id: "confession_13",
    keyword: "confession",
    title: "供述 No.13",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.85 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "当然知道。\n\n那时候，电视新闻里正在铺天盖地地报道杰西·潘尼被捕的消息。有天早上，我坐在折叠桌旁，看着屏幕上那个被反铐着按进警车的胖子，心里充满了挫败感。我精心设计的荒诞剧，居然成了堪萨斯警局用来邀功的垫脚石。\n\n但父亲的反应完全不同。他当时正坐在我对面，手里依然拿着那把用了很多年的水果刀，在这个充满了机油味的早晨，他正在极其耐心地削着一个苹果。苹果皮连成一条不断的红线，从他指尖垂下来。\n\n“别丧气，罗伯特。”他突然开口，眼睛甚至没有离开那个苹果，“你看起来像个考砸了的小学生。”我说，他们利用了我们要抓那个胖子。父亲停下了刀，“你以为那是谁？罗伯特。那个自称杰西·潘尼的人，真名叫约翰·莫里西。他是这一带最大的‘肉贩子’。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "“那个爱尔兰杂种在堪萨斯盘踞了十年。”父亲咬了一口苹果，咀嚼的声音在安静的车厢里格外清晰，“他是个粗鲁的屠夫，毫无美感。他把人拆碎了卖，就像卖猪肉一样。我曾经试图……感化他，让他明白规矩，但他太傲慢了。”\n\n“而你，我的孩子。你只是为了好玩，画了一幅画，摆了几个塑料人偶……你就做到了联邦政府十年都做不到的事。你不需要搜查令，不需要证据，你只是制造了一点点混乱，就让那一整座坚固的堡垒从内部塌陷了。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "他把那把水果刀插在桌面上，刀尖指着报纸上莫里西那张惊恐的脸。“这就是混乱的美妙之处，罗伯特。你不需要瞄准。当你制造的风暴足够大时，雷电自然会击中那些该死的树。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_core/800/450"
      }
    },
    connectedTo: ["confession_12", "capone"]
  },
  {
    id: "confession_14",
    keyword: "confession",
    title: "供述 No.14",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.85 },
    revealedKeywords: ['davenport', 'new_plan'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你是怎么知道这件事的？\n\n是的，那才是圣路易斯之夜真正的庆功宴。虽然我在外面搞了一场轰轰烈烈的达达主义荒诞剧，用红油漆和假人嘲弄了整个警察局，但在那辆淡蓝色的房车里，发生的是另一种更古老、更令人作呕的仪式。在我们将油漆泵接入采血车之前，\"母亲\"让赛勒斯清空了车上的冷藏柜，把那几十袋刚刚采集的血浆放了进去。\n\n当任务结束之后，我们驱车前往圣路易斯，落地休整的当晚，在那逼仄的后车厢里，在那张铺着褪色碎花床单的折叠床上……我不想描述细节。我只能说，那不是人类的性爱。父亲像个干枯的帝王一样躺在那里，而\"母亲\"……她剪开了那些血袋。那股浓烈的、带着生鲜铁锈味的腥气瞬间炸开，盖过了车厢里常年弥漫的止咳糖浆味和老人味。他们在血泊中纠缠，发出那种黏腻的、令人毛骨悚然的水声——那是肉体与肉体在半凝固的液体中摩擦时发出的声音，就像是两个软体动物在泥沼里翻滚。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "\"母亲\"变得力大无穷，那个平日里总是带着绝望气息的虚弱女人不见了，取而代之的是一头尝到了腥味的母兽。她用沾满鲜血的手疯狂涂抹父亲那张满是皱纹的脸，把血浆强行灌进他的皱纹、他的嘴唇、他松弛的眼袋里。她在尖叫，在喘息，仿佛那些从陌生人身……那一刻我站在门缝外，看着这一幕，我第一次没有感到恐惧，而是感到了一种……\n\n怎么说呢。我一直觉得母亲和父亲之间有条特殊的纽带，那是某种默契，他们彼此相互信任，几乎很少说话，除这次之外，我甚至很少见到他们有过肢体接触，但我隐隐觉得，这两人无法没有彼此。就像是某种连体生物被强行剥离后的两半。父亲是那个冷酷的、只有骨骼和逻辑的'大脑'，而母亲则是包裹着他的、潮湿且充满病态欲望的'血肉'。平日里，他们靠眼神交换指令，仿佛共享着同一套神经系统。父亲负责用暴力把猎物敲骨吸髓，母亲负责用温柔把残渣消化殆尽。在那晚的血泊中，我终于看清了这种共生的本质，他们似乎想通过鲜血作为粘合剂而重新融合，变回那个完整的、不可名状的怪物。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "等等。这不对。\n\n那晚房车停在荒郊野外。虽然林子里潜伏着其他远亲，但窗帘被拉得密不透风。康查尔当时不在，他带着新计划去了达文波特。瓦妮莎把自己反锁在厕所里，而赛勒斯……那疯子整张脸都贴在后窗上，仿佛想用牙齿咬碎玻璃加入他们，但他没能得逞，只是留下了一整面窗的唾液和体液。所以我大概是唯一目睹过这一切的人。\n\n你又是怎么知道的？",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_core/800/450"
      }
    },
    connectedTo: ["confession_13", "capone"]
  },
  {
    id: "confession_15",
    keyword: "confession",
    title: "供述 No.15",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.2 },
    revealedKeywords: ['year_1976', 'peter_henderson'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "达文波特。\n\n那是康查尔的杰作。那一周，“父亲”因为过量吸食那种混合了血液的药剂而陷入昏睡，所以我留下来看守房车。康查尔带着几个想在“家族”里晋升的“远亲”去了爱荷华州的达文波特。我不在现场。感谢上帝，我不在现场。\n\n关于那栋房子里发生的事，后来在“远亲”的圈子里变成了传说。那些跟着康查尔回来的年轻人，以前都是杀人不眨眼的暴徒，但那天晚上回来时，他们却像受惊的鹌鹑一样发抖，甚至不敢直视康查尔的眼睛。他随机选中了郊区的一户中产家庭——亨德森一家。男主人皮特·亨德森是个教数学的高中老师，一家四口过着那种令人厌烦的规律生活。周五的晚上，康查尔带着人闯进去，没有大喊大叫，而是像客人一样坐在餐桌旁。因为他知道，他拥有一整个周末的时间。\n\n他给这家人制定了规则：生活必须继续。据那些“远亲”描述，康查尔强迫这家人在接下来的两天里，必须严格按照时间表吃饭、睡觉、看电视。唯一的区别是，如果谁露出了一丁点恐惧，他就会用刀切掉另一个人的一节手指。“太有意思了，”康查尔微笑着告诉我，“亨德森一家绝对堪称某种人类学典范。他们一家人训练有素，孩子不哭不闹，大人连眉头都不皱一下。这让我觉得，这个计划的确颇值一搞。”\n\n从一开始，康查尔的马仔就搜出了亨德森家中的财务，但他们只是把它放置在餐桌正中心，从没正眼看过这些东西，直到周日的晚上，当晚饭结束后，康查尔用餐巾擦干净嘴，赞美了食物之后下达了他的最后通牒，他说别担心，这个令人厌烦的游戏马上就会结束，如果一家人通过最后这关，他们便会带着餐桌上的财物离开，至此亨德森一家遭遇的，便只是一桩普通的入室抢劫案件了。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "他说完，马仔递来一支左轮手枪，康查尔往其中塞入一颗子弹，拨动转轮，然后连开数枪直到子弹射到墙里。接着他又往弹夹里塞进一颗子弹。然后告诉男主人，说这就是这场考试的最后一道题了。现在枪里只有一颗子弹，六分之一的概率。由他持枪，分别瞄准三位家人射击，直到子弹打出。一旦子弹打出，游戏结束，他们会带着财务撤离，现场会被伪装成入室抢劫，行凶者可以归罪到抢劫者身上，没人知道他们经历过这些。但如果男主选择持枪自杀或袭击其他人，那他们便会抹除他们存在的痕迹，然后所有人都会死，“不仅如此，”康查尔坏笑着说，“当天早些时候，我们从他身上‘强制采集’了样本。所以即便他像个英雄一样死了，警方也会在他小女儿的体内提取到这些样本。他会作为芝加哥历史上最恶心的乱伦强奸犯和屠夫被载入史册。”\n\n“罗伯特，那本是一个完美的命题。”康查尔感叹道，像是在评价一道精美的数学题，“我把‘名誉’和‘负罪感’放在了天平的两端。我本以为我会看到一个凡人在绝对的社会性死亡威胁下，是如何为了保全那个虚假的‘清白’而把自己变成野兽的。但那个数学老师……”\n\n康查尔告诉我，当空气凝固，那把只有一颗子弹的枪躺在桌上时，亨德森没有崩溃，也没有求饶。他拿起了枪，但没有对准任何人。众目睽睽之下，他做了一个康查尔完全无法理解的动作。他打开了转轮，把那颗唯一的子弹倒了出来。\n\n子弹滚落在地。亨德森把空枪像垃圾一样扔到了康查尔脚边。“他看着我，罗伯特。那种眼神里没有恐惧。”康查尔歪了歪头，似乎至今仍在试图解析那个眼神，“他说如果我想毁了他的名声，那就请便。但他不会因为恐惧而变成怪物。然后，他做了一件更不可理喻的事。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "康查尔描述说，男主人转过身，背对着黑洞洞的枪口。他蹲下来，用那双颤抖的大手捂住了那个吓得失禁的小女儿的耳朵，把她的脸埋进自己怀里。那个即将身败名裂的父亲，在死前的最后几秒，温柔地对家人说：“别看他，看着我。宝贝，看着爸爸。不管明天报纸上怎么写，不管警察怎么说……在这最后一刻，你知道爸爸是爱你的，对吗？你知道爸爸没有把枪口对准你，对吗？”康查尔说，在那女孩拼命点头的时候，亨德森抬起头，而像是在宣告某种胜利。说到这里，康查尔突然笑了一声，那笑声里带着一丝从未有过的挫败感。\n\n你知道吗？就在听着康查尔描述的那一瞬间，我就从那种漫长的麻木中惊醒了。哪怕手里没有警徽，我也重新记起了我究竟是谁，记起了我为什么会在这辆该死的车上，以及……为了结束这一切，我到底该做什么了。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["confession_14", "capone"]
  },
  {
    id: "confession_16",
    keyword: "confession",
    title: "供述 No.16",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
    revealedKeywords: ['arthur_dawson'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "关于1967年的特克萨卡纳碎尸案，我在“家族”里听过至少三个版本。有人说那个叫亚瑟的人是FBI的线人，被父亲识破后切碎了喂狗；有人说他试图偷走父亲的积蓄私奔。而康查尔则会用轻蔑的语气，说亚瑟是个“缺乏想象力的会计”，死于平庸。\n\n无论如何，原本我根本不应该知道存在着这样一个人。那是我们离开芝加哥，一路向北抵达威斯康辛州之前的某一天，房车在路边抛锚了。康查尔那个洁癖鬼当然不会碰油污，赛勒斯那个蠢货只会用蛮力砸。于是，“父亲”指了指我，让我钻下去看看。我躺在滑板上，滑进了阴影之中。回想起来，我仿佛还能闻到机油味、铁锈味，还有路面上被碾碎的动物尸体的味道，总之，就在检查支架的时候，我发现了一处不自然的凸起。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "那里的防锈漆颜色不对，比周围要新一些，但也被泥浆覆盖了很多年。我用扳手敲了敲。空心的。我屏住呼吸，用随身携带的瑞士军刀撬开了那块锈蚀的铁皮，一个东西随即落下，被我悄然接住。我回头看了一眼，赛勒斯的一双大脚就在两米外的路边来回踱步，康查尔正在和“父亲”讨论接下来的路线，似乎没人察觉到我的发现。\n\n昏暗的光线下，眼前之物被几层厚厚的油布紧紧裹，像一具迷你木乃伊。我撕开油布，这是一个黑色皮面的笔记本，扉页上写，“赠予我的亚瑟，家族的荣耀”。就在这时，我头顶的底板突然发出了“吱呀”一声巨响。我能认出，这是父亲的脚步声，此刻他就站在我正上方的地板上。灰尘随着他的脚步震动，簌簌地落在我的脸上。“罗伯特！还没修好吗？”康查尔的声音从外面传来。\n\n我把油布包塞进满是油污的工装裤内层，贴着我的肚皮。“马上就好。”我朝外边大喊。\n\n那晚，房车停在威斯康星州一片枯死的玉米地旁。其他人围着篝火分食罐头，而瓦妮莎则独自坐在车尾发呆，我走过去，没有寒暄，只是在点烟瞬间，冷不丁问了一句，“亚瑟是谁？”瓦妮莎的手猛地一抖，抬头问，“你……你怎么知道的。”\n\n“我在修车时看到的名字，刻在大梁上。”我撒谎时连心跳都没变。瓦妮莎没有质疑，他告诉我，他是父亲的养子，塞勒斯之前的记路人，但他已经死了，那时候她还小，并不知道发生了什么。\n\n“谁在提亚瑟？那个亚瑟·道森的亚瑟？”康查尔不知何时已经站在了阴影里，手里端着一杯冒着热气的咖啡。瓦妮莎缩成一团，绝望地看向我。我吐出一口烟圈，说是她在那自言自语，念叨着什么亚瑟，搞得我心里发毛，这才顺口问了一句。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "瓦妮莎张大了嘴，但她不敢反驳。康查尔厌恶地瞥了她一眼：“去把地板擦干净。如果再让我听到那个名字，你就去外面睡。”\n\n由此，我撬开了康查尔的嘴，从他和其他人嘴里我得到了一些说法，并且全程装作不在意。直到所有人都睡去，只剩我一人放哨时，我才把笔记本拿出来，就着篝火查看其中内容。\n\n亚瑟的笔记工整而刻板，列出了日期、城市、代号。此人显然是个强迫症患者，他在试图做一件这辆车上从未有人做过的事——建档。亚瑟记录了“父亲”口中那些散落在全美的“远亲”据点，什么“底特律收割者”、“新奥尔良药剂师”、“西雅图守夜人”……宛如一个庞大的地下恐怖网络，如果FBI拿到这个笔记本，那统一场论便无可疑。可奇怪的是，到了笔记后半部分，工整刻板的记录风格却完全变了，整洁的表格被粗暴的红色马克笔涂抹，很多地方都画上了问号，就像是亚瑟在质疑这些联络人是否真的存在一样。\n\n我不禁想到一种可能性……如果亚瑟是对的呢？整个社会处于一种“遍地是杀手”的集体癔症中，信息闭塞，恐惧却四通八达。而“父亲”，这个瘫痪在房车里的老头，敏锐地嗅到了这股时代的尸臭味。康查尔之所以死心塌地，是因为他以为自己在为一个庞大的、遍布全美的地下哲学帝国服务；瓦妮莎之所以不敢逃跑，是因为她相信无论她逃到哪里，总有一个受“父亲”指挥的“远亲”在盯着她。\n\n亚瑟死于试图拆穿谎言。连我……我是不是正在走进一个专门为我编织的更巨大的谎言里？这本笔记是我唯一的证据，而我最后一次见到它是在北达科他州的法戈市。在那场混乱的暴风雪中我遭遇了一些情况，它被永远地遗失在了冰原里。\n\n或许，是这辆车在保护它最后的秘密。",
        attitude: "",
        visual: "assets/record_of_accounts.jpg"
      }
    },
    connectedTo: ["confession_14", "capone"]
  }
];

export type HierarchyRole = 'BOSS' | 'UNDERBOSS' | 'LIEUTENANT' | 'SOLDIER' | 'ASSOCIATE' | 'HANDLER' | 'AGENT';

export interface SyndicateMember {
  id: string; // matches unlockedPeople ID
  name: string; // Display Name
  role: HierarchyRole;
  parentId?: string; // Who they report to (for drawing lines)
  position: { x: number, y: number }; // Relative percentage on board (0-100)
  status: 'ACTIVE' | 'DECEASED' | 'ARRESTED' | 'MISSING'; // Stamp on photo
  phase: 1 | 2; // 1 = Syndicate, 2 = FBI Twist
  description: string; // Chalk note
}

export const RELATIONSHIP_TREE: SyndicateMember[] = [
  // --- BOSS ---
  {
    id: 'father',
    name: 'FATHER',
    role: 'BOSS',
    position: { x: 50, y: 10 },
    status: 'ACTIVE',
    phase: 1,
    description: 'The Patriarch'
  },
  // --- LIEUTENANTS ---
  {
    id: 'conchar',
    name: 'CONCHAR',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 25, y: 40 },
    status: 'MISSING',
    phase: 1,
    description: 'Eldest Son / Enforcer'
  },
  {
    id: 'luciano',
    name: 'LUCIANO',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 50, y: 40 },
    status: 'DECEASED',
    phase: 1,
    description: 'Finance / Distribution'
  },
  {
    id: 'lundgren',
    name: 'LUNDGREN',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 75, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Cult Leader'
  },
  // --- SOLDIERS / ASSOCIATES ---
  {
    id: 'nibi',
    name: 'NIBI',
    role: 'SOLDIER',
    parentId: 'conchar',
    position: { x: 25, y: 70 },
    status: 'DECEASED',
    phase: 1,
    description: 'The Scapegoat? (1971)'
  },
  {
    id: 'morning',
    name: 'MORNING',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 38, y: 65 }, // Slightly offset
    status: 'ACTIVE',
    phase: 1,
    description: 'Bar owner / Fence'
  },
  {
    id: 'roger_beebe',
    name: 'ROGER BEEBE',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 75, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Confessed to 1968 crimes'
  },
  {
    id: 'little_derek_wayne',
    name: 'DEREK WAYNE JR.',
    role: 'ASSOCIATE',
    parentId: 'father', // Linked to Father due to "inherited obsession"? Or Conchar who talks about him? Let's link to Father for now as a "Fellow Deviant" or Conchar. Conchar talks about him.
    position: { x: 80, y: 30 },
    status: 'DECEASED',
    phase: 1,
    description: 'Family Massacre Victim'
  },
  // --- PROTAGONIST (The Twist) ---
  // Initially shown as associate/unknown, then revealed as FBI Agent
  {
    id: 'capone',
    name: 'R. CAPONE',
    role: 'ASSOCIATE',
    parentId: 'conchar', // Initially linked to Conchar as "Partner"
    position: { x: 15, y: 55 },
    status: 'MISSING',
    phase: 1,
    description: 'Deep Cover / "Orphan"'
  },
  // --- FBI / PHASE 2 REVEAL ---
  {
    id: 'dr_reggie',
    name: 'DR. REGGIE',
    role: 'HANDLER',
    // In Phase 2, this Node will appear. We might need logic to change Capone's parent.
    // For now, let's place him isolated or top left.
    position: { x: 10, y: 10 },
    status: 'ACTIVE',
    phase: 2,
    description: 'Handler / Architect?'
  },
  {
    id: 'jc_penney',
    name: 'JC PENNEY',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 90, y: 60 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Department Store / Target'
  },
  {
    id: 'martha_diaz',
    name: 'MARTHA DIAZ',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 80, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Laundromat Victim'
  },
  {
    id: 'julie',
    name: 'JULIE',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 60, y: 85 },
    status: 'DECEASED',
    phase: 1,
    description: 'Frozen Child'
  },
  {
    id: 'the_mother',
    name: 'THE MOTHER',
    role: 'UNDERBOSS',
    parentId: 'father',
    position: { x: 40, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Matriarch'
  },
  {
    id: 'vanessa',
    name: 'VANESSA',
    role: 'ASSOCIATE',
    parentId: 'the_mother',
    position: { x: 30, y: 30 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Adopted Daughter'
  },
  {
    id: 'silas',
    name: 'SILAS',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 60, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Second Son'
  },
  {
    id: 'juvell_chambers',
    name: 'JUVELL CHAMBERS',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 10, y: 40 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Ex-Cop / Recruit'
  },
  {
    id: 'boris_smirnov',
    name: 'BORIS SMIRNOV',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 90, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Burkesville Gang'
  },
  {
    id: 'cynthia_miller',
    name: 'CYNTHIA MILLER',
    role: 'ASSOCIATE',
    parentId: 'silas',
    position: { x: 70, y: 15 },
    status: 'MISSING',
    phase: 1,
    description: 'Static Snow Victim'
  },
  {
    id: 'aw_wilmo',
    name: 'A.W. WILMER',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 85, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'The Scapegoat? (1990)'
  },
  {
    id: 'peter_henderson',
    name: 'PETER HENDERSON',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 20, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Davenport Victim'
  },
  {
    id: 'priest',
    name: 'THE PRIEST',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 85, y: 50 },
    status: 'MISSING',
    phase: 1,
    description: 'Texarkana Connection'
  }
];
