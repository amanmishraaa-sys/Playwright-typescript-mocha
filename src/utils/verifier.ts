import { expect, Locator } from "@playwright/test";
import fs from "fs";

export class Verifier {
  constructor() {}

  static async isVisible(locator: Locator, timeout?: number) {
    await expect(locator).toBeVisible({ timeout: timeout });
  }

  static async textForLocator(
    locator: Locator,
    expectedText: string,
    timeout?: number,
  ) {
    await expect(locator).toHaveText(expectedText, { timeout: timeout });
  }
}
