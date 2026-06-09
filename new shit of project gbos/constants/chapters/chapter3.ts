import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER3_KEYWORDS: Record<string, KeywordMetadata> = {
  'blue_rv': { id: 'blue_rv', chapter: 3, type: 'case', displayName: "淡蓝色房车", isPersistent: true, description: "卡彭记忆回路中频繁出现的视觉锚点，被认为是家族流动的作案中心。" },
  'boris_smirnov': { id: 'boris_smirnov', chapter: 3, type: 'person', displayName: "鲍里斯·斯米尔诺夫", isPersistent: true, description: "一名被称为“远亲”的家族成员，参与了伯克斯维尔的行动。", source: "Confession" },
  'burkesville': { id: 'burkesville', chapter: 3, type: 'location', displayName: "伯克斯维尔", isPersistent: true },
  'cincinnati': { id: 'cincinnati', chapter: 3, type: 'location', displayName: "辛辛那提", isPersistent: true },
  'cynthia_miller': { id: 'cynthia_miller', chapter: 3, type: 'person', displayName: "辛西娅·米勒", isPersistent: true, description: "“静态雪花计划”的受害者。", source: "Confession" },
  'distant_relatives': { id: 'distant_relatives', chapter: 3, type: 'case', displayName: "远亲", isPersistent: true },
  'graywater_beacon': { id: 'graywater_beacon', chapter: 3, type: 'case', displayName: "灰水信标", isPersistent: true, description: "在莫哈韦休息站附近发现的视觉残留信号。代号\"灰水信标\"，是KLUB计划中用于单向情报传递的载具系统。可通过铁马烟盒上的记录进行识别。", source: "Confession" },
  'klub75_report': { id: 'klub75_report', chapter: 3, type: 'case', displayName: "KLUB-75号分析报告", isPersistent: true },
  'louisville': { id: 'louisville', chapter: 3, type: 'location', displayName: "路易斯维尔", isPersistent: true },
  'mint_plan': { id: 'mint_plan', chapter: 3, type: 'case', displayName: "薄荷计划", isPersistent: true },
  'quantico': { id: 'quantico', chapter: 3, type: 'location', displayName: "匡提科", isPersistent: true },
  'view_iron_horse_record': { id: 'view_iron_horse_record', chapter: 3, type: 'case', displayName: "烟盒记录：路易斯维尔", isPersistent: true, description: "詹妮弗提供的一份关键记录，揭示了卡彭最后一次信标投放的地理坐标：肯塔基州路易斯维尔。", source: "Jennifer" },
  'year_1973': { id: 'year_1973', chapter: 3, type: 'year', displayName: "1973", isPersistent: true },
  'year_1975': { id: 'year_1975', chapter: 3, type: 'year', displayName: "1975", isPersistent: true },
  'year_1986': { id: 'year_1986', chapter: 3, type: 'year', displayName: "1986", isPersistent: true },
  'jc_penney': { id: 'jc_penney', chapter: 3, type: 'person', displayName: "杰西·潘尼", isPersistent: true },
  'julie': { id: 'julie', chapter: 3, type: 'person', displayName: "朱莉", isPersistent: true, description: "辛辛那提冷库案的受害者。", source: "Confession" },
  'juvell_chambers': { id: 'juvell_chambers', chapter: 3, type: 'person', displayName: "朱维尔·钱伯斯", isPersistent: true, description: "一名路易斯维尔的黑人警察，后被招募进家族成为远亲。", source: "Confession" },
  'recruitment': { id: 'recruitment', chapter: 5, type: 'case', displayName: "招募", isPersistent: true, description: "雷吉博士筛选并引导卡彭进入“统一场论”计划的过程。", source: "Dialogue" }
};

