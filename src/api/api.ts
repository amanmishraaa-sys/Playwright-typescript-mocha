import { APIUtil } from "../apiUtils/apiUtil";
import dotenv from "dotenv";
import path from "path";
import { endpoints } from "../endpoints/endpoints";
import { APIRequestContext, APIResponse } from "@playwright/test";
import { apiPayLoad } from "./apiPayLoad";
import {
  addProductToCartPayload,
  allProductApiPayload,
  allProductResponse,
  dataItems,
} from "../api/type";
import fs from "fs/promises";

dotenv.config({ path: path.resolve(__dirname, "../../testcases.env") });

export class Api {
  readonly baseUrl: string;
  readonly apiUtils: APIUtil;
  readonly loginAPIPayload = {
    userEmail: "doubledouble@gmail.com",
    userPassword: "double@1234",
  };
  readonly apiPayload: apiPayLoad;
  static token: string;
  static userId: string;

  readonly allProductspayload = {
    productName: "",
    minPrice: null,
    maxPrice: null,
    productCategory: [],
    productSubCategory: [],
    productFor: [],
  };

  constructor(apiContext: APIRequestContext) {
    this.baseUrl = process.env.baseUrl!;
    this.apiUtils = new APIUtil(apiContext, this.baseUrl);
    this.apiPayload = new apiPayLoad();
  }

  async loginAPI() {
    const responsejson = await this.apiUtils.post(
      endpoints.login,
      200,
      this.loginAPIPayload,
    );
    const token: string = responsejson.token;
    const userId: string = responsejson.userId;
    Api.token = token;
    Api.userId = userId;
    await fs.writeFile("token.txt", Api.token);
  }

  async logoutAPI() {}

  async getAllProductsAPI() {
    const responseJson = await this.apiUtils.post(
      endpoints.allProducts,
      200,
      this.allProductspayload,
      {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: Api.token,
      },
    );
    console.log(responseJson);
    return responseJson;
  }

  async addProductsInCart(productNames: string[]) {
    const allProApiPayload: allProductApiPayload = {
      productName: "",
      minPrice: null,
      maxPrice: null,
      productCategory: [],
      productSubCategory: [],
      productFor: [],
    };
    const responseJson: allProductResponse = await this.apiUtils.post(
      endpoints.allProducts,
      200,
      await this.apiPayload.allProductsApiPayload(allProApiPayload),
      {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: Api.token,
      },
    );
    const products: dataItems[] = responseJson.data.filter((product) =>
      productNames.includes(product.productName),
    );

    console.log(products[0]._id);

    for (let i = 0; i < productNames.length; i++) {
      const addProductToCartPayload: addProductToCartPayload = {
        _id: Api.userId,
        product: {
          _id: products[i]._id,
          productName: products[i].productName,
          productCategory: products[i].productCategory,
          productSubCategory: products[i].productSubCategory,
          productPrice: products[i].productPrice,
          productDescription: products[i].productDescription,
          productImage: products[i].productImage,
          productRating: products[i].productRating,
          productTotalOrders: products[i].productTotalOrders,
          productStatus: products[i].productStatus,
          productFor: products[i].productFor,
          productAddedBy: products[i].productAddedBy,
          __v: products[i].__v,
        },
      };
      const addProductToCartJson = await this.apiUtils.post(
        endpoints.addToCart,
        200,
        await this.apiPayload.addProductToCartPayload(addProductToCartPayload),
        {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: Api.token,
        },
      );
      console.log(addProductToCartJson);
    }
  }
}
