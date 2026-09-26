import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";
import { TALLY_COMPANY_SYNCS_DEFAULTS } from "@Tally/component/companySyncs/companySyncs.defaults";

export function toTallyCompanySyncListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TALLY_COMPANY_SYNCS_DEFAULTS.limit,
  search = "",
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns,
    page,
    limit,
    search,
    filters,
  });
}
