export type allProductResponse = {
  count: number;
  data: dataItems[];
  message: "All Products fetched Successfully";
};

export type dataItems = {
  productAddedBy: string;
  productCategory: string;
  productDescription: string;
  productFor: string;
  productImage: string;
  productName: string;
  productPrice: number;
  productRating: string;
  productStatus: boolean;
  productSubCategory: string;
  productTotalOrders: string;
  __v: number;
  _id: string;
};

export type allProductApiPayload = {
  productName: string;
  minPrice: number | null;
  maxPrice: number | null;
  productCategory: string[];
  productSubCategory: string[];
  productFor: string[];
};

export type addProductToCartPayload = {
  _id: string;
  product: products;
};

export type products = {
  _id: string;
  productName: string;
  productCategory: string;
  productSubCategory: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  productRating: string;
  productTotalOrders: string;
  productStatus: boolean;
  productFor: string;
  productAddedBy: string;
  __v: number;
};
