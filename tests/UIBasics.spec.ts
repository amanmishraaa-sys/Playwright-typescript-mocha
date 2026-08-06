import {test, expect} from "../fixtures/fixture";
import { expect as early } from "@playwright/test";
import { ShoppingPage } from "../pages/shoppingPage";

test.describe('test suite for Login',() => {
    // test.beforeEach("", async ({loginPage}) => {
    //     await loginPage.navigateToLoginPage();
    // });

    test.only('Login test case',async ({ loginPage }) => {
    //    loginPage.verifyPageTitle("LoginPage Practise | Rahul Shetty Academy");
    const shopppingPage: ShoppingPage = new ShoppingPage(loginPage.page);
    await shopppingPage.clickOnAddButtonForAnItemWithName("iphone X");
    await shopppingPage.verifyNumberOfItemsOnCartButton(1);
    await shopppingPage.clickOnAddButtonForAnItemWithName("Samsung Note 8");
    await shopppingPage.verifyNumberOfItemsOnCartButton(2);
    await shopppingPage.clickOnAddButtonForAnItemWithName("Nokia Edge");
    await shopppingPage.verifyNumberOfItemsOnCartButton(3);
    await shopppingPage.clickOnAddButtonForAnItemWithName("Blackberry");
    await shopppingPage.verifyNumberOfItemsOnCartButton(4);
    //    console.log("Page title:"+s);
    });
});