import { axiosInstance } from "../config/axios-config";

export const authenticationService = {
  login: (user) => {
    axiosInstance.post("/login", user);
  },
};
