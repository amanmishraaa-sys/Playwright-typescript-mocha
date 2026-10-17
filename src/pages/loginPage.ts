import { Page, Locator, expect, test } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { UtilManager } from "../utils/utilManager";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly username: string = process.env.username!;
  readonly password: string = process.env.password!;
  readonly angularPracticeUrl: string = process.env.angularPractice!;
  readonly loginPageUrl: string = process.env.loginPage!;
  readonly blinkingTexts: Locator;
  readonly termsAndConditionsCheckbox: Locator;
  readonly incorrectCredsErrorMessage: Locator;
  readonly utilManager: UtilManager;

  constructor(
    readonly baseurl: string,
    readonly page: Page,
  ) {
    this.utilManager = new UtilManager(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.blinkingTexts = page.locator(".blinkingText");
    this.termsAndConditionsCheckbox = page.locator("#terms");
    this.incorrectCredsErrorMessage = page.locator("[style='display: block;']");
  }

  /**
   * To verify that the Login page has loaded.
   */
  async veryPageIsLoaded() {
    await test.step(`Login in confirmed`, async () => {
      await this.utilManager.verifier.pageHasUrl(
        this.page,
        this.baseurl + this.angularPracticeUrl,
      );
      await this.utilManager.verifier.pageHasTitle(this.page, "ProtoCommerce");
    });
  }

  /**
   * To navigate to the Login page.
   */
  async navigateToLoginPage() {
    const url: string = this.baseurl + this.loginPageUrl;
    await test.step(`Navigate to URL: ${url}`, async () => {
      await this.utilManager.pNUtil.navigateToUrl(url);
    });
  }

  /**
   * To Login into the page.
   */
  async loginIntoThePage() {
    await this.navigateToLoginPage();
    console.log(
      `Logging in with baseUrl: ${this.baseurl + this.loginPageUrl} and username: ${this.username} and password: ${this.password}`,
    );
    await this.enterUsername(this.username);
    await this.enterPassword(this.password);
    await this.checkTermsAndConditionCheckbox();
    await this.clickSignInButton();
    await this.veryPageIsLoaded();
  }

  /**
   * To fill the username field.
   * @param username - The username to be entered in the username field.
   */
  async enterUsername(username: string) {
    await test.step(`Enter username as ${username}`, async () => {
      await this.utilManager.pAUtil.clearField(this.usernameInput);
      await this.utilManager.pAUtil.typeInInputField(
        this.usernameInput,
        username,
      );
    });
  }

  /**
   * To fill the password field.
   * @param password - The password to be entered in the password field.
   */
  async enterPassword(password: string) {
    await test.step(`Enter password as ${password}`, async () => {
      await this.utilManager.pAUtil.clearField(this.passwordInput);
      await this.utilManager.pAUtil.typeInInputField(
        this.passwordInput,
        password,
      );
    });
  }

  /**
   * To click the Sign In button.
   */
  async clickSignInButton() {
    await test.step(`Click on signin button`, async () => {
      await this.utilManager.pAUtil.clickElement(this.signInButton);
    });
  }

  /**
   * To verify the title of the page.
   * @param title - The title to be verified.
   */
  async verifyPageTitle(title: string) {
    await test.step(`Verify the title of the page as ${title}`, async () => {
      await this.utilManager.verifier.pageHasTitle(this.page, title);
    });
  }

  /**
   * To verify the new tab opening on clicking different links.
   * @param linkText - The text of the link to be clicked.
   */
  async verifyNewTabOpeningOnClickingDifferentlinks(linkText: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      await this.utilManager.pAUtil.clickElement(
        this.blinkingTexts.filter({ hasText: linkText }),
      ),
    ]);
    await this.utilManager.verifier.pageHasUrl(
      newPage,
      this.baseurl + "/documents-request",
    );
    let h1Title: Locator = newPage.locator("h1");
    await this.utilManager.verifier.isVisible(
      h1Title.getByText("Documents request"),
    );
  }

  /**
   * To check the Terms and Conditions checkbox.
   */
  async checkTermsAndConditionCheckbox() {
    !(await this.utilManager.pAUtil.isCheckboxChecked(
      this.termsAndConditionsCheckbox,
    ))
      ? await this.utilManager.pAUtil.checkTheCheckbox(
          this.termsAndConditionsCheckbox,
        )
      : console.log("Terms and Conditions already checked");
  }

  /**
   * To verify the wrong credentials alert message.
   */
  async verfiyWrongCredsAlertMessage() {
    await this.utilManager.verifier.isVisible(
      this.incorrectCredsErrorMessage,
      10000,
    );
  }
}
