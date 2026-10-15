import { fetchQuotationProducts } from "@Redux/quotation/quotation.action";
import { QUOTATION_PRODUCT_PAGE } from "@Redux/quotation/product/quotationProduct.state";

export const quotationProductReducers = {
  quotationProductSearchChanged(state, action) {
    state.productSearch = action.payload;
    state.selectedProduct = null;
  },
  quotationProductSelected(state, action) {
    state.selectedProduct = action.payload;
    state.productSearch = action.payload?.name ?? "";
  },
  quotationProductFormReset(state) {
    state.productSearch = "";
    state.selectedProduct = null;
    state.editingProductIndex = null;
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductInformationSaved(state, action) {
    state.productInformation.push(action.payload);
    state.productSearch = "";
    state.selectedProduct = null;
    state.isProductSummaryExpanded = false;
    state.editingProductIndex = null;
    state.pendingDeleteProductIndex = null;
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductInformationUpdated(state, action) {
    const { index, product } = action.payload;

    if (index < 0 || index >= state.productInformation.length) return;

    state.productInformation[index] = product;
    state.productSearch = "";
    state.selectedProduct = null;
    state.isProductSummaryExpanded = false;
    state.editingProductIndex = null;
    state.pendingDeleteProductIndex = null;
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductInformationDeleted(state, action) {
    const deletedIndex = action.payload;

    if (deletedIndex < 0 || deletedIndex >= state.productInformation.length) {
      return;
    }

    state.productInformation.splice(deletedIndex, 1);
    state.pendingDeleteProductIndex = null;

    if (state.editingProductIndex === deletedIndex) {
      state.editingProductIndex = null;
    } else if (state.editingProductIndex > deletedIndex) {
      state.editingProductIndex -= 1;
    }

    if (state.productInformation.length === 0) {
      state.isProductSummaryExpanded = false;
    }
  },
  quotationProductEditingStarted(state, action) {
    const productIndex = action.payload;

    if (productIndex < 0 || productIndex >= state.productInformation.length) {
      return;
    }

    state.editingProductIndex = productIndex;
    state.productSearch = state.productInformation[productIndex].product;
    state.selectedProduct = null;
    state.isProductSummaryExpanded = false;
    state.pendingDeleteProductIndex = null;
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductDeleteRequested(state, action) {
    const productIndex = action.payload;

    if (productIndex < 0 || productIndex >= state.productInformation.length) {
      return;
    }

    state.pendingDeleteProductIndex = productIndex;
  },
  quotationProductDeleteCancelled(state) {
    state.pendingDeleteProductIndex = null;
  },
  quotationProductDuplicateRequested(state, action) {
    const productIndex = action.payload;

    if (productIndex < 0 || productIndex >= state.productInformation.length) {
      return;
    }

    state.pendingDuplicateProductIndex = productIndex;
  },
  quotationProductDuplicateCancelled(state) {
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductAddAnotherPromptOpened(state) {
    state.isProductAddAnotherDialogOpen = true;
  },
  quotationProductAddAnotherPromptClosed(state) {
    state.isProductAddAnotherDialogOpen = false;
  },
  quotationProductSummaryOpened(state) {
    if (state.productInformation.length > 0) {
      state.isProductSummaryExpanded = true;
    }
    state.isProductAddAnotherDialogOpen = false;
    state.pendingDuplicateProductIndex = null;
  },
  quotationProductSummaryClosed(state) {
    state.isProductSummaryExpanded = false;
    state.pendingDeleteProductIndex = null;
  },
};

export function addQuotationProductExtraReducers(builder) {
  builder
    .addCase(fetchQuotationProducts.pending, (state, action) => {
      const requestedPage = action.meta.arg?.page ?? QUOTATION_PRODUCT_PAGE;
      const isFirstPage = requestedPage === QUOTATION_PRODUCT_PAGE;

      state.productRequestId = action.meta.requestId;
      state.productError = null;
      state.isLoadingProducts = isFirstPage;
      state.isLoadingMoreProducts = !isFirstPage;
      if (isFirstPage) state.products = [];
    })
    .addCase(fetchQuotationProducts.fulfilled, (state, action) => {
      if (state.productRequestId !== action.meta.requestId) return;

      if (action.payload.pagination.page === QUOTATION_PRODUCT_PAGE) {
        state.products = action.payload.items;
      } else {
        const uniqueProducts = new Map(
          [...state.products, ...action.payload.items].map((product) => [
            product.id,
            product,
          ]),
        );
        state.products = [...uniqueProducts.values()];
      }

      state.productPagination = action.payload.pagination;
      state.isLoadingProducts = false;
      state.isLoadingMoreProducts = false;
      state.productError = null;
      state.productRequestId = null;
    })
    .addCase(fetchQuotationProducts.rejected, (state, action) => {
      if (state.productRequestId !== action.meta.requestId) return;

      state.isLoadingProducts = false;
      state.isLoadingMoreProducts = false;
      state.productError = action.meta.aborted
        ? null
        : (action.payload ?? "Unable to load quotation products.");
      state.productRequestId = null;
    });
}
