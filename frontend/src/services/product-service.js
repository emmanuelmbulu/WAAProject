import { axiosInstance } from "../config/axios-config";

export const ProductService = {
  addProduct: (product) => {
    return axiosInstance.post("/products", product);
  },
  getAllProducts: () => {
    return axiosInstance.get("/products");
  },
  getLatestBid: (productId) => {
    return axiosInstance.get(`/products/${productId}/bids/latest`);
  },
  uploadImage: (image, productId) => {
    return axiosInstance.post(`products/${productId}`, image)
  },
  getProduct: (productId) => {
    return axiosInstance.get(`products/${productId}`)
  },
  updateProduct: (productId, product) => {
    return axiosInstance.put(`/products/${productId}`, product)
  }
};
