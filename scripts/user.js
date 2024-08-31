import { ID } from "./constants.js";
import { SETTINGS } from "./module.js";

export class User {
  static getRpHavenUserId() {
    return game.settings.get(ID, SETTINGS.RPHAVEN_USERNAME);
  }
}
