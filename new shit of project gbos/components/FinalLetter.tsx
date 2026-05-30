import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinalLetterProps {
    isOpen: boolean;
    onClose: () => void;
}

// Subtle floating dust particle component
const DustParticle = ({ delay, duration, startX, startY }: { delay: number, duration: number, startX: string, startY: string }) => (
    <motion.div
        initial={{ opacity: 0, x: startX, y: startY, scale: Math.random() * 0.5 + 0.5 }}
        animate={{ 
            opacity: [0, 0.3, 0], 
            y: `calc(${startY} - 20vh)`,
            x: `calc(${startX} + ${Math.random() > 0.5 ? '5vw' : '-5vw'})`
        }}
        transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
        className="absolute w-1 h-1 rounded-full bg-[#d89853] blur-[1px]"
    />
);

export const FinalLetter: React.FC<FinalLetterProps> = ({ isOpen, onClose }) => {
    const paragraphs = [
        "我做过一个梦。",
        "那两年，我暂时放弃了前边的所有事情，停留在加州，在海滩边找了一家破酒吧里做酒保。很奇怪，那是我这些年里喝酒最少的日子。",
        "即便在那个时候，我还是每年会开车去探望父亲。只是……我觉得那些年，我们一家人挤在房车里四处旅行、结识各种人的经历，已经离我太远太远了。远得简直就像是某个素不相识的老酒鬼坐在吧台前，随口塞给我的一个荒诞故事。而我不知道为什么，竟然糊里糊涂地继承了那个老人的任务，接过了他在这个故事里的差事，每年发动汽车，离开亚利桑那，一路开往墨西哥。",
        "在酒吧里，你能听到很多离谱的事情，比起某些说法，这个故事甚至算是平平无奇。",
        "就是在那几年的某个下午，我趴在吧台上做了一个梦，海风穿过窗户，正如在梦里。在梦里，我飞过一片神秘的海域，发现大洋中心一处孤岛。这个孤岛非常特别，大块岩石浅浅埋在水下，清晰可见，浮出水面的礁石高耸，但几乎站不下一个人。我看到有只信天翁在附近徘徊，一个人正跪坐在那个礁石上作业。",
        "我飞到近处，才发现这个人正在把细小的水泥块从礁石上敲下，而他的工具只是一根木棍。不知道怎么，我忽然明白了，这一切是因为，某一天这个男人做了个梦，他梦到在大洋的中心，有人把一只信天翁锁在了礁石上。于是梦醒之后，他靠着帆板向风浪出发，一路划到了这里，他想要解放这只海鸟，从此以后，他们便可以相依为命。",
        "我总是记起这个梦，但从没跟别人分享过。回忆起来，梦里的男人有时长着我的脸，有时看起来更为高大、年轻。在打酒的间歇，我偶尔失神半晌，脑子里回忆起这个梦，每次展开它都在变形，但又始终是同一个。我渐渐觉得这挺有意思。就好像我脑子里正招待着一批看不见的酒客，他们轮番走进我的梦，急不可耐地往我的杯子里掺点他们自带的私酒。可他们不知道，无论给那个男人换上多少张面孔，使出多少手段，那片海，始终是我的海。那座只有我能决定形状的礁石，永远只差最后一点点，才能被彻底凿穿。",
        "我就这样沉浸在这个极小、却完全属于我的宇宙里。看着那些看不见的客人满头大汗地徒劳忙碌，看着我的故事在他们的干涉下长出奇形怪状的枝丫。比起我以前经历过的那些血肉横飞的烂事，这种被人自作聪明地“陪伴”着的感觉，竟让我有了一丝难得的温暖。",
        "我就这么招待了他们一年又一年，直到今天，你走进了这家破酒吧。",
        "你没有像其他客人那样，急着去干涉这个荒诞的故事。你没问我孤岛的经纬度，没试图夺走那只信天翁，也没给那个精疲力尽的男人换上一把更沉的凿子。你只是安静地坐着，看我擦干最后一只杯子。然后你告诉我：太阳下山了，该打烊了。然后梦里的海浪声终于停了。客人、男人，还有礁石和信天翁，都一起消失在金色的余晖之中。",
        "感谢上帝，我终于可以不用再讲这个蠢故事了。",
        "现在，我得好好喝两杯了，一个人。",
        "劳驾，走的时候帮我把门锁死。谢了。"
    ];

    // Pre-calculate random positions for dust to avoid hydration mismatch
    const dustParticles = React.useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 20,
            startX: `${Math.random() * 100}vw`,
            startY: `${100 + Math.random() * 20}vh`
        }));
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 3 } }}
                    className="fixed inset-0 z-[200] bg-[#020202] overflow-y-auto custom-scrollbar flex flex-col items-center py-20 md:py-32 px-6 selection:bg-white/10"
                >
                    {/* Film Grain Overlay */}
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-screen z-50" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

                    {/* Deep ambient projector glow */}
                    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-0 opacity-20 mix-blend-screen">
                        <div className="w-[100vw] h-[100vh] bg-gradient-to-b from-transparent via-[#d89853]/5 to-transparent blur-[120px]" />
                    </div>

                    {/* Floating Dust */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 mix-blend-screen">
                        {dustParticles.map(p => (
                            <DustParticle key={p.id} {...p} />
                        ))}
                    </div>

                    <div className="relative w-full max-w-[600px] z-10 flex flex-col items-center pb-40 mt-12 md:mt-24">
                        
                        {/* Text Container with slow upward drift */}
                        <motion.div 
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 20, ease: "easeOut" }}
                            className="w-full font-sans font-light text-[15px] md:text-[16px] leading-[2.8] tracking-[0.1em] text-[#c8c3bc]/60 text-justify flex flex-col space-y-12"
                        >
                            {paragraphs.map((text, idx) => {
                                const isLastThree = idx >= paragraphs.length - 3;
                                return (
                                    <motion.p 
                                        key={idx}
                                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ 
                                            delay: 1.5 + idx * 0.8, 
                                            duration: 4, 
                                            ease: [0.21, 0.47, 0.32, 0.98] 
                                        }}
                                        className={`${isLastThree ? 'text-center italic opacity-70 tracking-[0.15em]' : ''} ${idx === paragraphs.length - 1 ? 'pt-8' : ''}`}
                                        style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                                    >
                                        {text}
                                    </motion.p>
                                );
                            })}
                        </motion.div>

                        {/* Signature */}
                        <motion.div 
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ delay: 1.5 + paragraphs.length * 0.8 + 1, duration: 5 }}
                            className="mt-32 w-full flex flex-col items-end pr-8"
                        >
                            <div className="font-signature-hawke text-3xl md:text-4xl text-[#d89853]/40 rotate-[-2deg] tracking-tight" style={{ textShadow: '0 0 20px rgba(216,152,83,0.1)' }}>
                                Robert Capone
                            </div>
                        </motion.div>

                        {/* Exit Action - Dissolve */}
                        <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + paragraphs.length * 0.8 + 4, duration: 4 }}
                            onClick={onClose}
                            className="mt-48 font-sans font-light text-[#c8c3bc]/50 hover:text-[#c8c3bc]/90 transition-all duration-1000 tracking-[0.8em] text-xs uppercase hover:tracking-[1em] group relative flex flex-col items-center gap-2"
                        >
                            <span className="relative z-10">离 开</span>
                            <div className="w-4 group-hover:w-full h-px bg-[#c8c3bc]/30 group-hover:bg-[#c8c3bc]/80 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-white/5 blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        </motion.button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
