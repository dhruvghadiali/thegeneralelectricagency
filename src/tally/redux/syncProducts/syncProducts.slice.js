import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { isFilterActive } from "@/utils/dataTable.util";
import { SYNC_PRODUCT_TABS } from "@Tally/enum/syncProductsTabs.enum";
import { SYNC_PRODUCTS_SAVE_STATUS } from "@Tally/enum/syncProductsSaveStatus.enum";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";
import { saveSyncProducts } from "@Tally/redux/syncProducts/syncProductsSave.action";

const initialState = {
  activeTab: SYNC_PRODUCT_TABS.NEW_PRODUCTS,
  page: 1,
  limit: TABLE_PAGE_SIZE_OPTIONS[0],
  search: "",
  sort: [],
  columnFilters: {},
  selectedRowKeys: [],
  saveStatus: SYNC_PRODUCTS_SAVE_STATUS.IDLE,
  saveError: null,
  saveAlertVisible: false,
  saveErrorRequestId: null,
  savedCount: 0,
};

const syncProductsSlice = createSlice({
  name: "syncProducts",
  initialState,
  reducers: {
    saveErrorAlertDismissed(state, action) {
      if (state.saveErrorRequestId === action.payload) {
        state.saveAlertVisible = false;
      }
    },
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
        if (state.saveStatus !== SYNC_PRODUCTS_SAVE_STATUS.LOADING) {
          state.selectedRowKeys = [];
        }
      })
      .addCase(syncTallyProducts.fulfilled, (state) => {
        state.page = 1;
        state.selectedRowKeys = [];
      })
      .addCase(saveSyncProducts.pending, (state) => {
        state.saveStatus = SYNC_PRODUCTS_SAVE_STATUS.LOADING;
        state.saveError = null;
        state.saveAlertVisible = false;
        state.saveErrorRequestId = null;
        state.savedCount = 0;
      })
      .addCase(saveSyncProducts.fulfilled, (state, action) => {
        const { savedIds, errors } = action.payload;
        state.saveStatus = errors.length
          ? SYNC_PRODUCTS_SAVE_STATUS.FAILED
          : SYNC_PRODUCTS_SAVE_STATUS.SUCCEEDED;
        state.saveError = errors.length ? errors.join("\n") : null;
        state.saveAlertVisible = errors.length > 0;
        state.saveErrorRequestId = errors.length ? action.meta.requestId : null;
        state.savedCount = savedIds.length;
        state.selectedRowKeys = state.selectedRowKeys.filter(
          (key) => !savedIds.includes(key),
        );
      })
      .addCase(saveSyncProducts.rejected, (state, action) => {
        state.saveStatus = SYNC_PRODUCTS_SAVE_STATUS.FAILED;
        state.saveError = action.payload || action.error.message || "Unable to save products.";
        state.saveAlertVisible = true;
        state.saveErrorRequestId = action.meta.requestId;
      });
  },
});

export const {
  saveErrorAlertDismissed,
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
