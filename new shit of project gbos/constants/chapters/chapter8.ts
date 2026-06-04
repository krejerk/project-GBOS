import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER8_KEYWORDS: Record<string, KeywordMetadata> = {
  'holy_springs': { id: 'holy_springs', chapter: 8, type: 'location', displayName: "圣泉镇", isPersistent: true, description: "科罗拉多州的一个偏远小镇，曾发生过离奇的“恶灵附身”事件。", source: "Archive" },
  'MTXXXXXXXX-93': { id: 'MTXXXXXXXX-93', chapter: 8, type: 'case', displayName: "联邦最高通缉令案卷", isPersistent: true, description: "安娜·理查德通过通灵画像强推上来的案件，后被揭露为精心策划的心理实验。", source: "Archive" },
  'QTC-VA-0994': { id: 'QTC-VA-0994', chapter: 8, type: 'location', displayName: "匡提科法证实验室QTC-VA-0994", isPersistent: true, description: "马库斯·索恩工作的地方，他在那里通过显微镜揭开了圣泉镇奇迹的真相。", source: "Archive" },
  'photo': { id: 'photo', chapter: 8, type: 'case', displayName: "照片", isPersistent: true, description: "瓦妮莎吊坠盒里塞着的黑白照片，是她寻求利比镇救赎的唯一指引。", source: "Confession" },
  'year_1983': { id: 'year_1983', chapter: 7, type: 'year', displayName: "1983", isPersistent: true },
  'capone': { id: 'capone', chapter: 7, type: 'person', displayName: "罗伯特·卡彭", isPersistent: true, description: "潜伏阶段使用的身份代号，KLUB计划的重点关注对象。", source: "Confession" },
  'frank_rollins': { id: 'frank_rollins', chapter: 7, type: 'person', displayName: "弗兰克·罗林斯", isPersistent: true },
  'year_1967': { id: 'year_1967', chapter: 1, type: 'year', displayName: "1967", isPersistent: true }
};

