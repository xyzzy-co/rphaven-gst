import { FLAGS, ID } from "./constants.js";

// Manage the mapping between an RP Haven user ID and a Foundry user ID.
export class User {
  static getRpHavenUserId(userId) {
    return game.users.get(userId)?.getFlag(ID, FLAGS.USER_ID);
  }

  static setRpHavenUserId(userId, rpHavenUserId) {
    game.users.get(userId)?.setFlag(ID, FLAGS.USER_ID, rpHavenUserId);
  }
}
