import { KEYWORD_REGISTRY } from './registry';

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

// Moved from monolithic constants.tsx
export const CATEGORY_IDS = {
  LOCATIONS: Object.entries(KEYWORD_REGISTRY).filter(([_, k]) => k.type === 'location').map(([id, _]) => id),
  CASES: Object.entries(KEYWORD_REGISTRY).filter(([_, k]) => k.type === 'clue' || k.type === 'case').map(([id, _]) => id),
  PEOPLE: Object.entries(KEYWORD_REGISTRY).filter(([_, k]) => k.type === 'person').map(([id, _]) => id),
  YEARS: Object.entries(KEYWORD_REGISTRY).filter(([_, k]) => k.type === 'year').map(([id, _]) => id),
};


export const ARCHIVE_CASE_HIGHLIGHT_MAP: Record<string, string[]> = {
  'clipping_01': ['1968', '俄亥俄州', '祭祀案'],
  'clipping_02': ['1967'],
  'clipping_03': ['碎尸案'],
  'clipping_04': ['1402 Old Dominion Rd.', '灭门案'],
  'clipping_05': ['空烟盒'],
  'clipping_06': ['1990'],
  'clipping_07': ['1990'],
  'clipping_08': ['1986', '黄油朱莉普'],
  'clipping_09': ['朱维尔·钱伯斯', '灵魂厨房', '1975', '伯克斯维尔'],
  'clipping_10': ['鲍里斯·斯米尔诺夫', '灰水信标', '1973'],
  'clipping_11': [],
  'clipping_12': [],
  'clipping_13': [],
  'clipping_14': [],
  'clipping_15': [],
  'clipping_16': [],
  'clipping_17': ['阿列克谢', '盲区营地', '人造烟雾弹', '1402 Old Dominion Rd.'],
  'clipping_18': ['蓝色游牧房车', '拉古那海滩'],
  'clipping_19': ['图森枪击案'],
  'clipping_20': ['费利佩·马尔多纳多', '红杉林', '伏击案'],
  'clipping_21': ['汉弗莱县', '袭警案', '曼丹市'],
  'clipping_22': ['亚瑟·道森', '什一税', '利比镇', '1967'],
};

export const BRIEFING_SECTIONS = [
  {
    id: 1,
    title: '档案：罗伯特·卡彭',
    content: '罗伯特·卡彭（Robert Carpen），出生年月不详。根据现有档案推定，其被联邦调查局（FBI）招募时年龄约为25岁。32—33岁期间，被“KLUB”计划列为重点关注对象，并纳入专项强化培训序列。据交叉资料比对，其进入缄默潜伏状态的时间节点，推测在34—36岁之间。\n\n除DNA序列外，其全部可追溯身份信息已依程序抹除。经后续解密确认，其安全识别代码为[黄油朱莉普](clue:julip)（Butter Julep），“罗伯特·卡彭”系其潜伏阶段使用之身份代号，并非真实姓名值。',
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
    content: '他是在梦里告诉我这个故事的。\n他说，他感到非常悔悔，因此这是个千真万确的故事。\n他的年纪已经非常老了，我相信他说的一定千真万确。',
  },
  {
    id: 4,
    title: '证言记录 - 02',
    content: '他说，曾经有一个极其诡异的家族，他们的旁支横跨全美国。有父亲，母亲，长女，养女，还有好几个兄弟。这一大家子，有时藏在树林里，有时候又住在城镇上，有时乘着一辆房车驶过国家公园，有时又搭乘长途巴士，从孟菲斯一直坐到西海岸。',
  },
  {
    id: 5,
    title: '证言记录 - 03',
    content: '有一次，一伙罪犯劫掠了[缅因州](clue:maine)的某个[小银行](clue:small_bank)，人们提到蒙面人中有两人佩戴阿尔衮琴族头饰，另一次，[芝加哥](clue:chicago)附近的香槟镇上，一个亚裔女性在离开大学图书馆后[失踪](clue:missing)了。一些本地人说她回到了身在远东的前夫身边，另外一些的怀疑更合理，本地的一名深居简出的公开恋童者。',
  },
  {
    id: 6,
    title: '证言记录 - 04',
    content: '在我的梦里，他告诉我，他说这一切其实都是这个家族所为，他们一边旅行，一边杀人。他们刻意制造线索，把每个案子伪装成动机不同的类型，以供人们遐想，猜测。',
  },
  {
    id: 7,
    title: '证言记录 - 05',
    content: '这是个以血缘为连接的犯罪团伙，它的主谋是父亲，父亲有一个习惯，他会用随便见到的某个东西去命名他们的犯罪计划，目的是为了消解每一起犯罪之间关联的可能，让其从各方面都尽可能地随机。',
  },
  {
    id: 8,
    title: '证言记录 - 06',
    content: '整个家族都在乱伦，而且通过性行为控制刚刚加入的新成员。老人跟我说，当年他隐藏自己的探员身份，以养子之名潜入家族内部寻找证据时，他们正在执行的计划叫作“[青豆牡蛎汤计划](clue:project)”。',
  },
];
