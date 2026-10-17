import { Page, test, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { UtilManager } from "../utils/utilManager";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

const downloadPath = path.resolve(
  __dirname,
  "../test-data/downloadedFile.xlsx",
);

export class UploadDownloadPage {
  readonly utilManager: UtilManager;
  readonly choosFileButton: Locator;
  readonly loginUrl: string = process.env.baseUrl!;
  readonly downloadButton: Locator;
  readonly priceCellFirstRow: Locator;

  constructor(readonly page: Page) {
    this.utilManager = new UtilManager(this.page);
    this.choosFileButton = page.locator("#fileinput");
    this.downloadButton = page.getByRole("button", { name: "Download" });
    this.priceCellFirstRow = page.locator("[id='row-0'] [data-column-id='4']");
  }

  /**
   * To navigate to the upload/download page.
   */
  async navigateToUploadDownloadPage() {
    await test.step(`Navigate to URL: ${this.loginUrl + "/upload-download-test/index.html"}`, async () => {
      await this.utilManager.pNUtil.navigateToUrl(
        this.loginUrl + "/upload-download-test/index.html",
      );
    });
  }

  /**
   * To upload a file.
   * @param filePath - The path of the file to be uploaded.
   */
  async uploadFile(filePath: string) {
    await test.step(`Upload the file`, async () => {
      await this.utilManager.pAUtil.uploadFile(this.choosFileButton, filePath);
    });
  }

  /**
   * To click on the download button and save the file.
   */
  async clickOnDownloadButtonAndSaveFile() {
    await test.step(`Click on download button and saving the file to particular path`, async () => {
      const downloadPromise = this.page.waitForEvent("download");
      await this.utilManager.pAUtil.clickElement(this.downloadButton);
      const download = await downloadPromise;
      await download.saveAs(downloadPath);
      await this.utilManager.verifier.givenPathExists(downloadPath);
    });
  }

  /**
   * To delete the downloaded file.
   */
  async deleteDownloadedFile() {
    await test.step(`Delete the downloaded file at this path: ${downloadPath}`, async () => {
      await this.utilManager.fUtil.deleteFileIfExists(downloadPath);
    });
  }

  /**
   * To change the value in the downloaded file.
   * @param searchValue - The value to be searched in the downloaded file.
   * @param replaceValue - The value to replace the searched value in the downloaded file.
   */
  async changeThevalueInDownloadedFile(
    searchValue: string,
    replaceValue: string,
  ) {
    await test.step(`Change the value in downloaded file`, async () => {
      await this.utilManager.eUtil.findValueAndReplace(
        searchValue,
        replaceValue,
        downloadPath,
      );
    });
  }

  /**
   * To upload the modified file.
   */
  async uploadModifiedFile() {
    await test.step(`Upload the modified file`, async () => {
      await this.utilManager.pAUtil.uploadFile(
        this.choosFileButton,
        downloadPath,
      );
    });
  }

  /**
   * To verify the changes on the page after the modified file has been uploaded.
   */
  async verifyTheChangesOnThePage() {
    await test.step(`Verify the changes on the page after modified file has been uploaded`, async () => {
      await this.utilManager.verifier.textForLocator(
        this.priceCellFirstRow,
        "350",
      );
    });
  }
}
