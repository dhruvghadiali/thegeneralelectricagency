import { createTableState } from "@Redux/factories/table.factory";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";

export const createSyncPendingState = () =>
  createTableState({
    limit: PRODUCT_LIST_DEFAULTS.limit,
    sort: PRODUCT_LIST_DEFAULTS.sort,
    columnFilters: PRODUCT_LIST_DEFAULTS.filters,
  });

export default createSyncPendingState;
