import { createSlice } from "@reduxjs/toolkit";

import { fetchSalesOrderCompanies } from "@Redux/salesOrder/salesOrder.action";

const initialState = {
  companyOptions: {
    customers: [],
    suppliers: [],
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
      });
  },
});

export default salesOrderSlice.reducer;
