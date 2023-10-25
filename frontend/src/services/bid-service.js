import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

export const BidService = {
  putBid: (bidData) => {
    const token = Cookies.get("token");

    return axiosInstance.post("/bids", bidData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
  },
};
