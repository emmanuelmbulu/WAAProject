import logo from './logo.svg';
import AddProductPage from "./pages/seller/product/AddProductPage";
import { useState, useEffect } from "react";
import "./App.css";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import GlobalContext from "./core/context";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [state, setState] = useState({
    product: ["p1", "p2", "p3"],
    token: null,
  });

  return (
    <div className="App">
      <AddProductPage />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
