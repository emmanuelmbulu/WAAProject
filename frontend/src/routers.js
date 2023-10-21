import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);

export default router;
