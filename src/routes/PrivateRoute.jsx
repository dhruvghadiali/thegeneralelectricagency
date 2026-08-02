import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthTokenValid } from "@/routes/isAuthTokenValid";
import { loggedOut } from "@/store/auth/authSlice";

function PrivateRoute() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isValid = isAuthTokenValid(token);

  useEffect(() => {
    // Only a token that exists but no longer passes counts as "expired" -
    // there's nothing to clear when the visitor was never signed in.
    if (token && !isValid) {
      dispatch(loggedOut());
    }
  }, [dispatch, token, isValid]);

  return isValid ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
