import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER7_KEYWORDS: Record<string, KeywordMetadata> = {
  'mill_valley': { chapter: 7, type: 'location' },
  'reporter': { chapter: 7, type: 'person' },
  'fake_smoke_bomb': { chapter: 7, type: 'case' },
  'libby_town': { id: 'libby_town', chapter: 7, type: 'location', displayName: '利比镇', isPersistent: true, description: '蒙大拿州西北部一个靠近边境的偏僻伐木区。卡彭在过去十几年中多次前往。', source: 'Dialogue' },
  'libby_forest': { id: 'libby_forest', chapter: 7, type: 'location', displayName: '利比镇森林', isPersistent: true },
  'the_end': { id: 'the_end', chapter: 7, type: 'case', displayName: '终局', isPersistent: true },
  'blind_zone_camp': { id: 'blind_zone_camp', chapter: 7, type: 'location', displayName: '盲区营地', isPersistent: true },
  'tithe': { id: 'tithe', chapter: 7, type: 'case', displayName: '什一税', isPersistent: true },

  'humphrey_county': { chapter: 7, type: 'location' },
  'assault_on_police': { chapter: 7, type: 'case' },
  'forest_map': { chapter: 7, type: 'case', isPersistent: true },
  'frank_rollins': { chapter: 7, type: 'person' },
  'tucson_shooting': { chapter: 7, type: 'case', isPersistent: true },
  'wanted_poster': { chapter: 7, type: 'case', isPersistent: true },
  'felipe_maldonado': { chapter: 7, type: 'person' },
  'year_1983': { chapter: 7, type: 'year', isPersistent: true },
  'capone': { chapter: 7, type: 'person', isPersistent: true, isIdentity: true },
  'robert': { chapter: 7, type: 'person', isPersistent: true, isIdentity: true },
};

