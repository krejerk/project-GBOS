import { MemoryNode } from '../types';
import { KeywordMetadata } from './types';
import { CHAPTER0_KEYWORDS, CHAPTER0_NODES } from './chapters/chapter0';
import { CHAPTER1_KEYWORDS, CHAPTER1_NODES } from './chapters/chapter1';
import { CHAPTER2_KEYWORDS, CHAPTER2_NODES } from './chapters/chapter2';
import { CHAPTER3_KEYWORDS, CHAPTER3_NODES } from './chapters/chapter3';
import { CHAPTER4_KEYWORDS, CHAPTER4_NODES } from './chapters/chapter4';
import { CHAPTER5_KEYWORDS, CHAPTER5_NODES } from './chapters/chapter5';
import { CHAPTER6_KEYWORDS, CHAPTER6_NODES } from './chapters/chapter6';
import { CHAPTER7_KEYWORDS, CHAPTER7_NODES } from './chapters/chapter7';
import { CHAPTER8_KEYWORDS, CHAPTER8_NODES } from './chapters/chapter8';
import { CHAPTER9_KEYWORDS, CHAPTER9_NODES } from './chapters/chapter9';
import { IDENTITY_NODES, IDENTITY_KEYWORDS } from './chapters/identity';

export const KEYWORD_REGISTRY: Record<string, KeywordMetadata> = {
  ...IDENTITY_KEYWORDS,
  'maine': { id: 'maine', chapter: 1, type: 'location', displayName: "缅因州", isPersistent: true, description: "该家族曾在此地实施过一次银行劫案。", source: "Briefing" },
  'chicago': { id: 'chicago', chapter: 1, type: 'location', displayName: "芝加哥", isPersistent: true, description: "亚裔女性失踪案发生的周边城市。", source: "Briefing" },
  'small_bank': { id: 'small_bank', chapter: 1, type: 'case', displayName: "小银行", isPersistent: true, description: "被家族劫掠的目标地点之一。", source: "Briefing" },
  'missing': { id: 'missing', chapter: 1, type: 'case', displayName: "失踪", isPersistent: true, description: "受害者的最终下落不明。", source: "Briefing" },
  'julip': { id: 'julip', chapter: 1, type: 'case', displayName: "黄油朱莉普", isPersistent: true, description: "卡彭的安全识别代码 (Butter Julep)。", source: "Briefing", attachments: ["fbi_symbol_analysis"] },
  'personnel_tree': { id: 'personnel_tree', chapter: 0, type: 'case', displayName: "人物关系 (Personnel)", isPersistent: true, description: "基于目前掌握的线索，整理出的相关人物关系网络演进图。", source: "Investigation" },
  'view_iron_horse_record': { id: 'view_iron_horse_record', chapter: 3, type: 'case', displayName: "烟盒记录：路易斯维尔", isPersistent: true, description: "詹妮弗提供的一份关键记录，揭示了卡彭最后一次信标投放的地理坐标：肯塔基州路易斯维尔。", source: "Jennifer" },
  'asian_woman': { id: 'asian_woman', chapter: 1, type: 'person', displayName: "亚裔女性", isPersistent: true, description: "在香槟镇失踪的受害者。", source: "Briefing" },
  'family': { id: 'family', chapter: 1, type: 'case', displayName: "诡异家族", isPersistent: true, description: "一个庞大的、横跨全美的家族式犯罪团伙。成员之间通过血缘连接，行踪飘忽不定。", source: "Briefing" },
  ...CHAPTER0_KEYWORDS,
  ...CHAPTER1_KEYWORDS,
  ...CHAPTER2_KEYWORDS,
  ...CHAPTER3_KEYWORDS,
  ...CHAPTER4_KEYWORDS,
  ...CHAPTER5_KEYWORDS,
  ...CHAPTER6_KEYWORDS,
  ...CHAPTER7_KEYWORDS,
  ...CHAPTER8_KEYWORDS,
  ...CHAPTER9_KEYWORDS,
};

