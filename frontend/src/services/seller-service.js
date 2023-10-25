import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

export const SellerService = {
  addSeller: (seller) => {
    return axiosInstance.post("/sellers", seller);
  },
  getAllProductsBySeller: () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user");

    return axiosInstance.get(`/sellers/${userId}/products`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  },
  getSeller: (sellerId) => {
    const token = Cookies.get("token");

    return axiosInstance.get(`/sellers/${sellerId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  },
  getCurrentSeller: () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user");

    return axiosInstance.get(`/sellers/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  }
};
