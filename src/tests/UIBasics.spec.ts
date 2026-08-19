import { test } from "../fixtures/fixture";
import { LoginPage } from "../pages/loginPage";
import { ShoppingPage } from "../pages/shoppingPage";
import { request, expect } from "@playwright/test";

test.describe("test suite for Login", () => {
  // test.beforeEach("", async ({loginPage}) => {
  //     await loginPage.navigateToLoginPage();
  // });

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
      const loginPage: LoginPage = new LoginPage(beforeLoginPage.page);
      await loginPage.enterUsername("something");
      await loginPage.enterPassword("WOW");
      await loginPage.checkTermsAndConditionCheckbox();
      await loginPage.clickSignInButton();
      await loginPage.verfiyWrongCredsAlertMessage();
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

  test(
    "Verify alert popup accepting scenario",
    { tag: ["@smoke"] },
    async ({ automationPage }) => {
      await automationPage.checkAndAcceptAlert();
    },
  );

  test(
    `Verify the downloadding, modfication, uploading, validating the modification on the page and deletion of the file`,
    { tag: ["@smoke", "@download"] },
    async ({ uploadDownloadPage }) => {
      await uploadDownloadPage.clickOnDownloadButtonAndSaveFile();
      await uploadDownloadPage.changeThevalueInDownloadedFile("299", "350");
      await uploadDownloadPage.uploadModifiedFile();
      await uploadDownloadPage.verifyTheChangesOnThePage();
      await uploadDownloadPage.deleteDownloadedFile();
    },
  );

  test(
    `Something`,
    { tag: ["@shopping", "@smoke"] },
    async ({ apiLogin }) => {
      await apiLogin.addProductsInCart([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    },
  );

  test(
    `Something two`,
    { tag: ["@shopping", "@smoke"] },
    async ({ clientLoginCartPage }) => {
      await clientLoginCartPage.validateCartItemNames([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    },
  );
});
