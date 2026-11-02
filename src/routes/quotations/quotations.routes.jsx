import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import QuotationsPage from "@pages/quotation/quotations.page";
import EditQuotationPage from "@pages/quotation/edit-quotation.page";
import ViewQuotationPage from "@pages/quotation/view-quotation.page";
import CreateQuotationPage from "@pages/quotation/create-quotation.page";

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
