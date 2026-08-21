import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_CONTACT_TABLE_DEFAULTS } from "@Tables/companyContact/companyContactTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toCompanyContactListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = COMPANY_CONTACT_TABLE_DEFAULTS.limit,
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
