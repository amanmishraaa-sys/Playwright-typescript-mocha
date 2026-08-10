import { test} from "../fixtures/fixture";
import { LoginPage } from "../pages/loginPage";
import { ShoppingPage } from "../pages/shoppingPage";

test.describe('test suite for Login',() => {
    // test.beforeEach("", async ({loginPage}) => {
    //     await loginPage.navigateToLoginPage();
    // });

    test('Verify that checkout button has number of items added for shopping at all times',{tag:["@cart", "@smoke"]},async ({ afterLoginPage }) => {
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

    test('Verify the incorrect password error message on entering wrong credentials ',{tag:["@login", "@smoke"]},async ({ beforeLoginPage }) => {
        const loginPage: LoginPage = new LoginPage(beforeLoginPage.page);
        await loginPage.enterUsername("something");
        await loginPage.enterPassword("WOW");
        await loginPage.checkTermsAndConditionCheckbox();
        await loginPage.clickSignInButton();
        await loginPage.verfiyWrongCredsAlertMessage();
    });

    test('Verify that new page is opened when access first link on login page',{tag:["@newLink", "@smoke"]},async ({ beforeLoginPage }) => {
        await beforeLoginPage.verifyNewTabOpeningOnClickingDifferentlinks("Free Access to InterviewQues/ResumeAssistance/Material");
    });

    test('Verify alert popup accepting scenario',{tag:["@smoke"]},async ({ automationPage }) => {
        await automationPage.checkAndAcceptAlert();
    });

    test('Verify the upload process of a file',{tag:["@smoke"]},async ({uploadDownloadPage}) => {
        const filepath: string = "src/test-data/FileYes.xlsx";
        await uploadDownloadPage.uploadFile(filepath);
    });
});