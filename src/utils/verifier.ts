import { Page, test, expect, Locator } from "@playwright/test";
import { FileUtils } from "./fileUtils";

export class Verifier {
  constructor() {}

  static async isVisible(locator: Locator, timeout?: number) {
    await test.step(`Verify if the element with locator: ${locator} is visible`, async () => {
      await expect(locator).toBeVisible({ timeout: timeout });
    });
  }

  static async textForLocator(
    locator: Locator,
    expectedText: string,
    timeout?: number,
  ) {
    await test.step(`Verify text for the given locator: ${locator}`, async () => {
      await expect(locator).toHaveText(expectedText, { timeout: timeout });
    });
  }

  static async givenPathExists(path: string) {
    await test.step(`Verify if the given path: ${path} exists`, async () => {
      expect(await FileUtils.pathExists(path)).toBeTruthy();
    });
  }

  static async pageHasUrl(page: Page, url: string) {
    await test.step(`Verify that the page has URL: ${url}`, async () => {
      await expect(page).toHaveURL(url);
    });
  }

  static async pageHasTitle(page: Page, title: string) {
    await test.step(`Verify that the page has title: ${title}`, async () => {
      await expect(page).toHaveTitle(title);
    });
  }

  static async stringContains(firstString: string, secondString: string) {
    await test.step(`Verify that ${firstString} contains ${secondString}`, async () => {
      expect(firstString).toContain(secondString);
    });
  }
}
