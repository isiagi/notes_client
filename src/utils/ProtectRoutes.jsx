import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectRoutes({ token }) {
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return <Outlet />;
}

export default ProtectRoutes;
