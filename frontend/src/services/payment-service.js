import {axiosInstance} from "../config/axios-config";

export const PaymentService = {
    getDeposit: (customerId, productId) => {
        return axiosInstance.get(`/"payments/deposits?prod=${productId}&&cust=${customerId}`)
    }
}