import { useEffect, useState } from "react";
import { PaymentService } from "../../services/payment-service";
import BidData from "../../data/bidData";
import { BidService } from "../../services/bid-service";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product-service";

function timeToString(time) {
  function formatTime(t) {
    if (t <= 9) return "0" + t;
    return t;
  }

  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  return `${formatTime(days)} days : ${formatTime(
    remainingHours
  )} hh : ${formatTime(remainingMinutes)} min : ${formatTime(
    remainingSeconds
  )} sec`;
}

export default function SingleProduct(props) {
  const product = props.item;
  const customerId = props.customer;
  const dueDate = new Date(product.biddingPrice.endingTime);
  const timeDifference = dueDate - new Date();

  const [canBid, setCanBid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeDifference);
  const [hasBid, setHasBid] = useState(false);
  const [highestBid, setHighestBid] = useState(null);
  const [amount, setAmount] = useState({ amount: "" });

  useEffect(() => {
    (async () => {
      try {
        const response = await PaymentService.getDeposit(
          customerId,
          product.id
        );
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
        setHasBid(true);
        setHighestBid(response.data);
        console.log("data is ", response);
      } catch (err) {
        setHasBid(false);
      }
    })();
  });

  const setPrice = () => {};

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1000);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div>
      <div className="col">
        <div className="card h-100">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            {hasBid && <p className="card-text">Price: {highestBid.price} </p>}
            {!hasBid && (
              <p className="card-text">Price: {product.biddingPrice.price} </p>
            )}
            <p className="card-text">Timer: {timeToString(timeLeft)}</p>
            {canBid && (
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                BID NOW
              </button>
            )}
            {!canBid && <button>START BIDDING</button>}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="amount" className="col-form-label">
                    Enter Amount:{" "}
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    value="amount"
                    type="text"
                    id="amount"
                    className="form-control"
                    placeholder="Amount"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={setPrice}
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
