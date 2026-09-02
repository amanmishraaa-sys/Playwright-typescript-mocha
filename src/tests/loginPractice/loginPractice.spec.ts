import { test } from "../../fixtures/fixture";
import { ShoppingPage } from "../../pages/shoppingPage";

test.describe(`Test scenarios on Login Practice Page`, () => {
  test(
    "Verify that checkout button has number of items added for shopping at all times",
    { tag: ["@cart", "@smoke"] },
    async ({ afterLoginPage }) => {
      const shopppingPage: ShoppingPage = new ShoppingPage(afterLoginPage.page);
      await shopppingPage.clickOnAddButtonForAnItemWithName("iphone X");
      await shopppingPage.verifyNumberOfItemsOnCartButton(1);
      await shopppingPage.clickOnAddButtonForAnItemWithName("Samsung Note 8");
      await shopppingPage.verifyNumberOfItemsOnCartButton(2);
      await shopppingPage.clickOnAddButtonForAnItemWithName("Nokia Edge");
      await shopppingPage.verifyNumberOfItemsOnCartButton(3);
      await shopppingPage.clickOnAddButtonForAnItemWithName("Blackberry");
      await shopppingPage.verifyNumberOfItemsOnCartButton(4);
    },
  );

  test(
    "Verify the incorrect password error message on entering wrong credentials ",
    { tag: ["@login", "@smoke"] },
    async ({ beforeLoginPage }) => {
      await beforeLoginPage.enterUsername("something");
      await beforeLoginPage.enterPassword("WOW");
      await beforeLoginPage.checkTermsAndConditionCheckbox();
      await beforeLoginPage.clickSignInButton();
      await beforeLoginPage.verfiyWrongCredsAlertMessage();
    },
  );

  test(
    "Verify that new page is opened when access first link on login page",
    { tag: ["@newLink", "@smoke"] },
    async ({ beforeLoginPage }) => {
      await beforeLoginPage.verifyNewTabOpeningOnClickingDifferentlinks(
        "Free Access to InterviewQues/ResumeAssistance/Material",
      );
    },
  );
});
