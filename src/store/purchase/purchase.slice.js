import { createSlice } from "@reduxjs/toolkit";

import {
  createPurchase,
  fetchPurchaseStandaloneStockCount,
  fetchPurchaseWarehouseManagers,
  fetchPurchases,
} from "@Redux/purchase/purchase.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    sort: [{ field: "expected_delivery_date", order: "asc" }],
  }),
  summary: {
    totalPurchases: 0,
    pendingDeliveries: 0,
    totalBillAmount: 0,
    totalPaidAmount: 0,
    outstandingAmount: 0,
  },
  isCreating: false,
  createError: null,
  standaloneStockByProduct: {},
  warehouseManagers: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    purchaseCreateCleared(state) {
      state.isCreating = false;
      state.createError = null;
    },
    purchaseStandaloneStockCountsCleared(state) {
      state.standaloneStockByProduct = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseWarehouseManagers.pending, (state) => {
        state.warehouseManagers.isLoading = true;
        state.warehouseManagers.error = null;
      })
      .addCase(fetchPurchaseWarehouseManagers.fulfilled, (state, action) => {
        state.warehouseManagers.items = action.payload;
        state.warehouseManagers.isLoading = false;
        state.warehouseManagers.error = null;
      })
      .addCase(fetchPurchaseWarehouseManagers.rejected, (state, action) => {
        state.warehouseManagers.isLoading = false;
        state.warehouseManagers.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load warehouse managers.");
      })
      .addCase(fetchPurchases.pending, tableFetchCases.pending)
      .addCase(fetchPurchases.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state, action);
        state.summary = action.payload.summary;
      })
      .addCase(fetchPurchases.rejected, (state, action) =>
        tableFetchCases.rejected(
          state,
          action,
          "Unable to load purchase orders.",
        ),
      )
      .addCase(createPurchase.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createPurchase.fulfilled, (state) => {
        state.isCreating = false;
        state.createError = null;
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload ?? "Unable to create purchase.";
      })
      .addCase(fetchPurchaseStandaloneStockCount.pending, (state, action) => {
        const productId = String(action.meta.arg);
        state.standaloneStockByProduct[productId] = {
          count: "",
          error: null,
          isLoading: true,
          requestId: action.meta.requestId,
        };
      })
      .addCase(fetchPurchaseStandaloneStockCount.fulfilled, (state, action) => {
        const productId = action.payload.productId;
        const current = state.standaloneStockByProduct[productId];
        if (current?.requestId !== action.meta.requestId) return;

        state.standaloneStockByProduct[productId] = {
          count: action.payload.totalStandaloneStocks,
          error: null,
          isLoading: false,
          requestId: null,
        };
      })
      .addCase(fetchPurchaseStandaloneStockCount.rejected, (state, action) => {
        const productId = String(action.meta.arg);
        const current = state.standaloneStockByProduct[productId];
        if (current?.requestId !== action.meta.requestId) return;

        state.standaloneStockByProduct[productId] = {
          count: "",
          error: action.meta.aborted
            ? null
            : (action.payload ?? "Unable to load standalone stock count."),
          isLoading: false,
          requestId: null,
        };
      });
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  purchaseCreateCleared,
  purchaseStandaloneStockCountsCleared,
  searchChanged,
  searchCommitted,
  sortChanged,
} = purchaseSlice.actions;

export const purchaseTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default purchaseSlice.reducer;
