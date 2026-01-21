
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

    // PRESET 3: Floor 3 - Node 2 Ready
    // Target: Completed Node 1. Unlocked Confessions 4-7 and Archives 5-7. Collected Wilmer Ribbon.
    // Ready for Jennifer's THIRD special dialogue (Node 2 Logic).
    const setFloor3 = () => {
        // RESET VISITED STATE: Ensure Jennifer's Node 2 dialogue triggers again
        sessionStorage.removeItem('clueLibrary_visited');

        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,

            // Unlocked People: Adds anyone found in Node 2 content (if any)
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning',
                'aw_wilmo' // Found in Clipping 7
            ],

            collectedClues: [
                // Previous
                'chicago', 'maine', 'small_bank', 'missing', 'relationship',
                'ohio', 'ritual_case', 'family_massacre', 'dismemberment_case',
                'year_1971', 'year_1968', 'year_1967', 'year_1985',

                // Node 2 New Keywords
                '1402_old_dominion_rd', 'training_day',
                'nevada',
                'mojave_rest_stop', 'empty_cigarette_pack',
                'roanoke', 'twisted_relationship',
                'year_1990',
                'blue_rv', // CRITICAL: REQUIRED FOR V2 MAP UPDATE (Louisville)

                // CRITICAL: Ensure Map is collected when skipping Node 1
                'crime_route_map'
            ],

            // Dossier
            collectedDossierIds: ['julip', 'project', 'crime_route_map'],

            // Attachments - Crucial for Node 2 Check
            collectedAttachments: ['wilmer_ribbon'],

            // Years
            collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990'],

            // Unlocked Content: Confessions 1-7 & Archives 5-7 (and previous)
            unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7'],
            unlockedArchiveIds: ['me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990'],

            currentStoryNode: 1, // Ready to trigger Node 2 completion logic (checkNode2Completion returns true if conditions met && currentStoryNode === 1)
            activeNodeId: null
        };

        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 4: Floor 4 - Node 3 Ready
    // Target: Completed Node 2. Unlocked Confessions 8-11 and Archives 8-10.
    // All relevant keywords used. Ready for Jennifer's FOURTH special dialogue (Node 3 Logic).
    const setFloor4 = () => {
        // RESET VISITED STATE: Ensure Jennifer's Node 3 dialogue triggers again
        sessionStorage.removeItem('clueLibrary_visited');

        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,

            // Unlocked People: All from previous nodes + new ones from Node 3
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning', 'aw_wilmo',
                'martha_diaz', 'julie', 'the_mother', 'vanessa', 'silas',
                'juvell_chambers', 'boris_smirnov'
            ],

            collectedClues: [
                // Previous from Node 1 & 2
                'chicago', 'maine', 'small_bank', 'missing', 'relationship',
                'ohio', 'ritual_case', 'family_massacre', 'dismemberment_case',
                '1402_old_dominion_rd', 'training_day',
                'nevada',
                'mojave_rest_stop', 'empty_cigarette_pack',
                'roanoke', 'twisted_relationship',
                'blue_rv', 'crime_route_map',

                'louisville', 'mint_plan', 'cincinnati',
                'el_paso', 'burkesville', 'distant_relatives'
                // Note: klub75_report and quantico are consumed when triggering confession_11
            ],

            // Dossier
            collectedDossierIds: ['julip', 'project', 'crime_route_map'],

            // Attachments
            collectedAttachments: ['wilmer_ribbon'],

            // Years
            collectedYears: [
                'year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990',
                'year_1982', 'year_1973', 'year_1975'
            ],

            // Unlocked Content: Confessions 1-11 & Archives 1-10
            unlockedNodeIds: [
                'confession_1', 'confession_2', 'confession_3',
                'confession_4', 'confession_5', 'confession_6', 'confession_7',
                'confession_8', 'confession_9', 'confession_10', 'confession_11'
            ],
            unlockedArchiveIds: [
                'me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990',
                'cin_1973', 'nas_1973', 'ky_1973'
            ],

            currentStoryNode: 2, // Ready to trigger Node 3 completion logic
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

                            {/* Floor 3 - Node 2 Ready */}
                            <button
                                onClick={setFloor3}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">3</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Node 2 Ready</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Confessions 4-7 & Archives Unlocked</span>
                                </div>
                            </button>

                            {/* Floor 4 - Node 3 Ready */}
                            <button
                                onClick={setFloor4}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">4</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Node 3 Ready</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Confessions 8-11 & Archives 8-10</span>
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
