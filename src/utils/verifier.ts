import { Page, test, expect, Locator } from "@playwright/test";
import { FileUtils } from "./fileUtils";

export class Verifier {
  readonly fUtil: FileUtils;

  constructor() {
    this.fUtil = new FileUtils();
  }

  /**
   * To check if the element with the given locator is visible.
   * @param locator - The locator of the element.
   * @param timeout - The timeout for the verification.
   */
  async isVisible(locator: Locator, timeout?: number) {
    await test.step(`Verify if the element with locator: ${locator} is visible`, async () => {
      await expect(locator).toBeVisible({ timeout: timeout });
    });
  }

  /**
   * To verify the text of the element with the given locator.
   * @param locator - The locator of the element.
   * @param expectedText - The expected text of the element.
   * @param timeout - The timeout for the verification.
   */
  async textForLocator(
    locator: Locator,
    expectedText: string,
    timeout?: number,
  ) {
    await test.step(`Verify text for the given locator: ${locator}`, async () => {
      await expect(locator).toHaveText(expectedText, { timeout: timeout });
    });
  }

  /**
   * To verify if the given path exists.
   * @param path - The path of the file.
   */
  async givenPathExists(path: string) {
    await test.step(`Verify if the given path: ${path} exists`, async () => {
      expect(await this.fUtil.pathExists(path)).toBeTruthy();
    });
  }

  /**
   * To verify that the page has the specified URL.
   * @param page - The page to verify.
   * @param url - The expected URL of the page.
   */
  async pageHasUrl(page: Page, url: string) {
    await test.step(`Verify that the page has URL: ${url}`, async () => {
      await expect(page).toHaveURL(url);
    });
  }

  /**
   * To verify that the page has the specified title.
   * @param page - The page to verify.
   * @param title - The expected title of the page.
   */
  async pageHasTitle(page: Page, title: string) {
    await test.step(`Verify that the page has title: ${title}`, async () => {
      await expect(page).toHaveTitle(title);
    });
  }

  /**
   * To compare the first and second strings.
   * @param firstString - The first string to compare.
   * @param secondString - The second string to compare.
   */
  async stringContains(firstString: string, secondString: string) {
    await test.step(`Verify that ${firstString} contains ${secondString}`, async () => {
      expect(firstString).toContain(secondString);
    });
  }

  /**
   * To verify that the page has the specified title.
   * @param page - The page to verify.
   * @param title - The expected title of the page.
   */
  async stringEquals(firstString: string, secondString: string) {
    await test.step(`Checking ${firstString} is equal to ${secondString}`, async () => {
      expect(firstString).toEqual(secondString);
    });
  }

  /**
   * To compare two sorted arrays of strings.
   * @param firstStringTypeArray - The first sorted array of strings to compare.
   * @param secondStringTypeArray - The second sorted array of strings to compare.
   */
  async stringTypeArrayEquals(
    firstStringTypeArray: string[],
    secondStringTypeArray: string[],
  ) {
    await test.step(`Verify that String: ${firstStringTypeArray} is equal to  ${secondStringTypeArray}`, async () => {
      expect(firstStringTypeArray.sort()).toEqual(secondStringTypeArray.sort());
    });
  }

  /**
   * To verify that the input field has the specified value.
   * @param locator - The locator of the input field.
   * @param text - The expected value of the input field.
   */
  async verifyInputFieldHasValue(locator: Locator, text: string) {
    await test.step(`Verify that the inputfield with locator: ${locator} has ${text}`, async () => {
      await expect(locator).toHaveValue(text);
    });
  }
}
