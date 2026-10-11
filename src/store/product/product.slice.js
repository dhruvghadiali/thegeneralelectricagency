import { createSlice } from "@reduxjs/toolkit";

import { PRODUCT_TABS, TABLE_DEFAULTS } from "@Enums";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  fetchQuotationProducts,
  updateProduct,
} from "@Redux/product/product.action";
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

function clearOperationErrors(state) {
  state.operations.create.error = null;
  state.operations.update.error = null;
  state.operations.delete.error = null;
}

function setOperationPending(operation) {
  operation.isLoading = true;
  operation.error = null;
}

function setOperationFulfilled(operation) {
  operation.isLoading = false;
  operation.error = null;
}

function setOperationRejected(operation, action, fallbackMessage) {
  operation.isLoading = false;
  operation.error = action.payload ?? fallbackMessage;
}

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
    productDialogOpened(state, action) {
      state.dialog = action.payload;
      clearOperationErrors(state);
    },
    productDialogClosed(state) {
      state.dialog = null;
      clearOperationErrors(state);
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
      .addCase(fetchProducts.pending, (state) =>
        tableFetchCases.pending(state.productTable),
      )
      .addCase(fetchProducts.fulfilled, (state, action) => {
        tableFetchCases.fulfilled(state.productTable, action);
        state.summary = action.payload.summary;
      })
      .addCase(fetchProducts.rejected, (state, action) =>
        tableFetchCases.rejected(
          state.productTable,
          action,
          PRODUCT_ERROR_MESSAGES.list,
        ),
      )
      .addCase(fetchQuotationProducts.pending, (state, action) => {
        const options = state.quotationOptions;
        const isFirstPage = action.meta.arg.page === TABLE_DEFAULTS.PAGE;

        options.requestId = action.meta.requestId;
        options.error = null;
        options.isLoading = isFirstPage;
        options.isLoadingMore = !isFirstPage;
        if (isFirstPage) options.items = [];
      })
      .addCase(fetchQuotationProducts.fulfilled, (state, action) => {
        const options = state.quotationOptions;
        if (options.requestId !== action.meta.requestId) return;

        if (action.payload.pagination.page === TABLE_DEFAULTS.PAGE) {
          options.items = action.payload.items;
        } else {
          const uniqueProducts = new Map(
            [...options.items, ...action.payload.items].map((product) => [
              product.id,
              product,
            ]),
          );
          options.items = [...uniqueProducts.values()];
        }

        options.pagination = action.payload.pagination;
        options.isLoading = false;
        options.isLoadingMore = false;
        options.error = null;
        options.requestId = null;
      })
      .addCase(fetchQuotationProducts.rejected, (state, action) => {
        const options = state.quotationOptions;
        if (options.requestId !== action.meta.requestId) return;

        options.isLoading = false;
        options.isLoadingMore = false;
        options.error = action.meta.aborted
          ? null
          : (action.payload ?? PRODUCT_ERROR_MESSAGES.quotationList);
        options.requestId = null;
      })
      .addCase(createProduct.pending, (state) => {
        setOperationPending(state.operations.create);
      })
      .addCase(createProduct.fulfilled, (state) => {
        setOperationFulfilled(state.operations.create);
        state.dialog = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        setOperationRejected(
          state.operations.create,
          action,
          PRODUCT_ERROR_MESSAGES.create,
        );
      })
      .addCase(updateProduct.pending, (state) => {
        setOperationPending(state.operations.update);
      })
      .addCase(updateProduct.fulfilled, (state) => {
        setOperationFulfilled(state.operations.update);
        state.dialog = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        setOperationRejected(
          state.operations.update,
          action,
          PRODUCT_ERROR_MESSAGES.update,
        );
      })
      .addCase(deleteProduct.pending, (state) => {
        setOperationPending(state.operations.delete);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        setOperationFulfilled(state.operations.delete);
        state.dialog = null;
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        setOperationRejected(
          state.operations.delete,
          action,
          PRODUCT_ERROR_MESSAGES.delete,
        );
      });
  },
});

export const {
  productColumnFilterChanged,
  productDialogClosed,
  productDialogOpened,
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
