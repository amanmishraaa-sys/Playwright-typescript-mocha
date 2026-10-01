import { Page, Locator, expect, test } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { pageActionUtil } from "../utils/pageActionUtils";
import { pageNavigationUtil } from "../utils/pageNavigationUtils"
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

  async veryPageIsLoaded() {
    await test.step(`Login in confirmed`, async () => {
      await this.utilManager.verifier.pageHasUrl(
        this.page,
        this.baseurl + this.angularPracticeUrl,
      );
      await this.utilManager.verifier.pageHasTitle(this.page, "ProtoCommerce");
    });
  }

  async navigateToLoginPage() {
    const url: string = this.baseurl + this.loginPageUrl;
    await test.step(`Navigate to URL: ${url}`, async () => {
      await this.utilManager.pNUtil.navigateToUrl(url);
    });
  }

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

  async enterUsername(username: string) {
    await test.step(`Enter username as ${username}`, async () => {
      await this.utilManager.pAUtil.clearField(this.usernameInput);
      await this.utilManager.pAUtil.typeInInputField(this.usernameInput, username);
    });
  }

  async enterPassword(password: string) {
    await test.step(`Enter password as ${password}`, async () => {
      await this.utilManager.pAUtil.clearField(this.passwordInput);
      await this.utilManager.pAUtil.typeInInputField(this.passwordInput, password);
    });
  }

  async clickSignInButton() {
    await test.step(`Click on signin button`, async () => {
      await this.utilManager.pAUtil.clickElement(this.signInButton);
    });
  }

  async verifyPageTitle(title: string) {
    await test.step(`Verify the title of the page as ${title}`, async () => {
      await this.utilManager.verifier.pageHasTitle(this.page, title);
    });
  }

  async verifyNewTabOpeningOnClickingDifferentlinks(linkText: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      await this.utilManager.pAUtil.clickElement(
        this.blinkingTexts.filter({ hasText: linkText }),
      ),
    ]);
    await this.utilManager.verifier.pageHasUrl(newPage, this.baseurl + "/documents-request");
    let h1Title: Locator = newPage.locator("h1");
    await this.utilManager.verifier.isVisible(h1Title.getByText("Documents request"));
  }

  async checkTermsAndConditionCheckbox() {
    !(await this.utilManager.pAUtil.isCheckboxChecked(this.termsAndConditionsCheckbox))
      ? await this.utilManager.pAUtil.checkTheCheckbox(this.termsAndConditionsCheckbox)
      : console.log("Terms and Conditions already checked");
  }

  async verfiyWrongCredsAlertMessage() {
    await this.utilManager.verifier.isVisible(this.incorrectCredsErrorMessage, 10000);
  }
}
