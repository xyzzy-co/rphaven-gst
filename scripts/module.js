import { ID } from "./constants.js";
import { log } from "./log.js";
import { SpendTokenForm } from "./spend_token_form.js";
import { TokenList } from "./token_list.js";

export const TEMPLATES = {
  SPEND_TOKEN_FORM: `modules/${ID}/templates/spend_token_form.hbs`,
};

export const SETTINGS = {
  RPHAVEN_USERNAME: "rphaven-username",
};

log("in module.js");

class Module {
  static initialize() {
    this.spendTokenForm = new SpendTokenForm();

    game.settings.register(ID, SETTINGS.RPHAVEN_USERNAME, {
      name: `MODULE.settings.${SETTINGS.RPHAVEN_USERNAME}.name`,
      default: "",
      type: String,
      scope: "client",
      config: true,
      hint: `MODULE.settings.${SETTINGS.RPHAVEN_USERNAME}.hint`,
    });
  }
}

Hooks.once("init", async function () {
  log("module.js ::init");
  Module.initialize();
});

Hooks.once("ready", async function () {
  log("module.js ::ready");
});

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  forceLog("registering with dev mode");
  registerPackageDebugFlag(ID);
});

Hooks.on("renderPlayerList", (_playerList, html) => {
  // TODO: show a different icon if the username hasn't been set?

  if (game.user.isGM) {
    game.users.players.forEach((player) => {
      const loggedInUserListItem = html.find(`[data-user-id="${player.id}"]`);
      _appendTokenToUserListItem(loggedInUserListItem, player.id);
    });
  } else {
    // find the element which has our logged in user's id
    const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`);
    _appendTokenToUserListItem(loggedInUserListItem, game.userId);

    // players can click on their own icon to spend the token.
    html.on("click", ".rphaven-gst-token-icon", (event) => {
      log("attempt to spend a token");

      const userId = $(event.currentTarget)
        .parents("[data-user-id]")
        ?.data()?.userId;

      Module.spendTokenForm.render(true, { userId });
    });
  }
});

function _appendTokenToUserListItem(userListItem, userId) {
  if (TokenList.hasUserSpentToken(userId)) {
    const tooltip = game.i18n.localize("MODULE.spent-title");

    // insert an image showing the user has spent the token
    userListItem.append(
      `<span class='rphaven-gst-token-icon' title='${tooltip}'>` +
        `<i class='fas fa-money-bill-alt'></i>` +
        `</span>`
    );
  } else {
    const tooltip = game.i18n.localize("MODULE.not-spent-title");

    // insert a button at the end of this element which will allow the player to spend the token
    userListItem.append(
      `<button type='button' class='rphaven-gst-token-icon' title='${tooltip}'>` +
        `<i class='far fa-money-bill-alt'></i>` +
        `</button>`
    );
  }
}
