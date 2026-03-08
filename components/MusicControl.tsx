
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicControlProps {
    isPlaying: boolean;
    onToggle: () => void;
    isVisible: boolean;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, onToggle, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    className="fixed bottom-20 right-4 z-[100]"
                >
                    <div className="relative group">
                        {/* Visualizer bars (Container) */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-end gap-[2px] h-4 w-10 px-2">
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: isPlaying ? [4, 16, 8, 14, 4] : 2
                                    }}
                                    transition={{
                                        duration: 0.8 + (i * 0.1),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className={`w-1 rounded-full ${isPlaying ? 'bg-[#c85a3f]' : 'bg-[#c85a3f]/30'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={onToggle}
                            className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 backdrop-blur-xl border border-[#c85a3f]/30 group-hover:border-[#c85a3f]/60 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#c85a3f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Scanning Line */}
                            <motion.div
                                animate={{ top: ['-10%', '110%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c85a3f]/40 to-transparent z-0"
                            />

                            <div className="relative z-10 text-[#d89853]/90 group-active:scale-90 transition-transform duration-200">
                                {isPlaying ? (
                                    <Volume2 size={20} className="drop-shadow-[0_0_8px_rgba(216,152,83,0.4)]" />
                                ) : (
                                    <VolumeX size={20} className="text-[#8e3d2f]/60" />
                                )}
                            </div>

                            {/* Decorative corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#c85a3f]/40" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#c85a3f]/40" />
                        </button>

                        {/* Label hint */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                        >
                            <span className="text-[10px] font-mono tracking-widest text-[#d89853]/60 uppercase bg-black/60 px-2 py-1 rounded border border-[#c85a3f]/20">
                                {isPlaying ? "Syncing Neural Rhythms" : "Audio Link Offline"}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
