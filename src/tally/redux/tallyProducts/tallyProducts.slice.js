import { createSlice } from "@reduxjs/toolkit";

import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { syncTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.action";
import { fromTallyProductsResponse } from "@Tally/redux/tallyProducts/tallyProducts.frontend-payload";

const initialState = {
  response: null,
  products: [],
  status: TALLY_PRODUCTS_STATUS.IDLE,
  error: null,
};

const tallyProductsSlice = createSlice({
  name: "tallyProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncTallyProducts.pending, (state) => {
        state.status = TALLY_PRODUCTS_STATUS.LOADING;
        state.error = null;
      })
      .addCase(syncTallyProducts.fulfilled, (state, action) => {
        state.response = action.payload;
        state.products = fromTallyProductsResponse(action.payload);
        state.status = TALLY_PRODUCTS_STATUS.SUCCEEDED;
      })
      .addCase(syncTallyProducts.rejected, (state, action) => {
        state.status = TALLY_PRODUCTS_STATUS.FAILED;
        state.error =
          action.payload || action.error.message || "Unable to sync products.";
      });
  },
});

export default tallyProductsSlice.reducer;
