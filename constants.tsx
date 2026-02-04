
import { MemoryNode, MemoryLayer } from './types';

// Exported dossier data for the investigation view
export const INITIAL_DOSSIER = {
  agent: {
    name: "罗伯特·卡彭",
    id: "FBI-7742-RC",
  },
  reports: [
    {
      date: "2013-03-15",
      content: "凤凰城行动开始。探员罗伯特·卡彭奉命深度渗透一个庞大的家族式犯罪辛迪加。预计潜伏时间：不定。"
    },
    {
      date: "2018-09-27",
      content: "卡彭最后一次单向汇报。提及代号'建筑师'和神秘物质'G.B.O.S.'。此后完全失联，进入无线电静默状态。"
    },
    {
      date: "2025-02-19",
      content: "亚利桑那州荒漠深处酒吧发现昏迷男子，DNA比对确认为失踪十余年的探员罗伯特·卡彭。现处于植物人状态，大脑维持在临界意识。全美暴力犯罪率近半年异常飙升，BAU研判与卡彭潜伏组织重启活动高度相关。记忆潜航计划已获批。"
    }
  ]
};

export const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {
  // Node 1
  'confession_1': ['maine', 'small_bank', 'nibi', 'conchar'],
  'confession_2': ['ohio', 'ritual_case', 'lundgren'],
  'confession_3': ['chicago', 'missing', 'roger_beebe'],
  'me_1971': ['maine', 'year_1971', 'nibi'],
  'oh_1968': ['ritual_case', 'year_1968', 'lundgren'],
  'dc_1967': ['phoenix', 'year_1967'],
  'il_1985': ['roger_beebe', 'year_1985'],

  // Node 2
  'confession_4': ['1402_old_dominion_rd', 'training_day'],
  'confession_5': ['nevada', 'family_massacre', 'little_derek_wayne'],
  'confession_6': ['mojave_rest_stop', 'empty_cigarette_pack', 'graywater_beacon'],
  'confession_7': ['roanoke', 'twisted_relationship', 'martha_diaz'],
  'va_1990': ['aw_wilmo', 'year_1990'],

  // Node 3
  'confession_8': ['louisville', 'blue_rv', 'julie', 'the_mother', 'vanessa', 'silas', 'year_1973'],
  'confession_9': ['cincinnati', 'mint_plan', 'juvell_chambers', 'distant_relatives'], // Removed 'el_paso'
  'confession_10': ['burkesville', 'boris_smirnov'],
  'confession_11': ['klub75_report', 'quantico', 'cynthia_miller'],
  'confession_12': ['kansas_city', 'mobile_blood_truck'],
  'confession_13': ['east_12th_st', 'execution_room', 'john_morrissey', 'jc_penney'],
  'cin_1973': ['julie', 'year_1973'],
  'nas_1973': ['cincinnati', 'year_1973'],
  'ky_1973': ['burkesville', 'year_1973'],

  // Node 4
  'confession_14': ['st_louis', 'maggots'],
  'confession_15': ['davenport', 'new_plan', 'peter_henderson'],
  'kan_1976': ['jc_penney', 'east_12th_st', 'year_1976'],
  'kc_1965': ['john_morrissey', 'year_1965'],
  'ia_1976': ['peter_henderson', 'year_1976'],
  'confession_16': ['texarkana', 'dismemberment_case'],
  'confession_17': ['richie_dreyfuss', 'rockford'],
  'confession_18': ['el_paso', 'priest'],
  'confession_19': ['el_paso', 'priest', 'church'],
  'confession_20': ['interstate_80', 'watchman'],
  'confession_21': ['portland', 'achilles_heel'],
  'confession_22': ['redwood_forest', 'pow_camp'],
  'archive_15': ['year_1977', 'richie_dreyfuss'],
  'archive_16': ['dirty_frank', 'recruitment'],
  'tx_1967': ['el_paso', 'year_1977'],

  // Node 4 Retrieval Targets (Meta-group for visual removal AFTER Jennifer dialogue)

};

// Categorization for split UI views
export const CATEGORY_IDS = {
  LOCATIONS: [
    'east_12th_st', 'davenport', 'texarkana', 'el_paso', 'dirty_frank',
    'st_louis', 'cincinnati', 'chicago', 'louisville', 'burkesville',
    'quantico', 'kansas_city', 'roanoke', 'nevada', 'ohio', 'maine',
    'mojave_rest_stop', '1402_old_dominion_rd', 'denver_suburb', 'church',
    'interstate_80', 'portland', 'redwood_forest', 'pow_camp', 'santa_barbara',
    'rockford'
  ],
  CASES: [
    'new_plan', 'recruitment', 'dismemberment_case', 'rockford',
    'ritual_case', 'small_bank', 'missing', 'family_massacre',
    'twisted_relationship', 'mint_plan', 'klub75_report',
    'mobile_blood_truck', 'execution_room', 'chaos_aesthetics', 'maggots',
    'police_killing', 'reboot_command', 'watchman', 'achilles_heel',
    'amalekite_protocol', 'closing_the_net', 'tithe', 'silver_magpie',
    'project', 'julip'
  ],
  PEOPLE: ['nibi', 'conchar', 'father', 'lundgren', 'morning', 'robert', 'robert_capone', 'dr_reggie', 'roger_beebe', 'little_derek_wayne', 'aw_wilmo', 'martha_diaz', 'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers', 'boris_smirnov', 'jc_penney', 'john_morrissey', 'cynthia_miller', 'peter_henderson', 'priest', 'arthur_dawson', 'richie_dreyfuss'],
  YEARS: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1972', 'year_1990', 'year_1973', 'year_1986', 'year_1982', 'year_1975', 'year_1976', 'year_1974', 'year_1965', 'year_1977']
};

export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: 'clue' | 'year' | 'person' | 'location' | 'archive' }> = {
  // People
  '罗伯特·卡彭': { id: 'capone', type: 'person' },
  '罗伯特': { id: 'robert', type: 'person' },
  '父亲': { id: 'father', type: 'person' },
  '尼比': { id: 'nibi', type: 'person' },
  '康查尔': { id: 'conchar', type: 'person' },
  '伦德格兰': { id: 'lundgren', type: 'person' },
  '莫宁': { id: 'morning', type: 'person' },
  '雷吉博士': { id: 'dr_reggie', type: 'person' },
  '罗格·毕比': { id: 'roger_beebe', type: 'person' },
  '小德里克·维恩': { id: 'little_derek_wayne', type: 'person' },
  '玛莎·迪亚兹': { id: 'martha_diaz', type: 'person' },
  '朱莉': { id: 'julie', type: 'person' },
  '塞勒斯': { id: 'silas', type: 'person' },
  '赛勒斯': { id: 'silas', type: 'person' },
  '瓦妮莎': { id: 'vanessa', type: 'person' },
  '里奇·德莱弗斯': { id: 'richie_dreyfuss', type: 'person' },
  '里奇': { id: 'richie_dreyfuss', type: 'person' },
  'Richie Dreyfuss': { id: 'richie_dreyfuss', type: 'person' },
  '母亲': { id: 'the_mother', type: 'person' },
  '朱维尔·钱伯斯': { id: 'juvell_chambers', type: 'person' },
  '鲍里斯·斯米尔诺夫': { id: 'boris_smirnov', type: 'person' },
  '辛西娅·米勒': { id: 'cynthia_miller', type: 'person' },
  '杰西·潘尼': { id: 'jc_penney', type: 'person' },
  '杰西潘尼': { id: 'jc_penney', type: 'person' },
  '约翰·莫里西': { id: 'john_morrissey', type: 'person' },
  '约翰莫里西': { id: 'john_morrissey', type: 'person' },
  '皮特·亨德森': { id: 'peter_henderson', type: 'person' },
  '彼特·亨德森': { id: 'peter_henderson', type: 'person' },
  '牧师': { id: 'priest', type: 'person' },
  '亚瑟·道森': { id: 'arthur_dawson', type: 'person' },
  '亚瑟': { id: 'arthur_dawson', type: 'person' },
  'Arthur Dawson': { id: 'arthur_dawson', type: 'person' },
  // Years
  '1971': { id: 'year_1971', type: 'year' },
  '1971年': { id: 'year_1971', type: 'year' },
  '1968': { id: 'year_1968', type: 'year' },
  '1968年': { id: 'year_1968', type: 'year' },
  '1967': { id: 'year_1967', type: 'year' },
  '1967年': { id: 'year_1967', type: 'year' },
  '1985': { id: 'year_1985', type: 'year' },
  '1985年': { id: 'year_1985', type: 'year' },
  '1972': { id: 'year_1972', type: 'year' },
  '1972年': { id: 'year_1972', type: 'year' },
  '1990': { id: 'year_1990', type: 'year' },
  '1990年': { id: 'year_1990', type: 'year' },
  '1973': { id: 'year_1973', type: 'year' },
  '1973年': { id: 'year_1973', type: 'year' },
  '1986': { id: 'year_1986', type: 'year' },
  '1986年': { id: 'year_1986', type: 'year' },
  '1982': { id: 'year_1982', type: 'year' },
  '1982年': { id: 'year_1982', type: 'year' },
  '1975': { id: 'year_1975', type: 'year' },
  '1975年': { id: 'year_1975', type: 'year' },
  '1976': { id: 'year_1976', type: 'year' },
  '1976年': { id: 'year_1976', type: 'year' },
  '1974': { id: 'year_1974', type: 'year' },
  '1974年': { id: 'year_1974', type: 'year' },
  '1965': { id: 'year_1965', type: 'year' },
  '1965年': { id: 'year_1965', type: 'year' },
  '1977': { id: 'year_1977', type: 'year' },
  '1977年': { id: 'year_1977', type: 'year' },

  // Locations
  '缅因州': { id: 'maine', type: 'location' },
  '俄亥俄州': { id: 'ohio', type: 'location' },
  '芝加哥': { id: 'chicago', type: 'location' },
  '内华达州': { id: 'nevada', type: 'location' },
  '弗吉尼亚州': { id: 'va_1990', type: 'location' }, // Map to the archive year id for simplicity if needed
  '罗阿诺克': { id: 'roanoke', type: 'location' },
  '波特兰': { id: 'portland', type: 'location' },
  '堪萨斯城': { id: 'kansas_city', type: 'location' },
  '罗克福德市': { id: 'rockford', type: 'location' },
  '罗克福德': { id: 'rockford', type: 'location' },
  'Rockford': { id: 'rockford', type: 'location' },
  '圣路易斯': { id: 'st_louis', type: 'location' },
  '达文波特': { id: 'davenport', type: 'location' },
  '达文波特市': { id: 'davenport', type: 'location' },
  '特克萨卡纳': { id: 'texarkana', type: 'location' },
  '埃尔帕索': { id: 'el_paso', type: 'location' },
  '脏弗兰克酒吧': { id: 'dirty_frank', type: 'location' },
  '东12街': { id: 'east_12th_st', type: 'location' },
  '莫哈韦休息站': { id: 'mojave_rest_stop', type: 'location' },
  '1402 Old Dominion Rd.': { id: '1402_old_dominion_rd', type: 'location' },
  '战俘营': { id: 'pow_camp', type: 'location' },
  '圣芭芭拉': { id: 'santa_barbara', type: 'location' },

  // Cases / Details
  '小银行': { id: 'small_bank', type: 'clue' },
  '仪式案': { id: 'ritual_case', type: 'clue' },
  '祭祀案': { id: 'ritual_case', type: 'clue' },
  '失踪': { id: 'missing', type: 'clue' },
  '训练日': { id: 'training_day', type: 'clue' },
  '灭门案': { id: 'family_massacre', type: 'clue' },
  '空烟盒': { id: 'empty_cigarette_pack', type: 'clue' },
  '灰水信标': { id: 'graywater_beacon', type: 'clue' },
  '碎尸案': { id: 'dismemberment_case', type: 'clue' },
  '扭曲关系': { id: 'twisted_relationship', type: 'clue' },
  '肉体关系': { id: 'twisted_relationship', type: 'clue' },
  '薄荷计划': { id: 'mint_plan', type: 'clue' },
  '新计划': { id: 'new_plan', type: 'clue' },
  '招募': { id: 'recruitment', type: 'clue' },
  '行刑室': { id: 'execution_room', type: 'clue' },
  '流动献血车': { id: 'mobile_blood_truck', type: 'clue' },
  '80号洲际公路': { id: 'interstate_80', type: 'location' },
  '守夜人': { id: 'watchman', type: 'clue' },
  '软肋': { id: 'achilles_heel', type: 'clue' },
  '红杉林': { id: 'redwood_forest', type: 'location' },
  '亚玛力人协议': { id: 'amalekite_protocol', type: 'clue' },
  '收网': { id: 'closing_the_net', type: 'clue' },
  '什一税': { id: 'tithe', type: 'clue' },
  '亚裔女性': { id: 'asian_woman', type: 'clue' },
  '黄油朱利普': { id: 'julip', type: 'clue' },
  '青豆牡蛎汤计划': { id: 'project', type: 'clue' },
  '诡异家族': { id: 'family', type: 'clue' },
  '混乱美学': { id: 'chaos_aesthetics', type: 'clue' },
  '蛆虫': { id: 'maggots', type: 'clue' },
  'KLUB-75号分析报告': { id: 'klub75_report', type: 'clue' },
  'KLUB-75': { id: 'klub75_report', type: 'clue' },
  '伯克斯维尔': { id: 'burkesville', type: 'clue' },
  '丹佛市郊': { id: 'denver_suburb', type: 'location' },
  '警员遇害案': { id: 'police_killing', type: 'clue' },
  '教堂': { id: 'church', type: 'location' },
  '>> 0x524F42455254_PURGE // ERR::NO_SIGNAL_FROM_GOD // MAGPIE_OVERRIDE >> [FORCE_LOAD_MONSTER]': { id: 'reboot_command', type: 'clue' },
};

export const ARCHIVE_CASE_HIGHLIGHT_MAP: Record<string, string[]> = {
  'oh_1968': ['俄亥俄州', '祭祀案', '1967'],
  'dc_1967': ['碎尸案'],
  'va_1990': [],
  'il_1985': ['1402 Old Dominion Rd.', '灭门案', '训练日'],
  'nv_1971': ['莫哈韦休息站', '空烟盒'],
  'cin_1973': ['1986', '1986年', '薄荷计划'],
  'nas_1973': ['伯克斯维尔', '1975', '1975年'],
  'ky_1973': ['KLUB-75号分析报告', '匡提科', 'Quantico'],
  'kan_1976': ['东12街', '行刑室'],
  'kc_1965': ['圣路易斯', '蛆虫'],
  'tx_1967': ['亚瑟·道森', '雷吉博士', '特克萨卡纳'],
  'archive_15': [],
  'archive_16': ['丹佛市郊', '警员遇害案']
};

