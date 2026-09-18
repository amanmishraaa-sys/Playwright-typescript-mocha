import { test } from "../../fixtures/fixture";
import { ClientLoginCartPage } from "../../pages/clientLoginCartPage";
import { Features, TestType } from "../../constants/tags";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});


test.describe(`API Login and using token for further UI Test cases`, () => {
  const baseurl: string = process.env.baseUrl!;
  test.beforeAll(
    `Login with API, store the token and add products to cart`,
    async ({ apiLogin }) => {
      await apiLogin.addProductsInCart([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    },
  );

  test(
    `Login with token and validate the cart items`,
    { tag: [Features.Shopping, TestType.Smoke] },
    async ({ clientLoginCartPageWithToken }) => {
      await clientLoginCartPageWithToken.validateCartItemNames([
        "ADIDAS ORIGINAL",
        "ZARA COAT 3",
        "iphone 13 pro",
      ]);
    },
  );

  test(
    `Verify that user is able to add product Items in the cart and delete them on the cart page`,
    { tag: ["@something"] },
    async ({ clientLoginShoppingPageWithToken }) => {
      const clientLoginCartPage = new ClientLoginCartPage(
        baseurl,
        clientLoginShoppingPageWithToken.page,
      );
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
      await clientLoginCartPage.pageActionUtil.refreshPage();
    },
  );
});