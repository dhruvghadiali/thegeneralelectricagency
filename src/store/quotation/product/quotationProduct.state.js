export const QUOTATION_PRODUCT_PAGE = 1;
export const QUOTATION_PRODUCT_LIMIT = 100;

export const createQuotationProductState = () => ({
  products: [],
  productSearch: "",
  selectedProduct: null,
  productInformation: [],
  originalProductInformation: [],
  isProductSummaryExpanded: false,
  editingProductIndex: null,
  pendingDeleteProductIndex: null,
  pendingDuplicateProductIndex: null,
  isProductAddAnotherDialogOpen: false,
  productPagination: {
    page: QUOTATION_PRODUCT_PAGE,
    limit: QUOTATION_PRODUCT_LIMIT,
    total: 0,
    totalPages: 0,
  },
  isLoadingProducts: false,
  isLoadingMoreProducts: false,
  productError: null,
  productRequestId: null,
});

export default createQuotationProductState;
