import React from "react";
import { WinnerService } from "../services/winner-service";

export default function Winner(props) {
  console.log("props is ", props);
  const product = props.winnerData.product;
  const winner = props.winnerData.winner;
  const bids = props.winnerData.bids;

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={product.pictureUri} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h5 className="card-title">Winner Name: {winner.name.firstName}</h5>
          <p className="card-text">Product price:{product.price}</p>
          <p className="card-text">Total bids:{bids.total}</p>
          <p className="card-text">Bid price:{bids.total}</p>
        </div>
      </div>
    </div>
  );
}
