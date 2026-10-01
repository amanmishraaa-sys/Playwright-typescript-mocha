import { Page, Locator, APIRequestContext } from "@playwright/test";
import { pageActionUtil } from "../utils/pageActionUtils";
import { pageNavigationUtil } from "../utils/pageNavigationUtils"
import dotenv from "dotenv";
import path from "path";
import { UtilManager } from "../utils/utilManager";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginShoppingPage {
  readonly utilManager: UtilManager;
  readonly selectedAddToCartBody: (productName: string) => Locator;
  readonly selectedAddToCartButton: (productName: string) => Locator;
  readonly baseurl: string;
  readonly shoppingPageUrl: string = process.env.shoppingPage!;
  readonly heading: Locator;

  constructor(
    readonly url: string,
    readonly page: Page,
  ) {
    this.utilManager = new UtilManager(this.page);
    this.baseurl = url;
    this.selectedAddToCartBody = (productName: string) =>
    this.page.locator('[class="card-body"]').filter({ hasText: productName });
    this.selectedAddToCartButton = (productName: string) =>
    this.selectedAddToCartBody(productName).getByRole("button", {
        name: " Add To Cart",
      });
    this.heading = this.page.getByRole('heading',{ name: "AUTOMATION"});
  }

  async navigateToShoppingPageWithToken(token: string) {
    await this.utilManager.pNUtil.navigateToUrlWithPreLoadedToken(token,this.baseurl + this.shoppingPageUrl);
  }

  async selectProducts(productNames: string[]) {
    for (const element of productNames) {
      await this.utilManager.pAUtil.clickElement(this.selectedAddToCartButton(element));
    }
  }
}
