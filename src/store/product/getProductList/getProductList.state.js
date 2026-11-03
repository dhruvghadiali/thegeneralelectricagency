import { PRODUCT_LIST_DEFAULTS } from "@Enums";
import { createTableState } from "@Redux/factories/table.factory";

export const createGetProductListState = () => ({
  productTable: createTableState({
    limit: PRODUCT_LIST_DEFAULTS.limit,
    sort: PRODUCT_LIST_DEFAULTS.sort,
    columnFilters: PRODUCT_LIST_DEFAULTS.filters,
  }),
  summary: {
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
  },
});

export default createGetProductListState;
