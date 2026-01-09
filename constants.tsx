
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
