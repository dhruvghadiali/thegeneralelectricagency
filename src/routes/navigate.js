/**
 * Application route paths live here so route declarations, redirects, links,
 * and navigation menus all use the same source of truth.
 */
export const ROUTES = Object.freeze({
  HOME: "/",
  SIGN_IN: "/signin",
  DASHBOARD: "/dashboard",
  EMPLOYEES: "/employees",
  COMPANIES: "/companies",
  COMPANY_NEW: "/companies/new",
  COMPANY_EDIT: "/companies/:companyId/edit",
  PRODUCTS: "/products",
  PRODUCT_NEW: "/products/new",
  PRODUCT_EDIT: "/products/:productId/edit",
  PURCHASE_CREDITS: "/purchase-credit",
  PURCHASE_CREDIT_NEW: "/purchase-credit/new",
  PURCHASE_CREDIT_EDIT: "/purchase-credit/:purchaseCreditId/edit",
  PURCHASES: "/purchases",
  PURCHASE_NEW: "/purchases/new",
  PURCHASE_FINANCIAL_SUMMARY: "/purchases/financial-summary",
  SALES: "/sales",
  SALES_NEW: "/sales/new",
  STOCKS: "/stocks",
  SETTINGS: "/settings",
  MOTORS: "/motors",
  DRIVES: "/drives",
  PUMPS: "/pumps",
  GEAR_BOXES: "/gear-boxes",
  CABLES: "/cables",
  SPARES: "/spares",
  NOT_FOUND: "*",
});

export const ROUTE_BUILDERS = Object.freeze({
  companyEdit: (companyId) => `${ROUTES.COMPANIES}/${companyId}/edit`,
  productEdit: (productId) => `${ROUTES.PRODUCTS}/${productId}/edit`,
  purchaseCreditEdit: (purchaseCreditId) =>
    `${ROUTES.PURCHASE_CREDITS}/${purchaseCreditId}/edit`,
});

export const HOME_SECTIONS = Object.freeze({
  HOME: "#home",
  SERVICES: "#services",
  CLIENTS: "#clients",
  PARTNERS: "#partners",
  CONTACT_US: "#contact-us",
});
