import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import PurchaseOrderPage from "@pages/purchase-order.page";
import PurchaseCreditPage from "@pages/purchase-credit.page";
import PurchaseOrdersPage from "@pages/purchase-orders.page";
import PurchaseCreditFormPage from "@pages/purchase-credit-form.page";
import PurchaseFinancialSummaryPage from "@pages/purchase-financial-summary.page";

export const purchaseRoutes = [
  {
    element: (
      <RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]} />
    ),
    children: [
      { path: ROUTES.PURCHASE_CREDITS, Component: PurchaseCreditPage },
    ],
  },
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />,
    children: [
      {
        path: ROUTES.PURCHASE_CREDIT_NEW,
        Component: PurchaseCreditFormPage,
      },
      {
        path: ROUTES.PURCHASE_CREDIT_EDIT,
        Component: PurchaseCreditFormPage,
      },
      { path: ROUTES.PURCHASES, Component: PurchaseOrdersPage },
      {
        path: ROUTES.PURCHASE_FINANCIAL_SUMMARY,
        Component: PurchaseFinancialSummaryPage,
      },
      { path: ROUTES.PURCHASE_NEW, Component: PurchaseOrderPage },
    ],
  },
];
