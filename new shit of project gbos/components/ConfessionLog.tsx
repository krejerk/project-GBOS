import * as React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lock, AlertCircle, Hash } from 'lucide-react';

// Definition of all confessions for the directory
const CONFESSION_REGISTRY = [
  {
    id: 'confession_1',
    displayId: 'REC-1971-MN',
    title: '供述 No.1: 缅因州银行劫案',
    eventTime: '1971',
    location: '缅因州 (Maine)',
    keywords: ['缅因州', '阿尔衮琴', '供述', '扭曲关系'],
    people: ['尼比 (Nibi)', '康查尔 (Conchar)'],
    summary: '关于1971年针对缅因州第一国民银行的武装劫案供述。揭示了尼比作为执行者与康查尔作为策划者之间的非典型同谋关系。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_2',
    displayId: 'REC-1968-OH',
    title: '供述 No.2: 俄亥俄州祭祀案',
    eventTime: '1968',
    location: '俄亥俄州 (Ohio)',
    keywords: ['俄亥俄州', '祭祀案', '伦德格兰'],
    people: ['伦德格兰 (Lundgren)', '莫宁 (Morning)'],
    summary: '关于1968年俄亥俄州柯特兰邪教屠杀案的供述。揭示了雷吉博士的"统一场论"与伦德格兰案件之间的联系。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_3',
    displayId: 'REC-1985-IL',
    title: '供述 No.3: 罗格·毕比失踪案',
    eventTime: '1985',
    location: '伊利诺伊州 (Illinois)',
    keywords: ['罗格·毕比', '1985'],
    people: ['罗格·毕比 (Roger Beebe)'],
    summary: '关于香槟镇失踪案真凶的供述。揭示了罗格·毕比在1985年落网后的供词，以及康查尔对此类"不受控恶行"的鄙夷态度。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_4',
    displayId: 'REC-1967-NV',
    title: '供述 No.4: 训练日回忆',
    eventTime: '1967',
    location: '内华达州 (Nevada)',
    keywords: ['训练日', '1402 Old Dominion Rd.', '内华达州', '雷吉博士'],
    people: ['雷吉博士 (Dr. Reggie)'],
    summary: '关于特工选拔与训练结束时的关键对话。揭示了雷吉博士选中卡彭的真实原因——一种被视为"天赋"的精神病态特质。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_5',
    displayId: 'REC-1973-NV',
    title: '供述 No.5: 维恩灭门案',
    eventTime: '1973',
    location: '内华达州 (Nevada)',
    keywords: ['小德里克·维恩', '灭门案'],
    people: ['小德里克·维恩 (Derek Wayne Jr.)', '康查尔 (Conchar)'],
    summary: '关于维恩一家惨遭灭门的真相。揭示了该家族长子因其变态嗜好招致的报复，以及康查尔对此事所持的"受约束暴力"观点。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_6',
    displayId: 'REC-1972-VA',
    title: '供述 No.6: 灰水信标',
    eventTime: '1972',
    location: '弗吉尼亚州 (Virginia)',
    keywords: ['罗阿诺克市', '灰水信标', '铁马'],
    people: ['雷吉博士 (Dr. Reggie)', '康查尔 (Conchar)'],
    summary: '关于“信标”系统的建立与早期运作。揭示了康查尔在逃亡途中如何利用特定品牌烟盒向清理小组单向传递情报的全过程。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_7',
    displayId: 'REC-1972-VA-R',
    title: '供述 No.7: 罗阿诺克谋杀案',
    eventTime: '1972 ∙ 深秋',
    location: '弗吉尼亚州 罗阿诺克市 (Roanoke)',
    keywords: ['罗阿诺克市', '扭曲关系', '莫布利', '玛莎·迪亚兹', '1972'],
    people: ['康查尔 (Conchar)', '尼比 (Nibi)', '玛莎·迪亚兹 (Martha Diaz)'],
    summary: '关于康查尔与尼比之间病态关系的深度剖析，以及卡彭在罗阿诺克市的廉价旅馆中首次接触暴力仪式的经历。揭示了他目睹玛莎·迪亚兹被杀的全过程。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_8',
    displayId: 'REC-1973-KY',
    title: '供述 No.8: 路易斯维尔房车',
    eventTime: '1973 ∙ 正月',
    location: '肯塔基州 路易斯维尔 (Louisville)',
    keywords: ['路易斯维尔', '淡蓝色房车', '1973', '朱莉', '辛辛那提'],
    people: ['父亲 (Father)', '康查尔 (Conchar)', '母亲 (The Mother)', '塞勒斯 (Silas)', '瓦妮莎 (Vanessa)'],
    summary: '关于卡彭首次进入"家族"核心的供述。揭示了1973年辛辛那提少女朱莉冻死案的真相，以及他在路易斯维尔码头首次见到"父亲" and 淡蓝色房车内其他成员的经历。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_9',
    displayId: 'REC-1982-TX',
    title: '供述 No.9: 薄荷计划与灵魂厨房',
    eventTime: '1982 ∙ 深秋',
    location: '德克萨斯州 埃尔帕索 (El Paso)',
    keywords: ['辛辛那提', '薄荷计划', '1982', '埃尔帕索', '朱维尔·钱伯斯', '1973'],
    people: ['父亲 (Father)', '康查尔 (Conchar)', '朱维尔·钱伯斯 (Juvell Chambers)'],
    summary: '关于"灵魂厨房计划"的深度揭露。卡彭讲述了1982年在埃尔帕索投放最后一个信标的经历，以及1973年纳什维尔军械库窃案背后"家族"利用种族冲突掩护犯罪的真相。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_10',
    displayId: 'REC-1973-KY-B',
    title: '供述 No.10: 伯克斯维尔计划',
    eventTime: '1973 ∙ 深秋',
    location: '肯塔基州 伯克斯维尔 (Burkesville)',
    keywords: ['伯克斯维尔', '远亲', '1973', '鲍里斯·斯米尔诺夫'],
    people: ['父亲 (Father)', '康查尔 (Conchar)', '塞勒斯 (Silas)', '母亲 (The Mother)', '鲍里斯·斯米尔诺夫 (Boris Smirnov)'],
    summary: '关于卡彭首次独立策划行动的供述。揭示了1973年在伯克斯维尔，"父亲"如何要求他为"远亲"设计计划，以及家族内部"先拆解再重塑"的招募方法和成员间的权力关系。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_11',
    displayId: 'REC-1975-KY-SS',
    title: '供述 No.11: 静态雪花计划',
    eventTime: '1975年前后',
    location: '肯塔基州 伯克斯维尔 (Burkesville)',
    keywords: ['KLUB-75报告', '匡提科', '静态雪花计划'],
    people: ['父亲 (Father)', '母亲 (The Mother)', '塞勒斯 (Silas)', '辛西娅·米勒 (Cynthia Miller)'],
    summary: '关于"静态雪花计划"的供述。揭示了卡彭如何利用FBI战术设计心理操控行动，通过拍摄"前卫艺术"录像绑架辛西娅·米勒，制造恐慌并享受破坏秩序的快感，完成从FBI探员到享受混乱的变态者的心理转变。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_12',
    displayId: 'REC-1976-MO',
    title: '供述 No.12: 流动献血车计划',
    eventTime: '1976',
    location: '堪萨斯城 (Kansas City)',
    keywords: ['堪萨斯城', '流动献血车', '1976', '杰西·潘尼'],
    people: ['罗伯特·卡彭 (Robert Capone)', '赛勒斯 (Silas)', '瓦妮莎 (Vanessa)'],
    summary: '关于1976年堪萨斯城"流动献血车"行动的供述。揭示了卡彭如何设计极其荒谬的超现实主义犯罪来拖延捕捕时间并渗透远亲网络，以及瓦妮莎对其人性转变的质问。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_13',
    displayId: 'REC-1976-MO-C',
    title: '供述 No.13: 混乱的美学',
    eventTime: '1976',
    location: '堪萨斯城 (Kansas City)',
    keywords: ['约翰·莫里西', '混乱美学', '1976'],
    people: ['父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于莫里西（杰西·潘尼）被捕后的对话揭密。揭示了"父亲"对"混乱"的独特哲学见解，以及卡彭如何通过制造混乱，在不经意间摧毁了连联邦政府都无法撼动的犯罪堡垒。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_14',
    displayId: 'REC-1976-SL',
    title: '供述 No.14: 圣路易斯之夜',
    eventTime: '1976',
    location: '密苏里州 圣路易斯市 (St. Louis)',
    keywords: ['圣路易斯', '蛆虫'],
    people: ['母亲 (The Mother)', '塞勒斯 (Silas)', '瓦妮莎 (Vanessa)'],
    summary: '关于堪萨斯城行动后，在圣路易斯市郊房车内发生的古老且极其令人不适的仪式。揭示了“母亲”与“父亲”之间通过鲜血构建的共生关系本质。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_15',
    displayId: 'REC-1976-IA',
    title: '供述 No.15: 达文波特静默屠杀',
    eventTime: '1976',
    location: '爱荷华州 达文波特市 (Davenport)',
    keywords: ['达文波特市', '新计划', '1976', '静默屠杀'],
    people: ['皮特·亨德森 (Peter Henderson)', '康查尔 (Conchar)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于爱荷华州达文波特郊区亨德森一家灭门案的供述。康查尔以“新计划”为名，对一户普通中产家庭施加极端心理拷问，却在男主人皮特·亨德森拒绝成为“怪物”的选择面前首次感到挫败；这一刻也让卡彭在房车内重新想起自己身为警探的身份与使命。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_16',
    displayId: 'REC-1967-TX',
    title: '供述 No.16: 特克萨卡纳碎尸案',
    eventTime: '1967',
    location: '得克萨斯州 特克萨卡纳 (Texarkana)',
    keywords: ['特克萨卡纳', '碎尸案', '亚瑟·道森'],
    people: ['亚瑟·道森 (Arthur Dawson)', '康查尔 (Conchar)', '瓦妮莎 (Vanessa)'],
    summary: '关于1967年特克萨卡纳碎尸案的真相，以及卡彭从房车大梁下意外发现的亚瑟·道森笔记。揭示了亚瑟对“远亲”网络真实性的早期质疑，以及这种质疑如何导致了他的死亡。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_17',
    displayId: 'REC-1977-IL',
    title: '供述 No.17: 脏弗兰克酒吧与招募',
    eventTime: '1977年前后',
    location: '伊利诺伊州 罗克福德市 (Rockford)',
    keywords: ['脏弗兰克酒吧', '招募', '罗克福德市', '里奇·德莱弗斯'],
    people: ['里奇·德莱弗斯 (Richie Dreyfuss)', '康查尔 (Conchar)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于里奇·德莱弗斯的招募背景及其死因的供述。描述了康查尔在罗克福德市的一间旅馆内设计的“俄罗斯轮盘”心理博弈，最终导致里奇因极度恐惧而自发性心脏衰竭。揭示了康查尔“恐惧才是唯一的子弹”这一极端哲学。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_18',
    displayId: 'REC-1974-UT',
    title: '供述 No.18: 警员遇害案与艾莉丝',
    eventTime: '1974 ∙ 秋',
    location: '犹他州 盐湖城郊外 (Utah)',
    keywords: ['丹佛市郊', '警员遇害案', '艾莉丝', '利伯勒尔', '冰锥'],
    people: ['艾莉丝 (Alice)', '康查尔 (Conchar)', '米勒副警长 (Deputy Miller)'],
    summary: '关于艾莉丝加入“家族”背景的供述。描述了她在丹佛市郊利伯勒尔镇对米勒副警长的残酷处决过程。揭示了艾莉丝作为该组织中真正“享受”杀戮的成员身份，以及她顺着血腥味横跨半个美国寻找罗伯特的惊人执念。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_19',
    displayId: 'REC-1974-TX',
    title: '供述 No.19: 埃尔帕索教堂屠杀',
    eventTime: '1974',
    location: '德克萨斯州 埃尔帕索 (El Paso)',
    keywords: ['埃尔帕索', '神父', '教堂', '1974', '猎枪'],
    people: ['神父 (The Priest)', '康查尔 (Conchar)', '塞勒斯 (Silas)'],
    summary: '关于埃尔帕索教堂惨案的供述。揭示了康查尔如何利用种族仇恨煽动一起针对边境教堂的袭击，以及那名所谓“沉默的神父”在死亡面前展现出的、令康查尔感到不安的平静。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_20',
    displayId: 'REC-1978-NV',
    title: '供述 No.20: 80号洲际公路守夜人',
    eventTime: '1978',
    location: '内华达州 80号洲际公路 (I-80)',
    keywords: ['80号洲际公路', '守夜人', '无线电', '卡车司机'],
    people: ['罗伯特·卡彭 (Robert Capone)', '守夜人 (The Watchman)'],
    summary: '关于在80号公路上遇到的神秘卡车司机“守夜人”的供述。这实际上是卡彭分裂人格的早期具象化体现，他在无线电中与另一个自己对话，预示着他最终精神崩溃的开端。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_21',
    displayId: 'REC-1951-KR',
    title: '供述 No.21: 亚玛力人协议',
    eventTime: '1951 / 1968',
    location: '梅诺西诺 (Mendocino) / 巨济岛 (Geoje-do)',
    keywords: ['波特兰', '软肋', '红杉林', '战俘营', '亚玛力人协议'],
    people: ['父亲 (Father)', '雷吉博士 (Dr. Reggie)', '塞勒斯 (Silas)', '艾莉丝 (Alice)'],
    summary: '关于“父亲”权威来源的终极解密。揭示了他在朝鲜战争巨济岛战俘营的经历，以及他如何将美军心理战技术转化为控制“家族”的洗脑工具（亚玛力人协议），并以此策划了针对嬉皮士的假旗行动。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_22',
    displayId: 'REC-1975-CA',
    title: '供述 No.22: 圣芭芭拉收网',
    eventTime: '1975',
    location: '加利福尼亚州 圣芭芭拉 (Santa Barbara)',
    keywords: ['红杉林', '战俘营', '圣芭芭拉', '收网', '什一税'],
    people: ['罗伯特·卡彭 (Robert Capone)', '瓦妮莎 (Vanessa)', '父亲 (Father)', '康查尔 (Conchar)'],
    summary: '关于卡彭在房车夹层发现真相并决定收网的关键转折点。揭示了瓦妮莎试图策反他的失败尝试，以及他在发现父亲利用房车车顶夹层伪造“神谕”和生产宣传品后，决心将其逮捕的心理决断。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_23',
    displayId: 'REC-1975-CA-B',
    title: '供述 No.23: 裸根行动与误判',
    eventTime: '1975',
    location: '加利福尼亚州 圣芭芭拉 (Santa Barbara)',
    keywords: ['拉古那海滩', '裸根', '阿列克谢·罗科维奇', '瓦妮莎'],
    people: ['罗伯特·卡彭 (Robert Capone)', '艾莉丝 (Alice)', '阿列克谢 (Alexei)', '塞勒斯 (Silas)'],
    summary: '关于针对苏联情报站负责人阿列克谢·罗科维奇的静默清洗行动。揭示了艾莉丝为了确保行动成功和掩盖行踪，不惜炸死自己的情人兼棋子塞勒斯，并将阿列克谢焚尸灭迹，导致原本的渗透任务升级为"恐怖袭击"，迫使"父亲"不得不更加激进地利用手中的筹码。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_24',
    displayId: 'REC-1975-LB',
    title: '供述 No.24: 化学家情人与大法官',
    eventTime: '1975',
    location: '加利福尼亚州 拉古那海滩 (Laguna Beach)',
    keywords: ['莫兰迪', '阿尔伯克基市', '化学家情人'],
    people: ['父亲 (Father)', '艾莉丝 (Alice)', '瓦妮莎 (Vanessa)', '索恩法官 (Judge Thorne)', '莫兰迪 (Morandi)'],
    summary: '关于利用"裸根"名单控制联邦大法官肯尼迪·索恩的供述。描述了艾莉丝如何利用她的旧情人"莫兰迪"（阿尔伯克基爆炸案主犯）作为诱饵，以及父亲如何通过残酷的手段（给瓦妮莎注射士的宁）来取悦并控制这位变态法官，从而接管了KGB对司法系统的渗透网络。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_25',
    displayId: 'REC-1975-NM',
    title: '供述 No.25: 邦妮和克莱德',
    eventTime: '1975',
    location: '新墨西哥州 阿尔伯克基 (Albuquerque)',
    keywords: ['圣菲', '邦妮和克莱德'],
    people: ['罗伯特·卡彭 (Robert Capone)', '艾莉丝 (Alice)', '莫兰迪 (Morandi)'],
    summary: '关于前往新墨西哥州接收高能炸药的途中经历。揭示了卡彭与艾莉丝在逃亡与服从之间的一念之差，以及艾莉丝对卡彭内心"精神病态"特质的精准洞察与诱导。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_26',
    displayId: 'REC-1976-AZ',
    title: '供述 No.26: 最后的押送',
    eventTime: '1976',
    location: '亚利桑那州 (Arizona)',
    keywords: ['圣菲', '邦妮和克莱德'],
    people: ['罗伯特·卡彭 (Robert Capone)', '父亲 (Father)', '母亲 (Mother)', '艾莉丝 (Alice)', '瓦妮莎 (Vanessa)'],
    summary: '卡彭潜伏生涯的终结之战。描述了他如何巧妙利用瓦妮莎和莫兰迪的冲突调开同伙，并在荒漠公路上亲手处决“母亲”并完全控制了“父亲”。这是一次彻底的人格断裂与重组。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_27',
    displayId: 'REC-1976-MV',
    title: '供述 No.27: 米尔谷的礼物',
    eventTime: '1976 ∙ 晚秋',
    location: '加利福尼亚州 米尔谷 (Mill Valley)',
    keywords: ['莫兰迪', '米尔谷', '礼物', '1976', '迟摘特酿'],
    people: ['莫兰迪 (Morandi)', '艾莉丝 (Alice)', '父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于1976年米尔谷针对某位记者的长期爆炸计划供述。莫兰迪利用“重力是不朽的”这一冷酷哲学，在地基中安置了通过沥青缓慢下滴触发的炸药。这不仅是一次犯罪，更是一场关于时间、恶意与“迟摘特酿”美学的病态展示。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_28',
    displayId: 'REC-1976-LB',
    title: '供述 No.28: 拉古那海滩的清道夫',
    eventTime: '1976 ∙ 冬',
    location: '加利福尼亚州 拉古那海滩 (Laguna Beach)',
    keywords: ['拉古那海滩', '戈尔和列维探员'],
    people: ['罗伯特·卡彭 (Robert Capone)', '艾莉丝 (Alice)', '戈尔和列维探员 (Agents Gore & Levy)'],
    summary: '关于在拉古那海滩反杀两名监视房车的联邦调查局探员的供述。揭示了卡彭如何单枪匹马处理掉戈尔和列维探员，并利用防弹监视车将尸体沉入海沟。这也引出了关于谁在暗中泄露行踪的更深层疑云。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_29',
    displayId: 'REC-1975-OR',
    title: '供述 No.29: 红杉林深处',
    eventTime: '1975',
    location: '俄勒冈州 (Oregon)',
    keywords: ['林地深处', '亚玛力人协议', '费利佩·马尔多纳多', 'FELIPE MALDONADO'],
    people: ['费利佩·马尔多纳多 (Felipe Maldonado)', '瓦妮莎 (Vanessa)', '艾莉丝 (Alice)'],
    summary: '关于1976年发生在俄勒冈红杉林中的惨案。揭示了瓦妮莎对自由的渴望，以及艾莉丝如何以一种极其残酷的方式“满足”了这种渴望——带回了一张带血的费利佩·马尔多纳多演出海报。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_30',
    displayId: 'REC-1967-MT',
    title: '供述 No.30: 利比镇意难平',
    eventTime: '1967',
    location: '蒙大拿州 利比镇 (Libby)',
    keywords: ['利比镇', '威廉·道森', '吊坠', '1967'],
    people: ['威廉·道森 (William Dawson)', '亚瑟·道森 (Arthur Dawson)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于在利比镇发现的银色吊坠供述。揭示了威廉·道森的真实身份，以及他在被处决前留给未出世孙辈的最后遗产。这不仅是一个物证，更是卡彭家族罪行的沉默见证，标记着道森一家悲剧的终点。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_31',
    displayId: 'REC-1967-ND',
    title: '供述 No.31: 曼丹市的房车',
    eventTime: '1967',
    location: '北达科他州 曼丹市 (Mandan)',
    keywords: ['曼丹市', '森林地图'],
    people: ['康查尔 (Conchar)', '瓦妮莎 (Vanessa)', '父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于曼丹市青少年矫正机构接送瓦妮莎及康查尔入狱背后的真相供述。解开了康查尔入狱其实是父亲为隔离瓦妮莎并维持其“清白感”而精心策划的圈套，同时也标志着卡彭对家族谎言网的进一步拆解。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_32',
    displayId: 'REC-1977-AZ',
    title: '供述 No.32: 瓦妮莎的素描',
    eventTime: '1977',
    location: '亚利桑那州 (Arizona)',
    keywords: ['弗兰克·罗林斯', '森林地图', '1977年'],
    people: ['弗兰克·罗林斯 (Frank Rollins)', '瓦妮莎 (Vanessa)'],
    summary: '关于瓦妮莎所受折磨与道森家惨案真相的供述。解开了这辆房车底盘笔记本的真正来源，以及弗兰克·罗林斯（康查尔）对道森一家的定点清除真相。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_33',
    displayId: 'REC-1983-TX',
    title: '供述 No.33: 罗伯特的画像',
    eventTime: '1983',
    location: '奥德赛 (Odyssey)',
    keywords: ['图森枪击案', '1983年', '罗伯特·卡彭'],
    people: ['罗伯特·卡彭 (Robert Capone)', '艾莉丝 (Alice)', '瓦妮莎 (Vanessa)'],
    summary: '关于1983年在奥德赛邮局发现罗伯特通缉令的供述。描述了卡彭在图森枪击案后返回美国，发疯般跨州寻找瓦妮莎的下落，并在布告栏上看到艾莉丝留下的带有挑衅意味的画像。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_34',
    displayId: 'REC-1981-OH',
    title: '供述 No.34: 伦德格兰的游击队',
    eventTime: '1981',
    location: '阿巴拉契亚山脉 (Appalachian Mountains)',
    keywords: ['伦德格兰', '克莱门特·斯维尔松', '1981年'],
    people: ['伦德格兰 (Lundgren)', '艾莉丝 (Alice)', '莫兰迪 (Morandi)'],
    summary: '关于艾莉丝和莫兰迪寻找伦德格兰并在阿巴拉契亚山脉隐藏的供述。揭示了1981年伦德格兰的武装游击队被州警清剿的真相。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_35',
    displayId: 'REC-1985-MX',
    title: '供述 No.35: 华雷斯的地下室',
    eventTime: '1985',
    location: '华雷斯 (Juárez)',
    keywords: ['罗格·毕比', '艾利克斯·门格尔', '1985年', '玛尔缇娜'],
    people: ['罗格·毕比 (Roger Beebe)', '父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '关于将“父亲”长期囚禁在华雷斯黑诊所地下室的供述。卡彭试图以此隔离他，直到父亲无意中透露了瓦妮莎可能遭遇连环杀手门格尔的消息，动摇了卡彭的心理防线。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_36A1',
    displayId: 'REC-1985-UN',
    title: '供述 No.36A1: 迟来的真相',
    eventTime: '1985',
    location: '未知 (Unknown)',
    keywords: ['真相'],
    people: ['艾莉丝 (Alice)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '卡彭在看到照片后精神崩溃的供述。他意识到自己潜意识中一直在逃避瓦妮莎已死的真相，并发现自己在被艾莉丝利用。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_36A2',
    displayId: 'REC-1985-TX',
    title: '供述 No.36A2: 最后的道别',
    eventTime: '1985',
    location: '范霍恩边境检查站 (Van Horn)',
    keywords: ['范霍恩边境检查站', '玛尔缇娜'],
    people: ['罗伯特·卡彭 (Robert Capone)'],
    summary: '卡彭决定放弃抵抗，并在交代出华雷斯的藏身坐标后，平静地等待死亡和解脱。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_36B1',
    displayId: 'REC-1985-NY',
    title: '供述 No.36B1: 杰弗逊港的遗憾',
    eventTime: '1985',
    location: '杰弗逊港 (Port Jefferson)',
    keywords: ['杰弗逊港', '詹妮弗'],
    people: ['瓦妮莎 (Vanessa)', '詹妮弗 (Jennifer)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '卡彭回想起在杰弗逊港初遇瓦妮莎的时光。他察觉到了詹妮弗的真实意图，以及她如何利用他对瓦妮莎的希望作为诱饵。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_36B2',
    displayId: 'REC-1985-KY',
    title: '供述 No.36B2: 青豆牡蛎汤计划',
    eventTime: '1973 - 1985',
    location: '路易斯维尔 (Louisville)',
    keywords: ['青豆牡蛎汤计划', '詹妮弗'],
    people: ['父亲 (Father)', '詹妮弗 (Jennifer)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '卡彭揭露“青豆牡蛎汤计划”的真实含义：那是父亲专门为他设下的陷阱，旨在利用他反向渗透FBI网络，而詹妮弗则是隐藏在系统背后的那张底牌。',
    status: 'DECRYPTED'
  },
  {
    id: 'confession_36B3',
    displayId: 'REC-1985-MX2',
    title: '供述 No.36B3: 切断呼吸机',
    eventTime: '1985',
    location: '华雷斯 (Juárez)',
    keywords: ['华雷斯', '马库斯·索恩', '呼吸机'],
    people: ['父亲 (Father)', '罗伯特·卡彭 (Robert Capone)'],
    summary: '卡彭下定决心，请求通过系统后门切断维持“父亲”生命的呼吸机，亲手为这个长达数十年的梦魇画上句号。',
    status: 'DECRYPTED'
  }
];

interface ConfessionLogProps {
    unlockedNodeIds: string[];
    onClose: () => void;
    onViewNode: (id: string) => void;
}

export const ConfessionLog: React.FC<ConfessionLogProps> = ({ unlockedNodeIds, onClose, onViewNode }) => {
    return (
        <div className="flex flex-col h-full bg-[#0c0c0c] border border-[#d89853]/30 rounded-lg overflow-hidden font-mono">
            <div className="p-4 border-b border-[#c85a3f]/20 bg-black/40 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[#d89853]">
                    <FileText size={18} />
                    <span className="font-bold tracking-widest uppercase">供述日志目录 // CONFESSION LOGS</span>
                </div>
                <div className="text-[10px] text-[#c85a3f]/60">
                    LEVEL 5 CLEARANCE REQUIRED
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {[...(CONFESSION_REGISTRY || [])]
                    .filter(record => unlockedNodeIds.includes(record.id))
                    .reverse()
                    .map((record, index) => {
                    return (
                        <motion.div
                            key={record.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => onViewNode(record.id)}
                            className="bg-[#d89853]/5 border-l-2 border-[#d89853] p-5 rounded-r shadow-[0_0_15px_rgba(216,152,83,0.1)] group hover:bg-[#d89853]/10 transition-colors cursor-pointer relative overflow-hidden"
                        >
                            {/* Hover Highlight Effect */}
                            <div className="absolute inset-0 bg-[#d89853]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            {/* Header Line */}
                            <div className="flex justify-between items-start mb-3 border-b border-[#d89853]/10 pb-2 relative z-10">
                                <div>
                                    <h3 className="text-[#d89853] font-bold text-lg tracking-wide group-hover:text-white transition-colors">{record.title}</h3>
                                    <div className="flex gap-3 text-[10px] text-[#c85a3f]/80 mt-1 font-mono">
                                        <span>LOC: {record.location}</span>
                                    </div>
                                </div>
                                <Hash size={24} className="text-[#d89853]/10 group-hover:text-[#d89853]/30 transition-colors" />
                            </div>

                            {/* Keywords Chips */}
                            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                                {(record.keywords || []).map(k => (
                                    <span key={k} className="px-2 py-0.5 bg-[#d89853]/10 text-[#d89853] text-[10px] rounded border border-[#d89853]/20">
                                        {k}
                                    </span>
                                ))}
                            </div>

                            {/* People */}
                            <div className="mb-3 text-xs text-[#d89853]/80 relative z-10">
                                <span className="text-[#c85a3f] font-bold uppercase mr-2">涉及人物:</span>
                                {(record.people || []).join(', ')}
                            </div>

                            {/* Summary */}
                            <div className="text-sm text-neutral-400 leading-relaxed font-light border-l-2 border-[#c85a3f]/30 pl-3 mb-3 custom-summary-clamp relative z-10">
                                {record.summary}
                            </div>

                            {/* View Full Action */}
                            <div className="flex justify-end relative z-10">
                                <button className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-[#d89853] opacity-60 group-hover:opacity-100 transition-opacity border border-[#d89853]/30 px-3 py-1 rounded hover:bg-[#d89853] hover:text-black">
                                    <FileText size={10} />
                                    VIEW FULL TRANSCRIPT
                                </button>
                            </div>
                        </motion.div>
                    );
                })}

                {unlockedNodeIds.length === 0 && (
                    <div className="text-center text-[#c85a3f]/40 py-12 flex flex-col items-center gap-3">
                        <AlertCircle size={32} />
                        <p>AWAITING NEURAL SYNCHRONIZATION...</p>
                        <p className="text-xs">No confession records recovered.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#c85a3f]/20 bg-black/40 text-[10px] text-[#c85a3f]/40 text-center uppercase tracking-widest">
                G.B.O.S. Secure Archives // Confidential
            </div>
        </div>
    );
};
