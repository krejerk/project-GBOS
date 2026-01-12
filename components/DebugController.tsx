
import React, { useState } from 'react';
import { GameState } from '../types';
import { Save, ChevronUp, ChevronDown, FastForward } from 'lucide-react';

interface DebugControllerProps {
    onSetState: (newState: Partial<GameState>) => void;
}

export const DebugController: React.FC<DebugControllerProps> = ({ onSetState }) => {
    const [isOpen, setIsOpen] = useState(false);

    // PRESET 1: Floor 1 - Main Interface Start
    // Target: Just finished Briefing. Has initial clues. Ready to start investigation.
    const setFloor1 = () => {
        // RESET VISITED STATE: Ensure Jennifer's intro dialogue triggers again
        sessionStorage.removeItem('clueLibrary_visited');

        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,

            // Unlock initial people
            unlockedPeople: ['father', 'capone', 'nibi', 'conchar', 'dr_reggie'],

            // Initial Keywords for search (Briefing content)
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing',
                'relationship'
                // Removed 'confession' (not a searchable keyword), persons, and years
            ],

            // NO Dossier items yet (except maybe initial empty state or basic profile if intended, but keeping clean for "start")
            // User requested: "Intro keywords" includes julip and project in dossier
            collectedDossierIds: ['julip', 'project', 'julip_symbol', 'project_symbol'],

            // Years to match legacy Quick Start
            collectedYears: ['year_1968', 'year_1971'],

            // Initial Unlocked Content (Just Archive 1985 & Confessions?) 
            // User said "collected all intro keywords", implies standard start state
            unlockedNodeIds: ['capone'],
            unlockedArchiveIds: [], // Or maybe some initial archives if unlocked by briefing? adhering to standard start

            currentStoryNode: 0,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 2: Floor 2 - Node 1 Ready
    // Target: Finished investigation of Node 1 (Confessions 1-3 & Archives 1-4). 
    // Gathered ALL keywords. Ready for Jennifer's SECOND special dialogue.
    const setFloor2 = () => {
        // RESET VISITED STATE: Ensure Jennifer's Node 1 dialogue triggers again
        sessionStorage.removeItem('clueLibrary_visited');

        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,

            // Unlocked People: Initial 5 + those found in Node 1 content
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning'
            ],

            collectedClues: [
                // Intro / Base
                'chicago', 'maine', 'small_bank', 'missing',
                'relationship',

                // Confession 2
                'ohio', 'ritual_case',

                // Confession 3
                // (No concept keywords in Confession 3, only Person/Year)

                // Archive Keywords (found within unlocked archives)
                'family_massacre', 'dismemberment_case'
                // Removed 'headdress' (dirty data), persons, and years
            ],

            // Floor 2 adds the Dossier items
            collectedDossierIds: ['julip', 'project', 'julip_symbol', 'project_symbol'],

            // Collected Years (Crucial for Archives)
            collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985'],

            // Unlocked Content: Confessions 1-3 & Archives 1-4
            unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3'],
            unlockedArchiveIds: ['me_1971', 'oh_1968', 'dc_1967', 'il_1985'],

            currentStoryNode: 0, // Ready to trigger Node 1 completion logic via Jennifer
            activeNodeId: null
        };

        onSetState(newState);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-4 left-4 z-[9999] flex flex-col items-start pointer-events-none">
            <div className={`
        pointer-events-auto bg-black/90 border border-red-500/30 rounded-lg backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.2)]
        transition-all duration-300 overflow-hidden flex flex-col
        ${isOpen ? 'w-64 max-h-96 opacity-100' : 'w-12 h-12 opacity-80 hover:opacity-100'}
      `}>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full p-3 flex items-center justify-center transition-colors ${isOpen ? 'border-b border-red-500/20 hover:bg-red-500/10' : 'h-full hover:bg-red-500/20'}`}
                >
                    {isOpen ? (
                        <div className="flex items-center gap-2 w-full px-2">
                            <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-widest flex-1 text-left">Debug Save</span>
                            <ChevronDown size={14} className="text-red-400" />
                        </div>
                    ) : (
                        <Save size={18} className="text-red-400" />
                    )}
                </button>

                {/* Content Panel */}
                {isOpen && (
                    <div className="p-4 space-y-4 overflow-y-auto">
                        <div className="space-y-2">
                            <label className="text-[10px] text-red-500/70 font-mono uppercase tracking-widest block">
                                Floor Selection
                            </label>

                            {/* Floor 1 */}
                            <button
                                onClick={setFloor1}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">1</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Main Interface Start</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Briefing Complete, No Progress</span>
                                </div>
                            </button>

                            {/* Floor 2 */}
                            <button
                                onClick={setFloor2}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">2</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Node 1 Ready</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Investigation Complete, Pre-Dialogue</span>
                                </div>
                            </button>
                        </div>

                        <div className="pt-2 border-t border-red-500/20">
                            <p className="text-[8px] text-red-500/40 font-mono text-center">
                                SELECT DESTINATION
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
