import { TABLE_DEFAULTS } from "@Enums";
import { QUOTATION_TABLE_DEFAULTS } from "@screenComponent/quotations/table/quotationTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toQuotationListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = QUOTATION_TABLE_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}

export default toQuotationListParams;
