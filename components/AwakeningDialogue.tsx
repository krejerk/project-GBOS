import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, User, Fingerprint, ChevronRight, Terminal } from 'lucide-react';

interface DialogueLine {
    id: number;
    speaker: '卡彭' | '玩家' | 'SYSTEM';
    text: string;
}

const PRE_CHALLENGE_SEQUENCE: DialogueLine[] = [
    { id: 0, speaker: '卡彭', text: '……把灯关掉！该死的，把那盏灯关掉！' },
    { id: 1, speaker: '玩家', text: '这里很暗，没有灯。你在医院，你需要冷静。' },
    { id: 2, speaker: '卡彭', text: '医院？去你妈的医院！……松开我！听懂了吗？把这该死的束缚带解开！' },
    { id: 3, speaker: '玩家', text: '是你自己在发抖。' },
    { id: 4, speaker: '卡彭', text: '发抖？哈！我才没发抖。是这辆车在抖……那个老不死的东西在哪？别告诉我他死了。他不能死，他必须活着受罪……他在哪？！' },
    { id: 5, speaker: '玩家', text: '听着，只有你自己知道他在哪。现在，我需要你回答几个问题。' },
    { id: 6, speaker: '卡彭', text: '问题？……你以为你是神父吗？还是那群只会吃甜甜圈的废物警察。给我滚出去！' },
];

const POST_CHALLENGE_SEQUENCE: DialogueLine[] = [
    { id: 7, speaker: '玩家', text: '青豆牡蛎汤计划。' },
    { id: 8, speaker: '卡彭', text: '……什么？' },
    { id: 9, speaker: 'SYSTEM', text: '[神经连接已建立：目标视觉投影同步中...]' },
    { id: 10, speaker: '卡彭', text: '……见鬼，你早说那个词不就完了吗？……' },
];

interface AwakeningDialogueProps {
    onComplete: () => void;
}

