import { createSelector } from "@reduxjs/toolkit";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectPurchaseCreditState = (state) => state.purchaseCredits;

export const purchaseCreditTableSelectors = createTableSelectors(
  selectPurchaseCreditState,
);

export const selectSelectedPurchaseCredit = createSelector(
  selectPurchaseCreditState,
  (purchaseCredits) => purchaseCredits.selectedPurchaseCredit,
);

export const selectPurchaseCreditCreateState = createSelector(
  selectPurchaseCreditState,
  ({ isCreating, createError, createdPurchaseCredit }) => ({
    isCreating,
    createError,
    createdPurchaseCredit,
  }),
);
