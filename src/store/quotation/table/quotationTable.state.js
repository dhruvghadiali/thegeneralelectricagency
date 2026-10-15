import { createTableState } from "@Redux/factories/table.factory";
import { QUOTATION_TABLE_DEFAULTS } from "@screenComponent/quotations/table/quotationTable.defaults";

export const createQuotationTableState = () => ({
  ...createTableState({
    limit: QUOTATION_TABLE_DEFAULTS.limit,
    sort: QUOTATION_TABLE_DEFAULTS.sort,
    columnFilters: QUOTATION_TABLE_DEFAULTS.filters,
  }),
  rowActionQuotationKey: null,
  isUpdateUnavailableDialogOpen: false,
});

export default createQuotationTableState;
