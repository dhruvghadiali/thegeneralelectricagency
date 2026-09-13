const COMPANY_OPTION_LIMIT = 30;

export function toSalesOrderCompanyListParams() {
  return {
    page: 1,
    limit: COMPANY_OPTION_LIMIT,
    sort: "company_name:asc",
    is_active: true,
  };
}
