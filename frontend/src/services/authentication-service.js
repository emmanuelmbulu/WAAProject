import { axiosInstance } from "../config/axios-config";

export const authenticationService = {
  login: (user) => {
    const token = Cookies.get("token");
    axiosInstance.post("/login", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
