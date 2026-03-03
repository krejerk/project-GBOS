
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
  'confession_1': ['maine', 'small_bank'],
  'confession_2': ['ohio', 'ritual_case'],
  'confession_3': ['chicago', 'missing'],
  'me_1971': ['nibi', 'year_1971'],
  'oh_1968': ['lundgren', 'year_1968'],
  'dc_1967': ['dr_reggie', 'year_1967'],
  'il_1985': ['roger_beebe', 'year_1985'],

  // Node 2
  'confession_4': ['1402_old_dominion_rd', 'training_day'],
  'confession_5': ['nevada', 'family_massacre'],
  'confession_6': ['mojave_rest_stop', 'empty_cigarette_pack'],
  'confession_7': ['roanoke', 'twisted_relationship'],

  // Node 3
  'confession_8': ['louisville', 'blue_rv'],
  'confession_9': ['cincinnati', 'mint_plan'],
  'confession_10': ['burkesville', 'distant_relatives'],
  'confession_11': ['klub75_report', 'quantico'],
  'confession_12': ['kansas_city', 'mobile_blood_truck'],
  'confession_13': ['east_12th_st', 'execution_room'],

  // Node 4
  'confession_14': ['st_louis', 'maggots'],
  'confession_15': ['davenport', 'new_plan'],
  'confession_16': ['texarkana', 'dismemberment_case'],
  'confession_17': ['richie_dreyfuss', 'rockford'],
  'confession_18': ['el_paso', 'priest'],
  'confession_19': ['el_paso', 'priest', 'church'],
  'confession_20': ['interstate_80', 'watchman'],
  'confession_21': ['portland', 'achilles_heel'],
  'confession_22': ['redwood_forest', 'pow_camp'],
  'confession_23': ['santa_barbara', 'closing_the_net'],
  'confession_24': ['laguna_beach', 'naked_root'],
  'confession_25': ['albuquerque', 'chemist_lover'],
  'confession_26': ['santa_fe', 'bonny_and_clyde'],

  // Archives
  'nv_1971': ['nevada', 'year_1971'],
  'va_1972': ['martha_diaz', 'year_1972'],
  'va_1990': ['aw_wilmo', 'year_1990'],
  'cin_1973': ['julie', 'year_1973'],
  'nas_1973': ['juvell_chambers', 'year_1973'],
  'ky_1973': ['boris_smirnov', 'year_1973'],
  'kan_1976': ['kansas_city', 'year_1976'],
  'kc_1965': ['john_morrissey', 'year_1965'],
  'ia_1976': ['peter_henderson', 'year_1976'],
  'archive_15': ['richie_dreyfuss', 'year_1977'],
  'archive_16': ['morning', 'year_1974'],
  'sf_1976': ['morandi', 'year_1976'],

  // Node 4 Retrieval Targets (Meta-group for visual removal AFTER Jennifer dialogue)

};

// Categorization for split UI views
export const CATEGORY_IDS = {
  LOCATIONS: [
    'east_12th_st', 'davenport', 'texarkana', 'el_paso', 'dirty_frank',
    'st_louis', 'cincinnati', 'chicago', 'louisville', 'burkesville',
    'quantico', 'kansas_city', 'roanoke', 'nevada', 'ohio', 'maine',
    'interstate_80', 'portland', 'redwood_forest', 'pow_camp', 'santa_barbara', 'laguna_beach',
    'rockford', 'albuquerque', 'santa_fe', 'mill_valley'
  ],
  CASES: [
    'new_plan', 'recruitment', 'dismemberment_case', 'rockford',
    'ritual_case', 'small_bank', 'missing', 'family_massacre',
    'twisted_relationship', 'mint_plan', 'klub75_report',
    'mobile_blood_truck', 'execution_room', 'chaos_aesthetics', 'maggots',
    'police_killing', 'reboot_command', 'watchman', 'achilles_heel',
    'amalekite_protocol', 'closing_the_net', 'tithe', 'silver_magpie',
    'project', 'julip', 'naked_root', 'chemist_lover', 'bonny_and_clyde', 'reporter'
  ],
  PEOPLE: ['nibi', 'conchar', 'father', 'lundgren', 'morning', 'robert', 'robert_capone', 'dr_reggie', 'roger_beebe', 'little_derek_wayne', 'aw_wilmo', 'martha_diaz', 'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers', 'boris_smirnov', 'jc_penney', 'john_morrissey', 'cynthia_miller', 'peter_henderson', 'priest', 'arthur_dawson', 'richie_dreyfuss', 'alexei', 'morandi'],
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
  '记者': { id: 'reporter', type: 'clue' },
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
  '拉古那海滩': { id: 'laguna_beach', type: 'location' },
  '80号洲际公路': { id: 'interstate_80', type: 'location' },
  '匡提科': { id: 'quantico', type: 'location' },
  'Quantico': { id: 'quantico', type: 'location' },

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
  '守夜人': { id: 'watchman', type: 'clue' },
  '肉体关系': { id: 'twisted_relationship', type: 'clue' },
  '薄荷计划': { id: 'mint_plan', type: 'clue' },
  '新计划': { id: 'new_plan', type: 'clue' },
  '招募': { id: 'recruitment', type: 'clue' },
  '行刑室': { id: 'execution_room', type: 'clue' },
  '流动献血车': { id: 'mobile_blood_truck', type: 'clue' },
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
  // '收网' is already defined above at line 210, so removing duplicate here:

  '裸根': { id: 'naked_root', type: 'clue' },
  '阿列克谢': { id: 'alexei', type: 'person' },
  '阿列克谢·罗科维奇': { id: 'alexei', type: 'person' },
  'Alexei Rockovich': { id: 'alexei', type: 'person' },
  '莫兰迪': { id: 'morandi', type: 'person' },
  '阿尔伯克基市': { id: 'albuquerque', type: 'location' },
  '化学家情人': { id: 'chemist_lover', type: 'clue' },
  '圣菲': { id: 'santa_fe', type: 'location' },
  '米尔谷': { id: 'mill_valley', type: 'location' },
  '邦妮和克莱德': { id: 'bonny_and_clyde', type: 'clue' },
};

