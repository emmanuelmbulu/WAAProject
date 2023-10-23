import Winner from "./winner";
import { WinnerService } from "../services/winner-service";
import { useEffect, useState } from "react";

const allWinners = [
  {
    id: 1,
    product: {
      name: "Product 1",
      price: 100,
    },
    winner: {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
    },
    bids: {
      total: 10,
      finalPrice: 90,
    },
  },
  {
    id: 2,
    product: {
      name: "Product 2",
      price: 150,
    },
    winner: {
      name: {
        firstName: "Alice",
        lastName: "Smith",
      },
    },
    bids: {
      total: 15,
      finalPrice: 130,
    },
  },
];

export default function WinnerList() {
  const [winners, setWinners] = useState(allWinners);

  useEffect(() => {
    (async () => {
      try {
        const response = await WinnerService.getAllWinners();
        console.log(response);
        //setWinners(response.data);
      } catch (exception) {
        //setWinners([]);
      }
    })();
  }, []);

  console.log("all is ", allWinners);

  return (
    <div>
      {winners.map((w) => (
        <Winner key={w.id} winnerData={w} />
      ))}
    </div>
  );
}
