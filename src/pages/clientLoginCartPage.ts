import dotenv from "dotenv";
import path from "path";
import { Page, Locator, test } from "@playwright/test";
import { ActionUtil } from "../utils/actionUtil";
import { Verifier } from "../utils/verifier";
import { ClientLoginPage } from "./clientLoginPage";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

export class ClientLoginCartPage {
  readonly page: Page;
  readonly baseurl: string;
  readonly cartPageUrl: string = process.env.cartPage!;
  readonly loginPageUrl: string = process.env.clientLoginPage!;
  readonly actions: ActionUtil;
  readonly cartItemNames: Locator;
  readonly signOutButton: Locator;
  readonly selectedProduct: (productName: string) =>  Locator;
  readonly selectedDeleteButton: (productName: string) => Locator;

  constructor(readonly url: string, readonly gotPage: Page) {
    this.baseurl = url;
    this.page = gotPage;
    this.actions = new ActionUtil(this.page);
    this.cartItemNames = this.page.locator('[class="cartSection"] h3');
    this.signOutButton = this.page.getByRole("button", { name: " Sign Out" });
    this.selectedProduct = (productName: string) => this.page.locator('[class="infoWrap"]').filter({ has: this.page.locator('h3').getByText(productName)});
    this.selectedDeleteButton = (productName: string) => this.selectedProduct(productName).locator('[class="btn btn-danger"]');
  }
  
  async navigateToCartPage(){
    await this.actions.navigateToUrl(this.baseurl + this.cartPageUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToCartPageWithToken(token: string) {
    await this.page.addInitScript((value) => {
      window.localStorage.setItem("token", value);
    }, token);
    await this.actions.navigateToUrl(this.baseurl + this.cartPageUrl);
  }

  async ClickOnSignOutButton() {
    await test.step(`Logout of the shopping page`, async () => {
      await this.actions.clickElement(this.signOutButton);
      const clienLoginPage: ClientLoginPage = new ClientLoginPage(this.baseurl + this.loginPageUrl, this.page);
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

  async clickOnDeleteButton(procuctNames: string[]){
    for(const product of procuctNames){
      await this.actions.clickElement(this.selectedDeleteButton(product));
    }
  }
}
