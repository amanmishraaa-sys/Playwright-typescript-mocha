import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { ActionUtil } from "../utils/actionUtil";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

export class AutomationPage {
  readonly actions: ActionUtil;
  readonly loginUrl: string = process.env.baseUrl!;
  readonly alertButton: Locator;
  readonly suggesttionBox: Locator;
  readonly suggesttionBoxDropdown: Locator;

  constructor(readonly page: Page) {
    this.actions = new ActionUtil(this.page);
    this.alertButton = page.locator("#confirmbtn");
    this.suggesttionBox = page.locator("#autocomplete");
    this.suggesttionBoxDropdown = page.locator("li");
  }

  async navigateToAutomationPage() {
    await this.actions.navigateToUrl(this.loginUrl + "/AutomationPractice/");
  }

  async checkAndAcceptAlert() {
    this.page.on("dialog", (dialog) => dialog.accept());
    await this.actions.clickElement(this.alertButton);
  }

  async selectGivenTextInSuggesstionBox(typeText: string, targetText: string) {
    await this.actions.handleAutoSuggestionBox(
      this.suggesttionBox,
      typeText,
      this.suggesttionBoxDropdown,
      targetText,
    );
  }
}
