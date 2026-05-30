import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER4_KEYWORDS: Record<string, KeywordMetadata> = {
  'st_louis': { id: 'st_louis', chapter: 4, type: 'location', displayName: '圣路易斯', isPersistent: true, description: '密苏里州的一座城市，卡彭在此目睹了房车内的“蛆虫仪式”。', source: 'Confession' },
  'maggots': { id: 'maggots', chapter: 4, type: 'case', displayName: '蛆虫', isPersistent: true, description: '霍华德·贝克探员对干扰者的贬称。', source: 'Archive' },
  'davenport': { id: 'davenport', chapter: 4, type: 'location', displayName: '达文波特', isPersistent: true, description: '爱荷华州的一座城市，康查尔在此实施了他的“新计划”。', source: 'Confession' },
  'new_plan': { id: 'new_plan', chapter: 4, type: 'case', displayName: '新计划', isPersistent: true, description: '康查尔通过对普通家庭进行心理折磨来测试“真实性”的行动。', source: 'Confession' },
  'texarkana': { id: 'texarkana', chapter: 4, type: 'location', displayName: '特克萨卡纳', isPersistent: true, description: '得克萨斯与阿肯色交界的密林区，碎尸案的发生地。', source: 'Confession' },
  'dismemberment_case': { id: 'dismemberment_case', chapter: 4, type: 'case', displayName: '碎尸案', isPersistent: true, description: '1967年发生的残忍案件，受害者被摆放成几何图形，实为康查尔的祭献。', source: 'Confession' },
  'kansas_city': { id: 'kansas_city', chapter: 4, type: 'location', displayName: '堪萨斯城', isPersistent: true },
  'mobile_blood_truck': { id: 'mobile_blood_truck', chapter: 4, type: 'case', displayName: '流动献血车', isPersistent: true, description: '针对莫里西的嫁祸行动。', source: 'Confession' },
  'year_1976': { id: 'year_1976', chapter: 4, type: 'year', displayName: '1976', isPersistent: true },
  'year_1965': { id: 'year_1965', chapter: 4, type: 'year', displayName: '1965', isPersistent: true },
  'john_morrissey': { id: 'john_morrissey', chapter: 4, type: 'person', displayName: '约翰·莫里西', isPersistent: true, description: '堪萨斯城的受害者，被指控参与了流动献血车案件。', source: 'Confession' },
  'peter_henderson': { id: 'peter_henderson', chapter: 4, type: 'person', displayName: '皮特·亨德森', isPersistent: true, description: '达文波特的机械师，在康查尔的心理折磨下保持了人的尊严。', source: 'Confession' },
  'arthur_dawson': { id: 'arthur_dawson', chapter: 4, type: 'person', displayName: '亚瑟·道森', isPersistent: true, description: '蓝色房车的前任主人，留下了揭露家族真相的日记。', source: 'Confession' },
  'east_12th_st': { id: 'east_12th_st', chapter: 4, type: 'location', displayName: '东12街', isPersistent: true },
  'execution_room': { id: 'execution_room', chapter: 4, type: 'case', displayName: '行刑室', isPersistent: true },
  'recruitment': { id: 'recruitment', chapter: 4, type: 'case', displayName: '招募', isPersistent: true },
};


