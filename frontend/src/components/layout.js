import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  //   const handleLoginClick = () => {
  //     navigate("/login");
  //   };

  //   const handleSignUpClick = () => {
  //     navigate("/signUp");
  //   };

  return (
    <div>
      <Outlet />
      {/* <button value="Login" onClick={handleLoginClick}>
        Login
      </button>
      <button value="SignUp" onClick={handleSignUpClick}>
        SignUp
      </button> */}
    </div>
  );
}