export const ALL_MEMORY_NODES: MemoryNode[] = [
  ...IDENTITY_NODES,
  ...CHAPTER0_NODES,
  ...CHAPTER1_NODES,
  ...CHAPTER2_NODES,
  ...CHAPTER3_NODES,
  ...CHAPTER4_NODES,
  ...CHAPTER5_NODES,
  ...CHAPTER6_NODES,
  ...CHAPTER7_NODES,
  ...CHAPTER8_NODES,
  ...CHAPTER9_NODES,
];

export const NODE_MAP = new Map(ALL_MEMORY_NODES.map(node => [node.id, node]));

export const GLOBAL_KEYWORD_MAP: Record<string, { id: string, type: string }> = {
  "羞辱仪式": { "id": "humiliation_ritual", "type": "case" },
  "alexander_mengel": { "id": "alexander_mengel", "type": "person" },
  "亚历山大·门格尔": { "id": "alexander_mengel", "type": "person" },
  "艾利克斯·门格尔": { "id": "alexander_mengel", "type": "person" },
  "门格尔": { "id": "alexander_mengel", "type": "person" },
  "克莱门特·斯维尔森": { "id": "clement_svirson", "type": "person" },
  "父亲": { "id": "father", "type": "person" },
  "母亲": { "id": "mother", "type": "person" },
  "约翰·多伊": { "id": "john_doe", "type": "person" },
  "赛勒斯": { "id": "silas", "type": "person" },
  "范霍恩检查站": { "id": "van_horn_checkpoint", "type": "location" },
  "拦截": { "id": "intercept", "type": "case" },

  "詹妮弗": {
    "id": "jennifer",
    "type": "person"
  },
  "人物关系 (Personnel)": {
    "id": "personnel_tree",
    "type": "case"
  },
  "亚裔女性": {
    "id": "asian_woman",
    "type": "person"
  },
  "芝加哥": {
    "id": "chicago",
    "type": "location"
  },
  "雷吉博士": {
    "id": "dr_reggie",
    "type": "person"
  },
  "诡异家族": {
    "id": "family",
    "type": "case"
  },
  "黄油朱莉普": {
    "id": "julip",
    "type": "case"
  },
  "伦德格兰": {
    "id": "lundgren",
    "type": "person"
  },
  "缅因州": {
    "id": "maine",
    "type": "location"
  },
  "失踪": {
    "id": "missing",
    "type": "case"
  },
  "尼比": {
    "id": "nibi",
    "type": "person"
  },
  "俄亥俄州": {
    "id": "ohio",
    "type": "location"
  },
  "祭祀案": {
    "id": "ritual_case",
    "type": "case"
  },
  "罗格·毕比": {
    "id": "roger_beebe",
    "type": "person"
  },
  "小银行": {
    "id": "small_bank",
    "type": "case"
  },
  "1967": {
    "id": "year_1967",
    "type": "year"
  },
  "1968": {
    "id": "year_1968",
    "type": "year"
  },
  "1971": {
    "id": "year_1971",
    "type": "year"
  },
  "1985": {
    "id": "year_1985",
    "type": "year"
  },
  "1402 Old Dominion Rd.": {
    "id": "1402_old_dominion_rd",
    "type": "location"
  },
  "小 A.W.威尔莫": {
    "id": "aw_wilmo",
    "type": "person"
  },
  "空烟盒": {
    "id": "empty_cigarette_pack",
    "type": "case"
  },
  "灭门案": {
    "id": "family_massacre",
    "type": "case"
  },
  "小德里克·维恩": {
    "id": "little_derek_wayne",
    "type": "person"
  },
  "玛莎·迪亚兹": {
    "id": "martha_diaz",
    "type": "person"
  },
  "莫哈韦休息站": {
    "id": "mojave_rest_stop",
    "type": "location"
  },
  "内华达州": {
    "id": "nevada",
    "type": "location"
  },
  "青豆牡蛎汤计划": {
    "id": "project",
    "type": "case"
  },
  "罗阿诺克": {
    "id": "roanoke",
    "type": "location"
  },
  "训练日": {
    "id": "training_day",
    "type": "case"
  },
  "扭曲关系": {
    "id": "twisted_relationship",
    "type": "case"
  },
  "扭曲的肉体关系": {
    "id": "twisted_relationship",
    "type": "case"
  },
  "扭曲肉体关系": {
    "id": "twisted_relationship",
    "type": "case"
  },
  "威廉·道森": {
    "id": "william_dawson",
    "type": "person"
  },
  "1972": {
    "id": "year_1972",
    "type": "year"
  },
  "1990": {
    "id": "year_1990",
    "type": "year"
  },
  "淡蓝色房车": {
    "id": "blue_rv",
    "type": "case"
  },
  "鲍里斯·斯米尔诺夫": {
    "id": "boris_smirnov",
    "type": "person"
  },
  "伯克斯维尔": {
    "id": "burkesville",
    "type": "location"
  },
  "辛辛那提": {
    "id": "cincinnati",
    "type": "location"
  },
  "辛西娅·米勒": {
    "id": "cynthia_miller",
    "type": "person"
  },
  "远亲": {
    "id": "distant_relatives",
    "type": "case"
  },
  "灰水信标": {
    "id": "graywater_beacon",
    "type": "case"
  },
  "堪萨斯城": {
    "id": "kansas_city",
    "type": "location"
  },
  "KLUB-75号分析报告": {
    "id": "klub75_report",
    "type": "case"
  },
  "路易斯维尔": {
    "id": "louisville",
    "type": "location"
  },
  "薄荷计划": {
    "id": "mint_plan",
    "type": "case"
  },
  "流动献血车": {
    "id": "mobile_blood_truck",
    "type": "case"
  },
  "匡提科": {
    "id": "quantico",
    "type": "location"
  },
  "烟盒记录：路易斯维尔": {
    "id": "view_iron_horse_record",
    "type": "case"
  },
  "1973": {
    "id": "year_1973",
    "type": "year"
  },
  "1975": {
    "id": "year_1975",
    "type": "year"
  },
  "1986": {
    "id": "year_1986",
    "type": "year"
  },
  "达文波特": {
    "id": "davenport",
    "type": "location"
  },
  "碎尸案": {
    "id": "dismemberment_case",
    "type": "case"
  },
  "东12街": {
    "id": "east_12th_st",
    "type": "location"
  },
  "行刑室": {
    "id": "execution_room",
    "type": "case"
  },
  "约翰·莫里西": {
    "id": "john_morrissey",
    "type": "person"
  },
  "蛆虫": {
    "id": "maggots",
    "type": "case"
  },
  "新计划": {
    "id": "new_plan",
    "type": "case"
  },
  "皮特·亨德森": {
    "id": "peter_henderson",
    "type": "person"
  },
  "招募": {
    "id": "recruitment",
    "type": "case"
  },
  "圣路易斯": {
    "id": "st_louis",
    "type": "location"
  },
  "特克萨卡纳": {
    "id": "texarkana",
    "type": "location"
  },
  "瓦妮莎": {
    "id": "vanessa",
    "type": "person"
  },
  "1965": {
    "id": "year_1965",
    "type": "year"
  },
  "1976": {
    "id": "year_1976",
    "type": "year"
  },
  "教堂": {
    "id": "church",
    "type": "location"
  },
  "丹佛市郊": {
    "id": "denver_suburb",
    "type": "location"
  },
  "脏弗兰克酒吧": {
    "id": "dirty_frank",
    "type": "location"
  },
  "埃尔帕索": {
    "id": "el_paso",
    "type": "location"
  },
  "80号州际公路": {
    "id": "interstate_80",
    "type": "location"
  },
  "莫宁": {
    "id": "morning",
    "type": "person"
  },
  "警员遇害案": {
    "id": "police_killing",
    "type": "case"
  },
  "牧师": {
    "id": "priest",
    "type": "person"
  },
  "里奇·德莱弗斯": {
    "id": "richie_dreyfuss",
    "type": "person"
  },
  "守夜人": {
    "id": "watchman",
    "type": "case"
  },
  "1974": {
    "id": "year_1974",
    "type": "year"
  },
  "1977": {
    "id": "year_1977",
    "type": "year"
  },
  "软肋": {
    "id": "achilles_heel",
    "type": "case"
  },
  "阿尔伯克基": {
    "id": "albuquerque",
    "type": "location"
  },
  "阿列克谢": {
    "id": "alexei",
    "type": "person"
  },
  "邦妮和克莱德": {
    "id": "bonny_and_clyde",
    "type": "case"
  },
  "化学家情人": {
    "id": "chemist_lover",
    "type": "case"
  },
  "收网": {
    "id": "closing_the_net",
    "type": "case"
  },
  "戈尔和列维探员": {
    "id": "gore_and_levy",
    "type": "person"
  },
  "拉古那海滩": {
    "id": "laguna_beach",
    "type": "location"
  },
  "莫兰迪": {
    "id": "morandi",
    "type": "person"
  },
  "裸根": {
    "id": "naked_root",
    "type": "case"
  },
  "波特兰": {
    "id": "portland",
    "type": "location"
  },
  "战俘营": {
    "id": "pow_camp",
    "type": "location"
  },
  "红杉林": {
    "id": "redwood_forest",
    "type": "location"
  },
  "圣芭芭拉": {
    "id": "santa_barbara",
    "type": "location"
  },
  "圣菲": {
    "id": "santa_fe",
    "type": "location"
  },
  "亚玛力人协议": {
    "id": "amalekite_protocol",
    "type": "case"
  },
  "袭警案": {
    "id": "assault_on_police",
    "type": "case"
  },
  "盲区营地": {
    "id": "blind_zone_camp",
    "type": "location"
  },
  "罗伯特·卡彭": {
    "id": "capone",
    "type": "person"
  },
  "人造烟雾弹": {
    "id": "fake_smoke_bomb",
    "type": "case"
  },
  "费利佩·马尔多纳多": {
    "id": "felipe_maldonado",
    "type": "person"
  },
  "森林地图": {
    "id": "forest_map",
    "type": "case"
  },
  "弗兰克·罗林斯": {
    "id": "frank_rollins",
    "type": "person"
  },
  "汉弗莱县": {
    "id": "humphrey_county",
    "type": "location"
  },
  "利比镇": {
    "id": "libby_town",
    "type": "location"
  },
  "米尔谷": {
    "id": "mill_valley",
    "type": "location"
  },
  "第4号警务站": {
    "id": "precinct_4",
    "type": "location"
  },
  "记者": {
    "id": "reporter",
    "type": "case"
  },
  "罗伯特": {
    "id": "robert",
    "type": "person"
  },
  "什一税": {
    "id": "tithe",
    "type": "case"
  },
  "图森枪战案": {
    "id": "tucson_shooting",
    "type": "case"
  },
  "通缉令": {
    "id": "wanted_poster",
    "type": "case"
  },
  "林地深处": {
    "id": "woodland_depths",
    "type": "location"
  },
  "1983": {
    "id": "year_1983",
    "type": "year"
  },
  "朱莉": {
    "id": "julie",
    "type": "person"
  },
  "朱维尔·钱伯斯": {
    "id": "juvell_chambers",
    "type": "person"
  },
  "圣泉镇": {
    "id": "holy_springs",
    "type": "location"
  },
  "联邦最高通缉令案卷": {
    "id": "MTXXXXXXXX-93",
    "type": "case"
  },
  "匡提科法证实验室QTC-VA-0994": {
    "id": "QTC-VA-0994",
    "type": "location"
  },
  "照片": {
    "id": "photo",
    "type": "case"
  },
  ">> 0x524F42455254_PURGE // ERR::NO_SIGNAL_FROM_GOD // MAGPIE_OVERRIDE >> [FORCE_LOAD_MONSTER]": {
    "id": "reboot_command",
    "type": "clue"
  }
};

