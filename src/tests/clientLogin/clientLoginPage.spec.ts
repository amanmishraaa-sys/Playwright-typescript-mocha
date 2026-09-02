import { test } from "../../fixtures/fixture";
import { ClientLoginCartPage } from "../../pages/clientLoginCartPage";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

test.describe("test suite for UI Basics", () => {

  const baseurl: string = process.env.baseUrl!;
  // test.beforeEach("", async ({loginPage}) => {
  //     await loginPage.navigateToLoginPage();
  // });

  test(`Verify that user is able to fill username and password at login page`, { tag: ["@something"]}, async({ clientLoginPage }) => {
    await clientLoginPage.enterUsername("Double Bangle");
    await clientLoginPage.verifyUsernameTextInput("Double Bangle");
    await clientLoginPage.enterPassword("DoubleDouble");
    await clientLoginPage.verifyPasswordTextInput("DoubleDouble");
  });

  test(`API: Add product in cart`, { tag: ["@shopping", "@smoke"] }, async ({ apiLogin }) => {
    await apiLogin.addProductsInCart([
      "ADIDAS ORIGINAL",
      "ZARA COAT 3",
      "iphone 13 pro",
    ]);
  });

  test(
    `Verify that all the mentioned items are added in cart`,
    { tag: ["@shopping", "@smoke"] },
    async ({ clientLoginCartPageWithToken }) => {
      await clientLoginCartPageWithToken.validateCartItemNames([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    },
  );

  test(`Verify that user is able to add product Items in the cart and delete them on the cart page`,{ tag : ["@something"]}, async({ clientLoginShoppingPageWithToken }) => {
    const clientLoginCartPage = new ClientLoginCartPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientLoginShoppingPageWithToken.selectProducts([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    await clientLoginCartPage.navigateToCartPage();
    await clientLoginCartPage.clickOnDeleteButton([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    await clientLoginCartPage.actions.refreshPage();
  });
});
