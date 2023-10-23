import { axiosInstance } from "../config/axios-config";

export const WinnerService = {
  addWinner: (winner) => {
    return axiosInstance.post("/winners", winner);
  },
  getAllWinners: () => {
    return axiosInstance.get("/winners");
  },
};
