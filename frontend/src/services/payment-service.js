import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";

export const PaymentService = {
  getDeposit: (customerId, productId) => {
      const token = Cookies.get("token");

      return axiosInstance.get(
      `/payments/deposits?prod=${productId}&&cust=${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );
  },
  postDeposit: (paymentData) => {
      const token = Cookies.get("token");

      return axiosInstance.post("/payments/deposits", paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
