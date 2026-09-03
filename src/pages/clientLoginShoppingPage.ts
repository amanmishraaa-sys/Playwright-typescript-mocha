import { Page, Locator } from "@playwright/test";
import { ActionUtil } from "../utils/actionUtil";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginShoppingPage {
  readonly selectedAddToCartBody: (productName: string) => Locator;
  readonly selectedAddToCartButton: (productName: string) => Locator;
  readonly actions: ActionUtil;
  readonly baseurl: string;
  readonly shoppingPageUrl: string = process.env.shoppingPage!;

  constructor(
    readonly url: string,
    readonly page: Page,
  ) {
    this.baseurl = url;
    this.page = page;
    this.actions = new ActionUtil(this.page);
    this.selectedAddToCartBody = (productName: string) =>
      this.page.locator('[class="card-body"]').filter({ hasText: productName });
    this.selectedAddToCartButton = (productName: string) =>
      this.selectedAddToCartBody(productName).getByRole("button", {
        name: " Add To Cart",
      });
  }

  async navigateToShoppingPageWithToken(token: string) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    await this.actions.navigateToUrl(this.baseurl + this.shoppingPageUrl);
  }

  async selectProducts(productNames: string[]) {
    for (const element of productNames) {
      await this.actions.clickElement(this.selectedAddToCartButton(element));
    }
  }
}
