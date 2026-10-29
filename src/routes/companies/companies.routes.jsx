import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import CompaniesPage from "@pages/companies.page";
import CompaniesScreen from "@Tally/pages/companies";
import CompanyDetailsPage from "@pages/company-details.page";

export const companyRoutes = [
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.TECH_SUPPORT]} />,
    children: [{ path: ROUTES.SYNC_COMPANIES, Component: CompaniesScreen }],
  },
  {
    element: (
      <RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE]} />
    ),
    children: [{ path: ROUTES.COMPANIES, Component: CompaniesPage }],
  },
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.EMPLOYEE]} />,
    children: [
      { path: ROUTES.COMPANY_NEW, Component: CompanyDetailsPage },
      { path: ROUTES.COMPANY_EDIT, Component: CompanyDetailsPage },
    ],
  },
];
