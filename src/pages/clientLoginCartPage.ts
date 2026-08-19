import dotenv from "dotenv";
import path from "path";
import { Page, Locator } from "@playwright/test";
import { ActionUtil } from "../utils/actionUtil";
import { Verifier } from "../utils/verifier";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginCartPage {
    readonly loginUrl: string = process.env.baseUrl!;
    readonly actions: ActionUtil;
    readonly cartItemNames: Locator;

    constructor(readonly page: Page) {
      this.actions = new ActionUtil(page);
      this.cartItemNames = page.locator('[class="cartSection"] h3');
    }

    async navigateToPageWithToken(token: string){
      await this.page.addInitScript(value => {
        window.localStorage.setItem('token',value);
      }, token);

      await this.actions.navigateToUrl(this.loginUrl+"/client/#/dashboard/cart");
    }

    async validateCartItemNames(productNames: string[]){
      const productNamesRetrived: string[] = await this.cartItemNames.allTextContents();
      console.log(productNamesRetrived);
      await Verifier.stringTypeArrayEquals(productNames,productNamesRetrived);
    }
}