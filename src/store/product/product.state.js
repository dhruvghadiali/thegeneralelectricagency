import { PRODUCT_TABS, TABLE_DEFAULTS } from "@Enums";
import { createTableState } from "@Redux/factories/table.factory";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";

const createOperationState = () => ({
  isLoading: false,
  error: null,
});

export const createQuotationOptionsState = () => ({
  items: [],
  pagination: {
    page: TABLE_DEFAULTS.PAGE,
    limit: PRODUCT_LIST_DEFAULTS.limit,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  isLoadingMore: false,
  error: null,
  requestId: null,
});

export const createProductState = () => ({
  ...createTableState({
    limit: PRODUCT_LIST_DEFAULTS.limit,
    sort: PRODUCT_LIST_DEFAULTS.sort,
    columnFilters: PRODUCT_LIST_DEFAULTS.filters,
  }),
  activeTab: PRODUCT_TABS.PRODUCTS,
  dialog: null,
  selectedProducts: [],
  quotationOptions: createQuotationOptionsState(),
  summary: {
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
  },
  operations: {
    create: createOperationState(),
    update: createOperationState(),
    delete: createOperationState(),
  },
});
