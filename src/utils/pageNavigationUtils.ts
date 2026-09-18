import { Page,test } from "@playwright/test";

export class pageNavigationUtil {


    constructor(readonly page:Page){
    }

    async navigateToUrl(url: string){
        await test.step(`Navigating to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async navigateToUrlWithPreLoadedToken(token: string, navigationUrl: string){
        await test.step(`Navigate to url: ${navigationUrl} with preloaded token: ${token}`, async() => {
            await this.page.addInitScript((value) => {
                window.localStorage.setItem('token',value);
            }, token);
        await this.navigateToUrl(navigationUrl);
        });
    }
}