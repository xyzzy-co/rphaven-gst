import { FLAGS, ID } from "./constants.js";
import { User } from "./user.js";

export class TokenList {
  // get the available tokens for the given user.
  static getTokensForUser(userId) {
    const rpHavenUserId = User.getRpHavenUserId(userId);
    // TODO: make a query against the external API to get the latest tokens for the user.
    return [];
  }

  // spend a token for the given user.
  static spendTokenForUser(userId) {
    // TODO: server call and then...
    game.users.get(userId)?.setFlag(ID, FLAGS.SPENT_TOKEN, true);
  }

  // has the user spent a token this session?
  static hasUserSpentToken(userId) {
    return game.users.get(userId)?.getFlag(ID, FLAGS.SPENT_TOKEN);
  }
}
