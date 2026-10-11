import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { buildColumnFilterParams, buildSortParams } from "@/utils/dataTable.util";

/**
 * Shared request contract for every server-backed list in the project.
 * Screens only provide their columns and current Redux query state; this
 * keeps parameter names and omission rules identical everywhere.
 */
export function buildListQueryParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return _.omitBy(
    {
      search: _.trim(search) || undefined,
      ...buildColumnFilterParams(columns, filters),
      ...buildSortParams(sort),
      page,
      limit,
    },
    _.isUndefined,
  );
}

export default buildListQueryParams;
