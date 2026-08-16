import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";

import HomePage from "@/pages/home.page";
import SigninPage from "@/pages/signin.page";
import PublicRoute from "@/routes/public.route";
import PrivateRoute from "@/routes/private.route";
import DashboardPage from "@/pages/dashboard.page";
import EmployeesPage from "@/pages/employees.page";
import CompaniesPage from "@/pages/companies.page";
import StocksPage from "@/pages/stocks.page";
import CompanyDetailsPage from "@/pages/company-details.page";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import RoleRoute from "@/routes/role.route";
import { ROLE_PATHS } from "@Enums";

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
              <Route element={<RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN]} />}>
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
              </Route>
              <Route path="/products" element={<>Products Content</>} />
              <Route element={<RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />}>
                <Route path="/company-details" element={<CompanyDetailsPage />} />
              </Route>
              <Route path="/stocks" element={<StocksPage />} />
              <Route path="/settings" element={<>Settings Content</>} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LenisScrollProvider>
    </ThemeProvider>
  );
}

export default App;
