import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationProducts } from "@Redux/quotation/quotation.action";
import {
  selectQuotationProductPagination,
  selectQuotationProductRequest,
  selectQuotationProductSearch,
  selectQuotationProducts,
  selectQuotationSelectedProduct,
} from "@Redux/quotation/quotation.selector";
import { QUOTATION_PRODUCT_PAGE } from "@Redux/quotation/quotation.state";

function useQuotationProductDirectory() {
  const dispatch = useDispatch();
  const products = useSelector(selectQuotationProducts);
  const pagination = useSelector(selectQuotationProductPagination);
  const productSearch = useSelector(selectQuotationProductSearch);
  const selectedProduct = useSelector(selectQuotationSelectedProduct);
  const request = useSelector(selectQuotationProductRequest);
  const hasMoreProducts = pagination.page < pagination.totalPages;
  const productCountLabel = pagination.total
    ? `${products.length} of ${pagination.total} products`
    : `${products.length} products`;

  const loadProducts = useCallback(
    (page = QUOTATION_PRODUCT_PAGE) =>
      dispatch(fetchQuotationProducts({ page })),
    [dispatch],
  );

  return {
    products,
    pagination,
    productSearch,
    selectedProduct,
    productCountLabel,
    hasMoreProducts,
    loadProducts,
    ...request,
  };
}

export default useQuotationProductDirectory;
