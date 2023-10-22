import {useEffect, useState} from "react";
import {PaymentService} from "../../service/payment-service";





export default function SingleProduct(props) {
    const product = props.item;
    const customerId = product.customer;
    const dueDate = new Date(product.biddingPrice.endingTime);
    const timeDifference = dueDate - new Date();

    const [canBid, setCanBid] = useState(false);
    const [timeLeft, setTimeLeft] = useState(timeDifference);
    const [hasBid, setHasBid] = useState(false);
    const [highestBid, setHighestBid] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                const response = await PaymentService.getDeposit(customerId, product.id);
                setCanBid(true);
            } catch (err) {
                setCanBid(false);
            }
        })();
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await BidService.getDeposit(customerId, product.id);
                setHasBid(true);
                setHighestBid(response.data);
            } catch (err) {
                setHasBid(false);
            }
        })();
    });



    const timeToString = (time) => {
        function formatTime(t) {
            if (t <= 9) return "0" + t;
            return t;
        }

        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time / (1000 * 60 * 60)));
        const minutes = Math.floor((time / (1000 * 60)));
        const seconds = Math.floor((time / 1000));

        return `${formatTime(days)} days : ${formatTime(hours)} hh : ${formatTime(minutes)} min : ${formatTime(seconds)} sec`;
    };

    const setPrice = () => {

    };

    useEffect(()=> {
        setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)
    })

    return (
        <div>
            <div className="col">
                <div className="card h-100">
                    <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        {hasBid && <p className="card-text">Price: {highestBid.price} </p>}
                        {!hasBid && <p className="card-text">Price: {product.biddingPrice.price} </p>}
                        <p className="card-text">Timer: {timeToString(timeLeft)}</p>
                        {canBid && <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">BID NOW</button>}
                        {!canBid && <button>START BIDDING</button>}

                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label htmlFor="amount" className="col-form-label">Enter Amount: </label>
                                </div>
                                <div className="col-auto">
                                    <input name='amount' type="text" id="amount" className="form-control" placeholder='Amount' />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={setPrice}>Enter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}