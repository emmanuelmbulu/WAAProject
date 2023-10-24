import Navbar from "./shared/Navbar";
import Footer from "../../components/shared/Footer";
import React, {useEffect, useState} from "react";
import {ProductService} from "../../services/product-service";
import SingleProductForBidding from "../../components/bidding/single-product-for-bidding";

export default function BiddingPage({children}) {
    const [products, setProducts] = useState([]);
    const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getAllProducts();
                if(response.data.length !== productsLength) {
                    setProductsLength(response.data.length);
                    setProducts(response.data);
                }
            } catch (exception) {
                if(productsLength === 0) setProducts([]);
            }
        })();
    });

    return (
        <>
            <Navbar />
            <section className="py-3">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className={'row'}>
                        {products.map((p) => (
                            <SingleProductForBidding key={p.id} item={p} customer={1} />
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}