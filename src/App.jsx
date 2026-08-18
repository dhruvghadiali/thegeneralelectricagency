import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { ROLE_PATHS } from "@Enums";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/home.page";
import RoleRoute from "@/routes/role.route";
import StocksPage from "@/pages/stocks.page";
import SigninPage from "@/pages/signin.page";
import PublicRoute from "@/routes/public.route";
import PrivateRoute from "@/routes/private.route";
import DashboardPage from "@/pages/dashboard.page";
import EmployeesPage from "@/pages/employees.page";
import CompaniesPage from "@/pages/companies.page";
import ProductsPage from "@/pages/products.page";
import ProductDetailsPage from "@/pages/product-details.page";
import CompanyDetailsPage from "@/pages/company-details.page";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import PlaceholderScreen from "@commonComponent/pageBreadcrumb/placeholderScreen";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <LenisScrollProvider>
        <Router>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                element={<RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN]} />}
              >
                <Route path="/employees" element={<EmployeesPage />} />
              </Route>
              <Route
                element={
                  <RoleRoute
                    allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]}
                  />
                }
              >
                <Route path="/companies" element={<CompaniesPage />} />
              </Route>
              <Route
                element={
                  <RoleRoute
                    allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]}
                  />
                }
              >
                <Route path="/products" element={<ProductsPage />} />
              </Route>
              <Route
                element={<RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />}
              >
                <Route path="/companies/new" element={<CompanyDetailsPage />} />
                <Route
                  path="/companies/:companyId/edit"
                  element={<CompanyDetailsPage />}
                />
                <Route path="/products/new" element={<ProductDetailsPage />} />
                <Route
                  path="/products/:productId/edit"
                  element={<ProductDetailsPage />}
                />
              </Route>
              <Route path="/stocks" element={<StocksPage />} />
              <Route
                path="/settings"
                element={
                  <PlaceholderScreen
                    eyebrow="Workspace preferences"
                    title="Settings"
                    description="Manage your account and workspace preferences."
                  />
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
