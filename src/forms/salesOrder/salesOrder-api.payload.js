import _ from "lodash";

import { SALES_ORDER_CUSTOMER_COMPANY_TYPES } from "@Forms/salesOrder/salesOrder.options";

const CUSTOMER_OPTION_LIMIT = 30;

export function toSalesOrderCustomerListParams(search = "") {
  return {
    page: 1,
    limit: CUSTOMER_OPTION_LIMIT,
    search: _.trim(search) || undefined,
    sort: "company_name:asc",
    is_active: true,
    company_type: SALES_ORDER_CUSTOMER_COMPANY_TYPES.join(","),
  };
}
