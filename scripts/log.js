import { ID } from "./constants.js";

export function log(...args) {
  const shouldLog = game.modules
    ?.get("_dev-mode")
    ?.api?.getPackageDebugValue(ID);

  if (shouldLog) {
    forceLog(args);
  }
}

export function forceLog(...args) {
  console.log(`[${ID}]`, ...args);
}
