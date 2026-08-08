import { useEffect } from "react";
import { Clock3, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppSidebar from "@Components/appSidebar";

import { ROLE_OPTIONS } from "@Enums";
import { loggedOut } from "@/store/auth/auth.slice";
import { getTokenExpiration, isAuthTokenValid } from "@/routes/auth-token.util";
import { SIDEBAR_NAV_ITEMS_BY_ROLE } from "@Components/appSidebar/appSidebar.constants";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function PrivateRoute() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token, role } = useSelector((state) => state.auth);
  
  const isValid = isAuthTokenValid(token);
  const navItems = SIDEBAR_NAV_ITEMS_BY_ROLE[role] ?? [];
  const currentPage =
    navItems.find(
      (item) =>
        location.pathname === item.url || location.pathname.startsWith(`${item.url}/`)
    )?.title ?? "Dashboard";
  const roleLabel = ROLE_OPTIONS.find((option) => option.value === role)?.label ?? "User";
  const expiresAt = getTokenExpiration(token);
  const expiryLabel = expiresAt
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(expiresAt)
    : "Not available";

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
        <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <SidebarTrigger className="shrink-0" />
            <div className="h-5 w-px bg-border" aria-hidden="true" />
            <h1 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {currentPage}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground sm:gap-5">
            <div className="flex items-center gap-1.5" title={`Signed in as ${roleLabel}`}>
              <ShieldCheck className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-medium text-foreground">{roleLabel}</span>
            </div>
            <div className="hidden items-center gap-1.5 md:flex" title={`Token expires ${expiryLabel}`}>
              <Clock3 className="size-4" aria-hidden="true" />
              <span>Token expires:</span>
              <time className="font-medium text-foreground" dateTime={expiresAt?.toISOString()}>
                {expiryLabel}
              </time>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default PrivateRoute;
