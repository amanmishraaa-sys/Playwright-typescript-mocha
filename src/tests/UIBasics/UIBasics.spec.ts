import { test } from "../../fixtures/fixture";
import { LoginPage } from "../../pages/loginPage";
import { ShoppingPage } from "../../pages/shoppingPage";
import { request, expect } from "@playwright/test";

test.describe("test suite for UI Basics", () => {
  // test.beforeEach("", async ({loginPage}) => {
  //     await loginPage.navigateToLoginPage();
  // });

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

  test(`Something`, { tag: ["@shopping", "@smoke"] }, async ({ apiLogin }) => {
    await apiLogin.addProductsInCart([
      "ADIDAS ORIGINAL",
      "ZARA COAT 3",
      "iphone 13 pro",
    ]);
  });

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

  test(`Perform a step to write United States (USA) in suggesstion box`, async ({
    automationPage,
  }) => {
    const typeText: string = "united";
    const targetText: string = "United States (USA)";
    await automationPage.selectGivenTextInSuggesstionBox(typeText, targetText);
  });
});