export const BRIEFING_SECTIONS = [
  {
    id: 1,
    title: '档案：罗伯特·卡彭',
    content: '[罗伯特·卡彭](clue:robert)（Robert Carpen），出生年月不详。根据现有档案推定，其被联邦调查局（FBI）招募时年龄约为25岁。32—33岁期间，被“KLUB”计划列为重点关注对象，并纳入专项强化培训序列。据交叉资料比对，其进入缄默潜伏状态的时间节点，推测在34—36岁之间。\n\n除DNA序列外，其全部可追溯身份信息已依程序抹除。经后续解密确认，其安全识别代码为「[黄油朱莉普](clue:julip)」（Butter Julep），“罗伯特·卡彭”系其潜伏阶段使用之身份代号，并非真实姓名。',
  },
  {
    id: 2,
    title: '探员汇报摘要',
    content: '以下内容整理自当年负责与该目标进行单线对接之探员的工作汇报。相关记录显示，该探员在汇报形成阶段已出现明显精神异常征象，但直至数年后方被正式确认并归档。因此，原始材料中存在部分语义断裂、指代混乱及逻辑跳跃现象。出于信息完整性与溯源需要，简报在整理过程中未对相关表述进行实质性修订，均予以原文保留。',
    isHighlight: true,
  },
  {
    id: 3,
    title: '证言记录 - 01',
    content: '他是在梦里告诉我这个故事的。\n他说，他感到非常悔恨，因此这是个千真万确的故事。\n他的年纪已经非常老了，我相信他说的一定千真万确。',
  },
  {
    id: 4,
    title: '证言记录 - 02',
    content: '他说，曾经有一个极其诡异的家族，他们的旁支横跨全美国。有父亲，母亲，长女，养女，还有好几个兄弟。这一大家子，有时藏在树林里，有时候又住在城镇上，有时乘着一辆房车驶过国家公园，有时又搭乘长途巴士，从孟菲斯一直坐到西海岸。',
  },
  {
    id: 5,
    title: '证言记录 - 03',
    content: '有一次，一伙罪犯劫掠了[缅因州](clue:maine)的某个[小银行](clue:small_bank)，人们提到蒙面人中有两人佩戴阿尔衮琴族头饰，另一次，[芝加哥](clue:chicago)附近的香槟镇上，一个[亚裔女性](clue:asian_woman)在离开大学图书馆后[失踪](clue:missing)了。一些本地人说她回到了身在远东的前夫身边，另外一些的怀疑更合理，本地的一名深居简出的公开恋童者。',
  },
  {
    id: 6,
    title: '证言记录 - 04',
    content: '在我的梦里，他告诉我，他说这一切其实都是这个家族所为，他们一边旅行，一边杀人。他们刻意制造线索，把每个案子伪装成动机不同的类型，以供人们遐想，猜测。',
  },
  {
    id: 7,
    title: '证言记录 - 05',
    content: '这是个以血缘为连接的犯罪团伙，它的主谋是[父亲](clue:father)，父亲有一个习惯，他会用随便见到的某个东西去命名他们的犯罪计划，目的是为了消解每一起犯罪之间关联的可能，让其从各方面都尽可能地随机。',
  },
  {
    id: 8,
    title: '证言记录 - 06',
    content: '整个家族都在乱伦，而且通过性行为控制刚刚加入的新成员。老人跟我说，当年他隐藏自己的探员身份，以养子之名潜入家族内部寻找证据时，他们正在执行的计划叫作“[青豆牡蛎汤计划](clue:project)”。',
  },
];

export const JENNIFER_INTRO_DIALOGUE = [
  "我是你本次潜航任务的向导兼操作员詹妮弗。",
  "你已经完成了初步的关键词搜集。",
  "接下来，请将这些关键词在同卡彭对话时抛出，以进一步搜集他记忆中的重要碎片。",
  "准备好进入卡彭的潜意识了吗？我会不定期进行联络，对于搜集进度和关键性问题提出指导意见。"
];

export const JENNIFER_FIRST_VISIT_DIALOGUE = [
  "你终于找到这里了。",
  "这里是\"案卷建档\"模块。\n从结构上看，它只是一个调查工具，对卡彭来说不具备情绪或记忆权重。",
  "为了避免引起他潜意识层面的警觉，我们之后的所有交流，都会在这个模块内进行。",
  "他知道你正在进行调查工作。\n在他的认知模型里，这里只会被理解为\"你在整理材料\"，不会触发防御反应。",
  "任务推进过程中，记得不时回来看看。\n当你取得阶段性进展时，我可能会为你解锁新的信息、提示，或者调整当前目标。",
  "如果我没有主动出现，也不代表这里是安全的。\n只是说明，你还没触及他真正敏感的部分。"
];

export const JENNIFER_RETURN_DIALOGUE = [
  "你又回来了。",
  "目前还没有新的线索可以共享。\n你触及的层级，仍然停留在表层整理阶段。",
  "继续推进调查。\n当案卷之间出现无法被合理归档的矛盾时，这里才会再次产生意义。",
  "不用刻意停留。\n如果有新的触发点，我会在这个模块内标记出来。",
  "现在，回去工作吧。"
];

export const JENNIFER_NODE_1_DIALOGUE = [
  "我需要你立刻修正判断。",
  "罗伯特·卡彭不再可信。\n他已经脱离\"自己人\"的范畴。",
  "他不断提及过往案件，并不是在协助你。\n那是在拖延，在绕开核心。",
  "从现在开始，忽略这些案子。",
  "你的唯一重点，是\"父亲\"的下落。",
  "盯紧他的路线，拆解他的话。\n找出漏洞，找出变节的迹象。",
  "最重要的是——\n确认 he 把父亲藏在了哪里。",
  "我已经根据你目前的调查进展，以及新增的外部信息，\n整理并更新了案卷建档中的部分内容。",
  "你现在可以进入该模块，查看这些更新。",
  "不要分心。你可以试试问问他关于[训练日](clue:training_day)的事情。"
];

export const JENNIFER_NODE_2_DIALOGUE = [
  "我注意到你在索恩的备忘录上停留了太长时间。",
  "我必须提醒你，索恩和雷吉一样，都是已经被时代抛弃的人。",
  "别忘了，卡彭没有阻止康查尔，他在享受。",
  "在他见到“父亲”之前，腐化就已经开始。他已不再可靠。",
  "我解密了一份被雷吉封存的原始记录。关于卡彭最后一次“灰水信标”投放。[查看记录](clue:view_iron_horse_record)",
  "如果你需要更多细节，去问问他关于[内华达州](clue:nevada)的事情。"
];

export const JENNIFER_NODE_3_DIALOGUE = [
  "你越界了，潜航者。",
  "把阿尔特曼的绝密批注展示给目标？极其愚蠢。",
  "你没有在做记录，你在制造混乱。",
  "看看你干的好事。我还得手动清除你造成的数据污染。",
  "好了，我已经回收了所有尚未触发供述的关键词，如有进展会再联系你。",
  "去问他圣路易斯的事，那个吸血鬼的案子。",
  "记清楚你的身份。你只是个摄像头，别再妄想当上帝。",
  "下不为例。"
];

export const JENNIFER_NODE_4_DIALOGUE = [
  "效率低下。",
  "你在刚才那些无用的情感废料上浪费了太多算力。",
  "亨德森的道德胜利、房车里的原始仪式……别忘了你是建立证据链的，不是让你写纪实文学。",
  "不过，监测显示，你这种毫无章法的乱撞，确实击碎了目标的逻辑防御。",
  "我已撤销之前的屏蔽指令。既然你喜欢挖旧账，那就挖得精准点。",
  "听好了，别在这些哭鼻子话题上浪费时间，去组合这些新的坐标：",
  "[脏弗兰克酒吧](clue:dirty_frank) 是个地点。它对应的案件节点是 [招募](clue:recruitment)。",
  "[莫宁](clue:morning) 是个人名。锁定时间轴 [1974](clue:year_1974)。",
  "[碎尸案](clue:dismemberment_case) 是核心事件。那个横跨三州的抛尸地是 [特克萨卡纳](clue:texarkana)。",
  "[埃尔帕索](clue:el_paso) 是边境中转站。那里发生的事关联着 [牧师](clue:priest)。",
  "路径已铺好。别让我后悔把权限交还给你。"
];

export const JENNIFER_NODE_5_DIALOGUE = [
  "……三次。",
  "你觉得自己很幽默，是吗？潜航者。",
  "你看看他现在的样子。 你给了他一个名字，他那颗破碎的大脑立刻就编造了一套逻辑来填补空白。",
  "\"银喜鹊\"？",
  "别逗了。 这只是典型的虚构症。",
  "他无法接受自己在埃尔帕索像条狗一样被抛弃的事实，所以潜意识必须捏造一个\"具体的背叛者\"来为他的绝望买单。",
  "他需要恨一个人，而你正好把我的名字递到了他嘴边。",
  "别把这种受害者的妄想当真了，这显得你很不专业。",
  "考虑到你多次错误操作，已导致大量派生数据产生，这严重污染到了本体数据。",
  "为了继续工作，我不得不重启机体。",
  "请你复制并输入指令：[>> 0x524F42455254_PURGE // ERR::NO_SIGNAL_FROM_GOD // MAGPIE_OVERRIDE >> \\[FORCE_LOAD_MONSTER\\]](clue:reboot_command)",
  "别再耍滑头了，潜航者。"
];



// Derived display map for backward compatibility
export const CLUE_DISPLAY_MAP: Record<string, string> = Object.entries(GLOBAL_KEYWORD_MAP).reduce((acc, [word, info]) => {
  acc[info.id] = acc[info.id] || word; // Use the first word encountered as display name
  return acc;
}, {} as Record<string, string>);

// Override some display names to ensure correct Chinese/English
CLUE_DISPLAY_MAP['year_1965'] = '1965';
CLUE_DISPLAY_MAP['year_1967'] = '1967';
CLUE_DISPLAY_MAP['year_1968'] = '1968';
CLUE_DISPLAY_MAP['year_1971'] = '1971';
CLUE_DISPLAY_MAP['year_1972'] = '1972';
CLUE_DISPLAY_MAP['year_1973'] = '1973';
CLUE_DISPLAY_MAP['year_1974'] = '1974';
CLUE_DISPLAY_MAP['year_1975'] = '1975';
CLUE_DISPLAY_MAP['year_1976'] = '1976';
CLUE_DISPLAY_MAP['year_1982'] = '1982';
CLUE_DISPLAY_MAP['year_1985'] = '1985';
CLUE_DISPLAY_MAP['year_1986'] = '1986';
CLUE_DISPLAY_MAP['year_1990'] = '1990';
CLUE_DISPLAY_MAP['maine'] = '缅因州';
CLUE_DISPLAY_MAP['ohio'] = '俄亥俄州';
CLUE_DISPLAY_MAP['chicago'] = '芝加哥';
CLUE_DISPLAY_MAP['nevada'] = '内华达州';
CLUE_DISPLAY_MAP['roanoke'] = '罗阿诺克';
CLUE_DISPLAY_MAP['kansas_city'] = '堪萨斯城';
CLUE_DISPLAY_MAP['st_louis'] = '圣路易斯';
CLUE_DISPLAY_MAP['davenport'] = '达文波特';
CLUE_DISPLAY_MAP['texarkana'] = '特克萨卡纳';
CLUE_DISPLAY_MAP['el_paso'] = '埃尔帕索';
CLUE_DISPLAY_MAP['new_plan'] = '新计划';
CLUE_DISPLAY_MAP['recruitment'] = '招募';
CLUE_DISPLAY_MAP['dismemberment_case'] = '碎尸案';
CLUE_DISPLAY_MAP['year_1977'] = '1977';
CLUE_DISPLAY_MAP['richie_dreyfuss'] = '里奇·德莱弗斯';
CLUE_DISPLAY_MAP['rockford'] = '罗克福德市';
CLUE_DISPLAY_MAP['denver_suburb'] = '丹佛市郊';
CLUE_DISPLAY_MAP['police_killing'] = '警员遇害案';
CLUE_DISPLAY_MAP['ritual_case'] = '祭祀案';
CLUE_DISPLAY_MAP['small_bank'] = '小银行';
CLUE_DISPLAY_MAP['missing'] = '失踪';
CLUE_DISPLAY_MAP['training_day'] = '训练日';
CLUE_DISPLAY_MAP['family_massacre'] = '灭门案';
CLUE_DISPLAY_MAP['empty_cigarette_pack'] = '空烟盒';
CLUE_DISPLAY_MAP['graywater_beacon'] = '灰水信标';
CLUE_DISPLAY_MAP['twisted_relationship'] = '扭曲关系';
CLUE_DISPLAY_MAP['mint_plan'] = '薄荷计划';
CLUE_DISPLAY_MAP['execution_room'] = '行刑室';
CLUE_DISPLAY_MAP['mobile_blood_truck'] = '流动献血车';
CLUE_DISPLAY_MAP['dirty_frank'] = '脏弗兰克酒吧';
CLUE_DISPLAY_MAP['east_12th_st'] = '东12街';
CLUE_DISPLAY_MAP['mojave_rest_stop'] = '莫哈韦休息站';
CLUE_DISPLAY_MAP['1402_old_dominion_rd'] = '1402 Old Dominion Rd.';
CLUE_DISPLAY_MAP['crime_route_map'] = '罗伯特·卡彭：犯罪路线';
CLUE_DISPLAY_MAP['blue_rv'] = '淡蓝色房车';
CLUE_DISPLAY_MAP['martha_diaz'] = '玛莎·迪亚兹';
CLUE_DISPLAY_MAP['julie'] = '朱莉';
CLUE_DISPLAY_MAP['the_mother'] = '母亲';
CLUE_DISPLAY_MAP['vanessa'] = '瓦妮莎';
CLUE_DISPLAY_MAP['silas'] = '塞勒斯';
CLUE_DISPLAY_MAP['nibi'] = '尼比';
CLUE_DISPLAY_MAP['conchar'] = '康查尔';
CLUE_DISPLAY_MAP['lundgren'] = '伦德格兰';
CLUE_DISPLAY_MAP['morning'] = '莫宁';
CLUE_DISPLAY_MAP['dr_reggie'] = '雷吉博士';
CLUE_DISPLAY_MAP['john_morrissey'] = '约翰·莫里西';
CLUE_DISPLAY_MAP['roger_beebe'] = '罗格·毕比';
CLUE_DISPLAY_MAP['little_derek_wayne'] = '小德里克·维恩';
CLUE_DISPLAY_MAP['boris_smirnov'] = '鲍里斯·斯米尔诺夫';
CLUE_DISPLAY_MAP['juvell_chambers'] = '朱维尔·钱伯斯';
CLUE_DISPLAY_MAP['church'] = '教堂';
CLUE_DISPLAY_MAP['cynthia_miller'] = '辛西娅·米勒';
CLUE_DISPLAY_MAP['chaos_aesthetics'] = '混乱美学';
CLUE_DISPLAY_MAP['maggots'] = '蛆虫';
CLUE_DISPLAY_MAP['peter_henderson'] = '皮特·亨德森';
CLUE_DISPLAY_MAP['arthur_dawson'] = '亚瑟·道森';
CLUE_DISPLAY_MAP['priest'] = '牧师';
CLUE_DISPLAY_MAP['jc_penney'] = '杰西·潘尼';
CLUE_DISPLAY_MAP['robert'] = '罗伯特';
CLUE_DISPLAY_MAP['capone'] = '罗伯特·卡彭';
CLUE_DISPLAY_MAP['father'] = '父亲';
CLUE_DISPLAY_MAP['project'] = '青豆牡蛎汤计划';
CLUE_DISPLAY_MAP['julip'] = '黄油朱莉普';
CLUE_DISPLAY_MAP['family'] = '诡异家族';
CLUE_DISPLAY_MAP['klub75_report'] = 'KLUB-75号分析报告';
CLUE_DISPLAY_MAP['quantico'] = '匡提科';
CLUE_DISPLAY_MAP['reboot_command'] = '>> 0x524F42455254_PURGE // ERR::NO_SIGNAL_FROM_GOD // MAGPIE_OVERRIDE >> [FORCE_LOAD_MONSTER]';
CLUE_DISPLAY_MAP['interstate_80'] = '80号洲际公路';
CLUE_DISPLAY_MAP['watchman'] = '守夜人';
CLUE_DISPLAY_MAP['redwood_forest'] = '红杉林';
CLUE_DISPLAY_MAP['pow_camp'] = '战俘营';
CLUE_DISPLAY_MAP['amalekite_protocol'] = '亚玛力人协议';

