import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER6_KEYWORDS: Record<string, KeywordMetadata> = {
  'portland': { id: 'portland', chapter: 6, type: 'location', displayName: '波特兰', isPersistent: true, description: '俄勒冈州最大的城市。', source: 'Confession' },
  'achilles_heel': { chapter: 6, type: 'case' },
  'redwood_forest': { chapter: 6, type: 'location' },
  'pow_camp': { chapter: 6, type: 'case' },
  'santa_barbara': { id: 'santa_barbara', chapter: 6, type: 'location', displayName: '圣芭芭拉', isPersistent: true },
  'closing_the_net': { chapter: 6, type: 'case', isPersistent: true },
  'laguna_beach': { id: 'laguna_beach', chapter: 6, type: 'location', displayName: '拉古那海滩', isPersistent: true, description: '加州的一处海岸，卡彭在此遭遇了剧烈的逻辑坍塌。', source: 'Confession' },
  'naked_root': { chapter: 6, type: 'case', isPersistent: true },
  'albuquerque': { id: 'albuquerque', chapter: 6, type: 'location', displayName: '阿尔伯克基市', isPersistent: true },
  'chemist_lover': { chapter: 6, type: 'case', isPersistent: true },
  'santa_fe': { id: 'santa_fe', chapter: 6, type: 'location', displayName: '圣菲', isPersistent: true, description: '新墨西哥州首府，信标汇聚点的关键坐标。', source: 'Confession' },
  'bonny_and_clyde': { chapter: 6, type: 'case', isPersistent: true },
  'alexei': { chapter: 6, type: 'person' },
  'morandi': { chapter: 6, type: 'person' },
  'gore_and_levy': { chapter: 6, type: 'person' },
};

