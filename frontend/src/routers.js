import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Layout from "./components/layout";
import SellerSignup from "./components/seller-signup";
import Bid from "./components/bid";
import ProductRegistrationComponent from "./components/productRegistrationCom/product-registration";
import ProductList from "./components/productList";
import CustomerRegistrationComponent from "./components/customerRegistrationCom/customer-registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/bids", element: <Bid /> },
      { path: "/sellers", element: <SellerSignup /> },
      { path: "/products", element: <ProductRegistrationComponent /> },
      { path: "/productList", element: <ProductList /> },
      { path: "/customers", element: <CustomerRegistrationComponent /> },
    ],
  },
]);

export default router;
