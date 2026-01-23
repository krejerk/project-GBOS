
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Terminal, User, Fingerprint } from 'lucide-react';

interface DialogueViewProps {
    onComplete: () => void;
    collectedClues: string[];
    unlockedPeople: string[];
}
// Helper map for clue display names
const CLUE_DISPLAY_MAP: Record<string, string> = {
    'julip': '黄油朱莉普',
    'robert': '罗伯特·卡彭',
    'chicago': '芝加哥',
    'asian_woman': '亚裔女性',
    'maine': '缅因州',
    'small_bank': '小银行',
    'missing': '失踪',
    'father': '父亲',
    'project': '青豆牡蛎汤计划',
    'kansas_city': '堪萨斯城',
    'mobile_blood_truck': '流动献血车',
    'year_1976': '1976',
    'twisted_relationship': '扭曲关系'
};


interface DialogueLine {
    id: number;
    speaker: 'capone' | 'player' | 'system';
    text: string;
    requiresPassword?: boolean;
}

const DIALOGUE_LINES: DialogueLine[] = [
    { id: 1, speaker: 'capone', text: '我在哪？为何我什么都看不见？' }, // Intro line
    { id: 2, speaker: 'player', text: '你在医院，你还在康复。' },
    { id: 3, speaker: 'capone', text: '你是谁？' },
    { id: 4, speaker: 'player', text: '自己人。' },
    { id: 5, speaker: 'capone', text: '自己人……所以我的任务结束了吗？' },
    { id: 6, speaker: 'player', text: '暂告一段落了，你只需回答我一些问题，然后就可以好好休息了。' },
    { id: 7, speaker: 'capone', text: '问题……我为什么要回答问题？他们说过，我无需回答任何问题。' },
    { id: 8, speaker: 'player', text: '他们？我收到的文档都乱七八糟的，他们指的是……' },
    { id: 9, speaker: 'capone', text: '听着，我累了，接下来我不会回答你任何问题了。' },
    { id: 10, speaker: 'player', text: '黄油朱莉普。', requiresPassword: true },
    { id: 11, speaker: 'capone', text: '你说什么？' },
    { id: 12, speaker: 'system', text: '[神经连接已建立：目标视觉投影同步中...]' },
    { id: 13, speaker: 'capone', text: '你是什么人，为什么会知道这个代号？你跟KLUB有联系？' },
    { id: 14, speaker: 'player', text: '我无法回答你这个问题，只能告诉你，我是自己人。' },
    { id: 15, speaker: 'capone', text: '好吧，我了解了。你想知道什么？' },
];

