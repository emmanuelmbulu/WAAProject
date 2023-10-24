import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

export const WinnerService = {
  addWinner: (winner) => {
    const token = Cookies.get("token");

    return axiosInstance.post("/winners", winner, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllWinners: () => {
    const token = Cookies.get("token");

    return axiosInstance.get("/winners", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
