import { MemoryLayer, MemoryNode } from '../../types';
import { KeywordMetadata } from '../types';

export const CHAPTER2_KEYWORDS: Record<string, KeywordMetadata> = {
  '1402_old_dominion_rd': { id: '1402_old_dominion_rd', chapter: 2, type: 'location', displayName: '1402 Old Dominion Rd.', isPersistent: true, description: '弗吉尼亚州的一个废弃加油站，清理小组的秘密据点。', source: 'Confession' },
  'training_day': { id: 'training_day', chapter: 2, type: 'case', displayName: '训练日', isPersistent: true, description: '雷吉博士对卡彭进行心理测试的关键记忆点。', source: 'Briefing' },
  'family_massacre': { id: 'family_massacre', chapter: 2, type: 'case', displayName: '灭门案', isPersistent: true, description: '维恩一家在内华达州遭到的残酷清洗。', source: 'Confession' },
  'nevada': { id: 'nevada', chapter: 2, type: 'location', displayName: '内华达州', isPersistent: true, description: '银色国家，灭门案的发生地。', source: 'Briefing' },
  'mojave_rest_stop': { id: 'mojave_rest_stop', chapter: 2, type: 'location', displayName: '莫哈韦休息站', isPersistent: true, description: '15号州际公路上的一处偏僻休息点。', source: 'Confession' },
  'empty_cigarette_pack': { id: 'empty_cigarette_pack', chapter: 2, type: 'clue', displayName: '空烟盒', isPersistent: true, description: '一包被揉烂的“铁马”牌香烟，信标系统的载体。', source: 'Confession' },
  'roanoke': { id: 'roanoke', chapter: 2, type: 'location', displayName: '罗阿诺克市', isPersistent: true, description: '弗吉尼亚州的“星城”，灰水信标的起源地。', source: 'Confession' },
  'twisted_relationship': { id: 'twisted_relationship', chapter: 2, type: 'case', displayName: '扭曲关系', isPersistent: true, description: '指代尼比与康查尔之间被卡彭目睹的秘密联系。', source: 'Confession' },
  'little_derek_wayne': { id: 'little_derek_wayne', chapter: 2, type: 'person', displayName: '小德里克·维恩', isPersistent: true, description: '维恩一家的幸存者，后来被证明是家族的猎物。', source: 'Confession' },
  'martha_diaz': { id: 'martha_diaz', chapter: 2, type: 'person', displayName: '玛莎·迪亚兹', isPersistent: true, description: '死于康查尔之手的洗衣店员。', source: 'Confession' },
  'aw_wilmo': { id: 'aw_wilmo', chapter: 2, type: 'person', displayName: '小 A.W.威尔莫', isPersistent: true, description: '“清理小组”成员，负责后续的回收工作。', source: 'Confession' },
  'park_ave': { id: 'park_ave', chapter: 2, type: 'location', displayName: '公园大道', isPersistent: true },
  'abandoned_child': { id: 'abandoned_child', chapter: 2, type: 'case', displayName: '弃子', isPersistent: true },
  'virginia': { 
    id: 'virginia', 
    chapter: 2, 
    type: 'location', 
    displayName: '弗吉尼亚州', 
    isPersistent: true, 
    attachments: [
      { type: 'image', title: 'Silk Ribbon Evidence (1990)', content: './assets/wilmer_ribbon.jpg' },
      { type: 'image', title: 'Record of Accounts', content: './assets/record_of_accounts.jpg', description: '在特克萨卡纳节点发现的视觉残留。亚瑟·道森（Arthur Dawson）的笔记本。' }
    ]
  },
};

