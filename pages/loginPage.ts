import { Page } from "@playwright/test";

export class LoginPage{
    constructor(private page: Page){}

    async navigateToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async getPageTitle(){
        return await this.page.title();
    }
}