import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER3_KEYWORDS: Record<string, KeywordMetadata> = {
  'louisville': { id: 'louisville', chapter: 3, type: 'location', displayName: '路易斯维尔', isPersistent: true, description: '肯塔基州最大的城市。卡彭在这里遭遇了信标系统的第二次波动。', source: 'Confession' },
  'blue_rv': { id: 'blue_rv', chapter: 3, type: 'case', displayName: '淡蓝色房车', isPersistent: true, description: '卡彭记忆回路中频繁出现的视觉锚点，被认为是家族流动的作案中心。', source: 'Confession' },
  'cincinnati': { id: 'cincinnati', chapter: 3, type: 'location', displayName: '辛辛那提', isPersistent: true, description: '俄亥俄州的一座城市，薄荷计划的执行地。', source: 'Confession' },
  'mint_plan': { id: 'mint_plan', chapter: 3, type: 'case', displayName: '薄荷计划', isPersistent: true, description: '旨在通过小镇邮局分发带有特定标记的薄荷糖来建立监控网的计划。', source: 'Confession' },
  'burkesville': { id: 'burkesville', chapter: 3, type: 'location', displayName: '伯克斯维尔', isPersistent: true, description: '肯塔基州南部的一个小城，卡彭在此地与远亲接触。', source: 'Confession' },
  'distant_relatives': { id: 'distant_relatives', chapter: 3, type: 'case', displayName: '远亲', isPersistent: true, description: '对家族在偏远地区招募并洗脑的边缘成员的称呼。', source: 'Confession' },
  'klub75_report': { id: 'klub75_report', chapter: 3, type: 'clue', displayName: 'KLUB-75报告', isPersistent: true, description: '一份绝密文件，记录了关于信标系统在东海岸扩散的初步评估。', source: 'Archive' },
  'quantico': { id: 'quantico', chapter: 3, type: 'location', displayName: '匡提科', isPersistent: true, description: 'FBI总部所在地。', source: 'Archive' },
  'year_1973': { id: 'year_1973', chapter: 3, type: 'year', displayName: '1973', isPersistent: true },
  'mobile_blood_truck': { chapter: 3, type: 'case', isPersistent: true },
  'boris_smirnov': { chapter: 3, type: 'person' },
  'year_1986': { chapter: 3, type: 'year', isPersistent: true },
  'year_1975': { chapter: 3, type: 'year', isPersistent: true },
  'graywater_beacon': { chapter: 3, type: 'case', isPersistent: true },
  'view_iron_horse_record': { chapter: 3, type: 'case', isPersistent: true },
  'cynthia_miller': { chapter: 3, type: 'person' },
};

