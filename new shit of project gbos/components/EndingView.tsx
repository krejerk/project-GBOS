import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface EndingViewProps {
    type: 'ending1' | 'ending2' | 'ending3';
}

export const EndingView: React.FC<EndingViewProps> = ({ type }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showTheEnd, setShowTheEnd] = useState(false);
    const [showLoopSequence, setShowLoopSequence] = useState(false);

    let endingText = "";
    let classification = "MISSION ACCOMPLISHED // 绝密档案";

    if (type === 'ending1') {
        endingText = "本次潜航任务已圆满结束。\n所有关联数据已成功同步至局方中央数据库。\n\n感谢你的付出，操作员。";
    } else if (type === 'ending2') {
        endingText = "你已成功拦截詹妮弗的干扰并通过获取的“父亲”坐标将其处决。\n任务完成，审讯过程已被归档。\n现在请退出操作界面，交由下一位操作员继续实验。";
    } else if (type === 'ending3') {
        classification = "";
        endingText = "";
    }

    // Typewriter effect
    useEffect(() => {
        if (type === 'ending3') {
            setShowTheEnd(true);
            const endAudio = new Audio(`${import.meta.env.BASE_URL}sounds/end_music.mp3`);
            endAudio.loop = true;
            endAudio.play().catch(err => console.warn("End music playback failed:", err));
            return () => {
                endAudio.pause();
            };
        }

        setIsTyping(true);
        setDisplayedText('');
        setShowTheEnd(false);
        setShowLoopSequence(false);
        let index = 0;
        const typingSpeed = 50;

        const timer = setInterval(() => {
            if (index < endingText.length) {
                setDisplayedText(endingText.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                clearInterval(timer);
                if (type === 'ending2') {
                    setTimeout(() => {
                        setShowLoopSequence(true);
                        setTimeout(() => window.location.reload(), 6000); // Reload after showing loop text
                    }, 2000);
                }
            }
        }, typingSpeed);

        return () => clearInterval(timer);
    }, [endingText]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[3000] min-h-screen bg-[#020202] cortex-bg flex items-center justify-center p-8 overflow-hidden relative selection:bg-[#c85a3f]/30"
        >
            {/* Depth Layers */}
            <div className="absolute inset-0 pointer-events-none opacity-50 bg-black mix-blend-multiply z-0" />
            <div className="depth-layer-1" />
            <div className="depth-layer-2" />

            {/* Scanlines */}
            <div className="scanlines" />

            {/* Cinematic Ambient Background */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="w-[80vw] h-[80vh] bg-[#c85a3f]/10 blur-[120px] rounded-full" 
                />
            </div>

            <div className="max-w-3xl w-full relative z-10 flex flex-col items-center">
                
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                >
                    {/* Header Section */}
                    <div className="text-center space-y-6 py-12 relative">
                        <motion.div
                            initial={{ opacity: 0, letterSpacing: '0.8em' }}
                            animate={{ opacity: 1, letterSpacing: '0.3em' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex items-center justify-center gap-3 text-[#d4574e]/90 mb-8 font-mono text-xs uppercase relative z-10"
                        >
                            <AlertCircle size={16} className="animate-pulse" />
                            <span className="border-b border-[#d4574e]/30 pb-1">{classification}</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#d89853]/95 font-mono neural-glow mix-blend-screen relative z-10 uppercase ml-[0.2em]">
                            <motion.span
                                initial={{ filter: "blur(20px)", opacity: 0 }}
                                animate={{ filter: "blur(0px)", opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {type === 'ending3' ? 'SYSTEM TERMINATED' : '潜航结束'}
                            </motion.span>
                        </h1>

                        <div className="flex justify-center gap-3 mt-12 relative z-10">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 4 }}
                                    animate={{ height: [4, 24, 4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    className="w-1 rounded-full bg-gradient-to-b from-[#b5594a]/80 to-transparent"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Report Content Container */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="bg-black/60 backdrop-blur-md border border-[#8e3d2f]/35 p-8 md:p-12 space-y-4 font-mono rounded-lg neural-glow mt-8 relative overflow-hidden group"
                    >
                        <div className="text-[#b5594a]/70 text-xs tracking-widest uppercase flex items-center gap-2 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#c85a3f]/70" />
                            最终报告 // FINAL REPORT
                        </div>

                        <p className="text-lg md:text-xl leading-[2.2] tracking-wide text-[#d89853]/90 font-light relative z-10 whitespace-pre-wrap">
                            {displayedText}
                            {isTyping && <span className="typing-cursor" style={{ marginLeft: '4px', background: '#c85a3f' }} />}
                        </p>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#c85a3f]/30 to-transparent mt-8" />
                    </motion.div>

                    {/* Final Status */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ delay: 4, duration: 4, repeat: Infinity }}
                        className="text-[10px] text-[#d4574e]/60 font-mono tracking-[0.5em] uppercase text-center mt-16 flex items-center justify-center gap-2"
                    >
                        [ 终端操作已被锁定 // TERMINAL LOCKED ]
                    </motion.div>
                </motion.div>
            </div>
            
            {/* The End Overlay (Ending 3) */}
            <AnimatePresence>
                {showTheEnd && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[5000] bg-[#020202] flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            transition={{ duration: 6, ease: "easeOut" }}
                            className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat mix-blend-screen"
                            style={{ backgroundImage: 'url(/albatross_ending.png)' }}
                        />
                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 3, duration: 4 }}
                            className="text-[#c8c3bc]/90 font-serif tracking-[1.5em] text-3xl md:text-5xl ml-[1.5em] z-10 flex flex-col items-center gap-16"
                        >
                            <div>THE END</div>
                            <motion.button 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 6, duration: 3 }}
                                onClick={() => {
                                    localStorage.removeItem('gbos_save_state');
                                    window.location.reload();
                                }}
                                className="font-sans font-light text-[#c8c3bc]/50 hover:text-[#c8c3bc]/90 transition-all duration-1000 tracking-[0.8em] text-sm uppercase hover:tracking-[1em] group relative flex flex-col items-center gap-2 -ml-[1.5em] cursor-pointer"
                            >
                                <span className="relative z-10">离 开</span>
                                <div className="w-4 group-hover:w-full h-px bg-[#c8c3bc]/30 group-hover:bg-[#c8c3bc]/80 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-white/5 blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loop Sequence Overlay (Ending 2) */}
            <AnimatePresence>
                {showLoopSequence && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[5000] bg-black flex flex-col items-start justify-center p-12 md:p-24 pointer-events-auto font-mono text-xs md:text-sm text-[#d4574e]/90"
                    >
                        <div className="space-y-4 animate-pulse-fast">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{`> CLEARING OPERATOR MEMORY...`}</motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>{`> INITIATING NEW DIVE SEQUENCE...`}</motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>{`> AWAITING OPERATOR #8043...`}</motion.div>
                        </div>
                        <div className="absolute inset-0 pointer-events-none animate-cinematic-glitch mix-blend-difference bg-white/10 backdrop-invert backdrop-saturate-200 z-50 opacity-20" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Neural particles */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#c85a3f]/60 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};
