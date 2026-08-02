import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AppSidebar from "@Components/appSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default PrivateRoute;
