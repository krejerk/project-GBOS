import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StudioIntroProps {
    onComplete: () => void;
}

export const StudioIntro: React.FC<StudioIntroProps> = ({ onComplete }) => {
    useEffect(() => {
        // Automatically proceed to the next phase after the animation finishes
        const timer = setTimeout(() => {
            onComplete();
        }, 6000); // 6 seconds total duration
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div 
                key="studio-intro"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center pointer-events-auto"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    <img 
                        src={`${import.meta.env.BASE_URL}images/studio_logo.jpg`} 
                        alt="Hunstier Klub Studio" 
                        className="max-w-[20vw] max-h-[20vh] object-contain opacity-80"
                    />
                </motion.div>
                
                {/* Subtle Film Grain Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
                
                {/* Subtle Glitch / Vignette Effect */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </motion.div>
        </AnimatePresence>
    );
};
