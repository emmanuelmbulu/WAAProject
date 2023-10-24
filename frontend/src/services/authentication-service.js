import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const authenticationService = {
  login: (user) => {
    axiosInstance.post("/login", user);
  },
};
