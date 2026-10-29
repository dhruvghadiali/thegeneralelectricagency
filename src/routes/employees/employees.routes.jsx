import { ROLE_PATHS } from "@Enums";
import { ROUTES } from "@routes/navigate";

import RoleRoute from "@routes/role.route";
import EmployeesPage from "@pages/employees.page";

export const employeeRoutes = [
  {
    element: <RoleRoute allowedRoles={[ROLE_PATHS.SUPER_ADMIN]} />,
    children: [{ path: ROUTES.EMPLOYEES, Component: EmployeesPage }],
  },
];
