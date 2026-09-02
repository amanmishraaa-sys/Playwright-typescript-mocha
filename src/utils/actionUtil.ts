import { Page, Locator, test } from "@playwright/test";
import { Verifier } from "./verifier";

export class ActionUtil {
  constructor(readonly page: Page) {
    this.page = page;
  }

  async clickElement(locator: Locator) {
    await test.step(`Performing click action for locator: ${locator}`, async () => {
      await locator.click();
    });
  }

  async typeInInputField(locator: Locator, text: string) {
    await test.step(`Performing type action for locator: ${locator}`, async () => {
      await locator.fill(text);
    });
  }

  async validateFieldContent(locator: Locator, text: string){
    await test.step(`Validate the content of the given field`, async () => {
      const retrievedText = await locator.inputValue();
      await Verifier.stringEquals(retrievedText,text);
    });
  }

  async navigateToUrl(url: string) {
    await test.step(`Navigating to URL: ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async clearField(locator: Locator) {
    await test.step(`Clearing the field with locator: ${locator}`, async () => {
      await locator.clear();
    });
  }

  async isCheckboxChecked(locator: Locator): Promise<boolean> {
    return await test.step(`Checking whether checkbox with locator: ${locator} is checked or not`, async () => {
      return await locator.isChecked();
    });
  }

  async checkTheCheckbox(locator: Locator) {
    await test.step(`Checking the checkbox with locator: ${locator}`, async () => {
      await locator.check();
    });
  }

  async getFieldContent(locator: Locator) {
    await test.step(`Get contents of the field with locator: ${locator}`, async () => {
      await locator.textContent();
    });
  }

  async uploadFile(locator: Locator, downloadpath: string) {
    await test.step(`Uploading for element with locator: ${locator} from path ${downloadpath}`, async () => {
      await locator.setInputFiles(downloadpath);
    });
  }

  async refreshPage() {
    await test.step(`Refreshing the current page`, async () => {
      await this.page.reload();
      await this.page.waitForLoadState("networkidle");
    });
  }

  async handleAutoSuggestionBox(
    inputFieldLocator: Locator,
    searchText: string,
    sugesstionDropdownlocator: Locator,
    selectText: string,
  ) {
    await test.step(`Handling the suggesstion box`, async () => {
      await inputFieldLocator.fill(searchText);
      await Verifier.isVisible(
        sugesstionDropdownlocator.filter({ hasText: selectText }),
      );
      await this.clickElement(
        sugesstionDropdownlocator.filter({ hasText: selectText }),
      );
      await Verifier.verifyInputFieldHasValue(inputFieldLocator, selectText);
    });
  }

  async waitForPageToLoad(){
    await this.page.waitForLoadState('networkidle');
  }
}