export const CHAPTER8_NODES: MemoryNode[] = [
  {
    id: "confession_33",
    keyword: "confession",
    title: "供述 No.33",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.55 },
    revealedKeywords: ["year_1983", "capone"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "这是她吗？她看起来和我记忆中的模样有点不一样。\n\n所以她的确逃走了。至少没有被关在监狱，这跟我猜的一样。我以为利用特警防线绊住康查尔他们三个，她就能靠着那张地图跑掉，但我还是低估了黑索金的威力。\n\n安顿好父亲之后，我用一本他做的加拿大护照返回了美国，我去过图森市，顺着10号公路找遍了每一个汽车旅馆和废车场。我买通了德州边境巡逻队的一些人，请他们留意她的行踪，同时也从锡纳罗亚的走私客手里买情报，请他们也注意。为了找她，我很快就花光了父亲留存的备用金，大概有三年时间，我被带去认过十几次无名女尸。有些在沙漠里风化得只剩皮包骨，有些在格兰德河里泡得肿胀变形。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "每次法医揭开散发着福尔马林和腐肉味道的塑料布，我连呼吸都觉得肺里像塞满了碎玻璃。我极其害怕看到一具背部布满烫伤的尸体，但他们都不是她。我不知道这算是好消息还是坏消息，她大概还没死，但未必没在某个地方受苦，又或者，只是我找寻得还不够彻底。\n\n与此同时，我也在找艾莉丝和莫兰迪。但在那场爆炸的大火熄灭之后，这两个人就消失了，没留下半点影子，我一度怀疑FBI是不是已经把他们秘密拘捕了，但我探听不到任何风声。找得快要发疯的时候，我差点决定直接返回匡提科，很显然我将在牢里待到死的那天，但依靠情报网络，警方很有机会在我的协助下找到这两个人。然而阻止我的依然是瓦妮莎的下落不明。\n\n就在[1983年](clue:year_1983)复活节刚过完的那几天，在奥德赛一个邮局，我在布告栏上看到了我自己的通缉令。\n\n没有照片，只是一张粗糙的素描，但我知道那是我。这幅画是艾莉丝刚刚上车时给我画的，父亲说，她的眉骨和下巴画得很像我。通缉令上并没有将[罗伯特·卡彭](clue:capone)与图森市或者加州那些爆炸案关联起来，只是写着“极度危险”和“涉嫌跨州袭警与使用军用爆炸物”。\n\n我知道，这是艾莉丝给我写的信，她在告诉我，我们可还在外头呢，就在某个地方。你在哪呢？我们会找到你的，你猜瓦妮莎在不在我们手里？", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_32",
    keyword: "confession",
    title: "供述 No.32",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.4 },
    revealedKeywords: ["frank_rollins"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "你一定是在骗我，或者，是我疯了。\n\n我脑海当中一直有段记忆，那是在犹他州的时候，外面整日阴雨，某个下午，我坐在副驾驶抽烟，其他人都在忙别的，我从后视镜里看到她光着脚站在水槽边，把地图贴在木墙上，再把冰箱挪回原位。我什么都没说，我知道那是她唯一的指望。\n\n你们这些警察，拿着相机跑到一个个案发现场，收集弹壳，拍下干涸的血迹。其实这是最简单的，血迹干了说明事情已经结束了。可我见过那些活生生的事情，就在我的眼前。\n\n做掉阿列克谢那次，她负责搞定车子，结果水箱漏了，事后老头子没处撒气，先用拖车的麻绳把她的手绑在后保险杠的钢架上，让她跪在沥青路上。直到老头睡着了，我赶紧拿块湿布把水拧在她的额头和身上，再把打死结的绳扣弄松。她抬头看我，嘴唇上全是裂开的血痂，一句话也没说。\n\n后来为了引索恩上钩，母亲拿着注射器，直接把士的宁打进她的血管里。完事之后，她被扔在后排的床垫上，痛得脊椎反弓。我怕她咬断舌头，赶忙按着她，把皮带塞进她的嘴里，她指甲在我手背上抠出了十几道血沟。\n\n她告诉过我，被关起来的那几个月，每时每刻她都在盼望着，当自己被放出去那天，父亲没有出现，母亲没有出现，塞勒斯没有出现，康查尔，也就是你所谓的[弗兰克·罗林斯](clue:frank_rollins)没有出现，她可以无忧无虑地在公路上走，像那些搭车客一样，朝着驶向北方的车辆伸出她的大拇指。你觉得这些时刻她是怎么熬过来的？除了地图之外，她还能有什么别的念想吗？现在你说，这辆车是威廉·道森的，这分明解释不通。67年11月，他们把瓦妮莎送进惩戒，然后出发去利比镇，杀光了道森一家，把这辆车开回来。可亚瑟则在67年初就已经死了，如果这车是他死后才被他们偷来的，那我在底盘暗格里抠出来的那个笔记本又哪来的？\n\n它为什么被会藏在这辆车里。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_31",
    keyword: "confession",
    title: "供述 No.31",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.2 },
    revealedKeywords: ["mandan"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "我最后一次去利比镇的时候，在林区像个没头苍蝇一样转悠了好几天，除了一片长满杂草的空地，什么都没找到。最后，我站在一片松林地旁抽烟，心里忍不住地怀疑，或许道森一家只不过是瓦妮莎在药效发作时的妄想。\n\n没想到，他们的尸骨可能就埋在我当时站的地方。\n\n总之你给的信息太多了，我得好好想一想。先说汉弗莱监狱把，那就是我认识康查尔的地方，他1967年因为袭警被捕，这是他告诉我的。所以他被捕的时候还带着凶器是吧？一路从蒙大拿州跑到缅因州区……那如果他是杀害道森的元凶，着意味着父亲早就知道了亚瑟和瓦妮莎的计划，这是亚瑟和他的一家最终丧命的真正原因。\n\n可为什么瓦妮莎却能安然无恙呢？不仅安然无恙，而且对整件事毫不知情。\n\n等等——我知道了。瓦妮莎说过，1967年，她曾在感化院待过半年，那回父亲非常反常地逼她去一个公路便利店里‘拿’补给。现在看来这其实就是个圈套，那天父亲可能就坐在车里眼睁睁看着巡警把她按在泥地上。盗窃的罪名不大不小，刚好够瓦妮莎在感化院待三个月。三个月过完，他们开着一辆重新涂装过的房车，来到[曼丹市](clue:mandan)的北达科他州青少年矫正机构接她，并告诉她康查尔得在缅因州待上一阵子了，然后整整四年过去，到某一天，她忽然看到我和康查尔一同登上了这辆房车。\n\n可这到底是为什么呢？他为什么要费尽心机骗过瓦妮莎。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_30",
    keyword: "confession",
    title: "供述 No.30",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.3 },
    revealedKeywords: ["year_1967"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "听着，即便你知道鲑溪小径的事，即便你知道她是在那个晚上跟我表露心声的，你也不该把那两个词关联在一起。这对她太不尊重了。\n\n那天晚上雾特别大，空气里全是烂树叶的味道。房车停在红杉林的最深处，引擎熄火之后，整个世界都安静了下来。我就坐在车门外的台阶上抽烟，听着水滴砸在车顶上的声音。不知道为什么，那天晚上好像所有人都消失了。\n\n瓦妮莎推开纱门走了出来。父亲那天大概给她加了药量，她连站都站不稳，夜风一吹整个人直发抖。她呆滞地坐在离我不远的泥地上，盯着远处的黑暗发愣。我脱下皮夹克，走过去披在她那薄得能摸到骨头的肩膀上。在这群人里，我是唯一知道这时候该怎么做的人——那就是闭嘴，别去碰她，也别去惊扰她。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "感觉到衣服的重量后，瓦妮莎突然转过脸死死盯着我。她的视线穿透了林子里的浓雾，看了我很久。然后，她忽然伸出手，冰凉的手指碰到了我的侧脸，用梦呓一样的声音叫了一个名字。“亚瑟……是你来带我走了吗？”\n\n我没有躲开她的手，也没有去纠正她。紧接着，她突然崩溃了，一头扎进我的怀里。没有任何声音，只有滚烫的眼泪大颗大颗地砸在我的衬衫上。她死死抓着我的胳膊，指甲几乎要抠进我的肉里，像个溺水的人抓住了最后一块木板。\n\n瓦妮莎告诉我，她之前撒谎了。她曾说她不记得亚瑟，但其实她记得清清楚楚。她记得那是[1967年](clue:year_1967)，就在那个蠢货被父亲干掉之前，他是怎么在深夜里向她承诺，一定会带她离开这条永远伴随着惨叫声的公路，去一个能大口呼吸干净空气的地方。他还告诉她，如果他没能活着带她走，只要她有机会跑出去，就一定要去蒙大拿州的利比镇，那是他的家乡。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "瓦妮莎哆嗦着，从贴身衣物的最里层扯出一根细细的银链子。链子底下挂着个廉价的、边缘生了黑锈的银色小吊坠盒。她抖着手抠开那个生锈的搭扣，里面塞着一张剪得极小、极粗糙的黑白照片。照片上是年轻的亚瑟和他的父亲，两人站在一棵巨大的红杉树下。亚瑟告诉她，如果最后只有她一个人逃出去，只要带着这个吊坠，随便敲开利比镇哪家伐木工酒馆的门，把这张照片给那些老家伙看，他们就会帮她、照顾她。\n\n此时此刻，药效终于不可抑制地涌了上来。她靠着我昏睡了过去，微弱的光线照着她苍白的皮肤，上面的淤青清晰可见。或许有一天，我会亲自把她送上那趟去利比镇的灰狗巴士呢？我在心里这么想着。可几乎就是一瞬间，惊恐感便替代了这种妄想。不用想也知道，父亲会有一万种方法阻止这件事情发生，而亚瑟的结局就是最好的预演。\n\n后来我去过利比镇，甚至凭借记忆找到了那棵红杉树。但那里什么都没有，我没有找到姓道森的人，也没有找到叫瓦妮莎的女孩。我幻想着，或许在我从灰狗巴士上下车的一刹那，整个小镇便已严阵以待，所有人联合起来演了一出戏——就在我站在那棵红杉树下的时刻，瓦妮莎其实正躲在远处的某个地方，小心翼翼地看着我。", attitude: "", visual: "" }
    }
  }
];
