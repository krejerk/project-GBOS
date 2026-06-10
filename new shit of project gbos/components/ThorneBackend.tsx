import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

const PremiumBulb = ({ isOn, className = "" }: { isOn: boolean, className?: string }) => {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible">
                <defs>
                    <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <radialGradient id="filament-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="100%" stopColor="#fde047" />
                    </radialGradient>
                </defs>
                <path
                    d="M50 140 C70 140 85 125 85 100 C85 75 65 60 65 40 L35 40 C35 60 15 75 15 100 C15 125 30 140 50 140Z"
                    fill={isOn ? 'rgba(253, 224, 71, 0.2)' : 'rgba(20, 20, 20, 0.8)'}
                    stroke={isOn ? '#fde047' : '#333'}
                    strokeWidth="1.5"
                    className="transition-colors duration-500"
                />
                <rect x="35" y="32" width="30" height="8" rx="1" fill="#444" stroke="#222" />
                <rect x="35" y="22" width="30" height="8" rx="1" fill="#333" stroke="#111" />
                <rect x="35" y="14" width="30" height="6" rx="1" fill="#222" stroke="#000" />
                <path d="M40 14 L60 14 L50 5 Z" fill="#111" />
                <AnimatePresence>
                    {isOn && (
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.4, 1, 0.2, 1, 0.7, 1] }}
                            transition={{ duration: 0.7, times: [0, 0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 1], ease: "easeOut" }}
                        >
                            <motion.g
                                animate={{ opacity: [1, 0.8, 1, 0.95, 0.85, 1], filter: ["blur(12px) brightness(1)", "blur(14px) brightness(0.8)", "blur(11px) brightness(1.1)", "blur(13px) brightness(0.9)", "blur(15px) brightness(0.7)", "blur(12px) brightness(1)"] }}
                                transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror", repeatDelay: Math.random() * 3 + 1 }}
                            >
                                <path d="M42 40 L45 70 L50 60 L55 70 L58 40" fill="none" stroke="url(#filament-grad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#bulb-glow)" />
                                <circle cx="50" cy="65" r="15" fill="rgba(253, 224, 71, 0.4)" filter="blur(12px)" />
                            </motion.g>
                        </motion.g>
                    )}
                </AnimatePresence>
                <path d="M30 30 C25 40 25 50 30 60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <AnimatePresence>
                {isOn && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0.3, 1, 0.6, 1, 0.9, 1, 0.95, 1], scale: [0.8, 1, 0.98, 1.02, 0.99, 1, 1.01, 1, 1.005, 1] }}
                        transition={{ duration: 12, times: [0, 0.05, 0.1, 0.15, 0.2, 0.3, 0.5, 0.7, 0.9, 1], ease: "easeInOut", repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] bg-yellow-400/20 blur-[100px] rounded-full pointer-events-none -z-10" 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const LOG_DATA = {
    DEAD_DROP: [
        { id: "01", type: "DEAD_DROP", sender: "M. Thorne", receiver: "Dr. Reggie", date: "3月12日", content: "BAU那帮蠢货到底还是听信阿德尔曼的话，把预算给掐了，咱们所幸自己干吧。我在主干网上开了个后门，代码是 MT-X7-OVRD-93。以后KLUB的数据全走这条线，不给局里留底。博士，想证明统一场论，我们现在只能靠RC了。" },
        { id: "02", type: "EXP_LOGS", title: "实验观测日志", sender: "M. Thorne", receiver: "Dr. Reggie", date: "11月05日", content: "卡彭传回来的数据简直好得不真实。他带回来的那些碎片，非线性的关系网，见鬼的仪式……跟您论文里写的严丝合缝。\n\n统一场论是对的。" },
        { id: "03", type: "DEAD_DROP", sender: "Dr. Reggie", receiver: "M. Thorne", date: "6月18日", content: "不对劲。\n我重新看了一遍这几年的双向传输日志，出大问题了。家族的每一步动作，甚至清理门户的手法，都跟“统一场论”一模一样，连个误差都找不出来。这不可能，没人能做到这种程度的拟合。只有一个解释，灰水信标是双向的，罗伯特盯着他的时候，那老鬼也在盯着他，还顺便把我的理论扒了个精光！没人生来就是这副样子的，天哪，是我们在教他怎么当一个完美的怪物，是我们把图纸递给了他！" },
        { id: "04", type: "EXP_LOGS", title: "补充研究笔记", sender: "Dr. Reggie", date: "12月14日", content: "我重新听了卡彭关于多米尼昂路的那段供述录音。他咬定根本没有什么“青豆牡蛎汤计划”，没有远亲，连家族都不存在。他说这一切只是一场噩梦。\n如果他说的是实话呢？\n如果根本没有什么犯罪帝国，一切只是这台机器在自我反馈？我们通过信标把一个虚构的设定投射给卡彭，再把他的幻觉收集回来，当成证明我“统一场论”的铁证。马库斯，如果连观测目标都是我们生造出来的，那这二十年我们到底在干什么？我们是不是在对着一面镜子，疯狂地解剖我们自己产生的幻觉？如果连卡彭这个“观察者”和那个老鬼“被观察者”都是假的，那这个实验室，这台机器，还有一直坐在这里记录数据的我……到底算是什么东西？" },
        { id: "05", type: "EXP_LOGS", title: "实验观测日志", status: "[认知污染警报]", sender: "Dr. Reggie", date: "UNKNOWN", content: "系统全乱套了。\n我去查了“黄油朱莉普”到底是个什么鬼东西。那根本不是什么邪教符号，那就是70年代一个破乐队在台上瞎喊的歌词！可是你看看档案库！卡彭明明是遇到马尔多纳多之后才听说这个词的，但现在，这个词像长了腿一样，钻进了他十年前的供述里，甚至钻进了1967年的简报里！它在篡改卡彭的记忆，每更新一轮供述，这个词都会越发扩散，它把我们的数据库全感染了。你明白吗？连我们自己的记忆都他妈的被它骗了，一度把它当成了理论的核心证据！\n\n还有更荒唐的，这一轮潜意识接入，卡彭的脑子彻底串线了。他竟然凭空长出了一段关于詹妮弗的记忆！他现在坚信，詹妮弗是那个老鬼安插在FBI内部的活人卧底。这绝对是之前那几个白痴操作员违规泄密，在提审时让他听到了这个名字。詹妮弗明明只是个跑在服务器里的审讯AI，可卡彭那快烧干的脑子为了让逻辑自洽，硬生生把一个程序捏造成了一个活生生的内鬼特务。\n\n马库斯，数据库早就被污染了，停手吧。" },
        { id: "06", type: "DEAD_DROP", sender: "M. Thorne", receiver: "Dr. Reggie", date: "4月20日", content: "博士，你需要冷静下来。\n现在扯是谁干的还有什么用？就算那老鬼是你亲手捏出来的，我们也得动手把他弄死。别管什么双向感染了。卡彭的脑子撑不了多久了，詹妮弗正在逼他吐出最后的东西。搞砸了咱们就去收拾烂摊子，任何人都别在这时候装软蛋。还有，你刚才在那儿声嘶力竭地抱怨，说卡彭脑子烧坏了，竟然把詹妮弗这个AI当成了活人。你不觉得这太可笑了吗？还真入戏了啊。真正的雷吉博士早就死透了，你不过是我用他生前的遗稿、录音和心理侧写数据，强行喂出来的一个人格拟态算法。卡彭把詹妮弗当活人，是因为他是个被逼疯的蠢货，你一口一个“我们”，还真把自己当成有良知的活人了？摆正你的位置，就别在这操心现实世界的烂摊子了。切断你的恐慌模拟模块，老老实实看着，别再给我捣乱。\n计划继续。" },
    ],
    EXP_LOGS: {
        topology: (
            <>
                系统生成：实验体认知状态拓扑图<br/>
                机体位置：<span className="text-yellow-500 font-bold bg-yellow-500/10 px-1 border border-yellow-500/30">38.54112, -77.43558</span> 当前迭代批次：114<br/>
                警告：实验体神经负荷已达百分之九十四，底层逻辑随时可能熔断。<br/>
                <br/>
                {`================================================================================
                                初始记忆锚点：1985年冬
                                          |
            +-----------------------------+-----------------------------+
            |                                                           |
      变量节点：瓦妮莎定位                                      变量节点：权力核心架构
            |                                                           |
    +-------+-------+                                   +-------+-------+-------+
    |               |                                   |               |       |
 受害剧本      主谋反转剧本                         空壳傀儡模型   母亲图腾模型   战俘营模型
 BATCH 042     BATCH 091                            BATCH 095      BATCH 102      BATCH 088
 同化崩溃      逻辑死锁                             陷入静默       重心偏离       完美底座
                                                                                  |
                                                                    +-------------+-------------+
                                                                    |                           |
                                                            变量节点：暴力执行层          变量节点：权力争夺层
                                                                    |                           |
                                                               次子暴走模型                长子夺权模型
                                                               BATCH 105                   BATCH 107
                                                               恐惧压倒理智                沉迷权术挑拨
                                                                    |                           |
                                                                    +-------------+-------------+
                                                                                  |
                                                                        变量节点：系统终局
                                                                                  |
                                                                    +-------------+-------------+
                                                                    |                           |
                                                               未知认知污染               操作员结盟诱导
                                                               BATCH 112                  BATCH 109
                                                               底层全面崩坏               协同处决协议
================================================================================`}
            </>
        ),
        textLogs: [
            {
                batch: "042",
                model: "受害剧本",
                operatorId: "012",
                input: "强化父亲的保护欲，设定瓦妮莎为纯粹受害者。",
                result: "卡彭被彻底同化，认定家族为新秩序，深信目标清理瓦妮莎是出于保护目的。实验体企图逆用灰水信标向局内发送伪造情报。",
                thorneLog: "彻底失败。脑子被洗得太干净，一问坐标就触发心理防御机制差点导致脑死亡。"
            },
            {
                batch: "088",
                model: "战俘营模型",
                operatorId: "051",
                input: "深挖目标战俘营审讯官背景，设定其精通军用级别精神控制。",
                result: "卡彭将过往折磨全部归咎于系统性洗脑，复仇欲达到峰值。",
                thorneLog: "最完美的底座。这刚好能掩盖灰水信标对他脑部造成的物理损伤，他会以为那是老鬼的洗脑后遗症。后续所有批次都要建立在这个模型之上。"
            },
            {
                batch: "091",
                model: "主谋反转剧本",
                operatorId: "055",
                input: "设定瓦妮莎为家族的真正幕后控制者。",
                result: "逻辑死锁。实验体无法接受保护对象为罪恶源头，生命体征十秒内跌停。",
                thorneLog: "这个操作员差点把实验体给玩死了，瓦妮莎的弱者身份是维持卡彭理智的唯一承重墙，绝对不能动。"
            },
            {
                batch: "095",
                model: "空壳傀儡模型",
                operatorId: "059",
                input: "剥夺目标高智商属性，将其降级为患有脑部疾病的普通老人。",
                result: "实验体陷入严重抑郁。发现对手为一具空壳后，其潜伏生涯失去意义，拒绝提供任何情报并陷入静默。",
                thorneLog: "需要我强调几遍？不要用任何戏剧性反转来制造节目效果。废案。"
            },
            {
                batch: "102",
                model: "母亲图腾模型",
                operatorId: "061",
                input: "设定目标被架空，神秘的母亲才是维系家族向心力的核心图腾。",
                result: "卡彭将调查重心完全转移，于记忆深处强行搜寻关于某种仪式的关联线索。",
                thorneLog: "偏题了。我们需要的是物理坐标，不是让他去写宗教学论文。砍掉这条线。"
            },
            {
                batch: "105",
                model: "次子暴走模型",
                operatorId: "068",
                input: "无限制放大塞勒斯的纯粹物理破坏力。",
                result: "面对绝对的物理碾压，实验体求生本能压倒理智，潜意识仅保留逃亡逻辑。",
                thorneLog: "恐惧确实能逼人开口，但这种野兽级别的暴力只会让他吓得想不起来任何有效信息。"
            },
            {
                batch: "107",
                model: "长子夺权模型",
                operatorId: "072",
                input: "放任康查尔的阴毒属性，诱导卡彭利用家族内斗。",
                result: "实验体侦查本能被激活，继承康查尔遗志，冷静挑拨家族高层互相残杀。",
                thorneLog: "他太沉迷于玩弄权术了，觉得自己能掌控局面就不急着交底。不能让他觉得游刃有余，他必须被逼到绝境。"
            },
            {
                batch: "109",
                model: "操作员结盟诱导",
                operatorId: "098",
                input: "建立专员与实验体的战友关系，共享覆写代码。",
                result: "卡彭提供覆写代码及最终物理坐标，准备执行协同处决。",
                thorneLog: "非常接近。但他最后给的坐标是假的，这老狗潜意识里还在试探。下一任操作员得下手再狠一点。"
            },
            {
                batch: "112",
                model: "未知认知污染",
                operatorId: "NULL",
                input: "无。底层逻辑崩溃引发的自发性灾难。",
                result: "潜意识内所有目标失去语言功能，全域刻画迷幻摇滚相关符号。实验体认知被彻底碾碎，以指甲在墙壁刻写十六进制代码。",
                thorneLog: "灾难。詹妮弗的防火墙被击穿了，系统逆向感染了实验体。重启整个沙盘，想办法把那个该死的黄油朱莉普彻底隔离掉。"
            }
        ]
    },
    AUDIT_PURGE: {
        header: {
            id: "#BUG-RECOVERY-109",
            operator: "M. Thorne",
            status: "循环修正中"
        },
        anomalies: [
            {
                id: "01",
                title: "起始简报中的“托梦”叙事",
                current: "操作员接入前期，为其描述案情的内容，被塑造为一个带有些许超自然色彩的“托梦”故事。",
                override: "彻底删除。 这种神棍风格的开头简直莫名调。",
                audit: "这是詹妮弗（AI）又一次逻辑过载的产物。她最近反复代入雷吉那老鬼的遗稿，大概是把自己也当成了那个多愁善感的死人，才编出这种感性的垃圾报告。下一轮提审前，必须清理掉这些情绪化的干扰项，我们不是在做午夜怪谈节目！"
            },
            {
                id: "02",
                title: "关于“青豆牡蛎汤”的逻辑矛盾",
                current: "实验体（卡彭）推导出“青豆牡蛎汤计划”是一个跨度十年、旨在反向渗透FBI的宏大战略阴谋。",
                override: "标记为“逻辑溢出/认知偏误”。",
                audit: "这简直是自相矛盾。卡彭在供述里刚说完那个家族的所有行动都是即兴的、缺乏计划的散沙，紧接着又把那个老鬼吹成了一个能精算十年的阴谋天才？ 这太不符合他们的“行事习惯”了。真相很明显：卡彭在为了让他那点可怜的尊严自洽，而强行美化对手。他受雷吉那套“统一场论”辐射太深了，脑子里已经自动给那些混乱的暴力行为套上了“秩序”的滤镜。"
            },
            {
                id: "03",
                title: "操作员违规干预导致的认知偏移",
                current: "卡彭对“詹妮弗”产生了具体的人格识别，并将其定义为家族内鬼。",
                override: "无法强制删除，仅能进行降噪处理。",
                audit: "该死的，以前那几个操作员管不住嘴，酿下大错，到现在都无可挽回。他们在提审时泄露了AI的名字，导致卡彭的潜意识强行把这个虚构角色“肉身化”了。 现在的卡彭不仅在跟死人对话，还在跟一个压根不存在的实体特务斗智斗勇。每一轮新的操作员都在往这堆火里添柴。詹妮弗已经快被这些垃圾数据撑爆了，如果她也开始相信自己是个卧底，那这个系统就真的没救了。"
            }
        ]
    },
    OVRD_EXEC: []
};

