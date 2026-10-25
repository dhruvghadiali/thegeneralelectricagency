import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CREATE_QUOTATION_STEPS,
  SUBMISSION_ERROR_DISPLAY_DURATION_MS,
} from "@Enums";
import {
  selectQuotationCompanyInformation,
  selectQuotationProductInformation,
  selectQuotationSubmission,
} from "@Redux/quotation/quotation.selector";
import {
  quotationStepChanged,
  quotationSubmissionErrorCleared,
} from "@Redux/quotation/quotation.slice";
import useQuotationSummaryKeyboardShortcuts from "@screenComponent/quotations/keyboardShortcuts/quotationSummary";

function useQuotationSummary() {
  const dispatch = useDispatch();
  const companyInformation = useSelector(selectQuotationCompanyInformation);
  const products = useSelector(selectQuotationProductInformation);
  const { error: submissionError } = useSelector(selectQuotationSubmission);
  const keyboard = useQuotationSummaryKeyboardShortcuts();
  useEffect(() => {
    if (!submissionError) return undefined;

    const timeoutId = window.setTimeout(() => {
      dispatch(quotationSubmissionErrorCleared());
    }, SUBMISSION_ERROR_DISPLAY_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, submissionError]);

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
