import { Locator, Page, test } from "@playwright/test";
import { Verifier } from "../utils/verifier";
import { pageActionUtil } from "../utils/pageActionUtils";
import { pageNavigationUtil } from "../utils/pageNavigationUtils";
import dotenv from "dotenv";
import path from "path";
import { UtilManager } from "../utils/utilManager";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginPage {
  readonly loginPageUrl: string = process.env.clientLoginPage!;
  readonly utilManager: UtilManager;
  readonly titleOfThePage: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly wrongPasswordErrorMessage: Locator;
  readonly invalidEmailErrorMessage: Locator;

  constructor(
    readonly baseurl: string,
    readonly page: Page,
  ) {
    this.utilManager = new UtilManager(this.page);
    this.titleOfThePage = page
      .locator("h1")
      .filter({ hasText: "Practice Website for " });
    this.usernameField = this.page.locator("#userEmail");
    this.passwordField = this.page.locator("#userPassword");
    this.loginButton = this.page.locator("#login");
    this.wrongPasswordErrorMessage = this.page
      .getByRole("alert")
      .filter({ hasText: " Incorrect email or password. " });
    this.invalidEmailErrorMessage = this.page
      .locator(".invalid-feedback")
      .filter({ hasText: "*Enter Valid Email" });
  }

  async navigateToPage() {
    await this.utilManager.pNUtil.navigateToUrl(
      this.baseurl + this.loginPageUrl,
    );
    await this.utilManager.pAUtil.waitForPageToLoad();
  }

  async verifyPageIsLoaded() {
    await test.step(`Verify that the client Login page is loaded`, async () => {
      await this.utilManager.verifier.isVisible(this.titleOfThePage);
    });
  }

  async enterUsername(text: string) {
    await this.utilManager.pAUtil.typeInInputField(this.usernameField, text);
  }

  async verifyUsernameTextInput(text: string) {
    await this.utilManager.pAUtil.validateFieldContent(
      this.usernameField,
      text,
    );
  }

  async enterPassword(text: string) {
    await this.utilManager.pAUtil.typeInInputField(this.passwordField, text);
  }

  async verifyPasswordTextInput(text: string) {
    await this.utilManager.pAUtil.validateFieldContent(
      this.passwordField,
      text,
    );
  }

  async clickOnLoginButton() {
    await this.utilManager.pAUtil.clickElement(this.loginButton);
  }

  async verifyVisibilityOfWrongErrorMessage() {
    await this.utilManager.verifier.isVisible(this.wrongPasswordErrorMessage);
  }

  async verifyVisibilityOfInvalidEmailErrorMessage() {
    await this.utilManager.verifier.isVisible(this.invalidEmailErrorMessage);
  }
}