export const CHAPTER3_NODES: MemoryNode[] = [
  {
    id: "confession_8",
    keyword: "confession",
    title: "供述 No.8",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.85 },
    revealedKeywords: ['year_1973', 'julie'],
    excludedKeywords: ['cincinnati', 'louisville', 'blue_rv', 'silas', 'vanessa', 'father', 'mother', 'the_mother', '辛辛那提', '路易斯维尔', '房车', '淡蓝色房车', '父亲', '母亲', '瓦妮莎', '塞勒斯', '塞勒斯·莫兰迪'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "1973 年初，辛辛那提的雪还没化透，冷空气简直能把肺扎穿。康查尔在一个废弃的加油站发现了一个迷路的小女孩，大概只有五六岁的样子。他微笑着把女孩带到了一间冷库里，把门锁死，只留下一个能看见里面的小窗。\n\n“罗伯特，把它当成一个游戏吧。”康查尔说，“你可以什么都不做，甚至也可以不看。那在接下来的三小时里，女孩会被一点点冻成冰块，跟那些被开膛的猪一样。或者，你可以用这把刀给她一个‘解脱’。好好想想吧。”\n\n我握刀站在窗前，听着可怜的朱莉在里面绝望地拍打门板。康查尔就坐在板凳上抽烟，像是在等下一趟火车。我犹豫了很久，数次想用那把刀结果了康查尔，但不知道为什么，我又十分确定，他其实早就预料到我会这么做。我左思右想，又觉得其实打开门把女孩放走也是选项之一，但这却会让我接下来的潜伏任务蒙上一层不确定的阴影。就在这时，我猛然意识到，这看似是给我的测试，其实根本就是康查尔给自己找的乐子，是他自己的游戏，不管我接下来会做什么，他都会从这场游戏中获得快乐。想通这一点，我觉得什么都不做，这既会让我看起来犹豫不决，又像是已经打定主意让女孩被冻死，无论如何，这个选择看似给了康查尔更多乐子，但却也把我放置在更为主动的位置上。\n\n又或者，他知道我会这么想，并且以此为乐？\n\n总之，康查尔是在女孩断气前一刻才把她拖了出来，把她裹在一个旧毛毯里扔到警局门口。做完这一切之后，他看着我笑了半天。",
        attitude: "",
        visual: "https://picsum.photos/seed/cincinnati_winter/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "接下来，我们一路南下。好几天，他都在那台生锈的电波接收器前忙个不停。原本他以为大部队已经跨过州界去了东海岸，直到抵达路易斯维尔的那个河边码头。在一块巨大的、肮脏的黑色防水布下面，在一片杂乱的废弃集装箱中间，我一眼就看到了它，那辆淡蓝色的房车。它像是一个不该出现在这里的深海生物，静静地停在污水里。\n\n开门的是一个白发老人，他穿着一件过时的格纹大衣，头发梳理得一丝不苟。老人越过康查尔，直勾勾地走向我。那一刻，我像是一只被探照灯锁定的猎物，定在原地一动不动。老人伸出手，慈祥地抚摸我的脸颊。“你就是罗伯特，康查尔在电报里提到过你。为了迎接你，我们把计划延后了。路易斯维尔很冷，对吗？来，车里准备好了热汤。”他说。",
        attitude: "",
        visual: "https://picsum.photos/seed/louisville_dock/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "走进那辆淡蓝色的车厢，我第一次见到了其他人。\n\n母亲坐在阴影里，苍白得近乎透明，膝盖上放着一盆还在冒热气的碎肉。与此同时，一个强壮如同灰熊的男人正靠在舱壁上，擦拭一根沉重的钢管。他看着我的眼神里充满了某种带有生理性的恶意，直到康查尔上前拥抱，并告诉我，他叫塞勒斯。就在这时，一个女孩靠上前来，给我递过一块热毛巾，然后飞快消失了，我注意到她的眼睛里闪过一丝幸存者才会有的悲悯，这让我有些犹豫，我不知道自己为什么犹豫。后来我知道，女孩名叫瓦妮莎。\n\n总之，就在那晚的昏暗灯光下，我看着赛勒斯肆无忌惮地把手伸进母亲的衣襟，而父亲则沉默地注视着这一切，顺手理了理瓦妮莎的长发。我瞬间明白了，这辆房车里没有任何伦理可言，有的只是通过交配建立的纽带，平等而明确。\n\n此时的我并不清楚，这种由乱伦堆砌的纽带，比其他关系要牢固一千倍。",
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
    revealedKeywords: ['juvell_chambers', 'distant_relatives', 'year_1973'],
    excludedKeywords: ['mint_plan', 'project', 'cincinnati', 'louisville', 'blue_rv', 'el_paso', 'philadelphia', 'ohio', 'silas', '辛辛那提', '薄荷计划', '路易斯维尔', '房车', '埃尔帕索', '费城', '俄亥俄', '赛勒斯'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "整个[1973](clue:year_1973)年，在费城、辛辛那提，还有路易斯维尔，我曾像个守时的闹钟一样向外投放信标。直到后来，在德克萨斯州的埃尔帕索，我走下那辆沾满泥土和焦油的蓝色房车，避开赛勒斯那双秃鹫似的眼睛，在加油站那口散发着陈腐机油味和咸湿雨水的排水沟旁从袖口滑出烟盒。站在那个只剩半个霓虹灯招牌的加油站里，我依然在重复这个动作，其实我心里就清楚，这些东西永远不会再被回收了。",
        attitude: "",
        visual: "https://picsum.photos/seed/mint_plan/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "「薄荷计划」？真可笑，兰利那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样？他那套理论在华盛顿撞墙，这完全是可以预料的，就跟他终究要把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由，别人管不着，但你要觉得你能从我这里捞出什么来帮雷吉翻盘，那你可真是比索恩还要天真。",
        attitude: "",
        visual: "https://picsum.photos/seed/el_paso_1982/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "总之去他妈的「薄荷计划」吧，我来跟你讲讲什么才叫真正的计划。\n\n这个计划叫做「灵魂厨房」，众所周知，当时整个俄亥俄都黑人运动笼罩着，辛辛那提的种族张力更是紧绷到了极限，几个月前父亲绝对借此玩一把，他让几名「远亲」频繁出没于市中心运钞车中转站附近。他们穿着那个时代激进组织的标志性黑夹克，手里拿着模仿「黑豹党」的政治传单，甚至故意在监控死角留下几个潦草的激进口号。然后，在一周后，四个人，黑夹克，散弹枪，满口的激进派俚语，他们冲进运钞车中转站，拿走钱后故意掉落了一枚刻着伏都教纹样的指环。\n\n此后的一周，当警察正忙着突袭黑人社区，在贫民窟里翻个底朝天时，房车已经离开辛辛那提，回到了路易斯维尔的地界上。以路易斯维尔为轴，「灵魂厨房」又在莱克辛顿和纳什维尔复制了几次。纳什维尔那次，父亲甚至专门印制了口号传单并成功引发大规模种族冲突，然后家族趁乱狠狠赚了一笔。\n\n我说的当然不是钱，是警枪。一个黑人警察因此背了锅，可怜的朱维尔·钱伯斯。但你猜怎么着，很快朱维尔就被父亲招募，成为「远亲」的一份子了。与此同时呢？FBI的臭狗屎们又在做什么？\n\n致力于把自己人关进精神病院，这就是他们在做的。",
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
    revealedKeywords: ['recruitment', 'boris_smirnov'],
    excludedKeywords: ['year_1973', 'year_1986', 'burkesville', 'distant_relatives', 'blue_rv', 'mother', 'the_mother', 'silas', 'conchar', 'konchar', 'lexington', '伯克斯维尔', '远亲', '房车', '母亲', '塞勒斯', '康查尔', '莱克辛顿', '1973', '1986', '调度站', '母校'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "伯克斯维尔……你居然在地图上找到了这个地方？\n\n至于说远亲……我想想应该从哪说起。你很难想象远亲的渗透情况，他们像真菌一样，存在于在全美的各个深夜调度站，或者像伯克斯维尔这样的镇子里。父亲的招募方法原始且高效，简单来说，房车就是一个在公路上移动的培养皿。男人们先用暴力，把人的自尊踩得粉碎，再让女人们出面，用她们的柔软，把碎片重新粘起来。这是一种制造同谋者的经典操作，然而始终有效。毕竟基于生理依赖的共犯结构，比兰利甩出的雇佣合同可要稳固得多。\n\n在伯克斯维尔那个满是泥泞的伐木场里，我第一次真正理解了家族的组织关系，刚钻进那辆车的时候，我还以为自己能保持自我呢。我不愿承认，母亲身上有一种引力，一种摄人心魄的虚弱感，诱惑你一起放弃抵抗，让我觉得在那堆烂肉里沉沦才是唯一的真实。",
        attitude: "",
        visual: "https://picsum.photos/seed/burkesville_lumber/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "康查尔很少动手，他的压迫感来自智力层面，想尽办法让我觉得坚持原则是一种智力缺陷。赛勒斯则不同，我也许能避开康查尔的嘲讽，但避不开赛勒斯。只要我表现出一丁点“不合群”，他就会毫不犹豫地把我变成一具需要处理的尸体。\n\n无论如何，最开始的大半年里，我几乎什么都不用做，仅在事情发生的时候替他们做些掩护性工作，这种日子一直持续到 1973年底，那是一个深夜，房车停在莱克辛顿一处调度站修整，而我则像个还在坚持打卡的幽灵一样，把又一枚灰水信标踢进了排水沟，那时候我还没有完全放弃，但也不那么期待有人真的回收它。\n\n我做完这一切，回到了车上，父亲并不知道我刚刚干了什么。他正同一个名叫鲍里斯·斯米尔诺夫的远亲坐在折叠桌旁，心情看起来好极了。",
        attitude: "",
        visual: "https://picsum.photos/seed/blue_rv_family/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "“罗伯特，别再想那些粗糙的抢劫了，你是时候拥有自己的作品了，”他的语气就像是在给刚成年的儿子递上一把车钥匙，“我要你为伯克斯维尔的远亲们设计一个好玩的计划，把那些警察耍得团团转。来吧，让我们看看你能干点什么。”",
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
        event: "让我来理理阿尔特曼的逻辑。\n\n首先，他宣称鲍里斯是个喝多了的乡巴佬，那些关于“家族”和“远亲”的供述全是胡话，然后信誓旦旦地告诉华盛顿，说根本不存在什么地下网络，一切都是雷吉博士臆想出来的，但马上——哈！看这儿——他忽然又担心起我来，说我这只失联地鼠，正在利用我在匡提科学到的战术，指导这群他刚说完根本就“不存在的乡巴佬”，去羞辱本地警察。\n\n他一头说我已经殉职，家族不存在，另一头，我又上天入地，不仅渗透了警方的防线，还逼得他切断 KLUB 的所有回收线路来保自己的乌纱帽。\n\n我得谢谢你给我看这个。真的，这让我心里的最后一点愧疚感也彻底烟消云散了。因为就在阿尔特曼忙着写这份报告的时候，我在做更有价值的事情。既然他觉得我是在利用 FBI 的战术指导犯罪，那我怎么能让他失望呢？",
        attitude: "",
        visual: "https://picsum.photos/seed/alterman_memo/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "第二个项目叫做「静态雪花计划」。这次不抢银行。我们找上了辛西娅·米勒，她是纳什维尔附近教会唱诗班的领唱，有着一头金发和所有人都会喜欢的甜美笑容，典型的“美国甜心”，这种人的失踪会让方圆两百英里的警察和媒体像疯狗一样扑过去。“母亲”保持着每周日前往教堂的习惯，是她为我们选中了辛西娅。\n\n不，我们完全不需要绑架她。在母亲的介绍下，「远亲」里的几个年轻人去接近她，他们告诉她，此时有一部地下电影正在筹拍，他们认为她就是那个当之无愧的主角。然后他们把她带到伯克斯维尔一个汽车旅馆里——在那我已经架好了摄像机。没有复杂的道具，只有她，一把椅子，和一台甚至收不到信号的老式电视机。\n\n我让她坐在那儿，对着那个只有雪花杂讯的屏幕。我指导她的表情，教她如何呈现出那种“接收到神谕”般的恍惚。我告诉她，这不是犯罪，这是一场前卫的行为艺术，我们要通过这些雪花，向世界传递一种只有神选者才能听懂的频率。",
        attitude: "",
        visual: "https://picsum.photos/seed/static_snow_filming/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "在LSD的作用下，当她对着镜头，用那种梦呓般的声音念出我写的台词。我看着取景框里的辛西娅，心中不由兴奋，这种感觉当差的时候可从没有过，怎么说呢，那是一种……创造的快感。想象吧，当警察破门而入，发现房间里只有这台电视机在一片死寂中不知疲倦地播放着录像，媒体会发疯，他们会把这称为“电视邪教”，家长们会恐慌，而FBI呢，他们会把本来用于追踪绑架案的黄金48小时，浪费在研究我的对白和那个根本不存在的“信号频率”上。\n\n事成之后，我们带走了辛西娅，他们被运往西部的分部，成为新的“远亲”，或者被赛勒斯处理掉，这取决于她是否听话。在她最后出现的旅馆房间里，我们只留下一样东西：那台还在播放雪花杂讯的电视机，循环播放那盘录像带。想象这样一个画面吧，当警察冲进房间，他们看不到搏斗痕迹，看不到血迹。他们只会看到甜美的辛西娅在电视里喝着一碗恶心的汤，宣称自己去了“信号的另一端”。\n\n就在那一刻我算是明白了。这一切与生存无关，也不是为了钱。这就是极致的乐趣，看着现实世界的秩序因为你制造的一个微小“故障”而彻底卡死，这是件多么有趣的事情！",
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
        event: "好吧，你赢了。你比阿尔特曼那帮蠢货看得更远。\n\n听着，我没疯，我知道我在做什么，我也知道你想问什么——“为什么不抓捕他们？”是的，那是1976年。从法律层面上讲，我有无数次机会。可那时候，除了康查尔之外，“父亲”也好，那个女人也好，他们的手在某种意义上甚至是“干净”的。他们没有亲自抢过银行，没有亲自扣动过扳机。\n\n我当然可以联络堪萨斯城的风化组，告诉他们有一辆房车里在搞乱伦、毒品和未成年淫乱。警察会冲进来，给他们戴上手铐。然后呢？“父亲”会请个好律师，把这变成一场关于宗教自由和生活方式的辩论，顶多交点罚款，或者在看守所待个把月。而真正的威胁——那些遍布全美物流网的远亲会蛰伏起来。我还没摸清他们的规模，还没拿到那份名单。",
        attitude: "",
        visual: "https://picsum.photos/seed/kansas_city_1976/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "当时我以为，只是抓个老头子，或许并没有意义。反过来说，我甚至还得喂饱他们，让这辆车继续开下去，直到犯下任何人都无法洗脱的重罪。\n\n于是我给他们设计了一个新的剧本，利用流动献血车。这个计划极度荒谬，没有任何经济收益，但父亲很喜欢。我让几名“远亲”在午休时间劫持了一辆停在广场上的大型采血车。我们没有伤害里面的护士和医生，只是把他们极其礼貌地请了下去，给他们买了咖啡。\n\n我们从一家名叫杰西·潘尼的百货商店里偷来二十个塑料服装模特，将这些永远带着僵硬微笑的塑料假人搬上车，把它们按在献血椅上。然后，我们将那些粗大的采血针头狠狠地扎进它们坚硬的塑料手臂里。我们将采血机的“输入端”反接到了一个巨大的加压罐上，里面装满上百升的动物血与红漆的混合液体。最后，我们把车停在闹市区，使用扩声器吸引人群注意，当人群聚集之后，加压罐就开始工作了。\n\n当警察和媒体赶到时，他们会发现在场的人们已被一幅超现实主义画作吓到。二十个衣着光鲜的塑料假人正安静地坐在献血椅上，红色的油漆顺着管子被强行泵入它们空心的身体，直到从它们的眼眶和嘴巴缝隙里溢出来，滴滴答答地流满了整个车厢的地板。",
        attitude: "",
        visual: "https://picsum.photos/seed/bloodmobile/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "这就是你想知道的关于堪萨斯城和献血车的故事，接下来到我提问了。\n\n你是怎么知道瓦妮莎的？\n\n在堪萨斯城行动的前夜，瓦妮莎找到了我。她没穿那身平时的蕾丝睡衣，而是披着一件不合身的男式夹克，我的夹克。她在那逼仄的过道里堵住我。她拉住我，手很冷，“别干这个，罗伯特，”她对我说着，声音抖得厉害，“你可以骗他们，甚至可以骗你自己，从你一上车，我就知道你跟他们不一样。可我不知道……我不知道为什么刚才在讨论计划时，你笑得那么开心。你……看起来比赛勒斯更像个怪物。”\n\n我哭笑不得，把她扔到一边去。你猜我当时在想什么？我想的是，少他妈多管闲事，这个计划根本不会伤害任何人——更何况，我总有一天要把你们全都抓进监狱。",
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
        event: "当然知道。\n\n那时候，电视新闻里正在铺天盖地地报道杰西·潘尼被捕的消息。有天早上，我坐在折叠桌旁，看着屏幕上那个被反铐着按进警车的胖子，心里充满了挫败感。我精心设计的荒诞剧，居然成了堪萨斯警局认领勋章的垫脚石。\n\n但父亲的反应完全不同。他当时正坐在我对面，手里拿着那把用了很多年的水果刀，在这个充满了机油味的早晨，他正在耐心地削着一个苹果。\n\n“别丧气，罗伯特。”他突然开口，眼睛没有离开手，“你看起来像个考砸了的小学生。”我说他们利用了我们要抓那个胖子，这足够令人生气了向外。父亲停下了刀，“你以为那是谁？罗伯特。那个自称杰西·潘尼的人，真名叫约翰·莫里西。他是这一带最大的‘肉贩子’。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "“从1965年起，那个爱尔兰杂种在堪萨斯盘踞了十年。”父亲咬了一口苹果，咀嚼的声音在安静的车厢里格外清晰，“他是个毫无审美的屠夫，把人拆碎了卖，就像卖猪肉一样。我曾经试图……感化他，让他明白规矩，但他太傲慢了。”\n\n“而你，我的孩子。你只是为了好玩，画了一幅画，摆了几个塑料人偶……你就做到了联邦政府十年都做不到的事。你不需要搜查令，不需要证据，你只是制造了一点点混乱，就让那一整座坚固的堡垒从内部塌陷了。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "父亲把那把水果刀插在桌面上，刀刃倒映出报纸上莫里西那张猪脸，“这就是混乱的美妙之处，罗伯特。你不需要瞄准。当你制造的风暴足够大时，自然产生的雷电迟早会击中那些该死的树。”他说。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_core/800/450"
      }
    },
    connectedTo: ["confession_12", "capone"]
  },
];
