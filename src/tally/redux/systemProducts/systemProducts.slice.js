import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";

const initialState = {
  products: [],
  status: SYSTEM_PRODUCTS_STATUS.IDLE,
  error: null,
  search: "",
  columnFilters: {},
  page: 1,
  limit: TABLE_PAGE_SIZE_OPTIONS[0],
};

const systemProductsSlice = createSlice({
  name: "systemProducts",
  initialState,
  reducers: {
    searchChanged(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    columnFilterChanged(state, action) {
      const { key, value } = action.payload;
      if (!_.includes(["name", "hsn_code"], key)) return;
      if (isFilterActive(value)) {
        state.columnFilters[key] = value;
      } else {
        delete state.columnFilters[key];
      }
      state.page = 1;
    },
    filtersCleared(state) {
      state.search = "";
      state.columnFilters = {};
      state.page = 1;
    },
    pageChanged(state, action) {
      state.page = Math.max(1, _.toInteger(action.payload));
    },
    limitChanged(state, action) {
      const limit = _.toInteger(action.payload);
      state.limit = _.includes(TABLE_PAGE_SIZE_OPTIONS, limit)
        ? limit
        : TABLE_PAGE_SIZE_OPTIONS[0];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemProducts.pending, (state) => {
        state.status = SYSTEM_PRODUCTS_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchSystemProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = SYSTEM_PRODUCTS_STATUS.SUCCEEDED;
        state.page = 1;
      })
      .addCase(fetchSystemProducts.rejected, (state, action) => {
        state.status = action.meta.aborted
          ? SYSTEM_PRODUCTS_STATUS.IDLE
          : SYSTEM_PRODUCTS_STATUS.FAILED;
        state.error = action.meta.aborted
          ? null
          : action.payload || action.error.message || "Unable to load Tally products.";
      });
  },
});

export const {
  searchChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
} = systemProductsSlice.actions;
export default systemProductsSlice.reducer;
