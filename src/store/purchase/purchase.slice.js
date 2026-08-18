import { createSlice } from "@reduxjs/toolkit";

import {
  createPurchase,
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
  },
  extraReducers: (builder) => {
    builder
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
