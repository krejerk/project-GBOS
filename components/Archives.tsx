import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, Search, X, ShieldAlert, Stamp, ChevronRight, File, FolderOpen, Folder } from 'lucide-react';

interface ArchivesProps {
    isOpen: boolean;
    onClose: () => void;
    unlockedArchiveIds: string[];
    onUnlockArchive: (id: string) => void;
    onCollectClue: (id: string, word: string) => void;
    collectedClues: string[];
    collectedYears: string[];
    unlockedPeople: string[];
    collectedDossierIds: string[];
    onConsumeKeywords: (yearIds: string[], personIds: string[]) => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
    currentStoryNode?: number;
}

interface DetailedArchiveRecord {
    id: string;
    title: string;
    triggers: {
        year: string;
        person: string[];
    };
    newspaper: {
        source: string;
        date: string;
        headline: string;
        content: string[];
    };
    annotation: {
        fileId: string;
        date: string;
        level: string;
        author: string;
        content: string;
        template?: 'REGGIE' | 'ALTERMAN' | 'THORNE' | 'CRANE';
    };
}

const ARCHIVE_DATABASE: DetailedArchiveRecord[] = [
    {
        id: 'me_1971',
        title: '1971年索科区银行劫案',
        triggers: {
            year: '1971',
            person: ['nibi', '尼比', 'Nibi']
        },
        newspaper: {
            source: '《海岸信使报》',
            date: '1971年11月14日',
            headline: '主街银行遭洗劫，劫匪佩戴原住民头饰实施暴行',
            content: [
                '本报讯 —— 本周一晨，两名武装劫匪袭击了索科区主街的州立储蓄银行。作案过程极为迅速，歹徒表现出的残暴程度令全镇陷入恐慌。',
                '据现场目击者描述，劫匪在警方抵达前几分钟便已携带数额不明的现金，驾驶深色福特轿车逃离。令人不寒而栗的是，即便在如此短的响应时间里，且职员已完全配合交出财物的情况下，劫匪仍对多名人质实施了残暴且毫无必要的殴打与凌虐。一名治安官发言人表示：“这不像是为了钱，更像是在宣泄某种纯粹的恶意。”',
                '据多名证人证实，两名劫匪作案时均佩戴着显眼的异族头饰，目前尚不清楚这是否是劫匪故意留下的某种符号。州警署现已封锁现场，案件仍在紧张侦办中。'
            ]
        },
        annotation: {
            fileId: 'ME-1971-08-SEC',
            date: '1972年2月14日',
            level: '机密 (CONFIDENTIAL)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `
【案卷分析批注】
关于“1971年11月14日索科区银行劫案”的补充评估：

**暴力冗余（Violence Redundancy）：**
现场报告显示，受害者受到的创伤远超“控制人质”的需求。这种残暴行为并非由于恐慌，而是具备极强的目的性。完全符合我们对“家庭”初期仪式化行为的预测：暴力本身即是他们的交流语言。

**符号污染（Symbolic Contamination）：**
关于“阿尔衮琴头饰”的目击记录引起了我的高度关注。这并非简单的伪装。根据此前对该邪教原型的研究，这很可能是一种“剥夺式标记”。他们通过佩戴传统饰品以对犯罪动机进行宣言式展示，但表演性令人可疑。建议将此细节与“1968年「俄亥俄州」「祭祀案」”中的面具特征进行交叉比对。
            `,
            template: 'REGGIE'
        }
    },
    {
        id: 'oh_1968',
        title: '1968年柯特兰邪教屠杀案',
        triggers: {
            year: '1968',
            person: ['lundgren', '伦德格兰', 'Lundgren']
        },
        newspaper: {
            source: '《柯特兰公报》(The Kirtland Gazette)',
            date: '1968年11月14日',
            headline: '谷仓下的梦魇：艾弗里一家惨遭灭门，邪教"先知"在逃',
            content: [
                '本报讯 —— 俄亥俄州柯特兰镇近日曝出骇人听闻的屠杀案。警方在一处租用的农舍谷仓内，挖掘出了失踪已久的艾弗里一家五口的尸体。',
                '调查显示，自封为"末日先知"的伦德格兰及其信徒具有重大作案嫌疑。该组织以"圣经学习"为名诱骗追随者，却在今年4月实施了这场残酷的杀戮。据一名叛逃信徒交待，伦德格兰为了掩盖枪声，在行刑时命令信徒启动电锯制造噪音。',
                '目前，伦德格兰及其13名残余党羽已潜逃。此人极度危险，拥有大量军事武器并自称拥有"读心术"。联邦调查局（FBI）已介入搜捕，提醒市民发现可疑军装团体请立即报警。'
            ]
        },
        annotation: {
            fileId: 'OH-1968-11-SEC',
            date: '1968年12月20日',
            level: '机密 (CONFIDENTIAL / INTERNAL USE ONLY)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `【案卷病理学分析批注】

关于杰弗里·伦德格兰（Jeffrey Lundgren）动机真实性的深度评估：

**动机的后置包装（Post-hoc Narrative Construction）：**
地方警署和大众媒体被伦德格兰的"末日论"牵着鼻子走，这正是他想要的。通过对他在RLDS时期的早期行为档案分析，其所谓的"先知身份"是在其精神系统彻底崩溃后才紧急搭建的防御机制。他并不是因为相信上帝才杀人，而是因为他无法抑制杀戮冲动，才不得不从经文中翻找借口，将其包装成一种"圣经式献祭"。

需要注意的是，伦德格兰是一个极度危险的病理性捕猎者。他表现出的“邪教领袖”特质其实是他精心维护的外壳。如果在审讯中试图从宗教角度与其对话，将正中其下怀。回溯到1967年，当我亲手划下KLUB的第一行组织架构时，我并不是在创造一个英雄机构。我只是意识到，二战后的美国正在滋生一种前所未有的有组织恶疾。KLUB的职能不是拯救，而是隔离——将这些足以煽动文明崩塌的‘邪教节点’，从社会肌理中生生剥离出来。”`,
            template: 'REGGIE'
        }
    },
    {
        id: 'dc_1967',
        title: '1967年跨州碎尸案分析',
        triggers: {
            year: '1967',
            person: ['dr_reggie', '雷吉博士', 'Reggie'] // Triggered by Dr. Reggie
        },
        newspaper: {
            source: '《华盛顿邮报》',
            date: '1967年5月14日',
            headline: '战后的阴影：我们是否正在孕育一种新型犯罪？',
            content: [
                '记者： 教授，根据1965年的统一犯罪报告（UCR），全美暴力犯罪率较十年前上升了近40%。学界普遍将其归咎于城市化带来的疏离感，您怎么看？',
                '范斯教授： 城市化只是容器，而非毒药。我们必须正视1945年后的“病理残留”。那场战争不仅带回了英雄，也带回了一种被摧毁的道德底线。',
                '记者： 您是指退伍军人的心理创伤？',
                '范斯教授： 不止于此。通过对近二十年积压卷宗的交叉比对，我注意到一种“非典型的寄生现象”。在约五分之一的未决案中，凶手展现出一种超越了物欲或情欲的“仪式性冷感”。他们就像是受到某种松散的、隐形的逻辑驱动。',
                '记者： 您曾在讲座中提到过“病理性捕猎者”这个词。',
                '范斯教授： 是的。1950年代的宁静是个假象。那份“20%的异常数据”一直在增长。他们不是传统的黑帮，也不是疯子，而是一群在社会肌理缝隙中穿行的“清道夫”。如果调查局继续沿用应对禁酒令时代的手段，那么到1970年，这些散落在各州的“孤岛”将会连接成一片我们无法理解的暗网。',
                '记者： 您的意思是，存在一个全国性的犯罪组织？',
                '范斯教授： 不是那种有办公室和层级制度的组织。它更像是一种病毒，通过某种我们尚未识别的媒介在年轻人和失意者中传播。',
                '(注：此处报纸页面被撕毁，后续内容缺失)'
            ]
        },
        annotation: {
            fileId: '#1967-ARCH-042',
            date: '1969年8月24日',
            level: '绝密 (TOP SECRET / KLUB EYES ONLY)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `
主题： 关于“KLUB”成立两年的调查总结：针对1945-1968年间全美非关联性罪案的重新评估

【概要】 自 1967年 本处（KLUB - Knowledge-based Linkage & Urban Behavior）在您的直接授权下正式成立以来，我们对胡佛局长时代的积压卷宗进行了前所未有的数字化（穿孔卡片）处理与逻辑比对。现已确认：自二战结束以来，全美有 20.8% 的谋杀及纵火案件并非随机发生，而是受一种名为“余波”的松散社会病理结构驱动。

【时间线与阶段性发现】
**潜伏期（1945-1950）：** 数据显示，在二战结束后的最初五年，受该“邪教”意识形态影响的罪案仅占总数的 3%。雷吉博士认为，这是由于战后秩序的强力压制，使得该组织处于某种“休眠”或“地下孵化”状态。
**扩张期（1951-1966）：** 随着冷战阴云和城市化加速，该数值开始稳步上升。在 1967 年 KLUB 成立前的回溯分析中，我们发现这种影响在 1963 年（██████）后出现了显著的波动。
**爆发与机构建立（1967-至今）：** 1967年 的大范围骚乱与反文化运动为该组织提供了完美的掩体。KLUB 正是在这一年应运而生，旨在将那些被各地警方视为“嬉皮士犯罪”或“战后心理创伤”的孤立案件，拼凑成一张完整的威胁地图。

【核心威胁评估】
**非线性关联：** 雷吉博士通过比对 1967年夏季的三起跨州碎尸案发现，嫌疑人虽无物理接触，但均在案发现场留下了相似的符号，那是某种反复拓印后的墨迹，如同标记，出现在被害人的私人物品上，雷吉博士将该符号称为“黄 ██ 普”。「图片见附录」
** █████ 警戒线：** 目前的感染率已突破█████。如果我们不能在1975年之前锁定该“松散组织”的传播媒介（推测为某种特定的短波电台或地下出版物），这种病理性犯罪将成为美国社会的“新常态”。

【雷吉博士的个人声明】 “1967年不仅是 KLUB 的起点，也是美国文明的一个分水岭。我们追踪的不是一群躲在洞穴里的邪教徒，而是一场正在城市血管中流动的瘟疫。如果局方继续以 19 世纪的眼光看待这些‘新式犯罪’，我们将在十年内输掉这场无声的战争。”
            `,
            template: 'REGGIE'
        }
    },
    {
        id: 'il_1985',
        title: '1985年香槟镇失踪案告破',
        triggers: {
            year: '1985',
            person: ['roger_beebe', '罗格·毕比', 'Roger Beebe', 'Beebe']
        },
        newspaper: {
            source: '《香槟中心日报》(Champaign Central Daily)',
            date: '1985年10月16日',
            headline: '正义迟到了五年：香槟镇失踪案告破，联邦调查局"专家"被指误导侦破方向',
            content: [
                '（本报讯） 经过长达五年的痛苦等待，1980年失踪的朝鲜族留学生金美善（Kim Mi-seon）一案终于迎来了令人心碎的结局。现年34岁的本地居民罗格·毕比（Roger Beebe）因另一起袭击案入狱后，于上周三向警方供述了其在五年前绑架并杀害金小姐的全部罪行。',
                '然而，随着真相大白，当地警方的压力也随之而来。据一名因担心报复而要求匿名的香槟镇资深警官透露，早在1980年案发后的首个月，毕比就因其在校区附近的异常行为被列入重点怀疑名单。但就在调查进入关键期时，一股来自联邦层面的"专业力量"介入了案件。',
                '"当时那些穿着西装的人告诉我们，这不是一桩简单的绑架案，"该知情人士愤慨地表示，"他们坚持认为失踪案背后隐藏着复杂的邪教逻辑，导致我们被迫放弃了对毕比的监视，转而去搜查那些子虚乌有的地下集会。"',
                '这种因高层偏执而导致的侦破失误，不仅让凶手逍遥法外五年之久，更引发了社区对联邦机构干预地方治安的强烈质疑。金小姐的家属已通过律师表示，将对相关机构的"错误指引"追究法律责任。'
            ]
        },
        annotation: {
            fileId: '#1985-OP-014-DECOUPLE',
            date: '1985年11月4日',
            level: '绝密（仅限监察委员会及"薄荷计划"授权人员阅览）',
            author: '代理协调员 艾萨克·阿特尔曼 (Isaac Alterman)',
            content: `
联邦调查局 (FBI) 内部机密简报

主题： 关于"香槟镇失踪案（1980）"引发的系统性风险评估及 KLUB 机构重组提案

1. 案情回顾与偏差溯源 (Retrospective Analysis)
针对"罗格·毕比（Roger Beebe）案"暴露出的侦破误导问题，本职经核查确认为：1980年间 KLUB 介入该案并非基于刑事证据，而是基于前处长雷吉博士（Dr. Reggie）个人强推的"关联模型"。

雷吉博士固执地将毕比这种具备典型特征的局部犯罪者强行嵌合入其假说中，这种武断导致了严重后果：我们为了捕捉某种虚无缥缈的"邪教信号"，忽视了触手可及的暴力事实。

2. 责任剥离建议 (Accountability Segmentation)

雷吉博士目前的病休状态为我们提供了一个理想的"防火墙"。通过将决策责任锁定在雷吉博士晚期日益僵化的认知模式上，局方可以有效地将 KLUB 的机构信誉与个人的学术破产进行切割。这能平息地方不满，也能在国会审计面前维持 FBI 整体决策的科学性形象。

3. 分离方案 (Strategic Decoupling)
本职坚决反对目前局内全盘关停 KLUB 的情绪化提议。作为替代方案，我主张立即执行以下计划：

剥夺一线干预权： KLUB 将不再被允许介入任何进行中的、涉及地方治安或一般跨州犯罪的案件。其职能应被严格限制在"历史档案数字化比对"及"抽象社会模型开发"内，使其从实战机构彻底转变为后方研究室。

行政隔离： 通过将 KLUB 的行政层级下移，使其成为一个在物理和程序上均被隔离的"数据孤岛"，从而切断地方争议向总部蔓延的路径。


特别指出：鉴于RC（受训于1402 Old Dominion Rd.）曾于多处犯罪现场（etc：内华达州戈尔康达郡，灭门案）留有生物特征，雷吉博士此前基于“有限信任原则”与其维持开放交涉状态，现为规避机构改组期间的高风险接触，本职决定立即斩断所有相关线索。即刻起，撤销RC的一切特殊观察待遇，将其定性由“潜在资产”正式调整为**“一般变节者”**，按标准清算程序处理。
            `,
            template: 'ALTERMAN'
        }
    },
    {
        id: 'nv_1971',
        title: '1971年内华达枯骨案',
        triggers: {
            year: '1971',
            person: ['little_derek_wayne', '小德里克·维恩', 'Derek Wayne Jr.']
        },
        newspaper: {
            source: '《内华达州纪事报》(The Nevada Chronicle)',
            date: '1971年6月05日',
            headline: '大盆地再现枯骨：派尤特猎人发现两年内第三具骸骨',
            content: [
                '本报讯 —— 本周二下午，一名派尤特族（Paiute）猎人在内华达大盆地深处的乱石堆中发现了一具女性残骸。据法医初步鉴定，死者死亡时间已在十年以上。',
                '这已是近两年来在同一区域发现的第三具骸骨，死亡时间跨度从2年至15年不等。由于沙漠环境的剧烈风化，死因目前依然不明。当地警方已将此案并入“荒漠冷案”序列，调查仍在艰难进行中。'
            ]
        },
        annotation: {
            fileId: 'NV-1973-09-SEC',
            date: '1973年9月14日',
            level: '机密 (CONFIDENTIAL)',
            author: '雷吉博士 (Dr. Reggie)',
            content: `我听说两年前内华达州那具尸体终于有了名字。真凶是小德里克·维恩（Derek Wayne Jr.），他在两年前那场报复行动中已经变成了尸体。无须我重申，这个结论的最初线索来自RC丢弃在莫哈韦休息站垃圾桶内的一个空烟盒（别想打听那个休息站在哪）。

我还听说那帮官僚正试图把这个冷案突破写进年度报告，甚至想以此为KLUB挽回点面子。我个人认为毫无必要，毕竟如果坐在量化官的办公室里玩拼图游戏也算“贡献”，那我们对贡献的定义显然有云泥之别。至于RC，他正在做的事情远超这些旧账清理，我确信他将带来更深层的实质性推进，目前的贡献只是一点点微小成就。而那些坐在量化官办公室里指手画脚的人，甚至不配在他未来的报告上签字。`,
            template: 'REGGIE'
        }
    },
    {
        id: 'va_1972',
        title: '1972年罗阿诺克洗衣店谋杀案',
        triggers: {
            year: '1972',
            person: ['martha_diaz', '玛莎·迪亚兹', 'Martha Diaz']
        },
        newspaper: {
            source: '《罗阿诺克时报》(Roanoke Times)',
            date: '1972年11月19日',
            headline: '深夜洗衣店惨案：职员遇害手法极其罕见，警方调查陷入僵局',
            content: [
                '本报讯 —— 本周三凌晨，罗阿诺克市郊的一家自助洗衣店惊现血案。受害者玛莎·迪亚兹被发现死于工作岗位。据法医报告显示，受害者的气管被极其专业且精准的手法切断，现场没有搏斗痕迹，收银台钱款分毫未动。',
                '据相关人士透露，凶手在受害者右手腕上系有一条明黄色丝绸发带。警方指出，这种"仪式化"的行为极具表演性质，暗示凶手可能具有严重的精神疾患或属于某种未知的极端组织。州警署已成立专案组，并对周边州界的类似冷案进行并案排查。'
            ]
        },
        annotation: {
            fileId: 'VA-1990-11-REV',
            date: '1990年12月05日',
            level: '绝密 (TOP SECRET / EYES ONLY)',
            author: '代理协调员 艾萨克·阿特尔曼 (Isaac Alterman)',
            content: `【关于1972年罗阿诺克案的重新评估与雷吉模型修正】

1. 标志性特征的误导性（Signature Mismatch）：
玛莎·迪亚兹案曾被前任处长雷吉博士视为"家族"犯罪的教学样板。然而，通过1990年度最新的实验室生物比对结果显示，玛莎案现场残留的血迹与毛发特征，与我们锁定的"家族"核心成员及后期系列案的真凶完全不匹配。这证明了雷吉博士所谓的"统一场论"在实证面前存在严重的逻辑缺陷。

2. 模仿犯假说（Copycat or Interference）：
本职倾向于认为，1972年的玛莎案极有可能是一起独立案件，但因某种外部力量介入，导致一位连环杀手被激发并产生"模仿行为"，因此造就之后的一系列案件。虽然黄丝带这一符号被刻意留存，但此案的执行手法与后期成熟的、高度约束的攻击方式，却是截然不同的。

3. 对 RC 资产价值的彻底否定：
本职提议将玛莎·迪亚兹案从"青豆牡蛎汤计划"的相关档案中剥离。我们追踪的不是一个连贯的邪教逻辑，而是一个不断被模仿、被修饰的破碎切片。雷吉时代的盲目自信导致了我们在1972年就弄丢了正确的航向。`,
            template: 'ALTERMAN'
        }
    },
    {
        id: 'kan_1976',
        title: '1976年堪萨斯城百货大亨落网案',
        triggers: {
            year: '1976',
            person: ['jc_penney', '杰西·潘尼', 'Jesse Penney']
        },
        newspaper: {
            source: '《堪萨斯城星报》(The Kansas City Star)',
            date: '1976年3月15日',
            headline: '商业大亨变身“人体屠夫”：杰西·潘尼在地窖中落网',
            content: [
                '（本报讯） 昨夜，震惊全城的“红色移动献血车事件”迎来惊人转折。堪萨斯城警方突袭了位于东12街的著名百货公司大亨——杰西·潘尼（Jesse Penney）的私人宅邸，并在其地下室发现了令人作呕的恐怖景象。',
                '警方发言人称，调查始于三天前那辆被遗弃在广场上的采血车。车内二十具被注入红色液体的塑料模特引起了极大的恐慌，警方随后追踪模特来源，发现它们均来自于潘尼名下的百货仓库。 然而，当特警队持搜查令进入潘尼的住所时，他们寻找的并不是塑料模特，而是真正的尸体。',
                '据悉，调查人员在地下室发现了行刑室、一个设备齐全的解剖室 and 一间冷库，现场查获大量不明来源的人体器官及血液制品。警方怀疑，潘尼利用其百货公司的物流车队，长期从事人体组织贩卖活动。“感谢上帝，我们抓住了他。”警察局长在发布会上神情严峻地说道。'
            ]
        },
        annotation: {
            fileId: 'KAN-76-CLR-REV',
            date: '1990年3月12日',
            level: '绝密 (TOP SECRET / COLD CASE REVIEW)',
            author: '托马斯·克兰 (Thomas Crane)',
            content: `
【关于 1976 年堪萨斯城“玩偶案”的真相修正】
关于嫌疑人杰西·潘尼（真名：约翰·莫里西）： 让我们在内部坦诚一点。1976年被捕的“杰西·潘尼”，实为爱尔兰黑帮头目约翰·莫里西（John Morrissey）。他是中西部最大的人体组织黑市交易商。堪萨斯警方盯了他三年，一直苦于没有证据申请搜查令进入他的堡垒。

完美的嫁祸： 根据阿尔特曼主管在1979年留下的加密备忘录显示：当年堪萨斯警方非常清楚那辆“移动献血车”不是莫里西干的。 莫里西是个为了钱把活人拆碎的屠夫，他没有那种闲情逸致去搞什么“流红漆的塑料模特”这种前卫艺术。 

真相是： 警方利用了这个突如其来的“怪诞艺术品”，强行将其与莫里西联系起来（声称模特是莫里西偷的），从而骗取了搜查令。然而制造了“移动献血车事件”的真凶自始至终都没有被列入嫌疑名单。他帮警方打开了莫里西的大门，然后像幽灵一样消失了。
            `,
            template: 'CRANE'
        }
    },
    {
        id: 'va_1990',
        title: '公园大道噩梦终结：小A.W.威尔莫落网',
        triggers: {
            year: '1990',
            person: ['aw_wilmo', '小A.W.威尔莫', 'A.W. Wilmer Jr.']
        },
        newspaper: {
            source: '《弗吉尼亚公报》(The Virginia Gazette)',
            date: '1990年4月12日',
            headline: '公园大道噩梦终结：小 A.W. 威尔莫落网，“黄丝带杀手”身份曝光',
            content: [
                '（本报威廉斯堡讯） 维珍尼亚州警方与联邦调查局今日联合宣布，长达数年的“殖民地公园大道连环谋杀案”取得重大突破。现年52岁的本地居民小 A.W. 威尔莫（A. W. Wilmer, Jr.）于昨日在其位于约克县的隐秘住处被捕。',
                '警方在搜查过程中，从其地下室挖掘出了大量受害者的遗物，部分物品的锈蚀程度显示其跨度可能长达二十年以上。联邦调查局目前正试图查证，这位年过五旬的修车工是否就是那个让罗阿诺克和威廉斯堡恐惧了二十年的阴影化身。'
            ]
        },
        annotation: {
            fileId: 'CP-1992-04-EVD',
            date: '1992年4月28日',
            level: '最高机密 (EYES ONLY / CLASSIFIED)',
            author: '马库斯·索恩 (Marcus Thorne)，FBI 实验室总证物官',
            content: `【关于“威尔莫案”证物反常性的个人陈述】

1. 丝绸的“指纹”： 艾萨克·阿特尔曼（Alterman）声称此案是模仿犯的产物，因为生物特征不匹配。但我亲自比对了在小威尔莫家中缴获的发带与1972年罗阿诺克案留下的样本，两者的编织密度、染料成分全都出自同一种较比罕见的1950年代织机，这种规格的丝绸在60年代就停产了。「附注」

2. 战略性剥离与“断尾”逻辑（Strategic Amputation）： 这种物理层面的一致性，与生物层面的不匹配，构成了这个案子最阴险的陷阱。阿特尔曼只看DNA，所以他轻而易举地把小威尔莫定性为“模仿者”。但他没想过，为什么这个52岁的修车工会如此“巧合”地拥有早已绝版的50年代丝绸？答案只有一个：这卷发带不是威尔莫买来的，而是被“移交”给他的。他们把这个已经年老色衰、精神受损、不再具备流动价值的小威尔莫扔在约克县的地下室里，并把那一整卷标志性的发带塞进他的抽屉，就是为了给FBI制造一个完美的“连环杀手”模板。这是一个“弃子”。当阿特尔曼拿着发带和威尔莫的DNA沾沾自喜时，他实际上是接过了家族递过来的一把手术刀，亲手帮“父亲”完成了这次切割。

3. 发散性结论： 抓获小威尔莫不是终结，而是一种“剥离”。有人把这个已经失去利用价值的、大脑受损的“支系”扔了出来，送给阿特尔曼当勋章，好换取整个“家族”更深层的静默。`,
            template: 'THORNE'
        }
    },
    {
        id: 'cin_1973',
        title: '1973年辛辛那提少女冻死案',
        triggers: {
            year: '1973',
            person: ['julie', '朱莉']
        },
        newspaper: {
            source: '《辛辛那提询问报》(The Cincinnati Enquirer)',
            date: '1973年1月14日',
            headline: '警局门前的致命疏忽：六岁少女冻死分局阶梯，警方陷入信用危机',
            content: [
                '（本报讯） 针对本月初"朱莉·沃尔什失踪案"的调查于昨日宣告终结，辛辛那提警方正式承认这是一起由"极端管理疏忽"导致的悲剧。',
                '1月5日清晨，失踪三日的六岁少女朱莉（Julie Walsh）被发现冻死在第四分局的大门前，身上仅裹着一层单薄的毛毯。初步尸检显示，死因为长时间暴露于极寒环境导致的体温过低。由于新年假期期间警队休假人数过多，分局内部人员严重短缺，值班警员在漫长的深夜值班中竟完全忽略了门前的动态。',
                '尽管朱莉的家属质疑孩子为何会出现在警局门口，但警方在对现场进行排查后认为，朱莉可能是在迷路后试图寻求帮助，却因体力不支倒在门前，而值班警察的玩忽职守导致了救援机会的丧失。目前，两名当值警员已停职接受行政调查，案件最终以"意外死亡"结案。'
            ]
        },
        annotation: {
            fileId: 'CIN-1973-009-REV',
            date: '1986年11月12日',
            level: '最高机密 (EYES ONLY / CLASSIFIED)',
            author: '马库斯·索恩 (Marcus Thorne)，FBI 实验室总证物官',
            content: `【证物异常状态说明：CIN-1973-009-E（蓝色纤维毛毯上的残留标记）】

在 1986 年的薄荷计划的系列证据复核调查中，我利用热感成像复原技术重新扫描了辛辛那提少女冻死案时的毛毯样本。


关于"黄油朱莉普（Butter Julep）"： 这不是某种泼洒物。这是一个热敏化学印记。残留物是由高纯度工业油脂与某种未知染料混合而成的。由于其特殊的化学性质，它在很长一段时间内会产生缓慢的氧化反应，看起来就像是一直在冒着热气的活体标记。「图片见附录」

符号的性质： 其形状是一个高度抽象的几何结构。在我们的档案中，这种标记被命名为"黄油朱莉普"，因为它呈现出一种恶心的、类似融化油脂的半透明蜡黄色。这更像是一个**"印刷品污迹"**，而非手写的签名。

行为学暗示： 根据雷吉博士的理论，凶手将遗体放置在警局门口，其行为类似完成了一次邮差的"签收"动作。因此他必须像是在给一件货物加盖印章一样，在女孩身上留下这个冒烟的印迹。`,
            template: 'THORNE'
        }
    },
    {
        id: 'nas_1973',
        title: '1973年纳什维尔警局军械库窃案',
        triggers: {
            year: '1973',
            person: ['juvell_chambers', '朱维尔·钱伯斯', 'juvell chambers']
        },
        newspaper: {
            source: '《纳什维尔旗帜报》(Nashville Banner)',
            date: '1973年8月22日',
            headline: '警局军械库遭劫，争议警员钱伯斯获无罪判决：正义还是妥协？',
            content: [
                '（本报讯） 纳什维尔地方法院昨日人声鼎沸。经过长达三个月的审理，大陪审团最终宣布，因"证据链存在严重瑕疵且存在过度执法嫌疑"，正式撤销对非裔警员朱维尔·钱伯斯（Jewel Chambers）的控诉。',
                '去年发生的"灵魂厨房"系列犯罪波及周边数城，最终在纳什维尔达到高潮。当时，一伙蒙面暴徒在混乱中洗劫了第三分局的军械库，包括 12 支泵动式散弹枪及大量弹药在内的警用物资失窃。由于钱伯斯是当晚唯一的库房守卫，且现场发现了与黑人民权组织相关的非法印刷品，警方内部坚称钱伯斯是"内鬼"，旨在为激进分子输送武装。',
                '然而，案件审理期间遭遇了来自民权团体和社区的巨大压力，辩方律师指出警方将钱伯斯"拖出来顶罪"的行为具有明显的种族歧视色彩。尽管警方坚信军械库大门的开启必须依靠内应，但在缺乏直接物证的情况下，法庭最终因担心引发更大规模的街头冲突而判定其无罪。'
            ]
        },
        annotation: {
            fileId: 'NAS-1979-102-REV',
            date: '1979年5月14日',
            level: '最高机密 (EYES ONLY / CLASSIFIED)',
            author: '阿尔特曼 (Altman)，FBI 高级特别探员',
            content: `【关于 1973 年纳什维尔"军械库窃案"与钱伯斯的后续评估】

关于"灵魂厨房计划（Project Soul Kitchen）"： 根据我们对 1973 年至 1975 年间俄亥俄州及周边地区一系列种族犯罪的最新交叉研究，纳什维尔的军械库窃案绝非孤立事件。这是一次极其典型的、带有高度政治目的的战术行动。

朱维尔·钱伯斯的真实身份： 虽然法庭在种族政治的压力下低了头，但我依然维持 1973 年的最初判断。根据一些未公开线索，钱伯斯在进入警队前曾与加州的分裂团体有染。他留在警队唯一的目的，根本就是等待"厨房"再度开张。而且有证据表明，其获释两年后，伯克斯维尔的多起暴力案件与之存在间接关联。那些失窃的散弹枪至今没有在任何黑市流向记录中出现，这说明这批武器并没有被转售，而是进入了某种深层的、潜伏性质的武装内部。

我的直觉： 我们仍应将朱维尔·钱伯斯列入"红色观察名单"。虽然局内有人试图往什么连环杀手方向引导，但我认为，这本质上是黑人反抗运动策划的一场针对政府武装力量的、有组织的渗透。`,
            template: 'ALTERMAN'
        }
    },
    {
        id: 'ky_1973',
        title: '1973年伯克斯维尔威士忌劫案',
        triggers: {
            year: '1973',
            person: ['boris_smirnov', '鲍里斯·斯米尔诺夫', 'boris smirnov']
        },
        newspaper: {
            source: '《路易斯维尔信使日报》(The Louisville Courier-Journal)',
            date: '1973年12月28日',
            headline: '坎伯兰河上的蓝色炼狱：威士忌大劫案震惊肯塔基',
            content: [
                '昨天凌晨三点，一伙自称"老肯塔基爱国者"的武装暴徒劫持了三辆满载高纯度波本原浆的重型油罐车，并将其横停在横跨坎伯兰河的主桥中央。领头的一名有着东欧口音、自称"鲍里斯"的男子通过无线电向警方发出最后通牒：如果警方试图靠近，他将把数千加仑的酒精倾倒入河并点燃。',
                '双方谈判一直僵持至凌晨，出乎意料的是，接近凌晨三点，暴徒忽然打开阀门。目击者称，蓝色的火焰顺着河流蔓延了近半英里，仿佛整个坎伯兰河都在燃烧，火势逼近下游的储油库和码头。',
                '为了防止火势引发连环爆炸，包括伯克斯维尔警局、州警以及临近两县的消防力量被全部抽调至河岸进行紧急疏散和灭火。然而，就在全城警力对着河面上的"蓝色炼狱"焦头烂额时，距离大桥仅两英里、防备空虚的南方烟草拍卖行金库被人暴力破开。暴徒将当季全部烟草现金结算款席卷一空，并最终利用混乱消失在周围茂密的森林中。',
                '截至发稿前，警方仍然无法确定这伙人是向南逃往田纳西州，还是就地潜伏进山区。'
            ]
        },
        annotation: {
            fileId: 'FBI-1975-11-MEMO',
            date: '1975年11月12日',
            level: '绝密 (TOP SECRET) / 阅后即焚',
            author: '特别主管 (SAC) 艾萨克·阿尔特曼 (I. Altman)',
            content: `FBI 内部机密备忘录 / 局长办公室呈报

发件人： 特别主管 (SAC) 艾萨克·阿尔特曼 (I. Altman)
收件人： 联邦调查局副局长 / 刑事调查部
主题： "铁锈带"扫荡行动总结：关于斯米尔诺夫口供的定性与 KLUB 遗留数据的处置建议

副局长阁下：
我很荣幸地汇报，经过长达十个月的跨州联合执法，针对俄亥俄河谷及肯塔基州周边的"铁锈带"扫荡行动已取得决定性胜利。

这是一次传统警务工作的伟大胜利。依靠探员们在泥泞的伐木场和烟雾缭绕的地下酒吧里进行的无数次实地排查，我们终于彻底捣毁了包括鲍里斯·斯米尔诺夫在内的四个犯罪团伙。更令人振奋的是，物证科已确认，我们在其窝点缴获的九支雷明顿870防暴枪，正是1973年纳什维尔军械库劫案中的失窃警械。

这本该是一个完美的结案报告，但正如您所知，总有一些不合时宜的噪音试图干扰我们的庆功宴。

一、 关于嫌疑人口供中的"远亲"异常
在审讯中，出现了一种令人不安的、高度一致的集体癔症。这群罪犯拒绝承认自己是独立策划了那些精密的抢劫案，反而反复提及他们隶属于一个庞大的、像幽灵一样在公路上游荡的"家族"。

斯米尔诺夫甚至创造了一个生造词：「远亲」（The Distants）。根据他的疯话，他们只是这个庞大网络末端的触角，他声称那个所谓的"父亲"乘坐着一辆蓝色房车，不仅为他们规划了逃跑路线，甚至教导他们如何利用警方的应急预案漏洞。

二、 KLUB 系统的数据毒害
如果这仅仅是罪犯的疯言疯语，我们可以一笑置之。但问题出在我们的内部。

刑事分析科的一名初级数据员——显然是雷吉博士时代的遗留人员——擅自将这些口供输入了尚未完全下线的 KLUB 系统。结果是灾难性的。昨天深夜提交到我桌上的 KLUB-75号分析报告 声称，系统在全美范围内捕捉到了数个类似的"组织结构回响"。

三、 处置建议与定性重塑
副局长，我们必须清醒地认识到这份报告的政治危害。

如果我们现在采信了这份报告，承认真的存在什么"看不见的家族"，那就等于是在承认雷吉博士是对的，承认我们过去两年的清洗是错误的。这不仅会动摇局里的指挥权威，更会让媒体再次把焦点从我们的胜利转移到阴谋论上。

因此，为了维护调查局的声誉与行动的正当性，我强烈建议采取以下措施：

口供清洗与病理化定性： 斯米尔诺夫关于"远亲"和"家族"的所有供述，必须被统一解释为长期酗酒导致的谵妄性精神障碍（Alcohol-Induced Delirium）。

档案封存： 编号 KLUB-75-ANALYSIS 的分析报告立即列为"永久封存"级别（建议在三个月后的例行档案清理中予以销毁）。至于那名擅自使用系统的数据员，建议将其调离至阿拉斯加外勤办事处。

叙事统一： 在明天的新闻发布会上，我们必须强调：斯米尔诺夫团伙是一群独立、贪婪且暴力的机会主义者。这起案件的侦破，完全归功于标准警察程序（Standard Police Work）的严谨与耐心。

四、特别提及的未知风险
针对伯克斯维尔烟草行劫案的复盘显示，犯罪分子的战术素养与其实际身份存在极大的不对称。鲍里斯·斯米尔诺夫连名字都写不对，但策划的波本威士忌火灾佯攻却精确地卡住了当地警方《突发灾难响应手册》中关于跨部门调动消防力量的20分钟时间差。

这不得不让我联想到雷吉博士在被停职前夕，曾处于极度偏执状态下利用 KLUB 系统非法投放的那只"地鼠"，虽然该资产已在潜伏初期失联（推定死亡），但伯克斯维尔案还是让人怀疑"地鼠"不仅没死，甚至正在利用局里教授的技能为犯罪集团提供战术指导。

为此，我请求立即执行以下"斩断"措施：

信标频率废止： 即刻废止所有曾分配给 KLUB 项目的"灰水信标"回收频率与密匙。任何未登记的加密呼叫一律视为静电干扰，不予记录，不予回应。

资产除名： 将地鼠档案从"失踪/潜伏"正式变更为"因公殉职"（日期追溯至1973年）。彻底切断他在法律上与局内的一切联系。

防火墙加固： 确保 KLUB 系统残余的任何对外接口被物理切断。如果那只"地鼠"真的还在外面并在试图把情报传回来，我要确保他面对的是一堵绝对沉默的墙。我们不能冒任何风险让外界知道，是我们的人在教这群乡巴佬怎么抢银行。

结论：
我们抓住了他们，我们也找回了枪。这就是全部的真相。

忠诚的，
艾萨克·阿尔特曼 (Isaac Altman)
联邦调查局特别主管，匡提科，弗吉尼亚。`,
            template: 'ALTERMAN'
        }
    }
];

export const Archives: React.FC<ArchivesProps> = ({
    isOpen,
    onClose,
    unlockedArchiveIds,
    onUnlockArchive,
    onCollectClue,
    collectedClues,
    collectedYears,
    unlockedPeople,
    collectedDossierIds,
    onConsumeKeywords,
    collectedAttachments = [],
    onCollectAttachment,
    currentStoryNode = 0
}) => {
    const [yearInput, setYearInput] = useState('');
    const [personInput, setPersonInput] = useState('');
    const [activeCase, setActiveCase] = useState<DetailedArchiveRecord | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [collectedKeywords, setCollectedKeywords] = useState<Set<string>>(new Set());

    // Focus State for Split View
    const [focusedPane, setFocusedPane] = useState<'newspaper' | 'annotation' | null>(null);

    // Attachment Image Modal State
    const [attachmentImage, setAttachmentImage] = useState<string | null>(null);

    // Attachment Collection State
    const [isSelectingFolder, setIsSelectingFolder] = useState(false);
    const [collectionFeedback, setCollectionFeedback] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

    // Keyword mapping for archives - for annotation highlighting
    const ARCHIVE_KEYWORD_MAP: Record<string, string> = {
        '俄亥俄州': 'ohio',
        '祭祀案': 'ritual_case',
        '1967': 'year_1967',
        '碎尸案': 'dismemberment_case',
        '1402 Old Dominion Rd.': '1402_old_dominion_rd',
        '灭门案': 'family_massacre',
        '训练日': 'training_day',
        '莫哈韦休息站': 'mojave_rest_stop',
        '空烟盒': 'empty_cigarette_pack',
        '1972': 'year_1972',
        '玛莎·迪亚兹': 'martha_diaz',
        '1990': 'year_1990',
        '1990年': 'year_1990',
        '小A.W.威尔莫': 'aw_wilmo',
        '小威尔莫': 'aw_wilmo',
        '1973': 'year_1973',
        '1973年': 'year_1973',
        '朱莉': 'julie',
        '母亲': 'the_mother',
        '瓦妮莎': 'vanessa',
        '塞勒斯': 'silas',
        '赛勒斯': 'silas',
        '辛辛那提': 'cincinnati',
        '1986': 'year_1986',
        '1986年': 'year_1986',
        '薄荷计划': 'mint_plan',
        '伯克斯维尔': 'burkesville',
        '1975': 'year_1975',
        '1975年': 'year_1975',
        'KLUB-75号分析报告': 'klub75_report',
        'KLUB-75': 'klub75_report',
        '匡提科': 'quantico',
        'Quantico': 'quantico',
        '堪萨斯城': 'kansas_city',
        '流动献血车': 'mobile_blood_truck',
        '1976': 'year_1976',
        '1976年': 'year_1976',
        '杰西潘尼': 'jc_penney',
        '东12街': 'east_12th_st',
        '行刑室': 'execution_room',
        '尼比': 'nibi',
        '康查尔': 'conchar',
        '伦德格兰': 'lundgren',
        '莫宁': 'morning',
        '雷吉博士': 'dr_reggie',
        '约翰·莫里西': 'john_morrissey',
        '罗格·毕比': 'roger_beebe',
        '小德里克·维恩': 'little_derek_wayne',
        '鲍里斯·斯米尔诺夫': 'boris_smirnov',
        '朱维尔·钱伯斯': 'juvell_chambers',
        '辛西娅·米勒': 'cynthia_miller',
        '混乱美学': 'chaos_aesthetics'
    };

    // Clue display mapping for quick selection chips
    const CLUE_DISPLAY_MAP: Record<string, string> = {
        'year_1971': '1971',
        'year_1968': '1968',
        'year_1967': '1967',
        'year_1985': '1985',
        'year_1990': '1990',
        'year_1972': '1972',
        'year_1973': '1973',
        'nibi': '尼比',
        'lundgren': '伦德格兰',
        'conchar': '康查尔',
        'dismemberment_case': '碎尸案',
        'dr_reggie': '雷吉博士',
        'roger_beebe': '罗格·毕比',
        'little_derek_wayne': '小德里克·维恩',
        'project': '青豆牡蛎汤计划',
        'julip': '黄油朱莉普',
        'family': '诡异家族',
        'maine': '缅因州',
        'small_bank': '小银行',
        'chicago': '芝加哥',
        'robert': '罗伯特',
        'asian_woman': '亚裔女性',
        'missing': '失踪',
        'father': '父亲',
        'relationship': '扭曲关系',
        'dirty_frank': '脏弗兰克酒吧',
        'morning': '莫宁',
        'ohio': '俄亥俄州',
        'ritual_case': '祭祀案',
        'headdress': '原住民头饰',
        'mojave_rest_stop': '莫哈韦休息站',
        'empty_cigarette_pack': '空烟盒',
        'aw_wilmo': '小A.W.威尔莫',
        'crime_route_map': '罗伯特·卡彭：犯罪路线',
        'graywater_beacon': '灰水信标',
        'martha_diaz': '玛莎·迪亚兹',
        'julie': '朱莉',
        'the_mother': '母亲',
        'vanessa': '瓦妮莎',
        'silas': '塞勒斯',
        'cincinnati': '辛辛那提',
        'year_1986': '1986',
        'mint_plan': '薄荷计划',
        'year_1975': '1975',
        'burkesville': '伯克斯维尔',
        'klub75_report': 'KLUB-75号分析报告',
        'quantico': '匡提科',
        'kansas_city': '堪萨斯城',
        'mobile_blood_truck': '流动献血车',
        'year_1976': '1976',
        'jc_penney': '杰西·潘尼',
        'east_12th_st': '东12街',
        'execution_room': '行刑室',
        'john_morrissey': '约翰·莫里西',
        'chaos_aesthetics': '混乱美学'
    };

    const handleAttemptCollect = (targetClueId: string) => {
        // Special mapping: wilmer_ribbon goes to project dossier
        if (attachmentImage === 'assets/wilmer_ribbon.jpg' && targetClueId === 'project') {
            onCollectAttachment('wilmer_ribbon');
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => {
                setAttachmentImage(null);
                setIsSelectingFolder(false);
                setCollectionFeedback({ type: null, msg: '' });
            }, 1500);
            return;
        }

        if (attachmentImage === 'assets/fbi-symbol.png' && targetClueId === 'graywater_beacon') {
            onCollectAttachment('graywater_beacon');
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => {
                setAttachmentImage(null);
                setIsSelectingFolder(false);
                setCollectionFeedback({ type: null, msg: '' });
            }, 1500);
            return;
        }

        // Default logic for julip_symbol (if it's still needed, though graywater_beacon replaces it for the FBI symbol)
        if (attachmentImage === 'assets/fbi-symbol.png' && targetClueId === 'julip') {
            if (onCollectAttachment) {
                onCollectAttachment('julip_symbol');
            }
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => {
                setAttachmentImage(null);
                setIsSelectingFolder(false);
                setCollectionFeedback({ type: null, msg: '' });
            }, 1500);
            return;
        }

        // Butter Julep evidence photo goes to julip dossier
        if (attachmentImage === 'assets/butter_julep_evidence.jpg' && targetClueId === 'julip') {
            if (onCollectAttachment) {
                onCollectAttachment('butter_julep_evidence');
            }
            setCollectionFeedback({ type: 'success', msg: '归档成功 // FILED SUCCESSFULLY' });
            setTimeout(() => {
                setAttachmentImage(null);
                setIsSelectingFolder(false);
                setCollectionFeedback({ type: null, msg: '' });
            }, 1500);
            return;
        }

        setCollectionFeedback({ type: 'error', msg: '归档失败：特征不匹配 // MISMATCH' });
        setTimeout(() => setCollectionFeedback({ type: null, msg: '' }), 2000);
    };

    const handleKeywordClick = (keyword: string) => {
        const clueId = ARCHIVE_KEYWORD_MAP[keyword];
        if (clueId) {
            // Restore collection logic while keeping strict lane routing (handled by App.tsx)
            // This ensures feedback and recording happens.
            if (onCollectClue) {
                onCollectClue(clueId, keyword);
            }

            // Also populate inputs for convenience (optional, keeping for UX)
            // Check if it's a person or year based on simple heuristic or map
            if (['1967', '1968', '1971', '1972', '1985', '1990'].includes(keyword)) {
                setYearInput(keyword);
            } else {
                setPersonInput(keyword);
            }
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setErrorMsg('');

        setTimeout(() => {
            const found = ARCHIVE_DATABASE.find(record =>
                record.triggers.year === yearInput.trim() &&
                record.triggers.person.some(p => p.toLowerCase() === personInput.trim().toLowerCase())
            );

            if (found) {
                // If found, unlock it globally and set active
                if (!unlockedArchiveIds.includes(found.id)) {
                    onUnlockArchive(found.id);
                }
                setActiveCase(found);
                setErrorMsg('');

                // Consume used keywords
                const usedYearIds: string[] = [];
                const usedPersonIds: string[] = [];

                // Match year
                const yearTrimmed = yearInput.trim();
                if (yearTrimmed === '1971') usedYearIds.push('year_1971');
                if (yearTrimmed === '1968') usedYearIds.push('year_1968');
                if (yearTrimmed === '1967') usedYearIds.push('year_1967');
                if (yearTrimmed === '1985') usedYearIds.push('year_1985');
                if (yearTrimmed === '1972') usedYearIds.push('year_1972');
                if (yearTrimmed === '1990') usedYearIds.push('year_1990');
                if (yearTrimmed === '1973') usedYearIds.push('year_1973');
                if (yearTrimmed === '1986') usedYearIds.push('year_1986');
                if (yearTrimmed === '1975') usedYearIds.push('year_1975');
                if (yearTrimmed === '1976') usedYearIds.push('year_1976');

                // Match person
                const personLower = personInput.trim().toLowerCase();
                if (['nibi', '尼比'].includes(personLower)) usedPersonIds.push('nibi');
                if (['lundgren', '伦德格兰'].includes(personLower)) usedPersonIds.push('lundgren');
                if (['conchar', '康查尔'].includes(personLower)) usedPersonIds.push('conchar');
                if (['morning', '莫宁'].includes(personLower)) usedPersonIds.push('morning');
                if (['dr_reggie', '雷吉博士', 'reggie'].includes(personLower)) usedPersonIds.push('dr_reggie');
                if (['project', '青豆牡蛎汤计划'].includes(personLower)) usedPersonIds.push('project');
                if (['roger_beebe', '罗格·毕比', 'roger beebe', 'beebe'].includes(personLower)) usedPersonIds.push('roger_beebe');
                if (['jc_penney', '杰西·潘尼', '杰西潘尼', 'jesse penney'].includes(personLower)) usedPersonIds.push('jc_penney');
                if (['aw_wilmo', '小a.w.威尔莫', '小威尔莫', 'aw wilmer'].includes(personLower)) usedPersonIds.push('aw_wilmo');
                if (['martha_diaz', '玛莎·迪亚兹'].includes(personLower)) usedPersonIds.push('martha_diaz');
                if (['boris_smirnov', '鲍里斯·斯米尔诺夫', 'boris'].includes(personLower)) usedPersonIds.push('boris_smirnov');
                if (['julie', '朱莉'].includes(personLower)) usedPersonIds.push('julie');
                if (['juvell_chambers', '朱维尔·钱伯斯', '钱伯斯'].includes(personLower)) usedPersonIds.push('juvell_chambers');
                if (['john_morrissey', '约翰·莫里西'].includes(personLower)) usedPersonIds.push('john_morrissey');


                // STRATEGIC CHANGE: Successful investigation unlocks the relevant Case Files (Dossier)
                // DOSSIER WHITELIST: Only "Golden Julip" and "Project Green Bean Oyster Soup" can be filed.
                // Other keywords (like Nibi, Maine) are useful for search but do NOT create permanent files.
                const DOSSIER_WHITELIST = ['julip', 'project', 'julip_symbol'];

                usedPersonIds.forEach(id => {
                    const word = CLUE_DISPLAY_MAP[id] || id;
                    // Only collect if explicitly in the whitelist
                    if (DOSSIER_WHITELIST.includes(id) && !collectedClues.includes(id)) {
                        onCollectClue(id, word);
                    }
                });

                // Call callback to remove keywords (if we were still using that mechanic, but we kept it for API compat)
                // We STOP consuming years here to allow re-use in multiple searches
                if (usedPersonIds.length > 0) {
                    onConsumeKeywords([], usedPersonIds);
                }
            } else {
                setErrorMsg('检索失败：未找到匹配的关联档案 (NO RECORDS FOUND)');
            }
            setIsSearching(false);
        }, 800);
    };

    const handleOpenCase = (caseId: string) => {
        const found = ARCHIVE_DATABASE.find(c => c.id === caseId);
        if (found) setActiveCase(found);
    }

    const resetView = () => {
        setActiveCase(null);
        setYearInput('');
        setPersonInput('');
        setErrorMsg('');
        setFocusedPane(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                >
                    <div className="w-full max-w-7xl h-[85vh] flex relative border border-[#c85a3f]/20 bg-[#0a0505] rounded-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">

                        {/* Sidebar: Archive Directory */}
                        <div className="w-64 border-r border-[#c85a3f]/20 bg-[#0f0a0a] flex flex-col hidden md:flex">
                            {/* Title - At top */}
                            <div className="p-6 border-b border-[#c85a3f]/20">
                                <div className="flex items-center gap-2 text-[#d89853] mb-1">
                                    <Archive size={18} />
                                    <span className="font-mono text-sm tracking-widest font-bold">档案目录</span>
                                </div>
                                <div className="text-[10px] text-[#c85a3f]/40 font-mono">CASE DIRECTORY</div>
                            </div>

                            {/* Archive List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                {unlockedArchiveIds.length === 0 && (
                                    <div className="text-center mt-10 text-[#c85a3f]/30 text-xs font-mono px-4">
                                        NO ARCHIVES UNLOCKED
                                        <div className="mt-2 text-[10px] opacity-50">Please perform search to retrieve cases.</div>
                                    </div>
                                )}

                                {unlockedArchiveIds.map(id => {
                                    const record = ARCHIVE_DATABASE.find(r => r.id === id);
                                    if (!record) return null;
                                    const isActive = activeCase?.id === id;

                                    return (
                                        <button
                                            key={id}
                                            onClick={() => handleOpenCase(id)}
                                            className={`w-full text-left p-3 rounded border transition-all text-xs font-mono group relative overflow-hidden ${isActive
                                                ? 'bg-[#c85a3f]/20 border-[#c85a3f] text-[#d89853]'
                                                : 'bg-black/40 border-[#c85a3f]/10 text-[#c85a3f]/60 hover:border-[#c85a3f]/40 hover:text-[#d89853]/80'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold">{record.triggers.year} CASE</span>
                                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#d89853] animate-pulse" />}
                                            </div>
                                            <div className="truncate opacity-80">{record.title}</div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* NEW SEARCH Button - At bottom - ENHANCED */}
                            <button
                                onClick={resetView}
                                className="relative p-5 border-t-2 border-[#c85a3f]/40 bg-gradient-to-r from-[#c85a3f]/20 to-[#d89853]/20 text-[#d89853] hover:from-[#c85a3f]/40 hover:to-[#d89853]/40 hover:text-white hover:border-[#d89853] transition-all duration-300 flex items-center justify-center gap-3 text-sm font-mono tracking-widest font-bold shadow-[0_0_20px_rgba(200,90,63,0.3)] hover:shadow-[0_0_30px_rgba(216,152,83,0.6)] group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-[#d89853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Search size={18} className="relative z-10 group-hover:scale-110 transition-transform" />
                                <span className="relative z-10">NEW SEARCH</span>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#d89853] rounded-full animate-pulse" />
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col relative w-full">
                            {/* Header */}
                            <div className="h-16 border-b border-[#c85a3f]/20 flex justify-between items-center px-6 bg-[#0f0a0a]/50 absolute top-0 left-0 w-full z-20 pointer-events-none">
                                <div className="flex flex-col">
                                    <span className="font-mono text-lg tracking-[0.2em] font-bold text-[#d89853] text-shadow-sm">局内档案室 // ARCHIVES</span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-[#c85a3f]/10 rounded-full text-[#c85a3f] transition-colors pointer-events-auto"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-hidden relative pt-16">
                                <AnimatePresence mode='wait'>
                                    {!activeCase ? (
                                        /* SEARCH VIEW */
                                        <motion.div
                                            key="search"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="w-full h-full flex flex-col items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
                                        >
                                            <div className="max-w-md w-full space-y-8 relative">
                                                <div className="absolute -inset-10 bg-[#c85a3f]/5 blur-3xl rounded-full pointer-events-none" />

                                                <div className="text-center space-y-2 relative">
                                                    <ShieldAlert size={48} className="mx-auto text-[#c85a3f]/60 mb-4 animate-pulse" />
                                                    <h3 className="text-[#d89853] font-mono tracking-widest text-xl font-bold">双重索引验证系统</h3>
                                                    <p className="text-[#c85a3f]/60 text-xs font-mono tracking-[0.2em]">DUAL-INDEX VERIFICATION PROTOCOL</p>
                                                </div>

                                                <form onSubmit={handleSearch} className="space-y-6 relative z-10">
                                                    <div className="space-y-4">
                                                        <div className="group">
                                                            <label className="text-[10px] text-[#d89853]/40 font-mono tracking-widest uppercase mb-1 block group-focus-within:text-[#d89853]">时间索引 (Year)</label>
                                                            <input
                                                                type="text"
                                                                value={yearInput}
                                                                onChange={(e) => setYearInput(e.target.value)}
                                                                placeholder="YYYY"
                                                                className="w-full bg-black/60 border-b border-[#c85a3f]/30 text-[#d89853] py-2 px-4 font-mono focus:border-[#d89853] focus:outline-none text-center tracking-[0.5em] text-2xl transition-all placeholder-[#d89853]/10 hover:border-[#c85a3f]/60"
                                                            />
                                                        </div>
                                                        <div className="group">
                                                            <label className="text-[10px] text-[#d89853]/40 font-mono tracking-widest uppercase mb-1 block group-focus-within:text-[#d89853]">关联人物 (Person)</label>
                                                            <input
                                                                type="text"
                                                                value={personInput}
                                                                onChange={(e) => setPersonInput(e.target.value)}
                                                                placeholder="NAME CODE"
                                                                className="w-full bg-black/60 border-b border-[#c85a3f]/30 text-[#d89853] py-2 px-4 font-mono focus:border-[#d89853] focus:outline-none text-center tracking-[0.2em] text-xl transition-all placeholder-[#d89853]/10 hover:border-[#c85a3f]/60"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Quick Select Keywords - ARCHIVES ONLY: Years + Archive People */}
                                                    {(collectedYears.length > 0 || unlockedPeople.length > 0) && (
                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                            <div className="text-[10px] text-[#c85a3f]/40 uppercase tracking-widest w-full text-center mb-2">快速选择 / Quick Select</div>

                                                            {[...new Set([...collectedYears, ...unlockedPeople])]
                                                                .filter(id => {
                                                                    const lowerId = id.toLowerCase();
                                                                    const isPerson = unlockedPeople.includes(id);

                                                                    // Exclusion list (same as SimplifiedMainView)
                                                                    if (['robert', 'capone', 'robert_capone', 'rubick', 'father', 'dr_reggie'].includes(lowerId)) return false;

                                                                    // For people: only show if they have an ARCHIVE trigger (or are JC Penney for search context)
                                                                    // We use a simplified check: does it have a display mapping AND is it relevant?
                                                                    if (isPerson) {
                                                                        const relevantPeople = [
                                                                            'roger_beebe', 'aw_wilmo', 'martha_diaz', 'julie', 'boris_smirnov', 'jc_penney', 'juvell_chambers', 'john_morrissey',
                                                                            'nibi', 'conchar', 'lundgren', 'morning', 'silas', 'vanessa', 'the_mother', 'little_derek_wayne', 'cynthia_miller'
                                                                        ];
                                                                        if (!relevantPeople.includes(id)) return false;
                                                                    }

                                                                    return !!CLUE_DISPLAY_MAP[id];
                                                                })
                                                                .map(id => (
                                                                    <button
                                                                        key={id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const display = CLUE_DISPLAY_MAP[id];
                                                                            if (['1967', '1968', '1971', '1972', '1973', '1975', '1976', '1985', '1986', '1990'].includes(display)) {
                                                                                setYearInput(display);
                                                                            } else {
                                                                                setPersonInput(display);
                                                                            }
                                                                        }}
                                                                        className="px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-xs rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                                                                    >
                                                                        {CLUE_DISPLAY_MAP[id]}
                                                                    </button>
                                                                ))}
                                                        </div>
                                                    )}

                                                    {errorMsg && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-red-500/80 text-xs text-center font-mono py-2 bg-red-900/10 border border-red-900/30 rounded"
                                                        >
                                                            {errorMsg}
                                                        </motion.div>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={isSearching}
                                                        className="w-full bg-gradient-to-r from-[#c85a3f]/80 to-[#a04632]/80 hover:from-[#c85a3f] hover:to-[#a04632] text-white py-4 rounded font-mono tracking-[0.2em] uppercase font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(200,90,63,0.3)] hover:shadow-[0_0_30px_rgba(200,90,63,0.5)] active:scale-[0.98]"
                                                    >
                                                        {isSearching ? <span className="animate-pulse">VERIFYING...</span> : '调取档案 / RETRIEVE'}
                                                        {!isSearching && <Search size={16} />}
                                                    </button>
                                                </form>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        /* RESULT VIEW (Interactive Split Pane) */
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full flex flex-col md:flex-row bg-black relative"
                                        >
                                            {/* Top Overlay Controls (Mobile) */}
                                            <div className="md:hidden absolute top-4 right-4 z-50">
                                                <button onClick={resetView} className="p-2 bg-black/50 text-white rounded-full"><X size={20} /></button>
                                            </div>

                                            {/* Newspaper Pane */}
                                            <div
                                                className={`
                                                    relative transition-all duration-500 ease-in-out overflow-hidden cursor-pointer
                                                    ${focusedPane === 'newspaper' ? 'flex-[2.5]' : focusedPane === 'annotation' ? 'flex-[0.8] opacity-60 hover:opacity-100 hover:flex-[1]' : 'flex-1'}
                                                    border-r border-[#c85a3f]/20
                                                `}
                                                onMouseEnter={() => setFocusedPane('newspaper')}
                                                onClick={() => setFocusedPane('newspaper')}
                                            >
                                                <div className="h-full overflow-y-auto bg-[#eaddcf] text-neutral-900 p-8 md:p-12 relative group scrollbar-thin scrollbar-thumb-neutral-400">
                                                    <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

                                                    <div className="max-w-2xl mx-auto relative z-10 font-serif origin-top transition-transform duration-500">
                                                        <div className="border-b-4 border-black mb-8 pb-4 text-center">
                                                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">{activeCase.newspaper.source}</h2>
                                                            <div className="flex justify-between items-center border-t border-black pt-2 text-xs md:text-sm font-bold uppercase tracking-wide">
                                                                <span>{activeCase.newspaper.date}</span>
                                                                <span className="bg-black text-[#eaddcf] px-2 py-0.5">EXTRA EDITION</span>
                                                                <span>10 CENTS</span>
                                                            </div>
                                                        </div>

                                                        <h1 className="text-3xl md:text-4xl font-extrabold leading-[1.1] mb-6 font-serif">{activeCase.newspaper.headline}</h1>

                                                        <div className="columns-1 md:columns-2 gap-8 text-sm md:text-base leading-relaxed text-justify space-y-4 font-serif text-neutral-800">
                                                            {activeCase.newspaper.content.map((para, i) => {
                                                                const activeKeywords = activeCase.id === 'kan_1976'
                                                                    ? ['东12街', '行刑室']
                                                                    : [];

                                                                if (activeKeywords.length > 0) {
                                                                    const pattern = `(${activeKeywords.join('|')})`;
                                                                    const regex = new RegExp(pattern, 'g');
                                                                    return (
                                                                        <p key={i} className={`first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 ${i === 0 ? 'first-letter:text-black' : 'first-letter:hidden'}`}>
                                                                            {para.split(regex).map((part, j) => {
                                                                                if (activeKeywords.includes(part)) {
                                                                                    return (
                                                                                        <span
                                                                                            key={j}
                                                                                            onClick={() => handleKeywordClick(part)}
                                                                                            className="cursor-pointer font-bold text-[#c85a3f] border-b border-[#c85a3f] hover:bg-[#c85a3f]/10"
                                                                                        >
                                                                                            {part}
                                                                                        </span>
                                                                                    );
                                                                                }
                                                                                return <span key={j}>{part}</span>;
                                                                            })}
                                                                        </p>
                                                                    );
                                                                }

                                                                return (
                                                                    <p key={i} className={`first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 ${i === 0 ? 'first-letter:text-black' : 'first-letter:hidden'}`}>
                                                                        {para}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Label */}
                                                <div className="absolute bottom-4 left-4 bg-black/80 text-[#eaddcf] text-[10px] px-2 py-1 uppercase tracking-widest pointer-events-none">
                                                    EVIDENCE TYPE: PRESS CLIPPING
                                                </div>
                                            </div>

                                            {/* FBI Annotation Pane */}
                                            <div
                                                className={`
                                                    relative transition-all duration-500 ease-in-out overflow-hidden cursor-pointer bg-[#1a1515]
                                                    ${focusedPane === 'annotation' ? 'flex-[2]' : focusedPane === 'newspaper' ? 'flex-[0.5] opacity-60 hover:opacity-100 hover:flex-[0.8]' : 'flex-1'}
                                                `}
                                                onMouseEnter={() => setFocusedPane('annotation')}
                                                onClick={() => setFocusedPane('annotation')}
                                            >
                                                <div className="h-full overflow-y-auto p-8 md:p-12 relative scrollbar-thin scrollbar-thumb-[#c85a3f]/30">
                                                    <div className="absolute top-10 right-10 p-4 opacity-10 pointer-events-none transform rotate-12">
                                                        <Stamp size={180} className="text-red-600" />
                                                    </div>

                                                    <div className="max-w-xl mx-auto space-y-8 relative z-10">
                                                        <div className="border border-[#c85a3f]/30 p-6 rounded bg-[#c85a3f]/5 backdrop-blur-sm relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#c85a3f]" />
                                                            <div className="flex justify-between items-start mb-6 border-b border-[#c85a3f]/20 pb-4">
                                                                <div>
                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Bureau Investigation File</div>
                                                                    <div className="text-xl md:text-2xl font-mono font-bold text-[#d89853]">{activeCase.annotation.fileId}</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-[10px] text-[#c85a3f]/60 uppercase tracking-[0.2em] mb-1">Classification</div>
                                                                    <div className="text-red-500 font-bold border border-red-500/50 px-2 py-0.5 text-xs bg-red-500/10 tracking-widest">{activeCase.annotation.level}</div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-6 text-xs text-[#d89853]/80 font-mono">
                                                                <div>
                                                                    <span className="block text-[#c85a3f]/40 text-[10px] uppercase">Marked Date</span>
                                                                    {activeCase.annotation.date}
                                                                </div>
                                                                <div>
                                                                    <span className="block text-[#c85a3f]/40 text-[10px] uppercase">
                                                                        {activeCase.annotation.template === 'ALTERMAN' ? 'Authorized By' : activeCase.annotation.template === 'THORNE' ? 'Validated By' : 'Verified By'}
                                                                    </span>
                                                                    {activeCase.annotation.author}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="font-mono text-sm md:text-base leading-7 space-y-6 text-neutral-300 font-light border-l border-[#c85a3f]/10 pl-6">
                                                            {activeCase.annotation.content.split('\n').map((line, i) => {
                                                                // Define keywords based on case ID
                                                                const caseKeywords = activeCase.id === 'oh_1968'
                                                                    ? ['俄亥俄州', '祭祀案', '1967']
                                                                    : activeCase.id === 'dc_1967'
                                                                        ? ['碎尸案']
                                                                        : activeCase.id === 'va_1990'
                                                                            ? []
                                                                            : activeCase.id === 'il_1985'
                                                                                ? ['1402 Old Dominion Rd.', '灭门案', '训练日']
                                                                                : activeCase.id === 'nv_1971'
                                                                                    ? ['莫哈韦休息站', '空烟盒']
                                                                                    : activeCase.id === 'cin_1973'
                                                                                        ? ['1986', '1986年', '薄荷计划']
                                                                                        : activeCase.id === 'nas_1973'
                                                                                            ? ['伯克斯维尔', '1975', '1975年']
                                                                                            : activeCase.id === 'ky_1973'
                                                                                                ? ['KLUB-75号分析报告', '匡提科', 'Quantico']
                                                                                                : activeCase.id === 'kan_1976'
                                                                                                    ? ['东12街', '行刑室']
                                                                                                    : ['俄亥俄州', '祭祀案'];

                                                                const activeKeywords = caseKeywords;

                                                                const attachmentTrigger = '「图片见附录」';
                                                                const wilmerTrigger = '「附注」';
                                                                // Create a combined regex for keywords and the specific attachment text
                                                                const pattern = `(${[...activeKeywords, attachmentTrigger, wilmerTrigger].join('|')})`;
                                                                const regex = new RegExp(pattern, 'g');

                                                                return (
                                                                    <p key={i} className="mb-4">
                                                                        {line.split(regex).map((part, j) => {

                                                                            if (part === attachmentTrigger || part === wilmerTrigger) {
                                                                                return (
                                                                                    <span
                                                                                        key={j}
                                                                                        onClick={() => {
                                                                                            // Special case for different archives
                                                                                            if (activeCase.id === 'va_1990') {
                                                                                                setAttachmentImage('assets/wilmer_ribbon.jpg');
                                                                                            } else if (activeCase.id === 'cin_1973') {
                                                                                                setAttachmentImage('assets/butter_julep_evidence.jpg');
                                                                                            } else {
                                                                                                setAttachmentImage('assets/fbi-symbol.png');
                                                                                            }
                                                                                        }}
                                                                                        className="inline-flex items-center gap-1 text-[#d89853] cursor-pointer hover:text-white hover:underline decoration-1 underline-offset-4 ml-1 transition-colors group/link align-baseline font-bold"
                                                                                        title="查看附录图片"
                                                                                    >
                                                                                        <File size={14} className="inline group-hover/link:scale-110 transition-transform" />
                                                                                        {part === '「附注」' ? '「附注」' : part}
                                                                                    </span>
                                                                                );
                                                                            }

                                                                            if (activeKeywords.includes(part)) {
                                                                                const clueId = ARCHIVE_KEYWORD_MAP[part];
                                                                                // Check visual feedback against global props
                                                                                const isCollected = collectedClues.includes(clueId) || collectedYears.includes(clueId);

                                                                                return (
                                                                                    <span
                                                                                        key={j}
                                                                                        onClick={() => handleKeywordClick(part)}
                                                                                        className={`
                                                                                        cursor-pointer font-bold inline-block transform hover:scale-105 transition-all duration-200
                                                                                        ${isCollected
                                                                                                ? 'text-white bg-[#c85a3f] px-1 shadow-lg'
                                                                                                : 'text-[#c85a3f] border-b-2 border-[#c85a3f] hover:bg-[#c85a3f]/20 animate-pulse'
                                                                                            }
                                                                                    `}
                                                                                        title={isCollected ? "已收录" : "点击收集线索"}
                                                                                    >
                                                                                        {part}
                                                                                    </span>
                                                                                );
                                                                            }
                                                                            return <span key={j}>{part}</span>;
                                                                        })}
                                                                    </p>
                                                                );
                                                            })}
                                                        </div>

                                                        {/* Handwritten Signature */}
                                                        <div className="mt-8 flex justify-end pr-12">
                                                            {activeCase.annotation.template === 'ALTERMAN' ? (
                                                                // Alterman's Signature - More angular and bureaucratic
                                                                <div className="relative text-blue-900/70 transform -rotate-6 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity">
                                                                    <svg width="140" height="70" viewBox="0 0 140 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        {/* "I" - vertical stroke */}
                                                                        <path
                                                                            d="M20 25 L 20 50"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2.5"
                                                                            strokeLinecap="round"
                                                                        />
                                                                        {/* "A" - angular */}
                                                                        <path
                                                                            d="M30 50 L 40 25 L 50 50 M35 40 L 45 40"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        {/* Underline */}
                                                                        <path
                                                                            d="M 15 55 L 125 48"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            opacity="0.5"
                                                                        />
                                                                        <text x="75" y="60" fontFamily="serif" fontSize="11" fill="currentColor" opacity="0.7" className="tracking-wider">Alterman</text>
                                                                    </svg>
                                                                    <div className="text-[10px] text-[#475569]/70 font-mono text-center mt-1 tracking-widest uppercase">Authorized</div>
                                                                </div>
                                                            ) : activeCase.annotation.template === 'THORNE' ? (
                                                                // Marcus Thorne's Signature - Technical, Lab Chief style
                                                                <div className="relative text-emerald-900/70 transform rotate-1 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity">
                                                                    <svg width="150" height="70" viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        {/* "M" - sharp, technical */}
                                                                        <path
                                                                            d="M25 50 L 25 25 L 40 40 L 55 25 L 55 50"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        {/* "T" - precise */}
                                                                        <path
                                                                            d="M65 25 L 95 25 M 80 25 L 80 50"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                        />
                                                                        {/* Lab Seal Symbol (Simple Hexagon) */}
                                                                        <path
                                                                            d="M110 30 L 125 22 L 140 30 L 140 45 L 125 53 L 110 45 Z"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1"
                                                                            opacity="0.4"
                                                                        />
                                                                        <text x="112" y="41" fontFamily="serif" fontSize="6" fill="currentColor" opacity="0.6">LAB-TECH</text>
                                                                        {/* Divider line */}
                                                                        <path
                                                                            d="M 20 55 L 145 55"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1"
                                                                            opacity="0.3"
                                                                        />
                                                                        <text x="35" y="62" fontFamily="serif" fontSize="10" fill="currentColor" opacity="0.8" className="tracking-[0.2em]">M. THORNE</text>
                                                                    </svg>
                                                                    <div className="text-[10px] text-emerald-800/60 font-mono text-center mt-1 tracking-widest uppercase border-t border-emerald-800/20 pt-1">Forensic Chief</div>
                                                                </div>
                                                            ) : activeCase.annotation.template === 'CRANE' ? (
                                                                // Thomas Crane's Signature - Bold, authoritative, heavy ink
                                                                <div className="relative text-red-950/80 transform rotate-2 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity">
                                                                    <svg width="160" height="80" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        {/* Thick "T" */}
                                                                        <path
                                                                            d="M30 25 L 70 25 M 50 25 L 50 55"
                                                                            stroke="currentColor"
                                                                            strokeWidth="4"
                                                                            strokeLinecap="square"
                                                                        />
                                                                        {/* Heavy "C" */}
                                                                        <path
                                                                            d="M100 25 C 80 25, 75 40, 80 55 C 85 65, 110 65, 115 50"
                                                                            stroke="currentColor"
                                                                            strokeWidth="4"
                                                                            strokeLinecap="round"
                                                                        />
                                                                        {/* Brutalist underline */}
                                                                        <path
                                                                            d="M 20 62 L 140 62"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1.5"
                                                                            strokeDasharray="4 2"
                                                                            opacity="0.6"
                                                                        />
                                                                        <text x="50" y="75" fontFamily="serif" fontSize="12" fontWeight="bold" fill="currentColor" opacity="0.9" className="tracking-tighter italic">T. Crane</text>
                                                                        {/* "APPROVED" Stamp effect */}
                                                                        <rect x="110" y="15" width="40" height="15" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                                                                        <text x="114" y="26" fontFamily="sans-serif" fontSize="7" fontWeight="black" fill="currentColor" opacity="0.6">REVIEWER</text>
                                                                    </svg>
                                                                    <div className="text-[9px] text-red-950/60 font-mono text-right mr-4 tracking-tighter uppercase font-bold italic">Senior Agent Analyst</div>
                                                                </div>
                                                            ) : (
                                                                // Reggie's Signature - Original flowing style
                                                                <div className="relative text-red-900/80 transform -rotate-12 mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity">
                                                                    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M30 60 C 30 60, 25 20, 45 15 C 60 10, 70 25, 55 40 C 40 55, 30 40, 50 35 C 70 30, 90 60, 100 55"
                                                                            stroke="currentColor"
                                                                            strokeWidth="3"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            className="path-draw"
                                                                        />
                                                                        <path
                                                                            d="M 25 65 L 105 50"
                                                                            stroke="currentColor"
                                                                            strokeWidth="2"
                                                                            strokeLinecap="round"
                                                                            opacity="0.6"
                                                                        />
                                                                        <text x="70" y="70" fontFamily="serif" fontSize="12" fill="currentColor" opacity="0.8" className="tracking-widest rotate-6">Reggie</text>
                                                                    </svg>
                                                                    <div className="text-[10px] text-[#c85a3f]/60 font-mono text-center mt-1 tracking-widest uppercase">Verified</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Label */}
                                                <div className="absolute bottom-4 right-4 bg-[#c85a3f]/20 text-[#c85a3f] text-[10px] px-2 py-1 uppercase tracking-widest pointer-events-none border border-[#c85a3f]/30">
                                                    INTERNAL MEMO // DO NOT DISTRIBUTE
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    {/* Attachment Image Modal */}
                    {/* Attachment Image Modal */}
                    <AnimatePresence>
                        {attachmentImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    setAttachmentImage(null);
                                    setIsSelectingFolder(false);
                                    setCollectionFeedback({ type: null, msg: '' });
                                }}
                                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-default"
                            >
                                <div className="relative w-full max-w-4xl flex flex-col items-center" onClick={e => e.stopPropagation()}>

                                    <div className="relative mb-8">
                                        <motion.img
                                            initial={{ scale: 0.9, rotate: -2 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.9, rotate: 2 }}
                                            src={attachmentImage}
                                            alt="FBI Attachment"
                                            className={`
                                                max-h-[70vh] object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all
                                                ${attachmentImage === 'assets/wilmer_ribbon.jpg'
                                                    ? 'p-0 bg-transparent transform rotate-2 scale-110' // Clean Polaroid style
                                                    : 'border-8 border-white p-4 bg-white transform rotate-1' // Legacy style
                                                }
                                            `}
                                        />

                                        {collectionFeedback.msg && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded border backdrop-blur-md shadow-2xl font-mono font-bold tracking-widest text-sm z-50
                                                    ${collectionFeedback.type === 'success' ? 'bg-green-900/90 border-green-500 text-green-100' : 'bg-red-900/90 border-red-500 text-red-100'}
                                                `}
                                            >
                                                {collectionFeedback.msg}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Interaction Area */}
                                    <div className="w-full max-w-lg">
                                        {!isSelectingFolder ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <button
                                                    onClick={() => setIsSelectingFolder(true)}
                                                    className="bg-[#c85a3f] text-white px-8 py-3 rounded-full font-mono font-bold tracking-[0.2em] flex items-center gap-3 hover:bg-[#d89853] transition-all shadow-[0_0_20px_rgba(200,90,63,0.4)] hover:scale-105 active:scale-95"
                                                >
                                                    <FolderOpen size={18} />
                                                    COLLECT EVIDENCE
                                                </button>
                                                <span className="text-[10px] text-[#d89853]/60 font-mono tracking-widest uppercase">
                                                    Identify applicable case file
                                                </span>
                                            </div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-[#0f0a0a] border border-[#d89853]/30 rounded-lg p-6 shadow-2xl relative"
                                            >
                                                <div className="text-center mb-4">
                                                    <h4 className="text-[#d89853] font-mono tracking-widest text-sm font-bold">SELECT TARGET CASE FILE</h4>
                                                    <p className="text-[#d89853]/40 text-[10px] uppercase">Where does this evidence belong?</p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[30vh] overflow-y-auto custom-scrollbar p-1">
                                                    {collectedDossierIds.map(clueId => (
                                                        <button
                                                            key={clueId}
                                                            onClick={() => handleAttemptCollect(clueId)}
                                                            className="text-[10px] font-mono border border-[#d89853]/20 bg-[#d89853]/5 text-[#d89853]/80 p-2 rounded hover:bg-[#d89853]/20 hover:text-[#d89853] hover:border-[#d89853]/50 transition-all truncate text-left flex items-center gap-2"
                                                        >
                                                            <Folder size={12} className="shrink-0" />
                                                            <span className="truncate">{CLUE_DISPLAY_MAP[clueId] || clueId}</span>
                                                        </button>
                                                    ))}
                                                    {collectedDossierIds.length === 0 && (
                                                        <div className="col-span-3 text-center text-[#d89853]/30 text-xs py-4">
                                                            NO OPEN FILES AVAILABLE
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => setIsSelectingFolder(false)}
                                                    className="absolute top-2 right-2 text-[#d89853]/40 hover:text-[#d89853]"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
