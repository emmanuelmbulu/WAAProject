import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";


export const AuthenticationService = {
  login: (user) => {
    return axiosInstance.post("/login", user);
  },
  logout: () => {
    const token = Cookies.get("token");
    const user = {token};
    Cookies.remove('token');
    Cookies.remove('user');
    return axiosInstance.post('/logout', user);
  }
};
