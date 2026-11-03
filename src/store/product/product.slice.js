import { createSlice } from "@reduxjs/toolkit";

import { PRODUCT_TABS } from "@Enums";
import { getProductList } from "@Redux/product/product.action";
import { PRODUCT_ERROR_MESSAGES } from "@Redux/product/product.defaults";
import {
  createProductState,
  createQuotationOptionsState,
} from "@Redux/product/product.state";
import {
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const initialState = createProductState();

const reduceProductTable = (reducer) => (state, action) =>
  reducer(state.productTable, action);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productColumnFilterChanged: reduceProductTable(
      TABLE_REDUCERS.columnFilterChanged,
    ),
    productFiltersApplied: reduceProductTable(TABLE_REDUCERS.filtersApplied),
    productFiltersCleared: reduceProductTable(TABLE_REDUCERS.filtersCleared),
    productLimitChanged: reduceProductTable(TABLE_REDUCERS.limitChanged),
    productPageChanged: reduceProductTable(TABLE_REDUCERS.pageChanged),
    productSearchChanged: reduceProductTable(TABLE_REDUCERS.searchChanged),
    productSearchCommitted: reduceProductTable(TABLE_REDUCERS.searchCommitted),
    productSortChanged: reduceProductTable(TABLE_REDUCERS.sortChanged),
    productTabChanged(state, action) {
      if (Object.values(PRODUCT_TABS).includes(action.payload)) {
        state.activeTab = action.payload;
      }
    },
    productRowSelectionChanged(state, action) {
      const { product, checked } = action.payload;
      const selectedIndex = state.selectedProducts.findIndex(
        (selectedProduct) => selectedProduct.id === product.id,
      );

      if (checked && selectedIndex === -1) {
        state.selectedProducts.push(product);
      } else if (!checked && selectedIndex !== -1) {
        state.selectedProducts.splice(selectedIndex, 1);
      }
    },
    quotationProductOptionsReset(state) {
      state.quotationOptions = createQuotationOptionsState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) =>
        tableFetchCases.pending(state.productTable),
      )
      .addCase(getProductList.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state.productTable, action);
        state.summary = action.payload.summary;
      })
      .addCase(getProductList.rejected, (state, action) =>
        tableFetchCases.rejected(
          state.productTable,
          action,
          PRODUCT_ERROR_MESSAGES.list,
        ),
      );
  },
});

export const {
  productColumnFilterChanged,
  productFiltersApplied,
  productFiltersCleared,
  productLimitChanged,
  productPageChanged,
  productRowSelectionChanged,
  productSearchChanged,
  productSearchCommitted,
  productSortChanged,
  productTabChanged,
  quotationProductOptionsReset,
} = productSlice.actions;

export const productTableActions = {
  columnFilterChanged: productColumnFilterChanged,
  filtersApplied: productFiltersApplied,
  filtersCleared: productFiltersCleared,
  limitChanged: productLimitChanged,
  pageChanged: productPageChanged,
  searchChanged: productSearchChanged,
  searchCommitted: productSearchCommitted,
  sortChanged: productSortChanged,
};

export default productSlice.reducer;