export const AwakeningDialogue: React.FC<AwakeningDialogueProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'void' | 'dialogue' | 'challenge' | 'post-challenge'>('void');
    const [currentLineIdx, setCurrentLineIdx] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [challengeInput, setChallengeInput] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showMonsterAvatar, setShowMonsterAvatar] = useState(false);
    const [history, setHistory] = useState<DialogueLine[]>([]);
    const [isBlackedOut, setIsBlackedOut] = useState(true);

    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentSequence = phase === 'post-challenge' ? POST_CHALLENGE_SEQUENCE : PRE_CHALLENGE_SEQUENCE;
    const line = currentSequence[currentLineIdx];

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'auto' // Use auto for character typing (perf)
            });
        }
    }, [displayedText]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth' // Use smooth only for new blocks
            });
        }
    }, [history, phase]);

    // Blackout effect on start
    useEffect(() => {
        const timer = setTimeout(() => setIsBlackedOut(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Typewriter effect logic
    useEffect(() => {
        if (!line || phase === 'challenge' || isTransitioning || isBlackedOut) return;

        setIsTyping(true);
        setDisplayedText('');
        let index = 0;
        const text = line.text;
        const timeouts: number[] = [];

        // Speed settings
        const speed = phase === 'void' ? 60 : (line.speaker === 'SYSTEM' ? 25 : 40);

        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(timer);

                if (phase === 'dialogue') {
                    if (currentLineIdx < PRE_CHALLENGE_SEQUENCE.length - 1) {
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            setCurrentLineIdx(prev => prev + 1);
                        }, 1800);
                        timeouts.push(t);
                    } else {
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            setPhase('challenge');
                        }, 1500);
                        timeouts.push(t);
                    }
                } else if (phase === 'post-challenge') {
                    if (currentLineIdx === 0) { // Player confirmation
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            setCurrentLineIdx(1);
                        }, 1500);
                        timeouts.push(t);
                    } else if (currentLineIdx === 1) { // Capone "??"
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            setCurrentLineIdx(2);
                        }, 1200);
                        timeouts.push(t);
                    } else if (currentLineIdx === 2) { // System sync [IMAGE TRIGGER]
                        setShowMonsterAvatar(true);
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            setCurrentLineIdx(3);
                        }, 2500);
                        timeouts.push(t);
                    } else if (currentLineIdx === 3) { // Final line
                        const t = window.setTimeout(() => {
                            setHistory(prev => [...prev, line]);
                            const t2 = window.setTimeout(() => {
                                setIsTransitioning(true);
                                // CRITICAL: Use a more direct completion method
                                const finish = () => {
                                    console.log("[DIALOGUE] Triggering onComplete fail-safe");
                                    onComplete();
                                };
                                window.setTimeout(finish, 800);
                            }, 800);
                            timeouts.push(t2);
                        }, 1000);
                        timeouts.push(t);
                    }
                }
            }
        }, speed);

        return () => {
            clearInterval(timer);
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [currentLineIdx, phase, line, isTransitioning, isBlackedOut]);

    const handleInteraction = () => {
        if (isTyping) {
            setDisplayedText(line.text);
            setIsTyping(false);
            return;
        }

        if (phase === 'void') {
            setPhase('dialogue');
            setCurrentLineIdx(1);
            setHistory([PRE_CHALLENGE_SEQUENCE[0]]);
        }
    };

    const handleChallengeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (challengeInput.trim() === '青豆牡蛎汤计划') {
            setPhase('post-challenge');
            setCurrentLineIdx(0);
            setChallengeInput('');
        } else {
            setChallengeInput('');
        }
    };

    if (isTransitioning) {
        return (
            <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#d89853] font-mono text-xl animate-pulse tracking-[0.3em]"
                >
                    {/* Returning directly to main view... */}
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden font-mono text-white pointer-events-auto will-change-transform"
            ref={containerRef}
            onClick={() => {
                if (isBlackedOut) return; // Ignore clicks during blackout
                if (phase !== 'challenge') handleInteraction();
            }}
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#8e3d2f]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#8e3d2f]/10 to-transparent" />
                <div className="scanlines opacity-20" />
            </div>

            <AnimatePresence>
                {phase === 'void' ? (
                    <motion.div
                        key="void"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 1 } }}
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center p-8 cursor-pointer"
                    >
                        <div className="max-w-2xl">
                            <p className="text-2xl md:text-3xl text-[#8e3d2f] font-light tracking-widest leading-loose">
                                {displayedText}
                                <span className="inline-block w-2 h-6 ml-2 bg-[#8e3d2f]/50 animate-pulse align-middle" />
                            </p>
                            {!isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    transition={{ delay: 1 }}
                                    className="mt-20 text-[#555] text-xs tracking-[0.5em] uppercase"
                                >
                                    CLICK TO DESCEND
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dialogue-stage"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-4xl w-full h-[85vh] relative z-10 flex flex-col px-4 md:px-8 pt-12"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-10 border-b border-[#c85a3f]/20 pb-4">
                            <div className="flex items-center gap-2 text-[#c85a3f]/60 text-xs tracking-[0.3em]">
                                <Fingerprint size={14} className="animate-pulse" />
                                <span>{phase === 'post-challenge' ? 'SECURE CHANNEL: LINKING_PERSONA_B' : 'NEURAL LINK: ESTABLISHING...'}</span>
                            </div>
                            <div className="text-[#c85a3f]/40 text-[10px] tracking-[0.2em]">
                                FRQ: 42.0Hz // MONSTER_SYNC
                            </div>
                        </div>

                        {/* Scrolling Dialogue Area */}
                        <div className="flex-1 relative overflow-hidden mb-4">
                            {/* Performance-Optimized Gradient Overlays (Replaces expensive maskImage) */}
                            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

                            <div
                                ref={scrollRef}
                                className="h-full overflow-y-auto space-y-12 pr-4 custom-scrollbar relative z-10 will-change-transform"
                            >
                                {history.map((lineItem) => {
                                    const isSystem = lineItem.speaker === 'SYSTEM';
                                    const isPlayer = lineItem.speaker === '玩家';
                                    return (
                                        <div key={lineItem.id} className={`flex flex-col gap-1 ${isPlayer ? 'items-end' : (isSystem ? 'items-center' : 'items-start')}`}>
                                            {/* Label */}
                                            <div className={`flex items-center gap-2 text-[10px] tracking-widest opacity-60 mb-2 ${isPlayer ? 'flex-row-reverse text-[#a0d8ef]' : (isSystem ? 'text-[#c85a3f]' : 'text-[#d89853]')}`}>
                                                {isSystem ? <Terminal size={12} /> : (lineItem.speaker === '卡彭' ? (
                                                    lineItem.id >= 10 ? (
                                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-[#d89853]/40 relative">
                                                            <img
                                                                src="assets/capone-split-personality.jpg"
                                                                className="h-full max-w-none object-cover"
                                                                style={{
                                                                    width: '200%',
                                                                    transform: 'translateX(-50%)',
                                                                    objectPosition: 'center 20%'
                                                                }}
                                                            />
                                                        </div>
                                                    ) : <div className="w-6 h-6 rounded-sm border border-[#d89853]/10 bg-[#d89853]/5 flex items-center justify-center"><User size={10} className="opacity-20" /></div>
                                                ) : <div className="w-1.5 h-1.5 rounded-full bg-[#a0d8ef]/60" />)}
                                                <span className="uppercase">{isSystem ? 'SYSTEM MESSAGE' : (lineItem.speaker === '卡彭' ? 'UNKNOWN SUBJECT (RC)' : 'OPERATOR')}</span>
                                            </div>
                                            {/* Bubble */}
                                            <div className={`px-6 py-4 rounded-sm will-change-transform backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)] ${isSystem ? 'border border-[#c85a3f]/20 bg-[#c85a3f]/5 min-w-[50%]' : (isPlayer
                                                ? 'bg-[#a0d8ef]/10 border-r-2 border-[#a0d8ef]/60 max-w-[85%]'
                                                : 'bg-[#d89853]/10 border-l-2 border-[#d89853]/60 max-w-[85%]'
                                            )}`}>
                                                <p className={`text-lg opacity-40 leading-relaxed ${isPlayer ? 'text-right' : (isSystem ? 'text-center text-[#c85a3f]' : '')}`}>
                                                    {lineItem.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Current Active Line */}
                                {line && phase !== 'challenge' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex flex-col gap-1 ${line.speaker === '玩家' ? 'items-end' : (line.speaker === 'SYSTEM' ? 'items-center' : 'items-start')}`}
                                    >
                                        {/* Label with Avatar Reveal Support */}
                                        <div className={`flex items-end gap-3 text-[10px] tracking-widest opacity-90 mb-2 ${line.speaker === '玩家' ? 'flex-row-reverse text-[#a0d8ef]' : (line.speaker === 'SYSTEM' ? 'text-[#c85a3f]' : 'text-[#d89853]')}`}>
                                            {line.speaker === '卡彭' ? (
                                                line.id >= 10 ? (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className={`w-20 h-32 md:w-24 md:h-40 rounded-full border border-[#d89853]/40 overflow-hidden relative shadow-[0_0_20px_rgba(216,152,83,0.2)] brightness(1.2) contrast(1.1) sepia(0.2)`}
                                                    >
                                                        <img
                                                            src="assets/capone-split-personality.jpg"
                                                            className="w-[200%] h-full max-w-none object-cover transition-all duration-700"
                                                            style={{
                                                                transform: 'translateX(-50%)',
                                                                objectPosition: 'center 20%'
                                                            }}
                                                            alt="Capone"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                                    </motion.div>
                                                ) : <div className="w-20 h-32 md:w-24 md:h-40 rounded-full border border-[#d89853]/20 bg-[#d89853]/5 flex items-center justify-center mb-1"><User size={24} className="opacity-20" /></div>
                                            ) : (line.speaker === '玩家' ? <div className="w-2 h-2 rounded-full bg-[#a0d8ef]/80 mb-1" /> : <Terminal size={14} className="mb-1" />)}
                                            <span className="pb-1 font-bold">
                                                {line.speaker === '卡彭' ? (line.id >= 10 ? 'UNKNOWN SUBJECT (RC)' : 'UNKNOWN SUBJECT (RC)') : (line.speaker === 'SYSTEM' ? 'PROTOCOL STATUS' : 'OPERATOR')}
                                            </span>
                                        </div>

                                        {/* Active Bubble */}
                                        <div className={`will-change-transform ${line.speaker === 'SYSTEM' ? 'min-w-[70%] text-center px-4 md:px-10 py-4 md:py-6 border border-[#c85a3f]/40 bg-[#c85a3f]/10 shadow-[0_0_30px_rgba(200,90,63,0.1)]' : (line.speaker === '玩家'
                                            ? 'bg-[#a0d8ef]/10 border-r-2 border-[#a0d8ef]/60 px-4 md:px-6 py-3 md:py-4 max-w-[90%] md:max-w-[85%]'
                                            : 'bg-[#d89853]/10 border-l-2 border-[#d89853]/60 px-4 md:px-6 py-3 md:py-4 max-w-[90%] md:max-w-[85%]'
                                        )}`}>
                                            <p className={`text-lg md:text-2xl leading-relaxed ${line.speaker === '玩家' ? 'text-[#a0d8ef] text-right' : (line.speaker === 'SYSTEM' ? 'text-[#c85a3f]' : 'text-[#d89853]')}`}>
                                                {displayedText}
                                                {isTyping && <span className="inline-block w-1.5 h-6 ml-1 bg-current animate-pulse align-middle" />}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                                <div className="h-48" />
                            </div>
                        </div>

                        {/* Security Challenge (Intro Style) */}
                        <AnimatePresence>
                            {phase === 'challenge' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full bg-black/95 backdrop-blur-xl border-y border-[#d89853]/20 p-10 mt-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <form onSubmit={handleChallengeSubmit} className="flex flex-col items-center gap-8">
                                        <div className="flex items-center gap-3 text-red-500/80 text-[10px] tracking-[0.5em] animate-pulse uppercase">
                                            <ShieldAlert size={16} />
                                            <span>Security Protocol Checkpoint</span>
                                        </div>
                                        <div className="flex items-center gap-6 w-full max-w-lg border-b border-[#d89853]/30 hover:border-[#d89853]/60 focus-within:border-[#d89853] transition-all">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={challengeInput}
                                                onChange={(e) => setChallengeInput(e.target.value)}
                                                placeholder="WAITING..."
                                                className="flex-1 bg-transparent py-4 text-center text-xl md:text-3xl text-[#d89853] placeholder-[#d89853]/10 focus:outline-none uppercase tracking-[0.2em]"
                                            />
                                            <button type="submit" className="p-2 text-[#d89853] hover:scale-110 transition-transform">
                                                <ChevronRight size={32} />
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-white/20 tracking-[0.4em] uppercase font-bold">
                                            Neural Link Sync Priority: 0
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
            {isBlackedOut && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 bg-black z-[100]"
                />
            )}
        </motion.div>
    );
};