export const CHAPTER4_NODES: MemoryNode[] = [
  {
    id: "confession_14",
    keyword: "confession",
    title: "供述 No.14",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.5 },
    revealedKeywords: ['st_louis', 'maggots'],
    excludedKeywords: ['father', 'mother', 'the_mother', 'silas', 'conchar', 'vanessa', 'blue_rv', 'kansas_city', 'kansas', '堪萨斯城', '父亲', '母亲', '塞勒斯', '康查尔', '瓦妮莎', '房车', '淡蓝色房车'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "堪萨斯城的事刚过去三天，圣路易斯的那场大雨就没停过。当时房车停在市郊的一个垃圾场旁边，周围全是烂泥和金属堆。那天晚上，我在房车的后备厢里找到了一大桶生的猪肝，不知道是谁放那的，由于天气闷热，里面已经长满了白色的蛆虫，密密麻麻地蠕动着，散发着一股让人作呕的腐臭味。",
        attitude: "",
        visual: "https://picsum.photos/seed/maggots/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "我本想把那桶臭肉扔掉，却被母亲拦住了。她穿着那件宽大的白色睡袍，赤着脚站在泥地里，看起来虚弱得随时会倒下。她让我把桶拎进车厢。在那个狭窄、潮湿的空间里，在昏暗的煤油灯光下，我看到了一场足以让最变态的罪犯都感到不适的仪式。\n\n父亲脱掉了上衣，赤裸着上身坐在一张塑料椅子上。母亲抓起一把还在蠕动的蛆虫，竟然动作温柔地涂抹在父亲背部那些交错的累累伤痕上。他们谁也没说话，那一刻，车厢里只有雨水敲打车顶的声音，和母亲低柔的哼唱。我站在一旁，胃里翻江倒海，却不敢移开视线。",
        attitude: "",
        visual: "https://picsum.photos/seed/the_mother_ritual/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "“这些蛆虫能吃掉坏死的腐肉，罗伯特，”母亲回过头，对着我露出了一个那种圣母般的、慈祥的微笑，“你觉得恶心，是因为你还没学会接纳腐烂。在家族里，腐烂不是终点，那是重生的开始。如果不吃掉那些变质的记忆，‘父亲’就没法带领我们继续往前走。”\n\n那一晚，我守在车厢外面，淋了一夜的雨。在那雨声中，我仿佛听到了他们在车厢里发出的那种类似野兽般的低吼和喘息。我突然意识到，这辆房车之所以能跨越半个美国而不被抓住，不仅仅是因为康查尔的诡计或我的掩护，更是因为它本身就是一种活着的、能自我修复的某种……生物。他们通过这种极其病态的、建立在痛苦和互助基础上的仪式，不断强化着彼此的连接。",
        attitude: "",
        visual: "https://picsum.photos/seed/rainy_night_st_louis/800/450"
      }
    },
    connectedTo: ["confession_13", "capone"]
  },
  {
    id: "confession_15",
    keyword: "confession",
    title: "供述 No.15",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.25, y: window.innerHeight * 0.3 },
    revealedKeywords: ['peter_henderson'],
    excludedKeywords: ['davenport', 'new_plan', 'conchar', 'conchar_konchar', '康查尔', '达文波特', '皮特·亨德森', '亨德森'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你以为我那时已经变节了？不，那时候的我，比任何时候都更像个忠诚的猎犬。虽然那是 1976 年了。康查尔在圣路易斯之后，变得非常狂躁，他宣称所谓的超现实艺术已经没用了，他需要更‘真实’的东西。于是我们来到了爱荷华州的达文波特市郊。\n\n那里有一户人家，姓亨德森。男主人皮特·亨德森是个老实的机械师。我们闯进去的时候，他正带着妻子和两个女儿吃晚饭。没有任何废话，康查尔把他们全关进了那个只有五个平方的地下室里，然后把灯关掉。他让我搬了把椅子，坐在地下室门口，手里拿着表。这时候他告诉我，“罗伯特，给他们讲讲你以前在局里学到的那些案例吧。讲讲那些被撕碎的人，讲讲那些还没死就被埋进土里的孩子。一个小时讲一个。我们要看看，这个正直的美国公民，在听到第几个故事时会求我们杀了他。”",
        attitude: "",
        visual: "https://picsum.photos/seed/suburban_house/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "我就坐在那儿，对着黑暗里的亨德森一家，用那种冷静、平稳的，就像是在警校讲课的语气，讲了三个小时。我讲了 1968 年的那些邪教屠杀，讲了辛辛那提那个被冻死在冷库里的女孩。每讲完一个，我都能听到地下室里传来那种压抑的、快要窒息的呜咽声。康查尔坐在一旁，悠闲地喝着啤酒，偶尔还点评一下我的叙述技巧。但我能感觉到，皮特·亨德森不一样。他一直在黑暗中，用一种极其低沉的声音安慰着他的妻女。无论我讲得多么露骨、多么残暴，他始终没有像康查尔预期的那样崩溃求饶。",
        attitude: "",
        visual: "https://picsum.photos/seed/basement_door/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "凌晨三点，康查尔终于失去了耐心。他踢开地下室的门，用枪指着皮特的头，问他为什么不求饶。皮特抬起头，他的脸在手电筒的光柱下苍白如纸，但他眼神里却有着某种我这辈子都没见过的东西，“我知道你们是谁，”他轻声说，“你们是那些没法忍受自己是人的人。所以你们想把我们变成像你们一样的怪物。但我不会。只要我还待在这里，只要我还抱着我的孩子，我就还是个人。你们杀不了这个。”\n\n康查尔愣住了。这是我第一次在他脸上看到挫败感。那天晚上，他没有像往常一样大开杀戒，而是像逃跑一样带着我离开了那栋房子。在那之后的一整周，他一个字都没说。而我，我坐在房车的副驾驶座上，看着倒退的平原风光，心里却在反复回味皮特·亨德森的那句话。‘没法忍受自己是人的人’。我想起了我怀里的那本亚瑟·道森的笔记，想起了我那些所谓的‘灰水信标’。我突然意识到，我的那些理性的借口，那些所谓的潜伏计划，其实和康查尔的暴力一样，都是我为了逃避做一个人而制造的皮壳。",
        attitude: "",
        visual: "https://picsum.photos/seed/peter_henderson_look/800/450"
      }
    },
    connectedTo: ["confession_14", "capone"]
  },
  {
    id: "confession_16",
    keyword: "confession",
    title: "供述 No.16",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.2 },
    revealedKeywords: ['arthur_dawson'],
    excludedKeywords: ['texarkana', 'dismemberment_case', 'conchar', 'vanessa', 'blue_rv', '特克萨卡纳', '碎尸案', '康查尔', '瓦妮莎', '房车', '淡蓝色房车'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你真的觉得我能从那堆‘废墟’里挖出真相？哈。好吧。那我们就来谈谈特克萨卡纳。\n\n那是 1967 年的事了，甚至远在我认识康查尔之前。但那个案子在房车里一直像个挥之不去的幽灵。当时，所谓‘潜意识大师’雷吉博士还没开始他的研究呢，而此时在得克萨斯和阿肯色交界的那些密林里，就已经发生了一连串极其残忍的碎尸案。警方发现那些碎片时，它们被精心地摆放成了一些奇怪的几何图形。当时康查尔还年轻，他还没学会怎么隐藏那些病态的艺术冲动。但我发现真相是在 1976 年，就在达文波特那件事之后。我在房车底部的一个暗梁里，无意中抠出了一个用防水布紧紧包裹着的笔记本。",
        attitude: "",
        visual: "https://picsum.photos/seed/texarkana_forest/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "笔记本的主人名叫亚瑟·道森，据我后来推测，他大概是那辆蓝色房车的前一任主人。他在日记里记录了他是如何被‘父亲’招募的，又是如何在这种扭曲的家庭关系中逐渐发现，所谓的‘远亲’网络其实是一个极其庞大且冰冷的食人系统。他开始质疑，开始记录，甚至试图跟外界联络。日记的最后一页停留在 1967 年 11 月，就在那桩碎尸案发生前夕。他写道：‘他们说那是艺术，但我看到的只有饥饿。父亲在喂养一些不属于这个世界的东西。我得带瓦妮莎走。’",
        attitude: "",
        visual: "https://picsum.photos/seed/old_notebook/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我想你应该能猜到结局。康查尔杀了他。不，不只是杀了他，是把他宰制成了那些‘几何图形’的一部分。这就是特克萨卡纳碎尸案的真相，那是康查尔为了向父亲宣誓忠诚，为了接纳瓦妮莎，而进行的一次祭献。我合上那个本子，把它塞回了暗格。我转过头，看到瓦妮莎正坐在车窗边缝补一件赛勒斯的衬衫，夕阳照在她的侧脸上，让她看起来安静得像一尊雕塑。那一刻，我通体生寒。我想，如果她知道她一直依赖着的这个‘家庭’，其实是建立在她亲生父亲的血肉之上的，她还会这样安静地坐着吗？我没有告诉她，那天晚上，我在路边的一个排水沟里，扔掉了我至今为止最长的一个信标。",
        attitude: "",
        visual: "https://picsum.photos/seed/vanessa_sewing/800/450"
      }
    },
    connectedTo: ["confession_15", "capone", "vanessa"]
  },
  {
    id: "confession_17",
    keyword: "confession",
    title: "供述 No.17",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.15 },
    revealedKeywords: ['richie_dreyfuss'],
    excludedKeywords: ['dirty_frank', 'recruitment', 'rockford', 'conchar', 'capone', 'robert', '1977', '脏弗兰克酒吧', '招募', '罗克福德', '康查尔', '里奇·德莱弗斯'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "既然你想聊[招募](clue:recruitment)，那我们就得聊聊罗克福德市，聊聊那个倒霉蛋。那是1977年的事吧，房车又一次开进了伊利诺伊州。当时康查尔的心情出奇地好，可能是因为他刚刚在芝加哥解决掉一个不听话的‘远亲’。我们在[脏弗兰克酒吧](clue:dirty_frank)门口捡到了里奇·德莱弗斯。他当时正因为欠了一屁股赌债被几个收账的混混围在巷子里揍，像条落水狗一样求饶。",
        attitude: "",
        visual: "https://picsum.photos/seed/rockford_alley/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "康查尔救了他，还带他回了我们在镇上租的一个临时公寓。按规矩，新人入伙得经受考验。里奇那时以为自己遇到了救星，那是哈巴狗一样对康查尔言听计从。康查尔坐在那张散发着霉味的破皮沙发上，把一支左轮手枪拍在桌子上。 “里奇，我们这里不留废物。”他语气平淡得像是在讨论天气，“这是一场俄罗斯轮盘，六个弹孔里只有一颗子弹，对应的是你欠在酒吧的六千块债。如果你敢对着自个儿扣一下，我就帮你把债平了；如果你能坚持到第三下，你就是我们的兄弟。”",
        attitude: "",
        visual: "https://picsum.photos/seed/russian_roulette/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "里奇那张满是冷汗的脸，我这辈子都忘不了。他颤抖着拿起枪，闭上眼，扣下了扳机。‘咔哒’。空的。然后是第二下。‘咔哒’。又是空的。此时里奇已经开始抽风了，他裤裆全湿了，口水顺着下巴流。康查尔在那一刻笑得特别开心，他走过去，动作温柔地从里奇手里拿过枪。 “其实里边一颗子弹都没有，里奇。”他笑着打开弹巢，让我们看到了六个空空的黑洞，“因为恐惧才是唯一的子弹，只要你内心还有这种东西，你就永远跑不出这间屋子。”\n\n就在大家哄堂大笑的时候，里奇突然瞪大了眼睛，他捂着胸口，剧烈地抽搐了几下，就那样直挺挺地从椅子上栽了下去。法医后来说，他死于心源性猝死。他被自己脑补出来的那颗子弹给打死了。康查尔看着他的尸体，只是不屑地撇了撇嘴，“看啊，真是个不合格的废品。” 后来，我们就把里奇像垃圾一样扔进了那座工业城的下水道里。在那之后，康查尔看我的眼神开始变得奇怪，那是他在审视一个极富潜力的……艺术材料。",
        attitude: "",
        visual: "https://picsum.photos/seed/empty_revolver/800/450"
      }
    },
    connectedTo: ["confession_16", "capone"]
  },
  {
    id: "confession_18",
    keyword: "confession",
    title: "供述 No.18",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.55, y: window.innerHeight * 0.2 },
    revealedKeywords: ['alice'],
    excludedKeywords: ['denver_suburb', 'deputy_miller', 'ice_pick', 'alice', 'conchar', 'capone', 'robert', '1974', '丹佛市郊', '警员遇害案', '艾莉丝', '冰锥', '米勒副警长', '康查尔'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你刚才提到了艾莉丝？哈。你终于还是问到她了。 那个疯女人……她是我这辈子见过最纯粹的恶意，甚至超过了父亲。 1974年的秋天，当房车行驶在犹他洲的盐湖城郊外，我第一次看到了她在车上。 她就那样静静地坐在床铺边缘，擦着一支精巧的冰锥，那是专门用来剔除冰块的小工具，但在她那双修长的手里，那是件极其高效的艺术刀。 她看我的眼神……让我觉得在这个世界上，除了杀人和被杀，没有任何别的事是真实的。",
        attitude: "",
        visual: "https://picsum.photos/seed/alice_intro/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "据康查尔说，艾莉丝是他在丹佛的一个名叫利伯勒尔的小镇里“捡”到的。当时她是一个当地副警长的女儿。她亲手在那个阴雨绵绵的下午，用那支冰锥，从耳后根精准地捅进了她亲生父亲的颅脑里，整个过程她甚至没有眨一下眼睛。 康查尔被这一幕彻底迷住了，他觉得艾莉丝就是那种天生属于深渊的物种。 当时我还不相信，直到有一次，我们在内华达的一个休息站里，我看到她盯着一具被赛勒斯处理过的尸体，眼神里透露出的竟是某种……近乎于宗教般的狂热。 “罗伯特，你不觉得这很美吗？”她贴在我耳边轻轻说道，呼出来的热气带等一股薄荷味和淡淡的血腥味，“当生命流逝的一瞬间，那一刻的真实胜过所有的祷告。”",
        attitude: "",
        visual: "https://picsum.photos/seed/ice_pick_detail/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "她加入家族，是因为她闻到了我身上的味道。 明白了么？ 她不是为了父亲，也不是为了康查尔。 她是在横跨了大半个美国之后，在那些血腥的线索里，捕捉到了我的气息，并把这当成了一场盛大的约会。 此后的每一个夜晚，当我躺在房车的下铺，我都能感觉到在上铺的她，正隔着薄薄的地板注视着我，手里攥着那支冰锥，在舱壁上轻轻划着我的名字。 她一直在等着我彻底崩溃，等着我抛弃那身隐形的、早已腐烂的制服，在那片荒原上和她合为一体。 这种压力比任何审讯都要可怕，那时候我甚至希望阿尔特曼能快点派人来抓我，哪怕是把我送上电椅，也好过在那个疯狂女人的注视下慢慢腐烂。",
        attitude: "",
        visual: "https://picsum.photos/seed/alice_gaze/800/450"
      }
    },
    connectedTo: ["confession_17", "capone"]
  },
  {
    id: "confession_19",
    keyword: "confession",
    title: "供述 No.19",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.65, y: window.innerHeight * 0.3 },
    revealedKeywords: ['priest'],
    excludedKeywords: ['el_paso', 'church', 'shotgun', '1974', 'conchar', 'silas', 'capone', 'robert', '埃尔帕索', '神父', '教堂', '猎枪', '康查尔', '塞勒斯'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "埃尔帕索的教堂案子？你调查得可真够细的。 1974年的冬天，那个地方简直比地狱还要燥热。 房车就停在离那座土黄色教堂不到一百码的地方。 父亲对康查尔这次的突发奇想十分宽容，甚至可以说是在纵容。 康查尔当时迷上了一种叫做“宗教净化”的小游戏。 他认为那些在边境小镇里、打着上帝旗号安抚那些非法劳工的神父，其实是这个秩序系统里最软弱、也最虚伪的环节。 如果能让他们在祭坛前崩溃，那就不仅仅是一个人的死亡，而是一场由于信仰崩塌引发的大型心理海啸。",
        attitude: "",
        visual: "https://picsum.photos/seed/el_paso_church/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "我们在一场深夜弥撒快要结束时闯了进去。 赛勒斯手里拿着一杆截短的猎枪，指着那些瑟瑟发抖的劳工，而康查尔不紧不慢地走上祭坛，揪住了那个神父。 神父看起来很老了，皮肤像被晒干的皮革一样皱巴巴的，他看着康查尔的眼神里没有恐惧。 康查尔让他当众诅咒上帝，让他承认自己这些年的布道全是为了骗取那些穷人的最后一点积蓄。 “只要你说了，我就放走这里的一半人，”康查尔把一把沾血的各种证件和财物一股脑倒在圣杯里，“否则，我就每隔一分钟就毙掉一个，从第一排那个抱着孩子的女人开始。”",
        attitude: "",
        visual: "https://picsum.photos/seed/church_altar/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "接下来的三十分钟，简直是我人生中最漫长的煎熬。 那个神父……他自始至终都没有说话，也没有看向康查尔，他只是保持着那种极其平静的祈祷姿势。 这种平静彻底激怒了康查尔，他甚至没有让赛勒斯开枪，而是亲自用手里的刀割开了第一个劳工的喉咙。 “说啊！你这个虚伪的骗子！”他咆哮着，脸上的肌肉都在扭曲。 直到第六个人倒下，鲜血溅满了神父那件白色的祭袍。 神父终于开口了，但他没有诅咒。 他只是看着那些倒在血泊里的人，轻声说了一句拉丁语，“Perdoname, Padre, no saben lo que hacen.”（主啊，赦免他们，他们不知道自己所做的是什么）。\n\n那一刻，康查尔疯了。他掏出枪，把那个神父打成了筛子。 鲜血不仅染红了祭坛，也染红了康查尔那双疯狂的眼睛。 我在阴影里握紧了拳头，那一刻我真恨不得开枪把他结果了。 撤走的时候，我在教堂门口，用那本亚瑟·道森笔记本里撕下的一角，写下了我至今最清晰的一条地理坐标信息，并把它塞进了一个圣母像的底座里。 我以为这能给阿尔特曼带去足够抓人的口实，但这之后的几天，我在新闻里看到的，全都是关于“当地帮派因种族仇恨袭击教堂”的通俗版本。 阿尔特曼根本不敢承认这是有一双来自华盛顿的黑手在操控。 看着父亲坐在房车里，像个慈祥的长辈一样给刚杀完人的康查尔擦拭额头的汗水，我突然理解了，为什么那个神父直到最后一刻都要保持这种平静。 这种平静，是他在那个充斥着暴虐、谎言和疯狂的世界里，唯一能守住的东西。 而我，却在这场漫长的潜航中，渐渐失去了这种属于人的尊严。",
        attitude: "",
        visual: "https://picsum.photos/seed/church_massacre/800/450"
      }
    },
    connectedTo: ["confession_18", "capone"]
  },
  {
    id: "confession_20",
    keyword: "confession",
    title: "供述 No.20",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.4 },
    revealedKeywords: ['watchman'],
    excludedKeywords: ['80_interstate', 'radio', 'trucker', '1978', 'capone', 'robert', '80号洲际公路', '守夜人', '无线电', '卡车司机'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "1978年的内华达州公路上。 那是我第一次意识到，我的脑子里出了点问题。 房车在那段又长又直、除了仙人掌什么都没有的公路上开了一整天。 父亲在那摆弄那台旧接收机，而赛勒斯正为了某个在亚利桑那被抢走的妞而喋喋不休。 我那时实在受不了了，就拿起无线电对讲机，调到了一个卡车司机的公共波段。 很快我就听到了一个声音。 那个声音自称是[守夜人](clue:watchman)，他说他驾驶着一辆黑色的彼得比尔特重卡，正行驶在我们前方不到十公里的地方。 他的声音低沉、稳健，带着一股属于旧时代的威严，就像是那些我早已遗忘的、关于真正警察的记忆。 我在那跟他聊了很有。我告诉他关于这辆房车的事情，告诉他那些藏在暗梁里的罪恶，甚至告诉他我有多想开枪把这群畜生送进地狱。 守夜人在对讲机里沉默了很久，然后他说，‘罗伯特，你不是一个人，我在这里，我会一直看着你的。’",
        attitude: "",
        visual: "https://picsum.photos/seed/night_highway/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "那之后的几个月，只要在那段荒凉的公路上，我都会和他在无线电里聊天。 康查尔曾经问过我那在和谁说话，我就随便编了个关于长途卡车司机的谎话。 直到有一天晚上，父亲在开车，而我正对着无线电说：‘守夜人，告诉我，什么时候才是动手的时间？我已经忍到极限了。’ 守夜人回答我，‘就快了，罗伯特。当你看到天边出现三道闪电时，那就是信号。’ 就在那一刻，父亲把手放在了我的肩膀上。 我猛地转过头，才发现……无线电的电源根本就没插。 对讲机里传来的只有那种嘈杂刺耳的雪花静电声。",
        attitude: "",
        visual: "https://picsum.photos/seed/radio_static/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "并没有什么老练的卡车司机，也没有什么黑色的彼得比尔特。 那个跟我说话的人，那个一直给我提供所谓正义感支持的人，一直都是我自己。 哈哈，你能理解那种惊恐吗？ 我在那片疯狂的深渊里浸泡太久，我的大脑为了自保，强行劈开了一块地方，变造出一个‘守夜人’来扮演那个曾经的罗伯特·卡彭探员。 我坐在那看着窗外无尽的黑暗，听等耳边依然在响着的、那种只有自己能听见的鼓励声，心里全是一片冰冷的死寂。 我明白，我已经坏掉了。 我已经成了一个活着的谎言，甚至连最核心的那个自我，都已经成了某种虚构的产物。",
        attitude: "",
        visual: "https://picsum.photos/seed/split_personality/800/450"
      }
    },
    connectedTo: ["confession_19", "capone"]
  }
];
