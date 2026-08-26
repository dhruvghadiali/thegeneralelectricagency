import { createSelector } from "@reduxjs/toolkit";

const selectPurchaseCreditState = (state) => state.purchaseCredits;

export const selectPurchaseCreditCreateState = createSelector(
  selectPurchaseCreditState,
  ({ isCreating, createError, createdPurchaseCredit }) => ({
    isCreating,
    createError,
    createdPurchaseCredit,
  }),
);
