import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import PublicRoute from "@routes/public.route";
import PrivateRoute from "@routes/private.route";

import { ROUTES } from "@routes/navigate";
import { salesRoutes } from "@routes/sales/sales.routes";
import { stockRoutes } from "@routes/stocks/stocks.routes";
import { publicRoutes } from "@routes/public/public.routes";
import { productRoutes } from "@routes/products/products.routes";
import { settingsRoutes } from "@routes/settings/settings.routes";
import { companyRoutes } from "@routes/companies/companies.routes";
import { purchaseRoutes } from "@routes/purchases/purchases.routes";
import { employeeRoutes } from "@routes/employees/employees.routes";
import { dashboardRoutes } from "@routes/dashboard/dashboard.routes";
import { quotationRoutes } from "@routes/quotations/quotations.routes";

const router = createBrowserRouter([
  {
    Component: PublicRoute,
    children: publicRoutes,
  },
  {
    Component: PrivateRoute,
    children: [
      ...dashboardRoutes,
      ...productRoutes,
      ...companyRoutes,
      ...quotationRoutes,
      ...employeeRoutes,
      ...purchaseRoutes,
      ...salesRoutes,
      ...stockRoutes,
      ...settingsRoutes,
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
