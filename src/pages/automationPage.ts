import { Page, Locator } from "@playwright/test";

export class AutomationPage{


    readonly loginUrl: string = "https://rahulshettyacademy.com"
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