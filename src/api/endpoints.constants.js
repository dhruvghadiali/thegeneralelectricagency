/**
 * Single source of truth for backend endpoint paths, scoped by module. Each
 * role's API modules combine a role path (see @Enums) with an
 * entry here, e.g. `/${ROLE_PATHS.EMPLOYEE}/${ENDPOINTS.AUTH.SIGN_IN}`.
 */
export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "auth/signin",
  },
  EMPLOYEE: {
    BASE: "employees",
  },
  COMPANY: {
    BASE: "companies",
  },
  COMPANY_CONTACT: {
    BASE: "company-contacts",
  },
};
