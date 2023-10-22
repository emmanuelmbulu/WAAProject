import axios from "axios";

export const PaymentService = {
    getDeposit: (customerId, productId) => {
        return axios.get(`/"payments/deposits?prodID=${productId}&&cust=${customerId}`)
    }


}