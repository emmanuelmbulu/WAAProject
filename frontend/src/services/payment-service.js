import { axiosInstance } from "../config/axios-config";

export const PaymentService = {
  getDeposit: (customerId, productId) => {
    return axiosInstance.get(
      `/payments/deposits?prod=${productId}&&cust=${customerId}`
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
