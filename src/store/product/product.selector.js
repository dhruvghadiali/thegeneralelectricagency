import { createSelector } from "@reduxjs/toolkit";

import { ROLE_PATHS } from "@Enums";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectProductState = (state) => state.products;
const selectAuthRole = (state) => state.auth.role;

export const productTableSelectors = createTableSelectors(selectProductState);

export const selectCanManageProducts = createSelector(
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

export const selectProductDialogState = createSelector(
  selectProductState,
  ({
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  }) => ({
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  }),
);
