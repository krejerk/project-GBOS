import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const IDENTITY_KEYWORDS: Record<string, KeywordMetadata> = {
  'capone': { id: 'capone', chapter: 7, type: 'person', displayName: '罗伯特·卡彭', isIdentity: true, isPersistent: true, description: '潜伏阶段使用的身份代号，KLUB计划的重点关注对象。', source: 'Confession' },
  'robert': { id: 'robert', chapter: 7, type: 'person', displayName: '罗伯特', isIdentity: true, isPersistent: true },
  'vanessa': { id: 'vanessa', chapter: 4, type: 'person', displayName: '瓦妮莎', isIdentity: true, isPersistent: true, description: '康查尔带来的女孩，亚瑟·道森的女儿。', source: 'Confession' },
  'father': { id: 'father', chapter: 7, type: 'person', displayName: '父亲', isIdentity: true, isPersistent: true, description: '家族的最高首领，精神支柱。', source: 'Confession' },
  'mother': { id: 'mother', chapter: 4, type: 'person', displayName: '母亲', isIdentity: true, isPersistent: true },
  'silas': { id: 'silas', chapter: 7, type: 'person', displayName: '赛勒斯', isIdentity: true, isPersistent: true, description: '家族的清理员，负责处理各种“麻烦”。', source: 'Confession' },
  'conchar': { id: 'conchar', chapter: 7, type: 'person', displayName: '康查尔', isIdentity: true, isPersistent: true, description: '家族的长子，极其残忍的暴力实施者。', source: 'Confession' },
};

export const IDENTITY_NODES: MemoryNode[] = [

  {
    id: "capone",
    keyword: "capone",
    title: "罗伯特·卡彭 (Robert Capone)",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    revealedKeywords: ['conchar', 'luciano', 'gbos'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你终于来了，我的朋友。我还以为这个阴暗潮湿的地下室，就是我最后的归宿呢。你刚才问起罗伯特？哈哈，真是有意思。你是指那个被雷吉博士选中的幸运儿？还是指那个迷失在内华达沙漠里的丧家犬？或者……是你面前这个除了记忆一无所有的疯子？",
        attitude: "嘲弄且疏离",
        visual: `./assets/capone-portrait.jpg`
      },
      [MemoryLayer.DEEP]: {
        event: "别用那种审视的眼光看着我，潜航者。你所谓的调查，对我来说就像是在翻看一本别人的旧账。那个叫罗伯特的探员，他在 1973 年的那个冬天就已经死在辛辛那提的雪地里了。在那之后活着的，只是一个为了生存而学会了所有变态技巧的寄生虫。你觉得他在找‘父亲’？不，他只是在找他自己弄丢了的那部分良心，而那个东西，早在房车启动的那一刻，就被碾碎在 80 号洲际公路上。不过，如果你坚持要查下去，那我们就从那个让他第一次感到心寒的名字开始吧……卢西亚诺。那是个连康查尔都不愿轻易提起的狠角色。",
        attitude: "痛苦与坦白",
        visual: `./assets/capone-young.jpg`
      },
      [MemoryLayer.CORE]: {
        event: "你还是不明白，对吗？在这里，没有真理，只有由于痛苦产生的幻觉。卡彭并没有藏起父亲，他只是把自己变成了一座活着的坟墓。如果你真的想找到答案，你就得跟我一起钻进那桶长满了蛆虫的腐肉里，去感受那种为了重生而必须忍受的恶臭。不过在那之前，先去问问关于那份[计划](clue:gbos)的事情吧，那才是所有噩梦的源头。",
        attitude: "疯狂与绝望",
        visual: `./assets/capone-eye.jpg`
      }
    },
    connectedTo: ["luciano", "gbos"]
  },
  {
    id: "luciano",
    keyword: "luciano",
    title: "卢西亚诺 (Luciano)",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.65, y: window.innerHeight * 0.4 },
    revealedKeywords: ['lundgren', 'ritual_case'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "卢西亚诺……这个名字在房车里就像是一把生锈的锯子。他是那种你永远不想在深夜停车站遇到的那种人。康查尔管他叫‘会计师’，因为他总是能精准地计算出每一桩恶行能换来多少筹码。他从不亲手杀人，但他能让杀人变成一桩有利可图的生意。1968 年柯特兰的那场祭祀案，如果没有他在背后运作那些赃款和人脉，伦德格兰那个疯子早就被本地警察打成筛子了。",
        attitude: "厌恶与恐惧",
        visual: `./assets/luciano-silhouette.jpg`
      },
      [MemoryLayer.DEEP]: {
        event: "在卢西亚诺眼中，人类的情感只是某种可以被量化并交易的商品。他不仅管理账目，更管理着那些‘远亲’。他知道谁欠了赌债，谁的妻子有了外遇，谁在私吞毒资。这些秘密就是他的账本。父亲之所以信任他，是因为在这个充斥着疯子和暴徒的家庭里，只有他是唯一的理性的毒蛇。他用最冷静的方式，把地狱变成了生意。",
        attitude: "厌恶与警惕"
      }
    },
    connectedTo: ["capone", "confession_2"]
  },
  {
    id: "gbos",
    keyword: "gbos",
    title: "青豆牡蛎汤计划 (GBOS)",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.4 },
    revealedKeywords: ['dr_reggie', 'training_day'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "Green Pea Oyster Soup……多么可笑的名字。 兰利的那些文官们一定觉得这很有趣。 实际上，这不仅仅是一个计划的代号，它是一种病毒。 一旦你喝下了那碗由雷吉博士亲手调制的‘浓汤’，你的世界就再也没有黑白了。 所有的忠诚、背叛和正义，都会在那股浓郁的豆腥味里化为乌有。 别被那个名字骗了，潜航者。 这个计划的唯一目的，就是测试一个人在彻底失去所有社会属性后，还能剩下多少纯粹的恶意。",
        attitude: "冷笑与鄙夷",
        visual: "https://picsum.photos/seed/green_soup/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "这项计划不仅仅是针对外界的渗透，更是针对我们这些‘种子’的筛选。雷吉博士认为，只有当一个人彻底明白自己的软弱，并亲手打碎这份软弱时，他才能成为一件完美的工具。我就是那批种子里的幸存者。那种豆腥味，至今还常在我的噩梦里翻涌。",
        attitude: "深陷梦魇"
      }
    },
    connectedTo: ["capone", "confession_4"]
  }
];
