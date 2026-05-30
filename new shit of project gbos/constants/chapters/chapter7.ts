import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER7_KEYWORDS: Record<string, KeywordMetadata> = {
  'albuquerque': { id: 'albuquerque', chapter: 7, type: 'location', displayName: "阿尔伯克基", isPersistent: true },
  'bonny_and_clyde': { id: 'bonny_and_clyde', chapter: 7, type: 'case', displayName: "邦妮和克莱德", isPersistent: true },
  'chemist_lover': { id: 'chemist_lover', chapter: 7, type: 'case', displayName: "化学家情人", isPersistent: true },
  'laguna_beach': { id: 'laguna_beach', chapter: 7, type: 'location', displayName: "拉古那海滩", isPersistent: true },
  'naked_root': { id: 'naked_root', chapter: 7, type: 'case', displayName: "裸根", isPersistent: true },
  'santa_fe': { id: 'santa_fe', chapter: 7, type: 'location', displayName: "圣菲", isPersistent: true },
  'amalekite_protocol': { id: 'amalekite_protocol', chapter: 7, type: 'case', displayName: "亚玛力人协议", isPersistent: true },
  'assault_on_police': { id: 'assault_on_police', chapter: 7, type: 'case', displayName: "袭警案", isPersistent: true, description: "发生在汉弗莱县的严重暴力事件。", source: "Archive" },
  'blind_zone_camp': { id: 'blind_zone_camp', chapter: 7, type: 'location', displayName: "盲区营地", isPersistent: true },
  'capone': { id: 'capone', chapter: 7, type: 'person', displayName: "罗伯特·卡彭", isPersistent: true, description: "潜伏阶段使用的身份代号，KLUB计划的重点关注对象。", source: "Confession" },
  'fake_smoke_bomb': { id: 'fake_smoke_bomb', chapter: 7, type: 'case', displayName: "人造烟雾弹", isPersistent: true },
  'felipe_maldonado': { id: 'felipe_maldonado', chapter: 7, type: 'person', displayName: "费利佩·马尔多纳多", isPersistent: true, description: "一名与家族活动有关的乐团负责人，其海报曾出现在废弃的林地中。", source: "Confession" },
  'forest_map': { id: 'forest_map', chapter: 7, type: 'case', displayName: "森林地图", isPersistent: true, description: "在记忆碎片中发现的详细地图，标注了蒙大拿州利比镇周边的原始森林区域。", source: "Confession" },
  'frank_rollins': { id: 'frank_rollins', chapter: 7, type: 'person', displayName: "弗兰克·罗林斯", isPersistent: true },
  'humphrey_county': { id: 'humphrey_county', chapter: 7, type: 'location', displayName: "汉弗莱县", isPersistent: true, description: "密西西比州的一个县。1967年曾发生过严重暴力冲突。", source: "Archive" },
  'libby_town': { id: 'libby_town', chapter: 7, type: 'location', displayName: "利比镇", isPersistent: true, description: "蒙大拿州西北部一个靠近边境的偏僻伐木区。卡彭在过去十几年中多次前往。", source: "Dialogue" },
  'mill_valley': { id: 'mill_valley', chapter: 7, type: 'location', displayName: "米尔谷", isPersistent: true },
  'precinct_4': { id: 'precinct_4', chapter: 7, type: 'location', displayName: "第4号警务站", isPersistent: true },
  'reporter': { id: 'reporter', chapter: 7, type: 'case', displayName: "记者", isPersistent: true, description: "加里·韦伯斯特。一位调查报道记者。", source: "Archive" },
  'robert': { id: 'robert', chapter: 7, type: 'person', displayName: "罗伯特", isPersistent: true },
  'tithe': { id: 'tithe', chapter: 7, type: 'case', displayName: "什一税", isPersistent: true },
  'tucson_shooting': { id: 'tucson_shooting', chapter: 7, type: 'case', displayName: "图森枪战案", isPersistent: true },
  'wanted_poster': { id: 'wanted_poster', chapter: 7, type: 'case', displayName: "通缉令", isPersistent: true, description: "一份关于费利佩·马尔多纳多的通缉令。", source: "Project" },
  'woodland_depths': { id: 'woodland_depths', chapter: 7, type: 'location', displayName: "林地深处", isPersistent: true },
  'year_1983': { id: 'year_1983', chapter: 7, type: 'year', displayName: "1983", isPersistent: true },
  'year_1975': { id: 'year_1975', chapter: 3, type: 'year', displayName: "1975", isPersistent: true },
  'year_1976': { id: 'year_1976', chapter: 4, type: 'year', displayName: "1976", isPersistent: true },
  'gore_and_levy': { id: 'gore_and_levy', chapter: 6, type: 'person', displayName: "戈尔和列维探员", isPersistent: true, description: "FBI探员，于1976年在拉古那海滩监视房车时被卡彭杀害。", source: "Confession" }
};

