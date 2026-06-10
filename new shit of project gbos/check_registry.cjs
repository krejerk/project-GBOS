const fs = require('fs');

const cluesStr = "humphrey_county, assault_on_police, precinct_4, tucson_shooting, jane_doe, year_1968, ohio, ritual_case, 1402_old_dominion_rd, family_massacre, dismemberment_case, julip, year_1967, reporter, mill_valley, woodland_depths, fake_smoke_bomb, blind_zone_camp, dry_gully, appalachia, bait, meeting, view_capone_alice_meeting, texarkana, philadelphia, morning, denver_suburb, police_killing, mojave_rest_stop, empty_cigarette_pack, aw_wilmo, year_1990, klub75_report, quantico, burkesville, cincinnati, mint_plan, east_12th_st, execution_room, st_louis, maggots, , maine, small_bank, chicago, missing, project, dirty_frank, lundgren, roger_beebe, year_1985, year_1971, dr_reggie, nibi, twisted_relationship, year_1972, graywater_beacon, roanoke, martha_diaz, nevada, little_derek_wayne, year_1973, julie, distant_relatives, juvell_chambers, recruitment, boris_smirnov, john_morrissey, year_1965, year_1976, jc_penney, peter_henderson, new_plan, davenport, extract_church_residue, richie_dreyfuss, year_1977, arthur_dawson, record_of_accounts, naked_root, alexei, laguna_beach, humiliation_ritual, santa_barbara, closing_the_net, pow_camp, redwood_forest, amalekite_protocol, santa_fe, bonny_and_clyde, albuquerque, morandi, chemist_lover, portland, achilles_heel, year_1975, felipe_maldonado, gore_and_levy, year_1983, capone, frank_rollins, mandan, alexander_mengel, clement_svirson, year_1981, port_jefferson, gbos, training_day, view_iron_horse_record, blue_rv, vampire, year_1974, el_paso, priest, reboot_command, libby_town, extract_visual_node_7, holy_springs, photo, death_report, year_1999, cynthia_miller, van_horn_checkpoint, intercept";
const clues = cluesStr.split(", ").filter(x => x);

let registryContent = fs.readFileSync('./constants/registry.ts', 'utf8');
const chapters = [0,1,2,3,4,5,6,7,8,9];
for (let i of chapters) {
  const content = fs.readFileSync(`./constants/chapters/chapter${i}.ts`, 'utf8');
  registryContent += content;
}
registryContent += fs.readFileSync('./constants/chapters/identity.ts', 'utf8');

const missing = [];
for (const clue of clues) {
  const regex = new RegExp(`['"]?${clue}['"]?:\\s*{`);
  if (!registryContent.match(regex)) {
    missing.push(clue);
  }
}

console.log("Missing from registry:", missing);
