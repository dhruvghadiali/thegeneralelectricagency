import { TABLE_DEFAULTS } from "@Enums";
import { EMPLOYEE_TABLE_DEFAULTS } from "@Tables/employee/employeeTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

/**
 * Converts frontend table state into the employee list endpoint's query.
 */
export function toEmployeeListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = EMPLOYEE_TABLE_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
