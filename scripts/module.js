import { ID } from "./constants.js";
import { log } from "./log.js";
import { SpendTokenForm } from "./spend_token_form.js";
import { TokenList } from "./token_list.js";

export const TEMPLATES = {
  SPEND_TOKEN_FORM: `modules/${ID}/templates/spend_token_form.hbs`,
};

log("in module.js");

class Module {
  static initialize() {
    this.spendTokenForm = new SpendTokenForm();
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
  // TODO: show this for the GM for all users?

  // find the element which has our logged in user's id
  const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`);

  if (TokenList.hasUserSpentToken(game.userId)) {
    const tooltip = game.i18n.localize("MODULE.spent-title");

    // insert an image showing the user has spent the token
    loggedInUserListItem.append(
      `<span class='rphaven-gst-token-icon' title='${tooltip}'>` +
        `<i class='fas fa-money-bill-alt'></i>` +
        `</span>`
    );
  } else {
    const tooltip = game.i18n.localize("MODULE.not-spent-title");
    // insert a button at the end of this element which will allow the player to spend the token
    loggedInUserListItem.append(
      `<button type='button' class='rphaven-gst-token-icon' title='${tooltip}'>` +
        `<i class='far fa-money-bill-alt'></i>` +
        `</button>`
    );

    html.on("click", ".rphaven-gst-token-icon", (event) => {
      log("attempt to spend a token");

      const userId = $(event.currentTarget)
        .parents("[data-user-id]")
        ?.data()?.userId;

      Module.spendTokenForm.render(true, { userId });
    });
  }
});
