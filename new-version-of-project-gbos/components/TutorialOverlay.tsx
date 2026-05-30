import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialOverlayProps {
  isVisible: boolean;
  targetId?: string; // HTML ID of the primary element to highlight
  extraHighlightIds?: string[]; // Optional secondary IDs to unblock (e.g., keywords)
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Legacy or specific hints
  offset?: number;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  isVisible,
  targetId,
  extraHighlightIds = [],
  text,
  position = 'bottom',
  offset = 20
}) => {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = React.useState({ width: typeof window !== 'undefined' ? window.innerWidth : 0, height: typeof window !== 'undefined' ? window.innerHeight : 0 });
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Reset dismissal when content changes
  React.useEffect(() => {
    setIsDismissed(false);
  }, [text, targetId]);

  React.useEffect(() => {
    if (isVisible) {
      const allIds = [targetId, ...extraHighlightIds].filter(Boolean) as string[];
      
      const updateRect = () => {
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            setRect(el.getBoundingClientRect());
          } else {
            setRect(null); // Reset rect if target is lost
          }
        }
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      };

      // 1. Initial Update
      updateRect();

      // 2. Class Helper
      const applyHighlightClasses = () => {
        allIds.forEach(id => {
          const el = document.getElementById(id);
          if (el && !el.classList.contains('tutorial-active-target')) {
            el.classList.add('tutorial-active-target');
          }
        });
      };
      applyHighlightClasses();

      // 3. MutationObserver to handle dynamic elements (modals, etc.)
      const observer = new MutationObserver(() => {
        updateRect();
        applyHighlightClasses();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id', 'class']
      });

      // 4. Conventional Listeners
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect, true);
      
      const interval = setInterval(updateRect, 300); // Faster interval for responsiveness

      return () => {
        observer.disconnect();
        allIds.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('tutorial-active-target');
        });
        window.removeEventListener('resize', updateRect);
        window.removeEventListener('scroll', updateRect, true);
        clearInterval(interval);
      };
    } else {
      setRect(null);
    }
  }, [isVisible, targetId, JSON.stringify(extraHighlightIds)]);

  if (!isVisible) return null;

  // Calculate HUD Panel Center Position
  const hudBoxX = windowSize.width / 2;
  const hudBoxY = windowSize.height / 2;

  // Calculate Target Center
  const targetX = rect ? rect.left + rect.width / 2 : hudBoxX;
  const targetY = rect ? rect.top + rect.height / 2 : hudBoxY - 100;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden font-mono pointer-events-none">
      {/* 1. INTERACTION BLOCKER - Split into 4 segments to allow scrolling in the hole and generic scroll interaction */}
      <AnimatePresence>
        {rect && (
          <>
            {/* Top Mask */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDismissed(true)}
              className="absolute top-0 left-0 w-full bg-black/40 backdrop-blur-[1px] pointer-events-auto cursor-not-allowed"
              style={{ height: `${rect.top}px` }}
            />
            {/* Bottom Mask */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDismissed(true)}
              className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-[1px] pointer-events-auto cursor-not-allowed"
              style={{ top: `${rect.bottom}px` }}
            />
            {/* Left Mask */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDismissed(true)}
              className="absolute left-0 bg-black/40 backdrop-blur-[1px] pointer-events-auto cursor-not-allowed"
              style={{ top: `${rect.top}px`, height: `${rect.height}px`, width: `${rect.left}px` }}
            />
            {/* Right Mask */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDismissed(true)}
              className="absolute right-0 bg-black/40 backdrop-blur-[1px] pointer-events-auto cursor-not-allowed"
              style={{ top: `${rect.top}px`, height: `${rect.height}px`, left: `${rect.right}px` }}
            />
          </>
        )}
      </AnimatePresence>

      {/* 2. Neural Link (Restored SVG Line from Center to Target) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-[10000]">
        <AnimatePresence>
          {rect && (
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                d={`M ${hudBoxX} ${hudBoxY} L ${targetX} ${targetY}`}
                className="stroke-[#d89853] stroke-[1] fill-none opacity-40"
                style={{
                    strokeDasharray: "4 4",
                }}
            />
          )}
        </AnimatePresence>
        
        {/* Pulsing indicator at target */}
        <AnimatePresence>
            {rect && (
                <motion.circle 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.4] }}
                    exit={{ scale: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    cx={targetX}
                    cy={targetY}
                    r="6"
                    className="fill-[#d89853]"
                />
            )}
        </AnimatePresence>
      </svg>

      {/* 3. Fixed HUD Panel at CENTER */}
      <AnimatePresence mode='wait'>
        {!isDismissed && (
          <div key="hud-panel" className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none z-[10001]">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={() => setIsDismissed(true)}
                className="w-full max-w-lg bg-black/80 backdrop-blur-3xl border border-[#d89853]/40 rounded-2xl p-8 shadow-[0_0_100px_rgba(0,0,0,0.9),0_0_40px_rgba(216,152,83,0.2)] pointer-events-auto flex flex-col items-center gap-5 relative overflow-hidden cursor-pointer group"
            >
                {/* High-Tech Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d89853]/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d89853]/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d89853]/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d89853]/40" />

                {/* Title / System Header */}
                <div className="flex items-center gap-3 w-full border-b border-[#d89853]/10 pb-2 mb-1">
                    <div className="w-1.5 h-1.5 bg-[#c85a3f] rounded-full animate-pulse" />
                    <span className="text-[10px] tracking-[0.3em] font-bold text-[#d89853]/60 uppercase">System Instruction</span>
                    <div className="flex-1" />
                    <span className="text-[8px] text-[#d89853]/30 font-mono">STATUS: RENDERING...</span>
                </div>
                
                <div className="text-[#d89853] text-sm md:text-base tracking-[0.1em] font-medium text-center leading-relaxed drop-shadow-md">
                  {text}
                </div>

                <div className="text-[9px] text-[#d89853]/20 font-mono tracking-widest mt-2 group-hover:text-[#d89853]/60 transition-colors">
                  [点击任意位置隐藏当前提示 / CLICK TO DISMISS]
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes tutorial-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(216, 152, 83, 0.4), inset 0 0 2px rgba(216, 152, 83, 0.2); }
          50% { box-shadow: 0 0 30px rgba(216, 152, 83, 0.8), inset 0 0 15px rgba(216, 152, 83, 0.4); }
        }
        .tutorial-active-target {
          animation: tutorial-glow 1.5s infinite ease-in-out !important;
          z-index: 10001 !important;
          pointer-events: auto !important;
          cursor: crosshair !important;
        }
        /* Only apply relative to static elements so z-index works, without breaking existing layouts */
        .tutorial-active-target:not(.fixed):not(.absolute) {
          position: relative !important;
        }
      `}</style>
    </div>
  );
};
