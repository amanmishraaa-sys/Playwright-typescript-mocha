import { Page, Locator, test } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { ActionUtil } from "../utils/actionUtil";
import { Verifier } from "../utils/verifier";
import { FrameLocator } from "@playwright/test";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

export class AutomationPage {
  readonly actions: ActionUtil;
  readonly baseurl: string;
  readonly automationPageUrl: string = process.env.automationPage!;
  readonly alertButton: Locator;
  readonly suggesttionBox: Locator;
  readonly suggesttionBoxDropdown: Locator;
  readonly frame: FrameLocator;
  readonly frameHome: Locator;
  readonly frameAllAccessPlan: Locator;
  readonly frameHeadingAllAccessSubscription: Locator;

  constructor(
    readonly url: string,
    readonly page: Page,
  ) {
    this.baseurl = url;
    this.actions = new ActionUtil(this.page);
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
    await this.actions.navigateToUrl(this.baseurl + this.automationPageUrl);
    await this.verifyPageIsLoaded();
  }

  async verifyPageIsLoaded() {
    await test.step(`Waiting for Automation page to load`, async () => {
      await Verifier.pageHasUrl(
        this.page,
        this.baseurl + this.automationPageUrl,
      );
      await Verifier.pageHasTitle(this.page, "Practice Page");
      await this.page.waitForLoadState("networkidle");
    });
  }

  async checkAndAcceptAlert() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
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

  async clickAllAccessPlanInFrame() {
    await test.step(`Clicking on All Access Plan link in frame`, async () => {
      await this.actions.clickElement(this.frameAllAccessPlan);
      await Verifier.isVisible(this.frameHeadingAllAccessSubscription);
    });
  }
}
