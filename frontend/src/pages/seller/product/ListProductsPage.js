import Navbar from "../shared/Navbar";
import SideBar from "../shared/SideBar";
import ErrorNotification from "../../../components/shared/error-notification/ErrorNotification";
import Footer from "../../../components/shared/Footer";
import React, {useEffect, useState} from "react";
import {ProductService} from "../../../services/product-service";
import {SellerService} from "../../../services/seller-service";
import SingleProductForBidding from "../../../components/bidding/single-product-for-bidding";
import SingleProductForSeller from "../../../components/product/single-product-for-seller";

export default function ListProductsPage() {
    const [products, setProducts] = useState([]);
    const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await SellerService.getAllProductsBySeller();
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
                        <div className={'col-md-3 col-sm-5'}>
                            <SideBar />
                        </div>
                        <div className={'col-md-9 col-sm-7'}>
                            <h1>My products</h1>
                            <hr />
                            <div className={'row mt-5'}>
                                {products.map((p) => (
                                    <div key={p.id} className={'col-md-3 col-sm-4 pb-3'}><SingleProductForSeller item={p} /></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}