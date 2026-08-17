import { Page, Locator, test } from "@playwright/test";

export class ActionUtil {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async clickElement(locator: Locator) {
    await test.step(`Performing click action for locator: ${locator}`, async () => {
      await locator.click();
    });
  }

  async typeInInputField(locator: Locator, text: string) {
    await test.step(`Performing type action for locator: ${locator}`, async () => {
      await locator.fill(text);
    });
  }

  async navigateToUrl(page: Page, url: string) {
    await test.step(`Navigating to URL: ${url}`, async () => {
      await page.goto(url);
    });
  }

  async clearField(locator: Locator) {
    await test.step(`Clearing the field with locator: ${locator}`, async () => {
      await locator.clear();
    });
  }

  async isCheckboxChecked(locator: Locator): Promise<boolean> {
    return await test.step(`Checking whether checkbox with locator: ${locator} is checked or not`, async () => {
      return await locator.isChecked();
    });
  }

  async checkTheCheckbox(locator: Locator) {
    await test.step(`Checking the checkbox with locator: ${locator}`, async () => {
      await locator.check();
    });
  }

  async getFieldContent(locator: Locator) {
    await test.step(`Get contents of the field with locator: ${locator}`, async () => {
      await locator.textContent();
    });
  }
}
