import { createSlice } from "@reduxjs/toolkit";

import { syncTallyProducts } from "@Tally/redux/tally.action";

const initialState = {
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
