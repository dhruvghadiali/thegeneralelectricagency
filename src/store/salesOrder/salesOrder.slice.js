import { createSlice } from "@reduxjs/toolkit";

import {
  fetchSalesOrderCompanies,
  fetchSalesOrderProducts,
} from "@Redux/salesOrder/salesOrder.action";

const initialState = {
  companyOptions: {
    customers: [],
    suppliers: [],
    isLoading: true,
    error: null,
    requestId: null,
  },
  productOptions: {
    supplierId: "",
    items: [],
    isLoading: false,
    error: null,
    requestId: null,
  },
};

const salesOrderSlice = createSlice({
  name: "salesOrders",
  initialState,
  reducers: {
    salesOrderProductsCleared(state) {
      state.productOptions = { ...initialState.productOptions };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrderCompanies.pending, (state, action) => {
        state.companyOptions.isLoading = true;
        state.companyOptions.error = null;
        state.companyOptions.requestId = action.meta.requestId;
      })
      .addCase(fetchSalesOrderCompanies.fulfilled, (state, action) => {
        if (state.companyOptions.requestId !== action.meta.requestId) return;

        state.companyOptions.customers = action.payload.customers;
        state.companyOptions.suppliers = action.payload.suppliers;
        state.companyOptions.isLoading = false;
        state.companyOptions.error = null;
        state.companyOptions.requestId = null;
      })
      .addCase(fetchSalesOrderCompanies.rejected, (state, action) => {
        if (state.companyOptions.requestId !== action.meta.requestId) return;

        state.companyOptions.isLoading = false;
        state.companyOptions.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load companies.");
        state.companyOptions.requestId = null;
      })
      .addCase(fetchSalesOrderProducts.pending, (state, action) => {
        state.productOptions.supplierId = String(action.meta.arg);
        state.productOptions.items = [];
        state.productOptions.isLoading = true;
        state.productOptions.error = null;
        state.productOptions.requestId = action.meta.requestId;
      })
      .addCase(fetchSalesOrderProducts.fulfilled, (state, action) => {
        if (state.productOptions.requestId !== action.meta.requestId) return;

        state.productOptions.supplierId = action.payload.supplierId;
        state.productOptions.items = action.payload.items;
        state.productOptions.isLoading = false;
        state.productOptions.error = null;
        state.productOptions.requestId = null;
      })
      .addCase(fetchSalesOrderProducts.rejected, (state, action) => {
        if (state.productOptions.requestId !== action.meta.requestId) return;

        state.productOptions.items = [];
        state.productOptions.isLoading = false;
        state.productOptions.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load products.");
        state.productOptions.requestId = null;
      });
  },
});

export const { salesOrderProductsCleared } = salesOrderSlice.actions;

export default salesOrderSlice.reducer;
