import { createSlice } from "@reduxjs/toolkit";

import { createPurchaseCredit } from "@Redux/purchaseCredit/purchaseCredit.action";

const initialState = {
  isCreating: false,
  createError: null,
  createdPurchaseCredit: null,
};

const purchaseCreditSlice = createSlice({
  name: "purchaseCredits",
  initialState,
  reducers: {
    purchaseCreditCreateCleared(state) {
      state.isCreating = false;
      state.createError = null;
      state.createdPurchaseCredit = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPurchaseCredit.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
        state.createdPurchaseCredit = null;
      })
      .addCase(createPurchaseCredit.fulfilled, (state, action) => {
        state.isCreating = false;
        state.createError = null;
        state.createdPurchaseCredit = action.payload;
      })
      .addCase(createPurchaseCredit.rejected, (state, action) => {
        state.isCreating = false;
        state.createError =
          action.payload ?? "Unable to add purchase credit.";
        state.createdPurchaseCredit = null;
      });
  },
});

export const { purchaseCreditCreateCleared } = purchaseCreditSlice.actions;

export default purchaseCreditSlice.reducer;
