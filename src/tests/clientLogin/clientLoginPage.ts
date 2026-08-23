import { test } from "../../fixtures/fixture";

test.describe("test suite for UI Basics", () => {
  // test.beforeEach("", async ({loginPage}) => {
  //     await loginPage.navigateToLoginPage();
  // });

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
});
