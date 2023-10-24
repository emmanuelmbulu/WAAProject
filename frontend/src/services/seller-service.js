import { axiosInstance } from "../config/axios-config";

export const SellerService = {
  addSeller: (seller) => {
    const token = Cookies.get("token");
    return axiosInstance.post("/sellers", seller, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
