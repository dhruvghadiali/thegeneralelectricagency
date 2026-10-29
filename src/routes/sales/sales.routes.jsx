import SalesPage from "@pages/sales.page";
import RoleRoute from "@routes/role.route";
import SalesOrderPage from "@pages/sales-order.page";

import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

export const salesRoutes = [
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />,
    children: [
      { path: ROUTES.SALES, Component: SalesPage },
      { path: ROUTES.SALES_NEW, Component: SalesOrderPage },
    ],
  },
];
