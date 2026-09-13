import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { ROLE_PATHS } from "@Enums";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@pages/home.page";
import RoleRoute from "@routes/role.route";
import StocksPage from "@pages/stocks.page";
import SigninPage from "@pages/signin.page";
import PublicRoute from "@routes/public.route";
import PrivateRoute from "@routes/private.route";
import DashboardPage from "@pages/dashboard.page";
import EmployeesPage from "@pages/employees.page";
import CompaniesPage from "@pages/companies.page";
import SalesPage from "@pages/sales.page";
import SalesOrderPage from "@pages/sales-order.page";
import PurchaseCreditPage from "@pages/purchase-credit.page";
import PurchaseCreditFormPage from "@pages/purchase-credit-form.page";
import ProductsPage from "@pages/products.page";
import ProductDetailsPage from "@pages/product-details.page";
import CompanyDetailsPage from "@pages/company-details.page";
import PurchaseOrderPage from "@pages/purchase-order.page";
import PurchaseOrdersPage from "@pages/purchase-orders.page";
import PurchaseFinancialSummaryPage from "@pages/purchase-financial-summary.page";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import PlaceholderScreen from "@commonComponent/pageBreadcrumb/placeholderScreen";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route
                element={<RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN]} />}
              >
                <Route path={ROUTES.EMPLOYEES} element={<EmployeesPage />} />
              </Route>
              <Route
                element={
                  <RoleRoute
                    allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]}
                  />
                }
              >
                <Route path={ROUTES.COMPANIES} element={<CompaniesPage />} />
              </Route>
              <Route
                element={
                  <RoleRoute
                    allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]}
                  />
                }
              >
                <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
              </Route>
              <Route
                element={
                  <RoleRoute
                    allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]}
                  />
                }
              >
                <Route
                  path={ROUTES.PURCHASE_CREDITS}
                  element={<PurchaseCreditPage />}
                />
                <Route
                  path={ROUTES.PURCHASE_CREDIT_NEW}
                  element={<PurchaseCreditFormPage />}
                />
                <Route
                  path={ROUTES.PURCHASE_CREDIT_EDIT}
                  element={<PurchaseCreditFormPage />}
                />
              </Route>
              <Route
                element={<RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />}
              >
                <Route
                  path={ROUTES.PURCHASES}
                  element={<PurchaseOrdersPage />}
                />
                <Route path={ROUTES.SALES} element={<SalesPage />} />
                <Route path={ROUTES.SALES_NEW} element={<SalesOrderPage />} />
                <Route
                  path={ROUTES.PURCHASE_FINANCIAL_SUMMARY}
                  element={<PurchaseFinancialSummaryPage />}
                />
                <Route
                  path={ROUTES.PURCHASE_NEW}
                  element={<PurchaseOrderPage />}
                />
                <Route
                  path={ROUTES.COMPANY_NEW}
                  element={<CompanyDetailsPage />}
                />
                <Route
                  path={ROUTES.COMPANY_EDIT}
                  element={<CompanyDetailsPage />}
                />
                <Route
                  path={ROUTES.PRODUCT_NEW}
                  element={<ProductDetailsPage />}
                />
                <Route
                  path={ROUTES.PRODUCT_EDIT}
                  element={<ProductDetailsPage />}
                />
              </Route>
              <Route path={ROUTES.STOCKS} element={<StocksPage />} />
              <Route
                path={ROUTES.SETTINGS}
                element={
                  <PlaceholderScreen
                    eyebrow="Workspace preferences"
                    title="Settings"
                    description="Manage your account and workspace preferences."
                  />
                }
              />
            </Route>

            <Route
              path={ROUTES.NOT_FOUND}
              element={<Navigate to={ROUTES.HOME} replace />}
            />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
