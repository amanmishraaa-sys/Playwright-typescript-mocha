import { test as base, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"
import { AutomationPage } from "../pages/automationPage"

type Fixtures = {
    afterLoginPage: LoginPage;
    beforeLoginPage: LoginPage;
    automationPage: AutomationPage;
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

export const automationTests = base.extend<Fixtures>({
    automationPage: async({page}, use) => {
        const automationPage = new AutomationPage(page);
        await automationPage.navigateToAutomationPage();
        use(automationPage);
    }
})


export { expect };