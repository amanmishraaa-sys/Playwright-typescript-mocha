import { Locator, Page, test } from "@playwright/test";
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
  readonly registrationButton: Locator;

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
    this.registrationButton = page.getByText('Register here', { exact: true });
  }

  /**
   * To navigate to the Client Login page.
   */
  async navigateToPage() {
    await this.utilManager.pNUtil.navigateToUrl(
      this.baseurl + this.loginPageUrl,
    );
    await this.utilManager.pAUtil.waitForPageToLoad();
  }

  /**
   * To verify that the Client Login page is loaded.
   */
  async verifyPageIsLoaded() {
    await test.step(`Verify that the client Login page is loaded`, async () => {
      await this.utilManager.verifier.isVisible(this.titleOfThePage);
    });
  }

  /**
   * To enter a username in the username field.
   * @param text - The username to be entered.
   */
  async enterUsername(text: string) {
    await this.utilManager.pAUtil.typeInInputField(this.usernameField, text);
  }

  /**
   * To verify the content of the username text input field.
   * @param text - The expected username.
   */
  async verifyUsernameTextInput(text: string) {
    await this.utilManager.pAUtil.validateFieldContent(
      this.usernameField,
      text,
    );
  }

  /**
   * To enter a password in the password field.
   * @param text - The password to be entered.
   */
  async enterPassword(text: string) {
    await this.utilManager.pAUtil.typeInInputField(this.passwordField, text);
  }

  /**
   * To verify the content of the password text input field.
   * @param text - The expected password.
   */
  async verifyPasswordTextInput(text: string) {
    await this.utilManager.pAUtil.validateFieldContent(
      this.passwordField,
      text,
    );
  }

  /**
   * To click on the login button.
   */
  async clickOnLoginButton() {
    await this.utilManager.pAUtil.clickElement(this.loginButton);
  }

  /**
   * To verify the visibility of the wrong password error message.
   */
  async verifyVisibilityOfWrongErrorMessage() {
    await this.utilManager.verifier.isVisible(this.wrongPasswordErrorMessage);
  }

  /**
   * To verify the visibility of the invalid email error message.
   */
  async verifyVisibilityOfInvalidEmailErrorMessage() {
    await this.utilManager.verifier.isVisible(this.invalidEmailErrorMessage);
  }

  /**
   * Click on the register button.
   */
  async clickOnRegistrationButton() {
    await this.utilManager.pAUtil.clickElement(this.registrationButton);
  }
}
