import { test ,expect, Locator } from "@playwright/test";
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
    await test.step(`Verify text for the given locator: ${locator}`, async() => {
      await expect(locator).toHaveText(expectedText, { timeout: timeout });
    });
  }

  static async givenPathExists(path: string) {
    await test.step(`Verify if the given path: ${path} exists`, async () => {
      expect(await FileUtils.pathExists(path)).toBeTruthy();
    });
  }
}