export const CHAPTER2_NODES: MemoryNode[] = [
  {
    id: "confession_4",
    keyword: "confession",
    title: "供述 No.4",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
    revealedKeywords: ['nevada'],
    excludedKeywords: ['year_1967', 'dr_reggie', 'project'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我想你真正想问的是，为什么是我？雷吉博士为什么选择了我？\n\n有件事你可能不知道，就算 KLUB 在 1967 年得到了部分干预权，其所属的行为分析科也从来没有向外安插卧底的正式权限。\n\n明白吗？我是那个不合规的例外，我的存在特殊到，其实整个训练过程都是由雷吉博士亲自监督的。",
        attitude: "",
        visual: "https://picsum.photos/seed/training_fac/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在得到这份工作之前，我只是个平平无奇的州警，档案在局里挂着号。因为执勤时“过度暴力”，我被停职并扔到了专门处理公职人员的精神康复部门。当时负责我的医生是雷吉博士的学生。他并没想推荐我，他只是把一批“脑子有问题”的警察档案交给了博士，是博士在那堆纸里挑中了我。\n\n直到训练结束的那个下午，在马场旁边的咖啡馆里，博士才告诉我原因。他说得很直白：其他人的行为偏差是创伤造成的，而我是一个真正的疯子。\n\n听着，我清楚地记得他说这话时带着某种赞许，仿佛在宣布某种荣光。但在我听来，那更像是某种刺痛。那是这辈子第一次有人点破我的核心问题：我之所以当警察，就是为了避免让自己成为一个纯粹的混蛋。\n\n明白吗？因为我意识到，穿上这身制服，至少能让我在作恶的天性之外，还能对社会产生点正面作用。所以我不知道该恨博士还是该谢谢他。他给了我这份新工作，让我能在当个彻头彻尾的混蛋之余，还能给社会带来更大的“帮助”。\n\n你不觉得这话说出来真他妈的有够讽刺吗？",
        attitude: "",
        visual: "https://picsum.photos/seed/med_file/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "其实我知道你想问的是什么。你想问的是父亲。对吗？我只能告诉你一句实话，从受训到潜伏，过了好多好多年后，我忽然意识到，其实父亲在各个方面都是雷吉博士的反面。准确地说，是好的那一面。这些年我反复做一个梦，梦到其实根本就不存在什么“青豆牡蛎汤计划”，它只是我的一场噩梦，在现实中，这是内华达州本地的一道菜，除了豆子和牡蛎，你还需要在锅里放进胡萝卜、洋葱、蘑菇、月桂叶，最后倒进干雪利酒。\n\n我从不喝雪利酒，我不知道自己为什么会做这样一个梦。",
        attitude: "",
        visual: "https://picsum.com/seed/dream_soup/800/450"
      }
    },
    connectedTo: ["confession_1", "capone"]
  },
  {
    id: "confession_5",
    keyword: "confession",
    title: "供述 No.5",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 },
    revealedKeywords: ['little_derek_wayne', 'year_1971'],
    excludedKeywords: ['nevada', 'family_massacre'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "是啊，是啊。\n\n我是在电视上看到关于这个案子的消息的。那时候我们还在费城，在脏弗兰克酒吧的地下室里停留了大约两周。顺便一说，那可能是1971年整个费城最冷最潮的房子了，我恨不得把毛毯粘在自己身上。\n\n康查尔说过要抓紧赶路，此时却长时间停在费城，他不准我问问题，只让莫宁弄来一台电视机放在床头，又从楼上迁下一台发报机。于是那段日子，我每天的任务就是躺在床上盯着雪花点屏幕，吃黏糊糊的儿童麦片，而康查尔就坐在发报机前，对着那些滴滴答答的信号鼓捣个不停。",
        attitude: "",
        visual: "https://picsum.photos/seed/tv_static/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "要么是我在牢里错过了消息，要么就是这个案子的新闻封锁做得太绝了。直到大案告破，罪犯受审，才有犯罪学专家在电视节目里把它当成案例拿出来讲——讽刺的是，由于定性原因，它被包装成了一桩关于“保险诈骗”的案子。\n\n康查尔一边发报一边侧头看新闻，当专家表示牺牲者及其家人的丧葬费由政府承担时，他突然大笑起来，笑得直咳嗽。我问他笑什么，他说，或许维恩一家在报纸上看起来是典型的美国中西部中产家庭，但那位小德里克·维恩先生绝不是什么一般意义上的“一家之主”。当时我还想多掏点话，问他到底知道什么，问我们留在这儿是不是在等这个案子的结果，康查尔忽然就闭了嘴，不愿再说一个字。三天后，我们搭乘一辆散发着尿骚味的灰狗巴士离开了费城。",
        attitude: "",
        visual: "https://picsum.photos/seed/laughing_man/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "直到两年后，当我们抵达大盆地沙漠边缘，而我也已经彻底融入那个“家庭”的时候，康查尔才在某个守夜的凌晨再次提到了这件事。\n\n他说，小德里克·维恩继承了他父亲对纳瓦特尔族女性的那种病态着迷。即便这种偏执、小众的嗜好让他没法像那些高产的连环杀手一样维持“工作效率”，但这种独特性本身就足以引发报复，尤其是在“风声走漏”的情况下，那群那瓦特尔人很快就锁定了地址。他们起先没杀维恩先生，但却当着他的面，对他家人做了他曾经对那些女人做过的所有事。\n\n其实我知道，父亲憎恶由性癖引发的过度伤害，因为过度伤害会导致保护色失效，会暴露出作案的真实动机，除此之外，只有被高度约束的攻击性，才会孕育出真正的仪式。",
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
    excludedKeywords: ['empty_cigarette_pack', 'dr_reggie', 'blue_rv'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "他们说我提交过几次单项汇报？两次，还是三次？\n\n实际情况是，单从1972年春天到年底，我就投放了超过10个所谓的‘灰水信标’——那是雷吉博士在训练时想出的方案。当时我们并不知道未来会面对什么，我最终是待在东海岸跟黑手党打交道，还是会去爱荷华州同那些爱尔兰私酒贩子抢市场。\n\n因此，‘灰水信标’只是备选方案。\n\n后来，当我登上了那辆房车，几乎每时每刻都与‘家人’待在一起。因为房车必须定期停靠加油、倾倒废物或补给，那些短暂的停留成了唯一的窗口期，‘灰水信标’也就此成了我唯一的汇报方式。",
        attitude: "",
        visual: "https://picsum.photos/seed/truck_stop/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "你抽过‘铁马’吗？亮橙色的烟盒，印着漂亮的火车头标。50年代时，它是全美卡车司机、工厂工人、建筑工和长途通勤者的首选。它比你抽过的任何烟草都更重，口感浓烈、直率、不妥协，毕竟它的烟草里混合了高比例的肯塔基白肋烟。\n\n好吧，我猜你大概没听说过这个牌子。哪怕是在70年代，也只有那些走不动道的老头子还会抽它了。游历全美的嬉皮士们更迷恋万宝路，而那些年长的司机从车上下来后，再也赶不了路了。这是我们约定选择‘铁马’作为信标载具的首要原因；其次，它独特的开盒设计为书写简讯留出了足够的空间。",
        attitude: "",
        visual: "https://picsum.photos/seed/cigarette_smoke/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "雷吉博士的构想似乎非常完满：我扔掉信标，他的‘清理小组’伪装成清洁工或流浪汉，在预定路线的加油站进行定点回收。可问题在于，他手里根本没有由专业人士组成的清理小组，据我所知，肯为他干这些苦活的，其实都是KLUB战略研究室里的实习生。\n\n你觉得那帮学生能干啥？\n\n反正他们一定漏掉了我在罗阿诺克市扔掉的第一个信标，否则威廉斯堡公园大道的案子早就该破了。总之，离开房车后，我就再没碰过那个牌子的烟。当时我极度憎恶它的味道，可现在……却莫名地有些怀念。\n\n侦测到残留视觉信号，请问是否提取视觉信息？",
        attitude: "",
        visual: `./assets/iron_horse_beacon.jpg`,
        description: "铁马烟盒上写着小 A.W.威尔莫"
      }
    },
    connectedTo: ["confession_5", "capone"]
  },
  {
    id: "confession_7",
    keyword: "confession",
    title: "供述 No.7",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.9 },
    revealedKeywords: ['martha_diaz'],
    excludedKeywords: ['roanoke', 'twisted_relationship', 'maine', 'nibi', 'capone', 'robert', 'wanted_poster', 'dr_reggie', 'year_1972'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我知道，你还是忘不了尼比，虽然他已经死了，哈哈。\n\n回想起来，这事也没什么不能理解的。按照雷吉博士的统一场论，这种犯罪群体就是靠本能构建的纽带所联结。但在那年那月，我对理论一无所知，更无法想象在现实当中，所谓纽带竟是血和体液构成的。在缅因州服刑时，有个叫莫布利的警监，他是我见过最纯粹的杂碎，如果那混蛋没穿上警服，我打赌他会成为被印在FBI头版通缉令上的连环杀手。可我细想才发觉，其实莫布利的暴力是单向的、为了折磨而折磨的排泄，但康查尔对尼比所做的却不同，尽管他们之间同样充斥着殴打、流血和凌虐，但那里面有一种极其扭曲的“张力”。你能理解吗？从试图彻底地占有、容纳对方，到用刀锋和指甲去撕裂、掐死对方，这种极端的情绪在他们之间形成了一个高压张力。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison_guard/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "现在我知道了，那是一种‘爱’，一种只有在深渊里才能生长出的爱。但彼时彼刻，我却只能压抑好奇，什么都不能问，毕竟尼比就是我最初的线索，所以我不能在他嗝屁之后立刻展现出好奇心。直到我们来到罗阿诺克市。\n\n那是1972年的深秋，这地方总是弥漫着一股廉价机油和快要下雨的土腥味。在那个窄得转身都困难的廉价旅馆里，康查尔点了一支烟，却没抽，而是看着它自顾自地燃烧。他突然靠过来，离我极近，用几乎是耳语的声音对我说：“罗伯特，你一直在看尼比，对吧？你在想，是什么让他最后走得那么……平静。”他伸出一只手，轻轻扣住我的后脑勺，指甲陷进我的发根里，“那是因为他死的时候，就知道他终于把自己交还给父亲了。”",
        attitude: "",
        visual: "https://picsum.photos/seed/motel_room/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "康查尔看我的眼神，透等一种让人无法拒绝的诱惑。我不知道他是怎么做到的，在那之前，我从没想过我会对男人感兴趣，明白吗？他看着我，告诉我，“罗伯特，我能从你眼里看到那个洞，那样的东西，疯子才有。”\n\n如你所料，我没有推开他，相反，我像个溺水的人一样，问他我要怎么做，才能抵达那个世界。这之后，当一切都结束之后，康查尔做的第一个动作是放开了我的头发，然后转过身，从那个散发着霉味的抽屉里翻出一把折叠刀。他没有递给我，而是当着我的面，用舌尖轻轻舔了一下冰冷的刀刃，眼神里闪过一种像小孩子看到心爱玩具时的光。\n\n我们穿过被雨水浸透的街道，半小时后，我们来到一家叫做‘洁净人生’的自助洗衣店对面，当时店里的日光灯坏了一根，隔着被雨幕打湿的橱窗，那里的白光一闪一闪，像是一颗快要停止跳动的心脏。康查尔告诉我，里面那个有点臃肿的墨西哥女人名叫玛莎·迪亚兹。“看着，罗伯特。”康查尔声音轻得像是一片落叶，“别眨眼。”\n\n他推开车门，消失在雨幕里。我在脑子里疯狂尖叫着，想冲出去，拦住他。但我动不了，我像被钉在了座位上。康查尔推门进去了。玛莎抬起头，露出了一个那种深夜职员特有的、疲惫的礼貌笑容。她正准备开口说点什么，康查尔已经到了她身后。他伸出左手，动作几乎是温柔地绕过她的脖子，扣住了她的下巴，动作轻盈得像是在跳舞。\n\n玛莎还没来得及露出惊恐的表情，折叠刀已经切过了她的喉咙。康查尔微微侧过头，确保玛莎能够看着他的眼睛。几分钟后，他松开手，玛莎顺着干衣机滑了下去。站在那一摊缓缓扩散的红色跟前，康查尔从兜里掏出一条亮黄色的丝绸发带，动作优雅地把它系在玛莎垂死抽搐的手腕上，打上一个蝴蝶结。我看着玛莎的眼睛，这个原本每天要为了生活费发愁、为了肮脏床单劳作的平凡女人，现在已经变成一个无法被理解的‘谜题’。如今你可以知道，这是他随意坐下的标记，但在当时，这会让着迷于破解各种连环杀手符号的FBI想破脑袋。\n\n回到车上，康查尔静静发动了车子，然后把那把沾血的刀随手丢进我的怀里，他说，\"收好它，这是个礼物。\"",
        attitude: "",
        visual: "https://picsum.photos/seed/rain_window/800/450"
      }
    },
    connectedTo: ["confession_6", "capone"]
  },
];
