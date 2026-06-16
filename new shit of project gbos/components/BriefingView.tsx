
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

interface BriefingViewProps {
  onComplete: () => void;
  onFirstInteraction?: () => void;
}

interface BriefingStep {
  id: number;
  type: 'header' | 'report' | 'highlight' | 'classification' | 'mission';
  title?: string;
  content: string;
  classification?: string;
  date?: string;
}

const BRIEFING_STEPS: BriefingStep[] = [
  {
    id: 0,
    type: 'header',
    content: 'PROJECT G.B.O.S.',
    classification: '绝密：仅限级别-4权限',
  },
  {
    id: 1,
    type: 'classification',
    title: '案件编号',
    content: 'FBI-7742-RC-MEM-DIVER',
    date: '2025-02-19',
  },
  {
    id: 2,
    type: 'report',
    title: '事件报告 // INCIDENT REPORT',
    content: '在亚利桑那州荒漠深处的一间破败酒吧里，一名酗酒过度的中年男子陷入深度昏迷。',
  },
  {
    id: 3,
    type: 'report',
    title: '身份确认 // IDENTITY CONFIRMED',
    content: '经紧急送医并进行DNA比对，FBI得出了一个令人难以置信的结论：此人正是罗伯特·卡彭（Robert Capone）——一名已失踪十余年的传奇卧底探员。',
  },
  {
    id: 4,
    type: 'report',
    title: '背景调查 // BACKGROUND CHECK',
    content: '很多年前，卡彭奉命深度渗透进一个庞大的家族式犯罪网络。在其漫长的潜伏期内，他仅向局里进行过三次单向汇报，随后便彻底陷入静默。',
  },
  {
    id: 5,
    type: 'highlight',
    title: '异常发现 // ANOMALY DETECTED',
    content: '然而，局里的绝密档案却记载着一个令人不安的事实：在此期间，卡彭的指纹曾多次出现在重大恶性案件的核心现场，这不仅证明他还活着，更意味着他曾屡次亲手参与犯罪。',
  },
  {
    id: 6,
    type: 'highlight',
    title: '核心问题 // CRITICAL QUESTION',
    content: '他究竟是在黑暗中死守使命，还是早已彻底变节？FBI内部对此争论不休，至今难有定论。',
  },
  {
    id: 7,
    type: 'report',
    title: '当前状况 // CURRENT STATUS',
    content: '经过抢救，卡彭保住了性命，却沦为了植物人。万幸的是，技术人员留住了他微弱的大脑活动，将其维持在“临界意识状态”。',
  },
  {
    id: 8,
    type: 'highlight',
    title: '紧急态势 // URGENT SITUATION',
    content: '与此同时，全国的暴力犯罪率在近半年内离奇暴增。行为分析专家研判，这一系列异动的背后只有一个推手：卡彭当年潜伏的那个犯罪组织。沉寂多年后，他们正在全面复苏。',
  },
  {
    id: 9,
    type: 'mission',
    title: '你的任务 // YOUR MISSION',
    content: '调查局高层确信，在卡彭的潜意识里，隐藏着组织首脑下落的致命情报。作为一名特殊的“记忆潜航者”，你必须利用实验性的神经连接技术，强行潜入卡彭的脑海，在支离破碎的思维废墟中，挖出被掩埋的真相。',
  },
];

