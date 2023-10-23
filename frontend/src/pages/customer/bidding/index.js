import Footer from "../../../components/shared/Footer";
import Navbar from "../shared/Navbar";
import React, {useEffect, useState} from "react";
import {ProductService} from "../../../services/product-service";
import SingleProductForBidding from "../../../components/bidding/single-product-for-bidding";

export default function Bidding() {
    const [products, setProducts] = useState([]);
    let productLength = 0;

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getAllProducts();
                if(response.data.length !== productLength) {
                    productLength = response.data.length;
                    setProducts(response.data);
                }
            } catch (exception) {
                setProducts([]);
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