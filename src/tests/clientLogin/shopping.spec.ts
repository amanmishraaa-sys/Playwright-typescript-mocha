import { test } from "../../fixtures/fixture";
import { ClientLoginCartPage } from "../../pages/clientLoginCartPage";
import { ClientLoginShoppingPage } from "../../pages/clientLoginShoppingPage";
import { Features, TestType } from "../../constants/tags";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

const baseurl: string = process.env.baseUrl!;

test.describe(`API Login and using token for further UI Test cases`, () => {
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
      await clientLoginCartPage.utilManager.pAUtil.refreshPage();
    },
  );
});

test.describe.serial(`Try different combinations of products to add in the cart and delete them`, () => {

  test.beforeAll(
    `Login with API, store the token`,
    async ({ apiLogin }) => {
    },
  );

  test(`Add "ADIDAS ORIGINAL" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ADIDAS ORIGINAL"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ADIDAS ORIGINAL"]);
    await clientCartPage.clickOnDeleteButton(["ADIDAS ORIGINAL"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "ZARA COAT 3" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ZARA COAT 3"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ZARA COAT 3"]);
    await clientCartPage.clickOnDeleteButton(["ZARA COAT 3"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "iphone 13 pro" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["iphone 13 pro"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["iphone 13 pro"]);
    await clientCartPage.clickOnDeleteButton(["iphone 13 pro"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "ADIDAS ORIGINAL","ZARA COAT 3" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ADIDAS ORIGINAL","ZARA COAT 3"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ADIDAS ORIGINAL","ZARA COAT 3"]);
    await clientCartPage.clickOnDeleteButton(["ADIDAS ORIGINAL","ZARA COAT 3"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "ADIDAS ORIGINAL","iphone 13 pro" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ADIDAS ORIGINAL","iphone 13 pro"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ADIDAS ORIGINAL","iphone 13 pro"]);
    await clientCartPage.clickOnDeleteButton(["ADIDAS ORIGINAL","iphone 13 pro"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "ADIDAS ORIGINAL","ZARA COAT 3","iphone 13 pro" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ADIDAS ORIGINAL","ZARA COAT 3","iphone 13 pro"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ADIDAS ORIGINAL","ZARA COAT 3","iphone 13 pro"]);
    await clientCartPage.clickOnDeleteButton(["ADIDAS ORIGINAL","ZARA COAT 3","iphone 13 pro"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });

  test(`Add "ZARA COAT 3","iphone 13 pro" to cart and delete it at the cart page`, async({clientLoginShoppingPageWithToken}) => {
    const clientShoppingPage = new ClientLoginShoppingPage(baseurl, clientLoginShoppingPageWithToken.page);
    await clientShoppingPage.selectProducts(["ZARA COAT 3","iphone 13 pro"]);
    const clientCartPage = new ClientLoginCartPage(baseurl, clientShoppingPage.page);
    await clientCartPage.navigateToCartPage();
    await clientCartPage.utilManager.pAUtil.refreshPage();
    await clientCartPage.validateCartItemNames(["ZARA COAT 3","iphone 13 pro"]);
    await clientCartPage.clickOnDeleteButton(["ZARA COAT 3","iphone 13 pro"]);
    await clientCartPage.utilManager.pAUtil.refreshPage();
  });
});
