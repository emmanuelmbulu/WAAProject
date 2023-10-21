import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../network";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await login(user);
    // if (res && res.data) {
    navigate("/home");
    // }
  };

  return (
    <div>
      <h1>Welcome to bid</h1>
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