export const CHAPTER3_NODES: MemoryNode[] = [
  {
    id: "confession_8",
    keyword: "confession",
    title: "供述 No.8",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.85 },
    revealedKeywords: ["year_1973", "julie", "cincinnati"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "[1973](clue:year_1973) 年初，[辛辛那提](clue:cincinnati)的雪还没化透，冷空气简直能把肺扎穿。康查尔在一个废弃的加油站发现了一个迷路的小女孩，大概只有五六岁的样子。他微笑着把女孩带到了一间冷库里，把门锁死，只留下一个能看见里面的小窗。\n\n“罗伯特，把它当成一个游戏吧。”康查尔说，“你可以什么都不做，甚至也可以不看。那在接下来的三小时里，女孩会被一点点冻成冰块，跟那些被开膛的猪一样。或者，你可以用这把刀给她一个‘解脱’。好好想想吧。”\n\n我握刀站在窗前，听着可怜的[朱莉](clue:julie)在里面绝望地拍打门板。康查尔就坐在板凳上抽烟，像是在等下一趟火车。我犹豫了很久，数次想用那把刀结果了康查尔，但不知道为什么，我又十分确定，他其实早就预料到我会这么做。我左思右想，又觉得其实打开门把女孩放走也是选项之一，但这却会让我接下来的潜伏任务蒙上一层不确定的阴影。就在这时，我猛然意识到，这看似是给我的测试，其实根本就是康查尔给自己找的乐子，是他自己的游戏，不管我接下来会做什么，他都会从这场游戏中获得快乐。想通这一点，我觉得什么都不做，这既会让我看起来犹豫不决，又像是已经打定主意让女孩被冻死，无论如何，这个选择看似给了康查尔更多乐子，但却也把我放置在更为主动的位置上。\n\n又或者，他知道我会这么想，并且以此为乐？\n\n总之，康查尔是在女孩断气前一刻才把她拖了出来，把她裹在一个旧毛毯里扔到警局门口。做完这一切之后，他看着我笑了半天。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "接下来，我们一路南下。好几天，他都在那台生锈的电波接收器前忙个不停。原本他以为大部队已经跨过州界去了东海岸，直到抵达路易斯维尔的那个河边码头。在一块巨大的、肮脏的黑色防水布下面，在一片杂乱的废弃集装箱中间，我一眼就看到了它，那辆淡蓝色的房车。它像是一个不该出现在这里的深海生物，静静地停在污水里。\n\n开门的是一个白发老人，他穿着一件过时的格纹大衣，头发梳理得一丝不苟。老人越过康查尔，直勾勾地走向我。那一刻，我像是一只被探照灯锁定的猎物，定在原地一动不动。老人伸出手，慈祥地抚摸我的脸颊。“你就是罗伯特，康查尔在电报里提到过你。为了迎接你，我们把计划延后了。路易斯维尔很冷，对吗？来，车里准备好了热汤。”他说。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "走进那辆淡蓝色的车厢，我第一次见到了其他人。\n\n母亲坐在阴影里，苍白得近乎透明，膝盖上放着一盆还在冒热气的碎肉。与此同时，一个强壮如同灰熊的男人正靠在舱壁上，擦拭一根沉重的钢管。他看着我的眼神里充满了某种带有生理性的恶意，直到康查尔上前拥抱，并告诉我，他叫塞勒斯。这个时候，一个女孩靠上前来，给我递过一块热毛巾，然后飞快消失了。她很白，白得几乎透明，我注意到她的眼睛里闪过一丝幸存者才会有的悲悯，这让我有些犹豫，我也不知道自己为什么犹豫。很快我听康查尔叫她“甜肉”（sweet meat），后来父亲也叫她“甜肉”，这个称呼如此自然亲切，却又像在恭维盘子里的食物一般令人作呕。\n\n女孩名叫瓦妮莎，多好听的名字是不是？但在后来，在漫长的岁月里，当我跟其他人待在一起时，我也不得不叫她“甜肉”，我还记得每到这种时候，她看我的眼神是那么……干，我不想再提到这些了。无论如何，就在那晚的昏暗灯光下，我看着赛勒斯肆无忌惮地把手伸进母亲的衣襟，而父亲则沉默地注视着这一切，顺手理了理……“甜肉”的长发。那一刻我瞬间明白了，这辆房车里没有任何伦理可言，有的只是通过交配建立的纽带，平等而明确。\n\n此时的我并不清楚，这种由乱伦堆砌的纽带，比其他关系要牢固一千倍。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_9",
    keyword: "confession",
    title: "供述 No.9",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.9 },
    revealedKeywords: ["juvell_chambers", "distant_relatives", "year_1973"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "整个[1973](clue:year_1973)年，在费城、辛辛那提，还有路易斯维尔，我曾像个守时的闹钟一样向外投放信标。直到后来，在德克萨斯州的埃尔帕索，我走下那辆沾满泥土和焦油的蓝色房车，避开赛勒斯那双秃鹫似的眼睛，在加油站那口散发着陈腐机油味和咸湿雨水的排水沟旁从袖口滑出烟盒。站在那个只剩半个霓虹灯招牌的加油站里，我依然在重复这个动作，其实我心里就清楚，这些东西永远不会再被回收了。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "「薄荷计划」？真可笑，兰利那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样？他那套理论在华盛顿撞墙，这完全是可以预料的，就跟他终究要把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由，别人管不着，但你要觉得你能从我这里捞出什么来帮雷吉翻盘，那你可真是比索恩还要天真。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "总之去他妈的「薄荷计划」吧，我来跟你讲讲什么才叫真正的计划。\n\n这个计划叫做「灵魂厨房」，众所周知，当时整个俄亥俄都黑人运动笼罩着，辛辛那提的种族张力更是紧绷到了极限，几个月前父亲绝对借此玩一把，他让几名「[远亲](clue:distant_relatives)」频繁出没于市中心运钞车中转站附近。他们穿着那个时代激进组织的标志性黑夹克，手里拿着模仿「黑豹党」的政治传单，甚至故意在监控死角留下几个潦草的激进口号。然后，在一周后，四个人，黑夹克，散弹枪，满口的激进派俚语，他们冲进运钞车中转站，拿走钱后故意掉落了一枚刻着伏都教纹样的指环。\n\n此后的一周，当警察正忙着突袭黑人社区，在贫民窟里翻个底朝天时，房车已经离开辛辛那提，回到了路易斯维尔的地界上。以路易斯维尔为轴，「灵魂厨房」又在莱克辛顿和纳什维尔复制了几次。纳什维尔那次，父亲甚至专门印制了口号传单并成功引发大规模种族冲突，然后家族趁乱狠狠赚了一笔。\n\n我说的当然不是钱，是警枪。一个黑人警察因此背了锅，可怜的[朱维尔·钱伯斯](clue:juvell_chambers)。但你猜着没，很快朱维尔就被父亲招募，成为「远亲」的一份子了。与此同时呢？FBI的臭狗屎们又在做什么？\n\n致力于把自己人关进精神病院，这就是他们在做的。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_11",
    keyword: "confession",
    title: "供述 No.11",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.85, y: window.innerHeight * 0.9 },
    revealedKeywords: [],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "让我来理理阿尔特曼的逻辑。\n\n首先，他宣称鲍里斯是个喝多了的乡巴佬，那些关于“家族”和“远亲”的供述全是胡话，然后信誓旦旦地告诉华盛顿，说根本不存在什么地下网络，一切都是雷吉博士臆想出来的，但马上——哈！看这儿——他忽然又担心起我来，说我这只失联地鼠，正在利用我在匡提科学到的战术，指导这群他刚说完根本就“不存在的乡巴佬”，去羞辱本地警察。\n\n他一头说我已经殉职，家族不存在，另一头，我又上天入地，不仅渗透了警方的防线，还逼得他切断 KLUB 的所有回收线路来保自己的乌纱帽。\n\n我得谢谢你给我看这个。真的，这让我心里的最后一点愧疚感也彻底烟消云散了。因为就在阿尔特曼忙着写这份报告的时候，我在做更有价值的事情。既然他觉得我是在利用 FBI 的战术指导犯罪，那我怎么能让他失望呢？", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "第二个项目叫做「静态雪花计划」。这次不抢银行。我们找上了辛西娅·米勒，她是纳什维尔附近教会唱诗班的领唱，有着一头金发和所有人都会喜欢的甜美笑容，典型的“美国甜心”，这种人的失踪会让方圆两百英里的警察和媒体像疯狗一样扑过去。“母亲”保持着每周日前往教堂的习惯，是她为我们选中了辛西娅。\n\n不，我们完全不需要绑架她。在母亲的介绍下，「远亲」里的几个年轻人去接近她，他们告诉她，此时有一部地下电影正在筹拍，他们认为她就是那个当之无愧的主角。然后他们把她带到伯克斯维尔一个汽车旅馆里——在那我已经架好了摄像机。没有复杂的道具，只有她，一把椅子，和一台甚至收不到信号的老式电视机。\n\n我让他坐在那儿，对着那个只有雪花杂讯的屏幕。我指导她的表情，教她如何呈现出那种“接收到神谕”般的恍惚。我告诉她，这不是犯罪，这是一场前卫的行为艺术，我们要通过这些雪花，向世界传递一种只有神选者才能听懂的频率。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "在LSD的作用下，当她对着镜头，用那种梦呓般的声音念出我写的台词。我看着取景框里的辛西娅，心中不由兴奋，这种感觉当差的时候可从没有过，怎么说呢，那是一种……创造的快感。想想吧，当警察破门而入，发现房间里只有这台电视机在一片死寂中不知疲倦地播放着录像，媒体会发疯，他们会把这称为“电视邪教”，家长们会恐慌，而FBI呢，他们会把本来用于追踪绑架案的黄金48小时，浪费在研究我的对白和那个根本不存在的“信号频率”上。\n\n事成之后，我们带走了辛西娅，他们被运往西部的分部，成为新的“远亲”，或者被赛勒斯处理掉，这取决于她是否听话。在她最后出现的旅馆房间里，我们只留下一样东西：那台还在播放雪花杂讯的电视机，循环播放那盘录像带。想象这样一个画面吧，当警察冲进房间，他们看不到搏斗痕迹，看不到血迹。他们只会看到甜美的辛西娅在电视里喝着一碗恶心的汤，宣称自己去了“信号的另一端”。\n\n就在那一刻我算是明白了。这一切与生存无关，也不是为了钱。这就是极致的乐趣，看着现实世界的秩序因为你制造的一个微小“故障”而彻底卡死，这是件多么有趣的事情！", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_10",
    keyword: "confession",
    title: "供述 No.10",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.95 },
    revealedKeywords: ["recruitment", "year_1973", "boris_smirnov"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "伯克斯维尔……你居然在地图上找到了这个地方？\n\n至于说远亲……我想想应该从哪说起。你很难想象远亲的渗透情况，他们像真菌一样，存在于在全美的各个深夜调度站，或者像伯克斯维尔这样的镇子里。父亲的[招募](clue:recruitment)方法原始且高效，简单来说，房车就是一个在公路上移动的培养皿。男人们先用暴力，把人的自尊踩得粉碎，再让女人们出面，用她们的柔软，把碎片重新粘起来。这是一种制造同谋者的经典操作，然而始终有效。毕竟基于生理依赖的共犯结构，比兰利甩出的雇佣合同可要稳固得多。\n\n在伯克斯维尔那个满是泥泞的伐木场里，我第一次真正理解了家族的组织关系，刚钻进那辆车的时候，我还以为自己能保持自我呢。我不愿承认，母亲身上有一种引力，一种摄人心魄的虚弱感，诱惑你一起放弃抵抗，让我觉得在那堆烂肉里沉沦才是唯一的真实。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "康查尔很少动手，他的压迫感来自智力层面，想尽办法让我觉得坚持原则是一种智力缺陷。赛勒斯则不同，我也许能避开康查尔的嘲讽，但避不开赛勒斯。只要我表现出一丁点“不合群”，他就会毫不犹豫地把我变成一具需要处理的尸体。\n\n无论如何，最开始的大半年里，我几乎什么都不用做，仅在事情发生的时候替他们做些掩护性工作，这种日子一直持续到 [1973](clue:year_1973)年底，那是一个深夜，房车停在莱克辛顿一处调度站修整，而我则像个还在坚持打卡的幽灵一样，把又一枚灰水信标踢进了排水沟，那时候我还没有完全放弃，但也不那么期待有人真的回收它。\n\n我做完这一切，回到了车上，父亲并不知道我刚刚干了什么。他正同一个名叫[鲍里斯·斯米尔诺夫](clue:boris_smirnov)的远亲坐在折叠桌旁，心情看起来好极了。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "“罗伯特，别再想那些粗糙的抢劫了，你是时候拥有自己的作品了，”他的语气就像是在给刚成年的儿子递上一把车钥匙，“我要你为伯克斯维尔的远亲们设计一个好玩的计划，把那些警察耍得团团转。来吧，让我们看看你能干点什么。”", attitude: "", visual: "" }
    }
  }
];
