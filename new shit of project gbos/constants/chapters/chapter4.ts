import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER4_KEYWORDS: Record<string, KeywordMetadata> = {
  'kansas_city': { id: 'kansas_city', chapter: 4, type: 'location', displayName: "堪萨斯城", isPersistent: true },
  'mobile_blood_truck': { id: 'mobile_blood_truck', chapter: 4, type: 'case', displayName: "流动献血车", isPersistent: true, description: "在堪萨斯城引发恐慌的怪诞事件，后被证实为针对莫里西的嫁祸行动。", source: "Confession" },
  'davenport': { id: 'davenport', chapter: 4, type: 'location', displayName: "达文波特", isPersistent: true, description: "爱荷华州的一座城市。康查尔曾带着他的“新计划”前往此处。", source: "Confession" },
  'east_12th_st': { id: 'east_12th_st', chapter: 4, type: 'location', displayName: "东12街", isPersistent: true },
  'execution_room': { id: 'execution_room', chapter: 4, type: 'case', displayName: "行刑室", isPersistent: true },
  'john_morrissey': { id: 'john_morrissey', chapter: 4, type: 'person', displayName: "约翰·莫里西", isPersistent: true },
  'maggots': { id: 'maggots', chapter: 4, type: 'case', displayName: "蛆虫", isPersistent: true, description: "FBI探员霍华德·贝克在早期档案中对那些流浪汉或干扰者的贬称。", source: "Archive" },
  'new_plan': { id: 'new_plan', chapter: 4, type: 'case', displayName: "新计划", isPersistent: true, description: "康查尔在圣路易斯行动后制定的秘密方案，具体内容仍然模糊。", source: "Confession" },
  'peter_henderson': { id: 'peter_henderson', chapter: 4, type: 'person', displayName: "皮特·亨德森", isPersistent: true },
  'st_louis': { id: 'st_louis', chapter: 4, type: 'location', displayName: "圣路易斯", isPersistent: true, description: "密苏里州的一座城市。", source: "Archive" },
  'vampire': { id: 'vampire', chapter: 4, type: 'case', displayName: "吸血鬼", isPersistent: true, description: "詹妮弗提及的一起案件。", source: "Jennifer" },
  'vanessa': { id: 'vanessa', chapter: 4, type: 'person', displayName: "瓦妮莎", isPersistent: true },
  'year_1965': { id: 'year_1965', chapter: 4, type: 'year', displayName: "1965", isPersistent: true },
  'year_1976': { id: 'year_1976', chapter: 4, type: 'year', displayName: "1976", isPersistent: true }
};

