import { axiosInstance } from "../config/axios-config";

export const ProductService = {
  addProduct: (product) => {
    const token = Cookies.get("token");
    return axiosInstance.post("/products", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllProducts: () => {
    return axiosInstance.get("/products");
  },
  getLatestBid: (productId) => {
    return axiosInstance.get(`/products/${productId}/bids/latest`);
  },
  uploadImage: (image, productId) => {
    const token = Cookies.get("token");
    return axiosInstance.post(`products/${productId}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProduct: (productId) => {
    return axiosInstance.get(`products/${productId}`);
  },
  updateProduct: (productId, product) => {
    const token = Cookies.get("token");
    return axiosInstance.put(`/products/${productId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
