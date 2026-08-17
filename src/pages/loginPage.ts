import { Page, Locator, expect, test } from "@playwright/test";
import { Verifier } from "../utils/verifier";
import dotenv from "dotenv";
import path from "path";
import { ActionUtil } from "../utils/actionUtil";

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
  readonly loginUrl: string = process.env.baseUrl!;
  readonly blinkingTexts: Locator;
  readonly termsAndConditionsCheckbox: Locator;
  readonly incorrectCredsErrorMessage: Locator;
  readonly actions: ActionUtil;

  constructor(readonly page: Page) {
    this.actions = new ActionUtil(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.blinkingTexts = page.locator(".blinkingText");
    this.termsAndConditionsCheckbox = page.locator("#terms");
    this.incorrectCredsErrorMessage = page.locator("[style='display: block;']");
  }

  async veryPageIsLoaded() {
    await test.step(`Login in confirmed`, async () => {
      await Verifier.pageHasUrl(
        this.page,
        this.loginUrl + "/angularpractice/shop",
      );
      await Verifier.pageHasTitle(this.page, "ProtoCommerce");
    });
  }

  async navigateToLoginPage() {
    await test.step(`Navigate to URL: ${this.loginUrl + "/loginpagePractise/"}`, async () => {
      await this.actions.navigateToUrl(
        this.page,
        this.loginUrl + "/loginpagePractise/",
      );
    });
  }

  async loginIntoThePage() {
    await this.navigateToLoginPage();
    console.log(
      `Logging in with baseUrl: ${this.loginUrl} and username: ${this.username} and password: ${this.password}`,
    );
    await this.enterUsername(this.username);
    await this.enterPassword(this.password);
    await this.checkTermsAndConditionCheckbox();
    await this.clickSignInButton();
    await this.veryPageIsLoaded();
  }

  async enterUsername(username: string) {
    await test.step(`Enter username as ${username}`, async () => {
      await this.actions.clearField(this.usernameInput);
      await this.actions.typeInInputField(this.usernameInput, username);
    });
  }

  async enterPassword(password: string) {
    await test.step(`Enter password as ${password}`, async () => {
      await this.actions.clearField(this.passwordInput);
      await this.actions.typeInInputField(this.passwordInput, password);
    });
  }

  async clickSignInButton() {
    await test.step(`Click on signin button`, async () => {
      await this.actions.clickElement(this.signInButton);
    });
  }

  async verifyPageTitle(title: string) {
    await test.step(`Verify the title of the page as ${title}`, async () => {
      await Verifier.pageHasTitle(this.page, title);
    });
  }

  async verifyNewTabOpeningOnClickingDifferentlinks(linkText: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.blinkingTexts.filter({ hasText: linkText }).click(),
    ]);
    await Verifier.pageHasUrl(newPage, this.loginUrl + "/documents-request");
    let h1Title: Locator = newPage.locator("h1");
    await Verifier.isVisible(h1Title.getByText("Documents request"));
  }

  async checkTermsAndConditionCheckbox() {
    !(await this.actions.isCheckboxChecked(this.termsAndConditionsCheckbox))
      ? await this.actions.checkTheCheckbox(this.termsAndConditionsCheckbox)
      : console.log("Terms and Conditions already checked");
  }

  async verfiyWrongCredsAlertMessage() {
    await Verifier.isVisible(this.incorrectCredsErrorMessage, 10000);
  }
}
