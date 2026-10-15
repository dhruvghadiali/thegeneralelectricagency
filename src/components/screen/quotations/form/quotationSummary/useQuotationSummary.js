import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import {
  selectQuotationCompanyInformation,
  selectQuotationProductInformation,
  selectQuotationSubmission,
} from "@Redux/quotation/quotation.selector";
import { quotationStepChanged } from "@Redux/quotation/quotation.slice";
import useQuotationSummaryKeyboardShortcuts from "@screenComponent/quotations/keyboardShortcuts/quotationSummary";

function useQuotationSummary() {
  const dispatch = useDispatch();
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const products = useSelector(selectQuotationProductInformation);
  const { error: submissionError } = useSelector(selectQuotationSubmission);
  const keyboard = useQuotationSummaryKeyboardShortcuts();
  const returnToProductInformation = useCallback(() => {
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.PRODUCT_INFORMATION));
  }, [dispatch]);

  return {
    companyInformation,
    keyboard,
    products,
    returnToProductInformation,
    submissionError,
  };
}

export default useQuotationSummary;
