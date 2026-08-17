import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { ActionUtil } from "../utils/actionUtil";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

export class AutomationPage {
  readonly actions: ActionUtil;
  readonly loginUrl: string = process.env.baseUrl!;
  readonly alertButton: Locator;
  constructor(readonly page: Page) {
    this.alertButton = page.locator("#confirmbtn");
    this.actions = new ActionUtil(this.page);
  }

  async navigateToAutomationPage() {
    await this.actions.navigateToUrl(
      this.page,
      this.loginUrl + "/AutomationPractice/",
    );
  }

  async checkAndAcceptAlert() {
    this.page.on("dialog", (dialog) => dialog.accept());
    await this.actions.clickElement(this.alertButton);
  }
}
