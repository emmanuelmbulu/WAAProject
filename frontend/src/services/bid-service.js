import { axiosInstance } from "../config/axios-config";

export const BidService = {
  putBid: (bidData) => {
    const token = Cookies.get("token");
    return axiosInstance.post("/bids", bidData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
