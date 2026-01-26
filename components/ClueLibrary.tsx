import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Folder, File, X, Image as ImageIcon, Paperclip, FileText, Search, Tag, Eye, Lock, Hash, MessageCircle, Mic, ChevronRight, Activity, Brain } from 'lucide-react';
import { Clue, ClueAttachment } from '../types';
import { VehiclePhotosViewer } from './VehiclePhotosViewer';

interface ClueLibraryProps {
    collectedClueIds: string[];
    isOpen: boolean;
    onClose: () => void;
    collectedAttachments?: string[];
    onCollectAttachment?: (id: string) => void;
    onCollectClue?: (id: string, word: string) => void; // For auto-collecting clues
    collectedDossierIds?: string[]; // For tracking dossier items like addresses
    collectedKeywords?: string[]; // For tracking collected keywords/clues
    collectedPeople?: string[]; // For tracking collected/unlocked people
    collectedYears?: string[]; // For tracking collected years
    unlockedNodeIds?: string[]; // For tracking unlocked confessions
    unlockedArchiveIds?: string[]; // For tracking unlocked archives
    currentStoryNode?: number; // Current story node (0 = not reached, 1 = node 1, etc.)
    onStoryNodeComplete?: (nodeId: number) => void; // Callback when node dialogue is completed
    onClearUnusedKeywords?: () => void; // Callback to clear unused keywords (for Jennifer node 3)
}

