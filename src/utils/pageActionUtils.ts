import { Page, Locator, test } from "@playwright/test";
import { Verifier } from "./verifier";

export class pageActionUtil {
  readonly verifier: Verifier;

  constructor(readonly page: Page) {
    this.verifier = new Verifier();
  }

  /**
   * To click element with the given locator.
   * @param locator - Locator of the element to be clicked.
   */
  async clickElement(locator: Locator) {
    await test.step(`Performing click action for locator: ${locator}`, async () => {
      await locator.click();
    });
  }

  /**
   * To type the given text in the given input field.
   * @param locator - Locator of the input field.
   * @param text - Text to be entered in the input field.
   */
  async typeInInputField(locator: Locator, text: string) {
    await test.step(`Performing type action for locator: ${locator}`, async () => {
      await locator.fill(text);
    });
  }

  /**
   * To validate whether input field contains the given text.
   * @param locator - Locator of the input field.
   * @param text - Text to be validated.
   */
  async validateFieldContent(locator: Locator, text: string) {
    await test.step(`Validate the content of the given field`, async () => {
      const retrievedText = await locator.inputValue();
      await this.verifier.stringEquals(retrievedText, text);
    });
  }

  /**
   * To clear the given input field.
   * @param locator - Locator of the input field.
   */
  async clearField(locator: Locator) {
    await test.step(`Clearing the field with locator: ${locator}`, async () => {
      await locator.clear();
    });
  }

  /**
   * To validate whether the given checkbox is checked.
   * @param locator - Locator of the checkbox.
   */
  async isCheckboxChecked(locator: Locator): Promise<boolean> {
    return await test.step(`Checking whether checkbox with locator: ${locator} is checked or not`, async () => {
      return await locator.isChecked();
    });
  }

  /**
   * To check the given checkbox.
   * @param locator - Locator of the checkbox.
   */
  async checkTheCheckbox(locator: Locator) {
    await test.step(`Checking the checkbox with locator: ${locator}`, async () => {
      await locator.check();
    });
  }

  /**
   * To get the content of the input field.
   * @param locator - Locator of the input field.
   */
  async getFieldContent(locator: Locator): Promise<string> {
    return await test.step(`Get contents of the field with locator: ${locator}`, async () => {
      return (await locator.textContent()) ?? "";
    });
  }

  /**
   * To upload file.
   * @param locator - Locator of the element use to upload the file.
   * @param uploadpath - Path of the file that needs uploading.
   */
  async uploadFile(locator: Locator, uploadpath: string) {
    await test.step(`Uploading for element with locator: ${locator} from path ${uploadpath}`, async () => {
      await locator.setInputFiles(uploadpath);
    });
  }

  /**
   * To refresh the current page.
   */
  async refreshPage() {
    await test.step(`Refreshing the current page`, async () => {
      await this.page.reload();
      await this.page.waitForLoadState("networkidle");
    });
  }

  /**
   * To handle the auto-suggestion box.
   * @param inputFieldLocator - The locator for the input field.
   * @param searchText - The text to be searched in the suggestion box.
   * @param sugesstionDropdownlocator - The locator for the suggestionbox dropdown.
   * @param selectText - The text to be selected in the suggestion box.
   */
  async handleAutoSuggestionBox(
    inputFieldLocator: Locator,
    searchText: string,
    sugesstionDropdownlocator: Locator,
    selectText: string,
  ) {
    await test.step(`Handling the suggesstion box`, async () => {
      await inputFieldLocator.fill(searchText);
      await this.verifier.isVisible(
        sugesstionDropdownlocator.filter({ hasText: selectText }),
      );
      await this.clickElement(
        sugesstionDropdownlocator.filter({ hasText: selectText }),
      );
      await this.verifier.verifyInputFieldHasValue(
        inputFieldLocator,
        selectText,
      );
    });
  }

  /**
   * Wait for the page to load completely by waiting for the network to be idle.
   */
  async waitForPageToLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async handleDropdownField(
    inputFieldLocator: Locator,
    optionToBeSelected: string,
  ) {
    await test.step(`Handling the dropdown field`, async () => {
      await inputFieldLocator.selectOption(optionToBeSelected);
    });
  }
}
