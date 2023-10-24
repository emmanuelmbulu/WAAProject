import Navbar from "./shared/Navbar";
import SingleProductForBidding from "../../components/bidding/single-product-for-bidding";
import Footer from "../../components/shared/Footer";
import React, {useEffect, useState} from "react";
import {CustomerService} from "../../services/customer-service";

export default function BidsHistory() {
    const [bids, setBids] = useState([]);
    const [bidsLength, setBidsLength] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const response = await CustomerService.getAllBidsMade();
                if(response.data.length !== bidsLength) {
                    setBidsLength(response.data.length);
                    setBids(response.data);
                }
            } catch (exception) {
                if(bidsLength === 0) setBids([]);
            }
        })();
    });

    return (
        <>
            <Navbar />
            <section className="py-3">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className={'row'}>
                        <div className={'ist-group'}>
                            {bids.map((b) => (
                                <SingleProductForBidding key={b.id} item={b} />
                            ))}
                        </div>
                        {!bidsLength && <div className="alert alert-info" role="alert">
                            We did not find any bids made by you!
                        </div>}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}