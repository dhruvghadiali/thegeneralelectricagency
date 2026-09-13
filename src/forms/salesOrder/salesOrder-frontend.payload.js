import { SALES_ORDER_CUSTOMER_COMPANY_TYPES } from "@Forms/salesOrder/salesOrder.options";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export function fromSalesOrderCustomerListResponse(response = {}) {
  const { items: companies } = fromCompanyListResponse(response);
  const uniqueCompanies = new Map();

  companies.forEach((company) => {
    if (
      company.id != null &&
      company.isActive &&
      SALES_ORDER_CUSTOMER_COMPANY_TYPES.includes(company.type)
    ) {
      uniqueCompanies.set(String(company.id), company);
    }
  });

  return [...uniqueCompanies.values()].sort((left, right) =>
    left.name.localeCompare(right.name),
  );
}
