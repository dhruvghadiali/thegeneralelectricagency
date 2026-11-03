import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import CompaniesPage from "@pages/company/companies.page";
import CompaniesScreen from "@Tally/pages/companies";
import CreateCompanyPage from "@pages/company/create-company.page";
import EditCompanyPage from "@pages/company/edit-company.page";

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
      { path: ROUTES.COMPANY_NEW, Component: CreateCompanyPage },
      { path: ROUTES.COMPANY_EDIT, Component: EditCompanyPage },
    ],
  },
];