export const CLUE_DISPLAY_MAP: Record<string, string> = {};
Object.keys(KEYWORD_REGISTRY).forEach(id => { 
  const meta = KEYWORD_REGISTRY[id];
  CLUE_DISPLAY_MAP[id] = meta.displayName || id; 
  if (meta.displayName && !GLOBAL_KEYWORD_MAP[meta.displayName]) {
    GLOBAL_KEYWORD_MAP[meta.displayName] = { id, type: meta.type };
  }
});
export const UNLOCKS_REGISTRY: Record<string, { keywords: string[], targetId: string, type: 'node' | 'archive' }> = {
  "confession_2": {
    "keywords": [
      "ohio",
      "ritual_case"
    ],
    "targetId": "confession_2",
    "type": "node"
  },
  "confession_3": {
    "keywords": [
      "chicago",
      "missing"
    ],
    "targetId": "confession_3",
    "type": "node"
  },
  "confession_1": {
    "keywords": [
      "maine",
      "small_bank"
    ],
    "targetId": "confession_1",
    "type": "node"
  },
  "confession_6": {
    "keywords": [
      "mojave_rest_stop",
      "empty_cigarette_pack"
    ],
    "targetId": "confession_6",
    "type": "node"
  },
  "confession_7": {
    "keywords": [
      "roanoke",
      "twisted_relationship"
    ],
    "targetId": "confession_7",
    "type": "node"
  },
  "confession_4": {
    "keywords": [
      "1402_old_dominion_rd",
      "training_day"
    ],
    "targetId": "confession_4",
    "type": "node"
  },
  "confession_5": {
    "keywords": [
      "nevada",
      "family_massacre"
    ],
    "targetId": "confession_5",
    "type": "node"
  },
  "confession_8": {
    "keywords": [
      "louisville",
      "blue_rv"
    ],
    "targetId": "confession_8",
    "type": "node"
  },
  "confession_9": {
    "keywords": [
      "cincinnati",
      "mint_plan"
    ],
    "targetId": "confession_9",
    "type": "node"
  },
  "confession_11": {
    "keywords": [
      "klub75_report",
      "quantico"
    ],
    "targetId": "confession_11",
    "type": "node"
  },
  "confession_10": {
    "keywords": [
      "burkesville",
      "distant_relatives"
    ],
    "targetId": "confession_10",
    "type": "node"
  },
  "confession_13": {
    "keywords": [
      "east_12th_st",
      "execution_room"
    ],
    "targetId": "confession_13",
    "type": "node"
  },
  "confession_12": {
    "keywords": [
      "kansas_city",
      "mobile_blood_truck"
    ],
    "targetId": "confession_12",
    "type": "node"
  },
  "confession_15": {
    "keywords": [
      "davenport",
      "new_plan"
    ],
    "targetId": "confession_15",
    "type": "node"
  },
  "confession_14": {
    "keywords": [
      "st_louis",
      "maggots"
    ],
    "targetId": "confession_14",
    "type": "node"
  },
  "confession_19": {
    "keywords": [
      "el_paso",
      "priest"
    ],
    "targetId": "confession_19",
    "type": "node"
  },
  "confession_18": {
    "keywords": [
      "denver_suburb",
      "police_killing"
    ],
    "targetId": "confession_18",
    "type": "node"
  },
  "confession_17": {
    "keywords": [
      "dirty_frank",
      "recruitment"
    ],
    "targetId": "confession_17",
    "type": "node"
  },
  "confession_16": {
    "keywords": [
      "texarkana",
      "dismemberment_case"
    ],
    "targetId": "confession_16",
    "type": "node"
  },
  "confession_23": {
    "keywords": [
      "santa_barbara",
      "closing_the_net"
    ],
    "targetId": "confession_23",
    "type": "node"
  },
  "confession_22": {
    "keywords": [
      "redwood_forest",
      "pow_camp"
    ],
    "targetId": "confession_22",
    "type": "node"
  },
  "confession_26": {
    "keywords": [
      "santa_fe",
      "bonny_and_clyde"
    ],
    "targetId": "confession_26",
    "type": "node"
  },
  "confession_21": {
    "keywords": [
      "portland",
      "achilles_heel"
    ],
    "targetId": "confession_21",
    "type": "node"
  },
  "confession_25": {
    "keywords": [
      "albuquerque",
      "chemist_lover"
    ],
    "targetId": "confession_25",
    "type": "node"
  },
  "confession_24": {
    "keywords": [
      "laguna_beach",
      "naked_root"
    ],
    "targetId": "confession_24",
    "type": "node"
  },
  "confession_20": {
    "keywords": [
      "interstate_80",
      "watchman"
    ],
    "targetId": "confession_20",
    "type": "node"
  },
  "confession_29": {
    "keywords": [
      "woodland_depths",
      "amalekite_protocol"
    ],
    "targetId": "confession_29",
    "type": "node"
  },
  "confession_28": {
    "keywords": [
      "fake_smoke_bomb",
      "blind_zone_camp"
    ],
    "targetId": "confession_28",
    "type": "node"
  },
  "confession_27": {
    "keywords": [
      "mill_valley",
      "reporter"
    ],
    "targetId": "confession_27",
    "type": "node"
  },
  "confession_33": {
    "keywords": [
      "precinct_4",
      "tucson_shooting"
    ],
    "targetId": "confession_33",
    "type": "node"
  },
  "confession_32": {
    "keywords": [
      "mandan",
      "forest_map"
    ],
    "targetId": "confession_32",
    "type": "node"
  },
  "confession_31": {
    "keywords": [
      "humphrey_county",
      "assault_on_police"
    ],
    "targetId": "confession_31",
    "type": "node"
  },
  "confession_30": {
    "keywords": [
      "libby_town",
      "humiliation_ritual"
    ],
    "targetId": "confession_30",
    "type": "node"
  },
  "confession_36B3": {
    "keywords": [
      "QTC-VA-0994",
      "MTXXXXXXXX-93"
    ],
    "targetId": "confession_36B3",
    "type": "node"
  },
  "confession_36A2": {
    "keywords": [
      "van_horn_checkpoint",
      "intercept"
    ],
    "targetId": "confession_36A2",
    "type": "node"
  },
  "confession_36B2": {
    "keywords": [
      "port_jefferson",
      "project"
    ],
    "targetId": "confession_36B2",
    "type": "node"
  },
  "confession_35": {
    "keywords": [
      "appalachia",
      "bait"
    ],
    "targetId": "confession_35",
    "type": "node"
  },
  "confession_34": {
    "keywords": [
      "holy_springs",
      "photo"
    ],
    "targetId": "confession_34",
    "type": "node"
  },
  "confession_36A1": {
    "keywords": [
      "phoenix",
      "meeting"
    ],
    "targetId": "confession_36A1",
    "type": "node"
  },
  "confession_36B1": {
    "keywords": [
      "dry_gully",
      "unnamed_female_body"
    ],
    "targetId": "confession_36B1",
    "type": "node"
  },
  "clipping_01": {
    "keywords": [
      "year_1971",
      "nibi"
    ],
    "targetId": "clipping_01",
    "type": "archive"
  },
  "clipping_02": {
    "keywords": [
      "year_1968",
      "lundgren"
    ],
    "targetId": "clipping_02",
    "type": "archive"
  },
  "clipping_03": {
    "keywords": [
      "year_1967",
      "dr_reggie"
    ],
    "targetId": "clipping_03",
    "type": "archive"
  },
  "clipping_04": {
    "keywords": [
      "year_1985",
      "roger_beebe"
    ],
    "targetId": "clipping_04",
    "type": "archive"
  },
  "clipping_05": {
    "keywords": [
      "year_1971",
      "little_derek_wayne"
    ],
    "targetId": "clipping_05",
    "type": "archive"
  },
  "clipping_06": {
    "keywords": [
      "year_1972",
      "martha_diaz"
    ],
    "targetId": "clipping_06",
    "type": "archive"
  },
  "clipping_07": {
    "keywords": [
      "year_1990",
      "aw_wilmo"
    ],
    "targetId": "clipping_07",
    "type": "archive"
  },
  "clipping_08": {
    "keywords": [
      "year_1973",
      "julie"
    ],
    "targetId": "clipping_08",
    "type": "archive"
  },
  "clipping_09": {
    "keywords": [
      "year_1973",
      "juvell_chambers"
    ],
    "targetId": "clipping_09",
    "type": "archive"
  },
  "clipping_10": {
    "keywords": [
      "year_1973",
      "boris_smirnov"
    ],
    "targetId": "clipping_10",
    "type": "archive"
  },
  "clipping_11": {
    "keywords": [
      "year_1976",
      "jc_penney"
    ],
    "targetId": "clipping_11",
    "type": "archive"
  },
  "clipping_12": {
    "keywords": [
      "year_1965",
      "john_morrissey"
    ],
    "targetId": "clipping_12",
    "type": "archive"
  },
  "clipping_13": {
    "keywords": [
      "year_1976",
      "peter_henderson"
    ],
    "targetId": "clipping_13",
    "type": "archive"
  },
  "clipping_14": {
    "keywords": [
      "year_1967",
      "arthur_dawson"
    ],
    "targetId": "clipping_14",
    "type": "archive"
  },
  "clipping_15": {
    "keywords": [
      "year_1977",
      "richie_dreyfuss"
    ],
    "targetId": "clipping_15",
    "type": "archive"
  },
  "clipping_16": {
    "keywords": [
      "year_1974",
      "morning"
    ],
    "targetId": "clipping_16",
    "type": "archive"
  },
  "clipping_17": {
    "keywords": [
      "year_1976"
    ],
    "targetId": "clipping_17",
    "type": "archive"
  },
  "clipping_18": {
    "keywords": [
      "year_1976"
    ],
    "targetId": "clipping_18",
    "type": "archive"
  },
  "clipping_19": {
    "keywords": [
      "year_1976"
    ],
    "targetId": "clipping_19",
    "type": "archive"
  },
  "clipping_20": {
    "keywords": [
      "year_1975",
      "felipe_maldonado"
    ],
    "targetId": "clipping_20",
    "type": "archive"
  },
  "clipping_21": {
    "keywords": [
      "year_1967",
      "william_dawson"
    ],
    "targetId": "clipping_21",
    "type": "archive"
  },
  "clipping_22": {
    "keywords": [
      "year_1977",
      "frank_rollins"
    ],
    "targetId": "clipping_22",
    "type": "archive"
  },
  "clipping_23": {
    "keywords": [
      "year_1983",
      "capone"
    ],
    "targetId": "clipping_23",
    "type": "archive"
  },
  "clipping_24": {
    "keywords": [
      "year_1981",
      "clement_svirson"
    ],
    "targetId": "clipping_24",
    "type": "archive"
  },
  "clipping_25": {
    "keywords": [
      "year_1985",
      "alexander_mengel"
    ],
    "targetId": "clipping_25",
    "type": "archive"
  },
  "clipping_26": {
    "keywords": [
      "year_1999",
      "cynthia_miller"
    ],
    "targetId": "clipping_26",
    "type": "archive"
  }};

export const KEYWORD_CONSUMPTION_MAP: Record<string, string[]> = {};
Object.entries(UNLOCKS_REGISTRY).forEach(([id, entry]) => { if (entry.keywords) KEYWORD_CONSUMPTION_MAP[id] = entry.keywords; });
