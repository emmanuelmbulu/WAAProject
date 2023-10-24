import { createBrowserRouter } from "react-router-dom";
import CustomerLogin from "./components/customerLogin";
import SellerLogin from "./components/sellerLogin";
import Layout from "./components/layout";
import SellerSignup from "./components/seller-signup";
import Bid from "./components/bid";
import ProductRegistrationComponent from "./components/productRegistrationCom/product-registration";
import ProductList from "./components/productList";
import CustomerRegistrationComponent from "./components/customerRegistrationCom/customer-registration";
import AddProductPage from "./pages/seller/product/AddProductPage";
import WinnerList from "./components/winnerList";
import SellerSignUp from "./pages/seller/auth/SellerSignUp";
import CustomerSignUp from "./pages/customer/auth/CustomerSignUp";
import BidsHistory from "./pages/customer/BidsHistory";
import BiddingPage from "./pages/customer/BiddingPage";
import ListProductsPage from "./pages/seller/product/ListProductsPage";
import BiddingProductPage from "./pages/customer/BiddingProductPage";
import ProductDetailsPage from "./pages/seller/product/ProductDetailsPage";
import EditProductPage from "./pages/seller/product/EditProductPage";
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

      {path: '/seller/products/add-product', element: <AddProductPage />},
      {path: '/seller/products/:id', element: <ProductDetailsPage />},
      {path: '/seller/products/:id/edit', element: <EditProductPage />},
      {path: '/seller/products', element: <ListProductsPage />},
      {path: '/seller/sign-up', element: <SellerSignUp /> },
      {path: '/seller/sign-in', element: <SellerSignUp /> },

      {path: '/sign-up', element: <CustomerSignUp />},
      {path: '/sign-in'},
      {path: '/bidding', element:<BiddingPage />},
      {path: '/bidding/:id', element:<BiddingProductPage />},
      {path: '/bids-history', element: <BidsHistory />}
    ],
  },
]);

export default router;
