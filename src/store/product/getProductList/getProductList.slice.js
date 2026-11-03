import { createSlice } from "@reduxjs/toolkit";

import { GET_PRODUCT_LIST_ERROR_MESSAGES } from "@Enums";
import { getProductList } from "@Redux/product/getProductList/getProductList.action";
import { createGetProductListState } from "@Redux/product/getProductList/getProductList.state";
import {
  tableFetchCases,
  TABLE_REDUCERS,
} from "@Redux/factories/table.factory";

const reduceProductTable = (reducer) => (state, action) =>
  reducer(state.productTable, action);

const productListSlice = createSlice({
  name: "productList",
  initialState: createGetProductListState(),
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
          GET_PRODUCT_LIST_ERROR_MESSAGES.list,
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
  productSearchChanged,
  productSearchCommitted,
  productSortChanged,
} = productListSlice.actions;

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

export default productListSlice.reducer;
