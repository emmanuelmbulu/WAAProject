import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthenticationService} from "../services/authentication-service";
import Cookies from "js-cookie";

export default function SellerLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const responce = AuthenticationService.login(user);

    if (responce && responce.data) {
      Cookies.set("token", responce.data, { expires: 7 });
      navigate("/sellers");
    }
  };

  return (
    <div>
      <h1>Welcome to the bidding system</h1>
      <input
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="email"
      />
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
