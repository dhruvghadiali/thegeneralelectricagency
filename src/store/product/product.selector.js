import { createSelector } from "@reduxjs/toolkit";

import { createTableSelectors } from "@Redux/factories/table.factory";

const selectProductState = (state) => state.products;

export const productTableSelectors = createTableSelectors(selectProductState);

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
