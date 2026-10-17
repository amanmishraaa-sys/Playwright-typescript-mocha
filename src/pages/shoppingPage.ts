import { Page, Locator, expect, test } from "@playwright/test";
import { UtilManager } from "../utils/utilManager";

export class ShoppingPage {
  readonly utilManager: UtilManager;
  readonly shoppingItem: Locator;
  readonly targetItemForAddButton: (itemName: string) => Locator;
  readonly checkOutButton: Locator;
  constructor(page: Page) {
    this.utilManager = new UtilManager(page);
    this.shoppingItem = page.locator("app-card");
    this.targetItemForAddButton = (itemName: string) =>
      this.shoppingItem.filter({ hasText: itemName });
    this.checkOutButton = page.locator("[class='nav-link btn btn-primary']");
  }

  /**
   * To click on add button for an item with a specific name.
   * @param itemName - The name of the item for which the add button is to be clicked.
   */
  async clickOnAddButtonForAnItemWithName(itemName: string) {
    await test.step(`Clicking on add button for ${itemName} item`, async () => {
      let addButton: Locator =
        this.targetItemForAddButton(itemName).locator("button");
      await this.utilManager.pAUtil.clickElement(addButton);
    });
  }

  /**
   * To verify the number of items on the Cart button.
   * @param itemNumber - The expected number of items on the Cart button.
   */
  async verifyNumberOfItemsOnCartButton(itemNumber: number) {
    await test.step(`Verify the number (${itemNumber}) on Cart button`, async () => {
      await this.utilManager.verifier.stringContains(
        (await this.checkOutButton.textContent()) || "",
        itemNumber.toString(),
      );
    });
  }
}