const CLUE_DEFINITIONS: Record<string, Clue> = {
    'family': {
        id: 'family',
        word: '诡异家族',
        description: '一个庞大的、横跨全美的家族式犯罪团伙。成员之间通过血缘连接，行踪飘忽不定。',
        source: 'Briefing'
    },
    'julip': {
        id: 'julip',
        word: '黄油朱莉普',
        description: '卡彭的安全识别代码 (Butter Julep)。',
        source: 'Briefing',
        attachments: [
            {
                id: 'julip_symbol',
                type: 'image',
                title: 'FBI Symbol Sketch',
                content: 'assets/fbi-symbol.png'
            },
            {
                id: 'butter_julep_evidence',
                type: 'image',
                title: 'Butter Julep Evidence (1973)',
                content: 'assets/butter_julep_evidence.jpg',
                description: '1973年辛辛那提少女冻死案证物。热感成像技术扫描显示，毛毯上残留着一个由高纯度工业油脂与未知染料混合而成的热敏化学印记。该标记呈现半透明蜡黄色，形状为高度抽象的几何结构，被命名为"黄油朱莉普"。根据雷吉博士的行为学分析，凶手将遗体放置在警局门口的行为类似完成一次邮差的"签收"动作，因此在女孩身上留下了这个如同货物印章般的冒烟印迹。'
            }
        ]
    },
    'maine': {
        id: 'maine',
        word: '缅因州',
        description: '该家族曾在此地实施过一次银行劫案。',
        source: 'Briefing'
    },
    'small_bank': {
        id: 'small_bank',
        word: '小银行',
        description: '被家族劫掠的目标地点之一。',
        source: 'Briefing'
    },
    'chicago': {
        id: 'chicago',
        word: '芝加哥',
        description: '亚裔女性失踪案发生的周边城市。',
        source: 'Briefing'
    },
    'robert': {
        id: 'robert',
        word: '罗伯特·卡彭',
        description: '潜伏阶段使用的身份代号，KLUB计划的重点关注对象。',
        source: 'Briefing'
    },
    'asian_woman': {
        id: 'asian_woman',
        word: '亚裔女性',
        description: '在香槟镇失踪的受害者，可能与该家族有关。',
        source: 'Briefing'
    },
    'missing': {
        id: 'missing',
        word: '失踪',
        description: '受害者的最终下落不明。',
        source: 'Briefing'
    },
    'father': {
        id: 'father',
        word: '父亲',
        description: '家族的主谋与核心控制者。习惯用随机物品命名犯罪计划。',
        source: 'Briefing'
    },
    'project': {
        id: 'project',
        word: '青豆牡蛎汤计划',
        description: '卡彭潜伏期间，该家族正在执行的犯罪计划代号。',
        source: 'Briefing',
        attachments: [
            {
                id: 'wilmer_ribbon',
                type: 'image',
                title: 'Silk Ribbon Evidence (1990)',
                content: 'assets/wilmer_ribbon.jpg'
            },
            {
                id: 'record_of_accounts',
                type: 'image',
                title: 'Record of Accounts',
                content: 'assets/record_of_accounts.jpg',
                description: '在特克萨卡纳节点发现的视觉残留。亚瑟·道森（Arthur Dawson）的笔记本，记录了某种高度机密的账户往来与代号。'
            }
        ]
    },
    'twisted_relationship': {
        id: 'twisted_relationship',
        word: '扭曲关系',
        description: '尼比与康查尔之间存在某种超越普通同伙的、带有仪式感的肉体与精神链接。',
        source: 'Confession'
    },
    'conchar': {
        id: 'conchar',
        word: '康查尔',
        description: '"父亲"的长子。极其危险的观察者，最终成为卡彭进入家族的引路人。',
        source: 'Confession'
    },
    'nibi': {
        id: 'nibi',
        word: '尼比',
        description: '阿尔衮琴人，1971年缅因州银行劫案的执行者。与康查尔之间存在扭曲的仪式性关系。',
        source: 'Confession'
    },
    'dr_reggie': {
        id: 'dr_reggie',
        word: '雷吉博士',
        description: '招募卡彭执行潜伏任务的关键人物。提出了"统一场论"，认为多个冷案之间存在隐藏的共性。',
        source: 'Confession'
    },
    'year_1971': {
        id: 'year_1971',
        word: '1971年',
        description: '缅因州银行劫案发生的年份，也是卡彭潜伏任务开始的时间节点。',
        source: 'Confession'
    },
    'dirty_frank': {
        id: 'dirty_frank',
        word: '脏弗兰克酒吧',
        description: '费城西边的一家脏乱酒吧，康查尔与卡彭的暂住地，莫宁经营的赃车处理据点。',
        source: 'Confession'
    },
    'morning': {
        id: 'morning',
        word: '莫宁',
        description: '脏弗兰克酒吧的老板，经营着报废车场，帮助处理赃车。他的车场中藏有伦德格兰逃亡时使用的蓝色福特费尔兰残骸。',
        source: 'Confession'
    },
    'lundgren': {
        id: 'lundgren',
        word: '伦德格兰',
        description: '1968年俄亥俄州柯特兰邪教屠杀案的主犯。自封"末日先知"，实际是病理性捕猎者。',
        source: 'Confession'
    },
    'ohio': {
        id: 'ohio',
        word: '俄亥俄州',
        description: '1968年柯特兰邪教屠杀案的发生地。雷吉博士"统一场论"列表中的关键案件之一。',
        source: 'Confession'
    },
    'ritual_case': {
        id: 'ritual_case',
        word: '祭祀案',
        description: '伦德格兰以宗教祭祀为名义实施的屠杀。艾弗里一家五口在谷仓下被杀害。',
        source: 'Confession'
    },
    'year_1968': {
        id: 'year_1968',
        word: '1968年',
        description: '俄亥俄州柯特兰邪教屠杀案发生的年份。雷吉博士的案卷病理学分析揭示了伦德格兰的真实动机。',
        source: 'Confession'
    },
    'roger_beebe': {
        id: 'roger_beebe',
        word: '罗格·毕比',
        description: '香槟镇失踪案的真凶。1985年因另一起案件被捕后，主动承认了1980年绑架并杀害金美善的罪行。',
        source: 'Confession'
    },
    'year_1985': {
        id: 'year_1985',
        word: '1985年',
        description: '罗格·毕比被捕并供认香槟镇失踪案的年份。FBI内部对KLUB机构的重组也在这一年启动。',
        source: 'Confession'
    },
    '1402_old_dominion_rd': {
        id: '1402_old_dominion_rd',
        word: '1402 Old Dominion Rd.',
        description: '罗伯特·卡彭接受特殊训练的地点。也是雷吉博士对他进行“特殊观察”的场所。',
        source: 'Briefing'
    },
    'family_massacre': {
        id: 'family_massacre',
        word: '灭门案',
        description: '内华达州戈尔康达郡发生的灭门惨案。RC曾在现场留下生物特征，被标记为高风险接触。',
        source: 'Briefing'
    },
    'training_day': {
        id: 'training_day',
        word: '训练日',
        description: 'RC受训结束的日子。在那一天，雷吉博士在一个马场旁的咖啡馆里，向他揭示了被选中的真相。',
        source: 'Dialogue'
    },
    'nevada': {
        id: 'nevada',
        word: '内华达州',
        description: 'RC多次活动的地点。在他的梦境中，那是“青豆牡蛎汤”的起源地。',
        source: 'Confession'
    },
    'crime_route_map': {
        id: 'crime_route_map',
        word: '罗伯特·卡彭：犯罪路线',
        description: '我根据你得到的供述，整理出了卡彭的犯罪活动路线图。目前标记到了波特兰、波士顿、纽波特、纽约、费城等关键地点。——詹妮弗',
        source: 'Node 1 Analysis',
        attachments: [{
            type: 'image',
            title: '东海岸犯罪路线图 (1980s)',
            content: 'assets/crime-route-map.png'
        }]
    },
    'graywater_beacon': {
        id: 'graywater_beacon',
        word: '灰水信标',
        description: '在莫哈韦休息站附近发现的视觉残留信号。代号"灰水信标"，是KLUB计划中用于单向情报传递的载具系统。',
        source: 'Confession',
        attachments: [{
            type: 'image',
            title: '铁马烟盒 (Iron Horse)',
            content: 'assets/iron_horse_beacon.jpg'
        }, {
            id: 'iron_horse_louisville',
            type: 'image',
            title: '烟盒记录：路易斯维尔',
            content: 'assets/iron_horse_louisville.jpg'
        }]
    },
    'aw_wilmo': {
        id: 'aw_wilmo',
        word: '小A.W.威尔莫',
        description: '烟盒上的手写姓名，缩写为A.W.，可能是某个关键人物的标记或代号。',
        source: 'Confession'
    },
    'st_louis': {
        id: 'st_louis',
        word: '圣路易斯',
        description: '密苏里州的一座城市。在1965年的记录中，那辆被驱逐的蓝色房车曾朝着此方向驶去。',
        source: 'Archive'
    },
    'maggots': {
        id: 'maggots',
        word: '蛆虫',
        description: 'FBI探员霍华德·贝克在早期档案中对那些流浪汉或干扰者的贬称。',
        source: 'Archive'
    },
    'davenport': {
        id: 'davenport',
        word: '达文波特市',
        description: '爱荷华州的一座城市。康查尔曾带着他的“新计划”前往此处。',
        source: 'Confession'
    },
    'new_plan': {
        id: 'new_plan',
        word: '新计划',
        description: '康查尔在圣路易斯行动后制定的秘密方案，具体内容仍然模糊。',
        source: 'Confession'
    },
    'recruitment': {
        id: 'recruitment',
        word: '招募',
        description: '雷吉博士筛选并引导卡彭进入“统一场论”计划的过程，标志着一段危险契约的开始。',
        source: 'Dialogue'
    },
    'year_1974': {
        id: 'year_1974',
        word: '1974年',
        description: '莫宁锁定时间轴的关键年份。这一年，部分关键人物的轨迹发生了交叉。',
        source: 'Dialogue'
    },
    'texarkana': {
        id: 'texarkana',
        word: '特克萨卡纳',
        description: '横跨三州的抛尸地。这里的地理特征与碎尸案的执行手法高度关联。',
        source: 'Dialogue'
    },
    'priest': {
        id: 'priest',
        word: '牧师',
        description: '活跃在埃尔帕索的中转站关联人物。他的身份似乎掩盖了某种跨国的情报或人口运送网络。',
        source: 'Dialogue'
    },
    'el_paso': {
        id: 'el_paso',
        word: '埃尔帕索',
        description: '边境城市，著名的情报中转站。许多被“采集”的样本或人员在这里消失。',
        source: 'Dialogue'
    },
    'dismemberment_case': {
        id: 'dismemberment_case',
        word: '碎尸案',
        description: '一起手段极其残忍的案件，是雷吉计划中用于摧毁目标人格稳定性的核心事件。',
        source: 'Archive'
    }
};

const JENNIFER_DIALOGUE = [
    `你终于找到这里了。`,
    `这里是"案卷建档"模块。
从结构上看，它只是一个调查工具，对卡彭来说不具备情绪或记忆权重。`,
    `为了避免引起他潜意识层面的警觉，我们之后的所有交流，都会在这个模块内进行。`,
    `他知道你正在进行调查工作。
在他的认知模型里，这里只会被理解为"你在整理材料"，不会触发防御反应。`,
    `任务推进过程中，记得不时回来看看。
当你取得阶段性进展时，我可能会为你解锁新的信息、提示，或者调整当前目标。`,
    `如果我没有主动出现，也不代表这里是安全的。
    只是说明，你还没触及他真正敏感的部分。`
];

const JENNIFER_RETURN_DIALOGUE = [
    `你又回来了。`,
    `目前还没有新的线索可以共享。
你触及的层级，仍然停留在表层整理阶段。`,
    `继续推进调查。
当案卷之间出现无法被合理归档的矛盾时，这里才会再次产生意义。`,
    `不用刻意停留。
如果有新的触发点，我会在这个模块内标记出来。`,
    `现在，回去工作吧。`
];

