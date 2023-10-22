import { axiosInstance } from "../config/axios-config";

export const BidService = {
  putBid: (bidData) => {
    return axiosInstance.post("/bids", bidData);
  },
};
