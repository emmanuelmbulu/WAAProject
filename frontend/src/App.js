import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signUp";
import router from "./routers";
import { RouterProvider } from "react-router-dom";

function App() {
  const [state, setState] = useState();

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Login /> */}
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
