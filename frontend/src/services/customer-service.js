import {axiosInstance} from "../config/axios-config";

export const CustomerService = {
    addCustomer: (customer) => {
        axiosInstance.post("/customers", customer);
    }
}