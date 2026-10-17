import { Page, test } from "@playwright/test";

export class pageNavigationUtil {
  constructor(readonly page: Page) {}

  /**
   * To navigate to the given URL.
   * @param url - The URL to navigate to.
   */
  async navigateToUrl(url: string) {
    await test.step(`Navigating to URL: ${url}`, async () => {
      await this.page.goto(url);
      await this.page.waitForLoadState("networkidle");
    });
  }

  /**
   * To reload the page.
   */
  async reloadPage(options: {
    timeout?: number;
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
  }) {
    await test.step(`Reloading the current page`, async () => {
      await this.page.reload({
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
    });
  }

  /**
   * To go back to the previous page.
   */
  async goBackOnPage(options: {
    timeout?: number;
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
  }) {
    await test.step(`Go back to the previous page`, async () => {
      await this.page.goBack({
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
    });
  }

  /**
   * To go forward to the next page.
   */
  async goForwardOnPage(options: {
    timeout?: number;
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
  }) {
    await test.step(`Go forward to the next page`, async () => {
      await this.page.goForward({
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
    });
  }

  /**
   * To get the current page URL.
   */
  async getCurrentPageUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * To navigate to the given URL with a preloaded token in the browser.
   * @param token - The token to preload.
   * @param navigationUrl - The URL to navigate to.
   */
  async navigateToUrlWithPreLoadedToken(token: string, navigationUrl: string) {
    await test.step(`Navigate to url: ${navigationUrl} with preloaded token: ${token}`, async () => {
      await this.page.addInitScript((value) => {
        window.localStorage.setItem("token", value);
      }, token);
      await this.navigateToUrl(navigationUrl);
    });
  }
}
