import dotenv from "dotenv";
import path from "path";
import { Page, Locator, test } from "@playwright/test";
import { pageActionUtil } from "../utils/pageActionUtils";
import { pageNavigationUtil } from "../utils/pageNavigationUtils";
import { Verifier } from "../utils/verifier";
import { ClientLoginPage } from "./clientLoginPage";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginCartPage {
  readonly cartPageUrl: string = process.env.cartPage!;
  readonly loginPageUrl: string = process.env.clientLoginPage!;
  readonly pageActionUtil: pageActionUtil;
  readonly pageNavigationUtil: pageNavigationUtil;
  readonly cartItemNames: Locator;
  readonly signOutButton: Locator;
  readonly selectedProduct: (productName: string) => Locator;
  readonly selectedDeleteButton: (productName: string) => Locator;

  constructor(
    readonly baseurl: string,
    readonly page: Page,
  ) {
    this.pageActionUtil = new pageActionUtil(this.page);
    this.pageNavigationUtil = new pageNavigationUtil(this.page);
    this.cartItemNames = this.page.locator('[class="cartSection"] h3');
    this.signOutButton = this.page.getByRole("button", { name: " Sign Out" });
    this.selectedProduct = (productName: string) =>
      this.page
        .locator('[class="infoWrap"]')
        .filter({ has: this.page.locator("h3").getByText(productName) });
    this.selectedDeleteButton = (productName: string) =>
      this.selectedProduct(productName).locator('[class="btn btn-danger"]');
  }

  async navigateToCartPage() {
    await this.pageNavigationUtil.navigateToUrl(this.baseurl + this.cartPageUrl);
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToCartPageWithToken(token: string) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    await this.pageNavigationUtil.navigateToUrl(this.baseurl + this.cartPageUrl);
  }

  async ClickOnSignOutButton() {
    await test.step(`Logout of the shopping page`, async () => {
      await this.pageActionUtil.clickElement(this.signOutButton);
      const clienLoginPage: ClientLoginPage = new ClientLoginPage(
        this.baseurl + this.loginPageUrl,
        this.page,
      );
      await clienLoginPage.verifyPageIsLoaded();
    });
  }

  async validateCartItemNames(productNames: string[]) {
    await test.step(`Verify the product names in the cart`, async () => {
      const productNamesRetrived: string[] =
        await this.cartItemNames.allTextContents();
      console.log(productNamesRetrived);
      await Verifier.stringTypeArrayEquals(productNames, productNamesRetrived);
    });
  }

  async clickOnDeleteButton(procuctNames: string[]) {
    for (const product of procuctNames) {
      await this.pageActionUtil.clickElement(this.selectedDeleteButton(product));
    }
  }
}
