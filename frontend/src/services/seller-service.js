import { axiosInstance } from "../config/axios-config";

export const SellerService = {
  addSeller: (seller) => {
    return axiosInstance.post("/sellers", seller);
  },
  getAllProductsBySeller: () => {
    const sellerId = 1;
    return axiosInstance.get(`/sellers/${sellerId}/products`);
  }
};