export const CHAPTER4_NODES: MemoryNode[] = [
  {
    id: "confession_13",
    keyword: "confession",
    title: "供述 No.13",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.85 },
    revealedKeywords: ["john_morrissey", "year_1965"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "当然知道。\n\n那时候，电视新闻里正在铺天盖地地报道杰西·潘尼被捕的消息。有天早上，我坐在折叠桌旁，看着屏幕上那个被反铐着按进警车的胖子，心里充满了挫败感。我精心设计的荒诞剧，居然成了堪萨斯警局认领勋章的垫脚石。\n\n但父亲的反应完全不同。他当时正坐在我对面，手里拿着那把用了很多年的水果刀，在这个充满了机油味的早晨，他正在耐心地削着一个苹果。\n\n“别丧气，罗伯特。”他突然开口，眼睛没有离开手，“你看起来像个考砸了的小学生。”我说他们利用了我们要抓那个胖子，这足够令人生气了。父亲停下了刀，“你以为那是谁？罗伯特。那个自称杰西·潘尼的人，真名叫[约翰·莫里西](clue:john_morrissey)。他是这一带最大的‘肉贩子’。”", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "“从[1965](clue:year_1965)年起，那个爱尔兰杂种在堪萨斯盘踞了十年。”父亲咬了一口苹果，咀嚼的声音在安静的车厢里格外清晰，“他是个毫无审美的屠夫，把人拆碎了卖，就像卖猪肉一样。我曾经试图……感化他，让他明白规矩，但他太傲慢了。”\n\n“而你，我的孩子。你只是为了好玩，画了一幅画，摆了几个塑料人偶……你就做到了联邦政府十年都做不到的事。你不需要搜查令，不需要证据，你只是制造了一点点混乱，就让那一整座坚固的堡垒从内部塌陷了。”", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "父亲把那把水果刀插在桌面上，刀刃倒映出报纸上莫里西那张猪脸，“这就是混乱的美妙之处，罗伯特。你不需要瞄准。当你制造的风暴足够大时，自然产生的雷电迟早会击中那些该死的树。”他说。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_12",
    keyword: "confession",
    title: "供述 No.12",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.95 },
    revealedKeywords: ["jc_penney", "year_1976"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "好吧，你赢了。你比阿尔特曼那帮蠢货看得更远。\n\n听着，我没疯，我知道我在做什么，我也知道你想问什么——“为什么不抓捕他们？”是的，那是[1976](clue:year_1976)年。从法律层面上讲，我有无数次机会。可那时候，除了康查尔之外，“父亲”也好，那个女人也好，他们的手在某种意义上甚至是“干净”的。他们没有亲自抢过银行，没有亲自扣动过扳机。\n\n我当然可以联络堪萨斯城的风化组，告诉他们有一辆房车里在搞乱伦、毒品和未成年淫乱。警察会冲进来，给他们戴上手铐。然后呢？“父亲”会请个好律师，把这变成一场关于宗教自由和生活方式的辩论，顶多交点罚款，或者在看守所待个把月。而真正的威胁——那些遍布全美物流网的远亲会蛰伏起来。我还没摸清他们的规模，还没拿到那份名单。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "当时我以为，只是抓个老头子，或许并没有意义。反过来说，我甚至还得喂饱他们，让这辆车继续开下去，直到犯下任何人都无法洗脱的重罪。\n\n于是我给他们设计了一个新的剧本，利用流动献血车。这个计划极度荒谬，没有任何经济收益，但父亲很喜欢。我让几名“远亲”在午休时间劫持了一辆停在广场上的大型采血车。我们没有伤害里面的护士和医生，只是把他们极其礼貌地请了下去，给他们买了咖啡。\n\n我们从一家名叫[杰西·潘尼](clue:jc_penney)的百货商店里偷来二十个塑料服装模特，将这些永远带着僵硬微笑的塑料假人搬上车，把它们按在献血椅上。然后，我们将那些粗大的采血针头狠狠地扎进它们坚硬的塑料手臂里。我们将采血机的“输入端”反接到了一个巨大的加压罐上，里面装满上百升的动物血与红漆的混合液体。最后，我们把车停在闹市区，使用扩声器吸引人群注意，当人群聚集之后，加压罐就开始工作了。\n\n当警察和媒体赶到时，他们会发现在场的人们已被一幅超现实主义画作吓到。二十个衣着光鲜的塑料假人正安静地坐在献血椅上，红色的油漆顺着管子被强行泵入它们空心的身体，直到从它们的眼眶和嘴巴缝隙里溢出来，滴滴答答地流满了整个车厢的地板。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "这就是你想知道的关于堪萨斯城和献血车的故事，接下来到我提问了。\n\n你是怎么知道瓦妮莎的？\n\n在堪萨斯城行动的前夜，瓦妮莎找到了我。她没穿那身平时的蕾丝睡衣，而是披着一件不合身的男式夹克，我的夹克。她在那逼仄的过道里堵住我。她拉住我，手很冷，“别干这个，罗伯特，”她对我说着，声音抖得厉害，“你可以骗他们，甚至可以骗你自己，从你一上车，我就知道你跟他们不一样。可我不知道……我不知道为什么刚才在讨论计划时，你笑得那么开心。你……看起来比赛勒斯更像个怪物。”\n\n我哭笑不得，把她扔到一边去。你猜我当时在想什么？我想的是，少他妈多管闲事，这个计划根本不会伤害任何人——更何况，我总有一天要把你们全都抓进监狱。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_15",
    keyword: "confession",
    title: "供述 No.15",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.2 },
    revealedKeywords: ["year_1976", "peter_henderson"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "达文波特市。\n\n那是康查尔的杰作。[1976年](clue:year_1976)的那一周，他带着几个期望获得晋升的远亲去了爱荷华州的达文波特。“父亲”因为过量吸食药剂而陷入昏睡，所以我留下来看守房车。\n\n是的，我不在现场，不过我迟早都要听到那栋房子里发生的事，毕竟跟着康查尔去的年轻人，回来时却都像受惊的鹌鹑一样发抖。简单来说，事情是这样，康查尔随机选中了市郊的一户中产家庭，亨德森一家。他们在那暗中观察了两个星期，知道男主人[皮特·亨德森](clue:peter_henderson)是个教数学的高中老师，一家四口过着令人厌烦的规律生活。\n\n到一个周五的晚上，康查尔终于带着人闯进他们的家，他们是像客人一样围坐在餐桌旁，坐在这家人中间。康查尔知道，接下来他拥有一整个周末的时间。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "首先制定规则。据那些“远亲”描述，康查尔强迫这家人在接下来的两天里，必须严格按照时间表吃饭、睡觉、看电视。唯一的区别是，如果谁露出了一丁点恐惧，他就会用刀切掉另一个人的一节手指。\n\n“太有意思了，”后来康查尔微笑着告诉我，“亨德森一家绝对堪称典范，这一家子训练有素，孩子不哭不闹，大人连眉头都不皱一下。这让我觉得，这个计划颇值一搞。”\n\n从一开始，康查尔的马仔们就搜出了亨德森家中的财物，但他们只是把它放置在餐桌正中心，在没正眼看过这些东西。直到周日的晚上，当晚饭结束后，康查尔用餐巾擦干净嘴，赞美了食物，之后下达最后通牒。他说别担心，这个令人厌烦的游戏马上就会结束，如果一家人通过最后这关，他们便会带着餐桌上的财物离开，至此亨德森一家遭遇的，便只是一桩普通的入室抢劫案件了。\n\n随着康查尔说完话，马仔便递来一支左轮手枪。康查尔将黑胶唱机的音量开到最大，然后往枪里塞上6发子弹。他拿起一只靠垫盖住枪口，然后连开数枪直到子弹全都被射到墙里。\n\n“我得说，只要诸位能够成功通关，此番遭遇未必不是未来在邻里间吹嘘一番的冒险记，瞧瞧这些弹孔吧！”说完话，康查尔又往弹夹里塞进一颗子弹，然后告诉男主人，游戏开始。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "我告诉他，现在枪里只有一颗子弹，六分之一的概率。他要求他持枪，分别瞄准三位家人射击，直到子弹打出。一旦子弹打出，不管是否有人中枪，游戏都会马上结束，我们会带着财务撤离，现场会被伪装成入室抢劫，开枪的动作可以归罪到抢劫者身上，没人会知道他们经历过这些。”\n\n“但如果亨德森选择持枪自杀或袭击其他人，那所有人都会死，”康查尔坏笑着说，“而且不仅如此。因为当天早些时候，我们已经从亨德森先生身上‘强制采集’了样本。所以即便他像个英雄一样死了，警方也会在他小女儿的体内提取到这些样本。他会作为芝加哥历史上最恶心的乱伦强奸犯和屠夫被载入史册。”\n\n“你明白吗？我把‘名誉’和‘负罪感’放在了天平的两端，这本来是个完美的思想实验。”说到这里，康查尔突然笑了一声，那笑声里带着一丝从未有过的挫败感。\n\n后来，其他远亲告诉我，当那把只有一颗子弹的枪被放在桌上时，亨德森先生没有崩溃。他思索了很久，然后才拿起了枪，但他没有把枪口对准任何人。在众目睽睽之下，他做了一个康查尔无法理解的动作。只见他打开了转轮，把那颗唯一的子弹倒了出来。\n\n子弹滚落在地。亨德森把空枪像垃圾一样扔到了康查尔脚边，接着说，如果想毁了他的名声，那就请便。但他不会因为恐惧而变成怪物。接着，他转过身，背对枪口蹲下来，用那双大手捂住了小女儿的耳朵，把她的脸埋进自己怀里。这位即将身败名裂的父亲，在死前的最后几秒，温柔地对家人说：“别看他，看着我。宝贝，看着爸爸。不管明天报纸上怎么写，不管警察怎么说……在这最后一刻，你知道爸爸是爱你的，对吗？你知道爸爸没有把枪口对准你，对吗？”\n\n当女孩拼命点头的时候，亨德森抬起头，而像是在宣告某种胜利。\n\n你知道吗？正是这个故事，让我从那种漫长的麻木中惊醒了。我忽然就重新记起了我究竟是谁，记起了我为什么会在这辆该死的车上，以及……为了结束这一切，我到底该做什么了。", attitude: "", visual: "" }
    }
  },
  {
    id: "confession_14",
    keyword: "confession",
    title: "供述 No.14",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.85 },
    revealedKeywords: ["davenport", "new_plan"],
    excludedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: { event: "你是怎么知道这件事的？\n\n我用红油漆和假人嘲弄了整个堪萨斯城，但在我们将油漆泵接入采血车之前，“母亲”让赛勒斯清空了车上的冷藏柜，把那几十袋刚刚采集的血浆放了进去。当任务结束之后，我们驱车前往圣路易斯，落地休整的当晚，在那逼仄的后车厢里，在那张铺着褪色碎花床单的折叠床上……\n\n我不想描述细节了。我只能说，那不是人类的性爱。父亲像个干枯的帝王一样躺在那里，而“母亲”……她剪开了那些血袋。那股浓烈的、带着生鲜铁锈味的腥气瞬间炸开，盖过了车厢里常年弥漫的止咳糖浆味和老人味。他们在血泊中纠缠，发出那种黏腻的、令人毛骨悚然的水声——那是肉体与肉体在半凝固的液体中摩擦时发出的声音，就两个软体动物在泥沼里翻滚。", attitude: "", visual: "" },
      [MemoryLayer.DEEP]: { event: "很奇怪，在那个画面里，“母亲”变得力大无穷，那个平日里绝望的虚弱女人消失不见。她用沾满鲜血的手疯狂涂抹父亲那张满是皱纹的脸、涂抹在他的嘴唇和松弛的眼袋里。我站在门外，看着这一幕，我第一次没有感到恐惧，而是感到了一种……怎么说呢？我一直觉得母亲和父亲之间有条特殊的纽带，那是某种默契，他们彼此相互信任，几乎很少说话，除这次之外，我甚至很少见到他们有过肢体接触。但我隐隐觉得，这两人无法失去彼此，就像连体生物一样。\n\n父亲是那个冷酷的、只有骨骼和逻辑的‘大脑’，而母亲则是包裹着他的、潮湿且充满病态欲望的‘血肉’。平日里，他们仅仅靠眼神交换信息，仿佛共享着同一套神经系统，但在那晚的血泊中，我终于看清了这种共生的本质，他们似乎想通过鲜血作为粘合剂而重新融合，变回那个完整的、不可名状的怪物。", attitude: "", visual: "" },
      [MemoryLayer.CORE]: { event: "等等。这不对。\n\n那晚房车停在荒郊野外，虽然林子里潜伏着其他远亲，但窗帘被拉得密不透风。康查尔当时不在，他带着[新计划](clue:new_plan)去了[达文波特](clue:davenport)。瓦妮莎把自己反锁在厕所里，而赛勒斯……那疯子整张脸都贴在后窗上，仿佛想用牙齿咬碎玻璃加入他们，但他没能得逞，只是留下了一整面窗的唾液和体液。所以我大概是唯一目睹过这一切的人。\n\n你又是怎么知道的？", attitude: "", visual: "" }
    }
  }
];