export const BriefingView: React.FC<BriefingViewProps> = ({ onComplete, onFirstInteraction }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const step = BRIEFING_STEPS[currentStep];

  // Logic to determine if the persistent image should be shown
  // Show image starting from step 2 (Incident Report) until the end (Project Codename)
  const showPersistentImage = currentStep >= 2;

  // Typewriter effect
  useEffect(() => {
    if (!step) return;

    setIsTyping(true);
    setDisplayedText('');

    const text = step.content;
    let index = 0;

    const typingSpeed = step.type === 'header' ? 50 : 20;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [currentStep]);

  const handleNext = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onFirstInteraction?.();
    }

    if (isTyping) {
      setDisplayedText(step.content);
      setIsTyping(false);
    } else if (currentStep < BRIEFING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStart = () => {
    if (!isTyping) {
      onComplete();
    }
  };

  const isLastStep = currentStep === BRIEFING_STEPS.length - 1;

  return (
    <div className="min-h-screen cortex-bg flex items-center justify-center p-8 overflow-hidden relative">
      {/* Depth Layers */}
      <div className="depth-layer-1" />
      <div className="depth-layer-2" />

      {/* Scanlines */}
      <div className="scanlines" />

      <div className="max-w-4xl w-full relative z-10">

        {/* Persistent Image Container - Fixed position relative to content area */}
        <div className={`relative transition-all duration-1000 ease-in-out mb-8 ${showPersistentImage ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="w-full h-80 relative rounded-lg overflow-hidden border border-[#c85a3f]/40 shadow-[0_0_30px_rgba(200,90,63,0.1)] group">
            <img
              src={`${import.meta.env.BASE_URL}images/incident-report.jpg`}
              alt="Incident Scene"
              className="w-full h-full object-cover filter contrast-125 sepia-[0.3] brightness-75 scale-105 group-hover:scale-100 transition-transform duration-[20s] ease-linear"
              style={{ objectPosition: 'center 40%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="scanlines opacity-20" />

            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-[#c85a3f]/80 animate-pulse">
                Analyzing...
              </span>
            </div>

            {/* Decorative scanning line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#c85a3f]/30 blur-[2px] animate-[scan_4s_linear_infinite]" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {step.type === 'header' && (
              <div className="text-center space-y-6 py-20 relative">
                {/* Cinematic Spotlight Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c85a3f]/10 blur-[120px] rounded-full pointer-events-none"
                />

                <motion.div
                  initial={{ opacity: 0, letterSpacing: '0.8em' }}
                  animate={{ opacity: 1, letterSpacing: '0.3em' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="flex items-center justify-center gap-3 text-[#8e3d2f]/90 mb-8 font-mono text-xs uppercase relative z-10"
                >
                  <AlertCircle size={16} className="animate-pulse text-[#d4574e]" />
                  <span className="border-b border-[#8e3d2f]/30 pb-1">{step.classification}</span>
                </motion.div>

                <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-[#d89853]/95 font-mono neural-glow mix-blend-screen relative z-10">
                  <motion.span
                    initial={{ filter: "blur(20px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {displayedText}
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
            )}

            {step.type === 'classification' && (
              <div className="bg-black/60 backdrop-blur-md border border-[#8e3d2f]/35 p-8 space-y-4 font-mono rounded-lg neural-glow mt-12">
                <div className="text-[#b5594a]/70 text-xs tracking-widest uppercase">{step.title}</div>
                <div className="text-2xl text-[#d89853]/85 tracking-wider font-bold">{displayedText}</div>
                {step.date && (
                  <div className="text-neutral-500 text-sm pt-2">日期: {step.date}</div>
                )}
                <div className="h-px bg-gradient-to-r from-transparent via-[#c85a3f]/30 to-transparent mt-4" />
              </div>
            )}

            {/* Combined Text Container for Report, Highlight, Mission - Image is above dynamically */}
            {(step.type === 'report' || step.type === 'highlight' || step.type === 'mission') && (
              <div className={`
                    backdrop-blur-sm p-8 space-y-4 rounded-b-lg relative overflow-hidden group transition-all duration-500
                    ${step.type === 'highlight'
                  ? 'bg-black/50 border-l-4 border-[#d4574e]/60 hover:bg-black/60'
                  : 'bg-black/40 border-l-4 border-[#c85a3f]/50 hover:bg-black/50'}
              `}>
                <div className={`text-sm tracking-widest uppercase font-mono flex items-center gap-2 ${step.type === 'highlight' ? 'text-[#d4574e]/85' : 'text-[#b5594a]/60'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${step.type === 'highlight' ? 'bg-[#d4574e]' : 'bg-[#c85a3f]/70'}`} />
                  {step.title}
                </div>

                <p className={`
                    text-lg leading-relaxed relative z-10 tracking-wide
                    ${step.type === 'highlight' ? 'text-[#d89853]/95 font-semibold' : 'text-neutral-200 font-light'}
                `}>
                  {displayedText}
                  {isTyping && <span className="typing-cursor" style={{ marginLeft: '4px', background: step.type === 'highlight' ? '#d4574e' : '#c85a3f' }} />}
                </p>

                {/* Decor elements */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] pointer-events-none ${step.type === 'highlight' ? 'bg-[#d4574e]/10' : 'bg-[#c85a3f]/5'}`} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-6 mt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            {currentStep > 0 && !isTyping && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="group flex items-center gap-3 px-6 py-4 bg-black/40 hover:bg-[#c85a3f]/20 border border-[#c85a3f]/20 hover:border-[#c85a3f]/40 text-[#d89853]/70 hover:text-[#d89853] rounded-lg transition-all font-mono text-sm tracking-wider backdrop-blur-sm"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                回退 BACK
              </button>
            )}

            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="group flex items-center gap-3 px-8 py-4 bg-[#c85a3f]/12 hover:bg-[#c85a3f]/20 border border-[#c85a3f]/40 text-[#d89853]/95 rounded-lg transition-all font-mono text-sm tracking-wider backdrop-blur-sm neural-glow"
              >
                {isTyping ? '跳过 SKIP' : '继续 CONTINUE'}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: isTyping ? 0 : 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              disabled={isTyping}
              className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#8e3d2f]/30 via-[#c85a3f]/28 to-[#8e3d2f]/30 hover:from-[#8e3d2f]/40 hover:via-[#c85a3f]/38 hover:to-[#8e3d2f]/40 border-2 border-[#c85a3f]/55 text-[#d89853]/98 rounded-lg transition-all font-mono text-base tracking-widest disabled:opacity-50 backdrop-blur-md neural-glow"
            >
              查看简报及笔录摘要 VIEW BRIEFING & TRANSCRIPTS
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
          </div>

          {isLastStep && !isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] text-[#d4574e]/80 font-mono tracking-[0.3em] uppercase flex items-center gap-2"
            >
              <AlertCircle size={12} />
              WARNING: NEURAL BACKLASH MAY OCCUR
            </motion.div>
          )}

          {/* Progress indicator */}
          <div className="flex gap-2 mt-4">
            {BRIEFING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all rounded-full ${index === currentStep
                  ? 'w-8 bg-[#c85a3f]/85 shadow-[0_0_8px_rgba(212,87,78,0.6)]'
                  : index < currentStep
                    ? 'w-4 bg-[#8e3d2f]/55'
                    : 'w-2 bg-neutral-800/60'
                  }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Neural particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
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
    </div>
  );
};
