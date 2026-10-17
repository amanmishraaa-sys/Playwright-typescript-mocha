import { allProductApiPayload } from "../api/type";
import { addProductToCartPayload } from "../api/type";

export class apiPayLoad {

  /**
   * To create the API payload for getting all products.
   * @param apiPayload - The API payload for all products.
   */
  allProductsApiPayload(apiPayload: allProductApiPayload) {
    return {
      productName: apiPayload.productName,
      minPrice: apiPayload.minPrice,
      maxPrice: apiPayload.maxPrice,
      productCategory: apiPayload.productCategory,
      productSubCategory: apiPayload.productSubCategory,
      productFor: apiPayload.productFor,
    };
  }

  /**
   * To create the API payload for adding products to the cart.
   * @param addProductToCartapiPayload - The API payload for adding products to the cart.
   */
  addProductToCartPayload(
    addProductToCartapiPayload: addProductToCartPayload,
  ) {
    return {
      _id: addProductToCartapiPayload._id,
      product: {
        _id: addProductToCartapiPayload.product._id,
        productName: addProductToCartapiPayload.product.productName,
        productCategory: addProductToCartapiPayload.product.productCategory,
        productSubCategory:
          addProductToCartapiPayload.product.productSubCategory,
        productPrice: addProductToCartapiPayload.product.productPrice,
        productDescription:
          addProductToCartapiPayload.product.productDescription,
        productImage: addProductToCartapiPayload.product.productImage,
        productRating: addProductToCartapiPayload.product.productRating,
        productTotalOrders:
          addProductToCartapiPayload.product.productTotalOrders,
        productStatus: addProductToCartapiPayload.product.productStatus,
        productFor: addProductToCartapiPayload.product.productFor,
        productAddedBy: addProductToCartapiPayload.product.productAddedBy,
        __v: addProductToCartapiPayload.product.__v,
      },
    };
  }
}
