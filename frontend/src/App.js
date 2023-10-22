import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signUp";
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
      <GlobalContext.Provider value={(state, setState)} />
      <RouterProvider router={router} />
      <GlobalContext.Provider />
    </div>
  );
}

export default App;
