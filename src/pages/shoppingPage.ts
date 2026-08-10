import { Page, Locator, expect, test } from "@playwright/test";
import { LoginPage } from "./loginPage";

export class ShoppingPage {
    readonly shoppingItem: Locator;
    readonly targetItemForAddButton:(itemName: string) => Locator;
    readonly checkOutButton: Locator;
    constructor( page: Page){
        this.shoppingItem = page.locator("app-card");
        this.targetItemForAddButton = (itemName: string) => this.shoppingItem.filter({hasText: itemName});
        this.checkOutButton = page.locator("[class='nav-link btn btn-primary']");
    }

    async clickOnAddButtonForAnItemWithName(itemName: string){
        await test.step(`Clicking on add button for ${itemName} item`, async() => {
            let addButton: Locator = this.targetItemForAddButton(itemName).locator("button");
            await addButton.click();
        });
    }

    async verifyNumberOfItemsOnCartButton (itemNumber: number){
        await test.step(`Verify the number (${itemNumber}) on Cart button`, async() => {
            expect(await this.checkOutButton.textContent()).toContain(itemNumber.toString());
        });
    }
}