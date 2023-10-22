<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import CustomerRegistrationComponent from "./components/customerRegistrationCom/customer-registration";
import ProductRegistrationComponent from "./components/productRegistrationCom/product-registration";
=======
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signUp";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import GlobalContext from "./core/context";
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> origin/kaliebranch

function App() {
  const [state, setState] = useState({
    product: ["p1", "p2", "p3"],
    token: null,
  });

  return (
    <div className="App">
<<<<<<< HEAD
        {/*<CustomerRegistrationComponent />*/}
      <ProductRegistrationComponent />
=======
      <GlobalContext.Provider value={(state, setState)} />
      <RouterProvider router={router} />
      <GlobalContext.Provider />
>>>>>>> origin/kaliebranch
    </div>
  );
}

export default App;
