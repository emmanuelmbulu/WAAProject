import { createBrowserRouter } from "react-router-dom";
import CustomerLogin from "./components/customerLogin";
import SellerLogin from "./components/sellerLogin";
import Layout from "./components/layout";
import SellerSignup from "./components/seller-signup";
import Bid from "./components/bid";
import ProductRegistrationComponent from "./components/productRegistrationCom/product-registration";
import ProductList from "./components/productList";
import CustomerRegistrationComponent from "./components/customerRegistrationCom/customer-registration";
import WinnerList from "./components/winnerList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/customerlogin", element: <CustomerLogin /> },
      { path: "/sellerlogin", element: <SellerLogin /> },
      { path: "/bids", element: <Bid /> },
      { path: "/sellers", element: <SellerSignup /> },
      { path: "/products", element: <ProductRegistrationComponent /> },
      { path: "/productList", element: <ProductList /> },
      { path: "/winners", element: <WinnerList /> },
      { path: "/customers", element: <CustomerRegistrationComponent /> },
    ],
  },
]);

export default router;
