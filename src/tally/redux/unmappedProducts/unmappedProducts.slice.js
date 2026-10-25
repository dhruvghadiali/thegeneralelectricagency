import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { UNMAPPED_PRODUCTS_STATUS } from "@Tally/enum/unmappedProductsStatus.enum";
import { fetchUnmappedProducts } from "@Tally/redux/unmappedProducts/unmappedProducts.action";

const initialState = {
  products: [],
  stockGroups: [],
  status: UNMAPPED_PRODUCTS_STATUS.IDLE,
  error: null,
  requestId: null,
  table: {
    page: 1,
    limit: TABLE_PAGE_SIZE_OPTIONS[0],
    search: "",
    sort: [],
    columnFilters: {},
  },
};

const unmappedProductsSlice = createSlice({
  name: "unmappedProducts",
  initialState,
  reducers: {
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
      .addCase(fetchUnmappedProducts.pending, (state, action) => {
        state.status = UNMAPPED_PRODUCTS_STATUS.LOADING;
        state.error = null;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchUnmappedProducts.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.products = action.payload.products;
        state.stockGroups = action.payload.stockGroups;
        state.table.sort = action.payload.sort;
        state.table.page = 1;
        state.status = UNMAPPED_PRODUCTS_STATUS.SUCCEEDED;
        state.requestId = null;
      })
      .addCase(fetchUnmappedProducts.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return;

        state.requestId = null;
        if (action.meta.aborted) {
          state.status = UNMAPPED_PRODUCTS_STATUS.IDLE;
          return;
        }

        state.status = UNMAPPED_PRODUCTS_STATUS.FAILED;
        state.error =
          action.payload ??
          action.error.message ??
          "Unable to load un-mapped products.";
      });
  },
});

export const {
  searchChanged,
  sortChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
} = unmappedProductsSlice.actions;

export default unmappedProductsSlice.reducer;
