import { Locator, Page, test } from "@playwright/test";
import { Verifier } from "../utils/verifier";

export class ClientLoginPage {
  readonly titleOfThePage: Locator;

  constructor(readonly page: Page) {
    this.titleOfThePage = page
      .locator("h1")
      .filter({ hasText: "Practice Website for " });
  }

  async verifyPageIsLoaded() {
    await test.step(`Verify that the client Login page is loaded`, async () => {
      await Verifier.isVisible(this.titleOfThePage);
    });
  }
}