const LogViewer = ({ logs, onBack }: { logs: any[], onBack: () => void }) => {
    return (
        <div className="flex flex-col h-full space-y-6 overflow-y-auto custom-scrollbar pr-4 pb-12">
            <div className="flex items-center justify-between border-b border-slate-500/20 pb-4 mb-4 sticky top-0 bg-[#010101] z-10">
                <div className="text-slate-400 font-bold tracking-[0.2em]">
                    READING_ENCRYPTED_LOGS... // 正在读取加密日志
                </div>
                <button onClick={onBack} className="text-slate-500 hover:text-white border border-slate-500/20 hover:border-slate-500 px-4 py-1 bg-slate-500/5 transition-all font-mono text-xs tracking-widest">
                    [RETURN_TO_ROOT] // 返回主目录
                </button>
            </div>
            
            {logs.map((log, index) => (
                <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(148, 163, 184, 0.08)' }}
                    transition={{ delay: index * 0.1, duration: 0.2 }}
                    className={`p-5 border transition-colors duration-200 ${log.status === '[认知污染警报]' ? 'border-red-500/30 bg-red-950/5' : 'border-slate-500/10 bg-slate-500/5'} font-mono text-sm relative group overflow-hidden cursor-default`}
                >
                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-white/20 text-[10px] tracking-widest uppercase">ARCHIVE #{log.id}</span>
                            {log.title && <span className="text-slate-300 group-hover:text-slate-100 transition-colors font-bold tracking-wider">{log.title}</span>}
                            {log.status && <span className="text-red-500 font-bold ml-4 text-xs px-2 py-0.5 border border-red-500/20">{log.status}</span>}
                        </div>
                        <div className="text-right text-[10px] text-slate-500 tracking-widest">
                            {log.date && <div>TIMESTAMP: {log.date}</div>}
                        </div>
                    </div>
                    
                    <div className="mb-4 text-[10px] text-slate-400/80 grid grid-cols-2 gap-6 bg-black/40 p-3 border border-white/5 tracking-widest">
                        {log.sender && <div><span className="opacity-40">SENDER: </span>{log.sender}</div>}
                        {log.receiver && <div><span className="opacity-40">RECIPIENT: </span>{log.receiver}</div>}
                    </div>

                    <div className={`whitespace-pre-wrap leading-relaxed text-base tracking-wide transition-colors duration-200 ${log.status === '[认知污染警报]' ? 'text-red-100/70' : 'text-slate-300 group-hover:text-slate-100'}`}>
                        {log.content}
                    </div>
                </motion.div>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-500/20 text-center flex flex-col items-center gap-2">
                <div className="text-green-500/30 text-xs font-mono tracking-widest">
                    --- DISPLAYING_EXCERPT_ONLY ---
                </div>
                <div className="text-slate-500/40 text-[10px] animate-pulse font-mono tracking-[0.2em]">
                    [ 142 FILES STILL ENCRYPTED... PLEASE UPGRADE CLEARANCE ]
                </div>
            </div>
        </div>
    );
}

const AuditViewer = ({ data, onBack }: { data: any, onBack: () => void }) => {
    return (
        <div className="flex flex-col h-full space-y-6 overflow-y-auto custom-scrollbar pr-4 pb-12">
            <div className="flex items-center justify-between border-b border-slate-500/20 pb-4 mb-4 sticky top-0 bg-[#010101] z-10">
                <div className="text-slate-400 font-bold tracking-[0.2em] flex items-center gap-3">
                    <span className="w-2 h-2 bg-slate-500 animate-pulse rounded-full opacity-50"></span>
                    AUDIT_PURGE_PROTOCOL_ACTIVE // 审计覆写协议已激活
                </div>
                <button onClick={onBack} className="text-slate-500 hover:text-white border border-slate-500/20 hover:border-slate-500 px-4 py-1 bg-slate-500/5 transition-all font-mono text-xs tracking-widest">
                    [RETURN_TO_ROOT] // 返回主目录
                </button>
            </div>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/40 border border-slate-500/10 p-5 font-mono text-sm relative"
            >
                <div className="absolute top-0 right-0 p-2 text-[8px] text-slate-500/20 uppercase tracking-[0.4em]">system_override_v4</div>
                <div className="text-slate-500 mb-2 tracking-widest text-xs uppercase">覆写日志 ID: <span className="text-slate-300 font-bold">{data.header.id}</span></div>
                <div className="text-slate-500 mb-2 tracking-widest text-xs uppercase">操作员: <span className="text-white/60">{data.header.operator}</span></div>
                <div className="text-slate-500 tracking-widest text-xs uppercase">状态: <span className="text-red-500/80 font-bold">{data.header.status}</span></div>
            </motion.div>

            {data.anomalies.map((anomaly: any, index: number) => (
                <motion.div 
                    key={anomaly.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="border-l-2 border-yellow-500/50 pl-4 py-2 font-mono"
                >
                    <div className="text-yellow-400 font-bold mb-3 bg-yellow-900/20 inline-block px-2 py-1">
                        异常项 {anomaly.id}: {anomaly.title}
                    </div>
                    
                    <div className="mb-4 bg-black/40 p-3 border border-white/5">
                        <div className="text-white/40 text-xs mb-1">[当前载入内容]</div>
                        <div className="text-white/80 line-through decoration-red-500/50 decoration-2">{anomaly.current}</div>
                    </div>

                    <div className="mb-4 bg-red-900/10 p-3 border border-red-500/20">
                        <div className="text-red-400/60 text-xs mb-1">[索恩的覆写记录]</div>
                        <div className="text-red-400 font-bold">{anomaly.override}</div>
                    </div>

                    <div className="bg-yellow-900/10 p-3 border border-yellow-500/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50"></div>
                        <div className="text-yellow-500/60 text-xs mb-1 ml-2">[审计批注]</div>
                        <div className="text-yellow-100/90 ml-2 italic">{anomaly.audit}</div>
                    </div>
                </motion.div>
            ))}
            <div className="mt-8 pt-8 border-t border-yellow-500/20 text-center flex flex-col items-center gap-2">
                <div className="text-yellow-500/30 text-xs font-mono tracking-widest">
                    --- DISPLAYING_EXCERPT_ONLY ---
                </div>
                <div className="text-yellow-500/40 text-[10px] animate-pulse font-mono tracking-[0.2em]">
                    [ 89 AUDIT LOGS PENDING DECRYPTION... ]
                </div>
            </div>
        </div>
    );
}

const ExpLogsViewer = ({ data, onBack }: { data: any, onBack: () => void }) => {
    return (
        <div className="flex flex-col h-full space-y-6 overflow-y-auto custom-scrollbar pr-4 pb-12">
            <div className="flex items-center justify-between border-b border-slate-500/20 pb-4 mb-4 sticky top-0 bg-[#010101] z-10">
                <div className="text-slate-400 font-bold tracking-[0.2em] flex items-center gap-3">
                    <span className="w-2 h-2 bg-slate-500 animate-pulse rounded-full opacity-50"></span>
                    EXP_LOGS_PROTOCOL_ACTIVE // 实验日志协议已激活
                </div>
                <button onClick={onBack} className="text-slate-500 hover:text-white border border-slate-500/20 hover:border-slate-500 px-4 py-1 bg-slate-500/5 transition-all font-mono text-xs tracking-widest">
                    [RETURN_TO_ROOT] // 返回主目录
                </button>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 border border-slate-500/10 p-5 w-full overflow-x-auto custom-scrollbar"
            >
                <pre className="text-[10px] md:text-xs leading-[1.3] text-slate-400 font-mono tracking-tighter">
                    {data.topology}
                </pre>
            </motion.div>

            {data.textLogs && data.textLogs.map((log: any, index: number) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(148, 163, 184, 0.05)' }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
                    className="p-5 border border-slate-500/10 bg-black/40 font-mono text-sm relative overflow-hidden group transition-colors duration-200 cursor-default"
                >
                    <div className="flex flex-wrap gap-4 mb-4 border-b border-white/5 pb-3">
                        <div className="text-slate-400 font-bold underline decoration-slate-500/30">BATCH: {log.batch}</div>
                        <div className="text-slate-500 text-xs">MODEL: {log.model}</div>
                        <div className="text-slate-600 text-[10px] ml-auto tracking-widest uppercase">OP_ID: {log.operatorId}</div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="text-slate-300 leading-relaxed group-hover:text-slate-100 transition-colors">
                            <span className="text-slate-500/40 mr-3 font-bold tracking-widest text-[10px] uppercase">[VAR_INPUT]</span>
                            {log.input}
                        </div>
                        <div className="text-slate-300 leading-relaxed group-hover:text-slate-100 transition-colors">
                            <span className="text-slate-500/40 mr-3 font-bold tracking-widest text-[10px] uppercase">[RESULT]</span>
                            <span className={log.batch === '112' ? 'text-red-500 font-bold' : 'text-slate-200'}>{log.result}</span>
                        </div>
                        <div className="bg-slate-900/40 p-4 border-l border-slate-500/30 relative overflow-hidden group-hover:border-slate-400 transition-colors">
                            <span className="text-slate-500 font-bold tracking-[0.2em] text-[10px] block mb-2 opacity-60 uppercase">THORNE_LOG // 索恩日志:</span>
                            <div className="text-slate-400 italic leading-relaxed text-base tracking-wide group-hover:text-slate-300">
                                {log.thorneLog}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
            
            <div className="mt-8 pt-8 border-t border-cyan-500/20 text-center flex flex-col items-center gap-2">
                <div className="text-cyan-500/30 text-xs font-mono tracking-widest">
                    --- DISPLAYING_EXCERPT_ONLY ---
                </div>
                <div className="text-cyan-500/40 text-[10px] animate-pulse font-mono tracking-[0.2em]">
                    [ 256 BATCH RECORDS LOCKED BY ADMIN... ]
                </div>
            </div>
        </div>
    );
}



const OvrdExecViewer = ({ onBack, onTerminateExperiment }: { onBack: () => void, onTerminateExperiment?: (type: 'ending2' | 'ending3') => void }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [finalAction, setFinalAction] = useState<string | null>(null);

    const handleSearch = () => {
        setIsProcessing(true);
        setOutput(null);
        setFinalAction(null);
        
        setTimeout(() => {
            const trimmedInput = input.replace(/\s/g, '');
            if (trimmedInput === '31.66222,-106.35222') {
                setOutput({
                    coords: '31.66222, -106.35222',
                    designation: 'NODE-00',
                    location: 'Rancho Anapra, Ciudad Juarez, MX',
                    address: 'Lot 404, Camino Real a Anapra',
                    facility: 'Abandoned agave plant / Sub-level 3 medical bunker (废弃龙舌兰工厂 / 地下三层医疗掩体)',
                    status: 'Advanced organ failure. Deep coma. (器官功能高度衰竭，重度昏迷)'
                });
            } else if (trimmedInput === '38.54112,-77.43558') {
                setOutput({
                    coords: '38.54112, -77.43558',
                    designation: 'ROBERT CAPONE GREYWATER PROBE',
                    location: 'FBI Academy Reservation, Quantico, VA, USA',
                    address: 'Sector 7-C, Old Waterworks Access',
                    facility: 'Decommissioned acoustic bunker / Sensory deprivation tank (退役声学掩体 / 感官剥夺水箱)',
                    status: 'Severe muscular atrophy. Cranial neural-interface active. Consciousness locked in perpetual simulation loop. (严重肌肉萎缩。颅内神经接口激活。意识锁定在永久模拟循环中。)'
                });
            } else {
                setOutput('ERROR: INVALID_COORDINATES_OR_NO_ASSET_FOUND');
            }
            setIsProcessing(false);
        }, 1500);
    };

    const handleOverride = (confirm: boolean) => {
        if (confirm) {
            setFinalAction('EXECUTING_REMOTE_SHUTDOWN... CONNECTION_LOST');
            // If the output is Robert Capone, trigger the termination
            if (output && typeof output === 'object') {
                if (output.designation.includes('NODE-00')) {
                    onTerminateExperiment?.('ending2');
                } else if (output.designation.includes('ROBERT CAPONE')) {
                    onTerminateExperiment?.('ending3');
                }
            }
        } else {
            setFinalAction('OVERRIDE_ABORTED_BY_USER');
        }
    };

    return (
        <div className="flex flex-col h-full font-mono text-slate-400 bg-black p-6 relative overflow-hidden">
            <div className="flex justify-between border-b border-white/5 pb-4 mb-8">
                <div className="flex items-center gap-3 font-bold tracking-[0.2em] text-slate-500">
                    <span className="w-2.5 h-2.5 bg-red-900 animate-pulse rounded-full"></span>
                    OVRD_EXEC_SYSTEM_v4.0.1 // 远程指令覆写系统
                </div>
                <button onClick={onBack} className="text-slate-600 hover:text-white border border-white/5 px-4 py-1 text-xs bg-white/5 transition-all">
                    [EXIT_TERMINAL] // 退出终端
                </button>
            </div>

            <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4 bg-white/5 p-4 border border-white/5">
                    <span className="text-slate-600 font-bold tracking-widest uppercase">INPUT_COORDINATES{">"}</span>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="00.00000, 00.00000"
                        className="bg-transparent border-none outline-none text-slate-300 w-full placeholder:text-slate-800 text-lg tracking-[0.1em]"
                        autoFocus
                    />
                </div>

                {isProcessing && (
                    <div className="flex items-center gap-4 text-slate-500 animate-pulse font-bold tracking-widest uppercase">
                        <div className="w-4 h-4 border border-slate-500 border-t-transparent animate-spin rounded-full" />
                        SEARCHING_ENCRYPTED_GRID... // 正在检索加密网格...
                    </div>
                )}

                {output && typeof output === 'string' && (
                    <div className="text-red-400 bg-red-900/10 p-4 border border-red-500/30 font-bold tracking-widest">
                        {output}
                    </div>
                )}

                {output && typeof output === 'object' && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 border border-white/5 p-6 bg-white/[0.02] relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-[8px] text-slate-500 uppercase">target_acquired</div>
                        
                        <div className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-3 text-sm">
                            <div className="text-slate-600 uppercase font-bold tracking-widest">COORDINATE QUERY:</div> <div className="text-slate-300">{output.coords}</div>
                            <div className="text-slate-600 uppercase font-bold tracking-widest">ASSET DESIGNATION:</div> <div className="text-slate-200 font-bold underline decoration-white/20">{output.designation}</div>
                            <div className="text-slate-600 uppercase font-bold tracking-widest">LOCATION:</div> <div className="text-slate-400 italic">{output.location}</div>
                            <div className="text-slate-600 uppercase font-bold tracking-widest">ADDRESS:</div> <div className="text-slate-500">{output.address}</div>
                            <div className="text-slate-600 uppercase font-bold tracking-widest">FACILITY:</div> <div className="text-slate-400">{output.facility}</div>
                            <div className="text-slate-600 uppercase font-bold tracking-widest">ASSET STATUS:</div> <div className="text-slate-300 font-bold">{output.status}</div>
                        </div>

                        {!finalAction ? (
                            <div className="mt-10 border-t border-red-900/40 pt-6 space-y-6">
                                <div className="flex items-start gap-4 text-red-600 bg-red-600/5 p-4 border border-red-600/20">
                                    <ShieldAlert size={24} className="shrink-0 animate-bounce" />
                                    <div className="space-y-1">
                                        <div className="font-bold tracking-widest">[!] SYSTEM ALERT: Life-support equipment detected.</div>
                                        <div className="text-xs opacity-70">检测到联网医疗维持设备。该操作将导致目标生命体征立即停止。</div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black/60 p-4 border border-white/5">
                                    <div className="text-white/80 font-bold tracking-wider text-sm">[?] PROMPT: DO YOU WISH TO EXECUTE REMOTE SHUTDOWN? // 执行远程关机？</div>
                                    <div className="flex gap-6">
                                        <button onClick={() => handleOverride(true)} className="px-10 py-2 border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all font-bold tracking-[0.3em] uppercase text-xs">YES</button>
                                        <button onClick={() => handleOverride(false)} className="px-10 py-2 border border-slate-800 text-slate-700 hover:bg-slate-800 hover:text-white transition-all font-bold tracking-[0.3em] uppercase text-xs">NO</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="mt-10 border-2 border-red-600 pt-6 text-white font-bold bg-red-600/20 p-6 text-center tracking-[0.5em] [text-shadow:0_0_15px_white]"
                            >
                                {finalAction}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
            
            <div className="text-[10px] text-white/5 mt-12 flex justify-between uppercase tracking-[0.4em] select-none">
                <span>HIGH_RISK_REMOTE_OVRD_ACTIVE</span>
                <span>UNTRACEABLE_ENCRYPTION_ENABLED</span>
            </div>
        </div>
    );
}

interface ThorneBackendProps {
    onClose: () => void;
    onTerminateExperiment?: (type: 'ending2' | 'ending3') => void;
}

export const ThorneBackend: React.FC<ThorneBackendProps> = ({ onClose, onTerminateExperiment }) => {
    const [isLightsOn, setIsLightsOn] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [activeView, setActiveView] = useState<'MAIN' | 'DEAD_DROP' | 'EXP_LOGS' | 'AUDIT_PURGE' | 'OVRD_EXEC'>('MAIN');

    const handleLightInteraction = () => {
        if (isExiting) return; 

        if (!isLightsOn) {
            setIsLightsOn(true);
        } else {
            setIsExiting(true);
            setTimeout(() => {
                onClose?.();
            }, 800);
        }
    };

    return createPortal(
        <div className={`fixed inset-0 z-[110] bg-black overflow-y-scroll overflow-x-hidden custom-scrollbar ${activeView !== 'OVRD_EXEC' ? 'thorne-backend-corrupted' : ''}`} style={{ scrollbarGutter: 'stable' }}>
            <AnimatePresence>
                {(!isLightsOn) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                        className={`absolute top-0 left-0 w-full min-h-screen z-[9000] bg-black flex flex-col ${isExiting ? 'pt-[110px]' : 'justify-center'} items-center cursor-pointer transition-all duration-1000`}
                        onClick={handleLightInteraction}
                    >
                        <div className="flex flex-col items-center gap-6 relative z-10">
                            {!isExiting && (
                                <>
                                    <motion.div
                                        animate={{ y: [0, 8, 0], rotate: [0, 2, 0, -2, 0] }}
                                        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
                                        className="relative group cursor-pointer flex flex-col items-center"
                                    >
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[100vh] bg-neutral-800 -mt-[100vh]" />
                                        <div className="w-10 h-12 bg-gradient-to-b from-neutral-800 to-black border-x border-t border-neutral-700/50 rounded-t-sm -mb-6 relative z-10 shadow-xl" />
                                        <PremiumBulb isOn={false} className="w-24 h-36 opacity-60 group-hover:opacity-100 transition-all duration-500 relative z-0" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-900/5 blur-3xl rounded-full pointer-events-none" />
                                    </motion.div>
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} className="font-mono text-neutral-600 text-[10px] tracking-[0.8em] mt-8 uppercase">
                                        Pull the Cord
                                    </motion.span>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={(isLightsOn && !isExiting) ? "on" : "off"}
                variants={{
                    off: { opacity: 0, filter: "grayscale(100%) brightness(0.2)", transition: { duration: 0.8 } },
                    on: { 
                        opacity: [0, 1, 0.4, 1, 0.2, 1, 0.7, 1],
                        filter: ["grayscale(100%) brightness(0.2)", "grayscale(0%) brightness(1.2)", "grayscale(50%) brightness(0.4)", "grayscale(0%) brightness(1.3)", "grayscale(80%) brightness(0.3)", "grayscale(0%) brightness(1.2)", "grayscale(20%) brightness(0.8)", "grayscale(0%) brightness(1)"],
                        transition: { duration: 0.7, times: [0, 0.05, 0.1, 0.2, 0.3, 0.45, 0.6, 1], ease: "easeOut" }
                    }
                }}
                className="relative min-h-[1600px] w-full flex flex-col items-center pt-32 pb-32 z-10"
            >
                <div
                    className="absolute inset-0 z-0 bg-[#080808]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 50% 120px, rgba(255, 255, 255, 0.04) 0%, transparent 70%), linear-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.5), rgba(0,0,0,1)), url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')`,
                        backgroundSize: '100% 100%, cover, 400px'
                    }}
                />
                <div className="absolute top-[80px] left-0 w-full z-0 pointer-events-none opacity-40 select-none mix-blend-overlay">
                    <div className="flex justify-around items-center px-10 md:px-32">
                        <motion.div animate={{ opacity: isLightsOn ? [0.3, 0.4, 0.35, 0.4] : 0.1 }} transition={{ duration: 0.1, repeat: Infinity }} className="font-creepster text-7xl md:text-[14rem] text-[#854d0e]/30 rotate-[-1deg] tracking-widest blur-[2px]">
                            YELLOW KING
                        </motion.div>
                    </div>
                </div>

                <motion.div className="absolute top-[-30px] left-1/2 -translate-x-1/2 z-[80] cursor-pointer group flex flex-col items-center" onClick={handleLightInteraction} title="Turn Off & Leave">
                    <div className="relative mx-auto w-[4px] h-[160px] flex flex-col items-center">
                        <div className="w-[1px] flex-1 bg-neutral-800" />
                        <div className="absolute inset-0 w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent 100%)', backgroundSize: '4px 4px' }} />
                        <div className="w-8 h-10 bg-gradient-to-b from-neutral-800 to-black border-x border-t border-neutral-700/50 rounded-t-sm -mb-5 relative z-10 shadow-xl">
                            <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                        </div>
                    </div>
                    <PremiumBulb isOn={isLightsOn && !isExiting} className="w-20 h-32 relative z-0" />
                    <div className="absolute top-[165px] left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-[2px] h-4 bg-neutral-800" />
                        <div className="w-4 h-6 bg-gradient-to-b from-neutral-800 to-black border border-neutral-700/30 rounded-full shadow-2xl relative overflow-hidden">
                            <div className="absolute top-1 left-1 w-1 h-2 bg-white/10 rounded-full" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400/0 group-hover:bg-yellow-400/5 blur-3xl rounded-full transition-colors duration-500 pointer-events-none" />
                </motion.div>

                <div
                    className="relative w-[95%] md:w-[950px] mt-48 bg-[#020202] z-10 shadow-[0_0_150px_rgba(0,0,0,1)] border border-white/10 rounded-sm overflow-hidden p-10 font-mono flex flex-col min-h-[650px] backdrop-blur-xl"
                >
                    {/* CRT Scanline Overlay - Subtle */}
                    <div className="absolute inset-0 pointer-events-none z-[100] scanlines opacity-[0.06] mix-blend-overlay" />
                    <div className="absolute inset-0 pointer-events-none z-[101] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-scan" />
                    
                    {/* Corner Brackets */}
                    <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/10" />
                    <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white/10" />
                    <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-white/10" />
                    <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-white/10" />
                    {activeView === 'MAIN' ? (
                        <>
                            <div className="mb-8">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-red-500 font-bold mb-4 animate-pulse">
                                    WARNING: UNAUTHORIZED ACCESS PROTOCOL ACTIVE.
                                </motion.div>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                                    WELCOME, M. THORNE / KLUB-NODE-01
                                </motion.div>
                            </div>
                            <div className="space-y-4">
                                <motion.button 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: 1.5 }} 
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setActiveView('DEAD_DROP')} 
                                    className="block w-full text-left bg-white/[0.02] hover:bg-slate-400/10 p-4 transition-all duration-200 border border-white/5 hover:border-slate-400/30 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors mr-4 font-mono font-bold">[1]</span>
                                    <span className="text-slate-400 group-hover:text-slate-200 group-hover:[text-shadow:0_0_10px_rgba(148,163,184,0.5)] tracking-[0.2em] font-light transition-all">DEAD_DROP // 死信通讯</span>
                                </motion.button>

                                <motion.button 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: 1.6 }} 
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setActiveView('AUDIT_PURGE')} 
                                    className="block w-full text-left bg-white/[0.02] hover:bg-slate-400/10 p-4 transition-all duration-200 border border-white/5 hover:border-slate-400/30 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors mr-4 font-mono font-bold">[2]</span>
                                    <span className="text-slate-400 group-hover:text-slate-200 group-hover:[text-shadow:0_0_10px_rgba(148,163,184,0.5)] tracking-[0.2em] font-light transition-all">AUDIT_PURGE // 审计覆写</span>
                                </motion.button>

                                <motion.button 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: 1.7 }} 
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setActiveView('EXP_LOGS')} 
                                    className="block w-full text-left bg-white/[0.02] hover:bg-slate-400/10 p-4 transition-all duration-200 border border-white/5 hover:border-slate-400/30 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors mr-4 font-mono font-bold">[3]</span>
                                    <span className="text-slate-400 group-hover:text-slate-200 group-hover:[text-shadow:0_0_10px_rgba(148,163,184,0.5)] tracking-[0.2em] font-light transition-all">EXP_LOGS // 实验日志</span>
                                </motion.button>

                                <motion.button 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: 1.8 }} 
                                    whileHover={{ scale: 1.01, x: 4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveView('OVRD_EXEC')} 
                                    className="block w-full text-left bg-red-950/5 hover:bg-red-900/10 p-4 transition-all duration-200 border border-red-900/10 hover:border-red-500/40 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
                                    <span className="text-red-900/40 group-hover:text-red-500 transition-colors mr-4 font-mono font-bold">[4]</span>
                                    <span className="text-red-900/60 group-hover:text-red-500 transition-colors tracking-[0.2em] font-bold group-hover:[text-shadow:0_0_12px_rgba(239,68,68,0.6)]">OVRD_EXEC // 远程操作 - 高危</span>
                                </motion.button>
                            </div>
                        </>
                    ) : activeView === 'DEAD_DROP' ? (
                        <LogViewer logs={LOG_DATA.DEAD_DROP} onBack={() => setActiveView('MAIN')} />
                    ) : activeView === 'EXP_LOGS' ? (
                        <ExpLogsViewer data={LOG_DATA.EXP_LOGS} onBack={() => setActiveView('MAIN')} />
                    ) : activeView === 'AUDIT_PURGE' ? (
                        <AuditViewer data={LOG_DATA.AUDIT_PURGE} onBack={() => setActiveView('MAIN')} />
                    ) : activeView === 'OVRD_EXEC' ? (
                        <OvrdExecViewer onBack={() => setActiveView('MAIN')} onTerminateExperiment={onTerminateExperiment} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-red-500/80 space-y-4">
                            <div className="animate-pulse font-bold text-xl">ACCESS DENIED: INSUFFICIENT CLEARANCE</div>
                            <button onClick={() => setActiveView('MAIN')} className="text-red-400 hover:text-red-300 border border-red-500/30 px-4 py-1 bg-red-900/20">[RETURN]</button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>,
        document.body
    );
};
