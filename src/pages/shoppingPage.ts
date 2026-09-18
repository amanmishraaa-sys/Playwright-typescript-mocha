import { Page, Locator, expect, test } from "@playwright/test";
import { pageActionUtil } from "../utils/pageActionUtils";
import { Verifier } from "../utils/verifier";

export class ShoppingPage {
  readonly shoppingItem: Locator;
  readonly targetItemForAddButton: (itemName: string) => Locator;
  readonly checkOutButton: Locator;
  readonly pageActionUtil: pageActionUtil;
  constructor(page: Page) {
    this.shoppingItem = page.locator("app-card");
    this.targetItemForAddButton = (itemName: string) =>
      this.shoppingItem.filter({ hasText: itemName });
    this.checkOutButton = page.locator("[class='nav-link btn btn-primary']");
    this.pageActionUtil = new pageActionUtil(page);
  }

  async clickOnAddButtonForAnItemWithName(itemName: string) {
    await test.step(`Clicking on add button for ${itemName} item`, async () => {
      let addButton: Locator =
        this.targetItemForAddButton(itemName).locator("button");
      await this.pageActionUtil.clickElement(addButton);
    });
  }

  async verifyNumberOfItemsOnCartButton(itemNumber: number) {
    await test.step(`Verify the number (${itemNumber}) on Cart button`, async () => {
      await Verifier.stringContains(
        (await this.checkOutButton.textContent()) || "",
        itemNumber.toString(),
      );
    });
  }
}
