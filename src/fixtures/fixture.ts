import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { AutomationPage } from "../pages/automationPage";
import { UploadDownloadPage } from "../pages/uploadDownloadPage";

type Fixtures = {
  afterLoginPage: LoginPage;
  beforeLoginPage: LoginPage;
  automationPage: AutomationPage;
  uploadDownloadPage: UploadDownloadPage;
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
});

export { expect };
