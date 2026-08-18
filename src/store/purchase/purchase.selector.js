import { createSelector } from "@reduxjs/toolkit";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectPurchaseState = (state) => state.purchases;

export const purchaseTableSelectors = createTableSelectors(selectPurchaseState);

export const selectPurchaseSummary = createSelector(
  selectPurchaseState,
  (purchases) => purchases.summary,
);

export const selectPurchaseCreateState = createSelector(
  selectPurchaseState,
  ({ isCreating, createError }) => ({ isCreating, createError }),
);
