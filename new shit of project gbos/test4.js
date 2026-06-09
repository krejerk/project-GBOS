global.window = { innerWidth: 1920, innerHeight: 1080 };
import('./constants/registry.ts').then(mod => {
  console.log("laguna_beach:", mod.KEYWORD_REGISTRY['laguna_beach']?.chapter);
});
