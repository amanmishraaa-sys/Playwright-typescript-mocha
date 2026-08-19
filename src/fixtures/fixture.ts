import { test as base, expect, APIRequestContext } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { AutomationPage } from "../pages/automationPage";
import { UploadDownloadPage } from "../pages/uploadDownloadPage";
import { Api } from "../api/api";
import { NewContextFactory } from "../newContextFactory/newContextFactory";
import { ClientLoginCartPage } from "../pages/clientLoginCartPage";
import fs from "fs/promises";

type Fixtures = {
  afterLoginPage: LoginPage;
  beforeLoginPage: LoginPage;
  automationPage: AutomationPage;
  uploadDownloadPage: UploadDownloadPage;
  apiLogin: Api;
  clientLoginCartPage: ClientLoginCartPage;
};
export const test = base.extend<Fixtures>({
  afterLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginIntoThePage();
    use(loginPage);
  },
  beforeLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    use(loginPage);
  },
  automationPage: async ({ page }, use) => {
    const automationPage = new AutomationPage(page);
    await automationPage.navigateToAutomationPage();
    use(automationPage);
  },
  uploadDownloadPage: async ({ page }, use) => {
    const uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigateToUploadDownloadPage();
    use(uploadDownloadPage);
  },
  apiLogin: async ({}, use) => {
    const apiContext: APIRequestContext =
      await NewContextFactory.createNewContextWithRequest();
    const apiLogin = new Api(apiContext);
    await apiLogin.loginAPI();
    use(apiLogin);
  },
  clientLoginCartPage: async ({ page }, use) => {
    const token = await fs.readFile("token.txt", "utf-8");
    const clientLoginCartPage = new ClientLoginCartPage(page);
    await clientLoginCartPage.navigateToPageWithToken(token);
    use(clientLoginCartPage);
    await clientLoginCartPage.ClickOnSignOutButton();
  },
});
