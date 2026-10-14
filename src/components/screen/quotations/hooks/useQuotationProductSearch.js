import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { fetchQuotationProducts } from "@Redux/quotation/quotation.action";
import {
  selectQuotationCurrentStep,
  selectQuotationProductSearch,
} from "@Redux/quotation/quotation.selector";
import { QUOTATION_PRODUCT_PAGE } from "@Redux/quotation/quotation.state";

const PRODUCT_SEARCH_DELAY = 300;

function useQuotationProductSearch() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectQuotationCurrentStep);
  const productSearch = useSelector(selectQuotationProductSearch);

  useEffect(() => {
    if (currentStep !== CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION) {
      return undefined;
    }

    let productRequest;
    const delay = productSearch.trim() ? PRODUCT_SEARCH_DELAY : 0;
    const timeoutId = window.setTimeout(() => {
      productRequest = dispatch(
        fetchQuotationProducts({ page: QUOTATION_PRODUCT_PAGE }),
      );
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      productRequest?.abort();
    };
  }, [currentStep, dispatch, productSearch]);
}

export default useQuotationProductSearch;
