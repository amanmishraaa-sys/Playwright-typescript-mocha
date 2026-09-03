import { Locator, Page, test } from "@playwright/test";
import { Verifier } from "../utils/verifier";
import { ActionUtil } from "../utils/actionUtil";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginPage {
  readonly baseurl: string;
  readonly loginPageUrl: string = process.env.clientLoginPage!;
  readonly actions: ActionUtil;
  readonly titleOfThePage: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;

  constructor(
    readonly url: string,
    readonly page: Page,
  ) {
    this.baseurl = url;
    this.actions = new ActionUtil(page);
    this.titleOfThePage = page
      .locator("h1")
      .filter({ hasText: "Practice Website for " });
    this.usernameField = this.page.locator("#userEmail");
    this.passwordField = this.page.locator("#userPassword");
  }

  async navigateToPage() {
    await this.actions.navigateToUrl(this.baseurl + this.loginPageUrl);
    await this.actions.waitForPageToLoad();
  }

  async verifyPageIsLoaded() {
    await test.step(`Verify that the client Login page is loaded`, async () => {
      await Verifier.isVisible(this.titleOfThePage);
    });
  }

  async enterUsername(text: string) {
    await this.actions.typeInInputField(this.usernameField, text);
  }

  async verifyUsernameTextInput(text: string) {
    await this.actions.validateFieldContent(this.usernameField, text);
  }

  async enterPassword(text: string) {
    await this.actions.typeInInputField(this.passwordField, text);
  }

  async verifyPasswordTextInput(text: string) {
    await this.actions.validateFieldContent(this.passwordField, text);
  }
}
