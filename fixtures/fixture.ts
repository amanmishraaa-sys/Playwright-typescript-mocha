import { test as base, expect } from "@playwright/test"
import { LoginPage } from "../pages/loginPage"

type Fixtures = {
    loginPage: LoginPage;
} 
export const test = base.extend<Fixtures>({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        use(loginPage);
    }
})

export { expect };