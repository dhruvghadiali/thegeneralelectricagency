import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import QuotationsPage from "@pages/quotations.page";
import EditQuotationPage from "@pages/edit-quotation.page";
import ViewQuotationPage from "@pages/view-quotation.page";
import CreateQuotationPage from "@pages/create-quotation.page";

export const quotationRoutes = [
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />,
    children: [
      { path: ROUTES.QUOTATIONS, Component: QuotationsPage },
      { path: ROUTES.QUOTATION_NEW, Component: CreateQuotationPage },
      { path: ROUTES.QUOTATION_EDIT, Component: EditQuotationPage },
      { path: ROUTES.QUOTATION_VIEW, Component: ViewQuotationPage },
    ],
  },
];
