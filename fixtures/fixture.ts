import { test as base, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"

type Fixtures = {
    afterLoginPage: LoginPage;
    beforeLoginPage: LoginPage;
} 
export const test = base.extend<Fixtures>({
    afterLoginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginIntoThePage();
        use(loginPage);
    }

    })

export const tests = base.extend<Fixtures>({
    beforeLoginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        use(loginPage);
    }
})


export { expect };