import logo from './logo.svg';
import './App.css';
import CustomerRegistrationComponent from "./components/customerRegistrationCom/customer-registration";
import ProductRegistrationComponent from "./components/productRegistrationCom/product-registration";

function App() {
  return (
    <div className="App">
        {/*<CustomerRegistrationComponent />*/}
      <ProductRegistrationComponent />
    </div>
  );
}

export default App;
