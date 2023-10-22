import {axiosInstance} from "../config/axios-config";

export const ProductService = {
    addProduct: (product) => {
        return axiosInstance.post('/products', product);
    },
    getLatestBid: (productId) => {
        return axiosInstance.get(`/products/${id}/bids?filter=latest`)
    }


}