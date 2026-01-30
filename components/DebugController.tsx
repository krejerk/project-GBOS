
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
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            unlockedPeople: ['father', 'capone', 'nibi', 'conchar', 'dr_reggie'],
            collectedClues: ['chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship'],
            collectedDossierIds: ['julip', 'project'],
            collectedYears: ['year_1971'],
            unlockedNodeIds: ['capone'],
            unlockedArchiveIds: [],
            currentStoryNode: 0,
            systemStability: 84,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 2: Floor 2 - Node 1 Ready
    // Target: Finished investigation of Node 1 (Confessions 1-3 & Archives 1-4). 
    // Gathered ALL keywords. Ready for Jennifer's SECOND special dialogue.
    const setFloor2 = () => {
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning'
            ],
            collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985'],
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship',
                'ohio', 'ritual_case', 'dismemberment_case'
            ],
            collectedDossierIds: ['julip', 'project'],
            unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3'],
            unlockedArchiveIds: ['me_1971', 'oh_1968', 'dc_1967', 'il_1985'],
            currentStoryNode: 0,
            systemStability: 84,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 3: Floor 3 - Node 2 Ready
    // Target: Completed Node 1. Unlocked Confessions 4-7 and Archives 5-7. Collected Wilmer Ribbon.
    // Ready for Jennifer's THIRD special dialogue (Node 2 Logic).
    const setFloor3 = () => {
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning',
                'aw_wilmo', 'martha_diaz'
            ],
            collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990', 'year_1972'],
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship',
                'ohio', 'ritual_case', 'dismemberment_case',
                '1402_old_dominion_rd', 'training_day', 'nevada', 'family_massacre',
                'little_derek_wayne', 'mojave_rest_stop', 'empty_cigarette_pack', 'roanoke', 'blue_rv'
            ],
            collectedDossierIds: ['julip', 'project', 'crime_route_map', 'graywater_beacon'],
            collectedAttachments: ['wilmer_ribbon'],
            unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7'],
            unlockedArchiveIds: ['me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990'],
            currentStoryNode: 1,
            systemStability: 84,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 4: Floor 4 - Node 3 Ready
    // Target: Completed Node 2. Unlocked Confessions 8-11 and Archives 8-10.
    // All relevant keywords used. Ready for Jennifer's FOURTH special dialogue (Node 3 Logic).
    const setFloor4 = () => {
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'morning', 'aw_wilmo', 'martha_diaz',
                'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers', 'boris_smirnov', 'cynthia_miller'
            ],
            collectedYears: [
                'year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990', 'year_1972',
                'year_1973', 'year_1975', 'year_1986', 'year_1982'
            ],
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship',
                'ohio', 'ritual_case', 'dismemberment_case',
                '1402_old_dominion_rd', 'training_day', 'nevada', 'family_massacre',
                'little_derek_wayne', 'mojave_rest_stop', 'empty_cigarette_pack', 'roanoke', 'blue_rv',
                'louisville', 'cincinnati', 'mint_plan', 'el_paso', 'distant_relatives', 'burkesville',
                'klub75_report', 'quantico'
            ],
            collectedDossierIds: ['julip', 'project', 'crime_route_map', 'graywater_beacon'],
            collectedAttachments: ['wilmer_ribbon'],
            unlockedNodeIds: [
                'confession_1', 'confession_2', 'confession_3',
                'confession_4', 'confession_5', 'confession_6', 'confession_7',
                'confession_8', 'confession_9', 'confession_10', 'confession_11'
            ],
            unlockedArchiveIds: [
                'me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990',
                'cin_1973', 'nas_1973', 'ky_1973'
            ],
            currentStoryNode: 2,
            systemStability: 84,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    const setFloor5 = () => {
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            // START OF NODE 4: Only people from previous nodes are unlocked.
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'aw_wilmo', 'martha_diaz',
                'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers',
                'boris_smirnov', 'cynthia_miller', 'jc_penney', 'john_morrissey', 'peter_henderson'
            ],
            // START OF NODE 4: 'year_1974' is NOT here.
            collectedYears: [
                'year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990', 'year_1972',
                'year_1973', 'year_1975', 'year_1986', 'year_1982', 'year_1976', 'year_1965'
            ],
            // START OF NODE 4: Rewards keywords are NOT here.
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship',
                'ohio', 'ritual_case',
                '1402_old_dominion_rd', 'training_day', 'nevada', 'family_massacre',
                'little_derek_wayne', 'mojave_rest_stop', 'empty_cigarette_pack', 'roanoke', 'blue_rv',
                'louisville', 'cincinnati', 'mint_plan', 'distant_relatives', 'burkesville',
            ],
            // Dossier: Only actual folders.
            collectedDossierIds: ['julip', 'project', 'crime_route_map', 'graywater_beacon'],
            collectedAttachments: ['wilmer_ribbon', 'iron_horse_louisville', 'julip_symbol', 'butter_julep_evidence'],
            unlockedNodeIds: [
                'confession_1', 'confession_2', 'confession_3',
                'confession_4', 'confession_5', 'confession_6', 'confession_7',
                'confession_8', 'confession_9', 'confession_10', 'confession_11',
                'confession_12', 'confession_13', 'confession_14', 'confession_15'
            ],
            unlockedArchiveIds: [
                'me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990',
                'cin_1973', 'nas_1973', 'ky_1973',
                'kan_1976', 'kc_1965', 'ia_1976'
            ],
            currentStoryNode: 3,
            systemStability: 84,
            activeNodeId: null
        };
        onSetState(newState);
        setIsOpen(false);
    };

    // PRESET 6: Floor 6 - Node 5 Ready
    // Target: Completed Node 5. Unlocked Confessions 16-19 and Archives 14-16.
    // Collected church image from Easter egg. Ready for Jennifer's Node 5 dialogue.
    const setFloor6 = () => {
        sessionStorage.removeItem('clueLibrary_visited');
        const newState: Partial<GameState> = {
            phase: 'immersion',
            passwordEntered: true,
            // NODE 5 COMPLETE: All people from all nodes unlocked
            unlockedPeople: [
                'father', 'capone', 'nibi', 'conchar', 'dr_reggie',
                'lundgren', 'roger_beebe', 'aw_wilmo', 'martha_diaz',
                'julie', 'the_mother', 'vanessa', 'silas', 'juvell_chambers',
                'boris_smirnov', 'cynthia_miller', 'jc_penney', 'john_morrissey', 'peter_henderson',
                'morning', 'arthur_dawson', 'priest'
            ],
            // NODE 5 COMPLETE: All years from all nodes
            collectedYears: [
                'year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1990', 'year_1972',
                'year_1973', 'year_1975', 'year_1986', 'year_1982', 'year_1976', 'year_1965',
                'year_1974', 'year_1977'
            ],
            // NODE 5 COMPLETE: All clues from all nodes
            collectedClues: [
                'chicago', 'maine', 'small_bank', 'missing', 'twisted_relationship',
                'ohio', 'ritual_case', 'dismemberment_case',
                '1402_old_dominion_rd', 'training_day', 'nevada', 'family_massacre',
                'little_derek_wayne', 'mojave_rest_stop', 'empty_cigarette_pack', 'roanoke', 'blue_rv',
                'louisville', 'cincinnati', 'mint_plan', 'distant_relatives', 'burkesville',
                'dirty_frank', 'recruitment', 'texarkana', 'el_paso', 'priest', 'church'
            ],
            // Dossier: All folders from all nodes
            collectedDossierIds: ['julip', 'project', 'crime_route_map', 'graywater_beacon'],
            // CRITICAL: Include church_visual_residue to trigger Node 5 dialogue
            collectedAttachments: ['wilmer_ribbon', 'iron_horse_louisville', 'julip_symbol', 'butter_julep_evidence', 'richie_id_card', 'church_visual_residue'],
            unlockedNodeIds: [
                'confession_1', 'confession_2', 'confession_3',
                'confession_4', 'confession_5', 'confession_6', 'confession_7',
                'confession_8', 'confession_9', 'confession_10', 'confession_11',
                'confession_12', 'confession_13', 'confession_14', 'confession_15',
                'confession_16', 'confession_17', 'confession_18', 'confession_19'
            ],
            unlockedArchiveIds: [
                'me_1971', 'oh_1968', 'dc_1967', 'il_1985', 'va_1990',
                'cin_1973', 'nas_1973', 'ky_1973',
                'kan_1976', 'kc_1965', 'ia_1976',
                'archive_15', 'archive_16', 'tx_1967'
            ],
            // CRITICAL: Set to 4 (Node 4 complete, Node 5 READY to trigger), not 5
            // This allows detectedNodeId to return 5 and show the red button + Node 5 dialogue
            currentStoryNode: 4,
            systemStability: 84,
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
        ${isOpen ? 'w-64 max-h-[600px] opacity-100' : 'w-12 h-12 opacity-80 hover:opacity-100'}
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

                            {/* Floor 5 - Node 4 Ready */}
                            <button
                                onClick={setFloor5}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">5</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Node 4 Ready</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Confessions 12-15 & Archives 11-13</span>
                                </div>
                            </button>

                            {/* Floor 6 - Node 5 Ready */}
                            <button
                                onClick={setFloor6}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-200 text-xs border border-red-500/30 rounded transition-all group"
                            >
                                <div className="w-4 h-4 rounded-full border border-red-400/50 flex items-center justify-center text-[8px] font-mono">6</div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold">Node 5 Ready</span>
                                    <span className="text-[8px] text-red-400/60 text-left">Confessions 16-19 & Archives 14-16</span>
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
