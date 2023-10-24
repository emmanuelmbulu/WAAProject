import Navbar from "./shared/Navbar";
import Footer from "../../components/shared/Footer";
import React, {useEffect, useState} from "react";
import {CustomerService} from "../../services/customer-service";
import SingleBidCustomerSide from "../../components/bidding/single-bid-customer-side";

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
                    <div className={'row mb-4'}>
                        <h1>Your bids history</h1>
                        <hr />
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-7 col-sm-12'}>
                            <div className={'list-group'}>
                                {bids.map((b) => (
                                    <SingleBidCustomerSide key={b.id} item={b} />
                                ))}
                            </div>
                        </div>

                        {!bidsLength && <div className="alert alert-info" role="alert">
                            Sorry, we did not find any bids made by you!
                        </div>}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}