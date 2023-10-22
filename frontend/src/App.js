
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signUp";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import GlobalContext from "./core/context";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {

  return (
    <div className="App">

        {<CustomerRegistrationComponent />}
      <ProductRegistrationComponent />

    </div>
  );
}

export default App;
