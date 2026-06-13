import { Attachment } from './types';

export const ATTACHMENT_REGISTRY: Record<string, Attachment> = {
  // 1. 黄油朱莉普 (julip)
  'butter_julep_evidence': {
    id: 'butter_julep_evidence',
    type: 'image',
    title: '“黄油朱莉普”物证残留',
    content: 'images/butter_julep_evidence.jpg',
    chapter: 1,
    parentId: 'clipping_08',
    dossierId: 'julip',
    unlockSource: 'clipping_08'
  },
  'fbi_symbol': {
    id: 'fbi_symbol',
    type: 'image',
    title: 'FBI Symbol Analysis',
    content: 'images/fbi-symbol.png',
    chapter: 1,
    parentId: 'clipping_03',
    dossierId: 'julip',
    unlockSource: 'clipping_03'
  },

  // 2. 灰水信标 (graywater_beacon)
  'iron_horse_beacon': {
    id: 'iron_horse_beacon',
    type: 'image',
    title: '视觉残留：灰水信标 (Iron Horse)',
    content: 'images/iron_horse_beacon.jpg',
    chapter: 1,
    parentId: 'graywater_beacon',
    dossierId: 'graywater_beacon',
    unlockSource: 'confession_6' // Explicitly collected via onSetFilingEvidence
  },
  'iron_horse_louisville': {
    id: 'iron_horse_louisville',
    type: 'image',
    title: '视觉残留：路易斯维尔',
    content: 'images/iron_horse_louisville.jpg',
    chapter: 1,
    parentId: 'graywater_beacon',
    // unlockSource: 'jennifer_node_2' // Explicitly collected via onSetFilingEvidence
  },

  // 3. 犯罪路线 (crime_route_map)
  'crime_route_map_v1': {
    id: 'crime_route_map_v1',
    type: 'image',
    title: '犯罪路线图 V1',
    content: 'images/crime-route-map.png',
    chapter: 2,
    parentId: 'crime_route_map',
    unlockSource: 'confession_3'
  },
  'crime_route_map_v2': {
    id: 'crime_route_map_v2',
    type: 'image',
    title: '犯罪路线图 V2',
    content: 'images/crime-route-map-v2.png',
    chapter: 2,
    parentId: 'crime_route_map',
    unlockSource: 'confession_8'
  },
  'crime_route_map_v3': {
    id: 'crime_route_map_v3',
    type: 'image',
    title: '犯罪路线图 V3',
    content: 'images/crime-route-map-v3.png',
    chapter: 3,
    parentId: 'crime_route_map',
    unlockSource: 'confession_11'
  },
  'crime_route_map_v4': {
    id: 'crime_route_map_v4',
    type: 'image',
    title: '犯罪路线图 V4',
    content: 'images/crime-route-map-v4.png',
    chapter: 4,
    parentId: 'crime_route_map',
    unlockSource: 'confession_14'
  },
  'crime_route_map_v5': {
    id: 'crime_route_map_v5',
    type: 'image',
    title: '犯罪路线图 V5',
    content: 'images/crime-route-map-v5.png',
    chapter: 5,
    parentId: 'crime_route_map',
    unlockSource: 'confession_19'
  },
  'crime_route_map_v6': {
    id: 'crime_route_map_v6',
    type: 'image',
    title: '犯罪路线图 V6 (完整版)',
    content: 'images/crime-route-map-v6.png',
    chapter: 7,
    parentId: 'crime_route_map',
    unlockSource: 'confession_29'
  },
  'car_maine_original': {
    id: 'car_maine_original',
    type: 'image',
    title: '缅因州车辆原始档',
    content: 'images/car-maine-original.jpg',
    chapter: 1,
    parentId: 'crime_route_map',
    unlockSource: 'confession_3'
  },
  'car_newmexico_original': {
    id: 'car_newmexico_original',
    type: 'image',
    title: '内华达州车辆原始档',
    content: 'images/car-newmexico-original.jpg',
    chapter: 2,
    parentId: 'crime_route_map',
    unlockSource: 'confession_10'
  },
  'libby_convergence_map': {
    id: 'libby_convergence_map',
    type: 'image',
    title: '灰狗巴士汇聚点地图 (Libby, MT)',
    content: 'images/libby_convergence_map.png',
    chapter: 8,
    parentId: 'crime_route_map',
    unlockSource: 'confession_31'
  },

  // 4. 青豆牡蛎汤计划 (project)
  'jane_doe_1977': {
    id: 'jane_doe_1977',
    type: 'image',
    title: '无名氏 (Jane Doe) 与起火车辆',
    content: 'images/jane_doe_1977.jpg',
    chapter: 4,
    parentId: 'clipping_22',
    dossierId: 'project',
    unlockSource: 'clipping_22'
  },
  'richie_id_card': {
    id: 'richie_id_card',
    type: 'image',
    title: '证件：里奇·德莱弗斯',
    content: 'images/richie_id_card.jpg',
    chapter: 5,
    parentId: 'clipping_15',
    unlockSource: 'clipping_15'
  },
  'church_visual_residue': {
    id: 'church_visual_residue',
    type: 'image',
    title: '视觉残留：圣泉镇教堂',
    content: 'images/church_visual_residue.png',
    chapter: 5,
    parentId: 'project',
    dossierId: 'graywater_beacon',
    unlockSource: 'confession_19'
  },
  'laguna_beach_visual_residue': {
    id: 'laguna_beach_visual_residue',
    type: 'image',
    title: '视觉残留：拉古那海滩',
    content: 'images/laguna_beach_visual_residue.png',
    chapter: 7,
    parentId: 'project',
    unlockSource: 'confession_28'
  },
  'record_of_accounts': {
    id: 'record_of_accounts',
    type: 'image',
    title: '亚瑟·道森的笔记本 (Record of Accounts)',
    content: 'images/record_of_accounts.jpg',
    chapter: 6,
    parentId: 'project',
    dossierId: 'project',
    // unlockSource: 'confession_16'
  },
  'wilmer_ribbon': {
    id: 'wilmer_ribbon',
    type: 'image',
    title: '1990 丝带物证',
    content: 'images/wilmer_ribbon.jpg',
    chapter: 7,
    parentId: 'clipping_07',
    dossierId: 'project',
    // unlockSource: 'clipping_07'
  },
  'felipe_maldonado_poster': {
    id: 'felipe_maldonado_poster',
    type: 'image',
    title: '乐队演出海报 (Eugene, OR)',
    content: 'images/felipe_maldonado_poster.jpg',
    chapter: 7,
    parentId: 'project',
    // unlockSource: 'confession_29'
  },
  'william_dawson_pendant': {
    id: 'william_dawson_pendant',
    type: 'image',
    title: '银色吊坠盒 (Pendant)',
    content: 'images/william_dawson_pendant.png',
    chapter: 8,
    parentId: 'project',
    // unlockSource: 'confession_30'
  },
  'libby_ticket': {
    id: 'libby_ticket',
    type: 'image',
    title: '灰狗巴士票根 (Libby, MT)',
    content: 'images/libby_ticket.jpg',
    chapter: 8,
    parentId: 'project',
    // unlockSource: 'jennifer_node_7'
  },
  'robert_capone_wanted_poster': {
    id: 'robert_capone_wanted_poster',
    type: 'image',
    title: '通缉令：罗伯特·卡彭 (素描)',
    content: 'images/robert_capone_wanted_poster.png',
    chapter: 8,
    parentId: 'project',
    // unlockSource: 'confession_33'
  },
  'capone_alice_meeting': {
    id: 'capone_alice_meeting',
    type: 'image',
    title: '现场照：卡彭与艾莉丝',
    content: 'images/capone_alice_meeting.jpg',
    chapter: 8,
    parentId: 'project',
    dossierId: 'project',
    // unlockSource: 'confession_36A1'
  },
  'confession_31_residue_custom': {
    id: 'confession_31_residue_custom',
    type: 'image',
    title: '供述 No.31 视觉残留',
    content: 'images/confession_31_residue_custom.jpg',
    chapter: 8,
    parentId: 'project',
    // unlockSource: 'confession_31'
  },
  'confession_32_vanessa_sketch': {
    id: 'confession_32_vanessa_sketch',
    type: 'image',
    title: '瓦妮莎记忆素描',
    content: 'images/confession_32_vanessa_sketch.png',
    chapter: 8,
    parentId: 'project',
    // unlockSource: 'confession_32'
  },
  'creekspring_award_ceremony': {
    id: 'creekspring_award_ceremony',
    type: 'image',
    title: '1981 溪泉镇颁奖典礼合照',
    content: 'images/creekspring_award_ceremony_1981_photo.jpg',
    chapter: 9,
    parentId: 'clipping_23',
    dossierId: 'project',
    // unlockSource: 'clipping_23'
  },
  'death_report': {
    id: 'death_report',
    type: 'image',
    title: '无名氏尸检报告 #88-B',
    content: 'images/john_doe_autopsy_report.png',
    chapter: 9,
    parentId: 'project',
    // unlockSource: 'jennifer_node_8'
  }
};