export const CHAPTER7_NODES: MemoryNode[] = [
  {
    id: "confession_29",
    keyword: "confession",
    title: "供述 No.29",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.75 },
    revealedKeywords: ["year_1975", "felipe_maldonado"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "林地深处？东躲西藏？\n\n条子的脑子里果然只有这种无聊的刻板印象，把我们当一般通缉犯去想。实话告诉你吧，绝大部分时候，我们都开着房车平稳地行驶在洲际公路和国道上，我们在汽车旅馆加水，在加油站买热狗，像个四处旅行的普通家庭一样。偶尔几次，我们把车开进深山老林，也根本不是为了躲避什么。那只是因为父亲觉得无聊了，想找点‘乐子’，就像周末打猎的家庭聚会似的。实话说，[1975](clue:year_1975)年发生在红杉林里的那个事情，其实也就是这么回事。\n\n当那辆涂得花花绿绿的旧校车从我们营地旁开过去的时候，瓦妮莎就站在房车的遮阳篷下面，离那条土路只有不到十英尺。车上的嬉皮士大笑大叫，放着摇滚乐，把啤酒洒在路面上。这帮人又脏又蠢，一无是处，但自由得让人嫉妒。\n\n你见过一个已经被埋进土里的人，突然想要大口呼吸的样子吗？我当时就站在瓦妮莎的侧后方，看到她的眼睛，虽然那群人只顾着跟艾莉丝开玩笑，完全没注意到她，可是她却始终死盯着那辆大巴车，眼神跟着那片廉价的色彩一起钻进了林地深处。\n\n那是第一次在一个活死人身上看到那种近乎贪婪的、心驰神往的光。那群嬉皮士也就和她一样大吧，如果她也能在那辆车上，吹着风，哪怕只是做一个漫无目的、随波逐流的垃圾也好。\n\n彼时彼刻，父亲站在纱门后面。他没有看那辆嘈杂的校车，他一直在看着瓦妮莎的侧脸。半小时后，他让康查尔和艾莉丝带着酒去嬉皮士的营地，却让瓦妮莎坐在房车外面的篝火旁，哪里都不许去。我们就这么坐在黑夜里，听着远处传来的音乐声，慢慢变成痴笑和惨叫交织的声音。\n\n等到半夜，艾莉丝回到营地时，还给瓦妮莎带回了一张带血的演出海报。“那群傻蛋是从墨西哥一路开到这的，还想邀请我去他们周末在镇上的演出呢，”艾莉丝说，“那会我没告诉他们，计划有变，他们这副模样可演不了出呢。”\n\n瓦妮莎接过海报，上面印着[费利佩·马尔多纳多](clue:felipe_maldonado)的名字。即便她知道这是艾莉丝的存心戏弄，也还是将它小心翼翼折叠好，收藏起来。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_28",
    keyword: "confession",
    title: "供述 No.28",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    revealedKeywords: ["year_1976", "gore_and_levy"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "你问的是拉古那海滩么？我们最后停靠的那个鬼地方，确实连个正经营地都算不上，就是一片长满杂草的野滩涂，除了海风的腥臭味和等死的海鸥，什么都没有。\n\n不过我们到那的第二个下午，我确实注意到了一辆福特轿车，它停在太平洋海岸公路半英里外的矮树丛里。车里的两个蠢货以为反光镜上的泥巴能掩护他们，但他俩抽烟的频率实在太高了。\n\n我没惊动父亲，也没告诉其他人。你知道的，如果让父亲知道，他也只会点点头，然后艾莉丝就会兴致勃勃地去把那家伙的皮剥下来，当然这也没什么不好的，但我更宁愿安静地吹吹海风，而不是搞得鸡飞狗跳的。所以我就从沙滩上捡了块大概五磅重的花岗岩，一个人散步了过去。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "我从斜后方绕过去，绕了半圈观察了一番。主驾驶上是个年轻人，看起来像个大学生，他正通过望远镜盯着我们的房车看。我站直身子，发现艾莉丝已经把沙滩椅搬到了房车顶。在那她解开了那件扎染开衫的纽扣，露出胸部晒日光浴。副驾驶上则坐着一个肥胖的中年人。我真不知道他是怎么把自己塞进车里的，而此时此刻， he 还在往嘴里塞沾满枣泥奶昔的玉米片。我走到副驾驶窗前，抡起花岗岩，对着车窗狠狠砸了下去，结果车窗纹丝不动，然后我才意识到，我他妈压根忘了这不是一辆民用汽车了。\n\n那头肥猪一脸‘操，我被发现了’的表情，手忙脚乱地想要按下车门的锁销，但他那沾满油脂的粗手指滑了一下，反而把门把手给拉开了。车门‘喀哒’一声弹开了一条缝。我一把拉开车门，抓住他的涤纶领带拽了出来，接着挥起花岗岩砸下去。肥猪瞬间脑浆迸裂，看来FBI也没给它的猪猡脑袋加装防弹护罩嘛。\n\n直到这会，驾驶座上那个偷窥狂才回过神来，他扔下望远镜，手忙脚乱去摸腋下的枪套，但他实在太紧张了，战术枪套的按扣卡住了。我踩着肥猪越过中间的扶手箱，一把抓住他脖子上的望远镜带子拽过来。真不愧是军用级别的高级货，带子极其结实。那小子的脸重重地砸在硬塑料的中央扶手上，发出“砰”的一声闷响。没等他惨叫出声，我顺手抄起望远镜，砸进他的眼眶里。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "接下来的事就简单多了。我把那个没了半边脑袋的胖子塞进后备箱，把大学生折叠起来塞进副驾驶的脚垫下，压在油门踏板上，挂上档，让这辆铁王八变成一头被蒙住眼睛的犀牛，扎进了拉古那那片暗礁密布的海沟里。我靠在路边的树上，看着它渐渐沉下去，在海面上咕噜咕噜地冒了几个带着油污的水泡。远处的房车顶上，艾莉丝悠闲地翻了个身。一切就像没发生过一样。\n\n是的，我当然拿到了他们的证件，如假包换的[戈尔和列维探员](clue:gore_and_levy)。 我不知道他们是从什么时候开始跟上房车的，但我想不会是在爆炸案发生之前，否则他们早就拿着胶卷去跟安全局的人换资源了，这可比车上这几个老屁股有价值多了。\n\n可如果他们在[1976](clue:year_1976)年春天就盯上了我们，为什么会在冬天又跑去报社拦截那封匿名信呢？还有，那封信里提到的人又是谁呢？如果连你也不知道，那我就更不知道了。\n\n不会是康查尔吧，莫非他还在缅因州监狱的时候就已经成为线人了？", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_27",
    keyword: "confession",
    title: "供述 No.27",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.3 },
    revealedKeywords: ["year_1976"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "我并不常想起这件事。\n\n但有时候，在两次烂醉如泥的昏厥之间，在那种冷酷的片刻清醒里，有些虫子会忽然爬回脑子里，它会电我一下，让我突然想到什么。\n\n我是从什么时候真正看懂这辆车的？那正是在某次喝完一整瓶Evan Williams波本威士忌之后，我猛然清醒，看到艾莉丝坐在副驾驶座上给自己的脚趾涂油的画面。那是埋藏在记忆深处的画面，距离回忆的时刻少说已经过去十年，但那个画面却如此之清晰，以至于连同当时房车中的气味，其他人的动态和延伸，乃至我内心的想法都一并涌入脑海。\n\n正是在这一刻，我看透这辆车真正装载的，那纯粹之恶的形状。\n\n回想一下吧。人类当中的大多数，之所以没沦为纯粹的恶物，其实是因为我们忙于关注自己，忙于照看这副皮囊，舔舐伤口，梳理羽毛，在自怜中消磨时间，也就暂且忘掉了外面的世界，忘了荒原上的欲望和危险。\n\n我举个例子吧。三十多岁还在当州警的那个年代，毫无疑问是我这辈子最愤世嫉俗的年月，比后来那些见血的日子还要恶劣。你知道，即使是佩着枪，日子多半也是由无聊的规矩和死气沉沉的人堆砌而成的。那时我对这世界的态度再简单不过——碰见个撞大运的，心里骂一句，操，狗日的幸运儿；碰见个被生活碾碎的可怜虫，也无非就是叹口气罢了。这就是我能对外部世界投射的全部关注。一个糟糕的人，事实上也就只有这么一星半点。\n\n然而纯粹的恶，是没有倒影的。\n\n是的，他们从来就看不到自己。就像被割掉眼睑的眼球，永远无法闭合，干涩地裸露着，无时无刻不死盯着外部世界，盯着那些微小的、毫无防备的活物，看着它们在尘土和阴影里爬行着，他们忍不住会盘算着该对它们做点什么。从哪里切开皮肉，该怎么折断骨头。\n\n对了。我看着艾莉丝，渐渐意识到，是的，父亲从不谈论自己，也绝口不提过去。不是因为有什么不可告人的秘密。是因为他根本不在乎，连记都不记得了。莫兰迪亦如此，至于艾莉丝，只有在提到莫兰迪的时候，才会像个活人一样漏出点过去的残渣。\n\n这就是为什么他们注定要聚到一块儿去。\n\n米尔谷的记者，我记得。莫兰迪出狱后没几天，大家就看到了那篇报道。艾莉丝想去奥克兰把那个记者的舌头割下来，钉在打字机上。但父亲阻止了她，给她讲了约翰·莫里西和他的百货公司的故事。毕竟真正的惩罚应该像自然规律一样。\n\n最终，莫兰迪决定给韦伯斯特先生送一份“礼物”。他把它埋在了米尔谷，一栋带地下室的两层砖房的地基里。\n\n那是一个雾气浓重的深夜，所有人都围站在一起，看着莫兰迪在承重墙夹层里安置他的杰作。很显然，电池是熬不过时间的，而发条则会生锈，莫兰迪告诉艾莉丝，只有重力是不朽的。我亲眼看他用砂浆固定住一个厚实的玻璃漏斗，里面填满了一大块他自己熬制的黑色沥青。在漏斗的正下方，是一个黄铜天平，卡着一颗沉重的轴承钢珠。滑轨尽头抵着一枚猎枪底火，底火连着足以把这栋房子连根拔起的RDX注塑炸药。\n\n那团黑色的湿块静静地待在漏斗上，没有发出一点声音。\n\n“这东西没法做实验。不过重力是恒定的，它会把这块沥青一点点往下拉，等最底下的那一滴沥青积攒够了重量，最终断裂掉在天平上……”莫兰迪做了个开花的手势。\n\n“可要是到时候那猴子搬走了呢？要是他滚到东海岸去了，或者早就死了呢？”艾莉丝问。\n\n“那不重要。你只需要想，十八年或是二十五年后的某一天早晨，当某个人翻开报纸，看到米尔谷曾经的办公室毫无征兆地被炸成一个大坑时，他会意识到什么呢？这个人可能是你，可能是我，可能是罗伯特，”父亲说着，看了我一眼，“——或者是那只猴子，不重要。但不管是谁，每个人想到的东西都不一样，对吗？你只需要想这一点，它就足够美了。”\n\n父亲说着话，另一边莫兰迪也完活了。他一声不吭，只从口袋里摸出了一块巴掌大的黄铜铭牌，上边用强酸蚀刻了几行极其优雅的法文花体字。借着手电筒光晕，我能清楚地看到上面写着：Cuvée Tardive Mis en cave par Morandi Novembre [1976](clue:year_1976)（迟摘特酿，莫兰迪封存入窖，1976年11月）。\n\n毫无疑问，哪怕 RDX 的爆炸当量能把整栋房子化为齑粉，这块铭牌也只会像颗弹片一样嵌进砖缝里。它会幸存下来，被二十年后某个筛网筛土的联邦探员捡到。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "", attitude: "", visual: "" }
    }
  }
];
