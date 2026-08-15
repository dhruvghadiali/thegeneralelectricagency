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

/**
 * The backend spells the same role two ways: hyphenated in the URL segment
 * ("warehouse-manager") and underscored in the stored `user_type`
 * ("warehouse_manager").
 */
export const USER_TYPE_BY_ROLE = Object.freeze({
  [ROLE_PATHS.SUPER_ADMIN]: "super_admin",
  [ROLE_PATHS.EMPLOYEE]: "employee",
  [ROLE_PATHS.WAREHOUSE_MANAGER]: "warehouse_manager",
});

/**
 * The same pairing read the other way, for translating a `user_type` coming
 * back from the API into the ROLE_PATHS value the UI is keyed by.
 */
export const ROLE_BY_USER_TYPE = Object.freeze({
  [USER_TYPE_BY_ROLE[ROLE_PATHS.SUPER_ADMIN]]: ROLE_PATHS.SUPER_ADMIN,
  [USER_TYPE_BY_ROLE[ROLE_PATHS.EMPLOYEE]]: ROLE_PATHS.EMPLOYEE,
  [USER_TYPE_BY_ROLE[ROLE_PATHS.WAREHOUSE_MANAGER]]: ROLE_PATHS.WAREHOUSE_MANAGER,
});
