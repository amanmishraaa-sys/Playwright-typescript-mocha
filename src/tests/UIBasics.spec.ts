import { test} from "../fixtures/fixture";
import { ShoppingPage } from "../pages/shoppingPage";

test.describe('test suite for Login',() => {
    // test.beforeEach("", async ({loginPage}) => {
    //     await loginPage.navigateToLoginPage();
    // });

    test('Verify that checkout button has number of items added for shopping at all times',async ({ afterLoginPage }) => {
    const shopppingPage: ShoppingPage = new ShoppingPage(afterLoginPage.page);
        await shopppingPage.clickOnAddButtonForAnItemWithName("iphone X");
        await shopppingPage.verifyNumberOfItemsOnCartButton(1);
        await shopppingPage.clickOnAddButtonForAnItemWithName("Samsung Note 8");
        await shopppingPage.verifyNumberOfItemsOnCartButton(2);
        await shopppingPage.clickOnAddButtonForAnItemWithName("Nokia Edge");
        await shopppingPage.verifyNumberOfItemsOnCartButton(3);
        await shopppingPage.clickOnAddButtonForAnItemWithName("Blackberry");
        await shopppingPage.verifyNumberOfItemsOnCartButton(4);

    });

    test('Verify that new page is opened when access first link on login page',async ({ beforeLoginPage }) => {
        await beforeLoginPage.verifyNewTabOpeningOnClickingDifferentlinks("Free Access to InterviewQues/ResumeAssistance/Material");
    });

    test('Verify alert popup accepting scenario',async ({ automationPage }) => {
        await automationPage.checkAndAcceptAlert();
    });

    test('Verify the upload process of a file', async ({uploadDownloadPage}) => {
        const filepath: string = "src/test-data/FileYes.xlsx";
        await uploadDownloadPage.uploadFile(filepath);
    });
});