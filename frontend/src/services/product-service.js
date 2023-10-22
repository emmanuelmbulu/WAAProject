import { axiosInstance } from "../config/axios-config";

export const ProductService = {
  addProduct: (product) => {
    return axiosInstance.post("/products", product);
  },
  getAllProducts: () => {
    return axiosInstance.get("/products");
  },
  getLatestBid: (productId) => {
    return axiosInstance.get(`/products/${id}/bids/latest`);
  },
};
