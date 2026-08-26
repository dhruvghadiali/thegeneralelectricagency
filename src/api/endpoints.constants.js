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
    RESTORE: "restore",
  },
  COMPANY: {
    BASE: "companies",
    RESTORE: "restore",
  },
  COMPANY_CONTACT: {
    BASE: "company-contacts",
    REASSIGN: "reassign",
  },
  COMPANY_ADDRESS: {
    BASE: "company-addresses",
  },
  PRODUCT: {
    BASE: "products",
  },
  PURCHASE: {
    BASE: "purchases",
  },
  PURCHASE_CREDIT: {
    BASE: "supplier-credits",
  },
};
