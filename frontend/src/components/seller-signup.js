import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SellerService } from "../services/seller-service";

export default function SellerSignup() {
  const [seller, setSeller] = useState({
    name: "",
    emailAddress: "",
    password: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target;
    setSeller({ ...seller, [input.name]: input.value });
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
        name="name"
        value={seller.name}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="name"
      />
      <input
        type="password"
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
        value={seller.address.street}
        onChange={(e) =>
          setSeller({
            ...seller,
            address: { ...seller.address, street: e.target.value },
          })
        }
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="street"
      />
      <input
        type="text"
        value={seller.address.city}
        onChange={(e) =>
          setSeller({
            ...seller,
            address: { ...seller.address, city: e.target.value },
          })
        }
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="city"
      />
      <input
        type="text"
        value={seller.address.state}
        onChange={(e) =>
          setSeller({
            ...seller,
            address: { ...seller.address, state: e.target.value },
          })
        }
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="state"
      />
      <input
        type="text"
        value={seller.address.zipCode}
        onChange={(e) =>
          setSeller({
            ...seller,
            address: { ...seller.address, zipCode: e.target.value },
          })
        }
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="zipCode"
      />
      <button onClick={handleSignup}>SignUp</button>
    </div>
  );
}
