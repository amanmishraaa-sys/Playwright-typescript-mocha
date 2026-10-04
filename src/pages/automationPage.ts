import { Page, Locator, test } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { FrameLocator } from "@playwright/test";
import { UtilManager } from "../utils/utilManager";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

export class AutomationPage {
  readonly utilManager: UtilManager;
  readonly automationPageUrl: string = process.env.automationPage!;
  readonly alertButton: Locator;
  readonly suggesttionBox: Locator;
  readonly suggesttionBoxDropdown: Locator;
  readonly frame: FrameLocator;
  readonly frameHome: Locator;
  readonly frameAllAccessPlan: Locator;
  readonly frameHeadingAllAccessSubscription: Locator;

  constructor(
    readonly baseurl: string,
    readonly page: Page,
  ) {
    this.utilManager = new UtilManager(this.page);
    this.alertButton = page.locator("#confirmbtn");
    this.suggesttionBox = page.locator("#autocomplete");
    this.suggesttionBoxDropdown = page.locator("li");
    this.frame = page.frameLocator("#courses-iframe");
    this.frameHome = this.frame.locator("a").filter({ hasText: "Home" });
    this.frameAllAccessPlan = this.frame.getByRole("link", {
      name: "All Access Plan",
    });
    this.frameHeadingAllAccessSubscription = this.frame.getByRole("heading", {
      name: "All Access Subscription",
    });
  }

  async navigateToAutomationPage() {
    await this.utilManager.pNUtil.navigateToUrl(
      this.baseurl + this.automationPageUrl,
    );
    await this.verifyPageIsLoaded();
  }

  async verifyPageIsLoaded() {
    await test.step(`Waiting for Automation page to load`, async () => {
      await this.utilManager.verifier.pageHasUrl(
        this.page,
        this.baseurl + this.automationPageUrl,
      );
      await this.utilManager.verifier.pageHasTitle(this.page, "Practice Page");
      await this.page.waitForLoadState("networkidle");
    });
  }

  async checkAndAcceptAlert() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.utilManager.pAUtil.clickElement(this.alertButton);
  }

  async selectGivenTextInSuggesstionBox(typeText: string, targetText: string) {
    await this.utilManager.pAUtil.handleAutoSuggestionBox(
      this.suggesttionBox,
      typeText,
      this.suggesttionBoxDropdown,
      targetText,
    );
  }

  async clickAllAccessPlanInFrame() {
    await test.step(`Clicking on All Access Plan link in frame`, async () => {
      await this.utilManager.pAUtil.clickElement(this.frameAllAccessPlan);
      await this.utilManager.verifier.isVisible(
        this.frameHeadingAllAccessSubscription,
      );
    });
  }
}
