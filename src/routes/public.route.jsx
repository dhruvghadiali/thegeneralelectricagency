import { Outlet } from "react-router-dom";

/**
 * No gating - exists for symmetry with PrivateRoute so every route in
 * App.jsx is explicitly declared public or private.
 */
function PublicRoute() {
  return <Outlet />;
}

export default PublicRoute;
