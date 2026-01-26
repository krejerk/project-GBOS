import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Lightbulb } from 'lucide-react';
import { RELATIONSHIP_TREE } from '../constants';

// Using the locally generated high-fidelity asset
const REALISTIC_CORK_URL = '/textures/cork_board.png';

interface SyndicateBoardProps {
    unlockedPeople: string[];
    onNodeClick?: (id: string) => void;
    onClose: () => void;
    phase?: number; // 1 or 2
}

export const SyndicateBoard: React.FC<SyndicateBoardProps> = ({
    unlockedPeople,
    onClose,
    phase = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLightsOn, setIsLightsOn] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Local state for dragging nodes
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number, y: number }>>({});

    // Filter nodes based on Phase and Unlock status
    const visibleNodes = useMemo(() => {
        return RELATIONSHIP_TREE.filter(node => node.phase <= phase);
    }, [phase]);

    // Initialize positions once
    useEffect(() => {
        const initialPositions: Record<string, { x: number, y: number }> = {};
        visibleNodes.forEach(node => {
            initialPositions[node.id] = node.position;
        });
        setNodePositions(initialPositions);
    }, [visibleNodes]);

    // LIGHT SWITCH LOGIC
    const handleLightInteraction = () => {
        if (!isLightsOn) {
            // Turn ON
            setIsLightsOn(true);
        } else {
            // Turn OFF and EXIT
            setIsLightsOn(false);
            setIsExiting(true);
            setTimeout(() => {
                onClose();
            }, 1000); // Wait for fade out
        }
    };

    const updatePosition = (id: string, xPercent: number, yPercent: number) => {
        setNodePositions(prev => ({
            ...prev,
            [id]: { x: xPercent, y: yPercent }
        }));
    };

    // Derived connections based on CURRENT nodePositions
    const connections = useMemo(() => {
        return visibleNodes
            .filter(node => node.parentId)
            .map(node => {
                const parentId = node.parentId!;
                // Safe check: Ensure parent exists in visibleNodes OR has a position in map
                const parentNode = visibleNodes.find(n => n.id === parentId);
                const parentPos = nodePositions[parentId] || parentNode?.position;

                const nodePos = nodePositions[node.id] || node.position;

                if (!parentPos || !nodePos) return null;
                return {
                    from: parentPos,
                    to: nodePos,
                    id: `${parentId}-${node.id}`
                };
            })
            .filter(Boolean) as { from: { x: number, y: number }, to: { x: number, y: number }, id: string }[];
    }, [visibleNodes, nodePositions]);

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar">

            {/* BLACKOUT / LIGHT INTERACTION LAYER */}
            <AnimatePresence>
                {(!isLightsOn || isExiting) && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
                        className="fixed inset-0 z-[9000] bg-black flex items-center justify-center cursor-pointer"
                        onClick={handleLightInteraction}
                    >
                        <div className="flex flex-col items-center gap-6 relative z-10">
                            {/* Hanging Bulb in Void */}
                            <motion.div
                                animate={{
                                    opacity: [0.4, 0.5, 0.4],
                                    y: [0, 5, 0],
                                    rotate: [0, 1, 0, -1, 0]
                                }}
                                transition={{
                                    opacity: { duration: 0.1, repeat: Infinity, repeatType: "reverse" }, // Flicker
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, // Sway
                                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } // Rotate
                                }}
                                className="relative group cursor-pointer"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[100vh] bg-[#222] -mt-[100vh]" />
                                <Lightbulb size={100} className="text-neutral-800 fill-neutral-900 drop-shadow-xl group-hover:text-neutral-700 transition-colors" />

                                {/* Subtle Glow in dark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-900/10 blur-xl rounded-full pointer-events-none" />
                            </motion.div>

                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                className="font-mono text-neutral-600 text-xs tracking-[0.5em] mt-8"
                            >
                                {isExiting ? "" : "PULL THE CORD"}
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Room Environment Container */}
            <div className={`relative min-h-[1600px] w-full flex flex-col items-center pt-32 pb-32 transition-all duration-1000 ${isLightsOn ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-95 grayscale'}`}>

                {/* 1. Concrete Wall Background */}
                <div
                    className="absolute inset-0 z-0 bg-[#0F0F0F]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.4), rgba(0,0,0,0.9)),
                            url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')
                        `,
                        backgroundSize: 'cover, 400px'
                    }}
                />

                {/* 2. Graffiti */}
                <div className="absolute top-[80px] left-0 w-full z-0 pointer-events-none opacity-40 select-none mix-blend-overlay">
                    <div className="flex justify-around items-center px-10 md:px-32">
                        <div className="font-creepster text-7xl md:text-[14rem] text-[#854d0e]/30 rotate-[-1deg] tracking-widest blur-[2px]">YELLOW KING</div>
                    </div>
                </div>

                {/* 3. The Lightbulb (ON STATE) - Doubles as Exit Switch */}
                <div
                    className="absolute top-[-50px] left-1/2 -translate-x-1/2 z-[80] cursor-pointer group"
                    onClick={handleLightInteraction}
                    title="Turn Off & Leave"
                >
                    <div className="w-[2px] h-[180px] bg-black mx-auto" />
                    <div className="relative">
                        <Lightbulb size={64} className="text-[#fef08a] fill-[#fef08a] drop-shadow-[0_0_60px_rgba(253,224,71,0.9)] filter brightness-110 group-hover:brightness-150 transition-all" />
                        {/* Light Cone */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1800px] h-[1800px] bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.12)_0%,transparent_60%)] pointer-events-none mix-blend-screen opacity-80" />
                    </div>
                </div>

                {/* 4. The Board - REALISTIC TEXTURE (V6) */}
                <div
                    ref={containerRef}
                    className="relative w-[95%] md:w-[1300px] min-h-[1100px] bg-[#221510] z-10 shadow-[0_50px_120px_rgba(0,0,0,1)] border-[16px] border-[#0c0806] rounded-sm"
                    style={{
                        // Using a high-quality external texture to match the user's "Real Texture" request
                        backgroundImage: `url('${REALISTIC_CORK_URL}')`,
                        backgroundSize: 'cover',
                        boxShadow: 'inset 0 0 250px rgba(0,0,0,0.9), 0 30px 60px black'
                    }}
                >
                    {/* Metal Label */}
                    <div className="absolute -top-5 left-10 bg-[#1c1917] px-6 py-2 border border-[#444] shadow-lg z-20 rounded-sm transform -rotate-1">
                        <span className="font-mono text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">EVIDENCE BOARD #04</span>
                    </div>

                    {/* Red Strings Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                        <defs>
                            <filter id="string-shadow">
                                <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
                            </filter>
                        </defs>
                        {connections.map(conn => (
                            <line
                                key={conn.id}
                                x1={`${conn.from.x}%`}
                                y1={`${conn.from.y}%`}
                                x2={`${conn.to.x}%`}
                                y2={`${conn.to.y}%`}
                                stroke="#7f1d1d"
                                strokeWidth="3"
                                strokeLinecap="round"
                                filter="url(#string-shadow)"
                                className="opacity-80"
                            />
                        ))}
                        {connections.map(conn => (
                            <React.Fragment key={`pins-${conn.id}`}>
                                <circle cx={`${conn.from.x}%`} cy={`${conn.from.y}%`} r="5" fill="#991b1b" stroke="#450a0a" strokeWidth="2" />
                            </React.Fragment>
                        ))}
                    </svg>

                    {/* Nodes */}
                    {visibleNodes.map((node, index) => {
                        const isUnlocked = unlockedPeople.includes(node.id) || (node.id === 'father' && unlockedPeople.includes('father'));
                        const pos = nodePositions[node.id] || node.position;

                        return (
                            <motion.div
                                key={node.id}
                                className="absolute z-20 flex flex-col items-center cursor-move"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                drag
                                dragMomentum={false}
                                dragConstraints={containerRef}
                                onDrag={(_, info) => {
                                    const rect = containerRef.current?.getBoundingClientRect();
                                    if (rect) {
                                        const deltaXPercent = (info.delta.x / rect.width) * 100;
                                        const deltaYPercent = (info.delta.y / rect.height) * 100;
                                        updatePosition(node.id,
                                            (nodePositions[node.id]?.x || node.position.x) + deltaXPercent,
                                            (nodePositions[node.id]?.y || node.position.y) + deltaYPercent
                                        );
                                    }
                                }}
                            >
                                <div
                                    className={`
                                        w-36 bg-white p-2 pb-10 shadow-[2px_8px_15px_rgba(0,0,0,0.5)]
                                        transform transition-shadow duration-300 flex flex-col items-center
                                        ${isUnlocked ? 'hover:scale-105 hover:z-50 hover:shadow-2xl' : 'opacity-90 grayscale sepia brightness-75'}
                                    `}
                                    style={{
                                        transform: `rotate(${(index * 19) % 8 - 4}deg)`,
                                    }}
                                >
                                    {/* Push Pin */}
                                    <div className="absolute -top-3 w-4 h-4 rounded-full bg-[#b91c1c] shadow-[2px_4px_6px_rgba(0,0,0,0.5)] border border-[#7f1d1d] z-30" />

                                    {/* Photo Container */}
                                    <div className="w-full aspect-[4/5] bg-[#111] mb-2 relative border-[0.5px] border-gray-400">
                                        {isUnlocked ? (
                                            <>
                                                <img
                                                    src={`https://picsum.photos/seed/${node.id}/300/350`}
                                                    alt={node.name}
                                                    className="w-full h-full object-cover filter contrast-[1.2] grayscale-[0.5] sepia-[0.3]"
                                                />
                                                {/* Coffee Stain Overlay */}
                                                {index % 3 === 0 && <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#5d4037] rounded-full mix-blend-multiply opacity-30 filter blur-md" />}
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                                                <span className="font-serif text-4xl text-white/10">?</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Label */}
                                    <div className="text-center w-full mt-1">
                                        <span className="font-mono font-bold text-black/80 text-[12px] uppercase tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>
                                            {isUnlocked ? node.name : 'UNKNOWN'}
                                        </span>
                                    </div>

                                    {/* Redaction Marker */}
                                    {!isUnlocked && (
                                        <div className="absolute top-1/2 left-2 right-2 h-4 bg-black/90 transform -rotate-2 flex items-center justify-center">
                                            <span className="text-[6px] text-white/50 tracking-[0.4em]">REDACTED</span>
                                        </div>
                                    )}
                                </div>

                                {/* Chalk Role Indicator on Board */}
                                <div className="absolute top-[102%] left-1/2 -translate-x-1/2 w-max pointer-events-none z-0">
                                    <span className="font-handwriting text-white/70 text-sm tracking-widest -rotate-2 block filter drop-shadow-md">
                                        {node.role}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