export const CHAPTER6_NODES: MemoryNode[] = [
  {
    id: "confession_25",
    keyword: "confession",
    title: "供述 No.25",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.8 },
    revealedKeywords: ['santa_fe', 'bonny_and_clyde'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "拿到签字的第二天，我和艾莉丝便出发前去新墨西哥州的阿尔伯克基了。艾莉丝告诉父亲，莫兰迪入狱前，曾像松鼠囤积坚果一样，在阿尔伯克基郊区的沙漠里租了一个工业仓库，里面堆满了他制作完成的高能炸药，父亲认为应该清点库存，而艾莉丝坚持要带我去。\n\n在这辆黑色雪佛兰轿车里，我握着方向盘，手心全是汗。 这是我上车三年来，第一次脱离“父亲”的视线单独行动。 我有无数个机会结束这一切。 如果我在下一个路口左转，只要二十分钟就能开到圣菲的州警总局，我可以把车停在门口，把艾莉丝按在引擎盖上，结束这场噩梦。 或者……我可以一直往南开。开过华雷斯，进入墨西哥。车后备箱里有父亲给的五千美元活动经费，身边坐着一个足以让任何男人疯狂的尤物。我们可以像邦妮和克莱德一样，在那片无法无天的土地上消失。",
        attitude: "",
        visual: "https://picsum.photos/seed/chevrolet_desert/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "但这只是幻想。 因为艾莉丝坐在副驾驶上，像只慵懒的猫一样蜷缩在座位里，脱掉鞋，把脚搭在仪表盘上。她点了支细长的薄荷烟，烟雾弥漫出车窗飘向远处。我看向窗外，窗外是无边红土和像墓碑一般的平顶山，太阳把万物都烤得扭曲变形。\n\n“你在想什么，罗伯特？” 她侧着头看我，指尖轻轻划过我握着方向盘的手臂，那种冰凉的触感让我在燥热的沙漠里打了个寒战。她看穿了我。不知道为什么，我忽然产生了这个疯狂的想法。\n\n“你知道塞勒斯最大的问题是什么吗？”她吐出一口烟圈，声音低沉而充满诱惑，“他是一把锤子。好用但笨重，但你不一样……”",
        attitude: "",
        visual: "https://picsum.photos/seed/alice_smoking/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "“父亲老了，”她凑近我，身上的香水味钻进我的鼻孔，“以后我们一定能做点更疯狂的事情，只要你听话，把脑子里的杂念清空，把自己完全交给我……我会用你切开这个世界的喉咙。”她把手伸向我的下腹，我瞬间有种奇异的感受，车明明在沙漠公路上飞驰，我却感到自己正在坠落。我承认，我想象着像塞勒斯那样，把头埋进她的怀里。接着我的手松也开了方向盘，遵照她的指令，慢慢滑向她的大腿。我眼神开始涣散，呼吸像发情的狗一样急促。这时远处出现一片雄伟但衰败的工业区，艾莉丝变得更加兴奋，她说那就是莫兰迪的火药库，满满一仓季戊四醇四硝酸酯（PETN），等拿到它之后，只需要几百克就能把一座装满小孩的幼儿园炸上天。\n\n我不知道是不是她语气的缘故，也不知道是嫉妒心作祟，总之，一瞬间有根针刺破了填满车厢的粉红色气泡，我下意识纠正她，说如果莫兰迪真如她所说是行家，那他绝不会信任PETN在高温环境下的稳定性，我赌他宁愿选择黑索金（RDX）与TNT的混合注塑炸药，那东西较为吃顿，更适合长期储存。我话音刚落，车厢里的空气瞬间凝固住，艾莉丝抽走了她的手，她没有反驳，只是慢慢转过头，看着车窗外，我这才意识到自己说错话了。塞勒斯分不清PETN和RDX的区别，塞勒斯只会流着口水说，是的，女王，炸飞他们。\n\n“你懂很多，是吗，罗伯特？”艾莉丝的声音变得很轻，“别看你平时装得像个脑子被烧坏了的废物似的，其实你很会演戏。”\n\n我没有说话，而是重新握紧方向盘。沙漠的风卷着沙砾打在车窗上，发出沙沙响声。",
        attitude: "",
        visual: "https://picsum.photos/seed/desert_industrial/800/450"
      }
    },
    connectedTo: ["confession_24"]
  },
  {
    id: "confession_26",
    keyword: "confession",
    title: "供述 No.26",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.8 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "塞勒斯被炸死的两个月后，他的位置终于被填补上了。\n\n我记得那天早晨海湾的雾气很大，圣昆廷监狱的重型铁门若隐若现，像是从未被开启过。我在车上，看到莫兰迪从迷雾中走出来。他比剪报上更瘦，像个刚下班的会计师一样。走到近前，莫兰迪跟车上的每一个人握手，艾莉丝不紧不慢地走上前来，忽然掏出一支冰锥，扎进对方大臂。莫兰迪显得毫不意外，任由她吮吸伤口良久，又将血吐在房车的地毯上。\n\n“欢迎回到派对，”艾莉丝说完，用舌头舔了舔嘴唇上的血。\n\n自从莫兰迪上车后，房车里的空气就变了，苦杏仁、丙酮，还有那种让人舌根发麻的金属味，这里闻起来像是一个随时会爆炸的化学实验室。从洛杉矶法院门前的汽车炸弹，到圣迭戈海军基地，半年内，我们在西海岸制造的动静远比此前一年加起来都要响。\n\n但我越发感到不安。自从阿尔伯克基那次失言后，艾莉丝看我的眼神越来越不对劲。她像一只闻到了血腥味的鲨鱼，总是游弋在我的周围。 我必须先下手。 当父亲宣布要伪装成“爱尔兰共和军”去袭击凤凰城的联邦储备银行时，我意识到，这是我最后的机会了。\n\n在出发前往亚利桑那的前夜，趁着莫兰迪在调试引爆器、康查尔则和父亲在规划路线的时刻，我撬开那个幽闭的备胎箱。瓦妮莎蜷缩在那里，已经瘦得只剩一副骨头。她惊恐地看向我，眼神中已经没有任何信任。\n\n我把一个防水袋塞进她的手里。 “听着，这是我们离开的唯一机会。你拿上它，等我引开其他人后，你就往东跑，跑到图森市的州警检查站，把这些东西交给他们。我会想办法逃出来，然后带你走。”\n\n“这是什么？”瓦妮莎颤抖着问，我说这里有录音，还有那个微缩胶卷，把它们交给FBI，这些罪证足以让父亲在绞架上被吊死三次。 瓦妮莎将信疑地打开纸袋，当她看清其中的东西后，眼泪瞬间涌了出来。\n\n第二天清晨，当父亲发现瓦妮莎踪影全无时，他看起来真的很生气。\n\n“那个贱人，她要把我们全卖给FBI！”我佯装愤怒，此时莫兰迪的反应也如我预期，他凑近父亲的耳朵说了些什么，父亲紧绷的面色马上缓和了。 我知道莫兰迪在说什么，他告诉父亲，他已经在那个装有胶卷的防水袋夹层里，提前缝上了一个RF射频发射器。而他之所以这么做，一定也是因为艾莉丝对他说了些什么。\n\n但他没有猜到，这一切早都被我看在了眼里。\n\n果然，父亲派出康查尔、莫兰迪加上艾莉丝三人去追击瓦妮莎，唯独留下了我。 看着那辆轿车卷着尘土消失在沙漠公路上，我转过身，锁上了房车的门。\n\n父亲驾驶着房车，驶入85号公路，周围是无尽的仙人掌和像墓碑一样耸立的红土山。 我走到了副驾驶座后面。母亲手里依然拿着那根针，正在缝补康查尔留下的一件衬衫。 我深吸一口气，拿起了桌上那把用来切冻肉的锯齿钢刀。 “罗伯特？”母亲察觉到了身后的阴影，她转过头，浑浊的眼睛露出了困惑，“你要做什么？”\n\n我的手很稳，钢刀从她的左侧颈动脉刺入，横向用力一拉。母亲没有尖叫，但被切开的气管止不住地发出嘶嘶声，鲜血像高压水枪一样喷溅出来。\n\n在父亲转过头之前，我已经来到了他的身后。 “好好开车，父亲，”我贴着他的耳朵，跟我的枪口一样近，“我们要穿越边境。”\n\n父亲瞥了眼尸体，然后瞟向后视镜，我们在那对视了一眼。\n\n“他们告诉我，说你是警察，你猜我是怎么回答的，亲爱的罗伯特？”他说，“我说你杀不了我。”\n\n不得不承认，他说的是对的。我早就清楚这些年的药物和洗脑训练意味着什么，即便我想要开枪，我的身体也会抗拒我。 但我很早就知道这一点。正因如此，我更清楚，想要完成这些年潜伏的任务，我唯独只有一个办法——利用瓦妮莎无尽的信任，用她做饵调开其他人，然后斩断父亲与家族、与“远亲”的所有联系。\n\n就在这时，固定在驾驶座旁的警用扫描仪突然响了。我用父亲那台发报机，伪装成电台爱好者，向警方泄露了一伙“持有重武器的劫匪”的行踪，根据计划，他们会先找到瓦妮莎，然后阻击到追踪到那的另外几个人。此时对讲机内传来激烈的交火声，紧接着是一阵密集的自动步枪扫射声。 警方通报随即传来：“我们刚刚击毙一名嫌疑人……另外两名嫌犯裹挟人质逃入沙漠腹地……正在请求空中支援……”\n\n我听到了，父亲自然也听到了，“接下来怎么办呢，罗伯特？他们干掉了一个，但还剩两个。”\n\n “安心开车吧，我们去一个没有人认识你的地方。”我从怀里掏出那本黄色的密码本，在他面前晃了晃，然后塞进自己的口袋。\n\n“听起来像是天堂。”父亲笑盈盈地说。\n\n“没有人知道你还活着或是死了，”我说，“在我学会如何朝你开枪之前，你都会一直待在那里。”\n\n“真是个不错的计划。”父亲踩了一脚油门，母亲的尸体随着颠簸晃动着，像是重新活了过来。 \n\n我看向手里的枪，枪口指向父亲的太阳穴，子弹已经准备好。这是一次押送，毫无疑问。 但我个人忽然有些恍惚，究竟是谁要把谁带到那个被遗忘的地方。不过这都无所谓了，没有人会知道父亲现在在哪，即便是你，我的朋友。",
        attitude: "",
        visual: "https://picsum.photos/seed/rv_driving_sunset/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "[SHATTER_TRIGGER]",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/capone-split-personality.jpg`
      }
    },
    connectedTo: ["confession_25"]
  },
  {
    id: "confession_27",
    keyword: "confession",
    title: "供述 No.27",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.2 },
    revealedKeywords: ['morandi'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "关于莫兰迪……他那种人从不追求瞬间的爆炸。他喜欢把恶意埋在时间里，像酿造一瓶‘迟摘特酿’。 1976年的米尔谷，那个调查记者以为自己躲在高处就很安全，但他不知道，莫兰迪已经在他的地基里安置了一个极其精密的触发器。 那是一套利用沥青粘度随温度变化而滴落的延迟装置。 莫兰迪告诉我，‘罗伯特，重力是不朽的，而所有的等待都会在变质的那一刻得到奖赏。’ 后来那个记者在几个月后的一个深夜，在他的书房里被炸成了粉末，那时他甚至已经忘了自己调查到哪一步了。 这就是莫兰迪的美学，一种关于耐心、时间和彻底毁灭的病态展示。",
        attitude: "",
        visual: "https://picsum.photos/seed/mill_valley_house/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "",
        attitude: ""
      }
    },
    connectedTo: ["confession_26"]
  },
  {
    id: "confession_28",
    keyword: "confession",
    title: "供述 No.28",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
    revealedKeywords: ['gore_and_levy'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你在查那两个失踪的探员？戈尔和列维。 1976年的拉古那海滩，那里的海沟深得能吞噬掉所有的秘密。 艾莉丝那天特别兴奋，她在那两名探员的福特监视车下面塞了一个极其微小的、莫兰迪特制的催眠气体包。 当他们因为缺氧而昏迷时，是我亲手把那辆厚重的防弹车推进了太平洋。 康查尔在岸边看着，手里拿着一罐冰镇啤酒。 他对我说，‘罗伯特，你看，他们到死都以为自己在岸边。这就是我们。’ 我没说话，只是看着那串没入水面的气泡消失不见。 后来我一直在想，是不是有人在暗中泄露了我们的行踪，否则局里怎么会那么精准地派人跟上那台房车？ 艾莉丝怀疑过我，但我知道，她更怀疑那个一直躲在车顶夹层里的影子。",
        attitude: "",
        visual: "https://picsum.photos/seed/ocean_cliff/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "",
        attitude: ""
      }
    },
    connectedTo: ["confession_27"]
  }
];
