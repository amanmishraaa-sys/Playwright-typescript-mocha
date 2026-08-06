import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";

export class ShoppingPage extends LoginPage{
    readonly shoppingItem: Locator;
    readonly targetItemForAddButton:(itemName: string) => Locator;
    readonly checkOutButton: Locator;
    constructor( page: Page){
        super(page);
        this.shoppingItem = page.locator("app-card");
        this.targetItemForAddButton = (itemName: string) => this.shoppingItem.filter({hasText: itemName});
        this.checkOutButton = page.locator("[class='nav-link btn btn-primary']");
    }

    async clickOnAddButtonForAnItemWithName(itemName: string){
        let addButton: Locator = this.targetItemForAddButton(itemName).locator("button");
        await addButton.click();
    }

    async verifyNumberOfItemsOnCartButton (itemNumber: number){
        expect(await this.checkOutButton.textContent()).toContain(itemNumber.toString());
    }
}