import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../testcases.env')});

export class AutomationPage{


    readonly loginUrl: string = process.env.baseUrl!;
    readonly alertButton: Locator;
    constructor( readonly page: Page){
        this.alertButton = page.locator("#confirmbtn");
    }

    async navigateToAutomationPage(){
        await this.page.goto(this.loginUrl+"/AutomationPractice/");
    }

    async checkAndAcceptAlert(){
        this.page.on('dialog', dialog => dialog.accept());
        await this.alertButton.click();
    }
}