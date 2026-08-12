import { Page, test, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../testcases.env')});

export class UploadDownloadPage {

    readonly choosFileButton: Locator;
    readonly loginUrl: string = process.env.baseUrl!;

    constructor(readonly page: Page){
        this.choosFileButton = page.locator("#fileinput");
    }

    async navigateToUploadDownloadPage(){
        await test.step(`Navigate to URL: ${this.loginUrl+"/upload-download-test/index.html"}`, async () => {
            await this.page.goto(this.loginUrl+"/upload-download-test/index.html");
        });
    }

    async uploadFile(filePath: string){
        await test.step(`Upload the file`, async() => {
            await this.choosFileButton.setInputFiles(filePath);
        });
    }
}