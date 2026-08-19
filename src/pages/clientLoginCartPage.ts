import dotenv from "dotenv";
import path from "path";
import { Page, Locator, test } from "@playwright/test";
import { ActionUtil } from "../utils/actionUtil";
import { Verifier } from "../utils/verifier";
import { ClientLoginPage } from "./clientLoginPage";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginCartPage {
  readonly loginUrl: string = process.env.baseUrl!;
  readonly actions: ActionUtil;
  readonly cartItemNames: Locator;
  readonly signOutButton: Locator;
  readonly clienLoginPage: ClientLoginPage;

  constructor(readonly page: Page) {
    this.actions = new ActionUtil(page);
    this.cartItemNames = page.locator('[class="cartSection"] h3');
    this.signOutButton = page.getByRole("button", { name: " Sign Out" });
    this.clienLoginPage = new ClientLoginPage(page);
  }

  async navigateToPageWithToken(token: string) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);

    await this.actions.navigateToUrl(
      this.loginUrl + "/client/#/dashboard/cart",
    );
  }

  async ClickOnSignOutButton() {
    await test.step(`Logout of the shopping page`, async () => {
      await this.actions.clickElement(this.signOutButton);
      await this.clienLoginPage.verifyPageIsLoaded();
    });
  }

  async validateCartItemNames(productNames: string[]) {
    await test.step(`Verify the product names in the cart`, async () => {
      const productNamesRetrived: string[] =
        await this.cartItemNames.allTextContents();
      console.log(productNamesRetrived);
      await Verifier.stringTypeArrayEquals(productNames, productNamesRetrived);
    });
  }
}
