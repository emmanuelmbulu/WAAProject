import { useState, useContext } from "react";
// import GlobalContext from "./core/context";
export default function Bid() {
  const [bid, setBid] = useState({});
  //   const { state, setState } = useContext(GlobalContext);
  return (
    <div>
      <p>Starts on {}</p>
      {/* <button onClick={handleBid}>Bid Now</button> */}
    </div>
  );
}
