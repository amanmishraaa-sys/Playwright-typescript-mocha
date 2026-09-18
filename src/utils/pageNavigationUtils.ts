import { Page,test } from "@playwright/test";

export class pageNavigationUtil {


    constructor(readonly page:Page){
    }

    async navigateToUrl(url: string){
        await test.step(`Navigating to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }
}