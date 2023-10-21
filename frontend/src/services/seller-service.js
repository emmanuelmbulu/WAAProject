import { axiosInstance } from "../config/axios-config";

export const SellerService = {
  addSeller: (seller) => {
    axiosInstance.post("/sellers", seller);
  },
};
