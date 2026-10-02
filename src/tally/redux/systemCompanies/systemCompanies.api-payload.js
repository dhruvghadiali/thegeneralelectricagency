import { buildColumnFilterParams, buildSortParams } from "@/utils/dataTable.util";
import { SORT_ORDERS } from "@Enums";

const DEFAULT_SORT = [{ field: "company_name", order: SORT_ORDERS.ASC }];

export function toSystemCompaniesListParams({
  columns = [],
  search = "",
  sort = DEFAULT_SORT,
  filters = {},
} = {}) {
  return {
    ...buildColumnFilterParams(columns, filters),
    ...buildSortParams(sort),
    ...(search.trim() ? { search: search.trim() } : {}),
  };
}
