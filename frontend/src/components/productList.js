import SingleProduct from "./singleProductCom/single-product";
import React, { useEffect, useState } from "react";
import { ProductService } from "../services/product-service";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        console.log("Fetching....");
        const response = await ProductService.getAllProducts();
        setProducts(response.data);
      } catch (exception) {
        setProducts([]);
      }
    })();
  }, []);

  return (
    <div>
      {products.map((p) => (
        <SingleProduct item={p} customer={1} />
      ))}
    </div>
  );
}
