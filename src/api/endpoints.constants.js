/**
 * Single source of truth for backend endpoint paths, scoped by module. Each
 * role's API modules combine a role path (see @Enums) with an
 * entry here, e.g. `/${ROLE_PATHS.EMPLOYEE}/${ENDPOINTS.AUTH.SIGN_IN}`.
 */
export const ENDPOINTS = {
  AUTH: {
    SIGN_IN: "auth/signin",
  },
  ACCOUNT: {
    PASSWORD: "account/password",
  },
  EMPLOYEE: {
    BASE: "employees",
    RESTORE: "restore",
    WAREHOUSE_MANAGERS: "warehouse-managers",
  },
  COMPANY: {
    BASE: "companies",
    MIGRATE_FROM_TALLY: "migrate-from-tally",
    SYSTEM: "system",
  },
  COMPANY_ADDRESS: {
    BASE: "company-addresses",
  },
  PRODUCT: {
    BASE: "products",
    MIGRATE_FROM_TALLY: "migrate-from-tally",
    TALLY_PRODUCTS: "tally-products",
  },
  STOCK: {
    BASE: "stocks",
    STANDALONE: "standalone",
  },
  PURCHASE: {
    BASE: "purchases",
  },
  PURCHASE_CREDIT: {
    BASE: "supplier-credits",
    PAYMENT_PLANNINGS: "payment-plannings",
  },
  QUOTATION: {
    DETAILS: "quotation-details",
  },
};
