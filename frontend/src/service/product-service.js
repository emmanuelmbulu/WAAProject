import {axiosInstance} from "../config/axios-config";

export const ProductService = {
    addProduct: (product) => {
        return axiosInstance.post('/products', product);
    }
}