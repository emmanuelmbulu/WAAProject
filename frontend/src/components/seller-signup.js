import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SellerService } from "../services/seller-service";

export default function SellerSignup() {
  const [seller, setSeller] = useState({
    name: { firstName: "", lastName: "" },
    emailAddress: "",
    password: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target;
    setSeller({ ...seller, [input.name]: input.value });
  };
  const handleName = (e) => {
    const input = e.target;
    setSeller({
      ...seller,
      name: { ...seller.name, [input.name]: input.value },
    });
  };
  const handleAddress = (e) => {
    const input = e.target;
    setSeller({
      ...seller,
      address: { ...seller.address, [input.name]: input.value },
    });
  };

  const handleSignup = () => {
    SellerService.addSeller(seller);
    // if (res && res.data) {
    navigate("/home");
    // }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Welcome to the bidding system</h1>
      <input
        type="text"
        name="firstName"
        value={seller.name.firstName}
        onChange={handleName}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="firstName"
      />
      <input
        type="text"
        name="lastName"
        value={seller.name.lastName}
        onChange={handleName}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="lastName"
      />
      <input
        type="text"
        name="emailAddress"
        value={seller.emailAddress}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="emailAddress"
      />
      <input
        type="password"
        name="password"
        value={seller.password}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="password"
      />
      <input
        type="text"
        name="street"
        value={seller.address.street}
        onChange={handleAddress}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="street"
      />
      <input
        type="text"
        name="city"
        value={seller.address.city}
        onChange={handleAddress}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="city"
      />
      <input
        type="text"
        name="state"
        value={seller.address.state}
        onChange={handleAddress}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="state"
      />
      <input
        type="text"
        name="zipCode"
        value={seller.address.zipCode}
        onChange={handleAddress}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="zipCode"
      />
      <button onClick={handleSignup}>SignUp</button>
    </div>
  );
}
