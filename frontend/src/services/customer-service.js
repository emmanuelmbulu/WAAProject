import {axiosInstance} from "../config/axios-config";

export const CustomerService = {
    addCustomer: (customer) => {
        return axiosInstance.post("/customers", customer);
    },
    getAllBidsMade: () => {
        const custmerId = 1;
        return axiosInstance.get(`/customers/${custmerId}/bids`);
    }
}