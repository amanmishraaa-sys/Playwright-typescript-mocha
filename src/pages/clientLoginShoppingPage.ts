import { Page, Locator, APIRequestContext } from "@playwright/test";
import { pageActionUtil } from "../utils/pageActionUtils";
import { pageNavigationUtil } from "../utils/pageNavigationUtils"
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginShoppingPage {
  readonly selectedAddToCartBody: (productName: string) => Locator;
  readonly selectedAddToCartButton: (productName: string) => Locator;
  readonly pageActionUtil: pageActionUtil;
  readonly pageNavigationUtil: pageNavigationUtil;
  readonly baseurl: string;
  readonly shoppingPageUrl: string = process.env.shoppingPage!;
  readonly heading: Locator;

  constructor(
    readonly url: string,
    readonly page: Page,
  ) {
    this.baseurl = url;
    this.pageActionUtil = new pageActionUtil(page);
    this.pageNavigationUtil = new pageNavigationUtil(page);
    this.selectedAddToCartBody = (productName: string) =>
    this.page.locator('[class="card-body"]').filter({ hasText: productName });
    this.selectedAddToCartButton = (productName: string) =>
    this.selectedAddToCartBody(productName).getByRole("button", {
        name: " Add To Cart",
      });
    this.heading = this.page.getByRole('heading',{ name: "AUTOMATION"});
  }

  async navigateToShoppingPageWithToken(token: string) {
    await this.pageNavigationUtil.navigateToUrlWithPreLoadedToken(token,this.baseurl + this.shoppingPageUrl);
  }

  async selectProducts(productNames: string[]) {
    for (const element of productNames) {
      await this.pageActionUtil.clickElement(this.selectedAddToCartButton(element));
    }
  }
}
