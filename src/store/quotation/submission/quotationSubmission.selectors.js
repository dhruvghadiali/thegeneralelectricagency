import { createSelector } from "@reduxjs/toolkit";

import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationSubmission = createSelector(
  selectQuotationState,
  ({ isSubmitting, isSubmitSuccessful, submitError, createdQuotation }) => ({
    isSubmitting,
    isSuccessful: isSubmitSuccessful,
    error: submitError,
    createdQuotation,
  }),
);
