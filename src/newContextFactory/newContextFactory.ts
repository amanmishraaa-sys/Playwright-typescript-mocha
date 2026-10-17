import { APIRequestContext, request } from "@playwright/test";

export class NewContextFactory {
  constructor() {}

  /**
   * To create a new API request context.
   */
  static async createNewContextWithRequest(): Promise<APIRequestContext> {
    const apiContext = await request.newContext();
    return apiContext;
  }
}
