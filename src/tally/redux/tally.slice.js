import { createSlice } from "@reduxjs/toolkit";

import { syncTallyCompanies, syncTallyProducts } from "@Tally/redux/tally.action";

const initialState = {
  companies: {
    response: null,
    status: "idle",
    error: null,
  },
  products: {
    response: null,
    status: "idle",
    error: null,
  },
};

const tallySlice = createSlice({
  name: "tally",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyCompanies.pending, (state) => {
        state.companies.status = "loading";
        state.companies.error = null;
      })
      .addCase(syncTallyCompanies.fulfilled, (state, action) => {
        state.companies.response = action.payload;
        state.companies.status = "succeeded";
      })
      .addCase(syncTallyCompanies.rejected, (state, action) => {
        state.companies.status = "failed";
        state.companies.error =
          action.payload || action.error.message || "Unable to sync companies.";
      })
      .addCase(syncTallyProducts.pending, (state) => {
        state.products.status = "loading";
        state.products.error = null;
      })
      .addCase(syncTallyProducts.fulfilled, (state, action) => {
        state.products.response = action.payload;
        state.products.status = "succeeded";
      })
      .addCase(syncTallyProducts.rejected, (state, action) => {
        state.products.status = "failed";
        state.products.error =
          action.payload || action.error.message || "Unable to sync products.";
      });
  },
});

export default tallySlice.reducer;
