import {axiosInstance} from "../config/axios-config";

export const CustomerService = {
    addCustomer: (customer) => {
        return axiosInstance.post("/customers", customer);
    }
}