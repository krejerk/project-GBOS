import fs from 'fs';

const reg = fs.readFileSync('constants/registry.ts', 'utf8');

const keyReg = reg.match(/export const KEYWORD_REGISTRY: Record<string, \{[^}]*\}> = (\{[\s\S]*?\});/);
if (keyReg) {
    console.log("KEYWORD_REGISTRY found, size:", keyReg[1].length);
    const map = eval('(' + keyReg[1] + ')');
    console.log("albuquerque in KEYWORD_REGISTRY:", map['albuquerque']?.chapter);
    console.log("chemist_lover in KEYWORD_REGISTRY:", map['chemist_lover']?.chapter);
    console.log("laguna_beach in KEYWORD_REGISTRY:", map['laguna_beach']?.chapter);
} else {
    console.log("KEYWORD_REGISTRY NOT FOUND in registry.ts");
}