export const DialogueView: React.FC<DialogueViewProps> = ({ onComplete, collectedClues, unlockedPeople = [] }) => {
    const [currentLine, setCurrentLine] = useState(0); // Start at 0 for Intro
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const [showCaponeImage, setShowCaponeImage] = useState(false);
    const [showFullDiveBtn, setShowFullDiveBtn] = useState(false);
    const [introFadeOut, setIntroFadeOut] = useState(false); // Controls fade out of intro text

    const scrollRef = useRef<HTMLDivElement>(null);
    const line = DIALOGUE_LINES[currentLine];

    // Auto-scroll to bottom
    // Auto-scroll to bottom - Only on new line or major state change, NOT every character type
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [currentLine, showPasswordInput, showCaponeImage]); // Removed displayedText to reduce layout trashing during typing

    // Typewriter effect
    useEffect(() => {
        if (!line || line.requiresPassword) return;

        // Skip typing for intro if it's already fading out
        if (currentLine === 0 && introFadeOut) return;

        setIsTyping(true);
        setDisplayedText('');

        const text = line.text;
        let index = 0;

        // Typing speed depends on speaker (Capone is slightly erratic/slower)
        const speed = line.speaker === 'capone' ? 40 : 25;

        // Slower speed for the intro monologue to feel more like a thought
        const effectiveSpeed = currentLine === 0 ? 60 : speed;

        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;

                // Ensure scroll follows typing
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            } else {
                setIsTyping(false);
                clearInterval(timer);

                // Auto advance logic
                if (currentLine === 0) {
                    // Stay on intro line until user clicks "Descend" or redundant timer?
                    // Let's make it auto-transition for smoothness after a pause
                    // Actually, allow user to read it.
                } else if (line.id < 10 && currentLine !== 0) {
                    setTimeout(() => {
                        if (line.id === 9) {
                            setShowPasswordInput(true);
                        } else {
                            setCurrentLine(prev => prev + 1);
                        }
                    }, 1500); // Increased pause for reading time
                }
            }
        }, effectiveSpeed);

        return () => clearInterval(timer);
    }, [currentLine, line]);

    const handlePasswordSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (passwordInput.trim() === '黄油朱莉普') {
            setPasswordCorrect(true);
            setShowPasswordInput(false);
            setCurrentLine(10);
        } else {
            setPasswordInput('');
        }
    };

    const handleClueClick = (clueId: string) => {
        const clueText = CLUE_DISPLAY_MAP[clueId] || clueId;
        setPasswordInput(clueText);
    };

    const handleIntroDescend = () => {
        if (isTyping) {
            // If still typing, fast forward to end of text
            setDisplayedText(line.text);
            setIsTyping(false);
            return;
        }

        setIntroFadeOut(true);
        setTimeout(() => {
            setCurrentLine(1); // Move to first actual dialogue
        }, 2000); // Wait for fade out
    }


    // Auto advance from password confirmation
    useEffect(() => {
        if (passwordCorrect && currentLine === 10 && !isTyping) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 1500);
            return () => clearTimeout(timer);
        }

        // Auto advance after confirmation line
        if (passwordCorrect && currentLine === 11 && !isTyping) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 1500);
            return () => clearTimeout(timer);
        }

        // Trigger image show at system message (id: 12)
        if (currentLine === 12 && !isTyping) {
            setShowCaponeImage(true);
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 3000);
            return () => clearTimeout(timer);
        }

        // Continue conversation after image
        if (currentLine >= 13 && currentLine < 15 && !isTyping) {
            const timer = setTimeout(() => {
                setCurrentLine(prev => prev + 1);
            }, 3000);
            return () => clearTimeout(timer);
        }

        // Show search at end
        if (currentLine === 15 && !isTyping) {
            setTimeout(() => setShowFullDiveBtn(true), 1500);
        }
    }, [passwordCorrect, currentLine, isTyping]);


    const renderSpeakerAvatar = (speaker: 'capone' | 'player' | 'system') => {
        if (speaker === 'system') return <Terminal size={14} className="text-[#c85a3f]" />;

        if (speaker === 'capone') {
            if (showCaponeImage) {
                // INCREASED SIZE: w-20 h-20 (80px)
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden relative border border-[#d89853]/50 shadow-[0_0_15px_rgba(216,152,83,0.3)] shrink-0 filter sepia-[0.3] contrast-125 mr-2"
                    >
                        <img
                            src="assets/capone-split-personality.jpg"
                            className="absolute top-0 left-0 w-[200%] h-full max-w-none object-cover object-left"
                            alt="RC"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="scanlines opacity-40" />
                    </motion.div>
                );
            }
            return <User size={14} className="text-[#d89853]" />;
        }

        return <div className="w-3 h-3 rounded-full bg-[#a0d8ef]/80" />;
    };

    const getSpeakerLabel = (speaker: 'capone' | 'player' | 'system') => {
        if (speaker === 'capone') return 'UNKNOWN SUBJECT (RC)';
        if (speaker === 'player') return 'OPERATOR (YOU)';
        if (speaker === 'system') return 'SYSTEM LOG';
        return '';
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-mono">
            {/* Voide Intro Layer */}
            <AnimatePresence>
                {(currentLine === 0) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 2, ease: "easeIn" } }}
                        key="void-intro"
                        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-center p-8 cursor-pointer"
                        onClick={handleIntroDescend}
                    >
                        {!introFadeOut && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 1.5 } }}
                                className="max-w-2xl"
                            >
                                <motion.p
                                    key="intro-text"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    className="text-2xl md:text-3xl text-[#8e3d2f] font-light tracking-widest leading-loose"
                                >
                                    {displayedText}
                                    <span className="inline-block w-2 h-6 ml-2 bg-[#8e3d2f]/50 animate-pulse align-middle" />
                                </motion.p>
                            </motion.div>
                        )}

                        {!isTyping && !introFadeOut && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-10 text-[#555] text-xs tracking-[0.5em] hover:text-[#888] transition-colors"
                            >
                                PRESS TO DESCEND
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#8e3d2f]/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8e3d2f]/10 to-transparent pointer-events-none" />
                <div className="scanlines opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: currentLine > 0 ? 1 : 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="max-w-4xl w-full relative z-10 flex flex-col h-[85vh]"
            >

                {/* Header Display */}
                <div className="flex justify-between items-center mb-6 border-b border-[#c85a3f]/30 pb-2">
                    <div className="flex items-center gap-2 text-[#c85a3f]/70 text-xs tracking-[0.2em]">
                        <Fingerprint size={14} />
                        <span>NEURAL LINK: ACTIVE</span>
                    </div>
                    <div className="text-[#c85a3f]/50 text-[10px]">
                        FREQ: 44.2Hz // STABLE
                    </div>
                </div>

                {/* Main Dialogue Scroll Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-8 pr-4 mb-8 scrollbar-hide"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
                    }}
                >
                    <div className="h-4" /> {/* Spacer top */}

                    <AnimatePresence initial={false}>
                        {DIALOGUE_LINES.slice(0, currentLine + 1).map((dialogueLine, index) => {
                            if (dialogueLine.id === 1) return null; // Logic handled by Intro Overlay
                            if (dialogueLine.requiresPassword && !passwordCorrect) return null;

                            const isLatest = index === currentLine;
                            const isSystem = dialogueLine.speaker === 'system';
                            const showAvatar = dialogueLine.speaker === 'capone' && showCaponeImage;

                            return (
                                <motion.div
                                    key={dialogueLine.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex flex-col gap-1 ${dialogueLine.speaker === 'player' ? 'items-end' : 'items-start'
                                        }`}
                                >
                                    {/* Speaker Label */}
                                    {!isSystem && (
                                        <div className={`flex items-end gap-2 text-[10px] tracking-widest opacity-80 mb-1 ${dialogueLine.speaker === 'player' ? 'flex-row-reverse text-[#a0d8ef]' : 'text-[#d89853]'
                                            }`}>
                                            {renderSpeakerAvatar(dialogueLine.speaker)}
                                            <span className={`pb-2 ${showAvatar ? 'text-xs font-bold' : ''}`}>
                                                {getSpeakerLabel(dialogueLine.speaker)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Message Bubble/Text */}
                                    <div className={`relative max-w-[90%] md:max-w-[80%] ${isSystem ? 'w-full text-center py-4' :
                                        dialogueLine.speaker === 'player'
                                            ? 'bg-[#a0d8ef]/5 border-r-2 border-[#a0d8ef]/30 pr-6 pl-4 py-2 rounded-l-lg'
                                            : 'bg-[#d89853]/5 border-l-2 border-[#d89853]/30 pl-6 pr-4 py-2 rounded-r-lg'
                                        }`}>
                                        <p className={`text-lg md:text-xl leading-relaxed ${isSystem ? 'text-[#c85a3f] text-sm italic tracking-widest' :
                                            dialogueLine.speaker === 'player' ? 'text-[#a0d8ef]/90 text-right' : 'text-[#d89853]/90 text-left'
                                            } ${!isLatest && !isSystem ? 'opacity-50' : ''}`}>
                                            {isLatest ? displayedText : dialogueLine.text}
                                            {isLatest && isTyping && (
                                                <span className="inline-block w-2 h-5 ml-1 bg-current animate-pulse" />
                                            )}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    <div className="h-20" /> {/* Spacer bottom for scroll */}
                </div>

                {/* Interaction Area (Fixed at bottom) */}
                <div className="min-h-[160px] relative flex flex-col justify-end">

                    {/* Password Input */}
                    <AnimatePresence>
                        {showPasswordInput && (
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                onSubmit={handlePasswordSubmit}
                                className="w-full relative z-20 bg-black/80 backdrop-blur border-y border-[#c85a3f]/30 py-6"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <div className="text-[#c85a3f] text-xs tracking-[0.3em] animate-pulse">
                                        SECURITY CHALLENGE DETECTED
                                    </div>

                                    {/* Input Field */}
                                    <div className="flex items-center gap-2 w-full max-w-md">
                                        <input
                                            type="text"
                                            value={passwordInput}
                                            onChange={(e) => setPasswordInput(e.target.value)}
                                            placeholder="INPUT SECURITY CODE"
                                            autoFocus
                                            className="flex-1 bg-transparent text-center text-2xl md:text-3xl text-[#d89853] placeholder-[#d89853]/20 font-mono focus:outline-none uppercase tracking-widest border-b border-[#d89853]/30 focus:border-[#d89853] transition-colors pb-2"
                                        />
                                        <button
                                            type="submit"
                                            className="p-2 border border-[#d89853]/30 rounded text-[#d89853] hover:bg-[#d89853]/10 transition-colors"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>

                                    {/* Collected Clues - Quick Input */}
                                    {(collectedClues.length > 0 || unlockedPeople.length > 0) && (
                                        <div className="flex flex-wrap justify-center gap-2 max-w-lg mt-2 px-4">
                                            {Array.from(new Set([...collectedClues, ...unlockedPeople])).map(id => (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    onClick={() => handleClueClick(id)}
                                                    className="px-3 py-1 bg-[#d89853]/10 hover:bg-[#d89853]/20 border border-[#d89853]/30 text-[#d89853] text-xs rounded transition-colors"
                                                >
                                                    {CLUE_DISPLAY_MAP[id] || id}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {/* Full Dive Button - Replaced Search Interface */}
                    <AnimatePresence>
                        {showFullDiveBtn && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full flex justify-center pb-8"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onComplete}
                                    className="relative group px-12 py-6 bg-transparent overflow-hidden"
                                >
                                    {/* Custom Button Styling */}
                                    <div className="absolute inset-0 bg-[#d89853]/10 group-hover:bg-[#d89853]/20 transition-colors duration-500 backdrop-blur-sm" />

                                    {/* Borders */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d89853] to-transparent" />
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d89853] to-transparent" />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center gap-2">
                                        <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#d89853] group-hover:text-white transition-colors text-shadow-glow">
                                            INITIALIZE FULL DIVE
                                        </span>
                                        <div className="flex items-center gap-2 text-[#c85a3f] text-xs tracking-[0.3em]">
                                            <Terminal size={12} />
                                            <span>ACCESSING CORTEX...</span>
                                        </div>
                                    </div>

                                    {/* Decorative Glow */}
                                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_30px_rgba(216,152,83,0.3)]" />
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </motion.div>
        </div>
    );
};
