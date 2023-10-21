import Bid from "./bid";
import Product from "./product";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  const bids = [
    {
      price: 40,
      createrAt: "12-2-2023",
      product: {
        name: "phone",
        description: "good",
        biddingPrice: 30,
        isSavedWithRelease: true,
      },
    },
    {
      price: 50,
      createrAt: "1-2-2023",
      product: {
        name: "tablet",
        description: "good",
        biddingPrice: 10,
        isSavedWithRelease: false,
      },
    },
    {
      price: 30,
      createrAt: "3-2-2023",
      product: {
        name: "TV",
        description: "good",
        biddingPrice: 30,
        isSavedWithRelease: true,
      },
    },
    {
      price: 60,
      createrAt: "2-2-2023",
      product: {
        name: "phone",
        description: "good",
        biddingPrice: 40,
        isSavedWithRelease: true,
      },
    },
  ];
  const [bid, setBid] = useState({ bids: bids });

  React.useEffect(() => {
    console.log(bids);
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col>1 of 1</Col>
        </Row>
      </Container>
      {/* <p></p>
      <ul>
        {bid.bids.map((b, index) => (
          <li key={index}>{b.price}Hey</li>
        ))}
      </ul> */}
    </div>
  );
}
