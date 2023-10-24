import { axiosInstance } from "../config/axios-config";

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
    return axiosInstance.get("/winners");
  },
};
