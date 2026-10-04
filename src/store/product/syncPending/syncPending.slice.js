import { createSlice } from "@reduxjs/toolkit";

import {
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";
import { PRODUCT_ERROR_MESSAGES } from "@Redux/product/product.defaults";
import { fetchSyncPendingProducts } from "@Redux/product/syncPending/syncPending.action";
import { createSyncPendingState } from "@Redux/product/syncPending/syncPending.state";

const syncPendingSlice = createSlice({
  name: "syncPendingProducts",
  initialState: createSyncPendingState(),
  reducers: {
    ...TABLE_REDUCERS,
    syncPendingDetailsOpened(state, action) {
      state.selectedProduct = action.payload;
    },
    syncPendingDetailsClosed(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSyncPendingProducts.pending, tableFetchCases.pending)
      .addCase(fetchSyncPendingProducts.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchSyncPendingProducts.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          PRODUCT_ERROR_MESSAGES.list,
        ),
      );
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
  syncPendingDetailsClosed,
  syncPendingDetailsOpened,
} = syncPendingSlice.actions;

export const syncPendingTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default syncPendingSlice.reducer;
