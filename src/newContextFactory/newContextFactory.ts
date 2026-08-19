import { APIRequestContext, request } from "@playwright/test";

export class NewContextFactory {
  constructor() {}

  static async createNewContextWithRequest(): Promise<APIRequestContext> {
    const apiContext = await request.newContext();
    return apiContext;
  }
}
