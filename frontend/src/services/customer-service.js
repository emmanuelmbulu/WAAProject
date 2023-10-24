import { axiosInstance } from "../config/axios-config";

export const CustomerService = {
  addCustomer: (customer) => {
    const token = Cookies.get("token");
    return axiosInstance.post("/customers", customer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
