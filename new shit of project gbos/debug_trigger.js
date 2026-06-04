import { UNLOCKS_REGISTRY } from './constants/registry.ts';

for (const [id, entry] of Object.entries(UNLOCKS_REGISTRY)) {
  if (entry.keywords.includes("santa_barbara") || entry.keywords.includes("closing_the_net")) {
    console.log(id, entry.keywords);
  }
}
