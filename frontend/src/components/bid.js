import { useState, useContext } from "react";
import { BidService } from "../services/bid-service";
// import GlobalContext from "./core/context";
import bidData from "../data/bidData";
export default function Bid() {
  const [bid, setBid] = useState({ amount: 0 });

  const handleBid = () => {
    const startingPrice = 100;
    if (bid.amount < startingPrice) {
      alert("put a valid amount");
    } else {
      const price = bid.amount;
      const bidData = bidData(1, price, 1);
      BidService.putBid(bidData);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={bid.amount}
        placeholder="Bidding Amount"
        onChange={(e) => setBid({ amount: e.target.value })}
      />
      <button onClick={handleBid}>Start Bidding</button>
    </div>
  );
}
