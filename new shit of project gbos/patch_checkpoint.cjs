const fs = require('fs');
const path = './components/CheckpointManager.tsx';
let content = fs.readFileSync(path, 'utf8');

const chapter9 = `        {
            id: 9,
            title: "CHAPTER 9",
            description: "THE FINAL TRUTH",
            storyNode: 9,
            state: {
                phase: 'immersion',
                passwordEntered: true,
                isClueLibraryOpen: true,
                isTutorialComplete: true,
                tutorialStep: 0,
                unlockedPeople: ['nibi', 'lundgren', 'dr_reggie', 'roger_beebe', 'morning', 'alexei', 'morandi', 'father', 'capone', 'conchar', 'frank_rollins', 'juvell_chambers', 'julie', 'cynthia_miller', 'clement_svirson'],
                collectedYears: ['year_1971', 'year_1968', 'year_1967', 'year_1985', 'year_1976', 'year_1975', 'year_1983', 'year_1974', 'year_1977', 'year_1986', 'year_1999', 'year_1981'],
                collectedClues: [],
                collectedDossierIds: ['personnel_tree', 'julip', 'project', 'crime_route_map', 'graywater_beacon', 'forest_map'],
                unlockedNodeIds: ['confession_1', 'confession_2', 'confession_3', 'confession_4', 'confession_5', 'confession_6', 'confession_7', 'confession_8', 'confession_9', 'confession_10', 'confession_11', 'confession_12', 'confession_13', 'confession_14', 'confession_15', 'confession_16', 'confession_17', 'confession_18', 'confession_19', 'confession_20', 'confession_21', 'confession_22', 'confession_23', 'confession_24', 'confession_25', 'confession_26', 'confession_27', 'confession_28', 'confession_29', 'confession_30', 'confession_31', 'confession_32', 'confession_33'],
                unlockedArchiveIds: ['clipping_01', 'clipping_02', 'clipping_03', 'clipping_04', 'clipping_05', 'clipping_06', 'clipping_07', 'clipping_08', 'clipping_09', 'clipping_10', 'clipping_11', 'clipping_12', 'clipping_13', 'clipping_14', 'clipping_15', 'clipping_16', 'clipping_17', 'clipping_18', 'clipping_19', 'clipping_20', 'clipping_21', 'clipping_22', 'clipping_23'],
                currentStoryNode: 9,
                hasSwitchedPersona: true,
                systemStability: 84,
                activeNodeId: null
            }
        }`;

// Insert after CHAPTER 8
content = content.replace(/(id: 8,\s*title: "CHAPTER 8",[\s\S]*?activeNodeId: null\s*\}\s*\})/, `$1,\n${chapter9}`);

fs.writeFileSync(path, content, 'utf8');
console.log("Added Chapter 9 to CheckpointManager.");
