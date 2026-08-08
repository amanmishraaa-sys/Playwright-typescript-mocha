import { Page, test, Locator } from "@playwright/test";

export class UploadDownloadPage {

    readonly choosFileButton: Locator;
    readonly loginUrl: string = "https://rahulshettyacademy.com"

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