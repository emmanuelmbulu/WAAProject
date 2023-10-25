import { axiosInstance } from "../config/axios-config";
import Cookies from "js-cookie";


export const CustomerService = {
    addCustomer: (customer) => {
        return axiosInstance.post("/customers", customer);
    },
    getAllBidsMade: () => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");

        return axiosInstance.get(`/customers/${userId}/bids`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
    },
    getCustomer: (customerId) => {
        const token = Cookies.get("token");

        return axiosInstance.get(`/customers/${customerId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
    },
    getCurrentCustomer: () => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");

        return axiosInstance.get(`/customers/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
    }
}
