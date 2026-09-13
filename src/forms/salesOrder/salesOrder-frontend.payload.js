import {
  SALES_ORDER_CUSTOMER_COMPANY_TYPES,
  SALES_ORDER_SUPPLIER_COMPANY_TYPES,
} from "@Forms/salesOrder/salesOrder.options";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";
import { fromProductListResponse } from "@Tables/product/productTable.frontend-payload";

function companiesForTypes(companies, allowedTypes) {
  return companies.filter(
    (company) =>
      company.id != null &&
      company.isActive &&
      allowedTypes.includes(company.type),
  );
}

export function fromSalesOrderCompanyListResponse(response = {}) {
  const { items: companies } = fromCompanyListResponse(response);
  const byName = (left, right) => left.name.localeCompare(right.name);

  return {
    customers: companiesForTypes(
      companies,
      SALES_ORDER_CUSTOMER_COMPANY_TYPES,
    ).sort(byName),
    suppliers: companiesForTypes(
      companies,
      SALES_ORDER_SUPPLIER_COMPANY_TYPES,
    ).sort(byName),
  };
}

export function fromSalesOrderProductListResponse(
  response = {},
  supplierId,
) {
  const { items: products } = fromProductListResponse(response);

  return products
    .filter(
      (product) =>
        product.id != null &&
        product.isActive &&
        String(product.agency) === String(supplierId),
    )
    .sort((left, right) => left.name.localeCompare(right.name));
}
