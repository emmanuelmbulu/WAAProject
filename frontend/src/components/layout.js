import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
