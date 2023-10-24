import Navbar from "./shared/Navbar";
import Footer from "../../components/shared/Footer";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PaymentService} from "../../services/payment-service";
import {ProductService} from "../../services/product-service";
import BidData from "../../data/bidData";
import {BidService} from "../../services/bid-service";
import TimerToString from "../../utils/timer-to-string";
import JavaDatetimeToDate from "../../utils/java-datetime-to-date";

export default function BiddingProductPage(props) {
    const params = useParams();

    const customerId = 1;
    const productId = params.id;

    const [product, setProduct] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    const [canBid, setCanBid] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [hasBid, setHasBid] = useState(false);
    const [highestBid, setHighestBid] = useState(null);

    const amountInput = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getProduct(productId);
                const item = response.data;
                const dueDate = JavaDatetimeToDate(item.biddingPrice.endingTime);
                const timeDifference = dueDate - new Date();
                setProduct(response.data);
                setTimeLeft(timeDifference);
            } catch (err) {
                navigate('/product-not-found');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await PaymentService.getDeposit(customerId, productId);
                setCanBid(true);
            } catch (err) {
                setCanBid(false);
            }
        })();
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getLatestBid(productId);
                if(!highestBid || response.data.id !== highestBid.id) {
                    setHasBid(true);
                    setHighestBid(response.data);
                }
            } catch (err) {
                if(highestBid === null) setHasBid(false);
            }
        })();
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1000);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft]);

    const setPrice = () => {
        let currentPrice = product.biddingPrice.price;
        if(hasBid){
            currentPrice = highestBid.price;
        }
        const amt = parseFloat(amountInput.current.value);

        if(amt < currentPrice){
            alert("Amount entered can not be lower than the stated product price");
        } else {
            (async () => {
                try {
                    const bidData = new BidData(product.id, amt, customerId);
                    const response = BidService.putBid(bidData);
                } catch (err) {
                    alert("The amount entered has already been taken");
                }
            })();
        }
    }

    const payDeposit = () => {
        (async () => {
            try {
                const paymentData = {
                    customerId,
                    productId: product.id
                };
                const response = await PaymentService.postDeposit(paymentData);
                setCanBid(true);
            } catch (exception) {
                console.log(exception);
                alert('An error has occurred. Please try again later');
            }
        })();
    }

    return (
        <>
            <Navbar />
            <section className="py-3">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            {product && product.pictureUri && <img className="card-img-top mb-5 mb-md-0 border" src={product.pictureUri} alt={product.name}/>}
                            {product && !product.pictureUri && <img className="card-img-top mb-5 mb-md-0 border" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt={product.name}/>}
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">PRODUCT</div>
                            <h1 className="display-5 fw-bolder">{product && product.name}</h1>
                            <p className="lead">{product && product.description}</p>
                            <div className="fs-5 mt-2 mb-5">
                                {hasBid && <span className={'h4'}>Actual price: <mark>${highestBid.price}</mark></span>}
                                {!hasBid && <span className={'h4'}>Actual price: <mark>${product && product.biddingPrice.price}</mark></span>}

                            </div>
                            <p className={'lead'}>
                                <span>Product available for:</span>
                                <br/>
                                {(timeLeft <= (48 * 60 * 60000)) && <strong className="text-danger">{TimerToString(timeLeft)}</strong>}
                                {(timeLeft > (48 * 60 * 60000)) && <strong className="text-success">{TimerToString(timeLeft)}</strong>}
                            </p>
                            <div className="d-flex">
                                {canBid && <button
                                    className="btn btn-primary flex-shrink-0"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#modalBidProduct"}>BID NOW</button>}

                                {!canBid && <button className={'btn btn-secondary flex-shrink-0'}
                                                    data-bs-toggle="modal"
                                                    data-bs-target={"#modalStartBidding"}
                                >START BIDDING</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
            <div className="modal fade" id={"modalStartBidding"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Deposit payment required</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                In order to allow you to start bidding on this product, <strong>{product && product.name}</strong>, you have to pay for the initial deposit amount required.
                            </p>
                            <p>
                                The deposit amount for this product is <strong>${product && product.depositAmount}</strong>, so by clicking the <mark>Pay Now!</mark> button bellow, we will initialize the payment from your account.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={payDeposit}>Pay Now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={"modalBidProduct"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Set your price</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className={'card-text'}>
                                Make sure that your price is not equal or less than the actual price.
                            </p>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <div className="form-floating mb-3">
                                        <input className="form-control" type="text"
                                               name = 'price' id={'price'}
                                               ref={amountInput}
                                               placeholder={'Price'} />
                                        <label htmlFor="price">Your price</label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                      Must be greater than {hasBid && <mark>${highestBid.price}</mark>}
                                        {!hasBid && <mark>${product && product.biddingPrice.price}</mark>}.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={setPrice}>Validate</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}