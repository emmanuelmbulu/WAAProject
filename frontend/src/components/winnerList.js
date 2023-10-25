import Winner from "./winner";
import { WinnerService } from "../services/winner-service";
import React, { useEffect, useState } from "react";
import Navbar from "../pages/customer/shared/Navbar";
import SingleProductForBidding from "./bidding/single-product-for-bidding";
import Footer from "./shared/Footer";

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
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
];

export default function WinnerList() {
  const [winners, setWinners] = useState(allWinners);
  const [winnersLength, setWinnersLength] = useState(6);

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
      <>
        <Navbar />
        <section className="py-3">
          <div className="container px-4 px-lg-5 mt-5">
            <div className={'row mb-4'}>
              <h1>Latest winners</h1>
              <hr />
            </div>
            <div className={'row'}>
              {winners.map((w) => (
                  <div className="col-md-3 pb-4">
                    <Winner key={w.id} winnerData={w} />
                  </div>
              ))}
            </div>

            {!winnersLength && <div className="alert alert-info" role="alert">
              Sorry, we did not find any winners so far!
            </div>}
          </div>
        </section>
        <Footer/>
      </>
  );
}
