import { axiosInstance } from "../config/axios-config";

export const SellerService = {
  addSeller: (seller) => {
    return axiosInstance.post("/sellers", seller);
  },
};
