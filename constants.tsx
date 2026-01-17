
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
    revealedKeywords: ['maine', 'nibi', 'conchar', 'year_1971', 'small_bank', 'relationship'],
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
        visual: "/assets/iron_horse_beacon.jpg"
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
        event: "我走进那辆淡蓝色的车厢，第一次见到了其他人。\n\n母亲（The Mother）： 一个苍白得近乎透明的女人，她坐在阴影里，膝盖上放着一盆还在冒热气的碎肉。她看我的眼神里没有任何光，只有一种被长年累月的暴力彻底洗劫后的荒芜感。\n\n赛勒斯（Silas）： 一个像灰熊一样强壮且沉默的男人，他正靠在舱壁上擦拭一根沉重的钢管。他看着我的眼神里充满了某种原始的、带有生理侵略性的恶意，仿佛在评估我身体各部分的\"耐受度\"。\n\n瓦妮莎（Vanessa）： 她是这里最特别的存在。当所有人都像盯着死物一样盯着我时，只有她，在给我递毛巾的那一刻，手指在我的掌心飞速地划了一个叉。她的眼睛里闪过一丝极度深沉的、只有幸存者才会有的悲悯。\n\n在那晚的昏暗灯光下，我看着赛勒斯肆无忌惮地把手伸进\"母亲\"的衣襟，而\"父亲\"则像一个完美的指挥家，微笑着注视着这一切，甚至还顺手理了理瓦妮莎那头略显凌乱的长发。我瞬间明白了，房车里没有任何伦理可谈，只有一种透过交配构建的秩序。 无论如何，也是到稍后我才意识到，这种由乱伦堆砌的纽带，比其他关系要牢固一千倍。",
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
    revealedKeywords: ['year_1982', 'el_paso', 'juvell_chambers', 'year_1973'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "「薄荷计划」？真可笑，兰利那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样。他那套理论在华盛顿撞墙，是可以预料的，跟他迟早把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由。但你要觉得你能从我这堆腐烂的记忆里捞出什么证据来帮雷吉翻盘，那你比索恩还要天真。",
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
  }
];
