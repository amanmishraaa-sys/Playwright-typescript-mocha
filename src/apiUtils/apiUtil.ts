import { APIRequestContext, APIResponse, expect } from "@playwright/test";

export class APIUtil {
  readonly context: APIRequestContext;
  readonly apibaseurl: string;

  constructor(context: APIRequestContext, apibaseurl: string) {
    this.context = context;
    this.apibaseurl = apibaseurl;
  }

  getUrl(endpoint: string) {
    if (endpoint.startsWith("http") || endpoint.startsWith("https")) {
      return endpoint;
    }

    if (!endpoint.startsWith("/")) {
      endpoint = `/${endpoint}`;
    }
    return `${this.apibaseurl}${endpoint}`;
  }

  async get(
    endpoint: string,
    status: number,
    queryparams?: Record<string, string | number | boolean>,
  ) {
    const response: APIResponse = await this.context.get(
      this.getUrl(endpoint),
      {
        params: queryparams,
      },
    );
    expect(response.status()).toBe(status);
    const responsJson = await response.json();
    return responsJson;
  }

  async post(
    endpoint: string,
    status: number,
    data: any,
    headers?: Record<string, string>,
  ) {
    const response: APIResponse = await this.context.post(
      this.getUrl(endpoint),
      {
        data: data,
        headers: headers,
      },
    );
    expect(response.status()).toBe(status);
    const responsJson = await response.json();
    return responsJson;
  }
}
