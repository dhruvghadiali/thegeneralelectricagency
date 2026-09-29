import { createSelector } from "@reduxjs/toolkit";

export const selectTallyProducts = (state) => state.tallyProducts;

export const selectTallyProductsList = (state) => state.tallyProducts.products;

export const selectTallyProductCount = createSelector(
  [selectTallyProducts, selectTallyProductsList],
  ({ response }, products) => (response ? products.length : null),
);