export const CHAPTER7_NODES: MemoryNode[] = [
  {
    id: "confession_29",
    keyword: "confession",
    title: "供述 No.29",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.75 },
    revealedKeywords: ['felipe_maldonado'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: `林地深处？东躲西藏？
        
        条子的脑子里果然只有这种无聊的刻板印象，把我们当一般通缉犯去想。实话告诉你吧，绝大部分时候，我们都开着房车平稳地行驶在洲际公路和国道上，我们在汽车旅馆加水，在加油站买热狗，像个四处旅行的普通家庭一样。偶尔几次，我们把车开进深山老林，也根本不是为了躲避什么。那只是因为父亲觉得无聊了，想找点‘乐子’，就像周末打猎的家庭聚会似的。实话说，1975年发生在红杉林里的那个事情，其实也就是这么回事。
        
        当那辆涂得花花绿绿的旧校车从我们营地旁开过去的时候，瓦妮莎就站在房车的遮阳篷下面，离那条土路只有不到十英尺。车上的嬉皮士大笑大叫，放着摇滚乐，把啤酒洒在路面上。这帮人又脏又蠢，一无是处，但自由得让人嫉妒。
        
        你见过一个已经被埋进土里的人，突然想要大口呼吸的样子吗？我当时就站在瓦妮莎的侧后方，看到她的眼睛，虽然那群人只顾着跟艾莉丝开玩笑，完全没注意到她，可是她却始终死盯着那辆大巴车，眼神跟着那片廉价的色彩一起钻进了红杉林深处。
        
        那是第一次在一个活死人身上看到那种近乎贪婪的、心驰神往的光。那群嬉皮士也就和她一样大吧，如果她也能在那辆车上，吹着风，哪怕只是做一个漫无目的、随波逐流的垃圾也好。
        
        彼时彼刻，父亲站在纱门后面。他没有看那辆嘈杂的校车，他一直在看着瓦妮莎的侧脸。半小时后，他让康查尔和艾莉丝带着酒去嬉皮士的营地，却让瓦妮莎坐在房车外面的篝火旁，哪里都不许去。我们就这么坐在黑夜里，听着远处传来的音乐声，慢慢变成痴笑和惨叫交织的声音。
        
        等到半夜，艾莉丝回到营地时，还给瓦妮莎带回了一张带血的演出海报。“那群傻蛋是从墨西哥一路开到这的，还想邀请我去他们周末在镇上的演出呢，”艾莉丝说，“那会我没告诉他们，计划有变，他们这副模样可演不了出呢。”
        
        瓦妮莎接过海报，即便她知道这是艾莉丝的存心戏弄，也还是将它小心翼翼折叠好，收藏起来。`,
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/felipe_maldonado_poster.jpg`
      },
      [MemoryLayer.DEEP]: {
        event: "",
        attitude: ""
      }
    },
    connectedTo: ["confession_21"]
  },
  {
    id: "confession_30",
    keyword: "confession",
    title: "供述 No.30",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.3 },
    revealedKeywords: ['libby_town', 'tithe', 'year_1967'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "听着，即便你知道鲑溪小径的事，即便你知道她是在那个晚上跟我表露心声的，你也不该把那两个词关联在一起。这对她太不尊重了。\n\n那天晚上雾特别大，空气里全是烂树叶的味道。房车停在红杉林的最深处，引擎熄火之后，整个世界都安静了下来。我就坐在车门外的台阶上抽烟，听着水滴砸在车顶上的声音。不知道为什么，那天晚上好像所有人都消失了。\n\n瓦妮莎推开纱门走了出来。父亲那天大概给她加了药量，她连站都站不稳，夜风一吹整个人直发抖。她呆滞地坐在离我不远的泥地上，盯着远处的黑暗发愣。我脱下皮夹克，走过去披在她那薄得能摸到骨头的肩膀上。在这群人里，我是唯一知道这时候该怎么做的人——那就是闭嘴，别去碰她，也别去惊扰她。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/william_dawson_portrait.png`
      },
      [MemoryLayer.DEEP]: {
        event: "感觉到衣服的重量后，瓦妮莎突然转过脸死死盯着我。她的视线穿透了林子里的浓雾，看了我很久。然后，她忽然伸出手，冰凉的手指碰到了我的侧脸，用梦呓一样的声音叫了一个名字。“亚瑟……是你来带我走了吗？”\n\n我没有躲开她的手，也没有去纠正她。紧接着，她突然崩溃了，一头扎进我的怀里。没有任何声音，只有滚烫的眼泪大颗大颗地砸在我的衬衫上。她死死抓着我的胳膊，指甲几乎要抠进我的肉里，像个溺水的人抓住了最后一块木板。\n\n瓦妮莎告诉我，她之前撒谎了。她曾说她不记得亚瑟，但其实她记得清清楚楚。她记得那是1967年，就在那个蠢货被父亲干掉之前，他是怎么在深夜里向她承诺，一定会带她离开这条永远伴随着惨叫声的公路，去一个能大口呼吸干净空气的地方。他还告诉她，如果他没能活着带她走，只要她有机会跑出去，就一定要去蒙大拿州的利比镇，那是他的家乡。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/william_dawson_inscription.png`
      },
      [MemoryLayer.CORE]: {
        event: "瓦妮莎哆唆着，从贴身衣物的最里层扯出一根细细的银链子。链子底下挂着个廉价的、边缘生了黑锈的银色小吊坠盒。她抖着手抠开那个生锈的搭扣，里面塞着一张剪得极小、极粗糙的黑白照片。照片上是年轻的亚瑟和他的父亲，两人站在一棵巨大的红杉树下。亚瑟告诉她，如果最后只有她一个人逃出去，只要带着这个吊坠，随便敲开利比镇哪家伐木工酒馆的门，把这张照片给那些老家伙看，他们就会帮她、照顾她。\n\n此时此刻，药效终于不可抑制地涌了上来。她靠着我昏睡了过去，微弱的光线照着她苍白的皮肤，上面的淤青清晰可见。或许有一天，我会亲自把她送上那趟去利比镇的灰狗巴士呢？我在心里这么想着。可几乎就是一瞬间，惊恐感便替代了这种妄想。不用想也知道，父亲会有一万种方法阻止这件事情发生，而亚瑟的结局就是最好的预演。\n\n后来我去过利比镇，甚至凭借记忆找到了那棵红杉树。但那里什么都没有，我没有找到姓道森的人，也没有找到叫瓦妮莎的女孩。我幻想着，或许在我从灰狗巴士上下车的一刹那，整个小镇便已严阵以待，所有人联合起来演了一出戏——就在我站在那棵红杉树下的时刻，瓦妮莎其实正躲在远处的某个地方，小心翼翼地看着我。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/william_dawson_pendant.png`
      }
    },
    connectedTo: ["confession_22", "capone", "vanessa", "arthur_dawson"]
  },
  {
    id: "confession_31",
    keyword: "confession",
    title: "供述 No.31",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.2 },
    revealedKeywords: ['humphrey_county', 'assault_on_police', 'year_1967'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我最后一次去利比镇的时候，在林区像个没头苍蝇一样转悠了好几天，除了一片长满杂草的空地，什么都没找到。最后，我站在一片松林地旁抽烟，心里忍不住地怀疑，或许道森一家只不过是瓦妮莎在药效发作时的妄想。\n\n没想到，他们的尸骨可能就埋在我当时站的地方。\n\n总之你给的信息太多了，我得好好想一想。先说汉弗莱监狱把，那就是我认识康查尔的地方，他1967年因为袭警被捕，这是他告诉我的。所以他被捕的时候还带着凶器是吧？一路从蒙大拿州跑到缅因州区……那如果他是杀害道森的元凶，着意味着父亲早就知道了亚瑟和瓦妮莎的计划，这是亚瑟和他的一家最终丧命的真正原因。\n\n可为什么瓦妮莎却能安然无恙呢？不仅安然无恙，而且对整件事毫不知情。\n\n等等——我知道了。瓦妮莎说过，1967年，她曾在感化院待过半年，那回父亲非常反常地逼她去一个公路便利店里‘拿’补给。现在看来这其实就是个圈套，那天父亲可能就坐在车里眼睁睁看着巡警把她按在泥地上。盗窃的罪名不大不小，刚好够瓦妮莎在感化院待三个月。三个月过完，他们开着一辆重新涂装过的房车，来到曼丹市的北达科他州青少年矫正机构接她，并告诉她康查尔得在缅因州待上一阵子了，然后整整四年过去，到某一天，她忽然看到我和康查尔一同登上了这辆房车。\n\n可这到底是为什么呢？他为什么要费尽心机骗过瓦妮莎。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/confession_31_residue_custom.jpg`
      },
      [MemoryLayer.DEEP]: {
        event: "",
        attitude: ""
      }
    },
    connectedTo: ["confession_32", "capone", "vanessa", "frank_rollins"]
  },
  {
    id: "confession_32",
    keyword: "confession",
    title: "供述 No.32",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.4 },
    revealedKeywords: ['mandan', 'forest_map', 'frank_rollins'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你一定是在骗我，或者，是我疯了。\n\n我脑海当中一直有段记忆，那是在犹他州的时候，外面整日阴雨，某个下午，我坐在副驾驶抽烟，其他人都在忙别的，我从后视镜里看到她光着脚站在水槽边，把地图贴在木墙上，再把冰箱挪回原位。我什么都没说，我知道那是她唯一的指望。\n\n你们这些警察，拿着相机跑到一个个案发现场，收集弹壳，拍下干涸的血迹。其实这是最简单的，血迹干了说明事情已经结束了。可我见过那些活生生的事情，就在我的眼前。\n\n做掉阿列克谢那次，她负责搞定车子，结果水箱漏了，事后老头子没处撒气，先用拖车的麻绳把她的手绑在后保险杠的钢架上，让她跪在沥青路上。直到老头睡着了，我赶紧拿块湿布把水拧在她的额头和身上，再把打死结的绳扣弄松。她抬头看我，嘴唇上全是裂开的血痂，一句话也没说。\n\n后来为了引索恩上钩，母亲拿着注射器，直接把士的宁打进她的血管里。完事之后，她被扔在后排的床垫上，痛得脊椎反弓。我怕她咬断舌头，赶忙按着她，把皮带塞进她的嘴里，她指甲在我手背上抠出了十几道血沟。\n\n她告诉过我，被关起来的那几个月，每时每刻她都在盼望着，当自己被放出去那天，父亲没有出现，母亲没有出现，塞勒斯没有出现，康查尔，也就是你所谓的弗兰克·罗林斯没有出现，她可以无忧无虑地在公路上走，像那些搭车客一样，朝着驶向北方的车辆伸出她的大拇指。你觉得这些时刻她是怎么熬过来的？除了地图之外，她还能有什么别的念想吗？现在你说，这辆车是威廉·道森的，这分明解释不通。67年11月，他们把瓦妮莎送进惩戒，然后出发去利比镇，杀光了道森一家，把这辆车开回来。可亚瑟则在67年初就已经死了，如果这车是他死后才被他们偷来的，那我在底盘暗格里抠出来的那个笔记本又哪来的？\n\n它为什么被会藏在这辆车里。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/confession_32_vanessa_sketch.png`
      },
      [MemoryLayer.DEEP]: {
        event: "",
        attitude: ""
      }
    },
    connectedTo: ["confession_30", "capone", "vanessa", "conchar"]
  },
  {
    id: "confession_33",
    keyword: "tucson_shooting",
    title: "供述 No.33",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.55 },
    revealedKeywords: ['year_1983', 'vanessa', 'capone', 'precinct_4', 'tucson_shooting', 'wanted_poster'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "这是她吗？她看起来和我记忆中的模样有点不一样。\n\n所以她的确逃走了。至少没有被关在监狱，这跟我猜的一样。我以为利用特警防线绊住康查尔他们三个，她就能靠着那张地图跑掉，但我还是低估了黑索金的威力。\n\n安顿好父亲之后，我用一本他做的加拿大护照返回了美国，我去过图森市，顺着10号公路找遍了每一个汽车旅馆和废车场。我买通了德州边境巡逻队的一些人，请他们留意她的行踪，同时也从锡纳罗亚的走私客手里买情报，请他们也注意。为了找她，我很快就花光了父亲留存的备用金，大概有三年时间，我被带去认过十几次无名女尸。有些在沙漠里风化得只剩皮包骨，有些在格兰德河里泡得肿胀变形。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/robert_capone_wanted_poster.png`
      },
      [MemoryLayer.DEEP]: {
        event: "每次法医揭开散发着福尔马林和腐肉味道的塑料布，我连呼吸都觉得肺里像塞满了碎玻璃。我极其害怕看到一具背部布满烫伤的尸体，但他们都不是她。我不知道这算是好消息还是坏消息，她大概还没死，但未必没在某个地方受苦，又或者，只是我找寻得还不够彻底。\n\n与此同时，我也在找艾莉丝和莫兰迪。但在那场爆炸的大火熄灭之后，这两个人就消失了，没留下半点影子，我一度怀疑FBI是不是已经把他们秘密拘捕了，但我探听不到任何风声。找得快要发疯的时候，我差点决定直接返回匡提科，很显然我将在牢里待到死的那天，但依靠情报网络，警方很有机会在我的协助下找到这两个人。然而阻止我的依然是瓦妮莎的下落不明。\n\n就在 1983 年复活节刚过完的那几天，在奥德赛一个邮局，我在布告栏上看到了我自己的通缉令。\n\n没有照片，只是一张粗糙的素描，但我知道那是我。这幅画是艾莉丝刚刚上车时给我画的，父亲说，她的眉骨和下巴画得很像我。通缉令上并没有将[罗伯特·卡彭](clue:capone)与图森市或者加州那些爆炸案关联起来，只是写着“极度危险”和“涉嫌跨州袭警与使用军用爆炸物”。\n\n我知道，这是艾莉丝给我写的信，她在告诉我，我们可还在外头呢，就在某个地方。你在哪呢？我们会找到你的，你猜瓦妮莎在不在我们手里？",
        attitude: ""
      }
    },
    connectedTo: ["capone", "vanessa"]
  },
];
