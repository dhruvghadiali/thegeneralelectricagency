import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RoleRoute({ allowedRoles }) {
  const role = useSelector((state) => state.auth.role);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
