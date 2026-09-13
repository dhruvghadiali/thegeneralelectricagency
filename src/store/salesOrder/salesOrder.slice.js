import { createSlice } from "@reduxjs/toolkit";

import { fetchSalesOrderCustomers } from "@Redux/salesOrder/salesOrder.action";

const initialState = {
  customers: {
    items: [],
    isLoading: true,
    error: null,
    requestId: null,
  },
};

const salesOrderSlice = createSlice({
  name: "salesOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesOrderCustomers.pending, (state, action) => {
        state.customers.isLoading = true;
        state.customers.error = null;
        state.customers.requestId = action.meta.requestId;
      })
      .addCase(fetchSalesOrderCustomers.fulfilled, (state, action) => {
        if (state.customers.requestId !== action.meta.requestId) return;

        state.customers.items = action.payload;
        state.customers.isLoading = false;
        state.customers.error = null;
        state.customers.requestId = null;
      })
      .addCase(fetchSalesOrderCustomers.rejected, (state, action) => {
        if (state.customers.requestId !== action.meta.requestId) return;

        state.customers.isLoading = false;
        state.customers.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load customers.");
        state.customers.requestId = null;
      });
  },
});

export default salesOrderSlice.reducer;
