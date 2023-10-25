import {useEffect, useRef, useState} from "react";
import {ProductService} from "../../services/product-service";
import BidData from "../../data/bidData";
import {BidService} from "../../services/bid-service";
import {PaymentService} from "../../services/payment-service";
import JavaDatetimeToDate from "../../utils/java-datetime-to-date";
import TimerToString from "../../utils/timer-to-string";
import {Link} from "react-router-dom";



export default function SingleProductForBidding(props) {
    const product = props.item;
    const customerId = props.customer;
    const dueDate = JavaDatetimeToDate(product.biddingPrice.endingTime);
    const timeDifference = dueDate - new Date();

    const [canBid, setCanBid] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeDifference);
    const [hasBid, setHasBid] = useState(false);
    const [highestBid, setHighestBid] = useState(null);

    const amountInput = useRef();

    useEffect(() => {
        (async () => {
            try {
                const response = await PaymentService.getDeposit(customerId, product.id);
                setCanBid(true);
            } catch (err) {
                setCanBid(false);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await ProductService.getLatestBid(product.id);
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
            <div className="col-md-3 col-sm-3 pb-3">
                <div className="card h-100">
                    {product.pictureUri && <img src={product.pictureUri} className="card-img-top border-bottom" alt={product.name}/>}
                    {!product.pictureUri && <img src={'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'} className="card-img-top border-bottom" alt={product.name}/>}

                    <div className="card-body">
                        <h5 className="card-title"><Link className={'text-decoration-none'} to={'/bidding/' + product.id}>{product.name}</Link></h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {hasBid && <p className={'card-text'}>Actual price: <mark>${highestBid.price}</mark></p>}
                            {!hasBid && <p className={'card-text'}>Actual price: <mark>${product.biddingPrice.price}</mark></p>}
                        </li>
                        <li className="list-group-item">
                            {(timeLeft <= (48 * 60 * 60000)) && <small><strong className="text-danger">{TimerToString(timeLeft)}</strong></small>}
                            {(timeLeft > (48 * 60 * 60000)) && <small><strong className="text-success">{TimerToString(timeLeft)}</strong></small>}
                        </li>
                    </ul>
                    <div className={'card-body'}>
                        <div className={'row ps-2 pe-2'}>
                            {canBid && <button
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={"#modalBidProduct" + product.id}>BID NOW</button>}

                            {!canBid && <button className={'btn btn-secondary'}
                                                data-bs-toggle="modal"
                                                data-bs-target={"#modalStartBidding" + product.id}
                            >START BIDDING</button>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={"modalStartBidding" + product.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Deposit payment required</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                In order to allow you to start bidding on this product, <strong>{product.name}</strong>, you have to pay for the initial deposit amount required.
                            </p>
                            <p>
                                The deposit amount for this product is <strong>${product.depositAmount}</strong>, so by clicking the <mark>Pay Now!</mark> button bellow, we will initialize the payment from your account.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={payDeposit}>Pay Now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id={"modalBidProduct" + product.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                        {!hasBid && <mark>${product.biddingPrice.price}</mark>}.
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