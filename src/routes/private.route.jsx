import { useEffect } from "react";
import { CalendarRange, Clock3, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  matchPath,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import AppSidebar from "@commonComponent/appSidebar";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

import { ROLE_OPTIONS } from "@Enums";
import { loggedOut } from "@/store/auth/auth.slice";
import { getTokenExpiration, isAuthTokenValid } from "@routes/auth-token.util";
import { ROUTES } from "@routes/navigate";
import { SIDEBAR_NAV_ITEMS_BY_ROLE } from "@commonComponent/appSidebar/appSidebar.constants";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@shadcnComponent/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import { FINANCIAL_YEAR_OPTIONS } from "@screenComponent/purchaseFinancialSummary/purchaseFinancialSummary.data";

function buildBreadcrumbItems(pathname, navItems) {
  if (pathname === ROUTES.COMPANY_NEW) {
    return [
      { label: "Companies", href: ROUTES.COMPANIES },
      { label: "Add company" },
    ];
  }

  if (matchPath(ROUTES.COMPANY_EDIT, pathname)) {
    return [
      { label: "Companies", href: ROUTES.COMPANIES },
      { label: "Edit company" },
    ];
  }

  if (pathname === ROUTES.PRODUCT_NEW) {
    return [
      { label: "Products", href: ROUTES.PRODUCTS },
      { label: "Add product" },
    ];
  }

  if (pathname === ROUTES.PURCHASE_CREDIT_NEW) {
    return [
      { label: "Purchase credit", href: ROUTES.PURCHASE_CREDITS },
      { label: "Add purchase credit" },
    ];
  }

  if (matchPath(ROUTES.PURCHASE_CREDIT_EDIT, pathname)) {
    return [
      { label: "Purchase credit", href: ROUTES.PURCHASE_CREDITS },
      { label: "Update purchase credit" },
    ];
  }

  if (pathname === ROUTES.PURCHASE_NEW) {
    return [
      { label: "Purchase orders", href: ROUTES.PURCHASES },
      { label: "Add purchase order" },
    ];
  }

  if (pathname === ROUTES.SALES_NEW) {
    return [
      { label: "Sales", href: ROUTES.SALES },
      { label: "Add sales order" },
    ];
  }

  if (pathname === ROUTES.PURCHASE_FINANCIAL_SUMMARY) {
    return [
      { label: "Purchase orders", href: ROUTES.PURCHASES },
      { label: "Financial summary" },
    ];
  }

  if (matchPath(ROUTES.PRODUCT_EDIT, pathname)) {
    return [
      { label: "Products", href: ROUTES.PRODUCTS },
      { label: "Edit product" },
    ];
  }

  const currentItem = navItems.find(
    (item) =>
      pathname === item.url || pathname.startsWith(`${item.url}/`),
  );

  return [{ label: currentItem?.title ?? "Dashboard" }];
}

function PrivateRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedFinancialYear = searchParams.get("financial_year");
  const purchaseFinancialYear = FINANCIAL_YEAR_OPTIONS.some(
    (option) => option.value === requestedFinancialYear,
  )
    ? requestedFinancialYear
    : FINANCIAL_YEAR_OPTIONS[0].value;
  const changePurchaseFinancialYear = (value) => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("financial_year", value);
    setSearchParams(nextSearchParams, { replace: true });
  };

  const { token, role } = useSelector((state) => state.auth);
  
  const isValid = isAuthTokenValid(token);
  const navItems = SIDEBAR_NAV_ITEMS_BY_ROLE[role] ?? [];
  const breadcrumbItems = buildBreadcrumbItems(location.pathname, navItems);
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
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* The shell is exactly one viewport tall, so the window itself never
          scrolls. Anything taller scrolls in the content area below, and a
          screen that opts into fillHeight hands that job to its own table. */}
      <SidebarInset className="h-svh overflow-hidden">
        <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <SidebarTrigger className="shrink-0" />
            <div className="h-5 w-px shrink-0 bg-border" aria-hidden="true" />
            <PageBreadcrumb items={breadcrumbItems} compact />
          </div>

          <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground sm:gap-5">
            {location.pathname === ROUTES.PURCHASE_FINANCIAL_SUMMARY && (
              <div className="flex items-center gap-2">
                <CalendarRange className="hidden size-4 sm:block" aria-hidden="true" />
                <label htmlFor="header-financial-year" className="sr-only">
                  Financial year
                </label>
                <Select
                  value={purchaseFinancialYear}
                  onValueChange={changePurchaseFinancialYear}
                >
                  <SelectTrigger
                    id="header-financial-year"
                    className="h-8 w-[132px] bg-background sm:w-[156px]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FINANCIAL_YEAR_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex items-center gap-1.5" title={`Signed in as ${roleLabel}`}>
              <ShieldCheck className="size-4" aria-hidden="true" />
              <span className="hidden lg:inline">Role:</span>
              <span className="font-medium text-foreground">{roleLabel}</span>
            </div>
            <div className="hidden items-center gap-1.5 xl:flex" title={`Token expires ${expiryLabel}`}>
              <Clock3 className="size-4" aria-hidden="true" />
              <span>Token expires:</span>
              <time className="font-medium text-foreground" dateTime={expiresAt?.toISOString()}>
                {expiryLabel}
              </time>
            </div>
          </div>
        </header>
        <div
          data-lenis-prevent
          className="flex min-h-0 flex-1 flex-col overflow-auto bg-muted/20 p-4 sm:p-6 xl:px-8 2xl:px-10"
        >
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default PrivateRoute;
