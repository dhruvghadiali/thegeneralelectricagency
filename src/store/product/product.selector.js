import { createSelector } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectProductState = (state) => state.products;
const selectProductTableState = (state) => state.products.productTable;
const selectAuthRole = (state) => state.auth.role;

export const productTableSelectors = createTableSelectors(
  selectProductTableState,
);

export const selectActiveProductTab = createSelector(
  selectProductState,
  (products) => products.activeTab,
);

export const isEmployeeCanManageProducts = createSelector(
  selectAuthRole,
  (role) => role === ROLE_PATHS.EMPLOYEE,
);

export const selectProductSummary = createSelector(
  selectProductState,
  (products) => products.summary,
);

export const selectSelectedProducts = createSelector(
  selectProductState,
  (products) => products.selectedProducts,
);

export const selectSelectedProductIds = createSelector(
  selectSelectedProducts,
  (selectedProducts) => new Set(selectedProducts.map((product) => product.id)),
);

export const selectQuotationProductOptions = createSelector(
  selectProductState,
  (products) => products.quotationOptions,
);
