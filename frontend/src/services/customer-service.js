import {axiosInstance} from "../config/axios-config";

export const CustomerService = {
    addCustomer: (customer) => {
        return axiosInstance.post("/customers", customer);
    },
    getAllBidsMade: () => {
        const customerId = 1;
        return axiosInstance.get(`/customers/${customerId}/bids`);
    },
    getCustomer: (customerId) => axiosInstance.get(`/customers/${customerId}`),
    getCurrentCustomer: () => {
        const customerId = 1;
        return axiosInstance.get(`/customers/${customerId}`);
    }
}