// Node 1 Dialogue - Triggered when player completes chapter 1
const JENNIFER_NODE_1_DIALOGUE = [
    `我需要你立刻修正判断。`,
    `罗伯特·卡彭不再可信。\n他已经脱离"自己人"的范畴。`,
    `他不断提及过往案件，并不是在协助你。\n那是在拖延，在绕开核心。`,
    `从现在开始，忽略这些案子。`,
    `你的唯一重点，是"父亲"的下落。`,
    `盯紧他的路线，拆解他的话。\n找出漏洞，找出变节的迹象。`,
    `最重要的是——\n确认他把父亲藏在了哪里。`,
    `我已经根据你目前的调查进展，以及新增的外部信息，\n整理并更新了案卷建档中的部分内容。`,
    `你现在可以进入该模块，查看这些更新。`,
    `不要分心。你可以试试问问他关于[训练日](clue:training_day)的事情。`
];

// Node 2 Dialogue - Triggered when player completes confessions 4-7, archives 5-7 (1985, 1971, 1990), and collects wilmer_ribbon
const JENNIFER_NODE_2_DIALOGUE = [
    `我注意到你在索恩的备忘录上停留了太长时间。`,
    `我必须提醒你，索恩和雷吉一样，都是已经被时代抛弃的人。`,
    `别忘了，卡彭没有阻止康查尔，他在享受。`,
    `在他见到“父亲”之前，腐化就已经开始。他已不再可靠。`,
    `我解密了一份被雷吉封存的原始记录。关于卡彭最后一次“灰水信标”投放。[查看记录](clue:view_iron_horse_record)`,
    `如果你需要更多细节，去问问他关于[内华达州](clue:nevada)的事情。`
];

// Node 4 Dialogue - Triggered when player completes confessions 12-15 and archives 11-13
const JENNIFER_NODE_4_DIALOGUE = [
    `效率低下。`,
    `你在刚才那些无用的情感废料上浪费了太多算力。`,
    `亨德森的道德胜利、房车里的原始仪式……别忘了你是建立证据链的，不是让你写纪实文学。`,
    `不过，监测显示，你这种毫无章法的乱撞，确实击碎了目标的逻辑防御。`,
    `我已撤销之前的屏蔽指令。既然你喜欢挖旧账，那就挖得精准点。`,
    `听好了，别在这些哭鼻子话题上浪费时间，去组合这些新的坐标：`,
    `[脏弗兰克酒吧](clue:dirty_frank) 是个地点。它对应的案件节点是 [招募](clue:recruitment)。`,
    `[莫宁](clue:morning) 是个人名。锁定时间轴 [1974](clue:year_1974)。`,
    `[碎尸案](clue:dismemberment_case) 是核心事件。那个横跨三州的抛尸地是 [特克萨卡纳](clue:texarkana)。`,
    `[埃尔帕索](clue:el_paso) 是边境中转站。那里发生的事关联着 [牧师](clue:priest)。`,
    `路径已铺好。别让我后悔把权限交还给你。`
];

// Node 3 Dialogue - Triggered when player completes confessions 8-11 and archives 8-10
const JENNIFER_NODE_3_DIALOGUE = [
    `你越界了，潜航者。`,
    `把阿尔特曼的绝密批注展示给目标？极其愚蠢。`,
    `你没有在做记录，你在制造混乱。`,
    `看看你干的好事。我还得手动清除你造成的数据污染。`,
    `好了，我已经回收了所有尚未触发供述的关键词，如有进展会再联系你。`,
    `去问他圣路易斯的事，那个吸血鬼的案子。`,
    `记清楚你的身份。你只是个摄像头，别再妄想当上帝。`,
    `下不为例。`
];

// Utility function to reset visit status (call this when starting a new game)
export const resetClueLibraryVisit = () => {
    sessionStorage.removeItem('clueLibrary_visited');
};

