import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { SYNC_PRODUCT_TABS } from "@Tally/enum/syncProductsTabs.enum";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";

const initialState = {
  activeTab: SYNC_PRODUCT_TABS.NEW_PRODUCTS,
  page: 1,
  limit: TABLE_PAGE_SIZE_OPTIONS[0],
  search: "",
  sort: [],
  columnFilters: {},
  selectedRowKeys: [],
};

const syncProductsSlice = createSlice({
  name: "syncProducts",
  initialState,
  reducers: {
    activeTabChanged(state, action) {
      if (Object.values(SYNC_PRODUCT_TABS).includes(action.payload)) {
        state.activeTab = action.payload;
      }
    },
    searchChanged(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    sortChanged(state, action) {
      state.sort = action.payload;
      state.page = 1;
    },
    columnFilterChanged(state, action) {
      const { key, value } = action.payload;
      if (isFilterActive(value)) {
        state.columnFilters[key] = value;
      } else {
        delete state.columnFilters[key];
      }
      state.page = 1;
    },
    filtersCleared(state) {
      state.search = "";
      state.sort = [];
      state.columnFilters = {};
      state.page = 1;
    },
    pageChanged(state, action) {
      state.page = Math.max(1, _.toInteger(action.payload));
    },
    limitChanged(state, action) {
      const limit = _.toInteger(action.payload);
      state.limit = TABLE_PAGE_SIZE_OPTIONS.includes(limit)
        ? limit
        : TABLE_PAGE_SIZE_OPTIONS[0];
      state.page = 1;
    },
    rowSelectionChanged(state, action) {
      const { key, checked } = action.payload;
      if (!key) return;
      if (checked && !state.selectedRowKeys.includes(key)) {
        state.selectedRowKeys.push(key);
      } else if (!checked) {
        state.selectedRowKeys = state.selectedRowKeys.filter((selected) => selected !== key);
      }
    },
    rowsSelectionChanged(state, action) {
      const { keys, checked } = action.payload;
      const selected = new Set(state.selectedRowKeys);
      keys.forEach((key) => {
        if (!key) return;
        if (checked) selected.add(key);
        else selected.delete(key);
      });
      state.selectedRowKeys = [...selected];
    },
    selectionCleared(state) {
      state.selectedRowKeys = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemProducts.fulfilled, (state) => {
        state.page = 1;
        state.selectedRowKeys = [];
      })
      .addCase(syncTallyProducts.fulfilled, (state) => {
        state.page = 1;
        state.selectedRowKeys = [];
      });
  },
});

export const {
  activeTabChanged,
  searchChanged,
  sortChanged,
  columnFilterChanged,
  filtersCleared,
  pageChanged,
  limitChanged,
  rowSelectionChanged,
  rowsSelectionChanged,
  selectionCleared,
} = syncProductsSlice.actions;

export default syncProductsSlice.reducer;
