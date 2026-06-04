const fs = require('fs');
const file = 'constants/attachments.ts';
let code = fs.readFileSync(file, 'utf8');

const assignments = {
  'butter_julep_evidence': 'confession_1',
  'fbi_symbol_analysis': 'confession_1',
  'yellow_julep_symbol': 'confession_1',
  'iron_horse_beacon': 'confession_6',
  'car_photo_maine': 'confession_3',
  'car_maine_original': 'confession_3',
  'crime_route_map_v1': 'confession_3',
  'wilmer_ribbon': 'clipping_05',
  'iron_horse_louisville': 'confession_8',
  'crime_route_map_v2': 'confession_8',
  'car_photo_newmexico': 'confession_10',
  'car_newmexico_original': 'confession_10',
  'crime_route_map_v3': 'confession_11',
  'jane_doe_1977': 'confession_14',
  'crime_route_map_v4': 'confession_14',
  'record_of_accounts': 'confession_16',
  'richie_id_card': 'confession_17',
  'church_visual_residue': 'confession_19',
  'crime_route_map_v5': 'confession_19',
  'laguna_beach_visual_residue': 'confession_28',
  'felipe_maldonado_poster': 'confession_29',
  'crime_route_map_v6': 'confession_29',
  'william_dawson_pendant': 'confession_30',
  'libby_ticket': 'confession_31',
  'libby_convergence_map': 'confession_31',
  'libby_forest_map_residue': 'confession_31',
  'robert_capone_wanted_poster': 'confession_33',
  'capone_alice_meeting': 'confession_33',
  'creekspring_award_ceremony': 'confession_33',
  'death_report': 'confession_33',
  'confession_31_residue_png': 'confession_31',
  'confession_31_residue_jpg': 'confession_31',
  'confession_32_vanessa_sketch': 'confession_32'
};

for (const [id, src] of Object.entries(assignments)) {
  const regex = new RegExp(`('${id}': \\{[\\s\\S]*?)(parentId: '[^']+')([\\s\\S]*?\\})`);
  code = code.replace(regex, `$1$2,\n    unlockSource: '${src}'$3`);
}

fs.writeFileSync(file, code);
console.log("Patched attachments.ts successfully.");
