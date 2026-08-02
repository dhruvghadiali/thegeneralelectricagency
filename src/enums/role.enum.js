/**
 * Path segment each role is scoped under on the backend, e.g.
 * /employee/auth/signin vs /super-admin/auth/signin.
 */
export const ROLE_PATHS = Object.freeze({
  SUPER_ADMIN: "super-admin",
  EMPLOYEE: "employee",
  WAREHOUSE_MANAGER: "warehouse-manager",
});
