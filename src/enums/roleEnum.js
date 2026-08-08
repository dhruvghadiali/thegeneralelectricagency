/**
 * Path segment each role is scoped under on the backend, e.g.
 * /employee/auth/signin vs /super-admin/auth/signin.
 */
export const ROLE_PATHS = Object.freeze({
  SUPER_ADMIN: "super-admin",
  EMPLOYEE: "employee",
  WAREHOUSE_MANAGER: "warehouse-manager",
});

export const ROLE_OPTIONS = Object.freeze([
  { value: ROLE_PATHS.SUPER_ADMIN, label: "Super Admin" },
  { value: ROLE_PATHS.EMPLOYEE, label: "Employee" },
  { value: ROLE_PATHS.WAREHOUSE_MANAGER, label: "Warehouse Manager" },
]);
