import React from "react";
import { WinnerService } from "../services/winner-service";

export default function Winner(props) {
  console.log("props is ", props);
  const product = props.winnerData.product;
  const winner = props.winnerData.winner;
  const bids = props.winnerData.bids;

  return (
    <div>
      <h1>Product name:{product.name}</h1>
      <h1>Product price:{product.price}</h1>

      <h3>Winner first name:{winner.name.firstName}</h3>
      <h3>Winner last name:{winner.name.lastName}</h3>
      <div>Total bids:{bids.total}</div>
      <div>Final bid:{bids.finalPrice}</div>
    </div>
  );
}
