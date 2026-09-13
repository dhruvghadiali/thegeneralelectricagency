const OPTION_LIMIT = 30;

export function toSalesOrderCompanyListParams() {
  return {
    page: 1,
    limit: OPTION_LIMIT,
    sort: "company_name:asc",
    is_active: true,
  };
}

export function toSalesOrderProductListParams(supplierId) {
  return {
    page: 1,
    limit: OPTION_LIMIT,
    sort: "name:asc",
    is_active: true,
    agency: String(supplierId),
  };
}
