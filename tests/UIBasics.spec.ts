import {test, expect} from "../fixtures/fixture";
import { expect as early } from "@playwright/test";

test.describe('test suite for Login',() => {
    test.beforeEach("", async ({loginPage}) => {
        await loginPage.navigateToLoginPage();
    });

    test.only('Login test case',async ({ loginPage }) => {
        const { page } = loginPage;
       const s: string = await loginPage.getPageTitle();
       expect(s).toEqual("LoginPage Practise | Rahul Shetty Academy");
       await early(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    //    console.log("Page title:"+s);
    });
});