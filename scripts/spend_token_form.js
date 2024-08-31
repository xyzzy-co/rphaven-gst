import { ID } from "./constants.js";
import { forceLog, log } from "./log.js";
import { TEMPLATES } from "./module.js";
import { TokenList } from "./token_list.js";

export class SpendTokenForm extends FormApplication {
  static get defaultOptions() {
    const defaults = super.defaultOptions;

    const overrides = {
      height: "auto",
      id: "spend-token",
      template: TEMPLATES.SPEND_TOKEN_FORM,
      title: "Spend an RPHaven Game Session Token",
      userId: game.userId,
    };

    const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

    return mergedOptions;
  }

  getData(options) {
    return {
      tokens: TokenList.getTokensForUser(options.userId),
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.on(
      "click",
      '[data-action="spend"]',
      this._handleSpendButtonClick.bind(this)
    );
  }

  async _handleSpendButtonClick(event) {
    const clickedElement = $(event.currentTarget);
    const action = clickedElement.data().action;
    const tokenId = clickedElement.parents("[data-token-id]")?.data()?.id;

    log(false, "Button Clicked!", { action, tokenId });

    switch (action) {
      case "spend": {
        await TokenList.spendTokenForUser(userId, tokenId);
        break;
      }

      default:
        forceLog(`invalid action ${action}`);
    }
  }
}
