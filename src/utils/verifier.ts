import { expect, Locator } from "@playwright/test";

export class Verifier {

    constructor(){}

    static async isVisible(locator: Locator, timeout?: number){
        await expect(locator).toBeVisible({timeout: timeout});
    }
}