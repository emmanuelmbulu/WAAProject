import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

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
    const token = Cookies.get("token");

    return axiosInstance.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getLatestBid: (productId) => {
    const token = Cookies.get("token");

    return axiosInstance.get(`/products/${productId}/bids/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const token = Cookies.get("token");

    return axiosInstance.get(`products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