export const CORE_NODES: MemoryNode[] = [
  {
    id: "capone",
    keyword: "capone",
    title: "罗伯特·卡彭",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.45 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "罗伯特曾是FBI最受期待的探员，但在十年前的凤凰城扫黑行动后失踪。",
        attitude: "我想回家。不，我没有家。我属于这里，属于这片阴影。",
        visual: "https://picsum.photos/seed/robert/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "他的失踪并非被迫，而是主动选择了静默。他发现辛迪加的根须已经伸到了局里。",
        attitude: "信任是一种奢侈品。我必须变成他们，才能看清到底谁在卖掉我们。",
        visual: "https://picsum.photos/seed/badge/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "罗伯特成为了'建筑师'的副手，甚至是合伙人。他在深渊中建立了自己的微型帝国。",
        attitude: "深渊没有回头路。我不是在潜伏，我是在进化。"
      }
    },
    connectedTo: ["luciano", "gbos"]
  },
  {
    id: "luciano",
    keyword: "luciano",
    title: "卢西亚诺",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.3 },
    revealedKeywords: ['gbos', 'chicago'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "卢西亚诺酒吧的老板，家族的财务管家。一个喜欢穿丝绸衬衫的肥胖男人。",
        attitude: "只要有酒和牡蛎，这个世界就是完美的。对吧，卡彭？",
        visual: "https://picsum.photos/seed/luciano/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "卢西亚诺负责分发那些'特制汤'。他死在卡彭怀里，临死前手里紧握着一根needle针管。",
        attitude: "他太软弱了。他以为自己在喂食大家，其实 he 只是在为建筑师挑选祭品。"
      }
    },
    connectedTo: ["gbos"]
  },
  {
    id: "gbos",
    keyword: "gbos",
    title: "G.B.O.S.",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.7 },
    revealedKeywords: ['julip', 'project'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "代号意为'青豆牡蛎汤'。一种难以下咽的帮派内部流行食谱。",
        attitude: "别喝那碗汤。如果你还想活着看到明天的太阳。",
        visual: "https://picsum.photos/seed/soup_v/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "实际上是'全球生物有机压制'的缩写。一种能够让人陷入可控意识瘫痪的毒素。",
        attitude: "这是建筑师的杰作。一种不费一兵一卒就能接管城市的武器。我帮他完成了最后一步。"
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_1",
    keyword: "confession",
    title: "供述 No.1",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 },
    revealedKeywords: ['maine', 'nibi', 'conchar', 'year_1971', 'small_bank', 'twisted_relationship'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "日子过去实在太久了。这些年我喝了这么多劣质波本，脑子早被搞坏了。所以即便我能记得起来的，大概也是我这几十年来为了不发疯，一遍遍讲给自己听的'故事'。\n\n到底是不是真的发生过的事情，我真不敢给你打包票。我只能说，那次潜伏任务（Deep Cover）的启动完全背离了局里的标准作业程序。\n\n如果我没记错的话，你说的缅因州的案子发生在1971年，是雷吉博士标记案件中的最新一起。总之通过一些退伍军人俱乐部的关系，行动组很快就锁定了逮捕一个名叫尼比的阿尔衮琴人，尼比对罪行供认不讳，很快就被审判收监。没过几天，他们也把我也放到监狱里，和他关在一起。",
        attitude: "",
        visual: "assets/incident-report.jpg"
      },
      [MemoryLayer.DEEP]: {
        event: "招募我的人叫雷吉博士，我猜你在量化官的档案库里没见到过这个名字。不过'统一场论'就是他搞出来的，那时他手里有好几个看似孤立的冷案，他认为它们之间存在共性，而调查部门推想中的动机其实都是犯事者的障眼法。\n\n总之，缅因州银行案就是博士名单上最后一起案子。通过退伍军人协会的一些关系，行动组很快就揪住了那个叫尼比的阿尔衮琴人。尼比很干脆，很快就认罪了，接着被扔进惩教署的大牢。博士认为时机到了，所以紧接着没过几天，我也被'送'了进去，成了尼比的室友。\n\n在训练阶段，博士曾反复强调：在那个密闭环境里，我必须对'罪恶'本身表现出一种生理性的热诚，所以我隔三差五就找茬揍人，用拳头在里头立威。可跟我同屋的尼比却稳得像块石头，一点反应都没有。直到有一天，一个叫康查尔的年轻犯人开始主动找我搭讪，他告诉我，他十分欣赏我，我也了解到，他因为微不足道一件小事被警察盘问，最终却因袭警入狱。康查尔是一个极其危险的观察者，他不止一次对我说，他能从我身上闻到某种属于'公职人员'的腐朽气味。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我想你已经有了答案，这个康查尔就是那位'父亲'的长子。\n\n不管怎么说，我最后还是赢了他的信任。进监狱前，博士给我造了个意大利裔孤儿的身世，康查尔告诉我，当铁门打开时，会有一个'家庭'在外面接纳我。而此前我们一直监控的目标尼比，看起来似乎成了计划中的冗余。我一度怀疑是博士的直觉出了偏差，什么统一场论根本子虚乌有。但就在我即将获得假释的前夕，我忽然发现，康查尔与尼比之间一直维持着某种扭曲的、带有仪式性质的肉体关系。这段关系直到出狱之前某天，尼比忽然'意外'身亡才宣告终结，可我始终记得他们最后一次对视，两人嘴角都带着一种极度默契的微笑。反正到今天我也无法确定，尼比的死是否与康查尔有关。\n\n无论如何，缅因州银行劫案，1971年，嫌疑人尼比。这就是我能从那堆名为记忆的废墟里挖掘出的全部东西了。",
        attitude: "",
        visual: "https://picsum.photos/seed/smile/800/450"
      }
    },
    connectedTo: ["capone", "luciano"]
  },
  {
    id: "confession_2",
    keyword: "confession",
    title: "供述 No.2",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.8, y: window.innerHeight * 0.5 },
    revealedKeywords: ['ohio', 'lundgren', 'morning', 'year_1968', 'ritual_case'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "从有了'统一场论'之后，雷吉博士就有一个不断更新中的冷案列表。\n\n我不知道他凭借什么理论框架和证据，就认为这些案子彼此之间存在勾连，但他要求我，务必记住其中每一件的所有细节，以便接近缅因州银行劫案的真凶之后，能从侧面搜寻串联起这些案子的人证物证。\n\n如你所知，到狱中后尼比始终对我毫无兴趣，而他的死也让我一度以为任务即将以失败，不过随着康查尔跟我一同出狱，我很快就发现，原来雷吉博士的冷案列表中，还真有两个案子或许有些联系。",
        attitude: "",
        visual: "https://picsum.photos/seed/case_files/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "那时我们被关在汉弗莱监狱，以我当时的经验来说，那的狱警应该是整个缅因州最糟糕的，其中有个叫莫布利的警监……总之离开监狱后，康查尔靠着他从莫布利那套来的话，诱骗了他的婆娘。开着他那台雷鸟，我们跨越州界，沿海岸线一路抵达费城。\n\n一路上，康查尔还在吹嘘他的斑斑劣迹，但那时在我看来，这人小混混没有区别，我实在不知自己为什么还要跟着他，或许是公路旅行本身的魅力？或许是他同尼比的奇怪关系让'统一场论'还有一线机会？总之，我跟着康查尔来到了费城西边的脏弗兰克酒吧暂住，那地方非常脏乱，地板简直能黏住鞋底。总之在康查尔发誓永远也不会返回缅因州后，酒吧老板莫宁才同意帮忙处理赃车。",
        attitude: "",
        visual: "https://picsum.photos/seed/road_trip/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "你想要问的那个人，名叫伦德格兰。1968年冬天，犯案后的伦德格兰同几个愚蠢的追随者一起，藏进肯达尔湖附近的欢乐时光旅馆内。大约一周后，教主将教徒分为三波，要他们在一天内分别对周边郡县警署发动袭击，而他则趁着警力忙于彼此支援的时机，驾驶那辆蓝色福特费尔兰跨过州线，抵达了匹兹堡。\n\n是的，我曾在莫宁的报废车场见到了这辆汽车的残骸，在我同康查尔到那的时候，它还保持着能被辨认的形状。至于伦德格兰出逃柯特兰后的遭遇我从何而知的，那又是另一回事了。",
        attitude: "",
        visual: "https://picsum.photos/seed/car_graveyard/800/450"
      }
    },
    connectedTo: ["confession_1", "capone"]
  },
  {
    id: "confession_4",
    keyword: "confession",
    title: "供述 No.4",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 },
    revealedKeywords: ['nevada', 'dr_reggie', 'training_day', '1402_old_dominion_rd'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我想你真正想问的是，为什么是我？雷吉博士为什么选择了我？\n\n首先我必须重申，即便在 1967 年 KLUB 获得了部分一线干预权后，它所属的行为分析科（BAU）也从没有过向前线派遣潜伏人员的正式权限。\n\n明白吗？我就是那个不合规的例外。特殊到整个训练过程都是由雷吉博士亲自监督的。",
        attitude: "",
        visual: "https://picsum.photos/seed/training_fac/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在得到这份工作之前，我只是个平平无奇的州警，档案在局里挂着号。因为执勤时“过度暴力”，我被停职并扔到了专门处理公职人员的精神康复部门。当时负责我的医生是雷吉博士的学生。他并没想推荐我，他只是把一批“脑子有问题”的警察档案交给了博士，而博士在那堆纸里挑中了我。\n\n直到训练结束的那个下午，在马场旁边的咖啡馆里，博士才告诉我原因。他说得很直白：其他人的行为偏差是创伤造成的，而我，是一个真正的疯子。\n\n听着，我清楚地记得他说这话时带着某种赞许，仿佛在宣布某种荣光。但在我听来，那更像是某种刺痛。那是这辈子第一次有人点破我的核心问题：我之所以当警察，就是为了避免让自己成为一个纯粹的混蛋。穿上制服，至少能让我在作恶的天性之外，还能对社会产生点正面作用。",
        attitude: "",
        visual: "https://picsum.photos/seed/med_file/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "所以我不知道该恨他还是谢他。他给了我这份新工作，让我能在当个彻头彻尾的混蛋之余，还能给社会带来更大的“帮助”。瞧，这话说出来他妈的有够讽刺。\n\n其实我知道你想问的是什么。\n\n父亲。\n\n对吗？关于这个，我无话可说。\n\n算了，可以给你说句实话。在受训期间，我有次甚至觉得，那个男人（父亲）在各方面都是雷吉博士的反面——准确地说，是好的那一面。\n\n太多年了，你想要的事情没有答案。这些年我反复做一个梦，梦到根本就没有什么“青豆牡蛎汤计划”，它真的只是内华达州本地的一道菜。除了豆子和牡蛎，你还需要在锅里放进胡萝卜、洋葱、蘑菇、月桂叶，最后倒进干雪利酒。\n\n那时候我从不喝雪利酒，我不知道自己为什么会做这样一个梦。",
        attitude: "",
        visual: "https://picsum.photos/seed/dream_soup/800/450"
      }
    },
    connectedTo: ["confession_1", "capone", "dr_reggie"]
  },
  {
    id: "confession_3",
    keyword: "confession",
    title: "供述 No.3",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7 },
    revealedKeywords: ['roger_beebe', 'year_1985'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "孩子，我先给你正确答案吧。\n\n失踪案的真凶名叫罗格·毕比，就是警方最早怀疑的那个嫌疑人。实话告诉你，要不是 KLUB 存心指错了路，警方五年前就该把他带走了。可谁能想到呢？直到1985年他因为别的案子被捕，竟然主动承认香槟镇那档子事也是他干的。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession3/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "这件事让父亲失望了好一阵子。\n\n是的，父亲总是乐于在这些外人身上寻找那种熟悉的气味。在他看来，恶行是一种亲密的表达。所以，当 KLUB 表现出要把这案子归为辛迪加行动的迹象时，他反而认为这是一种荣耀。既然敌人想犯错，为什么要拦着他们？",
        attitude: "",
        visual: "https://picsum.photos/seed/father_disappointed/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "他们后来也不是没见过毕比，当然是在他入狱之后。不过，既然这人这辈子都出不来了，再纠结这些又有什么意义？",
        attitude: "",
        visual: "https://picsum.photos/seed/prison_visit/800/450"
      }
    },
    connectedTo: ["confession_2", "capone"]
  },
  {
    id: "confession_5",
    keyword: "confession",
    title: "供述 No.5",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.8 },
    revealedKeywords: ['little_derek_wayne'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "是啊，是啊。\n\n我是在电视上看到关于这个案子的消息的。那时候我们还在费城，在脏弗兰克酒吧的地下室里停留了大约两周。顺便一说，那可能是整个费城最冷最潮的房子了，我恨不得把毛毯粘在自己身上。\n\n康查尔说过要抓紧赶路，此时却长时间停在费城。他不准我问问题，只让莫宁弄来一台坏了半个音箱的电视机塞在床头，又从楼上迁下一台发报机。于是那段日子，我每天的任务就是躺在床上盯着雪花点看电视，就着那碗黏糊糊的、受潮的儿童麦片；而康查尔就坐在发报机前，对着那些滴滴答答的信号鼓捣个不停。",
        attitude: "",
        visual: "https://picsum.photos/seed/tv_static/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "要么是我在牢里错过了消息，要么就是这个案子的新闻封锁做得太绝了。直到大案告破、罪犯受审，才有犯罪学专家在电视节目里把它当成案例拿出来讲——讽刺的是，由于定性原因，它被包装成了一桩关于“保险诈骗”的案子。康查尔一边发报一边侧头看新闻，当专家表示赃款已全部追回并会用于维恩一家的丧葬费时，他突然大笑起来，笑得直咳嗽。\n\n我问他笑什么。他说，或许维恩一家在报纸上看起来是典型的美国中西部中产家庭，但那位小德里克·维恩先生，绝不是什么一般意义上的“一家之主”。当时我还想多掏点话，问他到底知道什么，问我们留在这儿是不是在等这个案子的结果。康查尔闭了嘴，不愿再说一个字，只是盯着屏幕喃喃自语：“每个人都得到了他们想要的，这就够了。”三天后，我们搭乘一辆散发着尿骚味的灰狗巴士离开了费城。直到现在我也不确定，那时候追兵是已经完成了搜捕，还是压根就没找对方向。",
        attitude: "",
        visual: "https://picsum.photos/seed/laughing_man/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "总之，直到两年后，我们抵达大盆地沙漠边缘，而我也已经彻底融入那个“家庭”的时候，康查尔才在某个守夜的凌晨再次提到了这件事。\n\n他说，小德里克·维恩继承了他父亲对派尤特族女性的那种病态着迷。即便这种偏执、小众的嗜好让他没法像那些高产的连环杀手一样维持“工作效率”，但这种独特性本身就足以引发报复——尤其是在风声走漏的情况下。那群人甚至在维恩犯下最后一桩案子仅三个月后就精准地锁定了地址。他们没杀他，而是当着他的面，对他家里人做了他曾经对那些女人做过的所有事。\n\n康查尔最后向我重申了父亲的教条：父亲憎恶过度伤害。他说，过度伤害导致掩护色失效只是其次；最重要的是，只有被高度约束的攻击性，才会孕育出真正的仪式。而那个过程，才是孕育艺术的唯一土壤。",
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
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "他们说我提交过几次单项汇报？两次，还是三次？\n\n实际情况是，单从1972年春天到年底，我就投放了超过10个所谓的‘灰水信标’——那是雷吉博士在训练时想出的方案。当时我们并不知道未来会面对什么，是去东部城市跟黑手党打交道，还是在爱荷华州的田野里同那些酿私酒的爱尔兰混蛋抢市场。因此，‘灰水信标’在最初只是备选方案之一。\n\n后来我登上了那辆房车，几乎每时每刻都与‘家人’待在一起。因为房车必须定期停靠加油、倾倒废物或补给，那些短暂的停留成了唯一的窗口期，‘灰水信标’也就此成了我唯一的汇报方式。",
        attitude: "",
        visual: "https://picsum.photos/seed/truck_stop/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "你抽过‘铁马’吗？亮橙色的烟盒，印着漂亮的火车头标。50年代时，它是全美卡车司机、工厂工人、建筑工和长途通勤者的首选。它比你抽过的任何烟草都更重，口感浓烈、直率、不妥协，毕竟它的烟草里混合了高比例的肯塔基白肋烟。\n\n好吧，我猜你大概没听说过这个牌子。哪怕是在70年代，也只有那些走不动道的老头子还会抽它了。游历全美的嬉皮士们更迷恋万宝路，而那些年长的司机从车上下来后，再也赶不了路了。这是我们约定选择‘铁马’作为信标载具的首要原因；其次，它独特的开盒设计为书写简讯留出了足够的空间。",
        attitude: "",
        visual: "https://picsum.photos/seed/cigarette_smoke/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "雷吉博士的构想似乎非常完满：我扔掉信标，他的‘清理小组’伪装成清洁工或流浪汉，在预定路线的加油站进行定点回收。可问题在于，他手里根本没有由专业人士组成的清理小组。据我所知，肯为他干这些苦活的，其实都是KLUB战略研究室里的实习生。你觉得那帮孩子能找到什么？反正他们一定漏掉了我在罗阿诺克市扔掉的第一个信标，否则威廉斯堡公园大道的案子早就该破了。\n\n总之，离开房车后，我就再没碰过那个牌子的烟。当时我极度憎恶它的味道，可现在……却莫名地有些怀念。所以别再提问了，去给我搞一包‘铁马’来。",
        attitude: "",
        visual: "assets/iron_horse_beacon.jpg"
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
    revealedKeywords: ['roanoke', 'twisted_relationship'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我知道，你还是忘不了尼比，虽然他已经死了，哈哈。\n\n回想起来，其实这事也没什么不能理解的，群体的无序行为是如何收束在可控范围内的，其实靠的，便是这种靠本能构建的纽带，这完全符合雷吉博士的统一场论。但在那年那月，我对这些高深莫测的狗屁理论一无所知，我更无法想象，这些纽带在现实中竟是以血和精液作为粘合剂的。\n\n在缅因州服刑时，有个叫莫布利的警监，他是我见过最纯粹的杂碎。如果那混蛋当年没穿上那身狱警制服，我敢打赌他会成为那种被印在FBI通缉令头版的连环杀手。莫布利的暴力是单向的、为了折磨而折磨的排泄。但康查尔和尼比不同，尽管他们之间同样充斥着殴打、流血和那些让人反胃的凌虐，但那里面有一种极其扭曲的'张力'。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison_guard/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "你能理解吗？从试图彻底地占有、容纳对方，到用刀锋和指甲去撕裂、掐死对方，这种极端的情绪在他们之间形成了一个高压张力。在那个还没见过什么世面的我看来，那甚至比我听过的任何一种英雄史诗都要深刻。那不是犯罪，那是他们之间的一种'爱'，一种只有在深渊里才能生长的、带着腥味的爱。\n\n但我什么都不能问。因为尼比就是最初的线索，我不能在他嗝屁之后立刻展示出好奇心，那会让我彻底暴露。这是我当时的想法，但等我们来到罗阿诺克市的时候，我犯下了第一个错误，或者也可以说，我是在最正确的时候提出了这个问题。\n\n那是1972年的深秋，罗阿诺克弥漫着一股廉价机油和快要下雨的土腥味。在那个窄得转身都困难的廉价旅馆里，康查尔点了一支烟，却没抽，而是看着它自顾自地燃烧。他突然靠过来，离我极近，用几乎是耳语的声音对我说：'罗伯特，你一直在看尼比，对吧？你在想，是什么让他最后走得那么……平静。'\n\n他伸出一只手，轻轻扣住我的后脑勺，指甲陷进我的发根里，那是一种让人头皮发麻的控制力。'那是因为他死的时候，就知道他终于把自己交还给父亲了。'",
        attitude: "",
        visual: "https://picsum.photos/seed/motel_room/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我不知道那是怎么做到的。但在那瞬间，康查尔看我的眼神，透着一种让人无法拒绝的诱惑。在那之前，我从没想过我会对男人感兴趣，明白吗？他看着我，告诉我说，'罗伯特，我能从你眼里看到那个洞，那个属于疯子的、巨大的空洞。你想不想像尼比一样，把它填满？'如你所料，我没有推开他，相反，我像个溺水的人一样，问他我要怎么做，才能抵达那个世界。\n\n当一切结束之后，康查尔做的第一个动作是放开了我的头发，然后转过身，从那个散发着霉味的抽屉里翻出一把折叠刀。他没有递给我，而是当着我的面，用舌尖轻轻舔了一下冰冷的刀刃，眼神里闪过一种像小孩子看到心爱玩具时的光。\n\n我们穿过被雨水浸透的街道，半小时后，我们来到一家叫做'洁净人生'的自助洗衣店对面，当时店里的日光灯坏了一根，隔着被雨幕打湿的橱窗，那里的白光一闪一闪，像是一颗快要停止跳动的心脏。康查尔告诉我，里面那个有点臃肿的墨西哥女人名叫玛莎·迪亚兹。'看着，罗伯特。'康查尔声音轻得像是一片落叶，'别眨眼。'\n\n他推开车门，消失在雨幕里。我脑子里疯狂尖叫，我想冲出去，拦住他。但我动不了，我像被钉在了座位上，一种生理性的、卑微的渴求让我死死盯着那扇橱窗。康查尔推门进去了。玛莎抬起头，露出了一个那种深夜职员特有的、疲惫的礼貌笑容。她正准备开口说点什么，康查尔已经到了她身后。他伸出左手，动作几乎是温柔地绕过她的脖子，扣住了她的下巴，动作轻盈得像是在跳舞。\n\n玛莎还没来得及露出惊恐的表情，康查尔手中的折叠刀已经横着切过了她的喉咙。康查尔微微侧过头，确保玛莎能够看着他的眼睛。几分钟后，他松开手，玛莎顺着干衣机滑了下去。康查尔没有立刻离开，他站在那一摊缓缓扩散的红色跟前，从兜里掏出一条亮黄色的丝绸发带，动作优雅地把它系在玛莎垂死抽搐的手腕上，打上一个蝴蝶结。我看着玛莎的眼睛，这个原本每天要为了生活费发愁、为了肮脏床单劳作的平凡女人，现在已经变成一个无法被理解的'谜题'。\n\n康查尔回到车上时，身上带着一股好闻的雨水味和淡淡的血腥气。他发动了车子，把那把沾血的刀随手丢进我的怀里。他说，'收好它，这是个礼物。'",
        attitude: "",
        visual: "https://picsum.photos/seed/rain_window/800/450"
      }
    },
    connectedTo: ["confession_6", "capone"]
  },
  {
    id: "confession_8",
    keyword: "confession",
    title: "供述 No.8",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.85 },
    revealedKeywords: ['year_1973', 'julie', 'cincinnati', 'the_mother', 'vanessa', 'silas'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "1973 年的正月，辛辛那提的雪还没化透，空气冷得能把人的肺扎穿。在那儿，康查尔彻底撕掉了他伪装成'小混混'的最后一点皮。他在一个废弃的加油站发现了一个迷路的小女孩，大概只有五六岁。他没有动用暴力，而是微笑着把她带到了一间冷库里，把门锁死，只留下一个能看见里面的小窗。\n\n\"来吧罗伯特，我们做个游戏。\"康查尔对我说，\"你可以什么都不做，看着她在接下来的三小时里一点点被冻成冰块，或者，你可以用这把刀给她一个'解脱'。你自己选。\"\n\n我握刀站在窗前，听着可怜的朱莉在里面绝望地拍打门板。康查尔就坐在旁边的板凳上抽烟，悠闲得像是在等一班火车。我犹豫了很久，数次想用那把刀结果了康查尔，我甚至确定他早就准备好了我会这么做。但我其实明白，这看似是给我的测试，其实根本就是他自己的游戏，不管我接下来会做什么，他都会从这场游戏中获得快乐。\n\n最后，康查尔在女孩断气前一刻把她拖了出来，把她裹在一个旧毛毯里扔到警局门口。做完这一切，他看着我笑了半天。",
        attitude: "",
        visual: "https://picsum.photos/seed/cincinnati_winter/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "接下来，我们一路南下。好几天，他都在那台生锈的电波接收器前忙个不停。原本他确信，\"大部队\"已经跨过州界去了东海岸。可当我抵达路易斯维尔的那个河边码头时，我却忽然见到了那辆房车。在一块巨大的、肮脏的黑色防水布下面，在一片杂乱的废弃集装箱中间，我一眼就看到了它——那辆淡蓝色的房车。它像是一个不该出现在这里的深海生物，静静地停在泥泞的积水里，透着一种极其不祥的、梦境般的安静。\n\n推开车门的人是一个年纪较大的汉子，没有邪教头目的狂热外表，只穿着一件过时的格纹大衣，头发梳理得一丝不苟。老人越过康查尔，直勾勾地走向我。那一刻，我感觉自己像是一只被探照灯锁定的猎物。他伸出一只手，轻轻地、慈祥地抚摸着我的脸颊，然后露出了一抹足以让任何警察心脏停跳的微笑。\n\n\"你就是罗伯特，康查尔在电报里提到过你。为了迎接你，我们把计划延后了。路易斯维尔很冷，对吗？来，家里正温着汤。\"他说。",
        attitude: "",
        visual: "https://picsum.photos/seed/louisville_dock/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我走进那辆淡蓝色的车厢，第一次见到了其他人。母亲，次子塞勒斯和养女瓦妮莎。\n\n在那晚的昏暗灯光下，我看着塞勒斯肆无忌惮地把手伸进\"母亲\"的衣襟，而\"父亲\"则像一个完美的指挥家，微笑着注视着这一切，甚至还顺手理了理瓦妮莎那头略显凌乱的长发。我瞬间明白了，房车里没有任何伦理可谈，只有一种透过交配构建的秩序。无论如何，也是到稍后我才意识到，这种由乱伦堆砌的纽带，比其他关系要牢固一千倍。",
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
    revealedKeywords: ['year_1982', 'el_paso', 'juvell_chambers', 'year_1973', 'distant_relatives'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "「薄荷计划」？真可笑，匡提科那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样。他那套理论在华盛顿撞墙，是可以预料的，跟他迟早把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由。但你要觉得你能从我这堆腐烂的记忆里捞出什么证据来帮雷吉翻盘，那你比索恩还要天真。",
        attitude: "",
        visual: "https://picsum.photos/seed/mint_plan/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在费城、辛辛那提，还有路易斯维尔，我曾像个守时的闹钟一样向外投放信标。直到1982年的深秋，在德克萨斯州的埃尔帕索，我走下那辆沾满泥土和焦油的蓝色房车，避开赛勒斯那双秃鹫似的眼睛，在加油站那口散发着陈腐机油味和咸湿雨水的排水沟旁从袖口滑出烟盒。站在那个只剩半个霓虹灯招牌的加油站里，我依然在重复这个动作。其实我心里就清楚：这些东西永远不会再被回收了。\n\n一个小时，或者一天后，会有一个拖着满身酸腐臭味的流浪汉经过这里。他会蹲下身，用那双塞满污垢的手捡起烟盒。他会拆开它。在烟盒内侧，我用缩写码密密麻麻地记录着「家族」的移动轨迹，以及那些被称为「远亲」的人群是如何在深夜钻进房车同父亲密谋。\n\n你可以说这些明明是足以让整个美国治安秩序震颤、让联邦调查局重新改写通缉名单的情报，但对这个流浪汉来说，他们甚至不如烟盒里剩的半根烟有意义。他会啐一口痰，随手把这卷珍贵的纸片塞进破烂的靴子里垫脚，或是用来引火。\n\n到了后来，我甚至分不清自己这种执着到底是为了什么。也许，我在期望着自己被「父亲」发现。我甚至幻想着他会捡起这些信标，微笑着对我说：\"罗伯特，你的功课做得真仔细。\" 又或者，我只是在为流浪汉们编织一个可供遐想的故事。让他们在寒冷的夜晚盯着火堆发呆时，能从那堆冒着微弱热气的、写满密码的废纸里，感受到一种不真实的戏剧感。",
        attitude: "",
        visual: "https://picsum.photos/seed/el_paso_1982/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "去他妈的「薄荷计划」吧，我来跟你讲讲什么才叫真正的计划。这个计划叫做「灵魂厨房」，众所周知，当时整个俄亥俄都被黑人运动笼罩着，到1973年，辛辛那提的种族张力更是紧绷到了极限，于是父亲在几个月前就开始布局，让几名「远亲」频繁出没于市中心运钞车中转站附近。他们穿着那个时代激进组织的标志性黑夹克，手里拿着模仿「黑豹党」的政治传单，甚至故意在监控死角留下几个潦草的激进口号。\n\n然后，在一周后，四个人，黑夹克，散弹枪，满口的激进派俚语。他们冲进运钞车中转站，在尖叫声中故意掉落了一枚刻着图纹的宗教指环——那玩意儿是塞勒斯找来的诱饵。当警察正忙着突袭黑人社区，在贫民窟里翻个底朝天时，房车已经离开辛辛那提，回到了路易斯维尔的地界上。以路易斯维尔为轴，「灵魂厨房」又在莱克辛顿和纳什维尔复制了几次。纳什维尔那次，父亲甚至专门制作传单并成功引发大规模种族冲突，然后趁乱狠狠赚了一笔——不，我说的当然不是钱，是警枪。一个黑人警察因此背了锅，可怜的朱维尔·钱伯斯，但你猜怎么着，很快朱维尔就被父亲招募，成为「远亲」的一份子。\n\n与此同时呢，FBI的臭狗屎们又在做什么？致力于把自己人关进精神病院，这就是他们在做的。",
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
    revealedKeywords: ['year_1973', 'boris_smirnov'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "伯克斯维尔……你居然在地图上找到了这个地方？\n\n我记得就是在伯克斯维尔那个满是泥泞的伐木场里，我第一次真正理解了家族的组织关系。",
        attitude: "",
        visual: "https://picsum.photos/seed/burkesville_lumber/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "那辆淡蓝色的房车不仅仅是个交通工具，它也是一个在公路上移动的培养皿。你很难想象「远亲」的渗透情况，他们像真菌一样寄生在全美的物流网络、深夜调度站和像伯克斯维尔这样的镇子里。父亲的招募方法原始且高效，他先用暴力把人的自尊踩得粉碎，再让「母亲」出面——用她那种带着止咳糖浆味和绝望气息的怀抱，把这些碎片重新粘起来。这种\"先拆解再重塑\"的流程，制造出了一种基于生理依赖的共犯结构，比你们那纸脆弱的雇佣合同要稳固得多。\n\n刚钻进那辆车的时候，我以为自己能保持清醒，但很快我就发现那是一口正在发酵的深井。我不愿承认，但「母亲」身上就是有一种极度危险的引力，那种摄人心魄的虚弱感是在诱惑你一起放弃抵抗，是她一寸寸剥掉了我身上的死皮，让我觉得在那堆烂肉里沉沦才是唯一的真实。而另外两个男人，则构成了那座监狱的墙壁。\n\n康查尔很少不动手，但总是用一种看某种低等生物的眼神看着我，仿佛在嘲笑我那点可怜的道德坚持是多么滑稽。他的压迫感来自智力层面，他让你觉得自己是个蠢货，让你觉得坚持原则是一种智力缺陷。赛勒斯则是那把悬在头顶的铡刀。我也许能避开康查尔的嘲讽，但避不开赛勒斯。他就像一头随时会失控的野兽，只要我表现出一丁点\"不合群\"，他就会毫不犹豫地把我变成一具需要处理的尸体。",
        attitude: "",
        visual: "https://picsum.photos/seed/blue_rv_family/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "无论如何，最开始的大半年里，我几乎什么都不用做，仅在事情发生的时候替他们做些掩护性工作，这种日子一直持续到 1973年底。那是一个深夜，房车停在莱克辛顿一处调度站修整，而我则像个还在坚持打卡的幽灵一样，把又一枚灰水信标踢进了排水沟，那时候我还没有完全放弃，但也不那么期待有人真的回收它。我做完这一切，回到了车上，父亲并不知道我刚刚干了什么。他正同一个名叫鲍里斯·斯米尔诺夫的远亲坐在折叠桌旁，心情看起来好极了。\n\n\"罗伯特，别再想那些粗糙的抢劫了，你是时候拥有自己的作品了。\"他的语气就像是在给刚成年的儿子递上一把车钥匙，\"我要你为伯克斯维尔的远亲们设计一个好玩的计划，把那些警察耍得团团转。来吧，让我们看看你能干点什么。\"",
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
        event: "让我理一理阿尔特曼的逻辑，好吗？\n\n首先，他宣称鲍里斯是个喝多了的乡巴佬，那些关于\"家族\"和\"远亲\"的供述全是精神错乱的胡话。他信誓旦旦地告诉华盛顿，根本不存在什么严密的地下网络，一切都是雷吉博士臆想出来的伪科学。但马上——哈！看这儿——他却在发抖。他担心我，担心这只早已失联的\"地鼠\"，正在利用他在匡提科学到的战术，指导这群\"不存在的乡巴佬\"去羞辱警方。\n\n一方面，我是个已经殉职的死人，而\"家族\"是一群乌合之众；另一方面，我这个死人却正在指挥这群乌合之众，不仅渗透了警方的防线，还让他不得不切断 KLUB 的所有回收线路来保住自己的乌纱帽。\n\n我得谢谢你给我看这个。真的，这让我心里的最后一点愧疚感也彻底烟消云散了。",
        attitude: "",
        visual: "https://picsum.photos/seed/alterman_memo/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "因为就在阿尔特曼忙着写这份报告的时候，我也在做更有价值的事情。既然他觉得我是在利用 FBI 的战术指导犯罪，那我怎么能让他失望呢？\n\n我设计的第二个项目，叫做「静态雪花计划」。不，没人去抢银行，也没有制造爆炸。我们找上了辛西娅·米勒，她是纳什维尔附近教会唱诗班的领唱，有着一头金发 and 所有人都会喜欢的甜美笑容，典型的\"美国甜心\"。这种人的失踪会让方圆两百英里的警察和媒体像疯狗一样扑上来。\"母亲\"保持着每周日前往教堂的习惯，是她为我们选中了辛西娅。\n\n不，我们完全不需要绑架她。在母亲的介绍下，「远亲」里的几个年轻人去接近她，他们告诉她，此时有一部地下电影正在筹拍，他们认为她就是那个当之无愧的主角。然后他们把她带到伯克斯维尔一个汽车旅馆里——在那我已经架好了摄像机。没有复杂的道具，只有她，一把椅子，和一台甚至收不到信号的老式电视机。\n\n我让她坐在那儿，对着那个只有雪花杂讯的屏幕。我指导她的表情，教她如何呈现出那种\"接收到神谕\"般的恍惚。我告诉她，这不是犯罪，这是一场前卫的行为艺术，我们要通过这些雪花，向世界传递一种只有神选者才能听懂的频率。",
        attitude: "",
        visual: "https://picsum.photos/seed/static_snow_filming/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "在LSD的作用下，当她对着镜头，用那种梦呓般的声音念出我写的台词时，就在那一刻，我高潮了。那不是以前抓捕犯人时的紧张感。那是一种……创造的快感。我看着取景框里的她，意识到我正在剥夺她的社会属性。想想吧，当警察破门而入，发现房间里只有这台电视机在一片死寂中不知疲倦地播放着录像，媒体会发疯，他们会把这称为\"电视邪教\"，家长们会恐慌。而FBI呢，他们会把本来用于追踪绑架案的黄金48小时，浪费在研究我的对白和那个根本不存在的\"信号频率\"上。\n\n事成之后，我们带走了辛西娅，她被运往西部的分部，成为新的\"远亲\"，或者被塞勒斯处理掉，这取决于她是否听话。在她最后出现的旅馆房间里，我们只留下一样东西：那台还在播放雪花杂讯的电视机，循环播放那盘录像带。想象这样一个画面吧，当警察冲进房间，他们看不到搏斗痕迹，看不到血迹。他们只会看到甜美的辛西娅在电视里喝着一碗恶心的汤，宣称自己去了\"信号的另一端\"。\n\n我没有拿走一分钱，但我偷走了所有人的安全感。就在那一刻我真正理解了父亲。这与生存无关，也不是为了钱。这就是纯粹变态但也极致的乐趣——看着现实世界的秩序因为你制造的一个微小\"故障\"而彻底卡死，这是件多么有趣的事情！",
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
        event: "好吧，你赢了。\n\n你比阿尔特曼那帮蠢货看得更远，我懒得再把你当敌人防着了。听着，我没疯，我知道我在做什么，我也知道你想问什么——“为什么不抓捕他们？”是的，那是1976年。从法律层面上讲，我有无数次机会。那时候，除了康查尔偶尔手里不干不净之外，“父亲”也好，那个女人也好，他们的手在某种意义上甚至是“干净”的。他们没有亲自抢过银行，没有亲自扣动过扳机。\n\n我当然可以联络堪萨斯城的风化组，告诉他们有一辆房车里在搞乱伦、毒品和未成年淫乱。警察会冲进来，给他们戴上手铐。然后呢？“父亲”会请个好律师，把这变成一场关于宗教自由和生活方式的辩论，顶多交点罚款，或者在看守所待个把月。而真正的威胁——那些遍布全美物流网的、像真菌一样的远亲会瞬间蛰伏起来。我还没摸清他们的规模，还没拿到那份名单。抓了那个老头子，就像是砍掉九头蛇的一个头，毫无意义。\n\n所以，我必须喂饱他们。我必须让这辆车继续开下去，直到他们犯下连“父亲”都无法洗脱的重罪。",
        attitude: "",
        visual: "https://picsum.photos/seed/kansas_city_1976/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "我给他们设计了一个新的剧本。这一次的目标不是钱，是恐慌。我想出的点子是流动献血车这一次，我想给这座城市一点纯粹的“困惑”。我想出的点子是流动献血车（Bloodmobile）。计划极度荒谬，甚至没有任何经济利益。我让几名身为卡车司机的“远亲”在午休时间劫持了一辆停在广场上的大型采血车。我们没有伤害里面的护士和医生，只是把他们极其礼貌地请了下去，并未给他们买了咖啡。然后，我们开始了表演。\n\n我们从一家杰西·潘尼的百货商店里偷来二十个塑料服装模特。我们将这些永远带着僵硬微笑的塑料假人搬上采血车，把它们按在献血椅上。然后，我们将那些粗大的采血针头狠狠地扎进它们坚硬的塑料手臂里。接下来的部分是我的杰作：我们将采血机的“输入端”反接到了一个巨大的加压罐上，里面装满了稀释的红色油漆。当警察和媒体赶到时，他们看到的不是屠杀，而是一幅超现实的画作：二十个衣着光鲜的塑料假人，正安静地坐在献血椅上，红色的油漆顺着管子被强行泵入它们空心的身体，直到从它们的眼眶、嘴巴和关节缝隙里溢出来，滴滴答答地流满了整个车厢的地板。\n\n听完计划，赛勒斯很兴奋，他坚持要参与。那个疯子厌倦了只当搬运工。他看着满车的假人，眼睛里闪着光。他说这些假人坐得“太端正了”。于是他走过去，亲手把每一个假人的头都扭到了背后，把它们的四肢折断成人无法做到的角度。当油漆开始流动时，赛勒斯坐在那堆扭曲的塑料尸体中间，大笑着模仿那些假人的表情。",
        attitude: "",
        visual: "https://picsum.photos/seed/bloodmobile/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "不过……你是怎么知道瓦妮莎的？\n\n在这之前，我以为她只是个没脑子的玩物。但在堪萨斯城行动的前夜，也就是我在图纸上画 those 输油管路的时候，瓦妮莎找到了我。她没穿那身平时为了取悦“父亲”而穿的蕾丝睡衣，而是披着一件不合身的男式夹克——那是我的夹克。她在那逼仄的过道里堵住我。\n\n她的手很冷，指甲油依然是剥落的，但眼神里没有那种浑浊的药瘾劲儿。“别干这个，罗伯特。”她对我说，声音抖得厉害，“你可以骗他们，甚至可以骗你自己你在执行任务。但我看得到你在笑。当你画那些图纸的时候……你比赛勒斯更像个怪物。”\n\n而我当时在想的是什么呢？我想的是，少他妈多管闲事，这个计划根本不会伤害任何人——更何况，总有一天我会把你们全都抓进监狱的。",
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
        event: "当然知道。\n\n那时候，电视新闻里正在铺天盖地地报道杰西·潘尼被捕的消息。有天早上，我坐在折叠桌旁，看着屏幕上那个被反铐着按进警车的胖子，心里充满了挫败感。我精心设计的荒诞剧，居然成了堪萨斯警局用来邀功的垫脚石。\n\n但父亲的反应完全不同。他当时正坐在我对面，手里依然拿着那把用了很多年的水果刀，在这个充满了机油味的早晨，他正在极其耐心地削着一个苹果。苹果皮连成一条不断的红线，从他指尖垂下来。\n\n“别丧气，罗伯特。”他突然开口，眼睛甚至没有离开那个苹果，“你看起来像个考砸了的小学生。”我说，他们利用了我们要抓那个胖子。父亲停下了刀，“你以为那是谁？罗伯特。那个自称杰西·潘尼的人，真名叫约翰·莫里西。他是这一带最大的‘肉贩子’。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "“那个爱尔兰杂种在堪萨斯盘踞了十年。”父亲咬了一口苹果，咀嚼的声音在安静的车厢里格外清晰，“他是个粗鲁的屠夫，毫无美感。他把人拆碎了卖，就像卖猪肉一样。我曾经试图……感化他，让他明白规矩，但他太傲慢了。”\n\n“而你，我的孩子。你只是为了好玩，画了一幅画，摆了几个塑料人偶……你就做到了联邦政府十年都做不到的事。你不需要搜查令，不需要证据，你只是制造了一点点混乱，就让那一整座坚固的堡垒从内部塌陷了。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "他把那把水果刀插在桌面上，刀尖指着报纸上莫里西那张惊恐的脸。“这就是混乱的美妙之处，罗伯特。你不需要瞄准。当你制造的风暴足够大时，雷电自然会击中那些该死的树。”",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_13_core/800/450"
      }
    },
    connectedTo: ["confession_12", "capone"]
  },
  {
    id: "confession_14",
    keyword: "confession",
    title: "供述 No.14",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.85 },
    revealedKeywords: ['davenport', 'new_plan'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你是怎么知道这件事的？\n\n是的，那才是圣路易斯之夜真正的庆功宴。虽然我在外面搞了一场轰轰烈烈的达达主义荒诞剧，用红油漆和假人嘲弄了整个警察局，但在那辆淡蓝色的房车里，发生的是另一种更古老、更令人作呕的仪式。在我们将油漆泵接入采血车之前，\"母亲\"让赛勒斯清空了车上的冷藏柜，把那几十袋刚刚采集的血浆放了进去。\n\n当任务结束之后，我们驱车前往圣路易斯，落地休整的当晚，在那逼仄的后车厢里，在那张铺着褪色碎花床单的折叠床上……我不想描述细节。我只能说，那不是人类的性爱。父亲像个干枯的帝王一样躺在那里，而\"母亲\"……她剪开了那些血袋。那股浓烈的、带着生鲜铁锈味的腥气瞬间炸开，盖过了车厢里常年弥漫的止咳糖浆味和老人味。他们在血泊中纠缠，发出那种黏腻的、令人毛骨悚然的水声——那是肉体与肉体在半凝固的液体中摩擦时发出的声音，就像是两个软体动物在泥沼里翻滚。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "\"母亲\"变得力大无穷，那个平日里总是带着绝望气息的虚弱女人不见了，取而代之的是一头尝到了腥味的母兽。她用沾满鲜血的手疯狂涂抹父亲那张满是皱纹的脸，把血浆强行灌进他的皱纹、他的嘴唇、他松弛的眼袋里。她在尖叫，在喘息，仿佛那些从陌生人身……那一刻我站在门缝外，看着这一幕，我第一次没有感到恐惧，而是感到了一种……\n\n怎么说呢。我一直觉得母亲和父亲之间有条特殊的纽带，那是某种默契，他们彼此相互信任，几乎很少说话，除这次之外，我甚至很少见到他们有过肢体接触，但我隐隐觉得，这两人无法没有彼此。就像是某种连体生物被强行剥离后的两半。父亲是那个冷酷的、只有骨骼和逻辑的'大脑'，而母亲则是包裹着他的、潮湿且充满病态欲望的'血肉'。平日里，他们靠眼神交换指令，仿佛共享着同一套神经系统。父亲负责用暴力把猎物敲骨吸髓，母亲负责用温柔把残渣消化殆尽。在那晚的血泊中，我终于看清了这种共生的本质，他们似乎想通过鲜血作为粘合剂而重新融合，变回那个完整的、不可名状的怪物。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "等等。这不对。\n\n那晚房车停在荒郊野外。虽然林子里潜伏着其他远亲，但窗帘被拉得密不透风。康查尔当时不在，他带着新计划去了达文波特。瓦妮莎把自己反锁在厕所里，而赛勒斯……那疯子整张脸都贴在后窗上，仿佛想用牙齿咬碎玻璃加入他们，但他没能得逞，只是留下了一整面窗的唾液和体液。所以我大概是唯一目睹过这一切的人。\n\n你又是怎么知道的？",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_core/800/450"
      }
    },
    connectedTo: ["confession_13", "capone"]
  },
  {
    id: "confession_15",
    keyword: "confession",
    title: "供述 No.15",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.35, y: window.innerHeight * 0.2 },
    revealedKeywords: ['year_1976', 'peter_henderson'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "达文波特。\n\n那是康查尔的杰作。那一周，“父亲”因为过量吸食那种混合了血液的药剂而陷入昏睡，所以我留下来看守房车。康查尔带着几个想在“家族”里晋升的“远亲”去了爱荷华州的达文波特。我不在现场。感谢上帝，我不在现场。\n\n关于那栋房子里发生的事，后来在“远亲”的圈子里变成了传说。那些跟着康查尔回来的年轻人，以前都是杀人不眨眼的暴徒，但那天晚上回来时，他们却像受惊的鹌鹑一样发抖，甚至不敢直视康查尔的眼睛。他随机选中了郊区的一户中产家庭——亨德森一家。男主人皮特·亨德森是个教数学的高中老师，一家四口过着那种令人厌烦的规律生活。周五的晚上，康查尔带着人闯进去，没有大喊大叫，而是像客人一样坐在餐桌旁。因为他知道，他拥有一整个周末的时间。\n\n他给这家人制定了规则：生活必须继续。据那些“远亲”描述，康查尔强迫这家人在接下来的两天里，必须严格按照时间表吃饭、睡觉、看电视。唯一的区别是，如果谁露出了一丁点恐惧，他就会用刀切掉另一个人的一节手指。“太有意思了，”康查尔微笑着告诉我，“亨德森一家绝对堪称某种人类学典范。他们一家人训练有素，孩子不哭不闹，大人连眉头都不皱一下。这让我觉得，这个计划的确颇值一搞。”\n\n从一开始，康查尔的马仔就搜出了亨德森家中的财务，但他们只是把它放置在餐桌正中心，从没正眼看过这些东西，直到周日的晚上，当晚饭结束后，康查尔用餐巾擦干净嘴，赞美了食物之后下达了他的最后通牒，他说别担心，这个令人厌烦的游戏马上就会结束，如果一家人通过最后这关，他们便会带着餐桌上的财物离开，至此亨德森一家遭遇的，便只是一桩普通的入室抢劫案件了。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "他说完，马仔递来一支左轮手枪，康查尔往其中塞入一颗子弹，拨动转轮，然后连开数枪直到子弹射到墙里。接着他又往弹夹里塞进一颗子弹。然后告诉男主人，说这就是这场考试的最后一道题了。现在枪里只有一颗子弹，六分之一的概率。由他持枪，分别瞄准三位家人射击，直到子弹打出。一旦子弹打出，游戏结束，他们会带着财务撤离，现场会被伪装成入室抢劫，行凶者可以归罪到抢劫者身上，没人知道他们经历过这些。但如果男主选择持枪自杀或袭击其他人，那他们便会抹除他们存在的痕迹，然后所有人都会死，“不仅如此，”康查尔坏笑着说，“当天早些时候，我们从他身上‘强制采集’了样本。所以即便他像个英雄一样死了，警方也会在他小女儿的体内提取到这些样本。他会作为芝加哥历史上最恶心的乱伦强奸犯和屠夫被载入史册。”\n\n“罗伯特，那本是一个完美的命题。”康查尔感叹道，像是在评价一道精美的数学题，“我把‘名誉’和‘负罪感’放在了天平的两端。我本以为我会看到一个凡人在绝对的社会性死亡威胁下，是如何为了保全那个虚假的‘清白’而把自己变成野兽的。但那个数学老师……”\n\n康查尔告诉我，当空气凝固，那把只有一颗子弹的枪躺在桌上时，亨德森没有崩溃，也没有求饶。他拿起了枪，但没有对准任何人。众目睽睽之下，他做了一个康查尔完全无法理解的动作。他打开了转轮，把那颗唯一的子弹倒了出来。\n\n子弹滚落在地。亨德森把空枪像垃圾一样扔到了康查尔脚边。“他看着我，罗伯特。那种眼神里没有恐惧。”康查尔歪了歪头，似乎至今仍在试图解析那个眼神，“他说如果我想毁了他的名声，那就请便。但他不会因为恐惧而变成怪物。然后，他做了一件更不可理喻的事。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "康查尔描述说，男主人转过身，背对着黑洞洞的枪口。他蹲下来，用那双颤抖的大手捂住了那个吓得失禁的小女儿的耳朵，把她的脸埋进自己怀里。那个即将身败名裂的父亲，在死前的最后几秒，温柔地对家人说：“别看他，看着我。宝贝，看着爸爸。不管明天报纸上怎么写，不管警察怎么说……在这最后一刻，你知道爸爸是爱你的，对吗？你知道爸爸没有把枪口对准你，对吗？”康查尔说，在那女孩拼命点头的时候，亨德森抬起头，而像是在宣告某种胜利。说到这里，康查尔突然笑了一声，那笑声里带着一丝从未有过的挫败感。\n\n你知道吗？就在听着康查尔描述的那一瞬间，我就从那种漫长的麻木中惊醒了。哪怕手里没有警徽，我也重新记起了我究竟是谁，记起了我为什么会在这辆该死的车上，以及……为了结束这一切，我到底该做什么了。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["confession_14", "capone"]
  },
  {
    id: "confession_16",
    keyword: "confession",
    title: "供述 No.16",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.1 },
    revealedKeywords: ['arthur_dawson', 'year_1967'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "关于1967年的特克萨卡纳碎尸案，我在“家族”里听过至少三个版本。有人说那个叫亚瑟的人是FBI的线人，被父亲识破后切碎了喂狗；有人说他试图偷走父亲的积蓄私奔。而康查尔则会用轻蔑的语气，说亚瑟是个“缺乏想象力的会计”，死于平庸。\n\n无论如何，原本我根本不应该知道存在着这样一个人。那是我们离开芝加哥，一路向北抵达威斯康辛州之前的某一天，房车在路边抛锚了。康查尔那个洁癖鬼当然不会碰油污，赛勒斯那个蠢货只会用蛮力砸。于是，“父亲”指了指我，让我钻下去看看。我躺在滑板上，滑进了阴影之中。回想起来，我仿佛还能闻到机油味、铁锈味，还有路面上被碾碎的动物尸体的味道，总之，就在检查支架的时候，我发现了一处不自然的凸起。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "那里的防锈漆颜色不对，比周围要新一些，但也被泥浆覆盖了很多年。我用扳手敲了敲。空心的。我屏住呼吸，用随身携带的瑞士军刀撬开了那块锈蚀的铁皮，一个东西随即落下，被我悄然接住。我回头看了一眼，赛勒斯的一双大脚就在两米外的路边来回踱步，康查尔正在和“父亲”讨论接下来的路线，似乎没人察觉到我的发现。\n\n昏暗的光线下，眼前之物被几层厚厚的油布紧紧裹，像一具迷你木乃伊。我撕开油布，这是一个黑色皮面的笔记本，扉页上写，“赠予我的亚瑟，家族的荣耀”。就在这时，我头顶的底板突然发出了“吱呀”一声巨响。我能认出，这是父亲的脚步声，此刻他就站在我正上方的地板上。灰尘随着他的脚步震动，簌簌地落在我的脸上。“罗伯特！还没修好吗？”康查尔的声音从外面传来。\n\n我把油布包塞进满是油污的工装裤内层，贴着我的肚皮。“马上就好。”我朝外边大喊。\n\n那晚，房车停在威斯康星州一片枯死的玉米地旁。其他人围着篝火分食罐头，而瓦妮莎则独自坐在车尾发呆，我走过去，没有寒暄，只是在点烟瞬间，冷不丁问了一句，“亚瑟是谁？”瓦妮莎的手猛地一抖，抬头问，“你……你怎么知道的。”\n\n“我在修车时看到的名字，刻在大梁上。”我撒谎时连心跳都没变。瓦妮莎没有质疑，他告诉我，他是父亲的养子，塞勒斯之前的记路人，但他已经死了，那时候她还小，并不知道发生了什么。\n\n“谁在提亚瑟？那个亚瑟·道森的亚瑟？”康查尔不知何时已经站在了阴影里，手里端着一杯冒着热气的咖啡。瓦妮莎缩成一团，绝望地看向我。我吐出一口烟圈，说是她在那自言自语，念叨着什么亚瑟，搞得我心里发毛，这才顺口问了一句。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "瓦妮莎张大了嘴，但她不敢反驳。康查尔厌恶地瞥了她一眼：“去把地板擦干净。如果再让我听到那个名字，你就去外面睡。”\n\n由此，我撬开了康查尔的嘴，从他和其他人嘴里我得到了一些说法，并且全程装作不在意。直到所有人都睡去，只剩我一人放哨时，我才把笔记本拿出来，就着篝火查看其中内容。\n\n亚瑟的笔记工整而刻板，列出了日期、城市、代号。此人显然是个强迫症患者，他在试图做一件这辆车上从未有人做过的事——建档。亚瑟记录了“父亲”口中那些散落在全美的“远亲”据点，什么“底特律收割者”、“新奥尔良药剂师”、“西雅图守夜人”……宛如一个庞大的地下恐怖网络，如果FBI拿到这个笔记本，那统一场论便无可疑。可奇怪的是，到了笔记后半部分，工整刻板的记录风格却完全变了，整洁的表格被粗暴的红色马克笔涂抹，很多地方都画上了问号，就像是亚瑟在质疑这些联络人是否真的存在一样。\n\n我不禁想到一种可能性……如果亚瑟是对的呢？整个社会处于一种“遍地是杀手”的集体癔症中，信息闭塞，恐惧却四通八达。而“父亲”，这个瘫痪在房车里的老头，敏锐地嗅到了这股时代的尸臭味。康查尔之所以死心塌地，是因为他以为自己在为一个庞大的、遍布全美的地下哲学帝国服务；瓦妮莎之所以不敢逃跑，是因为她相信无论她逃到哪里，总有一个受“父亲”指挥的“远亲”在盯着她。\n\n亚瑟死于试图拆穿谎言。连我……我是不是正在走进一个专门为我编织的更巨大的谎言里？这本笔记是我唯一的证据，而我最后一次见到它是在北达科他州的法戈市。在那场混乱的暴风雪中我遭遇了一些情况，它被永远地遗失在了冰原里。\n\n或许，是这辆车在保护它最后的秘密。",
        attitude: "",
        visual: "assets/record_of_accounts.jpg"
      }
    },
    connectedTo: ["confession_14", "capone"]
  },
  {
    id: "confession_17",
    keyword: "confession",
    title: "供述 No.17",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.15, y: window.innerHeight * 0.35 },
    revealedKeywords: ['richie_dreyfuss', 'rockford'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你是想问倒霉的里奇·德莱弗斯吧，想问他是不是被我或者康查尔干掉的。老实说，我也不知道这笔账应该算在谁头上。\n\n里奇是我们还在费城时被康查尔招募的，但当时我并不知道，直到房车开到圣路易斯，我才在远亲中注意到那张熟悉的脸。后来，我意识到他觊觎瓦妮莎，想上车并取代我的位置，而康查尔对此不置可否，我想他未必不曾考虑过这件事，不然为什么会选择带上里奇前往达文波特，而不是我呢。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "那件事情发生在我们芝加哥旁边的罗克福德市汇合后的某个夜晚。公路旅馆，里奇的房间里，康查尔，同我，还有里奇，每个人都喝了不少。尤其是里奇，因为我记得，话头是他自己先说起来的。他打了个酒嗝，把脚架在床头柜上，指着电视机里正在播放的新闻，即便那是另一起无关的谋杀案。\n\n“承认吧，康查尔，”里奇含糊不清地说道，“那一晚……亨德森家那一晚，简直就是一坨屎。没意思透了。”康查尔停下了手中的动作，镜片反射着电视的一角冷光：“哦？”\n\n“你总是吹嘘什么‘艺术’，”里奇嘲笑道，似乎酒精给了他勇气，“但那家人根本没兴致，你还想跟人玩两把，结果对方直接把牌桌掀了。真的太无聊了。那就是一场乱糟糟的屠宰，根本没有你说的‘游戏性’。”\n\n康查尔站起身。他没有生气，反而露出一种遇到了知音般的欣喜表情。他走到里奇面前，居高临下地看着他。“你说得对，里奇。亨德森先生是个糟糕的玩家，因为他不知道规则。如果参与者不知道输赢的代价，游戏当然不好玩。”\n\n“但你不能说俄罗斯轮盘是个无聊的游戏，它很精彩，尤其，它还有很多变体，”康查尔一边说着，转身从行李袋里掏出两把看起来一模一样的点38短管左轮手枪，放在沾满烟灰的桌子上。\n\n“我们需要更明确的规则。”康查尔从口袋里摸出两颗子弹，亮给两人看。“看着。”康查尔背过身，熟练地摆弄着两把枪的弹巢，发出清脆的金属撞击声。几秒钟后，他转过身，把两把枪推到桌子中间。“规则很简单，听好了，尤其是你，聪明的里奇。”康查尔竖起手指， “这里有两把枪，两颗子弹。情况一：这把枪里有一颗，那把枪里也有一颗；情况二：这把枪里有两颗，注意，是连续的，而那把枪是空的；情况三：反过来。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "里奇盯着那两把黑洞洞的枪，咽了口唾沫。“现在，你跟罗伯特，你们各自选一把枪。游戏流程是：先朝对方开一枪，然后再朝自己的太阳穴开一枪。如果你选到了那是装有两颗子弹的枪，你打死了对方，下一枪就会打死你自己。如果你选到了那是有一颗子弹的枪，那你打死对方跟打死自己的概率相等。”康查尔兴奋地说着，“里奇，你觉得亨德森不好玩是因为没有互动。现在互动来了。来吧，你先选吧。”\n\n里奇看着我。我当时还在削苹果，连眼皮都没抬一下，尽量装作这件事跟我无关， 里奇的手开始颤抖。他想拿起左边那把枪，又觉得右边那把更轻。他嘴里念念有词，忽然之间拿起枪，把枪口对准我。我停下刀，眼睁睁地看着他的汗往下滴下去。一秒，两秒，三秒。 “我不行……这不公平……”里奇的声音变了调，他猛地把枪口移开，想要放下，“这太疯狂了，康查尔，我不玩了。”\n\n“规则一旦制定，游戏就必须结束。”康查尔冷冷地说，“开枪。或者我去把你的脑袋塞进马桶里淹死。”里奇尖叫一声，闭着眼睛，对着天花板扣动了扳机。\n\n咔哒一声，枪没响。“违规操作。”康查尔叹了口气，“你浪费了一次在这个世界上消除罗伯特的机会。现在，该你对自己开枪了。”里奇颤抖着把枪口抵住自己的太阳穴。他哭了出来，鼻涕和眼泪混在一起。 咔哒——枪还是没响。里奇瘫软在椅子上，大口喘气，像是死过一次。\n\n“太遗憾了。”康查尔摇摇头，看向我，“罗伯特，该你了。”\n\n我什么都没想，只是举枪，对准还在抽搐的里奇。 里奇瞪大了眼睛：“不！别！罗伯特！别！”\n\n咔哒。我调转枪口，顶住自己的太阳穴。咔哒。\n\n里奇呻吟着，直到看到康查尔接过两支枪，后者打开弹匣展示，两把枪都是空的，然后他摊开手心，那两颗子弹一直就在他的手心里，根本没装进去。“怎么样，里奇，即便没有子弹，仅靠出色的规则设计，游戏就可以如此惊心动魄。”康查尔怪笑着。里奇瘫坐在椅子上，随后发出了歇斯底里的笑声，“哈……哈哈……你这个该死的疯子！我就知道你不会为了证明一个什么狗屁理论就杀了我。”\n\n康查尔站在桌边，微笑着。 “心脏差点跳出来？”他轻声重复道，“‘差点’是个很无聊的词，里奇。差点意味着什么都没发生。”康查尔脸上的笑容瞬间消失。“刚才这是游戏教程，用来让两位熟悉规则，接下来，我们正式开始游戏。”他重新拿起左轮手枪，背着我们完成装填，之后把枪放回酒桌。“拿枪吧。”\n\n里奇的脸色从潮红瞬间变成了惨白，然后变成了死灰色的紫。“拿枪。”康查尔重复说着。里奇的瞳孔猛地放大。他张大嘴，发出了一声尖锐的吸气声，他的手死死抓住了左胸的衣服，指甲几乎嵌进了肉里。那种剧痛不是来自外界，而是来自他那颗不堪重负的心脏。他的血管在极度恐惧收缩下爆裂了。最后，里奇整个人从椅子上滑落。他的身体还在抽搐，眼睛死死瞪着那把枪。几秒钟后，他不动了。\n\n康查尔低头看着里奇的尸体，脸上没有悲伤甚至带着一丝失望。“真遗憾。”康查尔叹了口气，弯腰从里奇的尸体腿上捡起那把枪，“看来他的系统不兼容这种级别的游戏。”他转过身看着我，对准电视机扣动扳机。砰的一声，显像管碎了，“恐惧才是唯一的子弹。把他处理掉。这次别再用冷库了，找个暖和点的地方埋了。毕竟他给我们提供了一场不错的表演。这可真值得！”",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_18",
    keyword: "confession",
    title: "供述 No.18",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.65 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "终于要提到这个名字了，是吗？\n\n我记得那年秋天很冷，我们在盐湖城东边的林子里停了三天。那地方除了松树和石头，什么都没有。康查尔说我们需要消失一阵子，因为我们在内华达留下的动静太大了。\n\n那天下午，我在修发电机的皮带。康查尔去林子里散步——他总喜欢去“听风的声音”。回来的时候，他领着一个女人。女人穿着一件粉色的羊毛大衣，脚上是沾满泥土的玛丽珍鞋，手里提着一个藤编的野餐篮。在这个荒无人烟的林子里，她看起来就像个迷路的童话角色。\n\n我想了很久才认出她来。我们在费城的时候，待过一个酒吧叫脏弗兰克，她是那的女孩，名叫艾莉丝，在酒吧端啤酒擦吧台，有时会来地下室给我送饭。女孩来到房车旁边，看着我笑。不是那种客套的笑，是那种饿了很久的野兽终于吃饱的心满意足。“嗨，罗伯特。”她说，“你们真难找。”康查尔很高兴，他问我：“还记得她吗？”我点点头说：“脏弗兰克酒吧，他们说杀害莫宁的凶手一直还没找到。”女孩说：“他想要脱离家族，想退休，所以我帮了他一把。”康查尔说：“别说这个了，我告诉你这孩子是个天才，比他妈的警察强多了，孤身一人，顺着‘气味’就找来了。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "艾丽丝走到我面前。她个子很小，只要我一只手就能捏碎她的脖子。但她一点都不怕。她伸手摸了摸发电机上的油污，然后从那个野餐篮里拿出一个东西，递给了给我。我接过来看，发现是一枚警徽，犹他州的，上面还有干掉的褐色痕迹。“这是什么？”我问她，“这是给你的礼物，”她说。\n\n她说三个月前，她在待在丹佛市旁一个名叫利伯勒尔的小镇。那时她在打探我们的消息，没找到车，却她找到了一个正在调查这辆车的副警长，叫米勒。那个警察很勤快。他在加油站查到了我们的加油记录，甚至推算出了我们往西走的路线。他写了一份报告，准备第二天一早发给FBI。\n\n“他是个好人，那个米勒副警长，”艾丽丝看着我，眼睛亮晶晶的，“他看我一个人在路边哭，就把我带回了家。他说我可以打个电话，还可以吃顿热饭。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "艾丽丝说，回到警察家里，她给他做了一顿炖牛肉，然后在汤里加了些她从费城带来的“药”。“好东西，出了让你动不了之外，不会改变你的任何知觉。”她说，当那个警察直挺挺地靠在椅子上，眼皮打架却还能看见东西的时候，艾丽丝当着他的面，走到壁炉边，一张一张烧掉了他写好的报告。“做完这些，我也没急着动手，”艾丽丝把脸凑近我，声音变得粘稠，“我带了个老朋友来。那个从费城带出来的冰锥。莫宁叔叔很喜欢它，我想米勒警官也会喜欢。”\n\n她说，当药劲上来，那个警察瘫在椅子上动弹不得的时候，她坐到了他的大腿上。她撩起裙子，也割开了他的裤腿。她用那把锋利的冰锥尖头，在他的大腿内侧慢慢地划，她说那种冰冷的钢针刺破皮肤的感觉，就像恋人的指甲。她在上面刮出了一道道红色的痕迹，看着他的肌肉因为恐惧和疼痛而痉挛。“他发不出声音，”艾丽丝笑着说，“只能流眼泪。那样子可爱极了。”\n\n玩够了之后，她才去厨房拿了保鲜膜。一层。两层。三层。她把他闷死在那个充满肉汤味和血腥味的餐厅里。然后，她收拾了盘子，洗了碗，帮他把警服上的褶皱抚平，脱下自己的内裤，放到他的腿上。然后拿走了警徽，关灯离开。\n\n“腿上的划痕并不致命，在法医那里，米勒副警长只是因为窒息，不幸死在自家的餐桌上。虽然脸上缠着保鲜膜有点怪，但警察们会理解的，这种场面他们见多了。对了，你知道我把那把冰锥放哪了吗？”她说，她留着冰锥上的血没擦，只是径直走进车库，把它扔进了一个工具箱里，埋在一堆扳手和螺丝刀下面。“也许过个几年，他的家人或者是买下那栋房子的人，会用它凿开冰块喝杯威士忌。”\n\n我看着她。我见过很多死人，也见过很多人杀人，但他们没一个像她的，她顺着尸血的味道横跨了半个美国，只是为了把这个死人当做礼物送给我。\n\n“上车。”我对她说。她亲了我一下，接过那枚警徽，塞进了我的裤裆里。那天晚上，房车上多了一个人。瓦妮莎缩在角落里发抖，她好像知道这个穿着粉色大衣的女孩是什么东西。而艾莉丝，她坐在副驾驶座上，看着窗外的黑夜，哼着收音机里放出的音乐。\n\n这辆车上多了一个真正享受杀戮的人。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone", "morning"]
  },
  {
    id: "confession_19",
    keyword: "confession",
    title: "供述 No.19",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.65, y: window.innerHeight * 0.55 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "埃尔帕索的空气里全是沙尘和烧焦轮胎的味道。1979年夏天，我们在那儿停靠的唯一原因，是为了让艾丽丝去\"捕猎\"。她看上了一个老牧师，说那个老头看她的眼神像是在看一只迷途的羔羊，她想让他看看狼是怎么吃羊的。\n\n我不在乎那个牧师。我走进那间教堂，是为了做另一件事。那天，趁着艾丽丝在前排长椅上假装哭泣、分散那个老牧师注意力的时候，我溜到了告解室后面。这个时候尖叫声开始了。不是艾丽丝的，是那个牧师的。艾丽丝动手了。她用那种她在佛罗里达时用过的手法，只不过这次是一根削尖的十字架碎片。是的，她把那个老头钉在了告解室的门框上。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "我等了好一会儿，直到尖叫声消退，我知道艾丽丝终于玩够了。等我出来时，教堂内已经空无一人，艾丽丝不知道去哪里了，但却把那个老牧师留在了祭坛后面，像丢弃一个坏掉的玩偶一样。场面很乱。血喷得到处都是。\n\n我拖着那个老头的脚，把他往告解室后面的暗门里拉。就在我弯腰准备把他塞进去的时候，我的手习惯性地摸到了口袋。这是第47个\"灰水信标\"。哪怕是在处理尸体的时候，哪怕是在这种该死的地方，我还在做梦。我还在想着，如果我留下记号，也许明天，或者明年，会有人顺着这个信标找到我们，把我从这辆疯狂的房车上接走。我把那个折好的烟盒，塞进了地板的缝隙里。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "就在这时，一只冰凉的手抓住了我的手腕。是那个牧师。他还没死透。他的喉咙被艾丽丝扎烂了，血泡在嘴里咕噜咕噜地响。但他那双浑浊的眼睛死死盯着我，然后移向那个塞在缝隙里的烟盒。他看懂了。所以他松开手，用沾满血的手指把那个烟盒勾了出来。他没有撕碎它，只是把它轻轻推回我面前。他张开嘴，那个漏风的喉咙里挤出几个字，但我听得清清楚楚。他说：\"不会有人收到信的。\"\n\n我记得他断气的时候眼睛还睁着，带着怜悯的笑，那笑让我恶心得不行。也是在那个时候，我心里终于有了这个念头。我心想，好吧，是时候了。我把烟盒捡起来，撕碎之后，塞进尸体的嘴里。从那以后灰水断流，我再也没留下过信标。\n\n等等——\n\n那件事发生的时候，只有我和那具尸体。艾丽丝在车上，康查尔在外面望风。那个烟盒被我揉烂了，和尸体一起烂在了埃尔帕索的教堂地下。没有警察发现过，没有档案记录过。这也是我第一次开口说这件事。所以，你是怎么知道的？为什么你总能找对关键词？这些不可能通过推理和调查得知，除非……除非有人当时就在我身后看着这一切。\n\n听着，那个给你提供关键词的人知道得太多了。快告诉我，他叫什么名字？",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_20",
    keyword: "confession",
    title: "供述 No.20",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.55, y: window.innerHeight * 0.45 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你一直问我，作为一个受过训练的卧底，作为一个手里有枪的人，为什么我不直接杀了“父亲”？为什么这几年来，我像条狗一样跟着他在美国兜圈子？\n\n起先不动手的原因很简单，我还没有看到收网的时机。 雷吉博士曾经说过，在得到“收网信号”之前，我什么也不能做。所以起先我一直在等。 我在等一个永远不会来的电话。我在等你们告诉我，“可以了，罗伯特，结束了”。如你所知，没有回应，就在这漫长的等待过程中，情况发生了变化。当然，你也可以说，在看了如此多恶行之后，即便没有指令，我也可以依照本能行事，甚至直接一了百了，但我不能，因为某时某刻，我几乎已经成了家族的一员。\n\n是啊，你已经知道了房车内的家族关系是什么样。被作为肉体容器和把他人当做肉体容器，以及父亲的权威，这两样东西彻底挫伤了我，但并不仅仅是因为肉欲和恐惧感，维持这个系统运转的，还有另外两样东西。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "第一样，是驾驶座后面的那个药箱。 钥匙挂在父亲的脖子上。 那里面装的不是毒品那么简单的东西，那是一种精心调配的化学鸡尾酒。父亲甚至不需要用枪指着我。只要我错过了一次服药时间，或者仅仅是产生了强烈的对抗念头导致的焦虑，我的身体就会崩溃。我会呕吐、痉挛、看到地狱的幻觉。 在那之后的每一个清晨，当父亲微笑着把药片递给我时，我不仅不会杀他，我还会感激他。\n\n第二样，是通过远亲所编织的一张看不见的网。不过关于这一点，至今我都仍然无法百分之百确认。可以确认的是，每当夜幕降临，无论我们在哪停车，都有一个守夜机制，当时间来到午夜十二点，车门便会忽然从外面反锁起来。由于车里一片漆黑，起先我以为是康查尔或塞勒斯在守夜，但时间久了，我却渐渐意识到，当车门被锁紧时，似乎所有人都在车上，这意味着另有他人在负责安保，但我从不知道也没见过是谁。后来我小心翼翼问过瓦妮莎，她只告诉我，那是一只“银喜鹊”。不得不说，这名字起得真贴切，这种鸟最喜欢收集闪闪发光的东西，也喜欢站在高处俯视地上的爬虫。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "无论如何，直到车沿着州界一路向北驶出州界，在即将抵达波特兰的时候，我看着一路上倒退的风景，看着西海岸的风吹过瓦妮莎的一头金发，突然想到了破解之法。是的，自始至终瓦妮莎就是父亲乃至整个系统的软肋，而我直到这一刻才注意到。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_21",
    keyword: "confession",
    title: "供述 No.21",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.45, y: window.innerHeight * 0.35 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "想要搞清楚父亲的软肋，与搞清他究竟是谁、何以成为父亲，其实根本就是同一个问题。\n\n1968年，在我被扔进缅因州的监狱之前，某天上午，雷吉博士把一份侧写扔在我的桌子上。当时外面的世界已经疯了，旧金山的嬉皮士在吸大麻，反战游行在烧征兵卡，雷吉对我说：“在这个失去秩序的年代，权威是一种极度稀缺的商品。谁能提供秩序，谁就是新神。”\n\n在侧写里，雷吉博士说，这个不断在移动中的老家伙和查理·曼森或者是后来那些搞山达基教的神棍不一样。曼森是疯狗，哈伯德是贪婪的商人，但他不一样，他是受过正规训练的牧羊人。\n时至今日我得说，雷吉是对的，家族并非六十年代的产物。父亲也更古老，更坚硬。他是朝鲜战争留下的幽灵。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "上到这辆房车之后，我开始有大把的时间观察他。偶尔服药后的兴奋感散去，但痛苦尚未袭来的一小阵子，那是我最冷静的时候，在那个片刻，我可以不再把他当做神，而是把他当做一个标本去看，于是我轻而易举就看到他身上被刻意隐藏的、属于50年代军方的痕迹。\n\n就拿他的生活习惯来说，在这个完全无法洗澡的流浪环境之中，父亲长时间保持着一种病态的整洁。他的指甲永远修剪得整整齐齐，吃饭时也会严格遵守军官食堂的礼仪——切肉时手腕悬空，咀嚼时绝不张嘴。再听听他的音乐，房车的收音机里永远循环播放着格伦·米勒和班尼·古德曼，我猜父亲在怀念那个黑白分明的、绝对服从的艾森豪威尔时代。\n\n至于他是怎么学会控制家族的…… 塞勒斯，那个喝多了劣质波本酒就会管不住嘴的傻大个，曾经跟我吹嘘过父亲的勋章。 他说父亲在1951年的时候，并不在前线冲锋，而是待在巨济岛战俘营，那里是冷战时期最大的意识形态实验室。塞勒斯说，长官们不需要动刑。只需要把那些战俘关在一个特制的房间里，调整灯光，播放特定的频率，然后一遍又一遍地重塑他们的记忆。他能让最坚定的布尔什维克在三天内哭着喊妈妈。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "所以这辆房车，其实那个战俘营的缩小版。 这里的所谓“祈祷”，其实是心理防线拆解，这里的“圣餐”，也就是药箱里的东西，是化学辅助审讯。 这里的“守夜”，是安全感剥夺。父亲并不是什么先知，只是一个从朝鲜战场回来的心理战专家，他发现这套用来对付敌人的“洗脑技术”，在这个信仰崩塌的年代，可以能用来完美地控制自己人。\n\n当然，塞勒斯的说法只是说法而已，毕竟多数时候他会用先知和弥赛亚来称呼父亲，你不能太把这些信息当真。可直到一件事情发生，我忽然意识到，关于朝鲜的部分或许是真的。那是我们刚抵达俄勒冈州边界的时候，那天傍晚，雨刚停，一辆外观被涂满了色彩斑斓的呕吐物般的旧校车，喧闹着从我们的营地旁开过。 车上的人大笑大叫，把廉价啤酒洒在路面上，甚至有人冲着我们这边暴露私处。艾莉丝那个疯女人坐在篝火旁，竟然微笑着向他们回了一个飞吻。直到车尾灯消失在红杉林深处，她才悠悠地吐出一口烟圈，说：“大概是一群追随‘感恩而死’巡演的嬉皮士，一群快乐的猪。”\n\n如果你去查日后警方的卷宗，你会看到这是一起教科书级别的“仇恨犯罪”。 那辆旧校车最终被发现停在林地深处，车窗全碎，车身上被喷满了“滚回旧金山”、“美国不欢迎垃圾”之类排版工整的标语。 我敢打赌，警方一定会结案说是当地那帮极右翼伐木工或者保守派红脖子干的。\n\n但真相是，几乎在校车离开视线的半小时后，父亲就让康查尔发动房车，宣布即将执行亚玛力人协议计划。这个计划由艾莉丝和康查尔做前哨，他们带着酒和笑脸混进去。一旦被这群毫无戒心的孩子接纳，康查尔会把马匹专用的强效镇静剂混入LSD和啤酒里。\n\n等到第二天，当警察接到匿名报警电话赶到林地时，他们会看到这群嬉皮士，他们被割掉了耳朵，脸颊上被刺上了纳粹的万字符。 但在药物的作用下，他们甚至感觉不到疼，只能对着警察痴笑。\n\n启发就是在那一刻像闪电一样击中我的。\n\n过去我们也杀人，也放火。但从来没有哪次像这次一样，整个家庭看起来像个特种小队一样，太快、太流畅、太训练有素。 仿佛那个所谓的“亚玛力人协议”计划根本不是父亲临时想出来的，而是一份早就写好、甚至演练过无数次的战术手册。就连母亲也是极其熟练地从她的针线盒底层，翻出了早就准备好的刺青针刀和那瓶黑色的工业油墨。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_22",
    keyword: "confession",
    title: "供述 No.22",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.55, y: window.innerHeight * 0.45 },
    revealedKeywords: [],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "如果要拆掉这个笼子，我就得摸清每一根栏杆的位置。 这辆GMC房车我住了好几年，我以为我已经了解了它的每一个角落：哪里藏着备用轮胎，哪里藏着现金，哪块地板踩上去会响。但我错了，我一直是个盲人，住在一个我看不清的迷宫里。\n\n那是个周二的晚上，房车停在鲑溪小径旁的红杉林里。 按照父亲制定的那套扭曲的时间表，这天晚上是轮到我“使用”瓦妮莎的时间。不用猜，这可不是什么浪漫的约会。这是父亲的奖励机制，也是一种羞辱仪式。他把瓦妮莎像一块肉一样赏赐给我们，用来发泄多余的精力，或者作为我们在行动中表现良好的奖品——当然，在艾莉丝上车之后，每个人都希望能永远跟她待在一起。\n\n总之我们有一套严格的交配法则。 在这辆车上，性是被允许的，甚至是被鼓励的，因为它能让我们保持动物性服从。但亲密关系是被绝对禁止的。 我们可以像野兽一样撕咬对方，可以在对方的肩膀上留下淤青和牙印——父亲甚至会检查这些痕迹，作为我们“野性”的证明。 但绝对不能亲吻彼此，因为接吻意味着平等，意味着私情，意味着两个奴隶试图在主人的眼皮底下建立某种连接。那天晚上，瓦妮莎违规了，在黑暗的后车厢里，在那张充满霉味和精液味的床垫上，她突然捧住了我的脸。 她没有像往常一样麻木配合着，身体只是剧烈地颤抖。她吻了我，像溺水者在抓住最后一根稻草。她贴着我的嘴唇，用一种带着哭腔的气声乞求：“……带我走，罗伯特。求你了。趁着今晚……我们能逃掉。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "如果是另一个罗伯特，听到这句话大概会心碎，会抱着她一起哭。但当时的我并没有回应那个吻，而是一把推开了她，力道大到她的头撞在了车厢壁上，发出“咚”的一声闷响。我看着她惊恐的眼睛说，试图策反同伴，非法建立情感连接，按规矩这足够被父亲扔进蛇穴了。说着话，我也坐起身，整理好衣服，手搭在门把手上，说我现在就去告诉父亲。\n\n“不！别！求你！” 她扑过来抱住我的腿，指甲深深掐进我的肉里。恐惧让她的脸扭曲了。她知道我是认真的，她也知道“父亲”的惩罚是什么。而我只是居高临下地看着她，反复叙说着试图逃走之于我并无好结果，父亲的爪牙遍布全美，让她给我一个我不去告发并与她私奔的理由。瓦妮莎颤抖着，眼泪流了满脸，最后她指着车尾那个看似普通的衣柜，声音细若蚊蝇，“我知道这辆车的夹层。我有一次看见了……他在那里和外面的人联络。”\n\n第二天趁着父亲和康查尔下车，我按照瓦妮莎的指示，钻进了车尾。 她没有撒谎。 在后储藏柜的最深处，有一块看起来像是为了遮挡轮拱而设计的挡板。但如果你按压特定的角落，它会弹开。 里面藏着一条极其狭窄的、只能容许一只猫或者一个瘦骨嶙峋的人挤进去的铝合金楼梯。它通向哪里？ 这辆GMC房车的车顶经过了特殊的加高改造，从外面看像是空调机组和行李架，但实际上，那是一个只有一米高、仅容人蹲下前行的二层空间。我爬了上去。那里热得像个烤箱，充满了那种电子设备过热散发出的臭氧味。 在这个只有老鼠才能钻进来的夹层里，我看到很多意料之外的东西，首先隔间的正中央是一台Collins KWM-2 收发报机，军用级，角落里有一台小型的油印机，旁边堆满了还没干透的传单和伪造的证件。 那些工整的“神启”，那些用来嫁祸给嬉皮士的标语，都是在这个像棺材一样的夹层里生产出来的。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "旁边是一台不停闪烁红光的Regency 警用扫描仪，看着那台上不断闪烁的红色二极管。 嘀、嘀、嘀。 每一次闪烁，都是一条来自警方的调度指令。在这个红光的映照下，过去半年里那些困扰我的谜题，像被推倒的多米诺骨牌一样，哗啦啦地解开了。六个月前，我们在萨克拉门托经历了一次极其罕见的失手。原本行动目标是一家位于郊区的信用社。不是为了钱，是为了信用社保险柜里的一份属于某个参议员的不记名债券，父亲称之为“取回上帝的什一税”。\n\n但塞勒斯却搞砸了。那个笨手笨脚的傻大个触发了无声警报。当我们冲出大门时，整个萨克拉门托警局的巡逻车像疯了一样向我们包围过来。警笛声从四面八方响起，我们在第160号公路上狂奔，前面是封锁线，后面是追兵。艾莉丝在尖叫，塞勒斯咒骂着，唯独父亲坐在副驾驶上，闭着眼睛，手指轻轻敲击着膝盖，嘴里念念有词。 就在我们即将撞上前方警车封锁线的一瞬间，他突然睁开眼，大声命令道： “左转！冲进那片玉米地！上帝为我们分开红海！”\n\n康查尔猛打方向盘，房车像一头失控的犀牛冲进了玉米地，几乎就在我们车尾消失在玉米秆里的十秒钟后，三辆亮着警灯的拦截车呼啸着掠过我们原本所在的公路。 我们在泥泞中颠簸了五英里，最后神奇地绕过了所有的检查站，消失在茫茫夜色中。\n\n那天晚上，父亲在营火旁举行了一场盛大的感恩弥撒，他说他听到了天使的低语，指引他避开了那些世俗的猎犬。也许他真的能预知未来？我忍不住产生了一丝敬畏。\n\n所以呢？去他的神谕，他听到的不是上帝的声音，是萨克拉门托警局调度的10-33代码。我从夹层里爬下来，把挡板重新扣好。 回到车厢里时，瓦妮莎还在角落里发抖。她看着我，眼神里充满了期待和恐惧，以为我会兑现承诺带她走。 我没有理她，我现在有了更明确的计划，也许在抵达圣芭芭拉的海滩之前，我就能够收网。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
];

