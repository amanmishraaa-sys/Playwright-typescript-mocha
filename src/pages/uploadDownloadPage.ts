import { Page, test, Locator } from "@playwright/test";
import { FileUtils } from "../utils/fileUtils";
import dotenv from "dotenv";
import path from "path";
import { ExcelUtil } from "../utils/excelUtil";
import { Verifier } from "../utils/verifier";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

const downloadPath = path.resolve(
  __dirname,
  "../test-data/downloadedFile.xlsx",
);

export class UploadDownloadPage {
  readonly choosFileButton: Locator;
  readonly loginUrl: string = process.env.baseUrl!;
  readonly downloadButton: Locator;
  readonly priceCellFirstRow: Locator;

  constructor(readonly page: Page) {
    this.choosFileButton = page.locator("#fileinput");
    this.downloadButton = page.getByRole("button", { name: "Download" });
    this.priceCellFirstRow = page.locator("[id='row-0'] [data-column-id='4']");
  }

  async navigateToUploadDownloadPage() {
    await test.step(`Navigate to URL: ${this.loginUrl + "/upload-download-test/index.html"}`, async () => {
      await this.page.goto(this.loginUrl + "/upload-download-test/index.html");
    });
  }

  async uploadFile(filePath: string) {
    await test.step(`Upload the file`, async () => {
      await this.choosFileButton.setInputFiles(filePath);
    });
  }

  async clickOnDownloadButtonAndSaveFile() {
    await test.step(`Click on download button and saving the file to particular path`, async () => {
      const downloadPromise = this.page.waitForEvent("download");
      await this.downloadButton.click();
      const download = await downloadPromise;
      await download.saveAs(downloadPath);
      await Verifier.givenPathExists(downloadPath);
    });
  }

  async deleteDownloadedFile() {
    await test.step(`Delete the downloaded file at this path: ${downloadPath}`, async () => {
      await FileUtils.deleteFileIfExists(downloadPath);
    });
  }

  async changeThevalueInDownloadedFile(
    searchValue: string,
    replaceValue: string,
  ) {
    await test.step(`Change the value in downloaded file`, async () => {
      await ExcelUtil.findValueAndReplace(
        searchValue,
        replaceValue,
        downloadPath,
      );
    });
  }

  async uploadModifiedFile() {
    await test.step(`Upload the modified file`, async () => {
      await this.choosFileButton.setInputFiles(downloadPath);
    });
  }

  async verifyTheChangesOnThePage() {
    await test.step(`Verify the changes on the page after modified file has been uploaded`, async () => {
      await Verifier.textForLocator(this.priceCellFirstRow, "350");
    });
  }
}
