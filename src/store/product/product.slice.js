import { createSlice } from "@reduxjs/toolkit";

import { PRODUCT_TABLE_DEFAULTS } from "@Enums";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@Redux/product/product.action";
import {
  createTableState,
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = {
  ...createTableState({
    limit: PRODUCT_TABLE_DEFAULTS.LIMIT,
    sort: PRODUCT_TABLE_DEFAULTS.SORT,
  }),
  dialog: null,
  isCreating: false,
  createError: null,
  isUpdating: false,
  updateError: null,
  isDeleting: false,
  deleteError: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ...TABLE_REDUCERS,
    productDialogOpened(state, action) {
      state.dialog = action.payload;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    productDialogClosed(state) {
      state.dialog = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, tableFetchCases.pending)
      .addCase(fetchProducts.fulfilled, tableFetchCases.fulfilled)
      .addCase(fetchProducts.rejected, (state, action) =>
        tableFetchCases.rejected(state, action, "Unable to load products."),
      )
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isCreating = false;
        state.dialog = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isCreating = false;
        state.createError = action.payload ?? "Unable to add product.";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isUpdating = false;
        state.dialog = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.payload ?? "Unable to update product.";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isDeleting = false;
        state.dialog = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isDeleting = false;
        state.deleteError = action.payload ?? "Unable to delete product.";
      });
  },
});

export const {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  productDialogClosed,
  productDialogOpened,
  searchChanged,
  searchCommitted,
  sortChanged,
} = productSlice.actions;

export const productTableActions = {
  columnFilterChanged,
  filtersApplied,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  searchCommitted,
  sortChanged,
};

export default productSlice.reducer;