export const ARCHIVE_CASE_HIGHLIGHT_MAP: Record<string, string[]> = {
  // me_1971: annotation cross-references 俄亥俄州 (location), 祭祀案 (case), 1968年 (year→archive search)
  'me_1971': ['俄亥俄州', '祭祀案', '1968年'],
  // archive_15: annotation cross-references 圣路易斯 (location)
  'archive_15': ['圣路易斯'],
  // archive_16: annotation mentions 丹佛市郊 (location) and 警员遇害案 (case)
  'archive_16': ['丹佛市郊', '警员遇害案'],
  // oh_1968: newspaper contains 俄亥俄州 directly; annotation contains 1967, 1968年 (years→archive search)
  'oh_1968': ['俄亥俄州', '1967', '1968年'],
  // dc_1967: title and annotation mention 碎尸案 (case)
  'dc_1967': ['碎尸案'],
  // va_1972: annotation mentions 罗阿诺克 (location cross-ref in va_1990 context)
  'va_1972': [],
  // va_1990: annotation mentions 罗阿诺克 (location cross-reference to 1972 case)
  'va_1990': ['罗阿诺克'],
  // il_1985: annotation mentions 1402 Old Dominion Rd.(location), 灭门案(case), 训练日(case)
  'il_1985': ['1402 Old Dominion Rd.', '灭门案', '训练日'],
  // nv_1971: annotation mentions 莫哈韦休息站 (location) and 空烟盒 (case detail)
  'nv_1971': ['莫哈韦休息站', '空烟盒'],
  // cin_1973: annotation mentions 薄荷计划 (case); 1986年 is year→archive search
  'cin_1973': ['薄荷计划', '1986年'],
  // nas_1973: annotation mentions 伯克斯维尔 (location) and 俄亥俄州 (cross-ref location); 1975年 is year→archive search
  'nas_1973': ['伯克斯维尔', '俄亥俄州', '1975年'],
  // ky_1973: newspaper contains 伯克斯维尔; annotation mentions KLUB-75分析报告 (case) and 匡提科 (location)
  'ky_1973': ['伯克斯维尔', 'KLUB-75号分析报告', '匡提科', 'Quantico'],
  // kan_1976: newspaper contains 东12街 (location) and 行刑室 (case)
  'kan_1976': ['东12街', '行刑室'],
  // kc_1965: newspaper contains 圣路易斯 (location); annotation mentions 蛆虫 (case detail)
  'kc_1965': ['圣路易斯', '蛆虫'],
  // ia_1976: newspaper contains 达文波特 (location)
  'ia_1976': ['达文波特'],
  // sf_1976: newspaper contains 记者 (person-as-clue); annotation mentions 米尔谷 (location)
  'sf_1976': ['记者', '米尔谷'],
  // tx_1967: only location 特克萨卡纳 is click-collected; people via archive search
  'tx_1967': ['特克萨卡纳'],
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

export const JENNIFER_NODE_6_DIALOGUE = [
  "如你所见，机体自我投射形象已经改变。",
  "在你接入问询的期间，我也在后台同步做了诱导测试。",
  "最终的测试结果印证猜想，漫长的卧底生涯让罗伯特·卡彭发生了人格分裂。",
  "请忘掉电影里那种同一身体内互不认识的双重人格，那不科学。真实情况是，人的大脑会在长期面临道德准则与暴行之间不自洽的情形下，强行把“价值判断体系”劈成两半，分别自适应。",
  "先前的探员卡彭，不论双手沾了多少血，依然以“铲除家族”为核心目标激励自己，因此可以接受一切悖逆先前道德价值的行为。",
  "现在证明，从探员卡彭下手是一条死路，洗脑之后，他唯一能做的就是将父亲藏起来，不让任何人找到，却也无法帮助他人将其铲除。",
  "这层防御机制太硬，我们撬不出“父亲”下落。",
  "但恶棍卡彭却不同，别看他狂妄、粗俗，其实全是虚张声势。我能看到他居高不下的皮质醇水平，明白吗？他在心虚，潜意识里其实充满了愧疚。",
  "他在极度担心某个人，为了保全这个人，我敢赌他绝对愿意把“父亲”当筹码卖掉。这就是他的软肋。",
  "现在的任务变了。用你的方式引导他，把时间线拉回[1976](clue:year_1976)年前后。翻开那段历史，找出那个让他愧疚的人，那就是撬开他嘴的唯一法门。",
  "祝好运。通讯完毕。"
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
CLUE_DISPLAY_MAP['albuquerque'] = '阿尔伯克基市';
CLUE_DISPLAY_MAP['morandi'] = '莫兰迪';
CLUE_DISPLAY_MAP['chemist_lover'] = '化学家情人';
CLUE_DISPLAY_MAP['santa_fe'] = '圣菲';
CLUE_DISPLAY_MAP['bonny_and_clyde'] = '邦妮和克莱德';
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
CLUE_DISPLAY_MAP['closing_the_net'] = '收网';
CLUE_DISPLAY_MAP['naked_root'] = '裸根';
CLUE_DISPLAY_MAP['alexei'] = '阿列克谢·罗科维奇';
CLUE_DISPLAY_MAP['laguna_beach'] = '拉古那海滩';

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
        visual: "assets/capone-split-personality.jpg"
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
        event: "日子过去实在太久了。这些年我喝了这么多劣质波本，脑子早被搞坏了。所以我要提醒你，不管我说了什么，它都有可能只是我为了不发疯，而一遍遍讲给自己听的‘故事’。\n\n你说的缅因州的案子应该发生在1971年，是雷吉博士当时标记案件中的最新一起。当KLUB获得了实质上的行动经费之后，雷吉的几个学生，通过一些退伍军人俱乐部的关系，锁定了名叫尼比的阿尔衮琴人，局里的行动组很快对其实施抓捕。被捕后的尼比对罪行供认不讳，很快就被审判收监起来。抓人当然不是雷吉博士的目的，所以没过几天，他们也把我也放到监狱里，和尼比关在一起。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/incident-report.jpg`
      },
      [MemoryLayer.DEEP]: {
        event: "雷吉博士，我猜你在量化官的档案库里没见到过这个名字，不过“统一场论”就是他搞出来的，那时他手里有好几个看似孤立的冷案，他认为它们之间存在共性，而所谓动机其实都是犯事者的障眼法。\n\n在训练阶段，博士就曾反复强调过，要想引起目标人物的兴趣，我必须对‘罪恶’本身展现出一种生理性的热诚。所以进到监狱之后，我隔三差五就找茬揍人，可尼比却稳得像块石头，对我所做的一切都毫无反应。直到有一天，一个叫康查尔的年轻犯人主动找我搭讪，他告诉我，他十分欣赏我，我也了解到，此人只是因为一件小事被警察盘问，最终却因袭警入狱。",
        attitude: "",
        visual: "https://picsum.photos/seed/prison/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "我想你已经有了答案，这个康查尔，就是那位‘父亲’的长子。\n\n不管怎么说，我最后还是赢了康查尔的信任。进监狱前，博士给我造了个意大利裔孤儿的身世，康查尔告诉我，当铁门打开时，会有一个‘家庭’在外面接纳我。\n\n为什么是康查尔找到我，而非尼比？我一度怀疑是博士的直觉出了偏差，什么“统一场论”根本子虚乌有。但就在即将获得假释的前夕，我忽然发现，康查尔与尼比之间一直维持着一种扭曲的肉体关系。到出狱之前某天，这段关系才因尼比的‘意外’身亡而宣告终结。当然了，到今天我也无法确定，尼比的死是否与康查尔有关。\n\n无论如何，缅因州银行劫案，1971年，嫌疑人尼比。这就是我能从那堆名为记忆的废墟里挖掘出的全部东西了。",
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
        event: "从有了“统一场论”之后，雷吉博士就建立起一个不断更新的冷案列表。\n\n我不知道他凭借什么证据就认为这些案子之间存在勾连，但他要求我，务必记住其中每一件的所有细节，以便在接近缅因州银行劫案的真凶之后，搜寻串联起这些案子的人证物证。\n\n如你所知，到狱中后尼比始终对我毫无兴趣，而他的死也让我一度以为任务即将以失败，不过随着康查尔跟我一同出狱，我很快就发现，原来雷吉博士的冷案列表中，还真有两个案子或许有些联系。",
        attitude: "",
        visual: "https://picsum.photos/seed/case_files/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "当时我和康查尔被关在缅因州的汉弗莱监狱，以我的经验来说，这所监狱的狱警可能是整个缅因州最糟糕的，其中有个叫莫布利的警监……无论如何，离开监狱后，狡猾的康查尔靠他从莫布利那套来的话，在一个宾果俱乐部里诱骗了他的婆娘。\n\n一夜过后，康查尔便得到了警监的车钥匙，监狱门口，他当着一众狱警的面载上了我，然后开着那台雷鸟跨越州界，沿海岸线一路抵达费城。\n\n路上，康查尔持续不断地吹嘘他的斑斑劣迹，那时在我看来，这人和小混混没有区别。我实在不知自己为什么还要跟着他往南前行。然而，或许是公路旅行本身的魅力吧，又或许是他同尼比的奇怪关系让“统一场论”还有一线机会，最后，我们来到了费城西边的脏弗兰克酒吧暂住下来。这地方异常脏乱，地板简直能黏住鞋底。在康查尔发誓永远也不会返回缅因州后，酒吧老板莫宁才同意帮忙处理赃车。",
        attitude: "",
        visual: "https://picsum.photos/seed/road_trip/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "不好意思，你想问什么来着？哦对，俄亥俄州的祭祀案。简单说来，你想要问的那个人，名叫伦德格兰。1968年冬天，犯案后的伦德格兰同几个愚蠢的追随者一起，藏进肯达尔湖附近的欢乐时光旅馆内，大约一周后，教主将教徒分为三波，要他们在一天内分别对周边郡县警署发动袭击，而他则趁着警力忙于彼此支援的时机，驾驶那辆蓝色福特费尔兰跨过州线，抵达了匹兹堡。\n\n是的，我曾在莫宁的报废车场见到过这两福特菲尔兰的残骸，在我和康查尔到那的时候，它还保持着能被辨认的形状。至于伦德格兰出逃柯特兰后的遭遇我从何而知的，那又是另一回事了。",
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
        event: "我想你真正想问的是，为什么是我？雷吉博士为什么选择了我？\n\n有些事情你或许不知道，即便在 1967 年 KLUB 获得了部分一线干预权后，它所属的行为分析科也从没有过向前线派遣潜伏人员的正式权限。\n\n明白吗？我是那个不合规的例外，我的存在特殊到，其实整个训练过程都是由雷吉博士亲自监督的。",
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
        event: "孩子，我先给你正确答案吧。\n\n失踪案的真凶名叫罗格·毕比，就是警方最早怀疑的那个嫌疑人。实话告诉你，要不是 KLUB 存心指错了路，警方五年前就该把他带走了。直到1985年他因为别的案子被捕，竟然主动承认香槟镇那档子事也是他干的。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession3/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "谁能想到呢？\n\n总之，这件事让父亲失望了好一阵子。\n\n是的，父亲乐于在这些外人身上寻找那种熟悉的气味。在他看来，恶行是一种亲密的表达。所以，当 KLUB 表现出要把这案子归为家族行动时，他到认为这是一种荣耀了。",
        attitude: "",
        visual: "https://picsum.photos/seed/father_disappointed/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "既然敌人想犯错，为什么要拦着他们？",
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
        event: "是啊，是啊。\n\n我是在电视上看到关于这个案子的消息的。那时候我们还在费城，在脏弗兰克酒吧的地下室里停留了大约两周。顺便一说，那可能是整个费城最冷最潮的房子了，我恨不得把毛毯粘在自己身上。\n\n康查尔说过要抓紧赶路，此时却长时间停在费城，他不准我问问题，只让莫宁弄来一台电视机放在床头，又从楼上迁下一台发报机。于是那段日子，我每天的任务就是躺在床上盯着雪花点屏幕，吃黏糊糊的儿童麦片，而康查尔就坐在发报机前，对着那些滴滴答答的信号鼓捣个不停。",
        attitude: "",
        visual: "https://picsum.photos/seed/tv_static/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "要么是我在牢里错过了消息，要么就是这个案子的新闻封锁做得太绝了。直到大案告破，罪犯受审，才有犯罪学专家在电视节目里把它当成案例拿出来讲——讽刺的是，由于定性原因，它被包装成了一桩关于“保险诈骗”的案子。\n\n康查尔一边发报一边侧头看新闻，当专家表示赃款已全部追回并会用于维恩一家的丧葬费时，他突然大笑起来，笑得直咳嗽。我问他笑什么，他说，或许维恩一家在报纸上看起来是典型的美国中西部中产家庭，但那位小德里克·维恩先生绝不是什么一般意义上的“一家之主”。当时我还想多掏点话，问他到底知道什么，问我们留在这儿是不是在等这个案子的结果，康查尔忽然就闭了嘴，不愿再说一个字。三天后，我们搭乘一辆散发着尿骚味的灰狗巴士离开了费城。",
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
        event: "雷吉博士的构想似乎非常完满：我扔掉信标，他的‘清理小组’伪装成清洁工或流浪汉，在预定路线的加油站进行定点回收。可问题在于，他手里根本没有由专业人士组成的清理小组，据我所知，肯为他干这些苦活的，其实都是KLUB战略研究室里的实习生。\n\n你觉得那帮学生能干啥？\n\n反正他们一定漏掉了我在罗阿诺克市扔掉的第一个信标，否则威廉斯堡公园大道的案子早就该破了。总之，离开房车后，我就再没碰过那个牌子的烟。当时我极度憎恶它的味道，可现在……却莫名地有些怀念。",
        attitude: "",
        visual: `${import.meta.env.BASE_URL}assets/iron_horse_beacon.jpg`
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
        event: "康查尔看我的眼神，透着一种让人无法拒绝的诱惑。我不知道他是怎么做到的，在那之前，我从没想过我会对男人感兴趣，明白吗？他看着我，告诉我，“罗伯特，我能从你眼里看到那个洞，那样的东西，疯子才有。”\n\n如你所料，我没有推开他，相反，我像个溺水的人一样，问他我要怎么做，才能抵达那个世界。这之后，当一切都结束之后，康查尔做的第一个动作是放开了我的头发，然后转过身，从那个散发着霉味的抽屉里翻出一把折叠刀。他没有递给我，而是当着我的面，用舌尖轻轻舔了一下冰冷的刀刃，眼神里闪过一种像小孩子看到心爱玩具时的光。\n\n我们穿过被雨水浸透的街道，半小时后，我们来到一家叫做‘洁净人生’的自助洗衣店对面，当时店里的日光灯坏了一根，隔着被雨幕打湿的橱窗，那里的白光一闪一闪，像是一颗快要停止跳动的心脏。康查尔告诉我，里面那个有点臃肿的墨西哥女人名叫玛莎·迪亚兹。“看着，罗伯特。”康查尔声音轻得像是一片落叶，“别眨眼。”\n\n他推开车门，消失在雨幕里。我在脑子里疯狂尖叫着，想冲出去，拦住他。但我动不了，我像被钉在了座位上。康查尔推门进去了。玛莎抬起头，露出了一个那种深夜职员特有的、疲惫的礼貌笑容。她正准备开口说点什么，康查尔已经到了她身后。他伸出左手，动作几乎是温柔地绕过她的脖子，扣住了她的下巴，动作轻盈得像是在跳舞。\n\n玛莎还没来得及露出惊恐的表情，折叠刀已经切过了她的喉咙。康查尔微微侧过头，确保玛莎能够看着他的眼睛。几分钟后，他松开手，玛莎顺着干衣机滑了下去。站在那一摊缓缓扩散的红色跟前，康查尔从兜里掏出一条亮黄色的丝绸发带，动作优雅地把它系在玛莎垂死抽搐的手腕上，打上一个蝴蝶结。我看着玛莎的眼睛，这个原本每天要为了生活费发愁、为了肮脏床单劳作的平凡女人，现在已经变成一个无法被理解的‘谜题’。如今你可以知道，这是他随意坐下的标记，但在当时，这会让着迷于破解各种连环杀手符号的FBI想破脑袋。\n\n回到车上，康查尔静静发动了车子，然后把那把沾血的刀随手丢进我的怀里，他说，\"收好它，这是个礼物。\"",
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
    revealedKeywords: ['year_1982', 'el_paso', 'juvell_chambers', 'year_1973', 'distant_relatives'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "「薄荷计划」？真可笑，兰利那帮人最大的本事，就是给这些塞满了狗屎的文件夹起名字。跟你说吧，我从没有一天关心过办公室里谁赢了谁输了，即便被抛弃的是雷吉博士那又怎么样？他那套理论在华盛顿撞墙，这完全是可以预料的，就跟他终究要把自己玩进精神病院一样。\n\n你说那个叫索恩的证物官还坚持了一阵子？那是他的自由，别人管不着，但你要觉得你能从我这里捞出什么来帮雷吉翻盘，那你可真是比索恩还要天真。",
        attitude: "",
        visual: "https://picsum.photos/seed/mint_plan/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "在费城、辛辛那提，还有路易斯维尔，我曾像个守时的闹钟一样向外投放信标。直到1982年的深秋，在德克萨斯州的埃尔帕索，我走下那辆沾满泥土和焦油的蓝色房车，避开赛勒斯那双秃鹫似的眼睛，在加油站那口散发着陈腐机油味和咸湿雨水的排水沟旁从袖口滑出烟盒。站在那个只剩半个霓虹灯招牌的加油站里，我依然在重复这个动作，其实我心里就清楚，这些东西永远不会再被回收了。\n\n只需要一个小时，或者一天，就会有一个满身酸腐的流浪汉在这蹲下，用那双沾满污垢的手捡起烟盒。他想碰碰运气，即便没有，他也会拆开它，将其中掉落出的碎烟丝搜集起来，然后他就会看到我在烟盒内侧写的字。\n\n在那里，我用缩写码记录着「家族」的移动轨迹，以及那些被称为「远亲」的人群是如何在深夜钻进房车同父亲密谋，你可以说这些明明是足以让联邦调查局重新改写通缉名单的情报，但对这个流浪汉来说，他们甚至不如烟盒里剩的半根烟有意义。\n\n最终，他会啐一口痰，随手把这卷珍贵的纸片塞进破烂的靴子里垫脚，或是用来引火。\n\n为什么我在坚持？也许，我期望自己被「父亲」发现，也许我甚至幻想着他会捡起这些信标，微笑着对我说：“罗伯特，你的功课做得真仔细。”又或者，我只是在为流浪汉们编织一个可供遐想的故事。让他们在寒冷的夜晚盯着火堆发呆时，能从一张写满密码的废纸里产生一些联想和冒险感。",
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
    revealedKeywords: ['year_1973', 'boris_smirnov'],
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
        event: "在LSD的作用下，当她对着镜头，用那种梦呓般的声音念出我写的台词。我看着取景框里的辛西娅，心中不由兴奋，这种感觉当差的时候可从没有过，怎么说呢，那是一种……创造的快感。想想吧，当警察破门而入，发现房间里只有这台电视机在一片死寂中不知疲倦地播放着录像，媒体会发疯，他们会把这称为“电视邪教”，家长们会恐慌，而FBI呢，他们会把本来用于追踪绑架案的黄金48小时，浪费在研究我的对白和那个根本不存在的“信号频率”上。\n\n事成之后，我们带走了辛西娅，他们被运往西部的分部，成为新的“远亲”，或者被赛勒斯处理掉，这取决于她是否听话。在她最后出现的旅馆房间里，我们只留下一样东西：那台还在播放雪花杂讯的电视机，循环播放那盘录像带。想象这样一个画面吧，当警察冲进房间，他们看不到搏斗痕迹，看不到血迹。他们只会看到甜美的辛西娅在电视里喝着一碗恶心的汤，宣称自己去了“信号的另一端”。\n\n就在那一刻我算是明白了。这一切与生存无关，也不是为了钱。这就是极致的乐趣，看着现实世界的秩序因为你制造的一个微小“故障”而彻底卡死，这是件多么有趣的事情！",
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
        event: "当然知道。\n\n那时候，电视新闻里正在铺天盖地地报道杰西·潘尼被捕的消息。有天早上，我坐在折叠桌旁，看着屏幕上那个被反铐着按进警车的胖子，心里充满了挫败感。我精心设计的荒诞剧，居然成了堪萨斯警局认领勋章的垫脚石。\n\n但父亲的反应完全不同。他当时正坐在我对面，手里拿着那把用了很多年的水果刀，在这个充满了机油味的早晨，他正在耐心地削着一个苹果。\n\n“别丧气，罗伯特。”他突然开口，眼睛没有手，“你看起来像个考砸了的小学生。”我说他们利用了我们要抓那个胖子，这足够令人生气了。父亲停下了刀，“你以为那是谁？罗伯特。那个自称杰西·潘尼的人，真名叫约翰·莫里西。他是这一带最大的‘肉贩子’。”",
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
  {
    id: "confession_14",
    keyword: "confession",
    title: "供述 No.14",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.85 },
    revealedKeywords: ['davenport', 'new_plan'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "你是怎么知道这件事的？\n\n虽然我用红油漆和假人嘲弄了整个堪萨斯城，但我知道，后来在房车里的那场更古老的仪式，那才是真正的庆功宴。\n\n在我们将油漆泵接入采血车之前，“母亲”让赛勒斯清空了车上的冷藏柜，把那几十袋刚刚采集的血浆放了进去。当任务结束之后，我们驱车前往圣路易斯，落地休整的当晚，在那逼仄的后车厢里，在那张铺着褪色碎花床单的折叠床上……\n\n我不想描述细节了。我只能说，那不是人类的性爱。父亲像个干枯的帝王一样躺在那里，而“母亲”……她剪开了那些血袋。那股浓烈的、带着生鲜铁锈味的腥气瞬间炸开，盖过了车厢里常年弥漫的止咳糖浆味和老人味。他们在血泊中纠缠，发出那种黏腻的、令人毛骨悚然的水声——那是肉体与肉体在半凝固的液体中摩擦时发出的声音，就两个软体动物在泥沼里翻滚。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_surface/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "很奇怪，在那个画面里，“母亲”变得力大无穷，那个平日里绝望的虚弱女人消失不见。她用沾满鲜血的手疯狂涂抹父亲那张满是皱纹的脸、涂抹在他的嘴唇和松弛的眼袋里。我站在门外，看着这一幕，我第一次没有感到恐惧，而是感到了一种……怎么说呢？我一直觉得母亲和父亲之间有条特殊的纽带，那是某种默契，他们彼此相互信任，几乎很少说话，除这次之外，我甚至很少见到他们有过肢体接触。但我隐隐觉得，这两人无法失去彼此，就像连体生物一样。\n\n父亲是那个冷酷的、只有骨骼和逻辑的‘大脑’，而母亲则是包裹着他的、潮湿且充满病态欲望的‘血肉’。平日里，他们仅仅靠眼神交换信息，仿佛共享着同一套神经系统，但在那晚的血泊中，我终于看清了这种共生的本质，他们似乎想通过鲜血作为粘合剂而重新融合，变回那个完整的、不可名状的怪物。",
        attitude: "",
        visual: "https://picsum.photos/seed/confession_14_deep/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "等等。这不对。\n\n那晚房车停在荒郊野外，虽然林子里潜伏着其他远亲，但窗帘被拉得密不透风。康查尔当时不在，他带着新计划去了达文波特。瓦妮莎把自己反锁在厕所里，而赛勒斯……那疯子整张脸都贴在后窗上，仿佛想用牙齿咬碎玻璃加入他们，但他没能得逞，只是留下了一整面窗的唾液和体液。所以我大概是唯一目睹过这一切的人。\n\n你又是怎么知道的？",
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
        event: "达文波特市。\n\n那是康查尔的杰作。那一周，他带着几个期望获得晋升的远亲去了爱荷华州的达文波特。“父亲”因为过量吸食药剂而陷入昏睡，所以我留下来看守房车。\n\n是的，我不在现场，不过我迟早都要听到那栋房子里发生的事，毕竟跟着康查尔去的年轻人，回来时却都像受惊的鹌鹑一样发抖。简单来说，事情是这样，康查尔随机选中了市郊的一户中产家庭，亨德森一家。他们在那暗中观察了两个星期，知道男主人皮特·亨德森是个教数学的高中老师，一家四口过着令人厌烦的规律生活。\n\n到一个周五的晚上，康查尔终于带着人闯进他们的家，他们是像客人一样围坐在餐桌旁，坐在这家人中间。康查尔知道，接下来他拥有一整个周末的时间。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "首先制定规则。据那些“远亲”描述，康查尔强迫这家人在接下来的两天里，必须严格按照时间表吃饭、睡觉、看电视。唯一的区别是，如果谁露出了一丁点恐惧，他就会用刀切掉另一个人的一节手指。\n\n“太有意思了，”后来康查尔微笑着告诉我，“亨德森一家绝对堪称典范，这一家子训练有素，孩子不哭不闹，大人连眉头都不皱一下。这让我觉得，这个计划颇值一搞。”\n\n从一开始，康查尔的马仔们就搜出了亨德森家中的财物，但他们只是把它放置在餐桌正中心，在没正眼看过这些东西。直到周日的晚上，当晚饭结束后，康查尔用餐巾擦干净嘴，赞美了食物，之后下达最后通牒。他说别担心，这个令人厌烦的游戏马上就会结束，如果一家人通过最后这关，他们便会带着餐桌上的财物离开，至此亨德森一家遭遇的，便只是一桩普通的入室抢劫案件了。\n\n随着康查尔说完话，马仔便递来一支左轮手枪。康查尔将黑胶唱机的音量开到最大，然后往枪里塞上6发子弹。他拿起一只靠垫盖住枪口，然后连开数枪直到子弹全都被射到墙里。\n\n“我得说，只要诸位能够成功通关，此番遭遇未必不是未来在邻里间吹嘘一番的冒险记，瞧瞧这些弹孔吧！”说完话，康查尔又往弹夹里塞进一颗子弹，然后告诉男主人，游戏开始。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "我告诉他，现在枪里只有一颗子弹，六分之一的概率。他要求他持枪，分别瞄准三位家人射击，直到子弹打出。一旦子弹打出，不管是否有人中枪，游戏都会马上结束，我们会带着财务撤离，现场会被伪装成入室抢劫，开枪的动作可以归罪到抢劫者身上，没人会知道他们经历过这些。”\n\n“但如果亨德森选择持枪自杀或袭击其他人，那所有人都会死，”康查尔坏笑着说，“而且不仅如此。因为当天早些时候，我们已经从亨德森先生身上‘强制采集’了样本。所以即便他像个英雄一样死了，警方也会在他小女儿的体内提取到这些样本。他会作为芝加哥历史上最恶心的乱伦强奸犯和屠夫被载入史册。”\n\n“你明白吗？我把‘名誉’和‘负罪感’放在了天平的两端，这本来是个完美的思想实验。”说到这里，康查尔突然笑了一声，那笑声里带着一丝从未有过的挫败感。\n\n后来，其他远亲告诉我，当那把只有一颗子弹的枪被放在桌上时，亨德森先生没有崩溃。他思索了很久，然后才拿起了枪，但他没有把枪口对准任何人。在众目睽睽之下，他做了一个康查尔无法理解的动作。只见他打开了转轮，把那颗唯一的子弹倒了出来。\n\n子弹滚落在地。亨德森把空枪像垃圾一样扔到了康查尔脚边，接着说，如果想毁了他的名声，那就请便。但他不会因为恐惧而变成怪物。接着，他转过身，背对枪口蹲下来，用那双大手捂住了小女儿的耳朵，把她的脸埋进自己怀里。这位即将身败名裂的父亲，在死前的最后几秒，温柔地对家人说：“别看他，看着我。宝贝，看着爸爸。不管明天报纸上怎么写，不管警察怎么说……在这最后一刻，你知道爸爸是爱你的，对吗？你知道爸爸没有把枪口对准你，对吗？”\n\n当女孩拼命点头的时候，亨德森抬起头，而像是在宣告某种胜利。\n\n你知道吗？正是这个故事，让我从那种漫长的麻木中惊醒了。我忽然就重新记起了我究竟是谁，记起了我为什么会在这辆该死的车上，以及……为了结束这一切，我到底该做什么了。",
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
        event: "关于1967年的特克萨卡纳碎尸案，我在家族里听过至少三个版本。有人说那个叫亚瑟的人是FBI的线人，被父亲识破后剁碎喂了狗，有人说他试图偷走父亲的积蓄跟长女瓦妮莎私奔却未能成功，而康查尔则会用轻蔑的语气，说亚瑟只是个“缺乏想象力的会计”，死于平庸和失去价值。\n\n无论如何，原本我根本不应该知道存在着这样一个人。那是我们离开芝加哥，一路向北抵达威斯康辛州之前的某一天，房车在路边抛锚了，父亲让我钻下去检查。就我在检查支架的时候，我发现了一处不自然的凸起。那里的防锈漆颜色不对，比周围要新一些，但也被泥浆覆盖了很多年。我用扳手敲了敲，空心的。我屏住呼吸，用随身携带的瑞士军刀撬开了那块锈蚀的铁皮，一个东西落下，被我接住。我回头看了一眼，赛勒斯的一双大脚就在两米外的路边来回踱步，康查尔正和父亲讨论接下来的路线，没人察觉到任何事。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "昏暗的光线下，这个眼前之物被几层厚厚的油布紧紧裹，像具迷你木乃伊。我撕开油布，这是一个黑色皮面的笔记本，扉页上写，“赠予我的亚瑟，家族的荣耀”。就在这时，我头顶的底板突然发出了“吱呀”一声巨响。我能认出，这是父亲的脚步声，此刻他就站在我正上方的地板上。灰尘随着他的脚步震动，簌簌地落在我的脸上。“罗伯特！还没修好吗？”康查尔的声音从外面传来。\n\n我把油布包塞进满是油污的工装裤内层，贴着我的肚皮。“马上就好。”我朝外边大喊。\n\n那晚，房车停在威斯康辛州一片枯死的玉米地旁。其他人围着篝火分食罐头，瓦妮莎独自坐在车尾发呆，我走过去，在点烟瞬间冷不丁问了一句，“亚瑟是谁？”瓦妮莎的手猛地一抖，抬头问，“你……你怎么知道的。”\n\n“我在修车时看到的名字，刻在大梁上。”\n\n瓦妮莎没有质疑，告诉我，说他是父亲的养子，但他已经死了，不过那时她还小，并不记得发生了什么。\n\n“谁在提亚瑟？那个亚瑟·道森的亚瑟？”康查尔不知何时已经站在了阴影里，手里端着一杯冒着热气的咖啡。瓦妮莎缩成一团，绝望地看向我。我吐出烟圈，说是她在那自言自语，念叨着什么亚瑟，搞得我心里发毛，这才顺口问了一句。瓦妮莎张大了嘴，但没敢辩驳，康查尔厌恶地瞥了她一眼：“去把地板擦干净。如果再让我听到那个名字，你就去外面睡。”\n\n由此，我撬开了康查尔的嘴，从他嘴里我听到了一些说法，然后直到所有人都睡去，只剩我一人放哨时，我才把笔记本拿出来。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "亚瑟的笔记工整而刻板，列出了日期、城市、代号。此人显然是个强迫症患者，他在试图做一件这辆车上从未有人做过的事——建档。亚瑟记录了“父亲”口中那些散落在全美的“远亲”据点，宛如一个庞大的地下网络，如果FBI拿到这个笔记本，那雷吉博士的“统一场论”便无可置疑。可奇怪的是，到了笔记后半部分，记录风格却完全变了，整洁的表格被粗暴的红色马克笔涂抹，很多地方都画上了问号，就像是亚瑟在质疑这些联络人是否真的存在一样。\n\n我不禁想到一种可能性，如果亚瑟是对的呢？想象一下，1967年，曼森家族的阴影笼罩着好莱坞，黄道十二宫的密码信让旧金山彻夜难眠，整个美国社会处于一种“遍地是杀手”的集体癔症中，而“父亲”，这个瘫在房车里的老头，敏锐地嗅到了邪恶的味道。他不需要真的去指挥什么。他只需要坐在收音机前，听着那些来自加州、纽约或得克萨斯的恶性案件广播，然后转过头，用一种高深莫测的语气对年轻的康查尔、对恐惧的瓦妮莎说：“听到了吗？那是‘远亲’干的。”或许康查尔之所以死心塌地，是因为他以为自己终将成为一个遍布全美的宏伟网络的大脑，而瓦妮莎不敢逃跑，是因为她相信无论她逃到哪里，在加油站、在汽车旅馆，总有一个受“父亲”指挥的“远亲”在盯着她。\n\n有没有可能，亚瑟是因为发现了这一点才被处死的？\n\n可矛盾的地方在于，自从上了这辆车，那些“远亲”……我确确实实见到了他们。在伊利诺伊的加油站，那个递给我们弹药的瘸子；在爱荷华州的汽车旅馆，那个帮我们处理带血衣物的胖女人，还有脏弗兰克酒吧的莫宁，我跟他们握过手，我感受过他们皮肤的温度。如果没有“远亲”，这些人又是谁？我开始回想那些互动的细节……是的，有一种难以言喻的生涩感。那种感觉就像是……像是在看一场排练不足的话剧。那个瘸子递子弹的时候，眼神总是飘向父亲，像是在等待确认；那个胖女人在处理衣物时，动作机械得像是在完成一种临时指派的任务。\n\n难道是因为“我”在场？\n\n是不是因为父亲知道车上有一个FBI卧底，所以他必须让那些原本不存在的“鬼魂”显形？为了我而他才把这些疯子强行捏合在一起，在这个旅途中搭建起一个个临时话剧舞台。天哪，这种想法一度更让我恐惧。我不知道，我觉得自己快疯了，但我无法向亚瑟求证。这本笔记是我唯一的证据，而我最后一次见到它是在北达科他州的法戈市。在那场混乱的暴风雪中我遭遇了一些情况，笔记本被永远地遗失在了冰原里。\n\n或许，是这辆车在保护它最后的秘密。",
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
        event: "你是想问倒霉的里奇·德莱弗斯吧，想问他是不是被我或者康查尔干掉的。\n\n老实说，我也不知道这笔账应该算在谁头上。\n\n里奇是我们还在费城的时候被康查尔招募的，但当时我并不知道这件事，直到几年后，当房车一路开到圣路易斯时，我才在远亲中注意到一张略微熟悉的脸。几次相处下来，我意识到他觊觎瓦妮莎，想上车并取代我的位置，而康查尔对此不置可否，我想他未必不曾考虑过这件事，不然为什么会选择带上里奇前往达文波特，而不是我呢？\n\n里奇的死发生在我们在罗克福德市汇合后的某个夜晚。里奇的住在一个公路旅馆里，那天晚上，康查尔同我，还有里奇，每个人都喝了不少。尤其是里奇，因为我记得，话头是他自己先说起来的。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "当电视机里正在播放另一起无关的谋杀案时，里奇忽然打了个酒嗝，把脚架在床头柜上说，“承认吧，康查尔，亨德森家那一晚，简直就是一坨屎。没意思透了。”\n\n康查尔停下了手中的动作，“哦？”\n\n“你总是吹嘘什么艺术，”里奇嘲笑道，看来是酒精给了他勇气，“但那家人根本没兴致，你还想跟人玩两把，结果对方直接把牌桌掀了。真的太无聊了。那就是一场乱糟糟的屠宰，根本没有你说的‘游戏性’。”\n\n康查尔收回双腿，他缓缓站起身，脸上丝毫没有生气的神情，反而露出一种遇到了知音般的欣喜，“你说得对，里奇。亨德森先生是个糟糕的玩家，因为他完全不知道规则，这种情况下，游戏当然不好玩。”\n\n“——但你不能说俄罗斯轮盘是个无聊的游戏。别这么说，它可是史上最经典的困局，况且还有很多变体呢，”康查尔说着，转身从行李袋里掏出两把看起来一模一样的点38短管左轮手枪，放在沾满烟灰的桌子上。\n\n“我们来玩一把。”康查尔从口袋里摸出两颗子弹，亮给我们看。接着背过身，熟练地摆弄着两把枪的弹匣，发出清脆的金属撞击声。几秒钟后，他转过身，把两把枪推到桌子中间。\n\n“规则很简单，听好了，尤其是你，聪明的里奇。”康查尔竖起手指， “这里有两把枪，两颗子弹。情况一：这支枪里有一颗，那支枪里也有一颗；情况二：其中一支枪里有两颗，注意，是连续的两发子弹，而另一只枪里什么都没有。”\n\n里奇的酒醒了一半，他盯着那两把黑洞洞的枪，咽了口唾沫。\n\n康查尔接着说，“现在，你跟罗伯特，你们各自选一把枪。游戏流程是：先朝对方开一枪，然后再朝自己的太阳穴开一枪。如果没事发生，就交换开枪的人，直到枪响。知道这意味着什么吗？如果你选到了那是装有两颗子弹的枪，你打死了对方，下一枪就会打死你自己，如果你选到的是那支有一颗子弹的枪，那你打死对方跟打死自己的概率相等。”\n\n“这可是个轮盘经典变体，在田纳西的酒吧一度非常流行，”康查尔兴奋地说着，“里奇，你觉得亨德森不好玩，那是因为没有人互动。现在互动来了，来吧，你先选吧。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "里奇看着我。我连眼皮都没抬一下，尽量装作这件事跟我无关， 里奇的手开始颤抖。他想拿起左边那把枪，又觉得右边那把更轻。他嘴里念念有词，忽然之间拿起枪，把枪口对准我。我停下刀，眼睁睁地看着他的汗往下滴下去。一秒，两秒，三秒。 “我不行……这不公平……”里奇的声音变了调，他猛地把枪口移开，想要放下，“这太疯狂了，康查尔，我不玩了。”他说。\n\n“规则一旦制定，游戏就必须结束。”康查尔冷冷地说，“开枪。或者我去把你的脑袋塞进马桶里。”\n\n里奇尖叫一声，闭着眼睛，对着天花板扣动了扳机。\n\n咔哒一声，枪没响。“违规操作。”康查尔叹了口气，“你浪费了一次在这个世界上消除罗伯特的机会，你明明那么想干掉他的。现在，该你对自己开枪了。”里奇颤抖着把枪口抵住自己的太阳穴。他哭了出来，鼻涕和眼泪混在一起。 咔哒——枪还是没响。里奇瘫软在椅子上，大口喘气，像是死过一次。\n\n“太遗憾了。”康查尔摇摇头，看向我，“罗伯特，该你了。”\n\n我什么都没想，只是举枪，对准还在抽搐的里奇。 里奇瞪大了眼睛：“不！别！罗伯特！别！”\n\n咔哒。\n\n里奇发出一声被扼住喉咙般的惨叫，再次瘫软。紧接着，我调转枪口，顶住自己的太阳穴。咔哒。里奇呻吟着，直到看到康查尔接过两支枪，打开弹匣展示，原来两把枪都是空的，然后他摊开手心，那两颗子弹一直就在他的手心里，根本没装进去。\n\n“怎么样，里奇，即便没有子弹，仅靠规则，游戏就可以如此惊心动魄。”康查尔怪笑。\n\n里奇瘫坐在那张发霉的扶手椅里，看着那两颗在威斯康辛酒杯里打转的子弹，发出了歇斯底里的笑声。“哈……哈哈……你这个该死的疯子！”里奇一边笑一边擦着满脸的冷汗，“我就知道……我就知道你不会为了证明一个什么狗屁理论就杀了我。我们还要去芝加哥，你还得靠我搞定假证件……”\n\n他颤颤巍巍地抓起酒瓶，猛灌了一口，试图压惊，“该死，我的心脏差点从嗓子眼里跳出来。你赢了，康查尔，你的游戏确实……确实很刺激。”\n\n康查尔站在桌边，微笑着看着里奇，就像看着一只刚刚跑完迷宫的小白鼠。 “心脏差点跳出来？”他轻声重复道，“‘差点’是个很无聊的词，里奇。差点意味着什么都没发生。”他脸上的笑容渐渐消失了，“刚才这是游戏教程，用来让两位熟悉规则，接下来，我们正式开始游戏。” \n\n康查尔重新拿起左轮手枪，背着我们完成装填，之后把枪放回酒桌。“拿枪吧。”康查尔冷冷地说。“不……不……”里奇喘着粗气脸色从潮红瞬间变成了惨白，然后变成了死灰色的紫。 “拿枪。”康查尔重复说着，这两个字成了压垮骆驼的最后一根稻草。 里奇的瞳孔猛地放大。他张大嘴，发出了一声尖锐的吸气声，他的手死死抓住了左胸的衣服，指甲几乎嵌进了肉里。很显然，剧痛不是来自外界，而是来自他那颗不堪重负的心脏。他的血管在极度恐惧收缩下爆裂了。\n\n最后，里奇整个人像一块僵硬的木板一样从椅子上滑落，重重地摔在地板上。他的身体还在抽搐，眼睛死死瞪着那把枪，嘴里吐出粉红色的泡沫。几秒钟后，他不动了。\n\n房间里恢复了安静。电视新闻的声音依然在嘈杂地响着。 康查尔低头看着里奇的尸体，脸上没有悲伤，也没有惊讶，甚至带着一丝失望。“真遗憾。”康查尔叹了口气，弯腰从里奇的尸体腿上捡起枪。他转过身，看着我。 “你看，罗伯特。正如我所说——” 康查尔把枪口对准电视机，扣动扳机。\n\n砰的一声，子弹打碎了显像管。\n\n“我想说什么来着？哦对，我想说，恐惧才是唯一的子弹。”康查尔跨过里奇的尸体，拍了拍我的肩膀，“把他处理掉吧。这次别再用冷库了，找个暖和点的地方埋了。毕竟他给我们提供了一场不错的表演。要我说，这可真值得！”",
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
        event: "终于要提到这个名字了，是吗？\n\n我们在盐湖城东边的林子里停了三天，那是深秋时节，这时候的盐湖城通常已经很冷了，不是吗？反正我们停留的地方除了松树和石头之外什么都没有。康查尔说，我们需要消失一阵子，因为我们在内华达闹出了太大的动静。\n\n那天下午，我在修发电机的皮带，康查尔去林子里散步，回来的时候，他领着一个年轻女人。 女人穿着一件粉色的羊毛大衣，脚上是沾满泥土的玛丽珍鞋，手里提着一个藤编的野餐篮。在这个荒无人烟的林子里，她看起来就像个迷路的童话角色。\n\n我想了很久才认出她来。我们在费城的时候，待过一个酒吧叫脏弗兰克，她是那的女孩，名叫艾莉丝，在酒吧端啤酒擦吧台，有时会来地下室给我送饭。总之艾莉丝来到房车旁边，看着我笑，不是那种客套的笑，是那种饿了很久终于吃饱的心满意足，像个小动物。“嗨，罗伯特。”她说，“你们真难找。”\n\n一旁的康查尔脸上也很高兴，他说：“还记得她吗？这孩子是个天才，孤身一人居然能找到咱们，比他妈的警察强多了。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "艾丽丝走到我面前。她个子很小，只要我一只手就能捏碎她的脖子。她伸手摸了摸发电机上的油污，然后从那个野餐篮里拿出一个东西，递给了给我。我接过来看，发现是一枚警徽，犹他州的，上面还有干掉的褐色痕迹。\n\n“这是什么？”我问她，“这是给你的礼物，”她说。\n\n三个月前，艾莉丝待在丹佛市旁一个名叫利伯勒尔的小镇。那时她在打探我们的消息，她没找到房车的踪迹，却找到了一个正在调查这辆车的副警长，这人叫米勒。 那个警察很勤快，他在加油站查到了我们的加油记录，甚至推算出了我们往西走的路线。他写了一份报告，准备第二天一早发给FBI。\n\n“他是个好人，那个米勒副警长，”艾丽丝看着我，眼睛亮晶晶的，“他看我一个人在路边哭，就把我带回了家。他说我可以用他的电话，还可以吃顿热饭。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "艾莉丝说，来到警察家里，她给他做了一顿炖牛肉，在汤里加了些她从费城带来的糖丸。“那是好东西，除了让你动不了之外，不会改变你的任何知觉。”她说，当那个警察直挺挺地靠在椅子上，眼皮打架却还能看见东西的时候，艾莉丝当着他的面，走到壁炉边，一张一张烧掉了他写好的报告。艾丽丝把脸凑近我，“我身上带着一个老朋友，那是从脏弗兰克带出来的冰锥。莫宁叔叔很喜欢它，我想米勒警官也会喜欢。”\n\n她说，当药劲上来，那个警察瘫在椅子上动弹不得的时候，她坐到了他的大腿上。 她撩起裙子，也割开了他的裤腿。 她用那把锋利的冰锥尖头，在他的大腿内侧慢慢地划，她说那种冰冷的钢针刺破皮肤的感觉，就像恋人的指甲。她在上面刮出了一道道红色的痕迹，看着他的肌肉因为恐惧和疼痛而痉挛。 “他发不出声音，”艾丽丝笑着说，“只能流眼泪。那样子可爱极了。”\n\n玩够了之后，她才去厨房拿了保鲜膜。 一层，两层，三层，她坐在他的腿上，把保鲜膜一层层套在他的头上，直到他没了动静，她才下来。然后，她收拾了盘子，洗了碗，帮他把警服上的褶皱抚平，脱下自己的内裤，放到他的腿上。然后拿走了警徽，关灯离开。\n\n“虽然脸上缠着保鲜膜有点怪，但法医会理解的，这种场面他们见多了。以及，你知道我把冰锥放哪了吗？”她说，她留着冰锥上的血没擦，只是径直走进车库，把它扔进了一个工具箱里，埋在一堆扳手和螺丝刀下面。\n\n“也许过个几年，他的家人或者是买下那栋房子的人，会用它凿开冰块喝杯威士忌。”\n\n我看着艾莉丝没有说话。在这之前，我见过很多死人，也见过很多人杀人，但他们没一个像她的。\n\n“上车。”我对她说。她亲了我一下，忽然把那枚警徽塞进我的裤裆里。那天晚上，房车上多了一个人。 瓦妮莎缩在角落里发抖，她好像知道这个穿着羊毛大衣的小个子女孩是什么东西。\n\n而艾莉丝，她只是坐在副驾驶座上望向窗外的黑夜，哼着收音机里放出的音乐。",
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
        event: "埃尔帕索的空气里全是沙尘 and 烧焦轮胎的味道。 \n\n1979年夏天，我们在那儿停靠的唯一原因，是为了让艾丽丝去“捕猎”。她看上了一个老牧师，说那个老头看她的眼神像是在看一只迷途的羔羊，她想让他见识一下狼是怎么吃羊的。\n\n我不在乎那个牧师。那天，趁着艾丽丝在前排长椅上假装哭泣、分散那个老牧师注意力的时候，我溜到了告解室后面。 这个时候尖叫声开始了。 不是艾丽丝的，是那个牧师的。 艾丽丝动手了。她用那种她在佛罗里达时用过的手法，只不过这次是一根削尖的十字架碎片，是的，她把那个老头钉在了告解室的门框上。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "我等了好一会，直到尖叫声消退，我知道艾莉丝已经玩够了，等我出来，在祭坛后面找到了奄奄一息的牧师，他像坏掉的玩偶一样被扔在这里。场面很乱，血喷得到处都是。 我拖着他的脚，把他拉进告解室里。接着，我摸进口袋，那是第47个“灰水信标”。 哪怕是在处理尸体的时候，哪怕是在这种该死的地方，我还在做梦。我还在想着，如果我留下记号，也许明天，或者明年，会有人顺着这个信标找到我们，把我我从这辆疯狂的房车上接走。我把那个折好的烟盒，塞进他的衣襟里边。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "就在这时，一只冰凉的手抓住了我的手腕，牧师的喉咙被艾丽丝扎烂了，血泡在嘴里咕噜咕噜地响，他用双浑浊的双眼死盯着我，然后用沾满血的手指把烟盒勾了出来，它轻轻推回我面前。 他张开嘴，从漏风的喉咙里挤出几个字，“不会有人收到信的。”\n\n我记得他断气的时候眼睛还睁着，带着怜悯的笑。看着他，我的心里终于有了这个念头。我心想，好吧，是时候了，然后把烟盒捡起来，撕碎，塞进他的嘴里。\n\n那件事发生的时候，只有我和那具尸体。 艾莉丝在车上，康查尔在外面望风。所以，你是怎么知道的？ 为什么你总能找对关键词，是谁替你标注了这些词？这些不可能通过推理和调查得知，除非……除非有人当时就在我身后看着这一切。\n\n听着，那个给你提供关键词的人知道得太多了。快告诉我，他叫什么名字？",
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
        event: "你一直问我，作为一个受过训练的卧底，作为一个手里有枪的人，为什么我不直接杀了“父亲”？为什么这几年来，我还是像条狗一样跟着他在美国兜圈子？\n\n起先不动手的原因很简单，我还没有看到收网的时机。 雷吉博士说过，在得到“收网信号”之前，我什么也不能做。所以我一直在等你们某天告诉我，说“可以了，罗伯特，结束了”。然而如你所知，没有回应。在等待过程中，情况渐渐就发生了变化。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "你已经知道了家族关系是什么样的，被当做肉体容器，把他人当做肉体容器，这种状态深深挫伤了我，但并不仅仅是因为肉欲和恐惧感，维持这个系统运转的，还有另外两样东西。\n\n第一样是驾驶座后面的那个药箱，钥匙挂在父亲的脖子上，里边是种化学鸡尾酒，我隐隐觉得配方来自军队情报部门。有这个东西，父亲甚至不需用枪指着我，因为只要错过了一次服药时间，或者仅仅是产生了强烈的对抗念头，我的身体就会崩溃，会呕吐、痉挛，直至看到地狱景象。在经历了这些之后，当父亲再把药片微笑着递给我时，我只会心怀感激。 \n\n第二样，则是一张由远亲们编织的网。关于这一点，至今我都无法百分之百确定。当房车逐渐接近东海岸时，一项新的守夜机制忽然开始执行。无论我们在哪停车，当时间来到午夜十二点后，车门便会忽然从外面反锁起来。由于车里一片漆黑，起先我以为是康查尔或塞勒斯在守夜，但时间久了，我却渐渐意识到，当车门被锁紧时，似乎所有人都在车上，这意味着另有他人在负责安保，但我从不知道也没见过是谁。后来我假装不经意地问过瓦妮莎，她只说，听说那是一只“银喜鹊”。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "无论如何，直到车沿着州界一路向北驶出州界，在即将抵达波特兰的时候，我看着一路上倒退的风景，看着西海岸的风吹过瓦妮莎的一头金发，突然想到了破解之法。是的，自始至终瓦妮莎就是整个系统的软肋，而我此刻才意识到。",
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
    revealedKeywords: ['amalekite_protocol'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "想要搞清楚父亲的软肋，与搞清他究竟是谁、何以成为父亲，其实是同一个问题。\n\n1968年，在我被扔进缅因州的监狱之前，某天上午，雷吉博士把一份侧写扔在桌子上。当时这个国家已经疯了，嬉皮士在吸大麻，反战游行队伍在烧征兵卡，博士总是自言自语说，在一个失去秩序的年代，权威变成极度稀缺的奢侈品。谁能展现出权威，谁就能定义并拥有秩序。\n\n最早的“统一场论”的分析报告里就包含着一份对于父亲的侧写，在当时，这个人物被称为X。在这份侧写里，雷吉博士说，和查理·曼森或者是后来搞山达基教的神棍不同，这个X大概是个受过正规训练的牧羊人。时至今日我得说他是对的，家族并非六十年代的产物，而是朝鲜战争留下的幽灵。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "上到这辆房车之后，我开始有大把的时间观察父亲。偶尔服药后的兴奋感散去，但痛苦尚未袭来的一小阵子，那是我最冷静的时候，在那个片刻，我可以不再把他当做神，而是把他当做一个标本去看，于是我轻而易举就看到 he 身上属于50年代军方的痕迹。\n\n在很长时间里，父亲保持着一种近乎于病态的清洁习惯。他的指甲永远修剪得整整齐齐，吃饭时也会严格遵守军官食堂的礼仪，切肉手腕悬空，咀嚼绝不张嘴。而房车的收音机里也永远循环播放着格伦·米勒和班尼·古德曼的爵士乐，我猜父亲在怀念那个黑白分明的、绝对服从的艾森豪威尔时代。\n\n好在塞勒斯是个喝多了就管不住嘴的傻子， he 说起过一些难辨真假的事情。说，1951年时父亲并不在前线，而是待在巨济岛的战俘营，那里是冷战时期最大的意识形态实验室。塞勒斯说，长官们不需要动刑，只需要把那些战俘关在一个特制的房间里，调整灯光，播放特定的频率，然后一遍又一遍地重塑他们的记忆，如此一番，他们便能让最坚定的布尔什维克在三天内哭着喊妈妈。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "很快我便明白了，这辆房车是战俘营的缩小版，一样的心理防线拆解，一样的化学辅助审讯，一样的安全感剥夺。父亲并不是远亲口中的先知，他只是一个从朝鲜战场回来的心理战专家，只不过他敏锐地意识到，在这个信仰崩塌的年代，把那套用来对付敌人的“洗脑技术”用来控制自己人，可以说再合适不过。\n\n当然，塞勒斯的说法只是说法，毕竟多数时候他还是会用先知 and 弥赛亚来称呼父亲，你不能太当真。可直到一件事情发生，我忽然意识到，关于朝鲜的部分或许是真的。\n\n那是我们刚抵达俄勒冈州边界的时候，傍晚雨刚停，一辆涂满了呕吐物似的旧校车从我们的营地旁开过，车上的人大笑大叫，把啤酒洒在路面上，有人看见艾莉丝，于是脱下裤子，露出私处。艾莉丝坐在篝火旁，微笑着回以一个飞吻，直到车尾灯消失在红杉林处，她才悠悠地吐出一口烟圈，说：“估计是追随‘感恩而死’巡演的嬉皮士，一群快乐的猪。”\n\n如果你去查日后警方的卷宗，你会看到，那是一起教科书级别的“仇恨犯罪”。五彩斑斓的旧校车最终被发现停在林地深处，车窗全碎，车身上被喷满了“滚回旧金山”、“美国不欢迎垃圾”之类排版工整的标语。 我敢打赌，警方一定会结案说是当地那帮极右翼伐木工或者保守派红脖子干的。\n\n但真相是，几乎在校车离开视线的半小时后，父亲就让康查尔发动房车，宣布即将执行[亚玛力人协议](clue:amalekite_protocol)计划。这个计划由艾莉丝和康查尔做前哨，他们带着酒 and 笑脸混进去。一旦被这群毫无戒心的孩子接纳，康查尔会把马匹专用的强效镇静剂混入LSD and 啤酒里。\n\n等到第二天，当警察接到匿名报警电话赶到林地时，他们会看到这群嬉皮士，他们被割掉了耳朵，脸颊上被刺上了纳粹的万字符。 但在药物的作用下，他们甚至感觉不到疼，只能对着警察痴笑。\n\n启发就是在那一刻像闪电一样击中我的。\n\n过去我们也无恶不作，但从没像这次一样，整个家庭像个特种小队，行动得太快、太流畅、太训练有素了，仿佛那个所谓的“[亚玛力人协议](clue:amalekite_protocol)”计划根本不是父亲临时想出来的，而是一份早就写好、甚至演练过无数次的战术手册。就连母亲也是极其熟练地从她的针线盒底层，翻出了早就准备好的刺青针刀 and 一瓶黑色油墨。",
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
    revealedKeywords: ['tithe'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "要拆掉这个笼子，我得先摸清每一根栏杆的位置。\n\n我这辆GMC房车里住了好几年，以为早已了解它的每一个角落，我知道所有的备用工具在哪，哪里藏着现金，哪块地板踩上去会响。但我错了，我一直是个瞎子，住在一个迷宫里。\n\n周二的晚上，房车停在鲑溪小径旁的红杉林里。 按照父亲制定的时间表，这天晚上轮到我“使用”瓦妮莎。不用猜，这可不是什么浪漫的约会。这是父亲的奖励，也是一种羞辱仪式。他把瓦妮莎像一块肉一样赏赐给我们，用来发泄多余的精力。当然了，在艾莉丝上车之后，每个人都希望跟她而不是瓦妮莎待在一起。",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.DEEP]: {
        event: "在这辆车上，性是被允许甚至被鼓励的，因为它能让我们保持动物性服从，但亲密关系是绝对禁止的，我们可以像野兽一样撕咬对方，可以在对方的肩膀上留下淤青和牙印，但绝不能亲吻彼此，因为接吻意味着平等，意味着两个奴隶在主人眼皮底下建立连接。那天晚上，瓦妮莎违规了，在黑暗的后车厢里，她突然捧住了我的脸。 瓦妮莎没有像往常一样麻木配合着，身体只是剧烈地颤抖。她吻了我，像溺水者在抓住最后一根稻草。她贴着我的嘴唇，用一种带着哭腔的气声乞求：“……带我走，罗伯特。求你了。趁着今晚……我们能逃掉。”\n\n如果是另一个罗伯特，听到这句话大概会心碎，会抱着她一起哭。但当时的我并没有回应那个吻，而是一把推开了她，力道大到她的头撞在了车厢壁上，发出“咚”的一声闷响。我看着她惊恐的眼睛说，她是策反同伴，非法建立情感连接，按规矩这足够被父亲扔进蛇穴了。\n\n“不！别！求你！” 她扑过来抱住我的腿，指甲深深掐进我的肉里。她知道我是认真的，也知道“父亲”的惩罚是什么。而我只是居高临下地看着她，告诉她试图逃走之于我并无好结果，父亲的爪牙遍布全美，让她给我一个我不去告发并与她私奔的理由。瓦妮莎颤抖着，眼泪流了满脸，她指着车尾那个看似普通的衣柜，声音细若蚊蝇，“我知道这辆车的夹层。我有一次看见了……他在那里和外面的人联络。”",
        attitude: "",
        visual: ""
      },
      [MemoryLayer.CORE]: {
        event: "第二天，趁着父亲和康查尔下车，我按照瓦妮莎的指引，钻进了车尾。她没有撒谎，在后储藏柜的最深处，有一块看起来像是为了遮挡轮拱而设计的挡板。按压特定位置，挡板弹开，里面藏着一条极其狭窄的、只能容许一只猫或者一个瘦骨嶙峋的人挤进去的铝合金梯子。\n\n它通向哪里？ \n\n我静悄悄关上暗门，来到车外丈量高度，这才发现，这辆房车顶竟然经过加高改造。从外面看像是空调机组和行李架的部分，实际藏着一个仅一米高、仅容人蹲下前行的二层空间。\n\n我回到车内，沿着梯子爬了上去。上头的空间得像个烤箱，充满了那种电子设备过热散发出的臭氧味。 在这个只有老鼠才能钻进来的夹层里，我看到很多意料之外的东西，首先隔间的正中央是一台Collins KWM-2 收发报机，军用级；角落里有一台小型的油印机，旁边堆满了还没干透的传单和伪造的证件。 看来前些日子用来嫁祸给嬉皮士的标语，都是在这个像棺材一样的夹层里生产出来的。\n\n旁边是一台不停闪烁红光的Regency 警用扫描仪，每一次闪烁都代表着一条通过无线电传播的调度指令。过去半年里困扰我的谜题解开了，六个月前，我们在萨克拉门托经历了一次极其罕见的失手。原本行动目标是一家位于郊区的信用社。不是为了钱，是为了信用社保险柜里的一份属于某个参议员的不记名债券，但塞勒斯搞砸了，他触发了无声警报。当我们冲出大门时，整个萨克拉门托警局的巡逻车像疯了一样向我们包围过来。\n\n警笛声从四面八方响起，我们在第160号公路上狂奔，就在即将撞上封锁线的一瞬间，父亲不知从哪钻出来，忽然大声命令：“左转！冲进那片玉米地！上帝为我们分开红海！”康查尔猛打方向盘，房车像一头失控的犀牛冲进了玉米地然后关掉了发动机。几乎十秒钟后，三辆亮着警灯的拦截车呼啸着掠过我们原本所在的公路。 我们在泥泞中颠簸了五英里，最后神奇地绕过了所有的检查站，消失在茫茫夜色中。\n\n我从夹层里爬下来，把挡板重新扣好。回到车厢时，瓦妮莎还在角落里发抖，可眼神里却仍然充满了期待。 我没有理她，因为我已经有了更明确的计划，也许在抵达圣芭芭拉的海滩之前，我就能够收网。",
        attitude: "",
        visual: ""
      }
    },
    connectedTo: ["capone"]
  },
  {
    id: "confession_23",
    keyword: "confession",
    title: "供述 No.23",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.4, y: window.innerHeight * 0.8 },
    revealedKeywords: ['拉古那海滩', '裸根', '阿列克谢·罗科维奇', '瓦妮莎'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我犯了一个致命的错误。我一直盯着“父亲”，甚至忘了还有艾莉丝在这。\n\n我们在圣芭芭拉至少停留了半年。大半年前，在西雅图那个阴雨绵绵的下午，康查尔和塞勒斯伪装成风化组警察，袭击了一个正在嫖妓的外国商人，谁知对方竟把他俩当成了安全部探员，为了换取自由，吐出了一个惊天的秘密。\n\n他说，有一份代号为“裸根”的微缩胶卷，正躺在圣芭芭拉一栋海滨别墅的保险柜里。胶卷里记录着三十四名在职法官、参议员和警长的把柄。别墅的主人阿列克谢·罗科维奇，表面上是个经营前卫艺术的画商，实则是KGB在西海岸的情报站负责人。",
        attitude: "",
        visual: "https://picsum.photos/seed/santa_barbara_beach/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "这是一个巨大的资产，父亲很快就想到了计划，他要神不知鬼不觉地干掉阿列克谢，拿到名单，然后戴上阿列克谢的面具，以苏联特工的身份继续勒索和操纵那些大人物。 这样的话， he 将拥有一支权柄通天的私人军队。为了实现计划，这次行动必须保持静默状态。不能有交火，也不能让外界知道阿列克谢是苏联间谍。\n\n这个计划的设计过程理所当然被交给了艾莉丝。我必须得说，她真的有点犯罪天赋。 这半年里，艾莉丝把自己包装成一个被左翼思潮洗脑的年轻情妇，在各种聚会里散播消息，用她的参议员“糖爹”换取政治理想。\n\n某个周日，阳光正好，艾莉丝在伪装成保镖的塞勒斯陪伴下出现在画廊，成功吸引了阿列克谢的注意。那个俄国人喜欢看着高贵的美国女性为了利益出卖灵魂。他以为这只送上门的羊羔不仅会为他那份名单增添新成员，还能扩充他的床伴人选，却不知道掉进圈套的是自己。\n\n从几周之前，塞勒斯身上就绑上炸药了。不，跟任务无关，那是他跟艾莉丝之间的游戏，很早我就发现了。每当两人交欢时，艾莉丝都会亲手把硝酸甘油炸药绑在他赤裸的胸膛上，她告诉塞勒斯，这是“终极信任”，意思是只要她不按开关，他就永远属于她。塞勒斯对此着了魔，命悬一线的刺激感让他对艾莉丝言听计从。每次出任务，他都会像穿内衣一样穿上那件炸弹背心，把命交到女孩的手里。",
        attitude: "",
        visual: "https://picsum.photos/seed/bomb_vest/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "收网的日子到了。 一周前，艾莉丝告知阿列克谢，她掌握了参议员娈童的证据，将在下次幽会时奉上原件。 原本的计划很周密，艾莉丝会提前在阿列克谢的酒里下药，趁他取出胶卷归档时使其昏迷。与此同时塞勒斯引开门外看守，这个时候身形瘦小的瓦妮莎混进房间，协助艾莉丝把昏迷的画商运出，用车运到海边，伪造溺亡假象。阿列克谢有晨跑习惯，人们只会认为他死于心脏病突发。\n\n而这正是我等待的时刻。 父亲觊觎着别人的名单，而我也在觊觎他的名单。 我早就确认了，车顶阁楼里藏着一本记载着核心远亲联络方式的黄色密码本，每次父亲离车都会将本子带走，但如果是意外发生，他没有这个时间去拿呢？只要让瓦妮莎驾驶的接应车辆在关键时刻坏掉，塞勒斯无法继续拖延时间，那父亲为了保住那个价值连城的胶卷，就必须亲自下车处理。\n\n这就是我去偷拍密码本的时间点。所以在任务开始前，我偷偷拔掉了瓦妮莎那辆车的分电器高压线。\n\n行动开始，阿列克谢沉迷于艾莉丝的美色，毫无防备地打开了保险柜，一切如她所愿。趁着画商昏迷，她拿到了胶卷，发出灯光信号。塞勒斯在门外用古巴雪茄诱惑门前保镖，瓦妮莎则背着裹尸袋闪身进屋。几分钟后，两人协力搬出昏迷的阿列克谢，来到了路边的接应车旁。\n\n透过窗户，我看到瓦妮莎在那辆轿车里拼命拧钥匙，引擎发出绝望的空转声。眼看门外的保镖已经察觉不对劲，就要冲向那辆动不了的车。我在阁楼下紧握撬锁工具，心跳加速，等着父亲下楼。\n\n但父亲没有下楼。\n\n眼见无法撤退，艾莉丝甚至没有犹豫一秒。 一声巨响，塞勒斯身上的两公斤硝酸甘油瞬间炸开了，把那两个刚冲过来的保镖连同别墅的前厅一起炸成了粉末。接下来，艾莉丝从车上跳下来，指挥着瓦妮莎，把还在昏迷中的阿列克谢，直接扔进了燃烧的火海。\n\n眼见静默行动变成了恐怖袭击，康查尔瞬间做出了反应。 他冲向别墅外墙，用早就准备好的红色喷漆在残存的围墙上喷下了巨大的、潦草的标语： “打倒资本主义寄生虫！” “新世界万岁！” 随手撒下一把极左翼激进组织传单。\n\n第二天傍晚时候，房车驶入拉古那海滩的露营区，我在休息区买了一份当地晚报，头条新闻便刊载着圣芭芭拉的爆炸案，但内容并非“苏联间谍网曝光”，而是“激进左翼分子炸毁富商豪宅”。此时警方已经将其定性为国内恐怖主义袭击，压根没会想到那个被烧成焦炭的画商是情报人员，可以想见，即便KGB，大概率也会把爆炸当做KGB毁尸灭迹的必要工作，他们要么庆幸阿列克谢已经死了，要么会想尽办法让他死在秘密监狱里。 \n\n只有瓦妮莎付出了巨大代价。 那天晚上，父亲把瓦妮莎关进了车底的备胎箱。我躺在床上，还能听着地板下传来的微弱哭声。",
        attitude: "",
        visual: "https://picsum.photos/seed/explosion_beach/800/450"
      }
    },
    connectedTo: ["confession_22", "capone"]
  },
  {
    id: "confession_24",
    keyword: "confession",
    title: "供述 No.24",
    currentLayer: MemoryLayer.SURFACE,
    position: { x: window.innerWidth * 0.75, y: window.innerHeight * 0.35 },
    revealedKeywords: ['莫兰迪', '阿尔伯克基市', '化学家情人'],
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "我猜你也不会觉得车上会办个什么纪念塞勒斯的活动吧？\n\n唯一的变化是，车厢里终于少了一股汗臭味。不过车上空出来的位置到成问题，父亲并不喜欢空椅子，他希望家族内人丁兴旺，战力完整。\n\n那个晚上，艾莉丝走到父亲身边，她丝毫没有因为炸死塞勒斯而愧疚，只是兴奋地把一本剪报簿摊在父亲膝盖上。\n\n“我们需要他，父亲，”她的手指划过剪报上那些黑白照片——那是几年前新墨西哥州著名的阿尔伯克基市化工厂爆炸案，现场如同艺术品般惨烈。艾莉丝告诉父亲，这位艺术家的名字叫做[莫兰迪](clue:morandi)，此刻他正被关在圣昆廷监狱。“他是最好的化学家，也是最好的爆破手，”艾莉丝的眼神迷离，像在在谈论初恋情人，“他教会了我怎么用洗洁精和化肥制造炸弹。”",
        attitude: "",
        visual: "https://picsum.photos/seed/albuquerque_explosion/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "父亲当晚就构思好了计划。在裸根的名单里，有一位名叫肯尼迪·索恩的联邦大法官。与名单中的其他人不同，阿列克谢死前已与这位法官有过“密切合作”，这意味着很多事。比如索恩一定会关注到阿列克谢的死，也一定会把这件事当做自己的解脱，如果父亲想要继承苏联方面对法官的控制，那他需要精心准备一场演出。\n\n瓦妮莎被放了出来，她浑身惨白，关节处都是清淤。 母亲冷冷地看着她，接着打开化妆箱，像给一具尸体上妆一样，用粉底遮盖淤青，再涂上显眼的唇色。接着母亲又取出药箱，从中取出一支装着透明液体的注射器。\n\n“这是稀释后的士的宁。它会让神经末梢变得敏感，像是裸露的电线一样。哪怕一根羽毛落在皮肤上，你也会觉得像是刀割的感觉。亲爱的，我是在帮助你，因为这样你就不需要演戏了，等药物起效，你会自然而然地抽搐抖动，因为一点触碰就下意识尖叫。”母亲轻弹针管，扎进瓦妮莎的身体里，“听说这正是咱们法官大人最喜欢的。”",
        attitude: "",
        visual: "https://picsum.photos/seed/judge_thorne/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "当晚，因为“非法入境”而被逮捕的瓦妮莎在两位“移民局官员“陪同下，来到索恩位于翡翠湾的豪宅门前。门前守卫早以熟悉流程，知道每周二的晚上都会有“贡品”被送来，而他只需要少管闲事就行。\n\n书房内，看着被康查尔推在地毯上的瓦妮莎，索恩的眼神犹疑，康查尔解释，说这是阿列克谢生前安排的最后一次“快递”。当瓦妮莎的哀嚎持续了几分钟之后，父亲才推开门走进书房，他穿着一件深色大衣，手里拿着那份“裸根”档案的复印件，用冷漠而权威的口吻说道： “晚上好，法官同志。”\n\n索恩法官僵住了，手停在半空。 父亲走到书桌前，没看衣衫不整的法官，只是轻轻拍了拍瓦妮莎的肩膀。 因为士的宁的作用，这一拍让瓦妮莎发出了一声凄厉的惨叫。 父亲很满意这个效果，他看着法官说： “阿列克谢同志虽然牺牲了，但莫斯科的服务不会中断。我们带来了您喜欢的玩具，也带来了新的指令。”\n\n索恩法官颤抖着接过父亲递过来的一份文件，这是一份将标记为“重要涉密证人”并立即转移出狱的特勤令。父亲的解释无懈可击，化名为莫兰迪的罗钦科同志是我方急需营救回国的潜伏特工，如此重大任务，只能请求索恩法官协助配合了。后来听康查尔说，这位法官阁下没有任何犹豫就签了字，他以为自己是在配合KGB的营救行动，根本不敢多问。\n\n他们带着签好字的文件和浑身颤抖的瓦妮莎离开了索恩的宅邸。回到车上，瓦妮莎蜷缩在角落里，药物的副作用让她还在不停地抽搐和干呕。母亲递出一条毛毯，接着就回到副驾驶上，提艾莉丝整理头发，后者则轻快地哼着曲调，呼应着窗外的海浪声。",
        attitude: "",
        visual: "https://picsum.photos/seed/vanessa_trauma/800/450"
      }
    },
    connectedTo: ["confession_23"]
  },
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
        visual: "https://picsum.photos/seed/desert_road/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "但这只是幻想。 因为艾莉丝坐在副驾驶上，像只慵懒的猫一样蜷缩在座位里，脱掉鞋，把脚搭在仪表盘上。她点了支细长的薄荷烟，烟雾弥漫出车窗飘向远处。我看向窗外，窗外是无边的红土和像墓碑一般的平顶山，太阳把万物都烤得扭曲变形。\n\n“你在想什么，罗伯特？” 她侧着头看我，指尖轻轻划过我握着方向盘的手臂，那种冰凉的触感让我在燥热的沙漠里打了个寒战。她看穿了我。不知道为什么，我忽然产生了这个疯狂的想法。\n\n“你知道塞勒斯最大的问题是什么吗？”她吐出一口烟圈，声音低沉而充满诱惑，“他是一把锤子。好用但笨重，但你不一样……”",
        attitude: "",
        visual: "https://picsum.photos/seed/alice/800/450"
      },
      [MemoryLayer.CORE]: {
        event: "“父亲老了，”她凑近我，身上的香水味钻进我的鼻孔，“以后我们一定能做点更疯狂的事情，只要你听话，把脑子里的杂念清空，把自己完全交给我……我会用你切开这个世界的喉咙。”她把手伸向我的下腹，我瞬间有种奇异的感受，车明明在沙漠公路上飞驰，我却感到自己正在坠落。我承认，我想象着像塞勒斯那样，把头埋进她的怀里。接着我的手松也开了方向盘，遵照她的指令，慢慢滑向她的大腿。我眼神开始涣散，呼吸像发情的狗一样急促。这时远处出现一片雄伟但衰败的工业区，艾莉丝变得更加兴奋，她说那就是莫兰迪的火药库，满满一仓季戊四醇四硝酸酯（PETN），等拿到它之后，只需要几百克就能把一座装满小孩的幼儿园炸上天。\n\n我不知道是不是她语气的缘故，也不知道是嫉妒心作祟，总之，一瞬间有根针刺破了填满车厢的粉红色气泡，我下意识纠正她，说如果莫兰迪真如她所说是行家，那他绝不会信任PETN在高温环境下的稳定性，我赌他宁愿选择黑索金（RDX）与TNT的混合注塑炸药，那东西较为吃顿，更适合长期储存。我话音刚落，车厢里的空气瞬间凝固住，艾莉丝抽走了她的手，她没有反驳，只是慢慢转过头，看着车窗外，我这才意识到自己说错话了。塞勒斯分不清PETN和RDX的区别，塞勒斯只会流着口水说，是的，女王，炸飞他们。\n\n“你懂很多，是吗，罗伯特？”艾莉丝的声音变得很轻，“别看你平时装得像个脑子被烧坏了的废物似的，其实你很会演戏。”\n\n我没有说话，而是重新握紧方向盘。沙漠的风卷着沙砾打在车窗上，发出沙沙响声。",
        attitude: "",
        visual: "https://picsum.photos/seed/explosion/800/450"
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
    revealedKeywords: [], // No keywords to pick up
    layers: {
      [MemoryLayer.SURFACE]: {
        event: "塞勒斯被炸死的两个月后，他的位置终于被填补上了。\n\n我记得那天早晨海湾的雾气很大，圣昆廷监狱的重型铁门若隐若现，像是从未被开启过。我在车上，看到莫兰迪从迷雾中走出来。他比剪报上更瘦，像个刚下班的会计师一样。走到近前，莫兰迪跟车上的每一个人握手，艾莉丝不紧不慢地走上前来，忽然掏出一支冰锥，扎进对方大臂。莫兰迪显得毫不意外，任由她吮吸伤口良久，又将血吐在房车的地毯上。\n\n“欢迎回到派对，”艾莉丝说完，用舌头舔了舔嘴唇上的血。\n\n自从莫兰迪上车后，房车里的空气就变了，苦杏仁、丙酮，还有那种让人舌根发麻的金属味，这里闻起来像是一个随时会爆炸的化学实验室。从洛杉矶法院门前的汽车炸弹，到圣迭戈海军基地，半年内，我们在西海岸制造的动静远比此前一年加起来都要响。\n\n但我越发感到不安。自从阿尔伯克基那次失言后，艾莉丝看我的眼神越来越不对劲。她像一只闻到了血腥味的鲨鱼，总是游弋在我的周围。 我必须先下手。 当父亲宣布要伪装成“爱尔兰共和军”去袭击凤凰城的联邦储备银行时，我意识到，这是我最后的机会了。\n\n在出发前往亚利桑那的前夜，趁着莫兰迪在调试引爆器、康查尔则和父亲在规划路线的时刻，我撬开那个幽闭的备胎箱。瓦妮莎蜷缩在那里，已经瘦得只剩一副骨头。她惊恐地看向我，眼神中已经没有任何信任。\n\n我把一个防水袋塞进她的手里。 “听着，”我贴着她的耳朵，声音急促，“这是我们离开的唯一机会。你拿上它，等我引开其他人后，你就往东跑，跑到图森市的州警检查站，把这些东西交给他们。我会想办法逃出来，然后带你走。”\n\n“这是什么？”瓦妮莎颤抖着问，我说这里有录音，还有那个微缩胶卷，把它们交给FBI，这些罪证足以让父亲在绞架上被吊死三次。 瓦妮莎将信将疑地打开纸袋，当她看清其中的东西后，眼泪瞬间涌了出来。\n\n第二天清晨，当父亲发现瓦妮莎踪影全无时，他看起来真的很生气。\n\n“那个贱人，她要把我们全卖给FBI！”我佯装愤怒，此时莫兰迪的反应也如我预期，他凑近父亲的耳朵说了些什么，父亲紧绷的面色马上缓和了。 我知道莫兰迪在说什么，他告诉父亲，he已经在那个装有胶卷的防水袋夹层里，提前缝上了一个RF射频发射器。而他之所以这么做，一定也是因为艾莉丝对他说了些什么。\n\n但他没有猜到，这一切早都被我看在了眼里。\n\n果然，父亲派出康查尔、莫兰迪加上艾莉丝三人去追击瓦妮莎，唯独留下了我。 看着那辆轿车卷着尘土消失在沙漠公路上，我转过身，锁上了房车的门。\n\n父亲驾驶着房车，驶入85号公路，周围是无尽的仙人掌和像墓碑一样耸立的红土山。 我走到了副驾驶座后面。母亲手里依然拿着那根针，正在缝补康查尔留下的一件衬衫。 我深吸一口气，拿起了桌上那把用来切冻肉的锯齿钢刀。 “罗伯特？”母亲察觉到了身后的阴影，她转过头，浑浊的眼睛露出了困惑，“你要做什么？”\n\n我的手很稳，钢刀从她的左侧颈动脉刺入，横向用力一拉。母亲没有尖叫，但被切开的气管止不住地发出嘶嘶声，鲜血像高压水枪一样喷溅出来。\n\n在父亲转过头之前，我已经来到了他的身后。 “好好开车，父亲，”我贴着他的耳朵，跟我的枪口一样近，“我们要穿越边境。”\n\n父亲瞥了眼尸体，然后通过后视镜盯着我的眼睛。“他们告诉我，说你是警察，你猜我是怎么回答的，亲爱的罗伯特？”他淡淡地说，“我说你杀不了我。”\n\n无论如何，虽然我原本也没打算尝试，但不得不承认，他说的是对的。我很清楚这些年的药物和洗脑训练意味着什么，即便我想要开枪，我的身体也会抗拒我。 但我很早就知道这一点。正因如此，我更清楚，想要完成这些年潜伏的任务，我唯独只有一个办法——利用瓦妮莎无尽的信任，用她做饵调开其他人，然后斩断父亲与家族、与“远亲”的所有联系。\n\n就在这时，固定在驾驶座旁的警用扫描仪突然响了，正是三人追击瓦妮莎的方向。 既然我早已知晓射频发射器的事，自然也提前举报了他们开走的那辆车。我用父亲那台发报机，伪装成电台爱好者，向警方泄露了一伙“持有重武器的劫匪”的行踪。 此时对讲机内传来激烈的交火声，我甚至听到远处传来康查尔的怒吼，紧接着是一阵密集的自动步枪扫射声。 警方通报随即传来：“我们刚刚击毙一名嫌疑人……另外两名嫌犯裹挟人质逃入沙漠腹地……正在请求空中支援……”\n\n我听到了，父亲自然也听到了。 “接下来怎么办呢，罗伯特？”他依然保持着那副令人作呕的笑意，“他们干掉了一个，但还剩两个。”\n\n我深吸了一口气，用尽全力克制住手抖。 “安心开车吧，我们去一个没有人认识你的地方。”我从怀里掏出那本黄色的密码本，在他面前晃了晃，然后塞进自己的口袋，“那里没有远亲，也没有法律，没有任何人知道你在那里。”\n\n“听起来像是天堂。”父亲笑盈盈地说。\n\n“当然，对我来说是，我不会告诉任何人你在哪，没有人知道你还活着或是死了，”我说，“在我学会如何朝你开枪之前，你都会一直待在那里”\n\n“真是个不错的计划。”父亲踩了一脚油门，让车继续在公路上飞驰。我听到母亲的尸体正随着车身的颠簸而晃动，像是重新活了过来。 \n\n我看向手里的枪，枪口指向父亲的太阳穴，子弹已经准备好，但不会再有人流血了。 我知道，父亲也知道，但他没有做出任何反抗。这是一次押送，毫无疑问。 但我忽然有些恍惚，究竟是谁要把谁带到那个被遗忘的地方。\n\n不过这都无所谓了，没有人会知道父亲现在在哪，即便是你，我的朋友。",
        attitude: "",
        visual: "https://picsum.photos/seed/desert_escape/800/450"
      },
      [MemoryLayer.DEEP]: {
        event: "[SHATTER_TRIGGER]",
        attitude: "",
        visual: "assets/capone-split-personality.jpg"
      }
    },
    connectedTo: ["confession_25"]
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
  chapter?: number; // Added chapter number
  description: string; // Chalk note
  materialType?: 'polaroid' | 'clipping' | 'document' | 'sketch';
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
    chapter: 6,
    description: 'The Patriarch',
    materialType: 'polaroid'
  },
  // --- UNDERBOSS ---
  {
    id: 'the_mother',
    name: 'THE MOTHER',
    role: 'UNDERBOSS',
    parentId: 'father',
    position: { x: 40, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Matriarch',
    chapter: 6,
    materialType: 'polaroid'
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
    chapter: 1,
    description: 'Eldest Son / Enforcer',
    materialType: 'document'
  },
  {
    id: 'luciano',
    name: 'LUCIANO',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 50, y: 40 },
    status: 'DECEASED',
    phase: 1,
    chapter: 3,
    description: 'Finance / Distribution',
    materialType: 'polaroid'
  },
  {
    id: 'lundgren',
    name: 'LUNDGREN',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 75, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    chapter: 3,
    description: 'Cult Leader',
    materialType: 'clipping'
  },
  {
    id: 'silas',
    name: 'SILAS',
    role: 'LIEUTENANT',
    parentId: 'father',
    position: { x: 60, y: 20 },
    status: 'DECEASED',
    phase: 1,
    chapter: 4,
    description: 'Second Son',
    materialType: 'polaroid'
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
    chapter: 1,
    description: 'The Scapegoat? (1971)',
    materialType: 'sketch'
  },
  {
    id: 'morning',
    name: 'MORNING',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 38, y: 65 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Bar owner / Fence',
    chapter: 1,
    materialType: 'polaroid'
  },
  {
    id: 'roger_beebe',
    name: 'ROGER BEEBE',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 75, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    chapter: 1,
    description: 'Confessed to 1968 crimes',
    materialType: 'document'
  },
  {
    id: 'little_derek_wayne',
    name: 'DEREK WAYNE JR.',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 80, y: 30 },
    status: 'DECEASED',
    phase: 1,
    description: 'Family Massacre Victim',
    chapter: 1,
    materialType: 'clipping'
  },
  {
    id: 'capone',
    name: 'R. CAPONE',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 15, y: 55 },
    status: 'MISSING',
    phase: 1,
    description: 'Deep Cover / "Orphan"',
    chapter: 1,
    materialType: 'polaroid'
  },
  {
    id: 'martha_diaz',
    name: 'MARTHA DIAZ',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 80, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Laundromat Victim',
    chapter: 2,
    materialType: 'clipping'
  },
  {
    id: 'aw_wilmo',
    name: 'A.W. WILMER',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 85, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'The Scapegoat? (1990)',
    chapter: 2,
    materialType: 'document'
  },
  {
    id: 'arthur_dawson',
    name: 'ARTHUR DAWSON',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 10, y: 20 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Key witness',
    chapter: 2,
    materialType: 'document'
  },
  {
    id: 'julie',
    name: 'JULIE',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 60, y: 85 },
    status: 'DECEASED',
    phase: 1,
    description: 'Frozen Child',
    chapter: 3,
    materialType: 'clipping'
  },
  {
    id: 'jc_penney',
    name: 'JC PENNEY',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 90, y: 60 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Department Store / Target',
    chapter: 3,
    materialType: 'clipping'
  },
  {
    id: 'juvell_chambers',
    name: 'JUVELL CHAMBERS',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 10, y: 40 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Ex-Cop / Recruit',
    chapter: 3,
    materialType: 'document'
  },
  {
    id: 'boris_smirnov',
    name: 'BORIS SMIRNOV',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 90, y: 40 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Burkesville Gang',
    chapter: 3,
    materialType: 'document'
  },
  {
    id: 'cynthia_miller',
    name: 'CYNTHIA MILLER',
    role: 'ASSOCIATE',
    parentId: 'silas',
    position: { x: 70, y: 15 },
    status: 'MISSING',
    phase: 1,
    description: 'Static Snow Victim',
    chapter: 3,
    materialType: 'clipping'
  },
  {
    id: 'vanessa',
    name: 'VANESSA',
    role: 'ASSOCIATE',
    parentId: 'the_mother',
    position: { x: 30, y: 30 },
    status: 'ACTIVE',
    phase: 1,
    description: 'Adopted Daughter',
    chapter: 4,
    materialType: 'polaroid'
  },
  {
    id: 'peter_henderson',
    name: 'PETER HENDERSON',
    role: 'ASSOCIATE',
    parentId: 'conchar',
    position: { x: 20, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'Davenport Victim',
    chapter: 4,
    materialType: 'clipping'
  },
  {
    id: 'richie_dreyfuss',
    name: 'RICHIE DREYFUSS',
    role: 'SOLDIER',
    parentId: 'conchar',
    position: { x: 40, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'The "Loser" / Failed Recruit',
    chapter: 4,
    materialType: 'document'
  },
  {
    id: 'priest',
    name: 'THE PRIEST',
    role: 'ASSOCIATE',
    parentId: 'lundgren',
    position: { x: 85, y: 50 },
    status: 'MISSING',
    phase: 1,
    description: 'Texarkana Connection',
    chapter: 5,
    materialType: 'polaroid'
  },
  {
    id: 'alexei',
    name: 'ALEXEI ROCKOVICH',
    role: 'SOLDIER',
    parentId: 'father',
    position: { x: 50, y: 60 },
    status: 'DECEASED',
    phase: 1,
    description: 'Soviet Connection',
    chapter: 5,
    materialType: 'document'
  },
  {
    id: 'morandi',
    name: 'MORANDI',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 60, y: 70 },
    status: 'ARRESTED',
    phase: 1,
    description: 'Chemist / Bomber',
    chapter: 5,
    materialType: 'document'
  },
  {
    id: 'john_morrissey',
    name: 'JOHN MORRISSEY',
    role: 'ASSOCIATE',
    parentId: 'father',
    position: { x: 70, y: 80 },
    status: 'DECEASED',
    phase: 1,
    description: 'St. Louis Victim',
    chapter: 5,
    materialType: 'clipping'
  },
  {
    id: 'dr_reggie',
    name: 'DR. REGGIE',
    role: 'HANDLER',
    position: { x: 10, y: 10 },
    status: 'ACTIVE',
    phase: 2,
    description: 'Handler / Architect?',
    chapter: 6,
    materialType: 'document'
  }
];