export type HierarchyRole = 'BOSS' | 'UNDERBOSS' | 'LIEUTENANT' | 'SOLDIER' | 'ASSOCIATE' | 'HANDLER' | 'AGENT';

export interface SyndicateMember {
  id: string; // matches unlockedPeople ID
  name: string; // Display Name
  role: HierarchyRole;
  parentId?: string; // Who they report to (for drawing lines)
  position: { x: number, y: number }; // Relative percentage on board (0-100)
  status: 'ACTIVE' | 'DECEASED' | 'ARRESTED' | 'MISSING'; // Stamp on photo
  phase: 1 | 2; // 1 = Syndicate, 2 = FBI Twist
  description: string; // Chalk note
}

export const RELATIONSHIP_TREE: SyndicateMember[] = [
  // --- BOSS ---
  {
    id: 'father',
    name: 'FATHER',
    role: 'BOSS',
    position: { x: 50, y: 10 },
    status: 'ACTIVE',
    phase: 1,
    description: 'The Patriarch'
  },
  // --- LIEUTENANTS ---
  {
    id: 'conchar',
    name: 'CONCHAR',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 25, y: 40 },
    status: 'MISSING',
    phase: 1,
    description: 'Eldest Son / Enforcer'
  },
  {
    id: 'luciano',
    name: 'LUCIANO',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 50, y: 40 },
    status: 'DECEASED',
    phase: 1,
    description: 'Finance / Distribution'
  },
  {
    id: 'lundgren',
    name: 'LUNDGREN',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 75, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Cult Leader'
  },
  // --- SOLDIERS / ASSOCIATES ---
  {
    id: 'nibi',
    name: 'NIBI',
    role: 'SOLDIER',
    parentId: 'conchar',
    position: { x: 25, y: 70 },
    status: 'DECEASED',
    phase: 1,
    description: 'The Scapegoat? (1971)'
  },
  {
    id: 'morning',
    name: 'MORNING',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 38, y: 65 }, // Slightly offset
    status: 'ACTIVE',
    phase: 1,
    description: 'Bar owner / Fence'
  },
  {
    id: 'roger_beebe',
    name: 'ROGER BEEBE',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 75, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Confessed to 1968 crimes'
  },
  {
    id: 'little_derek_wayne',
    name: 'DEREK WAYNE JR.',
    role: 'ASSOCIATE',
    parentId: 'father', // Linked to Father due to "inherited obsession"? Or Conchar who talks about him? Let's link to Father for now as a "Fellow Deviant" or Conchar. Conchar talks about him.
    position: { x: 80, y: 30 },
    status: 'DECEASED',
    phase: 1,
    description: 'Family Massacre Victim'
  },
  // --- PROTAGONIST (The Twist) ---
  // Initially shown as associate/unknown, then revealed as FBI Agent
  {
    id: 'capone',
    name: 'R. CAPONE',
    role: 'ASSOCIATE',
    parentId: 'conchar', // Initially linked to Conchar as "Partner"
    position: { x: 15, y: 55 },
    status: 'MISSING',
    phase: 1,
    description: 'Deep Cover / "Orphan"'
  },
  // --- FBI / PHASE 2 REVEAL ---
  {
    id: 'dr_reggie',
    name: 'DR. REGGIE',
    role: 'HANDLER',
    // In Phase 2, this Node will appear. We might need logic to change Capone's parent.
    // For now, let's place him isolated or top left.
    position: { x: 10, y: 10 },
    status: 'ACTIVE',
    phase: 2,
    description: 'Handler / Architect?'
  },
  {
    id: 'jc_penney',
    name: 'JC PENNEY',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 90, y: 60 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Department Store / Target'
  },
  {
    id: 'martha_diaz',
    name: 'MARTHA DIAZ',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 80, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Laundromat Victim'
  },
  {
    id: 'julie',
    name: 'JULIE',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 60, y: 85 },
    status: 'DECEASED',
    phase: 1,
    description: 'Frozen Child'
  },
  {
    id: 'the_mother',
    name: 'THE MOTHER',
    role: 'UNDERBOSS',
    parentId: 'father',
    position: { x: 40, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Matriarch'
  },
  {
    id: 'vanessa',
    name: 'VANESSA',
    role: 'ASSOCIATE',
    parentId: 'the_mother',
    position: { x: 30, y: 30 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Adopted Daughter'
  },
  {
    id: 'silas',
    name: 'SILAS',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 60, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Second Son'
  },
  {
    id: 'juvell_chambers',
    name: 'JUVELL CHAMBERS',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 10, y: 40 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Ex-Cop / Recruit'
  },
  {
    id: 'boris_smirnov',
    name: 'BORIS SMIRNOV',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 90, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Burkesville Gang'
  },
  {
    id: 'cynthia_miller',
    name: 'CYNTHIA MILLER',
    role: 'ASSOCIATE',
    parentId: 'silas',
    position: { x: 70, y: 15 },
    status: 'MISSING',
    phase: 1,
    description: 'Static Snow Victim'
  },
  {
    id: 'aw_wilmo',
    name: 'A.W. WILMER',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 85, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'The Scapegoat? (1990)'
  },
  {
    id: 'peter_henderson',
    name: 'PETER HENDERSON',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 20, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Davenport Victim'
  },
  {
    id: 'priest',
    name: 'THE PRIEST',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 85, y: 50 },
    status: 'MISSING',
    phase: 1,
    description: 'Texarkana Connection'
  },
  {
    id: 'richie_dreyfuss',
    name: 'RICHIE DREYFUSS',
    role: 'SOLDIER',
    parentId: 'conchar',
    position: { x: 40, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'The "Loser" / Failed Recruit'
  }
];
