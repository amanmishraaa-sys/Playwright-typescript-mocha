import { test as base, APIRequestContext } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { AutomationPage } from "../pages/automationPage";
import { UploadDownloadPage } from "../pages/uploadDownloadPage";
import { Api } from "../api/api";
import { NewContextFactory } from "../newContextFactory/newContextFactory";
import { ClientLoginCartPage } from "../pages/clientLoginCartPage";
import { ClientLoginShoppingPage } from "../pages/clientLoginShoppingPage";
import { ClientLoginPage } from "../pages/clientLoginPage";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

const baseurl: string = process.env.baseUrl!;

type Fixtures = {
  afterLoginPage: LoginPage;
  beforeLoginPage: LoginPage;
  automationPage: AutomationPage;
  uploadDownloadPage: UploadDownloadPage;
  apiLogin: Api;
  clientLoginCartPageWithToken: ClientLoginCartPage;
  clientLoginShoppingPageWithToken: ClientLoginShoppingPage;
  clientLoginPage: ClientLoginPage;
};
export const test = base.extend<Fixtures>({
  afterLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(baseurl, page);
    await loginPage.loginIntoThePage();
    use(loginPage);
  },
  beforeLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(baseurl, page);
    await loginPage.navigateToLoginPage();
    use(loginPage);
  },
  automationPage: async ({ page }, use) => {
    const automationPage = new AutomationPage(baseurl, page);
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
  clientLoginCartPageWithToken: async ({ page }, use) => {
    const token = await fs.readFile("token.txt", "utf-8");
    const clientLoginCartPage = new ClientLoginCartPage(baseurl, page);
    await clientLoginCartPage.navigateToCartPageWithToken(token);
    use(clientLoginCartPage);
    await clientLoginCartPage.ClickOnSignOutButton();
  },
  clientLoginShoppingPageWithToken: async ({ page }, use) => {
    const token = await fs.readFile("token.txt", "utf-8");
    const clientLoginShoppingPage = new ClientLoginShoppingPage(baseurl, page);
    await clientLoginShoppingPage.navigateToShoppingPageWithToken(token);
    use(clientLoginShoppingPage);
  },
  clientLoginPage: async ({ page }, use) => {
    const clientLoginPage = new ClientLoginPage(baseurl, page);
    await clientLoginPage.navigateToPage();
    use(clientLoginPage);
  },
});
