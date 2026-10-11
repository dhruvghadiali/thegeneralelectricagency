import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@routes/navigate";

function RoleRoute({ allowedRoles }) {
  const role = useSelector((state) => state.auth.role);

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
