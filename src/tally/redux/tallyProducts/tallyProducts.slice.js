import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";
import { fromTallyProductsResponse } from "@Tally/redux/tallyProducts/tallyProducts.frontend-payload";

const initialState = {
  response: null,
  products: [],
  status: TALLY_PRODUCTS_STATUS.IDLE,
  error: null,
  errorTab: null,
  alertVisible: false,
  errorRequestId: null,
  table: {
    page: 1,
    limit: TABLE_PAGE_SIZE_OPTIONS[0],
    search: "",
    sort: [],
    columnFilters: {},
  },
};

const tallyProductsSlice = createSlice({
  name: "tallyProducts",
  initialState,
  reducers: {
    syncErrorAlertDismissed(state, action) {
      if (state.errorRequestId === action.payload) {
        state.alertVisible = false;
      }
    },
    searchChanged(state, action) {
      state.table.search = action.payload;
      state.table.page = 1;
    },
    sortChanged(state, action) {
      state.table.sort = action.payload;
      state.table.page = 1;
    },
    columnFilterChanged(state, action) {
      const { key, value } = action.payload;
      if (isFilterActive(value)) {
        state.table.columnFilters[key] = value;
      } else {
        delete state.table.columnFilters[key];
      }
      state.table.page = 1;
    },
    filtersCleared(state) {
      state.table.search = "";
      state.table.sort = [];
      state.table.columnFilters = {};
      state.table.page = 1;
    },
    pageChanged(state, action) {
      state.table.page = Math.max(1, _.toInteger(action.payload));
    },
    limitChanged(state, action) {
      const limit = _.toInteger(action.payload);
      state.table.limit = TABLE_PAGE_SIZE_OPTIONS.includes(limit)
        ? limit
        : TABLE_PAGE_SIZE_OPTIONS[0];
      state.table.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyProducts.pending, (state) => {
        state.status = TALLY_PRODUCTS_STATUS.LOADING;
        state.error = null;
        state.errorTab = null;
        state.alertVisible = false;
        state.errorRequestId = null;
      })
      .addCase(syncTallyProducts.fulfilled, (state, action) => {
        state.response = action.payload;
        state.products = fromTallyProductsResponse(action.payload);
        state.status = TALLY_PRODUCTS_STATUS.SUCCEEDED;
        state.table.page = 1;
      })
      .addCase(syncTallyProducts.rejected, (state, action) => {
        state.status = TALLY_PRODUCTS_STATUS.FAILED;
        state.error =
          action.payload || action.error.message || "Unable to sync products.";
        state.errorTab = action.meta.arg?.errorTab ?? null;
        state.alertVisible = Boolean(state.errorTab);
        state.errorRequestId = action.meta.requestId;
      });
  },
});

export const {
  syncErrorAlertDismissed,
  searchChanged,
  sortChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
} = tallyProductsSlice.actions;

export default tallyProductsSlice.reducer;