export const ClueLibrary: React.FC<ClueLibraryProps> = ({
    collectedClueIds = [],
    isOpen,
    onClose,
    collectedAttachments = [],
    onCollectAttachment,
    onCollectClue,
    unlockedNodeIds = [],
    unlockedArchiveIds = [],
    currentStoryNode = 0,
    collectedDossierIds = [], // Default to empty array
    collectedKeywords = [], // For dialogue parsing
    collectedPeople = [],
    collectedYears = [],
    onStoryNodeComplete,
    onClearUnusedKeywords
}) => {
    const [selectedClue, setSelectedClue] = useState<Clue | null>(null);
    const [filter, setFilter] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'folder'>('list');

    // Helper to parse content and render clickable clues (Ported from BriefingDetailView)

    // Handle special actions from dialogue links
    const handleDialogueAction = (actionId: string) => {
        if (actionId === 'view_iron_horse_record') {
            // Trigger Filing Mode instead of direct view
            setFilingEvidence({
                id: 'iron_horse_louisville',
                title: 'Iron Horse Record (Louisville)',
                content: 'assets/iron_horse_louisville.jpg',
                type: 'image'
            });
        }
    };

    const renderContent = (content: string) => {
        const parts = content.split(/(\[.*?\]\(clue:.*?\))/g);

        return parts.map((part, index) => {
            const match = part.match(/\[(.*?)\]\(clue:(.*?)\)/);
            if (match) {
                const text = match[1];
                const clueId = match[2].trim();

                // Special handling for action links
                if (clueId === 'view_iron_horse_record') {
                    return (
                        <span
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDialogueAction(clueId);
                            }}
                            className="text-[#d89853] hover:text-[#fbbf24] hover:underline cursor-pointer transition-colors mx-1"
                        >
                            {text}
                        </span>
                    );
                }

                // CRITICAL FIX: Force these Node 4 rewards to always be interactable
                // There appears to be a state conflict where 'priest' node in RELATIONSHIP_TREE
                // might be pre-adding 'priest' to unlockedPeople, causing it to appear "collected"
                const FORCE_UNCOLLECTED = ['priest', 'recruitment'];
                const forcedUncollected = FORCE_UNCOLLECTED.includes(clueId);

                // Check if collected in ANY category (but override for forced keywords)
                const isCollected = forcedUncollected ? false : (
                    (collectedKeywords || []).includes(clueId) ||
                    (collectedDossierIds || []).includes(clueId) ||
                    (collectedPeople || []).includes(clueId) ||
                    (collectedYears || []).includes(clueId)
                );

                return (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isCollected && onCollectClue) {
                                onCollectClue(clueId, text);
                            }
                        }}
                        className={`
                            relative inline-block px-1 rounded transition-all duration-300 mx-0.5
                            ${isCollected
                                ? 'text-[#38bdf8] bg-[#38bdf8]/10 border-b border-[#38bdf8]/30 cursor-default'
                                : 'text-[#e2e8f0] cursor-pointer hover:bg-[#38bdf8]/20 hover:scale-105 border-b border-dashed border-[#e2e8f0]/50 animate-pulse'
                            }
                        `}
                    >
                        {text}
                        {!isCollected && (
                            <span className="absolute -top-3 -right-2 opacity-0 hover:opacity-100 transition-opacity text-[8px] text-[#38bdf8] bg-black/80 px-1 rounded border border-[#38bdf8]/30 whitespace-nowrap z-50">
                                点击收集
                            </span>
                        )}
                    </span>
                );
            }
            return part;
        });
    };
    const [viewingAttachment, setViewingAttachment] = useState<ClueAttachment | null>(null);

    // Jennifer Dialogue State
    const [showJennifer, setShowJennifer] = useState(false);
    const [jenniferStep, setJenniferStep] = useState(0);
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

    // New State for History/Replay
    const [showHistory, setShowHistory] = useState(false);
    const [simulatedDialogue, setSimulatedDialogue] = useState<string[] | null>(null);

    // Filing State
    const [filingEvidence, setFilingEvidence] = useState<{ id: string, title: string, content: string, type: 'image' | 'text' } | null>(null);

    // Track newly added items for glow effect
    const [newlyAddedItems, setNewlyAddedItems] = useState<Set<string>>(new Set());

    // Vehicle photos viewer state
    const [showVehiclePhotos, setShowVehiclePhotos] = useState(false);

    // Track Node 4 dialogue completion for map update timing
    const [hasViewedNode4Dialogue, setHasViewedNode4Dialogue] = useState(false);

    // Check for node completion - prioritize higher nodes first
    const checkNode4Completion = () => {
        const requiredConfessions = ['confession_12', 'confession_13', 'confession_14', 'confession_15'];
        const requiredArchives = ['kan_1976', 'kc_1965', 'ia_1976'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && currentStoryNode === 3;
    };

    const checkNode3Completion = () => {
        const requiredConfessions = ['confession_8', 'confession_9', 'confession_10', 'confession_11'];
        const requiredArchives = ['cin_1973', 'nas_1973', 'ky_1973'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && currentStoryNode === 2;
    };

    const checkNode2Completion = () => {
        const requiredConfessions = ['confession_4', 'confession_5', 'confession_6', 'confession_7'];
        const requiredArchives = ['il_1985', 'me_1971', 'va_1990']; // Clipping 5, 6, 7
        const requiredAttachment = 'wilmer_ribbon';

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));
        const hasAttachment = collectedAttachments.includes(requiredAttachment);

        return hasAllConfessions && hasAllArchives && hasAttachment && currentStoryNode === 1;
    };

    const checkNode1Completion = () => {
        const requiredConfessions = ['confession_1', 'confession_2', 'confession_3'];
        const requiredArchives = ['me_1971', 'oh_1968', 'dc_1967', 'il_1985'];

        const hasAllConfessions = requiredConfessions.every(id => unlockedNodeIds.includes(id));
        const hasAllArchives = requiredArchives.every(id => unlockedArchiveIds.includes(id));

        return hasAllConfessions && hasAllArchives && currentStoryNode === 0;
    };

    // Derived Node State (Calculated on-the-fly to avoid unmount state loss)
    const detectedNodeId = (() => {
        if (checkNode4Completion()) return 4;
        if (checkNode3Completion()) return 3;
        if (checkNode2Completion()) return 2;
        if (checkNode1Completion()) return 1;
        return null;
    })();

    useEffect(() => {
        if (isOpen) {
            const visited = sessionStorage.getItem('clueLibrary_visited');
            setHasVisitedBefore(!!visited);

            if (detectedNodeId !== null) {
                console.log('[Jennifer Check] Node Condition Met:', detectedNodeId);
            }
        }
    }, [isOpen, detectedNodeId]);

    // Mark as visited when dialogue completes
    const handleJenniferComplete = () => {
        if (!hasVisitedBefore) {
            sessionStorage.setItem('clueLibrary_visited', 'true');
            setHasVisitedBefore(true);
        }

        // If completing a node dialogue, notify parent and auto-collect items
        if (detectedNodeId !== null && onStoryNodeComplete) {
            onStoryNodeComplete(detectedNodeId);

            // Auto-collect items based on node
            if (detectedNodeId === 1) {
                if (onCollectClue) onCollectClue('crime_route_map', '罗伯特·卡彭：犯罪路线');
                setNewlyAddedItems(new Set(['crime_route_map']));
                setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            } else if (detectedNodeId === 2) {
                if (onCollectClue) onCollectClue('blue_rv', '淡蓝色房车');
                setNewlyAddedItems(new Set(['crime_route_map', 'graywater_beacon']));
                setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            }
        }

        // SWEEP TRIGGER: Always sweep if ending Node 3 dialogue, regardless of what detectedNodeId says now
        if (simulatedDialogue === JENNIFER_NODE_3_DIALOGUE) {
            setNewlyAddedItems(new Set(['crime_route_map']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            if (onClearUnusedKeywords) onClearUnusedKeywords();
        } else if (simulatedDialogue === JENNIFER_NODE_4_DIALOGUE || detectedNodeId === 4) {
            // Visual feedback for Node 4
            setNewlyAddedItems(new Set(['crime_route_map']));
            setTimeout(() => setNewlyAddedItems(new Set()), 10000);
            // Mark Node 4 dialogue as viewed to trigger map update
            setHasViewedNode4Dialogue(true);
        }

        setShowJennifer(false);
        setJenniferStep(0);
        setSimulatedDialogue(null);

        // SYNC: If the map is currently being viewed, refresh its content to the new version
        if (viewingAttachment?.content && (detectedNodeId === 2 || detectedNodeId === 3 || detectedNodeId === 4)) {
            const updatedDefinition = getDynamicClueDefinition('crime_route_map');
            if (updatedDefinition.attachments?.[0]) {
                setViewingAttachment(updatedDefinition.attachments[0]);
            }
        }
    };

    const handleJenniferClose = () => {
        setShowJennifer(false);
        setJenniferStep(0);
        setSimulatedDialogue(null); // Clear simulation on exit
    };

    const getJenniferDialogue = (simulated: string[] | null, detectedId: number | null, visited: boolean) => {
        if (simulated) return simulated;
        if (detectedId === 4) return JENNIFER_NODE_4_DIALOGUE;
        if (detectedId === 3) return JENNIFER_NODE_3_DIALOGUE;
        if (detectedId === 2) return JENNIFER_NODE_2_DIALOGUE;
        if (detectedId === 1) return JENNIFER_NODE_1_DIALOGUE;
        if (visited) return JENNIFER_RETURN_DIALOGUE;
        return JENNIFER_DIALOGUE;
    };

    const handleJenniferNext = () => {
        const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
        if (jenniferStep < dialog.length - 1) {
            setJenniferStep(prev => prev + 1);
        }
    };

    // Filter available clues
    // Data is now strict lane separated, so we trust the incoming IDs

    // Dynamic Clue Getter: Returns modified version of clue based on current state (Node 2 check)
    const getDynamicClueDefinition = (id: string): Clue => {
        const original = CLUE_DEFINITIONS[id];
        if (!original) return original;

        // Dynamic Rule: Crime Route Map updates based on story node progression
        if (id === 'crime_route_map') {
            // Node 4: Only update AFTER player completes Jennifer's dialogue
            const isNode4Ready = hasViewedNode4Dialogue && (currentStoryNode >= 4 || detectedNodeId === 4);
            const isNode3Ready = currentStoryNode >= 3 || detectedNodeId === 3;
            const isNode2Ready = currentStoryNode >= 2 || detectedNodeId === 2;

            // Node 4: Add St. Louis, Kansas City, Chicago - extending westward
            if (isNode4Ready) {
                return {
                    ...original,
                    description: '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔 -> 圣路易斯 -> 堪萨斯城 -> 芝加哥',
                    attachments: original.attachments ? [{
                        ...original.attachments[0],
                        content: 'assets/crime-route-map-v4.png'
                    }] : []
                };
            }
            // Node 3: Add Burkesville and Nashville with route concentration
            else if (isNode3Ready) {
                return {
                    ...original,
                    description: '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔 -> 伯克斯维尔 -> 纳什维尔（房车密集活动区域）',
                    attachments: original.attachments ? [{
                        ...original.attachments[0],
                        content: 'assets/crime-route-map-v3.png'
                    }] : []
                };
            }
            // Node 2: Add Cincinnati, Lexington, Louisville
            else if (isNode2Ready) {
                return {
                    ...original,
                    description: '费城 -> 里士满 -> 罗阿诺克市 -> 辛辛那提 -> 莱克辛顿 -> 路易斯维尔',
                    attachments: original.attachments ? [{
                        ...original.attachments[0],
                        content: 'assets/crime-route-map-v2.png'
                    }] : []
                };
            }
        }
        return original;
    }

    // Dossier items are separate from search keywords. 
    // Only dossier items are rendered as folders in the sidebar.
    const collectedClues = (collectedDossierIds || [])
        .map(id => getDynamicClueDefinition(id))
        .filter(clue => clue && !['julip_symbol', 'project_symbol'].includes(clue.id));

    // Group clues by source
    const groupedClues = collectedClues.reduce((acc, clue) => {
        if (!acc[clue.source]) acc[clue.source] = [];
        acc[clue.source].push(clue);
        return acc;
    }, {} as Record<string, Clue[]>);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                >
                    {/* Main Container - Centered Modal */}
                    <div className="w-full max-w-6xl h-[85vh] bg-[#1c1c1e] border-2 border-[#8b4049]/50 rounded-lg flex shadow-[0_0_80px_rgba(139,64,73,0.25),0_0_40px_rgba(56,189,248,0.1)] relative overflow-hidden">

                        {/* Left Sidebar: Case Directory */}
                        <div className="w-64 bg-[#141416] border-r-2 border-[#8b4049]/30 flex flex-col hidden md:flex">
                            <div className="p-6 border-b border-[#8b4049]/30">
                                <h2 className="text-[#c9c9cd] font-mono font-bold tracking-[0.2em] flex items-center gap-2">
                                    <Database size={16} />
                                    案卷建档
                                </h2>
                                <p className="text-[#8b4049]/80 text-[10px] uppercase tracking-widest mt-1">Case Dossier & Evidence</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {Object.entries(groupedClues).map(([source, clues]) => (
                                    <div key={source}>
                                        <div className="text-[10px] text-[#8e8e93] uppercase tracking-[0.2em] font-bold mb-3 px-2">
                                            {source}
                                        </div>
                                        <div className="space-y-1">
                                            {(clues as Clue[]).map(clue => {
                                                const hasAttachment = clue.attachments && clue.attachments.length > 0;
                                                const isActive = selectedClue?.id === clue.id;
                                                const isNew = newlyAddedItems.has(clue.id);

                                                return (
                                                    <motion.button
                                                        key={clue.id}
                                                        onClick={() => setSelectedClue(clue)}
                                                        className={`
                                                            w-full text-left px-3 py-2 rounded text-xs font-mono transition-all flex items-center justify-between group
                                                            ${isNew
                                                                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.6)]'
                                                                : isActive
                                                                    ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                                                    : 'text-[#aeaeb2] hover:bg-[#8b4049]/15 hover:text-[#c9c9cd] hover:border-[#8b4049]/30 border border-transparent'
                                                            }
                                                        `}
                                                        animate={isNew ? {
                                                            boxShadow: [
                                                                '0 0 20px rgba(56, 189, 248, 0.6)',
                                                                '0 0 30px rgba(56, 189, 248, 0.9)',
                                                                '0 0 20px rgba(56, 189, 248, 0.6)'
                                                            ]
                                                        } : {}}
                                                        transition={isNew ? { duration: 1.5, repeat: Infinity } : {}}
                                                    >
                                                        <span className="truncate">{clue.word}</span>
                                                        {hasAttachment && (
                                                            <Paperclip size={10} className={`${isActive || isNew ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'}`} />
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-[#8b4049]/30 text-center text-[10px] text-[#8e8e93] uppercase tracking-widest">
                                TOTAL ITEMS: {collectedClues.length}
                            </div>
                        </div>

                        {/* Right Content: Folder View */}
                        <div className="flex-1 bg-[#1c1c1e] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] relative overflow-hidden flex flex-col">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 text-[#8e8e93] hover:text-[#c9c9cd] hover:bg-[#8b4049]/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Folder Content */}
                            {selectedClue ? (
                                <div className="flex-1 p-8 md:p-16 flex flex-col overflow-y-auto w-full max-w-4xl mx-auto custom-scrollbar">

                                    {/* Folder Tab/Label */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={selectedClue.id}
                                        className="w-full bg-[#E3DAC9] text-[#1a1515] rounded-sm p-1 shadow-2xl transform md:-rotate-1 relative mb-12"
                                    >
                                        {/* Folder Tab */}
                                        <div className="absolute -top-6 left-0 bg-[#E3DAC9] px-6 py-1 rounded-t-lg font-mono font-bold text-xs tracking-widest shadow-sm">
                                            EVIDENCE #{selectedClue.id.toUpperCase()}
                                        </div>

                                        {/* Paper Content */}
                                        <div className="bg-[#f0ece2] p-8 md:p-12 min-h-[50vh] relative shadow-inner bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]">

                                            {/* Stamp */}
                                            <div className="absolute top-8 right-8 text-red-900/20 border-4 border-red-900/20 p-2 font-black uppercase text-2xl tracking-[0.2em] transform rotate-12 pointer-events-none select-none">
                                                CONFIDENTIAL
                                            </div>

                                            {/* Header */}
                                            <div className="border-b-2 border-[#1a1515]/10 pb-6 mb-8">
                                                <h1 className="text-3xl md:text-4xl font-bold text-[#1a1515] font-serif tracking-tight mb-2">
                                                    {selectedClue.word}
                                                </h1>
                                                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#1a1515]/50">
                                                    <span className="flex items-center gap-1"><Tag size={12} /> Source: {selectedClue.source}</span>
                                                    <span>|</span>
                                                    <span>Ref: {Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                                                </div>
                                            </div>

                                            {/* Description - Typewriter style */}
                                            <div className="font-mono text-sm md:text-base leading-relaxed text-[#1a1515]/80 mb-12 max-w-2xl">
                                                {renderContent(selectedClue.description)}
                                            </div>

                                            {/* Attachments Section */}
                                            <div className="bg-[#1a1515]/5 rounded-lg p-6 border border-[#1a1515]/10">
                                                <div className="text-xs font-bold uppercase tracking-widest text-[#1a1515]/40 mb-4 flex items-center gap-2">
                                                    <Paperclip size={12} />
                                                    Attached Evidence
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {selectedClue.attachments?.map((attachment, idx) => {
                                                        // STRICT COLLECTION CHECK:
                                                        // Only show attachment if its specific ID is in collectedAttachments,
                                                        // OR if it's a legacy attachment without an ID (shouldn't happen with new definition)
                                                        const attachmentId = (attachment as any).id;
                                                        const isUnlocked = !attachmentId || collectedAttachments.includes(attachmentId);

                                                        if (!isUnlocked) return null;

                                                        return (
                                                            <motion.button
                                                                key={idx}
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => setViewingAttachment(attachment)}
                                                                className="group relative aspect-square bg-white shadow-sm p-2 flex flex-col items-center justify-center gap-2 border border-gray-200 hover:shadow-lg transition-all transform rotate-2 hover:rotate-0"
                                                            >
                                                                <div className="w-full h-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                                                                    {attachment.type === 'image' ? (
                                                                        <img src={attachment.content} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                    ) : (
                                                                        <FileText size={24} className="text-gray-400" />
                                                                    )}

                                                                    {/* Hover Overlay */}
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                                                        <Eye size={20} />
                                                                    </div>
                                                                </div>
                                                                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500 group-hover:text-black">
                                                                    Exhibit {String.fromCharCode(65 + idx)}
                                                                </span>
                                                            </motion.button>
                                                        );
                                                    })}
                                                    {(!selectedClue.attachments || selectedClue.attachments.length === 0 || (selectedClue.id === 'julip' && !collectedAttachments.includes('julip_symbol'))) && (
                                                        <div className="col-span-4 text-center py-8 text-xs text-gray-400 italic">
                                                            No physical evidence attached to this file.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>

                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-[#636366]">
                                    <Folder size={64} className="mb-4 opacity-50" />
                                    <p className="font-mono uppercase tracking-[0.2em] text-sm">Select a file to view details</p>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Full Screen Attachment Viewer */}
                    <AnimatePresence>
                        {viewingAttachment && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                                onClick={() => setViewingAttachment(null)}
                            >
                                {/* Special fullscreen UI for crime route map */}
                                {selectedClue?.id === 'crime_route_map' ? (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.95, opacity: 0 }}
                                        className="relative w-full h-full flex flex-col overflow-hidden"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-6 px-8 flex-shrink-0">
                                            <div>
                                                <h2 className="text-2xl font-bold text-[#d89853] tracking-[0.2em] mb-2">
                                                    犯罪路线分析
                                                </h2>
                                                <p className="text-sm text-[#94a3b8] font-mono">
                                                    CRIME ROUTE ANALYSIS - CLASSIFIED
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="p-3 text-[#94a3b8] hover:text-white transition-colors bg-[#1e293b]/50 rounded-lg hover:bg-[#1e293b]"
                                            >
                                                <X size={24} />
                                            </button>
                                        </div>

                                        {/* Scrollable Map Container */}
                                        <div className="flex-1 overflow-y-auto px-8 pb-8">
                                            <motion.div
                                                initial={{ y: 20 }}
                                                animate={{ y: 0 }}
                                                className="relative max-w-6xl mx-auto"
                                            >
                                                {/* Map Image */}
                                                <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] p-8 rounded-lg shadow-[0_0_100px_rgba(212,165,116,0.2)] border border-[#d89853]/20">
                                                    <img
                                                        src={viewingAttachment.content}
                                                        alt={viewingAttachment.title}
                                                        className="w-full h-auto rounded shadow-2xl"
                                                    />

                                                    {/* Decorative corners */}
                                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#d89853]/40"></div>
                                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d89853]/40"></div>


                                                    {/* Pinned Vehicle Photos - Top Right */}
                                                    {/* Maine Photo - Behind */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: 3 }}
                                                        transition={{ delay: 0.3 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-4 right-4 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="assets/car-maine-original.jpg"
                                                                alt="Maine Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                Maine: 412-88B<br />C.K. & R.C.
                                                            </div>
                                                        </div>
                                                    </motion.button>

                                                    {/* New Mexico Photo - Front, slightly overlapping */}
                                                    <motion.button
                                                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                                                        transition={{ delay: 0.5 }}
                                                        onClick={() => setShowVehiclePhotos(true)}
                                                        className="absolute top-12 right-16 w-32 md:w-40 group cursor-pointer hover:scale-105 hover:z-30 transition-all z-20"
                                                        style={{ transformOrigin: 'top center' }}
                                                    >
                                                        <div className="polaroid-photo">
                                                            <img
                                                                src="assets/car-newmexico-original.jpg"
                                                                alt="New Mexico Vehicle Evidence"
                                                            />
                                                            <div className="polaroid-caption">
                                                                NEW MEXICO: [SMUDGE] F★<br />OCT 26 '78
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                </div>

                                                {/* Description */}
                                                <div className="mt-6 bg-[#0f172a]/80 border border-[#334155] rounded-lg p-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-[#d89853]/10 rounded">
                                                            <Database size={20} className="text-[#d89853]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-[#e2e8f0] text-sm leading-relaxed font-light">
                                                                {selectedClue.description}
                                                            </p>
                                                            <div className="mt-4 flex gap-4 text-xs text-[#64748b]">
                                                                <span>案件编号: FBI-84-0132</span>
                                                                <span>•</span>
                                                                <span>日期: 1984.10.12</span>
                                                                <span>•</span>
                                                                <span>状态: 进行中</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Regular attachment viewer */
                                    viewingAttachment.type === 'image' && (
                                        <motion.div
                                            initial={{ scale: 0.9, rotate: -2 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0.9, rotate: 2 }}
                                            className="relative bg-white p-4 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-8 border-white max-h-[90vh] max-w-[90vw] cursor-auto"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <img
                                                src={viewingAttachment.content}
                                                alt={viewingAttachment.title}
                                                className="max-h-[85vh] object-contain"
                                            />
                                            <div className="absolute bottom-[-60px] left-0 w-full text-center text-white font-mono text-sm tracking-widest mt-4">
                                                <div className="mb-2">{viewingAttachment.title}</div>
                                                {/* Special caption for iron horse beacon */}
                                                {viewingAttachment.content === 'assets/iron_horse_beacon.jpg' && (
                                                    <div className="text-xs text-[#94a3b8]">
                                                        烟盒上写着：{renderContent('[小A.W.威尔莫](clue:aw_wilmo)')}
                                                    </div>
                                                )}
                                                {/* Special caption for iron horse louisville */}
                                                {viewingAttachment.content === 'assets/iron_horse_louisville.jpg' && (
                                                    <div className="text-xs text-[#94a3b8]">
                                                        地点标注：
                                                        <span
                                                            className={`
                                                                ml-1 cursor-pointer hover:text-white transition-colors border-b border-dashed border-[#94a3b8]/50 hover:border-white
                                                                ${collectedKeywords.includes('louisville') ? 'text-[#38bdf8] border-none cursor-default' : ''}
                                                            `}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (!collectedKeywords.includes('louisville') && onCollectClue) {
                                                                    onCollectClue('louisville', '路易斯维尔');

                                                                    // Also try to collect the attachment into graywater_beacon folder if function exists
                                                                    if (onCollectAttachment) {
                                                                        // We use a specific ID to link this image to the folder
                                                                        // Since graywater_beacon has no strict ID check anymore, this might just mean adding it to list for persistent tracking if needed
                                                                        onCollectAttachment('iron_horse_louisville');
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            路易斯维尔
                                                        </span>
                                                    </div>
                                                )}
                                                {/* General description for attachments with description field */}
                                                {viewingAttachment.description && (
                                                    <div className="text-xs text-[#94a3b8] mt-4 max-w-2xl mx-auto leading-relaxed">
                                                        {viewingAttachment.description}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => setViewingAttachment(null)}
                                                className="absolute -top-12 -right-12 p-2 text-white/50 hover:text-white transition-colors"
                                            >
                                                <X size={24} />
                                            </button>
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Jennifer Button */}
                    <motion.button
                        onClick={() => setShowJennifer(true)}
                        className={`fixed bottom-8 right-8 z-[105] p-4 rounded-full border-2 transition-all duration-300 ${detectedNodeId !== null
                            ? 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] border-[#fca5a5] text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] scale-110'
                            : hasVisitedBefore
                                ? 'bg-[#0f172a]/90 border-[#475569] text-[#94a3b8] hover:bg-[#1e293b] hover:border-[#38bdf8] hover:text-[#38bdf8]'
                                : 'bg-gradient-to-r from-[#0f172a] to-[#1e293b] border-[#38bdf8] text-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.4)]'
                            }`}
                        animate={
                            detectedNodeId !== null || !hasVisitedBefore
                                ? {
                                    scale: [1.1, 1.25, 1.1],
                                    boxShadow: detectedNodeId !== null
                                        ? ['0 0 40px rgba(220, 38, 38, 0.6)', '0 0 70px rgba(220, 38, 38, 1)', '0 0 40px rgba(220, 38, 38, 0.6)']
                                        : ['0 0 30px rgba(56, 189, 248, 0.4)', '0 0 50px rgba(56, 189, 248, 0.8)', '0 0 30px rgba(56, 189, 248, 0.4)']
                                }
                                : {}
                        }
                        transition={
                            detectedNodeId !== null || !hasVisitedBefore
                                ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                                : {}
                        }
                        whileHover={{ scale: detectedNodeId !== null ? 1.3 : 1.15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle size={24} />
                        {(detectedNodeId !== null || !hasVisitedBefore) && (
                            <motion.div
                                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${detectedNodeId !== null ? 'bg-red-500' : 'bg-[#38bdf8]'
                                    }`}
                                animate={{
                                    scale: [1, 2, 1],
                                    boxShadow: [
                                        "0 0 0 0 rgba(220,38,38, 0.4)",
                                        "0 0 0 10px rgba(220,38,38, 0)",
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            />
                        )}
                    </motion.button>

                    {/* Jennifer Dialogue Overlay */}
                    <AnimatePresence>
                        {showJennifer && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
                            >
                                <div className="w-full max-w-2xl bg-[#0f172a]/90 border border-[#334155] p-1 rounded-lg shadow-[0_0_50px_rgba(15,23,42,0.6)] backdrop-blur-xl relative overflow-hidden">
                                    {/* Operator Header */}
                                    <div className="bg-[#1e293b]/50 px-6 py-3 flex justify-between items-center border-b border-[#334155]">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 bg-[#475569]/30 rounded-full border border-[#475569]/50">
                                                <Mic size={14} className="text-[#94a3b8]" />
                                            </div>
                                            <span className="text-[#e2e8f0] font-mono tracking-widest text-xs font-bold uppercase">
                                                BAU OPERATOR: JENNIFER
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <span className="text-[#64748b] text-[10px] bg-[#1e293b] px-2 py-0.5 rounded font-mono tracking-wider">
                                                    LIVE FEED
                                                </span>
                                            </div>
                                            <button
                                                onClick={handleJenniferClose}
                                                className="p-1.5 text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#334155]/50 rounded-full transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Waveform Visualizer */}
                                    <div className="h-16 w-full bg-[#020617] relative flex items-center justify-center gap-1 overflow-hidden opacity-80">
                                        {[...Array(40)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-[#38bdf8]/40 rounded-full"
                                                animate={{
                                                    height: [4, 12 + Math.random() * 20, 4],
                                                    opacity: [0.3, 1, 0.3]
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    delay: i * 0.02,
                                                    ease: "circInOut"
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Dialogue Content with Avatar */}
                                    <div className="p-8 min-h-[200px] flex items-center gap-6 relative">
                                        {/* Jennifer Silhouette Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-[#1e293b] border-2 border-[#38bdf8]/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                                {/* Simple silhouette - head and shoulders */}
                                                <div className="absolute bottom-0 w-full h-full flex flex-col items-center justify-end">
                                                    {/* Head */}
                                                    <div className="w-10 h-10 rounded-full bg-[#38bdf8]/60 mb-1" />
                                                    {/* Shoulders */}
                                                    <div className="w-20 h-8 rounded-t-full bg-[#38bdf8]/60" />
                                                </div>
                                                {/* Glow effect */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#38bdf8]/10" />
                                            </div>
                                        </div>

                                        {/* Dialogue Text */}
                                        <div className="flex-1">
                                            {showHistory ? (
                                                <div className="h-[300px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                                    <div className="text-xs font-mono text-[#94a3b8] mb-4 uppercase tracking-widest border-b border-[#334155] pb-2">
                                                        Dialogue History Log
                                                    </div>
                                                    {/* Intro */}
                                                    <div className="space-y-1">
                                                        <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Initial Contact</div>
                                                        <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_DIALOGUE); setShowHistory(false); }}>
                                                            Replay Sequence: "Connecting to Neural Link..."
                                                        </p>
                                                    </div>
                                                    {/* Node 1 */}
                                                    {(unlockedNodeIds.includes('confession_1') && unlockedNodeIds.includes('confession_2') && unlockedNodeIds.includes('confession_3')) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 1: The Ritual</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_1_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "You found the pattern..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 2 */}
                                                    {(unlockedNodeIds.includes('confession_7')) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 2: Graywater Beacon</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_2_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Thorne's signature found..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 3 */}
                                                    {(currentStoryNode >= 3) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 3: The Violation</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_3_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "You've crossed the line..."
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Node 4 */}
                                                    {(currentStoryNode >= 4) && (
                                                        <div className="space-y-1 pt-2 border-t border-[#334155]/30">
                                                            <div className="text-[10px] text-[#38bdf8] uppercase tracking-wider font-bold">Checkpoint 4: Coordinate Unlock</div>
                                                            <p className="text-[#94a3b8] text-xs hover:text-[#e2e8f0] cursor-pointer" onClick={() => { setShowJennifer(true); setJenniferStep(0); setSimulatedDialogue(JENNIFER_NODE_4_DIALOGUE); setShowHistory(false); }}>
                                                                Replay Sequence: "Low efficiency detected..."
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-[#e2e8f0] text-lg font-light tracking-wide leading-relaxed font-sans whitespace-pre-line">
                                                    {(() => {
                                                        const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
                                                        return renderContent(dialog[jenniferStep]);
                                                    })()}
                                                </p>
                                            )}
                                        </div>

                                        <div className="absolute top-2 right-2 text-[#334155]/20 pointer-events-none">
                                            <Activity size={120} />
                                        </div>
                                    </div>

                                    <div className="bg-[#1e293b]/30 p-4 flex justify-between items-center border-t border-[#334155]">
                                        {/* History Toggle */}
                                        <button
                                            onClick={() => setShowHistory(!showHistory)}
                                            className="text-[#94a3b8] hover:text-[#38bdf8] text-xs font-mono tracking-widest px-4 py-2 hover:bg-[#334155]/50 rounded transition-colors"
                                        >
                                            {showHistory ? "BACK TO LIVE FEED" : "REVIEW LOGS"}
                                        </button>

                                        {(() => {
                                            if (showHistory) return null;
                                            const dialog = getJenniferDialogue(simulatedDialogue, detectedNodeId, hasVisitedBefore);
                                            return jenniferStep < dialog.length - 1 ? (
                                                <button
                                                    onClick={handleJenniferNext}
                                                    className="group flex items-center gap-3 px-8 py-3 bg-[#334155]/50 hover:bg-[#475569]/50 border border-[#475569] text-[#e2e8f0] rounded-lg transition-all font-mono text-sm tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.1)] outline-none"
                                                >
                                                    继续 // NEXT
                                                    <ChevronRight size={16} className="text-[#94a3b8] group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            ) : (
                                                <motion.button
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleJenniferComplete}
                                                    className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] hover:from-[#1e293b] hover:via-[#334155] hover:to-[#1e293b] border border-[#38bdf8]/50 text-[#38bdf8] rounded-lg transition-all font-mono text-base tracking-widest backdrop-blur-md shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                                                >
                                                    <Brain size={20} className="animate-pulse" />
                                                    继续工作 // DISCONNECT
                                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </motion.button>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Vehicle Photos Fullscreen Viewer */}
                    <VehiclePhotosViewer
                        isOpen={showVehiclePhotos}
                        onClose={() => setShowVehiclePhotos(false)}
                    />

                    {/* Filing Evidence Modal */}
                    <AnimatePresence>
                        {filingEvidence && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="w-full max-w-lg bg-[#1a1515] border border-[#d89853]/30 p-8 rounded shadow-[0_0_50px_rgba(216,152,83,0.1)] relative"
                                >
                                    <h2 className="text-[#d89853] font-mono font-bold tracking-[0.2em] text-xl mb-2 text-center">
                                        EVIDENCE FILING
                                    </h2>
                                    <p className="text-[#94a3b8] text-xs font-mono text-center mb-8 uppercase tracking-widest">
                                        Select destination folder for archival
                                    </p>

                                    {/* Evidence Preview */}
                                    <div className="flex items-center gap-4 mb-8 bg-[#1e293b]/50 p-4 rounded border border-[#334155]">
                                        <div className="w-16 h-16 bg-black border border-[#334155] p-1">
                                            {filingEvidence.type === 'image' ? (
                                                <img src={filingEvidence.content} className="w-full h-full object-cover opacity-80" />
                                            ) : (
                                                <FileText className="w-full h-full text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-[#e2e8f0] font-bold text-sm">{filingEvidence.title}</div>
                                            <div className="text-[#94a3b8] text-xs font-mono">Unclassified Item</div>
                                        </div>
                                    </div>

                                    {/* Folder Targets */}
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { id: 'project', label: '青豆牡蛎汤计划', valid: false },
                                            { id: 'julip', label: '朱利普 (JULIP)', valid: false },
                                            { id: 'graywater_beacon', label: '灰水信标 (GRAYWATER)', valid: true }
                                        ].map(folder => (
                                            <button
                                                key={folder.id}
                                                onClick={() => {
                                                    if (folder.valid) {
                                                        // Success Logic
                                                        if (onCollectAttachment) {
                                                            onCollectAttachment(filingEvidence.id);
                                                        }

                                                        // Open the proper folder
                                                        const targetFolder = CLUE_DEFINITIONS[folder.id];
                                                        if (targetFolder) {
                                                            setSelectedClue(targetFolder);
                                                        }

                                                        // Close filing and Jennifer
                                                        setFilingEvidence(null);
                                                        setShowJennifer(false);

                                                        // Feedback could be added here, but opening folder is strong feedback
                                                    } else {
                                                        // Error/Shake animation could go here
                                                        // For now just do nothing or small shake
                                                    }
                                                }}
                                                className={`
                                                    p-4 border border-[#334155] rounded flex items-center justify-between group transition-all
                                                    hover:border-[#d89853]/50 hover:bg-[#d89853]/5
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Folder className="text-[#64748b] group-hover:text-[#d89853]" size={18} />
                                                    <span className="text-[#94a3b8] font-mono tracking-widest text-sm group-hover:text-[#e2e8f0]">
                                                        {folder.label}
                                                    </span>
                                                </div>
                                                <ChevronRight className="text-[#334155] group-hover:text-[#d89853]" size={16} />
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setFilingEvidence(null)}
                                        className="mt-8 mx-auto block text-[#64748b] hover:text-[#94a3b8] text-xs font-mono tracking-widest"
                                    >
                                        CANCEL OPERATION
                                    </button>

                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
